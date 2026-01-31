import type { Meta, StoryObj } from '@storybook/react';
import CalculatorFooter from './CalculatorFooter';

const meta: Meta<typeof CalculatorFooter> = {
  title: 'Calculator/CalculatorFooter',
  component: CalculatorFooter,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof CalculatorFooter>;

export const Default: Story = {};
