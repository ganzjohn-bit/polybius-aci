import type { Factor, FactorResult, Scores } from '@/types/calculator';
import VitalSignsMonitorBase from '@/components/ui/VitalSignsMonitor';

interface VitalSignsMonitorProps {
  scores: Scores;
  factorResults: Record<string, FactorResult>;
  overallScore: number;
  factors: Factor[];
}

export default function VitalSignsMonitor({ scores, factorResults, overallScore, factors }: VitalSignsMonitorProps) {
  // Extract trends from factor results
  const trends: Record<string, string | undefined> = {};
  factors.forEach(factor => {
    trends[factor.id] = factorResults?.[factor.id]?.trend;
  });

  return (
    <VitalSignsMonitorBase
      factors={factors}
      scores={scores}
      trends={trends}
      overallScore={overallScore}
      showCriticalFactors={false}
    />
  );
}
