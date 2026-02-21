import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

// Mock the research fixture
vi.mock('@/lib/fixtures/research', () => ({
  researchFixture: { judicial: { score: 50 }, _fixture: true },
}));

// Mock the prompt builders to return simple strings
vi.mock('@/lib/prompts/research', () => ({
  buildInstitutionalPrompt: () => 'institutional prompt',
  buildPublicOpinionPrompt: () => 'public opinion prompt',
  buildMobilizationPrompt: () => 'mobilization prompt',
  buildMediaPrompt: () => 'media prompt',
  buildSynthesisPrompt: () => 'synthesis prompt',
}));

function makeRequest(body: Record<string, unknown>) {
  return {
    json: () => Promise.resolve(body),
  } as unknown as Parameters<typeof POST>[0];
}

function mockApiResponse(data: Record<string, unknown>) {
  return {
    ok: true,
    json: () =>
      Promise.resolve({
        content: [{ type: 'text', text: JSON.stringify(data) }],
        stop_reason: 'end_turn',
      }),
  };
}

describe('POST /api/research', () => {
  const originalEnv = process.env.LIVE_REQUESTS;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.LIVE_REQUESTS = originalEnv;
    } else {
      delete process.env.LIVE_REQUESTS;
    }
  });

  it('returns fixture when LIVE_REQUESTS=false', async () => {
    process.env.LIVE_REQUESTS = 'false';
    const response = await POST(makeRequest({ country: 'US', apiKey: 'test' }));
    const body = await response.json();
    expect(body._fixture).toBe(true);
  });

  it('returns 400 when apiKey is missing', async () => {
    delete process.env.LIVE_REQUESTS;
    const response = await POST(makeRequest({ country: 'US' }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('API key');
  });

  it('returns 400 when country is missing', async () => {
    delete process.env.LIVE_REQUESTS;
    const response = await POST(makeRequest({ apiKey: 'test' }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Country');
  });

  it('merges results from all sub-queries and synthesis', async () => {
    delete process.env.LIVE_REQUESTS;

    let callIndex = 0;
    const responses = [
      // Phase 1: 4 parallel sub-queries
      { judicial: { score: 35 }, federalism: { score: 20 } },
      { publicOpinion: { score: 30 }, corporateCompliance: { score: 40 } },
      { mobilizationalBalance: { score: 45 }, stateCapacity: { score: 50 } },
      { media: { score: 25 }, mediaLandscape: { overallSentiment: 'mixed' } },
      // Phase 2: synthesis
      { modelDiagnoses: { gramscian: 'test' }, summary: 'test summary' },
    ];

    vi.stubGlobal('fetch', vi.fn(() => {
      const resp = mockApiResponse(responses[callIndex]);
      callIndex++;
      return Promise.resolve(resp);
    }));

    const response = await POST(makeRequest({ country: 'United States', apiKey: 'test-key', searchMode: 'quick' }));
    const body = await response.json();

    // All Phase 1 fields present
    expect(body.judicial).toEqual({ score: 35 });
    expect(body.federalism).toEqual({ score: 20 });
    expect(body.publicOpinion).toEqual({ score: 30 });
    expect(body.corporateCompliance).toEqual({ score: 40 });
    expect(body.mobilizationalBalance).toEqual({ score: 45 });
    expect(body.stateCapacity).toEqual({ score: 50 });
    expect(body.media).toEqual({ score: 25 });
    expect(body.mediaLandscape).toEqual({ overallSentiment: 'mixed' });

    // Phase 2 fields present
    expect(body.modelDiagnoses).toEqual({ gramscian: 'test' });
    expect(body.summary).toBe('test summary');

    // 5 API calls total (4 sub-queries + 1 synthesis)
    expect(fetch).toHaveBeenCalledTimes(5);
  });

  it('handles partial failure gracefully', async () => {
    delete process.env.LIVE_REQUESTS;

    let callIndex = 0;
    vi.stubGlobal('fetch', vi.fn(() => {
      callIndex++;
      if (callIndex === 2) {
        // Second sub-query fails
        return Promise.resolve({
          ok: false,
          status: 500,
          text: () => Promise.resolve('Internal Server Error'),
        });
      }
      if (callIndex <= 4) {
        return Promise.resolve(mockApiResponse({ [`field${callIndex}`]: 'ok' }));
      }
      // Synthesis
      return Promise.resolve(mockApiResponse({ summary: 'partial synthesis' }));
    }));

    const response = await POST(makeRequest({ country: 'US', apiKey: 'test-key', searchMode: 'quick' }));
    const body = await response.json();

    // Should still return a response (not 500)
    expect(response.status).toBe(200);
    // Should have _errors array
    expect(body._errors).toBeDefined();
    expect(body._errors.length).toBeGreaterThan(0);
    // Successful sub-queries should still have their data
    expect(body.summary).toBe('partial synthesis');
  });

  it('uses web search tool only in live mode', async () => {
    delete process.env.LIVE_REQUESTS;

    const fetchCalls: string[] = [];
    vi.stubGlobal('fetch', vi.fn((url: string, opts: { body: string }) => {
      fetchCalls.push(opts.body);
      return Promise.resolve(mockApiResponse({ test: true }));
    }));

    await POST(makeRequest({ country: 'US', apiKey: 'test-key', searchMode: 'live' }));

    // Phase 1 calls (first 4) should have tools for live mode
    for (let i = 0; i < 4; i++) {
      const body = JSON.parse(fetchCalls[i]);
      expect(body.tools).toBeDefined();
      expect(body.tools[0].type).toBe('web_search_20250305');
    }

    // Synthesis call (5th) should NOT have tools
    const synthesisBody = JSON.parse(fetchCalls[4]);
    expect(synthesisBody.tools).toBeUndefined();
  });

  it('uses correct token budgets per mode', async () => {
    delete process.env.LIVE_REQUESTS;

    const fetchCalls: string[] = [];
    vi.stubGlobal('fetch', vi.fn((_url: string, opts: { body: string }) => {
      fetchCalls.push(opts.body);
      return Promise.resolve(mockApiResponse({ test: true }));
    }));

    await POST(makeRequest({ country: 'TokenBudgetTest', apiKey: 'test-key', searchMode: 'quick' }));

    // Quick mode budgets: institutional=3000, publicOpinion=2500, mobilization=3000, media=2500, synthesis=3000
    const budgets = fetchCalls.map((c) => JSON.parse(c).max_tokens);
    expect(budgets).toEqual([3000, 2500, 3000, 2500, 3000]);
  });
});
