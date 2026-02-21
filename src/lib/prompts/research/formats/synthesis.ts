export const SYNTHESIS_FORMAT = `
IMPORTANT: You MUST respond with ONLY the JSON below. No introductory text, no explanations, no markdown - just the raw JSON object starting with { and ending with }:

{
  "modelDiagnoses": {
    "gramscian": "1-2 sentences, NO JARGON (no 'hegemony', 'Caesarism', etc.): Can the regime win genuine buy-in across society, or is it stuck relying on one man's personality and constant drama? Dangerous but fragile, or genuinely taking root?",
    "classical": "1-2 sentences in plain language: Is this a would-be strongman who rules through crowd appeal while undermining law? Is civic culture strong enough to resist?",
    "bermanRiley": "1-2 sentences in plain language: Does the movement have real organizational muscle (local takeovers, precinct capture) or is it mostly online audiences that show up for rallies but don't do the boring work?",
    "svolik": "1-2 sentences in plain language: Are the leader's own voters willing to punish norm violations, or do they excuse everything as long as their side wins?",
    "levitskyZiblatt": "1-2 sentences in plain language: Which institutional guardrails are holding (courts, states, opposition party)? Which are buckling?"
  },
  "summary": "2-3 paragraph analysis in PLAIN LANGUAGE for a general reader. STRICT PROHIBITIONS: (1) NO JARGON — do not use conjuncture, Caesarism, hegemony, hegemonic, anacyclosis, or any academic vocabulary. Say 'this moment' not 'conjuncture.' Say 'genuine buy-in' not 'hegemonic consent.' Say 'runs on personality and drama' not 'Caesarist dynamic.' (2) NO FABRICATION — only report events you actually found in search results. Do not invent news. Do not combine separate events into false syntheses (e.g., if Gallup stopped polling and the Supreme Court ruled on something, these are SEPARATE events — do not mash them together). (3) NO INFLAMMATORY SPECULATION — do not claim things like 'agents could kill protesters' unless this has actually happened. Write like a New Yorker or Atlantic journalist: factual, grounded, citing specific recent events. Start with THE NEWS, then assess whether the regime is consolidating or stumbling."
}`;
