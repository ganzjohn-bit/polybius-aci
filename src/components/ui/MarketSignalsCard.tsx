'use client';

import { TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';

interface MarketSignalsCardProps {
  marketSignals: {
    marketConditions: {
      sp500: { level: number; weekChange: number; monthChange?: number; trend: string };
      treasury10y: { yield: number; weekChange?: number; trend: string; elevated?: boolean };
      vix: { level: number; interpretation: string };
      recentVolatility?: string;
    };
    tacoPatternAnalysis?: {
      instancesLast90Days: number;
      patternHolding: boolean;
      marketDisciplineWorking?: boolean;
      summary: string;
    };
    businessSentiment?: {
      overall: string;
      keyHeadlines: string[];
      eliteAlignment: string;
      notableStatements?: string[];
    };
    overallAssessment: {
      marketConstraintLevel: string;
      regimeResponsiveness?: string;
      consolidationImplication: string;
      summary: string;
    };
  };
  showDetails?: boolean;
}

export default function MarketSignalsCard({ marketSignals, showDetails = false }: MarketSignalsCardProps) {
  const constraintTone =
    marketSignals.overallAssessment.consolidationImplication === 'markets_constraining'
      ? 'green'
      : marketSignals.overallAssessment.consolidationImplication === 'markets_enabling'
        ? 'red'
        : 'yellow';

  if (showDetails) {
    return (
      <Card
        className="border-emerald-200"
        title="Financial Market Signals"
        icon={TrendingUp}
        iconColor="text-emerald-600"
        headerContent={
          <span className={`px-2 py-1 rounded font-bold text-sm ${
            marketSignals.overallAssessment.marketConstraintLevel === 'strong' ? 'bg-green-100 text-green-700' :
            marketSignals.overallAssessment.marketConstraintLevel === 'moderate' ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'
          }`}>
            {marketSignals.overallAssessment.marketConstraintLevel.toUpperCase()}
          </span>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="p-2 bg-slate-50 rounded">
            <div className="text-xs text-slate-500">S&P 500</div>
            <div className="font-semibold text-slate-800">{marketSignals.marketConditions.sp500.level.toLocaleString()}</div>
            <div className={`text-xs ${marketSignals.marketConditions.sp500.weekChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Week: {marketSignals.marketConditions.sp500.weekChange >= 0 ? '+' : ''}{marketSignals.marketConditions.sp500.weekChange}%
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <div className="text-xs text-slate-500">10Y Treasury</div>
            <div className="font-semibold text-slate-800">{marketSignals.marketConditions.treasury10y.yield}%</div>
            <div className={`text-xs ${marketSignals.marketConditions.treasury10y.elevated ? 'text-amber-600' : 'text-slate-500'}`}>
              {marketSignals.marketConditions.treasury10y.elevated ? 'Elevated' : 'Normal range'}
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <div className="text-xs text-slate-500">VIX</div>
            <div className="font-semibold text-slate-800">{marketSignals.marketConditions.vix.level}</div>
            <div className={`text-xs ${
              marketSignals.marketConditions.vix.interpretation === 'high' ? 'text-red-600' :
              marketSignals.marketConditions.vix.interpretation === 'elevated' ? 'text-amber-600' :
              'text-green-600'
            }`}>
              {marketSignals.marketConditions.vix.interpretation}
            </div>
          </div>
          {marketSignals.overallAssessment.regimeResponsiveness && (
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-xs text-slate-500">Regime Response</div>
              <div className={`font-semibold ${
                marketSignals.overallAssessment.regimeResponsiveness === 'high' ? 'text-green-700' :
                marketSignals.overallAssessment.regimeResponsiveness === 'medium' ? 'text-amber-700' :
                'text-red-700'
              }`}>
                {marketSignals.overallAssessment.regimeResponsiveness.toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {marketSignals.tacoPatternAnalysis && (
          <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-amber-800">TACO Pattern Analysis</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                marketSignals.tacoPatternAnalysis.patternHolding ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {marketSignals.tacoPatternAnalysis.patternHolding ? 'HOLDING' : 'BROKEN'}
              </span>
            </div>
            <p className="text-sm text-amber-900">{marketSignals.tacoPatternAnalysis.summary}</p>
          </div>
        )}

        <div className="p-3 bg-slate-100 rounded-lg">
          <div className="text-sm font-medium text-slate-700">Overall Assessment:</div>
          <p className="text-sm text-slate-600 mt-1">{marketSignals.overallAssessment.summary}</p>
        </div>
      </Card>
    );
  }

  // Simple display mode
  return (
    <Card
      className="border-emerald-200"
      title="Market Signals"
      headerContent={
        <Pill tone={constraintTone} size="xs">
          {marketSignals.overallAssessment.marketConstraintLevel}
        </Pill>
      }
    >
      <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
        <div className="p-2 bg-slate-50 rounded">
          <div className="text-slate-500">S&P 500</div>
          <div className="font-bold">{marketSignals.marketConditions.sp500.level.toLocaleString()}</div>
          <div
            className={
              marketSignals.marketConditions.sp500.weekChange >= 0 ? 'text-green-600' : 'text-red-600'
            }
          >
            {marketSignals.marketConditions.sp500.weekChange >= 0 ? '+' : ''}
            {marketSignals.marketConditions.sp500.weekChange.toFixed(1)}%
          </div>
        </div>
        <div className="p-2 bg-slate-50 rounded">
          <div className="text-slate-500">10Y Treasury</div>
          <div className="font-bold">{marketSignals.marketConditions.treasury10y.yield.toFixed(2)}%</div>
          <div className="text-slate-600">{marketSignals.marketConditions.treasury10y.trend}</div>
        </div>
        <div className="p-2 bg-slate-50 rounded">
          <div className="text-slate-500">VIX</div>
          <div className="font-bold">{marketSignals.marketConditions.vix.level}</div>
          <div className="text-slate-600">{marketSignals.marketConditions.vix.interpretation}</div>
        </div>
      </div>
      {marketSignals.tacoPatternAnalysis && (
        <div
          className={`p-3 rounded mb-3 ${
            marketSignals.tacoPatternAnalysis.patternHolding
              ? 'bg-green-50 border border-green-200'
              : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <div className="text-sm font-medium mb-1">
            TACO Pattern (Tariff Announced, Chaos Observed): {marketSignals.tacoPatternAnalysis.instancesLast90Days}{' '}
            instances
          </div>
          <div className="text-sm text-slate-600">{marketSignals.tacoPatternAnalysis.summary}</div>
        </div>
      )}
      <p className="text-sm text-slate-700">{marketSignals.overallAssessment.summary}</p>
    </Card>
  );
}
