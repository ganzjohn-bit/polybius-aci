import SectionCard from '@/components/ui/SectionCard';

interface AnalysisSummaryProps {
  summary: string;
}

export default function AnalysisSummary({ summary }: AnalysisSummaryProps) {
  return (
    <SectionCard className="bg-slate-50 border-slate-200" title="Analysis Summary">
      <p className="text-slate-700 leading-relaxed whitespace-pre-line">{summary}</p>
    </SectionCard>
  );
}
