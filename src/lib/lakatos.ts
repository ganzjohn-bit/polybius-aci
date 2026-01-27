// Lakatosian Research Programme Framework
// Each theoretical model is treated as a research programme with:
// - Hard core: unfalsifiable central commitments
// - Protective belt: modifiable auxiliary hypotheses
// - Predictions: testable hypotheses generated from the model
// - Track record: progressive (predicts novel facts) vs degenerating (only post-hoc explanation)

export interface Prediction {
  id: string;
  modelId: string;
  hypothesis: string;
  timeframe: string; // e.g., "3 months", "6 months", "1 year"
  generatedDate: string;
  targetDate: string;
  conditions: string; // what would confirm this
  refutationConditions: string; // what would refute this
  status: 'pending' | 'confirmed' | 'refuted' | 'ambiguous';
  outcome?: string;
  outcomeDate?: string;
  novelty: 'novel' | 'known' | 'retrodiction'; // novel prediction vs explaining known facts
}

export interface ResearchProgramme {
  modelId: string;
  modelName: string;
  hardCore: string[]; // unfalsifiable central assumptions
  protectiveBelt: string[]; // modifiable auxiliary hypotheses
  positiveHeuristic: string; // how to develop the programme
  negativeHeuristic: string; // what's off-limits for modification
  predictions: Prediction[];
  confirmedNovel: number; // novel predictions confirmed
  confirmedKnown: number; // known facts explained
  refuted: number;
  pending: number;
  progressivenessScore: number; // calculated from track record
  status: 'progressive' | 'stagnant' | 'degenerating';
}

// Define the hard core and heuristics for each theoretical model
export const researchProgrammes: Record<string, Omit<ResearchProgramme, 'predictions' | 'confirmedNovel' | 'confirmedKnown' | 'refuted' | 'pending' | 'progressivenessScore' | 'status'>> = {
  levitsky: {
    modelId: 'levitsky',
    modelName: 'Levitsky-Ziblatt (Institutional Erosion)',
    hardCore: [
      'Democratic breakdown in modern era proceeds through gradual institutional erosion, not dramatic coups',
      'Elected autocrats use legal means to dismantle checks and balances',
      'Polarization and norm erosion precede institutional capture',
      'Opposition fragmentation enables consolidation'
    ],
    protectiveBelt: [
      'Specific sequence of institutional capture (courts first vs legislature first)',
      'Role of media capture timing',
      'Whether elite defection can reverse consolidation',
      'Precise thresholds for "point of no return"'
    ],
    positiveHeuristic: 'Track institutional independence metrics, norm violations, and elite accommodation patterns',
    negativeHeuristic: 'Do not explain breakdown through external shocks or mass uprising alone - focus on elite-level institutional dynamics'
  },

  bermanRiley: {
    modelId: 'bermanRiley',
    modelName: 'Berman-Riley (Civil Society Destruction)',
    hardCore: [
      'Strong autonomous civil society is the key bulwark against authoritarianism',
      'Fascism succeeds when civil society is weak or destroyed before the regime takes power',
      'Working-class organization (unions, parties) is particularly crucial',
      'Elite-mass linkages through civil society constrain both left and right extremism'
    ],
    protectiveBelt: [
      'Which types of civil society matter most (unions vs churches vs associations)',
      'Whether civil society can be rebuilt under authoritarian pressure',
      'Role of new digital civil society forms',
      'Threshold of civil society density needed for resistance'
    ],
    positiveHeuristic: 'Measure civil society density, union membership, associational life, and organizational capacity for collective action',
    negativeHeuristic: 'Do not reduce explanation to elite bargaining or institutional design alone - civil society is causally primary'
  },

  frankfurtSchool: {
    modelId: 'frankfurtSchool',
    modelName: 'Frankfurt School (Behemoth)',
    hardCore: [
      'Fascism represents non-state: competing power blocs (party, military, industry, bureaucracy) in unstable equilibrium',
      'No unified totalitarian will - rather chaotic inter-racket competition',
      'Capital is complicit but not in control - one racket among many',
      'Propaganda creates false consciousness but system is fundamentally irrational'
    ],
    protectiveBelt: [
      'Which rackets dominate in specific cases',
      'Whether Behemoth dynamics apply to electoral authoritarianism',
      'Role of tech platforms as new racket',
      'How racket competition manifests in policy incoherence'
    ],
    positiveHeuristic: 'Look for inter-elite conflict, policy incoherence, competing power centers, corporate complicity alongside autonomy',
    negativeHeuristic: 'Do not assume unified regime will or rational state coordination - expect chaos and contradiction'
  },

  classical: {
    modelId: 'classical',
    modelName: 'Classical Theory (Tyranny/Anacyclosis)',
    hardCore: [
      'Regime types cycle: democracy → ochlocracy (mob rule) → tyranny',
      'Democratic decline driven by demagogues exploiting popular passions',
      'Excessive freedom breeds disorder, creating demand for strongman',
      'Civic virtue decay is root cause - institutions are symptoms'
    ],
    protectiveBelt: [
      'Specific triggers that accelerate cycle',
      'Whether mixed constitution can break cycle',
      'Role of economic inequality in cycle dynamics',
      'How long cycles take in modern conditions'
    ],
    positiveHeuristic: 'Track public opinion, demagogic rhetoric, civic virtue indicators, passion vs reason in political discourse',
    negativeHeuristic: 'Do not expect institutional solutions to work absent civic virtue renewal'
  },

  paxton: {
    modelId: 'paxton',
    modelName: 'Paxton (Fascism Stages)',
    hardCore: [
      'Fascism proceeds through identifiable stages: creation → rooting → power → exercise → radicalization/entropy',
      'Each stage requires different conditions and alliances',
      'Conservative elite alliance is necessary for stage 3 (taking power)',
      'Radicalization OR entropy in stage 5 - not stable equilibrium'
    ],
    protectiveBelt: [
      'Whether stages can be skipped or reversed',
      'How to identify current stage boundaries',
      'Whether electoral authoritarianism follows same stages',
      'Role of external constraints (international) on stage progression'
    ],
    positiveHeuristic: 'Identify current stage, track conditions for stage transitions, monitor elite alliance formation',
    negativeHeuristic: 'Do not treat fascism as static ideology - it is a process with dynamic stages'
  },

  marxian: {
    modelId: 'marxian',
    modelName: 'Marxian (Class Analysis)',
    hardCore: [
      'State form reflects class power relations',
      'Authoritarianism serves capital accumulation when democracy threatens property',
      'Fascism is capitalism in crisis - emergency rule to discipline labor',
      'Working class organization is primary constraint on authoritarian turn'
    ],
    protectiveBelt: [
      'Role of petty bourgeoisie and middle class',
      'Whether finance vs industrial capital have different regime preferences',
      'How racial capitalism modifies class dynamics',
      'Conditions under which capital prefers democracy'
    ],
    positiveHeuristic: 'Track class conflict indicators, strike activity, profit rates, capital-state coordination, labor organization strength',
    negativeHeuristic: 'Do not reduce to culture, ideas, or leadership - material class interests are causally fundamental'
  },

  redistributive: {
    modelId: 'redistributive',
    modelName: 'Acemoglu-Robinson (Redistributive Conflict)',
    hardCore: [
      'Democracy emerges from redistributive conflict between elites and masses',
      'Elites accept democracy when revolution threat exceeds cost of redistribution',
      'Democracy survives when neither side can profitably defect (consolidation)',
      'High inequality + high elite repressive capacity → authoritarianism'
    ],
    protectiveBelt: [
      'Specific inequality thresholds',
      'Role of middle class in stabilizing democracy',
      'Whether repressive technology changes calculations',
      'How international factors affect bargaining'
    ],
    positiveHeuristic: 'Track inequality metrics, elite cohesion, mass mobilization capacity, repressive capacity, redistributive policies',
    negativeHeuristic: 'Do not ignore material interests - democracy is a bargain, not just norms or institutions'
  },

  linz: {
    modelId: 'linz',
    modelName: 'Linz (Presidentialism/Breakdown)',
    hardCore: [
      'Presidential systems more prone to breakdown than parliamentary',
      'Winner-take-all dynamics, fixed terms, and dual legitimacy create rigidity',
      'Breakdown occurs when conflicts cannot be resolved within constitutional framework',
      'Military as "moderating power" often intervenes in deadlock'
    ],
    protectiveBelt: [
      'Whether specific institutional fixes (runoffs, term limits) reduce risk',
      'Role of party system fragmentation',
      'How federalism interacts with presidentialism',
      'Whether semi-presidentialism avoids problems'
    ],
    positiveHeuristic: 'Track executive-legislative conflict, constitutional hardball, military positioning, deadlock indicators',
    negativeHeuristic: 'Do not ignore institutional structure - it shapes incentives independent of actor preferences'
  },

  gramscian: {
    modelId: 'gramscian',
    modelName: 'Gramscian (Hegemony)',
    hardCore: [
      'Rule depends on hegemony (consent) not just coercion',
      'Hegemonic crisis opens space for counter-hegemonic movements',
      'Civil society is terrain of hegemonic struggle, not just bulwark',
      'Organic intellectuals articulate class interests into political projects'
    ],
    protectiveBelt: [
      'How to identify hegemonic vs counter-hegemonic movements',
      'Role of new media in hegemonic struggle',
      'Whether right-populism represents hegemonic crisis or new hegemony',
      'Passive revolution as elite response to crisis'
    ],
    positiveHeuristic: 'Track media narratives, common sense shifts, intellectual alignment, consent vs coercion balance',
    negativeHeuristic: 'Do not reduce to coercion or interests alone - ideological struggle is materially consequential'
  },

  svolik: {
    modelId: 'svolik',
    modelName: 'Svolik (Elite Coordination)',
    hardCore: [
      'Democratic breakdown is an elite coordination problem',
      'Citizens face trade-off between policy and democracy',
      'Polarization leads citizens to tolerate democratic erosion by co-partisans',
      'Elite defection (abandoning would-be autocrat) requires coordination'
    ],
    protectiveBelt: [
      'Threshold of polarization that enables erosion tolerance',
      'Whether elite coordination can be facilitated externally',
      'Role of information in citizen tolerance calculations',
      'How party loyalty vs democratic commitment interact'
    ],
    positiveHeuristic: 'Track elite defection signals, partisan polarization, cross-party elite communication, citizen tolerance of violations',
    negativeHeuristic: 'Do not assume citizens always prefer democracy - they make trade-offs'
  }
};

// Generate predictions based on current scores and model logic
export function generatePredictions(
  modelId: string,
  currentScores: Record<string, number>,
  countryContext: string
): Prediction[] {
  const predictions: Prediction[] = [];
  const now = new Date();
  const threeMonths = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const sixMonths = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
  const oneYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  switch (modelId) {
    case 'levitsky':
      if (currentScores.judicial > 50) {
        predictions.push({
          id: `${modelId}-judicial-high-${Date.now()}`,
          modelId,
          hypothesis: 'Given elevated judicial capture score, model predicts attempted expansion of executive control over remaining independent courts within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Court-packing legislation proposed, or administrative restructuring of judiciary announced, or judges forced to resign/retire',
          refutationConditions: 'No significant moves against judicial independence; courts continue to rule against executive',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.judicial < 35) {
        predictions.push({
          id: `${modelId}-judicial-low-${Date.now()}`,
          modelId,
          hypothesis: 'With low judicial capture score, model predicts courts will continue to check executive overreach within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Courts rule against executive actions, judicial independence maintained, no court-packing attempts succeed',
          refutationConditions: 'Sudden judicial capture, courts begin rubber-stamping executive actions',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.political > 60) {
        predictions.push({
          id: `${modelId}-opposition-high-${Date.now()}`,
          modelId,
          hypothesis: 'With high political opposition weakness, model predicts further opposition fragmentation or co-optation within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Major opposition party split, key opposition figures defect to regime, or opposition boycotts elections',
          refutationConditions: 'Opposition unifies, new coalition forms, or opposition makes electoral gains',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.political < 40) {
        predictions.push({
          id: `${modelId}-opposition-low-${Date.now()}`,
          modelId,
          hypothesis: 'With strong opposition, model predicts continued or growing opposition unity and electoral competitiveness within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Opposition maintains unity, gains in polls, or wins by-elections/local races',
          refutationConditions: 'Opposition fragments, key defections to regime, or electoral losses',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'bermanRiley':
      if (currentScores.civil > 50) {
        predictions.push({
          id: `${modelId}-civil-high-${Date.now()}`,
          modelId,
          hypothesis: 'Civil society weakness predicts regime will face less organized resistance to next major policy initiative',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Major policy passes with minimal street protest (<10,000 nationally), or NGO/union challenges fail to materialize',
          refutationConditions: 'Significant mobilization (>50,000) against regime initiative, or civil society legal challenge succeeds',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.civil < 35) {
        predictions.push({
          id: `${modelId}-civil-low-${Date.now()}`,
          modelId,
          hypothesis: 'Strong civil society predicts successful resistance to next major authoritarian initiative',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Significant mobilization (>50,000) forces regime backdown, or civil society legal challenge succeeds, or policy blocked',
          refutationConditions: 'Regime initiative passes despite civil society opposition',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.mobilizationalBalance > 55) {
        predictions.push({
          id: `${modelId}-mobilization-high-${Date.now()}`,
          modelId,
          hypothesis: 'Regime mobilization advantage predicts pro-regime demonstrations will exceed opposition demonstrations in next 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Aggregate pro-regime rally attendance exceeds opposition rally attendance',
          refutationConditions: 'Opposition mobilizes larger aggregate turnout than regime supporters',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.mobilizationalBalance < 45) {
        predictions.push({
          id: `${modelId}-mobilization-low-${Date.now()}`,
          modelId,
          hypothesis: 'Opposition mobilization advantage predicts anti-regime demonstrations will exceed pro-regime demonstrations in next 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Opposition rally attendance exceeds pro-regime rally attendance, sustained protest movements',
          refutationConditions: 'Regime supporters mobilize larger aggregate turnout',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'frankfurtSchool':
      // Behemoth dynamics apply regardless but predictions differ based on consolidation level
      const frankfurtAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      predictions.push({
        id: `${modelId}-racket-${Date.now()}`,
        modelId,
        hypothesis: 'Behemoth model predicts visible inter-elite conflict (regime factions, business vs party, military vs civilians) within 3 months',
        timeframe: '3 months',
        generatedDate: formatDate(now),
        targetDate: formatDate(threeMonths),
        conditions: 'Public disputes between regime figures, contradictory policy announcements, or visible business-regime tension',
        refutationConditions: 'Unified regime messaging, smooth policy coordination, elite solidarity',
        status: 'pending',
        novelty: 'novel'
      });
      if (frankfurtAvg > 50) {
        predictions.push({
          id: `${modelId}-incoherence-high-${Date.now()}`,
          modelId,
          hypothesis: 'Policy incoherence: major policy reversal or contradictory policies from different regime factions within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Announced policy reversed, or simultaneous contradictory policies from different agencies/officials',
          refutationConditions: 'Consistent policy direction maintained across regime',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-incoherence-low-${Date.now()}`,
          modelId,
          hypothesis: 'Behemoth instability: inter-racket conflict will undermine regime effectiveness, leading to visible dysfunction',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Regime appears chaotic, key figures resign or are fired, business distances itself, policy failures accumulate',
          refutationConditions: 'Regime achieves coherence and stability',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-capital-exit-${Date.now()}`,
          modelId,
          hypothesis: 'Capital racket will begin distancing from failing regime - business elites hedge bets within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Business leaders publicly distance, corporations pause political engagement, or economic elites criticize regime',
          refutationConditions: 'Capital maintains alliance with regime despite dysfunction',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'classical':
      if (currentScores.publicOpinion > 50) {
        predictions.push({
          id: `${modelId}-demagogy-high-${Date.now()}`,
          modelId,
          hypothesis: 'Given receptive public opinion, model predicts increased demagogic rhetoric (scapegoating, enemy-naming, crisis framing) in next 3 months',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Measurable increase in demagogic rhetoric patterns in regime communications',
          refutationConditions: 'Rhetoric moderates, appeals to reason/unity rather than passion/division',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-virtue-decline-${Date.now()}`,
          modelId,
          hypothesis: 'Civic virtue decay predicts declining trust in democratic institutions in next 6 months (measurable in polling)',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows decreased trust in courts, elections, media, or legislative bodies',
          refutationConditions: 'Institutional trust stabilizes or increases',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.publicOpinion < 40) {
        predictions.push({
          id: `${modelId}-demagogy-low-${Date.now()}`,
          modelId,
          hypothesis: 'Given resistant public opinion, model predicts demagogic appeals will fail to gain traction and regime popularity will decline',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Regime approval ratings decline, demagogic rhetoric fails to shift polls, backlash to divisive messaging',
          refutationConditions: 'Demagogic appeals succeed in shifting opinion favorably',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-virtue-stable-${Date.now()}`,
          modelId,
          hypothesis: 'Civic virtue resilience predicts maintained or increasing trust in democratic institutions',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows stable or increased trust in courts, elections, and legislative bodies',
          refutationConditions: 'Institutional trust begins declining',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        // Medium score - just predict virtue trend
        predictions.push({
          id: `${modelId}-virtue-${Date.now()}`,
          modelId,
          hypothesis: 'Model predicts civic virtue indicators (institutional trust) will be key variable to watch in next 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows change in trust in courts, elections, media, or legislative bodies',
          refutationConditions: 'Institutional trust remains completely stable',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'paxton':
      // Determine likely current stage and predict movement
      const avgScore = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (avgScore < 30) {
        // Very low - predicting resistance/stall
        predictions.push({
          id: `${modelId}-stage-stall-${Date.now()}`,
          modelId,
          hypothesis: 'At early stages with low consolidation: model predicts movement will stall or regress - elite alliance will not form or will fracture within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Elite defections, business distances from regime, military signals neutrality, religious leaders criticize',
          refutationConditions: 'New prominent elite endorsements deepen the alliance',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-stage-reverse-${Date.now()}`,
          modelId,
          hypothesis: 'Failed stage transition: authoritarian movement loses momentum, electoral losses or reduced influence within 1 year',
          timeframe: '1 year',
          generatedDate: formatDate(now),
          targetDate: formatDate(oneYear),
          conditions: 'Movement loses elections, splits, or key figures abandon project',
          refutationConditions: 'Movement gains strength and advances to next stage',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (avgScore < 50) {
        predictions.push({
          id: `${modelId}-stage-early-${Date.now()}`,
          modelId,
          hypothesis: 'At Stage 2-3 (rooting/power): model predicts deepening elite alliance (business, military, religious leaders endorsing regime) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'New prominent elite endorsements, business associations align, or military signals support',
          refutationConditions: 'Elite defections, business criticism, or military distance from regime',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-stage-late-${Date.now()}`,
          modelId,
          hypothesis: 'At Stage 4-5 (exercise/radicalization): model predicts either radicalization (new targets, expanded repression) OR entropy (regime infighting, loss of direction) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'New outgroups targeted, repression expands to former allies, OR visible regime fragmentation and drift',
          refutationConditions: 'Stable consolidation without radicalization or entropy',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'marxian':
      if (currentScores.corporateCompliance > 50) {
        predictions.push({
          id: `${modelId}-capital-high-${Date.now()}`,
          modelId,
          hypothesis: 'Capital compliance predicts anti-labor policies (union restrictions, wage suppression, deregulation) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Legislation restricting union rights, NLRB weakened, or major deregulation benefiting capital',
          refutationConditions: 'Pro-labor policies enacted or capital faces regime restrictions',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-strike-${Date.now()}`,
          modelId,
          hypothesis: 'Class conflict model predicts labor unrest (strikes, work actions) as response to consolidation within 1 year',
          timeframe: '1 year',
          generatedDate: formatDate(now),
          targetDate: formatDate(oneYear),
          conditions: 'Significant strike activity (>100,000 workers), major work actions, or union organizing surge',
          refutationConditions: 'Labor quiescence, declining strike activity, union membership decline',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.corporateCompliance < 40) {
        predictions.push({
          id: `${modelId}-capital-low-${Date.now()}`,
          modelId,
          hypothesis: 'Weak capital-regime alliance predicts business will not support authoritarian measures and may actively resist',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Business associations criticize regime, corporations refuse cooperation, capital flight or investment decline',
          refutationConditions: 'Business rallies to regime support, capital-state alliance strengthens',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-labor-strength-${Date.now()}`,
          modelId,
          hypothesis: 'Strong labor organization predicts successful resistance to anti-worker policies within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Union actions block anti-labor legislation, strike threats deter policy, labor wins concessions',
          refutationConditions: 'Anti-labor policies pass despite union opposition',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-class-conflict-${Date.now()}`,
          modelId,
          hypothesis: 'Class conflict model predicts intensifying labor-capital tension within 1 year regardless of outcome',
          timeframe: '1 year',
          generatedDate: formatDate(now),
          targetDate: formatDate(oneYear),
          conditions: 'Increased strike activity, union organizing, or visible business-labor confrontation',
          refutationConditions: 'Class peace, no significant labor-capital conflict',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'redistributive':
      // Calculate overall consolidation tendency
      const redistAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (redistAvg > 50) {
        predictions.push({
          id: `${modelId}-inequality-high-${Date.now()}`,
          modelId,
          hypothesis: 'Model predicts regime will pursue policies that protect elite wealth/reduce redistribution within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Tax cuts for wealthy, social program cuts, or deregulation benefiting capital',
          refutationConditions: 'Progressive taxation enacted, social programs expanded, or wealth redistribution policies',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-inequality-low-${Date.now()}`,
          modelId,
          hypothesis: 'With failed consolidation, model predicts elites will offer redistributive concessions to reduce mass mobilization threat',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Social programs maintained or expanded, moderate taxation policies, elite accommodation of mass demands',
          refutationConditions: 'Elite doubles down on anti-redistribution despite popular opposition',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.mobilizationalBalance < 45) {
        predictions.push({
          id: `${modelId}-threat-${Date.now()}`,
          modelId,
          hypothesis: 'Given opposition mobilization capacity, model predicts elite will perceive revolution threat and either increase repressive capacity OR offer concessions within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Increased policing and protest restrictions, OR policy concessions to reduce threat',
          refutationConditions: 'Elite ignores mobilization threat entirely',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.mobilizationalBalance > 55) {
        predictions.push({
          id: `${modelId}-secure-${Date.now()}`,
          modelId,
          hypothesis: 'With regime mobilization advantage, elites feel secure and will not offer redistributive concessions',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'No new social programs, continued or increased inequality, elite confidence',
          refutationConditions: 'Redistributive policies enacted despite regime security',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'svolik':
      // Overall consolidation check
      const svolikAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (svolikAvg > 50) {
        predictions.push({
          id: `${modelId}-tolerance-high-${Date.now()}`,
          modelId,
          hypothesis: 'Model predicts partisan voters will tolerate democratic violations by co-partisan regime (measurable in polling)',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows regime supporters accept norm violations their party would condemn if done by opposition',
          refutationConditions: 'Co-partisan voters punish regime for democratic violations',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-tolerance-low-${Date.now()}`,
          modelId,
          hypothesis: 'With low consolidation, model predicts co-partisan voters may begin punishing democratic violations - limit to tolerance',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows declining regime support among co-partisans after norm violations, or backlash visible',
          refutationConditions: 'Partisan voters continue tolerating violations despite low consolidation',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.political > 40) {
        predictions.push({
          id: `${modelId}-defection-weak-${Date.now()}`,
          modelId,
          hypothesis: 'Elite coordination: if violation becomes public, some co-partisan elites will defect within 3 months',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Prominent regime-party figures publicly criticize or distance from violation',
          refutationConditions: 'Elite unanimity in supporting/ignoring violation',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.political < 35) {
        predictions.push({
          id: `${modelId}-defection-strong-${Date.now()}`,
          modelId,
          hypothesis: 'Strong opposition predicts elite defection cascade - co-partisan elites will coordinate to abandon would-be autocrat',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Multiple prominent regime-party figures defect, coordinate criticism, or form anti-regime faction',
          refutationConditions: 'Elite remains loyal despite strong opposition',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'gramscian':
      // Check hegemonic success via media/public opinion
      const hegemonyIndicator = (currentScores.media || 50) + (currentScores.publicOpinion || 50);
      if (hegemonyIndicator > 100) {
        predictions.push({
          id: `${modelId}-hegemony-high-${Date.now()}`,
          modelId,
          hypothesis: 'Hegemonic success: model predicts regime narratives will become normalized "common sense" within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Regime narratives become mainstream media "both sides" framing, or cultural institutions align with regime framing',
          refutationConditions: 'Counter-hegemonic narratives dominate, regime framing rejected by mainstream',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-hegemony-low-${Date.now()}`,
          modelId,
          hypothesis: 'Hegemonic failure: model predicts counter-hegemonic narratives will successfully contest regime framing within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Counter-hegemonic narratives gain mainstream traction, regime framing rejected, alternative "common sense" emerges',
          refutationConditions: 'Regime successfully normalizes its framing despite initial failure',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-organic-${Date.now()}`,
          modelId,
          hypothesis: 'Counter-hegemonic organic intellectuals (media figures, academics, activists) will articulate successful resistance narrative',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Prominent figures emerge articulating counter-narrative that gains mass following',
          refutationConditions: 'No coherent counter-narrative emerges, opposition remains fragmented ideologically',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'linz':
      // Check for regime consolidation vs divided government
      const linzAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (linzAvg > 50) {
        predictions.push({
          id: `${modelId}-deadlock-high-${Date.now()}`,
          modelId,
          hypothesis: 'Presidential system rigidity predicts executive-legislative conflict will escalate (constitutional hardball) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Government shutdown, impeachment attempts, executive orders challenged, or legislative obstruction',
          refutationConditions: 'Interbranch cooperation, negotiated compromises, normal legislative process',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-bypass-${Date.now()}`,
          modelId,
          hypothesis: 'Executive will attempt to bypass legislative constraints through unilateral action (executive orders, emergency powers)',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Increased executive orders, emergency declarations, or administrative actions bypassing Congress',
          refutationConditions: 'Executive works through normal legislative process',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-deadlock-low-${Date.now()}`,
          modelId,
          hypothesis: 'With weak consolidation, presidential system checks will function - legislative constraints will hold against executive overreach',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Congress blocks executive overreach, courts check executive orders, impeachment threat credible',
          refutationConditions: 'Executive successfully bypasses legislative constraints',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-checks-${Date.now()}`,
          modelId,
          hypothesis: 'Interbranch cooperation: normal legislative process will continue despite tensions',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Bills pass through regular order, bipartisan deals, executive works with legislature',
          refutationConditions: 'Total gridlock, constitutional crisis, or executive unilateralism',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;
  }

  return predictions;
}

// Calculate progressiveness score based on prediction track record
export function calculateProgressiveness(programme: ResearchProgramme): { score: number; status: 'progressive' | 'stagnant' | 'degenerating' } {
  const total = programme.confirmedNovel + programme.confirmedKnown + programme.refuted;

  if (total === 0) {
    return { score: 50, status: 'stagnant' }; // No track record yet
  }

  // Novel confirmed predictions are most valuable
  // Retrodictions (explaining known facts) are less valuable
  // Refutations hurt the score
  const novelWeight = 3;
  const knownWeight = 1;
  const refutedWeight = -2;

  const weightedSum = (programme.confirmedNovel * novelWeight) +
                      (programme.confirmedKnown * knownWeight) +
                      (programme.refuted * refutedWeight);

  const maxPossible = total * novelWeight;
  const minPossible = total * refutedWeight;

  // Normalize to 0-100
  const score = Math.round(((weightedSum - minPossible) / (maxPossible - minPossible)) * 100);

  let status: 'progressive' | 'stagnant' | 'degenerating';
  if (score >= 60 && programme.confirmedNovel > programme.refuted) {
    status = 'progressive';
  } else if (score <= 40 || programme.refuted > programme.confirmedNovel) {
    status = 'degenerating';
  } else {
    status = 'stagnant';
  }

  return { score, status };
}

// Evaluate which programmes are performing best
export function evaluateProgrammes(programmes: ResearchProgramme[]): {
  ranking: { modelId: string; modelName: string; score: number; status: string }[];
  insights: string[];
} {
  const ranking = programmes
    .map(p => {
      const { score, status } = calculateProgressiveness(p);
      return {
        modelId: p.modelId,
        modelName: p.modelName,
        score,
        status
      };
    })
    .sort((a, b) => b.score - a.score);

  const insights: string[] = [];

  const progressive = ranking.filter(r => r.status === 'progressive');
  const degenerating = ranking.filter(r => r.status === 'degenerating');

  if (progressive.length > 0) {
    insights.push(`Progressive programmes (predicting novel facts): ${progressive.map(p => p.modelName).join(', ')}`);
  }

  if (degenerating.length > 0) {
    insights.push(`Degenerating programmes (failing predictions): ${degenerating.map(p => p.modelName).join(', ')}`);
  }

  if (ranking.length >= 2 && ranking[0].score - ranking[ranking.length - 1].score > 30) {
    insights.push(`Large gap between best (${ranking[0].modelName}) and worst (${ranking[ranking.length - 1].modelName}) performing programmes suggests some theories fit current case better than others`);
  }

  return { ranking, insights };
}
