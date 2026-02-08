'use client';

import BlueskyCard from '@/components/ui/BlueskyCard';
import Card from '@/components/ui/Card';
import EliteSignalsCard from '@/components/ui/EliteSignalsCard';
import MarketSignalsCard from '@/components/ui/MarketSignalsCard';
import OpEdCard from '@/components/ui/OpEdCard';
import OverallScoreCard from '@/components/ui/OverallScoreCard';
import Pill from '@/components/ui/Pill';
import TrendsCard from '@/components/ui/TrendsCard';
import { factors, theoreticalModels } from '@/data/constants';
import { TrendsData, MarketSignalsData, OpEdData, EliteSignalsData } from '@/types/results';
import { BlueskyData, ComparativeAnalysisData,  FactorResult,  ResearchResults, } from '@/types/calculator';
import { Activity, BookOpen, Check, ChevronDown, ChevronUp, Info, Loader2, Minus, Search, Settings, Shield, TrendingDown, TrendingUp, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PolybiusCalculator() {
  const [scores, setScores] = useState({
    judicial: 0,
    federalism: 0,
    political: 0,
    media: 0,
    civil: 0,
    publicOpinion: 0,
    mobilizationalBalance: 0,
    stateCapacity: 0,
    corporateCompliance: 0,
    electionInterference: 0
  });

  const [country, setCountry] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchResults, setResearchResults] = useState<ResearchResults | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'live' | 'quick'>('quick');
  const [newsApiKey, setNewsApiKey] = useState('');
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [isFetchingTrends, setIsFetchingTrends] = useState(false);
  const [isFetchingOpEds, setIsFetchingOpEds] = useState(false);
  const [opEdData, setOpEdData] = useState<OpEdData | null>(null);
  const [isFetchingEliteSignals, setIsFetchingEliteSignals] = useState(false);
  const [eliteSignalsData, setEliteSignalsData] = useState<EliteSignalsData | null>(null);
  const [isFetchingBluesky, setIsFetchingBluesky] = useState(false);
  const [blueskyData, setBlueskyData] = useState<BlueskyData | null>(null);
  const [isFetchingMarkets, setIsFetchingMarkets] = useState(false);
  const [marketSignalsData, setMarketSignalsData] = useState<MarketSignalsData | null>(null);
  const [comparativeData, setComparativeData] = useState<ComparativeAnalysisData | null>(null);
  const [isFetchingComparative, setIsFetchingComparative] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [socialError, setSocialError] = useState('');

  const [activeModels, setActiveModels] = useState({
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
    bermanRiley: false
  });

  useEffect(() => {
    setMounted(true);
    const savedKey = localStorage.getItem('anthropic-api-key');
    if (savedKey) {
      setApiKey(savedKey);
    }
    const savedNewsKey = localStorage.getItem('news-api-key');
    if (savedNewsKey) {
      setNewsApiKey(savedNewsKey);
    }
  }, []);

  const saveApiKey = () => {
    console.log('Saving API key, length:', apiKey?.length);
    if (apiKey) {
      localStorage.setItem('anthropic-api-key', apiKey);
      console.log('Saved to localStorage');
    } else {
      console.log('API key is empty, not saving');
    }
    if (newsApiKey) {
      localStorage.setItem('news-api-key', newsApiKey);
    }
    setShowSettings(false);
  };

  const toggleModel = (modelId: string) => {
    setActiveModels(prev => ({ ...prev, [modelId]: !prev[modelId as keyof typeof prev] }));
  };

  const getActiveWeights = () => {
    const activeModelsList = theoreticalModels.filter(m => activeModels[m.id as keyof typeof activeModels]);
    if (activeModelsList.length === 0) {
      const defaultWeights: Record<string, number> = {};
      factors.forEach(f => defaultWeights[f.id] = f.weight);
      return defaultWeights;
    }
    const avgWeights: Record<string, number> = {};
    factors.forEach(factor => {
      avgWeights[factor.id] = activeModelsList.reduce((sum, model) =>
        sum + (model.weights[factor.id as keyof typeof model.weights] || 0), 0) / activeModelsList.length;
    });
    return avgWeights;
  };

  const calculateACI = () => {
    const weights = getActiveWeights();
    return factors.reduce((total, f) => total + (scores[f.id as keyof typeof scores] * weights[f.id]), 0);
  };

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

  const getTrendIcon = (trend?: string) => {
    if (!trend) return null;
    const t = trend.toLowerCase();
    if (t.includes('improv')) return <TrendingDown className="w-4 h-4 text-green-600" />;
    if (t.includes('deter')) return <TrendingUp className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const researchCountry = async () => {
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
        body: JSON.stringify({ country, apiKey, searchMode })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const results = await response.json();

      const newScores: Record<string, number> = {};
      factors.forEach(f => {
        if (results[f.id] && typeof results[f.id].score === 'number') {
          newScores[f.id] = results[f.id].score;
        } else {
          newScores[f.id] = 0;
        }
      });

      setScores(newScores as typeof scores);
      setResearchResults(results);

      // Automatically run comparative historical analysis
      setIsFetchingComparative(true);
      try {
        const compResponse = await fetch('/api/regression', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ factors: newScores })
        });
        if (compResponse.ok) {
          const compData = await compResponse.json();
          setComparativeData(compData);
        }
      } catch (compErr) {
        console.error('Comparative analysis failed:', compErr);
      } finally {
        setIsFetchingComparative(false);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Research failed');
    } finally {
      setIsResearching(false);
    }
  };

  const fetchTrends = async () => {
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
        body: JSON.stringify({ country })
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
  };

  const fetchOpEds = async () => {
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
        body: JSON.stringify({ apiKey })
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
  };

  const fetchEliteSignals = async () => {
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
        body: JSON.stringify({ apiKey })
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
  };

  const fetchBluesky = async () => {
    setIsFetchingBluesky(true);
    setSocialError('');

    try {
      const response = await fetch('/api/bluesky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: country.trim() || null })
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
  };

  const fetchMarketSignals = async () => {
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
        body: JSON.stringify({ apiKey })
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
  };

  // Synthesize social signals into factor score adjustments
  const synthesizeSignals = () => {
    const adjustments: Partial<typeof scores> = {};

    // From Google Trends
    if (trendsData) {
      const exit = trendsData.categoryAggregates.find(c => c.category === 'exit');
      const resistance = trendsData.categoryAggregates.find(c => c.category === 'resistance');
      const institutional = trendsData.categoryAggregates.find(c => c.category === 'institutional');
      const press = trendsData.categoryAggregates.find(c => c.category === 'pressFreedom');

      // Exit signals affect public opinion (loss of faith)
      if (exit && exit.hasSpike) {
        adjustments.publicOpinion = Math.min(100, (scores.publicOpinion || 0) + 15);
      }
      // Resistance signals affect civil society (active contestation)
      if (resistance && resistance.avgInterest > 40) {
        // High resistance searches could mean either strong civil society OR crackdown
        // If combined with exit spike, it's concerning
        if (exit?.hasSpike) {
          adjustments.civil = Math.min(100, (scores.civil || 0) + 10);
        }
      }
      // Press freedom concerns
      if (press && press.hasSpike) {
        adjustments.media = Math.min(100, (scores.media || 0) + 15);
      }
      // Institutional anxiety
      if (institutional && institutional.hasSpike) {
        adjustments.judicial = Math.min(100, (scores.judicial || 0) + 10);
        adjustments.electionInterference = Math.min(100, (scores.electionInterference || 0) + 10);
      }
    }

    // From Op-Ed Hegemonic Analysis
    if (opEdData) {
      const signals = opEdData.derivedSignals;

      // Elite defection affects corporate compliance
      if (signals.eliteDefection.score > 40) {
        adjustments.corporateCompliance = Math.max(0, (scores.corporateCompliance || 0) - 10);
      }

      // Hegemonic crisis affects media and public opinion
      if (signals.hegemnonicCrisis.score > 50) {
        adjustments.media = Math.min(100, (adjustments.media || scores.media || 0) + 10);
        adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || scores.publicOpinion || 0) + 10);
      }

      // Base erosion affects mobilizational balance (weakens regime's organizational advantage)
      if (signals.baseErosion.score > 30) {
        adjustments.mobilizationalBalance = Math.max(0, (scores.mobilizationalBalance || 0) - 15);
      }

      // Class conflict affects corporate compliance
      if (signals.classConflict.score > 30) {
        // Divergence between elite and populist sentiment
        adjustments.corporateCompliance = Math.min(100, (adjustments.corporateCompliance || scores.corporateCompliance || 0) + 10);
      }
    }

    // From Elite Signals (US)
    if (eliteSignalsData) {
      // Party coordination affects political competition
      if (eliteSignalsData.defections.coordinationScore < 60) {
        // Low coordination = party fracturing = healthier political competition
        adjustments.political = Math.max(0, (scores.political || 0) - 15);
      } else if (eliteSignalsData.defections.coordinationScore > 85) {
        // Very high coordination = monolithic party = less competition
        adjustments.political = Math.min(100, (scores.political || 0) + 10);
      }

      // Propaganda effectiveness affects media capture
      if (eliteSignalsData.propaganda.effectivenessScore > 70) {
        adjustments.media = Math.min(100, (adjustments.media || scores.media || 0) + 15);
      } else if (eliteSignalsData.propaganda.effectivenessScore < 30) {
        // Low propaganda effectiveness = information getting through
        adjustments.media = Math.max(0, (adjustments.media || scores.media || 0) - 10);
      }
    }

    // From Bluesky
    if (blueskyData) {
      // High temperature = high stress discourse
      if (blueskyData.temperature > 70) {
        adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || scores.publicOpinion || 0) + 15);
      } else if (blueskyData.temperature < 30) {
        adjustments.publicOpinion = Math.max(0, (adjustments.publicOpinion || scores.publicOpinion || 0) - 10);
      }

      // Check for specific indicators
      const hasEmigration = blueskyData.topIndicators.some(i => i.indicator === 'emigration mentions');
      const hasFascism = blueskyData.topIndicators.some(i => i.indicator === 'fascism comparisons');
      const hasDemocracyDeath = blueskyData.topIndicators.some(i => i.indicator === 'democracy death fears');

      if (hasEmigration) {
        adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || scores.publicOpinion || 0) + 10);
      }
      if (hasFascism || hasDemocracyDeath) {
        adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || scores.publicOpinion || 0) + 10);
      }
    }

    // Apply adjustments
    if (Object.keys(adjustments).length > 0) {
      setScores(prev => ({
        ...prev,
        ...adjustments
      }));
    }

    return adjustments;
  };

  const hasSocialSignals = trendsData || opEdData || eliteSignalsData || blueskyData || marketSignalsData;

  const aciScore = calculateACI();
  const risk = getRiskLevel(aciScore);
  const probability = getProbability(aciScore);
  const activeWeights = getActiveWeights();

  // Generate theoretical explanation based on model and current scores
  const getModelExplanation = (modelId: string, modelScore: number, currentScores: typeof scores): string => {
    const explanations: Record<string, (score: number, s: typeof scores) => string> = {
      'linz': (score, s) => score >= 50
        ? `Presidential system stress: federalism (${s.federalism}) and political competition (${s.political}) under pressure. Linz warned presidentialism creates zero-sum conflicts.`
        : `Presidential risks contained: federal structures and political competition provide checks against winner-take-all dynamics.`,
      'levitsky': (score, s) => score >= 50
        ? `Guardrails eroding: judicial independence (${s.judicial}) and political competition (${s.political}) show institutional decay characteristic of democratic backsliding.`
        : `Democratic guardrails holding: courts and party system still provide checks, though vigilance required.`,
      'svolik': (score, s) => score >= 50
        ? `Polarization enabling authoritarian tolerance: public opinion (${s.publicOpinion}) suggests voters may excuse democratic violations from their side.`
        : `Public still punishing democratic violations across partisan lines; elite defection not yet normalized.`,
      'marxian': (score, s) => score >= 50
        ? `Capital-state alignment concerning: corporate compliance (${s.corporateCompliance}) suggests business class sees regime as protecting interests.`
        : `Business class not yet fully aligned with authoritarian project; profit motive may still check regime.`,
      'kaleckiAR': (score, s) => score >= 50
        ? `Elite calculation favoring authoritarianism: corporate compliance (${s.corporateCompliance}) and state capacity (${s.stateCapacity}) suggest elites see regime as useful.`
        : `Elites still hedging; authoritarian bargain not yet attractive enough to abandon democratic constraints.`,
      'gramscian': (score, s) => score >= 50
        ? `Hegemonic shift underway: media capture (${s.media}) and public opinion (${s.publicOpinion}) indicate authoritarian common sense being constructed.`
        : `Cultural hegemony contested; opposition narratives still circulating, counter-hegemonic articulation possible.`,
      'paxton': (score, s) => score >= 50
        ? `Fascist mobilization pattern: regime grassroots (${s.mobilizationalBalance}) gaining advantage. Opposition organizational infrastructure under threat.`
        : `Opposition civil society still mobilized; regime lacks overwhelming mobilizational advantage.`,
      'bermanRiley': (score, s) => score >= 50
        ? `Mobilizational imbalance critical: regime forces (${s.mobilizationalBalance}) outpacing opposition organization. Historical pattern suggests consolidation risk.`
        : `Opposition organizational capacity intact; mobilizational balance (${s.mobilizationalBalance}) not yet decisively favoring regime.`,
      'tocqueville': (score, s) => score >= 50
        ? `Civic associations weakening: civil society (${s.civil}) and federalism (${s.federalism}) showing decay. Soft despotism risk rising.`
        : `Associational life and federal structures still provide republican bulwarks against concentrated power.`,
      'classical': (score, s) => score >= 50
        ? `Classical tyranny pattern: demagogic appeal (${s.publicOpinion}) combined with mobilization (${s.mobilizationalBalance}) echoes ancient warnings.`
        : `Democratic virtues holding; passion has not yet overcome deliberation.`,
      'gameTheory': (score, s) => score >= 50
        ? `Coordination equilibrium unstable: judicial focal points (${s.judicial}) weakening. Citizens may fail to coordinate punishment of transgressions.`
        : `Constitutional focal points holding; citizens still coordinating to defend democratic rules.`
    };
    return explanations[modelId]?.(modelScore, currentScores) || '';
  };

  // Calculate scores for all theoretical models with factor contributions
  const rawModelScores = theoreticalModels.map(model => {
    const factorContributions = factors.map(f => {
      const weight = model.weights[f.id as keyof typeof model.weights] || 0;
      const factorScore = scores[f.id as keyof typeof scores];
      const contribution = factorScore * weight;
      return {
        id: f.id,
        name: f.name,
        weight,
        factorScore,
        contribution,
        weightPercent: weight * 100
      };
    }).sort((a, b) => b.contribution - a.contribution);

    const score = factorContributions.reduce((sum, f) => sum + f.contribution, 0);
    const topDrivers = factorContributions.filter(f => f.contribution > 0).slice(0, 3);
    const lowFactors = factorContributions.filter(f => f.weight >= 0.15 && f.factorScore < 30);

    return {
      id: model.id,
      name: model.name,
      author: model.author,
      cluster: (model as typeof model & { cluster: string }).cluster || 'other',
      score,
      risk: getRiskLevel(score),
      topDrivers,
      lowFactors,
      factorContributions,
      explanation: getModelExplanation(model.id, score, scores)
    };
  });

  // Calculate mean and standard deviation for outlier detection
  const meanScore = rawModelScores.reduce((sum, m) => sum + m.score, 0) / rawModelScores.length;
  const variance = rawModelScores.reduce((sum, m) => sum + Math.pow(m.score - meanScore, 2), 0) / rawModelScores.length;
  const stdDev = Math.sqrt(variance);

  // Mark outliers (> 1 std dev from mean)
  const modelScores = rawModelScores.map(model => ({
    ...model,
    isOutlier: Math.abs(model.score - meanScore) > stdDev,
    deviationFromMean: model.score - meanScore,
    outlierDirection: model.score > meanScore + stdDev ? 'high' as const : model.score < meanScore - stdDev ? 'low' as const : null
  })).sort((a, b) => b.score - a.score);

  // Group by cluster
  const clusterLabels: Record<string, string> = {
    'institutionalist': 'Institutionalist',
    'class-economic': 'Class/Economic',
    'cultural-social': 'Cultural/Social',
    'elite-strategic': 'Elite/Strategic',
    'process-dynamic': 'Process/Dynamic'
  };

  const modelsByCluster = modelScores.reduce((acc, model) => {
    const cluster = model.cluster;
    if (!acc[cluster]) acc[cluster] = [];
    acc[cluster].push(model);
    return acc;
  }, {} as Record<string, typeof modelScores>);

  const clusterAverages = Object.entries(modelsByCluster).map(([cluster, models]) => ({
    cluster,
    label: clusterLabels[cluster] || cluster,
    avgScore: models.reduce((sum, m) => sum + m.score, 0) / models.length,
    models: models.map(m => m.name)
  })).sort((a, b) => b.avgScore - a.avgScore);

  const hasNonZeroScores = mounted && Object.values(scores).some(s => s > 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Polybius</h1>
            <p className="text-slate-600 text-lg">A framework for assessing structural vulnerability to democratic backsliding</p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Settings</h2>
                <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-slate-700 p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Anthropic API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    console.log('API key input changed, new length:', e.target.value.length);
                    setApiKey(e.target.value);
                  }}
                  placeholder="sk-ant-api03-..."
                  className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-sm text-slate-500 mt-3">
                  For AI-powered research. Get one at{' '}
                  <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    console.anthropic.com
                  </a>
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  NewsAPI Key <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="password"
                  value={newsApiKey}
                  onChange={(e) => setNewsApiKey(e.target.value)}
                  placeholder="your-news-api-key..."
                  className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-sm text-slate-500 mt-3">
                  For headline analysis. Get one free at{' '}
                  <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    newsapi.org
                  </a>
                </p>
              </div>
              <button
                onClick={saveApiKey}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Save API Key
              </button>
            </div>
          </div>
        )}

        {/* Theoretical Models */}
        <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold text-slate-800">Theoretical Frameworks</h3>
            <div className="group relative">
              <Info className="w-5 h-5 text-slate-400 cursor-help" />
              <div className="absolute left-0 top-6 w-72 p-3 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Select one or more frameworks to adjust how factors are weighted in the overall score. Click a framework to see details.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {theoreticalModels.map(model => (
              <div key={model.id} className="flex flex-col">
                <button
                  onClick={() => toggleModel(model.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${activeModels[model.id as keyof typeof activeModels]
                    ? 'bg-blue-100 border-blue-400 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800">{model.name}</h4>
                        {activeModels[model.id as keyof typeof activeModels] && <Check className="w-5 h-5 text-green-600 shrink-0" />}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{model.author}</p>
                      <p className="text-sm text-slate-600 mt-2">{model.shortDesc}</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
                  className="flex items-center justify-center gap-1 text-sm text-slate-500 hover:text-slate-700 py-2"
                >
                  {expandedModel === model.id ? (
                    <>Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Learn more <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
                {expandedModel === model.id && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4 mb-2 -mt-1">
                    <p className="text-sm text-slate-700 whitespace-pre-line">{model.fullDesc}</p>
                    <p className="text-sm text-slate-500 mt-4 pt-3 border-t border-slate-100">
                      <span className="font-semibold">Key works:</span> {model.keyWorks}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Research Country */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Research a Country</h3>

          {/* Search Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSearchMode('quick')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                searchMode === 'quick'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-300 hover:border-blue-400'
              }`}
            >
              <div className="font-semibold">Quick Analysis</div>
              <div className="text-xs opacity-80">Uses existing knowledge (fast, no rate limits)</div>
            </button>
            <button
              onClick={() => setSearchMode('live')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                searchMode === 'live'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-300 hover:border-green-400'
              }`}
            >
              <div className="font-semibold">Live Search</div>
              <div className="text-xs opacity-80">Web search for latest data (slower, uses more tokens)</div>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isResearching && researchCountry()}
              placeholder="e.g., United States, Hungary, Turkey, Venezuela"
              className="flex-1 px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              disabled={isResearching}
            />
            <button
              onClick={researchCountry}
              disabled={isResearching || !country.trim()}
              className={`px-8 py-4 text-white rounded-xl font-bold disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg transition-colors min-w-40 ${
                searchMode === 'live' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isResearching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {searchMode === 'live' ? 'Searching...' : 'Analyzing...'}
                </>
              ) : (
                searchMode === 'live' ? 'Live Search' : 'Analyze'
              )}
            </button>
          </div>
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          {isResearching && (
            <div className={`mt-4 p-4 rounded-lg ${searchMode === 'live' ? 'bg-green-100 border border-green-200' : 'bg-blue-100 border border-blue-200'}`}>
              <p className={searchMode === 'live' ? 'text-green-800' : 'text-blue-800'}>
                {searchMode === 'live'
                  ? `Searching the web for current ${new Date().getFullYear()} data on ${country}. This may take 30-60 seconds...`
                  : `Analyzing ${country} using existing knowledge base. This should take 10-20 seconds...`
                }
              </p>
            </div>
          )}
        </div>

        {/* Social Signals Dashboard */}
        <Card
          variant="section"
          className="bg-purple-50 border-purple-200"
          title="Social Signals"
          icon={Activity}
          iconColor="text-purple-600"
          headerContent={<span className="text-sm text-slate-500">(Trends + Hegemonic Analysis + Elite Signals)</span>}
        >

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={fetchTrends}
              disabled={isFetchingTrends || !country.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isFetchingTrends ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Fetching Trends...</>
              ) : (
                <><Search className="w-4 h-4" /> Google Trends</>
              )}
            </button>
            <button
              onClick={fetchOpEds}
              disabled={isFetchingOpEds || !country.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isFetchingOpEds ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Op-Eds...</>
              ) : (
                <><BookOpen className="w-4 h-4" /> Hegemonic Analysis</>
              )}
            </button>
            <button
              onClick={fetchEliteSignals}
              disabled={isFetchingEliteSignals}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isFetchingEliteSignals ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Shield className="w-4 h-4" /> Elite Signals (US)</>
              )}
            </button>
            <button
              onClick={fetchBluesky}
              disabled={isFetchingBluesky}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isFetchingBluesky ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Fetching...</>
              ) : (
                <><Activity className="w-4 h-4" /> Bluesky</>
              )}
            </button>
            <button
              onClick={fetchMarketSignals}
              disabled={isFetchingMarkets || !apiKey}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isFetchingMarkets ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
              ) : (
                <><TrendingUp className="w-4 h-4" /> Market Signals</>
              )}
            </button>
          </div>

          {socialError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{socialError}</p>
            </div>
          )}

          {/* Trends Results */}
          {trendsData && (
            <TrendsCard trends={trendsData} />
          )}

          {/* Op-Ed / Hegemonic Analysis Results */}
          {opEdData && (
            <OpEdCard
            opEds={opEdData}
            />
          )}

          {/* Elite Signals (Party Coordination + Propaganda) */}
          {eliteSignalsData && (
            <EliteSignalsCard
              eliteSignals={eliteSignalsData}
            />
          )}

          {/* Bluesky Analysis */}
          {blueskyData && (
            <BlueskyCard
              bluesky={blueskyData}
            />
          )}

          {/* Market Signals */}
          {marketSignalsData && (
            <MarketSignalsCard
              marketSignals={marketSignalsData}
            />
          )}

          {/* Synthesize Button */}
          {hasSocialSignals && (
            <div className="mt-4 p-4 bg-linear-to-r from-purple-100 to-amber-100 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-slate-800">Synthesize Social Signals</h5>
                  <p className="text-sm text-slate-600">Apply insights from social signals to adjust the ACI factor scores</p>
                </div>
                <button
                  onClick={synthesizeSignals}
                  className="px-4 py-2 bg-linear-to-r from-purple-600 to-amber-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-amber-700 transition-all"
                >
                  Apply to Scores
                </button>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                <strong>Signal mapping:</strong> Trends → Public Opinion, Civil Society, Media | Op-Eds → Corporate, Media, Executive | Elite Signals → Political, Media | Bluesky → Public Opinion
              </div>
            </div>
          )}

          {!trendsData && !opEdData && !eliteSignalsData && !blueskyData && (
            <p className="text-sm text-slate-500">
              Enter a country above and click the buttons to analyze search trends, op-ed dynamics, and social media discourse for signs of democratic stress. &quot;Elite Signals&quot; is US-specific and tracks GOP coordination and propaganda effectiveness.
            </p>
          )}
        </Card>

        {/* Overall Score */}

        <OverallScoreCard aciScore={aciScore} risk={risk} probability={probability} />

        {/* Publish to polybius.world */}
        {hasNonZeroScores && (
          <div className="mt-6 mb-6 py-4 flex flex-col items-center gap-2">
              <button
                onClick={async () => {
                  setIsPublishing(true);
                  setPublishStatus(null);

                  const exportData = {
                    generatedAt: new Date().toISOString(),
                    country,
                    aciScore,
                    riskLevel: risk.level,
                    scores,
                    summary: researchResults?.summary || '',
                    factorResults: researchResults ? Object.fromEntries(
                      factors.map(f => {
                        const result = researchResults[f.id as keyof typeof researchResults];
                        if (result && typeof result === 'object' && 'score' in result) {
                          return [f.id, {
                            score: (result as { score: number; evidence: string; trend: string }).score,
                            evidence: (result as { score: number; evidence: string; trend: string }).evidence,
                            trend: (result as { score: number; evidence: string; trend: string }).trend
                          }];
                        }
                        return [f.id, { score: scores[f.id as keyof typeof scores], evidence: '', trend: 'stable' }];
                      })
                    ) : {},
                    historicalComparison: comparativeData ? {
                      averageScore: comparativeData.consensus.averageScore,
                      mostSimilarCases: comparativeData.mostCitedCases.slice(0, 3).map(c => ({
                        country: c.country,
                        period: c.period,
                        outcome: c.outcome
                      })),
                      interpretation: comparativeData.interpretation
                    } : null,
                    socialSignals: {
                      trends: trendsData || null,
                      opEds: opEdData || null,
                      eliteSignals: eliteSignalsData || null,
                      bluesky: blueskyData || null,
                      marketSignals: marketSignalsData || null
                    },
                    modelsUsed: theoreticalModels
                      .filter(m => activeModels[m.id as keyof typeof activeModels])
                      .map(m => ({
                        id: m.id,
                        name: m.name,
                        author: m.author,
                        cluster: m.cluster,
                        shortDesc: m.shortDesc,
                        fullDesc: m.fullDesc,
                        keyWorks: m.keyWorks,
                        weights: m.weights
                      }))
                  };

                  try {
                    const response = await fetch('/api/publish', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ results: exportData })
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
                }}
                disabled={isPublishing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center gap-2"
              >
                {isPublishing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isPublishing ? 'Publishing...' : 'Publish to polybius.world'}
              </button>
              {publishStatus && (
                <div className={`text-sm ${publishStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {publishStatus.message}
                </div>
              )}
          </div>
        )}

        {/* Model Stress Comparison */}
        {hasNonZeroScores && (
          <div className="mb-10 bg-slate-100 rounded-xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Theoretical Model Comparison</h3>
            <p className="text-slate-600 text-sm mb-4">How different frameworks interpret the current data</p>

            {/* Cluster Summary */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Cluster Analysis</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {clusterAverages.map((cluster, i) => (
                  <div key={cluster.cluster} className={`p-2 rounded-lg text-center ${
                    i === 0 ? 'bg-red-50 border border-red-200' :
                    i === clusterAverages.length - 1 ? 'bg-green-50 border border-green-200' :
                    'bg-slate-50 border border-slate-200'
                  }`}>
                    <div className="text-xs font-medium text-slate-500">{cluster.label}</div>
                    <div className={`text-xl font-bold ${
                      i === 0 ? 'text-red-600' : i === clusterAverages.length - 1 ? 'text-green-600' : 'text-slate-700'
                    }`}>{cluster.avgScore.toFixed(1)}</div>
                    <div className="text-xs text-slate-400">{cluster.models.length} models</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outlier Alert */}
            {modelScores.filter(m => m.isOutlier).length > 0 && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-sm font-semibold text-amber-800 mb-1">Outlier Models Detected</div>
                <div className="text-xs text-amber-700">
                  These models deviate significantly (&gt;1 std dev) from the mean ({meanScore.toFixed(1)}):
                  <div className="mt-1 flex flex-wrap gap-2">
                    {modelScores.filter(m => m.isOutlier).map(m => (
                      <Pill key={m.id} tone={m.outlierDirection === 'high' ? 'red' : 'green'} variant="soft">
                        {m.name}: {m.score.toFixed(1)} ({m.deviationFromMean > 0 ? '+' : ''}{m.deviationFromMean.toFixed(1)})
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {modelScores.map((model, index) => {
                const isHighest = index === 0;
                const isLowest = index === modelScores.length - 1;
                const barWidth = Math.max((model.score / 100) * 100, 2);
                const clusterColor: Record<string, string> = {
                  'institutionalist': 'bg-blue-100 text-blue-700',
                  'class-economic': 'bg-purple-100 text-purple-700',
                  'cultural-social': 'bg-pink-100 text-pink-700',
                  'elite-strategic': 'bg-cyan-100 text-cyan-700',
                  'process-dynamic': 'bg-orange-100 text-orange-700'
                };

                return (
                  <div key={model.id} className={`p-4 rounded-lg ${
                    model.isOutlier && model.outlierDirection === 'high' ? 'bg-red-50 border-2 border-red-300 ring-2 ring-red-100' :
                    model.isOutlier && model.outlierDirection === 'low' ? 'bg-green-50 border-2 border-green-300 ring-2 ring-green-100' :
                    isHighest ? 'bg-red-50 border border-red-200' :
                    isLowest ? 'bg-green-50 border border-green-200' :
                    'bg-white border border-slate-200'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {model.isOutlier && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            model.outlierDirection === 'high' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                          }`}>
                            OUTLIER {model.outlierDirection === 'high' ? '↑' : '↓'}
                          </span>
                        )}
                        {!model.isOutlier && isHighest && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">MOST STRESS</span>}
                        {!model.isOutlier && isLowest && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">LEAST STRESS</span>}
                        <span className={`text-xs px-1.5 py-0.5 rounded ${clusterColor[model.cluster] || 'bg-slate-100 text-slate-600'}`}>
                          {clusterLabels[model.cluster] || model.cluster}
                        </span>
                        <span className="font-semibold text-slate-800">{model.name}</span>
                        <span className="text-xs text-slate-500">({model.author})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${model.risk.textColor}`}>{model.risk.level}</span>
                        <span className="font-bold text-slate-800 text-lg">{model.score.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${model.risk.color}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>

                    {/* Theoretical Explanation */}
                    {model.explanation && (
                      <p className="text-sm text-slate-700 mb-3">{model.explanation}</p>
                    )}

                    {/* Explanation of drivers */}
                    <div className="text-xs space-y-1">
                      {model.topDrivers.length > 0 && (
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-slate-500 font-medium">Driving stress:</span>
                          {model.topDrivers.map((driver, i) => (
                            <span key={driver.id} className="inline-flex items-center">
                              <span className={`px-1.5 py-0.5 rounded ${driver.factorScore >= 50 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                {driver.name.split('/')[0].split(' ').slice(0, 2).join(' ')} ({driver.factorScore} × {driver.weightPercent.toFixed(0)}%)
                              </span>
                              {i < model.topDrivers.length - 1 && <span className="text-slate-400 mx-1">+</span>}
                            </span>
                          ))}
                        </div>
                      )}
                      {model.lowFactors.length > 0 && (
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-slate-500 font-medium">Providing resilience:</span>
                          {model.lowFactors.slice(0, 3).map((factor, i) => (
                            <span key={factor.id} className="inline-flex items-center">
                              <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                                {factor.name.split('/')[0].split(' ').slice(0, 2).join(' ')} ({factor.factorScore})
                              </span>
                              {i < Math.min(model.lowFactors.length, 3) - 1 && <span className="text-slate-400 mx-1">&</span>}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-300">
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <strong>Spread:</strong> {(modelScores[0].score - modelScores[modelScores.length - 1].score).toFixed(1)} points
                  {modelScores[0].score - modelScores[modelScores.length - 1].score > 20 && (
                    <span className="text-amber-700 ml-1">(high disagreement)</span>
                  )}
                </div>
                <div>
                  <strong>Mean:</strong> {meanScore.toFixed(1)} | <strong>Std Dev:</strong> {stdDev.toFixed(1)}
                </div>
              </div>
              {modelScores[0].score - modelScores[modelScores.length - 1].score > 20 && (
                <p className="text-sm text-amber-700 mt-2">
                  Large spread suggests the situation looks very different through different theoretical lenses. Pay attention to outlier models - they may be detecting vulnerabilities others miss.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Structural Components */}
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Structural Components</h3>

        <div className="space-y-5">
          {factors.map(factor => {
            const factorScore = scores[factor.id as keyof typeof scores];
            const result = researchResults?.[factor.id as keyof ResearchResults];
            const hasResult = result && typeof result === 'object';

            return (
              <div key={factor.id} className={`rounded-xl p-5 border-2 transition-colors ${factorScore >= factor.dangerThreshold
                ? 'bg-red-50 border-red-300'
                : 'bg-slate-50 border-slate-200'
                }`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg text-slate-800">{factor.name}</h4>
                      {hasResult && getTrendIcon((result as FactorResult).trend)}
                      {factorScore >= factor.dangerThreshold && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">CRITICAL</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{factor.description}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Weight: {(activeWeights[factor.id] * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-slate-800 ml-4">{factorScore}</div>
                </div>

                {hasResult && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-700 leading-relaxed">{(result as FactorResult).evidence}</p>
                    {(result as FactorResult).sources && (
                      <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">
                        Sources: {(result as FactorResult).sources}
                      </p>
                    )}
                  </div>
                )}

                <div className="w-full bg-slate-300 rounded-full h-4 mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${factorScore < 30 ? 'bg-green-500' :
                      factorScore < factor.dangerThreshold ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    style={{ width: `${factorScore}%` }}
                  />
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={factorScore}
                  onChange={(e) => setScores(prev => ({ ...prev, [factor.id]: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0 (Democratic)</span>
                  <span>100 (Authoritarian)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
          <p className="mb-2">Built with theoretical frameworks from Linz, Levitsky & Ziblatt, Gramsci, Paxton, Svolik, and others.</p>
          <p>Research powered by Claude AI with web search. Your API key is stored locally in your browser.</p>
        </div>
      </div>
    </div>
  );
}
