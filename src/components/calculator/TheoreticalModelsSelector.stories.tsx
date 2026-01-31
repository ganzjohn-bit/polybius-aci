import type { Meta, StoryObj } from '@storybook/react';
import TheoreticalModelsSelector from './TheoreticalModelsSelector';
import { theoreticalModels } from '@/data/calculator-constants';

const meta: Meta<typeof TheoreticalModelsSelector> = {
  title: 'Calculator/TheoreticalModelsSelector',
  component: TheoreticalModelsSelector,
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TheoreticalModelsSelector>;

export const Default: Story = {
  args: {
    models: theoreticalModels,
    activeModels: {},
    onToggleModel: () => {},
  },
};

export const WithSomeSelected: Story = {
  args: {
    models: theoreticalModels,
    activeModels: {
      linz: true,
      levitsky: true,
      gramscian: false,
    },
    onToggleModel: () => {},
  },
};

export const AllSelected: Story = {
  args: {
    models: theoreticalModels,
    activeModels: Object.fromEntries(theoreticalModels.map(m => [m.id, true])),
    onToggleModel: () => {},
  },
};
