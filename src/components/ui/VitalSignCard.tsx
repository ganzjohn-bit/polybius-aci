import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

export interface VitalSignCardProps {
  name: string;
  score: number;
  dangerThreshold: number;
  trend?: string;
}

export default function VitalSignCard({ name, score, dangerThreshold, trend }: VitalSignCardProps) {
  const isCritical = score >= dangerThreshold;
  const isWarning = score >= dangerThreshold - 15 && score < dangerThreshold;

  return (
    <div
      className={`relative rounded-lg p-3 ${
        isCritical
          ? 'bg-red-950 border border-red-500'
          : isWarning
            ? 'bg-yellow-950 border border-yellow-600'
            : 'bg-slate-800 border border-slate-600'
      }`}
    >
      {isCritical && <div className="absolute inset-0 rounded-lg bg-red-500 opacity-20 animate-pulse" />}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400 truncate pr-1">
            {name.replace('/', '/ ').split(' ').slice(0, 2).join(' ')}
          </span>
          {isCritical && <span className="text-red-400 text-xs">⚠</span>}
        </div>
        <div className="relative w-16 h-16 mx-auto mb-2">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-700" />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${score * 1.76} 176`}
              className={`${
                isCritical
                  ? 'text-red-500'
                  : isWarning
                    ? 'text-yellow-500'
                    : score < 30
                      ? 'text-green-500'
                      : 'text-blue-500'
              } transition-all duration-700`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-lg font-bold font-mono ${
                isCritical ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-white'
              }`}
            >
              {score}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 h-4">
          {trend && (
            <>
              {trend.toLowerCase().includes('improv') && (
                <>
                  <TrendingDown className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">improving</span>
                </>
              )}
              {(trend.toLowerCase().includes('deter') || trend.toLowerCase().includes('worsen')) && (
                <>
                  <TrendingUp className="w-3 h-3 text-red-400" />
                  <span className="text-xs text-red-400">worsening</span>
                </>
              )}
              {trend.toLowerCase().includes('stable') && (
                <>
                  <Minus className="w-3 h-3 text-slate-400" />
                  <span className="text-xs text-slate-400">stable</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
