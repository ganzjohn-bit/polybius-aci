import type { Meta, StoryObj } from '@storybook/react';

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
      <Pill tone="green" size="xs">
        Green
      </Pill>
      <Pill tone="yellow" size="xs">
        Yellow
      </Pill>
      <Pill tone="red" size="xs">
        Red
      </Pill>
      <Pill tone="blue" size="xs">
        Blue
      </Pill>
      <Pill tone="amber" size="xs">
        Amber
      </Pill>
      <Pill tone="purple" size="xs">
        Purple
      </Pill>
      <Pill tone="rose" size="xs">
        Rose
      </Pill>
      <Pill tone="emerald" size="xs">
        Emerald
      </Pill>
      <Pill tone="slate" size="xs">
        Slate
      </Pill>
      <Pill tone="red" variant="strong" size="xs">
        Strong
      </Pill>
    </div>
  )
};
