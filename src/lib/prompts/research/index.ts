import { JSON_FORMAT } from '@/lib/prompts/research/json-format';
import { SCORING_RUBRIC } from '@/lib/prompts/research/scoring-rubric';
import { INSTITUTIONAL_RUBRIC } from '@/lib/prompts/research/rubrics/institutional';
import { PUBLIC_OPINION_RUBRIC } from '@/lib/prompts/research/rubrics/public-opinion';
import { MOBILIZATION_RUBRIC } from '@/lib/prompts/research/rubrics/mobilization';
import { MEDIA_RUBRIC } from '@/lib/prompts/research/rubrics/media';
import { SYNTHESIS_RUBRIC } from '@/lib/prompts/research/rubrics/synthesis';
import { INSTITUTIONAL_ANALYSIS_TOOL } from '@/lib/prompts/research/formats/institutional';
import { PUBLIC_OPINION_ANALYSIS_TOOL } from '@/lib/prompts/research/formats/public-opinion';
import { MOBILIZATION_ANALYSIS_TOOL } from '@/lib/prompts/research/formats/mobilization';
import { MEDIA_ANALYSIS_TOOL } from '@/lib/prompts/research/formats/media';
import { SYNTHESIS_ANALYSIS_TOOL } from '@/lib/prompts/research/formats/synthesis';

export { INSTITUTIONAL_ANALYSIS_TOOL, PUBLIC_OPINION_ANALYSIS_TOOL, MOBILIZATION_ANALYSIS_TOOL, MEDIA_ANALYSIS_TOOL, SYNTHESIS_ANALYSIS_TOOL };

export type SearchMode = 'quick' | 'live';

export interface Phase1Results {
  institutional?: Record<string, unknown>;
  publicOpinion?: Record<string, unknown>;
  mobilization?: Record<string, unknown>;
  media?: Record<string, unknown>;
}

// ── Monolithic builders (kept for rollback) ──────────────────────────

export function buildQuickSearchPrompt(country: string) {
  return `
You are a comparative politics researcher specializing in democratic backsliding and authoritarian consolidation. Based on your knowledge (up to early 2025), analyze ${country}'s vulnerability to authoritarian consolidation.

Draw on your knowledge of:

INSTITUTIONAL FACTORS:
- Judicial independence and rule of law
- Federal/regional power structures
- Electoral integrity, political competition, and generic congressional ballot polling
- Press freedom and media landscape
- Civil society health
- State institutional capacity
- Business-government relations
- Electoral administration

PUBLIC OPINION (this means REGIME APPROVAL RATING):
- ONLY measure: executive approval ratings. Convert to score using these bands:
  * Approval <35% → Score 0-20
  * Approval 35-44% → Score 21-40
  * Approval 45-50% → Score 41-50
  * Approval 51-57% → Score 51-70
  * Approval >57% → Score 71-100
- EXAMPLE: 42% approval = score ~30-35, NOT score 42
- DO NOT use "democratic norms" - only concrete approval ratings matter.

MOBILIZATIONAL BALANCE (look for CONCRETE EVIDENCE of recent mobilization):
- Weight by org type - unions/churches HIGH, 501c4s MEDIUM, think tanks LOW
- CRITICAL: Assess based on RECENT DEMONSTRATIONS of capacity, not assumptions. Has infrastructure actually mobilized in past 2 years?

MINNEAPOLIS 2026 BENCHMARK: When tested by ICE crackdown, Minneapolis mobilized 700+ businesses, 20,000+ protesters, 100 clergy arrests, general strike - because infrastructure existed from George Floyd 2020 organizing (ISAIAH congregations, CWA networks, rapid response legal lines, mutual aid systems, church hubs). This is what activated opposition infrastructure looks like.

- Regime infrastructure: white evangelical churches (when ACTUALLY activated - many are passive), GOP committees, conservative 501c4s, militias, conservative Catholic orgs
- Opposition infrastructure: union locals (teachers, SEIU, AFSCME), BLACK CHURCHES (often MORE activated than white evangelicals), mainline Protestant networks (ELCA, UCC, Episcopal), progressive Catholic groups, immigrant defense networks, rapid response legal infrastructure, mutual aid networks
- Catholics are SPLIT - assess both wings locally. Don't assign to one side.
- KEY QUESTION: Do networks exist from previous mobilizations (George Floyd protests, Women's March, teacher strikes, etc.) that could transfer to new crises?

MEDIA LANDSCAPE:
- Elite outlets (NYT, WSJ, WaPo, Atlantic): overall stance toward regime
- Mainstream outlets: dominant narratives
- Populist outlets: regime-aligned vs opposition
- Substack sphere: key voices, regime vs opposition balance
- Podcast sphere: major discussions, ideological lean
- Nixon-to-China moments: unexpected editorial alignments
- Culture industry capture: is authoritarian discourse (dehumanization, scapegoating, strongman rhetoric) subcultural, mainstreaming, or normalized in elite outlets?

${SCORING_RUBRIC}

${JSON_FORMAT}`;
}

export function buildLiveSearchPrompt(country: string) {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return `
TODAY'S DATE: ${currentDate}

You are a comparative politics researcher specializing in democratic backsliding and authoritarian consolidation. Conduct rigorous research on ${country} to assess its vulnerability to authoritarian consolidation.

FIRST PRIORITY — MAJOR POLITICAL NEWS OF THE PAST WEEK:
Before anything else, search for and identify the MAJOR POLITICAL NEWS from the past 7 days. What are the big stories?
Search for: "${country} political news this week", "${country} news today", "Trump news this week", "Congress news", "Supreme Court news", "federal government news"

Look for:
- Executive actions, orders, or announcements
- Congressional developments (legislation, hearings, investigations)
- Court rulings or legal developments
- Cabinet/personnel changes, firings, confirmations
- Protests, strikes, or major public responses
- International developments affecting domestic politics
- Scandals, controversies, or norm violations
- State-level resistance or compliance

Your analysis MUST engage with this week's actual news. Do not produce a generic assessment that could have been written last month. The summary should reference SPECIFIC RECENT EVENTS by name and date.

CRITICAL — FACTUAL ACCURACY RULES:
1. DO NOT FABRICATE OR INVENT NEWS EVENTS. Only report things you actually found in search results.
2. DO NOT COMBINE SEPARATE NEWS ITEMS INTO A SINGLE EVENT. If Gallup stopped polling AND the Supreme Court ruled on something, these are TWO SEPARATE EVENTS. Do not write "The Supreme Court ended Gallup polling" by mashing them together.
3. Every factual claim must come from a specific source. If you cannot find verification, do not report it as fact.
4. When uncertain, say "reports indicate" or "according to [source]" — do not present speculation as established fact.
5. NO "POLITICAL SLOP" — do not generate plausible-sounding analysis by remixing real fragments into false combinations. This is worse than saying nothing.

MANDATORY: Use web search to gather current ${currentYear} data on:

INSTITUTIONAL FACTORS:
- Judicial independence, court rulings, appointments
- Federalism, regional autonomy, state-level opposition
- Electoral integrity, opposition status, legislative dynamics, GENERIC BALLOT polling (search: "generic ballot poll [month] [year]", "congressional ballot Democrats Republicans")
- Press freedom, media ownership, journalist safety
- NGO restrictions, protest rights, civil society health
- Security apparatus coordination, surveillance
- Corporate responses to government pressure
- Electoral administration, voter access

PUBLIC OPINION (this means REGIME POPULARITY, not abstract norms):
- REGIME APPROVAL RATINGS: Current presidential/executive approval (aggregate AND by party), trend over past months, demographic breakdowns
- Search for: "[leader name] approval rating", "[leader name] popularity polls", "approval rating [month] [year]"
- DO NOT search for or report on "support for democracy" or "democratic norms" - these abstract measures are meaningless. Only concrete approval ratings matter.

MOBILIZATIONAL INFRASTRUCTURE:
Search for union density data, recent protests/strikes, and named organizations. Do NOT give vague answers like "limited data" - find specifics.

FOR US: Search for recent mobilizations (Minneapolis January 2026 ICE response is key example - 700+ businesses closed, 20,000+ rallied). Search "[state] union density" for BLS data. Look for: ISAIAH, Faith in Action, TakeAction Minnesota, state AFL-CIO, SEIU locals, teachers unions, rapid response networks.

EVIDENCE MUST INCLUDE: Specific org names, actual numbers (union density %, membership counts), recent mobilization events with turnout figures.

RELIGIOUS LANDSCAPE - assess carefully, don't assume evangelical=GOP advantage:
- Black churches: Often MORE activated than white evangelicals (Souls to the Polls, voter registration)
- Evangelical: Verify actual activation, not assumed
- Catholic: SPLIT - assess both conservative (Catholic Vote) and progressive (Catholic Charities, Nuns on the Bus) wings
- Mainline Protestant: ELCA, UCC lean progressive

Regime-side: evangelical activation (when real), GOP committees, AFP, Turning Point, Moms for Liberty, militias
Opposition-side: unions, Black churches, mainline Protestant, progressive Catholic, civil rights chapters, immigrant defense networks

MEDIA LANDSCAPE (search for recent op-eds, commentary, podcast discussions):
- Elite outlets (NYT, WSJ, WaPo, Atlantic, New Yorker, Economist): What are they saying? Critical or supportive of regime?
- Mainstream outlets (CNN, Fox, network news): Dominant narratives?
- Populist outlets: What's Breitbart, Daily Wire saying? What's HuffPost, Vox saying?
- Major Substacks: What are Heather Cox Richardson, Matt Yglesias, Bari Weiss, Matt Taibbi, Glenn Greenwald writing?
- Major podcasts: What are Joe Rogan, Tucker Carlson, Ben Shapiro, Pod Save America, Ezra Klein discussing?
- NIXON-TO-CHINA MOMENTS: Any regime-friendly outlets criticizing the regime? Any opposition outlets praising?
- AUTHORITARIAN DISCOURSE: Is dehumanizing language (vermin, invasion, enemies of the people), scapegoating, or strongman rhetoric appearing in mainstream/elite outlets or confined to populist fringe?

${SCORING_RUBRIC}

${JSON_FORMAT}`;
}

// ── Sub-query builders (parallel decomposition) ──────────────────────

const TREND_INSTRUCTIONS = `
TREND VALUES - use ONLY these three values for all "trend" fields:
"improving" = score is going DOWN (situation getting BETTER for democracy, WORSE for authoritarian consolidation)
"deteriorating" = score is going UP (situation getting WORSE for democracy, BETTER for authoritarian consolidation)
"stable" = score is roughly unchanged

DIRECTION IS ALWAYS FROM DEMOCRACY'S PERSPECTIVE. Examples:
- Courts ruling against executive overreach → judicial trend = "improving"
- Opposition mobilization growing → mobilizationalBalance trend = "improving"
- DHS deploying more agents domestically → stateCapacity trend = "deteriorating"
- Media outlets being shut out of briefings → media trend = "deteriorating"
- Regime approval dropping from 45% to 39% → publicOpinion trend = "improving" (harder to consolidate)

DO NOT use "growing", "strengthening", "worsening", "weakening", or any other term. ONLY "improving", "deteriorating", or "stable".`;

const FACTUAL_ACCURACY_RULES = `
CRITICAL — FACTUAL ACCURACY RULES:
1. DO NOT FABRICATE OR INVENT NEWS EVENTS. Only report things you actually found in search results.
2. DO NOT COMBINE SEPARATE NEWS ITEMS INTO A SINGLE EVENT.
3. Every factual claim must come from a specific source. If you cannot find verification, do not report it as fact.
4. When uncertain, say "reports indicate" or "according to [source]".
5. NO "POLITICAL SLOP" — do not generate plausible-sounding analysis by remixing real fragments into false combinations.`;

function liveHeader(country: string): string {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return `TODAY'S DATE: ${currentDate}\n\nMANDATORY: Use web search to gather current ${currentYear} data on ${country}.\n${FACTUAL_ACCURACY_RULES}`;
}

export function buildInstitutionalPrompt(country: string, mode: SearchMode) {
  const roleIntro = `You are a comparative politics researcher specializing in democratic institutions. Analyze ${country}'s institutional vulnerability to authoritarian consolidation, focusing on judiciary, federalism, political opposition, civil society, and electoral integrity.`;

  const quickSearchInstructions = `Based on your knowledge (up to early 2025), assess the following institutional factors for ${country}.`;

  const liveSearchInstructions = `${liveHeader(country)}

Search for:
- Judicial independence, court rulings, appointments (search: "${country} court rulings", "Supreme Court news")
- Federalism, regional autonomy, state-level opposition (search: "${country} state resistance", "federalism")
- Electoral integrity, opposition status, legislative dynamics, GENERIC BALLOT polling (search: "generic ballot poll", "congressional ballot Democrats Republicans")
- NGO restrictions, protest rights, civil society health (search: "${country} civil liberties", "protest rights")
- Electoral administration, voter access (search: "voter access", "election administration")

Your analysis MUST engage with this week's actual news. Reference SPECIFIC RECENT EVENTS by name and date.`;

  const instructions = mode === 'live' ? liveSearchInstructions : quickSearchInstructions;

  return `${roleIntro}

${instructions}

${INSTITUTIONAL_RUBRIC}

${TREND_INSTRUCTIONS}

After completing your research, call the ${INSTITUTIONAL_ANALYSIS_TOOL.name} tool with your results.`;
}

export function buildPublicOpinionPrompt(country: string, mode: SearchMode) {
  const roleIntro = `You are a comparative politics researcher specializing in public opinion and regime legitimacy. Analyze ${country}'s regime approval ratings, demographic breakdowns, and corporate compliance.`;

  const quickSearchInstructions = `Based on your knowledge (up to early 2025), assess public opinion and corporate compliance for ${country}.

PUBLIC OPINION (this means REGIME APPROVAL RATING):
- ONLY measure: executive approval ratings. Convert to score using the bands in the rubric below.
- EXAMPLE: 42% approval = score ~30-35, NOT score 42
- DO NOT use "democratic norms" - only concrete approval ratings matter.`;

  const liveSearchInstructions = `${liveHeader(country)}

PUBLIC OPINION (this means REGIME POPULARITY, not abstract norms):
- REGIME APPROVAL RATINGS: Current presidential/executive approval (aggregate AND by party), trend over past months, demographic breakdowns
- Search for: "Trump approval rating", "presidential approval polls", "approval rating February 2026"
- DO NOT search for or report on "support for democracy" or "democratic norms" - only concrete approval ratings matter.

DEMOGRAPHIC CROSS-TABS: Search for polls with demographic breakdowns:
- Search for: "approval by education", "approval by income", "business owner sentiment", "union household approval"
- Search for: "approval by race", "approval by age", "gender gap approval"

CORPORATE COMPLIANCE: Search for corporate responses to government pressure, DEI rollbacks, business-government relations.`;

  const instructions = mode === 'live' ? liveSearchInstructions : quickSearchInstructions;

  return `${roleIntro}

${instructions}

${PUBLIC_OPINION_RUBRIC}

${TREND_INSTRUCTIONS}

After completing your research, call the ${PUBLIC_OPINION_ANALYSIS_TOOL.name} tool with your results.`;
}

export function buildMobilizationPrompt(country: string, mode: SearchMode) {
  const roleIntro = `You are a comparative politics researcher specializing in civil society, social movements, and state coercive capacity. Analyze ${country}'s mobilizational balance (regime vs opposition organizational infrastructure) and state capacity (executive command of coercive apparatus).`;

  const quickSearchInstructions = `Based on your knowledge (up to early 2025), assess mobilizational balance and state capacity for ${country}.

MOBILIZATIONAL BALANCE (look for CONCRETE EVIDENCE of recent mobilization):
- Weight by org type - unions/churches HIGH, 501c4s MEDIUM, think tanks LOW
- CRITICAL: Assess based on RECENT DEMONSTRATIONS of capacity, not assumptions.

MINNEAPOLIS 2026 BENCHMARK: When tested by ICE crackdown, Minneapolis mobilized 700+ businesses, 20,000+ protesters, 100 clergy arrests, general strike. This is what activated opposition infrastructure looks like.

- Regime infrastructure: white evangelical churches (when ACTUALLY activated), GOP committees, conservative 501c4s, militias
- Opposition infrastructure: union locals, BLACK CHURCHES, mainline Protestant networks, progressive Catholic groups, immigrant defense networks
- Catholics are SPLIT - assess both wings locally.`;

  const liveSearchInstructions = `${liveHeader(country)}

MOBILIZATIONAL INFRASTRUCTURE:
Search for union density data, recent protests/strikes, and named organizations. Do NOT give vague answers like "limited data" - find specifics.

FOR US: Search for recent mobilizations (Minneapolis January 2026 ICE response is key example). Search "[state] union density" for BLS data. Look for: ISAIAH, Faith in Action, TakeAction Minnesota, state AFL-CIO, SEIU locals, teachers unions, rapid response networks.
EVIDENCE MUST INCLUDE: Specific org names, actual numbers (union density %, membership counts), recent mobilization events with turnout figures.

RELIGIOUS LANDSCAPE - assess carefully:
- Black churches: Often MORE activated than white evangelicals
- Evangelical: Verify actual activation, not assumed
- Catholic: SPLIT - assess both wings
- Mainline Protestant: ELCA, UCC lean progressive

DIGITAL ECOSYSTEM: Search for current platform data, audience numbers, coordination examples.

STATE CAPACITY: Search for domestic deployment of federal agents, DHS/ICE operations, military posture, parallel forces.`;

  const instructions = mode === 'live' ? liveSearchInstructions : quickSearchInstructions;

  return `${roleIntro}

${instructions}

${MOBILIZATION_RUBRIC}

${TREND_INSTRUCTIONS}

After completing your research, call the ${MOBILIZATION_ANALYSIS_TOOL.name} tool with your results.`;
}

export function buildMediaPrompt(country: string, mode: SearchMode) {
  const roleIntro = `You are a comparative politics researcher specializing in media ecosystems and press freedom. Analyze ${country}'s media landscape, press freedom, and the information environment.`;

  const quickSearchInstructions = `Based on your knowledge (up to early 2025), assess media freedom and the media landscape for ${country}.

MEDIA LANDSCAPE:
- Elite outlets (NYT, WSJ, WaPo, Atlantic): overall stance toward regime
- Mainstream outlets: dominant narratives
- Populist outlets: regime-aligned vs opposition
- Substack sphere: key voices, regime vs opposition balance
- Podcast sphere: major discussions, ideological lean
- Nixon-to-China moments: unexpected editorial alignments
- Culture industry capture: is authoritarian discourse subcultural, mainstreaming, or normalized?`;

  const liveSearchInstructions = `${liveHeader(country)}

MEDIA LANDSCAPE (search for recent op-eds, commentary, podcast discussions):
- Elite outlets (NYT, WSJ, WaPo, Atlantic, New Yorker, Economist): What are they saying? Critical or supportive of regime?
- Mainstream outlets (CNN, Fox, network news): Dominant narratives?
- Populist outlets: What's Breitbart, Daily Wire saying? What's HuffPost, Vox saying?
- Major Substacks: What are Heather Cox Richardson, Matt Yglesias, Bari Weiss, Matt Taibbi, Glenn Greenwald writing?
- Major podcasts: What are Joe Rogan, Tucker Carlson, Ben Shapiro, Pod Save America, Ezra Klein discussing?
- NIXON-TO-CHINA MOMENTS: Any regime-friendly outlets criticizing the regime? Any opposition outlets praising?
- AUTHORITARIAN DISCOURSE: Is dehumanizing language appearing in mainstream/elite outlets or confined to populist fringe?

PRESS FREEDOM: Search for journalist safety, media ownership changes, access denial, outlet closures.`;

  const instructions = mode === 'live' ? liveSearchInstructions : quickSearchInstructions;

  return `${roleIntro}

${instructions}

${MEDIA_RUBRIC}

${TREND_INSTRUCTIONS}

After completing your research, call the ${MEDIA_ANALYSIS_TOOL.name} tool with your results.`;
}

export function buildSynthesisPrompt(country: string, mode: SearchMode, phase1Results: Phase1Results) {
  const roleIntro = `You are a comparative politics researcher specializing in democratic backsliding and authoritarian consolidation. You have been given detailed factor scores and evidence from a parallel research process on ${country}. Your job is to synthesize this into model-specific theoretical diagnoses and a plain-language summary.`;

  const phase1Json = JSON.stringify(phase1Results, null, 2);

  return `${roleIntro}

PHASE 1 RESEARCH RESULTS (all factor scores and evidence gathered by specialized researchers):
${phase1Json}

Using the factor scores and evidence above, produce the theoretical model diagnoses and summary below. Do NOT re-score the factors — they are already scored. Focus on INTERPRETATION and SYNTHESIS.

${SYNTHESIS_RUBRIC}

After completing your synthesis, call the ${SYNTHESIS_ANALYSIS_TOOL.name} tool with your results.`;
}
