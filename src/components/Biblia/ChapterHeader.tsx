'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Clock, BookMarked } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface ChapterHeaderProps {
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  totalCapitulos: number;
  totalVersiculos: number;
}

const Ornament = () => (
  <div
    className="animate-scale-line-in flex items-center justify-center gap-3 my-4 origin-center"
    style={{ animationDelay: '0.45s' }}
    aria-hidden="true"
  >
    <span className="block h-px w-12 bg-gradient-to-r from-transparent to-[var(--brand-default)]/60" />
    <svg className="w-4 h-4 text-[var(--brand-default)]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13.5 9 L21 10.5 L15 14.5 L16.5 21 L12 17 L7.5 21 L9 14.5 L3 10.5 L10.5 9 Z" />
    </svg>
    <span className="block h-px w-12 bg-gradient-to-l from-transparent to-[var(--brand-default)]/60" />
  </div>
);

export function ChapterHeader({
  livroNome,
  livroAbreviacao,
  capitulo,
  totalCapitulos,
  totalVersiculos,
}: ChapterHeaderProps) {
  const [expandido, setExpandido] = useState(false);
  const tempoLeituraMinutos = Math.max(1, Math.ceil(totalVersiculos * 0.25));

  return (
    <header className="mb-10 sm:mb-14">
      <nav
        aria-label="Trilha de navegação"
        className="hidden sm:flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[var(--content-muted)] mb-5 font-medium"
      >
        <Link
          href="/biblia"
          className="hover:text-[var(--brand-default)] transition-colors duration-200"
        >
          Bíblia
        </Link>
        <ChevronRight className="w-3 h-3 opacity-50" />
        <Link
          href={`/biblia?livro=${livroAbreviacao}`}
          className="hover:text-[var(--brand-default)] transition-colors duration-200"
        >
          {livroNome}
        </Link>
        <ChevronRight className="w-3 h-3 opacity-50" />
        <span className="text-[var(--brand-default)] font-semibold">
          {capitulo}
        </span>
      </nav>

      <div className="md:hidden">
        <button
          onClick={() => setExpandido(!expandido)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border)]/40 active:scale-[0.98] transition-transform"
        >
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-[var(--content-primary)] truncate">{livroNome}</span>
            <span className="text-xs text-[var(--brand-default)] font-bold">Cap. {capitulo}</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-[var(--content-muted)] shrink-0 transition-transform duration-200 ${expandido ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className={`${expandido ? 'block' : 'hidden'} md:block`}>
        <div className="animate-scale-in text-center mt-4 md:mt-0">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--brand-subtle)] border border-[var(--brand-default)]/15 mb-4">
            <BookMarked className="w-3 h-3 text-[var(--brand-default)]" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--brand-default)] tracking-[0.18em] uppercase">
              Capítulo {capitulo}
            </span>
          </div>

          <h1
            className="animate-slide-up font-display text-5xl sm:text-6xl md:text-7xl font-light text-[var(--brand-default)] leading-[1.05] tracking-tight"
            style={{ animationDelay: '0.1s' }}
          >
            {livroNome}
          </h1>

          <Ornament />

          <div
            className="animate-fade-in flex items-center justify-center gap-4 sm:gap-5 text-[12px] sm:text-[13px] text-[var(--content-secondary)]"
            style={{ animationDelay: '0.55s' }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--brand-default)]" />
              <span className="font-mono">{totalVersiculos}</span> versículos
            </span>
            <span className="w-px h-3 bg-[var(--border)]" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--brand-default)]" />
              <span className="font-mono">~{tempoLeituraMinutos}</span> min
            </span>
          </div>
        </div>

        <div
          className="animate-fade-in mt-6 max-w-md mx-auto px-2"
          style={{ animationDelay: '0.7s' }}
        >
          <ProgressBar value={capitulo} total={totalCapitulos} />
        </div>
      </div>
    </header>
  );
}
