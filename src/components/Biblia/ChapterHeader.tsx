'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Clock, BookMarked } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface ChapterHeaderProps {
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  totalCapitulos: number;
  totalVersiculos: number;
}

const Ornament = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
    className="flex items-center justify-center gap-3 my-4 origin-center"
    aria-hidden="true"
  >
    <span className="block h-px w-12 bg-gradient-to-r from-transparent to-[var(--brand-default)]/60" />
    <svg className="w-4 h-4 text-[var(--brand-default)]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13.5 9 L21 10.5 L15 14.5 L16.5 21 L12 17 L7.5 21 L9 14.5 L3 10.5 L10.5 9 Z" />
    </svg>
    <span className="block h-px w-12 bg-gradient-to-l from-transparent to-[var(--brand-default)]/60" />
  </motion.div>
);

export function ChapterHeader({
  livroNome,
  livroAbreviacao,
  capitulo,
  totalCapitulos,
  totalVersiculos,
}: ChapterHeaderProps) {
  const tempoLeituraMinutos = Math.max(1, Math.ceil(totalVersiculos * 0.25));

  return (
    <header className="mb-10 sm:mb-14">
      <nav
        aria-label="Trilha de navegação"
        className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[var(--content-muted)] mb-5 font-medium"
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--brand-subtle)] border border-[var(--brand-default)]/15 mb-4">
          <BookMarked className="w-3 h-3 text-[var(--brand-default)]" />
          <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--brand-default)] tracking-[0.18em] uppercase">
            Capítulo {capitulo}
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-[var(--brand-default)] leading-[1.05] tracking-tight"
        >
          {livroNome}
        </motion.h1>

        <Ornament />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="flex items-center justify-center gap-4 sm:gap-5 text-[12px] sm:text-[13px] text-[var(--content-secondary)]"
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
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 max-w-md mx-auto px-2"
      >
        <ProgressBar value={capitulo} total={totalCapitulos} />
      </motion.div>
    </header>
  );
}
