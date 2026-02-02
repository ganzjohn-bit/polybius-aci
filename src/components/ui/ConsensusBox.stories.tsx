import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ConsensusBox from './ConsensusBox';

const meta: Meta<typeof ConsensusBox> = {
  title: 'UI/ConsensusBox',
  component: ConsensusBox,
  args: {
    score: 55,
    label: 'Comparative Prediction',
  },
};

export default meta;

type Story = StoryObj<typeof ConsensusBox>;

export const Default: Story = {};

export const LowScore: Story = {
  args: {
    score: 28,
    label: 'Risk Assessment',
  },
};

export const MediumScore: Story = {
  args: {
    score: 48,
    label: 'Model Consensus',
  },
};

export const HighScore: Story = {
  args: {
    score: 72,
    label: 'Consolidation Risk',
  },
};

export const WithSubtitle: Story = {
  args: {
    score: 55,
    label: 'Comparative Prediction',
    subtitle: 'Range: 42-68 | Agreement: moderate',
  },
};

export const WithReactNodeSubtitle: Story = {
  args: {
    score: 65,
    label: 'Historical Analysis',
    subtitle: (
      <>
        Range: 58-72 | Agreement:{' '}
        <span className="font-medium text-green-700">high</span>
      </>
    ),
  },
};
