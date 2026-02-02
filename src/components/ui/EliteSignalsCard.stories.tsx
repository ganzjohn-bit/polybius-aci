import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EliteSignalsCard from './EliteSignalsCard';

const meta: Meta<typeof EliteSignalsCard> = {
  title: 'UI/EliteSignalsCard',
  component: EliteSignalsCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof EliteSignalsCard>;

const baseEliteSignals = {
  defections: {
    articles: [
      {
        title: 'Senior GOP Senator Breaks with Party on Key Vote',
        description: 'Senator criticizes party leadership in floor speech',
        source: { name: 'Washington Post' },
        figure: 'Senator Smith',
        figureRole: 'Senior Senator',
        severity: 65,
      },
      {
        title: 'Former Cabinet Member Publishes Critical Op-Ed',
        description: 'Ex-official warns of institutional erosion',
        source: { name: 'New York Times' },
        figure: 'John Roberts',
        figureRole: 'Former Secretary',
        severity: 72,
      },
    ],
    totalFound: 12,
    byFigure: [
      { figure: 'Senator Smith', role: 'Senior Senator', count: 4, maxSeverity: 65 },
      { figure: 'Rep. Johnson', role: 'House Member', count: 3, maxSeverity: 55 },
      { figure: 'Gov. Williams', role: 'Governor', count: 2, maxSeverity: 48 },
    ],
    coordinationScore: 58,
  },
  propaganda: {
    metrics: { blackoutScore: 35 },
    effectivenessScore: 52,
  },
  interpretation: [
    'Moderate elite fragmentation detected within party ranks.',
    'Propaganda effectiveness remains at concerning levels.',
    'FRAGMENTATION: Key figures breaking with party line on multiple issues.',
  ],
};

export const Default: Story = {
  args: {
    eliteSignals: baseEliteSignals,
    showDetails: false,
  },
};

export const WithDetails: Story = {
  args: {
    eliteSignals: baseEliteSignals,
    showDetails: true,
  },
};

export const HighCoordination: Story = {
  args: {
    eliteSignals: {
      defections: {
        articles: [],
        totalFound: 2,
        byFigure: [],
        coordinationScore: 85,
      },
      propaganda: {
        metrics: { blackoutScore: 15 },
        effectivenessScore: 25,
      },
      interpretation: [
        'High party coordination observed.',
        'Minimal defection signals detected.',
        'Elite unity remains strong.',
      ],
    },
    showDetails: false,
  },
};

export const LowCoordinationHighPropaganda: Story = {
  args: {
    eliteSignals: {
      defections: {
        articles: baseEliteSignals.defections.articles,
        totalFound: 28,
        byFigure: baseEliteSignals.defections.byFigure,
        coordinationScore: 32,
      },
      propaganda: {
        metrics: { blackoutScore: 72 },
        effectivenessScore: 78,
      },
      interpretation: [
        'FRAGMENTATION: Significant elite defection pattern emerging.',
        'HIGH PROPAGANDA: State-aligned media dominance at critical levels.',
        'Democratic institutional stress indicators elevated.',
      ],
    },
    showDetails: true,
  },
};
