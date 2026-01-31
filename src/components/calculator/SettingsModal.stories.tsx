import type { Meta, StoryObj } from '@storybook/react';
import SettingsModal from './SettingsModal';

const meta: Meta<typeof SettingsModal> = {
  title: 'Calculator/SettingsModal',
  component: SettingsModal,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-100 p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SettingsModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    apiKey: '',
    newsApiKey: '',
    onClose: () => {},
    onApiKeyChange: () => {},
    onNewsApiKeyChange: () => {},
    onSave: () => {},
  },
};

export const WithPrefilledKeys: Story = {
  args: {
    isOpen: true,
    apiKey: 'sk-ant-api03-xxxxx',
    newsApiKey: 'abc123newskey',
    onClose: () => {},
    onApiKeyChange: () => {},
    onNewsApiKeyChange: () => {},
    onSave: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    apiKey: '',
    newsApiKey: '',
    onClose: () => {},
    onApiKeyChange: () => {},
    onNewsApiKeyChange: () => {},
    onSave: () => {},
  },
};
