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

const publicOpinionSchema = {
  type: "object",
  required: ["score", "evidence", "trend", "sources", "demographics"],
  properties: {
    score: { type: "number" },
    evidence: { type: "string", description: "overall approval % and trend" },
    trend: trendEnum,
    sources: { type: "string", description: "polling sources" },
    demographics: {
      type: "object",
      required: ["marxianClass", "weberianStatus", "byRace", "eliteVsMass", "keyFindings", "theoreticalImplications"],
      properties: {
        marxianClass: {
          type: "object",
          required: ["capitalOwners", "workingClass", "classGap", "capitalLaborDivergence"],
          properties: {
            capitalOwners: {
              type: "object",
              required: ["approval", "note"],
              properties: {
                approval: { type: "number" },
                note: { type: "string", description: "business owners, investors, landlords" },
              },
            },
            workingClass: {
              type: "object",
              required: ["approval", "note"],
              properties: {
                approval: { type: "number" },
                note: { type: "string", description: "wage workers, employees" },
              },
            },
            classGap: { type: "number" },
            capitalLaborDivergence: { type: "string", description: "describe tension or alignment" },
          },
        },
        weberianStatus: {
          type: "object",
          required: ["nonCollege", "college", "credentialGap", "note"],
          properties: {
            nonCollege: { type: "number" },
            college: { type: "number" },
            credentialGap: { type: "number" },
            note: { type: "string", description: "education polarization - not Marxian class" },
          },
        },
        byRace: {
          type: "object",
          required: ["white", "black", "hispanic", "raceGap"],
          properties: {
            white: { type: "number" },
            black: { type: "number" },
            hispanic: { type: "number" },
            raceGap: { type: "number" },
          },
        },
        eliteVsMass: {
          type: "object",
          required: ["eliteApproval", "massApproval", "divergence", "note"],
          properties: {
            eliteApproval: { type: "number" },
            massApproval: { type: "number" },
            divergence: { type: "number" },
            note: { type: "string", description: "elite = capital owners + high credentialed" },
          },
        },
        keyFindings: { type: "array", items: { type: "string" } },
        theoreticalImplications: {
          type: "object",
          required: ["classAnalysis", "eliteMassAnalysis", "culturalControl"],
          properties: {
            classAnalysis: { type: "string", description: "what the business owners vs workers split means for regime coalition" },
            eliteMassAnalysis: { type: "string", description: "what the gap between elites and ordinary people means" },
            culturalControl: { type: "string", description: "can the regime win genuine buy-in across society, or is it stuck with its base while everyone else resists?" },
          },
        },
      },
    },
  },
};

export const PUBLIC_OPINION_ANALYSIS_TOOL = {
  name: "polybius_public_opinion_analysis",
  description: "Submit the completed public opinion analysis with structured approval ratings, demographic breakdowns, and corporate compliance scores.",
  input_schema: {
    type: "object",
    required: ["publicOpinion", "corporateCompliance"],
    properties: {
      publicOpinion: publicOpinionSchema,
      corporateCompliance: factorSchema,
    },
  },
};
