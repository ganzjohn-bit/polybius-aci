export const INSTITUTIONAL_RUBRIC = `
SCORING (0-100, higher = more authoritarian):

JUDICIAL: 0-20=independent courts, 21-40=some pressure, 41-60=packed/intimidated, 61-80=rubber stamp, 81-100=captured
FEDERALISM: 0-20=strong regional autonomy, 21-40=some autonomy, 41-60=encroachment, 61-80=eliminated, 81-100=total centralization
POLITICAL (opposition viability + generic ballot):
  MEASURE: Combine structural barriers with GENERIC CONGRESSIONAL BALLOT polling.
  Search for: "generic ballot poll", "congressional ballot [month] [year]", "Democrats vs Republicans generic ballot"

  GENERIC BALLOT INTEGRATION:
  - Opposition leads generic ballot by 5+% → Strong indicator of competition (pull score toward 0-20)
  - Opposition leads by 1-5% → Healthy competition (pull toward 20-35)
  - Tied or regime leads by 1-3% → Contested (pull toward 35-50)
  - Regime leads by 3-7% → Regime advantage (pull toward 50-65)
  - Regime leads by 7+% → Weak opposition (pull toward 65+)

  ALSO ASSESS: Opposition party fundraising, candidate recruitment, legislative independence, structural barriers (gerrymandering, ballot access)

SCORING: 0-20=robust competition, 21-40=some advantages, 41-60=significant barriers, 61-80=opposition jailed, 81-100=no opposition
CIVIL: 0-20=vibrant, 21-40=some restrictions, 41-60=foreign agent laws, 61-80=shut down, 81-100=total control

ELECTION_INTERFERENCE:
  CRITICAL - US-SPECIFIC STRUCTURAL CONSTRAINTS:
  The United States has ~10,000 separate election jurisdictions run by county/local officials, ~95% paper ballots,
  bipartisan poll watchers, statistical risk-limiting audits, and an independent judiciary that has consistently
  intervened (60+ rulings in 2020 alone). This makes centralized vote fraud or systematic rigging nearly impossible
  compared to historical cases like Hungary (constitutional rewrite + electoral system redesign), Venezuela
  (packed electoral council), Turkey (opposition leaders jailed), or Weimar (SA physical violence at polls).

  DO NOT INFLATE this score by applying frameworks from centralized electoral systems to the US.
  The US score on this factor should reflect ACTUAL mechanisms, not hypothetical ones:

  WHAT COUNTS IN THE US:
  - Gerrymandering (real but doesn't prevent power transfer - Dems won House in 2018, 2022 despite it)
  - Voter suppression laws (real but studies show marginal turnout effects - Grimmer et al.)
  - Election subversion attempts (fake electors, certification pressure - the 2020 attempt FAILED, perpetrators prosecuted)
  - Polling place closures in minority areas (localized, not systematic)

  WHAT DOES NOT EXIST IN THE US:
  - Centralized electoral commission that can be packed (no such body exists)
  - Ability to ban opposition candidates (not structurally possible)
  - State control of vote counting (county-level, bipartisan)
  - Elimination of opposition media during campaigns (First Amendment)

  HONEST SCORING FOR US: Most analyses should land in 15-30 range.
  0-20=free/fair (decentralized, paper ballots, courts intervene, bipartisan observation)
  21-40=minor structural issues (gerrymandering, some suppression laws, but power transfers still occur)
  41-60=active subversion attempts (fake electors, certification challenges - but only if SUCCEEDING, not just attempted)
  61-80=systematic fraud (would require capture of thousands of local jurisdictions - essentially impossible in current US structure)
  81-100=theatrical elections (not achievable without constitutional collapse)

  COMPARE TO HISTORICAL CASES: Weimar scored 55 with SA brownshirts beating voters. Hungary scored 65 after
  rewriting the entire constitution and electoral system. If the US score is above 30, you need to explain what
  mechanism is MORE severe than gerrymandering and localized suppression.`;
