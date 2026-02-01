'use client';

import { Activity, BookOpen, Loader2, Search, Shield, TrendingUp } from 'lucide-react';
import type {
  TrendsData,
  OpEdData,
  EliteSignalsData,
  BlueskyData,
  MarketSignalsData,
} from '@/types/calculator';
import Card from '@/components/ui/Card';
import TrendsCard from '@/components/ui/TrendsCard';
import OpEdCard from '@/components/ui/OpEdCard';
import EliteSignalsCard from '@/components/ui/EliteSignalsCard';
import BlueskyCard from '@/components/ui/BlueskyCard';
import MarketSignalsCard from '@/components/ui/MarketSignalsCard';

interface SocialSignalsDashboardProps {
  country: string;
  // Data
  trendsData: TrendsData | null;
  opEdData: OpEdData | null;
  eliteSignalsData: EliteSignalsData | null;
  blueskyData: BlueskyData | null;
  marketSignalsData: MarketSignalsData | null;
  // Loading states
  isFetchingTrends: boolean;
  isFetchingOpEds: boolean;
  isFetchingEliteSignals: boolean;
  isFetchingBluesky: boolean;
  isFetchingMarkets: boolean;
  // Callbacks
  onFetchTrends: () => void;
  onFetchOpEds: () => void;
  onFetchEliteSignals: () => void;
  onFetchBluesky: () => void;
  onFetchMarkets: () => void;
  // Error
  error: string | null;
  // Synthesis
  onSynthesize: () => void;
  hasSocialSignals: boolean;
  hasApiKey: boolean;
}

export default function SocialSignalsDashboard({
  country,
  trendsData,
  opEdData,
  eliteSignalsData,
  blueskyData,
  marketSignalsData,
  isFetchingTrends,
  isFetchingOpEds,
  isFetchingEliteSignals,
  isFetchingBluesky,
  isFetchingMarkets,
  onFetchTrends,
  onFetchOpEds,
  onFetchEliteSignals,
  onFetchBluesky,
  onFetchMarkets,
  error,
  onSynthesize,
  hasSocialSignals,
  hasApiKey,
}: SocialSignalsDashboardProps) {
  return (
    <Card
      variant="section"
      className="bg-purple-50 border-purple-200"
      title="Social Signals"
      icon={Activity}
      iconColor="text-purple-600"
      headerContent={<span className="text-sm text-slate-500">(Trends + Hegemonic Analysis + Elite Signals)</span>}
    >
      {/* Fetch Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={onFetchTrends}
          disabled={isFetchingTrends || !country.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isFetchingTrends ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Fetching Trends...</>
          ) : (
            <><Search className="w-4 h-4" /> Google Trends</>
          )}
        </button>
        <button
          onClick={onFetchOpEds}
          disabled={isFetchingOpEds || !country.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isFetchingOpEds ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Op-Eds...</>
          ) : (
            <><BookOpen className="w-4 h-4" /> Hegemonic Analysis</>
          )}
        </button>
        <button
          onClick={onFetchEliteSignals}
          disabled={isFetchingEliteSignals}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isFetchingEliteSignals ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
          ) : (
            <><Shield className="w-4 h-4" /> Elite Signals (US)</>
          )}
        </button>
        <button
          onClick={onFetchBluesky}
          disabled={isFetchingBluesky}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isFetchingBluesky ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Fetching...</>
          ) : (
            <><Activity className="w-4 h-4" /> Bluesky</>
          )}
        </button>
        <button
          onClick={onFetchMarkets}
          disabled={isFetchingMarkets || !hasApiKey}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isFetchingMarkets ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
          ) : (
            <><TrendingUp className="w-4 h-4" /> Market Signals</>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Signal Cards - using shared components with showDetails=true */}
      <div className="space-y-4">
        {trendsData && (
          <TrendsCard trends={trendsData} showDetails={true} />
        )}

        {opEdData && (
          <OpEdCard opEds={opEdData} showDetails={true} />
        )}

        {eliteSignalsData && (
          <EliteSignalsCard eliteSignals={eliteSignalsData} showDetails={true} />
        )}

        {blueskyData && (
          <BlueskyCard bluesky={blueskyData} showDetails={true} />
        )}

        {marketSignalsData && (
          <MarketSignalsCard marketSignals={marketSignalsData} showDetails={true} />
        )}
      </div>

      {/* Synthesize Button */}
      {hasSocialSignals && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-amber-100 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-slate-800">Synthesize Social Signals</h5>
              <p className="text-sm text-slate-600">Apply insights from social signals to adjust the ACI factor scores</p>
            </div>
            <button
              onClick={onSynthesize}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-amber-700 transition-all"
            >
              Apply to Scores
            </button>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            <strong>Signal mapping:</strong> Trends → Public Opinion, Civil Society, Media | Op-Eds → Corporate, Media, Executive | Elite Signals → Political, Media | Bluesky → Public Opinion
          </div>
        </div>
      )}

      {!hasSocialSignals && (
        <p className="text-sm text-slate-500">
          Enter a country above and click the buttons to analyze search trends, op-ed dynamics, and social media discourse for signs of democratic stress. &quot;Elite Signals&quot; is US-specific and tracks GOP coordination and propaganda effectiveness.
        </p>
      )}
    </Card>
  );
}
