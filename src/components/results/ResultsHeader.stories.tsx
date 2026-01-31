import type { Meta, StoryObj } from '@storybook/react';

import ResultsHeader from './ResultsHeader';

const meta: Meta<typeof ResultsHeader> = {
  title: 'Results/ResultsHeader',
  component: ResultsHeader,
  args: {
    country: 'United States',
    generatedAt: new Date('2026-01-29T18:45:00.000Z').toISOString()
  }
};

export default meta;

type Story = StoryObj<typeof ResultsHeader>;

export const Default: Story = {};
