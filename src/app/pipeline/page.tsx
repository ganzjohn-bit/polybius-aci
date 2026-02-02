'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Check, X, Loader2, Eye, Edit, Copy, ArrowDown, Calculator, Home } from 'lucide-react';

interface StepState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: unknown;
  error?: string;
}

interface SynthesisResult {
  baseScores: Record<string, number>;
  adjustments: Record<string, number>;
  adjustedScores: Record<string, number>;
  adjustmentReasons: string[];
  baseACI: number;
  adjustedACI: number;
  aciChange: number;
  riskLevel: string;
  signalsUsed: {
    trends: boolean;
    opEds: boolean;
    eliteSignals: boolean;
    bluesky: boolean;
    marketSignals: boolean;
  };
}

const initialState: StepState = { status: 'idle', data: null };

function SynthesisDisplay({ data }: { data: SynthesisResult | null }) {
  if (!data) return null;

  return (
    <div className="space-y-3">
      {/* ACI Score Display */}
      <div className="flex items-center gap-4 p-3 bg-slate-50 rounded">
        <div className="text-center">
          <div className="text-xs text-slate-500 mb-1">Base ACI</div>
          <div className="text-2xl font-bold text-slate-600">
            {data.baseACI}
          </div>
        </div>
        <div className="text-2xl text-slate-400">→</div>
        <div className="text-center">
          <div className="text-xs text-slate-500 mb-1">Adjusted ACI</div>
          <div className="text-2xl font-bold text-slate-800">
            {data.adjustedACI}
          </div>
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded ${
          data.aciChange > 0
            ? 'bg-red-100 text-red-700'
            : data.aciChange < 0
            ? 'bg-green-100 text-green-700'
            : 'bg-slate-100 text-slate-600'
        }`}>
          {data.aciChange >= 0 ? '+' : ''}{data.aciChange}
        </div>
        <div className="ml-auto">
          <div className={`text-sm font-bold px-3 py-1 rounded ${
            data.adjustedACI < 40
              ? 'bg-green-500 text-white'
              : data.adjustedACI < 65
              ? 'bg-yellow-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {data.riskLevel}
          </div>
        </div>
      </div>

      {/* Adjustment Reasons */}
      {data.adjustmentReasons.length > 0 && (
        <div className="p-3 bg-blue-50 rounded">
          <div className="text-xs font-medium text-blue-700 mb-2">Adjustments Applied:</div>
          <ul className="text-xs text-blue-600 space-y-1">
            {data.adjustmentReasons.map((reason, i) => (
              <li key={i} className="font-mono">{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {data.adjustmentReasons.length === 0 && (
        <div className="p-3 bg-slate-100 rounded text-sm text-slate-600">
          No adjustments applied. Run social signal steps to see adjustments.
        </div>
      )}
    </div>
  );
}

export default function PipelinePage() {
  const [apiKey, setApiKey] = useState('');
  const [country, setCountry] = useState('United States');
  const [searchMode, setSearchMode] = useState<'quick' | 'live'>('quick');

  // Step states
  const [research, setResearch] = useState<StepState>(initialState);
  const [regression, setRegression] = useState<StepState>(initialState);
  const [trends, setTrends] = useState<StepState>(initialState);
  const [opEds, setOpEds] = useState<StepState>(initialState);
  const [eliteSignals, setEliteSignals] = useState<StepState>(initialState);
  const [bluesky, setBluesky] = useState<StepState>(initialState);
  const [marketSignals, setMarketSignals] = useState<StepState>(initialState);
  const [synthesis, setSynthesis] = useState<StepState>(initialState);

  // Modal state
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJson, setEditedJson] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Load API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('anthropic_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  // Save API key to localStorage
  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem('anthropic_api_key', key);
  };

  // Get step state and setter by name
  const getStepState = (name: string): StepState => {
    switch (name) {
      case 'research': return research;
      case 'regression': return regression;
      case 'trends': return trends;
      case 'opEds': return opEds;
      case 'eliteSignals': return eliteSignals;
      case 'bluesky': return bluesky;
      case 'marketSignals': return marketSignals;
      case 'synthesis': return synthesis;
      default: return initialState;
    }
  };

  const setStepState = (name: string, state: StepState) => {
    switch (name) {
      case 'research': setResearch(state); break;
      case 'regression': setRegression(state); break;
      case 'trends': setTrends(state); break;
      case 'opEds': setOpEds(state); break;
      case 'eliteSignals': setEliteSignals(state); break;
      case 'bluesky': setBluesky(state); break;
      case 'marketSignals': setMarketSignals(state); break;
      case 'synthesis': setSynthesis(state); break;
    }
  };

  // Default weights (equal weighting across factors)
  const defaultWeights: Record<string, number> = {
    judicial: 0.10,
    federalism: 0.10,
    political: 0.10,
    media: 0.10,
    civil: 0.10,
    publicOpinion: 0.10,
    mobilizationalBalance: 0.10,
    stateCapacity: 0.10,
    corporateCompliance: 0.10,
    electionInterference: 0.10,
  };

  // Synthesize all signals and compute ACI
  const runSynthesis = () => {
    if (!research.data) return;

    setSynthesis({ status: 'loading', data: null });

    // Extract base scores from research
    const researchData = research.data as Record<string, { score?: number }>;
    const baseScores: Record<string, number> = {};
    for (const key of Object.keys(defaultWeights)) {
      baseScores[key] = researchData[key]?.score ?? 0;
    }

    // Apply adjustments from social signals (same logic as main page)
    const adjustments: Record<string, number> = {};
    const reasons: string[] = [];

    // From Google Trends
    if (trends.status === 'success' && trends.data) {
      const trendsData = trends.data as {
        categoryAggregates?: Array<{ category: string; hasSpike?: boolean; avgInterest?: number }>;
      };
      const categories = trendsData.categoryAggregates || [];
      const exit = categories.find(c => c.category === 'exit');
      const resistance = categories.find(c => c.category === 'resistance');
      const press = categories.find(c => c.category === 'pressFreedom');
      const institutional = categories.find(c => c.category === 'institutional');

      if (exit?.hasSpike) {
        adjustments.publicOpinion = (adjustments.publicOpinion || 0) + 15;
        reasons.push('Trends: Exit spike → publicOpinion +15');
      }
      if (resistance && (resistance.avgInterest ?? 0) > 40 && exit?.hasSpike) {
        adjustments.civil = (adjustments.civil || 0) + 10;
        reasons.push('Trends: Resistance + Exit → civil +10');
      }
      if (press?.hasSpike) {
        adjustments.media = (adjustments.media || 0) + 15;
        reasons.push('Trends: Press freedom spike → media +15');
      }
      if (institutional?.hasSpike) {
        adjustments.judicial = (adjustments.judicial || 0) + 10;
        adjustments.electionInterference = (adjustments.electionInterference || 0) + 10;
        reasons.push('Trends: Institutional spike → judicial +10, election +10');
      }
    }

    // From Op-Eds
    if (opEds.status === 'success' && opEds.data) {
      const opEdData = opEds.data as {
        derivedSignals?: {
          eliteDefection?: { score: number };
          hegemnonicCrisis?: { score: number };
          baseErosion?: { score: number };
          classConflict?: { score: number };
        };
      };
      const signals = opEdData.derivedSignals;

      if (signals?.eliteDefection && signals.eliteDefection.score > 40) {
        adjustments.corporateCompliance = (adjustments.corporateCompliance || 0) - 10;
        reasons.push('Op-Eds: Elite defection → corporateCompliance -10');
      }
      if (signals?.hegemnonicCrisis && signals.hegemnonicCrisis.score > 50) {
        adjustments.media = (adjustments.media || 0) + 10;
        adjustments.publicOpinion = (adjustments.publicOpinion || 0) + 10;
        reasons.push('Op-Eds: Hegemonic crisis → media +10, publicOpinion +10');
      }
      if (signals?.baseErosion && signals.baseErosion.score > 30) {
        adjustments.mobilizationalBalance = (adjustments.mobilizationalBalance || 0) - 15;
        reasons.push('Op-Eds: Base erosion → mobilizationalBalance -15');
      }
      if (signals?.classConflict && signals.classConflict.score > 30) {
        adjustments.corporateCompliance = (adjustments.corporateCompliance || 0) + 10;
        reasons.push('Op-Eds: Class conflict → corporateCompliance +10');
      }
    }

    // From Elite Signals
    if (eliteSignals.status === 'success' && eliteSignals.data) {
      const eliteData = eliteSignals.data as {
        defections?: { coordinationScore?: number };
        propaganda?: { effectivenessScore?: number };
      };

      if (eliteData.defections?.coordinationScore !== undefined) {
        if (eliteData.defections.coordinationScore < 60) {
          adjustments.political = (adjustments.political || 0) - 15;
          reasons.push('Elite: Low coordination → political -15');
        } else if (eliteData.defections.coordinationScore > 85) {
          adjustments.political = (adjustments.political || 0) + 10;
          reasons.push('Elite: High coordination → political +10');
        }
      }

      if (eliteData.propaganda?.effectivenessScore !== undefined) {
        if (eliteData.propaganda.effectivenessScore > 70) {
          adjustments.media = (adjustments.media || 0) + 15;
          reasons.push('Elite: High propaganda effectiveness → media +15');
        } else if (eliteData.propaganda.effectivenessScore < 30) {
          adjustments.media = (adjustments.media || 0) - 10;
          reasons.push('Elite: Low propaganda effectiveness → media -10');
        }
      }
    }

    // From Bluesky
    if (bluesky.status === 'success' && bluesky.data) {
      const bskyData = bluesky.data as {
        temperature?: number;
        topIndicators?: Array<{ indicator: string }>;
      };

      if (bskyData.temperature !== undefined) {
        if (bskyData.temperature > 70) {
          adjustments.publicOpinion = (adjustments.publicOpinion || 0) + 15;
          reasons.push('Bluesky: High temperature → publicOpinion +15');
        } else if (bskyData.temperature < 30) {
          adjustments.publicOpinion = (adjustments.publicOpinion || 0) - 10;
          reasons.push('Bluesky: Low temperature → publicOpinion -10');
        }
      }

      const indicators = bskyData.topIndicators || [];
      const hasEmigration = indicators.some(i => i.indicator === 'emigration mentions');
      const hasFascism = indicators.some(i => i.indicator === 'fascism comparisons');
      const hasDemocracyDeath = indicators.some(i => i.indicator === 'democracy death fears');

      if (hasEmigration) {
        adjustments.publicOpinion = (adjustments.publicOpinion || 0) + 10;
        reasons.push('Bluesky: Emigration mentions → publicOpinion +10');
      }
      if (hasFascism || hasDemocracyDeath) {
        adjustments.publicOpinion = (adjustments.publicOpinion || 0) + 10;
        reasons.push('Bluesky: Fascism/democracy fears → publicOpinion +10');
      }
    }

    // Compute adjusted scores
    const adjustedScores: Record<string, number> = {};
    for (const key of Object.keys(baseScores)) {
      const base = baseScores[key];
      const adj = adjustments[key] || 0;
      adjustedScores[key] = Math.max(0, Math.min(100, base + adj));
    }

    // Calculate ACI (weighted sum)
    const baseACI = Object.keys(baseScores).reduce(
      (sum, key) => sum + baseScores[key] * defaultWeights[key],
      0
    );
    const adjustedACI = Object.keys(adjustedScores).reduce(
      (sum, key) => sum + adjustedScores[key] * defaultWeights[key],
      0
    );

    // Risk level
    const getRiskLevel = (score: number) => {
      if (score < 25) return 'Stable Democracy';
      if (score < 40) return 'Democratic Stress';
      if (score < 50) return 'Competitive Authoritarian Risk';
      if (score < 65) return 'DANGER ZONE';
      if (score < 80) return 'Consolidating Authoritarianism';
      return 'Authoritarian Regime';
    };

    const result = {
      baseScores,
      adjustments,
      adjustedScores,
      adjustmentReasons: reasons,
      baseACI: Math.round(baseACI * 10) / 10,
      adjustedACI: Math.round(adjustedACI * 10) / 10,
      aciChange: Math.round((adjustedACI - baseACI) * 10) / 10,
      riskLevel: getRiskLevel(adjustedACI),
      signalsUsed: {
        trends: trends.status === 'success',
        opEds: opEds.status === 'success',
        eliteSignals: eliteSignals.status === 'success',
        bluesky: bluesky.status === 'success',
        marketSignals: marketSignals.status === 'success',
      },
    };

    setSynthesis({ status: 'success', data: result });
  };

  // API call functions
  const runResearch = async () => {
    setResearch({ status: 'loading', data: null });
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, apiKey, searchMode })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setResearch({ status: 'success', data });
    } catch (err) {
      setResearch({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Failed' });
    }
  };

  const runRegression = async () => {
    if (!research.data) return;
    setRegression({ status: 'loading', data: null });
    try {
      // Extract factor scores from research data
      const factors: Record<string, number> = {};
      const researchData = research.data as Record<string, { score?: number }>;
      for (const key of ['judicial', 'federalism', 'political', 'media', 'civil', 'publicOpinion', 'mobilizationalBalance', 'stateCapacity', 'corporateCompliance', 'electionInterference']) {
        if (researchData[key]?.score !== undefined) {
          factors[key] = researchData[key].score;
        }
      }
      const response = await fetch('/api/regression', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ factors })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setRegression({ status: 'success', data });
    } catch (err) {
      setRegression({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Failed' });
    }
  };

  const runTrends = async () => {
    setTrends({ status: 'loading', data: null });
    try {
      const response = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setTrends({ status: 'success', data });
    } catch (err) {
      setTrends({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Failed' });
    }
  };

  const runOpEds = async () => {
    setOpEds({ status: 'loading', data: null });
    try {
      const response = await fetch('/api/op-eds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setOpEds({ status: 'success', data });
    } catch (err) {
      setOpEds({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Failed' });
    }
  };

  const runEliteSignals = async () => {
    setEliteSignals({ status: 'loading', data: null });
    try {
      const response = await fetch('/api/elite-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setEliteSignals({ status: 'success', data });
    } catch (err) {
      setEliteSignals({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Failed' });
    }
  };

  const runBluesky = async () => {
    setBluesky({ status: 'loading', data: null });
    try {
      const response = await fetch('/api/bluesky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: country.trim() || null })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setBluesky({ status: 'success', data });
    } catch (err) {
      setBluesky({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Failed' });
    }
  };

  const runMarketSignals = async () => {
    setMarketSignals({ status: 'loading', data: null });
    try {
      const response = await fetch('/api/market-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setMarketSignals({ status: 'success', data });
    } catch (err) {
      setMarketSignals({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Failed' });
    }
  };

  // Summary generators
  const getSummary = (name: string, state: StepState): string => {
    if (state.status === 'idle') return 'Not yet run';
    if (state.status === 'loading') return 'Running...';
    if (state.status === 'error') return `Error: ${state.error}`;
    if (!state.data) return 'No data';

    const data = state.data as Record<string, unknown>;

    switch (name) {
      case 'research': {
        const factors = ['judicial', 'federalism', 'political', 'media', 'civil', 'publicOpinion'];
        const scores = factors
          .filter(f => data[f] && typeof (data[f] as Record<string, unknown>).score === 'number')
          .map(f => `${f}: ${(data[f] as Record<string, unknown>).score}`)
          .join(', ');
        return scores || 'No scores found';
      }
      case 'regression': {
        const analysis = data.comparativeAnalysis as Array<{ mostSimilarCases?: Array<{ country: string; period: string; similarity: number }> }> | undefined;
        if (analysis?.[0]?.mostSimilarCases?.[0]) {
          const c = analysis[0].mostSimilarCases[0];
          // similarity is already a percentage (0-100), not a decimal
          return `Most similar: ${c.country} ${c.period} (${Math.round(c.similarity)}% match)`;
        }
        return 'Analysis complete';
      }
      case 'trends': {
        const temp = data.overallTemperature as number | undefined;
        const categories = data.categoryAggregates as Array<{ category: string; hasSpike?: boolean; topKeyword?: string }> | undefined;
        const spikes = categories?.filter(c => c.hasSpike).map(c => c.topKeyword).filter(Boolean).slice(0, 2);
        return `Temperature: ${temp ?? '?'}${spikes?.length ? `, spikes: ${spikes.join(', ')}` : ''}`;
      }
      case 'opEds': {
        const total = data.totalArticles as number | undefined;
        const nixonMoments = data.nixonMoments as Array<unknown> | undefined;
        return `${total ?? 0} articles, ${nixonMoments?.length ?? 0} Nixon moments`;
      }
      case 'eliteSignals': {
        const defections = data.defections as { totalFound?: number; coordinationScore?: number } | undefined;
        return `${defections?.totalFound ?? 0} defections, coordination: ${defections?.coordinationScore?.toFixed(2) ?? '?'}`;
      }
      case 'bluesky': {
        const total = data.totalPosts as number | undefined;
        const sentiment = data.sentimentBreakdown as { negative?: number } | undefined;
        const temp = data.temperature as number | undefined;
        return `${total ?? 0} posts, ${sentiment?.negative ?? 0}% negative, temp: ${temp ?? '?'}`;
      }
      case 'marketSignals': {
        const conditions = data.marketConditions as { vix?: { level: number }; sp500?: { weekChange: number } } | undefined;
        const taco = data.tacoPatternAnalysis as { patternHolding?: boolean } | undefined;
        return `VIX: ${conditions?.vix?.level ?? '?'}, S&P week: ${conditions?.sp500?.weekChange?.toFixed(1) ?? '?'}%, TACO: ${taco?.patternHolding ? 'holding' : 'broken'}`;
      }
      case 'synthesis': {
        const baseACI = data.baseACI as number | undefined;
        const adjustedACI = data.adjustedACI as number | undefined;
        const aciChange = data.aciChange as number | undefined;
        const riskLevel = data.riskLevel as string | undefined;
        const changeStr = aciChange !== undefined ? (aciChange >= 0 ? `+${aciChange}` : `${aciChange}`) : '?';
        return `ACI: ${baseACI ?? '?'} → ${adjustedACI ?? '?'} (${changeStr}) | ${riskLevel ?? 'Unknown'}`;
      }
      default:
        return JSON.stringify(data).slice(0, 100) + '...';
    }
  };

  // Modal handlers
  const openModal = (name: string, startInEditMode = false) => {
    const state = getStepState(name);
    setModalOpen(name);
    setIsEditing(startInEditMode);
    // If no data yet, provide a helpful placeholder
    if (state.data) {
      setEditedJson(JSON.stringify(state.data, null, 2));
    } else {
      setEditedJson('{\n  \n}');
    }
    setJsonError('');
  };

  const closeModal = () => {
    setModalOpen(null);
    setIsEditing(false);
    setJsonError('');
  };

  const saveEditedJson = () => {
    if (!modalOpen) return;
    try {
      const parsed = JSON.parse(editedJson);
      setStepState(modalOpen, { status: 'success', data: parsed });
      setIsEditing(false);
      setJsonError('');
    } catch {
      setJsonError('Invalid JSON');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedJson);
  };

  // Status indicator component
  const StatusIcon = ({ status }: { status: StepState['status'] }) => {
    switch (status) {
      case 'idle':
        return <div className="w-4 h-4 rounded-full bg-slate-300" />;
      case 'loading':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'error':
        return <X className="w-4 h-4 text-red-500" />;
    }
  };

  // Step card component
  const StepCard = ({
    name,
    title,
    description,
    state,
    onRun,
    disabled,
    disabledReason
  }: {
    name: string;
    title: string;
    description: string;
    state: StepState;
    onRun: () => void;
    disabled?: boolean;
    disabledReason?: string;
  }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <StatusIcon status={state.status} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onRun}
          disabled={disabled || state.status === 'loading'}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          title={disabledReason}
        >
          {state.status === 'loading' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          Run
        </button>
        {state.status === 'success' && (
          <button
            onClick={() => openModal(name)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
        )}
        {(state.status === 'idle' || state.status === 'error') && (
          <button
            onClick={() => openModal(name, true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            Enter Data
          </button>
        )}
      </div>

      <div className="text-sm text-slate-600 bg-slate-50 rounded p-2 font-mono">
        {getSummary(name, state)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-slate-800">Pipeline Debug Tool</h1>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded border border-slate-300 hover:border-slate-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
        <p className="text-slate-600 mb-1">
          Run each analysis step individually to understand the data flow.
        </p>
        <p className="text-xs text-amber-600 mb-6">
          Note: Results are stored in page state only. Navigating away will reset all data.
        </p>

        {/* Settings */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-6">
          <h2 className="font-semibold text-slate-800 mb-3">Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Anthropic API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Search Mode Radio */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Research Mode
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  searchMode === 'quick'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="searchMode"
                  value="quick"
                  checked={searchMode === 'quick'}
                  onChange={() => setSearchMode('quick')}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-slate-800">Quick</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Uses Claude&apos;s training data only. Faster and cheaper, but won&apos;t include recent news.
                  </div>
                </div>
              </label>
              <label
                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  searchMode === 'live'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="searchMode"
                  value="live"
                  checked={searchMode === 'live'}
                  onChange={() => setSearchMode('live')}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-slate-800">Live</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Searches the web for current news and polls. Slower but includes events from the past week.
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Step 1: Research */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Step 1</span>
            <span className="text-sm text-slate-500">Core Factor Analysis</span>
          </div>
          <StepCard
            name="research"
            title="Research"
            description="Scores 10 democratic health factors using Claude AI"
            state={research}
            onRun={runResearch}
            disabled={!apiKey || !country}
            disabledReason={!apiKey ? 'API key required' : !country ? 'Country required' : undefined}
          />
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-2">
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </div>

        {/* Step 2: Regression */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Step 2</span>
            <span className="text-sm text-slate-500">Historical Comparison</span>
          </div>
          <StepCard
            name="regression"
            title="Regression"
            description="Compares current scores to historical cases of democratic breakdown"
            state={regression}
            onRun={runRegression}
            disabled={research.status !== 'success'}
            disabledReason="Requires Research to complete first"
          />
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-2">
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </div>

        {/* Step 3: Social Signals (parallel) */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Step 3</span>
            <span className="text-sm text-slate-500">Social Signals (can run in parallel)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <StepCard
              name="trends"
              title="Trends"
              description="Google Trends data"
              state={trends}
              onRun={runTrends}
              disabled={!country}
              disabledReason="Country required"
            />
            <StepCard
              name="opEds"
              title="Op-Eds"
              description="Editorial sentiment analysis"
              state={opEds}
              onRun={runOpEds}
              disabled={!apiKey}
              disabledReason="API key required"
            />
            <StepCard
              name="eliteSignals"
              title="Elite Signals"
              description="Elite defection tracking"
              state={eliteSignals}
              onRun={runEliteSignals}
              disabled={!apiKey}
              disabledReason="API key required"
            />
            <StepCard
              name="bluesky"
              title="Bluesky"
              description="Social media sentiment"
              state={bluesky}
              onRun={runBluesky}
            />
            <StepCard
              name="marketSignals"
              title="Markets"
              description="Financial market signals"
              state={marketSignals}
              onRun={runMarketSignals}
              disabled={!apiKey}
              disabledReason="API key required"
            />
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-2">
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </div>

        {/* Step 4: Synthesis */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">Step 4</span>
            <span className="text-sm text-slate-500">Final Synthesis</span>
          </div>
          <div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-slate-800">Synthesize & Calculate ACI</h3>
                <p className="text-sm text-slate-500">Applies social signal adjustments and computes final score</p>
              </div>
              <StatusIcon status={synthesis.status} />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={runSynthesis}
                disabled={research.status !== 'success'}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                title={research.status !== 'success' ? 'Requires Research to complete first' : undefined}
              >
                <Calculator className="w-4 h-4" />
                Synthesize
              </button>
              {synthesis.status === 'success' && (
                <button
                  onClick={() => openModal('synthesis')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Details
                </button>
              )}
            </div>

            <SynthesisDisplay data={synthesis.status === 'success' ? synthesis.data as SynthesisResult : null} />

            {synthesis.status === 'idle' && (
              <div className="text-sm text-slate-600 bg-slate-50 rounded p-2 font-mono">
                Not yet run. Requires Research step.
              </div>
            )}

            {synthesis.status === 'error' && (
              <div className="text-sm text-red-600 bg-red-50 rounded p-2">
                Error: {synthesis.error}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 className="font-semibold text-slate-800">
                  {modalOpen.charAt(0).toUpperCase() + modalOpen.slice(1)} Results
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                      isEditing
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    {isEditing ? 'Editing' : 'Edit'}
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-1.5 text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                {isEditing ? (
                  <textarea
                    value={editedJson}
                    onChange={(e) => setEditedJson(e.target.value)}
                    className="w-full h-full min-h-[400px] font-mono text-sm p-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    spellCheck={false}
                  />
                ) : (
                  <pre className="font-mono text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded overflow-auto">
                    {editedJson}
                  </pre>
                )}
              </div>

              {isEditing && (
                <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                  {jsonError && (
                    <span className="text-sm text-red-600">{jsonError}</span>
                  )}
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedJson(JSON.stringify(getStepState(modalOpen).data, null, 2));
                        setJsonError('');
                      }}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditedJson}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
