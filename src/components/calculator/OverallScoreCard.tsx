'use client';

import { AlertCircle, Loader2, Upload } from 'lucide-react';
import type { RiskLevel, PublishStatus } from '@/types/calculator';

interface OverallScoreCardProps {
  aciScore: number;
  probability: string;
  risk: RiskLevel;
  hasNonZeroScores: boolean;
  onPublish?: () => void;
  isPublishing?: boolean;
  publishStatus?: PublishStatus | null;
}

export default function OverallScoreCard({
  aciScore,
  probability,
  risk,
  hasNonZeroScores,
  onPublish,
  isPublishing,
  publishStatus,
}: OverallScoreCardProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Overall ACI Score</h2>
          <p className="text-slate-600">Estimated consolidation probability: <span className="font-semibold">{probability}</span></p>
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

      {hasNonZeroScores && onPublish && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center gap-2"
          >
            {isPublishing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isPublishing ? 'Publishing...' : 'Publish to polybius.world'}
          </button>
          {publishStatus && (
            <div className={`text-sm ${publishStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {publishStatus.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
