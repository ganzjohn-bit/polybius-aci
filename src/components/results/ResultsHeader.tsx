interface ResultsHeaderProps {
  country: string;
  generatedAt: string;
}

export default function ResultsHeader({ country, generatedAt }: ResultsHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Polybius</h1>
        <p className="text-slate-600 text-lg" title={country}>
          Authoritarian Consolidation Index
        </p>
      </div>
      <div className="text-right text-sm text-slate-500">
        <div>Last updated:</div>
        <div className="font-medium">
          {new Date(generatedAt).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}
