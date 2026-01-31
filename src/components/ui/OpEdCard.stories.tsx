import type { Meta, StoryObj } from '@storybook/react';
import OpEdCard from './OpEdCard';

const meta: Meta<typeof OpEdCard> = {
  title: 'UI/OpEdCard',
  component: OpEdCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof OpEdCard>;

const baseOpEds = {
  country: 'United States',
  totalArticles: 47,
  nixonMoments: [
    {
      title: 'Conservative Think Tank Warns of Democratic Erosion',
      description: 'Heritage Foundation fellow breaks with party orthodoxy',
      source: { name: 'Wall Street Journal' },
      url: 'https://example.com/article1',
      nixonType: 'Conservative Self-Criticism',
    },
    {
      title: 'Former Bush Official: We Must Defend Institutions',
      source: { name: 'National Review' },
      url: 'https://example.com/article2',
      nixonType: 'Elite Defection Signal',
    },
  ],
  derivedSignals: {
    eliteDefection: { score: 45, evidence: ['Multiple conservative voices breaking ranks on institutional issues'] },
    hegemnonicCrisis: { score: 38, evidence: ['Legitimacy challenges emerging from traditional allies'] },
    classConflict: { score: 52, evidence: ['Economic anxiety driving populist rhetoric across spectrum'] },
    eliteCoordination: { score: 62, evidence: ['Party discipline weakening on key votes'] },
    baseErosion: { score: 28, evidence: ['Core supporter enthusiasm remains stable'] },
  },
  interpretation: [
    'Elevated signals across multiple theoretical frameworks.',
    'ELITE DEFECTION: Conservative voices showing unusual criticism patterns.',
    'CLASS CONFLICT: Economic themes dominating discourse.',
  ],
};

export const Default: Story = {
  args: {
    opEds: baseOpEds,
    showDetails: false,
  },
};

export const WithDetails: Story = {
  args: {
    opEds: baseOpEds,
    showDetails: true,
  },
};

export const HighEliteDefection: Story = {
  args: {
    opEds: {
      ...baseOpEds,
      derivedSignals: {
        eliteDefection: { score: 78, evidence: ['Unprecedented number of party elites breaking ranks'] },
        hegemnonicCrisis: { score: 65, evidence: ['HEGEMONIC CRISIS: Legitimacy under sustained challenge'] },
        classConflict: { score: 72, evidence: ['Sharp class-based polarization in rhetoric'] },
        eliteCoordination: { score: 35, evidence: ['Party coordination at historic lows'] },
        baseErosion: { score: 55, evidence: ['Core supporter defection signals emerging'] },
      },
      interpretation: [
        'ELITE DEFECTION: Critical threshold exceeded.',
        'HEGEMONIC CRISIS: Multiple legitimacy challenges detected.',
        'CLASS CONFLICT: Economic anxiety at dangerous levels.',
      ],
    },
    showDetails: true,
  },
};

export const NoNixonMoments: Story = {
  args: {
    opEds: {
      country: 'United States',
      totalArticles: 23,
      interpretation: [
        'Standard discourse patterns observed.',
        'No significant cross-partisan criticism detected.',
      ],
    },
    showDetails: false,
  },
};

export const MinimalSignals: Story = {
  args: {
    opEds: {
      country: 'Germany',
      totalArticles: 15,
      derivedSignals: {
        eliteDefection: { score: 12, evidence: ['Minimal defection signals'] },
        hegemnonicCrisis: { score: 8, evidence: ['Stable legitimacy'] },
        classConflict: { score: 18, evidence: ['Normal class discourse'] },
      },
      interpretation: [
        'Low signal environment.',
        'Democratic institutions functioning normally.',
      ],
    },
    showDetails: true,
  },
};
