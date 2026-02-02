import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MarketSignalsCard from './MarketSignalsCard';

const meta: Meta<typeof MarketSignalsCard> = {
  title: 'UI/MarketSignalsCard',
  component: MarketSignalsCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof MarketSignalsCard>;

const baseMarketSignals = {
  marketConditions: {
    sp500: { level: 5234, weekChange: -2.3, monthChange: 1.5, trend: 'volatile' },
    treasury10y: { yield: 4.52, weekChange: 0.15, trend: 'rising', elevated: true },
    vix: { level: 22.5, interpretation: 'elevated' },
    recentVolatility: 'Increased volatility following policy announcements',
  },
  tacoPatternAnalysis: {
    instancesLast90Days: 4,
    patternHolding: true,
    marketDisciplineWorking: true,
    summary: 'Markets continue to react negatively to tariff announcements, suggesting market discipline remains effective.',
  },
  businessSentiment: {
    overall: 'cautious',
    keyHeadlines: ['CEOs express concern over trade policy', 'Business investment slowing'],
    eliteAlignment: 'mixed',
    notableStatements: ['Major tech CEO warns of policy uncertainty'],
  },
  overallAssessment: {
    marketConstraintLevel: 'moderate',
    regimeResponsiveness: 'medium',
    consolidationImplication: 'markets_neutral',
    summary: 'Markets are providing moderate constraint on policy through volatility and elevated yields.',
  },
};

export const Default: Story = {
  args: {
    marketSignals: baseMarketSignals,
    showDetails: false,
  },
};

export const WithDetails: Story = {
  args: {
    marketSignals: baseMarketSignals,
    showDetails: true,
  },
};

export const MarketsConstraining: Story = {
  args: {
    marketSignals: {
      ...baseMarketSignals,
      marketConditions: {
        sp500: { level: 4850, weekChange: -5.2, monthChange: -8.1, trend: 'declining' },
        treasury10y: { yield: 5.25, weekChange: 0.45, trend: 'spiking', elevated: true },
        vix: { level: 35.2, interpretation: 'high' },
      },
      overallAssessment: {
        marketConstraintLevel: 'strong',
        regimeResponsiveness: 'high',
        consolidationImplication: 'markets_constraining',
        summary: 'Strong market discipline observed. Policy reversals correlate with market pressure.',
      },
    },
    showDetails: true,
  },
};

export const MarketsEnabling: Story = {
  args: {
    marketSignals: {
      ...baseMarketSignals,
      marketConditions: {
        sp500: { level: 5500, weekChange: 2.1, monthChange: 5.3, trend: 'bullish' },
        treasury10y: { yield: 3.8, weekChange: -0.1, trend: 'stable', elevated: false },
        vix: { level: 12.5, interpretation: 'low' },
      },
      tacoPatternAnalysis: {
        instancesLast90Days: 1,
        patternHolding: false,
        marketDisciplineWorking: false,
        summary: 'TACO pattern appears broken. Markets no longer react negatively to tariff announcements.',
      },
      overallAssessment: {
        marketConstraintLevel: 'weak',
        regimeResponsiveness: 'low',
        consolidationImplication: 'markets_enabling',
        summary: 'Market complacency observed. Economic constraints on policy appear diminished.',
      },
    },
    showDetails: true,
  },
};

export const NoTacoPattern: Story = {
  args: {
    marketSignals: {
      marketConditions: baseMarketSignals.marketConditions,
      overallAssessment: baseMarketSignals.overallAssessment,
    },
    showDetails: false,
  },
};
