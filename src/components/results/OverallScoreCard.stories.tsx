import type { Meta, StoryObj } from '@storybook/react';

import OverallScoreCard from './OverallScoreCard';

const meta: Meta<typeof OverallScoreCard> = {
  title: 'Results/OverallScoreCard',
  component: OverallScoreCard,
  args: {
    aciScore: 42.3,
    country: 'United States'
  }
};

export default meta;

type Story = StoryObj<typeof OverallScoreCard>;

export const Default: Story = {};
