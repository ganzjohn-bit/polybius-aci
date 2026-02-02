import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HistoricalCaseCard from './HistoricalCaseCard';

const meta: Meta<typeof HistoricalCaseCard> = {
  title: 'UI/HistoricalCaseCard',
  component: HistoricalCaseCard,
  args: {
    country: 'Weimar Germany',
    period: '1930-1933',
    outcome: 'consolidated',
  },
};

export default meta;

type Story = StoryObj<typeof HistoricalCaseCard>;

export const Consolidated: Story = {};

export const Resisted: Story = {
  args: {
    country: 'France',
    period: '1934-1936',
    outcome: 'resisted',
  },
};

export const Ongoing: Story = {
  args: {
    country: 'Hungary',
    period: '2010-present',
    outcome: 'ongoing',
  },
};

export const WithExtraInfo: Story = {
  args: {
    country: 'Venezuela',
    period: '1999-present',
    outcome: 'consolidated',
    extra: <span className="text-xs text-slate-500">5 models</span>,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="space-y-2">
      <HistoricalCaseCard
        country="Weimar Germany"
        period="1930-1933"
        outcome="consolidated"
        extra={<span className="text-xs text-slate-500">7 models</span>}
      />
      <HistoricalCaseCard
        country="France"
        period="1934-1936"
        outcome="resisted"
        extra={<span className="text-xs text-slate-500">4 models</span>}
      />
      <HistoricalCaseCard
        country="Chile"
        period="1970-1973"
        outcome="consolidated"
        extra={<span className="text-xs text-slate-500">3 models</span>}
      />
    </div>
  ),
};
