import { NextRequest, NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';

interface TrendResult {
  keyword: string;
  category: string;
  timeline: { date: string; value: number }[];
  averageInterest: number;
  recentSpike: boolean;
  percentChange: number;
}

export async function POST(request: NextRequest) {
  try {
    const { country, countryCode } = await request.json();

    if (!country) {
      return NextResponse.json({ error: 'Country required' }, { status: 400 });
    }

    // Search terms by category
    const searchTerms = {
      exit: [
        `emigrate from ${country}`,
        `leave ${country}`,
        `${country} visa`,
        'political asylum'
      ],
      resistance: [
        `${country} protest`,
        `${country} demonstration`,
        `${country} strike`
      ],
      naming: [
        `${country} dictatorship`,
        `${country} authoritarian`,
        `${country} fascism`,
        `${country} coup`
      ],
      institutional: [
        `${country} election fraud`,
        `${country} rigged election`,
        `${country} constitution`
      ],
      pressFreedom: [
        `${country} censorship`,
        `${country} journalist arrested`,
        `${country} VPN`,
        `${country} internet shutdown`
      ]
    };

    const results: TrendResult[] = [];
    const errors: string[] = [];

    // Process each category
    for (const [category, keywords] of Object.entries(searchTerms)) {
      for (const keyword of keywords) {
        try {
          const trendData = await googleTrends.interestOverTime({
            keyword: keyword,
            startTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
            geo: countryCode || '',
          });

          const parsed = JSON.parse(trendData);

          if (parsed.default?.timelineData?.length > 0) {
            const timeline = parsed.default.timelineData.map((point: { formattedTime: string; value: number[] }) => ({
              date: point.formattedTime,
              value: point.value[0]
            }));

            // Calculate metrics
            const values = timeline.map((t: { value: number }) => t.value);
            const averageInterest = values.reduce((a: number, b: number) => a + b, 0) / values.length;

            // Compare last 2 weeks to previous period
            const recentValues = values.slice(-14);
            const previousValues = values.slice(-28, -14);
            const recentAvg = recentValues.reduce((a: number, b: number) => a + b, 0) / recentValues.length;
            const previousAvg = previousValues.length > 0
              ? previousValues.reduce((a: number, b: number) => a + b, 0) / previousValues.length
              : recentAvg;

            const percentChange = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0;
            const recentSpike = percentChange > 50; // 50% increase = spike

            results.push({
              keyword,
              category,
              timeline,
              averageInterest: Math.round(averageInterest),
              recentSpike,
              percentChange: Math.round(percentChange)
            });
          }

          // Rate limit - Google Trends doesn't like rapid requests
          await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (err) {
          errors.push(`Failed to fetch "${keyword}": ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
    }

    // Aggregate by category
    const categoryAggregates = Object.keys(searchTerms).map(category => {
      const categoryResults = results.filter(r => r.category === category);
      const avgInterest = categoryResults.length > 0
        ? categoryResults.reduce((sum, r) => sum + r.averageInterest, 0) / categoryResults.length
        : 0;
      const avgChange = categoryResults.length > 0
        ? categoryResults.reduce((sum, r) => sum + r.percentChange, 0) / categoryResults.length
        : 0;
      const hasSpike = categoryResults.some(r => r.recentSpike);

      return {
        category,
        avgInterest: Math.round(avgInterest),
        avgChange: Math.round(avgChange),
        hasSpike,
        topKeyword: categoryResults.sort((a, b) => b.averageInterest - a.averageInterest)[0]?.keyword || null
      };
    });

    // Calculate overall "temperature"
    const overallTemperature = Math.min(100, Math.round(
      categoryAggregates.reduce((sum, c) => sum + c.avgInterest, 0) / categoryAggregates.length
    ));

    const interpretation = interpretResults(categoryAggregates);

    return NextResponse.json({
      country,
      results,
      categoryAggregates,
      overallTemperature,
      interpretation,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Trends error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trends', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function interpretResults(categories: { category: string; avgInterest: number; avgChange: number; hasSpike: boolean }[]) {
  const signals: string[] = [];

  const exit = categories.find(c => c.category === 'exit');
  const resistance = categories.find(c => c.category === 'resistance');
  const naming = categories.find(c => c.category === 'naming');
  const institutional = categories.find(c => c.category === 'institutional');
  const press = categories.find(c => c.category === 'pressFreedom');

  if (exit && exit.hasSpike) {
    signals.push('EXIT SIGNAL: Spike in emigration searches - educated class may be losing faith');
  }
  if (exit && exit.avgChange > 30) {
    signals.push(`Exit searches up ${exit.avgChange}% - watch for brain drain indicators`);
  }

  if (naming && naming.hasSpike) {
    signals.push('NAMING SIGNAL: Population increasingly labeling situation as authoritarian');
  }
  if (naming && naming.avgInterest > 50) {
    signals.push('High awareness of authoritarian dynamics in search behavior');
  }

  if (resistance && resistance.hasSpike && exit && exit.hasSpike) {
    signals.push('WARNING: Both protest AND emigration spiking - resistance may be failing, people choosing exit over voice');
  } else if (resistance && resistance.hasSpike) {
    signals.push('RESISTANCE SIGNAL: Protest-related searches spiking - active contestation or crackdown fears');
  }

  if (institutional && institutional.hasSpike) {
    signals.push('INSTITUTIONAL ANXIETY: Spike in election/constitution searches - legitimacy concerns rising');
  }

  if (press && press.hasSpike) {
    signals.push('PRESS FREEDOM ALERT: Censorship/VPN searches spiking - information control may be tightening');
  }
  if (press && press.avgInterest > 40) {
    signals.push('Elevated interest in circumventing information controls');
  }

  if (signals.length === 0) {
    signals.push('No significant stress signals detected in search trends');
  }

  return signals;
}
