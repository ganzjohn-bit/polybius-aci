'use client';

import { useState } from 'react';
import { BookOpen, Code, Database, Scale, ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';

export default function MethodologyPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('models');
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const theoreticalModels = [
    {
      id: 'classical',
      name: 'Classical Theory of Tyranny',
      author: 'Aristotle, Polybius',
      cluster: 'Classical',
      keyWorks: 'Politics (Aristotle), Histories (Polybius)',
      description: `The oldest tradition of thinking about democratic breakdown, dating to ancient Greece:
• Anacyclosis: Polybius's theory of regime cycling—democracy degenerates into ochlocracy (mob rule), which enables tyranny
• Demagogue to Tyrant: Aristotle's analysis of how popular leaders subvert law for personal rule
• Corruption of Virtue: Democracy depends on civic virtue; luxury, inequality, and faction corrode it
• Mixed Constitution: Stable regimes balance monarchic, aristocratic, and democratic elements

The classical tradition emphasizes CHARACTER and VIRTUE—both of leaders and citizens—as the ultimate safeguard.`,
      weights: { judicial: 0.20, political: 0.25, publicOpinion: 0.20, civil: 0.15, media: 0.10, mobilizationalBalance: 0.10 }
    },
    {
      id: 'linz',
      name: 'Linzian Presidentialism',
      author: 'Juan Linz',
      cluster: 'Institutionalist',
      keyWorks: 'The Perils of Presidentialism (1990), The Breakdown of Democratic Regimes (1978)',
      description: `Juan Linz argued that presidential systems are inherently more prone to democratic breakdown than parliamentary ones due to:
• Dual Democratic Legitimacy: Both president and legislature claim popular mandates, creating irresolvable conflicts
• Fixed Terms: No institutional mechanism to resolve deadlock short of crisis
• Winner-Take-All: Presidential elections create zero-sum dynamics that exacerbate polarization
• Outsider Appeal: Enables political outsiders to win power without coalitional experience`,
      weights: { judicial: 0.15, federalism: 0.30, political: 0.35, media: 0.05, civil: 0.05, publicOpinion: 0.05, mobilizationalBalance: 0.05 }
    },
    {
      id: 'levitsky',
      name: 'Levitsky & Ziblatt',
      author: 'Steven Levitsky & Daniel Ziblatt',
      cluster: 'Institutionalist',
      keyWorks: 'How Democracies Die (2018), Competitive Authoritarianism (2010)',
      description: `Modern democratic breakdown rarely comes through coups but through elected leaders who gradually subvert institutions:
• Mutual Toleration: Accepting opponents as legitimate, not existential enemies
• Institutional Forbearance: Restraint in using legal powers to their maximum extent
• Gatekeeping Failure: When parties nominate or ally with authoritarian-leaning figures
• Referee Capture: Politicizing courts, election bodies, and law enforcement`,
      weights: { judicial: 0.30, federalism: 0.05, political: 0.20, media: 0.25, electionInterference: 0.15 }
    },
    {
      id: 'marxian',
      name: 'Marxian Class Analysis',
      author: 'Marx, Poulantzas, Miliband',
      cluster: 'Class-Economic',
      keyWorks: 'The Eighteenth Brumaire (Marx), Fascism and Dictatorship (Poulantzas), The State in Capitalist Society (Miliband)',
      description: `Authoritarianism emerges from contradictions in capitalist democracy. When democratic institutions threaten capital accumulation:
• Bonapartism: Strong executive appears "above" class conflict while serving capital
• Relative Autonomy: State has independence but structurally serves capital's long-term interests
• Ideological State Apparatuses: Media, education manufacture consent
• Exceptional State: Fascism as capital's response to working-class threat`,
      weights: { media: 0.25, mobilizationalBalance: 0.10, stateCapacity: 0.15, corporateCompliance: 0.35 }
    },
    {
      id: 'gramscian',
      name: 'Gramscian Hegemony',
      author: 'Antonio Gramsci, Stuart Hall',
      cluster: 'Cultural-Social',
      keyWorks: 'Prison Notebooks (Gramsci), Policing the Crisis (Hall), The Hard Road to Renewal (Hall)',
      description: `Power operates through cultural hegemony—ruling ideas becoming "common sense":
• Hegemony vs. Domination: Stable rule requires consent, not just force
• Organic Crisis: When ruling bloc loses hegemony, creating space for alternatives
• Conjunctural Analysis: Historical moments where multiple forces condense
• Authoritarian Populism: How authoritarian projects win popular consent`,
      weights: { media: 0.30, civil: 0.15, publicOpinion: 0.25, mobilizationalBalance: 0.25 }
    },
    {
      id: 'svolik',
      name: 'Svolik Elite Theory',
      author: 'Milan Svolik',
      cluster: 'Elite-Strategic',
      keyWorks: 'The Politics of Authoritarian Rule (2012), "Polarization versus Democracy" (2019)',
      description: `Focuses on strategic calculations of political elites and voters:
• Elite Defection: Democracy depends on elites choosing to play by democratic rules
• Polarization Trap: When voters tolerate their side's democratic violations
• Information Problems: Voters struggle to distinguish erosion from normal politics
• Coordination Failure: Opposition may fail to coordinate resistance`,
      weights: { judicial: 0.15, political: 0.35, publicOpinion: 0.30, mobilizationalBalance: 0.10 }
    },
    {
      id: 'paxton',
      name: 'Paxtonian Fascist Dynamics',
      author: 'Robert Paxton',
      cluster: 'Process-Dynamic',
      keyWorks: 'The Anatomy of Fascism (2004), Vichy France (1972)',
      description: `Fascism as political process, not fixed ideology, moving through stages:
1. Creation: Movements emerge from crisis
2. Rooting: Establishes in political system
3. Arrival to Power: Conservative elites invite fascists in
4. Exercise of Power: Consolidation choices
5. Radicalization or Entropy

Key insight: Fascism doesn't seize power—it's handed power by elites who fear the left more.`,
      weights: { mobilizationalBalance: 0.35, stateCapacity: 0.20, corporateCompliance: 0.10, publicOpinion: 0.10 }
    },
    {
      id: 'bermanRiley',
      name: 'Dark Side of Social Capital',
      author: 'Sheri Berman, Dylan Riley, Theda Skocpol',
      cluster: 'Cultural-Social',
      keyWorks: 'Civil Society and Weimar Collapse (Berman), Civic Foundations of Fascism (Riley), Tea Party Remaking (Skocpol)',
      description: `Challenges assumption that civil society inherently supports democracy:
• Weimar Paradox: Germany had HIGH associational density—captured by anti-democratic movements
• Civic Foundations of Fascism: Fascism strongest in regions with DENSE civil society
• Organized Minority: An organized minority defeats disorganized majority

What matters is WHO controls mobilizational infrastructure.`,
      weights: { civil: 0.15, mobilizationalBalance: 0.45, publicOpinion: 0.10, media: 0.10 }
    },
    {
      id: 'tocqueville',
      name: 'Tocquevillean Civil Society',
      author: 'Alexis de Tocqueville',
      cluster: 'Cultural-Social',
      keyWorks: 'Democracy in America (1835-1840), The Old Regime and the Revolution (1856)',
      description: `Conditions enabling democracy to avoid authoritarian temptations:
• Associational Life: Voluntary organizations teach democratic habits
• Local Self-Government: Township democracy prevents power concentration
• Civic Virtue: Active citizenship counters privatism and apathy
• Soft Despotism: Danger of paternalistic state that infantilizes citizens`,
      weights: { federalism: 0.30, civil: 0.35, publicOpinion: 0.10, mobilizationalBalance: 0.10 }
    },
  ];

  const factors = [
    { id: 'judicial', name: 'Judicial Independence', description: 'Court independence from executive control, judicial appointments, constitutional review capacity', rubric: '0-20: Independent courts | 21-40: Some pressure | 41-60: Packed/intimidated | 61-80: Rubber stamp | 81-100: Captured' },
    { id: 'federalism', name: 'Federalism/Regional Resistance', description: 'Subnational autonomy, opposition control of states/regions, vertical separation of powers', rubric: '0-20: Strong regional autonomy | 21-40: Some autonomy | 41-60: Encroachment | 61-80: Eliminated | 81-100: Total centralization' },
    { id: 'political', name: 'Political Competition', description: 'Opposition party viability, electoral fairness, legislative independence', rubric: '0-20: Robust competition | 21-40: Some advantages | 41-60: Significant barriers | 61-80: Opposition jailed | 81-100: No opposition' },
    { id: 'media', name: 'Media Capture', description: 'Press freedom, ownership concentration, journalist safety, information ecosystem', rubric: '0-20: Free press | 21-40: Mostly free | 41-60: Major capture | 61-80: Eliminated | 81-100: Total control' },
    { id: 'civil', name: 'Civil Society', description: 'NGO freedom, protest rights, union strength, associational life', rubric: '0-20: Vibrant | 21-40: Some restrictions | 41-60: Foreign agent laws | 61-80: Shut down | 81-100: Total control' },
    { id: 'publicOpinion', name: 'Public Opinion (Regime Approval)', description: 'Executive approval rating converted to score. Higher = regime more popular = consolidation easier.', rubric: 'Approval <35%: Score 0-20 | 35-44%: Score 21-40 | 45-50%: Score 41-50 | 51-57%: Score 51-70 | >57%: Score 71-100' },
    { id: 'mobilizationalBalance', name: 'Mobilizational Balance', description: 'Balance of organized civil society. Regime orgs vs opposition orgs. Per Berman/Riley: what matters is WHO controls infrastructure.', rubric: '0-20: Opposition strong | 21-40: Opposition advantage | 41-60: Balanced | 61-80: Regime advantage | 81-100: Regime dominates' },
    { id: 'stateCapacity', name: 'State Capacity', description: 'Bureaucratic coordination, surveillance capability, and executive coercive control. Measures capacity × loyalty orientation per branch: military, DHS/ICE, FBI/DOJ, local police. Constitutional loyalty pulls score down; regime responsiveness pulls score up.', rubric: '0-20: Constitutionally loyal, no political deployment | 21-40: Mostly constitutional, some executive responsiveness | 41-60: Split loyalty (e.g. military constitutional but DHS regime-oriented) | 61-80: Most services regime-loyal, military neutralized | 81-100: Total regime control, paramilitaries' },
    { id: 'corporateCompliance', name: 'Corporate Compliance', description: 'Business elite alignment, corporate self-censorship, economic pressure compliance', rubric: '0-20: Resist | 21-40: Neutral | 41-60: Compliance | 61-80: Active cooperation | 81-100: Captured' },
    { id: 'electionInterference', name: 'Election Interference', description: 'Voter suppression, electoral fraud, foreign interference, gerrymandering', rubric: '0-20: Free/fair | 21-40: Minor issues | 41-60: Manipulation | 61-80: Systematic fraud | 81-100: Theatrical' },
  ];

  const historicalCases = [
    { country: 'Germany', period: 'Weimar Collapse (1930-1933)', outcome: 'consolidated', score: 100 },
    { country: 'Italy', period: 'Fascist Consolidation (1921-1925)', outcome: 'consolidated', score: 100 },
    { country: 'Chile', period: 'Pinochet Coup (1970-1973)', outcome: 'consolidated', score: 95 },
    { country: 'Venezuela', period: 'Chavez Consolidation (1999-2010)', outcome: 'consolidated', score: 85 },
    { country: 'Hungary', period: 'Orban Consolidation (2010-2022)', outcome: 'consolidated', score: 80 },
    { country: 'Turkey', period: 'Erdogan Consolidation (2013-2018)', outcome: 'consolidated', score: 85 },
    { country: 'France', period: 'Fifth Republic Crisis (1958-1962)', outcome: 'resisted', score: 35 },
    { country: 'Brazil', period: 'Bolsonaro Era (2019-2022)', outcome: 'resisted', score: 45 },
    { country: 'South Korea', period: 'Democratic Transition (1987)', outcome: 'democratized', score: 15 },
    { country: 'Taiwan', period: 'Democratic Transition (1987-1996)', outcome: 'democratized', score: 12 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Methodology</h1>
          <p className="text-slate-600 text-lg">How Polybius ACI works: theoretical foundations, scoring rubrics, data sources, and prompts</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['models', 'factors', 'scoring', 'prompts', 'data', 'code', 'contribute'].map(section => (
            <button
              key={section}
              onClick={() => toggleSection(section)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                expandedSection === section
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Theoretical Models */}
        {expandedSection === 'models' && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Theoretical Models</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Polybius synthesizes multiple theoretical frameworks from comparative politics and political sociology.
              Each model weights the 10 factors differently based on its theoretical assumptions about how democracies die.
            </p>
            <div className="space-y-3">
              {theoreticalModels.map(model => (
                <div key={model.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{model.name}</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{model.cluster}</span>
                      </div>
                      <p className="text-sm text-slate-500">{model.author}</p>
                    </div>
                    {expandedModel === model.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {expandedModel === model.id && (
                    <div className="px-4 pb-4 border-t border-slate-100">
                      <div className="mt-3 text-sm text-slate-700 whitespace-pre-line">{model.description}</div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <div className="text-xs font-medium text-slate-500 mb-2">Key Works:</div>
                        <div className="text-sm text-slate-600 italic">{model.keyWorks}</div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <div className="text-xs font-medium text-slate-500 mb-2">Factor Weights (non-zero):</div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(model.weights)
                            .filter(([, w]) => w > 0)
                            .sort(([, a], [, b]) => b - a)
                            .map(([factorId, weight]) => (
                              <span key={factorId} className="text-xs px-2 py-1 bg-blue-50 text-blue-800 rounded">
                                {factorId}: {(weight * 100).toFixed(0)}%
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Factors */}
        {expandedSection === 'factors' && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-slate-800">The 10 Factors</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Each factor is scored 0-100, where higher scores indicate greater authoritarian consolidation risk.
            </p>
            <div className="space-y-4">
              {factors.map(factor => (
                <div key={factor.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-1">{factor.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{factor.description}</p>
                  <div className="text-xs bg-white p-2 rounded border border-slate-200 font-mono text-slate-700">
                    {factor.rubric}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Scoring Math */}
        {expandedSection === 'scoring' && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-slate-800">Scoring Methodology</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">1. Per-Model Weighted Score</h3>
                <p className="text-sm text-slate-600 mb-2">Each theoretical model produces its own ACI score by weighting the 10 factors according to its theoretical assumptions:</p>
                <pre className="bg-slate-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`modelScore = Σ (factor_score × model_weight[factor])

Example (Levitsky-Ziblatt):
  judicial: 45 × 0.30 = 13.5
  media: 50 × 0.25 = 12.5
  political: 40 × 0.20 = 8.0
  ...
  modelScore = 47.2`}
                </pre>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">2. Ensemble Average</h3>
                <p className="text-sm text-slate-600 mb-2">The final ACI score is the simple average across all active theoretical models:</p>
                <pre className="bg-slate-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`ACI = (1/n) × Σ modelScores

With 8 models active:
ACI = (47.2 + 42.1 + 51.3 + 38.9 + ...) / 8
ACI = 44.6`}
                </pre>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">3. Risk Level Classification</h3>
                <pre className="bg-slate-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`ACI < 25:  "Stable Democracy" (0-5% consolidation probability)
ACI 25-39: "Democratic Stress" (5-15% probability)
ACI 40-49: "Competitive Authoritarian Risk" (15-35% probability)
ACI 50-64: "DANGER ZONE" (35-60% probability)
ACI 65-79: "Consolidating Authoritarianism" (60-85% probability)
ACI ≥ 80:  "Authoritarian Regime" (85%+ probability)`}
                </pre>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">4. Historical Comparison</h3>
                <p className="text-sm text-slate-600 mb-2">Current scores are compared to 25+ historical cases using cosine similarity:</p>
                <pre className="bg-slate-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`similarity = (A · B) / (||A|| × ||B||)

Where A = current factor vector, B = historical case vector
Cases with similarity > 0.85 are considered "most similar"`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* Prompts */}
        {expandedSection === 'prompts' && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-bold text-slate-800">AI Prompts</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Polybius uses Claude (claude-sonnet-4-20250514) with web search enabled for live analysis.
              Here is the core research prompt structure:
            </p>

            <div className="space-y-4">
              <div className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                <div className="text-slate-400 mb-2"># System Context</div>
                <pre className="text-green-400 whitespace-pre-wrap">
{`You are a comparative politics researcher specializing in democratic
backsliding and authoritarian consolidation. Conduct rigorous research
on [COUNTRY] to assess its vulnerability to authoritarian consolidation.

MANDATORY: Use web search to gather current [YEAR] data on:

INSTITUTIONAL FACTORS:
- Judicial independence, court rulings, appointments
- Federalism, regional autonomy, state-level opposition
- Electoral integrity, opposition status, legislative dynamics
- Press freedom, media ownership, journalist safety
- NGO restrictions, protest rights, civil society health
- Security apparatus coordination, surveillance
- Corporate responses to government pressure
- Electoral administration, voter access

PUBLIC OPINION (regime approval, NOT abstract norms):
- Executive approval ratings with demographic breakdowns
- Marxian class analysis: capital owners vs working class
- Weberian status: education polarization
- Elite vs mass divergence`}
                </pre>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                <div className="text-slate-400 mb-2"># Mobilizational Balance Assessment</div>
                <pre className="text-green-400 whitespace-pre-wrap">
{`WEIGHT BY ORG TYPE:
- HIGH: unions (dues-paying, can strike), activated churches, membership orgs
- MEDIUM: 501c4 advocacy orgs, community orgs, worker centers
- LOW: staff-driven 501c3s, policy think tanks

RELIGIOUS MOBILIZATION (assess carefully):
- BLACK CHURCHES: Often MORE activated than white evangelicals
  (Souls to the Polls, voter registration drives)
- EVANGELICAL: Verify actual activation, not assumed
- CATHOLIC: SPLIT - conservative (Catholic Vote) vs progressive
  (Catholic Charities, Nuns on the Bus)
- MAINLINE PROTESTANT: ELCA, UCC lean progressive

Regime-side: evangelical activation (when real), GOP committees,
AFP, Turning Point, militias
Opposition-side: unions, Black churches, mainline Protestant,
progressive Catholic, civil rights chapters`}
                </pre>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                <div className="text-slate-400 mb-2"># Scoring Rubric (excerpt)</div>
                <pre className="text-green-400 whitespace-pre-wrap">
{`PUBLIC_OPINION (REGIME APPROVAL RATING):
  Approval <35% → Score 0-20 (regime deeply unpopular)
  Approval 35-44% → Score 21-40 (regime underwater)
  Approval 45-50% → Score 41-50 (contested)
  Approval 51-57% → Score 51-70 (consolidation enabled)
  Approval >57% → Score 71-100 (consolidation easy)

EXAMPLE: If approval is 42%, score should be ~30-35 (in the
21-40 band), NOT score 42 just because approval is 42%.`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* Data Sources */}
        {expandedSection === 'data' && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-slate-800">Data Sources</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Historical Cases Database</h3>
                <p className="text-sm text-slate-600 mb-3">
                  25+ regime transitions scored on all 10 factors, including both consolidation cases and resistance cases:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {historicalCases.map(c => (
                    <div key={c.country + c.period} className={`p-3 rounded-lg border text-sm ${
                      c.outcome === 'consolidated' ? 'bg-red-50 border-red-200' :
                      c.outcome === 'resisted' ? 'bg-green-50 border-green-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <span className="font-medium">{c.country}</span>
                      <span className="text-slate-500 ml-2">{c.period}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                        c.outcome === 'consolidated' ? 'bg-red-200 text-red-800' :
                        c.outcome === 'resisted' ? 'bg-green-200 text-green-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>{c.outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-2">Primary Data Sources</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 mt-0.5 text-blue-500" />
                    <span><a href="https://v-dem.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">V-Dem (Varieties of Democracy)</a> - Liberal democracy indices, electoral democracy indices, factor-level scores for 200+ countries since 1789</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 mt-0.5 text-blue-500" />
                    <span><a href="https://www.systemicpeace.org/polityproject.html" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Polity Project</a> - Regime authority characteristics, autocracy-democracy spectrum scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 mt-0.5 text-blue-500" />
                    <span><a href="https://freedomhouse.org/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Freedom House</a> - Press freedom, civil liberties, political rights assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 mt-0.5 text-blue-500" />
                    <span>BLS union density statistics, state-level labor organization data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 mt-0.5 text-blue-500" />
                    <span>Country-specific historiography and political science scholarship</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-2">Real-Time Data (Live Mode)</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Claude web search for current news, polling, court decisions</li>
                  <li>• Google Trends API for search interest patterns</li>
                  <li>• Bluesky firehose for social discourse sentiment</li>
                  <li>• NewsAPI for media landscape analysis</li>
                  <li>• Market data APIs for TACO pattern detection (Tariff Announced, Chaos Observed)</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Source Code */}
        {expandedSection === 'code' && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-slate-800" />
              <h2 className="text-2xl font-bold text-slate-800">Source Code</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Download the complete source code for Polybius ACI. All code is open source and available for review, modification, and improvement.
            </p>

            <div className="space-y-4">
              <div className="bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">theoretical-models.ts</h3>
                  <a
                    href="/api/code/models"
                    download="theoretical-models.ts"
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Download
                  </a>
                </div>
                <p className="text-slate-400 text-sm mb-3">All 11 theoretical models with factor weights</p>
                <pre className="text-green-400 text-xs overflow-x-auto max-h-48">{`const theoreticalModels = [
  {
    id: 'linz',
    name: 'Linzian Presidentialism',
    author: 'Juan Linz',
    cluster: 'institutionalist',
    weights: {
      judicial: 0.15, federalism: 0.30, political: 0.35,
      media: 0.05, civil: 0.05, publicOpinion: 0.05,
      mobilizationalBalance: 0.05, stateCapacity: 0.00,
      corporateCompliance: 0.00, electionInterference: 0.00
    },
    // ... full descriptions
  },
  // ... 10 more models
];`}</pre>
              </div>

              <div className="bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">historical-cases.ts</h3>
                  <a
                    href="/api/code/cases"
                    download="historical-cases.ts"
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Download
                  </a>
                </div>
                <p className="text-slate-400 text-sm mb-3">25+ historical cases with factor scores and outcomes</p>
                <pre className="text-green-400 text-xs overflow-x-auto max-h-48">{`export const historicalCases: HistoricalCase[] = [
  {
    id: 'weimar-germany',
    country: 'Germany',
    period: 'Weimar Collapse',
    yearStart: 1930,
    yearEnd: 1933,
    outcome: 'consolidated',
    outcomeScore: 100,
    factors: {
      judicial: 55, federalism: 40, political: 70,
      media: 50, civil: 60, publicOpinion: 75,
      mobilizationalBalance: 70, stateCapacity: 45,
      corporateCompliance: 65, electionInterference: 55
    },
    notes: 'Classic case of democratic breakdown...',
    sources: ['Shirer', 'Evans', 'V-Dem', 'Berman']
  },
  // ... 24 more cases
];`}</pre>
              </div>

              <div className="bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">research-prompt.ts</h3>
                  <a
                    href="/api/code/prompt"
                    download="research-prompt.ts"
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Download
                  </a>
                </div>
                <p className="text-slate-400 text-sm mb-3">Full AI research prompt with scoring rubrics</p>
                <pre className="text-green-400 text-xs overflow-x-auto max-h-48">{`const scoringRubric = \`
SCORING (0-100, higher = more authoritarian):

JUDICIAL: 0-20=independent courts, 21-40=some pressure,
  41-60=packed/intimidated, 61-80=rubber stamp, 81-100=captured

PUBLIC_OPINION (REGIME APPROVAL RATING):
  Approval <35% → Score 0-20 (regime deeply unpopular)
  Approval 35-44% → Score 21-40 (regime underwater)
  Approval 45-50% → Score 41-50 (contested)
  Approval 51-57% → Score 51-70 (consolidation enabled)
  Approval >57% → Score 71-100 (consolidation easy)

MOBILIZATIONAL_BALANCE:
  WEIGHT BY ORG TYPE: HIGH=unions, churches; MEDIUM=501c4s;
  LOW=think tanks. Assess BOTH sides carefully.
  // ... full rubric
\`;`}</pre>
              </div>

              <div className="bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">regression.ts</h3>
                  <a
                    href="/api/code/regression"
                    download="regression.ts"
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Download
                  </a>
                </div>
                <p className="text-slate-400 text-sm mb-3">Historical comparison algorithm</p>
                <pre className="text-green-400 text-xs overflow-x-auto max-h-48">{`// Cosine similarity for case matching
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Find most similar historical cases
export function findSimilarCases(
  currentFactors: FactorScores,
  weights: ModelWeights
): SimilarCase[] {
  return historicalCases
    .map(c => ({
      case: c,
      similarity: cosineSimilarity(
        weightedVector(currentFactors, weights),
        weightedVector(c.factors, weights)
      )
    }))
    .filter(r => r.similarity > 0.85)
    .sort((a, b) => b.similarity - a.similarity);
}`}</pre>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Full Source Code on GitHub</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Get the entire Polybius ACI codebase, including all components, API routes, and data files. Fork it, improve it, submit PRs.
                </p>
                <a
                  href="https://github.com/ganzjohn-bit/polybius-aci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-black"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Contribute */}
        {expandedSection === 'contribute' && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Github className="w-6 h-6 text-slate-800" />
              <h2 className="text-2xl font-bold text-slate-800">How to Help</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Add Historical Cases</h3>
                <p className="text-sm text-blue-700">
                  We need more historical cases for comparison, especially:
                </p>
                <ul className="text-sm text-blue-700 mt-2 list-disc list-inside">
                  <li>Failed consolidation attempts (where democracy held)</li>
                  <li>Non-Western cases (Africa, Asia, Middle East)</li>
                  <li>Recent cases (2010s-2020s)</li>
                  <li>Slow erosion cases (not just coups)</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">Improve Factor Scoring</h3>
                <p className="text-sm text-green-700">
                  Help refine the scoring rubrics:
                </p>
                <ul className="text-sm text-green-700 mt-2 list-disc list-inside">
                  <li>More granular thresholds for each factor</li>
                  <li>Country-specific calibrations</li>
                  <li>Better operationalization of theoretical concepts</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-2">Add Theoretical Models</h3>
                <p className="text-sm text-purple-700">
                  Suggest additional frameworks with specified factor weights:
                </p>
                <ul className="text-sm text-purple-700 mt-2 list-disc list-inside">
                  <li>Institutional economics approaches</li>
                  <li>Comparative historical analysis</li>
                  <li>Feminist/intersectional frameworks</li>
                  <li>Postcolonial perspectives</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">Validate Predictions</h3>
                <p className="text-sm text-amber-700">
                  Track ACI scores over time and compare to actual outcomes:
                </p>
                <ul className="text-sm text-amber-700 mt-2 list-disc list-inside">
                  <li>Did high scores precede backsliding?</li>
                  <li>Did low scores correlate with democratic resilience?</li>
                  <li>Which models were most predictive?</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-300">
                <h3 className="font-bold text-slate-800 mb-2">Technical Architecture</h3>
                <p className="text-sm text-slate-700">
                  Known issues and potential improvements:
                </p>
                <ul className="text-sm text-slate-700 mt-2 list-disc list-inside">
                  <li><strong>Attentional limits:</strong> The single API call has a very long prompt (~8,000+ tokens of rubrics). Some factors get thorough treatment while others look cursory. A multi-pass architecture — parallel calls per factor cluster, then a synthesis pass — could give each rubric full attention while preserving cross-factor awareness in synthesis.</li>
                  <li><strong>Consistency testing:</strong> Run the same query twice and compare outputs. If scores vary wildly between runs, that reveals which factors have unreliable rubric application.</li>
                  <li><strong>Interaction effects:</strong> Some factors interact (state capacity + corporate compliance, judicial + federalism). Currently the prompt hints at these but doesn&apos;t formally model feedback loops or phase-dependent weights.</li>
                  <li><strong>Model consolidation:</strong> 11 models may be cutting too fine. Some could be collapsed (e.g., Linz + Levitsky-Ziblatt + Game Theory into a single &quot;Institutionalist&quot; lens) to reduce false precision while preserving genuinely distinct perspectives.</li>
                  <li><strong>Validation framework:</strong> No systematic way to check if scores track reality over time. Need infrastructure to log scores, compare to subsequent events, and identify which models/factors are actually predictive.</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                <p className="text-slate-700 text-sm">
                  Join the discussion: <a href="https://discord.gg/Ns5f4USV" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Discord</a>
                </p>
                <p className="text-slate-700 text-sm mt-2">
                  Contact: <a href="mailto:methodology@polybius.world" className="text-blue-600 underline">methodology@polybius.world</a>
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  This is an open research project. All methodology is transparent and open to critique.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500 border-t border-slate-200 pt-6 mt-8">
          <div className="flex justify-center gap-4 mb-4">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="https://app.polybius.world" className="text-blue-600 hover:underline">Run Analysis</a>
            <a href="/results" className="text-blue-600 hover:underline">Latest Results</a>
          </div>
          <p>POLYBIUS ACI - Authoritarian Consolidation Index</p>
        </footer>
      </div>
    </div>
  );
}
