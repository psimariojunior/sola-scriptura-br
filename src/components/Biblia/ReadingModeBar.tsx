'use client';

import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, Columns2 } from 'lucide-react';

export type ReadingMode = 'leitura' | 'estudo' | 'comparar';

interface ReadingModeBarProps {
  mode: ReadingMode;
  onModeChange: (mode: ReadingMode) => void;
  className?: string;
}

const modes: { id: ReadingMode; label: string; icon: typeof BookOpen; desc: string }[] = [
  { id: 'leitura', label: 'Leitura', icon: BookOpen, desc: 'Um versículo por vez, fácil de acompanhar' },
  { id: 'estudo', label: 'Estudo', icon: GraduationCap, desc: 'Comentário clássico, léxico e referências no verso' },
  { id: 'comparar', label: 'Comparar', icon: Columns2, desc: 'Traduções lado a lado' },
];

export function ReadingModeBar({ mode, onModeChange, className }: ReadingModeBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Modo de leitura"
      className={cn(
        'flex items-center gap-0.5 p-0.5 rounded-full bg-[var(--surface-sunken)]/80 border border-[var(--border)]/40',
        className
      )}
    >
      {modes.map((m) => {
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onModeChange(m.id)}
            title={m.desc}
            className={cn(
              'flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200',
              isActive
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-sm shadow-[var(--brand-default)]/20'
                : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
            )}
          >
            <m.icon className="w-3.5 h-3.5" />
            <span>{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
