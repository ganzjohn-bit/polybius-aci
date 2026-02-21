export const INSTITUTIONAL_FORMAT = `
IMPORTANT: After completing your research, you MUST respond with ONLY the JSON below. No introductory text, no explanations, no markdown - just the raw JSON object starting with { and ending with }:
  TREND VALUES - use ONLY these three values for all "trend" fields:
  "improving" = score is going DOWN (situation getting BETTER for democracy, WORSE for authoritarian consolidation)
  "deteriorating" = score is going UP (situation getting WORSE for democracy, BETTER for authoritarian consolidation)
  "stable" = score is roughly unchanged

  DIRECTION IS ALWAYS FROM DEMOCRACY'S PERSPECTIVE. Examples:
  - Courts ruling against executive overreach → judicial trend = "improving"
  - Opposition mobilization growing → mobilizationalBalance trend = "improving"

  DO NOT use "growing", "strengthening", "worsening", "weakening", or any other term. ONLY "improving", "deteriorating", or "stable".

{
  "judicial": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "federalism": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "political": {"score": 0, "evidence": "specific evidence including generic ballot margin (e.g., D+4)", "trend": "stable", "sources": "sources", "genericBallot": {"margin": 0, "leader": "D or R", "pollDate": "date", "source": "pollster"}},
  "civil": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"},
  "electionInterference": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"}
}`;
