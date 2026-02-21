export const MEDIA_FORMAT = `
IMPORTANT: After completing your research, you MUST respond with ONLY the JSON below. No introductory text, no explanations, no markdown - just the raw JSON object starting with { and ending with }:
  TREND VALUES - use ONLY these three values for all "trend" fields:
  "improving" = score is going DOWN (situation getting BETTER for democracy, WORSE for authoritarian consolidation)
  "deteriorating" = score is going UP (situation getting WORSE for democracy, BETTER for authoritarian consolidation)
  "stable" = score is roughly unchanged

  DIRECTION IS ALWAYS FROM DEMOCRACY'S PERSPECTIVE. Examples:
  - Media outlets being shut out of briefings → media trend = "deteriorating"

  DO NOT use "growing", "strengthening", "worsening", "weakening", or any other term. ONLY "improving", "deteriorating", or "stable".

{
  "media": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
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
  }
}`;
