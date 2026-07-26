'use client';

import { memo, Fragment, useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';
import { VerseActions } from './VerseActions';
import { Heart, Palette, Copy, StickyNote, Brain } from 'lucide-react';
import { toggleFavorito } from '@/lib/estudos';
import { setMarcador, removeMarcador, getMarcador, CORES, type CorMarcador } from '@/lib/marcadores';

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
  onCorMarcaChange?: () => void;
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
  onCorMarcaChange,
}: VerseCardProps) {
  const ref = `${livroNome} ${capitulo}:${numero}`;
  const articleRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState(false);
  const [showMobileColor, setShowMobileColor] = useState(false);
  const [showLongPressColor, setShowLongPressColor] = useState(false);
  const mobileColorRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPressRef = useRef(false);

  useEffect(() => {
    if ((isCurrentAudioVerse || isFocused) && articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: 'smooth', block: isFocused ? 'center' : 'center' });
    }
  }, [isCurrentAudioVerse, isFocused]);

  useEffect(() => {
    if (!isSelected) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (articleRef.current && !articleRef.current.contains(e.target as Node)) {
        onSelect();
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isSelected, onSelect]);

  useEffect(() => {
    if (!showMobileColor) return;
    const handler = (e: MouseEvent) => {
      if (mobileColorRef.current && !mobileColorRef.current.contains(e.target as Node)) {
        setShowMobileColor(false);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [showMobileColor]);

  useEffect(() => {
    if (!showLongPressColor) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setShowLongPressColor(false);
      }
    };
    window.addEventListener('mousedown', handler);
    window.addEventListener('touchstart', handler);
    return () => {
      window.removeEventListener('mousedown', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [showLongPressColor]);

  const handlePointerDown = useCallback(() => {
    didLongPressRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      didLongPressRef.current = true;
      setShowLongPressColor(true);
    }, 500);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (didLongPressRef.current) {
      e.preventDefault();
      e.stopPropagation();
      didLongPressRef.current = false;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    };
  }, []);

  const corAtual = getMarcador(livroAbreviacao, capitulo, numero, traducao)?.cor ?? null;
  const corBgMapInline: Record<CorMarcador, string> = {
    yellow: 'bg-yellow-400',
    green: 'bg-green-400',
    blue: 'bg-blue-400',
    pink: 'bg-pink-400',
    orange: 'bg-orange-400',
    purple: 'bg-purple-400',
  };

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
      <div
        ref={articleRef}
        tabIndex={-1}
        aria-label={`Versículo ${numero} de ${livroNome} ${capitulo}${isSelected ? ' (selecionado)' : ''}`}
        onClick={onSelect}
        onClickCapture={handleClickCapture}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        className={cn(
          'group relative cursor-pointer rounded-lg',
          'transition-all duration-200 animate-verse-fade-in',
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
          <div className={cn(
            'shrink-0 transition-all duration-150 hidden lg:block',
            (showActions || isSelected) ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          )}>
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
          </div>
        </div>

        {/* Long-press color picker popup */}
        {showLongPressColor && (
          <div
            ref={colorRef}
            className="absolute left-3 sm:left-4 top-full mt-1 z-30 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-xl p-2 flex gap-2"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {CORES.map((cor) => (
              <button
                key={cor}
                onClick={(e) => {
                  e.stopPropagation();
                  if (corAtual === cor) removeMarcador(livroAbreviacao, capitulo, numero, traducao);
                  else setMarcador(livroAbreviacao, capitulo, numero, traducao, cor);
                  setShowLongPressColor(false);
                  onCorMarcaChange?.();
                }}
                className={cn(
                  'w-8 h-8 rounded-full transition-all active:scale-90',
                  corBgMapInline[cor],
                  corAtual === cor && 'ring-2 ring-offset-2 ring-[var(--brand-default)]'
                )}
                aria-label={`Marcar ${cor}`}
              />
            ))}
          </div>
        )}

        {/* Mobile inline action row */}
        {isSelected && (
          <div className="flex lg:hidden items-center gap-1 mt-2 pt-2 border-t border-[var(--border)]/20 animate-[slideDown_0.2s_ease-out]">
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorito(livroAbreviacao, capitulo, numero, traducao, texto); onFavoritoChange(); }}
              className={cn('flex items-center justify-center w-11 h-11 rounded-lg transition-all active:scale-90', isFavorito ? 'text-red-500 bg-red-500/10' : 'text-[var(--content-muted)] hover:text-red-500 hover:bg-red-500/10')}
              aria-label={isFavorito ? 'Remover favorito' : 'Favoritar'}
            >
              <Heart className="w-4.5 h-4.5" fill={isFavorito ? 'currentColor' : 'none'} />
            </button>
            <div className="relative" ref={mobileColorRef}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowMobileColor(!showMobileColor); }}
                className={cn('flex items-center justify-center w-11 h-11 rounded-lg transition-all active:scale-90', corAtual ? 'text-white' : 'text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:bg-[var(--brand-subtle)]')}
                style={corAtual ? { backgroundColor: corAtual === 'yellow' ? '#facc15' : corAtual === 'green' ? '#4ade80' : corAtual === 'blue' ? '#60a5fa' : corAtual === 'pink' ? '#f472b6' : corAtual === 'orange' ? '#fb923c' : '#a78bfa' } : undefined}
                aria-label="Cor"
              >
                <Palette className="w-4.5 h-4.5" />
              </button>
              {showMobileColor && (
                <div className="absolute left-0 bottom-full mb-1.5 z-30 bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg shadow-xl p-2 flex gap-1.5">
                  {CORES.map((cor) => (
                    <button
                      key={cor}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (corAtual === cor) removeMarcador(livroAbreviacao, capitulo, numero, traducao);
                        else setMarcador(livroAbreviacao, capitulo, numero, traducao, cor);
                        setShowMobileColor(false);
                      }}
                      className={cn('w-7 h-7 rounded-full transition-all active:scale-90', corBgMapInline[cor], corAtual === cor && 'ring-2 ring-offset-1 ring-[var(--brand-default)]')}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); copyVerse(texto, ref); }}
              className={cn('flex items-center justify-center w-11 h-11 rounded-lg transition-all active:scale-90', copiedVerse === ref ? 'text-green-500 bg-green-500/10' : 'text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:bg-[var(--brand-subtle)]')}
              aria-label="Copiar"
            >
              <Copy className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAnotar(); }}
              className="flex items-center justify-center w-11 h-11 rounded-lg text-[var(--content-muted)] hover:text-amber-500 hover:bg-amber-500/10 transition-all active:scale-90"
              aria-label="Anotar"
            >
              <StickyNote className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onStrong(); }}
              className="flex items-center justify-center w-11 h-11 rounded-lg text-[var(--content-muted)] hover:text-cyan-500 hover:bg-cyan-500/10 transition-all active:scale-90"
              aria-label="IA / Léxico"
            >
              <Brain className="w-4.5 h-4.5" />
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
});
