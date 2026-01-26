import { NextRequest, NextResponse } from 'next/server';

// Outlet classification for interpreting results
const OUTLET_PROFILES: Record<string, { class: string; affinity: string; type: string }> = {
  // Elite outlets
  'new york times': { class: 'elite', affinity: 'opposition', type: 'traditional' },
  'washington post': { class: 'elite', affinity: 'opposition', type: 'traditional' },
  'wall street journal': { class: 'elite', affinity: 'regime', type: 'traditional' },
  'the atlantic': { class: 'elite', affinity: 'opposition', type: 'traditional' },
  'the economist': { class: 'elite', affinity: 'neutral', type: 'traditional' },
  'financial times': { class: 'elite', affinity: 'neutral', type: 'traditional' },
  'bloomberg': { class: 'elite', affinity: 'neutral', type: 'traditional' },

  // Mainstream
  'fox news': { class: 'mainstream', affinity: 'regime', type: 'traditional' },
  'cnn': { class: 'mainstream', affinity: 'opposition', type: 'traditional' },
  'msnbc': { class: 'mainstream', affinity: 'opposition', type: 'traditional' },
  'npr': { class: 'mainstream', affinity: 'neutral', type: 'traditional' },
  'politico': { class: 'mainstream', affinity: 'neutral', type: 'traditional' },
  'axios': { class: 'mainstream', affinity: 'neutral', type: 'traditional' },

  // Populist
  'breitbart': { class: 'populist', affinity: 'regime', type: 'traditional' },
  'daily wire': { class: 'populist', affinity: 'regime', type: 'traditional' },
  'huffpost': { class: 'populist', affinity: 'opposition', type: 'traditional' },
  'vox': { class: 'populist', affinity: 'opposition', type: 'traditional' },
  'the daily beast': { class: 'populist', affinity: 'opposition', type: 'traditional' },

  // Substacks
  'heather cox richardson': { class: 'elite', affinity: 'opposition', type: 'substack' },
  'the free press': { class: 'elite', affinity: 'regime', type: 'substack' },
  'bari weiss': { class: 'elite', affinity: 'regime', type: 'substack' },
  'slow boring': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'matt yglesias': { class: 'elite', affinity: 'neutral', type: 'substack' },
  'the bulwark': { class: 'mainstream', affinity: 'opposition', type: 'substack' },
  'matt taibbi': { class: 'populist', affinity: 'regime', type: 'substack' },
  'glenn greenwald': { class: 'populist', affinity: 'regime', type: 'substack' },

  // Podcasts
  'joe rogan': { class: 'mainstream', affinity: 'neutral', type: 'podcast' },
  'tucker carlson': { class: 'mainstream', affinity: 'regime', type: 'podcast' },
  'ben shapiro': { class: 'populist', affinity: 'regime', type: 'podcast' },
  'pod save america': { class: 'mainstream', affinity: 'opposition', type: 'podcast' },
  'ezra klein': { class: 'elite', affinity: 'opposition', type: 'podcast' },
  'all-in podcast': { class: 'elite', affinity: 'regime', type: 'podcast' },
};

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

You are a media analyst tracking editorial positions across the US media landscape. Search for RECENT (last 48-72 hours) op-eds, editorials, and commentary on current political events.

SEARCH FOR CONTENT FROM THESE SOURCES (execute multiple searches):

1. ELITE OUTLETS - Search: "New York Times editorial" OR "Washington Post opinion" OR "Wall Street Journal editorial" OR "The Atlantic" - find their current editorial positions on Trump administration, democracy, governance

2. MAINSTREAM OUTLETS - Search: "Fox News opinion" OR "CNN analysis" OR "MSNBC" - what narratives are they pushing?

3. POPULIST OUTLETS - Search: "Breitbart" OR "Daily Wire" OR "HuffPost" OR "Vox" - what's the populist discourse?

4. SUBSTACKS - Search: "Heather Cox Richardson Letters" OR "The Free Press Bari Weiss" OR "Slow Boring Matt Yglesias" OR "The Bulwark" - what are influential independent voices saying?

5. PODCASTS - Search: "Joe Rogan said" OR "Tucker Carlson show" OR "Ben Shapiro" OR "Pod Save America" OR "All-In podcast" - what are major podcasts discussing?

6. NIXON-TO-CHINA MOMENTS - Search for: regime-friendly outlets (WSJ, Fox) criticizing Trump, OR opposition outlets (NYT, WaPo) praising Trump policies. These unexpected alignments are HIGH SIGNAL.

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
      return NextResponse.json(results);
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
