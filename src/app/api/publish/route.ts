import { NextRequest, NextResponse } from 'next/server';

// This endpoint commits results.json to GitHub, triggering a Vercel redeploy
// Requires GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables

export async function POST(request: NextRequest) {
  try {
    const { results } = await request.json();

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json(
        { error: 'GitHub configuration missing. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables.' },
        { status: 500 }
      );
    }

    const path = 'public/results.json';
    const content = JSON.stringify(results, null, 2);
    const contentBase64 = Buffer.from(content).toString('base64');

    // Get the current file's SHA (required for updates)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Polybius-App'
        }
      }
    );

    let sha: string | undefined;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    // Commit the new content
    const updateResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Polybius-App',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update results - ${new Date().toISOString()}`,
          content: contentBase64,
          sha: sha
        })
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.text();
      console.error('GitHub API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to publish to GitHub', details: errorData },
        { status: updateResponse.status }
      );
    }

    const result = await updateResponse.json();

    return NextResponse.json({
      success: true,
      commitSha: result.commit.sha,
      message: 'Results published! Site will update in ~30 seconds.'
    });

  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json(
      { error: 'Publish failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
