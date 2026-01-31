import type { Meta, StoryObj } from '@storybook/react';
import HistoricalComparison from './HistoricalComparison';
import type { ComparativeAnalysisData } from '@/types/calculator';

const meta: Meta<typeof HistoricalComparison> = {
  title: 'Calculator/HistoricalComparison',
  component: HistoricalComparison,
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HistoricalComparison>;

const mockData: ComparativeAnalysisData = {
  comparativeAnalysis: [
    {
      modelName: 'Linzian Presidentialism',
      mostSimilarCases: [
        { caseId: '1', country: 'Weimar Germany', period: '1930-1933', outcome: 'consolidated', outcomeScore: 85, similarity: 0.78 },
      ],
      predictedOutcome: {
        score: 55,
        confidence: 'moderate',
        reasoning: 'Presidential system stress with weakening federal countervailing forces.',
      },
      theoreticalExplanation: 'Linz warned that presidentialism creates zero-sum conflicts. Current conditions show elevated stress.',
      warningSignals: ['Federalism weakening', 'Political competition declining'],
      hopefulSignals: ['Some judicial independence remains'],
    },
    {
      modelName: 'Levitsky & Ziblatt',
      mostSimilarCases: [
        { caseId: '2', country: 'Hungary', period: '2010-present', outcome: 'consolidated', outcomeScore: 75, similarity: 0.82 },
      ],
      predictedOutcome: {
        score: 62,
        confidence: 'high',
        reasoning: 'Pattern of gradual institutional erosion matches backsliding cases.',
      },
      warningSignals: ['Norm erosion accelerating', 'Referee capture underway'],
      hopefulSignals: [],
    },
  ],
  consensus: {
    averageScore: 58.5,
    scoreRange: { min: 45, max: 72 },
    agreementLevel: 'moderate',
    summary: 'Models converge on elevated risk with some divergence on severity.',
  },
  mostCitedCases: [
    { caseId: '1', country: 'Hungary', period: '2010-present', citedBy: ['Levitsky', 'Svolik'], outcome: 'consolidated' },
    { caseId: '2', country: 'Poland', period: '2015-2023', citedBy: ['Linz', 'Gramscian'], outcome: 'resisted' },
    { caseId: '3', country: 'Turkey', period: '2013-present', citedBy: ['Paxton'], outcome: 'consolidated' },
  ],
  interpretation: [
    'Warning: Multiple models identify patterns consistent with democratic backsliding.',
    'The Hungary comparison is particularly salient given institutional parallels.',
    'Hopeful: Poland case shows successful resistance is possible with mobilized opposition.',
  ],
};

export const Loading: Story = {
  args: {
    comparativeData: null,
    isFetchingComparative: true,
  },
};

export const NoData: Story = {
  args: {
    comparativeData: null,
    isFetchingComparative: false,
  },
};

export const WithData: Story = {
  args: {
    comparativeData: mockData,
    isFetchingComparative: false,
  },
};

export const HighRisk: Story = {
  args: {
    comparativeData: {
      ...mockData,
      consensus: {
        averageScore: 72,
        scoreRange: { min: 65, max: 80 },
        agreementLevel: 'high',
        summary: 'Strong model agreement on elevated consolidation risk.',
      },
    },
    isFetchingComparative: false,
  },
};

export const LowRisk: Story = {
  args: {
    comparativeData: {
      ...mockData,
      consensus: {
        averageScore: 28,
        scoreRange: { min: 20, max: 35 },
        agreementLevel: 'high',
        summary: 'Models agree on stable democratic conditions.',
      },
    },
    isFetchingComparative: false,
  },
};
