import type { Meta, StoryObj } from '@storybook/react';
import CountryResearchSection from './CountryResearchSection';

const meta: Meta<typeof CountryResearchSection> = {
  title: 'Calculator/CountryResearchSection',
  component: CountryResearchSection,
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CountryResearchSection>;

export const Default: Story = {
  args: {
    country: '',
    searchMode: 'quick',
    isResearching: false,
    error: null,
    onCountryChange: () => {},
    onSearchModeChange: () => {},
    onResearch: () => {},
  },
};

export const WithCountry: Story = {
  args: {
    country: 'United States',
    searchMode: 'quick',
    isResearching: false,
    error: null,
    onCountryChange: () => {},
    onSearchModeChange: () => {},
    onResearch: () => {},
  },
};

export const Researching: Story = {
  args: {
    country: 'Hungary',
    searchMode: 'quick',
    isResearching: true,
    error: null,
    onCountryChange: () => {},
    onSearchModeChange: () => {},
    onResearch: () => {},
  },
};

export const LiveSearchMode: Story = {
  args: {
    country: 'Turkey',
    searchMode: 'live',
    isResearching: true,
    error: null,
    onCountryChange: () => {},
    onSearchModeChange: () => {},
    onResearch: () => {},
  },
};

export const WithError: Story = {
  args: {
    country: 'Test',
    searchMode: 'quick',
    isResearching: false,
    error: 'Please enter your Anthropic API key first',
    onCountryChange: () => {},
    onSearchModeChange: () => {},
    onResearch: () => {},
  },
};
