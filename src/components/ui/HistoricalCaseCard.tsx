import { getOutcomeColor, getOutcomeBgClass, getOutcomeBorderClass } from '@/lib/score-colors';
import Pill from '@/components/ui/Pill';

interface HistoricalCaseCardProps {
  country: string;
  period: string;
  outcome: string;
  extra?: React.ReactNode;
}

export default function HistoricalCaseCard({
  country,
  period,
  outcome,
  extra,
}: HistoricalCaseCardProps) {
  const bgClass = getOutcomeBgClass(outcome);
  const borderClass = getOutcomeBorderClass(outcome);
  const tone = getOutcomeColor(outcome);

  return (
    <div className={`p-3 rounded-lg flex items-center justify-between ${bgClass} border ${borderClass}`}>
      <div>
        <span className="font-medium text-slate-800">{country}</span>
        <span className="text-slate-500 text-sm ml-2">{period}</span>
      </div>
      <div className="flex items-center gap-2">
        <Pill tone={tone} variant="strong" size="xs">
          {outcome}
        </Pill>
        {extra}
      </div>
    </div>
  );
}
