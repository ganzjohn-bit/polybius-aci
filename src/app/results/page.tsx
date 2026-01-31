'use client';

import { useEffect, useState } from 'react';

import type { ModelUsed, StoredResults } from '@/types/results';
import { DEFAULT_RESULTS, factors } from '@/data/results-constants';
import { hasSocialSignals, hasValidScores } from '@/lib/results-utils';

import AnalysisSummary from '@/components/results/AnalysisSummary';
import FactorBreakdown from '@/components/results/FactorBreakdown';
import HistoricalComparison from '@/components/results/HistoricalComparison';
import LoadingState from '@/components/results/LoadingState';
import OverallScoreCard from '@/components/results/OverallScoreCard';
import ResultsFooter from '@/components/results/ResultsFooter';
import ResultsHeader from '@/components/results/ResultsHeader';
import SocialSignalsPanel from '@/components/results/SocialSignals/SocialSignalsPanel';
import TheoreticalModels from '@/components/results/TheoreticalModels';
import VitalSignsMonitor from '@/components/results/VitalSignsMonitor/VitalSignsMonitor';

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

  const hasScores = hasValidScores(displayResults.scores);
  const hasSignals = hasSocialSignals(displayResults.socialSignals);
  const socialSignals =
    displayResults.socialSignals ??
    ({ trends: null, opEds: null, eliteSignals: null, bluesky: null, marketSignals: null } as const);
  const modelsUsed: ModelUsed[] = Array.isArray(displayResults.modelsUsed)
    ? displayResults.modelsUsed
    : displayResults.modelsUsed
      ? Object.values(displayResults.modelsUsed as Record<string, ModelUsed>)
      : [];

  if (loading) {
    return <LoadingState type="loading" />;
  }

  if (fetchError && !results) {
    return <LoadingState type="error" />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        <ResultsHeader country={displayResults.country} generatedAt={displayResults.generatedAt} />

        <OverallScoreCard aciScore={displayResults.aciScore} country={displayResults.country} />

        {displayResults.summary && <AnalysisSummary summary={displayResults.summary} />}

        {hasScores && (
          <VitalSignsMonitor
            scores={displayResults.scores}
            factorResults={displayResults.factorResults}
            overallScore={displayResults.aciScore}
            factors={factors}
          />
        )}

        {Object.keys(displayResults.factorResults).length > 0 && (
          <FactorBreakdown factorResults={displayResults.factorResults} factors={factors} />
        )}

        {hasSignals && <SocialSignalsPanel socialSignals={socialSignals} />}

        {modelsUsed.length > 0 && <TheoreticalModels modelsUsed={modelsUsed} factors={factors} />}

        {displayResults.historicalComparison && (
          <HistoricalComparison historicalComparison={displayResults.historicalComparison} />
        )}

        <ResultsFooter />
      </div>
    </div>
  );
}
