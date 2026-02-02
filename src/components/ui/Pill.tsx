import type { ReactNode } from 'react';

type PillTone = 'green' | 'yellow' | 'red' | 'blue' | 'amber' | 'purple' | 'slate' | 'pink' | 'cyan' | 'orange';
type PillVariant = 'soft' | 'strong' | 'solid';
type PillSize = 'xs' | 'sm';

const toneStyles: Record<PillTone, Record<PillVariant, string>> = {
  green: {
    soft: 'bg-green-100 text-green-700',
    strong: 'bg-green-200 text-green-800',
    solid: 'bg-green-600 text-white'
  },
  yellow: {
    soft: 'bg-yellow-100 text-yellow-700',
    strong: 'bg-yellow-200 text-yellow-800',
    solid: 'bg-yellow-500 text-white'
  },
  red: {
    soft: 'bg-red-100 text-red-700',
    strong: 'bg-red-200 text-red-800',
    solid: 'bg-red-600 text-white'
  },
  blue: {
    soft: 'bg-blue-100 text-blue-800',
    strong: 'bg-blue-200 text-blue-800',
    solid: 'bg-blue-600 text-white'
  },
  amber: {
    soft: 'bg-amber-100 text-amber-700',
    strong: 'bg-amber-200 text-amber-800',
    solid: 'bg-amber-500 text-white'
  },
  purple: {
    soft: 'bg-purple-100 text-purple-700',
    strong: 'bg-purple-200 text-purple-800',
    solid: 'bg-purple-600 text-white'
  },
  slate: {
    soft: 'bg-slate-100 text-slate-700',
    strong: 'bg-slate-200 text-slate-800',
    solid: 'bg-slate-600 text-white'
  },
  pink: {
    soft: 'bg-pink-100 text-pink-700',
    strong: 'bg-pink-200 text-pink-800',
    solid: 'bg-pink-600 text-white'
  },
  cyan: {
    soft: 'bg-cyan-100 text-cyan-700',
    strong: 'bg-cyan-200 text-cyan-800',
    solid: 'bg-cyan-600 text-white'
  },
  orange: {
    soft: 'bg-orange-100 text-orange-700',
    strong: 'bg-orange-200 text-orange-800',
    solid: 'bg-orange-600 text-white'
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
