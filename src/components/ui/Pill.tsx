import type { ReactNode } from 'react';

type PillTone = 'green' | 'yellow' | 'red' | 'blue' | 'amber' | 'purple' | 'rose' | 'emerald' | 'slate';
type PillVariant = 'soft' | 'strong';
type PillSize = 'xs' | 'sm';

const toneStyles: Record<PillTone, Record<PillVariant, string>> = {
  green: {
    soft: 'bg-green-100 text-green-700',
    strong: 'bg-green-200 text-green-800'
  },
  yellow: {
    soft: 'bg-yellow-100 text-yellow-700',
    strong: 'bg-yellow-200 text-yellow-800'
  },
  red: {
    soft: 'bg-red-100 text-red-700',
    strong: 'bg-red-200 text-red-800'
  },
  blue: {
    soft: 'bg-blue-100 text-blue-800',
    strong: 'bg-blue-200 text-blue-800'
  },
  amber: {
    soft: 'bg-amber-100 text-amber-700',
    strong: 'bg-amber-200 text-amber-800'
  },
  purple: {
    soft: 'bg-purple-100 text-purple-700',
    strong: 'bg-purple-200 text-purple-800'
  },
  rose: {
    soft: 'bg-rose-100 text-rose-700',
    strong: 'bg-rose-200 text-rose-800'
  },
  emerald: {
    soft: 'bg-emerald-100 text-emerald-700',
    strong: 'bg-emerald-200 text-emerald-800'
  },
  slate: {
    soft: 'bg-slate-100 text-slate-700',
    strong: 'bg-slate-200 text-slate-800'
  }
};

const sizeStyles: Record<PillSize, string> = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2 py-1 text-sm'
};

interface PillProps {
  tone?: PillTone;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  children: ReactNode;
}

export default function Pill({
  tone,
  variant = 'soft',
  size = 'xs',
  className,
  children
}: PillProps) {
  const toneClass = tone ? toneStyles[tone][variant] : '';
  const classes = ['inline-flex items-center rounded font-medium', sizeStyles[size], toneClass, className]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}
