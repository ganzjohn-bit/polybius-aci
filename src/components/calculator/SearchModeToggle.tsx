'use client';

export type SearchMode = 'quick' | 'live';

interface SearchModeToggleProps {
  mode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
  disabled?: boolean;
}

export default function SearchModeToggle({ mode, onModeChange, disabled }: SearchModeToggleProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onModeChange('quick')}
        disabled={disabled}
        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 ${
          mode === 'quick'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-slate-600 border border-slate-300 hover:border-blue-400'
        }`}
      >
        <div className="font-semibold">Quick Analysis</div>
        <div className="text-xs opacity-80">Uses existing knowledge (fast, no rate limits)</div>
      </button>
      <button
        onClick={() => onModeChange('live')}
        disabled={disabled}
        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 ${
          mode === 'live'
            ? 'bg-green-600 text-white'
            : 'bg-white text-slate-600 border border-slate-300 hover:border-green-400'
        }`}
      >
        <div className="font-semibold">Live Search</div>
        <div className="text-xs opacity-80">Web search for latest data (slower, uses more tokens)</div>
      </button>
    </div>
  );
}
