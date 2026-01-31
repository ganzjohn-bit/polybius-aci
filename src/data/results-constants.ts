import type { Factor, StoredResults } from '@/types/results';

export const factors: Factor[] = [
  { id: 'judicial', name: 'Judicial Independence', dangerThreshold: 40 },
  { id: 'federalism', name: 'Federalism/Regional Resistance', dangerThreshold: 50 },
  { id: 'political', name: 'Political Competition', dangerThreshold: 55 },
  { id: 'media', name: 'Media Capture', dangerThreshold: 70 },
  { id: 'civil', name: 'Civil Society', dangerThreshold: 65 },
  { id: 'publicOpinion', name: 'Public Opinion', dangerThreshold: 55 },
  { id: 'mobilizationalBalance', name: 'Mobilizational Balance', dangerThreshold: 60 },
  { id: 'stateCapacity', name: 'State Capacity', dangerThreshold: 60 },
  { id: 'corporateCompliance', name: 'Corporate Compliance', dangerThreshold: 70 },
  { id: 'electionInterference', name: 'Election Interference', dangerThreshold: 40 }
];

export const DEFAULT_RESULTS: StoredResults = {
  generatedAt: new Date().toISOString(),
  country: 'United States',
  aciScore: 0,
  riskLevel: 'Awaiting Analysis',
  scores: {},
  summary:
    'No results have been published yet. Results are generated using Claude AI with real-time web search and published from the live analysis tool at app.polybius.world.',
  factorResults: {},
  modelsUsed: [
    {
      id: 'levitsky-ziblatt',
      name: 'Levitsky & Ziblatt',
      author: 'Steven Levitsky & Daniel Ziblatt',
      cluster: 'Institutionalist',
      shortDesc: 'Democratic backsliding begins when gatekeeping parties and independent courts erode.',
      fullDesc: 'This framework emphasizes partisan gatekeeping, institutional forbearance, and the role of courts and parties in preventing authoritarian capture. It focuses on incremental erosion of democratic norms through legal and institutional mechanisms.',
      keyWorks: 'How Democracies Die (2018)',
      weights: {
        judicial: 0.2,
        federalism: 0.05,
        political: 0.25,
        media: 0.15,
        civil: 0.1,
        publicOpinion: 0.05,
        mobilizationalBalance: 0.05,
        stateCapacity: 0.05,
        corporateCompliance: 0.05,
        electionInterference: 0.05
      }
    },
    {
      id: 'svolik',
      name: 'Svolik',
      author: 'Milan Svolik',
      cluster: 'Institutionalist',
      shortDesc: 'Authoritarian risk rises when polarization makes voters tolerate democratic violations.',
      fullDesc: 'This model highlights polarization and voter willingness to excuse democratic norm violations when their preferred side benefits. It predicts democratic erosion when partisan incentives outweigh democratic commitments.',
      keyWorks: 'Polarization versus Democracy (2019)',
      weights: {
        judicial: 0.1,
        federalism: 0.05,
        political: 0.15,
        media: 0.1,
        civil: 0.05,
        publicOpinion: 0.2,
        mobilizationalBalance: 0.1,
        stateCapacity: 0.1,
        corporateCompliance: 0.1,
        electionInterference: 0.05
      }
    },
    {
      id: 'berman-riley',
      name: 'Berman-Riley',
      author: 'Sheri Berman & Dylan Riley',
      cluster: 'Civil Society',
      shortDesc: 'Mobilizational balance between regime forces and civil society shapes outcomes.',
      fullDesc: 'This approach focuses on organizational infrastructure and mobilizational capacity. Authoritarian consolidation becomes likely when regime-aligned movements out-organize civil society and opposition networks.',
      keyWorks: 'The Civic Foundations of Fascism in Europe (2019)',
      weights: {
        judicial: 0.05,
        federalism: 0.05,
        political: 0.1,
        media: 0.1,
        civil: 0.1,
        publicOpinion: 0.1,
        mobilizationalBalance: 0.3,
        stateCapacity: 0.05,
        corporateCompliance: 0.1,
        electionInterference: 0.05
      }
    }
  ]
};

export const RISK_LEVELS = [
  {
    maxScore: 25,
    level: 'Stable Democracy',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgLight: 'bg-green-50',
    probability: '0-5%'
  },
  {
    maxScore: 40,
    level: 'Democratic Stress',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgLight: 'bg-yellow-50',
    probability: '5-15%'
  },
  {
    maxScore: 50,
    level: 'Competitive Authoritarian Risk',
    color: 'bg-orange-400',
    textColor: 'text-orange-700',
    bgLight: 'bg-orange-50',
    probability: '15-35%'
  },
  {
    maxScore: 65,
    level: 'DANGER ZONE',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgLight: 'bg-red-50',
    probability: '35-60%'
  },
  {
    maxScore: 80,
    level: 'Consolidating Authoritarianism',
    color: 'bg-red-700',
    textColor: 'text-red-800',
    bgLight: 'bg-red-100',
    probability: '60-85%'
  },
  {
    maxScore: Number.POSITIVE_INFINITY,
    level: 'Authoritarian Regime',
    color: 'bg-red-900',
    textColor: 'text-red-900',
    bgLight: 'bg-red-200',
    probability: '85%+'
  }
];
