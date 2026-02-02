'use client';

import { Users } from 'lucide-react';
import Card from '@/components/ui/Card';

interface DerivedSignal {
  score: number;
  evidence: string[];
}

interface NixonMoment {
  title: string;
  description?: string;
  source: { name: string };
  url?: string;
  nixonType?: string;
}

interface OpEdCardProps {
  opEds: {
    country: string;
    totalArticles: number;
    nixonMoments?: NixonMoment[];
    derivedSignals?: {
      eliteDefection?: DerivedSignal;
      hegemnonicCrisis?: DerivedSignal;
      classConflict?: DerivedSignal;
      eliteCoordination?: DerivedSignal;
      baseErosion?: DerivedSignal;
    };
    interpretation: string[];
  };
  showDetails?: boolean;
}

const signalLabels: Record<string, { name: string; model: string }> = {
  eliteDefection: { name: 'Elite Defection', model: 'Kaleckian/A&R' },
  hegemnonicCrisis: { name: 'Hegemonic Crisis', model: 'Gramscian' },
  classConflict: { name: 'Class Conflict', model: 'Marxian' },
  eliteCoordination: { name: 'Elite Coordination', model: 'Svolik/Game Theory' },
  baseErosion: { name: 'Base Erosion', model: 'Paxton' },
};

export default function OpEdCard({ opEds, showDetails = false }: OpEdCardProps) {
  return (
    <Card
      className="border-rose-200"
      title={showDetails ? `Hegemonic Analysis: ${opEds.country}` : 'Hegemonic Analysis'}
      icon={Users}
      iconColor="text-rose-600"
      headerContent={<span className="text-sm text-slate-500">{opEds.totalArticles} articles</span>}
    >
      {showDetails && opEds.derivedSignals && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {Object.entries(opEds.derivedSignals).map(([key, signal]) => {
            if (!signal) return null;
            const label = signalLabels[key] || { name: key, model: '' };
            return (
              <div key={key} className={`p-3 rounded-lg border ${
                signal.score > 50 ? 'bg-red-50 border-red-200' :
                signal.score > 30 ? 'bg-amber-50 border-amber-200' :
                'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-slate-700">{label.name}</span>
                  <span className={`text-lg font-bold ${
                    signal.score > 50 ? 'text-red-600' :
                    signal.score > 30 ? 'text-amber-600' :
                    'text-slate-600'
                  }`}>{signal.score}</span>
                </div>
                <div className="text-xs text-slate-500 mb-2">Model: {label.model}</div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div className={`h-full rounded-full ${
                    signal.score > 50 ? 'bg-red-500' :
                    signal.score > 30 ? 'bg-amber-500' :
                    'bg-slate-400'
                  }`} style={{ width: `${signal.score}%` }} />
                </div>
                {signal.evidence && signal.evidence.length > 0 && (
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{signal.evidence[0]}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {opEds.nixonMoments && opEds.nixonMoments.length > 0 && (
        <div className="mb-3 p-3 bg-amber-50 rounded border border-amber-200">
          <div className="text-sm font-medium text-amber-800 mb-2">
            {showDetails ? '"Nixon to China" Moments' : 'Nixon-to-China Moments (High Signal)'}
          </div>
          {opEds.nixonMoments.slice(0, 3).map((article, index) => (
            showDetails && article.url ? (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer"
                className="block p-2 bg-white/50 border border-amber-200 rounded hover:bg-amber-100 transition-colors mb-1"
              >
                <div className="text-xs font-medium text-amber-700 mb-1">{article.nixonType}</div>
                <div className="text-sm text-slate-800 line-clamp-1">{article.title}</div>
              </a>
            ) : (
              <div key={index} className="text-sm text-amber-700 mb-1">
                <span className="font-medium">{article.source.name}:</span> {article.title}
                {article.nixonType && (
                  <span className="text-xs ml-2 text-amber-600">({article.nixonType})</span>
                )}
              </div>
            )
          ))}
        </div>
      )}

      <div className="space-y-1">
        {opEds.interpretation.map((line, index) => (
          <div key={index} className={`text-sm ${showDetails ? 'p-2 rounded' : ''} ${
            (line.includes('ELITE DEFECTION') || line.includes('HEGEMONIC CRISIS'))
              ? (showDetails ? 'bg-red-50 text-red-800 border-l-4 border-red-400' : 'text-red-700 font-medium')
              : line.includes('CLASS CONFLICT')
              ? (showDetails ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-400' : 'text-amber-700 font-medium')
              : 'text-slate-600'
          }`}>
            {line}
          </div>
        ))}
      </div>
    </Card>
  );
}
