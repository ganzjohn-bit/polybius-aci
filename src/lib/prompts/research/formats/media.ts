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

const mediaLandscapeSchema = {
  type: "object",
  required: ["overallSentiment", "eliteOutlets", "mainstreamOutlets", "populistOutlets", "substackSphere", "podcastSphere", "nixonToChinaMoments", "cultureIndustryCapture"],
  properties: {
    overallSentiment: { type: "string", enum: ["crisis", "negative", "mixed", "neutral", "positive"] },
    eliteOutlets: {
      type: "object",
      required: ["sentiment", "keyNarratives", "notableOpEds"],
      properties: {
        sentiment: { type: "string", enum: ["critical", "mixed", "supportive"] },
        keyNarratives: { type: "array", items: { type: "string" } },
        notableOpEds: { type: "array", items: { type: "string" } },
      },
    },
    mainstreamOutlets: {
      type: "object",
      required: ["sentiment", "keyNarratives"],
      properties: {
        sentiment: { type: "string", enum: ["critical", "mixed", "supportive"] },
        keyNarratives: { type: "array", items: { type: "string" } },
      },
    },
    populistOutlets: {
      type: "object",
      required: ["regimeAligned", "opposition"],
      properties: {
        regimeAligned: {
          type: "object",
          required: ["sentiment", "narratives"],
          properties: {
            sentiment: { type: "string", enum: ["critical", "loyal"] },
            narratives: { type: "array", items: { type: "string" } },
          },
        },
        opposition: {
          type: "object",
          required: ["sentiment", "narratives"],
          properties: {
            sentiment: { type: "string", enum: ["critical", "hopeful"] },
            narratives: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
    substackSphere: {
      type: "object",
      required: ["dominantVoices", "regimeVsOpposition", "keyTakes"],
      properties: {
        dominantVoices: { type: "array", items: { type: "string" } },
        regimeVsOpposition: { type: "string", enum: ["regime-dominated", "balanced", "opposition-dominated"] },
        keyTakes: { type: "array", items: { type: "string" } },
      },
    },
    podcastSphere: {
      type: "object",
      required: ["majorDiscussions", "regimeVsOpposition"],
      properties: {
        majorDiscussions: { type: "array", items: { type: "string" } },
        regimeVsOpposition: { type: "string", enum: ["regime-dominated", "balanced", "opposition-dominated"] },
      },
    },
    nixonToChinaMoments: { type: "array", items: { type: "string" }, description: "unexpected editorial alignments; softliner defections" },
    cultureIndustryCapture: {
      type: "object",
      required: ["authoritarianDiscourseLevel", "evidence", "dehumanizingLanguage", "scapegoatingPresent"],
      properties: {
        authoritarianDiscourseLevel: { type: "string", enum: ["subcultural", "mainstreaming", "normalized"] },
        evidence: { type: "array", items: { type: "string" } },
        dehumanizingLanguage: { type: "boolean" },
        scapegoatingPresent: { type: "boolean" },
      },
    },
  },
};

export const MEDIA_ANALYSIS_TOOL = {
  name: "polybius_media_analysis",
  description: "Submit the completed media analysis with structured scores for press freedom and the full media landscape assessment.",
  input_schema: {
    type: "object",
    required: ["media", "mediaLandscape"],
    properties: {
      media: factorSchema,
      mediaLandscape: mediaLandscapeSchema,
    },
  },
};
