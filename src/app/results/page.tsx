'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, BookOpen, ExternalLink} from 'lucide-react';
import VitalSignsMonitor from '@/components/ui/VitalSignsMonitor';
import type { Factor, StoredResults } from '@/types/results';
import BlueskyCard from '@/components/ui/BlueskyCard';
import OverallScoreCard from '@/components/ui/OverallScoreCard';
import TrendsCard from '@/components/ui/TrendsCard';
import OpEdCard from '@/components/ui/OpEdCard';
import EliteSignalsCard from '@/components/ui/EliteSignalsCard';
import MarketSignalsCard from '@/components/ui/MarketSignalsCard';
import Card from '@/components/ui/Card';
import ConsensusBox from '@/components/ui/ConsensusBox';
import Pill from '@/components/ui/Pill';

const factors: Factor[] = [
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
  riskLevel: 'Awaiting Analysis',
  scores: {},
  summary: 'No results have been published yet. Results are generated using Claude AI with real-time web search and published from the live analysis tool at app.polybius.world.',
  factorResults: {},
};

export default function ResultsPage() {
  const [results, setResults] = useState<StoredResults | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch directly from blob storage to avoid server-side fetch issues
    const BLOB_URL = 'https://iube3munpbzbmeja.public.blob.vercel-storage.com/results.json';
    fetch(BLOB_URL, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Only update if we got valid data with an ACI score
        if (!data.error && typeof data.aciScore === 'number' && data.aciScore > 0) {
          setResults(data);
        } else {
          setFetchError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch results:', err);
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  // Use fetched results or show defaults only after fetch completes
  const displayResults = results || DEFAULT_RESULTS;

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

  const hasScores = Object.keys(displayResults.scores).length > 0 && Object.values(displayResults.scores).some(s => s > 0);
  const { trends, opEds, eliteSignals, bluesky, marketSignals } = displayResults.socialSignals || {};
  const hasSocialSignals = trends || opEds || eliteSignals || bluesky || marketSignals;

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading results...</div>
      </div>
    );
  }

  // If fetch failed and no results, show error state
  if (fetchError && !results) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-600 mb-4">Unable to load results. Please try again later.</div>
          <a href="https://app.polybius.world" className="text-blue-600 underline">Run live analysis</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/polybius-logo.png"
              alt="Polybius"
              width={80}
              height={96}
              className="w-16 h-20 md:w-20 md:h-24 object-contain"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1 tracking-wide">POLYBIUS</h1>
              <p className="text-slate-600 text-lg italic">Authoritarian Consolidation Index</p>
            </div>
          </div>
          <div className="text-right text-sm text-slate-500">
            <div>Last updated:</div>
            <div className="font-medium">
              {new Date(displayResults.generatedAt).toLocaleDateString('en-US', {
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
        <OverallScoreCard aciScore={displayResults.aciScore} risk={getRiskLevel(displayResults.aciScore)} probability={getProbability(displayResults.aciScore)} />

        {/* Summary */}
        {displayResults.summary && (
          <Card variant="section" title="Analysis Summary" className="bg-slate-50 border-slate-200">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{displayResults.summary}</p>
          </Card>
        )}

        {/* Vital Signs Dashboard */}
        {hasScores && (
          <VitalSignsMonitor
            scores={displayResults.scores}
            overallScore={displayResults.aciScore}
            factors={factors}
          />
        )}

        {/* Social Signals Dashboard */}
        {hasSocialSignals && (
          <Card variant="section" title="Social Signals" icon={Activity} iconColor="text-purple-600" className="bg-purple-50 border-purple-200">
            <div className="space-y-4">
              {/* Trends */}
              {trends && (
                <TrendsCard trends={trends} />
              )}

              {/* Op-Eds / Hegemonic Analysis */}
              {opEds && (
                <OpEdCard opEds={opEds} />
              )}

              {/* Elite Signals */}
              {eliteSignals && (
                <EliteSignalsCard
                  eliteSignals={eliteSignals}
                />
              )}

              {/* Bluesky */}
              {bluesky && (
                <BlueskyCard bluesky={bluesky} />
              )}

              {/* Market Signals */}
              {marketSignals && (
                <MarketSignalsCard
                  marketSignals={marketSignals}
                />
              )}
            </div>
          </Card>
        )}

        {/* Theoretical Model Scores & Diagnoses */}
        {displayResults.modelsUsed && displayResults.modelsUsed.length > 0 && (() => {
          // Compute per-model scores from factor scores + model weights
          const modelScores = displayResults.modelsUsed!.map(model => {
            const score = factors.reduce((total, f) => {
              const factorScore = displayResults.factorResults[f.id]?.score || 0;
              const weight = model.weights[f.id] || 0;
              return total + (factorScore * weight);
            }, 0);
            return { ...model, score };
          }).sort((a, b) => b.score - a.score);

          const meanScore = modelScores.reduce((sum, m) => sum + m.score, 0) / modelScores.length;
          const variance = modelScores.reduce((sum, m) => sum + Math.pow(m.score - meanScore, 2), 0) / modelScores.length;
          const stdDev = Math.sqrt(variance);

          const scored = modelScores.map(m => ({
            ...m,
            isOutlier: Math.abs(m.score - meanScore) > stdDev,
            deviation: m.score - meanScore,
            direction: m.score > meanScore + stdDev ? 'high' as const : m.score < meanScore - stdDev ? 'low' as const : null
          }));

          // Map diagnosis keys to model IDs
          const diagnosisKeyMap: Record<string, string> = {
            gramscian: 'gramscian',
            classical: 'classical',
            bermanRiley: 'bermanRiley',
            svolik: 'svolik',
            levitskyZiblatt: 'levitsky'
          };
          const diagnoses = displayResults.modelDiagnoses || {};
          const getDiagnosis = (modelId: string): string | undefined => {
            // Direct match
            for (const [key, id] of Object.entries(diagnosisKeyMap)) {
              if (id === modelId) return diagnoses[key];
            }
            return diagnoses[modelId];
          };

          const clusterLabels: Record<string, string> = {
            'institutionalist': 'Institutionalist',
            'class-economic': 'Class/Economic',
            'cultural-social': 'Cultural/Social',
            'elite-strategic': 'Elite/Strategic',
            'process-dynamic': 'Process/Dynamic'
          };

          const getRisk = (s: number) => {
            if (s >= 70) return { level: 'Critical', color: 'bg-red-500', textColor: 'text-red-600' };
            if (s >= 50) return { level: 'Elevated', color: 'bg-orange-500', textColor: 'text-orange-600' };
            if (s >= 30) return { level: 'Moderate', color: 'bg-amber-500', textColor: 'text-amber-600' };
            return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-600' };
          };

          return (
            <Card
              variant='section'
              className="bg-blue-50 border-blue-200"
              title="Theoretical Models Applied"
              icon={BookOpen}
              iconColor='text-blue-700'
              headerContent={<span className="text-sm text-slate-500">({displayResults.modelsUsed.length} models)</span>}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-slate-700" />
                <h2 className="text-xl font-bold text-slate-800">Theoretical Model Assessment</h2>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Each model applies its own theoretical weights to the shared factor scores, producing different risk assessments.
                Models flagged as outliers deviate &gt;1 standard deviation from the mean ({meanScore.toFixed(1)}).
              </p>

              {/* Outlier Alert */}
              {scored.filter(m => m.isOutlier).length > 0 && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-sm font-semibold text-amber-800 mb-1">Outlier Models</div>
                  <div className="text-xs text-amber-700 flex flex-wrap gap-2 mt-1">
                    {scored.filter(m => m.isOutlier).map(m => (
                      <Pill key={m.id} tone={m.direction === 'high' ? 'red' : 'green'} variant="soft">
                        {m.name}: {m.score.toFixed(1)} ({m.deviation > 0 ? '+' : ''}{m.deviation.toFixed(1)})
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {/* Model list */}
              <div className="space-y-3">
                {scored.map((model, index) => {
                  const isHighest = index === 0;
                  const isLowest = index === scored.length - 1;
                  const risk = getRisk(model.score);
                  const barWidth = Math.max((model.score / 100) * 100, 2);
                  const diagnosis = getDiagnosis(model.id);

                  return (
                    <div key={model.id} className={`p-4 rounded-lg ${
                      model.isOutlier && model.direction === 'high' ? 'bg-red-50 border-2 border-red-300' :
                      model.isOutlier && model.direction === 'low' ? 'bg-green-50 border-2 border-green-300' :
                      isHighest ? 'bg-red-50 border border-red-200' :
                      isLowest ? 'bg-green-50 border border-green-200' :
                      'bg-white border border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {model.isOutlier && (
                            <Pill tone={model.direction === 'high' ? 'red' : 'green'} variant="strong" className="font-bold">
                              OUTLIER {model.direction === 'high' ? '↑' : '↓'}
                            </Pill>
                          )}
                          {!model.isOutlier && isHighest && <Pill tone="red" variant="soft" className="font-bold">MOST CONCERN</Pill>}
                          {!model.isOutlier && isLowest && <Pill tone="green" variant="soft" className="font-bold">LEAST CONCERN</Pill>}
                          <Pill tone={
                            model.cluster === 'institutionalist' ? 'blue' :
                            model.cluster === 'class-economic' ? 'purple' :
                            model.cluster === 'cultural-social' ? 'pink' :
                            model.cluster === 'elite-strategic' ? 'cyan' :
                            model.cluster === 'process-dynamic' ? 'orange' : 'slate'
                          } variant="soft">
                            {clusterLabels[model.cluster] || model.cluster}
                          </Pill>
                          <span className="font-semibold text-slate-800">{model.name}</span>
                          <span className="text-xs text-slate-500">({model.author})</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-sm font-medium ${risk.textColor}`}>{risk.level}</span>
                          <span className="font-bold text-slate-800 text-lg">{model.score.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-full rounded-full ${risk.color}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      {/* Model diagnosis */}
                      {diagnosis && (
                        <p className="text-sm text-slate-600 italic mt-1">{diagnosis}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Spread & stats */}
              <div className="mt-4 pt-4 border-t border-slate-300">
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div>
                    <strong>Spread:</strong> {(scored[0].score - scored[scored.length - 1].score).toFixed(1)} pts
                    {scored[0].score - scored[scored.length - 1].score > 20 && (
                      <span className="text-amber-700 ml-1">(high disagreement)</span>
                    )}
                  </div>
                  <div>
                    <strong>Mean:</strong> {meanScore.toFixed(1)} | <strong>Std Dev:</strong> {stdDev.toFixed(1)}
                  </div>
                </div>
                {scored[0].score - scored[scored.length - 1].score > 20 && (
                  <p className="text-sm text-amber-700 mt-2">
                    Large spread suggests the situation looks different through different theoretical lenses. Outlier models may detect vulnerabilities or resilience others miss.
                  </p>
                )}
              </div>
            </Card>
          );
        })()}

        {/* Factor Breakdown with Evidence */}
        {Object.keys(displayResults.factorResults).length > 0 && (
          <Card variant="section" title="Factor Analysis" className="bg-white border-slate-200">
            <div className="space-y-4">
              {factors.map(factor => {
                const data = displayResults.factorResults[factor.id];
                if (!data) return null;
                return (
                  <div key={factor.id} className="border-b border-slate-100 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">{factor.name}</span>
                        {data.trend && (() => {
                          const t = data.trend.toLowerCase();
                          const isImproving = t.includes('improv') || t.includes('strengthen') || t.includes('resist');
                          const isDeteriorating = t.includes('deter') || t.includes('worsen') || t.includes('grow') || t.includes('escalat') || t.includes('increas');
                          if (isImproving) return <TrendingDown className="w-4 h-4 text-green-600" />;
                          if (isDeteriorating) return <TrendingUp className="w-4 h-4 text-red-600" />;
                          if (t.includes('stable') || t.includes('unchanged')) return <Minus className="w-4 h-4 text-slate-400" />;
                          return null;
                        })()}
                      </div>
                      <span className={`font-bold ${data.score >= 60 ? 'text-red-600' : data.score >= 40 ? 'text-amber-600' : 'text-green-600'}`}>
                        {data.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div className={`h-full rounded-full ${data.score >= 60 ? 'bg-red-500' : data.score >= 40 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${data.score}%` }} />
                    </div>
                    {data.evidence && <p className="text-sm text-slate-600">{data.evidence}</p>}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Historical Comparison */}
        {displayResults.historicalComparison && (
          <Card
            variant='section'
            title='Historical Comparison'
            icon={BookOpen}
            iconColor='text-amber-700'
          >
            <details className="mb-4 bg-white/60 rounded-lg border border-amber-100">
              <summary className="p-3 text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900">How does this comparison work?</summary>
              <div className="px-3 pb-3 text-sm text-slate-600 space-y-2">
                <p><strong>Data Sources:</strong> V-Dem, Polity Project, and country-specific historiography.</p>
                <p><strong>Cases:</strong> 25+ regime transitions including Weimar Germany, Fascist Italy, Chile, Hungary, Turkey, Venezuela, plus resistance cases.</p>
              </div>
            </details>
            <ConsensusBox score={displayResults.historicalComparison.averageScore} />
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-slate-700 mb-2">Most Similar Historical Cases</h5>
              <div className="space-y-2">
                {displayResults.historicalComparison.mostSimilarCases.slice(0, 3).map((c, i) => (
                  <div key={i} className={`p-3 rounded-lg flex items-center justify-between ${c.outcome === 'consolidated' ? 'bg-red-50 border border-red-200' : c.outcome === 'resisted' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                    <div>
                      <span className="font-medium text-slate-800">{c.country}</span>
                      <span className="text-slate-500 text-sm ml-2">{c.period}</span>
                    </div>
                    <Pill
                      tone={c.outcome === 'consolidated' ? 'red' : c.outcome === 'resisted' ? 'green' : 'blue'}
                      variant="strong"
                      size="sm"
                    >
                      {c.outcome}
                    </Pill>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {displayResults.historicalComparison.interpretation.map((line, i) => (
                <p key={i} className={`text-sm ${line.toLowerCase().includes('warning') ? 'text-red-700 font-medium' : line.toLowerCase().includes('hopeful') ? 'text-green-700 font-medium' : 'text-slate-700'}`}>
                  {line}
                </p>
              ))}
            </div>
          </Card>
        )}

        {/* CTA to Live Tool */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <a href="https://app.polybius.world" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Run Live Analysis
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="/methodology" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
              <BookOpen className="w-4 h-4" />
              Methodology & Source Code
            </a>
          </div>
          <p className="text-sm text-slate-500">Use your own API key to run real-time analysis with the latest data</p>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500 border-t border-slate-200 pt-6">
          <p className="mb-2">Built with theoretical frameworks from Linz, Levitsky & Ziblatt, Gramsci, Paxton, Svolik, Berman, Riley, and others.</p>
          <p>Historical data from <a href="https://v-dem.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">V-Dem</a> and the <a href="https://www.systemicpeace.org/polityproject.html" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Polity Project</a>. Analysis powered by Claude AI.</p>
        </footer>
      </div>
    </div>
  );
}
