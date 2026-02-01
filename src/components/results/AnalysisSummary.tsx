import Card from '@/components/ui/Card';

interface AnalysisSummaryProps {
  summary: string;
}

export default function AnalysisSummary({ summary }: AnalysisSummaryProps) {
  return (
    <Card variant="section" className="bg-slate-50 border-slate-200" title="Analysis Summary">
      <p className="text-slate-700 leading-relaxed whitespace-pre-line">{summary}</p>
    </Card>
  );
}
