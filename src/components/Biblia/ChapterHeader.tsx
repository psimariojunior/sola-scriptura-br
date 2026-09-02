'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { hrefGuia, hrefInterlinear } from '@/lib/bibliaHref';

interface ChapterHeaderProps {
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  totalCapitulos: number;
  totalVersiculos: number;
  variant?: 'leitura' | 'estudo';
  onAbrirEstudo?: () => void;
}

function Ornament({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={compact ? 'flex items-center justify-center gap-2.5 my-4' : 'flex items-center justify-center gap-3 my-3'}
      aria-hidden="true"
    >
      <span className={`block h-px bg-gradient-to-r from-transparent to-primary/40 ${compact ? 'w-8 sm:w-12' : 'w-10 sm:w-14'}`} />
      <svg className={`${compact ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} text-primary/80`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L13.5 9 L21 10.5 L15 14.5 L16.5 21 L12 17 L7.5 21 L9 14.5 L3 10.5 L10.5 9 Z" />
      </svg>
      <span className={`block h-px bg-gradient-to-l from-transparent to-primary/40 ${compact ? 'w-8 sm:w-12' : 'w-10 sm:w-14'}`} />
    </div>
  );
}

export function ChapterHeader({
  livroNome,
  livroAbreviacao,
  capitulo,
  totalCapitulos,
  totalVersiculos,
  variant = 'estudo',
  onAbrirEstudo,
}: ChapterHeaderProps) {
  const tempoLeituraMinutos = Math.max(1, Math.ceil(totalVersiculos * 0.25));
  const [ficha, setFicha] = useState<{ titulo: string; profunda: boolean } | null>(null);

  useEffect(() => {
    let cancel = false;
    import('@/lib/estudosLoader').then(({ obterEstudoCapitulo }) => {
      if (cancel) return;
      const e = obterEstudoCapitulo(livroAbreviacao, capitulo);
      setFicha({ titulo: e.titulo, profunda: e.nivel === 'profundo' });
    }).catch(() => {
      if (!cancel) setFicha(null);
    });
    return () => { cancel = true; };
  }, [livroAbreviacao, capitulo]);

  const atalhoEstudo =
    variant === 'leitura' && ficha ? (
      onAbrirEstudo ? (
        <button
          type="button"
          onClick={onAbrirEstudo}
          className="mt-3 inline-flex max-w-[min(100%,28rem)] items-center justify-center gap-2 rounded-full border border-[var(--brand-default)]/25 bg-[var(--brand-subtle)]/50 px-3.5 py-1.5 text-left transition-colors hover:border-[var(--brand-default)]/50 hover:bg-[var(--brand-subtle)]"
        >
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-default)]">
            {ficha.profunda ? 'Ficha' : 'Estudar'}
          </span>
          <span className="min-w-0 truncate text-[12px] sm:text-[13px] text-[var(--content-secondary)]">
            {ficha.titulo}
          </span>
        </button>
      ) : (
        <p className="mt-3">
          <Link
            href={hrefGuia(livroAbreviacao, capitulo)}
            className="text-[12px] text-[var(--content-muted)] hover:text-[var(--brand-default)] underline-offset-4 hover:underline"
          >
            {ficha.titulo}
          </Link>
        </p>
      )
    ) : null;

  if (variant === 'leitura') {
    return (
      <header
        className="bible-chapter-open mb-8 sm:mb-12 text-center"
        aria-label={`${livroNome} capítulo ${capitulo}, ${totalVersiculos} versículos`}
      >
        <p className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.38em] text-[var(--content-muted)]">
          {livroNome}
        </p>
        <h1 className="mt-2 font-display text-[4.25rem] sm:text-[5.25rem] leading-none font-medium text-[var(--content-primary)] tabular-nums">
          <span className="sr-only">Capítulo </span>
          {capitulo}
        </h1>
        <Ornament compact />
        {atalhoEstudo}
        <p className="mt-3">
          <Link
            href={hrefInterlinear(livroAbreviacao, capitulo)}
            className="text-[12px] sm:text-[13px] font-medium text-[var(--brand-default)] hover:underline underline-offset-4"
          >
            Original · hebraico e grego
          </Link>
        </p>
      </header>
    );
  }

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

      <p className="mt-4 max-w-md mx-auto text-[12px] sm:text-[13px] leading-relaxed text-[var(--content-muted)]">
        Toque no versículo para estudar. Selecione um trecho para marcar com cor ou criar uma imagem.
      </p>
      <p className="mt-2">
        <Link
          href={hrefInterlinear(livroAbreviacao, capitulo)}
          className="text-[12px] sm:text-[13px] font-medium text-[var(--brand-default)] hover:underline underline-offset-4"
        >
          Original · hebraico e grego
        </Link>
      </p>

      <div className="mt-5 max-w-xs mx-auto px-2">
        <ProgressBar value={capitulo} total={totalCapitulos} />
      </div>
    </header>
  );
}
