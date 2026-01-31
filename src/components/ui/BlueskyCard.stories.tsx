import type { Meta, StoryObj } from '@storybook/react';
import BlueskyCard from './BlueskyCard';

const meta: Meta<typeof BlueskyCard> = {
  title: 'UI/BlueskyCard',
  component: BlueskyCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof BlueskyCard>;

const baseBlueskyData = {
  country: 'United States',
  totalPosts: 1247,
  sentimentBreakdown: { negative: 45, neutral: 30, positive: 25 },
  topIndicators: [
    { indicator: 'economic anxiety', count: 156 },
    { indicator: 'political instability', count: 134 },
    { indicator: 'institutional trust', count: 98 },
    { indicator: 'media criticism', count: 87 },
    { indicator: 'protest activity', count: 65 },
  ],
  temperature: 62,
  interpretation: [
    'Elevated discourse temperature indicates heightened public concern.',
    'Negative sentiment dominates recent discussions.',
    'WARNING: High stress indicators detected in economic topics.',
  ],
};

export const Default: Story = {
  args: {
    bluesky: baseBlueskyData,
    showDetails: false,
  },
};

export const WithDetails: Story = {
  args: {
    bluesky: baseBlueskyData,
    showDetails: true,
  },
};

export const LowTemperature: Story = {
  args: {
    bluesky: {
      ...baseBlueskyData,
      temperature: 25,
      sentimentBreakdown: { negative: 15, neutral: 45, positive: 40 },
      interpretation: [
        'Normal discourse patterns observed.',
        'Balanced sentiment distribution.',
      ],
    },
    showDetails: false,
  },
};

export const HighTemperature: Story = {
  args: {
    bluesky: {
      ...baseBlueskyData,
      temperature: 85,
      sentimentBreakdown: { negative: 70, neutral: 20, positive: 10 },
      interpretation: [
        'HIGH STRESS: Discourse temperature at critical levels.',
        'WARNING: Extreme negative sentiment detected.',
        'Public anxiety indicators at multi-month highs.',
      ],
    },
    showDetails: true,
  },
};
