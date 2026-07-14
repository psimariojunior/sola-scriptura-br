'use client';

import { Fragment, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';
import { getCrossReferences } from '@/data/crossReferences';
import { getTiposRecursoDisponiveis } from '@/data/biblia/versiculoRecursos';
import { VerseActions } from './VerseActions';

const PainelEstudosInline = lazy(() => import('@/components/PainelEstudosInline'));

function PanelFallback() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

export interface VerseCardProps {
  numero: number;
  texto: string;
  livroAbreviacao: string;
  livroNome: string;
  capitulo: number;
  traducao: string;
  fontSize: number;
  isSelected: boolean;
  isPlaying: boolean;
  isHighlighted: boolean;
  isFavorito: boolean;
  corMarca: string | null;
  temAnotacao: boolean;
  copiedVerse: string | null;
  audioNatural: ReturnType<typeof useAudioNatural>;
  audio: ReturnType<typeof useVerseAudio>;
  flashcards: ReturnType<typeof useFlashcards>;
  estudoAberto: boolean;
  onSelect: () => void;
  onFavoritoChange: () => void;
  onAnotar: () => void;
  onStrong: () => void;
  onComentarios: () => void;
  onToggleEstudo: () => void;
  copyVerse: (text: string, ref: string) => void;
  verseKey: string;
  showTranslationLabel: boolean;
  tradLabel: string;
  tradBadgeColor: string;
}

export function VerseCard({
  numero,
  texto,
  livroAbreviacao,
  livroNome,
  capitulo,
  traducao,
  fontSize,
  isSelected,
  isPlaying,
  isHighlighted,
  isFavorito,
  corMarca,
  temAnotacao,
  copiedVerse,
  audioNatural,
  audio,
  flashcards,
  estudoAberto,
  onSelect,
  onFavoritoChange,
  onAnotar,
  onStrong,
  onComentarios,
  onToggleEstudo,
  copyVerse,
  verseKey,
  showTranslationLabel,
  tradLabel,
  tradBadgeColor,
}: VerseCardProps) {
  const ref = `${livroNome} ${capitulo}:${numero}`;
  const crossRefs = getCrossReferences(livroAbreviacao, capitulo, numero);
  const recursos = getTiposRecursoDisponiveis(livroAbreviacao, capitulo, numero);

  const corBgMap: Record<string, string> = {
    yellow: 'bg-[var(--mark-yellow)]',
    green: 'bg-[var(--mark-green)]',
    blue: 'bg-[var(--mark-blue)]',
    pink: 'bg-[var(--mark-pink)]',
    orange: 'bg-[var(--mark-orange)]',
    purple: 'bg-[var(--mark-purple)]',
  };

  return (
    <Fragment>
      <motion.article
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={onSelect}
        className={cn(
          'group relative cursor-pointer rounded-lg',
          'transition-all duration-300',
          'px-3 sm:px-4 -mx-3 sm:-mx-4',
          'py-2.5 sm:py-3',
          isSelected
            ? 'bg-[var(--brand-subtle)] border-l-2 border-l-[var(--brand-default)] shadow-sm'
            : isPlaying
            ? 'bg-[var(--brand-subtle)] border-l-2 border-l-[var(--brand-default)]'
            : isHighlighted
            ? 'bg-[var(--brand-subtle)]'
            : 'hover:bg-[var(--surface-sunken)]/60 border-l-2 border-l-transparent hover:border-l-[var(--brand-default)]/30',
          corMarca && corBgMap[corMarca]
        )}
        aria-selected={isSelected}
        aria-label={`Versículo ${numero} de ${livroNome} ${capitulo}`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <span
            className={cn(
              'shrink-0 inline-flex items-center justify-center',
              'w-9 h-9 sm:w-10 sm:h-10 rounded-lg',
              'text-xs sm:text-sm font-bold tabular-nums',
              'transition-all duration-200',
              isSelected || isPlaying
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20'
                : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] group-hover:bg-[var(--brand-default)] group-hover:text-[var(--brand-contrast)]'
            )}
            aria-hidden="true"
          >
            {numero}
            {corMarca && (
              <span
                className={cn(
                  'absolute -mt-3 ml-7 w-1.5 h-1.5 rounded-full ring-2 ring-[var(--surface-raised)]',
                  corMarca === 'yellow' && 'bg-yellow-400',
                  corMarca === 'green' && 'bg-green-400',
                  corMarca === 'blue' && 'bg-blue-400',
                  corMarca === 'pink' && 'bg-pink-400',
                  corMarca === 'orange' && 'bg-orange-400',
                  corMarca === 'purple' && 'bg-purple-400'
                )}
              />
            )}
          </span>

          <div className="flex-1 min-w-0">
            <p
              className="font-serif-body leading-[1.8] text-[var(--content-primary)]"
              style={{ fontSize: `${fontSize}px` }}
            >
              {texto}
              <span className="ml-2 text-[0.7em] text-[var(--content-muted)] font-normal tracking-wide tabular-nums">
                {ref}
              </span>
            </p>

            {(crossRefs.length > 0 || recursos.length > 0) && (
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {crossRefs.length > 0 && (
                  <div className="inline-flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[var(--content-muted)] font-medium uppercase tracking-wider">
                      Refs
                    </span>
                    {crossRefs.slice(0, 4).map((cref) => {
                      const parts = cref.split(':');
                      const book = parts[0];
                      const cap = parts[1];
                      return (
                        <Link
                          key={cref}
                          href={`/biblia?livro=${book}&capitulo=${cap}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center text-[10px] font-medium text-[var(--brand-default)] hover:underline"
                        >
                          {cref}
                        </Link>
                      );
                    })}
                    {crossRefs.length > 4 && (
                      <span className="text-[10px] text-[var(--content-muted)]">+{crossRefs.length - 4}</span>
                    )}
                  </div>
                )}
                {recursos.length > 0 && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium"
                    title={`${recursos.length} recurso(s) disponível(eis)`}
                  >
                    {recursos.length} recurso{recursos.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}
          </div>

          <VerseActions
            livro={livroNome}
            livroNome={livroNome}
            livroAbreviacao={livroAbreviacao}
            capitulo={capitulo}
            versiculo={numero}
            traducao={traducao}
            texto={texto}
            audioNatural={audioNatural}
            audio={audio}
            flashcards={flashcards}
            isFavorito={isFavorito}
            onFavoritoChange={onFavoritoChange}
            onAnotar={onAnotar}
            onStrong={onStrong}
            onComentarios={onComentarios}
            onEstudos={onToggleEstudo}
            onSelected={onSelect}
            temAnotacao={temAnotacao}
            copyVerse={copyVerse}
            copiedVerse={copiedVerse}
            verseKey={verseKey}
          />
        </div>
      </motion.article>

      <AnimatePresence>
        {estudoAberto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden -mx-3 sm:-mx-4 mb-3"
          >
            <Suspense fallback={<PanelFallback />}>
              <PainelEstudosInline
                livro={livroAbreviacao}
                capitulo={capitulo}
                versiculo={numero}
                nomeLivro={livroNome}
                onClose={onToggleEstudo}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
}
