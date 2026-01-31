import type { Meta, StoryObj } from '@storybook/react';
import ModelComparisonSection from './ModelComparisonSection';
import { theoreticalModels, factors, clusterLabels } from '@/data/calculator-constants';
import { getModelScores, getClusterAverages } from '@/lib/calculator-utils';
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
const meanScore = modelScores.reduce((sum, m) => sum + m.score, 0) / modelScores.length;
const variance = modelScores.reduce((sum, m) => sum + Math.pow(m.score - meanScore, 2), 0) / modelScores.length;
const stdDev = Math.sqrt(variance);
const clusterAverages = getClusterAverages(modelScores, clusterLabels);

export const Default: Story = {
  args: {
    modelScores,
    meanScore,
    stdDev,
    clusterAverages,
    clusterLabels,
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
const lowMean = lowModelScores.reduce((sum, m) => sum + m.score, 0) / lowModelScores.length;
const lowVar = lowModelScores.reduce((sum, m) => sum + Math.pow(m.score - lowMean, 2), 0) / lowModelScores.length;
const lowStdDev = Math.sqrt(lowVar);
const lowClusterAverages = getClusterAverages(lowModelScores, clusterLabels);

export const HealthyDemocracy: Story = {
  args: {
    modelScores: lowModelScores,
    meanScore: lowMean,
    stdDev: lowStdDev,
    clusterAverages: lowClusterAverages,
    clusterLabels,
    hasNonZeroScores: true,
  },
};

export const NoScores: Story = {
  args: {
    modelScores: [],
    meanScore: 0,
    stdDev: 0,
    clusterAverages: [],
    clusterLabels,
    hasNonZeroScores: false,
  },
};
