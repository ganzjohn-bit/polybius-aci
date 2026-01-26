import { NextRequest, NextResponse } from 'next/server';

interface ContentBlock {
  type: string;
  text?: string;
}

interface ApiResponse {
  content: ContentBlock[];
  stop_reason: string;
}

export async function POST(request: NextRequest) {
  try {
    const { country, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key required' }, { status: 400 });
    }

    if (!country) {
      return NextResponse.json({ error: 'Country required' }, { status: 400 });
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const prompt = `TODAY'S DATE: ${currentDate}

You are a news analyst tracking headlines about ${country} that indicate democratic stress or stability. Search for RECENT headlines (last 24-48 hours) across multiple categories.

EXECUTE THESE SEARCHES:

1. GOVERNANCE/DEMOCRACY - Search: "${country} democracy" OR "${country} authoritarian" OR "${country} constitutional crisis"

2. PROTESTS/CIVIL SOCIETY - Search: "${country} protest" OR "${country} demonstration" OR "${country} strike" OR "${country} resistance"

3. JUDICIARY/RULE OF LAW - Search: "${country} court ruling" OR "${country} judge" OR "${country} Supreme Court" OR "${country} legal challenge"

4. ELECTIONS/POLITICAL - Search: "${country} election" OR "${country} voting" OR "${country} political opposition"

5. MEDIA/PRESS FREEDOM - Search: "${country} journalist" OR "${country} press freedom" OR "${country} media" OR "${country} censorship"

6. SECURITY/ENFORCEMENT - Search: "${country} arrest" OR "${country} detention" OR "${country} ICE" OR "${country} military" OR "${country} police"

7. FEDERAL/STATE TENSIONS - Search: "${country} federal vs state" OR "${country} governor" OR "${country} state resistance"

For each headline found, identify:
- The headline text
- Source outlet
- Category (governance/protests/judiciary/elections/media/security/federalism)
- Stress indicator (what democratic stress signal does this represent?)
- Sentiment (crisis/concerning/neutral/hopeful)

RESPOND WITH ONLY THIS JSON:
{
  "country": "${country}",
  "totalArticles": 0,
  "articles": [
    {
      "title": "headline text",
      "source": {"name": "outlet name"},
      "category": "governance/protests/judiciary/elections/media/security/federalism",
      "stressIndicators": ["indicator1"],
      "sentiment": "negative/neutral/positive"
    }
  ],
  "categoryBreakdown": {
    "governance": 0,
    "protests": 0,
    "judiciary": 0,
    "elections": 0,
    "media": 0,
    "security": 0,
    "federalism": 0
  },
  "sentimentBreakdown": {
    "negative": 0,
    "neutral": 0,
    "positive": 0
  },
  "topIndicators": [
    {"indicator": "indicator name", "count": 0}
  ],
  "stressScore": 0,
  "interpretation": [
    "signal 1",
    "signal 2",
    "signal 3"
  ]
}

NOTE: For sentiment, map crisis/concerning to "negative", hopeful to "positive", neutral stays "neutral".

STRESS SCORE GUIDANCE:
- 0-25: Low stress - mostly positive or neutral headlines, few concerning indicators
- 26-50: Moderate stress - mix of concerning and neutral headlines
- 51-75: High stress - majority concerning headlines, multiple stress indicators
- 76-100: Crisis level - widespread crisis coverage, severe stress indicators`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        temperature: 0,
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
        { error: `Anthropic API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data: ApiResponse = await response.json();

    // Extract text content
    const textBlocks = data.content.filter((item) => item.type === 'text' && item.text);

    if (textBlocks.length === 0) {
      return NextResponse.json({
        error: 'No content returned',
        details: `Stop reason: ${data.stop_reason}`
      }, { status: 500 });
    }

    let text = textBlocks.map((item) => item.text).join('\n');
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    // Find JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({
        error: 'No JSON found in response',
        rawText: text.substring(0, 2000)
      }, { status: 500 });
    }

    try {
      const results = JSON.parse(jsonMatch[0]);
      return NextResponse.json(results);
    } catch (parseError) {
      return NextResponse.json({
        error: 'JSON parse error',
        details: parseError instanceof Error ? parseError.message : 'Unknown',
        rawText: jsonMatch[0].substring(0, 1000)
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Headlines analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
