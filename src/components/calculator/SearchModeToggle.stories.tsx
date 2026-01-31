import type { Meta, StoryObj } from '@storybook/react';
import SearchModeToggle from './SearchModeToggle';

const meta: Meta<typeof SearchModeToggle> = {
  title: 'Calculator/SearchModeToggle',
  component: SearchModeToggle,
  decorators: [
    (Story) => (
      <div className="max-w-2xl p-4 bg-blue-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchModeToggle>;

export const Default: Story = {
  args: {
    mode: 'quick',
    onModeChange: () => {},
  },
};

export const QuickSelected: Story = {
  args: {
    mode: 'quick',
    onModeChange: () => {},
  },
};

export const LiveSelected: Story = {
  args: {
    mode: 'live',
    onModeChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    mode: 'quick',
    onModeChange: () => {},
    disabled: true,
  },
};
