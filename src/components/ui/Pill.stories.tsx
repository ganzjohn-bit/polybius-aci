import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Pill from './Pill';

const meta: Meta<typeof Pill> = {
  title: 'UI/Pill',
  component: Pill,
  args: {
    tone: 'green',
    size: 'sm',
    children: 'Status'
  }
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Pill tone="green">Green</Pill>
      <Pill tone="yellow">Yellow</Pill>
      <Pill tone="red">Red</Pill>
      <Pill tone="blue">Blue</Pill>
      <Pill tone="amber">Amber</Pill>
      <Pill tone="purple">Purple</Pill>
      <Pill tone="slate">Slate</Pill>
      <Pill tone="pink">Pink</Pill>
      <Pill tone="cyan">Cyan</Pill>
      <Pill tone="orange">Orange</Pill>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Pill tone="red" variant="soft">Soft</Pill>
        <Pill tone="green" variant="soft">Soft</Pill>
        <Pill tone="blue" variant="soft">Soft</Pill>
      </div>
      <div className="flex flex-wrap gap-2">
        <Pill tone="red" variant="strong">Strong</Pill>
        <Pill tone="green" variant="strong">Strong</Pill>
        <Pill tone="blue" variant="strong">Strong</Pill>
      </div>
      <div className="flex flex-wrap gap-2">
        <Pill tone="red" variant="solid">Solid</Pill>
        <Pill tone="green" variant="solid">Solid</Pill>
        <Pill tone="blue" variant="solid">Solid</Pill>
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Pill tone="blue" size="xs">Extra Small</Pill>
      <Pill tone="blue" size="sm">Small</Pill>
    </div>
  )
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Pill tone="red" variant="solid" className="font-bold">CRITICAL</Pill>
        <Pill tone="red" variant="strong" className="font-bold">OUTLIER ↑</Pill>
        <Pill tone="green" variant="strong" className="font-bold">OUTLIER ↓</Pill>
      </div>
      <div className="flex flex-wrap gap-2">
        <Pill tone="red" variant="soft" className="font-bold">MOST STRESS</Pill>
        <Pill tone="green" variant="soft" className="font-bold">LEAST STRESS</Pill>
      </div>
      <div className="flex flex-wrap gap-2">
        <Pill tone="blue" variant="soft">Institutionalist</Pill>
        <Pill tone="purple" variant="soft">Class/Economic</Pill>
        <Pill tone="pink" variant="soft">Cultural/Social</Pill>
        <Pill tone="cyan" variant="soft">Elite/Strategic</Pill>
        <Pill tone="orange" variant="soft">Process/Dynamic</Pill>
      </div>
      <div className="flex flex-wrap gap-2">
        <Pill tone="red" variant="strong" size="sm">consolidated</Pill>
        <Pill tone="green" variant="strong" size="sm">resisted</Pill>
        <Pill tone="blue" variant="strong" size="sm">ongoing</Pill>
      </div>
    </div>
  )
};
