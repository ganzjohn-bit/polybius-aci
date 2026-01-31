import type { Meta, StoryObj } from '@storybook/react';

import { factors } from '@/data/results-constants';

import VitalSignsMonitor from './VitalSignsMonitor';

const meta: Meta<typeof VitalSignsMonitor> = {
  title: 'Results/VitalSignsMonitor',
  component: VitalSignsMonitor,
  args: {
    scores: {
      judicial: 35,
      federalism: 45,
      political: 60,
      media: 70,
      civil: 50,
      publicOpinion: 55,
      mobilizationalBalance: 65,
      stateCapacity: 40,
      corporateCompliance: 60,
      electionInterference: 30
    },
    factorResults: {
      judicial: { score: 35, evidence: 'Courts remain independent but face political pressure.', trend: 'stable' },
      media: { score: 70, evidence: 'Broadcast consolidation accelerating.', trend: 'worsening' },
      publicOpinion: { score: 55, evidence: 'Polarization increasing across demographics.', trend: 'improving' }
    },
    overallScore: 52.8,
    factors
  }
};

export default meta;

type Story = StoryObj<typeof VitalSignsMonitor>;

export const Default: Story = {};
