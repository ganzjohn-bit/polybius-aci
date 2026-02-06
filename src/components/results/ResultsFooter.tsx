import { BookOpen, ExternalLink } from 'lucide-react';

export default function ResultsFooter() {
  return (
    <>
      <div className="text-center mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <a
            href="https://app.polybius.world"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Run Live Analysis
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="/methodology"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Methodology & Source Code
          </a>
        </div>
        <p className="text-sm text-slate-500">Use your own API key to run real-time analysis with the latest data</p>
      </div>

      <footer className="text-center text-sm text-slate-500 border-t border-slate-200 pt-6">
        <p className="mb-2">
          Built with theoretical frameworks from Linz, Levitsky & Ziblatt, Gramsci, Paxton, Svolik, Berman, Riley,
          and others.
        </p>
        <p>
          Historical data from{' '}
          <a href="https://v-dem.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            V-Dem
          </a>{' '}
          and the{' '}
          <a
            href="https://www.systemicpeace.org/polityproject.html"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Polity Project
          </a>
          . Analysis powered by Claude AI.
        </p>
      </footer>
    </>
  );
}
