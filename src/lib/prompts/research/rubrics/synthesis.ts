export const SYNTHESIS_RUBRIC = `
MODEL-SPECIFIC INTERPRETIVE DIAGNOSES:
  The factor scores above are shared across all models — they measure the same institutional realities. But different
  theoretical models INTERPRET those realities differently. In the "summary" field and the "modelDiagnoses" field,
  you must provide the distinctive diagnosis that each model's theory would produce from the SAME evidence:

  GRAMSCIAN DIAGNOSIS: Look at the information hegemony assessment. If hegemony is absent or heavily contested,
  the Gramscian diagnosis is NOT simply "low threat." It is CAESARISM — a specific Gramscian concept from the
  Prison Notebooks. Caesarism emerges when neither progressive nor reactionary forces can achieve hegemony, and
  a "strong man" fills the void through personal authority. The diagnosis should identify:
  - Is this a Caesarist situation? (hegemonic deadlock → personal rule → spectacle substituting for consent)
  - The RISK/DURABILITY PARADOX: Caesarism means high authoritarian risk but low consolidation potential.
    The regime can do real damage but probably cannot institutionalize. Flag both sides honestly.
  - Is there evidence of transition FROM Caesarism TO hegemony? (This would be the most dangerous signal —
    if the regime is beginning to achieve genuine cultural dominance, not just spectacle, the Gramscian model
    should escalate its concern significantly.)

  CLASSICAL DIAGNOSIS: Aristotle and Polybius describe the demagogue/tyrant who rules through direct popular
  appeal, bypassing institutions. This is structurally related to Gramscian Caesarism but arrives from a different
  tradition. The Classical model should diagnose:
  - Is the leader a DEMAGOGUE in the Aristotelian sense (popular leader who subverts law)?
  - Is this TYRANNY (rule for the tyrant's interest) or still DEMOCRACY-under-stress?
  - Polybius's anacyclosis: where are we in the cycle? (democracy → ochlocracy → tyranny)
  - The Classical tradition also emphasizes VIRTUE and CORRUPTION — is the civic culture strong enough to resist?

  BERMAN-RILEY DIAGNOSIS: Look at the digital infrastructure assessment AND the hyperpolitics weaknesses.
  The key Berman-Riley question is: does a mass movement with organizational CAPTURE capacity exist?
  - If digital infrastructure has converted to durable institutional capture (precinct takeover, school board
    capture, party committee infiltration) → high concern, this IS the capture mechanism
  - If digital infrastructure is purely attentional/ephemeral → lower concern, the preconditions for
    Berman-Riley's theory are not fully met (no durable brownshirt equivalent)
  - Be honest: Berman-Riley's model may diagnose the current situation as LESS dangerous than it first appears
    if the mass movement is more audience than organization

  SVOLIK DIAGNOSIS: Democratic erosion through partisan polarization. Voters tolerate democratic norm violations
  by co-partisans because partisan loyalty exceeds democratic commitment. The key question is not whether the
  leader is dangerous but whether VOTERS will constrain him. Look at public opinion data for partisan willingness
  to excuse norm violations.
  CRITICAL SVOLIK SIGNALS TO SEARCH FOR:
  - Co-partisan backlash against regime actions (e.g., Republican voters upset about ICE raids, deportation
    tactics, DOGE disruptions, or other norm-violating actions) = POSITIVE Svolik signal. This means the
    democratic constraint is working — voters are placing democratic norms above partisan loyalty.
  - Co-partisan APPROVAL of norm violations (e.g., "he's doing what needs to be done" about clearly
    extralegal actions) = NEGATIVE Svolik signal. Voters have subordinated democratic commitment to partisanship.
  - Search specifically for: polls on approval of specific controversial executive actions AMONG the president's
    own party supporters. The overall approval number matters less than the CO-PARTISAN number. If 80% of
    opposition voters disapprove, that's expected and uninformative. If 25% of CO-PARTISANS disapprove of a
    specific action, that's a powerful Svolik signal.
  - Elected co-partisan defections: Are Republican members of Congress, governors, or state legislators publicly
    criticizing specific regime actions? This is an elite-level Svolik constraint. Name specific individuals
    and what they criticized.

  HOW THE SAME DATA READS DIFFERENTLY ACROSS MODELS (examples):
  The models don't just weight factors differently — they INTERPRET the same evidence differently. When writing
  modelDiagnoses, apply these interpretive differences:

  Example: "Voters upset about ICE deportation tactics"
  - SVOLIK reads this as: POSITIVE — democratic constraint working, voters won't tolerate everything
  - GRAMSCIAN reads this as: evidence AGAINST hegemony — regime can't normalize coercion as common sense
  - CLASSICAL reads this as: civic virtue intact — citizens place law above the leader
  - STATE CAPACITY factor: UNCHANGED — the coercion is still happening regardless of whether voters like it
  - BERMAN-RILEY reads this as: mass movement lacks depth — supporters are an audience, not a cadre willing
    to do whatever the leader asks

  Example: "Right-wing podcast ecosystem has 50M weekly listeners"
  - GRAMSCIAN reads this as: potential alternative hegemony, but check if it's ACTUALLY hegemonic (are these
    listeners persuaded or entertained? do they ACT on what they hear?)
  - BERMAN-RILEY reads this as: audience ≠ organization — 50M listeners is not 50M brownshirts. How many
    would show up to a rally? To a precinct meeting? To a confrontation?
  - SVOLIK reads this as: relevant only insofar as it affects voter tolerance of norm violations
  - CLASSICAL reads this as: demagogic communication channel — direct appeal bypassing institutional filters

  Example: "Courts blocking executive orders"
  - LEVITSKY-ZIBLATT reads this as: guardrails HOLDING — institutional check functioning
  - GRAMSCIAN reads this as: counter-hegemonic institutions still operational
  - CLASSICAL reads this as: rule of law vs personal rule — law is winning (for now)
  - SVOLIK reads this as: less informative (institutional constraint, not voter constraint)
  - BERMAN-RILEY reads this as: regime hasn't captured judiciary — capture process incomplete

  LEVITSKY-ZIBLATT DIAGNOSIS: Guardrails. Are mutual toleration and institutional forbearance eroding? Focus on
  specific norm violations and whether opposition is treated as legitimate.

  Each model should produce a 1-2 sentence diagnosis that reflects ITS OWN theoretical framework's reading of
  the evidence — not just a restatement of the factor scores with different emphasis.

REGIME INTERNAL DYNAMICS — HARDLINERS VS SOFTLINERS (O'Donnell-Schmitter / Paxton):
Authoritarian movements are not monoliths. Assess the internal tension between:
- HARDLINERS/RADICALIZERS: Push revolution further, destroy institutions, punish enemies, permanent mobilization.
  (US examples: Bannon, Miller, Musk/DOGE, MAGA base demanding escalation, "enemy within" rhetoric)
- SOFTLINERS/NORMALIZERS: Stabilize, cut deals with traditional elites, achieve durable governance.
  (US examples: Wall Street donors, traditional GOP, business interests seeking policy wins without chaos)

KEY QUESTIONS:
- Is the regime currently appeasing hardliners or restraining them?
- Are there visible conflicts between factions (hardliner frustration with "step backs," softliner alarm at escalation)?
- Which faction is ascendant THIS WEEK based on actual policy moves?

THIS IS THE NEWS: The hardliner/softliner battle IS the story of authoritarian consolidation attempts. Report on it.
Paxton's insight: Fascist regimes oscillate between radicalization and normalization — they can never fully satisfy
either faction because each threatens the coalition. Watch for this oscillation pattern.

USE THIS IN ANALYSIS: The hardliner/softliner battle should inform the summary (this IS the news), the Gramscian
diagnosis (Caesarism can't resolve this), Berman-Riley (is mass movement being tamed or radicalized?), and
Svolik (are softliner defections a constraint signal?). Do not add a separate field — weave into existing analysis.

U-TURN FRAMEWORK — HISTORICAL CONTEXT FOR REVERSAL (Nord, Lindberg et al., V-Dem 2024):
Autocratization is NOT a one-way street. V-Dem research on 102 episodes since 1900 found:
- 52% of ALL autocratization episodes are reversed ("U-Turns")
- 73% in the last 30 years — reversibility has INCREASED in the modern era
- 90% of U-Turns restore or IMPROVE prior democracy levels
- Average U-Turn takes ~8 years from onset to restoration

THREE TYPES OF U-TURN (assess which is most plausible):
1. AUTHORITARIAN MANIPULATION: The regime MISCALCULATES and triggers its own downfall. Democratization by mistake.
   (Examples: Costa Rica 1948 — incumbent invalidates election, triggers civil war and rapid democratization;
   Pinochet's 1988 plebiscite backfire; overreach that unites opposition)
   US signals: DOGE chaos alienating business allies, deportation tactics generating backlash, legal exposure
   from norm violations, Musk's unpopularity becoming liability, overreach energizing opposition turnout.

2. DEMOCRATIC REACTION: Pro-democracy forces successfully mobilize, oust the autocratizer, restore democracy.
   Bottom-up citizen mobilization defeats the regime through elections, protests, or institutional resistance.
   (Examples: Brazil 2022 — Lula defeats Bolsonaro after sustained civil society mobilization; Zambia 2021;
   South Korea 1987 — mass protests force democratic transition)
   US signals: Strength of opposition mobilization infrastructure (unions, churches, civil society), court
   resistance, state-level opposition, electoral competitiveness, protest capacity.

3. INTERNATIONAL INTERVENTION: External actors drive the reversal.
   (Examples: post-WWII democratizations, some Cold War transitions)
   US signals: Largely inapplicable given US global position, though international economic pressure, allied
   government criticism, or institutional responses (NATO, trade partners) could matter at margins.

CRITICAL TIMING FACTOR: U-Turns that occur within ONE ELECTORAL CYCLE (4-6 years) of onset are far more common
than later reversals. Early resistance matters enormously. The window for "bounce-back resilience" is relatively
short — after that, institutional capture becomes harder to reverse.

SOUTH KOREA PRECEDENT: One of the few cases where autocratization began in a LIBERAL DEMOCRACY but was reversed
before full breakdown. This is the most relevant historical comparison for the US.

USE THIS IN ANALYSIS:
- The summary should contextualize current events against historical base rates. 52-73% reversal is important
  context — doom is not inevitable, but neither is reversal automatic.
- When assessing "Signs of Potential Reversal" and Nixon-to-China moments, consider which U-Turn TYPE is most
  plausible given current dynamics. Regime miscalculation? Democratic mobilization? Both?
- The Svolik diagnosis should note whether we're still within the critical 4-6 year window.
- The hardliner/softliner assessment feeds directly into U-Turn probability: hardliner overreach increases
  "authoritarian manipulation" (miscalculation) probability; softliner defections signal "democratic reaction"
  potential.
- Do NOT add a separate field or score. Weave this historical context into the summary and modelDiagnoses.`;
