import { TheoreticalModel, Scores,  ModelScore, FactorContribution, RiskLevel, ClusterAverage } from "@/types/calculator";
import { Factor } from "@/types/calculator";

export function getRiskLevel(score: number): RiskLevel {
  if (score < 25) return { level: 'Stable Democracy', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' };
  if (score < 40) return { level: 'Democratic Stress', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' };
  if (score < 50) return { level: 'Competitive Authoritarian Risk', color: 'bg-orange-400', textColor: 'text-orange-700', bgLight: 'bg-orange-50' };
  if (score < 65) return { level: 'DANGER ZONE', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' };
  if (score < 80) return { level: 'Consolidating Authoritarianism', color: 'bg-red-700', textColor: 'text-red-800', bgLight: 'bg-red-100' };
  return { level: 'Authoritarian Regime', color: 'bg-red-900', textColor: 'text-red-900', bgLight: 'bg-red-200' };
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
