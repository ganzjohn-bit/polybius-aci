import type { Meta, StoryObj } from '@storybook/react';
import VitalSignsMonitor from './VitalSignsMonitor';
import { factors } from '@/data/calculator-constants';
import type { Scores, ResearchResults } from '@/types/calculator';

const meta: Meta<typeof VitalSignsMonitor> = {
  title: 'Calculator/VitalSignsMonitor',
  component: VitalSignsMonitor,
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VitalSignsMonitor>;

const healthyScores: Scores = {
  judicial: 25,
  federalism: 20,
  political: 30,
  media: 35,
  civil: 20,
  publicOpinion: 25,
  mobilizationalBalance: 30,
  stateCapacity: 25,
  corporateCompliance: 30,
  electionInterference: 15,
};

const criticalScores: Scores = {
  judicial: 55,
  federalism: 60,
  political: 70,
  media: 75,
  civil: 45,
  publicOpinion: 65,
  mobilizationalBalance: 60,
  stateCapacity: 55,
  corporateCompliance: 80,
  electionInterference: 50,
};

const mixedScores: Scores = {
  judicial: 45,
  federalism: 30,
  political: 55,
  media: 70,
  civil: 25,
  publicOpinion: 40,
  mobilizationalBalance: 45,
  stateCapacity: 35,
  corporateCompliance: 75,
  electionInterference: 25,
};

const researchResults: ResearchResults = {
  judicial: { score: 45, evidence: 'Test evidence', trend: 'deteriorating' },
  federalism: { score: 30, evidence: 'Test evidence', trend: 'stable' },
  political: { score: 55, evidence: 'Test evidence', trend: 'worsening' },
  media: { score: 70, evidence: 'Test evidence', trend: 'deteriorating' },
  civil: { score: 25, evidence: 'Test evidence', trend: 'improving' },
  publicOpinion: { score: 40, evidence: 'Test evidence', trend: 'stable' },
};

export const Healthy: Story = {
  args: {
    factors,
    scores: healthyScores,
    researchResults: null,
    aciScore: 25.5,
  },
};

export const Critical: Story = {
  args: {
    factors,
    scores: criticalScores,
    researchResults: null,
    aciScore: 61.5,
  },
};

export const MixedWithTrends: Story = {
  args: {
    factors,
    scores: mixedScores,
    researchResults,
    aciScore: 45.5,
  },
};
