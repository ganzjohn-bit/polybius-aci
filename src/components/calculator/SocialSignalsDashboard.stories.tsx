import type { Meta, StoryObj } from '@storybook/react';
import SocialSignalsDashboard from './SocialSignalsDashboard';
import type { TrendsData, OpEdData, EliteSignalsData, BlueskyData, MarketSignalsData } from '@/types/calculator';

const meta: Meta<typeof SocialSignalsDashboard> = {
  title: 'Calculator/SocialSignalsDashboard',
  component: SocialSignalsDashboard,
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SocialSignalsDashboard>;

const mockTrendsData: TrendsData = {
  country: 'United States',
  categoryAggregates: [
    { category: 'exit', avgInterest: 45, avgChange: 12, hasSpike: true, topKeyword: 'emigration' },
    { category: 'resistance', avgInterest: 38, avgChange: 8, hasSpike: false, topKeyword: 'protest' },
    { category: 'institutional', avgInterest: 52, avgChange: -5, hasSpike: false, topKeyword: 'courts' },
    { category: 'pressFreedom', avgInterest: 35, avgChange: 15, hasSpike: true, topKeyword: 'censorship' },
    { category: 'democracy', avgInterest: 60, avgChange: 3, hasSpike: false, topKeyword: 'voting' },
  ],
  overallTemperature: 58,
  interpretation: [
    'WARNING: Exit-related searches show significant spike (+12%)',
    'Press freedom concerns elevated with recent spike',
    'Institutional anxiety moderate but stable',
  ],
};

const mockOpEdData: OpEdData = {
  country: 'United States',
  totalArticles: 156,
  articles: [],
  matrix: {
    elite: { regime: { count: 12, negative: 3, neutral: 5, positive: 4 }, neutral: { count: 8, negative: 4, neutral: 3, positive: 1 }, opposition: { count: 15, negative: 10, neutral: 4, positive: 1 } },
    mainstream: { regime: { count: 20, negative: 5, neutral: 10, positive: 5 }, neutral: { count: 35, negative: 15, neutral: 15, positive: 5 }, opposition: { count: 25, negative: 18, neutral: 5, positive: 2 } },
    populist: { regime: { count: 18, negative: 2, neutral: 5, positive: 11 }, neutral: { count: 10, negative: 6, neutral: 3, positive: 1 }, opposition: { count: 13, negative: 9, neutral: 3, positive: 1 } },
  },
  derivedSignals: {
    eliteDefection: { score: 42, evidence: ['Several business leaders have publicly distanced from administration policies'] },
    hegemnonicCrisis: { score: 55, evidence: ['Growing narrative fragmentation across media outlets'] },
    classConflict: { score: 38, evidence: ['Divergent framing between elite and populist outlets'] },
    eliteCoordination: { score: 65, evidence: ['High messaging consistency in regime-aligned media'] },
    baseErosion: { score: 28, evidence: ['Some erosion visible but base largely intact'] },
  },
  nixonMoments: [
    { title: 'Conservative Think Tank Breaks With Administration', description: '', source: { name: 'WSJ' }, url: '#', sentiment: 'negative', outletClass: 'elite', outletAffinity: 'regime', signalWeight: 2.5, isNixonToChina: true, nixonType: 'Elite defection' },
  ],
  interpretation: [
    'HEGEMONIC CRISIS: Significant narrative fragmentation detected',
    'ELITE COORDINATION: High messaging consistency suggests organized response',
    'Base erosion low but elite defection signals emerging',
  ],
};

const mockEliteSignalsData: EliteSignalsData = {
  defections: {
    articles: [],
    totalFound: 23,
    byFigure: [
      { figure: 'Mitt Romney', role: 'Senator', count: 5, maxSeverity: 75 },
      { figure: 'Liz Cheney', role: 'Former Rep.', count: 8, maxSeverity: 85 },
      { figure: 'Adam Kinzinger', role: 'Former Rep.', count: 4, maxSeverity: 70 },
    ],
    coordinationScore: 68,
  },
  propaganda: {
    metrics: {
      negativeStoriesTotal: 145,
      negativeInOpposition: 120,
      negativeInRegimeMedia: 25,
      penetrationRate: 17,
      echoEffect: 35,
      counterNarrativeCount: 42,
      blackoutScore: 83,
    },
    effectivenessScore: 62,
  },
  interpretation: [
    'Party coordination moderate with notable defections',
    'Propaganda effectiveness elevated - significant story containment',
    'Echo effect low suggests partisan silos largely holding',
  ],
};

const mockBlueskyData: BlueskyData = {
  country: 'United States',
  totalPosts: 2500,
  posts: [],
  sentimentBreakdown: { negative: 850, neutral: 1200, positive: 450 },
  topIndicators: [
    { indicator: 'democracy death fears', count: 234 },
    { indicator: 'emigration mentions', count: 189 },
    { indicator: 'fascism comparisons', count: 156 },
    { indicator: 'institutional anxiety', count: 143 },
  ],
  temperature: 68,
  interpretation: [
    'HIGH STRESS: Elevated temperature indicates significant anxiety',
    'Emigration discourse prominent suggesting loss of faith',
    'Historical comparisons frequent in political discourse',
  ],
};

const mockMarketSignalsData: MarketSignalsData = {
  marketConditions: {
    sp500: { level: 5234, weekChange: -2.3, monthChange: 1.5, trend: 'declining' },
    treasury10y: { yield: 4.52, weekChange: 0.12, trend: 'rising', elevated: true },
    vix: { level: 22, interpretation: 'elevated' },
    recentVolatility: 'above average',
  },
  policyMarketEvents: [],
  tacoPatternAnalysis: {
    instancesLast90Days: 3,
    patternHolding: true,
    marketDisciplineWorking: true,
    summary: 'Markets have successfully pushed back on 3 policy proposals in the last 90 days.',
  },
  businessSentiment: {
    overall: 'cautious',
    keyHeadlines: ['CEOs express concern over regulatory uncertainty', 'Investment plans on hold pending clarity'],
    eliteAlignment: 'mixed',
    notableStatements: [],
  },
  modelInterpretations: {
    marxian: { interpretation: 'Capital showing signs of hedging', implication: 'Potential realignment' },
    redistributive: { interpretation: 'Elite calculation in flux', implication: 'Watch for coordination' },
    gramscian: { interpretation: 'Business media framing shifting', implication: 'Counter-hegemony possible' },
    svolik: { interpretation: 'Elite defection signals emerging', implication: 'Coordination failure risk' },
    classical: { interpretation: 'Market as check on demagoguery', implication: 'Constraint operative' },
    paxton: { interpretation: 'Business not fully aligned', implication: 'Consolidation incomplete' },
  },
  overallAssessment: {
    marketConstraintLevel: 'moderate',
    regimeResponsiveness: 'medium',
    consolidationImplication: 'Markets providing some restraint',
    summary: 'Financial markets exercising moderate constraint. Business elite showing caution but not unified resistance.',
  },
};

export const Empty: Story = {
  args: {
    country: 'United States',
    trendsData: null,
    opEdData: null,
    eliteSignalsData: null,
    blueskyData: null,
    marketSignalsData: null,
    isFetchingTrends: false,
    isFetchingOpEds: false,
    isFetchingEliteSignals: false,
    isFetchingBluesky: false,
    isFetchingMarkets: false,
    onFetchTrends: () => console.log('Fetch trends'),
    onFetchOpEds: () => console.log('Fetch op-eds'),
    onFetchEliteSignals: () => console.log('Fetch elite signals'),
    onFetchBluesky: () => console.log('Fetch bluesky'),
    onFetchMarkets: () => console.log('Fetch markets'),
    error: null,
    onSynthesize: () => console.log('Synthesize'),
    hasSocialSignals: false,
    hasApiKey: true,
  },
};

export const Loading: Story = {
  args: {
    ...Empty.args,
    isFetchingTrends: true,
    isFetchingOpEds: true,
  },
};

export const WithAllData: Story = {
  args: {
    country: 'United States',
    trendsData: mockTrendsData,
    opEdData: mockOpEdData,
    eliteSignalsData: mockEliteSignalsData,
    blueskyData: mockBlueskyData,
    marketSignalsData: mockMarketSignalsData,
    isFetchingTrends: false,
    isFetchingOpEds: false,
    isFetchingEliteSignals: false,
    isFetchingBluesky: false,
    isFetchingMarkets: false,
    onFetchTrends: () => {},
    onFetchOpEds: () => {},
    onFetchEliteSignals: () => {},
    onFetchBluesky: () => {},
    onFetchMarkets: () => {},
    error: null,
    onSynthesize: () => console.log('Synthesize'),
    hasSocialSignals: true,
    hasApiKey: true,
  },
};

export const WithError: Story = {
  args: {
    ...Empty.args,
    error: 'Failed to fetch trends data. Please check your API key.',
  },
};

export const PartialData: Story = {
  args: {
    ...Empty.args,
    trendsData: mockTrendsData,
    blueskyData: mockBlueskyData,
    hasSocialSignals: true,
  },
};
