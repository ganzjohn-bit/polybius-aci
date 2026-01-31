import type { Meta, StoryObj } from '@storybook/react';
import TrendsCard from './TrendsCard';

const meta: Meta<typeof TrendsCard> = {
  title: 'UI/TrendsCard',
  component: TrendsCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof TrendsCard>;

const baseTrends = {
  country: 'United States',
  categoryAggregates: [
    { category: 'economic', avgInterest: 72, avgChange: 15, hasSpike: true, topKeyword: 'inflation' },
    { category: 'political', avgInterest: 65, avgChange: 8, hasSpike: false, topKeyword: 'election' },
    { category: 'social', avgInterest: 45, avgChange: -5, hasSpike: false, topKeyword: 'protest' },
    { category: 'institutional', avgInterest: 38, avgChange: 12, hasSpike: false, topKeyword: 'courts' },
    { category: 'international', avgInterest: 52, avgChange: 22, hasSpike: true, topKeyword: 'tariffs' },
  ],
  overallTemperature: 58,
  interpretation: [
    'Elevated search interest in economic and international topics.',
    'WARNING: Spike detected in tariff-related searches.',
    'Political search patterns remain within normal bounds.',
  ],
};

export const Default: Story = {
  args: {
    trends: baseTrends,
    showDetails: false,
  },
};

export const WithDetails: Story = {
  args: {
    trends: baseTrends,
    showDetails: true,
  },
};

export const LowTemperature: Story = {
  args: {
    trends: {
      country: 'Canada',
      categoryAggregates: [
        { category: 'economic', avgInterest: 35, avgChange: 2, hasSpike: false },
        { category: 'political', avgInterest: 28, avgChange: -3, hasSpike: false },
        { category: 'social', avgInterest: 32, avgChange: 1, hasSpike: false },
      ],
      overallTemperature: 28,
      interpretation: [
        'Search patterns within normal seasonal bounds.',
        'No significant anomalies detected.',
      ],
    },
    showDetails: true,
  },
};

export const HighTemperature: Story = {
  args: {
    trends: {
      country: 'United States',
      categoryAggregates: [
        { category: 'economic', avgInterest: 92, avgChange: 45, hasSpike: true, topKeyword: 'recession' },
        { category: 'political', avgInterest: 88, avgChange: 35, hasSpike: true, topKeyword: 'impeachment' },
        { category: 'social', avgInterest: 78, avgChange: 28, hasSpike: true, topKeyword: 'protest' },
        { category: 'institutional', avgInterest: 65, avgChange: 40, hasSpike: true, topKeyword: 'constitution' },
        { category: 'international', avgInterest: 71, avgChange: 32, hasSpike: true, topKeyword: 'sanctions' },
      ],
      overallTemperature: 85,
      interpretation: [
        'ALERT: Search temperature at critical levels.',
        'WARNING: Multiple category spikes detected simultaneously.',
        'SIGNAL: Pattern consistent with acute public anxiety.',
      ],
    },
    showDetails: true,
  },
};

export const WithErrors: Story = {
  args: {
    trends: {
      ...baseTrends,
      errors: ['Failed to fetch: democracy index', 'Failed to fetch: civil unrest'],
    },
    showDetails: true,
  },
};

export const MinimalData: Story = {
  args: {
    trends: {
      country: 'Brazil',
      overallTemperature: 45,
      interpretation: ['Moderate search activity observed.'],
    },
    showDetails: false,
  },
};
