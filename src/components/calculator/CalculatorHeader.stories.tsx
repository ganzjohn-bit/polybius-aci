import type { Meta, StoryObj } from '@storybook/react';
import CalculatorHeader from './CalculatorHeader';

const meta: Meta<typeof CalculatorHeader> = {
  title: 'Calculator/CalculatorHeader',
  component: CalculatorHeader,
  parameters: {
    layout: 'padded',
  },
  args: {
    onSettingsClick: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof CalculatorHeader>;

export const Default: Story = {};
