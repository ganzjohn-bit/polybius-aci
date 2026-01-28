'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Loader2, Check, Settings, X, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Info, Activity, Heart, Newspaper, Search, ExternalLink, BookOpen, Users, Shield, Radio, Upload } from 'lucide-react';

interface FactorResult {
  score: number;
  evidence: string;
  trend?: string;
  sources?: string;
  courtBalance?: string;
  legalCapacity?: string;
}

interface ResearchResults {
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

interface TrendCategory {
  category: string;
  avgInterest: number;
  avgChange: number;
  hasSpike: boolean;
  topKeyword: string | null;
}

interface TrendsData {
  country: string;
  categoryAggregates: TrendCategory[];
  overallTemperature: number;
  interpretation: string[];
  errors?: string[];
}

interface HeadlineArticle {
  title: string;
  description: string;
  source: { name: string };
  url: string;
  publishedAt: string;
  sentiment: 'negative' | 'neutral' | 'positive';
  category: string;
  stressIndicators: string[];
}

interface HeadlinesData {
  country: string;
  totalArticles: number;
  articles: HeadlineArticle[];
  categoryBreakdown: Record<string, number>;
  sentimentBreakdown: Record<string, number>;
  topIndicators: { indicator: string; count: number }[];
  stressScore: number;
  interpretation: string[];
}

interface OpEdArticle {
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

interface MatrixCell {
  count: number;
  negative: number;
  neutral: number;
  positive: number;
}

interface OpEdMatrix {
  elite: { regime: MatrixCell; neutral: MatrixCell; opposition: MatrixCell };
  mainstream: { regime: MatrixCell; neutral: MatrixCell; opposition: MatrixCell };
  populist: { regime: MatrixCell; neutral: MatrixCell; opposition: MatrixCell };
}

interface DerivedSignals {
  eliteDefection: { score: number; evidence: string[] };
  hegemnonicCrisis: { score: number; evidence: string[] };
  classConflict: { score: number; evidence: string[] };
  eliteCoordination: { score: number; evidence: string[] };
  baseErosion: { score: number; evidence: string[] };
}

interface OpEdData {
  country: string;
  totalArticles: number;
  articles: OpEdArticle[];
  matrix: OpEdMatrix;
  derivedSignals: DerivedSignals;
  nixonMoments: OpEdArticle[];
  interpretation: string[];
}


interface DefectionArticle {
  title: string;
  description: string;
  source: { name: string };
  url: string;
  figure: string;
  figureRole: string;
  severity: number;
  defectionType: string;
}

interface PropagandaMetrics {
  negativeStoriesTotal: number;
  negativeInOpposition: number;
  negativeInRegimeMedia: number;
  penetrationRate: number;
  echoEffect: number;
  counterNarrativeCount: number;
  blackoutScore: number;
}

interface EliteSignalsData {
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

interface BlueskyPost {
  text: string;
  author: string;
  authorHandle: string;
  likeCount: number;
  repostCount: number;
  sentiment: 'negative' | 'neutral' | 'positive';
  stressIndicators: string[];
  uri: string;
}

interface BlueskyData {
  country: string;
  totalPosts: number;
  posts: BlueskyPost[];
  sentimentBreakdown: { negative: number; neutral: number; positive: number };
  topIndicators: { indicator: string; count: number }[];
  temperature: number;
  interpretation: string[];
}

interface MarketConditions {
  sp500: { level: number; weekChange: number; monthChange: number; trend: string };
  treasury10y: { yield: number; weekChange: number; trend: string; elevated: boolean };
  vix: { level: number; interpretation: string };
  recentVolatility: string;
}

interface PolicyMarketEvent {
  date: string;
  policy: string;
  marketReaction: string;
  magnitude: number;
  followUp: string;
  tacoPattern: boolean;
}

interface ModelMarketInterpretation {
  interpretation: string;
  implication: string;
  [key: string]: string;
}

interface MarketSignalsData {
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

interface CaseSimilarity {
  caseId: string;
  country: string;
  period: string;
  outcome: string;
  outcomeScore: number;
  similarity: number;
}

interface ComparativeModelAnalysis {
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

interface ComparativeAnalysisData {
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
  const [headlinesData, setHeadlinesData] = useState<HeadlinesData | null>(null);
  const [isFetchingTrends, setIsFetchingTrends] = useState(false);
  const [isFetchingHeadlines, setIsFetchingHeadlines] = useState(false);
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
  const [socialError, setSocialError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
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

  const theoreticalModels = [
    {
      id: 'linz',
      name: 'Linzian Presidentialism',
      author: 'Juan Linz',
      cluster: 'institutionalist',
      weights: { judicial: 0.15, federalism: 0.30, political: 0.35, media: 0.05, civil: 0.05, publicOpinion: 0.05, mobilizationalBalance: 0.05, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
      shortDesc: 'Presidential systems and democratic breakdown',
      fullDesc: `Juan Linz's seminal work "The Perils of Presidentialism" (1990) argues that presidential systems are inherently more prone to democratic breakdown than parliamentary ones. Key mechanisms include:

• Dual Democratic Legitimacy: Both president and legislature claim popular mandates, creating irresolvable conflicts
• Fixed Terms: Unlike parliamentary systems, there's no institutional mechanism to resolve deadlock short of crisis
• Winner-Take-All: Presidential elections create zero-sum dynamics that exacerbate polarization
• Outsider Appeal: The system enables political outsiders to win power without coalitional experience

This model weights political competition and federalism heavily, as Linz saw fragmented opposition and strong regional resistance as key countervailing forces against presidential overreach.`,
      keyWorks: 'The Perils of Presidentialism (1990), The Breakdown of Democratic Regimes (1978)'
    },
    {
      id: 'levitsky',
      name: 'Levitsky & Ziblatt',
      author: 'Steven Levitsky & Daniel Ziblatt',
      cluster: 'institutionalist',
      weights: { judicial: 0.30, federalism: 0.05, political: 0.20, media: 0.25, civil: 0.05, publicOpinion: 0.00, mobilizationalBalance: 0.00, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.15 },
      shortDesc: 'Democratic norms and institutional guardrails',
      fullDesc: `"How Democracies Die" (2018) argues that modern democratic breakdown rarely comes through coups but through elected leaders who gradually subvert institutions. Central concepts:

• Mutual Toleration: Accepting opponents as legitimate, not existential enemies
• Institutional Forbearance: Restraint in using legal powers to their maximum extent
• Gatekeeping Failure: When parties nominate or ally with authoritarian-leaning figures
• Referee Capture: Politicizing courts, election bodies, and law enforcement

The model emphasizes that democracies die through a series of incremental steps that each seem justifiable in isolation. It weights judicial independence highly as courts are the last institutional check, and media as the mechanism through which norm violations become visible (or invisible) to the public.`,
      keyWorks: 'How Democracies Die (2018), Competitive Authoritarianism (2010)'
    },
    {
      id: 'marxian',
      name: 'Marxian Class Analysis',
      author: 'Marx, Poulantzas, Miliband',
      cluster: 'class-economic',
      weights: { judicial: 0.00, federalism: 0.00, political: 0.10, media: 0.25, civil: 0.05, publicOpinion: 0.00, mobilizationalBalance: 0.10, stateCapacity: 0.15, corporateCompliance: 0.35, electionInterference: 0.00 },
      shortDesc: 'Capitalism, class conflict, and authoritarianism',
      fullDesc: `The Marxian tradition sees authoritarianism as emerging from contradictions in capitalist democracy. When democratic institutions threaten capital accumulation or redistribution, economic elites may support authoritarian alternatives. Key concepts:

• Bonapartism: When class stalemate enables a strong executive to appear "above" class conflict while serving capital
• Relative Autonomy: The state has some independence from direct capitalist control but structurally serves capital's long-term interests
• Ideological State Apparatuses: Media, education, and culture manufacture consent for existing power relations
• Exceptional State: Fascism as capital's response to working-class threat when normal hegemony fails

This model weights corporate compliance and media capture heavily, viewing business elite alignment with authoritarianism as the critical enabling condition. Democratic breakdown occurs when capital perceives democracy as threatening to property relations.`,
      keyWorks: 'The Eighteenth Brumaire (Marx), Fascism and Dictatorship (Poulantzas), The State in Capitalist Society (Miliband)'
    },
    {
      id: 'kaleckiAR',
      name: 'Redistributive Conflict Theory',
      author: 'Kalecki, Przeworski, Acemoglu & Robinson',
      cluster: 'class-economic',
      weights: { judicial: 0.00, federalism: 0.00, political: 0.15, media: 0.10, civil: 0.00, publicOpinion: 0.15, mobilizationalBalance: 0.10, stateCapacity: 0.20, corporateCompliance: 0.30, electionInterference: 0.00 },
      shortDesc: 'Elite cost-benefit calculations under redistribution threat',
      fullDesc: `This tradition analyzes regime choice through the lens of redistributive conflict between elites and masses. Building on Kalecki's "Political Aspects of Full Employment" (1943), Przeworski's work on democratic stability, and Acemoglu & Robinson's "Economic Origins of Dictatorship and Democracy" (2006):

• Business Confidence (Kalecki): Capital can "punish" democratic governments through investment strikes when policies threaten profits
• Democracy as Credible Commitment (Acemoglu & Robinson): Elites extend the franchise as a credible commitment to future redistribution, preventing revolution. Democracy emerges when elites cannot credibly commit to redistribution without institutional constraints
• Policy Space (Przeworski): Democracy's survival depends on keeping redistribution within limits acceptable to capital while providing enough to satisfy labor
• Institutional Choice: Elites choose between democracy and authoritarianism based on expected costs/benefits of each regime type

The model suggests authoritarianism becomes attractive to elites when:
1. Democratic redistribution threatens core interests beyond acceptable limits
2. State capacity exists to repress labor/popular movements effectively
3. The costs of repression are lower than the costs of redistribution

Weights state capacity and corporate compliance heavily, as elite motivation AND means are both necessary for authoritarian turn.`,
      keyWorks: 'Political Aspects of Full Employment (Kalecki, 1943), Democracy and the Market (Przeworski, 1991), Economic Origins of Dictatorship and Democracy (Acemoglu & Robinson, 2006)'
    },
    {
      id: 'tocqueville',
      name: 'Tocquevillean Civil Society',
      author: 'Alexis de Tocqueville',
      cluster: 'cultural-social',
      weights: { judicial: 0.05, federalism: 0.30, political: 0.05, media: 0.05, civil: 0.35, publicOpinion: 0.10, mobilizationalBalance: 0.10, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
      shortDesc: 'Civic associations as bulwark against tyranny',
      fullDesc: `Tocqueville's "Democracy in America" (1835-40) identified the conditions enabling American democracy to avoid the authoritarian temptations that plagued post-revolutionary France:

• Associational Life: Voluntary organizations teach democratic habits and create countervailing powers
• Local Self-Government: Township democracy and federalism prevent concentration of power
• Civic Virtue: Active citizenship and public-spiritedness counter privatism and apathy
• Soft Despotism: The danger of a paternalistic state that infantilizes citizens through comfortable dependence

For Tocqueville, democracy's survival depends less on formal institutions than on the "habits of the heart"—the mores, customs, and civic practices of the people. Tyranny emerges when atomized individuals, lacking intermediate associations, face the state alone.

This model heavily weights civil society and federalism as the crucial barriers to authoritarian consolidation, viewing a vibrant associational life as democracy's immune system.`,
      keyWorks: 'Democracy in America (1835-1840), The Old Regime and the Revolution (1856)'
    },
    {
      id: 'gramscian',
      name: 'Gramscian Hegemony',
      author: 'Antonio Gramsci, Stuart Hall',
      cluster: 'cultural-social',
      weights: { judicial: 0.00, federalism: 0.00, political: 0.05, media: 0.30, civil: 0.15, publicOpinion: 0.25, mobilizationalBalance: 0.25, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
      shortDesc: 'Cultural hegemony, conjunctural analysis, and authoritarian populism',
      fullDesc: `Gramsci's Prison Notebooks develop a sophisticated theory of how power operates through cultural hegemony—the way ruling ideas become "common sense." Stuart Hall extended this framework to analyze contemporary authoritarianism through conjunctural analysis. Key concepts:

GRAMSCI:
• Hegemony vs. Domination: Stable rule requires consent (hegemony) not just force (domination)
• Organic Crisis: When the ruling bloc loses hegemony, creating space for radical alternatives
• Caesarism: A "strong man" emerges when neither progressive nor reactionary forces can achieve hegemony
• War of Position: The long struggle over civil society, media, and cultural institutions

HALL'S EXTENSIONS:
• Conjunctural Analysis: Specific historical moments where multiple forces and contradictions condense—the conjuncture is not reducible to economic crisis alone
• Articulation: How different grievances (economic anxiety, racial resentment, cultural dislocation) get linked together into a coherent political project
• Authoritarian Populism: Hall's analysis of Thatcherism showed how authoritarian state projects can win popular consent by articulating fears about crime, immigration, and moral decline
• Race and Nation: How racialized discourse becomes articulated with authoritarian politics, making "the nation" a site of exclusionary mobilization

Gramsci saw fascism emerging from a hegemonic void. Hall showed how the New Right actively constructed a new hegemony by articulating popular anxieties into a coherent worldview—not simply filling a vacuum but building consent for authoritarian measures.

This model weights media and public opinion heavily, viewing the struggle over ideas, narratives, and cultural common sense as the terrain where authoritarianism is enabled or resisted.`,
      keyWorks: 'Gramsci: Prison Notebooks (1929-1935); Hall: Policing the Crisis (1978), The Hard Road to Renewal (1988)'
    },
    {
      id: 'svolik',
      name: 'Svolik Elite Theory',
      author: 'Milan Svolik',
      cluster: 'elite-strategic',
      weights: { judicial: 0.15, federalism: 0.00, political: 0.35, media: 0.05, civil: 0.00, publicOpinion: 0.30, mobilizationalBalance: 0.10, stateCapacity: 0.05, corporateCompliance: 0.00, electionInterference: 0.00 },
      shortDesc: 'Elite defection and public complicity',
      fullDesc: `Svolik's "The Politics of Authoritarian Rule" (2012) and subsequent work on democratic backsliding focuses on the strategic calculations of political elites and voters:

• Elite Defection: Democracy depends on elites choosing to play by democratic rules even when they could benefit from subversion
• Polarization Trap: When voters are sufficiently polarized, they tolerate their own side's democratic violations
• Information Problems: Voters struggle to distinguish democratic erosion from normal politics
• Coordination Failure: Opposition elites may fail to coordinate resistance, enabling piecemeal subversion

Svolik's experimental research shows that partisan voters will support candidates who violate democratic norms if those candidates share their policy positions—explaining how democratic backsliding can occur with electoral support.

The model weights political competition and public opinion heavily, as elite defection and public complicity are the twin mechanisms of modern democratic erosion.`,
      keyWorks: 'The Politics of Authoritarian Rule (2012), "Polarization versus Democracy" (2019)'
    },
    {
      id: 'gameTheory',
      name: 'Coordination & Focal Points',
      author: 'Barry Weingast, Russell Hardin',
      cluster: 'elite-strategic',
      weights: { judicial: 0.35, federalism: 0.25, political: 0.10, media: 0.05, civil: 0.00, publicOpinion: 0.20, mobilizationalBalance: 0.05, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
      shortDesc: 'Democracy as coordination equilibrium',
      fullDesc: `This approach models democratic stability as a coordination equilibrium maintained by mutual expectations and focal points:

• Self-Enforcing Democracy (Weingast): Democracy survives when citizens coordinate to punish ANY leader who transgresses constitutional limits, regardless of partisan identity. The key is that punishment must be symmetric—my side gets punished too
• Focal Points: Constitutions, norms, and institutions serve as coordination devices that make certain behaviors salient. When everyone expects others to defend a rule, defending it becomes rational
• The Limits Problem: Citizens must agree on what counts as a transgression. Ambiguity allows would-be authoritarians to act in gray zones
• Partisan Polarization Trap: When citizens care more about policy outcomes than democratic rules, they fail to punish their own side's violations, breaking the equilibrium

Democracy breaks down when:
1. Citizens fail to coordinate punishment of transgressors (often due to polarization making people excuse "their side")
2. Constitutional focal points become contested or ambiguous
3. Elite manipulation makes violations hard to identify as such

This model weights judicial independence heavily—courts serve as coordination devices, making violations focal and salient. Federalism creates multiple veto points that raise coordination costs for would-be authoritarians.`,
      keyWorks: '"The Political Foundations of Democracy and the Rule of Law" (Weingast, 1997), "Liberalism, Constitutionalism, and Democracy" (Hardin, 1999)'
    },
    {
      id: 'classical',
      name: 'Classical Theory of Tyranny',
      author: 'Plato, Aristotle, Polybius',
      cluster: 'cultural-social',
      weights: { judicial: 0.00, federalism: 0.00, political: 0.10, media: 0.20, civil: 0.05, publicOpinion: 0.30, mobilizationalBalance: 0.35, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
      shortDesc: 'Demagoguery, passion, and regime decay',
      fullDesc: `Classical political philosophy saw regime change as cyclical, with democracy particularly vulnerable to decay into tyranny through demagoguery:

• Plato's Republic: Democracy degenerates when excessive freedom breeds disorder, creating demand for a strongman who promises order
• Aristotle's Politics: The demagogue flatters the people, attacks the wealthy, and gradually accumulates power through popular support
• Polybius's Anacyclosis: Regime types cycle predictably—democracy becomes mob rule, enabling tyranny

Common themes:
• Passion Over Reason: Democratic decline when citizens prioritize emotion over deliberation
• Flattery and Resentment: The demagogue tells people what they want to hear and channels their resentments
• Civic Virtue Erosion: Democracy requires virtuous citizens; luxury and privatism undermine this
• Class Conflict: Tension between rich and poor destabilizes mixed constitutions

This model heavily weights public opinion and political competition, viewing the demos's receptivity to demagoguery and the health of political deliberation as the key variables. The classical tradition is skeptical of institutional solutions absent civic virtue.`,
      keyWorks: 'Republic (Plato), Politics (Aristotle), Histories (Polybius)'
    },
    {
      id: 'paxton',
      name: 'Paxtonian Fascist Dynamics',
      author: 'Robert Paxton',
      cluster: 'process-dynamic',
      weights: { judicial: 0.05, federalism: 0.00, political: 0.10, media: 0.10, civil: 0.00, publicOpinion: 0.10, mobilizationalBalance: 0.35, stateCapacity: 0.20, corporateCompliance: 0.10, electionInterference: 0.00 },
      shortDesc: 'Fascism as process, elite complicity, and radicalization',
      fullDesc: `Robert Paxton's "The Anatomy of Fascism" (2004) analyzes fascism not as an ideology but as a political process moving through stages:

1. Creation: Fascist movements emerge from post-war/crisis conditions
2. Rooting: Movement establishes itself in political system
3. Arrival to Power: Conservative elites invite fascists into government, believing they can be controlled
4. Exercise of Power: Regime consolidates, choices between normalization and radicalization
5. Radicalization or Entropy: Either escalating violence or settling into routine authoritarianism

Key insights:
• Elite Complicity: Fascism doesn't seize power—it's handed power by conservative elites who fear the left more than fascism
• Mobilizing Passions: Fascism defined by its appeals (national victimhood, purity, unity) not coherent doctrine
• Normalization Trap: Each step seems manageable until it isn't

The model balances institutional factors (judicial, political competition) with attitudinal ones (public opinion), recognizing that fascist consolidation requires both elite decisions and mass mobilization.`,
      keyWorks: 'The Anatomy of Fascism (2004), Vichy France: Old Guard and New Order (1972)'
    },
    {
      id: 'bermanRiley',
      name: 'Dark Side of Social Capital',
      author: 'Sheri Berman, Dylan Riley, Theda Skocpol',
      cluster: 'cultural-social',
      weights: { judicial: 0.00, federalism: 0.05, political: 0.05, media: 0.10, civil: 0.15, publicOpinion: 0.10, mobilizationalBalance: 0.45, stateCapacity: 0.05, corporateCompliance: 0.05, electionInterference: 0.00 },
      shortDesc: 'Associational life can enable authoritarianism',
      fullDesc: `This school challenges the Tocquevillean assumption that civil society inherently supports democracy. Drawing on Berman's analysis of Weimar Germany, Riley's comparative study of fascism's civic foundations, and Skocpol's work on Tea Party organizational infrastructure:

• Weimar Paradox (Berman): Germany had VERY HIGH associational density before the Nazi rise—but those associations were captured by anti-democratic movements. The problem wasn't too little civil society, but civil society turned against democracy.

• Civic Foundations of Fascism (Riley): Fascism emerged strongest in regions with DENSE civil society, not weak civil society. Organizations provide mobilizational infrastructure that can be deployed for anti-democratic purposes.

• Organized vs. Atomized Opposition (Skocpol): The Tea Party succeeded not through mass opinion but through organizational infrastructure—local chapters, aligned media, coordination networks. An organized minority defeats a disorganized majority.

• Bonding vs. Bridging (Putnam critique): "Bonding" social capital (in-group solidarity) can enable exclusionary movements, unlike "bridging" social capital (cross-cutting ties).

Key insight: What matters is not WHETHER civil society exists but WHO controls mobilizational infrastructure and whether it's actually activated. Must assess BOTH sides carefully.

Critical nuance for US religious mobilization: White evangelical churches are often assumed to provide massive GOP advantage, but activation varies widely—many congregations are passive. Meanwhile, Black church infrastructure (AME, National Baptist Convention, COGIC, Black megachurches) provides crucial Democratic mobilization through "Souls to the Polls," voter registration drives, and community organizing—often MORE consistently activated than white evangelical counterparts. Mainline Protestant denominations (Episcopal, PCUSA, UMC, ELCA, UCC) lean moderate-to-liberal but less mobilized. Catholic mobilization is genuinely split: conservative wing (Catholic Vote, some bishops, Knights of Columbus on social issues) vs. progressive wing (Network/Nuns on the Bus, Catholic Worker, Catholic Charities on immigration and labor, Jesuits, religious orders). Hispanic Catholics lean Democratic. Jewish congregations lean Democratic and organized. Don't assume religious = regime advantage.

Regime-side infrastructure: paramilitary groups (Proud Boys, Oath Keepers), local GOP committees, Moms for Liberty, conservative 501c4s.
Opposition infrastructure: union locals (especially teachers, SEIU, AFSCME), Black churches, civil rights chapters, Indivisible, progressive faith networks, state civic tables.

This model weights mobilizational balance heavily—but requires honest assessment of BOTH sides' actual activation, not media-driven assumptions about one side's overwhelming strength.`,
      keyWorks: 'Civil Society and the Collapse of the Weimar Republic (Berman, 1997), The Civic Foundations of Fascism in Europe (Riley, 2010), The Tea Party and the Remaking of Republican Conservatism (Skocpol & Williamson, 2012)'
    },
  ];

  const factors = [
    { id: 'judicial', name: 'Judicial Independence', weight: 0.20, dangerThreshold: 40, description: 'Court independence from executive control, judicial appointments process, constitutional review capacity' },
    { id: 'federalism', name: 'Federalism/Regional Resistance', weight: 0.20, dangerThreshold: 50, description: 'Subnational autonomy, opposition control of states/regions, vertical separation of powers' },
    { id: 'political', name: 'Political Competition', weight: 0.15, dangerThreshold: 55, description: 'Opposition party viability, electoral fairness, legislative independence' },
    { id: 'media', name: 'Media Capture', weight: 0.15, dangerThreshold: 70, description: 'Press freedom, ownership concentration, journalist safety, information ecosystem health' },
    { id: 'civil', name: 'Civil Society', weight: 0.10, dangerThreshold: 65, description: 'NGO freedom, protest rights, union strength, associational life' },
    { id: 'publicOpinion', name: 'Public Opinion', weight: 0.10, dangerThreshold: 55, description: 'Support for democratic NORMS vs. strongman rule (NOT admin approval). High = public open to authoritarianism' },
    { id: 'mobilizationalBalance', name: 'Mobilizational Balance', weight: 0.10, dangerThreshold: 55, description: 'Civil society balance (Berman, Riley, Skocpol). Assess BOTH sides carefully. Regime: white evangelical churches (when activated), GOP committees, militias, conservative 501c4s, conservative Catholic orgs. Opposition: unions (teachers, SEIU, AFSCME), BLACK CHURCHES (Souls to the Polls - often more activated than white evangelicals), mainline Protestant networks, progressive Catholic groups (Nuns on the Bus), civil rights chapters, Indivisible. Catholics are SPLIT - assess both wings. Weight by turnout capacity, not media perception.' },
    { id: 'stateCapacity', name: 'State Capacity', weight: 0.10, dangerThreshold: 60, description: 'Bureaucratic coordination, security service loyalty, surveillance capability' },
    { id: 'corporateCompliance', name: 'Corporate Compliance', weight: 0.10, dangerThreshold: 70, description: 'Business elite alignment, corporate self-censorship, economic pressure compliance' },
    { id: 'electionInterference', name: 'Election Interference', weight: 0.10, dangerThreshold: 40, description: 'Voter suppression, electoral fraud, foreign interference, gerrymandering' }
  ];

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

  const fetchHeadlines = async () => {
    if (!country.trim()) {
      setSocialError('Please enter a country name first');
      return;
    }

    if (!apiKey) {
      setShowSettings(true);
      setSocialError('Please enter your Anthropic API key in settings');
      return;
    }

    setIsFetchingHeadlines(true);
    setSocialError('');

    try {
      console.log('Sending headlines request:', { country, hasApiKey: !!apiKey, apiKeyLength: apiKey?.length });
      const response = await fetch('/api/headlines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, apiKey })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      setHeadlinesData(data);
    } catch (err) {
      setSocialError(err instanceof Error ? err.message : 'Failed to fetch headlines');
    } finally {
      setIsFetchingHeadlines(false);
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
      const naming = trendsData.categoryAggregates.find(c => c.category === 'naming');
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

    // From Headlines
    if (headlinesData) {
      // High stress score from headlines
      if (headlinesData.stressScore > 60) {
        // Distribute stress across relevant factors based on category breakdown
        const cats = headlinesData.categoryBreakdown;
        if ((cats.protests || 0) > 3) {
          adjustments.civil = Math.min(100, (adjustments.civil || scores.civil || 0) + 10);
        }
        if ((cats.judiciary || 0) > 3) {
          adjustments.judicial = Math.min(100, (adjustments.judicial || scores.judicial || 0) + 10);
        }
        if ((cats.media || 0) > 2) {
          adjustments.media = Math.min(100, (adjustments.media || scores.media || 0) + 10);
        }
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

  const hasSocialSignals = trendsData || headlinesData || opEdData || eliteSignalsData || blueskyData || marketSignalsData;

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
                        {activeModels[model.id as keyof typeof activeModels] && <Check className="w-5 h-5 text-green-600 flex-shrink-0" />}
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
              className={`px-8 py-4 text-white rounded-xl font-bold disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg transition-colors min-w-[160px] ${
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
        <div className="bg-purple-50 rounded-xl p-6 mb-8 border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-bold text-slate-800">Social Signals</h3>
            <span className="text-sm text-slate-500">(Trends + Headlines + Hegemonic Analysis)</span>
          </div>

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
              onClick={fetchHeadlines}
              disabled={isFetchingHeadlines || !country.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isFetchingHeadlines ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Fetching Headlines...</>
              ) : (
                <><Newspaper className="w-4 h-4" /> News Headlines</>
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
            <div className="mb-6 bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Search className="w-4 h-4 text-purple-600" />
                  Google Trends: {trendsData.country}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Temperature:</span>
                  <span className={`px-2 py-1 rounded font-bold text-sm ${
                    trendsData.overallTemperature < 30 ? 'bg-green-100 text-green-700' :
                    trendsData.overallTemperature < 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {trendsData.overallTemperature}/100
                  </span>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                {trendsData.categoryAggregates.map(cat => (
                  <div key={cat.category} className={`p-2 rounded-lg text-center ${
                    cat.hasSpike ? 'bg-red-50 border border-red-200' : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <div className="text-xs font-medium text-slate-500 capitalize">{cat.category}</div>
                    <div className="text-lg font-bold text-slate-800">{cat.avgInterest}</div>
                    {cat.avgChange !== 0 && (
                      <div className={`text-xs flex items-center justify-center gap-1 ${
                        cat.avgChange > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {cat.avgChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {cat.avgChange > 0 ? '+' : ''}{cat.avgChange}%
                      </div>
                    )}
                    {cat.hasSpike && <span className="text-xs text-red-600 font-medium">SPIKE</span>}
                  </div>
                ))}
              </div>

              {/* Interpretation */}
              <div className="space-y-1">
                {trendsData.interpretation.map((signal, i) => (
                  <div key={i} className={`text-sm p-2 rounded ${
                    signal.includes('WARNING') || signal.includes('ALERT') || signal.includes('SIGNAL')
                      ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-400'
                      : 'text-slate-600'
                  }`}>
                    {signal}
                  </div>
                ))}
              </div>

              {trendsData.errors && trendsData.errors.length > 0 && (
                <div className="mt-3 text-xs text-slate-400">
                  {trendsData.errors.length} search terms failed to load (rate limited or no data)
                </div>
              )}
            </div>
          )}

          {/* Headlines Results */}
          {headlinesData && (
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-indigo-600" />
                  Headlines: {headlinesData.country}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Stress Score:</span>
                  <span className={`px-2 py-1 rounded font-bold text-sm ${
                    headlinesData.stressScore < 30 ? 'bg-green-100 text-green-700' :
                    headlinesData.stressScore < 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {headlinesData.stressScore}/100
                  </span>
                </div>
              </div>

              {/* Sentiment breakdown */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm text-slate-600">Negative: {headlinesData.sentimentBreakdown.negative || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  <span className="text-sm text-slate-600">Neutral: {headlinesData.sentimentBreakdown.neutral || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-sm text-slate-600">Positive: {headlinesData.sentimentBreakdown.positive || 0}</span>
                </div>
              </div>

              {/* Top stress indicators */}
              {headlinesData.topIndicators.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Top Stress Indicators:</div>
                  <div className="flex flex-wrap gap-2">
                    {headlinesData.topIndicators.slice(0, 6).map((ind, i) => (
                      <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full border border-red-200">
                        {ind.indicator} ({ind.count})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation */}
              <div className="space-y-1 mb-4">
                {headlinesData.interpretation.map((signal, i) => (
                  <div key={i} className={`text-sm p-2 rounded ${
                    signal.includes('HIGH') || signal.includes('Top stress')
                      ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-400'
                      : 'text-slate-600'
                  }`}>
                    {signal}
                  </div>
                ))}
              </div>

              {/* Sample headlines */}
              <div className="border-t border-slate-200 pt-3">
                <div className="text-sm font-medium text-slate-600 mb-2">Recent Headlines ({headlinesData.totalArticles} total):</div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {headlinesData.articles.slice(0, 8).map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 bg-slate-50 rounded hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          article.sentiment === 'negative' ? 'bg-red-500' :
                          article.sentiment === 'positive' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-slate-800 line-clamp-2">{article.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">{article.source.name}</span>
                            <span className="text-xs px-1.5 py-0.5 bg-slate-200 rounded">{article.category}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Op-Ed / Hegemonic Analysis Results */}
          {opEdData && (
            <div className="bg-white rounded-lg p-4 border border-rose-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-rose-600" />
                  Hegemonic Analysis: {opEdData.country}
                </h4>
                <span className="text-sm text-slate-500">{opEdData.totalArticles} op-eds analyzed</span>
              </div>

              {/* Derived Signals for Theoretical Models */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {Object.entries(opEdData.derivedSignals).map(([key, signal]) => {
                  const labels: Record<string, { name: string; model: string }> = {
                    eliteDefection: { name: 'Elite Defection', model: 'Kaleckian/A&R' },
                    hegemnonicCrisis: { name: 'Hegemonic Crisis', model: 'Gramscian' },
                    classConflict: { name: 'Class Conflict', model: 'Marxian' },
                    eliteCoordination: { name: 'Elite Coordination', model: 'Svolik/Game Theory' },
                    baseErosion: { name: 'Base Erosion', model: 'Paxton' }
                  };
                  const label = labels[key] || { name: key, model: '' };

                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-lg border ${
                        signal.score > 50 ? 'bg-red-50 border-red-200' :
                        signal.score > 30 ? 'bg-amber-50 border-amber-200' :
                        'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-slate-700">{label.name}</span>
                        <span className={`text-lg font-bold ${
                          signal.score > 50 ? 'text-red-600' :
                          signal.score > 30 ? 'text-amber-600' :
                          'text-slate-600'
                        }`}>{signal.score}</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">Model: {label.model}</div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className={`h-full rounded-full ${
                            signal.score > 50 ? 'bg-red-500' :
                            signal.score > 30 ? 'bg-amber-500' :
                            'bg-slate-400'
                          }`}
                          style={{ width: `${signal.score}%` }}
                        />
                      </div>
                      {signal.evidence.length > 0 && (
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">{signal.evidence[0]}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Outlet Matrix */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Coverage Matrix (Class × Affinity)
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-2 text-slate-500">Class / Affinity</th>
                        <th className="text-center py-2 px-2 text-green-700">Regime-Friendly</th>
                        <th className="text-center py-2 px-2 text-slate-600">Neutral</th>
                        <th className="text-center py-2 px-2 text-blue-700">Opposition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(['elite', 'mainstream', 'populist'] as const).map(classType => (
                        <tr key={classType} className="border-b border-slate-100">
                          <td className="py-2 px-2 font-medium text-slate-700 capitalize">{classType}</td>
                          {(['regime', 'neutral', 'opposition'] as const).map(affinity => {
                            const cell = opEdData.matrix[classType][affinity];
                            const negPct = cell.count > 0 ? Math.round((cell.negative / cell.count) * 100) : 0;
                            const posPct = cell.count > 0 ? Math.round((cell.positive / cell.count) * 100) : 0;

                            return (
                              <td key={affinity} className="py-2 px-2 text-center">
                                {cell.count > 0 ? (
                                  <div>
                                    <div className="font-medium">{cell.count} articles</div>
                                    <div className="flex justify-center gap-1 mt-1">
                                      <span className="text-red-600">-{negPct}%</span>
                                      <span className="text-gray-400">•</span>
                                      <span className="text-green-600">+{posPct}%</span>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Nixon to China Moments */}
              {opEdData.nixonMoments.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-slate-700 mb-2">&quot;Nixon to China&quot; Moments</h5>
                  <div className="space-y-2">
                    {opEdData.nixonMoments.slice(0, 5).map((article, i) => (
                      <a
                        key={i}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100 transition-colors"
                      >
                        <div className="text-xs font-medium text-amber-700 mb-1">{article.nixonType}</div>
                        <div className="text-sm text-slate-800 line-clamp-1">{article.title}</div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                          <span>{article.source.name}</span>
                          <span className={`px-1.5 py-0.5 rounded ${
                            article.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                            article.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>{article.sentiment}</span>
                          <span className="text-slate-400">Weight: {article.signalWeight.toFixed(1)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation */}
              <div className="space-y-1">
                {opEdData.interpretation.map((signal, i) => (
                  <div key={i} className={`text-sm p-2 rounded ${
                    signal.includes('ELITE DEFECTION') || signal.includes('HEGEMONIC CRISIS') || signal.includes('BASE EROSION')
                      ? 'bg-red-50 text-red-800 border-l-4 border-red-400'
                      : signal.includes('CLASS CONFLICT') || signal.includes('ELITE COORDINATION')
                      ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-400'
                      : 'text-slate-600'
                  }`}>
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Elite Signals (Party Coordination + Propaganda) */}
          {eliteSignalsData && (
            <div className="bg-white rounded-lg p-4 border border-amber-200 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  Elite Signals (US)
                </h4>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Party Coordination */}
                <div className={`p-4 rounded-lg border ${
                  eliteSignalsData.defections.coordinationScore < 50 ? 'bg-red-50 border-red-200' :
                  eliteSignalsData.defections.coordinationScore < 75 ? 'bg-amber-50 border-amber-200' :
                  'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-sm">Party Coordination</span>
                  </div>
                  <div className={`text-3xl font-bold ${
                    eliteSignalsData.defections.coordinationScore < 50 ? 'text-red-600' :
                    eliteSignalsData.defections.coordinationScore < 75 ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {eliteSignalsData.defections.coordinationScore}/100
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {eliteSignalsData.defections.coordinationScore < 50 ? 'Significant defections' :
                     eliteSignalsData.defections.coordinationScore < 75 ? 'Some fractures' :
                     'Party cohesion maintained'}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {eliteSignalsData.defections.totalFound} defection stories found
                  </div>
                </div>

                {/* Propaganda Effectiveness */}
                <div className={`p-4 rounded-lg border ${
                  eliteSignalsData.propaganda.effectivenessScore > 70 ? 'bg-red-50 border-red-200' :
                  eliteSignalsData.propaganda.effectivenessScore > 40 ? 'bg-amber-50 border-amber-200' :
                  'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-sm">Propaganda Effectiveness</span>
                  </div>
                  <div className={`text-3xl font-bold ${
                    eliteSignalsData.propaganda.effectivenessScore > 70 ? 'text-red-600' :
                    eliteSignalsData.propaganda.effectivenessScore > 40 ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {eliteSignalsData.propaganda.effectivenessScore}/100
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {eliteSignalsData.propaganda.effectivenessScore > 70 ? 'High info control' :
                     eliteSignalsData.propaganda.effectivenessScore > 40 ? 'Moderate containment' :
                     'Low info control'}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {eliteSignalsData.propaganda.metrics.blackoutScore}% negative news blocked from regime media
                  </div>
                </div>
              </div>

              {/* Propaganda Metrics Detail */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <h5 className="text-sm font-medium text-slate-700 mb-2">Propaganda Metrics</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Negative stories:</span>
                    <span className="ml-1 font-medium">{eliteSignalsData.propaganda.metrics.negativeStoriesTotal}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">In opposition media:</span>
                    <span className="ml-1 font-medium">{eliteSignalsData.propaganda.metrics.negativeInOpposition}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">In regime media:</span>
                    <span className="ml-1 font-medium">{eliteSignalsData.propaganda.metrics.negativeInRegimeMedia}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Counter-narratives:</span>
                    <span className="ml-1 font-medium">{eliteSignalsData.propaganda.metrics.counterNarrativeCount}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-slate-500">Echo effect (cross-spectrum spread):</span>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${eliteSignalsData.propaganda.metrics.echoEffect}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600">{eliteSignalsData.propaganda.metrics.echoEffect}% - {
                    eliteSignalsData.propaganda.metrics.echoEffect > 50 ? 'Stories breaking through partisan silos' :
                    'Stories largely contained to original spectrum'
                  }</span>
                </div>
              </div>

              {/* GOP Defectors */}
              {eliteSignalsData.defections.byFigure.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-slate-700 mb-2">GOP Figures Breaking Ranks</h5>
                  <div className="flex flex-wrap gap-2">
                    {eliteSignalsData.defections.byFigure.slice(0, 8).map((fig, i) => (
                      <div
                        key={i}
                        className={`px-2 py-1 rounded text-xs ${
                          fig.maxSeverity > 60 ? 'bg-red-100 text-red-700 border border-red-200' :
                          fig.maxSeverity > 40 ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span className="font-medium">{fig.figure}</span>
                        <span className="text-slate-500 ml-1">({fig.role})</span>
                        <span className="ml-1">{fig.count} stories</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Defection Articles */}
              {eliteSignalsData.defections.articles.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-slate-700 mb-2">Recent Defection Coverage</h5>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {eliteSignalsData.defections.articles.slice(0, 5).map((article, i) => (
                      <a
                        key={i}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 bg-slate-50 rounded hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-xs text-amber-700 mb-1">
                          <span className="font-medium">{article.figure}</span>
                          <span className="text-slate-400">•</span>
                          <span className="capitalize">{article.defectionType}</span>
                          <span className="text-slate-400">•</span>
                          <span>Severity: {article.severity}</span>
                        </div>
                        <div className="text-sm text-slate-800 line-clamp-1">{article.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{article.source.name}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation */}
              <div className="space-y-1">
                {eliteSignalsData.interpretation.map((signal, i) => (
                  <div key={i} className={`text-sm p-2 rounded ${
                    signal.includes('FRAGMENTATION') || signal.includes('HIGH PROPAGANDA')
                      ? 'bg-red-50 text-red-800 border-l-4 border-red-400'
                      : signal.includes('WARNING') || signal.includes('STRESS')
                      ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-400'
                      : 'text-slate-600'
                  }`}>
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bluesky Analysis */}
          {blueskyData && (
            <div className="bg-white rounded-lg p-4 border border-sky-200 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-500" />
                  Bluesky: {blueskyData.country}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Temperature:</span>
                  <span className={`px-2 py-1 rounded font-bold text-sm ${
                    blueskyData.temperature > 70 ? 'bg-red-100 text-red-700' :
                    blueskyData.temperature > 50 ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {blueskyData.temperature}/100
                  </span>
                </div>
              </div>

              {/* Sentiment breakdown */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm text-slate-600">Negative: {blueskyData.sentimentBreakdown.negative}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  <span className="text-sm text-slate-600">Neutral: {blueskyData.sentimentBreakdown.neutral}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-sm text-slate-600">Positive: {blueskyData.sentimentBreakdown.positive}</span>
                </div>
                <div className="text-sm text-slate-500">({blueskyData.totalPosts} posts)</div>
              </div>

              {/* Top indicators */}
              {blueskyData.topIndicators.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Top Concerns in Discourse:</div>
                  <div className="flex flex-wrap gap-2">
                    {blueskyData.topIndicators.slice(0, 6).map((ind, i) => (
                      <span key={i} className="px-2 py-1 bg-sky-50 text-sky-700 text-xs rounded-full border border-sky-200">
                        {ind.indicator} ({ind.count})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation */}
              <div className="space-y-1 mb-4">
                {blueskyData.interpretation.map((signal, i) => (
                  <div key={i} className={`text-sm p-2 rounded ${
                    signal.includes('HIGH STRESS') || signal.includes('WARNING')
                      ? 'bg-red-50 text-red-800 border-l-4 border-red-400'
                      : signal.includes('ELEVATED')
                      ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-400'
                      : 'text-slate-600'
                  }`}>
                    {signal}
                  </div>
                ))}
              </div>

              {/* Sample posts */}
              <div className="border-t border-slate-200 pt-3">
                <div className="text-sm font-medium text-slate-600 mb-2">Top Engaged Posts:</div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {blueskyData.posts.slice(0, 8).map((post, i) => (
                    <div
                      key={i}
                      className="p-2 bg-slate-50 rounded"
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          post.sentiment === 'negative' ? 'bg-red-500' :
                          post.sentiment === 'positive' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-slate-800 line-clamp-2">{post.text}</div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <span>@{post.authorHandle}</span>
                            <span>{post.likeCount} likes</span>
                            <span>{post.repostCount} reposts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Market Signals */}
          {marketSignalsData && (
            <div className="bg-white rounded-lg p-4 border border-emerald-200 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Financial Market Signals
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Market Constraint:</span>
                  <span className={`px-2 py-1 rounded font-bold text-sm ${
                    marketSignalsData.overallAssessment.marketConstraintLevel === 'strong' ? 'bg-green-100 text-green-700' :
                    marketSignalsData.overallAssessment.marketConstraintLevel === 'moderate' ? 'bg-amber-100 text-amber-700' :
                    marketSignalsData.overallAssessment.marketConstraintLevel === 'weak' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {marketSignalsData.overallAssessment.marketConstraintLevel.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Market Conditions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-xs text-slate-500">S&P 500</div>
                  <div className="font-semibold text-slate-800">{marketSignalsData.marketConditions.sp500.level.toLocaleString()}</div>
                  <div className={`text-xs ${marketSignalsData.marketConditions.sp500.weekChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Week: {marketSignalsData.marketConditions.sp500.weekChange >= 0 ? '+' : ''}{marketSignalsData.marketConditions.sp500.weekChange}%
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-xs text-slate-500">10Y Treasury</div>
                  <div className="font-semibold text-slate-800">{marketSignalsData.marketConditions.treasury10y.yield}%</div>
                  <div className={`text-xs ${marketSignalsData.marketConditions.treasury10y.elevated ? 'text-amber-600' : 'text-slate-500'}`}>
                    {marketSignalsData.marketConditions.treasury10y.elevated ? 'Elevated' : 'Normal range'}
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-xs text-slate-500">VIX</div>
                  <div className="font-semibold text-slate-800">{marketSignalsData.marketConditions.vix.level}</div>
                  <div className={`text-xs ${
                    marketSignalsData.marketConditions.vix.interpretation === 'high' ? 'text-red-600' :
                    marketSignalsData.marketConditions.vix.interpretation === 'elevated' ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {marketSignalsData.marketConditions.vix.interpretation}
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-xs text-slate-500">Regime Response</div>
                  <div className={`font-semibold ${
                    marketSignalsData.overallAssessment.regimeResponsiveness === 'high' ? 'text-green-700' :
                    marketSignalsData.overallAssessment.regimeResponsiveness === 'medium' ? 'text-amber-700' :
                    'text-red-700'
                  }`}>
                    {marketSignalsData.overallAssessment.regimeResponsiveness.toUpperCase()}
                  </div>
                  <div className="text-xs text-slate-500">to market signals</div>
                </div>
              </div>

              {/* TACO Pattern */}
              <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-800">TACO Pattern Analysis</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    marketSignalsData.tacoPatternAnalysis.patternHolding ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {marketSignalsData.tacoPatternAnalysis.patternHolding ? 'HOLDING' : 'BROKEN'}
                  </span>
                </div>
                <p className="text-sm text-amber-900">{marketSignalsData.tacoPatternAnalysis.summary}</p>
                <div className="mt-2 text-xs text-amber-700">
                  Instances (90 days): {marketSignalsData.tacoPatternAnalysis.instancesLast90Days} |
                  Market discipline: {marketSignalsData.tacoPatternAnalysis.marketDisciplineWorking ? 'Working' : 'Not working'}
                </div>
              </div>

              {/* Business Sentiment */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-slate-700">Business Sentiment:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    marketSignalsData.businessSentiment.overall === 'panic' || marketSignalsData.businessSentiment.overall === 'fearful' ? 'bg-red-100 text-red-700' :
                    marketSignalsData.businessSentiment.overall === 'cautious' ? 'bg-amber-100 text-amber-700' :
                    marketSignalsData.businessSentiment.overall === 'neutral' ? 'bg-slate-100 text-slate-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {marketSignalsData.businessSentiment.overall.toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-500">| Elite alignment:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    marketSignalsData.businessSentiment.eliteAlignment === 'resistant' || marketSignalsData.businessSentiment.eliteAlignment === 'defecting' ? 'bg-green-100 text-green-700' :
                    marketSignalsData.businessSentiment.eliteAlignment === 'mixed' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {marketSignalsData.businessSentiment.eliteAlignment.toUpperCase()}
                  </span>
                </div>
                {marketSignalsData.businessSentiment.keyHeadlines.length > 0 && (
                  <div className="text-xs text-slate-600 space-y-1">
                    {marketSignalsData.businessSentiment.keyHeadlines.slice(0, 3).map((headline, i) => (
                      <div key={i} className="pl-2 border-l-2 border-slate-200">{headline}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Model Interpretations */}
              <div className="border-t border-slate-200 pt-3">
                <div className="text-sm font-medium text-slate-700 mb-2">Model-Specific Interpretations:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-red-50 rounded">
                    <span className="font-semibold text-red-800">Marxian:</span>
                    <span className="text-red-700 ml-1">{marketSignalsData.modelInterpretations.marxian.interpretation.slice(0, 100)}...</span>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <span className="font-semibold text-blue-800">Redistributive:</span>
                    <span className="text-blue-700 ml-1">{marketSignalsData.modelInterpretations.redistributive.interpretation.slice(0, 100)}...</span>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <span className="font-semibold text-purple-800">Gramscian:</span>
                    <span className="text-purple-700 ml-1">{marketSignalsData.modelInterpretations.gramscian.interpretation.slice(0, 100)}...</span>
                  </div>
                  <div className="p-2 bg-amber-50 rounded">
                    <span className="font-semibold text-amber-800">Classical:</span>
                    <span className="text-amber-700 ml-1">{marketSignalsData.modelInterpretations.classical.interpretation.slice(0, 100)}...</span>
                  </div>
                </div>
              </div>

              {/* Overall Assessment */}
              <div className="mt-3 p-3 bg-slate-100 rounded-lg">
                <div className="text-sm font-medium text-slate-700">Overall Assessment:</div>
                <p className="text-sm text-slate-600 mt-1">{marketSignalsData.overallAssessment.summary}</p>
              </div>
            </div>
          )}

          {/* Synthesize Button */}
          {hasSocialSignals && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-amber-100 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-slate-800">Synthesize Social Signals</h5>
                  <p className="text-sm text-slate-600">Apply insights from social signals to adjust the ACI factor scores</p>
                </div>
                <button
                  onClick={synthesizeSignals}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-amber-700 transition-all"
                >
                  Apply to Scores
                </button>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                <strong>Signal mapping:</strong> Trends → Public Opinion, Civil Society, Media | Headlines → Judicial, Civil, Media | Op-Eds → Corporate, Media, Executive | Elite Signals → Political, Media | Bluesky → Public Opinion
              </div>
            </div>
          )}

          {!trendsData && !headlinesData && !opEdData && !eliteSignalsData && !blueskyData && (
            <p className="text-sm text-slate-500">
              Enter a country above and click the buttons to analyze search trends, news headlines, op-ed dynamics, and social media discourse for signs of democratic stress. &quot;Elite Signals&quot; is US-specific and tracks GOP coordination and propaganda effectiveness.
            </p>
          )}
        </div>

        {/* Overall Score */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Overall ACI Score</h2>
              <p className="text-slate-600">Estimated consolidation probability: <span className="font-semibold">{probability}</span></p>
            </div>
            <span className="text-6xl font-bold text-slate-800">{aciScore.toFixed(1)}</span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-12 mb-4 overflow-hidden">
            <div
              className={`h-full ${risk.color} rounded-full flex items-center justify-end pr-4 transition-all duration-700`}
              style={{ width: `${Math.max(Math.min(aciScore, 100), 3)}%` }}
            >
              {aciScore > 15 && <span className="text-white font-bold text-lg">{aciScore.toFixed(1)}</span>}
            </div>
          </div>

          <div className={`${risk.bgLight} rounded-xl p-5 text-center border-2 ${risk.color.replace('bg-', 'border-')}`}>
            <AlertCircle className={`inline-block w-8 h-8 ${risk.textColor} mb-2`} />
            <div className={`font-bold text-2xl ${risk.textColor}`}>{risk.level}</div>
          </div>

          {/* Publish to polybius.world */}
          {hasNonZeroScores && (
            <div className="mt-4 flex flex-col items-center gap-2">
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
                    } : null
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

          {/* Vital Signs Dashboard */}
          {hasNonZeroScores && (
            <div className="mt-8 bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-5">
                <Activity className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Democratic Vital Signs</h3>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${aciScore < 40 ? 'bg-green-500' : aciScore < 60 ? 'bg-yellow-500' : 'bg-red-500'} ${aciScore >= 50 ? 'animate-pulse' : ''}`} />
                  <span className="text-slate-400 text-sm font-mono">
                    {aciScore < 40 ? 'STABLE' : aciScore < 60 ? 'ELEVATED' : 'CRITICAL'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {factors.map(factor => {
                  const score = scores[factor.id as keyof typeof scores];
                  const isCritical = score >= factor.dangerThreshold;
                  const isWarning = score >= factor.dangerThreshold - 15 && score < factor.dangerThreshold;
                  const percentage = score;
                  const result = researchResults?.[factor.id as keyof ResearchResults];
                  const trend = result && typeof result === 'object' ? (result as FactorResult).trend : undefined;

                  return (
                    <div
                      key={factor.id}
                      className={`relative rounded-lg p-3 ${
                        isCritical ? 'bg-red-950 border border-red-500' :
                        isWarning ? 'bg-yellow-950 border border-yellow-600' :
                        'bg-slate-800 border border-slate-600'
                      }`}
                    >
                      {/* Critical pulse effect */}
                      {isCritical && (
                        <div className="absolute inset-0 rounded-lg bg-red-500 opacity-20 animate-pulse" />
                      )}

                      <div className="relative">
                        {/* Factor name */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-slate-400 truncate pr-1">
                            {factor.name.replace('/', '/ ').split(' ').slice(0, 2).join(' ')}
                          </span>
                          {isCritical && <span className="text-red-400 text-xs">⚠</span>}
                        </div>

                        {/* Circular gauge */}
                        <div className="relative w-16 h-16 mx-auto mb-2">
                          <svg className="w-full h-full transform -rotate-90">
                            {/* Background circle */}
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="6"
                              className="text-slate-700"
                            />
                            {/* Progress arc */}
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray={`${percentage * 1.76} 176`}
                              className={`${
                                isCritical ? 'text-red-500' :
                                isWarning ? 'text-yellow-500' :
                                score < 30 ? 'text-green-500' : 'text-blue-500'
                              } transition-all duration-700`}
                            />
                          </svg>
                          {/* Score in center */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-lg font-bold font-mono ${
                              isCritical ? 'text-red-400' :
                              isWarning ? 'text-yellow-400' :
                              'text-white'
                            }`}>
                              {score}
                            </span>
                          </div>
                        </div>

                        {/* Trend indicator */}
                        <div className="flex items-center justify-center gap-1 h-4">
                          {trend && (
                            <>
                              {trend.toLowerCase().includes('improv') && (
                                <><TrendingDown className="w-3 h-3 text-green-400" /><span className="text-xs text-green-400">improving</span></>
                              )}
                              {trend.toLowerCase().includes('deter') && (
                                <><TrendingUp className="w-3 h-3 text-red-400" /><span className="text-xs text-red-400">worsening</span></>
                              )}
                              {trend.toLowerCase().includes('stable') && (
                                <><Minus className="w-3 h-3 text-slate-400" /><span className="text-xs text-slate-400">stable</span></>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Critical factors callout */}
              {factors.filter(f => scores[f.id as keyof typeof scores] >= f.dangerThreshold).length > 0 && (
                <div className="mt-4 p-3 bg-red-950 border border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-400">
                    <Heart className="w-4 h-4" />
                    <span className="font-semibold text-sm">
                      {factors.filter(f => scores[f.id as keyof typeof scores] >= f.dangerThreshold).length} critical indicator{factors.filter(f => scores[f.id as keyof typeof scores] >= f.dangerThreshold).length > 1 ? 's' : ''}:
                    </span>
                    <span className="text-red-300 text-sm">
                      {factors.filter(f => scores[f.id as keyof typeof scores] >= f.dangerThreshold).map(f => f.name).join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {researchResults?.summary && (
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 text-lg mb-3">Analysis Summary</h4>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{researchResults.summary}</p>
            </div>
          )}

          {/* Historical Comparative Analysis */}
          {isFetchingComparative && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-blue-700">Running comparative historical analysis...</span>
            </div>
          )}

          {comparativeData && !isFetchingComparative && (
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <h4 className="font-bold text-slate-800 text-lg">Historical Comparison</h4>
              </div>

              {/* Methodology Explanation */}
              <details className="mb-4 bg-white/60 rounded-lg border border-amber-100">
                <summary className="p-3 text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900">
                  How does this comparison work?
                </summary>
                <div className="px-3 pb-3 text-sm text-slate-600 space-y-2">
                  <p>
                    <strong>Data Sources:</strong> Historical factor scores are derived from the <a href="https://v-dem.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Varieties of Democracy (V-Dem)</a> dataset,
                    the <a href="https://www.systemicpeace.org/polityproject.html" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Polity Project</a>, and country-specific historiography.
                  </p>
                  <p>
                    <strong>Cases Included:</strong> 25+ documented regime transitions including Weimar Germany (1930-33), Fascist Italy (1921-25),
                    Chile (1970-73), Hungary (2010-present), Turkey (2013-present), Venezuela (1999-present), plus successful resistance cases
                    like France (1934-36), Finland (1930s), and recent democratic resilience in Brazil, Poland, and South Korea.
                  </p>
                  <p>
                    <strong>Method:</strong> Each theoretical model identifies which historical cases most closely match current conditions based on its
                    weighted factors. A Marxian analysis emphasizes corporate compliance patterns; Levitsky-Ziblatt focuses on judicial capture sequences;
                    Berman-Riley tracks mobilizational balance. Convergent predictions across models increase confidence.
                  </p>
                  <p>
                    <strong>Key Literature:</strong> Paxton's <em>Anatomy of Fascism</em>, Berman's <em>Civil Society and the Collapse of the Weimar Republic</em>,
                    Riley's <em>The Civic Foundations of Fascism in Europe</em>, Levitsky & Ziblatt's <em>How Democracies Die</em>,
                    Linz's <em>Breakdown of Democratic Regimes</em>.
                  </p>
                </div>
              </details>

              {/* Consensus Box */}
              <div className={`p-4 rounded-lg mb-4 ${
                comparativeData.consensus.averageScore >= 60 ? 'bg-red-100 border border-red-300' :
                comparativeData.consensus.averageScore >= 40 ? 'bg-amber-100 border border-amber-300' :
                'bg-green-100 border border-green-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">Comparative Prediction</span>
                  <span className={`text-2xl font-bold ${
                    comparativeData.consensus.averageScore >= 60 ? 'text-red-700' :
                    comparativeData.consensus.averageScore >= 40 ? 'text-amber-700' :
                    'text-green-700'
                  }`}>
                    {comparativeData.consensus.averageScore}/100
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  Range: {comparativeData.consensus.scoreRange.min}-{comparativeData.consensus.scoreRange.max} |
                  Agreement: <span className={`font-medium ${
                    comparativeData.consensus.agreementLevel === 'high' ? 'text-green-700' :
                    comparativeData.consensus.agreementLevel === 'moderate' ? 'text-amber-700' :
                    'text-red-700'
                  }`}>{comparativeData.consensus.agreementLevel}</span>
                </div>
              </div>

              {/* Most Similar Historical Cases */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-slate-700 mb-2">Most Similar Historical Cases</h5>
                <div className="space-y-2">
                  {comparativeData.mostCitedCases.slice(0, 3).map((c, i) => (
                    <div key={c.caseId} className={`p-3 rounded-lg flex items-center justify-between ${
                      c.outcome === 'consolidated' ? 'bg-red-50 border border-red-200' :
                      c.outcome === 'resisted' ? 'bg-green-50 border border-green-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      <div>
                        <span className="font-medium text-slate-800">{c.country}</span>
                        <span className="text-slate-500 text-sm ml-2">{c.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          c.outcome === 'consolidated' ? 'bg-red-200 text-red-800' :
                          c.outcome === 'resisted' ? 'bg-green-200 text-green-800' :
                          'bg-blue-200 text-blue-800'
                        }`}>
                          {c.outcome}
                        </span>
                        <span className="text-xs text-slate-500">{c.citedBy.length} models</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interpretation */}
              <div className="space-y-2">
                {comparativeData.interpretation.map((line, i) => (
                  <p key={i} className={`text-sm ${
                    line.includes('warning') || line.includes('Warning') ? 'text-red-700 font-medium' :
                    line.includes('hopeful') || line.includes('Hopeful') ? 'text-green-700 font-medium' :
                    'text-slate-700'
                  }`}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Model-by-Model Breakdown (collapsed by default) */}
              <details className="mt-4">
                <summary className="text-sm text-slate-600 cursor-pointer hover:text-slate-800">
                  Show model-by-model analysis
                </summary>
                <div className="mt-3 space-y-3">
                  {comparativeData.comparativeAnalysis.map((model) => (
                    <div key={model.modelName} className="p-3 bg-white rounded-lg border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-slate-700">{model.modelName}</span>
                        <span className={`font-bold ${
                          model.predictedOutcome.score >= 60 ? 'text-red-600' :
                          model.predictedOutcome.score >= 40 ? 'text-amber-600' :
                          'text-green-600'
                        }`}>
                          {model.predictedOutcome.score}/100
                        </span>
                      </div>
                      {model.theoreticalExplanation && (
                        <p className="text-sm text-slate-700 mb-2">{model.theoreticalExplanation}</p>
                      )}
                      <p className="text-xs text-slate-500 italic">{model.predictedOutcome.reasoning}</p>
                      {model.warningSignals.length > 0 && (
                        <div className="mt-2 text-xs text-red-600">
                          Warnings: {model.warningSignals.slice(0, 2).join('; ')}
                        </div>
                      )}
                      {model.hopefulSignals.length > 0 && (
                        <div className="mt-1 text-xs text-green-600">
                          Hopeful: {model.hopefulSignals.slice(0, 2).join('; ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>

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
                      <span key={m.id} className={`px-2 py-0.5 rounded ${
                        m.outlierDirection === 'high' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {m.name}: {m.score.toFixed(1)} ({m.deviationFromMean > 0 ? '+' : ''}{m.deviationFromMean.toFixed(1)})
                      </span>
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
