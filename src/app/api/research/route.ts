import { NextRequest, NextResponse } from 'next/server';
import { cleanObjectStrings } from '@/lib/text-utils';
import { findToolUseBlock, ApiResponse, ContentBlock } from '@/lib/prompt-utils';
import {
  buildInstitutionalPrompt,
  buildPublicOpinionPrompt,
  buildMobilizationPrompt,
  buildMediaPrompt,
  buildSynthesisPrompt,
  INSTITUTIONAL_ANALYSIS_TOOL,
  PUBLIC_OPINION_ANALYSIS_TOOL,
  MOBILIZATION_ANALYSIS_TOOL,
  MEDIA_ANALYSIS_TOOL,
  SYNTHESIS_ANALYSIS_TOOL,
  type SearchMode,
  type Phase1Results,
} from '@/lib/prompts/research';
import { researchFixture } from '@/lib/fixtures/research';

interface CacheEntry {
  data: Record<string, unknown>;
  timestamp: number;
}

// In-memory cache: key = "country|mode|subQuery", value = cached result
const cache = new Map<string, CacheEntry>();

// Cache duration: 1 hour for quick mode, 15 min for live mode
const QUICK_CACHE_MS = 60 * 60 * 1000;
const LIVE_CACHE_MS = 15 * 60 * 1000;

type SubQueryName = 'institutional' | 'publicOpinion' | 'mobilization' | 'media';

// Budgets here are meant to be proportional to the number of factors and the size of the rubric
const TOKEN_BUDGETS: Record<SubQueryName | 'synthesis', { live: number; quick: number }> = {
  institutional: { live: 6000, quick: 3000 },
  publicOpinion: { live: 5000, quick: 2500 },
  mobilization: { live: 6000, quick: 3000 },
  media: { live: 5000, quick: 2500 },
  synthesis: { live: 6000, quick: 3000 },
};

const PROMPT_BUILDERS: Record<SubQueryName, (country: string, mode: SearchMode) => string> = {
  institutional: buildInstitutionalPrompt,
  publicOpinion: buildPublicOpinionPrompt,
  mobilization: buildMobilizationPrompt,
  media: buildMediaPrompt,
};

interface AnalysisTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

const ANALYSIS_TOOLS: Record<SubQueryName | 'synthesis', AnalysisTool> = {
  institutional: INSTITUTIONAL_ANALYSIS_TOOL,
  publicOpinion: PUBLIC_OPINION_ANALYSIS_TOOL,
  mobilization: MOBILIZATION_ANALYSIS_TOOL,
  media: MEDIA_ANALYSIS_TOOL,
  synthesis: SYNTHESIS_ANALYSIS_TOOL,
};

// ── Helpers ──────────────────────────────────────────────────────────

const MAX_TURNS = 5;

async function callAnthropic(
  prompt: string,
  apiKey: string,
  maxTokens: number,
  useWebSearch: boolean,
  analysisTool: AnalysisTool,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const tools: Array<{ type: string; name: string } | AnalysisTool> = [analysisTool];
  if (useWebSearch) {
    tools.unshift({ type: 'web_search_20250305', name: 'web_search' });
  }

  const messages: Array<{ role: string; content: string | ContentBlock[] }> = [
    { role: 'user', content: prompt },
  ];

  let data!: ApiResponse;

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        temperature: 0,
        messages,
        tools,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { data: null, error: `Anthropic API error ${response.status}: ${errorText}` };
    }

    data = await response.json();

    // Check if the analysis tool was called
    const toolUseBlock = findToolUseBlock(data, analysisTool.name);
    if (toolUseBlock?.input) {
      return { data: toolUseBlock.input, error: null };
    }

    // If paused (e.g. hit server tool use limit for this turn), continue
    if (data.stop_reason === 'pause_turn') {
      messages.push({ role: 'assistant', content: data.content });
      messages.push({ role: 'user', content: 'Continue your analysis.' });
      continue;
    }

    // end_turn, max_tokens, or other — stop looping
    break;
  }

  // Fallback: extract JSON from text blocks
  const textBlocks = data.content.filter((item) => item.type === 'text' && item.text);

  if (textBlocks.length === 0) {
    return { data: null, error: `No text content in response (stop_reason: ${data.stop_reason})` };
  }

  let text = textBlocks.map((item) => item.text).join('\n');
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { data: null, error: `No JSON found in response: ${text.substring(0, 500)}` };
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return { data: parsed as Record<string, unknown>, error: null };
  } catch (parseError) {
    return { data: null, error: `JSON parse error: ${parseError}` };
  }
}

interface SubQueryResult {
  name: SubQueryName;
  data: Record<string, unknown> | null;
  error: string | null;
  cached: boolean;
}

async function runSubQuery(
  name: SubQueryName,
  country: string,
  searchMode: SearchMode,
  apiKey: string,
): Promise<SubQueryResult> {
  const cacheKey = `${country.toLowerCase().trim()}|${searchMode}|${name}`;
  const cacheDuration = searchMode === 'live' ? LIVE_CACHE_MS : QUICK_CACHE_MS;
  const cached = cache.get(cacheKey);

  // Cache duration: 1 hour for quick mode, 15 min for live mode
  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    console.log(`Cache hit for ${cacheKey}`);
    return { name, data: cached.data, error: null, cached: true };
  }

  const prompt = PROMPT_BUILDERS[name](country, searchMode);
  const budget = TOKEN_BUDGETS[name];
  const maxTokens = searchMode === 'live' ? budget.live : budget.quick;
  const useWebSearch = searchMode === 'live';
  const analysisTool = ANALYSIS_TOOLS[name];

  try {
    const { data, error } = await callAnthropic(prompt, apiKey, maxTokens, useWebSearch, analysisTool);
    if (data) {
      cache.set(cacheKey, { data, timestamp: Date.now() });
      console.log(`Cached result for ${cacheKey}`);
    }
    return { name, data, error, cached: false };
  } catch (err) {
    return { name, data: null, error: err instanceof Error ? err.message : 'Unknown error', cached: false };
  }
}

// ── Route handler ────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { country, apiKey, searchMode = 'quick' } = await request.json();

    // If configured locally, short-circuit the request with a stubbed response.
    if (process.env.LIVE_REQUESTS === 'false') {
      console.log(`[stub] Returning fixture data for research (country: ${country}, mode: ${searchMode})`);
      return NextResponse.json(researchFixture);
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }

    if (!country) {
      return NextResponse.json({ error: 'Country required' }, { status: 400 });
    }

    // ── Phase 1: sub-queries in two batches to stay under rate limits ─
    const batch1: SubQueryName[] = ['institutional', 'publicOpinion'];
    const batch2: SubQueryName[] = ['mobilization', 'media'];

    console.log(`[research] Phase 1a: launching batch 1 (${batch1.join(', ')}) for ${country} (${searchMode})`);
    const batch1Settled = await Promise.allSettled(
      batch1.map((name) => runSubQuery(name, country, searchMode, apiKey)),
    );

    console.log(`[research] Phase 1b: launching batch 2 (${batch2.join(', ')}) for ${country} (${searchMode})`);
    const batch2Settled = await Promise.allSettled(
      batch2.map((name) => runSubQuery(name, country, searchMode, apiKey)),
    );

    const phase1Settled = [...batch1Settled, ...batch2Settled];

    const errors: string[] = [];
    const mergedResult: Record<string, unknown> = {};
    const phase1Results: Phase1Results = {};

    for (const settled of phase1Settled) {
      if (settled.status === 'rejected') {
        errors.push(`Sub-query rejected: ${settled.reason}`);
        continue;
      }

      const { name, data, error, cached } = settled.value;
      if (error) {
        errors.push(`${name}: ${error}`);
        console.error(`[research] ${name} error:`, error);
      }
      if (data) {
        console.log(`[research] ${name} ${cached ? '(cached)' : '(fresh)'}: ${Object.keys(data).join(', ')}`);
        Object.assign(mergedResult, data);
        phase1Results[name] = data;
      }
    }

    // ── Phase 2: synthesis ───────────────────────────────────────────
    console.log('[research] Phase 2: running synthesis');

    const synthesisPrompt = buildSynthesisPrompt(country, searchMode, phase1Results);
    const synthesisBudget = TOKEN_BUDGETS.synthesis;
    const synthesisMaxTokens = searchMode === 'live' ? synthesisBudget.live : synthesisBudget.quick;

    // Synthesis never uses web search (no new facts needed) and is never cached
    const { data: synthesisData, error: synthesisError } = await callAnthropic(
      synthesisPrompt,
      apiKey,
      synthesisMaxTokens,
      false,
      ANALYSIS_TOOLS.synthesis,
    );

    if (synthesisError) {
      errors.push(`synthesis: ${synthesisError}`);
      console.error('[research] synthesis error:', synthesisError);
    }
    if (synthesisData) {
      Object.assign(mergedResult, synthesisData);
    }

    // ── Return merged result ─────────────────────────────────────────
    const cleanedResults = cleanObjectStrings(mergedResult);

    if (errors.length > 0) {
      (cleanedResults as Record<string, unknown>)._errors = errors;
      console.warn(`[research] Completed with ${errors.length} error(s):`, errors);
    }

    console.log(`[research] Done. Keys: ${Object.keys(cleanedResults as Record<string, unknown>).join(', ')}`);
    return NextResponse.json(cleanedResults);
  } catch (error) {
    console.error('Research error:', error);
    return NextResponse.json(
      { error: 'Research failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
