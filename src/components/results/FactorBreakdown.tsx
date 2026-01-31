import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

import type { Factor, FactorResult } from '@/types/results';
import SectionCard from '@/components/ui/SectionCard';

interface FactorBreakdownProps {
  factorResults: Record<string, FactorResult>;
  factors: Factor[];
}

export default function FactorBreakdown({ factorResults, factors }: FactorBreakdownProps) {
  return (
    <SectionCard className="bg-white border-slate-200" title="Factor Analysis">
      <div className="space-y-4">
        {factors.map(factor => {
          const data = factorResults[factor.id];
          if (!data) return null;
          return (
            <div key={factor.id} className="border-b border-slate-100 pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-700">{factor.name}</span>
                  {data.trend && (
                    <>
                      {data.trend.toLowerCase().includes('improv') && (
                        <TrendingDown className="w-4 h-4 text-green-600" />
                      )}
                      {(data.trend.toLowerCase().includes('deter') ||
                        data.trend.toLowerCase().includes('worsen')) && (
                        <TrendingUp className="w-4 h-4 text-red-600" />
                      )}
                      {data.trend.toLowerCase().includes('stable') && (
                        <Minus className="w-4 h-4 text-slate-400" />
                      )}
                    </>
                  )}
                </div>
                <span
                  className={`font-bold ${
                    data.score >= 60 ? 'text-red-600' : data.score >= 40 ? 'text-amber-600' : 'text-green-600'
                  }`}
                >
                  {data.score}/100
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                <div
                  className={`h-full rounded-full ${
                    data.score >= 60 ? 'bg-red-500' : data.score >= 40 ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
              {data.evidence && <p className="text-sm text-slate-600">{data.evidence}</p>}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
