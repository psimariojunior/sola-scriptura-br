'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ChapterGridProps {
  open: boolean;
  onClose: () => void;
  totalCapitulos: number;
  capituloAtual: number;
  onSelect: (capitulo: number) => void;
}

export function ChapterGrid({ open, onClose, totalCapitulos, capituloAtual, onSelect }: ChapterGridProps) {
  const [top, setTop] = useState(80);

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const toolbar = document.querySelector('.bible-toolbar');
      const rect = toolbar?.getBoundingClientRect();
      setTop((rect?.bottom ?? 72) + 8);
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[70] animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed left-4 sm:left-1/2 sm:-translate-x-1/2 z-[80] w-80 max-w-[90vw] bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-3 animate-slide-up"
        style={{ top }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2 px-1">
          Selecione o capítulo
        </p>
        <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
          {Array.from({ length: totalCapitulos }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              type="button"
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
    </>,
    document.body
  );
}
