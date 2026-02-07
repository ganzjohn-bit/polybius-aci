import {  FactorResult, Scores } from "./calculator";

export interface TrendCategory {
  category: string;
  avgInterest: number;
  peakInterest: number;
  trend: string;
  hasSpike: boolean
  topQueries: string[]
}

export interface TrendsData {
  country: string;
  categoryAggregates: TrendCategory[];
  overallTemperature: number;
  interpretation: string[];
}

export interface OpEdArticle {
  title: string;
  description: string;
  source: { name: string };
  url?: string;
  sentiment: 'negative' | 'neutral' | 'positive';
  outletClass: 'elite' | 'mainstream' | 'populist' | 'unknown';
  outletAffinity: 'regime' | 'neutral' | 'opposition' | 'unknown';
  isNixonToChina: boolean;
  nixonType?: string;
}

export interface OpEdData {
  country: string;
  totalArticles: number;
  articles: OpEdArticle[];
  matrix?: OpEdMatrix
  derivedSignals: DerivedSignals
  nixonMoments: OpEdArticle[];
  interpretation: string[];
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

export interface DefectionArticle {
  title: string;
  description: string;
  source: { name: string };
  figure: string;
  figureRole: string;
  severity: number;
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
    metrics: PropagandaMetrics
    effectivenessScore: number;
  };
  interpretation: string[];
}

export interface BlueskyPost {
  text: string;
  author: string;
  likeCount: number;
  sentiment: string;
}

export interface BlueskyData {
  country: string;
  totalPosts: number;
  posts: BlueskyPost[];
  sentimentBreakdown: { negative: number; neutral: number; positive: number };
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
  modelInterpretations?: {
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

export interface ModelUsed {
  id: string;
  name: string;
  author: string;
  cluster: string;
  shortDesc: string;
  fullDesc: string;
  keyWorks: string;
  weights: Record<string, number>;
}

export interface StoredResults {
  generatedAt: string;
  country: string;
  aciScore: number;
  riskLevel: string;
  scores: Scores;
  summary: string;
  factorResults: Record<string, FactorResult>;
  historicalComparison?: {
    averageScore: number;
    mostSimilarCases: { country: string; period: string; outcome: string }[];
    interpretation: string[];
  };
  socialSignals?: {
    trends: TrendsData | null;
    opEds: OpEdData | null;
    eliteSignals: EliteSignalsData | null;
    bluesky: BlueskyData | null;
    marketSignals: MarketSignalsData | null;
  };
  modelsUsed?: ModelUsed[];
  modelDiagnoses?: Record<string, string>;
}
