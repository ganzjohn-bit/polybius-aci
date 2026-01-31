import { AlertCircle } from 'lucide-react';

import { getProbability, getRiskLevel } from '@/lib/results-utils';

interface OverallScoreCardProps {
  aciScore: number;
  country: string;
}

export default function OverallScoreCard({ aciScore, country }: OverallScoreCardProps) {
  const risk = getRiskLevel(aciScore);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Overall ACI Score</h2>
          <p className="text-slate-600">
            {country} | Estimated consolidation probability:{' '}
            <span className="font-semibold">{getProbability(aciScore)}</span>
          </p>
        </div>
        <span className="text-6xl font-bold text-slate-800">{aciScore.toFixed(1)}</span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-12 mb-4 overflow-hidden">
        <div
          className={`h-full ${risk.color} rounded-full flex items-center justify-end pr-4 transition-all duration-700`}
          style={{ width: `${Math.max(Math.min(aciScore, 100), 3)}%` }}
        >
          {aciScore > 15 && <span className="text-white font-bold text-lg">{aciScore.toFixed(1)}</span>}
        </div>
      </div>

      <div className={`${risk.bgLight} rounded-xl p-5 text-center border-2 ${risk.color.replace('bg-', 'border-')}`}>
        <AlertCircle className={`inline-block w-8 h-8 ${risk.textColor} mb-2`} />
        <div className={`font-bold text-2xl ${risk.textColor}`}>{risk.level}</div>
      </div>
    </div>
  );
}
