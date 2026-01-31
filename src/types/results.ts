export interface TrendCategory {
  category: string;
  averageInterest: number;
  peakInterest: number;
  trend: string;
  topQueries: string[];
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
  sentiment: 'negative' | 'neutral' | 'positive';
  outletClass: string;
  outletAffinity: string;
  isNixonToChina: boolean;
  nixonType?: string;
}

export interface OpEdData {
  country: string;
  totalArticles: number;
  articles: OpEdArticle[];
  nixonMoments: OpEdArticle[];
  interpretation: string[];
}

export interface DefectionArticle {
  title: string;
  description: string;
  source: { name: string };
  figure: string;
  figureRole: string;
  severity: number;
}

export interface EliteSignalsData {
  defections: {
    articles: DefectionArticle[];
    totalFound: number;
    coordinationScore: number;
  };
  propaganda: {
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

export interface MarketSignalsData {
  marketConditions: {
    sp500: { level: number; weekChange: number; trend: string };
    treasury10y: { yield: number; trend: string };
    vix: { level: number; interpretation: string };
  };
  tacoPatternAnalysis: {
    instancesLast90Days: number;
    patternHolding: boolean;
    summary: string;
  };
  businessSentiment: {
    overall: string;
    keyHeadlines: string[];
    eliteAlignment: string;
  };
  overallAssessment: {
    marketConstraintLevel: string;
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

export interface FactorResult {
  score: number;
  evidence: string;
  trend: string;
}

export interface Factor {
  id: string;
  name: string;
  dangerThreshold: number;
}

export interface StoredResults {
  generatedAt: string;
  country: string;
  aciScore: number;
  riskLevel: string;
  scores: Record<string, number>;
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
}
