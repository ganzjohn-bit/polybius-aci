import { NextRequest, NextResponse } from 'next/server';
import { cleanObjectStrings } from '@/lib/text-utils';
import { findToolUseBlock, ApiResponse, ContentBlock } from '@/lib/prompt-utils';
import { buildOpEdPrompt } from '@/lib/prompts/op-eds';
import { OPED_ANALYSIS_TOOL } from '@/lib/prompts/op-eds/analysis-tool';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    console.log('Op-eds request received:', { hasApiKey: !!apiKey, apiKeyLength: apiKey?.length });

    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key required', received: Object.keys(body) }, { status: 400 });
    }

    const prompt = buildOpEdPrompt();

    console.info('Analyzing op-eds...');

    const MAX_TURNS = 5;
    const messages: Array<{role: string; content: string | ContentBlock[]}> = [{
      role: 'user',
      content: prompt
    }];

    let data!: ApiResponse;

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 16000,
          temperature: 0,
          tools: [
            { type: "web_search_20250305", name: "web_search" },
            OPED_ANALYSIS_TOOL
          ],
          messages
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

      data = await response.json();

      console.info(`Turn ${turn + 1}: stop_reason is ${data.stop_reason}`);

      // Check if the analysis tool was called
      const toolUseBlock = findToolUseBlock(data, OPED_ANALYSIS_TOOL.name);
      if (toolUseBlock?.input) {
        console.info('Analysis tool response found. Op-ed analysis complete.');
        return NextResponse.json(cleanObjectStrings(toolUseBlock.input));
      }

      // If paused (e.g. hit server tool use limit for this turn), continue
      if (data.stop_reason === 'pause_turn') {
        messages.push({ role: 'assistant', content: data.content });
        messages.push({ role: 'user', content: 'Continue your analysis.' });
        continue;
      }

      // end_turn, max_tokens, or other — stop looping
      break;
    }

    console.info('No analysis tool response found. Attempting to extract JSON from text...');

    // Fallback: extract JSON from text blocks
    const textBlocks = data.content.filter((item) => item.type === 'text' && item.text);

    if (textBlocks.length === 0) {
      return NextResponse.json({
        error: 'No content returned',
        details: `Stop reason: ${data.stop_reason}`
      }, { status: 500 });
    }

    let text = textBlocks.map((item) => item.text).join('\n');
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({
        error: 'No JSON found in response',
        rawText: text.substring(0, 2000)
      }, { status: 500 });
    }

    try {
      const results = JSON.parse(jsonMatch[0]);
      console.info('JSON extraction successful. Op-ed analysis complete.');
      return NextResponse.json(cleanObjectStrings(results));
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
