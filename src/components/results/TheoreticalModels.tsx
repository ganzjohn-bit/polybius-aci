'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

import type { Factor, ModelUsed } from '@/types/results';
import SectionCard from '@/components/ui/SectionCard';
import Pill from '@/components/ui/Pill';

interface TheoreticalModelsProps {
  modelsUsed: ModelUsed[];
  factors: Factor[];
}

export default function TheoreticalModels({ modelsUsed, factors }: TheoreticalModelsProps) {
  const [expandedModels, setExpandedModels] = useState<Record<string, boolean>>({});

  return (
    <SectionCard
      className="bg-blue-50 border-blue-200"
      title="Theoretical Models Applied"
      icon={BookOpen}
      iconColor="text-blue-700"
      headerContent={<span className="text-sm text-slate-500">({modelsUsed.length} models)</span>}
    >
      <p className="text-sm text-slate-600 mb-4">
        This analysis synthesizes multiple theoretical frameworks from political science to assess authoritarian
        consolidation risk. Each model weights the factors differently based on its theoretical assumptions.
      </p>
      <div className="space-y-3">
        {modelsUsed.map(model => (
          <div key={model.id} className="bg-white rounded-lg border border-blue-100 overflow-hidden">
            <button
              onClick={() => setExpandedModels(prev => ({ ...prev, [model.id]: !prev[model.id] }))}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{model.name}</span>
                  <Pill tone="slate" size="xs" className="text-slate-600">
                    {model.cluster}
                  </Pill>
                </div>
                <p className="text-sm text-slate-500">{model.author}</p>
                <p className="text-sm text-slate-600 mt-1">{model.shortDesc}</p>
              </div>
              {expandedModels[model.id] ? (
                <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            {expandedModels[model.id] && (
              <div className="px-4 pb-4 border-t border-blue-100">
                <div className="mt-3 text-sm text-slate-700 whitespace-pre-line">{model.fullDesc}</div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-xs font-medium text-slate-500 mb-2">Key Works:</div>
                  <div className="text-sm text-slate-600 italic">{model.keyWorks}</div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-xs font-medium text-slate-500 mb-2">Factor Weights:</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(model.weights)
                      .filter(([, weight]) => weight > 0)
                      .sort(([, a], [, b]) => b - a)
                      .map(([factorId, weight]) => {
                        const factor = factors.find(item => item.id === factorId);
                        return (
                          <Pill key={factorId} tone="blue" size="xs">
                            {factor?.name.split('/')[0] || factorId}: {(weight * 100).toFixed(0)}%
                          </Pill>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
