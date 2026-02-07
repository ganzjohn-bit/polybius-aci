/**
 * Stub response for /api/research when LIVE_REQUESTS is disabled.
 * Shape matches the JSON format Claude is prompted to return.
 * Scores are low (optimistic for democracy) to keep the fixture non-alarming.
 */
export const researchFixture = {
  judicial: {
    score: 22,
    evidence:
      "Courts operating with full independence. Recent rulings demonstrate robust judicial review of executive action. No significant conflicts between branches on appointment processes. Bar associations report normal institutional functioning.",
    trend: "stable",
    sources: "Reuters, SCOTUSblog",
  },
  federalism: {
    score: 18,
    evidence:
      "Federal-state relations operating within normal parameters. States exercising standard policy autonomy on education, health, and environmental regulation. Fiscal federalism intact — intergovernmental transfers proceeding on schedule.",
    trend: "stable",
    sources: "Governing.com, state budget offices",
  },
  political: {
    score: 20,
    evidence:
      "Competitive two-party system functioning normally. Generic ballot roughly even. Both parties contesting seats across regions with standard midterm campaign activity.",
    trend: "stable",
    sources: "FiveThirtyEight, Cook Political Report",
    genericBallot: {
      margin: 1,
      leader: "D",
      pollDate: "2025-01-15",
      source: "FiveThirtyEight aggregate",
    },
  },
  media: {
    score: 25,
    evidence:
      "Press maintains full access to government briefings. Editorial independence intact across major outlets. Local news facing economic headwinds but no political interference. Social media platforms operating under standard content policies.",
    trend: "stable",
    sources: "Columbia Journalism Review, Nieman Lab",
  },
  civil: {
    score: 20,
    evidence:
      "Civil liberties broadly protected. Protest rights exercised without significant interference. ACLU reports routine caseload. No notable expansion of surveillance authorities.",
    trend: "stable",
    sources: "ACLU, EFF, Freedom House",
  },
  publicOpinion: {
    score: 30,
    evidence: "Overall approval at 46%, within normal range for this point in a term.",
    trend: "stable",
    sources: "Gallup, Reuters/Ipsos, Pew Research",
    demographics: {
      marxianClass: {
        capitalOwners: { approval: 52, note: "business owners, investors, landlords" },
        workingClass: { approval: 41, note: "wage workers, employees" },
        classGap: 11,
        capitalLaborDivergence:
          "Moderate divergence within historical norms — capital owners slightly more favorable toward deregulation agenda",
      },
      weberianStatus: {
        nonCollege: 48,
        college: 40,
        credentialGap: 8,
        note: "Education gap present but narrower than recent cycles",
      },
      byRace: {
        white: 49,
        black: 22,
        hispanic: 38,
        raceGap: 27,
      },
      eliteVsMass: {
        eliteApproval: 48,
        massApproval: 44,
        divergence: 4,
        note: "elite = capital owners + high credentialed",
      },
      keyFindings: [
        "Approval broadly stable across demographic groups",
        "Economic satisfaction the primary driver of opinion shifts",
      ],
      theoreticalImplications: {
        marxian:
          "Capital-labor gap present but within historical range — no acute class crisis",
        redistributive:
          "Elite-mass gap narrow, suggesting broad-based legitimacy rather than narrow oligarchic support",
        gramscian:
          "Contested hegemony within normal democratic bounds. No Caesarist pattern — standard partisan competition for consent.",
      },
    },
  },
  mobilizationalBalance: {
    score: 25,
    evidence:
      "Union density 10.0%. Healthy ecosystem of civic organizations on all sides. Digital platforms contested but no single faction dominant. Information landscape pluralistic.",
    trend: "stable",
    sources: "BLS, organizational reports",
  },
  stateCapacity: {
    score: 22,
    evidence:
      "Federal agencies operating within statutory mandates. Civil service protections intact. Military leadership maintaining institutional norms. Intelligence community functioning with standard oversight.",
    trend: "stable",
    sources: "Government Executive, Federal News Network",
  },
  corporateCompliance: {
    score: 20,
    evidence:
      "Corporate sector engaging in normal lobbying and political activity. No significant pressure campaigns for political conformity. Business community divided along standard partisan lines on regulation and tax policy.",
    trend: "stable",
    sources: "WSJ, Bloomberg",
  },
  electionInterference: {
    score: 15,
    evidence:
      "Election infrastructure decentralized and secure. Bipartisan election administration in most jurisdictions. Standard voter-access debates ongoing in state legislatures. No credible threats to vote-count integrity.",
    trend: "stable",
    sources: "Brennan Center, EAC, state election officials",
  },
  mediaLandscape: {
    overallSentiment: "mixed",
    eliteOutlets: {
      sentiment: "mixed",
      keyNarratives: [
        "Standard policy debate over economic direction",
        "Institutional processes functioning normally",
      ],
      notableOpEds: [
        "WSJ Editorial Board: supply-side vs demand-side debate on growth",
        "The Economist: US institutions resilient amid partisan tension",
      ],
    },
    mainstreamOutlets: {
      sentiment: "neutral",
      keyNarratives: [
        "Cost of living the top voter concern",
        "Midterm positioning underway in both parties",
      ],
    },
    populistOutlets: {
      regimeAligned: {
        sentiment: "loyal",
        narratives: ["Government delivering on campaign promises", "Economic optimism"],
      },
      opposition: {
        sentiment: "critical",
        narratives: ["Policy alternatives", "Accountability through elections"],
      },
    },
    substackSphere: {
      dominantVoices: [
        "Heather Cox Richardson: historical context for current policy debates",
        "Matt Yglesias: policy analysis on housing and immigration",
      ],
      regimeVsOpposition: "balanced",
      keyTakes: [
        "Institutions holding under normal partisan stress",
        "Policy debate more substantive than recent cycles",
      ],
    },
    podcastSphere: {
      majorDiscussions: [
        "Pod Save America: midterm strategy and messaging",
        "The Daily: policy impacts on swing districts",
      ],
      regimeVsOpposition: "balanced",
    },
    nixonToChinaMoments: [
      "Bipartisan infrastructure support from both editorial boards",
    ],
    cultureIndustryCapture: {
      authoritarianDiscourseLevel: "subcultural",
      evidence: [
        "Fringe rhetoric remains confined to marginal platforms",
      ],
      dehumanizingLanguage: false,
      scapegoatingPresent: false,
    },
  },
  modelDiagnoses: {
    gramscian:
      "Standard contested hegemony — both parties competing for consent through normal political channels. No Caesarist dynamics. Hegemonic competition healthy and within democratic bounds.",
    classical:
      "Normal democratic functioning in Aristotelian terms. Polybius cycle stable in democratic phase. Civic virtue strained by polarization but institutional norms broadly respected.",
    bermanRiley:
      "No mass movement with organizational capture capacity. Party apparatus functioning through standard institutional channels. Digital mobilization energetic but diffuse on both sides.",
    svolik:
      "Voters showing standard partisan loyalty but within bounds that preserve democratic accountability. No significant tolerance for norm violations beyond normal partisan framing.",
    levitskyZiblatt:
      "Mutual toleration strained but functional. Institutional forbearance holding — norms around judicial independence, congressional oversight, and press access intact. Guardrails operational.",
  },
  summary:
    "The current period reflects standard democratic politics under conditions of elevated partisan polarization. Courts are functioning independently, federal-state relations are normal, and elections remain secure and competitive. The primary tensions are policy-driven — debates over economic direction, regulation, and immigration — rather than structural threats to democratic institutions.\n\nPublic opinion is divided along familiar partisan lines, with approval ratings in the normal range for this point in a presidential term. The capital-labor gap exists but is not acute, and elite-mass divergence is narrow.\n\nHistorical base rates for democratic resilience in established democracies are strongly favorable. The most likely trajectory is continued partisan competition through normal electoral channels, with midterm elections serving as the standard accountability mechanism.",
};
