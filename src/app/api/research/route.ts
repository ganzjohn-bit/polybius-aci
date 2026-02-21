import { NextRequest, NextResponse } from 'next/server';
import { cleanObjectStrings } from '@/lib/text-utils';
import {
  buildInstitutionalPrompt,
  buildPublicOpinionPrompt,
  buildMobilizationPrompt,
  buildMediaPrompt,
  buildSynthesisPrompt,
  type SearchMode,
  type Phase1Results,
} from '@/lib/prompts/research';
import { researchFixture } from '@/lib/fixtures/research';

interface ContentBlock {
  type: string;
  text?: string;
}

interface ApiResponse {
  content: ContentBlock[];
  stop_reason: string;
}

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

// ── Helpers ──────────────────────────────────────────────────────────

async function callAnthropic(
  prompt: string,
  apiKey: string,
  maxTokens: number,
  useTool: boolean,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const requestBody: {
    model: string;
    max_tokens: number;
    temperature: number;
    messages: { role: string; content: string }[];
    tools?: { type: string; name: string }[];
  } = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    temperature: 0,
    messages: [{ role: 'user', content: prompt }],
  };

  if (useTool) {
    requestBody.tools = [{ type: 'web_search_20250305', name: 'web_search' }];
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { data: null, error: `Anthropic API error ${response.status}: ${errorText}` };
  }

  const apiData: ApiResponse = await response.json();
  const textBlocks = apiData.content.filter((item) => item.type === 'text' && item.text);

  if (textBlocks.length === 0) {
    return { data: null, error: `No text content in response (stop_reason: ${apiData.stop_reason})` };
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

  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    console.log(`Cache hit for ${cacheKey}`);
    return { name, data: cached.data, error: null, cached: true };
  }

  const prompt = PROMPT_BUILDERS[name](country, searchMode);
  const budget = TOKEN_BUDGETS[name];
  const maxTokens = searchMode === 'live' ? budget.live : budget.quick;
  const useTool = searchMode === 'live';

  try {
    const { data, error } = await callAnthropic(prompt, apiKey, maxTokens, useTool);
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

    // ── Phase 1: parallel sub-queries ────────────────────────────────
    const subQueryNames: SubQueryName[] = ['institutional', 'publicOpinion', 'mobilization', 'media'];

    console.log(`[research] Phase 1: launching ${subQueryNames.length} parallel sub-queries for ${country} (${searchMode})`);

    const phase1Settled = await Promise.allSettled(
      subQueryNames.map((name) => runSubQuery(name, country, searchMode, apiKey)),
    );

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
