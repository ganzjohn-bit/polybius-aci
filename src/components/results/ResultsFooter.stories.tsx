import type { Meta, StoryObj } from '@storybook/react';

import ResultsFooter from './ResultsFooter';

const meta: Meta<typeof ResultsFooter> = {
  title: 'Results/ResultsFooter',
  component: ResultsFooter
};

export default meta;

type Story = StoryObj<typeof ResultsFooter>;

export const Default: Story = {};
