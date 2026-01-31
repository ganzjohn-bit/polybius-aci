import type { Meta, StoryObj } from '@storybook/react';

import { factors } from '@/data/results-constants';

import TheoreticalModels from './TheoreticalModels';

const meta: Meta<typeof TheoreticalModels> = {
  title: 'Results/TheoreticalModels',
  component: TheoreticalModels,
  args: {
    factors,
    modelsUsed: [
      {
        id: 'model-1',
        name: 'Competitive Authoritarianism',
        author: 'Levitsky & Way',
        cluster: 'Institutional',
        shortDesc: 'Evaluates how incumbents tilt the playing field while preserving formal competition.',
        fullDesc:
          'Focuses on institutional capture, uneven playing fields, and opposition constraints over time.',
        keyWorks: 'Levitsky, S. & Way, L. (2010). Competitive Authoritarianism.',
        weights: {
          judicial: 0.2,
          media: 0.2,
          political: 0.2,
          civil: 0.15,
          electionInterference: 0.25
        }
      },
      {
        id: 'model-2',
        name: 'Elite Defections',
        author: 'Svolik',
        cluster: 'Elite Dynamics',
        shortDesc: 'Weights elite coordination and defection patterns.',
        fullDesc: 'Emphasizes how elite splits and defections shape authoritarian durability.',
        keyWorks: 'Svolik, M. (2012). The Politics of Authoritarian Rule.',
        weights: {
          political: 0.25,
          mobilizationalBalance: 0.2,
          corporateCompliance: 0.15,
          publicOpinion: 0.2,
          stateCapacity: 0.2
        }
      }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof TheoreticalModels>;

export const Default: Story = {};
