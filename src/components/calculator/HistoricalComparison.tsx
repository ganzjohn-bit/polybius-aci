'use client';

import { BookOpen, Loader2 } from 'lucide-react';
import type { ComparativeAnalysisData } from '@/types/calculator';
import { getScoreTextClass } from '@/lib/score-colors';
import Card from '@/components/ui/Card';
import ConsensusBox from '@/components/ui/ConsensusBox';
import HistoricalCaseCard from '@/components/ui/HistoricalCaseCard';

interface HistoricalComparisonProps {
  comparativeData: ComparativeAnalysisData | null;
  isFetchingComparative: boolean;
}

export default function HistoricalComparison({
  comparativeData,
  isFetchingComparative,
}: HistoricalComparisonProps) {
  if (isFetchingComparative) {
    return (
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-3">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        <span className="text-blue-700">Running comparative historical analysis...</span>
      </div>
    );
  }

  if (!comparativeData) {
    return null;
  }

  const agreementColorClass =
    comparativeData.consensus.agreementLevel === 'high'
      ? 'text-green-700'
      : comparativeData.consensus.agreementLevel === 'moderate'
        ? 'text-amber-700'
        : 'text-red-700';

  return (
    <Card
      variant="section"
      className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
      title="Historical Comparison"
      icon={BookOpen}
      iconColor="text-amber-700"
    >
      {/* Methodology Explanation */}
      <details className="mb-4 bg-white/60 rounded-lg border border-amber-100">
        <summary className="p-3 text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900">
          How does this comparison work?
        </summary>
        <div className="px-3 pb-3 text-sm text-slate-600 space-y-2">
          <p>
            <strong>Data Sources:</strong> Historical factor scores are derived from the{' '}
            <a href="https://v-dem.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Varieties of Democracy (V-Dem)
            </a>{' '}
            dataset, the{' '}
            <a href="https://www.systemicpeace.org/polityproject.html" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Polity Project
            </a>
            , and country-specific historiography.
          </p>
          <p>
            <strong>Cases Included:</strong> 25+ documented regime transitions including Weimar Germany (1930-33),
            Fascist Italy (1921-25), Chile (1970-73), Hungary (2010-present), Turkey (2013-present),
            Venezuela (1999-present), plus successful resistance cases like France (1934-36),
            Finland (1930s), and recent democratic resilience in Brazil, Poland, and South Korea.
          </p>
          <p>
            <strong>Method:</strong> Each theoretical model identifies which historical cases most closely match
            current conditions based on its weighted factors.
          </p>
          <p>
            <strong>Key Literature:</strong> Paxton&apos;s <em>Anatomy of Fascism</em>, Berman&apos;s{' '}
            <em>Civil Society and the Collapse of the Weimar Republic</em>, Riley&apos;s{' '}
            <em>The Civic Foundations of Fascism in Europe</em>, Levitsky & Ziblatt&apos;s{' '}
            <em>How Democracies Die</em>, Linz&apos;s <em>Breakdown of Democratic Regimes</em>.
          </p>
        </div>
      </details>

      {/* Consensus Box */}
      <ConsensusBox
        score={comparativeData.consensus.averageScore}
        subtitle={
          <>
            Range: {comparativeData.consensus.scoreRange.min}-{comparativeData.consensus.scoreRange.max} |
            Agreement:{' '}
            <span className={`font-medium ${agreementColorClass}`}>
              {comparativeData.consensus.agreementLevel}
            </span>
          </>
        }
      />

      {/* Most Similar Historical Cases */}
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-slate-700 mb-2">Most Similar Historical Cases</h5>
        <div className="space-y-2">
          {comparativeData.mostCitedCases.slice(0, 3).map(c => (
            <HistoricalCaseCard
              key={c.caseId}
              country={c.country}
              period={c.period}
              outcome={c.outcome}
              extra={<span className="text-xs text-slate-500">{c.citedBy.length} models</span>}
            />
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="space-y-2">
        {comparativeData.interpretation.map((line, i) => {
          const lower = line.toLowerCase();
          const cls = lower.includes('warning')
            ? 'text-red-700 font-medium'
            : lower.includes('hopeful')
              ? 'text-green-700 font-medium'
              : 'text-slate-700';
          return <p key={i} className={`text-sm ${cls}`}>{line}</p>;
        })}
      </div>

      {/* Model-by-Model Breakdown */}
      <details className="mt-4">
        <summary className="text-sm text-slate-600 cursor-pointer hover:text-slate-800">
          Show model-by-model analysis
        </summary>
        <div className="mt-3 space-y-3">
          {comparativeData.comparativeAnalysis.map(model => (
            <div key={model.modelName} className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-700">{model.modelName}</span>
                <span className={`font-bold ${getScoreTextClass(model.predictedOutcome.score)}`}>
                  {model.predictedOutcome.score}/100
                </span>
              </div>
              {model.theoreticalExplanation && (
                <p className="text-sm text-slate-700 mb-2">{model.theoreticalExplanation}</p>
              )}
              <p className="text-xs text-slate-500 italic">{model.predictedOutcome.reasoning}</p>
              {model.warningSignals.length > 0 && (
                <div className="mt-2 text-xs text-red-600">
                  Warnings: {model.warningSignals.slice(0, 2).join('; ')}
                </div>
              )}
              {model.hopefulSignals.length > 0 && (
                <div className="mt-1 text-xs text-green-600">
                  Hopeful: {model.hopefulSignals.slice(0, 2).join('; ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
    </Card>
  );
}
