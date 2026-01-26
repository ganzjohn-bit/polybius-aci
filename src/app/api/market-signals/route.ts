import { NextRequest, NextResponse } from 'next/server';

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
  "bondCreditSignals": {
    "treasury10y": { "yield": 0, "weekChange": 0, "monthChange": 0, "trend": "up/down/flat", "elevated": true/false },
    "creditSpreads": { "level": "tight/normal/widening/stressed", "trend": "up/down/flat" },
    "bondVigilantes": { "active": true/false, "evidence": "description" },
    "institutionalSentiment": "risk_on/cautious/risk_off/fleeing",
    "corporateComplianceSignal": {
      "score": 0-100,
      "interpretation": "What bond/credit markets signal about elite/corporate stance toward regime",
      "evidence": ["evidence 1", "evidence 2"]
    }
  },
  "equityPublicSignals": {
    "sp500": { "level": 0, "weekChange": 0, "monthChange": 0, "trend": "up/down/flat" },
    "vix": { "level": 0, "interpretation": "low/moderate/elevated/high" },
    "recentVolatility": "description of any sharp recent moves",
    "retirementImpact": {
      "mediaCoverage": "none/minimal/moderate/heavy",
      "anxietyLevel": "low/moderate/high",
      "politicalSalience": "not_salient/emerging/salient/dominant"
    },
    "publicOpinionPathway": {
      "score": 0-100,
      "interpretation": "How equity markets are translating into public opinion pressure",
      "evidence": ["evidence 1", "evidence 2"]
    }
  },
  "policyMarketEvents": [
    {
      "date": "date",
      "policy": "policy description",
      "marketReaction": "crash/drop/flat/rally/surge",
      "magnitude": percent_move,
      "whichMarketDrove": "bonds/equities/both",
      "followUp": "reversal/modification/maintained/unknown",
      "tacoPattern": true/false
    }
  ],
  "tacoPatternAnalysis": {
    "instancesLast90Days": 0,
    "patternHolding": true/false,
    "bondDrivenReversals": 0,
    "equityDrivenReversals": 0,
    "marketDisciplineWorking": true/false,
    "summary": "analysis of whether markets are constraining policy and which market type matters more"
  },
  "businessSentiment": {
    "overall": "panic/fearful/cautious/neutral/confident/euphoric",
    "keyHeadlines": ["headline 1", "headline 2", "headline 3"],
    "eliteAlignment": "aligned/mixed/resistant/defecting",
    "notableStatements": ["CEO/org statement 1", "statement 2"]
  },
  "modelInterpretations": {
    "marxian": {
      "interpretation": "How Marxian model reads these signals - capital's structural power, class action",
      "regime_capital_alignment": "aligned/tension/conflict",
      "implication": "What this means for consolidation"
    },
    "redistributive": {
      "interpretation": "Acemoglu-Robinson reading - elite veto, redistributive conflict",
      "elite_regime_alignment": "aligned/mixed/misaligned",
      "implication": "What this means for consolidation"
    },
    "gramscian": {
      "interpretation": "Gramscian reading - hegemonic status of capital",
      "hegemonic_status": "capital_hegemonic/contested/regime_autonomous",
      "implication": "What this means for consolidation"
    },
    "svolik": {
      "interpretation": "Svolik reading - elite coordination signals",
      "elite_coordination": "coordinating_resistance/fragmented/coordinating_support",
      "implication": "What this means for consolidation"
    },
    "classical": {
      "interpretation": "Classical reading - commercial virtue, appetitive dominance",
      "civic_virtue_signal": "markets_show_decay/ambiguous/virtuous_indifference",
      "implication": "What this means for regime character"
    },
    "paxton": {
      "interpretation": "Paxton reading - capital complicity in fascist consolidation",
      "capital_complicity": "resisting/hedging/complicit",
      "implication": "What stage of fascist process this suggests"
    },
    "frankfurtSchool": {
      "interpretation": "Frankfurt School reading - market volatility as inter-racket conflict (Neumann), capital as one competing power bloc among many. Skeptical of markets as constraint - capital was complicit in Nazism",
      "racket_dynamics": "unified_regime/competing_rackets/chaotic",
      "capital_as_racket": "Is capital acting as independent power bloc or aligned with regime?",
      "implication": "What this means for regime structure - totalitarian unity or Behemoth-style chaos?"
    }
  },
  "factorMapping": {
    "corporateComplianceFactor": {
      "primarySignal": "bondCreditSignals",
      "score": 0-100,
      "summary": "How bond/credit markets inform the corporate compliance factor"
    },
    "publicOpinionFactor": {
      "primarySignal": "equityPublicSignals + media translation",
      "score": 0-100,
      "summary": "How equity market coverage informs the public opinion factor"
    }
  },
  "overallAssessment": {
    "marketConstraintLevel": "strong/moderate/weak/none",
    "regimeResponsiveness": "high/medium/low",
    "consolidationImplication": "markets_constraining/ambiguous/markets_enabling",
    "summary": "2-3 sentence synthesis distinguishing bond vs equity signals"
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
    return NextResponse.json(results);

  } catch (error) {
    console.error('Market signals error:', error);
    return NextResponse.json(
      { error: 'Market analysis failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
