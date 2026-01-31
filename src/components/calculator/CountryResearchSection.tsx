'use client';

import { Loader2 } from 'lucide-react';
import SectionCard from '@/components/ui/SectionCard';
import SearchModeToggle, { type SearchMode } from './SearchModeToggle';

interface CountryResearchSectionProps {
  country: string;
  onCountryChange: (value: string) => void;
  searchMode: SearchMode;
  onSearchModeChange: (mode: SearchMode) => void;
  onResearch: () => void;
  isResearching: boolean;
  error: string | null;
}

export default function CountryResearchSection({
  country,
  onCountryChange,
  searchMode,
  onSearchModeChange,
  onResearch,
  isResearching,
  error,
}: CountryResearchSectionProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isResearching) {
      onResearch();
    }
  };

  return (
    <SectionCard className="bg-blue-50 border-blue-200">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Research a Country</h3>

      <SearchModeToggle
        mode={searchMode}
        onModeChange={onSearchModeChange}
        disabled={isResearching}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., United States, Hungary, Turkey, Venezuela"
          className="flex-1 px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
          disabled={isResearching}
        />
        <button
          onClick={onResearch}
          disabled={isResearching || !country.trim()}
          className={`px-8 py-4 text-white rounded-xl font-bold disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg transition-colors min-w-[160px] ${
            searchMode === 'live' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isResearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {searchMode === 'live' ? 'Searching...' : 'Analyzing...'}
            </>
          ) : (
            searchMode === 'live' ? 'Live Search' : 'Analyze'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {isResearching && (
        <div className={`mt-4 p-4 rounded-lg ${searchMode === 'live' ? 'bg-green-100 border border-green-200' : 'bg-blue-100 border border-blue-200'}`}>
          <p className={searchMode === 'live' ? 'text-green-800' : 'text-blue-800'}>
            {searchMode === 'live'
              ? `Searching the web for current ${new Date().getFullYear()} data on ${country}. This may take 30-60 seconds...`
              : `Analyzing ${country} using existing knowledge base. This should take 10-20 seconds...`
            }
          </p>
        </div>
      )}
    </SectionCard>
  );
}
