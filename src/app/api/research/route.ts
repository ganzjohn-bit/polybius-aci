import { NextRequest, NextResponse } from 'next/server';
import { cleanObjectStrings } from '@/lib/text-utils';
import { buildLiveSearchPrompt, buildQuickSearchPrompt } from '@/lib/prompts/research';
import { researchFixture } from '@/lib/fixtures/research';

interface ContentBlock {
  type: string;
  text?: string;
}

interface ApiResponse {
  content: ContentBlock[];
  stop_reason: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

interface CacheEntry {
  data: Record<string, unknown>;
  timestamp: number;
}

// In-memory cache: key = "country|mode", value = cached result
const cache = new Map<string, CacheEntry>();

// Cache duration: 1 hour for quick mode, 15 min for live mode
const QUICK_CACHE_MS = 60 * 60 * 1000;
const LIVE_CACHE_MS = 15 * 60 * 1000;

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

    // Check cache first
    const cacheKey = `${country.toLowerCase().trim()}|${searchMode}`;
    const cached = cache.get(cacheKey);
    const cacheDuration = searchMode === 'live' ? LIVE_CACHE_MS : QUICK_CACHE_MS;

    if (cached && (Date.now() - cached.timestamp) < cacheDuration) {
      console.log(`Cache hit for ${cacheKey}`);
      return NextResponse.json({ ...cached.data, cached: true });
    }

    // Different prompts for each mode
    const prompt = searchMode === 'live' ? buildLiveSearchPrompt(country) : buildQuickSearchPrompt(country);

    // Build request body - only include tools for live search mode
    const requestBody: {
      model: string;
      max_tokens: number;
      temperature: number;
      messages: { role: string; content: string }[];
      tools?: { type: string; name: string }[];
    } = {
      // TODO: updates to claude-sonnet-4-5-20250929
      model: 'claude-sonnet-4-20250514',
      max_tokens: searchMode === 'live' ? 16000 : 4096,
      temperature: 0, // Use 0 for consistent, deterministic results
      messages: [{
        role: 'user',
        content: prompt
      }]
    };

    // Only add web search tool for live mode
    if (searchMode === 'live') {
      requestBody.tools = [{
        type: "web_search_20250305",
        name: "web_search"
      }];
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `Anthropic API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data: ApiResponse = await response.json();
    console.log('API response stop_reason:', data.stop_reason);
    console.log('API response content types:', data.content.map(c => c.type));

    // Extract all text content from response
    const textBlocks = data.content.filter((item) => item.type === 'text' && item.text);

    if (textBlocks.length === 0) {
      console.error('No text blocks found. Full response:', JSON.stringify(data, null, 2));
      return NextResponse.json({
        error: 'No text content in response',
        details: `Stop reason: ${data.stop_reason}, Content types: ${data.content.map(c => c.type).join(', ')}`
      }, { status: 500 });
    }

    let text = textBlocks.map((item) => item.text).join('\n');
    console.log('Extracted text length:', text.length);

    // Clean up markdown code blocks
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    // Try to find JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found. Text preview:', text.substring(0, 500));
      return NextResponse.json({
        error: 'No JSON found in response',
        details: text.substring(0, 1000)
      }, { status: 500 });
    }

    try {
      const results = JSON.parse(jsonMatch[0]);
      // Clean up any XML/HTML artifacts in the response
      const cleanedResults = cleanObjectStrings(results) as Record<string, unknown>;
      // Store in cache
      cache.set(cacheKey, { data: cleanedResults, timestamp: Date.now() });
      console.log(`Cached result for ${cacheKey}`);
      // Include token usage in response
      return NextResponse.json({
        ...cleanedResults,
        _usage: data.usage ? {
          input_tokens: data.usage.input_tokens,
          output_tokens: data.usage.output_tokens
        } : null
      });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({
        error: 'Failed to parse JSON',
        details: jsonMatch[0].substring(0, 500)
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Research error:', error);
    return NextResponse.json(
      { error: 'Research failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
