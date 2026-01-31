export interface FactorResult {
  score: number;
  evidence: string;
  trend?: string;
  sources?: string;
  courtBalance?: string;
  legalCapacity?: string;
}

export interface ResearchResults {
  judicial?: FactorResult;
  federalism?: FactorResult;
  political?: FactorResult;
  media?: FactorResult;
  civil?: FactorResult;
  publicOpinion?: FactorResult;
  mobilizationalBalance?: FactorResult;
  stateCapacity?: FactorResult;
  corporateCompliance?: FactorResult;
  electionInterference?: FactorResult;
  summary?: string;
}

export interface TrendCategory {
  category: string;
  avgInterest: number;
  avgChange: number;
  hasSpike: boolean;
  topKeyword: string | null;
}

export interface TrendsData {
  country: string;
  categoryAggregates: TrendCategory[];
  overallTemperature: number;
  interpretation: string[];
  errors?: string[];
}

export interface OpEdArticle {
  title: string;
  description: string;
  source: { name: string };
  url: string;
  sentiment: 'negative' | 'neutral' | 'positive';
  outletClass: 'elite' | 'mainstream' | 'populist' | 'unknown';
  outletAffinity: 'regime' | 'neutral' | 'opposition' | 'unknown';
  signalWeight: number;
  isNixonToChina: boolean;
  nixonType?: string;
}

export interface MatrixCell {
  count: number;
  negative: number;
  neutral: number;
  positive: number;
}

export interface OpEdMatrix {
  elite: { regime: MatrixCell; neutral: MatrixCell; opposition: MatrixCell };
  mainstream: { regime: MatrixCell; neutral: MatrixCell; opposition: MatrixCell };
  populist: { regime: MatrixCell; neutral: MatrixCell; opposition: MatrixCell };
}

export interface DerivedSignals {
  eliteDefection: { score: number; evidence: string[] };
  hegemnonicCrisis: { score: number; evidence: string[] };
  classConflict: { score: number; evidence: string[] };
  eliteCoordination: { score: number; evidence: string[] };
  baseErosion: { score: number; evidence: string[] };
}

export interface OpEdData {
  country: string;
  totalArticles: number;
  articles: OpEdArticle[];
  matrix: OpEdMatrix;
  derivedSignals: DerivedSignals;
  nixonMoments: OpEdArticle[];
  interpretation: string[];
}

export interface DefectionArticle {
  title: string;
  description: string;
  source: { name: string };
  url: string;
  figure: string;
  figureRole: string;
  severity: number;
  defectionType: string;
}

export interface PropagandaMetrics {
  negativeStoriesTotal: number;
  negativeInOpposition: number;
  negativeInRegimeMedia: number;
  penetrationRate: number;
  echoEffect: number;
  counterNarrativeCount: number;
  blackoutScore: number;
}

export interface EliteSignalsData {
  defections: {
    articles: DefectionArticle[];
    totalFound: number;
    byFigure: { figure: string; role: string; count: number; maxSeverity: number }[];
    coordinationScore: number;
  };
  propaganda: {
    metrics: PropagandaMetrics;
    effectivenessScore: number;
  };
  interpretation: string[];
}

export interface BlueskyPost {
  text: string;
  author: string;
  authorHandle: string;
  likeCount: number;
  repostCount: number;
  sentiment: 'negative' | 'neutral' | 'positive';
  stressIndicators: string[];
  uri: string;
}

export interface BlueskyData {
  country: string;
  totalPosts: number;
  posts: BlueskyPost[];
  sentimentBreakdown: { negative: number; neutral: number; positive: number };
  topIndicators: { indicator: string; count: number }[];
  temperature: number;
  interpretation: string[];
}

export interface MarketConditions {
  sp500: { level: number; weekChange: number; monthChange: number; trend: string };
  treasury10y: { yield: number; weekChange: number; trend: string; elevated: boolean };
  vix: { level: number; interpretation: string };
  recentVolatility: string;
}

export interface PolicyMarketEvent {
  date: string;
  policy: string;
  marketReaction: string;
  magnitude: number;
  followUp: string;
  tacoPattern: boolean;
}

export interface ModelMarketInterpretation {
  interpretation: string;
  implication: string;
  [key: string]: string;
}

export interface MarketSignalsData {
  marketConditions: MarketConditions;
  policyMarketEvents: PolicyMarketEvent[];
  tacoPatternAnalysis: {
    instancesLast90Days: number;
    patternHolding: boolean;
    marketDisciplineWorking: boolean;
    summary: string;
  };
  businessSentiment: {
    overall: string;
    keyHeadlines: string[];
    eliteAlignment: string;
    notableStatements: string[];
  };
  modelInterpretations: {
    marxian: ModelMarketInterpretation;
    redistributive: ModelMarketInterpretation;
    gramscian: ModelMarketInterpretation;
    svolik: ModelMarketInterpretation;
    classical: ModelMarketInterpretation;
    paxton: ModelMarketInterpretation;
  };
  overallAssessment: {
    marketConstraintLevel: string;
    regimeResponsiveness: string;
    consolidationImplication: string;
    summary: string;
  };
}

export interface CaseSimilarity {
  caseId: string;
  country: string;
  period: string;
  outcome: string;
  outcomeScore: number;
  similarity: number;
}

export interface ComparativeModelAnalysis {
  modelName: string;
  mostSimilarCases: CaseSimilarity[];
  predictedOutcome: {
    score: number;
    confidence: string;
    reasoning: string;
  };
  theoreticalExplanation?: string;
  warningSignals: string[];
  hopefulSignals: string[];
}

export interface ComparativeAnalysisData {
  comparativeAnalysis: ComparativeModelAnalysis[];
  consensus: {
    averageScore: number;
    scoreRange: { min: number; max: number };
    agreementLevel: string;
    summary: string;
  };
  mostCitedCases: {
    caseId: string;
    country: string;
    period: string;
    citedBy: string[];
    outcome: string;
  }[];
  interpretation: string[];
}

export interface TheoreticalModel {
  id: string;
  name: string;
  author: string;
  cluster: string;
  weights: Record<string, number>;
  shortDesc: string;
  fullDesc: string;
  keyWorks: string;
}

export interface Factor {
  id: string;
  name: string;
  weight: number;
  dangerThreshold: number;
  description: string;
}

export interface Scores {
  judicial: number;
  federalism: number;
  political: number;
  media: number;
  civil: number;
  publicOpinion: number;
  mobilizationalBalance: number;
  stateCapacity: number;
  corporateCompliance: number;
  electionInterference: number;
}

export interface RiskLevel {
  level: string;
  color: string;
  textColor: string;
  bgLight: string;
}

export interface FactorContribution {
  id: string;
  name: string;
  weight: number;
  factorScore: number;
  contribution: number;
  weightPercent: number;
}

export interface ModelScore {
  id: string;
  name: string;
  author: string;
  cluster: string;
  score: number;
  risk: RiskLevel;
  topDrivers: FactorContribution[];
  lowFactors: FactorContribution[];
  factorContributions: FactorContribution[];
  explanation: string;
  isOutlier: boolean;
  deviationFromMean: number;
  outlierDirection: 'high' | 'low' | null;
}

export interface ClusterAverage {
  cluster: string;
  label: string;
  avgScore: number;
  models: string[];
}

export interface PublishStatus {
  type: 'success' | 'error';
  message: string;
}
