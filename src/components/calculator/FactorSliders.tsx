'use client';

import type { Factor, FactorResult, ResearchResults, Scores } from '@/types/calculator';
import { getTrendIcon } from '@/lib/calculator-utils';

interface FactorSlidersProps {
  factors: Factor[];
  scores: Scores;
  researchResults: ResearchResults | null;
  activeWeights: Record<string, number>;
  onScoreChange: (factorId: string, value: number) => void;
}

export default function FactorSliders({
  factors,
  scores,
  researchResults,
  activeWeights,
  onScoreChange,
}: FactorSlidersProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Structural Components</h3>
      <div className="space-y-5">
        {factors.map(factor => {
          const factorScore = scores[factor.id as keyof Scores];
          const result = researchResults?.[factor.id as keyof ResearchResults];
          const hasResult = result && typeof result === 'object' && 'score' in result;
          const factorResult = hasResult ? (result as FactorResult) : null;

          return (
            <div
              key={factor.id}
              className={`rounded-xl p-5 border-2 transition-colors ${
                factorScore >= factor.dangerThreshold
                  ? 'bg-red-50 border-red-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg text-slate-800">{factor.name}</h4>
                    {factorResult && getTrendIcon(factorResult.trend)}
                    {factorScore >= factor.dangerThreshold && (
                      <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">CRITICAL</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{factor.description}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Weight: {(activeWeights[factor.id] * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="text-3xl font-bold text-slate-800 ml-4">{factorScore}</div>
              </div>

              {factorResult && (
                <div className="mb-4 p-4 bg-white rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-700 leading-relaxed">{factorResult.evidence}</p>
                  {factorResult.sources && (
                    <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">
                      Sources: {factorResult.sources}
                    </p>
                  )}
                </div>
              )}

              <div className="w-full bg-slate-300 rounded-full h-4 mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    factorScore < 30 ? 'bg-green-500' :
                    factorScore < factor.dangerThreshold ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${factorScore}%` }}
                />
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={factorScore}
                onChange={(e) => onScoreChange(factor.id, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0 (Democratic)</span>
                <span>100 (Authoritarian)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
