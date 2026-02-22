const trendEnum = { type: "string", enum: ["improving", "deteriorating", "stable"] };

const factorSchema = {
  type: "object",
  required: ["score", "evidence", "trend", "sources"],
  properties: {
    score: { type: "number" },
    evidence: { type: "string" },
    trend: trendEnum,
    sources: { type: "string" },
  },
};

const mobilizationalBalanceSchema = {
  type: "object",
  required: ["score", "evidence", "trend", "sources"],
  properties: {
    score: { type: "number" },
    evidence: { type: "string", description: "Union density X.X%. Key opposition orgs and recent mobilizations. Key regime orgs. Digital ecosystem balance (regime vs opposition platforms). Media environment: contested/regime-leaning/regime-dominated." },
    trend: trendEnum,
    sources: { type: "string" },
  },
};

export const MOBILIZATION_ANALYSIS_TOOL = {
  name: "polybius_mobilization_analysis",
  description: "Submit the completed mobilization analysis with structured scores for mobilizational balance and state capacity.",
  input_schema: {
    type: "object",
    required: ["mobilizationalBalance", "stateCapacity"],
    properties: {
      mobilizationalBalance: mobilizationalBalanceSchema,
      stateCapacity: factorSchema,
    },
  },
};
