export const PUBLIC_OPINION_FORMAT = `
IMPORTANT: After completing your research, you MUST respond with ONLY the JSON below. No introductory text, no explanations, no markdown - just the raw JSON object starting with { and ending with }:
  TREND VALUES - use ONLY these three values for all "trend" fields:
  "improving" = score is going DOWN (situation getting BETTER for democracy, WORSE for authoritarian consolidation)
  "deteriorating" = score is going UP (situation getting WORSE for democracy, BETTER for authoritarian consolidation)
  "stable" = score is roughly unchanged

  DIRECTION IS ALWAYS FROM DEMOCRACY'S PERSPECTIVE. Examples:
  - Regime approval dropping from 45% to 39% → publicOpinion trend = "improving" (harder to consolidate)

  DO NOT use "growing", "strengthening", "worsening", "weakening", or any other term. ONLY "improving", "deteriorating", or "stable".

{
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
  "corporateCompliance": {"score": 0, "evidence": "specific evidence", "trend": "stable", "sources": "sources"}
}`;
