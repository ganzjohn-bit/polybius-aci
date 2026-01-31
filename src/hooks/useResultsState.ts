'use client';

import { useEffect, useState, useMemo } from 'react';
import type { ModelUsed, StoredResults } from '@/types/results';
import type { ModelScore, ClusterAverage, Scores, TheoreticalModel, Factor } from '@/types/calculator';
import { DEFAULT_RESULTS, factors, RISK_LEVELS } from '@/data/results-constants';
import { clusterLabels, factors as calculatorFactors } from '@/data/calculator-constants';
import { hasSocialSignals, hasValidScores } from '@/lib/results-utils';
import { getModelScores, getClusterAverages } from '@/lib/calculator-utils';

const BLOB_URL = 'https://iube3munpbzbmeja.public.blob.vercel-storage.com/results.json';

const DEFAULT_SOCIAL_SIGNALS = {
  trends: null,
  opEds: null,
  eliteSignals: null,
  bluesky: null,
  marketSignals: null,
} as const;

export function useResultsState() {
  const [results, setResults] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Fetch results on mount
  useEffect(() => {
    fetch(BLOB_URL, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
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

  // Use fetched results or defaults
  const displayResults = results || DEFAULT_RESULTS;

  // Derived state
  const hasScores = hasValidScores(displayResults.scores);
  const hasSignals = hasSocialSignals(displayResults.socialSignals);
  const socialSignals = displayResults.socialSignals ?? DEFAULT_SOCIAL_SIGNALS;

  // Normalize modelsUsed to array
  const modelsUsed: ModelUsed[] = useMemo(() => {
    if (Array.isArray(displayResults.modelsUsed)) {
      return displayResults.modelsUsed;
    }
    if (displayResults.modelsUsed) {
      return Object.values(displayResults.modelsUsed as Record<string, ModelUsed>);
    }
    return [];
  }, [displayResults.modelsUsed]);

  // Compute model comparison data
  const modelComparisonData = useMemo(() => {
    if (!modelsUsed.length || !hasScores) {
      return null;
    }

    // Convert scores to the Scores type expected by getModelScores
    const scores = displayResults.scores as unknown as Scores;

    // ModelUsed is compatible with TheoreticalModel for getModelScores
    const modelScores = getModelScores(
      modelsUsed as unknown as TheoreticalModel[],
      scores,
      calculatorFactors as Factor[]
    );

    const clusterAverages = getClusterAverages(modelScores, clusterLabels);

    // Calculate statistics
    const meanScore = modelScores.reduce((sum, m) => sum + m.score, 0) / modelScores.length;
    const variance = modelScores.reduce((sum, m) => sum + Math.pow(m.score - meanScore, 2), 0) / modelScores.length;
    const stdDev = Math.sqrt(variance);

    return {
      modelScores,
      clusterAverages,
      meanScore,
      stdDev,
    };
  }, [modelsUsed, displayResults.scores, hasScores]);

  // Check if we have factor results
  const hasFactorResults = Object.keys(displayResults.factorResults).length > 0;

  return {
    // Loading state
    loading,
    fetchError,
    hasResults: !!results,

    // Display data
    displayResults,
    factors,

    // Derived flags
    hasScores,
    hasSignals,
    hasFactorResults,

    // Normalized data
    socialSignals,
    modelsUsed,

    // Model comparison data
    modelScores: modelComparisonData?.modelScores ?? [],
    clusterAverages: modelComparisonData?.clusterAverages ?? [],
    meanScore: modelComparisonData?.meanScore ?? 0,
    stdDev: modelComparisonData?.stdDev ?? 0,
    clusterLabels,
    hasModelComparison: !!modelComparisonData,
  };
}
