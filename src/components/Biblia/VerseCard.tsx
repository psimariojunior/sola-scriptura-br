'use client';

import { memo, Fragment, useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';
import { VerseActions } from './VerseActions';
import { VerseComments, CommentBadge } from './VerseComments';
import { Heart, Copy, Share2, ImageIcon, BookOpen, Maximize2, Languages } from 'lucide-react';
import { toggleFavorito } from '@/lib/estudos';
import { hrefInterlinear } from '@/lib/bibliaHref';
import { setMarcador, removeMarcador, getMarcador, CORES, COR_SIGNIFICADO, MARCA_CLASSE, type CorMarcador } from '@/lib/marcadores';
import { useMarcaVerso } from '@/hooks/useMarcadores';
import { VerseQuickBar } from './VerseQuickBar';
import { MobileVersePanel } from '@/components/MobileVersePanel';
import { ClickableVerse } from './ClickableVerse';
import { TextSelectionBar } from './TextSelectionBar';
import { VerseFocusOverlay } from './VerseFocusOverlay';
import { compartilharVersiculo } from '@/lib/compartilharVersiculo';
import { EstudoDoVerso } from './EstudoDoVerso';
import { ShareVerseImageModal } from '@/components/ShareVerseImageModal';

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
  karaokeProgress?: number;
  onCorMarcaChange?: () => void;
  studyMode?: boolean;
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
  onCompartilharImagem: _onCompartilharImagem,
  onAprofundar,
  onCompartilharSala,
  onAbrirPainel,
  onDeselect,
  hideMobileActions = false,
  verseKey,
  isCurrentAudioVerse = false,
  hasResources: hasResourcesProp = false,
  karaokeProgress = 0,
  onCorMarcaChange,
  studyMode = false,
}: VerseCardProps) {
  const ref = `${livroNome} ${capitulo}:${numero}`;
  const articleRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState(false);
  const [showMobileColor, setShowMobileColor] = useState(false);
  const [showLongPressColor, setShowLongPressColor] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFocusOverlay, setShowFocusOverlay] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [textoImagem, setTextoImagem] = useState<string | null>(null);
  const [commentsRefreshKey, setCommentsRefreshKey] = useState(0);
  const textoRef = useRef<HTMLDivElement>(null);
  const marcaLive = useMarcaVerso(livroAbreviacao, capitulo, numero, traducao);
  const mobileColorRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPressRef = useRef(false);
  const pressStartRef = useRef<{ x: number; y: number } | null>(null);

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

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    didLongPressRef.current = false;
    pressStartRef.current = { x: e.clientX, y: e.clientY };
    longPressTimerRef.current = setTimeout(() => {
      didLongPressRef.current = true;
      setShowLongPressColor(true);
    }, 500);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const start = pressStartRef.current;
    if (!start || !longPressTimerRef.current) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (dx * dx + dy * dy > 64) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
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

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
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

  const corAtual = marcaLive?.cor ?? getMarcador(livroAbreviacao, capitulo, numero, traducao)?.cor ?? corMarca;

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
        onClick={() => {
          if (window.getSelection()?.toString()) return;
          onSelect();
        }}
        onClickCapture={handleClickCapture}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        style={{ fontSize: `${fontSize}px` }}
        className={cn(
          'group relative cursor-pointer bible-verse-row',
          'transition-colors duration-200 animate-verse-fade-in',
          'rounded-md',
          isCurrentAudioVerse && 'verse-karaoke-active',
          isCurrentAudioVerse
            ? 'bg-primary/[0.07]'
            : isFocused || isSelected
            ? 'bg-primary/[0.05]'
            : isPlaying || isHighlighted
            ? 'bg-primary/[0.04]'
            : studyMode && 'hover:bg-primary/[0.03]',
          studyMode && 'border-l-2 border-l-[var(--brand-default)]/25 pl-1 -ml-1',
          studyMode && isSelected && 'border-l-[var(--brand-default)]',
          corAtual && MARCA_CLASSE[corAtual as CorMarcador]
        )}
      >
        {isSelected && (
          <div className="lg:hidden absolute right-1 top-1 z-10 flex gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTextoImagem(null);
                setShowImageModal(true);
              }}
              className="p-2 rounded-full bg-[var(--surface-raised)]/95 border border-[var(--border)]/40 text-[var(--content-secondary)] shadow-sm"
              aria-label="Criar imagem do versículo"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void compartilharVersiculo({
                  livro: livroNome,
                  capitulo,
                  versiculo: numero,
                  texto,
                  traducao,
                });
              }}
              className="p-2 rounded-full bg-[var(--surface-raised)]/95 border border-[var(--border)]/40 text-[var(--content-secondary)] shadow-sm"
              aria-label="Compartilhar versículo"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-start gap-2.5 sm:gap-3.5">
          {!hideNumber && (
            <span
              className={cn(
                'bible-verse-hanging',
                (isSelected || isPlaying || isCurrentAudioVerse || isFocused) && 'is-active'
              )}
              aria-hidden="true"
            >
              {numero}
            </span>
          )}

          <div className="flex-1 min-w-0" ref={textoRef}>
            <ClickableVerse
              text={texto}
              livroAbreviacao={livroAbreviacao}
              capitulo={capitulo}
              numero={numero}
              trechos={marcaLive?.trechos}
              karaokeActive={isCurrentAudioVerse && karaokeProgress > 0}
              karaokeProgress={karaokeProgress}
              className="bible-reading-text font-serif-body text-[var(--content-primary)]"
              style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing ?? 1.85, fontFamily: fontFamilyCss }}
            />

            {isSelected && (
              <div className="hidden lg:block">
                <VerseQuickBar
                  livroNome={livroNome}
                  livroAbreviacao={livroAbreviacao}
                  capitulo={capitulo}
                  versiculo={numero}
                  traducao={traducao}
                  texto={texto}
                  isFavorito={isFavorito}
                  temAnotacao={temAnotacao}
                  onFavoritoChange={onFavoritoChange}
                  onAnotar={onAnotar}
                  onClose={onDeselect}
                  variant="inline"
                />
              </div>
            )}

            {(isSelected || studyMode) && (
              <Link
                href={hrefInterlinear(livroAbreviacao, capitulo, numero)}
                onClick={(e) => e.stopPropagation()}
                className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--brand-default)] hover:underline"
              >
                <Languages className="w-3.5 h-3.5" />
                Original deste verso
              </Link>
            )}

            {anotacaoPreview && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAnotar(); }}
                className="mt-2 w-full text-left text-xs italic text-[var(--content-muted)] leading-relaxed line-clamp-2 border-l-2 border-primary/40 pl-2.5 hover:text-[var(--content-secondary)]"
              >
                {anotacaoPreview}
              </button>
            )}

            {(isSelected || (studyMode && hasResourcesProp)) && (
              <EstudoDoVerso
                livro={livroAbreviacao}
                capitulo={capitulo}
                verso={numero}
                texto={texto}
                fontSize={fontSize}
                expanded={isSelected}
                onOpenFull={isSelected ? () => onAbrirPainel?.('estudo') : undefined}
              />
            )}

            {!studyMode && !isSelected && hasResourcesProp && (
              <span className="bible-study-inline inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold tracking-wide uppercase text-[var(--brand-default)]/80">
                Estudo
              </span>
            )}
          </div>

          {(showActions || isSelected) && (
          <div
            className="hidden lg:flex absolute right-0 top-0 z-10 items-center gap-0.5 rounded-md bg-[var(--surface-raised)]/95 backdrop-blur-sm px-0.5 shadow-sm border border-[var(--border)]/40"
          >
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
          )}
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
                title={`${COR_SIGNIFICADO[cor].label} — ${COR_SIGNIFICADO[cor].uso}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (corAtual === cor) removeMarcador(livroAbreviacao, capitulo, numero, traducao);
                  else setMarcador(livroAbreviacao, capitulo, numero, traducao, cor);
                  setShowLongPressColor(false);
                  onCorMarcaChange?.();
                }}
                className={cn(
                  'min-h-11 min-w-11 rounded-full transition-all active:scale-90',
                  COR_SIGNIFICADO[cor].swatch,
                  corAtual === cor && 'ring-2 ring-offset-2 ring-[var(--brand-default)]'
                )}
                aria-label={`Marcar ${COR_SIGNIFICADO[cor].label}`}
              />
            ))}
            {corAtual && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMarcador(livroAbreviacao, capitulo, numero, traducao);
                  setShowLongPressColor(false);
                  onCorMarcaChange?.();
                }}
                className="min-h-11 px-2 rounded-lg text-xs font-semibold text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
              >
                Limpar
              </button>
            )}
          </div>
        )}

        {/* Mobile inline action panel - only show when PainelDoVersiculo is NOT open */}
        {isSelected && !hideMobileActions && (
          <div className="lg:hidden mt-2 pt-2 border-t border-[var(--border)]/20 animate-[slideDown_0.2s_ease-out]">
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorito(livroAbreviacao, capitulo, numero, traducao, texto); if (navigator?.vibrate) navigator.vibrate([10, 50, 10]); onFavoritoChange(); }}
                className={cn('flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl transition-all active:scale-95', isFavorito ? 'text-white bg-red-500' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]')}
                aria-label={isFavorito ? 'Remover favorito' : 'Favoritar'}
              >
                <Heart className="w-5 h-5" fill={isFavorito ? 'currentColor' : 'none'} />
                <span className="text-[10px] font-medium">Favorito</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); copyVerse(texto, ref); }}
                className={cn('flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl transition-all active:scale-95', copiedVerse === ref ? 'text-white bg-green-500' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]')}
                aria-label="Copiar"
              >
                <Copy className="w-5 h-5" />
                <span className="text-[10px] font-medium">Copiar</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  void compartilharVersiculo({
                    livro: livroNome,
                    capitulo,
                    versiculo: numero,
                    texto,
                    traducao,
                  });
                }}
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95"
                aria-label="Compartilhar"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-[10px] font-medium">Compartilhar</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTextoImagem(null);
                  setShowImageModal(true);
                }}
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-default)] transition-all active:scale-95"
                aria-label="Criar imagem"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Imagem</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowFocusOverlay(true); }}
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95"
                aria-label="Visão completa"
              >
                <Maximize2 className="w-5 h-5" />
                <span className="text-[10px] font-medium">Estudar</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowMobilePanel(true); }}
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95"
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

      <TextSelectionBar
        containerRef={textoRef}
        textoCompleto={texto}
        livro={livroAbreviacao}
        capitulo={capitulo}
        versiculo={numero}
        traducao={traducao}
        onImagem={(trecho) => {
          setTextoImagem(trecho);
          setShowImageModal(true);
        }}
        onCopiar={(trecho) => {
          void navigator.clipboard.writeText(`"${trecho}"\n\n— ${ref}`).catch(() => {});
        }}
      />

      {showImageModal && (
      <ShareVerseImageModal
        open={showImageModal}
        onClose={() => { setShowImageModal(false); setTextoImagem(null); }}
        verse={{
          livroNome,
          capitulo,
          versiculo: numero,
          texto: textoImagem || texto,
          traducao,
        }}
      />
      )}
    </Fragment>
  );
});
