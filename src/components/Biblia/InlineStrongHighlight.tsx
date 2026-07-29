'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RecursoLexico } from '@/data/biblia/versiculoRecursos';

interface InlineStrongHighlightProps {
  lexicoRecursos: RecursoLexico[];
  textoVersiculo: string;
  fontSize: number;
}

const corCategoriaMap: Record<string, string> = {
  substantivo: 'text-blue-600 dark:text-blue-400',
  verbo: 'text-emerald-600 dark:text-emerald-400',
  adjetivo: 'text-amber-600 dark:text-amber-400',
  advérbio: 'text-purple-600 dark:text-purple-400',
  preposição: 'text-gray-600 dark:text-gray-400',
  conjunção: 'text-gray-600 dark:text-gray-400',
  pronome: 'text-pink-600 dark:text-pink-400',
  numeral: 'text-orange-600 dark:text-orange-400',
  partícula: 'text-gray-600 dark:text-gray-400',
  interjeição: 'text-red-600 dark:text-red-400',
};

export function InlineStrongHighlight({
  lexicoRecursos,
  textoVersiculo,
  fontSize,
}: InlineStrongHighlightProps) {
  const [palavraAtiva, setPalavraAtiva] = useState<RecursoLexico | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!palavraAtiva) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPalavraAtiva(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [palavraAtiva]);

  if (!lexicoRecursos || lexicoRecursos.length === 0) return null;

  return (
    <div className="relative mt-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPalavraAtiva(palavraAtiva ? null : lexicoRecursos[0]);
        }}
        className={cn(
          'inline-flex items-center gap-1 text-[10px] font-medium',
          'text-[var(--brand-default)] hover:text-[var(--brand-hover)]',
          'px-1.5 py-0.5 rounded-md',
          'hover:bg-[var(--brand-subtle)] transition-colors duration-150',
          'border border-dashed border-[var(--brand-default)]/30'
        )}
        title={`${lexicoRecursos.length} palavra(s) com léxico de Strong disponível`}
        aria-label="Ver léxico de Strong"
      >
        <span className="text-[11px]">🔤</span>
        <span>Léxico</span>
        <span className="text-[9px] opacity-70">({lexicoRecursos.length})</span>
      </button>

      {palavraAtiva && (
        <>
          {/* Overlay escuro no mobile para fechar */}
          <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setPalavraAtiva(null)} />

          <div
            ref={popoverRef}
            className={cn(
              'absolute left-0 top-full mt-1 z-40',
              'bg-[var(--surface-raised)] border border-[var(--border)]',
              'rounded-xl shadow-2xl p-4 min-w-[260px] max-w-[320px]',
              'animate-scale-in'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded-full',
                  palavraAtiva.idioma === 'grego'
                    ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                )}>
                  {palavraAtiva.strong}
                </span>
                <span className="text-[10px] text-[var(--content-muted)]">
                  {palavraAtiva.idioma === 'grego' ? 'Grego' : 'Hebraico'}
                </span>
              </div>
              <button
                onClick={() => setPalavraAtiva(null)}
                className="p-1 rounded-md hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]"
                aria-label="Fechar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Palavra original */}
            <p className={`text-2xl font-bold text-center mb-0.5 ${palavraAtiva.idioma === 'grego' ? 'font-greek' : 'font-hebrew'}`}>
              {palavraAtiva.palavra}
            </p>

            {/* Transliteração */}
            <p className="text-xs text-[var(--content-muted)] italic text-center mb-2">
              {palavraAtiva.transliteracao}
            </p>

            {/* Definição */}
            <div className="bg-[var(--brand-subtle)]/20 rounded-lg p-2.5 mb-2 border border-[var(--brand-default)]/10">
              <div className="flex items-center gap-1 mb-1">
                <BookOpen className="w-3 h-3 text-[var(--brand-default)]" />
                <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--brand-default)]">Definição</span>
              </div>
              <p className="text-xs font-medium text-[var(--brand-default)] leading-relaxed">
                {palavraAtiva.definicao}
              </p>
            </div>

            {/* Morfologia */}
            {palavraAtiva.morfologia && (
              <p className="text-[10px] text-[var(--content-muted)] mb-2">
                <span className="font-semibold">Morfologia:</span> {palavraAtiva.morfologia}
              </p>
            )}

            {/* Link */}
            <Link
              href={`/idiomas?strong=${palavraAtiva.strong.replace(/[GH]/, '')}`}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'inline-flex items-center gap-1 text-[10px] font-semibold',
                'text-[var(--brand-default)] hover:underline'
              )}
            >
              Ver no léxico completo →
            </Link>

            {/* Outras palavras */}
            {lexicoRecursos.length > 1 && (
              <div className="mt-2 pt-2 border-t border-[var(--border)]">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1">
                  Outras palavras:
                </p>
                <div className="flex flex-wrap gap-1">
                  {lexicoRecursos.slice(0, 6).map((lex) => (
                    <button
                      key={lex.strong}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPalavraAtiva(lex);
                      }}
                      className={cn(
                        'text-[9px] px-1.5 py-0.5 rounded',
                        'border border-[var(--border)] hover:border-[var(--brand-default)]',
                        'transition-colors duration-150',
                        palavraAtiva.strong === lex.strong
                          ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                          : 'text-[var(--content-secondary)]'
                      )}
                    >
                      {lex.palavra}
                    </button>
                  ))}
                  {lexicoRecursos.length > 6 && (
                    <span className="text-[9px] text-[var(--content-muted)] self-center">
                      +{lexicoRecursos.length - 6}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default InlineStrongHighlight;
