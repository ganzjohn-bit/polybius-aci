import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import AnalysisSummary from './AnalysisSummary';

const meta: Meta<typeof AnalysisSummary> = {
  title: 'Results/AnalysisSummary',
  component: AnalysisSummary,
  args: {
    summary:
      'Institutional checks remain contested, but elite defections are rising.\n\nPublic mobilization remains uneven across regions.'
  }
};

export default meta;

type Story = StoryObj<typeof AnalysisSummary>;

export const Default: Story = {};
