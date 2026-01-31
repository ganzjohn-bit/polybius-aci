import { NextRequest, NextResponse } from 'next/server';
import { cleanObjectStrings } from '@/lib/text-utils';

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
    const body = await request.json();
    const { apiKey } = body;

    console.log('Elite signals request received:', { hasApiKey: !!apiKey, apiKeyLength: apiKey?.length });

    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key required', received: Object.keys(body) }, { status: 400 });
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const prompt = `TODAY'S DATE: ${currentDate}

You are a political analyst tracking ELITE DEFECTIONS and PARTY COORDINATION signals. Search for THE MOST RECENT news (last 24-48 hours, prioritize TODAY) about Republican officials' statements on Trump administration actions.

CRITICAL: Search for STATEMENTS, QUOTES, and VOTES from the last 24-48 hours. Not old profiles or historical articles.

EXECUTE THESE SEARCHES (prioritize finding direct quotes and statements):

1. GOP SENATE LEADERSHIP - Search: "Thune said" OR "Thune statement" OR "McConnell said" OR "John Cornyn said" - what are leaders saying TODAY?

2. GOP SENATORS (swing votes) - Search: "Susan Collins said" OR "Lisa Murkowski statement" OR "Todd Young said" OR "Bill Cassidy said" OR "Rand Paul Trump" - any breaks or support?

3. GOP HOUSE LEADERSHIP - Search: "Mike Johnson said" OR "Speaker Johnson statement" OR "Steve Scalise said" - what is House GOP saying?

4. REPUBLICAN GOVERNORS - Search: "DeSantis said" OR "Glenn Youngkin statement" OR "Brian Kemp said" OR "Greg Abbott statement" OR "Republican governor criticizes" - state-level signals

5. GOP SENATORS BY NAME (recent statements):
   - Search: "Marco Rubio statement" OR "Ted Cruz said" OR "Lindsey Graham said"
   - Search: "JD Vance said" OR "Tom Cotton statement"
   - Look for statements on current controversies

6. FORMER TRUMP OFFICIALS - Search: "Mike Pence said" OR "Bill Barr statement" OR "John Bolton said" OR "Mark Esper said" OR "John Kelly statement" - former officials speaking out?

7. REPUBLICAN CRITICS - Search: "Liz Cheney said" OR "Adam Kinzinger statement" OR "Chris Christie said" - what are GOP critics saying?

8. CONSERVATIVE MEDIA - Search: "Tucker Carlson said" OR "Ben Shapiro statement" OR "Ann Coulter Trump" OR "Charlie Kirk said" - base-facing media figures

9. BUSINESS ELITE - Search: "CEO statement Trump" OR "Jamie Dimon Trump" OR "business leaders" OR "Chamber of Commerce statement"

10. CONGRESSIONAL VOTES - Search: "Republican senators vote against" OR "GOP breaks with Trump" OR "bipartisan vote" - any defection votes?

For each signal found, MUST INCLUDE:
- EXACT QUOTE or specific action (not just "criticized")
- The date of the statement (must be within last 48 hours)
- Context: what policy/action they're responding to
- Whether SUPPORTING or BREAKING WITH administration

ALSO SEARCH FOR PROPAGANDA EFFECTIVENESS:
- Search: "Fox News Trump coverage" - how is regime media framing?
- Search: "Breitbart Trump" - populist base media tone?

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
      return NextResponse.json(cleanObjectStrings(results));
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
