'use client';

import { cn } from '@/lib/utils';

interface ChapterGridProps {
  open: boolean;
  onClose: () => void;
  totalCapitulos: number;
  capituloAtual: number;
  onSelect: (capitulo: number) => void;
}

export function ChapterGrid({ open, onClose, totalCapitulos, capituloAtual, onSelect }: ChapterGridProps) {
  return (
      open && (
        <>
          <div
            className="fixed inset-0 z-40 animate-fade-in"
            onClick={onClose}
          />
          <div
            className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 z-50 w-80 max-w-[90vw] bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-3 animate-slide-up"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2 px-1">
              Selecione o capítulo
            </p>
            <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
              {Array.from({ length: totalCapitulos }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => { onSelect(num - 1); onClose(); }}
                  className={cn(
                    'w-full aspect-square rounded-lg text-xs font-semibold transition-all duration-150',
                    num - 1 === capituloAtual
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md'
                      : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]'
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </>
      )
  );
}