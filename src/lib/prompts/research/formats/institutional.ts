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

const politicalSchema = {
  type: "object",
  required: ["score", "evidence", "trend", "sources", "genericBallot"],
  properties: {
    score: { type: "number" },
    evidence: { type: "string", description: "specific evidence including generic ballot margin (e.g., D+4)" },
    trend: trendEnum,
    sources: { type: "string" },
    genericBallot: {
      type: "object",
      required: ["margin", "leader", "pollDate", "source"],
      properties: {
        margin: { type: "number" },
        leader: { type: "string", description: "D or R" },
        pollDate: { type: "string" },
        source: { type: "string", description: "pollster name" },
      },
    },
  },
};

export const INSTITUTIONAL_ANALYSIS_TOOL = {
  name: "polybius_institutional_analysis",
  description: "Submit the completed institutional analysis with structured scores, evidence, and trends for each institutional factor.",
  input_schema: {
    type: "object",
    required: ["judicial", "federalism", "political", "civil", "electionInterference"],
    properties: {
      judicial: factorSchema,
      federalism: factorSchema,
      political: politicalSchema,
      civil: factorSchema,
      electionInterference: factorSchema,
    },
  },
};
