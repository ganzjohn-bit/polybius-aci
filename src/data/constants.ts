import { Factor } from "@/types/calculator";

export const factors: Factor[] = [
  { id: 'judicial', name: 'Judicial Independence', weight: 0.20, dangerThreshold: 40, description: 'Court independence from executive control, judicial appointments process, constitutional review capacity' },
  { id: 'federalism', name: 'Federalism/Regional Resistance', weight: 0.20, dangerThreshold: 50, description: 'Subnational autonomy, opposition control of states/regions, vertical separation of powers' },
  { id: 'political', name: 'Political Competition', weight: 0.15, dangerThreshold: 55, description: 'Opposition party viability, electoral fairness, legislative independence' },
  { id: 'media', name: 'Media Capture', weight: 0.15, dangerThreshold: 70, description: 'Press freedom, ownership concentration, journalist safety, information ecosystem health' },
  { id: 'civil', name: 'Civil Society', weight: 0.10, dangerThreshold: 65, description: 'NGO freedom, protest rights, union strength, associational life' },
  { id: 'publicOpinion', name: 'Public Opinion', weight: 0.10, dangerThreshold: 55, description: 'Support for democratic NORMS vs. strongman rule (NOT admin approval). High = public open to authoritarianism' },
  { id: 'mobilizationalBalance', name: 'Mobilizational Balance', weight: 0.10, dangerThreshold: 55, description: 'Civil society balance (Berman, Riley, Skocpol). Assess BOTH sides carefully. Regime: white evangelical churches (when activated), GOP committees, militias, conservative 501c4s, conservative Catholic orgs. Opposition: unions (teachers, SEIU, AFSCME), BLACK CHURCHES (Souls to the Polls - often more activated than white evangelicals), mainline Protestant networks, progressive Catholic groups (Nuns on the Bus), civil rights chapters, Indivisible. Catholics are SPLIT - assess both wings. Weight by turnout capacity, not media perception.' },
  { id: 'stateCapacity', name: 'State Capacity', weight: 0.10, dangerThreshold: 60, description: 'Bureaucratic coordination, surveillance capability, and executive coercive control. Assess per-branch: military (constitutional loyalty tradition), DHS/ICE (executive-responsive), FBI/DOJ (institutional independence), local police (federalism check). Score reflects capacity × loyalty orientation interaction.' },
  { id: 'corporateCompliance', name: 'Corporate Compliance', weight: 0.10, dangerThreshold: 70, description: 'Business elite alignment, corporate self-censorship, economic pressure compliance' },
  { id: 'electionInterference', name: 'Election Interference', weight: 0.10, dangerThreshold: 40, description: 'Voter suppression, electoral fraud, foreign interference, gerrymandering' }
];

export const clusterLabels: Record<string, string> = {
  'institutionalist': 'Institutionalist',
  'class-economic': 'Class/Economic',
  'cultural-social': 'Cultural/Social',
  'elite-strategic': 'Elite/Strategic',
  'process-dynamic': 'Process/Dynamic'
};

export const theoreticalModels = [
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
