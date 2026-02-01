'use client';

import { Shield, Users, Radio } from 'lucide-react';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';

interface DefectionArticle {
  title: string;
  description?: string;
  source: { name: string };
  figure: string;
  figureRole: string;
  severity: number;
}

interface FigureSummary {
  figure: string;
  role?: string;
  count: number;
  maxSeverity: number;
}

interface PropagandaMetrics {
  blackoutScore?: number;
}

interface EliteSignalsCardProps {
  eliteSignals: {
    defections: {
      articles: DefectionArticle[];
      totalFound: number;
      byFigure?: FigureSummary[];
      coordinationScore: number;
    };
    propaganda: {
      metrics?: PropagandaMetrics;
      effectivenessScore: number;
    };
    interpretation: string[];
  };
  showDetails?: boolean;
}

export default function EliteSignalsCard({ eliteSignals, showDetails = false }: EliteSignalsCardProps) {
  const coordinationTone =
    eliteSignals.defections.coordinationScore > 70
      ? 'red'
      : eliteSignals.defections.coordinationScore > 40
        ? 'yellow'
        : 'green';
  const propagandaTone =
    eliteSignals.propaganda.effectivenessScore > 70
      ? 'red'
      : eliteSignals.propaganda.effectivenessScore > 40
        ? 'yellow'
        : 'green';

  if (showDetails) {
    return (
      <Card className="border-amber-200" title="Elite Signals (US)" icon={Shield} iconColor="text-amber-600">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`p-4 rounded-lg border ${
            eliteSignals.defections.coordinationScore < 50 ? 'bg-red-50 border-red-200' :
            eliteSignals.defections.coordinationScore < 75 ? 'bg-amber-50 border-amber-200' :
            'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="font-medium text-sm">Party Coordination</span>
            </div>
            <div className={`text-3xl font-bold ${
              eliteSignals.defections.coordinationScore < 50 ? 'text-red-600' :
              eliteSignals.defections.coordinationScore < 75 ? 'text-amber-600' :
              'text-green-600'
            }`}>
              {eliteSignals.defections.coordinationScore}/100
            </div>
            <div className="text-xs text-slate-600 mt-2">
              {eliteSignals.defections.totalFound} defection stories found
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            eliteSignals.propaganda.effectivenessScore > 70 ? 'bg-red-50 border-red-200' :
            eliteSignals.propaganda.effectivenessScore > 40 ? 'bg-amber-50 border-amber-200' :
            'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-slate-600" />
              <span className="font-medium text-sm">Propaganda Effectiveness</span>
            </div>
            <div className={`text-3xl font-bold ${
              eliteSignals.propaganda.effectivenessScore > 70 ? 'text-red-600' :
              eliteSignals.propaganda.effectivenessScore > 40 ? 'text-amber-600' :
              'text-green-600'
            }`}>
              {eliteSignals.propaganda.effectivenessScore}/100
            </div>
            {eliteSignals.propaganda.metrics?.blackoutScore !== undefined && (
              <div className="text-xs text-slate-600 mt-2">
                {eliteSignals.propaganda.metrics.blackoutScore}% negative news blocked
              </div>
            )}
          </div>
        </div>

        {eliteSignals.defections.byFigure && eliteSignals.defections.byFigure.length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-medium text-slate-700 mb-2">GOP Figures Breaking Ranks</h5>
            <div className="flex flex-wrap gap-2">
              {eliteSignals.defections.byFigure.slice(0, 6).map((fig, i) => (
                <div key={i} className={`px-2 py-1 rounded text-xs ${
                  fig.maxSeverity > 60 ? 'bg-red-100 text-red-700' :
                  fig.maxSeverity > 40 ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  <span className="font-medium">{fig.figure}</span>
                  <span className="ml-1">{fig.count} stories</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1">
          {eliteSignals.interpretation.map((line, i) => (
            <div key={i} className={`text-sm p-2 rounded ${
              line.includes('FRAGMENTATION') || line.includes('HIGH PROPAGANDA')
                ? 'bg-red-50 text-red-800 border-l-4 border-red-400'
                : 'text-slate-600'
            }`}>
              {line}
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // Simple display mode
  return (
    <Card
      className="border-amber-200"
      title="Elite Signals (GOP Coordination)"
      icon={Shield}
      iconColor="text-amber-600"
      headerContent={
        <>
          <Pill tone={coordinationTone} size="xs">
            Coordination: {eliteSignals.defections.coordinationScore}
          </Pill>
          <Pill tone={propagandaTone} size="xs">
            Propaganda: {eliteSignals.propaganda.effectivenessScore}
          </Pill>
        </>
      }
    >
      {eliteSignals.defections.articles.length > 0 && (
        <div className="mb-3">
          <div className="text-sm font-medium text-slate-600 mb-2">Notable Defections:</div>
          {eliteSignals.defections.articles.slice(0, 3).map((article, index) => (
            <div key={index} className="text-sm text-slate-700 mb-1 p-2 bg-slate-50 rounded">
              <span className="font-medium">{article.figure}</span> ({article.figureRole}):{' '}
              {article.description}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-1">
        {eliteSignals.interpretation.map((line, index) => (
          <p key={index} className="text-sm text-slate-600">
            {line}
          </p>
        ))}
      </div>
    </Card>
  );
}
