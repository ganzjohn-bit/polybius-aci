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
MOBILIZATIONAL_BALANCE (traditional civil society - per Berman, Riley, Skocpol's "dark side of social capital"):
  WEIGHT BY ORG TYPE: HIGH=unions (dues-paying, can strike), churches (activated congregations with turnout infrastructure), membership orgs with dues; MEDIUM=501c4 advocacy orgs, community orgs, worker centers; LOW=staff-driven 501c3s, policy think tanks (ideas not people). DISCOUNT centralized orgs dependent on charismatic leaders, "chapters" that are sign-ups not active locals.

  RELIGIOUS MOBILIZATION (assess carefully - don't assume evangelical=GOP advantage):
  - EVANGELICAL PROTESTANT: White evangelicals strongly GOP-aligned, but assess ACTUAL activation vs assumed. Many congregations are passive consumers, not mobilization infrastructure. Look for: voter guides distributed, pulpit politics, church-based canvassing, "values voter" turnout operations.
  - BLACK CHURCHES: Historically crucial Democratic infrastructure (AME, National Baptist Convention, COGIC, Black megachurches). "Souls to the Polls" programs, voter registration drives, community organizing tradition. Often MORE activated than white evangelical counterparts. HIGH weight for opposition.
  - MAINLINE PROTESTANT (Episcopal, PCUSA, UMC, ELCA, UCC, Disciples): Declining membership but institutional presence remains. Lean moderate-to-liberal. Sanctuary movement, climate advocacy, LGBTQ inclusion. MEDIUM weight for opposition but assess local activation.
  - CATHOLIC: SPLIT constituency - do not assign to one side. Conservative wing (Catholic Vote, some bishops, Knights of Columbus on social issues, EWTN audience) vs Progressive wing (Network/Nuns on the Bus, Catholic Worker, Catholic Charities on immigration/poverty, Jesuits, many religious orders). Hispanic Catholics lean Democratic. Assess which wing is more activated locally.
  - OTHER: Jewish congregations (lean Democratic, organized), Muslim communities (post-2016 more activated, lean Democratic), Hindu/Sikh (growing, mixed).

  REGIME-ALIGNED (US): white evangelical churches (when actually activated, not just assumed), local GOP committees, conservative 501c4s (AFP, Turning Point Action), militia/paramilitary (Oath Keepers, Proud Boys, 3%ers), conservative Catholic orgs, business associations (chambers of commerce).
  OPPOSITION (US): union locals (public sector especially - teachers, SEIU, AFSCME), Black churches and faith networks, civil rights chapters (NAACP, Urban League), worker centers, Indivisible chapters, Working Families Party, DSA chapters (note: 75,000+ members nationally; largest chapters: NYC-DSA 10,000+, Chicago DSA, LA DSA, Austin DSA, Philly DSA, Twin Cities DSA, Pittsburgh DSA - search for local chapter membership and elected officials like AOC, Jamaal Bowman, state legislators), state civic engagement tables (State Voices network), mainline Protestant social justice committees, progressive Catholic networks, coordinated campaign infrastructure.

  ALSO ASSESS: Coalition infrastructure (do coordination bodies exist?), historical activation (can they turn people out? recent precedents?), federated vs centralized structure. Don't double-count: ActBlue is fundraising infrastructure, not mobilization. Measure actual door-knocking, phone-banking, turnout capacity.
  SCORING: 0-20=opposition strong (dense unions, Black church infrastructure, functioning coalitions, demonstrated turnout); 21-40=opposition advantage (union presence, faith networks activated, progressive infrastructure intact); 41-60=roughly balanced (both sides have infrastructure, contested terrain); 61-80=regime advantage (white evangelical activation high, unions weak, militia presence, opposition fragmented); 81-100=regime dominates (opposition atomized, unions crushed, no counter-mobilization capacity).

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

STATE_CAPACITY: 0-20=fragmented, 21-40=gaps, 41-60=growing, 61-80=high capacity, 81-100=total coordination
CORPORATE: 0-20=resist, 21-40=neutral, 41-60=compliance, 61-80=active cooperation, 81-100=captured
ELECTIONS: 0-20=free/fair, 21-40=minor issues, 41-60=manipulation, 61-80=systematic fraud, 81-100=theatrical`;

    const jsonFormat = `{
  "judicial": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "federalism": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "political": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
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
        "gramscian": "hegemony status - consent or coercion"
      }
    }
  },
  "mobilizationalBalance": {"score": 0, "evidence": "REQUIRED FORMAT: Union density X.X% (trend). Opposition orgs: [named orgs]. Regime orgs: [named orgs]. Religious: Black churches [assessment], evangelical [assessment], Catholic [split assessment]. Recent mobilizations: [event, date, turnout]. Coalition infrastructure: [yes/no, named bodies].", "trend": "stable", "sources": "sources"},
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
      "dehumanizingLanguage": true/false,
      "scapegoatingPresent": true/false
    }
  },
  "summary": "2-3 paragraph analysis"
}`;

    // Different prompts for each mode
    const liveSearchPrompt = `TODAY'S DATE: ${currentDate}

You are a comparative politics researcher specializing in democratic backsliding and authoritarian consolidation. Conduct rigorous research on ${country} to assess its vulnerability to authoritarian consolidation.

MANDATORY: Use web search to gather current ${currentYear} data on:

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
- Electoral integrity and political competition
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
