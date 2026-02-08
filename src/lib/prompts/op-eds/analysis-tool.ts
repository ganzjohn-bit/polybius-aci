const matrixCellSchema = {
  type: "object",
  required: ["count", "negative", "neutral", "positive"],
  properties: {
    count: { type: "integer" },
    negative: { type: "integer" },
    neutral: { type: "integer" },
    positive: { type: "integer" }
  }
};

const matrixRowSchema = {
  type: "object",
  required: ["regime", "neutral", "opposition"],
  properties: {
    regime: matrixCellSchema,
    neutral: matrixCellSchema,
    opposition: matrixCellSchema
  }
};

const articleSchema = {
  type: "object",
  required: ["title", "description", "source", "sentiment", "outletClass", "outletAffinity", "isNixonToChina"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    source: {
      type: "object",
      required: ["name"],
      properties: { name: { type: "string" } }
    },
    sentiment: { type: "string", enum: ["negative", "neutral", "positive"] },
    outletClass: { type: "string", enum: ["elite", "mainstream", "populist", "unknown"] },
    outletAffinity: { type: "string", enum: ["regime", "neutral", "opposition", "unknown"] },
    signalWeight: { type: "number" },
    isNixonToChina: { type: "boolean" },
    nixonType: { type: "string" }
  }
};

const derivedSignalSchema = {
  type: "object",
  required: ["score", "evidence"],
  properties: {
    score: { type: "number" },
    evidence: { type: "array", items: { type: "string" } }
  }
};

export const OPED_ANALYSIS_TOOL = {
  name: "polybius_oped_analysis",
  description: "Submit the completed media landscape analysis with structured results for all outlets analyzed.",
  input_schema: {
    type: "object",
    required: ["country", "totalArticles", "articles", "derivedSignals", "nixonMoments", "interpretation"],
    properties: {
      country: { type: "string" },
      totalArticles: { type: "integer" },
      articles: { type: "array", items: articleSchema },
      matrix: {
        type: "object",
        required: ["elite", "mainstream", "populist"],
        properties: {
          elite: matrixRowSchema,
          mainstream: matrixRowSchema,
          populist: matrixRowSchema
        }
      },
      derivedSignals: {
        type: "object",
        required: ["eliteDefection", "hegemnonicCrisis", "classConflict", "eliteCoordination", "baseErosion"],
        properties: {
          eliteDefection: derivedSignalSchema,
          hegemnonicCrisis: derivedSignalSchema,
          classConflict: derivedSignalSchema,
          eliteCoordination: derivedSignalSchema,
          baseErosion: derivedSignalSchema
        }
      },
      nixonMoments: { type: "array", items: articleSchema },
      interpretation: { type: "array", items: { type: "string" } }
    }
  }
};
