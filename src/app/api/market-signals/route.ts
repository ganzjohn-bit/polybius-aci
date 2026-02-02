import { NextRequest, NextResponse } from 'next/server';
import { cleanObjectStrings } from '@/lib/text-utils';

interface MarketDataPoint {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

interface PolicyMarketEvent {
  date: string;
  policy: string;
  marketReaction: 'crash' | 'drop' | 'flat' | 'rally' | 'surge';
  magnitude: number;
  followUp: 'reversal' | 'modification' | 'maintained' | 'unknown';
  tacoPattern: boolean;
}

interface BusinessNewsSentiment {
  source: string;
  headline: string;
  sentiment: 'panic' | 'negative' | 'cautious' | 'neutral' | 'optimistic' | 'euphoric';
  eliteSignal: string;
  url?: string;
}

interface ModelInterpretation {
  model: string;
  interpretation: string;
  implication: 'constraining' | 'enabling' | 'ambiguous';
  score_modifier: number;
}

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const prompt = `TODAY'S DATE: ${currentDate}

You are a financial analyst tracking market signals relevant to political risk assessment. We distinguish between TWO types of market signals:

A) BOND/CREDIT MARKETS = CORPORATE COMPLIANCE SIGNAL (elite/institutional investors, "bond vigilantes")
B) EQUITY MARKETS + MEDIA COVERAGE = PUBLIC OPINION PATHWAY (affects 401ks, gets media coverage, translates to political pressure)

Search for current data on:

1. BOND/CREDIT MARKETS (Corporate Compliance Signal):
- 10-year Treasury yield and recent movement
- Credit spreads (investment grade vs junk)
- Corporate bond market conditions
- Any "bond vigilante" activity - yields spiking on fiscal policy
- Institutional investor sentiment

2. EQUITY MARKETS (Public Opinion Pathway):
- S&P 500 current level and recent trend (1 week, 1 month)
- VIX (volatility index) current level
- Any recent sharp moves (>2% daily moves)
- 401k/retirement account impact rhetoric
- "Are you better off" economic framing in media

3. MEDIA TRANSLATION (How markets become public opinion):
- Are market drops getting significant media coverage?
- Is there 401k/retirement anxiety in coverage?
- Are politicians using market performance as talking point?
- Consumer confidence signals

4. POLICY-MARKET INTERACTIONS (last 3 months):
- Major policy announcements that moved markets
- Whether policies were reversed/modified after market reaction (TACO pattern)
- Did BOND market or EQUITY market reaction drive the reversal?

5. ELITE ECONOMIC SIGNALS:
- Major CEO statements on administration policy
- Chamber of Commerce, Business Roundtable positions
- Any notable business defections or alignments?

Respond with ONLY this JSON:
{
  "marketConditions": {
    "sp500": { "level": 5000, "weekChange": -1.5, "monthChange": 2.3, "trend": "up/down/flat" },
    "treasury10y": { "yield": 4.5, "weekChange": 0.1, "trend": "up/down/flat", "elevated": true/false },
    "vix": { "level": 18, "interpretation": "low/moderate/elevated/high" },
    "recentVolatility": "description of any sharp recent moves"
  },
  "policyMarketEvents": [
    {
      "date": "date",
      "policy": "policy description",
      "marketReaction": "crash/drop/flat/rally/surge",
      "magnitude": 2.5,
      "followUp": "reversal/modification/maintained/unknown",
      "tacoPattern": true/false
    }
  ],
  "tacoPatternAnalysis": {
    "instancesLast90Days": 3,
    "patternHolding": true/false,
    "marketDisciplineWorking": true/false,
    "summary": "analysis of whether markets are constraining policy"
  },
  "businessSentiment": {
    "overall": "panic/fearful/cautious/neutral/confident/euphoric",
    "keyHeadlines": ["headline 1", "headline 2", "headline 3"],
    "eliteAlignment": "aligned/mixed/resistant/defecting",
    "notableStatements": ["CEO/org statement 1", "statement 2"]
  },
  "modelInterpretations": {
    "marxian": {
      "interpretation": "How Marxian model reads these signals",
      "implication": "What this means for consolidation"
    },
    "redistributive": {
      "interpretation": "Acemoglu-Robinson reading",
      "implication": "What this means for consolidation"
    },
    "gramscian": {
      "interpretation": "Gramscian reading - hegemonic status of capital",
      "implication": "What this means for consolidation"
    },
    "svolik": {
      "interpretation": "Svolik reading - elite coordination signals",
      "implication": "What this means for consolidation"
    },
    "classical": {
      "interpretation": "Classical reading - commercial virtue",
      "implication": "What this means for regime character"
    },
    "paxton": {
      "interpretation": "Paxton reading - capital complicity",
      "implication": "What stage of fascist process this suggests"
    }
  },
  "overallAssessment": {
    "marketConstraintLevel": "strong/moderate/weak/none",
    "regimeResponsiveness": "high/medium/low",
    "consolidationImplication": "markets_constraining/ambiguous/markets_enabling",
    "summary": "2-3 sentence synthesis"
  }
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        tools: [{
          type: "web_search_20250305",
          name: "web_search"
        }],
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', errorText);
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract text content
    const textBlocks = data.content.filter((item: { type: string; text?: string }) =>
      item.type === 'text' && item.text
    );

    if (textBlocks.length === 0) {
      return NextResponse.json({
        error: 'No text content in response'
      }, { status: 500 });
    }

    let text = textBlocks.map((item: { text: string }) => item.text).join('\n');
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({
        error: 'No JSON found',
        details: text.substring(0, 500)
      }, { status: 500 });
    }

    const results = JSON.parse(jsonMatch[0]);
    const cleanedResults = cleanObjectStrings(results) as Record<string, unknown>;
    return NextResponse.json({
      ...cleanedResults,
      _usage: data.usage ? {
        input_tokens: data.usage.input_tokens,
        output_tokens: data.usage.output_tokens
      } : null
    });

  } catch (error) {
    console.error('Market signals error:', error);
    return NextResponse.json(
      { error: 'Market analysis failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
