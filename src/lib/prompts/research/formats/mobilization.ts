export const MOBILIZATION_FORMAT = `
IMPORTANT: After completing your research, you MUST respond with ONLY the JSON below. No introductory text, no explanations, no markdown - just the raw JSON object starting with { and ending with }:
  TREND VALUES - use ONLY these three values for all "trend" fields:
  "improving" = score is going DOWN (situation getting BETTER for democracy, WORSE for authoritarian consolidation)
  "deteriorating" = score is going UP (situation getting WORSE for democracy, BETTER for authoritarian consolidation)
  "stable" = score is roughly unchanged

  DIRECTION IS ALWAYS FROM DEMOCRACY'S PERSPECTIVE. Examples:
  - Opposition mobilization growing → mobilizationalBalance trend = "improving"
  - DHS deploying more agents domestically → stateCapacity trend = "deteriorating"

  DO NOT use "growing", "strengthening", "worsening", "weakening", or any other term. ONLY "improving", "deteriorating", or "stable".

{
  "mobilizationalBalance": {"score": 0, "evidence": "Union density X.X%. Key opposition orgs and recent mobilizations. Key regime orgs. Digital ecosystem balance (regime vs opposition platforms). Media environment: contested/regime-leaning/regime-dominated.", "trend": "stable", "sources": "sources"},
  "stateCapacity": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"}
}`;
