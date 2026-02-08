import { NextRequest, NextResponse } from 'next/server';
import { cleanObjectStrings } from '@/lib/text-utils';

// Outlet classification for interpreting results
// TODO: use or remove
const OUTLET_PROFILES: Record<string, { class: string; affinity: string; type: string }> = {
  // Elite traditional outlets
  'new york times': { class: 'elite', affinity: 'opposition', type: 'traditional' },
  'washington post': { class: 'elite', affinity: 'opposition', type: 'traditional' },
  'wall street journal': { class: 'elite', affinity: 'regime', type: 'traditional' },
  'the atlantic': { class: 'elite', affinity: 'opposition', type: 'traditional' },
  'the economist': { class: 'elite', affinity: 'neutral', type: 'traditional' },
  'financial times': { class: 'elite', affinity: 'neutral', type: 'traditional' },
  'bloomberg': { class: 'elite', affinity: 'neutral', type: 'traditional' },
  'foreign affairs': { class: 'elite', affinity: 'neutral', type: 'traditional' },
  'the new yorker': { class: 'elite', affinity: 'opposition', type: 'traditional' },

  // Mainstream
  'fox news': { class: 'mainstream', affinity: 'regime', type: 'traditional' },
  'cnn': { class: 'mainstream', affinity: 'opposition', type: 'traditional' },
  'msnbc': { class: 'mainstream', affinity: 'opposition', type: 'traditional' },
  'npr': { class: 'mainstream', affinity: 'neutral', type: 'traditional' },
  'politico': { class: 'mainstream', affinity: 'neutral', type: 'traditional' },
  'axios': { class: 'mainstream', affinity: 'neutral', type: 'traditional' },
  'the hill': { class: 'mainstream', affinity: 'neutral', type: 'traditional' },

  // Populist traditional
  'breitbart': { class: 'populist', affinity: 'regime', type: 'traditional' },
  'daily wire': { class: 'populist', affinity: 'regime', type: 'traditional' },
  'huffpost': { class: 'populist', affinity: 'opposition', type: 'traditional' },
  'vox': { class: 'populist', affinity: 'opposition', type: 'traditional' },
  'the daily beast': { class: 'populist', affinity: 'opposition', type: 'traditional' },
  'the intercept': { class: 'populist', affinity: 'opposition', type: 'traditional' },
  'jacobin': { class: 'populist', affinity: 'opposition', type: 'traditional' },
  'national review': { class: 'populist', affinity: 'regime', type: 'traditional' },
  'the federalist': { class: 'populist', affinity: 'regime', type: 'traditional' },

  // Substacks - these shape elite/informed opinion
  'heather cox richardson': { class: 'elite', affinity: 'opposition', type: 'substack' },
  'letters from an american': { class: 'elite', affinity: 'opposition', type: 'substack' },
  'the free press': { class: 'elite', affinity: 'regime', type: 'substack' },
  'bari weiss': { class: 'elite', affinity: 'regime', type: 'substack' },
  'slow boring': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'matt yglesias': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'the bulwark': { class: 'mainstream', affinity: 'opposition', type: 'substack' },
  'matt taibbi': { class: 'populist', affinity: 'regime', type: 'substack' },
  'glenn greenwald': { class: 'populist', affinity: 'regime', type: 'substack' },
  'andrew sullivan': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'the weekly dish': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'yascha mounk': { class: 'elite', affinity: 'opposition', type: 'substack' },
  'persuasion': { class: 'elite', affinity: 'opposition', type: 'substack' },
  'noah smith': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'noahpinion': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'zeynep tufekci': { class: 'elite', affinity: 'opposition', type: 'substack' },
  'common sense': { class: 'elite', affinity: 'regime', type: 'substack' },

  // Podcasts - massive audience reach
  'joe rogan': { class: 'mainstream', affinity: 'neutral', type: 'podcast' },
  'joe rogan experience': { class: 'mainstream', affinity: 'neutral', type: 'podcast' },
  'tucker carlson': { class: 'mainstream', affinity: 'regime', type: 'podcast' },
  'ben shapiro': { class: 'populist', affinity: 'regime', type: 'podcast' },
  'pod save america': { class: 'mainstream', affinity: 'opposition', type: 'podcast' },
  'ezra klein': { class: 'elite', affinity: 'opposition', type: 'podcast' },
  'ezra klein show': { class: 'elite', affinity: 'opposition', type: 'podcast' },
  'all-in podcast': { class: 'elite', affinity: 'regime', type: 'podcast' },
  'all-in': { class: 'elite', affinity: 'regime', type: 'podcast' },
  'lex fridman': { class: 'elite', affinity: 'neutral', type: 'podcast' },
  'breaking points': { class: 'populist', affinity: 'neutral', type: 'podcast' },
  'megyn kelly': { class: 'mainstream', affinity: 'regime', type: 'podcast' },
  'dan bongino': { class: 'populist', affinity: 'regime', type: 'podcast' },
  'the daily': { class: 'elite', affinity: 'opposition', type: 'podcast' },

  // YouTube/Video commentators
  'tim pool': { class: 'populist', affinity: 'regime', type: 'youtube' },
  'steven crowder': { class: 'populist', affinity: 'regime', type: 'youtube' },
  'destiny': { class: 'populist', affinity: 'opposition', type: 'youtube' },
  'hasan piker': { class: 'populist', affinity: 'opposition', type: 'youtube' },
  'hasanabi': { class: 'populist', affinity: 'opposition', type: 'youtube' },
};

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    console.log('Op-eds request received:', { hasApiKey: !!apiKey, apiKeyLength: apiKey?.length });

    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key required', received: Object.keys(body) }, { status: 400 });
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const prompt = `TODAY'S DATE: ${currentDate}

You are a media analyst tracking editorial positions across the US media landscape. Search for RECENT (last 48-72 hours) op-eds, editorials, and commentary on current political events.

SEARCH FOR CONTENT FROM THESE SOURCES (execute multiple searches):

1. ELITE OUTLETS - Search: "New York Times editorial" OR "Washington Post opinion" OR "Wall Street Journal editorial" OR "The Atlantic" OR "The Economist" OR "Foreign Affairs"

2. MAINSTREAM OUTLETS - Search: "Fox News opinion" OR "CNN analysis" OR "MSNBC" OR "Politico" OR "Axios"

3. POPULIST OUTLETS - Search: "Breitbart" OR "Daily Wire" OR "HuffPost" OR "Vox" OR "The Intercept" OR "Jacobin"

4. KEY SUBSTACKS (HIGH PRIORITY - these shape elite opinion):
   - Search: "Heather Cox Richardson" (opposition historian, massive reach)
   - Search: "Bari Weiss Free Press" (center-right contrarian)
   - Search: "Matt Yglesias Slow Boring" (center-left wonk)
   - Search: "The Bulwark" (anti-Trump conservative)
   - Search: "Matt Taibbi" (populist left-turned-right)
   - Search: "Glenn Greenwald" (civil libertarian contrarian)
   - Search: "Andrew Sullivan" (center-right)
   - Search: "Yascha Mounk Persuasion" (democracy scholar)
   - Search: "Noah Smith Noahpinion" (economics/policy)
   - Search: "Zeynep Tufekci" (tech/society)

5. MAJOR PODCASTS (HIGH PRIORITY - massive audience reach):
   - Search: "Joe Rogan Experience" Trump OR politics (largest podcast)
   - Search: "Tucker Carlson" show OR interview (right populist)
   - Search: "Ben Shapiro Daily Wire" (conservative)
   - Search: "Pod Save America" (liberal)
   - Search: "All-In podcast" Sacks Calacanis (tech elite)
   - Search: "Lex Fridman" politics (tech/intellectual)
   - Search: "Breaking Points" Krystal Saagar (populist cross-partisan)
   - Search: "Megyn Kelly" show (center-right)
   - Search: "Dan Bongino" (MAGA media)
   - Search: "The Daily" New York Times (elite liberal)
   - Search: "Ezra Klein Show" (intellectual left)

6. YOUTUBE/VIDEO COMMENTATORS:
   - Search: "Tim Pool" politics
   - Search: "Steven Crowder"
   - Search: "Destiny streamer" politics
   - Search: "Hasan Piker" politics

7. NIXON-TO-CHINA MOMENTS (HIGHEST SIGNAL):
   Search for regime-friendly outlets (WSJ, Fox, Daily Wire, Breitbart) criticizing Trump
   Search for opposition outlets (NYT, WaPo, MSNBC) praising Trump policies
   These unexpected alignments indicate shifting coalitions.

For each piece of content found, identify:
- Source outlet
- Headline/title
- Key argument or position
- Sentiment toward current regime (critical/neutral/supportive)
- Any authoritarian rhetoric (dehumanization, scapegoating, enemy language)

RESPOND WITH ONLY THIS JSON (follow this format exactly):
{
  "country": "United States",
  "totalArticles": 0,
  "articles": [
    {
      "title": "headline/title text",
      "description": "brief summary of position",
      "source": {"name": "outlet name"},
      "sentiment": "negative/neutral/positive",
      "outletClass": "elite/mainstream/populist",
      "outletAffinity": "regime/neutral/opposition",
      "signalWeight": 1.0,
      "isNixonToChina": false,
      "nixonType": null
    }
  ],
  "matrix": {
    "elite": {
      "regime": {"count": 0, "negative": 0, "neutral": 0, "positive": 0},
      "neutral": {"count": 0, "negative": 0, "neutral": 0, "positive": 0},
      "opposition": {"count": 0, "negative": 0, "neutral": 0, "positive": 0}
    },
    "mainstream": {
      "regime": {"count": 0, "negative": 0, "neutral": 0, "positive": 0},
      "neutral": {"count": 0, "negative": 0, "neutral": 0, "positive": 0},
      "opposition": {"count": 0, "negative": 0, "neutral": 0, "positive": 0}
    },
    "populist": {
      "regime": {"count": 0, "negative": 0, "neutral": 0, "positive": 0},
      "neutral": {"count": 0, "negative": 0, "neutral": 0, "positive": 0},
      "opposition": {"count": 0, "negative": 0, "neutral": 0, "positive": 0}
    }
  },
  "derivedSignals": {
    "eliteDefection": {"score": 0, "evidence": ["evidence string"]},
    "hegemnonicCrisis": {"score": 0, "evidence": ["evidence string"]},
    "classConflict": {"score": 0, "evidence": ["evidence string"]},
    "eliteCoordination": {"score": 0, "evidence": ["evidence string"]},
    "baseErosion": {"score": 0, "evidence": ["evidence string"]}
  },
  "nixonMoments": [
    {
      "title": "",
      "description": "",
      "source": {"name": ""},
      "sentiment": "negative/neutral/positive",
      "outletClass": "elite/mainstream/populist",
      "outletAffinity": "regime/neutral/opposition",
      "signalWeight": 3.0,
      "isNixonToChina": true,
      "nixonType": "description of unexpected alignment"
    }
  ],
  "interpretation": ["signal 1", "signal 2", "signal 3"]
}

IMPORTANT:
- For "Nixon to China" moments: regime-aligned outlets criticizing regime = HIGH SIGNAL, opposition outlets praising regime = HIGH SIGNAL
- signalWeight: normal=1.0, Nixon-to-China moments=2.5-3.0
- Count negative/neutral/positive in the matrix cells based on article sentiments found`;

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
      const cleanedResults = cleanObjectStrings(results) as Record<string, unknown>;
      return NextResponse.json({
        ...cleanedResults,
        _usage: data.usage ? {
          input_tokens: data.usage.input_tokens,
          output_tokens: data.usage.output_tokens
        } : null
      });
    } catch (parseError) {
      return NextResponse.json({
        error: 'JSON parse error',
        details: parseError instanceof Error ? parseError.message : 'Unknown',
        rawText: jsonMatch[0].substring(0, 1000)
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Op-ed analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
