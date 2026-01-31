'use client';

import { Activity, Heart } from 'lucide-react';
import SectionCard from '@/components/ui/SectionCard';
import VitalSignCard from '@/components/ui/VitalSignCard';

interface VitalSignFactor {
  id: string;
  name: string;
  dangerThreshold: number;
}

interface VitalSignsMonitorProps {
  factors: VitalSignFactor[];
  scores: Record<string, number>;
  trends?: Record<string, string | undefined>;
  overallScore: number;
  showCriticalFactors?: boolean;
}

export default function VitalSignsMonitor({
  factors,
  scores,
  trends,
  overallScore,
  showCriticalFactors = false,
}: VitalSignsMonitorProps) {
  const statusLabel = overallScore < 40 ? 'STABLE' : overallScore < 60 ? 'ELEVATED' : 'CRITICAL';
  const statusColor = overallScore < 40 ? 'bg-green-500' : overallScore < 60 ? 'bg-yellow-500' : 'bg-red-500';

  const criticalFactors = factors.filter(f => (scores[f.id] || 0) >= f.dangerThreshold);

  return (
    <SectionCard
      className="bg-slate-900 border-slate-700"
      title="Democratic Vital Signs"
      icon={Activity}
      iconColor="text-green-400"
      iconClassName="w-6 h-6"
      titleClassName="text-white"
      headerContent={
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-3 h-3 rounded-full ${statusColor} ${overallScore >= 50 ? 'animate-pulse' : ''}`}
          />
          <span className="text-slate-400 text-sm font-mono">{statusLabel}</span>
        </div>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {factors.map(factor => {
          const score = scores[factor.id] || 0;
          const trend = trends?.[factor.id];

          return (
            <VitalSignCard
              key={factor.id}
              name={factor.name}
              score={score}
              dangerThreshold={factor.dangerThreshold}
              trend={trend}
            />
          );
        })}
      </div>

      {showCriticalFactors && criticalFactors.length > 0 && (
        <div className="mt-4 p-3 bg-red-950 border border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-400">
            <Heart className="w-4 h-4" />
            <span className="font-semibold text-sm">
              {criticalFactors.length} critical indicator{criticalFactors.length > 1 ? 's' : ''}:
            </span>
            <span className="text-red-300 text-sm">
              {criticalFactors.map(f => f.name).join(', ')}
            </span>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
