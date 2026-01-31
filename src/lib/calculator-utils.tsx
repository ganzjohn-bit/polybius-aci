import type { Scores, RiskLevel, Factor, TheoreticalModel, ModelScore, FactorContribution, ClusterAverage, TrendsData, OpEdData, EliteSignalsData, BlueskyData, TrendCategory } from '@/types/calculator';
import { factors } from '@/data/calculator-constants';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type React from 'react';

export function getActiveWeights(
  activeModels: Record<string, boolean>,
  theoreticalModels: TheoreticalModel[],
  factorList: Factor[]
): Record<string, number> {
  const activeModelsList = theoreticalModels.filter(m => activeModels[m.id]);
  if (activeModelsList.length === 0) {
    const defaultWeights: Record<string, number> = {};
    factorList.forEach(f => defaultWeights[f.id] = f.weight);
    return defaultWeights;
  }
  const avgWeights: Record<string, number> = {};
  factorList.forEach(factor => {
    avgWeights[factor.id] = activeModelsList.reduce((sum, model) =>
      sum + (model.weights[factor.id] || 0), 0) / activeModelsList.length;
  });
  return avgWeights;
}

export function calculateACI(
  scores: Scores,
  activeModels: Record<string, boolean>,
  theoreticalModels: TheoreticalModel[]
): number {
  const weights = getActiveWeights(activeModels, theoreticalModels, factors);
  return factors.reduce((total, f) => total + (scores[f.id as keyof Scores] * weights[f.id]), 0);
}

export function getRiskLevel(score: number): RiskLevel {
  if (score < 25) return { level: 'Stable Democracy', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' };
  if (score < 40) return { level: 'Democratic Stress', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' };
  if (score < 50) return { level: 'Competitive Authoritarian Risk', color: 'bg-orange-400', textColor: 'text-orange-700', bgLight: 'bg-orange-50' };
  if (score < 65) return { level: 'DANGER ZONE', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' };
  if (score < 80) return { level: 'Consolidating Authoritarianism', color: 'bg-red-700', textColor: 'text-red-800', bgLight: 'bg-red-100' };
  return { level: 'Authoritarian Regime', color: 'bg-red-900', textColor: 'text-red-900', bgLight: 'bg-red-200' };
}

export function getProbability(score: number): string {
  if (score < 25) return '0-5%';
  if (score < 40) return '5-15%';
  if (score < 50) return '15-35%';
  if (score < 65) return '35-60%';
  if (score < 80) return '60-85%';
  return '85%+';
}

export function getTrendIcon(trend?: string): React.ReactElement | null {
  if (!trend) return null;
  const t = trend.toLowerCase();
  if (t.includes('improv')) return <TrendingDown className="w-4 h-4 text-green-600" />;
  if (t.includes('deter')) return <TrendingUp className="w-4 h-4 text-red-600" />;
  return <Minus className="w-4 h-4 text-gray-500" />;
}

export function getModelExplanation(modelId: string, modelScore: number, currentScores: Scores): string {
  const explanations: Record<string, (score: number, s: Scores) => string> = {
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
}

export function getModelScores(
  theoreticalModels: TheoreticalModel[],
  currentScores: Scores,
  factorList: Factor[]
): ModelScore[] {
  const rawModelScores = theoreticalModels.map(model => {
    const factorContributions = factorList.map(f => {
      const weight = model.weights[f.id] || 0;
      const factorScore = currentScores[f.id as keyof Scores];
      const contribution = factorScore * weight;
      return {
        id: f.id,
        name: f.name,
        weight,
        factorScore,
        contribution,
        weightPercent: weight * 100
      } as FactorContribution;
    }).sort((a, b) => b.contribution - a.contribution);

    const score = factorContributions.reduce((sum, f) => sum + f.contribution, 0);
    const topDrivers = factorContributions.filter(f => f.contribution > 0).slice(0, 3);
    const lowFactors = factorContributions.filter(f => f.weight >= 0.15 && f.factorScore < 30);

    return {
      id: model.id,
      name: model.name,
      author: model.author,
      cluster: model.cluster,
      score,
      risk: getRiskLevel(score),
      topDrivers,
      lowFactors,
      factorContributions,
      explanation: getModelExplanation(model.id, score, currentScores),
      isOutlier: false,
      deviationFromMean: 0,
      outlierDirection: null
    };
  });

  const meanScore = rawModelScores.reduce((sum, m) => sum + m.score, 0) / rawModelScores.length;
  const variance = rawModelScores.reduce((sum, m) => sum + Math.pow(m.score - meanScore, 2), 0) / rawModelScores.length;
  const stdDev = Math.sqrt(variance);

  return rawModelScores.map(model => ({
    ...model,
    isOutlier: Math.abs(model.score - meanScore) > stdDev,
    deviationFromMean: model.score - meanScore,
    outlierDirection: model.score > meanScore + stdDev ? 'high' as const : model.score < meanScore - stdDev ? 'low' as const : null
  })).sort((a, b) => b.score - a.score);
}

export function getClusterAverages(modelScores: ModelScore[], clusterLabels: Record<string, string>): ClusterAverage[] {
  const modelsByCluster = modelScores.reduce((acc, model) => {
    const cluster = model.cluster;
    if (!acc[cluster]) acc[cluster] = [];
    acc[cluster].push(model);
    return acc;
  }, {} as Record<string, ModelScore[]>);

  return Object.entries(modelsByCluster).map(([cluster, models]) => ({
    cluster,
    label: clusterLabels[cluster] || cluster,
    avgScore: models.reduce((sum, m) => sum + m.score, 0) / models.length,
    models: models.map(m => m.name)
  })).sort((a, b) => b.avgScore - a.avgScore);
}

export function synthesizeFactorAdjustments(
  trendsData: TrendsData | null,
  opEdData: OpEdData | null,
  eliteSignalsData: EliteSignalsData | null,
  blueskyData: BlueskyData | null,
  currentScores: Scores
): Partial<Scores> {
  const adjustments: Partial<Scores> = {};

  if (trendsData) {
    const exit = trendsData.categoryAggregates?.find((c: TrendCategory) => c.category === 'exit');
    const resistance = trendsData.categoryAggregates?.find((c: TrendCategory) => c.category === 'resistance');
    const institutional = trendsData.categoryAggregates?.find((c: TrendCategory) => c.category === 'institutional');
    const press = trendsData.categoryAggregates?.find((c: TrendCategory) => c.category === 'pressFreedom');

    if (exit && exit.hasSpike) {
      adjustments.publicOpinion = Math.min(100, (currentScores.publicOpinion || 0) + 15);
    }
    if (resistance && resistance.avgInterest > 40) {
      if (exit?.hasSpike) {
        adjustments.civil = Math.min(100, (currentScores.civil || 0) + 10);
      }
    }
    if (press && press.hasSpike) {
      adjustments.media = Math.min(100, (currentScores.media || 0) + 15);
    }
    if (institutional && institutional.hasSpike) {
      adjustments.judicial = Math.min(100, (currentScores.judicial || 0) + 10);
      adjustments.electionInterference = Math.min(100, (currentScores.electionInterference || 0) + 10);
    }
  }

  if (opEdData) {
    const signals = opEdData.derivedSignals;

    if (signals.eliteDefection?.score > 40) {
      adjustments.corporateCompliance = Math.max(0, (currentScores.corporateCompliance || 0) - 10);
    }

    if (signals.hegemnonicCrisis?.score > 50) {
      adjustments.media = Math.min(100, (adjustments.media || currentScores.media || 0) + 10);
      adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || currentScores.publicOpinion || 0) + 10);
    }

    if (signals.baseErosion?.score > 30) {
      adjustments.mobilizationalBalance = Math.max(0, (currentScores.mobilizationalBalance || 0) - 15);
    }

    if (signals.classConflict?.score > 30) {
      adjustments.corporateCompliance = Math.min(100, (adjustments.corporateCompliance || currentScores.corporateCompliance || 0) + 10);
    }
  }

  if (eliteSignalsData) {
    if (eliteSignalsData.defections?.coordinationScore < 60) {
      adjustments.political = Math.max(0, (currentScores.political || 0) - 15);
    } else if (eliteSignalsData.defections?.coordinationScore > 85) {
      adjustments.political = Math.min(100, (currentScores.political || 0) + 10);
    }

    if (eliteSignalsData.propaganda?.effectivenessScore > 70) {
      adjustments.media = Math.min(100, (adjustments.media || currentScores.media || 0) + 15);
    } else if (eliteSignalsData.propaganda?.effectivenessScore < 30) {
      adjustments.media = Math.max(0, (adjustments.media || currentScores.media || 0) - 10);
    }
  }

  if (blueskyData) {
    if (blueskyData.temperature > 70) {
      adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || currentScores.publicOpinion || 0) + 15);
    } else if (blueskyData.temperature < 30) {
      adjustments.publicOpinion = Math.max(0, (adjustments.publicOpinion || currentScores.publicOpinion || 0) - 10);
    }

    const hasEmigration = blueskyData.topIndicators?.some((i: { indicator: string; count: number }) => i.indicator === 'emigration mentions');
    const hasFascism = blueskyData.topIndicators?.some((i: { indicator: string; count: number }) => i.indicator === 'fascism comparisons');
    const hasDemocracyDeath = blueskyData.topIndicators?.some((i: { indicator: string; count: number }) => i.indicator === 'democracy death fears');

    if (hasEmigration) {
      adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || currentScores.publicOpinion || 0) + 10);
    }
    if (hasFascism || hasDemocracyDeath) {
      adjustments.publicOpinion = Math.min(100, (adjustments.publicOpinion || currentScores.publicOpinion || 0) + 10);
    }
  }

  return adjustments;
}
