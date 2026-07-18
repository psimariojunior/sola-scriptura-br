'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { RecursoLexico } from '@/data/biblia/versiculoRecursos';

/**
 * Interface para as props do componente de destaque inline do léxico de Strong.
 * Exibe palavras com sublinhado pontilhado que, ao serem clicadas, mostram
 * um popover com informações do léxico grego/hebraico.
 */
interface InlineStrongHighlightProps {
  /** Lista de recursos léxico disponíveis para o versículo */
  lexicoRecursos: RecursoLexico[];
  /** Texto original do versículo */
  textoVersiculo: string;
  /** Tamanho da fonte herdado do VerseCard */
  fontSize: number;
}

/**
 * Mapa de cores para os tipos de palavras léxicas.
 * Usado para diferenciar visualmente substantivos, verbos, etc.
 */
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

/**
 * Componente que exibe palavras com destaque para o léxico de Strong.
 * Quando dados léxico estão disponíveis, exibe um indicador sutil (sublinhado pontilhado)
 * nas palavras que possuem números Strong associados.
 *
 * Ao clicar no indicador, abre um popover com:
 * - Palavra original (grego/hebraico)
 * - Transliteração
 * - Número Strong
 * - Definição
 * - Link para a página de idiomas
 */
export function InlineStrongHighlight({
  lexicoRecursos,
  textoVersiculo,
  fontSize,
}: InlineStrongHighlightProps) {
  const [palavraAtiva, setPalavraAtiva] = useState<RecursoLexico | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fechar popover ao clicar fora
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

  // Se não há dados léxico, não renderiza nada
  if (!lexicoRecursos || lexicoRecursos.length === 0) return null;

  return (
    <div className="relative mt-1">
      {/* Indicador de léxico disponível —小botão discreto */}
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

      {/* Popover com detalhes do léxico */}
      <AnimatePresence>
        {palavraAtiva && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute left-0 top-full mt-1 z-40',
              'bg-[var(--surface-raised)] border border-[var(--border)]',
              'rounded-lg shadow-xl p-3 min-w-[220px] max-w-[300px]'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho com palavra e idioma */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)]">
                  {palavraAtiva.idioma === 'grego' ? '🇬🇷 Grego' : '🇮🇱 Hebraico'}
                </span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-[var(--brand-subtle)] text-[var(--brand-default)] font-mono">
                  {palavraAtiva.strong}
                </span>
              </div>
              <button
                onClick={() => setPalavraAtiva(null)}
                className="text-[var(--content-muted)] hover:text-[var(--content-primary)] text-xs"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Palavra original */}
            <p className="text-lg font-serif-body text-[var(--content-primary)] mb-0.5">
              {palavraAtiva.palavra}
            </p>

            {/* Transliteração */}
            <p className="text-xs text-[var(--content-muted)] italic mb-1.5">
              {palavraAtiva.transliteracao}
            </p>

            {/* Definição */}
            <p className="text-xs text-[var(--content-secondary)] leading-relaxed mb-2">
              {palavraAtiva.definicao}
            </p>

            {/* Morfologia (se disponível) */}
            {palavraAtiva.morfologia && (
              <p className="text-[10px] text-[var(--content-muted)] mb-2">
                <span className="font-semibold">Morfologia:</span> {palavraAtiva.morfologia}
              </p>
            )}

            {/* Link para a página de idiomas */}
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

            {/* Lista de outras palavras disponíveis */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InlineStrongHighlight;
