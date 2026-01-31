import type { Meta, StoryObj } from '@storybook/react';
import FactorSliders from './FactorSliders';
import { factors } from '@/data/calculator-constants';
import type { Scores, ResearchResults } from '@/types/calculator';

const meta: Meta<typeof FactorSliders> = {
  title: 'Calculator/FactorSliders',
  component: FactorSliders,
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FactorSliders>;

const defaultWeights: Record<string, number> = {};
factors.forEach(f => { defaultWeights[f.id] = f.weight; });

const defaultScores: Scores = {
  judicial: 35,
  federalism: 40,
  political: 50,
  media: 55,
  civil: 30,
  publicOpinion: 45,
  mobilizationalBalance: 40,
  stateCapacity: 35,
  corporateCompliance: 60,
  electionInterference: 25,
};

const researchResults: ResearchResults = {
  judicial: {
    score: 35,
    evidence: 'Federal courts have shown mixed responses. The Supreme Court has maintained some independence but recent appointments have shifted ideological balance.',
    trend: 'deteriorating',
    sources: 'V-Dem, Polity IV',
  },
  federalism: {
    score: 40,
    evidence: 'State-level resistance remains strong in some jurisdictions but is weakening in others.',
    trend: 'stable',
  },
  media: {
    score: 55,
    evidence: 'Media consolidation continues. Independent journalism faces economic pressures.',
    trend: 'deteriorating',
  },
};

export const Default: Story = {
  args: {
    factors: factors,
    scores: defaultScores,
    researchResults: null,
    activeWeights: defaultWeights,
    onScoreChange: () => {},
  },
};

export const WithResearchResults: Story = {
  args: {
    factors: factors.slice(0, 4),
    scores: defaultScores,
    researchResults,
    activeWeights: defaultWeights,
    onScoreChange: () => {},
  },
};

export const CriticalFactors: Story = {
  args: {
    factors: factors.slice(0, 4),
    scores: {
      ...defaultScores,
      judicial: 45,
      political: 60,
      media: 75,
    },
    researchResults: null,
    activeWeights: defaultWeights,
    onScoreChange: () => {},
  },
};
