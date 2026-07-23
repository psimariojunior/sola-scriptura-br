'use client';

import { memo, Fragment, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';
import { VerseActions } from './VerseActions';

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
  isFocused: boolean;
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
  isCurrentAudioVerse?: boolean;
  hasResources?: boolean;
}

export const VerseCard = memo(function VerseCard({
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
  isFocused,
  isFavorito,
  corMarca,
  copiedVerse,
  audioNatural,
  audio,
  flashcards,
  onSelect,
  onFavoritoChange,
  onAnotar,
  onStrong,
  onComentarios,
  onToggleEstudo,
  copyVerse,
  verseKey,
  isCurrentAudioVerse = false,
  hasResources: hasResourcesProp = false,
}: VerseCardProps) {
  const ref = `${livroNome} ${capitulo}:${numero}`;
  const articleRef = useRef<HTMLElement>(null);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if ((isCurrentAudioVerse || isFocused) && articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: 'smooth', block: isFocused ? 'center' : 'center' });
    }
  }, [isCurrentAudioVerse, isFocused]);

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
        ref={articleRef}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ willChange: 'transform, opacity' }}
        onClick={onSelect}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        className={cn(
          'group relative cursor-pointer rounded-lg',
          'transition-all duration-200',
          'px-3 sm:px-4 -mx-3 sm:-mx-4',
          'py-2.5 sm:py-3',
          isCurrentAudioVerse
            ? 'bg-amber-100/40 dark:bg-amber-900/20 border-l-2 border-l-amber-500 shadow-sm ring-1 ring-amber-400/30'
            : isFocused
            ? 'bg-[var(--brand-subtle)] border-l-2 border-l-[var(--brand-default)] shadow-sm ring-1 ring-[var(--brand-default)]/30'
            : isSelected
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
        <div className="flex items-start gap-2.5 sm:gap-4">
          {/* Verse number badge */}
          <span
            className={cn(
              'shrink-0 inline-flex items-center justify-center relative',
              'w-7 h-7 sm:w-8 sm:h-8 rounded-md',
              'text-[10px] sm:text-[11px] font-bold tabular-nums',
              'transition-all duration-200',
              isSelected || isPlaying
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-sm'
                : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] group-hover:bg-[var(--brand-default)] group-hover:text-[var(--brand-contrast)]'
            )}
            aria-hidden="true"
          >
            {numero}
            {corMarca && (
              <span
                className={cn(
                  'absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ring-1 ring-[var(--surface-raised)]',
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
            {/* Verse text - clean reading */}
            <p
              className="font-serif-body text-[var(--content-primary)] leading-[1.8] sm:leading-[1.9]"
              style={{ fontSize: `${fontSize}px` }}
            >
              {texto}
            </p>

            {/* Subtle reference + resource indicator */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[0.6em] text-[var(--content-muted)] font-normal tracking-wide tabular-nums">
                {ref}
              </span>
              {hasResourcesProp && (
                <span
                  className="inline-flex items-center text-[9px] text-[var(--brand-default)]/60 font-medium"
                  title="Recursos disponíveis"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-default)]/40" />
                </span>
              )}
            </div>
          </div>

          {/* Actions - appear on hover/selection */}
          <AnimatePresence>
            {(showActions || isSelected) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="shrink-0"
              >
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
                  temAnotacao={false}
                  copyVerse={copyVerse}
                  copiedVerse={copiedVerse}
                  verseKey={verseKey}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </Fragment>
  );
});
