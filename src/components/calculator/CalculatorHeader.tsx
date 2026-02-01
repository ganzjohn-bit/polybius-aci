import { Settings } from 'lucide-react';
import Card from '@/components/ui/Card';

interface CalculatorHeaderProps {
  onSettingsClick: () => void;
}

export default function CalculatorHeader({ onSettingsClick }: CalculatorHeaderProps) {
  return (
    <Card variant="section" icon={Settings} iconColor="text-slate-400" title="Polybius" headerContent={
      <button
        onClick={onSettingsClick}
        className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        title="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>
    }>
      <p className="text-slate-600 text-lg">A framework for assessing structural vulnerability to democratic backsliding</p>
    </Card>
  );
}
