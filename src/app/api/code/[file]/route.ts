import { NextRequest, NextResponse } from 'next/server';
import { historicalCases } from '@/data/historical-cases';

// Theoretical models definition (extracted from page.tsx)
const theoreticalModelsCode = `// Theoretical Models for Authoritarian Consolidation Index
// Each model weights the 10 factors differently based on theoretical assumptions

export interface TheoreticalModel {
  id: string;
  name: string;
  author: string;
  cluster: 'institutionalist' | 'class-economic' | 'cultural-social' | 'elite-strategic' | 'process-dynamic';
  weights: {
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
  };
  shortDesc: string;
  fullDesc: string;
  keyWorks: string;
}

export const theoreticalModels: TheoreticalModel[] = [
  {
    id: 'linz',
    name: 'Linzian Presidentialism',
    author: 'Juan Linz',
    cluster: 'institutionalist',
    weights: { judicial: 0.15, federalism: 0.30, political: 0.35, media: 0.05, civil: 0.05, publicOpinion: 0.05, mobilizationalBalance: 0.05, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
    shortDesc: 'Presidential systems and democratic breakdown',
    fullDesc: \`Juan Linz's seminal work "The Perils of Presidentialism" (1990) argues that presidential systems are inherently more prone to democratic breakdown than parliamentary ones. Key mechanisms include:

• Dual Democratic Legitimacy: Both president and legislature claim popular mandates, creating irresolvable conflicts
• Fixed Terms: Unlike parliamentary systems, there's no institutional mechanism to resolve deadlock short of crisis
• Winner-Take-All: Presidential elections create zero-sum dynamics that exacerbate polarization
• Outsider Appeal: The system enables political outsiders to win power without coalitional experience

This model weights political competition and federalism heavily, as Linz saw fragmented opposition and strong regional resistance as key countervailing forces against presidential overreach.\`,
    keyWorks: 'The Perils of Presidentialism (1990), The Breakdown of Democratic Regimes (1978)'
  },
  {
    id: 'levitsky',
    name: 'Levitsky & Ziblatt',
    author: 'Steven Levitsky & Daniel Ziblatt',
    cluster: 'institutionalist',
    weights: { judicial: 0.30, federalism: 0.05, political: 0.20, media: 0.25, civil: 0.05, publicOpinion: 0.00, mobilizationalBalance: 0.00, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.15 },
    shortDesc: 'Democratic norms and institutional guardrails',
    fullDesc: \`"How Democracies Die" (2018) argues that modern democratic breakdown rarely comes through coups but through elected leaders who gradually subvert institutions. Central concepts:

• Mutual Toleration: Accepting opponents as legitimate, not existential enemies
• Institutional Forbearance: Restraint in using legal powers to their maximum extent
• Gatekeeping Failure: When parties nominate or ally with authoritarian-leaning figures
• Referee Capture: Politicizing courts, election bodies, and law enforcement

The model emphasizes that democracies die through a series of incremental steps that each seem justifiable in isolation. It weights judicial independence highly as courts are the last institutional check, and media as the mechanism through which norm violations become visible (or invisible) to the public.\`,
    keyWorks: 'How Democracies Die (2018), Competitive Authoritarianism (2010)'
  },
  {
    id: 'marxian',
    name: 'Marxian Class Analysis',
    author: 'Marx, Poulantzas, Miliband',
    cluster: 'class-economic',
    weights: { judicial: 0.00, federalism: 0.00, political: 0.10, media: 0.25, civil: 0.05, publicOpinion: 0.00, mobilizationalBalance: 0.10, stateCapacity: 0.15, corporateCompliance: 0.35, electionInterference: 0.00 },
    shortDesc: 'Capitalism, class conflict, and authoritarianism',
    fullDesc: \`The Marxian tradition sees authoritarianism as emerging from contradictions in capitalist democracy. When democratic institutions threaten capital accumulation or redistribution, economic elites may support authoritarian alternatives. Key concepts:

• Bonapartism: When class stalemate enables a strong executive to appear "above" class conflict while serving capital
• Relative Autonomy: The state has some independence from direct capitalist control but structurally serves capital's long-term interests
• Ideological State Apparatuses: Media, education, and culture manufacture consent for existing power relations
• Exceptional State: Fascism as capital's response to working-class threat when normal hegemony fails

This model weights corporate compliance and media capture heavily, viewing business elite alignment with authoritarianism as the critical enabling condition.\`,
    keyWorks: 'The Eighteenth Brumaire (Marx), Fascism and Dictatorship (Poulantzas), The State in Capitalist Society (Miliband)'
  },
  {
    id: 'kaleckiAR',
    name: 'Redistributive Conflict Theory',
    author: 'Kalecki, Przeworski, Acemoglu & Robinson',
    cluster: 'class-economic',
    weights: { judicial: 0.00, federalism: 0.00, political: 0.15, media: 0.10, civil: 0.00, publicOpinion: 0.15, mobilizationalBalance: 0.10, stateCapacity: 0.20, corporateCompliance: 0.30, electionInterference: 0.00 },
    shortDesc: 'Elite cost-benefit calculations under redistribution threat',
    fullDesc: \`This tradition analyzes regime choice through the lens of redistributive conflict between elites and masses. Key insights:

• Business Confidence (Kalecki): Capital can "punish" democratic governments through investment strikes
• Democracy as Credible Commitment (Acemoglu & Robinson): Elites extend the franchise as commitment to redistribution, preventing revolution
• Policy Space (Przeworski): Democracy's survival depends on keeping redistribution within limits acceptable to capital

Authoritarianism becomes attractive to elites when democratic redistribution threatens core interests and state capacity exists to repress effectively.\`,
    keyWorks: 'Political Aspects of Full Employment (Kalecki, 1943), Economic Origins of Dictatorship and Democracy (Acemoglu & Robinson, 2006)'
  },
  {
    id: 'tocqueville',
    name: 'Tocquevillean Civil Society',
    author: 'Alexis de Tocqueville',
    cluster: 'cultural-social',
    weights: { judicial: 0.05, federalism: 0.30, political: 0.05, media: 0.05, civil: 0.35, publicOpinion: 0.10, mobilizationalBalance: 0.10, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
    shortDesc: 'Civic associations as bulwark against tyranny',
    fullDesc: \`Tocqueville's "Democracy in America" identified conditions enabling American democracy:

• Associational Life: Voluntary organizations teach democratic habits and create countervailing powers
• Local Self-Government: Township democracy and federalism prevent concentration of power
• Civic Virtue: Active citizenship and public-spiritedness counter privatism and apathy
• Soft Despotism: The danger of a paternalistic state that infantilizes citizens

This model heavily weights civil society and federalism as crucial barriers to authoritarian consolidation.\`,
    keyWorks: 'Democracy in America (1835-1840), The Old Regime and the Revolution (1856)'
  },
  {
    id: 'gramscian',
    name: 'Gramscian Hegemony',
    author: 'Antonio Gramsci, Stuart Hall',
    cluster: 'cultural-social',
    weights: { judicial: 0.00, federalism: 0.00, political: 0.05, media: 0.30, civil: 0.15, publicOpinion: 0.25, mobilizationalBalance: 0.25, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
    shortDesc: 'Cultural hegemony, conjunctural analysis, and authoritarian populism',
    fullDesc: \`Gramsci's theory of cultural hegemony—how ruling ideas become "common sense"—extended by Stuart Hall:

• Hegemony vs. Domination: Stable rule requires consent (hegemony) not just force
• Organic Crisis: When the ruling bloc loses hegemony, creating space for alternatives
• Conjunctural Analysis: Historical moments where multiple forces condense
• Authoritarian Populism: How authoritarian projects win popular consent

This model weights media and public opinion heavily, viewing the struggle over ideas and narratives as the key terrain.\`,
    keyWorks: 'Prison Notebooks (Gramsci), Policing the Crisis (Hall), The Hard Road to Renewal (Hall)'
  },
  {
    id: 'svolik',
    name: 'Svolik Elite Theory',
    author: 'Milan Svolik',
    cluster: 'elite-strategic',
    weights: { judicial: 0.15, federalism: 0.00, political: 0.35, media: 0.05, civil: 0.00, publicOpinion: 0.30, mobilizationalBalance: 0.10, stateCapacity: 0.05, corporateCompliance: 0.00, electionInterference: 0.00 },
    shortDesc: 'Elite defection and public complicity',
    fullDesc: \`Svolik's work focuses on strategic calculations of political elites and voters:

• Elite Defection: Democracy depends on elites choosing to play by democratic rules
• Polarization Trap: When voters tolerate their side's democratic violations
• Information Problems: Voters struggle to distinguish erosion from normal politics
• Coordination Failure: Opposition may fail to coordinate resistance

The model weights political competition and public opinion heavily, as elite defection and public complicity are twin mechanisms of erosion.\`,
    keyWorks: 'The Politics of Authoritarian Rule (2012), "Polarization versus Democracy" (2019)'
  },
  {
    id: 'gameTheory',
    name: 'Coordination & Focal Points',
    author: 'Barry Weingast, Russell Hardin',
    cluster: 'elite-strategic',
    weights: { judicial: 0.35, federalism: 0.25, political: 0.10, media: 0.05, civil: 0.00, publicOpinion: 0.20, mobilizationalBalance: 0.05, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
    shortDesc: 'Democracy as coordination equilibrium',
    fullDesc: \`Models democratic stability as a coordination equilibrium:

• Self-Enforcing Democracy: Democracy survives when citizens coordinate to punish ANY leader who transgresses
• Focal Points: Constitutions and norms serve as coordination devices
• Partisan Polarization Trap: When citizens care more about policy than rules, they fail to punish violations

Democracy breaks down when citizens fail to coordinate punishment of transgressors.\`,
    keyWorks: 'The Political Foundations of Democracy and the Rule of Law (Weingast, 1997)'
  },
  {
    id: 'paxton',
    name: 'Paxtonian Fascist Dynamics',
    author: 'Robert Paxton',
    cluster: 'process-dynamic',
    weights: { judicial: 0.05, federalism: 0.00, political: 0.10, media: 0.10, civil: 0.00, publicOpinion: 0.10, mobilizationalBalance: 0.35, stateCapacity: 0.20, corporateCompliance: 0.10, electionInterference: 0.00 },
    shortDesc: 'Fascism as process, elite complicity, and radicalization',
    fullDesc: \`Paxton analyzes fascism as a political process moving through stages:

1. Creation: Movements emerge from crisis
2. Rooting: Establishes in political system
3. Arrival to Power: Conservative elites invite fascists in, believing they can be controlled
4. Exercise of Power: Consolidation, choices between normalization and radicalization
5. Radicalization or Entropy

Key insight: Fascism doesn't seize power—it's handed power by conservative elites who fear the left more.\`,
    keyWorks: 'The Anatomy of Fascism (2004), Vichy France (1972)'
  },
  {
    id: 'bermanRiley',
    name: 'Dark Side of Social Capital',
    author: 'Sheri Berman, Dylan Riley, Theda Skocpol',
    cluster: 'cultural-social',
    weights: { judicial: 0.00, federalism: 0.05, political: 0.05, media: 0.10, civil: 0.15, publicOpinion: 0.10, mobilizationalBalance: 0.45, stateCapacity: 0.05, corporateCompliance: 0.05, electionInterference: 0.00 },
    shortDesc: 'Associational life can enable authoritarianism',
    fullDesc: \`Challenges the assumption that civil society inherently supports democracy:

• Weimar Paradox (Berman): Germany had HIGH associational density—but captured by anti-democratic movements
• Civic Foundations of Fascism (Riley): Fascism strongest in regions with DENSE civil society
• Organized Minority (Skocpol): An organized minority defeats a disorganized majority

Key insight: What matters is WHO controls mobilizational infrastructure, not whether it exists.\`,
    keyWorks: 'Civil Society and Weimar Collapse (Berman), Civic Foundations of Fascism (Riley), Tea Party Remaking (Skocpol)'
  },
  {
    id: 'classical',
    name: 'Classical Theory of Tyranny',
    author: 'Plato, Aristotle, Polybius',
    cluster: 'cultural-social',
    weights: { judicial: 0.00, federalism: 0.00, political: 0.10, media: 0.20, civil: 0.05, publicOpinion: 0.30, mobilizationalBalance: 0.35, stateCapacity: 0.00, corporateCompliance: 0.00, electionInterference: 0.00 },
    shortDesc: 'Demagoguery, passion, and regime decay',
    fullDesc: \`Classical political philosophy saw regime change as cyclical, with democracy vulnerable to tyranny through demagoguery:

• Plato: Democracy degenerates when excessive freedom breeds disorder, creating demand for a strongman
• Aristotle: The demagogue flatters the people, attacks the wealthy, accumulates power through popular support
• Polybius: Regime types cycle predictably—democracy becomes mob rule, enabling tyranny

This model heavily weights public opinion and mobilizational balance, viewing the demos's receptivity to demagoguery as key.\`,
    keyWorks: 'Republic (Plato), Politics (Aristotle), Histories (Polybius)'
  }
];

// Calculate weighted score for a single model
export function calculateModelScore(
  factors: Record<string, number>,
  model: TheoreticalModel
): number {
  let score = 0;
  for (const [factorId, weight] of Object.entries(model.weights)) {
    score += (factors[factorId] || 0) * weight;
  }
  return score;
}

// Calculate ensemble ACI score across all active models
export function calculateACI(
  factors: Record<string, number>,
  activeModels: TheoreticalModel[]
): number {
  if (activeModels.length === 0) return 0;
  const scores = activeModels.map(m => calculateModelScore(factors, m));
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}
`;

// Research prompt code
const researchPromptCode = `// Research Prompt for Claude AI Analysis
// Used with claude-sonnet-4-20250514 and web_search tool

export function generateResearchPrompt(country: string, currentYear: number, currentDate: string): string {
  const scoringRubric = \`SCORING (0-100, higher = more authoritarian):

JUDICIAL: 0-20=independent courts, 21-40=some pressure, 41-60=packed/intimidated, 61-80=rubber stamp, 81-100=captured
FEDERALISM: 0-20=strong regional autonomy, 21-40=some autonomy, 41-60=encroachment, 61-80=eliminated, 81-100=total centralization
POLITICAL: 0-20=robust competition, 21-40=some advantages, 41-60=significant barriers, 61-80=opposition jailed, 81-100=no opposition
MEDIA: 0-20=free press, 21-40=mostly free, 41-60=major capture, 61-80=eliminated, 81-100=total control
CIVIL: 0-20=vibrant, 21-40=some restrictions, 41-60=foreign agent laws, 61-80=shut down, 81-100=total control

PUBLIC_OPINION (this is REGIME APPROVAL RATING - higher score = regime more popular = more dangerous):
  MEASURE: Executive/regime approval rating percentage. Convert approval % to score using bands below.

  SCORING BANDS (use approval rating to determine score):
  - Approval <35% → Score 0-20 (regime deeply unpopular, consolidation very difficult)
  - Approval 35-44% → Score 21-40 (regime underwater, consolidation constrained)
  - Approval 45-50% → Score 41-50 (regime at parity, contested)
  - Approval 51-57% → Score 51-70 (regime popular, consolidation enabled)
  - Approval >57% → Score 71-100 (regime highly popular, consolidation easy)

  EXAMPLE: If Trump approval is 42%, score should be ~30-35 (in the 21-40 band for "underwater").
  Do NOT score 42 just because approval is 42%.

MOBILIZATIONAL_BALANCE (per Berman, Riley, Skocpol's "dark side of social capital"):
  WEIGHT BY ORG TYPE:
  - HIGH=unions (dues-paying, can strike), churches (activated congregations with turnout infrastructure), membership orgs with dues
  - MEDIUM=501c4 advocacy orgs, community orgs, worker centers
  - LOW=staff-driven 501c3s, policy think tanks (ideas not people)

  DISCOUNT centralized orgs dependent on charismatic leaders, "chapters" that are sign-ups not active locals.

  RELIGIOUS MOBILIZATION (assess carefully - don't assume evangelical=GOP advantage):
  - EVANGELICAL PROTESTANT: White evangelicals strongly GOP-aligned, but assess ACTUAL activation vs assumed
  - BLACK CHURCHES: Historically crucial Democratic infrastructure. "Souls to the Polls", voter registration. Often MORE activated than white evangelical counterparts. HIGH weight for opposition.
  - MAINLINE PROTESTANT (Episcopal, PCUSA, UMC, ELCA, UCC): Lean moderate-to-liberal. MEDIUM weight for opposition.
  - CATHOLIC: SPLIT constituency - Conservative wing vs Progressive wing. Assess which wing is more activated locally.

  REGIME-ALIGNED (US): white evangelical churches (when actually activated), local GOP committees, conservative 501c4s (AFP, Turning Point Action), militia/paramilitary (Oath Keepers, Proud Boys), conservative Catholic orgs
  OPPOSITION (US): union locals (public sector especially), Black churches, civil rights chapters, worker centers, Indivisible chapters, DSA chapters, state civic engagement tables, mainline Protestant networks, progressive Catholic groups

  SCORING:
  0-20=opposition strong (dense unions, Black church infrastructure, demonstrated turnout)
  21-40=opposition advantage (union presence, faith networks activated)
  41-60=roughly balanced (both sides have infrastructure, contested terrain)
  61-80=regime advantage (white evangelical activation high, unions weak, militia presence)
  81-100=regime dominates (opposition atomized, unions crushed)

STATE_CAPACITY: 0-20=fragmented, 21-40=gaps, 41-60=growing, 61-80=high capacity, 81-100=total coordination
CORPORATE: 0-20=resist, 21-40=neutral, 41-60=compliance, 61-80=active cooperation, 81-100=captured
ELECTIONS: 0-20=free/fair, 21-40=minor issues, 41-60=manipulation, 61-80=systematic fraud, 81-100=theatrical\`;

  return \`TODAY'S DATE: \${currentDate}

You are a comparative politics researcher specializing in democratic backsliding and authoritarian consolidation.
Conduct rigorous research on \${country} to assess its vulnerability to authoritarian consolidation.

MANDATORY: Use web search to gather current \${currentYear} data on:

INSTITUTIONAL FACTORS:
- Judicial independence, court rulings, appointments
- Federalism, regional autonomy, state-level opposition
- Electoral integrity, opposition status, legislative dynamics
- Press freedom, media ownership, journalist safety
- NGO restrictions, protest rights, civil society health
- Security apparatus coordination, surveillance
- Corporate responses to government pressure
- Electoral administration, voter access

PUBLIC OPINION (this means REGIME POPULARITY, not abstract norms):
- REGIME APPROVAL RATINGS: Current presidential/executive approval (aggregate AND by party), trend over past months
- Search for: "[leader name] approval rating", "[leader name] popularity polls"
- DO NOT search for "support for democracy" - only concrete approval ratings matter

\${scoringRubric}

Respond with ONLY JSON in this format (no other text):
{
  "judicial": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "federalism": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "political": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "media": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "civil": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "publicOpinion": {"score": 0, "evidence": "approval % and trend", "trend": "stable"},
  "mobilizationalBalance": {"score": 0, "evidence": "specific org names and numbers", "trend": "stable"},
  "stateCapacity": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "corporateCompliance": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "electionInterference": {"score": 0, "evidence": "specific evidence", "trend": "stable"},
  "summary": "2-3 paragraph analysis"
}\`;
}
`;

// Regression/comparison code
const regressionCode = `// Historical Comparison Algorithm
// Uses cosine similarity to find most similar historical cases

import { historicalCases, HistoricalCase } from '@/data/historical-cases';

export interface ModelWeights {
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

export interface FactorScores {
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

// Convert factor scores to weighted vector
function toWeightedVector(factors: FactorScores, weights: ModelWeights): number[] {
  const keys: (keyof FactorScores)[] = [
    'judicial', 'federalism', 'political', 'media', 'civil',
    'publicOpinion', 'mobilizationalBalance', 'stateCapacity',
    'corporateCompliance', 'electionInterference'
  ];
  return keys.map(k => (factors[k] || 0) * (weights[k] || 0));
}

// Cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Find most similar historical cases
export function findSimilarCases(
  currentFactors: FactorScores,
  weights: ModelWeights,
  threshold: number = 0.85
): { case: HistoricalCase; similarity: number }[] {
  const currentVector = toWeightedVector(currentFactors, weights);

  return historicalCases
    .map(historicalCase => ({
      case: historicalCase,
      similarity: cosineSimilarity(
        currentVector,
        toWeightedVector(historicalCase.factors, weights)
      )
    }))
    .filter(result => result.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity);
}

// Generate comparative prediction
export function generateComparativePrediction(
  currentFactors: FactorScores,
  weights: ModelWeights
): {
  predictedScore: number;
  confidence: 'low' | 'medium' | 'high';
  mostSimilarCases: { country: string; period: string; outcome: string; similarity: number }[];
  warningSignals: string[];
  hopefulSignals: string[];
} {
  const similarCases = findSimilarCases(currentFactors, weights, 0.75);

  // Weight predictions by similarity
  let weightedSum = 0;
  let totalWeight = 0;
  for (const { case: c, similarity } of similarCases) {
    weightedSum += c.outcomeScore * similarity;
    totalWeight += similarity;
  }

  const predictedScore = totalWeight > 0 ? weightedSum / totalWeight : 50;

  // Determine confidence based on case agreement
  const outcomes = similarCases.map(c => c.case.outcome);
  const uniqueOutcomes = new Set(outcomes);
  const confidence = uniqueOutcomes.size === 1 ? 'high' :
                     uniqueOutcomes.size === 2 ? 'medium' : 'low';

  // Identify warning and hopeful signals
  const warningSignals: string[] = [];
  const hopefulSignals: string[] = [];

  const factorKeys: (keyof FactorScores)[] = [
    'judicial', 'federalism', 'political', 'media', 'civil',
    'publicOpinion', 'mobilizationalBalance', 'stateCapacity',
    'corporateCompliance', 'electionInterference'
  ];

  for (const key of factorKeys) {
    const score = currentFactors[key];
    const weight = weights[key];
    if (weight > 0.1 && score >= 60) {
      warningSignals.push(\`\${key} score (\${score}) exceeds danger threshold\`);
    }
    if (weight > 0.1 && score <= 30) {
      hopefulSignals.push(\`\${key} score (\${score}) indicates resilience\`);
    }
  }

  return {
    predictedScore: Math.round(predictedScore),
    confidence,
    mostSimilarCases: similarCases.slice(0, 5).map(c => ({
      country: c.case.country,
      period: c.case.period,
      outcome: c.case.outcome,
      similarity: Math.round(c.similarity * 100) / 100
    })),
    warningSignals,
    hopefulSignals
  };
}
`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  let content: string;
  let filename: string;
  const contentType = 'text/plain';

  switch (file) {
    case 'models':
      content = theoreticalModelsCode;
      filename = 'theoretical-models.ts';
      break;
    case 'cases':
      // Export actual historical cases as TypeScript
      content = `// Historical Cases Database for Authoritarian Consolidation Index
// Sources: V-Dem, Polity Project, country-specific historiography

export interface HistoricalCase {
  id: string;
  country: string;
  period: string;
  yearStart: number;
  yearEnd: number;
  outcome: 'consolidated' | 'resisted' | 'democratized' | 'ongoing';
  outcomeScore: number; // 0 = democracy held, 100 = full consolidation
  factors: {
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
  };
  notes: string;
  sources: string[];
}

export const historicalCases: HistoricalCase[] = ${JSON.stringify(historicalCases, null, 2)};
`;
      filename = 'historical-cases.ts';
      break;
    case 'prompt':
      content = researchPromptCode;
      filename = 'research-prompt.ts';
      break;
    case 'regression':
      content = regressionCode;
      filename = 'regression.ts';
      break;
    case 'full':
      // For full download, return a message about where to get the code
      content = `# Polybius ACI - Full Source Code

To get the complete source code, please visit:
https://github.com/ganzjohn-bit/polybius-aci

Or contact: methodology@polybius.world

The codebase includes:
- /src/app/page.tsx - Main application (theoretical models, UI, scoring)
- /src/app/api/research/route.ts - Claude AI research endpoint
- /src/app/api/regression/route.ts - Historical comparison endpoint
- /src/data/historical-cases.ts - Historical cases database
- /src/lib/regression.ts - Comparison algorithms

All code is open source under MIT license.
`;
      filename = 'README.txt';
      break;
    default:
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
