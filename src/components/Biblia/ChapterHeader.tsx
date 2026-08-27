'use client';

import { Clock } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface ChapterHeaderProps {
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  totalCapitulos: number;
  totalVersiculos: number;
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-3" aria-hidden="true">
      <span className="block h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-primary/50" />
      <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L13.5 9 L21 10.5 L15 14.5 L16.5 21 L12 17 L7.5 21 L9 14.5 L3 10.5 L10.5 9 Z" />
      </svg>
      <span className="block h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-primary/50" />
    </div>
  );
}

export function ChapterHeader({
  livroNome,
  capitulo,
  totalCapitulos,
  totalVersiculos,
}: ChapterHeaderProps) {
  const tempoLeituraMinutos = Math.max(1, Math.ceil(totalVersiculos * 0.25));

  return (
    <header className="mb-6 sm:mb-8 text-center">
      <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--content-muted)] font-semibold">
        {livroNome}
      </p>
      <h1 className="mt-1.5 text-h1 text-[var(--content-primary)]">
        Capítulo {capitulo}
      </h1>

      <Ornament />

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] sm:text-[13px] text-[var(--content-secondary)]">
        <span>
          <span className="font-mono tabular-nums">{totalVersiculos}</span> versículos
        </span>
        <span className="w-px h-3 bg-[var(--border)]" aria-hidden="true" />
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary" />
          ~{tempoLeituraMinutos} min
        </span>
      </div>

      <div className="mt-5 max-w-xs mx-auto px-2">
        <ProgressBar value={capitulo} total={totalCapitulos} />
      </div>
    </header>
  );
}
