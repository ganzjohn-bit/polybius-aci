import { BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import ConsensusBox from '@/components/ui/ConsensusBox';
import HistoricalCaseCard from '@/components/ui/HistoricalCaseCard';

interface HistoricalComparisonProps {
  historicalComparison: {
    averageScore: number;
    mostSimilarCases: { country: string; period: string; outcome: string }[];
    interpretation: string[];
  };
}

export default function HistoricalComparison({ historicalComparison }: HistoricalComparisonProps) {
  return (
    <Card
      variant="section"
      className='bg-amber-50 border-amber-200'
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

      <ConsensusBox score={historicalComparison.averageScore} />

      <div className="mb-4">
        <h5 className="text-sm font-semibold text-slate-700 mb-2">Most Similar Historical Cases</h5>
        <div className="space-y-2">
          {historicalComparison.mostSimilarCases.slice(0, 3).map((caseItem, index) => (
            <HistoricalCaseCard
              key={index}
              country={caseItem.country}
              period={caseItem.period}
              outcome={caseItem.outcome}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {historicalComparison.interpretation.map((line, i) => {
          const lower = line.toLowerCase();
          const cls = lower.includes('warning')
            ? 'text-red-700 font-medium'
            : lower.includes('hopeful')
              ? 'text-green-700 font-medium'
              : 'text-slate-700';
          return <p key={i} className={`text-sm ${cls}`}>{line}</p>;
        })}
      </div>
    </Card>
  );
}
