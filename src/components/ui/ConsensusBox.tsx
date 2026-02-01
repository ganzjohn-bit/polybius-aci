import type { ReactNode } from 'react';
import { getScoreBgClass, getScoreBorderClass, getScoreTextClass } from '@/lib/score-colors';

interface ConsensusBoxProps {
  score: number;
  label?: string;
  subtitle?: ReactNode;
}

export default function ConsensusBox({
  score,
  label = 'Comparative Prediction',
  subtitle,
}: ConsensusBoxProps) {
  const bgClass = getScoreBgClass(score);
  const borderClass = getScoreBorderClass(score);
  const textClass = getScoreTextClass(score);

  return (
    <div className={`p-4 rounded-lg mb-4 ${bgClass} border ${borderClass}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className={`text-2xl font-bold ${textClass}`}>{score}/100</span>
      </div>
      {subtitle && <div className="text-sm text-slate-600">{subtitle}</div>}
    </div>
  );
}
