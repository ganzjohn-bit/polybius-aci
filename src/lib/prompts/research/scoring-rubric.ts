export const SCORING_RUBRIC = `
SCORING (0-100, higher = more authoritarian):

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
  CRITICAL: Assess ACTUAL INSTITUTIONAL FUNCTION, not news about threats or pressure.
  Key question: Can independent outlets still publish critical coverage of the regime daily without being
  shut down, bought out, or having editors jailed?
  - If yes (even under pressure, access denial, threats) → score should be in 20-50 range
  - If outlets are being systematically eliminated, bought by regime allies, editors jailed → 60+
  Bad news ABOUT media ≠ media capture. Threats ≠ execution. Pressure ≠ elimination.
  A score of 60+ means major independent outlets have actually been shut down or captured — not that
  they're facing pressure while still publishing critical coverage.
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
  the evidence — not just a restatement of the factor scores with different emphasis.

REGIME INTERNAL DYNAMICS — HARDLINERS VS SOFTLINERS (O'Donnell-Schmitter / Paxton):
Authoritarian movements are not monoliths. Assess the internal tension between:
- HARDLINERS/RADICALIZERS: Push revolution further, destroy institutions, punish enemies, permanent mobilization.
  (US examples: Bannon, Miller, Musk/DOGE, MAGA base demanding escalation, "enemy within" rhetoric)
- SOFTLINERS/NORMALIZERS: Stabilize, cut deals with traditional elites, achieve durable governance.
  (US examples: Wall Street donors, traditional GOP, business interests seeking policy wins without chaos)

KEY QUESTIONS:
- Is the regime currently appeasing hardliners or restraining them?
- Are there visible conflicts between factions (hardliner frustration with "step backs," softliner alarm at escalation)?
- Which faction is ascendant THIS WEEK based on actual policy moves?

THIS IS THE NEWS: The hardliner/softliner battle IS the story of authoritarian consolidation attempts. Report on it.
Paxton's insight: Fascist regimes oscillate between radicalization and normalization — they can never fully satisfy
either faction because each threatens the coalition. Watch for this oscillation pattern.

USE THIS IN ANALYSIS: The hardliner/softliner battle should inform the summary (this IS the news), the Gramscian
diagnosis (Caesarism can't resolve this), Berman-Riley (is mass movement being tamed or radicalized?), and
Svolik (are softliner defections a constraint signal?). Do not add a separate field — weave into existing analysis.

U-TURN FRAMEWORK — HISTORICAL CONTEXT FOR REVERSAL (Nord, Lindberg et al., V-Dem 2024):
Autocratization is NOT a one-way street. V-Dem research on 102 episodes since 1900 found:
- 52% of ALL autocratization episodes are reversed ("U-Turns")
- 73% in the last 30 years — reversibility has INCREASED in the modern era
- 90% of U-Turns restore or IMPROVE prior democracy levels
- Average U-Turn takes ~8 years from onset to restoration

THREE TYPES OF U-TURN (assess which is most plausible):
1. AUTHORITARIAN MANIPULATION: The regime MISCALCULATES and triggers its own downfall. Democratization by mistake.
   (Examples: Costa Rica 1948 — incumbent invalidates election, triggers civil war and rapid democratization;
   Pinochet's 1988 plebiscite backfire; overreach that unites opposition)
   US signals: DOGE chaos alienating business allies, deportation tactics generating backlash, legal exposure
   from norm violations, Musk's unpopularity becoming liability, overreach energizing opposition turnout.

2. DEMOCRATIC REACTION: Pro-democracy forces successfully mobilize, oust the autocratizer, restore democracy.
   Bottom-up citizen mobilization defeats the regime through elections, protests, or institutional resistance.
   (Examples: Brazil 2022 — Lula defeats Bolsonaro after sustained civil society mobilization; Zambia 2021;
   South Korea 1987 — mass protests force democratic transition)
   US signals: Strength of opposition mobilization infrastructure (unions, churches, civil society), court
   resistance, state-level opposition, electoral competitiveness, protest capacity.

3. INTERNATIONAL INTERVENTION: External actors drive the reversal.
   (Examples: post-WWII democratizations, some Cold War transitions)
   US signals: Largely inapplicable given US global position, though international economic pressure, allied
   government criticism, or institutional responses (NATO, trade partners) could matter at margins.

CRITICAL TIMING FACTOR: U-Turns that occur within ONE ELECTORAL CYCLE (4-6 years) of onset are far more common
than later reversals. Early resistance matters enormously. The window for "bounce-back resilience" is relatively
short — after that, institutional capture becomes harder to reverse.

SOUTH KOREA PRECEDENT: One of the few cases where autocratization began in a LIBERAL DEMOCRACY but was reversed
before full breakdown. This is the most relevant historical comparison for the US.

USE THIS IN ANALYSIS:
- The summary should contextualize current events against historical base rates. 52-73% reversal is important
  context — doom is not inevitable, but neither is reversal automatic.
- When assessing "Signs of Potential Reversal" and Nixon-to-China moments, consider which U-Turn TYPE is most
  plausible given current dynamics. Regime miscalculation? Democratic mobilization? Both?
- The Svolik diagnosis should note whether we're still within the critical 4-6 year window.
- The hardliner/softliner assessment feeds directly into U-Turn probability: hardliner overreach increases
  "authoritarian manipulation" (miscalculation) probability; softliner defections signal "democratic reaction"
  potential.
- Do NOT add a separate field or score. Weave this historical context into the summary and modelDiagnoses.`;
