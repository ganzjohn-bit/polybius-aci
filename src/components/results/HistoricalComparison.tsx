import { BookOpen } from 'lucide-react';
import SectionCard from '@/components/ui/SectionCard';
import Pill from '@/components/ui/Pill';

interface HistoricalComparisonProps {
  historicalComparison: {
    averageScore: number;
    mostSimilarCases: { country: string; period: string; outcome: string }[];
    interpretation: string[];
  };
}

export default function HistoricalComparison({ historicalComparison }: HistoricalComparisonProps) {
  return (
    <SectionCard
      className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
      title="Historical Comparison"
      icon={BookOpen}
      iconColor="text-amber-700"
    >
      <details className="mb-4 bg-white/60 rounded-lg border border-amber-100">
        <summary className="p-3 text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900">
          How does this comparison work?
        </summary>
        <div className="px-3 pb-3 text-sm text-slate-600 space-y-2">
          <p>
            <strong>Data Sources:</strong> V-Dem, Polity Project, and country-specific historiography.
          </p>
          <p>
            <strong>Cases:</strong> 25+ regime transitions including Weimar Germany, Fascist Italy, Chile, Hungary,
            Turkey, Venezuela, plus resistance cases.
          </p>
        </div>
      </details>
      <div
        className={`p-4 rounded-lg mb-4 ${
          historicalComparison.averageScore >= 60
            ? 'bg-red-100 border border-red-300'
            : historicalComparison.averageScore >= 40
              ? 'bg-amber-100 border border-amber-300'
              : 'bg-green-100 border border-green-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">Comparative Prediction</span>
          <span
            className={`text-2xl font-bold ${
              historicalComparison.averageScore >= 60
                ? 'text-red-700'
                : historicalComparison.averageScore >= 40
                  ? 'text-amber-700'
                  : 'text-green-700'
            }`}
          >
            {historicalComparison.averageScore}/100
          </span>
        </div>
      </div>
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-slate-700 mb-2">Most Similar Historical Cases</h5>
        <div className="space-y-2">
          {historicalComparison.mostSimilarCases.slice(0, 3).map((caseItem, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg flex items-center justify-between ${
                caseItem.outcome === 'consolidated'
                  ? 'bg-red-50 border border-red-200'
                  : caseItem.outcome === 'resisted'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <div>
                <span className="font-medium text-slate-800">{caseItem.country}</span>
                <span className="text-slate-500 text-sm ml-2">{caseItem.period}</span>
              </div>
              <Pill
                tone={
                  caseItem.outcome === 'consolidated'
                    ? 'red'
                    : caseItem.outcome === 'resisted'
                      ? 'green'
                      : 'blue'
                }
                variant="strong"
                size="xs"
              >
                {caseItem.outcome}
              </Pill>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {historicalComparison.interpretation.map((line, index) => (
          <p
            key={index}
            className={`text-sm ${
              line.toLowerCase().includes('warning')
                ? 'text-red-700 font-medium'
                : line.toLowerCase().includes('hopeful')
                  ? 'text-green-700 font-medium'
                  : 'text-slate-700'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </SectionCard>
  );
}
