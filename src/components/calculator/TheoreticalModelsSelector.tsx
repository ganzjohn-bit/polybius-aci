'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Info } from 'lucide-react';
import type { TheoreticalModel } from '@/types/calculator';
import Card from '@/components/ui/Card';

interface TheoreticalModelsSelectorProps {
  models: TheoreticalModel[];
  activeModels: Record<string, boolean>;
  onToggleModel: (modelId: string) => void;
}

export default function TheoreticalModelsSelector({
  models,
  activeModels,
  onToggleModel,
}: TheoreticalModelsSelectorProps) {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  return (
    <Card variant="section" className="bg-amber-50 border-amber-200">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-bold text-slate-800">Theoretical Frameworks</h3>
        <div className="group relative">
          <Info className="w-5 h-5 text-slate-400 cursor-help" />
          <div className="absolute left-0 top-6 w-72 p-3 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Select one or more frameworks to adjust how factors are weighted in the overall score. Click a framework to see details.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map(model => (
          <div key={model.id} className="flex flex-col">
            <button
              onClick={() => onToggleModel(model.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                activeModels[model.id]
                  ? 'bg-blue-100 border-blue-400 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800">{model.name}</h4>
                    {activeModels[model.id] && <Check className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{model.author}</p>
                  <p className="text-sm text-slate-600 mt-2">{model.shortDesc}</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
              className="flex items-center justify-center gap-1 text-sm text-slate-500 hover:text-slate-700 py-2"
            >
              {expandedModel === model.id ? (
                <>Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Learn more <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
            {expandedModel === model.id && (
              <div className="bg-white border border-slate-200 rounded-lg p-4 mb-2 -mt-1">
                <p className="text-sm text-slate-700 whitespace-pre-line">{model.fullDesc}</p>
                <p className="text-sm text-slate-500 mt-4 pt-3 border-t border-slate-100">
                  <span className="font-semibold">Key works:</span> {model.keyWorks}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
