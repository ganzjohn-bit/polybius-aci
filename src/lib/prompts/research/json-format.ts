
export const JSON_FORMAT = `
IMPORTANT: After completing your research, you MUST respond with ONLY the JSON below. No introductory text, no explanations, no markdown - just the raw JSON object starting with { and ending with }:
  TREND VALUES - use ONLY these three values for all "trend" fields:
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
        "classAnalysis": "what the business owners vs workers split means for regime coalition",
        "eliteMassAnalysis": "what the gap between elites and ordinary people means",
        "culturalControl": "can the regime win genuine buy-in across society, or is it stuck with its base while everyone else resists?"
      }
    }
  },
  "mobilizationalBalance": {"score": 0, "evidence": "Union density X.X%. Key opposition orgs and recent mobilizations. Key regime orgs. Digital ecosystem balance (regime vs opposition platforms). Media environment: contested/regime-leaning/regime-dominated.", "trend": "stable", "sources": "sources"},
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
    "nixonToChinaMoments": ["unexpected editorial alignments (regime outlet criticizing regime, opposition praising); SOFTLINER DEFECTIONS (GOP officials, donors, or business allies breaking with regime — key U-Turn signal)"],
    "cultureIndustryCapture": {
      "authoritarianDiscourseLevel": "subcultural/mainstreaming/normalized",
      "evidence": ["where authoritarian rhetoric appears"],
      "dehumanizingLanguage": false,
      "scapegoatingPresent": false
    }
  },
  "modelDiagnoses": {
    "gramscian": "1-2 sentences, NO JARGON (no 'hegemony', 'Caesarism', etc.): Can the regime win genuine buy-in across society, or is it stuck relying on one man's personality and constant drama? Dangerous but fragile, or genuinely taking root?",
    "classical": "1-2 sentences in plain language: Is this a would-be strongman who rules through crowd appeal while undermining law? Is civic culture strong enough to resist?",
    "bermanRiley": "1-2 sentences in plain language: Does the movement have real organizational muscle (local takeovers, precinct capture) or is it mostly online audiences that show up for rallies but don't do the boring work?",
    "svolik": "1-2 sentences in plain language: Are the leader's own voters willing to punish norm violations, or do they excuse everything as long as their side wins?",
    "levitskyZiblatt": "1-2 sentences in plain language: Which institutional guardrails are holding (courts, states, opposition party)? Which are buckling?"
  },
  "summary": "2-3 paragraph analysis in PLAIN LANGUAGE for a general reader. STRICT PROHIBITION: Do NOT use ANY of these terms or their variants: conjuncture, Caesarism, Caesarist, hegemony, hegemonic, anacyclosis, praxis, dialectic, subaltern, or any other academic jargon. If you catch yourself writing 'hegemonic consent' write 'genuine buy-in across society' instead. If you want to say 'Caesarist dynamic' say 'the regime runs on one man's personality and constant drama' instead. If you want to say 'conjuncture' just say 'this moment' or 'the current situation.' Write like a smart magazine journalist (think New Yorker or Atlantic), not a graduate seminar. Start with THE NEWS: What actually happened this week? Key events, conflicts, developments. Note if regime radicals and business/establishment types are clashing. Then assess: Is the regime overreaching? Is opposition mobilizing? Does this look like consolidation or stumbling? Ground everything in concrete recent events."
}`;
