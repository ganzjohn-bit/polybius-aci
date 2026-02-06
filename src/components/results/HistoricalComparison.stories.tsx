import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HistoricalComparison from './HistoricalComparison';

const meta: Meta<typeof HistoricalComparison> = {
  title: 'Results/HistoricalComparison',
  component: HistoricalComparison,
  args: {
    historicalComparison: {
      averageScore: 57,
      mostSimilarCases: [
        { country: 'Hungary', period: '2010-2015', outcome: 'consolidated' },
        { country: 'Chile', period: '1970-1973', outcome: 'consolidated' },
        { country: 'Poland', period: '2015-2020', outcome: 'resisted' }
      ],
      interpretation: [
        'Warning: similar trajectories have seen rapid institutional erosion.',
        'Some cases indicate resistance remains possible under strong civil mobilization.'
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof HistoricalComparison>;

export const Default: Story = {};
