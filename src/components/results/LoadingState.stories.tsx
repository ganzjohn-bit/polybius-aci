import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import LoadingState from './LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'Results/LoadingState',
  component: LoadingState
};

export default meta;

type Story = StoryObj<typeof LoadingState>;

export const Loading: Story = {
  args: {
    type: 'loading'
  }
};

export const Error: Story = {
  args: {
    type: 'error'
  }
};
