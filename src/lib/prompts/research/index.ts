import { JSON_FORMAT } from '@/lib/prompts/research/json-format';
import { SCORING_RUBRIC } from '@/lib/prompts/research/scoring-rubric';

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
