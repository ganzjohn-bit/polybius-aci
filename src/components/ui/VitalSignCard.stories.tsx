import type { Meta, StoryObj } from '@storybook/react';
import VitalSignCard from './VitalSignCard';

const meta: Meta<typeof VitalSignCard> = {
  title: 'UI/VitalSignCard',
  component: VitalSignCard,
  decorators: [
    (Story) => (
      <div className="bg-slate-900 p-4 w-40">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof VitalSignCard>;

export const Healthy: Story = {
  args: {
    name: 'Judicial Independence',
    score: 25,
    dangerThreshold: 40,
    trend: 'stable',
  },
};

export const Warning: Story = {
  args: {
    name: 'Media Capture',
    score: 58,
    dangerThreshold: 70,
    trend: 'deteriorating',
  },
};

export const Critical: Story = {
  args: {
    name: 'Political Competition',
    score: 65,
    dangerThreshold: 55,
    trend: 'worsening',
  },
};

export const Improving: Story = {
  args: {
    name: 'Civil Society',
    score: 35,
    dangerThreshold: 65,
    trend: 'improving',
  },
};

export const NoTrend: Story = {
  args: {
    name: 'State Capacity',
    score: 45,
    dangerThreshold: 60,
  },
};
