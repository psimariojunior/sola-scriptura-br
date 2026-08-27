'use client';

import { memo, Fragment, useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';
import { VerseActions } from './VerseActions';
import { VerseComments, CommentBadge } from './VerseComments';
import { Heart, Palette, Copy, StickyNote, Languages, MessageSquare, Share2, Sparkles, ImageIcon, Users, BookOpen, Maximize2 } from 'lucide-react';
import { toggleFavorito } from '@/lib/estudos';
import { setMarcador, removeMarcador, getMarcador, CORES, type CorMarcador } from '@/lib/marcadores';
import { MobileVersePanel } from '@/components/MobileVersePanel';
import { ClickableVerse } from './ClickableVerse';
import { VerseFocusOverlay } from './VerseFocusOverlay';

export interface VerseCardProps {
  numero: number;
  texto: string;
  livroAbreviacao: string;
  livroNome: string;
  capitulo: number;
  traducao: string;
  fontSize: number;
  lineSpacing?: number;
  fontFamily?: 'serif' | 'sans';
  hideNumber?: boolean;
  isSelected: boolean;
  isPlaying: boolean;
  isHighlighted: boolean;
  isFocused: boolean;
  isFavorito: boolean;
  corMarca: string | null;
  temAnotacao: boolean;
  anotacaoPreview?: string | null;
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
  onApresentar?: () => void;
  onCompartilharImagem?: () => void;
  onAprofundar?: () => void;
  onCompartilharSala?: () => void;
  onAbrirPainel?: (tab?: string) => void;
  onDeselect?: () => void;
  hideMobileActions?: boolean;
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
  lineSpacing,
  fontFamily = 'serif',
  hideNumber = false,
  isSelected,
  isPlaying,
  isHighlighted,
  isFocused,
  isFavorito,
  corMarca,
  temAnotacao,
  anotacaoPreview = null,
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
  onApresentar,
  onCompartilharImagem,
  onAprofundar,
  onCompartilharSala,
  onAbrirPainel,
  onDeselect,
  hideMobileActions = false,
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
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFocusOverlay, setShowFocusOverlay] = useState(false);
  const [commentsRefreshKey, setCommentsRefreshKey] = useState(0);
  const mobileColorRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPressRef = useRef(false);

  useEffect(() => {
    if ((isCurrentAudioVerse || isFocused) && articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isCurrentAudioVerse, isFocused]);

  // Click/touch outside to deselect verse
  useEffect(() => {
    if (!isSelected) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (articleRef.current && !articleRef.current.contains(target)) {
        if (target instanceof Element && (target.closest('[role="dialog"]') || target.closest('.painel-versiculo'))) return;
        onDeselect?.();
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isSelected, onDeselect]);

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

  const fontFamilyCss = fontFamily === 'sans' ? "'Inter', system-ui, sans-serif" : "'Spectral', Georgia, serif";

  return (
    <Fragment>
      <div
        ref={articleRef}
        id={`verse-${numero}`}
        data-verse={numero}
        role="article"
        aria-current={isCurrentAudioVerse ? 'true' : undefined}
        tabIndex={-1}
        aria-label={`Versículo ${numero} de ${livroNome} ${capitulo}${isSelected ? ' (selecionado)' : ''}${isCurrentAudioVerse ? ' (reproduzindo áudio)' : ''}`}
        onClick={onSelect}
        onClickCapture={handleClickCapture}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        className={cn(
          'group relative cursor-pointer',
          'transition-colors duration-200 animate-verse-fade-in',
          'px-1 sm:px-2 -mx-1 sm:-mx-2',
          'py-2 sm:py-2.5',
          isCurrentAudioVerse
            ? 'bg-primary/[0.08] border-l-2 border-l-primary'
            : isFocused || isSelected
            ? 'bg-primary/[0.06] border-l-2 border-l-primary/70'
            : isPlaying || isHighlighted
            ? 'bg-primary/[0.04] border-l-2 border-l-primary/40'
            : 'border-l-2 border-l-transparent hover:bg-primary/[0.03] hover:border-l-primary/25',
          corMarca && corBgMap[corMarca]
        )}
      >
        <div className="flex items-start gap-2.5 sm:gap-4">
          {/* Verse number badge */}
          {!hideNumber && (
            <span
              className={cn(
                'bible-verse-number shrink-0 mt-1',
                (isSelected || isPlaying || isCurrentAudioVerse || isFocused) && 'is-active'
              )}
              aria-hidden="true"
            >
              {numero}
            </span>
          )}

          <div className="flex-1 min-w-0">
            {/* Verse text - clickable words for lexicon */}
            <ClickableVerse
              text={texto}
              livroAbreviacao={livroAbreviacao}
              capitulo={capitulo}
              numero={numero}
              className="font-serif-body text-[var(--content-primary)] tracking-[0.01em]"
              style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing ?? undefined, fontFamily: fontFamilyCss }}
            />

            {anotacaoPreview && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAnotar(); }}
                className="mt-2 w-full text-left text-xs italic text-[var(--content-muted)] leading-relaxed line-clamp-2 border-l-2 border-primary/40 pl-2.5 hover:text-[var(--content-secondary)]"
              >
                {anotacaoPreview}
              </button>
            )}

            {/* Subtle resource indicator */}
            {hasResourcesProp && (
              <span
                className="inline-block mt-1 w-1 h-1 rounded-full bg-primary/50"
                title="Recursos disponíveis"
              />
            )}
          </div>

          {/* Actions - appear on hover/selection */}
          <div className={cn(
            'shrink-0 transition-all duration-150 hidden lg:block',
            (showActions || isSelected) ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          )}>
            <div className="flex items-center gap-0.5">
              <CommentBadge
                livroAbreviacao={livroAbreviacao}
                capitulo={capitulo}
                versiculo={numero}
                onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
                refreshKey={commentsRefreshKey}
              />
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
          </div>
        </div>

        {/* Long-press color picker popup */}
        {showLongPressColor && (
          <div
            ref={colorRef}
            className="absolute left-0 top-full mt-1 z-30 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-xl p-2 flex gap-1.5"
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

        {/* Mobile inline action panel - only show when PainelDoVersiculo is NOT open */}
        {isSelected && !hideMobileActions && (
          <div className="lg:hidden mt-2 pt-2 border-t border-[var(--border)]/20 animate-[slideDown_0.2s_ease-out]">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorito(livroAbreviacao, capitulo, numero, traducao, texto); if (navigator?.vibrate) navigator.vibrate([10, 50, 10]); onFavoritoChange(); }}
                className={cn('flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all active:scale-95', isFavorito ? 'text-white bg-red-500' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]')}
                aria-label={isFavorito ? 'Remover favorito' : 'Favoritar'}
              >
                <Heart className="w-5 h-5" fill={isFavorito ? 'currentColor' : 'none'} />
                <span className="text-[10px] font-medium">Favorito</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); copyVerse(texto, ref); }}
                className={cn('flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all active:scale-95', copiedVerse === ref ? 'text-white bg-green-500' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]')}
                aria-label="Copiar"
              >
                <Copy className="w-5 h-5" />
                <span className="text-[10px] font-medium">Copiar</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowFocusOverlay(true); }}
                className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-default)] transition-all active:scale-95"
                aria-label="Visão completa"
              >
                <Maximize2 className="w-5 h-5" />
                <span className="text-[10px] font-medium">Estudar</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowMobilePanel(true); }}
                className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95"
                aria-label="Mais opções"
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-[10px] font-medium">Mais</span>
              </button>
            </div>
            {/* Focus overlay button - desktop only */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowFocusOverlay(true); }}
              className="hidden lg:flex items-center gap-1.5 mt-2 w-full justify-center py-2 rounded-lg bg-[var(--brand-subtle)]/50 text-[var(--brand-default)] text-[10px] font-semibold hover:bg-[var(--brand-subtle)] transition-colors"
            >
              <Maximize2 className="w-3 h-3" />Visão Completa do Versículo
            </button>
          </div>
        )}
      </div>

      <MobileVersePanel
        livro={livroNome}
        livroAbrev={livroAbreviacao}
        capitulo={capitulo}
        versiculo={numero}
        texto={texto}
        traducao={traducao}
        aberto={showMobilePanel}
        onFechar={() => setShowMobilePanel(false)}
        isFavorito={isFavorito}
        onFavoritoChange={onFavoritoChange}
        onAnotar={onAnotar}
        onStrong={onStrong}
        onComentarios={onComentarios}
        copyVerse={copyVerse}
        copiedVerse={copiedVerse}
      />

      <VerseComments
        livroAbreviacao={livroAbreviacao}
        capitulo={capitulo}
        versiculo={numero}
        open={showComments}
        onFechar={() => { setShowComments(false); setCommentsRefreshKey((k) => k + 1); }}
      />

      <VerseFocusOverlay
        open={showFocusOverlay}
        onClose={() => setShowFocusOverlay(false)}
        livroAbreviacao={livroAbreviacao}
        livroNome={livroNome}
        capitulo={capitulo}
        versiculo={numero}
        texto={texto}
        traducao={traducao}
      />
    </Fragment>
  );
});
