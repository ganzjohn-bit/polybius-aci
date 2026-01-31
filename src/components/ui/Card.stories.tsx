import type { Meta, StoryObj } from '@storybook/react';
import { Sparkles } from 'lucide-react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  args: {
    className: 'border-slate-200',
    title: 'Card Title',
    icon: Sparkles,
    iconColor: 'text-slate-600',
    children: (
      <div>
        <p className="text-sm text-slate-600">A simple container for content.</p>
      </div>
    )
  }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
