export const PUBLIC_OPINION_RUBRIC = `
PUBLIC_OPINION (this is REGIME APPROVAL RATING - higher score = regime more popular = more dangerous):
  MEASURE: Executive/regime approval rating percentage. Convert approval % to score using bands below.

  SCORING BANDS (use approval rating to determine score):
  - Approval <35% → Score 0-20 (regime deeply unpopular, consolidation very difficult)
  - Approval 35-44% → Score 21-40 (regime underwater, consolidation constrained)
  - Approval 45-50% → Score 41-50 (regime at parity, contested)
  - Approval 51-57% → Score 51-70 (regime popular, consolidation enabled)
  - Approval >57% → Score 71-100 (regime highly popular, consolidation easy)

  EXAMPLE: If Trump approval is 42%, score should be ~30-35 (in the 21-40 band for "underwater"). Do NOT score 42 just because approval is 42%.

  ALSO NOTE: Intensity matters - is the base enthusiastic or reluctant? Adjust within band accordingly.

  DEMOGRAPHIC CROSS-TABS (CRITICAL for class/elite analysis - search for recent polling with breakdowns):
  Search for polls with demographic breakdowns on regime approval/key policies. Include in evidence:

  CLASS INDICATORS (distinguish Marxian from Weberian):

  MARXIAN CLASS (relationship to means of production - THIS IS PRIMARY):
  - Capital owners: Business owners, investors, landlords, shareholders (own means of production)
  - Working class: Wage laborers who sell labor power (do NOT own means of production)
  - Search for: "business owner approval" vs "employee approval", investor sentiment vs worker sentiment
  - Self-employed vs employed distinction matters
  - Stock ownership as proxy: significant shareholders vs non-owners

  WEBERIAN STATUS (education/credentials - secondary, feeds different models):
  - Education: Non-college vs college vs postgrad (credentialism, not Marxian class)
  - This feeds Svolik polarization analysis, not Marxian analysis
  - Professional-managerial class (PMC) is NOT bourgeoisie - they sell labor too

  INCOME (imperfect proxy - high-paid workers ≠ capitalists):
  - Income bands are WEAK proxy for class - a well-paid doctor is still a worker
  - Use income only when ownership data unavailable
  - Union households: Union vs non-union (actual working class organization)

  ELITE VS MASS (for Svolik, A-R models):
  - Business owner/investor sentiment vs general population
  - CEO surveys, Chamber of Commerce, Business Roundtable positions
  - Capital-owner class vs everyone else

  OTHER KEY BREAKS:
  - Race/ethnicity: White vs Black vs Hispanic vs Asian approval
  - Age: 18-29 vs 30-44 vs 45-64 vs 65+ (generational divide)
  - Gender: Men vs women gap
  - Geography: Urban vs suburban vs rural
  - Religion: White evangelical vs Black Protestant vs Catholic vs secular

  INTERPRET FOR THEORY:
  - Capital owners vs workers divergence → MARXIAN (class struggle, capital vs labor)
  - Education/credential polarization → SVOLIK (partisan sorting by education)
  - Elite-mass divergence (any measure) → A-R REDISTRIBUTIVE (elite veto, mass threat)
  - Cross-class coalition for regime → GRAMSCIAN (hegemony, consent across classes)
  - Working class support for regime despite capital opposition → CLASSICAL (demagoguery, popular tyranny)
  - Capital supporting regime against workers → MARXIAN (capital using state against labor)

CORPORATE: 0-20=resist, 21-40=neutral, 41-60=compliance, 61-80=active cooperation, 81-100=captured`;
