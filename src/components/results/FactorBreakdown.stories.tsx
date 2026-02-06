import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { factors } from '@/data/constants';

import FactorBreakdown from './FactorBreakdown';

const meta: Meta<typeof FactorBreakdown> = {
  title: 'Results/FactorBreakdown',
  component: FactorBreakdown,
  args: {
    factors,
    factorResults: {
      judicial: {
        score: 38,
        evidence: 'Court appointments are increasingly partisan, but rulings still diverge from executive preferences.',
        trend: 'stable'
      },
      media: {
        score: 72,
        evidence: 'Broadcast ownership consolidation is reducing investigative coverage.',
        trend: 'worsening'
      },
      publicOpinion: {
        score: 54,
        evidence: 'Polling indicates widening trust gaps across demographics.',
        trend: 'improving'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof FactorBreakdown>;

export const Default: Story = {};
