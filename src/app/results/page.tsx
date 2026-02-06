'use client';

import AnalysisSummary from '@/components/results/AnalysisSummary';
import FactorBreakdown from '@/components/results/FactorBreakdown';
import HistoricalComparison from '@/components/results/HistoricalComparison';
import LoadingState from '@/components/results/LoadingState';
import ModelComparisonSection from '@/components/results/ModelComparisonSection';
import ResultsFooter from '@/components/results/ResultsFooter';
import ResultsHeader from '@/components/results/ResultsHeader';
import SocialSignalsPanel from '@/components/results/SocialSignalsPanel';
import OverallScoreCard from '@/components/ui/OverallScoreCard';
import VitalSignsMonitor from '@/components/ui/VitalSignsMonitor';
import { factors } from '@/data/constants';
import { getModelScores } from '@/lib/model-utils';
import { ModelScore, Scores, TheoreticalModel } from '@/types/calculator';
import type { StoredResults } from '@/types/results';
import { useEffect, useState } from 'react';

const DEFAULT_RESULTS: StoredResults = {
  generatedAt: new Date().toISOString(),
  country: 'United States',
  aciScore: 0,
  riskLevel: 'Awaiting Analysis',
  scores: {
    judicial: 35,
    federalism: 45,
    political: 10,
    media: 40,
    civil: 35,
    publicOpinion: 35,
    mobilizationalBalance: 35,
    stateCapacity: 55,
    corporateCompliance: 25,
    electionInterference: 20
  },
  summary: 'No results have been published yet. Results are generated using Claude AI with real-time web search and published from the live analysis tool at app.polybius.world.',
  factorResults: {},
};

export default function ResultsPage() {
  const [results, setResults] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // Fetch directly from blob storage to avoid server-side fetch issues
    const BLOB_URL = 'https://iube3munpbzbmeja.public.blob.vercel-storage.com/results.json';
    fetch(BLOB_URL, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Only update if we got valid data with an ACI score
        if (!data.error && typeof data.aciScore === 'number' && data.aciScore > 0) {
          setResults(data);
        } else {
          setFetchError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch results:', err);
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  // Use fetched results or show defaults only after fetch completes
  const displayResults = results || DEFAULT_RESULTS;

  const getRiskLevel = (score: number) => {
    if (score < 25) return { level: 'Stable Democracy', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' };
    if (score < 40) return { level: 'Democratic Stress', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' };
    if (score < 50) return { level: 'Competitive Authoritarian Risk', color: 'bg-orange-400', textColor: 'text-orange-700', bgLight: 'bg-orange-50' };
    if (score < 65) return { level: 'DANGER ZONE', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' };
    if (score < 80) return { level: 'Consolidating Authoritarianism', color: 'bg-red-700', textColor: 'text-red-800', bgLight: 'bg-red-100' };
    return { level: 'Authoritarian Regime', color: 'bg-red-900', textColor: 'text-red-900', bgLight: 'bg-red-200' };
  };

  const getProbability = (score: number) => {
    if (score < 25) return '0-5%';
    if (score < 40) return '5-15%';
    if (score < 50) return '15-35%';
    if (score < 65) return '35-60%';
    if (score < 80) return '60-85%';
    return '85%+';
  };

  const factorTrends: Record<string, string | undefined> = {};
  factors.forEach(factor => {
    factorTrends[factor.id] = displayResults.factorResults?.[factor.id]?.trend;
  });

  const hasScores = Object.keys(displayResults.scores).length > 0 && Object.values(displayResults.scores).some(s => s > 0);
  const { trends, opEds, eliteSignals, bluesky, marketSignals } = displayResults.socialSignals || {};
  const hasSocialSignals = trends || opEds || eliteSignals || bluesky || marketSignals;

  if (loading) {
    return (
      <LoadingState type='loading' />
    );
  }

  // If fetch failed and no results, show error state
  if (fetchError && !results) {
    return (
      <LoadingState type='error' />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <ResultsHeader country={displayResults.country} generatedAt={displayResults.generatedAt}
        />

        {/* Overall Score */}
        <OverallScoreCard aciScore={displayResults.aciScore} risk={getRiskLevel(displayResults.aciScore)} probability={getProbability(displayResults.aciScore)} />

        {/* Summary */}
        {displayResults.summary && (
          <AnalysisSummary summary={displayResults.summary} />
        )}

        {/* Vital Signs Dashboard */}
        {hasScores && (
          <VitalSignsMonitor
            scores={displayResults.scores}
            overallScore={displayResults.aciScore}
            factors={factors}
            trends={factorTrends}
          />
        )}

        {/* Social Signals Dashboard */}
        {hasSocialSignals && (
          <SocialSignalsPanel socialSignals={displayResults.socialSignals} />
        )}

        {/* Theoretical Model Scores & Diagnoses */}
        {displayResults.modelsUsed && displayResults.modelsUsed.length > 0 && (() => {
          // Compute per-model scores from factor scores + model weights

          const modelScores: ModelScore[] = getModelScores(displayResults.modelsUsed as TheoreticalModel[], displayResults.scores as unknown as Scores, factors);
          const hasNonZeroScores = modelScores.some(m => m.score > 0);

          return (
            <ModelComparisonSection modelScores={modelScores} hasNonZeroScores={hasNonZeroScores} />
          );
        })()};

        {/* Factor Breakdown with Evidence */}
        {Object.keys(displayResults.factorResults).length > 0 && (
          <FactorBreakdown factorResults={displayResults.factorResults} factors={factors} />
        )}

        {/* Historical Comparison */}
        {displayResults.historicalComparison && (
          <HistoricalComparison historicalComparison={displayResults.historicalComparison} />
        )}

        {/* Footer */}
        <ResultsFooter/>
        </div>
    </div>
  );
}
