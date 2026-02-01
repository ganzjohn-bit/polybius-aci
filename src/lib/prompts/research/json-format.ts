
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
        "marxian": "what capital vs labor split means",
        "redistributive": "what elite-mass gap means",
        "gramscian": "hegemony status: [full contestation/partial hegemony/near-hegemony]. Caesarism assessment: [is this Caesarist? high risk but low durability? or genuine hegemonic consolidation?]"
      }
    }
  },
  "mobilizationalBalance": {"score": 0, "evidence": "Union density X.X%. Key opposition orgs and recent mobilizations. Key regime orgs. Digital ecosystem balance (regime vs opposition platforms). Information hegemony: contested/partial/dominant.", "trend": "stable", "sources": "sources"},
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
