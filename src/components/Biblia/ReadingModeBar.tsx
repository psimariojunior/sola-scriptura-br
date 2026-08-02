'use client';

import { cn } from '@/lib/utils';
import { BookOpen, Search, Sparkles, Presentation } from 'lucide-react';

export type ReadingMode = 'leitura' | 'estudo' | 'interlinear' | 'apresentacao';

interface ReadingModeBarProps {
  mode: ReadingMode;
  onModeChange: (mode: ReadingMode) => void;
  className?: string;
}

const modes: { id: ReadingMode; label: string; icon: typeof BookOpen; desc: string }[] = [
  { id: 'leitura', label: 'Leitura', icon: BookOpen, desc: 'Foco no texto, sem distrações' },
  { id: 'estudo', label: 'Estudo', icon: Search, desc: 'Comentários, léxico e referências' },
  { id: 'interlinear', label: 'Interlinear', icon: Sparkles, desc: 'Texto original palavra a palavra' },
  { id: 'apresentacao', label: 'Apresentação', icon: Presentation, desc: 'Fonte ampla para projetar' },
];

export function ReadingModeBar({ mode, onModeChange, className }: ReadingModeBarProps) {
  return (
    <div className={cn('flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border)]/30', className)}>
      {modes.map(m => {
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            title={m.desc}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200',
              isActive
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-sm shadow-[var(--brand-default)]/20'
                : 'text-[var(--content-muted)] hover:text-[var(--content-secondary)] hover:bg-[var(--surface-raised)]/50'
            )}
          >
            <m.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
