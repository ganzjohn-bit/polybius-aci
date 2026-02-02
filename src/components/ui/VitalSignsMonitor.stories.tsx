import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VitalSignsMonitor from './VitalSignsMonitor';

const meta: Meta<typeof VitalSignsMonitor> = {
  title: 'UI/VitalSignsMonitor',
  component: VitalSignsMonitor,
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4 bg-slate-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VitalSignsMonitor>;

const mockFactors = [
  { id: 'judicial', name: 'Judicial Independence', dangerThreshold: 60 },
  { id: 'federalism', name: 'Federalism', dangerThreshold: 55 },
  { id: 'political', name: 'Political Opposition', dangerThreshold: 65 },
  { id: 'media', name: 'Media Freedom', dangerThreshold: 60 },
  { id: 'civil', name: 'Civil Society', dangerThreshold: 55 },
  { id: 'publicOpinion', name: 'Public Opinion', dangerThreshold: 50 },
  { id: 'mobilizationalBalance', name: 'Mobilization Balance', dangerThreshold: 60 },
  { id: 'stateCapacity', name: 'State Capacity', dangerThreshold: 65 },
  { id: 'corporateCompliance', name: 'Corporate Compliance', dangerThreshold: 70 },
  { id: 'electionInterference', name: 'Election Integrity', dangerThreshold: 50 },
];

const mixedScores: Record<string, number> = {
  judicial: 45,
  federalism: 35,
  political: 70,
  media: 65,
  civil: 30,
  publicOpinion: 55,
  mobilizationalBalance: 40,
  stateCapacity: 25,
  corporateCompliance: 75,
  electionInterference: 20,
};

const mixedTrends: Record<string, string> = {
  judicial: 'worsening',
  federalism: 'stable',
  political: 'worsening',
  media: 'worsening',
  civil: 'improving',
  publicOpinion: 'stable',
  mobilizationalBalance: 'stable',
  stateCapacity: 'improving',
  corporateCompliance: 'worsening',
  electionInterference: 'stable',
};

export const Default: Story = {
  args: {
    factors: mockFactors,
    scores: mixedScores,
    trends: mixedTrends,
    overallScore: 46,
    showCriticalFactors: false,
  },
};

export const WithCriticalFactors: Story = {
  args: {
    factors: mockFactors,
    scores: mixedScores,
    trends: mixedTrends,
    overallScore: 46,
    showCriticalFactors: true,
  },
};

export const HealthyDemocracy: Story = {
  args: {
    factors: mockFactors,
    scores: {
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
    },
    overallScore: 21,
    showCriticalFactors: true,
  },
};

export const CriticalState: Story = {
  args: {
    factors: mockFactors,
    scores: {
      judicial: 75,
      federalism: 65,
      political: 80,
      media: 85,
      civil: 70,
      publicOpinion: 75,
      mobilizationalBalance: 70,
      stateCapacity: 60,
      corporateCompliance: 90,
      electionInterference: 65,
    },
    overallScore: 73.5,
    showCriticalFactors: true,
  },
};
