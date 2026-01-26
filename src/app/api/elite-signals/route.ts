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
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key required' }, { status: 400 });
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const prompt = `TODAY'S DATE: ${currentDate}

You are a political analyst tracking ELITE DEFECTIONS and PARTY COORDINATION signals. Search for RECENT news (last 48-72 hours) about Republican officials breaking with or supporting Trump administration actions.

EXECUTE THESE SEARCHES:

1. GOP LEADERSHIP - Search: "McConnell Trump" OR "Thune Trump" OR "Mike Johnson Trump" - are they supporting or distancing?

2. GOP SENATORS - Search: "Republican senator criticizes Trump" OR "GOP senator breaks with" OR "Susan Collins Trump" OR "Lisa Murkowski Trump" OR "Mitt Romney"

3. GOP GOVERNORS - Search: "DeSantis Trump" OR "Brian Kemp Trump" OR "Republican governor" - are governors coordinating or resisting?

4. FORMER OFFICIALS - Search: "Mike Pence Trump" OR "Bill Barr Trump" OR "John Kelly Trump" OR "Mark Esper Trump" - what are former officials saying?

5. CONSERVATIVE MEDIA FIGURES - Search: "Tucker Carlson" OR "Ben Shapiro" OR "Ann Coulter Trump" - are base-facing media figures supportive or critical?

6. BUSINESS ELITE - Search: "CEO Trump" OR "business leaders Trump" OR "Wall Street Trump" - is capital coordinating or hedging?

7. MILITARY/NATIONAL SECURITY - Search: "generals Trump" OR "Pentagon Trump" OR "military Trump" - any military/security elite signals?

For each signal found, identify:
- Who is speaking/acting
- Their role/position
- Whether they're SUPPORTING or BREAKING WITH Trump
- The significance (high/medium/low)

ALSO SEARCH FOR PROPAGANDA EFFECTIVENESS:
- Search: "Fox News Trump" - how is regime media covering administration?
- Search: "Breitbart Trump" - is populist base media enthusiastic or critical?

RESPOND WITH ONLY THIS JSON (follow this format exactly):
{
  "defections": {
    "articles": [
      {
        "title": "headline about defection",
        "description": "what they said/did",
        "source": {"name": "outlet name"},
        "figure": "person name",
        "figureRole": "their role (Senator, Governor, etc)",
        "severity": 50,
        "defectionType": "criticizes/breaks/opposes/warns/rebukes"
      }
    ],
    "totalFound": 0,
    "byFigure": [
      {"figure": "name", "role": "role", "count": 1, "maxSeverity": 50}
    ],
    "coordinationScore": 80
  },
  "propaganda": {
    "metrics": {
      "negativeStoriesTotal": 0,
      "negativeInOpposition": 0,
      "negativeInRegimeMedia": 0,
      "penetrationRate": 0,
      "echoEffect": 0,
      "counterNarrativeCount": 0,
      "blackoutScore": 0
    },
    "effectivenessScore": 50
  },
  "interpretation": [
    "signal 1",
    "signal 2",
    "signal 3"
  ]
}

SCORING GUIDANCE:
- coordinationScore: 0-100 (higher = more unified party, lower = more defections)
- severity: 0-100 (higher = more significant defection)
- effectivenessScore: 0-100 (higher = propaganda working, negative stories contained)
- penetrationRate: % of negative stories appearing in regime media
- blackoutScore: 100 - penetrationRate (how much regime media is ignoring negative stories)`;

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
    console.error('Elite signals error:', error);
    return NextResponse.json(
      { error: 'Analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
