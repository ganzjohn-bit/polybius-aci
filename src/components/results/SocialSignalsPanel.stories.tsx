import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SocialSignalsPanel from './SocialSignalsPanel';

const meta: Meta<typeof SocialSignalsPanel> = {
  title: 'Results/SocialSignalsPanel',
  component: SocialSignalsPanel,
  args: {
    socialSignals: {
      trends: {
        country: 'United States',
        categoryAggregates: [],
        overallTemperature: 61,
        interpretation: ['Search interest around authoritarian indicators is rising.']
      },
      opEds: {
        country: 'United States',
        totalArticles: 42,
        articles: [],
        derivedSignals: {
          eliteDefection: {
            score: 8,
            evidence: [
              "Wall Street Journal editorial calls Minneapolis ICE shooting 'worst to date' for Trump presidency",
              "NY Post, WSJ, NY Times, Washington Post all unite against Trump administration",
              "The Free Press excoriates Trump administration over 'reckless lies'"
            ]
          },
          hegemnonicCrisis: {
            score: 7,
            evidence: [
              "Unprecedented alignment of regime-friendly outlets against administration",
              "Joe Rogan's public break with Trump on multiple issues",
              "Fox News poll shows Democrats leading by 6 points in midterms"
            ]
          },
          classConflict: {
            score: 5,
            evidence: [
              "Elite media outlets breaking with populist administration",
              "Bari Weiss transformation of CBS News amid internal resistance",
              "Washington Post facing massive layoffs and staff meltdown"
            ]
          },
          eliteCoordination: {
            score: 9,
            evidence: [
              "Rare consensus across NY Post, WSJ, NY Times, Washington Post on Minneapolis",
              "Coordinated editorial response across traditional media spectrum",
              "Elite outlets using similar language about 'de-escalation'"
            ]
          },
          baseErosion: {
            score: 6,
            evidence: [
              "Joe Rogan's criticism of Trump despite endorsing him",
              "Tucker Carlson maintaining support but with some criticism",
              "Populist podcasters expressing discontent with administration"
            ]
          }
        },
        nixonMoments: [
          {
            title: 'A surprising rebuke from a party elder',
            description: 'A leading figure calls for restraint on executive power.',
            source: { name: 'The Gazette' },
            sentiment: 'negative',
            outletClass: 'mainstream',
            outletAffinity: 'regime',
            isNixonToChina: true,
            nixonType: 'party_elite'
          }
        ],
        interpretation: ['Elite discourse shows fractures within governing coalitions.']
      },
      eliteSignals: {
        defections: {
          articles: [
            {
              title: 'Senator signals independence',
              description: 'Public disagreement over emergency powers.',
              source: { name: 'Capitol Daily' },
              figure: 'Sen. A. Smith',
              figureRole: 'Senator',
              severity: 7
            }
          ],
          totalFound: 5,
          coordinationScore: 52,
          byFigure: [
          {
              "figure": "Susan Collins",
              "role": "Senator",
              "count": 1,
              "maxSeverity": 85
            },
            {
              "figure": "Lisa Murkowski",
              "role": "Senator",
              "count": 1,
              "maxSeverity": 75
            },
            {
              "figure": "Thom Tillis",
              "role": "Senator",
              "count": 1,
              "maxSeverity": 70
            },
            {
              "figure": "Ted Budd",
              "role": "Senator",
              "count": 1,
              "maxSeverity": 65
            },
            {
              "figure": "Lindsey Graham",
              "role": "Senator",
              "count": 1,
              "maxSeverity": 60
            }
          ]
        },
        propaganda: {
          metrics: {
            "negativeStoriesTotal": 8,
            "negativeInOpposition": 6,
            "negativeInRegimeMedia": 2,
            "penetrationRate": 25,
            "echoEffect": 30,
            "counterNarrativeCount": 3,
            "blackoutScore": 75
          },
          effectivenessScore: 44
        },
        interpretation: ['Coordination remains mixed across legislative leadership.']
      },
      bluesky: {
        country: 'United States',
        totalPosts: 1200,
        posts: [],
        sentimentBreakdown: { negative: 42, neutral: 38, positive: 20 },
        temperature: 58,
        interpretation: ['Conversation is polarized with rising negative sentiment.']
      },
      marketSignals: {
        policyMarketEvents: [
            {
              date: "January 2-20, 2026",
               policy: "One Big Beautiful Bill Act fiscal impact peaks",
               marketReaction: "rally",
               magnitude: 2.8,
               followUp: "maintained",
               tacoPattern: false
            }
          ],
        marketConditions: {
          sp500: { level: 5123, weekChange: 0.6, monthChange: 0.8, trend: 'up' },
          treasury10y: { yield: 4.21, weekChange: 0.5, elevated: true,  trend: 'stable' },
          vix: { level: 18, interpretation: 'muted volatility' },
          recentVolatility: "Microsoft tanked 10% on January 28 after disappointing cloud growth guidance, while tech sector shows mixed signals with Meta surging 9% on strong outlook"
        },
        tacoPatternAnalysis: {
          instancesLast90Days: 3,
          patternHolding: true,
          marketDisciplineWorking: true,
          summary: 'Markets have largely priced through tariff headlines.'
        },
        businessSentiment: {
          overall: 'cautious',
          keyHeadlines: [],
          eliteAlignment: 'mixed',
          notableStatements: [
            "Jamie Dimon: 'I don't like what I'm seeing' on immigration enforcement",
            "Treasury Secretary Bessent: 'We will reap the rewards of Trump's America First agenda'",
            "Allianz CEO: Climate action backtracking is 'bulls---'"
          ]
        },
        overallAssessment: {
          marketConstraintLevel: 'moderate constraint',
           regimeResponsiveness: "medium",
          consolidationImplication: 'mixed',
          summary: 'Markets are not strongly constraining consolidation dynamics.'
        }
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SocialSignalsPanel>;

export const Default: Story = {};
