import type { Meta, StoryObj } from '@storybook/react';
import OverallScoreCard from './OverallScoreCard';
import { getRiskLevel, getProbability } from '@/lib/calculator-utils';

const meta: Meta<typeof OverallScoreCard> = {
  title: 'Calculator/OverallScoreCard',
  component: OverallScoreCard,
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OverallScoreCard>;

export const StableDemocracy: Story = {
  args: {
    aciScore: 18.5,
    probability: getProbability(18.5),
    risk: getRiskLevel(18.5),
    hasNonZeroScores: true,
    onPublish: () => console.log('Publish clicked'),
    isPublishing: false,
    publishStatus: null,
  },
};

export const DemocraticStress: Story = {
  args: {
    aciScore: 35.2,
    probability: getProbability(35.2),
    risk: getRiskLevel(35.2),
    hasNonZeroScores: true,
    onPublish: () => console.log('Publish clicked'),
    isPublishing: false,
    publishStatus: null,
  },
};

export const DangerZone: Story = {
  args: {
    aciScore: 58.7,
    probability: getProbability(58.7),
    risk: getRiskLevel(58.7),
    hasNonZeroScores: true,
    onPublish: () => console.log('Publish clicked'),
    isPublishing: false,
    publishStatus: null,
  },
};

export const ConsolidatingAuthoritarianism: Story = {
  args: {
    aciScore: 72.3,
    probability: getProbability(72.3),
    risk: getRiskLevel(72.3),
    hasNonZeroScores: true,
    onPublish: () => console.log('Publish clicked'),
    isPublishing: false,
    publishStatus: null,
  },
};

export const Publishing: Story = {
  args: {
    aciScore: 45.0,
    probability: getProbability(45.0),
    risk: getRiskLevel(45.0),
    hasNonZeroScores: true,
    onPublish: () => {},
    isPublishing: true,
    publishStatus: null,
  },
};

export const PublishSuccess: Story = {
  args: {
    aciScore: 45.0,
    probability: getProbability(45.0),
    risk: getRiskLevel(45.0),
    hasNonZeroScores: true,
    onPublish: () => {},
    isPublishing: false,
    publishStatus: { type: 'success', message: 'Published! polybius.world will update in ~30 seconds.' },
  },
};

export const PublishError: Story = {
  args: {
    aciScore: 45.0,
    probability: getProbability(45.0),
    risk: getRiskLevel(45.0),
    hasNonZeroScores: true,
    onPublish: () => {},
    isPublishing: false,
    publishStatus: { type: 'error', message: 'Publish failed: Network error' },
  },
};

export const NoScores: Story = {
  args: {
    aciScore: 0,
    probability: getProbability(0),
    risk: getRiskLevel(0),
    hasNonZeroScores: false,
  },
};
