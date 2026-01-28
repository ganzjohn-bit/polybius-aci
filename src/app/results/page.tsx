'use client';

import { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, BookOpen, ExternalLink, AlertCircle } from 'lucide-react';

// This page displays pre-generated results that are updated 1-2x daily
// The live analysis tool is available at app.polybius.world

interface FactorResult {
  score: number;
  evidence: string;
  trend: string;
}

interface StoredResults {
  generatedAt: string;
  country: string;
  aciScore: number;
  riskLevel: string;
  scores: Record<string, number>;
  summary: string;
  factorResults: Record<string, FactorResult>;
  historicalComparison?: {
    averageScore: number;
    mostSimilarCases: { country: string; period: string; outcome: string }[];
    interpretation: string[];
  };
}

const factors = [
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

const DEFAULT_RESULTS: StoredResults = {
  generatedAt: new Date().toISOString(),
  country: 'United States',
  aciScore: 0,
  riskLevel: 'Loading...',
  scores: {},
  summary: 'Results are generated daily using Claude AI with real-time web search. Check back for the latest analysis.',
  factorResults: {},
};

export default function ResultsPage() {
  const [results, setResults] = useState<StoredResults>(DEFAULT_RESULTS);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetch('/results.json')
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch results:', err);
        setLoading(false);
      });
  }, []);

  const getRiskLevel = (score: number) => {
    if (score < 25) return { level: 'Stable Democracy', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' };
    if (score < 40) return { level: 'Democratic Stress', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' };
    if (score < 50) return { level: 'Competitive Authoritarian Risk', color: 'bg-orange-400', textColor: 'text-orange-700', bgLight: 'bg-orange-50' };
    if (score < 65) return { level: 'DANGER ZONE', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' };
    if (score < 80) return { level: 'Consolidating Authoritarianism', color: 'bg-red-700', textColor: 'text-red-800', bgLight: 'bg-red-100' };
    return { level: 'Authoritarian Regime', color: 'bg-red-900', textColor: 'text-red-900', bgLight: 'bg-red-200' };
  };

  const getProbability = (score: number) => {
    if (score < 25) return '0-5%';
    if (score < 40) return '5-15%';
    if (score < 50) return '15-35%';
    if (score < 65) return '35-60%';
    if (score < 80) return '60-85%';
    return '85%+';
  };

  const hasScores = Object.keys(results.scores).length > 0 && Object.values(results.scores).some(s => s > 0);
  const risk = getRiskLevel(results.aciScore);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Polybius</h1>
            <p className="text-slate-600 text-lg">Authoritarian Consolidation Index</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <div>Last updated:</div>
            <div className="font-medium">
              {new Date(results.generatedAt).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Overall ACI Score</h2>
              <p className="text-slate-600">
                {results.country} | Estimated consolidation probability: <span className="font-semibold">{getProbability(results.aciScore)}</span>
              </p>
            </div>
            <span className="text-6xl font-bold text-slate-800">{results.aciScore.toFixed(1)}</span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-12 mb-4 overflow-hidden">
            <div
              className={`h-full ${risk.color} rounded-full flex items-center justify-end pr-4 transition-all duration-700`}
              style={{ width: `${Math.max(Math.min(results.aciScore, 100), 3)}%` }}
            >
              {results.aciScore > 15 && <span className="text-white font-bold text-lg">{results.aciScore.toFixed(1)}</span>}
            </div>
          </div>

          <div className={`${risk.bgLight} rounded-xl p-5 text-center border-2 ${risk.color.replace('bg-', 'border-')}`}>
            <AlertCircle className={`inline-block w-8 h-8 ${risk.textColor} mb-2`} />
            <div className={`font-bold text-2xl ${risk.textColor}`}>{results.riskLevel}</div>
          </div>
        </div>

        {/* Summary */}
        {results.summary && (
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Analysis Summary</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{results.summary}</p>
          </div>
        )}

        {/* Vital Signs Dashboard */}
        {hasScores && (
          <div className="bg-slate-900 rounded-xl p-6 mb-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-5">
              <Activity className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Democratic Vital Signs</h3>
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <span className={`inline-block w-3 h-3 rounded-full ${results.aciScore < 40 ? 'bg-green-500' : results.aciScore < 60 ? 'bg-yellow-500' : 'bg-red-500'} ${results.aciScore >= 50 ? 'animate-pulse' : ''}`} />
                <span className="text-slate-400 text-sm font-mono">
                  {results.aciScore < 40 ? 'STABLE' : results.aciScore < 60 ? 'ELEVATED' : 'CRITICAL'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {factors.map(factor => {
                const score = results.scores[factor.id] || 0;
                const factorData = results.factorResults?.[factor.id];
                const trend = factorData?.trend;
                const isCritical = score >= factor.dangerThreshold;
                const isWarning = score >= factor.dangerThreshold - 15 && score < factor.dangerThreshold;
                const percentage = score;

                return (
                  <div
                    key={factor.id}
                    className={`relative rounded-lg p-3 ${
                      isCritical ? 'bg-red-950 border border-red-500' :
                      isWarning ? 'bg-yellow-950 border border-yellow-600' :
                      'bg-slate-800 border border-slate-600'
                    }`}
                  >
                    {isCritical && (
                      <div className="absolute inset-0 rounded-lg bg-red-500 opacity-20 animate-pulse" />
                    )}

                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-400 truncate pr-1">
                          {factor.name.replace('/', '/ ').split(' ').slice(0, 2).join(' ')}
                        </span>
                        {isCritical && <span className="text-red-400 text-xs">!</span>}
                      </div>

                      {/* Circular gauge */}
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            className="text-slate-700"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${percentage * 1.76} 176`}
                            className={`${
                              isCritical ? 'text-red-500' :
                              isWarning ? 'text-yellow-500' :
                              score < 30 ? 'text-green-500' : 'text-blue-500'
                            } transition-all duration-700`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-lg font-bold font-mono ${
                            isCritical ? 'text-red-400' :
                            isWarning ? 'text-yellow-400' :
                            'text-white'
                          }`}>
                            {score}
                          </span>
                        </div>
                      </div>

                      {/* Trend indicator */}
                      <div className="flex items-center justify-center gap-1 h-4">
                        {trend && (
                          <>
                            {trend.toLowerCase().includes('improv') && (
                              <><TrendingDown className="w-3 h-3 text-green-400" /><span className="text-xs text-green-400">improving</span></>
                            )}
                            {(trend.toLowerCase().includes('deter') || trend.toLowerCase().includes('worsen')) && (
                              <><TrendingUp className="w-3 h-3 text-red-400" /><span className="text-xs text-red-400">worsening</span></>
                            )}
                            {trend.toLowerCase().includes('stable') && (
                              <><Minus className="w-3 h-3 text-slate-400" /><span className="text-xs text-slate-400">stable</span></>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Factor Breakdown with Evidence */}
        {Object.keys(results.factorResults).length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Factor Analysis</h2>
            <div className="space-y-4">
              {factors.map(factor => {
                const data = results.factorResults[factor.id];
                if (!data) return null;

                return (
                  <div key={factor.id} className="border-b border-slate-100 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">{factor.name}</span>
                        {data.trend && (
                          <>
                            {data.trend.toLowerCase().includes('improv') && <TrendingDown className="w-4 h-4 text-green-600" />}
                            {(data.trend.toLowerCase().includes('deter') || data.trend.toLowerCase().includes('worsen')) && <TrendingUp className="w-4 h-4 text-red-600" />}
                            {data.trend.toLowerCase().includes('stable') && <Minus className="w-4 h-4 text-slate-400" />}
                          </>
                        )}
                      </div>
                      <span className={`font-bold ${
                        data.score >= 60 ? 'text-red-600' :
                        data.score >= 40 ? 'text-amber-600' :
                        'text-green-600'
                      }`}>
                        {data.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-full rounded-full ${
                          data.score >= 60 ? 'bg-red-500' :
                          data.score >= 40 ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${data.score}%` }}
                      />
                    </div>
                    {data.evidence && (
                      <p className="text-sm text-slate-600">{data.evidence}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Historical Comparison */}
        {results.historicalComparison && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-8 border border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <h2 className="text-xl font-bold text-slate-800">Historical Comparison</h2>
            </div>

            {/* Methodology Explanation */}
            <details className="mb-4 bg-white/60 rounded-lg border border-amber-100">
              <summary className="p-3 text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900">
                How does this comparison work?
              </summary>
              <div className="px-3 pb-3 text-sm text-slate-600 space-y-2">
                <p>
                  <strong>Data Sources:</strong> Historical factor scores are derived from the <a href="https://v-dem.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Varieties of Democracy (V-Dem)</a> dataset,
                  the <a href="https://www.systemicpeace.org/polityproject.html" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Polity Project</a>, and country-specific historiography.
                </p>
                <p>
                  <strong>Cases Included:</strong> 25+ documented regime transitions including Weimar Germany (1930-33), Fascist Italy (1921-25),
                  Chile (1970-73), Hungary (2010-present), Turkey (2013-present), Venezuela (1999-present), plus successful resistance cases
                  like France (1934-36), Finland (1930s), and recent democratic resilience in Brazil, Poland, and South Korea.
                </p>
                <p>
                  <strong>Method:</strong> Each theoretical model identifies which historical cases most closely match current conditions based on its
                  weighted factors. A Marxian analysis emphasizes corporate compliance patterns; Levitsky-Ziblatt focuses on judicial capture sequences;
                  Berman-Riley tracks mobilizational balance.
                </p>
                <p>
                  <strong>Key Literature:</strong> Paxton&apos;s <em>Anatomy of Fascism</em>, Berman&apos;s <em>Civil Society and the Collapse of the Weimar Republic</em>,
                  Riley&apos;s <em>The Civic Foundations of Fascism in Europe</em>, Levitsky & Ziblatt&apos;s <em>How Democracies Die</em>,
                  Linz&apos;s <em>Breakdown of Democratic Regimes</em>.
                </p>
              </div>
            </details>

            {/* Consensus Box */}
            <div className={`p-4 rounded-lg mb-4 ${
              results.historicalComparison.averageScore >= 60 ? 'bg-red-100 border border-red-300' :
              results.historicalComparison.averageScore >= 40 ? 'bg-amber-100 border border-amber-300' :
              'bg-green-100 border border-green-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Comparative Prediction</span>
                <span className={`text-2xl font-bold ${
                  results.historicalComparison.averageScore >= 60 ? 'text-red-700' :
                  results.historicalComparison.averageScore >= 40 ? 'text-amber-700' :
                  'text-green-700'
                }`}>
                  {results.historicalComparison.averageScore}/100
                </span>
              </div>
            </div>

            {/* Most Similar Cases */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-slate-700 mb-2">Most Similar Historical Cases</h5>
              <div className="space-y-2">
                {results.historicalComparison.mostSimilarCases.slice(0, 3).map((c, i) => (
                  <div key={i} className={`p-3 rounded-lg flex items-center justify-between ${
                    c.outcome === 'consolidated' ? 'bg-red-50 border border-red-200' :
                    c.outcome === 'resisted' ? 'bg-green-50 border border-green-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    <div>
                      <span className="font-medium text-slate-800">{c.country}</span>
                      <span className="text-slate-500 text-sm ml-2">{c.period}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      c.outcome === 'consolidated' ? 'bg-red-200 text-red-800' :
                      c.outcome === 'resisted' ? 'bg-green-200 text-green-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {c.outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interpretation */}
            <div className="space-y-2">
              {results.historicalComparison.interpretation.map((line, i) => (
                <p key={i} className={`text-sm ${
                  line.toLowerCase().includes('warning') ? 'text-red-700 font-medium' :
                  line.toLowerCase().includes('hopeful') ? 'text-green-700 font-medium' :
                  'text-slate-700'
                }`}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Methodology */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Methodology</h2>
          <div className="text-sm text-slate-600 space-y-3">
            <p>
              <strong>Theoretical Framework:</strong> Polybius synthesizes multiple theories of democratic backsliding including
              Levitsky & Ziblatt (institutional erosion), Berman & Riley (civil society destruction), Linz (presidentialism),
              Svolik (elite coordination), and Gramscian hegemony theory.
            </p>
            <p>
              <strong>Data Sources:</strong> Real-time analysis uses Claude AI with web search to gather current news,
              polling data, and expert assessments. Historical comparisons draw from V-Dem, Polity Project, and academic literature.
            </p>
            <p>
              <strong>Factor Weights:</strong> Different theoretical models weight factors differently. Marxian analysis
              emphasizes corporate compliance; institutionalists focus on judicial capture; Berman-Riley tracks mobilizational balance.
            </p>
          </div>
        </div>

        {/* CTA to Live Tool */}
        <div className="text-center mb-8">
          <a
            href="https://app.polybius.world"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Run Live Analysis
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-sm text-slate-500 mt-2">
            Use your own API key to run real-time analysis with the latest data
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500 border-t border-slate-200 pt-6">
          <p className="mb-2">
            Built with theoretical frameworks from Linz, Levitsky & Ziblatt, Gramsci, Paxton, Svolik, Berman, Riley, and others.
          </p>
          <p>
            Historical data from <a href="https://v-dem.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">V-Dem</a> and
            the <a href="https://www.systemicpeace.org/polityproject.html" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Polity Project</a>.
            Analysis powered by Claude AI.
          </p>
        </footer>
      </div>
    </div>
  );
}
