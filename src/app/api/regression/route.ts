import { NextRequest, NextResponse } from 'next/server';
import { historicalCases } from '@/data/historical-cases';
import {
  runFullComparativeAnalysis,
  generateComparativePrediction,
  getFactorAnalysis,
  ModelWeights
} from '@/lib/regression';

// Theoretical models with their weights (from page.tsx)
const THEORETICAL_MODELS: { name: string; weights: ModelWeights }[] = [
  {
    name: 'Levitsky-Ziblatt',
    weights: {
      judicial: 0.20, federalism: 0.05, political: 0.25, media: 0.15,
      civil: 0.10, publicOpinion: 0.05, mobilizationalBalance: 0.05,
      stateCapacity: 0.05, corporateCompliance: 0.05, electionInterference: 0.05
    }
  },
  {
    name: 'Svolik',
    weights: {
      judicial: 0.10, federalism: 0.05, political: 0.15, media: 0.10,
      civil: 0.05, publicOpinion: 0.20, mobilizationalBalance: 0.10,
      stateCapacity: 0.10, corporateCompliance: 0.10, electionInterference: 0.05
    }
  },
  {
    name: 'Marxian/Kaleckian',
    weights: {
      judicial: 0.05, federalism: 0.00, political: 0.10, media: 0.15,
      civil: 0.05, publicOpinion: 0.10, mobilizationalBalance: 0.10,
      stateCapacity: 0.10, corporateCompliance: 0.30, electionInterference: 0.05
    }
  },
  {
    name: 'Gramscian/Hall',
    weights: {
      judicial: 0.05, federalism: 0.05, political: 0.10, media: 0.25,
      civil: 0.15, publicOpinion: 0.15, mobilizationalBalance: 0.10,
      stateCapacity: 0.05, corporateCompliance: 0.05, electionInterference: 0.05
    }
  },
  {
    name: 'Paxton',
    weights: {
      judicial: 0.10, federalism: 0.05, political: 0.15, media: 0.10,
      civil: 0.15, publicOpinion: 0.10, mobilizationalBalance: 0.15,
      stateCapacity: 0.10, corporateCompliance: 0.10, electionInterference: 0.00
    }
  },
  {
    name: 'Frankfurt School',
    weights: {
      judicial: 0.05, federalism: 0.05, political: 0.10, media: 0.25,
      civil: 0.05, publicOpinion: 0.30, mobilizationalBalance: 0.05,
      stateCapacity: 0.05, corporateCompliance: 0.10, electionInterference: 0.00
    }
  },
  {
    name: 'Berman-Riley',
    weights: {
      judicial: 0.05, federalism: 0.05, political: 0.10, media: 0.10,
      civil: 0.10, publicOpinion: 0.10, mobilizationalBalance: 0.30,
      stateCapacity: 0.05, corporateCompliance: 0.10, electionInterference: 0.05
    }
  },
  {
    name: 'Classical Republican',
    weights: {
      judicial: 0.15, federalism: 0.15, political: 0.10, media: 0.05,
      civil: 0.15, publicOpinion: 0.20, mobilizationalBalance: 0.05,
      stateCapacity: 0.05, corporateCompliance: 0.05, electionInterference: 0.05
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    // Return historical cases and factor analysis for reference
    const caseSummaries = historicalCases.map(c => ({
      id: c.id,
      country: c.country,
      period: c.period,
      yearStart: c.yearStart,
      yearEnd: c.yearEnd,
      outcome: c.outcome,
      outcomeScore: c.outcomeScore,
      factors: c.factors,
      notes: c.notes
    }));

    const factorAnalysis = getFactorAnalysis();

    return NextResponse.json({
      historicalCases: caseSummaries,
      factorAnalysis,
      availableModels: THEORETICAL_MODELS.map(m => m.name),
      usage: 'POST with { factors: {...}, models?: [...] } to run comparative analysis'
    });

  } catch (error) {
    console.error('Historical cases error:', error);
    return NextResponse.json(
      { error: 'Failed to load historical cases', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}

// POST runs comparative analysis with current factors
export async function POST(request: NextRequest) {
  try {
    const { factors, models } = await request.json();

    if (!factors) {
      return NextResponse.json({ error: 'Factors required (e.g., { judicial: 45, political: 50, ... })' }, { status: 400 });
    }

    // Use specified models or all theoretical models
    const modelsToUse = models
      ? THEORETICAL_MODELS.filter(m => models.includes(m.name))
      : THEORETICAL_MODELS;

    if (modelsToUse.length === 0) {
      return NextResponse.json({ error: 'No valid models specified' }, { status: 400 });
    }

    // Run comparative analysis
    const analysis = runFullComparativeAnalysis(factors, modelsToUse);

    return NextResponse.json({
      inputFactors: factors,
      comparativeAnalysis: analysis.byModel,
      consensus: analysis.consensus,
      mostCitedCases: analysis.mostCitedCases,
      interpretation: generateInterpretation(analysis)
    });

  } catch (error) {
    console.error('Comparative analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}

function generateInterpretation(analysis: ReturnType<typeof runFullComparativeAnalysis>): string[] {
  const lines: string[] = [];

  // Consensus summary
  lines.push(analysis.consensus.summary);

  // Model agreement or disagreement
  if (analysis.consensus.agreementLevel === 'low') {
    const scores = analysis.byModel.map(m => `${m.modelName}: ${m.predictedOutcome.score}`);
    lines.push(`Models disagree significantly: ${scores.join(', ')}`);
  }

  // Most concerning signals (across models)
  const allWarnings = analysis.byModel.flatMap(m => m.warningSignals);
  const warningCounts: Record<string, number> = {};
  for (const w of allWarnings) {
    const factor = w.split(' ')[0];
    warningCounts[factor] = (warningCounts[factor] || 0) + 1;
  }
  const topWarnings = Object.entries(warningCounts)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1]);

  if (topWarnings.length > 0) {
    lines.push(`Cross-model warning signals: ${topWarnings.map(([f, c]) => `${f} (${c} models)`).join(', ')}`);
  }

  // Hopeful signals
  const allHopeful = analysis.byModel.flatMap(m => m.hopefulSignals);
  const hopefulCounts: Record<string, number> = {};
  for (const h of allHopeful) {
    const factor = h.split(' ')[0];
    hopefulCounts[factor] = (hopefulCounts[factor] || 0) + 1;
  }
  const topHopeful = Object.entries(hopefulCounts)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1]);

  if (topHopeful.length > 0) {
    lines.push(`Cross-model hopeful signals: ${topHopeful.map(([f, c]) => `${f} (${c} models)`).join(', ')}`);
  }

  // Key historical comparison
  if (analysis.mostCitedCases[0]) {
    const topCase = analysis.mostCitedCases[0];
    lines.push(`Most relevant historical parallel: ${topCase.country} ${topCase.period} (${topCase.outcome}) - cited by ${topCase.citedBy.join(', ')}`);
  }

  return lines;
}
