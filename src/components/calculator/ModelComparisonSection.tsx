'use client';

import type { ModelScore, ClusterAverage } from '@/types/calculator';
import SectionCard from '@/components/ui/SectionCard';

interface ModelComparisonSectionProps {
  modelScores: ModelScore[];
  meanScore: number;
  stdDev: number;
  clusterAverages: ClusterAverage[];
  clusterLabels: Record<string, string>;
  hasNonZeroScores: boolean;
}

const clusterColorMap: Record<string, string> = {
  'institutionalist': 'bg-blue-100 text-blue-700',
  'class-economic': 'bg-purple-100 text-purple-700',
  'cultural-social': 'bg-pink-100 text-pink-700',
  'elite-strategic': 'bg-cyan-100 text-cyan-700',
  'process-dynamic': 'bg-orange-100 text-orange-700',
};

export default function ModelComparisonSection({
  modelScores,
  meanScore,
  stdDev,
  clusterAverages,
  clusterLabels,
  hasNonZeroScores,
}: ModelComparisonSectionProps) {
  if (!hasNonZeroScores) return null;

  return (
    <SectionCard className="mb-10 bg-slate-100 border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Theoretical Model Comparison</h3>
      <p className="text-slate-600 text-sm mb-4">How different frameworks interpret the current data</p>

      {/* Cluster Summary */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Cluster Analysis</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {clusterAverages.map((cluster, i) => (
            <div
              key={cluster.cluster}
              className={`p-2 rounded-lg text-center ${
                i === 0
                  ? 'bg-red-50 border border-red-200'
                  : i === clusterAverages.length - 1
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="text-xs font-medium text-slate-500">{cluster.label}</div>
              <div
                className={`text-xl font-bold ${
                  i === 0 ? 'text-red-600' : i === clusterAverages.length - 1 ? 'text-green-600' : 'text-slate-700'
                }`}
              >
                {cluster.avgScore.toFixed(1)}
              </div>
              <div className="text-xs text-slate-400">{cluster.models.length} models</div>
            </div>
          ))}
        </div>
      </div>

      {/* Outlier Alert */}
      {modelScores.filter(m => m.isOutlier).length > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="text-sm font-semibold text-amber-800 mb-1">Outlier Models Detected</div>
          <div className="text-xs text-amber-700">
            These models deviate significantly (&gt;1 std dev) from the mean ({meanScore.toFixed(1)}):
            <div className="mt-1 flex flex-wrap gap-2">
              {modelScores.filter(m => m.isOutlier).map(m => (
                <span
                  key={m.id}
                  className={`px-2 py-0.5 rounded ${
                    m.outlierDirection === 'high' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {m.name}: {m.score.toFixed(1)} ({m.deviationFromMean > 0 ? '+' : ''}
                  {m.deviationFromMean.toFixed(1)})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Model List */}
      <div className="space-y-3">
        {modelScores.map((model, index) => {
          const isHighest = index === 0;
          const isLowest = index === modelScores.length - 1;
          const barWidth = Math.max((model.score / 100) * 100, 2);

          return (
            <div
              key={model.id}
              className={`p-4 rounded-lg ${
                model.isOutlier && model.outlierDirection === 'high'
                  ? 'bg-red-50 border-2 border-red-300 ring-2 ring-red-100'
                  : model.isOutlier && model.outlierDirection === 'low'
                    ? 'bg-green-50 border-2 border-green-300 ring-2 ring-green-100'
                    : isHighest
                      ? 'bg-red-50 border border-red-200'
                      : isLowest
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-white border border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {model.isOutlier && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        model.outlierDirection === 'high' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                      }`}
                    >
                      OUTLIER {model.outlierDirection === 'high' ? '↑' : '↓'}
                    </span>
                  )}
                  {!model.isOutlier && isHighest && (
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">MOST STRESS</span>
                  )}
                  {!model.isOutlier && isLowest && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">LEAST STRESS</span>
                  )}
                  <span className={`text-xs px-1.5 py-0.5 rounded ${clusterColorMap[model.cluster] || 'bg-slate-100 text-slate-600'}`}>
                    {clusterLabels[model.cluster] || model.cluster}
                  </span>
                  <span className="font-semibold text-slate-800">{model.name}</span>
                  <span className="text-xs text-slate-500">({model.author})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${model.risk.textColor}`}>{model.risk.level}</span>
                  <span className="font-bold text-slate-800 text-lg">{model.score.toFixed(1)}</span>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${model.risk.color}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              {model.explanation && <p className="text-sm text-slate-700 mb-3">{model.explanation}</p>}

              <div className="text-xs space-y-1">
                {model.topDrivers.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center">
                    <span className="text-slate-500 font-medium">Driving stress:</span>
                    {model.topDrivers.map((driver, i) => (
                      <span key={driver.id} className="inline-flex items-center">
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            driver.factorScore >= 50 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {driver.name.split('/')[0].split(' ').slice(0, 2).join(' ')} ({driver.factorScore} ×{' '}
                          {driver.weightPercent.toFixed(0)}%)
                        </span>
                        {i < model.topDrivers.length - 1 && <span className="text-slate-400 mx-1">+</span>}
                      </span>
                    ))}
                  </div>
                )}
                {model.lowFactors.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center">
                    <span className="text-slate-500 font-medium">Providing resilience:</span>
                    {model.lowFactors.slice(0, 3).map((factor, i) => (
                      <span key={factor.id} className="inline-flex items-center">
                        <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                          {factor.name.split('/')[0].split(' ').slice(0, 2).join(' ')} ({factor.factorScore})
                        </span>
                        {i < Math.min(model.lowFactors.length, 3) - 1 && <span className="text-slate-400 mx-1">&</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistics Footer */}
      <div className="mt-4 pt-4 border-t border-slate-300">
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <strong>Spread:</strong> {(modelScores[0].score - modelScores[modelScores.length - 1].score).toFixed(1)} points
            {modelScores[0].score - modelScores[modelScores.length - 1].score > 20 && (
              <span className="text-amber-700 ml-1">(high disagreement)</span>
            )}
          </div>
          <div>
            <strong>Mean:</strong> {meanScore.toFixed(1)} | <strong>Std Dev:</strong> {stdDev.toFixed(1)}
          </div>
        </div>
        {modelScores[0].score - modelScores[modelScores.length - 1].score > 20 && (
          <p className="text-sm text-amber-700 mt-2">
            Large spread suggests the situation looks very different through different theoretical lenses.
            Pay attention to outlier models - they may be detecting vulnerabilities others miss.
          </p>
        )}
      </div>
    </SectionCard>
  );
}
