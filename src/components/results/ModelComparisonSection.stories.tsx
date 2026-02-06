import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ModelComparisonSection from './ModelComparisonSection';
import { theoreticalModels, factors } from '@/data/constants';
import { getModelScores } from '@/lib/model-utils';
import type { Scores } from '@/types/calculator';

const meta: Meta<typeof ModelComparisonSection> = {
  title: 'Calculator/ModelComparisonSection',
  component: ModelComparisonSection,
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ModelComparisonSection>;

const mixedScores: Scores = {
  judicial: 45,
  federalism: 35,
  political: 55,
  media: 65,
  civil: 30,
  publicOpinion: 50,
  mobilizationalBalance: 55,
  stateCapacity: 40,
  corporateCompliance: 70,
  electionInterference: 35,
};

const modelScores = getModelScores(theoreticalModels, mixedScores, factors);

export const Default: Story = {
  args: {
    modelScores,
    hasNonZeroScores: true,
  },
};

const lowScores: Scores = {
  judicial: 20,
  federalism: 15,
  political: 25,
  media: 30,
  civil: 15,
  publicOpinion: 20,
  mobilizationalBalance: 25,
  stateCapacity: 20,
  corporateCompliance: 25,
  electionInterference: 15,
};

const lowModelScores = getModelScores(theoreticalModels, lowScores, factors);

export const HealthyDemocracy: Story = {
  args: {
    modelScores: lowModelScores,
    hasNonZeroScores: true,
  },
};

export const NoScores: Story = {
  args: {
    modelScores: [],
    hasNonZeroScores: false,
  },
};
