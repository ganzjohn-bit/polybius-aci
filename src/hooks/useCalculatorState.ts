'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  Scores,
  ResearchResults,
  TrendsData,
  OpEdData,
  EliteSignalsData,
  BlueskyData,
  MarketSignalsData,
  ComparativeAnalysisData,
  PublishStatus,
  TheoreticalModel,
  Factor,
} from '@/types/calculator';
import { theoreticalModels, factors, clusterLabels } from '@/data/calculator-constants';
import {
  calculateACI,
  getRiskLevel,
  getProbability,
  getActiveWeights,
  getModelScores,
  getClusterAverages,
  synthesizeFactorAdjustments,
} from '@/lib/calculator-utils';
import type { SearchMode } from '@/components/calculator/SearchModeToggle';

const initialScores: Scores = {
  judicial: 0,
  federalism: 0,
  political: 0,
  media: 0,
  civil: 0,
  publicOpinion: 0,
  mobilizationalBalance: 0,
  stateCapacity: 0,
  corporateCompliance: 0,
  electionInterference: 0,
};

const initialActiveModels: Record<string, boolean> = {
  linz: false,
  levitsky: false,
  marxian: false,
  kaleckiAR: false,
  tocqueville: false,
  gramscian: false,
  svolik: false,
  gameTheory: false,
  classical: false,
  paxton: false,
  bermanRiley: false,
};

export function useCalculatorState() {
  // Core state
  const [scores, setScores] = useState<Scores>(initialScores);
  const [country, setCountry] = useState('');
  const [activeModels, setActiveModels] = useState<Record<string, boolean>>(initialActiveModels);

  // Research state
  const [isResearching, setIsResearching] = useState(false);
  const [researchResults, setResearchResults] = useState<ResearchResults | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>('quick');
  const [error, setError] = useState('');

  // API keys
  const [apiKey, setApiKey] = useState('');
  const [newsApiKey, setNewsApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Social signals
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [opEdData, setOpEdData] = useState<OpEdData | null>(null);
  const [eliteSignalsData, setEliteSignalsData] = useState<EliteSignalsData | null>(null);
  const [blueskyData, setBlueskyData] = useState<BlueskyData | null>(null);
  const [marketSignalsData, setMarketSignalsData] = useState<MarketSignalsData | null>(null);
  const [isFetchingTrends, setIsFetchingTrends] = useState(false);
  const [isFetchingOpEds, setIsFetchingOpEds] = useState(false);
  const [isFetchingEliteSignals, setIsFetchingEliteSignals] = useState(false);
  const [isFetchingBluesky, setIsFetchingBluesky] = useState(false);
  const [isFetchingMarkets, setIsFetchingMarkets] = useState(false);
  const [socialError, setSocialError] = useState('');

  // Comparative analysis
  const [comparativeData, setComparativeData] = useState<ComparativeAnalysisData | null>(null);
  const [isFetchingComparative, setIsFetchingComparative] = useState(false);

  // Publishing
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<PublishStatus | null>(null);

  // Client-side mounting
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    setMounted(true);
    const savedKey = localStorage.getItem('anthropic-api-key');
    if (savedKey) setApiKey(savedKey);
    const savedNewsKey = localStorage.getItem('news-api-key');
    if (savedNewsKey) setNewsApiKey(savedNewsKey);
  }, []);

  // Save API key
  const saveApiKey = useCallback(() => {
    if (apiKey) localStorage.setItem('anthropic-api-key', apiKey);
    if (newsApiKey) localStorage.setItem('news-api-key', newsApiKey);
    setShowSettings(false);
  }, [apiKey, newsApiKey]);

  // Toggle model
  const toggleModel = useCallback((modelId: string) => {
    setActiveModels(prev => ({ ...prev, [modelId]: !prev[modelId] }));
  }, []);

  // Update score
  const updateScore = useCallback((factorId: string, value: number) => {
    setScores(prev => ({ ...prev, [factorId]: value }));
  }, []);

  // Research country
  const researchCountry = useCallback(async () => {
    if (!country.trim()) {
      setError('Please enter a country name');
      return;
    }

    if (!apiKey) {
      setShowSettings(true);
      setError('Please enter your Anthropic API key first');
      return;
    }

    setIsResearching(true);
    setResearchResults(null);
    setError('');

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, apiKey, searchMode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const results = await response.json();

      const newScores: Scores = { ...initialScores };
      factors.forEach(f => {
        if (results[f.id] && typeof results[f.id].score === 'number') {
          newScores[f.id as keyof Scores] = results[f.id].score;
        }
      });

      setScores(newScores);
      setResearchResults(results);

      // Auto-run comparative analysis
      setIsFetchingComparative(true);
      try {
        const compResponse = await fetch('/api/regression', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ factors: newScores }),
        });
        if (compResponse.ok) {
          const compData = await compResponse.json();
          setComparativeData(compData);
        }
      } catch {
        console.error('Comparative analysis failed');
      } finally {
        setIsFetchingComparative(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Research failed');
    } finally {
      setIsResearching(false);
    }
  }, [country, apiKey, searchMode]);

  // Fetch trends
  const fetchTrends = useCallback(async () => {
    if (!country.trim()) {
      setSocialError('Please enter a country name first');
      return;
    }

    setIsFetchingTrends(true);
    setSocialError('');

    try {
      const response = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      setTrendsData(data);
    } catch (err) {
      setSocialError(err instanceof Error ? err.message : 'Failed to fetch trends');
    } finally {
      setIsFetchingTrends(false);
    }
  }, [country]);

  // Fetch op-eds
  const fetchOpEds = useCallback(async () => {
    if (!country.trim()) {
      setSocialError('Please enter a country name first');
      return;
    }

    if (!apiKey) {
      setShowSettings(true);
      setSocialError('Please enter your Anthropic API key in settings');
      return;
    }

    setIsFetchingOpEds(true);
    setSocialError('');

    try {
      const response = await fetch('/api/op-eds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      setOpEdData(data);
    } catch (err) {
      setSocialError(err instanceof Error ? err.message : 'Failed to fetch op-eds');
    } finally {
      setIsFetchingOpEds(false);
    }
  }, [country, apiKey]);

  // Fetch elite signals
  const fetchEliteSignals = useCallback(async () => {
    if (!apiKey) {
      setShowSettings(true);
      setSocialError('Please enter your Anthropic API key in settings');
      return;
    }

    setIsFetchingEliteSignals(true);
    setSocialError('');

    try {
      const response = await fetch('/api/elite-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      setEliteSignalsData(data);
    } catch (err) {
      setSocialError(err instanceof Error ? err.message : 'Failed to fetch elite signals');
    } finally {
      setIsFetchingEliteSignals(false);
    }
  }, [apiKey]);

  // Fetch bluesky
  const fetchBluesky = useCallback(async () => {
    setIsFetchingBluesky(true);
    setSocialError('');

    try {
      const response = await fetch('/api/bluesky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: country.trim() || null }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      setBlueskyData(data);
    } catch (err) {
      setSocialError(err instanceof Error ? err.message : 'Failed to fetch Bluesky data');
    } finally {
      setIsFetchingBluesky(false);
    }
  }, [country]);

  // Fetch market signals
  const fetchMarketSignals = useCallback(async () => {
    if (!apiKey) {
      setSocialError('API key required for market analysis');
      return;
    }

    setIsFetchingMarkets(true);
    setSocialError('');

    try {
      const response = await fetch('/api/market-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      setMarketSignalsData(data);
    } catch (err) {
      setSocialError(err instanceof Error ? err.message : 'Failed to fetch market signals');
    } finally {
      setIsFetchingMarkets(false);
    }
  }, [apiKey]);

  // Synthesize signals
  const synthesizeSignals = useCallback(() => {
    const adjustments = synthesizeFactorAdjustments(
      trendsData,
      opEdData,
      eliteSignalsData,
      blueskyData,
      scores
    );

    if (Object.keys(adjustments).length > 0) {
      setScores(prev => ({ ...prev, ...adjustments }));
    }
  }, [trendsData, opEdData, eliteSignalsData, blueskyData, scores]);

  // Publish
  const publish = useCallback(async () => {
    setIsPublishing(true);
    setPublishStatus(null);

    const exportData = {
      generatedAt: new Date().toISOString(),
      country,
      aciScore: calculateACI(scores, activeModels, theoreticalModels),
      riskLevel: getRiskLevel(calculateACI(scores, activeModels, theoreticalModels)).level,
      scores,
      summary: researchResults?.summary || '',
      factorResults: researchResults
        ? Object.fromEntries(
            factors.map(f => {
              const result = researchResults[f.id as keyof typeof researchResults];
              if (result && typeof result === 'object' && 'score' in result) {
                return [f.id, result];
              }
              return [f.id, { score: scores[f.id as keyof Scores], evidence: '', trend: 'stable' }];
            })
          )
        : {},
      historicalComparison: comparativeData
        ? {
            averageScore: comparativeData.consensus.averageScore,
            mostSimilarCases: comparativeData.mostCitedCases.slice(0, 3).map(c => ({
              country: c.country,
              period: c.period,
              outcome: c.outcome,
            })),
            interpretation: comparativeData.interpretation,
          }
        : null,
      socialSignals: {
        trends: trendsData || null,
        opEds: opEdData || null,
        eliteSignals: eliteSignalsData || null,
        bluesky: blueskyData || null,
        marketSignals: marketSignalsData || null,
      },
      modelsUsed: theoreticalModels
        .filter(m => activeModels[m.id])
        .map(m => ({
          id: m.id,
          name: m.name,
          author: m.author,
          cluster: m.cluster,
          shortDesc: m.shortDesc,
          fullDesc: m.fullDesc,
          keyWorks: m.keyWorks,
          weights: m.weights,
        })),
    };

    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results: exportData }),
      });

      const data = await response.json();

      if (response.ok) {
        setPublishStatus({ type: 'success', message: 'Published! polybius.world will update in ~30 seconds.' });
      } else {
        setPublishStatus({ type: 'error', message: data.error || 'Publish failed' });
      }
    } catch (err) {
      setPublishStatus({ type: 'error', message: err instanceof Error ? err.message : 'Publish failed' });
    } finally {
      setIsPublishing(false);
    }
  }, [country, scores, activeModels, researchResults, comparativeData, trendsData, opEdData, eliteSignalsData, blueskyData, marketSignalsData]);

  // Computed values
  const aciScore = useMemo(
    () => calculateACI(scores, activeModels, theoreticalModels),
    [scores, activeModels]
  );

  const risk = useMemo(() => getRiskLevel(aciScore), [aciScore]);

  const probability = useMemo(() => getProbability(aciScore), [aciScore]);

  const activeWeights = useMemo(
    () => getActiveWeights(activeModels, theoreticalModels, factors),
    [activeModels]
  );

  const modelScores = useMemo(
    () => getModelScores(theoreticalModels, scores, factors),
    [scores]
  );

  const meanScore = useMemo(
    () => modelScores.reduce((sum, m) => sum + m.score, 0) / modelScores.length,
    [modelScores]
  );

  const stdDev = useMemo(() => {
    const variance = modelScores.reduce((sum, m) => sum + Math.pow(m.score - meanScore, 2), 0) / modelScores.length;
    return Math.sqrt(variance);
  }, [modelScores, meanScore]);

  const clusterAverages = useMemo(
    () => getClusterAverages(modelScores, clusterLabels),
    [modelScores]
  );

  const hasSocialSignals = !!(trendsData || opEdData || eliteSignalsData || blueskyData || marketSignalsData);
  const hasNonZeroScores = mounted && Object.values(scores).some(s => s > 0);

  return {
    // Data
    theoreticalModels: theoreticalModels as TheoreticalModel[],
    factors: factors as Factor[],
    clusterLabels,

    // Core state
    scores,
    country,
    setCountry,
    activeModels,
    toggleModel,
    updateScore,

    // Research
    isResearching,
    researchResults,
    searchMode,
    setSearchMode,
    error,
    researchCountry,

    // API keys & settings
    apiKey,
    setApiKey,
    newsApiKey,
    setNewsApiKey,
    showSettings,
    setShowSettings,
    saveApiKey,

    // Social signals
    trendsData,
    opEdData,
    eliteSignalsData,
    blueskyData,
    marketSignalsData,
    isFetchingTrends,
    isFetchingOpEds,
    isFetchingEliteSignals,
    isFetchingBluesky,
    isFetchingMarkets,
    socialError,
    fetchTrends,
    fetchOpEds,
    fetchEliteSignals,
    fetchBluesky,
    fetchMarketSignals,
    synthesizeSignals,
    hasSocialSignals,

    // Comparative
    comparativeData,
    isFetchingComparative,

    // Publishing
    isPublishing,
    publishStatus,
    publish,

    // Computed
    aciScore,
    risk,
    probability,
    activeWeights,
    modelScores,
    meanScore,
    stdDev,
    clusterAverages,
    hasNonZeroScores,
    mounted,
  };
}
