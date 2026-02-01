import type { Meta, StoryObj } from '@storybook/react';
import { Layers, Sparkles } from 'lucide-react';

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

export const ItemVariant: Story = {
  args: {
    variant: 'item',
    title: 'Item Card',
    icon: Sparkles,
    iconColor: 'text-blue-600',
    children: (
      <div>
        <p className="text-sm text-slate-600">Compact card for individual items. Uses p-4 padding, h4 title.</p>
      </div>
    )
  }
};

export const SectionVariant: Story = {
  args: {
    variant: 'section',
    className: 'bg-slate-50 border-slate-200',
    title: 'Section Card',
    icon: Layers,
    iconColor: 'text-slate-600',
    children: (
      <div>
        <p className="text-sm text-slate-600">Use for major page sections with consistent spacing. Uses p-6 padding, h3 title.</p>
      </div>
    )
  }
};

export const WithHeaderContent: Story = {
  args: {
    variant: 'section',
    className: 'bg-amber-50 border-amber-200',
    title: 'Section with Actions',
    icon: Layers,
    iconColor: 'text-amber-700',
    headerContent: (
      <button className="text-sm text-amber-700 hover:text-amber-900">View All</button>
    ),
    children: (
      <div>
        <p className="text-sm text-slate-600">Cards can include header content like buttons or badges.</p>
      </div>
    )
  }
};

export const AsSection: Story = {
  args: {
    variant: 'section',
    as: 'section',
    className: 'bg-blue-50 border-blue-200',
    title: 'Semantic Section',
    icon: Layers,
    iconColor: 'text-blue-700',
    children: (
      <div>
        <p className="text-sm text-slate-600">Use the `as` prop to render as a semantic HTML element.</p>
      </div>
    )
  }
};
