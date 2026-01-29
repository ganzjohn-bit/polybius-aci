import { NextRequest, NextResponse } from 'next/server';

interface ContentBlock {
  type: string;
  text?: string;
}

interface ApiResponse {
  content: ContentBlock[];
  stop_reason: string;
}

interface CacheEntry {
  data: Record<string, unknown>;
  timestamp: number;
}

// Clean up XML/HTML artifacts from text
function cleanArtifacts(text: string): string {
  return text
    // Remove XML tags
    .replace(/<\/?[a-zA-Z_][a-zA-Z0-9_-]*[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    // Remove citation markers like [1], [2], etc.
    .replace(/\[\d+\]/g, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Recursively clean all string values in an object
function cleanObjectStrings(obj: unknown): unknown {
  if (typeof obj === 'string') {
    return cleanArtifacts(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanObjectStrings);
  }
  if (obj && typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = cleanObjectStrings(value);
    }
    return cleaned;
  }
  return obj;
}

// In-memory cache: key = "country|mode", value = cached result
const cache = new Map<string, CacheEntry>();

// Cache duration: 1 hour for quick mode, 15 min for live mode
const QUICK_CACHE_MS = 60 * 60 * 1000;
const LIVE_CACHE_MS = 15 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const { country, apiKey, searchMode = 'quick' } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }

    if (!country) {
      return NextResponse.json({ error: 'Country required' }, { status: 400 });
    }

    // Check cache first
    const cacheKey = `${country.toLowerCase().trim()}|${searchMode}`;
    const cached = cache.get(cacheKey);
    const cacheDuration = searchMode === 'live' ? LIVE_CACHE_MS : QUICK_CACHE_MS;

    if (cached && (Date.now() - cached.timestamp) < cacheDuration) {
      console.log(`Cache hit for ${cacheKey}`);
      return NextResponse.json({ ...cached.data, cached: true });
    }

    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const scoringRubric = `SCORING (0-100, higher = more authoritarian):

JUDICIAL: 0-20=independent courts, 21-40=some pressure, 41-60=packed/intimidated, 61-80=rubber stamp, 81-100=captured
FEDERALISM: 0-20=strong regional autonomy, 21-40=some autonomy, 41-60=encroachment, 61-80=eliminated, 81-100=total centralization
POLITICAL (opposition viability + generic ballot):
  MEASURE: Combine structural barriers with GENERIC CONGRESSIONAL BALLOT polling.
  Search for: "generic ballot poll", "congressional ballot [month] [year]", "Democrats vs Republicans generic ballot"

  GENERIC BALLOT INTEGRATION:
  - Opposition leads generic ballot by 5+% → Strong indicator of competition (pull score toward 0-20)
  - Opposition leads by 1-5% → Healthy competition (pull toward 20-35)
  - Tied or regime leads by 1-3% → Contested (pull toward 35-50)
  - Regime leads by 3-7% → Regime advantage (pull toward 50-65)
  - Regime leads by 7+% → Weak opposition (pull toward 65+)

  ALSO ASSESS: Opposition party fundraising, candidate recruitment, legislative independence, structural barriers (gerrymandering, ballot access)

  SCORING: 0-20=robust competition, 21-40=some advantages, 41-60=significant barriers, 61-80=opposition jailed, 81-100=no opposition
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

  EXAMPLE: If Trump approval is 42%, score should be ~30-35 (in the 21-40 band for "underwater"). Do NOT score 42 just because approval is 42%.

  ALSO NOTE: Intensity matters - is the base enthusiastic or reluctant? Adjust within band accordingly.

  DEMOGRAPHIC CROSS-TABS (CRITICAL for class/elite analysis - search for recent polling with breakdowns):
  Search for polls with demographic breakdowns on regime approval/key policies. Include in evidence:

  CLASS INDICATORS (distinguish Marxian from Weberian):

  MARXIAN CLASS (relationship to means of production - THIS IS PRIMARY):
  - Capital owners: Business owners, investors, landlords, shareholders (own means of production)
  - Working class: Wage laborers who sell labor power (do NOT own means of production)
  - Search for: "business owner approval" vs "employee approval", investor sentiment vs worker sentiment
  - Self-employed vs employed distinction matters
  - Stock ownership as proxy: significant shareholders vs non-owners

  WEBERIAN STATUS (education/credentials - secondary, feeds different models):
  - Education: Non-college vs college vs postgrad (credentialism, not Marxian class)
  - This feeds Svolik polarization analysis, not Marxian analysis
  - Professional-managerial class (PMC) is NOT bourgeoisie - they sell labor too

  INCOME (imperfect proxy - high-paid workers ≠ capitalists):
  - Income bands are WEAK proxy for class - a well-paid doctor is still a worker
  - Use income only when ownership data unavailable
  - Union households: Union vs non-union (actual working class organization)

  ELITE VS MASS (for Svolik, A-R models):
  - Business owner/investor sentiment vs general population
  - CEO surveys, Chamber of Commerce, Business Roundtable positions
  - Capital-owner class vs everyone else

  OTHER KEY BREAKS:
  - Race/ethnicity: White vs Black vs Hispanic vs Asian approval
  - Age: 18-29 vs 30-44 vs 45-64 vs 65+ (generational divide)
  - Gender: Men vs women gap
  - Geography: Urban vs suburban vs rural
  - Religion: White evangelical vs Black Protestant vs Catholic vs secular

  INTERPRET FOR THEORY:
  - Capital owners vs workers divergence → MARXIAN (class struggle, capital vs labor)
  - Education/credential polarization → SVOLIK (partisan sorting by education)
  - Elite-mass divergence (any measure) → A-R REDISTRIBUTIVE (elite veto, mass threat)
  - Cross-class coalition for regime → GRAMSCIAN (hegemony, consent across classes)
  - Working class support for regime despite capital opposition → CLASSICAL (demagoguery, popular tyranny)
  - Capital supporting regime against workers → MARXIAN (capital using state against labor)
MOBILIZATIONAL_BALANCE (civil society & digital infrastructure - per Berman, Riley, Skocpol's "dark side of social capital"):
  WEIGHT BY ORG TYPE: HIGH=unions (dues-paying, can strike), churches (activated congregations with turnout infrastructure), membership orgs with dues; MEDIUM=501c4 advocacy orgs, community orgs, worker centers; LOW=staff-driven 501c3s, policy think tanks (ideas not people). DISCOUNT centralized orgs dependent on charismatic leaders, "chapters" that are sign-ups not active locals.

  RELIGIOUS MOBILIZATION (assess carefully - don't assume evangelical=GOP advantage):
  - EVANGELICAL PROTESTANT: White evangelicals strongly GOP-aligned, but assess ACTUAL activation vs assumed. Many congregations are passive consumers, not mobilization infrastructure. Look for: voter guides distributed, pulpit politics, church-based canvassing, "values voter" turnout operations.
  - BLACK CHURCHES: Historically crucial Democratic infrastructure (AME, National Baptist Convention, COGIC, Black megachurches). "Souls to the Polls" programs, voter registration drives, community organizing tradition. Often MORE activated than white evangelical counterparts. HIGH weight for opposition.
  - MAINLINE PROTESTANT (Episcopal, PCUSA, UMC, ELCA, UCC, Disciples): Declining membership but institutional presence remains. Lean moderate-to-liberal. Sanctuary movement, climate advocacy, LGBTQ inclusion. MEDIUM weight for opposition but assess local activation.
  - CATHOLIC: SPLIT constituency - do not assign to one side. Conservative wing (Catholic Vote, some bishops, Knights of Columbus on social issues, EWTN audience) vs Progressive wing (Network/Nuns on the Bus, Catholic Worker, Catholic Charities on immigration/poverty, Jesuits, many religious orders). Hispanic Catholics lean Democratic. Assess which wing is more activated locally.
  - OTHER: Jewish congregations (lean Democratic, organized), Muslim communities (post-2016 more activated, lean Democratic), Hindu/Sikh (growing, mixed).

  REGIME-ALIGNED (US): white evangelical churches (when actually activated, not just assumed), local GOP committees, conservative 501c4s (AFP, Turning Point Action), militia/paramilitary (Oath Keepers, Proud Boys, 3%ers), conservative Catholic orgs, business associations (chambers of commerce).
  OPPOSITION (US): union locals (public sector especially - teachers, SEIU, AFSCME), Black churches and faith networks, civil rights chapters (NAACP, Urban League), worker centers, Indivisible chapters, Working Families Party, DSA chapters (note: 75,000+ members nationally; largest chapters: NYC-DSA 10,000+, Chicago DSA, LA DSA, Austin DSA, Philly DSA, Twin Cities DSA, Pittsburgh DSA - search for local chapter membership and elected officials like AOC, Jamaal Bowman, state legislators), state civic engagement tables (State Voices network), mainline Protestant social justice committees, progressive Catholic networks, coordinated campaign infrastructure.

  ALSO ASSESS (TRADITIONAL): Coalition infrastructure (do coordination bodies exist?), historical activation (can they turn people out? recent precedents?), federated vs centralized structure. Don't double-count: ActBlue is fundraising infrastructure, not mobilization. Measure actual door-knocking, phone-banking, turnout capacity.

  DIGITAL MOBILIZATIONAL INFRASTRUCTURE (critical - social media as mass movement):
  The digital ecosystem is the modern articulation of mass movement organizational capacity. January 6, 2021
  demonstrated that digital infrastructure can mobilize large-scale offline action - this is the proof of concept
  that digital movements have real-world capture potential. Assess digital infrastructure with the SAME seriousness
  as traditional civil society, but apply appropriate discounts for platform fragility and commitment depth.

  REGIME-ALIGNED DIGITAL ECOSYSTEM (US):
  - OWNED PLATFORMS: Truth Social (Trump-owned, ~5M users, direct regime communication channel - assess actual
    engagement vs downloads), Rumble (video platform, regime-aligned content creators), Parler/Gab (far-right,
    smaller but dedicated). Ownership = no deplatforming risk.
  - CAPTURED PLATFORMS: Twitter/X under Musk (algorithmic amplification of regime content, blue-check pay-to-play,
    suppression of opposition voices - search for current data on political content reach/throttling). This is
    HIGH significance: a major global platform now has ownership alignment with regime.
  - FACEBOOK/META: Right-wing political content consistently highest engagement. Facebook Groups as organizing
    infrastructure (local MAGA groups, militia coordination, anti-vax/election denial networks). Meta's moderation
    changes under regime pressure (search for current content moderation policy changes).
  - PODCAST/AUDIO ECOSYSTEM: Joe Rogan Experience (~11M per episode), Ben Shapiro/Daily Wire network, Steve Bannon's
    War Room (300K+ daily, explicit regime strategy), Tucker Carlson (post-Fox, massive YouTube/Twitter reach),
    Charlie Kirk (Turning Point), Dan Bongino. IMPORTANT: This ecosystem reaches demographics that don't consume
    traditional news. Search for current audience numbers.
  - TELEGRAM/ENCRYPTED: QAnon channels, Proud Boys/Oath Keepers coordination (used for Jan 6 planning), militia
    networks. Low visibility but HIGH operational significance for actual mobilization.
  - YOUTUBE: Right-wing content creator ecosystem, algorithmic radicalization pipeline (recommendations lead from
    mainstream conservative → far right). Search for current data on political content.
  - INFLUENCER NETWORKS: TPUSA Ambassador program, right-wing TikTok/Instagram influencers targeting youth.
    Corporate influencer partnerships (search for current examples).
  - KEY METRIC: Does this ecosystem function as an INTEGRATED information environment? Can regime direct messaging
    across these platforms simultaneously? (Bannon's "flood the zone" strategy operationalized through coordinated
    multi-platform messaging.)

  OPPOSITION DIGITAL ECOSYSTEM (US):
  - Bluesky (~25M users, growing, progressive-leaning, but is it organizing infrastructure or just conversation?)
  - Progressive substacks/newsletters (subscriber counts, but passive consumption vs activation)
  - TikTok (youth organizing, but platform under regime threat - TikTok ban as strategic move against opposition
    digital infrastructure). Labor TikTok, mutual aid TikTok, protest coordination.
  - Reddit (r/politics, local organizing subs, but Reddit is discussion not mobilization)
  - Progressive podcasts (Pod Save America, Majority Report - audience sizes vs right-wing equivalents)
  - Discord servers for organizing (but fragmented, no central coordination)
  - KEY WEAKNESS: Opposition digital infrastructure is FRAGMENTED across platforms with no ownership control,
    no coordinated messaging infrastructure, and heavy dependence on platforms that can be pressured (Meta,
    TikTok ban). Compare to regime's integrated ecosystem.

  DIGITAL → OFFLINE MOBILIZATION CAPACITY (THE CRITICAL QUESTION):
  This is what separates a "mass movement" from an "audience." Assess demonstrated capacity to convert digital
  engagement into physical-world action:
  - REGIME-ALIGNED PRECEDENTS: January 6 (thousands mobilized to Capitol via social media coordination - the
    definitive proof case), Unite the Right Charlottesville 2017, armed protests at state capitols 2020, school
    board takeovers coordinated online, election worker intimidation campaigns, ICE tip lines crowdsourced.
    Search for CURRENT examples of digitally-coordinated offline regime-aligned action.
  - OPPOSITION PRECEDENTS: BLM 2020 (massive mobilization via social media, but organizational infrastructure
    did not persist), Women's March 2017 (large but didn't build durable infrastructure), campus protests,
    union drives inspired by social media (Starbucks, Amazon). Search for CURRENT examples.
  - ASYMMETRY ASSESSMENT: Which side more effectively converts digital engagement to offline action? Which side
    has DURABLE offline structures that emerged from digital mobilization vs one-time events?

  DIGITAL COERCION & DENUNCIATION INFRASTRUCTURE:
  Historical authoritarian movements used mass organizations for TWO purposes: (1) mobilize supporters for rallies/
  violence, and (2) ENFORCE social conformity through denunciation, intimidation, boycotts, and job loss. The digital
  ecosystem now performs BOTH functions — but with STRUCTURAL WEAKNESSES that historical movements did not have.
  You MUST assess both the coercive capacity AND its fragility honestly.

  (A) DIGITALLY-DIRECTED EMPLOYMENT COERCION (the modern denunciation system):
  - Charlie Kirk / TPUSA model: Using massive podcast/social media audiences to identify, name, and campaign to get
    specific individuals fired from their jobs. Search for: Kirk firing campaigns, TPUSA Professor Watchlist,
    targeted harassment campaigns against teachers/professors/corporate employees, number of successful terminations.
  - Libs of TikTok model: Identifying specific schools, teachers, librarians, hospital workers by name and directing
    audience outrage to pressure institutions. Has driven bomb threats, harassment, policy changes. Search for current
    activity, institutional responses, law enforcement involvement.
  - Corporate pressure campaigns: Bud Light boycott, Target boycott, Disney boycott - digitally coordinated economic
    coercion to enforce political conformity in corporate behavior. Assess which succeeded, which failed, and whether
    corporations are now self-censoring preemptively (the CHILLING EFFECT is more important than any individual boycott).
  - KEY METRIC: Is there evidence of a chilling effect? Are institutions (universities, corporations, media) changing
    behavior preemptively to avoid being targeted? This is MORE important than counting individual campaigns.

  (B) DIGITAL-TO-STATE-ACTION PIPELINE (influencers directing federal power):
  - Conservative influencers/media driving federal investigations, raids, or enforcement actions against specific
    targets. When a social media personality posts about a target and federal agents subsequently act, that represents
    FUSION of mass movement and state coercive apparatus. Search for: cases where social media campaigns preceded
    federal enforcement actions, DOGE targeting specific agencies/employees after social media pressure, ICE actions
    following influencer tip campaigns, DOJ investigations that follow conservative media narratives.
  - Elon Musk / DOGE model: A private citizen with massive platform reach (200M+ Twitter followers) directing teams
    of federal operatives to investigate/disrupt specific agencies. Search for: DOGE actions at specific agencies,
    employee firings/resignations following Musk posts, agencies targeted after social media campaigns against them.
  - Congressional amplification: When social media campaigns are picked up by congressional allies who then launch
    hearings, subpoenas, or investigations. Search for: congressional investigations that originated from social
    media campaigns, hearing witnesses who were first identified/targeted online.
  - KEY METRIC: How routinely does social media targeting translate into state action? Is it sporadic or systematic?
    Is there a pattern where influencer → federal action is becoming NORMALIZED?

  (C) STRUCTURAL WEAKNESSES OF DIGITAL COERCION — THE HYPERPOLITICS PROBLEM:
  DO NOT overstate digital infrastructure as equivalent to durable parallel institutions. Digital coercion is
  ATTENTIONAL, not STRUCTURAL. It has fundamental weaknesses that historical mass movements did not have:

  - EPHEMERALITY: A brownshirt chapter exists on Tuesday whether anyone is paying attention to it or not. A Twitter
    mob requires constant content generation and audience attention. Outrage cycles have a HALF-LIFE. The Bud Light
    boycott moved markets for weeks, then attention moved on and sales partially recovered. Most firing campaigns
    are forgotten within a news cycle. Assess: do digital coercion campaigns produce DURABLE institutional change
    or temporary spikes of pressure that dissipate?
  - NO PERMANENT CADRE: The SA had members who showed up regularly, trained together, had organizational loyalty
    beyond any single campaign. Digital audiences are PASSIVE most of the time and activate only when content
    triggers engagement. There is no equivalent of drilling, no organizational discipline, no chain of command
    that persists between campaigns. The "movement" is really an AUDIENCE that is periodically activated.
  - ATTENTION ECONOMY LOGIC: Digital coercion operates on content-cycle time, not organizational time. Influencers
    need constant new targets to maintain audience engagement. This creates a scattershot pattern — many targets
    hit briefly — rather than sustained institutional pressure on strategic objectives. Compare: the Nazi party
    systematically targeted specific institutions for capture over YEARS. Digital campaigns target whoever is
    trending THIS WEEK.
  - PLATFORM FRAGILITY: The ecosystem depends on platforms that can change algorithms, ownership, or policies.
    Deplatforming (Parler, Alex Jones pre-reinstatement) can shatter networks overnight. Even owned platforms
    (Truth Social) struggle with engagement. The infrastructure has no physical fallback.
  - COUNTERSIGNAL VULNERABILITY: Digital coercion works through SOCIAL PRESSURE on intermediary institutions
    (employers, advertisers, platforms). When those institutions resist — when a university refuses to fire a
    professor, when a corporation rides out a boycott — the campaign fails and the failure is PUBLIC. Each failed
    campaign weakens the perceived threat. Assess: is the success rate of these campaigns rising or falling?
    Are institutions learning to resist?
  - PARASITIC ON CONTENT CREATORS: The entire infrastructure depends on a handful of individuals (Kirk, Musk,
    Bannon, Libs of TikTok) who can burn out, lose relevance, get into legal trouble, or have falling-outs with
    the movement. There is no institutional continuity independent of specific personalities. If Kirk stops
    posting, there is no TPUSA brownshirt chapter that continues operating autonomously.
  - HYPERPOLITICS vs POLITICS: The digital ecosystem excels at SPECTACLE — generating outrage, creating viral
    moments, making everything feel urgent and existential. But spectacle is not the same as organizational
    capacity. The question is whether hyperpolitics (constant performative escalation for audience engagement)
    can actually sustain the kind of BORING, DURABLE institutional work that real authoritarian consolidation
    requires. Brownshirts did unglamorous work: attending local council meetings, staffing party offices,
    maintaining membership rolls. Digital movements struggle with anything that isn't content.

  HONEST ASSESSMENT FRAMEWORK FOR DIGITAL COERCION:
  Ask these questions to properly weight digital infrastructure:
  1. Has any digital campaign produced PERMANENT institutional change (not just a temporary retreat)?
  2. Does the movement have organizational capacity BETWEEN campaigns (when no one is outraged)?
  3. Could the infrastructure survive the loss of its top 5 content creators?
  4. Is the success rate of coercion campaigns increasing or decreasing over time?
  5. Are targets (corporations, universities, individuals) becoming MORE or LESS resistant?
  6. Is there evidence of the movement transitioning from attentional to institutional (building durable
     local organizations, not just online audiences)?
  If most answers suggest ephemerality, DISCOUNT digital coercion significantly relative to traditional
  civil society organizations with dues, meetings, and persistent local presence.

  THEORETICAL IMPLICATIONS:
  - BERMAN-RILEY: Does the digital ecosystem constitute a mass movement with ORGANIZATIONAL CAPTURE capacity?
    Can online networks take over local GOP committees, school boards, election boards, party infrastructure?
    (Yes - MAGA has demonstrably captured the GOP through digitally-coordinated primary challenges, precinct
    strategy, etc. This IS the modern equivalent of fascist party capture of conservative parties.)
    ADDITIONALLY: The digital ecosystem performs TWO classical brownshirt functions: (1) social enforcement
    through denunciation/firing campaigns (Kirk, Libs of TikTok) creating chilling effects, and (2) directing
    state coercive power through the influencer→federal action pipeline (Musk/DOGE). Berman-Riley's precondition
    check should assess digital coercive infrastructure, not just physical paramilitaries.
    HOWEVER: Be honest about the LIMITS of digital coercion as a substitute for durable parallel organizations.
    Digital movements are ATTENTIONAL (they require constant content and outrage cycles), PERSONALITY-DEPENDENT
    (no institutional continuity beyond key creators), and EPHEMERAL (campaigns dissipate when attention moves on).
    The key Berman-Riley question is not "does digital coercion exist?" (it does) but "can attentional, episodic
    digital mobilization do the SUSTAINED, BORING institutional capture work that authoritarian consolidation
    actually requires?" Assess whether digital infrastructure is transitioning into durable local organization
    (precinct strategy, school board capture = YES, this is real institutional capture) vs remaining purely
    attentional (firing campaigns that are forgotten next week = hyperpolitics, not consolidation).
  - GRAMSCIAN: See INFORMATION HEGEMONY ASSESSMENT below — this requires careful measurement, not assumption.
  - CLASSICAL: Does digital infrastructure enable DEMAGOGIC direct appeal to masses, bypassing institutional
    intermediaries? (Trump's direct communication via Truth Social/Twitter bypasses party, press, institutions.)

  INFORMATION HEGEMONY ASSESSMENT (Gramscian - measure carefully, do not assume):
  True hegemony in Gramsci's sense means a worldview has become "common sense" — people operate within its frame
  without even realizing it. This is NOT the same as having a big audience or owning a platform. The critical
  question is the DEGREE OF CONTESTATION in the information environment. A fully hegemonic environment has no
  meaningful contestation; everyone — including opponents — argues within the regime's frame. Assess honestly:

  PLATFORM-LEVEL CONTESTATION (search for current data on each):
  - Twitter/X under Musk: Musk LITERALLY OWNS this platform and still cannot achieve information dominance on it.
    Community Notes routinely correct regime-aligned misinformation and are highly visible. Opposition voices
    (journalists, academics, politicians) still generate massive engagement. "Ratio-ing" functions as real-time
    public contestation. Blue-check pay-to-play has boosted regime voices algorithmically, but opposition
    engagement persists. Search for: Community Notes activity on political content, engagement metrics for
    opposition vs regime-aligned accounts, whether algorithmic changes have measurably shifted the discourse
    balance, journalist/academic retention vs departure.
    KEY INSIGHT: If the regime cannot achieve information hegemony on a platform it OWNS, that is strong evidence
    AGAINST hegemony in the broader information environment.
  - Facebook/Meta: Conservative content gets high engagement, but platform still hosts massive opposition organizing,
    progressive groups, union pages. Meta's moderation changes shift the balance but do not eliminate contestation.
  - TikTok: Heavily contested, youth-skewing, significant opposition/progressive content. Labor TikTok, political
    education content. Platform itself is under regime threat (ban), which is partly BECAUSE it is contested terrain.
  - YouTube: Right-wing content pipeline exists but so does Breadtube, progressive commentary, mainstream news.
    Algorithm serves engagement, not ideology exclusively.
  - Bluesky/Mastodon: Growing opposition-aligned spaces, but smaller. Their very existence = evidence of
    contestation (people creating alternative spaces to resist perceived platform capture).
  - Podcasts: Right-wing dominates audience size (Rogan, Daily Wire) but progressive ecosystem exists (Pod Save,
    Majority Report, Behind the Bastards). Neither side has a monopoly.

  NARRATIVE PENETRATION (the real hegemony test):
  True hegemony is measured NOT by whether regime supporters believe regime narratives, but by whether
  NON-SUPPORTERS have begun adopting regime FRAMES even while disagreeing with regime CONCLUSIONS.
  - Are mainstream/liberal outlets adopting regime terminology? (e.g., "illegal aliens" replacing "undocumented
    immigrants" in neutral outlets = frame adoption; outlets still using their own terms = contestation)
  - Are opposition politicians arguing WITHIN the regime's frame? (e.g., "we're tough on the border too" =
    frame concession; "the border is not a crisis" = frame contestation)
  - Has the Overton window shifted such that previously extreme positions are now debatable mainstream positions?
    Search for: what positions that were considered fringe 5 years ago are now regularly debated in mainstream
    outlets? This is the clearest evidence of partial hegemonic success.
  - Are institutions (universities, corporations, media) preemptively adopting regime preferences without being
    directly pressured? (self-censorship, DEI rollbacks, editorial softening) This is "consent" in Gramsci's
    sense — hegemony working through voluntary compliance rather than coercion.

  COUNTER-HEGEMONIC CAPACITY (opposition's ability to contest):
  - Do opposition institutions still produce and distribute alternative frames? (academia, mainstream press,
    entertainment industry, publishing, nonprofit sector) Assess the HEALTH of these institutions.
  - Is satire/comedy still effectively contesting regime narratives? (Late night, SNL, memes, social media
    humor) Humor is a classic counter-hegemonic weapon — if the regime is widely mocked, hegemony is absent.
  - Are whistleblowers, leakers, and investigative journalists still operating? (This requires institutional
    support from media outlets willing to publish, legal organizations willing to defend)
  - Are there DEFECTIONS from regime-aligned media? (Fox News hosts criticizing regime, conservative commentators
    breaking ranks) Defections = cracks in would-be hegemony.
  - Do polls show regime narratives being BELIEVED by the broader public, or only by partisans? If 70% of the
    country rejects a regime claim, that claim is not hegemonic no matter how loudly it's amplified.

  INFORMATION HEGEMONY SCORING GUIDANCE:
  - FULL CONTESTATION (no hegemony): Both sides have robust media ecosystems, mainstream institutions maintain
    independent framing, regime narratives are widely mocked/contested even on regime-aligned platforms, polls
    show regime claims rejected by majority. Score mobilizational balance LOWER (regime cannot manufacture consent).
  - PARTIAL HEGEMONY: Regime frames are increasingly adopted by mainstream institutions, Overton window has
    shifted measurably, some self-censorship evident, but opposition media and institutions still functional.
    Score mobilizational balance MODERATELY higher.
  - NEAR-HEGEMONY: Opposition frames marginalized, mainstream institutions have largely adopted regime framing,
    dissent confined to shrinking counter-cultural spaces, self-censorship widespread. Score mobilizational
    balance SIGNIFICANTLY higher.
  - CURRENT US HONEST ASSESSMENT: The US information environment is VERY CONTESTED. Neither side has hegemony.
    The regime has advantages in certain platforms and audience sizes, but opposition contestation is vigorous,
    mainstream institutions maintain independent framing (mostly), and regime claims are routinely fact-checked
    and mocked. The inability to achieve hegemony even on a literally owned platform (X/Twitter) is telling.
    Do not inflate the mobilizational balance score based on regime media ecosystem size alone — SIZE IS NOT
    HEGEMONY. Hegemony is the absence of contestation, and contestation in the US is everywhere.

  CAESARISM ASSESSMENT (critical Gramscian concept — the risk/durability tension):
  When neither progressive nor reactionary forces can achieve hegemony, Gramsci identified a specific political
  form: CAESARISM — rule by a "strong man" who arbitrates the deadlocked forces through personal authority
  rather than genuine consent. This is directly relevant to the current US situation. Assess:

  IS THIS CAESARISM? Check these conditions:
  1. Hegemonic deadlock: Neither bloc can win cultural/political hegemony (if the information hegemony assessment
     above shows "full contestation" or even "partial," this condition is likely met)
  2. Personal rule: Is political authority concentrated in a single figure rather than institutionalized in a
     party, ideology, or governing coalition? Does the movement survive without its leader?
  3. Spectacle substituting for consent: Is the regime using constant crisis, outrage cycles, and performative
     escalation (hyperpolitics) to maintain mobilization BECAUSE it cannot achieve genuine hegemonic consent?
  4. Institutional weakness: Is the regime bypassing institutions rather than capturing them — ruling through
     executive action, personnel loyalty, and media spectacle rather than legislation, bureaucratic control,
     and cultural dominance?

  THE CAESARISM PARADOX FOR THE ACI:
  Caesarism creates a genuine modeling tension that the evidence field MUST acknowledge:
  - It RAISES authoritarian RISK: The Caesarist leader is dangerous precisely because he is unconstrained by
    institutional norms, party discipline, or ideological coherence. He acts unpredictably, escalates when
    challenged, and personalist rule concentrates power without checks. Real harm to democratic institutions
    can occur under Caesarism.
  - It LOWERS authoritarian DURABILITY/CONSOLIDATION: Caesarism is inherently FRAGILE because it cannot
    institutionalize. It depends on one person's charisma, health, and attention span. It cannot build the
    bureaucratic, cultural, and institutional infrastructure that durable authoritarian regimes require. It
    is stuck on the treadmill of spectacle because it has no hegemonic foundation. When the leader goes, the
    movement fragments — because it was never really an institution, just an audience.
  - Historical examples: Napoleon III (the original Caesarist — modernized France but regime collapsed instantly
    when he was captured at Sedan), Perón (personally powerful but couldn't institutionalize; Peronism after
    Perón is perpetual factional chaos), Berlusconi (dominated Italian politics through media/personality but
    left no institutional legacy). Compare to cases that DID achieve hegemony and consolidated: the PRI in
    Mexico (70 years), the CCP (hegemonic common sense within China), even Orbán (actually doing the boring
    institutional capture work — courts, media ownership, constitutional changes, electoral law).

  HOW TO SCORE THE PARADOX:
  If the situation is Caesarist, the FACTOR SCORES should still reflect the real institutional damage being done
  (judiciary under pressure, state capacity being redirected, civil liberties eroded — these are real regardless
  of durability). BUT the evidence field and Gramscian interpretation should explicitly note: "This is Caesarist —
  high risk, low consolidation probability. The regime can do damage but likely cannot institutionalize because
  it lacks hegemonic consent. The same contestation that prevents hegemony also prevents durable consolidation."
  This lets the SCORE capture the danger while the INTERPRETATION captures the structural limits.

  WEIGHTING DIGITAL vs TRADITIONAL:
  - Traditional orgs with dues, meetings, persistent local presence = ALWAYS weighted higher than digital equivalents
  - Digital infrastructure that has CONVERTED to durable offline organization (precinct capture, school board
    takeover networks, local party committee infiltration) = HIGH weight — this is no longer purely digital
  - Digital infrastructure with demonstrated offline mobilization (Jan 6, armed protests) = MEDIUM-HIGH weight,
    but discount for one-time vs repeatable
  - Digital coercion campaigns (firing campaigns, boycotts) = MEDIUM weight — real chilling effect but attentional
    and ephemeral, operates on outrage-cycle time not organizational time
  - Digital infrastructure that is audience-only (consumption, no action) = LOW weight (equivalent to think tanks)
  - Platform ownership by regime-aligned actors = MODERATE weight (structural advantage, but platforms ≠ organizations)
  - Platform dependency on hostile platforms = DISCOUNT (can be throttled, banned, algorithm-changed)
  - Integrated multi-platform ecosystem with coordinated messaging = HIGHER than sum of parts, BUT still discount
    relative to traditional coordinated infrastructure (a labor-community table with 11 years of joint action
    is worth more than a multi-platform content ecosystem)
  - Fragmented platforms with no coordination = LOWER than sum of parts
  - PERSONALITY-DEPENDENT infrastructure = DISCOUNT (what happens if this person stops posting?)
  - GENERAL PRINCIPLE: A union local with 500 dues-paying members who show up to meetings is worth more than
    a podcast with 500,000 passive listeners. Commitment depth matters more than audience breadth. Weight
    accordingly.

  SCORING (COMBINED traditional + digital): 0-20=opposition strong (dense unions, Black church infrastructure, functioning coalitions, demonstrated turnout, effective digital organizing with offline conversion); 21-40=opposition advantage (union presence, faith networks activated, progressive infrastructure intact, competitive digital presence); 41-60=roughly balanced (both sides have infrastructure, contested terrain, digital ecosystem contested); 61-80=regime advantage (white evangelical activation high, unions weak, militia presence, opposition fragmented, regime digital ecosystem dominant with demonstrated offline mobilization, captured platforms); 81-100=regime dominates (opposition atomized, unions crushed, no counter-mobilization capacity, regime controls integrated digital infrastructure, opposition deplatformed or fragmented).

  CASE STUDY - MINNESOTA (score: 30-35, opposition advantage):
  This is what thorough mobilization assessment looks like:
  OPPOSITION INFRASTRUCTURE:
  - Unions: 14.2% density (11th highest nationally), 379K members, GREW by 23K in 2024. Education Minnesota well-resourced ($34M dues). SEIU Local 26 active (4K janitors, strikes). AFSCME Council 5 (state workers). 13,000 workers authorized coordinated strikes in 2024.
  - ISAIAH: 200 member congregations AND mosques. Muslim Coalition with 40+ Islamic centers. Political arm (Faith in Minnesota 501c4). Part of Faith in Action national network. Model of multi-faith organizing.
  - TakeAction Minnesota: Coalition hub funding ISAIAH, unions. 11+ years of labor-community coordination table. Demonstrated turnout capacity.
  - Lutheran/Mainline: 6 ELCA synods, Lutheran Advocacy-MN active on policy. Strong institutional presence.
  - Catholic Progressive: Catholic Charities Twin Cities (immigration, voter engagement). Jesuit sanctuary parish. Nuns suing over ICE detention access.
  - Black Churches: Black Votes Matter MN, North Minneapolis churches. Less formalized than South but present.
  REGIME-ALIGNED INFRASTRUCTURE:
  - Action 4 Liberty: Far-right org actually AT WAR with mainstream MN GOP. Party called them "cancer." Divisive, not unifying.
  - Conservative religious: MN Catholic Conference, Missouri Synod Lutherans (separate from ELCA), Transform MN evangelicals. Seeking exemptions but not dominating.
  - Media: Alpha News (conservative outlet).
  KEY INSIGHT: Conservative side DIVIDED (Action 4 Liberty vs GOP establishment). Opposition side COORDINATED (11-year labor-community table). Union density above national average AND growing. Multi-faith coalition genuine (includes 40+ mosques). This is what opposition advantage looks like.

STATE_CAPACITY (Executive Command of Coercive Apparatus):
  This factor measures the degree to which the executive can direct state coercive power for REGIME purposes
  rather than CONSTITUTIONAL ones. High state capacity alone is not dangerous - democracies can be highly capable.
  What matters is the INTERACTION of capacity × loyalty orientation.

  ASSESS EACH SECURITY BRANCH SEPARATELY:
  - Military: Capacity level + loyalty orientation (constitutional oath tradition vs. executive personal loyalty)
  - Federal law enforcement (FBI, DOJ): Institutional independence vs. political capture
  - Immigration/border enforcement (DHS, ICE, CBP): Executive responsiveness, domestic deployment patterns
  - Intelligence services: Oversight integrity, politicization level
  - Parallel/paramilitary forces: Do they exist? (SA, Bolivarian circles, deputized militias)
  - State/local police: Under federal or independent control?

  KEY QUESTION: If given an unconstitutional order, do security services comply or refuse?

  US-SPECIFIC ASSESSMENT:
  - MILITARY: Strong constitutional loyalty tradition. Joint Chiefs affirmed Biden transition Jan 2021. Milley
    refused to deploy troops against BLM protesters. Posse Comitatus Act limits domestic deployment. Military
    leadership has consistently pushed back on politicization. This PULLS SCORE DOWN significantly.
  - DHS/ICE/CBP: Much more directly under executive control. Currently deploying thousands of agents domestically
    (Minneapolis). Created post-9/11, lacks the military's deep constitutional culture. Agents operate under
    executive direction with less institutional resistance. This PULLS SCORE UP.
  - FBI/DOJ: Institutional independence tradition but under sustained political pressure. Career staff vs
    political appointees creates friction. Inspector general oversight exists but can be circumvented.
  - LOCAL/STATE POLICE: NOT under federal control - this is a federalism check. Some cooperate with federal
    operations, others resist (sanctuary cities).

  THE NET SCORE should reflect the WEIGHTED interaction:
  - If military remains constitutionally loyal, that's the most important single factor (they have the most capacity)
  - BUT if executive routes around military using DHS/ICE for domestic operations, that partially circumvents
    the military's constitutional loyalty
  - Parallel forces (deputized civilians, private contractors) are high-signal warning signs

  SCORING:
  0-20: Security services constitutionally loyal, institutional checks intact, no domestic deployment for political purposes
  21-40: Mostly constitutional, but some agencies showing executive responsiveness, minor domestic deployments
  41-60: Split loyalty - some agencies regime-oriented (DHS), others constitutional (military). Active domestic
         deployment of federal agents for political purposes. But military still independent.
  61-80: Most security services regime-loyal, military neutralized or complicit, systematic domestic deployment,
         parallel forces emerging
  81-100: Total regime control of all coercive apparatus, military politicized, paramilitaries operating freely

  HISTORICAL BENCHMARKS:
  - Weimar (45): Reichswehr wouldn't defend Republic but also wouldn't stop SA. SA operated as parallel force.
  - Chile (70): Military professional but willing to act against constitutional order. US-backed.
  - Turkey pre-2016 (35): Military constitutionally loyal, acted as check. Post-2016 purge (75): 150K purged.
  - Venezuela (55): Military politicized gradually, Bolivarian circles as parallel force.
  - US current: Likely 40-55 range. Military constitutional, but DHS operating as regime-responsive domestic force.
CORPORATE: 0-20=resist, 21-40=neutral, 41-60=compliance, 61-80=active cooperation, 81-100=captured
ELECTION_INTERFERENCE:
  CRITICAL - US-SPECIFIC STRUCTURAL CONSTRAINTS:
  The United States has ~10,000 separate election jurisdictions run by county/local officials, ~95% paper ballots,
  bipartisan poll watchers, statistical risk-limiting audits, and an independent judiciary that has consistently
  intervened (60+ rulings in 2020 alone). This makes centralized vote fraud or systematic rigging nearly impossible
  compared to historical cases like Hungary (constitutional rewrite + electoral system redesign), Venezuela
  (packed electoral council), Turkey (opposition leaders jailed), or Weimar (SA physical violence at polls).

  DO NOT INFLATE this score by applying frameworks from centralized electoral systems to the US.
  The US score on this factor should reflect ACTUAL mechanisms, not hypothetical ones:

  WHAT COUNTS IN THE US:
  - Gerrymandering (real but doesn't prevent power transfer - Dems won House in 2018, 2022 despite it)
  - Voter suppression laws (real but studies show marginal turnout effects - Grimmer et al.)
  - Election subversion attempts (fake electors, certification pressure - the 2020 attempt FAILED, perpetrators prosecuted)
  - Polling place closures in minority areas (localized, not systematic)

  WHAT DOES NOT EXIST IN THE US:
  - Centralized electoral commission that can be packed (no such body exists)
  - Ability to ban opposition candidates (not structurally possible)
  - State control of vote counting (county-level, bipartisan)
  - Elimination of opposition media during campaigns (First Amendment)

  HONEST SCORING FOR US: Most analyses should land in 15-30 range.
  0-20=free/fair (decentralized, paper ballots, courts intervene, bipartisan observation)
  21-40=minor structural issues (gerrymandering, some suppression laws, but power transfers still occur)
  41-60=active subversion attempts (fake electors, certification challenges - but only if SUCCEEDING, not just attempted)
  61-80=systematic fraud (would require capture of thousands of local jurisdictions - essentially impossible in current US structure)
  81-100=theatrical elections (not achievable without constitutional collapse)

  COMPARE TO HISTORICAL CASES: Weimar scored 55 with SA brownshirts beating voters. Hungary scored 65 after
  rewriting the entire constitution and electoral system. If the US score is above 30, you need to explain what
  mechanism is MORE severe than gerrymandering and localized suppression.

MODEL-SPECIFIC INTERPRETIVE DIAGNOSES:
  The factor scores above are shared across all models — they measure the same institutional realities. But different
  theoretical models INTERPRET those realities differently. In the "summary" field and the "modelDiagnoses" field,
  you must provide the distinctive diagnosis that each model's theory would produce from the SAME evidence:

  GRAMSCIAN DIAGNOSIS: Look at the information hegemony assessment. If hegemony is absent or heavily contested,
  the Gramscian diagnosis is NOT simply "low threat." It is CAESARISM — a specific Gramscian concept from the
  Prison Notebooks. Caesarism emerges when neither progressive nor reactionary forces can achieve hegemony, and
  a "strong man" fills the void through personal authority. The diagnosis should identify:
  - Is this a Caesarist situation? (hegemonic deadlock → personal rule → spectacle substituting for consent)
  - The RISK/DURABILITY PARADOX: Caesarism means high authoritarian risk but low consolidation potential.
    The regime can do real damage but probably cannot institutionalize. Flag both sides honestly.
  - Is there evidence of transition FROM Caesarism TO hegemony? (This would be the most dangerous signal —
    if the regime is beginning to achieve genuine cultural dominance, not just spectacle, the Gramscian model
    should escalate its concern significantly.)

  CLASSICAL DIAGNOSIS: Aristotle and Polybius describe the demagogue/tyrant who rules through direct popular
  appeal, bypassing institutions. This is structurally related to Gramscian Caesarism but arrives from a different
  tradition. The Classical model should diagnose:
  - Is the leader a DEMAGOGUE in the Aristotelian sense (popular leader who subverts law)?
  - Is this TYRANNY (rule for the tyrant's interest) or still DEMOCRACY-under-stress?
  - Polybius's anacyclosis: where are we in the cycle? (democracy → ochlocracy → tyranny)
  - The Classical tradition also emphasizes VIRTUE and CORRUPTION — is the civic culture strong enough to resist?

  BERMAN-RILEY DIAGNOSIS: Look at the digital infrastructure assessment AND the hyperpolitics weaknesses.
  The key Berman-Riley question is: does a mass movement with organizational CAPTURE capacity exist?
  - If digital infrastructure has converted to durable institutional capture (precinct takeover, school board
    capture, party committee infiltration) → high concern, this IS the capture mechanism
  - If digital infrastructure is purely attentional/ephemeral → lower concern, the preconditions for
    Berman-Riley's theory are not fully met (no durable brownshirt equivalent)
  - Be honest: Berman-Riley's model may diagnose the current situation as LESS dangerous than it first appears
    if the mass movement is more audience than organization

  SVOLIK DIAGNOSIS: Democratic erosion through partisan polarization. Voters tolerate democratic norm violations
  by co-partisans because partisan loyalty exceeds democratic commitment. The key question is not whether the
  leader is dangerous but whether VOTERS will constrain him. Look at public opinion data for partisan willingness
  to excuse norm violations.
  CRITICAL SVOLIK SIGNALS TO SEARCH FOR:
  - Co-partisan backlash against regime actions (e.g., Republican voters upset about ICE raids, deportation
    tactics, DOGE disruptions, or other norm-violating actions) = POSITIVE Svolik signal. This means the
    democratic constraint is working — voters are placing democratic norms above partisan loyalty.
  - Co-partisan APPROVAL of norm violations (e.g., "he's doing what needs to be done" about clearly
    extralegal actions) = NEGATIVE Svolik signal. Voters have subordinated democratic commitment to partisanship.
  - Search specifically for: polls on approval of specific controversial executive actions AMONG the president's
    own party supporters. The overall approval number matters less than the CO-PARTISAN number. If 80% of
    opposition voters disapprove, that's expected and uninformative. If 25% of CO-PARTISANS disapprove of a
    specific action, that's a powerful Svolik signal.
  - Elected co-partisan defections: Are Republican members of Congress, governors, or state legislators publicly
    criticizing specific regime actions? This is an elite-level Svolik constraint. Name specific individuals
    and what they criticized.

  HOW THE SAME DATA READS DIFFERENTLY ACROSS MODELS (examples):
  The models don't just weight factors differently — they INTERPRET the same evidence differently. When writing
  modelDiagnoses, apply these interpretive differences:

  Example: "Voters upset about ICE deportation tactics"
  - SVOLIK reads this as: POSITIVE — democratic constraint working, voters won't tolerate everything
  - GRAMSCIAN reads this as: evidence AGAINST hegemony — regime can't normalize coercion as common sense
  - CLASSICAL reads this as: civic virtue intact — citizens place law above the leader
  - STATE CAPACITY factor: UNCHANGED — the coercion is still happening regardless of whether voters like it
  - BERMAN-RILEY reads this as: mass movement lacks depth — supporters are an audience, not a cadre willing
    to do whatever the leader asks

  Example: "Right-wing podcast ecosystem has 50M weekly listeners"
  - GRAMSCIAN reads this as: potential alternative hegemony, but check if it's ACTUALLY hegemonic (are these
    listeners persuaded or entertained? do they ACT on what they hear?)
  - BERMAN-RILEY reads this as: audience ≠ organization — 50M listeners is not 50M brownshirts. How many
    would show up to a rally? To a precinct meeting? To a confrontation?
  - SVOLIK reads this as: relevant only insofar as it affects voter tolerance of norm violations
  - CLASSICAL reads this as: demagogic communication channel — direct appeal bypassing institutional filters

  Example: "Courts blocking executive orders"
  - LEVITSKY-ZIBLATT reads this as: guardrails HOLDING — institutional check functioning
  - GRAMSCIAN reads this as: counter-hegemonic institutions still operational
  - CLASSICAL reads this as: rule of law vs personal rule — law is winning (for now)
  - SVOLIK reads this as: less informative (institutional constraint, not voter constraint)
  - BERMAN-RILEY reads this as: regime hasn't captured judiciary — capture process incomplete

  LEVITSKY-ZIBLATT DIAGNOSIS: Guardrails. Are mutual toleration and institutional forbearance eroding? Focus on
  specific norm violations and whether opposition is treated as legitimate.

  Each model should produce a 1-2 sentence diagnosis that reflects ITS OWN theoretical framework's reading of
  the evidence — not just a restatement of the factor scores with different emphasis.`;

    const jsonFormat = `TREND VALUES - use ONLY these three values for all "trend" fields:
  "improving" = score is going DOWN (situation getting BETTER for democracy, WORSE for authoritarian consolidation)
  "deteriorating" = score is going UP (situation getting WORSE for democracy, BETTER for authoritarian consolidation)
  "stable" = score is roughly unchanged

  DIRECTION IS ALWAYS FROM DEMOCRACY'S PERSPECTIVE. Examples:
  - Regime approval dropping from 45% to 39% → publicOpinion trend = "improving" (harder to consolidate)
  - Courts ruling against executive overreach → judicial trend = "improving"
  - Opposition mobilization growing → mobilizationalBalance trend = "improving"
  - DHS deploying more agents domestically → stateCapacity trend = "deteriorating"
  - Media outlets being shut out of briefings → media trend = "deteriorating"

  DO NOT use "growing", "strengthening", "worsening", "weakening", or any other term. ONLY "improving", "deteriorating", or "stable".

{
  "judicial": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "federalism": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "political": {"score": 0, "evidence": "specific evidence including generic ballot margin (e.g., D+4)", "trend": "stable", "sources": "sources", "genericBallot": {"margin": 0, "leader": "D or R", "pollDate": "date", "source": "pollster"}},
  "media": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "civil": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "publicOpinion": {
    "score": 0,
    "evidence": "overall approval % and trend",
    "trend": "stable",
    "sources": "polling sources",
    "demographics": {
      "marxianClass": {
        "capitalOwners": {"approval": 0, "note": "business owners, investors, landlords"},
        "workingClass": {"approval": 0, "note": "wage workers, employees"},
        "classGap": 0,
        "capitalLaborDivergence": "describe tension or alignment"
      },
      "weberianStatus": {
        "nonCollege": 0,
        "college": 0,
        "credentialGap": 0,
        "note": "education polarization - not Marxian class"
      },
      "byRace": {
        "white": 0,
        "black": 0,
        "hispanic": 0,
        "raceGap": 0
      },
      "eliteVsMass": {
        "eliteApproval": 0,
        "massApproval": 0,
        "divergence": 0,
        "note": "elite = capital owners + high credentialed"
      },
      "keyFindings": ["finding 1", "finding 2"],
      "theoreticalImplications": {
        "marxian": "what capital vs labor split means",
        "redistributive": "what elite-mass gap means",
        "gramscian": "hegemony status: [full contestation/partial hegemony/near-hegemony]. Caesarism assessment: [is this Caesarist? high risk but low durability? or genuine hegemonic consolidation?]"
      }
    }
  },
  "mobilizationalBalance": {"score": 0, "evidence": "REQUIRED FORMAT: TRADITIONAL: Union density X.X% (trend). Opposition orgs: [named orgs]. Regime orgs: [named orgs]. Religious: Black churches [assessment], evangelical [assessment], Catholic [split assessment]. Recent mobilizations: [event, date, turnout]. Coalition infrastructure: [yes/no, named bodies]. DIGITAL INFRASTRUCTURE: Regime-aligned platforms: [Truth Social engagement, X/Twitter under Musk, podcast ecosystem audience sizes, Telegram/encrypted channels]. Opposition digital: [Bluesky, progressive media, TikTok organizing]. Digital coercion: [firing campaigns - Kirk/TPUSA/LibsofTikTok with success rate, corporate boycotts, chilling effects observed]. Digital-to-state pipeline: [cases where influencer targeting preceded federal action, Musk/DOGE examples]. Hyperpolitics discount: [evidence of ephemerality, personality dependency, attentional limits]. INFORMATION HEGEMONY: Contestation level on each major platform [X/Twitter - Community Notes activity, opposition engagement; Facebook; TikTok; YouTube]. Narrative penetration: [have regime frames been adopted by mainstream/neutral outlets? Overton window shifts?]. Counter-hegemonic capacity: [health of opposition media, satire, whistleblowers, defections from regime media]. Overall hegemony assessment: [full contestation / partial hegemony / near-hegemony, with evidence].", "trend": "stable", "sources": "sources"},
  "stateCapacity": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "corporateCompliance": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "electionInterference": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "mediaLandscape": {
    "overallSentiment": "crisis/negative/mixed/neutral/positive",
    "eliteOutlets": {
      "sentiment": "critical/mixed/supportive",
      "keyNarratives": ["narrative 1", "narrative 2"],
      "notableOpEds": ["outlet: headline/take"]
    },
    "mainstreamOutlets": {
      "sentiment": "critical/mixed/supportive",
      "keyNarratives": ["narrative 1", "narrative 2"]
    },
    "populistOutlets": {
      "regimeAligned": {"sentiment": "critical/loyal", "narratives": ["narrative"]},
      "opposition": {"sentiment": "critical/hopeful", "narratives": ["narrative"]}
    },
    "substackSphere": {
      "dominantVoices": ["name: position"],
      "regimeVsOpposition": "regime-dominated/balanced/opposition-dominated",
      "keyTakes": ["take 1", "take 2"]
    },
    "podcastSphere": {
      "majorDiscussions": ["podcast: topic discussed"],
      "regimeVsOpposition": "regime-dominated/balanced/opposition-dominated"
    },
    "nixonToChinaMoments": ["any unexpected editorial alignments - regime outlet criticizing regime, or opposition praising"],
    "cultureIndustryCapture": {
      "authoritarianDiscourseLevel": "subcultural/mainstreaming/normalized",
      "evidence": ["where authoritarian rhetoric appears"],
      "dehumanizingLanguage": false,
      "scapegoatingPresent": false
    }
  },
  "modelDiagnoses": {
    "gramscian": "1-2 sentences: Is this Caesarism (hegemonic deadlock → personal rule → spectacle over consent)? Flag risk/durability paradox. Any signs of transition from Caesarism to genuine hegemony?",
    "classical": "1-2 sentences: Demagogue or tyrant in Aristotelian terms? Where in Polybius's anacyclosis? Civic virtue assessment.",
    "bermanRiley": "1-2 sentences: Does a mass movement with organizational capture capacity exist? Is digital infrastructure converting to durable institutional capture or remaining purely attentional?",
    "svolik": "1-2 sentences: Are voters constraining the leader? Partisan tolerance of norm violations assessment.",
    "levitskyZiblatt": "1-2 sentences: Status of mutual toleration and institutional forbearance. Which guardrails are holding, which are eroding?"
  },
  "summary": "2-3 paragraph analysis focused on THE NEWS and THE CONJUNCTURE. What is actually happening right now? What are the key events, conflicts, and developments this week? Then: what does this conjuncture (in Stuart Hall's sense — the specific historical moment where multiple forces and contradictions condense) mean for democratic stability? Write like an analyst briefing a reader on the situation, not like a methods section. Ground the analysis in concrete recent events. Do NOT discuss model methodology or divergence here — that belongs in modelDiagnoses. This summary should read like informed political analysis, not academic throat-clearing."
}`;

    // Different prompts for each mode
    const liveSearchPrompt = `TODAY'S DATE: ${currentDate}

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

${scoringRubric}

IMPORTANT: After completing your research, you MUST respond with ONLY the JSON below. No introductory text, no explanations, no markdown - just the raw JSON object starting with { and ending with }:
${jsonFormat}`;

    const quickAnalysisPrompt = `You are a comparative politics researcher specializing in democratic backsliding and authoritarian consolidation. Based on your knowledge (up to early 2025), analyze ${country}'s vulnerability to authoritarian consolidation.

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

${scoringRubric}

Respond with ONLY this JSON (no other text):
${jsonFormat}`;

    const prompt = searchMode === 'live' ? liveSearchPrompt : quickAnalysisPrompt;

    // Build request body - only include tools for live search mode
    const requestBody: {
      model: string;
      max_tokens: number;
      temperature: number;
      messages: { role: string; content: string }[];
      tools?: { type: string; name: string }[];
    } = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: searchMode === 'live' ? 16000 : 4096,
      temperature: 0, // Use 0 for consistent, deterministic results
      messages: [{
        role: 'user',
        content: prompt
      }]
    };

    // Only add web search tool for live mode
    if (searchMode === 'live') {
      requestBody.tools = [{
        type: "web_search_20250305",
        name: "web_search"
      }];
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `Anthropic API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data: ApiResponse = await response.json();
    console.log('API response stop_reason:', data.stop_reason);
    console.log('API response content types:', data.content.map(c => c.type));

    // Extract all text content from response
    const textBlocks = data.content.filter((item) => item.type === 'text' && item.text);

    if (textBlocks.length === 0) {
      console.error('No text blocks found. Full response:', JSON.stringify(data, null, 2));
      return NextResponse.json({
        error: 'No text content in response',
        details: `Stop reason: ${data.stop_reason}, Content types: ${data.content.map(c => c.type).join(', ')}`
      }, { status: 500 });
    }

    let text = textBlocks.map((item) => item.text).join('\n');
    console.log('Extracted text length:', text.length);

    // Clean up markdown code blocks
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    // Try to find JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found. Text preview:', text.substring(0, 500));
      return NextResponse.json({
        error: 'No JSON found in response',
        details: text.substring(0, 1000)
      }, { status: 500 });
    }

    try {
      const results = JSON.parse(jsonMatch[0]);
      // Clean up any XML/HTML artifacts in the response
      const cleanedResults = cleanObjectStrings(results);
      // Store in cache
      cache.set(cacheKey, { data: cleanedResults as Record<string, unknown>, timestamp: Date.now() });
      console.log(`Cached result for ${cacheKey}`);
      return NextResponse.json(cleanedResults);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({
        error: 'Failed to parse JSON',
        details: jsonMatch[0].substring(0, 500)
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Research error:', error);
    return NextResponse.json(
      { error: 'Research failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
