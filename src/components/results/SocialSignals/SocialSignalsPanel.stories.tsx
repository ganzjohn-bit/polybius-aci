import type { Meta, StoryObj } from '@storybook/react';

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
        nixonMoments: [
          {
            title: 'A surprising rebuke from a party elder',
            description: 'A leading figure calls for restraint on executive power.',
            source: { name: 'The Gazette' },
            sentiment: 'negative',
            outletClass: 'mainstream',
            outletAffinity: 'center-right',
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
          coordinationScore: 52
        },
        propaganda: {
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
        marketConditions: {
          sp500: { level: 5123, weekChange: 0.6, trend: 'up' },
          treasury10y: { yield: 4.21, trend: 'stable' },
          vix: { level: 18, interpretation: 'muted volatility' }
        },
        tacoPatternAnalysis: {
          instancesLast90Days: 3,
          patternHolding: true,
          summary: 'Markets have largely priced through tariff headlines.'
        },
        businessSentiment: {
          overall: 'cautious',
          keyHeadlines: [],
          eliteAlignment: 'mixed'
        },
        overallAssessment: {
          marketConstraintLevel: 'moderate constraint',
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
