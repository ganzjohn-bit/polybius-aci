'use client';

import { Activity } from 'lucide-react';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';

interface TopIndicator {
  indicator: string;
  count: number;
}

interface BlueskyCardProps {
  bluesky: {
    country: string;
    totalPosts?: number;
    sentimentBreakdown: { negative: number; neutral: number; positive: number };
    topIndicators?: TopIndicator[];
    temperature: number;
    interpretation: string[];
  };
  showDetails?: boolean;
}

export default function BlueskyCard({ bluesky, showDetails = false }: BlueskyCardProps) {
  const temperatureTone = bluesky.temperature < 40 ? 'green' : bluesky.temperature < 70 ? 'yellow' : 'red';

  return (
    <Card
      className={showDetails ? 'border-sky-200' : 'border-blue-200'}
      title={showDetails ? `Bluesky: ${bluesky.country}` : 'Bluesky Discourse'}
      icon={Activity}
      iconColor={showDetails ? 'text-sky-500' : 'text-blue-600'}
      headerContent={
        <Pill tone={temperatureTone} size="sm" className="font-bold">
          {bluesky.temperature}/100
        </Pill>
      }
    >
      <div className={`flex gap-4 mb-3 text-sm ${showDetails ? 'mb-4' : ''}`}>
        {showDetails ? (
          <>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-slate-600">Negative: {bluesky.sentimentBreakdown.negative}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="text-slate-600">Neutral: {bluesky.sentimentBreakdown.neutral}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-slate-600">Positive: {bluesky.sentimentBreakdown.positive}</span>
            </div>
            {bluesky.totalPosts && (
              <div className="text-slate-500">({bluesky.totalPosts} posts)</div>
            )}
          </>
        ) : (
          <>
            <span className="text-red-600">Negative: {bluesky.sentimentBreakdown.negative}</span>
            <span className="text-gray-600">Neutral: {bluesky.sentimentBreakdown.neutral}</span>
            <span className="text-green-600">Positive: {bluesky.sentimentBreakdown.positive}</span>
          </>
        )}
      </div>

      {showDetails && bluesky.topIndicators && bluesky.topIndicators.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-slate-600 mb-2">Top Concerns:</div>
          <div className="flex flex-wrap gap-2">
            {bluesky.topIndicators.slice(0, 6).map((ind, i) => (
              <span key={i} className="px-2 py-1 bg-sky-50 text-sky-700 text-xs rounded-full border border-sky-200">
                {ind.indicator} ({ind.count})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1">
        {bluesky.interpretation.map((line, index) => (
          <div key={index} className={`text-sm ${showDetails ? 'p-2 rounded' : ''} ${
            (line.includes('HIGH STRESS') || line.includes('WARNING'))
              ? (showDetails ? 'bg-red-50 text-red-800 border-l-4 border-red-400' : 'text-red-700 font-medium')
              : 'text-slate-600'
          }`}>
            {line}
          </div>
        ))}
      </div>
    </Card>
  );
}
