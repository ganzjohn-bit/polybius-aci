'use client';

import type { Factor, FactorResult, ResearchResults, Scores } from '@/types/calculator';
import VitalSignsMonitorBase from '@/components/ui/VitalSignsMonitor';

interface VitalSignsMonitorProps {
  factors: Factor[];
  scores: Scores;
  researchResults: ResearchResults | null;
  aciScore: number;
}

export default function VitalSignsMonitor({
  factors,
  scores,
  researchResults,
  aciScore,
}: VitalSignsMonitorProps) {
  // Extract trends from research results
  const trends: Record<string, string | undefined> = {};
  factors.forEach(factor => {
    const result = researchResults?.[factor.id as keyof ResearchResults];
    if (result && typeof result === 'object') {
      trends[factor.id] = (result as FactorResult).trend;
    }
  });

  // Convert Scores to Record<string, number> for the base component
  const scoresRecord: Record<string, number> = {};
  Object.keys(scores).forEach(key => {
    scoresRecord[key] = scores[key as keyof Scores];
  });

  return (
    <VitalSignsMonitorBase
      factors={factors}
      scores={scoresRecord}
      trends={trends}
      overallScore={aciScore}
      showCriticalFactors={true}
    />
  );
}
