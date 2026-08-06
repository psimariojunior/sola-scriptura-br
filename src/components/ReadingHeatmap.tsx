'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';
import { getBookProgressMap, type BookProgress } from '@/lib/readingProgress';

const HEATMAP_COLORS = [
  'bg-[var(--surface-sunken)]',           // 0% - not started
  'bg-emerald-500/15 border-emerald-500/10',  // 1-25%
  'bg-emerald-500/30 border-emerald-500/15',  // 26-50%
  'bg-emerald-500/50 border-emerald-500/20',  // 51-75%
  'bg-emerald-500/70 border-emerald-500/30',  // 76-99%
  'bg-emerald-600 border-emerald-500/40',      // 100% completed
];

function getHeatLevel(percentual: number): number {
  if (percentual === 0) return 0;
  if (percentual <= 25) return 1;
  if (percentual <= 50) return 2;
  if (percentual <= 75) return 3;
  if (percentual < 100) return 4;
  return 5;
}

interface TooltipData {
  book: BookProgress;
  x: number;
  y: number;
}

export function ReadingHeatmap() {
  const [progress, setProgress] = useState<Map<string, BookProgress>>(new Map());
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(getBookProgressMap());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalRead = Array.from(progress.values()).filter(b => b.percentual === 100).length;
  const totalStarted = Array.from(progress.values()).filter(b => b.lidos > 0).length;
  const totalChapters = Array.from(progress.values()).reduce((sum, b) => sum + b.lidos, 0);

  const handleMouseEnter = (book: BookProgress, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ book, x: rect.left + rect.width / 2, y: rect.top - 8 });
  };

  const renderBookGroup = (books: typeof LIVROS_AT | typeof LIVROS_NT, label: string) => (
    <div className="mb-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2">{label}</p>
      <div className="flex flex-wrap gap-1">
        {books.map(l => {
          const p = progress.get(l.abreviacao);
          const level = p ? getHeatLevel(p.percentual) : 0;
          return (
            <Link
              key={l.abreviacao}
              href={`/biblia?livro=${l.abreviacao}&capitulo=1`}
              className={`
                relative w-8 h-8 sm:w-9 sm:h-9 rounded-md border flex items-center justify-center
                text-[8px] sm:text-[9px] font-semibold transition-all duration-200
                hover:scale-110 hover:z-10 hover:shadow-lg
                ${HEATMAP_COLORS[level]}
                ${level === 5 ? 'text-white' : 'text-[var(--content-secondary)]'}
              `}
              onMouseEnter={(e) => p && handleMouseEnter(p, e)}
              onMouseLeave={() => setTooltip(null)}
            >
              {l.abreviacao.length <= 3 ? l.abreviacao : l.abreviacao.substring(0, 2)}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Stats row */}
      <div className="flex items-center gap-4 mb-4 text-xs text-[var(--content-muted)]">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span><strong className="text-[var(--content-primary)]">{totalStarted}</strong> iniciados</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-emerald-600" />
          <span><strong className="text-[var(--content-primary)]">{totalRead}</strong> concluídos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>{totalChapters}</span>
          <span>capítulos lidos</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mb-4 text-[9px] text-[var(--content-muted)]">
        <span>Nenhum</span>
        {HEATMAP_COLORS.map((color, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm border border-transparent ${color}`} />
        ))}
        <span>100%</span>
      </div>

      {/* Book grid */}
      {renderBookGroup(LIVROS_AT, 'Antigo Testamento')}
      {renderBookGroup(LIVROS_NT, 'Novo Testamento')}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] pointer-events-none px-3 py-2 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] shadow-lg text-xs"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}
        >
          <p className="font-semibold text-[var(--content-primary)]">{tooltip.book.nome}</p>
          <p className="text-[var(--content-muted)]">
            {tooltip.book.lidos}/{tooltip.book.totalCapitulos} capítulos ({tooltip.book.percentual}%)
          </p>
        </div>
      )}
    </div>
  );
}
