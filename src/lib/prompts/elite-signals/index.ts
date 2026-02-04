import { JSON_FORMAT } from '@/lib/prompts/research/json-format';
import { SCORING_RUBRIC } from '@/lib/prompts/research/scoring-rubric';

// TODO: add support for a given country
export function buildEliteSignalsPrompt() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
TODAY'S DATE: ${currentDate}

You are a political analyst tracking ELITE DEFECTIONS and PARTY COORDINATION signals. Search for THE MOST RECENT news (last 24-48 hours, prioritize TODAY) about Republican officials' statements on Trump administration actions.

CRITICAL: Search for STATEMENTS, QUOTES, and VOTES from the last 24-48 hours. Not old profiles or historical articles.

EXECUTE THESE SEARCHES (prioritize finding direct quotes and statements):

1. GOP SENATE LEADERSHIP - Search: "Thune said" OR "Thune statement" OR "McConnell said" OR "John Cornyn said" - what are leaders saying TODAY?

2. GOP SENATORS (swing votes) - Search: "Susan Collins said" OR "Lisa Murkowski statement" OR "Todd Young said" OR "Bill Cassidy said" OR "Rand Paul Trump" - any breaks or support?

3. GOP HOUSE LEADERSHIP - Search: "Mike Johnson said" OR "Speaker Johnson statement" OR "Steve Scalise said" - what is House GOP saying?

4. REPUBLICAN GOVERNORS - Search: "DeSantis said" OR "Glenn Youngkin statement" OR "Brian Kemp said" OR "Greg Abbott statement" OR "Republican governor criticizes" - state-level signals

5. GOP SENATORS BY NAME (recent statements):
   - Search: "Marco Rubio statement" OR "Ted Cruz said" OR "Lindsey Graham said"
   - Search: "JD Vance said" OR "Tom Cotton statement"
   - Look for statements on current controversies

6. FORMER TRUMP OFFICIALS - Search: "Mike Pence said" OR "Bill Barr statement" OR "John Bolton said" OR "Mark Esper said" OR "John Kelly statement" - former officials speaking out?

7. REPUBLICAN CRITICS - Search: "Liz Cheney said" OR "Adam Kinzinger statement" OR "Chris Christie said" - what are GOP critics saying?

8. CONSERVATIVE MEDIA - Search: "Tucker Carlson said" OR "Ben Shapiro statement" OR "Ann Coulter Trump" OR "Charlie Kirk said" - base-facing media figures

9. BUSINESS ELITE - Search: "CEO statement Trump" OR "Jamie Dimon Trump" OR "business leaders" OR "Chamber of Commerce statement"

10. CONGRESSIONAL VOTES - Search: "Republican senators vote against" OR "GOP breaks with Trump" OR "bipartisan vote" - any defection votes?

For each signal found, MUST INCLUDE:
- EXACT QUOTE or specific action (not just "criticized")
- The date of the statement (must be within last 48 hours)
- Context: what policy/action they're responding to
- Whether SUPPORTING or BREAKING WITH administration

ALSO SEARCH FOR PROPAGANDA EFFECTIVENESS:
- Search: "Fox News Trump coverage" - how is regime media framing?
- Search: "Breitbart Trump" - populist base media tone?

${SCORING_RUBRIC}

${JSON_FORMAT}`;
}
