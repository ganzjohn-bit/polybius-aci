import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {

  // prevent the publishing of stubbed results to prod
  if (process.env.LIVE_REQUESTS === 'false') {
    return NextResponse.json(
      { error: 'Publishing disabled when LIVE_REQUESTS is false' },
      { status: 403 }
    );
  }

  try {
    const { results } = await request.json();

    const blob = await put('results.json', JSON.stringify(results, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      message: 'Published! polybius.world will show new results on next load.'
    });

  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json(
      { error: 'Publish failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
