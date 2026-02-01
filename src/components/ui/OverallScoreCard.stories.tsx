import type { Meta, StoryObj } from '@storybook/react';

import OverallScoreCard from './OverallScoreCard';

const meta: Meta<typeof OverallScoreCard> = {
  title: 'UI/OverallScoreCard',
  component: OverallScoreCard,
  args: {
    aciScore: 45.5,
    probability: '15-35%',
    risk: {
      level: 'Competitive Authoritarian Risk',
      color: 'bg-orange-400',
      textColor: 'text-orange-700',
      bgLight: 'bg-orange-50',
    },
  },
};

export default meta;

type Story = StoryObj<typeof OverallScoreCard>;

export const Default: Story = {};

export const LowRisk: Story = {
  args: {
    aciScore: 18.2,
    probability: '0-5%',
    risk: {
      level: 'Stable Democracy',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50',
    },
  },
};

export const HighRisk: Story = {
  args: {
    aciScore: 72.8,
    probability: '60-85%',
    risk: {
      level: 'Consolidating Authoritarianism',
      color: 'bg-red-700',
      textColor: 'text-red-800',
      bgLight: 'bg-red-100',
    },
  },
};

export const WithSubtitle: Story = {
  args: {
    aciScore: 52.3,
    probability: '35-60%',
    subtitle: 'United States',
    risk: {
      level: 'DANGER ZONE',
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgLight: 'bg-red-50',
    },
  },
};

export const WithActions: Story = {
  args: {
    aciScore: 45.5,
    probability: '15-35%',
    risk: {
      level: 'Competitive Authoritarian Risk',
      color: 'bg-orange-400',
      textColor: 'text-orange-700',
      bgLight: 'bg-orange-50',
    },
    actions: (
      <div className="mt-4 flex justify-center">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
          Publish Results
        </button>
      </div>
    ),
  },
};
