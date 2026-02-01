'use client';

import { Loader2, Upload } from 'lucide-react';
import type { RiskLevel, PublishStatus } from '@/types/calculator';
import BaseOverallScoreCard from '@/components/ui/OverallScoreCard';

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
  const actions = hasNonZeroScores && onPublish ? (
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
  ) : null;

  return (
    <BaseOverallScoreCard
      aciScore={aciScore}
      risk={risk}
      probability={probability}
      actions={actions}
    />
  );
}
