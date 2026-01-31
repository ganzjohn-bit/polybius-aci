'use client';

import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';

interface CategoryAggregate {
  category: string;
  avgInterest?: number;
  averageInterest?: number;
  avgChange?: number;
  hasSpike?: boolean;
  trend?: string;
  topKeyword?: string | null;
  topQueries?: string[];
}

interface TrendsCardProps {
  trends: {
    country: string;
    categoryAggregates?: CategoryAggregate[];
    overallTemperature: number;
    interpretation: string[];
    errors?: string[];
  };
  showDetails?: boolean;
}

export default function TrendsCard({ trends, showDetails = false }: TrendsCardProps) {
  const temperatureTone = trends.overallTemperature < 40 ? 'green' : trends.overallTemperature < 70 ? 'yellow' : 'red';

  return (
    <Card
      className="border-purple-200"
      title={`Google Trends: ${trends.country}`}
      icon={Search}
      iconColor="text-purple-600"
      headerContent={
        <Pill tone={temperatureTone} size="sm" className="font-bold">
          {trends.overallTemperature}/100
        </Pill>
      }
    >
      {showDetails && trends.categoryAggregates && trends.categoryAggregates.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {trends.categoryAggregates.map(cat => {
            const interest = cat.avgInterest ?? cat.averageInterest ?? 0;
            const change = cat.avgChange ?? 0;
            return (
              <div key={cat.category} className={`p-2 rounded-lg text-center ${
                cat.hasSpike ? 'bg-red-50 border border-red-200' : 'bg-slate-50 border border-slate-200'
              }`}>
                <div className="text-xs font-medium text-slate-500 capitalize">{cat.category}</div>
                <div className="text-lg font-bold text-slate-800">{interest}</div>
                {change !== 0 && (
                  <div className={`text-xs flex items-center justify-center gap-1 ${
                    change > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {change > 0 ? '+' : ''}{change}%
                  </div>
                )}
                {cat.hasSpike && <span className="text-xs text-red-600 font-medium">SPIKE</span>}
              </div>
            );
          })}
        </div>
      )}
      <div className="space-y-1">
        {trends.interpretation.map((line, index) => (
          <div key={index} className={`text-sm ${showDetails ? 'p-2 rounded' : ''} ${
            (line.includes('WARNING') || line.includes('ALERT') || line.includes('SIGNAL'))
              ? (showDetails ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-400' : 'text-amber-700 font-medium')
              : 'text-slate-600'
          }`}>
            {line}
          </div>
        ))}
      </div>
      {showDetails && trends.errors && trends.errors.length > 0 && (
        <div className="mt-3 text-xs text-slate-400">
          {trends.errors.length} search terms failed to load
        </div>
      )}
    </Card>
  );
}
