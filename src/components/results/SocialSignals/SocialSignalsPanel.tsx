import { Activity } from 'lucide-react';

import type {
  BlueskyData,
  EliteSignalsData,
  MarketSignalsData,
  OpEdData,
  TrendsData
} from '@/types/results';

import TrendsCard from '@/components/ui/TrendsCard';
import OpEdCard from '@/components/ui/OpEdCard';
import EliteSignalsCard from '@/components/ui/EliteSignalsCard';
import BlueskyCard from '@/components/ui/BlueskyCard';
import MarketSignalsCard from '@/components/ui/MarketSignalsCard';
import SectionCard from '@/components/ui/SectionCard';

interface SocialSignalsPanelProps {
  socialSignals?: {
    trends: TrendsData | null;
    opEds: OpEdData | null;
    eliteSignals: EliteSignalsData | null;
    bluesky: BlueskyData | null;
    marketSignals: MarketSignalsData | null;
  };
}

export default function SocialSignalsPanel({ socialSignals }: SocialSignalsPanelProps) {
  const { trends, opEds, eliteSignals, bluesky, marketSignals } = socialSignals || {};

  return (
    <SectionCard
      className="bg-purple-50 border-purple-200"
      title="Social Signals"
      icon={Activity}
      iconColor="text-purple-600"
    >
      <div className="space-y-4">
        {trends && <TrendsCard trends={trends} />}
        {opEds && <OpEdCard opEds={opEds} />}
        {eliteSignals && <EliteSignalsCard eliteSignals={eliteSignals} />}
        {bluesky && <BlueskyCard bluesky={bluesky} />}
        {marketSignals && <MarketSignalsCard marketSignals={marketSignals} />}
      </div>
    </SectionCard>
  );
}
