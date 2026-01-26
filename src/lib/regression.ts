// Comparative analysis module
// Uses historical cases to generate weakly predictive scores through case comparison
// Each theoretical model provides a different lens for similarity calculation

import { historicalCases, HistoricalCase, getAveragesByOutcome, getFactorDiscriminativePower } from '../data/historical-cases';

const FACTORS = [
  'judicial', 'federalism', 'political', 'media', 'civil', 'publicOpinion',
  'mobilizationalBalance', 'stateCapacity', 'corporateCompliance', 'electionInterference'
] as const;

type Factor = typeof FACTORS[number];

export interface ModelWeights {
  [key: string]: number;
}

// === COMPARATIVE ANALYSIS (PRIMARY APPROACH) ===

export interface CaseSimilarity {
  caseId: string;
  country: string;
  period: string;
  outcome: string;
  outcomeScore: number;
  similarity: number; // 0-100, higher = more similar
  factorComparison: { factor: string; current: number; historical: number; diff: number }[];
}

export interface ComparativeAnalysis {
  modelName: string;
  mostSimilarCases: CaseSimilarity[];
  predictedOutcome: {
    score: number; // 0-100
    confidence: string; // 'low' | 'medium' | 'high'
    reasoning: string;
  };
  theoreticalExplanation: string; // 1-2 sentence explanation through this model's lens
  warningSignals: string[];
  hopefulSignals: string[];
}

// Generate theoretical explanation for why a model shows its stress level
function generateTheoreticalExplanation(
  modelName: string,
  currentFactors: Record<string, number>,
  weights: ModelWeights,
  predictedScore: number
): string {
  // Find the top 2-3 weighted factors for this model
  const sortedFactors = Object.entries(weights)
    .filter(([_, w]) => w > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([f, _]) => f);

  const topFactorValues = sortedFactors.map(f => ({
    factor: f,
    value: currentFactors[f] || 0,
    weight: weights[f] || 0
  }));

  const stressLevel = predictedScore >= 60 ? 'high' : predictedScore >= 40 ? 'moderate' : 'low';

  // Model-specific interpretations
  const explanations: Record<string, (factors: typeof topFactorValues, score: number) => string> = {
    'Levitsky-Ziblatt': (factors, score) => {
      const judicial = currentFactors.judicial || 0;
      const political = currentFactors.political || 0;
      return score >= 50
        ? `Guardrails eroding: judicial independence (${judicial}) and political party gatekeeping (${political}) show institutional decay characteristic of democratic backsliding.`
        : `Democratic guardrails holding: courts and party system still provide checks, though vigilance required.`;
    },
    'Svolik': (factors, score) => {
      const publicOpinion = currentFactors.publicOpinion || 0;
      const political = currentFactors.political || 0;
      return score >= 50
        ? `Polarization enabling authoritarian tolerance: public opinion (${publicOpinion}) suggests voters may excuse democratic violations from their side. Elite coordination weakening.`
        : `Public still punishing democratic violations across partisan lines; elite defection not yet normalized.`;
    },
    'Marxian/Kaleckian': (factors, score) => {
      const corporate = currentFactors.corporateCompliance || 0;
      const stateCapacity = currentFactors.stateCapacity || 0;
      return score >= 50
        ? `Capital-state alignment dangerous: corporate compliance (${corporate}) suggests business class sees regime as protecting interests against redistribution.`
        : `Business class not yet fully aligned with authoritarian project; profit motive may still check regime.`;
    },
    'Gramscian/Hall': (factors, score) => {
      const media = currentFactors.media || 0;
      const publicOpinion = currentFactors.publicOpinion || 0;
      const mobilization = currentFactors.mobilizationalBalance || 0;
      return score >= 50
        ? `Hegemonic shift underway: media capture (${media}) and public opinion (${publicOpinion}) indicate authoritarian "common sense" being constructed. Counter-hegemonic forces fragmented.`
        : `Cultural hegemony contested; opposition narratives still circulating, counter-hegemonic articulation possible.`;
    },
    'Paxton': (factors, score) => {
      const mobilization = currentFactors.mobilizationalBalance || 0;
      const civil = currentFactors.civil || 0;
      return score >= 50
        ? `Fascist mobilization pattern: regime grassroots (${mobilization}) gaining advantage over civil society (${civil}). Opposition organizational infrastructure under threat.`
        : `Opposition civil society still mobilized; regime lacks overwhelming mobilizational advantage.`;
    },
    'Frankfurt School': (factors, score) => {
      const media = currentFactors.media || 0;
      const publicOpinion = currentFactors.publicOpinion || 0;
      return score >= 50
        ? `Culture industry capture advancing: media (${media}) and mass psychology (${publicOpinion}) show authoritarian discourse normalizing. Critical reason diminishing.`
        : `Authoritarian culture industry not yet dominant; spaces for critical discourse remain.`;
    },
    'Berman-Riley': (factors, score) => {
      const mobilization = currentFactors.mobilizationalBalance || 0;
      const civil = currentFactors.civil || 0;
      return score >= 50
        ? `Mobilizational imbalance critical: regime forces (${mobilization}) outpacing opposition organization (${civil}). Historical pattern suggests consolidation risk.`
        : `Opposition organizational capacity intact; mobilizational balance not yet decisively favoring regime.`;
    },
    'Classical Republican': (factors, score) => {
      const publicOpinion = currentFactors.publicOpinion || 0;
      const civil = currentFactors.civil || 0;
      const federalism = currentFactors.federalism || 0;
      return score >= 50
        ? `Civic virtue declining: public opinion (${publicOpinion}) and weakened civil associations (${civil}) suggest atomization enabling tyranny.`
        : `Civic associations and federal structures still provide republican bulwarks against concentrated power.`;
    }
  };

  // Default explanation for unknown models
  const defaultExplanation = (factors: typeof topFactorValues, score: number) => {
    const topFactor = factors[0];
    return score >= 50
      ? `Key factors ${factors.map(f => f.factor).join(', ')} at concerning levels (${factors.map(f => f.value).join(', ')}).`
      : `Key factors remain below historical consolidation thresholds.`;
  };

  const explainFn = explanations[modelName] || defaultExplanation;
  return explainFn(topFactorValues, predictedScore);
}

// Calculate weighted similarity between current factors and a historical case
function calculateSimilarity(
  currentFactors: Record<string, number>,
  historicalCase: HistoricalCase,
  weights: ModelWeights
): { similarity: number; factorComparison: { factor: string; current: number; historical: number; diff: number }[] } {
  let weightedDiffSum = 0;
  let totalWeight = 0;
  const factorComparison: { factor: string; current: number; historical: number; diff: number }[] = [];

  for (const f of FACTORS) {
    const w = weights[f] || 0.1; // Default small weight if not specified
    const current = currentFactors[f] || 0;
    const historical = historicalCase.factors[f];
    const diff = Math.abs(current - historical);

    weightedDiffSum += diff * w;
    totalWeight += w;

    factorComparison.push({ factor: f, current, historical, diff });
  }

  // Convert weighted average difference to similarity (0-100)
  const avgWeightedDiff = totalWeight > 0 ? weightedDiffSum / totalWeight : 50;
  const similarity = Math.max(0, Math.round(100 - avgWeightedDiff));

  return { similarity, factorComparison };
}

// Find most similar historical cases using a theoretical model's weights
export function findSimilarCases(
  currentFactors: Record<string, number>,
  weights: ModelWeights,
  topN: number = 5
): CaseSimilarity[] {
  const similarities: CaseSimilarity[] = historicalCases.map(c => {
    const { similarity, factorComparison } = calculateSimilarity(currentFactors, c, weights);
    return {
      caseId: c.id,
      country: c.country,
      period: c.period,
      outcome: c.outcome,
      outcomeScore: c.outcomeScore,
      similarity,
      factorComparison
    };
  });

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
}

// Generate comparative prediction from similar cases
export function generateComparativePrediction(
  currentFactors: Record<string, number>,
  modelName: string,
  weights: ModelWeights
): ComparativeAnalysis {
  const similarCases = findSimilarCases(currentFactors, weights, 5);

  // Weight outcomes by similarity
  let weightedOutcomeSum = 0;
  let similaritySum = 0;

  for (const c of similarCases) {
    weightedOutcomeSum += c.outcomeScore * (c.similarity / 100);
    similaritySum += c.similarity / 100;
  }

  const predictedScore = similaritySum > 0
    ? Math.round(weightedOutcomeSum / similaritySum)
    : 50;

  // Determine confidence based on similarity spread
  const topSimilarity = similarCases[0]?.similarity || 0;
  const confidence = topSimilarity > 75 ? 'high' : topSimilarity > 50 ? 'medium' : 'low';

  // Generate reasoning
  const topCase = similarCases[0];
  const outcomeDistribution = {
    consolidated: similarCases.filter(c => c.outcome === 'consolidated').length,
    resisted: similarCases.filter(c => c.outcome === 'resisted').length,
    democratized: similarCases.filter(c => c.outcome === 'democratized').length
  };

  let reasoning = `Through ${modelName} lens, most similar to ${topCase?.country} ${topCase?.period} (${topCase?.similarity}% match). `;
  reasoning += `Of top 5 matches: ${outcomeDistribution.consolidated} consolidated, ${outcomeDistribution.resisted} resisted, ${outcomeDistribution.democratized} democratized.`;

  // Identify warning signals (current higher than resisted cases on key factors)
  const warningSignals: string[] = [];
  const hopefulSignals: string[] = [];

  const resistedCases = similarCases.filter(c => c.outcome === 'resisted');
  const consolidatedCases = similarCases.filter(c => c.outcome === 'consolidated');

  for (const f of FACTORS) {
    const currentVal = currentFactors[f] || 0;
    const avgResisted = resistedCases.length > 0
      ? resistedCases.reduce((sum, c) => {
          const comp = c.factorComparison.find(fc => fc.factor === f);
          return sum + (comp?.historical || 0);
        }, 0) / resistedCases.length
      : null;
    const avgConsolidated = consolidatedCases.length > 0
      ? consolidatedCases.reduce((sum, c) => {
          const comp = c.factorComparison.find(fc => fc.factor === f);
          return sum + (comp?.historical || 0);
        }, 0) / consolidatedCases.length
      : null;

    if (avgResisted !== null && currentVal > avgResisted + 10) {
      warningSignals.push(`${f} (${currentVal}) exceeds resisted-case average (${Math.round(avgResisted)})`);
    }
    if (avgConsolidated !== null && currentVal < avgConsolidated - 10) {
      hopefulSignals.push(`${f} (${currentVal}) below consolidated-case average (${Math.round(avgConsolidated)})`);
    }
  }

  // Generate theoretical explanation
  const theoreticalExplanation = generateTheoreticalExplanation(
    modelName,
    currentFactors,
    weights,
    predictedScore
  );

  return {
    modelName,
    mostSimilarCases: similarCases,
    predictedOutcome: { score: predictedScore, confidence, reasoning },
    theoreticalExplanation,
    warningSignals,
    hopefulSignals
  };
}

// Run comparative analysis across all theoretical models
export function runFullComparativeAnalysis(
  currentFactors: Record<string, number>,
  models: { name: string; weights: ModelWeights }[]
): {
  byModel: ComparativeAnalysis[];
  consensus: {
    averageScore: number;
    scoreRange: { min: number; max: number };
    agreementLevel: string;
    summary: string;
  };
  mostCitedCases: { caseId: string; country: string; period: string; citedBy: string[]; outcome: string }[];
} {
  const byModel = models.map(m => generateComparativePrediction(currentFactors, m.name, m.weights));

  // Calculate consensus
  const scores = byModel.map(m => m.predictedOutcome.score);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const range = maxScore - minScore;

  const agreementLevel = range < 15 ? 'high' : range < 30 ? 'moderate' : 'low';

  // Find most frequently cited cases across models
  const caseCitations: Record<string, { country: string; period: string; citedBy: string[]; outcome: string }> = {};
  for (const analysis of byModel) {
    for (const c of analysis.mostSimilarCases.slice(0, 3)) {
      if (!caseCitations[c.caseId]) {
        caseCitations[c.caseId] = { country: c.country, period: c.period, citedBy: [], outcome: c.outcome };
      }
      caseCitations[c.caseId].citedBy.push(analysis.modelName);
    }
  }

  const mostCitedCases = Object.entries(caseCitations)
    .map(([caseId, data]) => ({ caseId, ...data }))
    .sort((a, b) => b.citedBy.length - a.citedBy.length)
    .slice(0, 5);

  let summary = `Models predict average score of ${avgScore}/100 (range: ${minScore}-${maxScore}). `;
  summary += `Agreement: ${agreementLevel}. `;
  if (mostCitedCases[0]) {
    summary += `Most cited comparison: ${mostCitedCases[0].country} ${mostCitedCases[0].period} (${mostCitedCases[0].outcome}).`;
  }

  return {
    byModel,
    consensus: {
      averageScore: avgScore,
      scoreRange: { min: minScore, max: maxScore },
      agreementLevel,
      summary
    },
    mostCitedCases
  };
}


// === LEGACY REGRESSION (kept for reference) ===

export interface RegressionResult {
  weights: ModelWeights;
  r2: number; // R-squared - goodness of fit
  mse: number; // Mean squared error
  predictions: { caseId: string; actual: number; predicted: number; error: number }[];
}

export interface ModelValidation {
  modelName: string;
  r2: number;
  mse: number;
  averageError: number;
  predictions: { caseId: string; actual: number; predicted: number; error: number }[];
  accuracy: { correct: number; total: number; pct: number };
}

// Ordinary Least Squares regression to find optimal weights
export function fitWeightsOLS(): RegressionResult {
  const n = historicalCases.length;
  const k = FACTORS.length;

  // Build X matrix (factors) and Y vector (outcomes)
  const X: number[][] = [];
  const Y: number[] = [];

  for (const c of historicalCases) {
    const row = FACTORS.map(f => c.factors[f] / 100); // Normalize to 0-1
    X.push(row);
    Y.push(c.outcomeScore / 100); // Normalize outcome
  }

  // Add intercept column
  const X_with_intercept = X.map(row => [1, ...row]);

  // OLS: β = (X'X)^(-1) X'Y
  // Using gradient descent as simpler implementation
  const weights = gradientDescentFit(X, Y, 0.01, 10000);

  // Convert weights array to object for prediction
  const weightsForPrediction: ModelWeights = {};
  FACTORS.forEach((f, i) => {
    weightsForPrediction[f] = weights[i];
  });

  // Calculate predictions and R2
  const predictions = historicalCases.map((c, i) => {
    const predicted = predictWithWeights(c.factors, weightsForPrediction) * 100;
    return {
      caseId: c.id,
      actual: c.outcomeScore,
      predicted: Math.round(predicted),
      error: Math.round(c.outcomeScore - predicted)
    };
  });

  const meanY = Y.reduce((a, b) => a + b, 0) / n;
  const ssTotal = Y.reduce((sum, y) => sum + (y - meanY) ** 2, 0);
  const ssResidual = predictions.reduce((sum, p) => sum + ((p.actual - p.predicted) / 100) ** 2, 0);
  const r2 = 1 - (ssResidual / ssTotal);
  const mse = ssResidual / n;

  // Convert weights array to object
  const weightObj: ModelWeights = {};
  FACTORS.forEach((f, i) => {
    weightObj[f] = Math.round(weights[i] * 1000) / 1000;
  });

  return { weights: weightObj, r2: Math.round(r2 * 1000) / 1000, mse: Math.round(mse * 1000) / 1000, predictions };
}

// Gradient descent for weight fitting
function gradientDescentFit(X: number[][], Y: number[], learningRate: number, iterations: number): number[] {
  const n = X.length;
  const k = X[0].length;
  const weights = new Array(k).fill(0.1); // Initialize with equal small weights

  for (let iter = 0; iter < iterations; iter++) {
    const gradients = new Array(k).fill(0);

    for (let i = 0; i < n; i++) {
      const predicted = X[i].reduce((sum, x, j) => sum + x * weights[j], 0);
      const error = predicted - Y[i];

      for (let j = 0; j < k; j++) {
        gradients[j] += (2 / n) * error * X[i][j];
      }
    }

    // Update weights
    for (let j = 0; j < k; j++) {
      weights[j] -= learningRate * gradients[j];
      // Clamp to reasonable range
      weights[j] = Math.max(0, Math.min(0.5, weights[j]));
    }
  }

  // Normalize weights to sum to 1
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map(w => w / sum);
}

// Predict outcome using given weights
function predictWithWeights(factors: Record<Factor, number>, weights: ModelWeights): number {
  let sum = 0;
  let weightSum = 0;

  for (const f of FACTORS) {
    const w = weights[f] || 0;
    sum += (factors[f] / 100) * w;
    weightSum += w;
  }

  return weightSum > 0 ? sum / weightSum * weightSum : 0;
}

// Validate a theoretical model against historical cases
export function validateModel(modelName: string, weights: ModelWeights): ModelValidation {
  const predictions = historicalCases.map(c => {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const f of FACTORS) {
      const w = weights[f] || 0;
      weightedSum += c.factors[f] * w;
      totalWeight += w;
    }

    const predicted = totalWeight > 0 ? weightedSum / totalWeight : 0;

    return {
      caseId: c.id,
      actual: c.outcomeScore,
      predicted: Math.round(predicted),
      error: Math.round(c.outcomeScore - predicted)
    };
  });

  // Calculate R2 and MSE
  const n = predictions.length;
  const meanActual = predictions.reduce((sum, p) => sum + p.actual, 0) / n;
  const ssTotal = predictions.reduce((sum, p) => sum + (p.actual - meanActual) ** 2, 0);
  const ssResidual = predictions.reduce((sum, p) => sum + (p.actual - p.predicted) ** 2, 0);

  const r2 = ssTotal > 0 ? 1 - (ssResidual / ssTotal) : 0;
  const mse = ssResidual / n;
  const averageError = predictions.reduce((sum, p) => sum + Math.abs(p.error), 0) / n;

  // Calculate accuracy (correct outcome category)
  let correct = 0;
  for (const p of predictions) {
    const actualCategory = p.actual >= 70 ? 'consolidated' : p.actual <= 30 ? 'resisted' : 'uncertain';
    const predictedCategory = p.predicted >= 70 ? 'consolidated' : p.predicted <= 30 ? 'resisted' : 'uncertain';
    if (actualCategory === predictedCategory) correct++;
  }

  return {
    modelName,
    r2: Math.round(r2 * 1000) / 1000,
    mse: Math.round(mse),
    averageError: Math.round(averageError),
    predictions,
    accuracy: { correct, total: n, pct: Math.round((correct / n) * 100) }
  };
}

// Compare all theoretical models against historical data
export function compareModels(theoreticalModels: { name: string; weights: ModelWeights }[]): ModelValidation[] {
  return theoreticalModels.map(m => validateModel(m.name, m.weights)).sort((a, b) => b.r2 - a.r2);
}

// Get empirically-derived weights
export function getEmpiricalWeights(): { weights: ModelWeights; validation: RegressionResult } {
  const result = fitWeightsOLS();
  return { weights: result.weights, validation: result };
}

// Analyze which factors best predict consolidation vs resistance
export function getFactorAnalysis(): {
  discriminativePower: { factor: string; power: number }[];
  averagesByOutcome: Record<string, Record<string, number>>;
  keyFindings: string[];
} {
  const discriminativePower = getFactorDiscriminativePower();
  const averagesByOutcome = getAveragesByOutcome();

  const keyFindings: string[] = [];

  // Top discriminative factors
  const top3 = discriminativePower.slice(0, 3);
  keyFindings.push(`Most discriminative factors: ${top3.map(f => f.factor).join(', ')}`);

  // Biggest gaps between consolidated and resisted
  for (const factor of FACTORS) {
    const consolidated = averagesByOutcome.consolidated[factor];
    const resisted = averagesByOutcome.resisted[factor];
    const gap = consolidated - resisted;

    if (gap > 25) {
      keyFindings.push(`${factor}: ${gap}pt gap (consolidated avg ${consolidated}, resisted avg ${resisted})`);
    }
  }

  return { discriminativePower, averagesByOutcome, keyFindings };
}

// Generate a report comparing theoretical vs empirical
export function generateValidationReport(theoreticalModels: { name: string; weights: ModelWeights }[]): {
  empirical: RegressionResult;
  modelComparison: ModelValidation[];
  factorAnalysis: ReturnType<typeof getFactorAnalysis>;
  recommendations: string[];
} {
  const empirical = fitWeightsOLS();
  const modelComparison = compareModels(theoreticalModels);
  const factorAnalysis = getFactorAnalysis();

  const recommendations: string[] = [];

  // Best performing model
  if (modelComparison.length > 0) {
    const best = modelComparison[0];
    recommendations.push(`Best theoretical model: ${best.modelName} (R² = ${best.r2}, accuracy = ${best.accuracy.pct}%)`);
  }

  // Empirical vs theoretical
  if (empirical.r2 > (modelComparison[0]?.r2 || 0)) {
    recommendations.push(`Empirical weights outperform theoretical models (R² = ${empirical.r2})`);
  }

  // Under/over-weighted factors
  const empiricalWeights = empirical.weights;
  for (const model of theoreticalModels.slice(0, 2)) {
    for (const f of FACTORS) {
      const theoreticalW = model.weights[f] || 0;
      const empiricalW = empiricalWeights[f] || 0;
      const diff = empiricalW - theoreticalW;

      if (Math.abs(diff) > 0.1) {
        const direction = diff > 0 ? 'underweights' : 'overweights';
        recommendations.push(`${model.name} ${direction} ${f} (theoretical: ${theoreticalW.toFixed(2)}, empirical: ${empiricalW.toFixed(2)})`);
      }
    }
  }

  return { empirical, modelComparison, factorAnalysis, recommendations };
}
