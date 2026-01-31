import type { Meta, StoryObj } from '@storybook/react';
import { Layers } from 'lucide-react';

import SectionCard from './SectionCard';

const meta: Meta<typeof SectionCard> = {
  title: 'UI/SectionCard',
  component: SectionCard,
  args: {
    className: 'bg-slate-50 border-slate-200',
    title: 'Section Card',
    icon: Layers,
    iconColor: 'text-slate-600',
    children: (
      <div>
        <p className="text-sm text-slate-600">Use for major page sections with consistent spacing.</p>
      </div>
    )
  }
};

export default meta;

type Story = StoryObj<typeof SectionCard>;

export const Default: Story = {};
