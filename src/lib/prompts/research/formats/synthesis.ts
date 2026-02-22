export const SYNTHESIS_ANALYSIS_TOOL = {
  name: "polybius_synthesis_analysis",
  description: "Submit the completed synthesis with model-specific diagnoses and a plain-language summary.",
  input_schema: {
    type: "object",
    required: ["modelDiagnoses", "summary"],
    properties: {
      modelDiagnoses: {
        type: "object",
        required: ["gramscian", "classical", "bermanRiley", "svolik", "levitskyZiblatt"],
        properties: {
          gramscian: { type: "string", description: "1-2 sentences, NO JARGON: Can the regime win genuine buy-in across society, or is it stuck relying on one man's personality and constant drama?" },
          classical: { type: "string", description: "1-2 sentences in plain language: Is this a would-be strongman who rules through crowd appeal while undermining law?" },
          bermanRiley: { type: "string", description: "1-2 sentences in plain language: Does the movement have real organizational muscle or is it mostly online audiences?" },
          svolik: { type: "string", description: "1-2 sentences in plain language: Are the leader's own voters willing to punish norm violations?" },
          levitskyZiblatt: { type: "string", description: "1-2 sentences in plain language: Which institutional guardrails are holding? Which are buckling?" },
        },
      },
      summary: { type: "string", description: "2-3 paragraph analysis in PLAIN LANGUAGE. NO JARGON, NO FABRICATION, NO INFLAMMATORY SPECULATION. Write like a New Yorker or Atlantic journalist: factual, grounded, citing specific recent events." },
    },
  },
};
