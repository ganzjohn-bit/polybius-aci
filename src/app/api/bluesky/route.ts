import { NextRequest, NextResponse } from 'next/server';
import { BskyAgent } from '@atproto/api';

// Political search terms to track
const POLITICAL_TERMS = [
  'democracy',
  'authoritarian',
  'trump',
  'fascism',
  'dictatorship',
  'constitution',
  'courts',
  'election',
  'protest',
  'free speech',
  'censorship'
];

// Key political accounts to track (handles without @)
const KEY_ACCOUNTS = [
  // Journalists
  'mabordes.bsky.social',
  'jayrosen.bsky.social',
  'dangillmor.bsky.social',
  // Academics/researchers
  'ruthbenghiat.bsky.social', // Author of Strongmen
  'timothysnyder.bsky.social', // Yale historian
  // News orgs
  'nytimes.bsky.social',
  'washingtonpost.bsky.social',
  'theatlantic.bsky.social',
  'axios.bsky.social'
];

interface BlueSkyPost {
  text: string;
  author: string;
  authorHandle: string;
  createdAt: string;
  likeCount: number;
  repostCount: number;
  replyCount: number;
  sentiment: 'negative' | 'neutral' | 'positive';
  stressIndicators: string[];
  uri: string;
}

interface SentimentBreakdown {
  negative: number;
  neutral: number;
  positive: number;
}

export async function POST(request: NextRequest) {
  try {
    const { country } = await request.json();

    // Create unauthenticated agent for public data
    const agent = new BskyAgent({ service: 'https://public.api.bsky.app' });

    const allPosts: BlueSkyPost[] = [];
    const errors: string[] = [];

    // Search for political terms + country
    const searchTerms = country
      ? POLITICAL_TERMS.map(term => `${term} ${country}`).slice(0, 5)
      : POLITICAL_TERMS.slice(0, 8);

    for (const term of searchTerms) {
      try {
        const response = await agent.app.bsky.feed.searchPosts({
          q: term,
          limit: 25,
          sort: 'latest'
        });

        if (response.data.posts) {
          for (const post of response.data.posts) {
            const text = post.record && typeof post.record === 'object' && 'text' in post.record
              ? String(post.record.text)
              : '';

            const sentiment = analyzeSentiment(text);
            const stressIndicators = findStressIndicators(text);

            allPosts.push({
              text: text.slice(0, 500),
              author: post.author.displayName || post.author.handle,
              authorHandle: post.author.handle,
              createdAt: post.record && typeof post.record === 'object' && 'createdAt' in post.record
                ? String(post.record.createdAt)
                : '',
              likeCount: post.likeCount || 0,
              repostCount: post.repostCount || 0,
              replyCount: post.replyCount || 0,
              sentiment,
              stressIndicators,
              uri: post.uri
            });
          }
        }

        // Rate limit protection
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (err) {
        errors.push(`Search "${term}" failed: ${err instanceof Error ? err.message : 'Unknown'}`);
      }
    }

    // Deduplicate by URI
    const seen = new Set<string>();
    const uniquePosts = allPosts.filter(post => {
      if (seen.has(post.uri)) return false;
      seen.add(post.uri);
      return true;
    });

    // Sort by engagement
    const sortedPosts = uniquePosts.sort((a, b) =>
      (b.likeCount + b.repostCount * 2) - (a.likeCount + a.repostCount * 2)
    );

    // Calculate sentiment breakdown
    const sentimentBreakdown: SentimentBreakdown = {
      negative: uniquePosts.filter(p => p.sentiment === 'negative').length,
      neutral: uniquePosts.filter(p => p.sentiment === 'neutral').length,
      positive: uniquePosts.filter(p => p.sentiment === 'positive').length
    };

    // Calculate stress indicators frequency
    const indicatorCounts: Record<string, number> = {};
    for (const post of uniquePosts) {
      for (const indicator of post.stressIndicators) {
        indicatorCounts[indicator] = (indicatorCounts[indicator] || 0) + 1;
      }
    }
    const topIndicators = Object.entries(indicatorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([indicator, count]) => ({ indicator, count }));

    // Calculate engagement-weighted sentiment
    let weightedNegative = 0;
    let weightedPositive = 0;
    let totalWeight = 0;

    for (const post of uniquePosts) {
      const weight = 1 + (post.likeCount * 0.1) + (post.repostCount * 0.3);
      totalWeight += weight;
      if (post.sentiment === 'negative') weightedNegative += weight;
      if (post.sentiment === 'positive') weightedPositive += weight;
    }

    const engagementWeightedSentiment = totalWeight > 0
      ? Math.round(((weightedNegative - weightedPositive) / totalWeight) * 50 + 50)
      : 50;

    // Calculate overall temperature (0-100, higher = more stressed)
    const totalPosts = uniquePosts.length;
    const negativeRatio = totalPosts > 0 ? sentimentBreakdown.negative / totalPosts : 0;
    const indicatorDensity = totalPosts > 0
      ? uniquePosts.reduce((sum, p) => sum + p.stressIndicators.length, 0) / totalPosts
      : 0;

    const temperature = Math.min(100, Math.round(
      (negativeRatio * 40) +
      (indicatorDensity * 20) +
      (engagementWeightedSentiment * 0.4)
    ));

    // Generate interpretation
    const interpretation = generateInterpretation(
      sentimentBreakdown,
      topIndicators,
      temperature,
      uniquePosts.length
    );

    return NextResponse.json({
      country: country || 'General',
      totalPosts: uniquePosts.length,
      posts: sortedPosts.slice(0, 30),
      sentimentBreakdown,
      topIndicators,
      temperature,
      engagementWeightedSentiment,
      interpretation,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Bluesky error:', error);
    return NextResponse.json(
      { error: 'Bluesky analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function analyzeSentiment(text: string): 'negative' | 'neutral' | 'positive' {
  const lower = text.toLowerCase();

  const negativePatterns = [
    /authoritarian|dictator|fascis|tyran/i,
    /dangerous|threat|scary|terrif/i,
    /corrupt|criminal|illegal|unconstitution/i,
    /destroy|attack|assault|violat/i,
    /worried|concerned|afraid|fear/i,
    /disaster|catastroph|crisis|chaos/i,
    /hate|disgust|appall|horrif/i,
    /end of democracy|death of|dying/i
  ];

  const positivePatterns = [
    /hope|optimis|encouraged/i,
    /victory|win|success|triumph/i,
    /strong|resilient|resist/i,
    /progress|improve|reform/i,
    /protect|defend|safeguard/i,
    /united|together|solidarity/i
  ];

  let negScore = negativePatterns.filter(p => p.test(lower)).length;
  let posScore = positivePatterns.filter(p => p.test(lower)).length;

  // Check for negation that might flip sentiment
  if (/not\s+(worried|concerned|afraid)/i.test(lower)) {
    negScore--;
    posScore++;
  }

  if (negScore > posScore + 1) return 'negative';
  if (posScore > negScore + 1) return 'positive';
  return 'neutral';
}

function findStressIndicators(text: string): string[] {
  const indicators: string[] = [];
  const lower = text.toLowerCase();

  const patterns: [RegExp, string][] = [
    [/authoritarian|autocra|dictator/i, 'authoritarian rhetoric'],
    [/fascis|nazi|hitler/i, 'fascism comparisons'],
    [/coup|insurrection|overthrow/i, 'coup/insurrection concerns'],
    [/constitution.*violat|unconstitution/i, 'constitutional concerns'],
    [/democracy.*dying|end of democracy|death of democracy/i, 'democracy death fears'],
    [/court.*pack|supreme court/i, 'judicial concerns'],
    [/election.*steal|stolen election|rigged/i, 'election legitimacy'],
    [/censor|ban|silence/i, 'censorship concerns'],
    [/protest|resist|march/i, 'resistance activity'],
    [/flee|leave.*country|emigrat/i, 'emigration mentions'],
    [/arrest.*political|political prisoner/i, 'political persecution'],
    [/media.*attack|press.*enemy|fake news/i, 'press freedom concerns']
  ];

  for (const [pattern, indicator] of patterns) {
    if (pattern.test(lower)) {
      indicators.push(indicator);
    }
  }

  return indicators;
}

function generateInterpretation(
  sentiment: SentimentBreakdown,
  indicators: { indicator: string; count: number }[],
  temperature: number,
  totalPosts: number
): string[] {
  const signals: string[] = [];

  if (totalPosts < 10) {
    signals.push('Limited data available - interpretations may not be representative');
    return signals;
  }

  // Temperature assessment
  if (temperature > 70) {
    signals.push(`HIGH STRESS (${temperature}/100): Bluesky discourse shows significant democratic anxiety`);
  } else if (temperature > 50) {
    signals.push(`ELEVATED STRESS (${temperature}/100): Moderate concern in Bluesky political discourse`);
  } else {
    signals.push(`LOW STRESS (${temperature}/100): Relatively calm political discourse on Bluesky`);
  }

  // Sentiment analysis
  const total = sentiment.negative + sentiment.neutral + sentiment.positive;
  const negPct = Math.round((sentiment.negative / total) * 100);
  if (negPct > 60) {
    signals.push(`${negPct}% negative sentiment - pessimistic discourse dominates`);
  } else if (negPct > 40) {
    signals.push(`${negPct}% negative sentiment - mixed but concerned discourse`);
  }

  // Top indicators
  if (indicators.length > 0) {
    const topThree = indicators.slice(0, 3).map(i => i.indicator).join(', ');
    signals.push(`Top concerns: ${topThree}`);
  }

  // Specific indicator signals
  const hasEmigration = indicators.some(i => i.indicator === 'emigration mentions');
  const hasFascism = indicators.some(i => i.indicator === 'fascism comparisons');
  const hasDemocracyDeath = indicators.some(i => i.indicator === 'democracy death fears');

  if (hasEmigration && hasDemocracyDeath) {
    signals.push('WARNING: Both emigration talk and democracy death fears present - significant anxiety');
  }
  if (hasFascism) {
    signals.push('Fascism comparisons present in discourse - historical parallels being drawn');
  }

  return signals;
}
