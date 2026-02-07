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

export type Scores = Record<string, number>

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
