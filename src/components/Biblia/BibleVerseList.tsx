'use client';

import { Suspense, useState, useRef, useCallback, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, WifiOff, Heart, Copy, Share2, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChapterHeader } from './ChapterHeader';
import { VerseListItem } from './VerseListItem';
import { PericopeHeading } from './PericopeHeading';
import { EstudoDoVerso } from './EstudoDoVerso';
import { PerguntaDoCapitulo } from './PerguntaDoCapitulo';
import { ProgressBar } from './ProgressBar';
import { ComparisonTable } from './ComparisonTable';
import { SyncedParallelColumns } from './SyncedParallelColumns';
import ReadingPlanBanner from '@/components/ReadingPlanBanner';
import { NotesPanelSection } from './NotesPanelSection';
import type { UseBibliaNavigationReturn } from '@/hooks/biblia/useBibliaNavigation';
import type { UseBibliaUIReturn } from '@/hooks/biblia/useBibliaUI';
import type { UseBibliaVerseReturn } from '@/hooks/biblia/useBibliaVerse';
import type { UseBibliaPanelsReturn } from '@/hooks/biblia/useBibliaPanels';
import { labelMap, nomeMap, tradBadgeColors } from './TranslationDropdown';
import { authService } from '@/lib/auth';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import { useFlashcards } from '@/hooks/useFlashcards';
import dynamic from 'next/dynamic';

import { ClickableVerse } from './ClickableVerse';
import { IntroLivroLeitura } from './IntroLivroLeitura';
import { useLongPress } from '@/hooks/useLongPress';
import { toggleFavorito } from '@/lib/estudos';
import { karaokeProgressFromAudio } from '@/lib/karaokeWords';

const InterlinearView = dynamic(() => import('@/components/InterlinearView').then(m => ({ default: m.InterlinearView })), { ssr: false });
const PainelEstudosCapitulo = dynamic(() => import('./PainelEstudosCapitulo'));
const PainelEstudosInline = dynamic(() => import('@/components/PainelEstudosInline'));

function agruparPorPericope<T extends { numero: number }>(
  versiculos: T[],
  pericopeStarts: Map<number, { titulo: string; tema: string }>,
) {
  const grupos: { heading: { titulo: string; tema: string } | null; verses: T[] }[] = [];
  for (const v of versiculos) {
    const heading = pericopeStarts.get(v.numero) ?? null;
    if (heading || grupos.length === 0) {
      grupos.push({ heading, verses: [v] });
    } else {
      grupos[grupos.length - 1].verses.push(v);
    }
  }
  return grupos;
}

function PanelFallback() {
  return (<div className="flex items-center justify-center py-8"><div className="flex gap-1.5"><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0s]" /><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" /><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" /></div></div>);
}

interface BibleVerseListProps {
  nav: UseBibliaNavigationReturn;
  ui: UseBibliaUIReturn;
  verse: UseBibliaVerseReturn;
  panels: Pick<UseBibliaPanelsReturn, 'setSidePanelWidth' | 'setSidePanelTab' | 'paywallAprofundarAberto' | 'setPaywallAprofundarAberto'>;
  audio: ReturnType<typeof useVerseAudio>;
  audioNatural: ReturnType<typeof useAudioNatural>;
  flashcards: ReturnType<typeof useFlashcards>;
  verseResources: { hasResources: (livro: string, cap: number, ver: number) => boolean };
  capituloAudio: {
    state: {
      isPlaying: boolean;
      isLoading?: boolean;
      isPaused?: boolean;
      currentVerseIndex: number;
      currentTime?: number;
      duration?: number;
      speechFallback?: boolean;
    };
    stop: () => void;
  };
  isFavorito: (livro: string, cap: number, ver: number, trad: string) => boolean;
  refresh: () => void;
  swipeHandlers: Record<string, unknown>;
  swipeOffset: number;
  swipeProgress: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  handleDeselectVerse: () => void;
  stableHandleSelectFromList: (livro: string, cap: number, ver: number, traducao: string, texto: string) => void;
  stableSetAnotandoVersiculo: (key: string) => void;
  stableSetComentarioVersiculo: (num: number | null) => void;
  stableSetEstudoAberto: (num: number | null) => void;
  painelVersiculoAberto: boolean;
  setPainelVersiculoAberto: (v: boolean) => void;
  setPainelTabInicial: (tab: string | undefined) => void;
  onSetMostrarApresentacao: (v: boolean) => void;
  onSetShareOpen: (v: boolean) => void;
}

export function BibleVerseList({
  nav, ui, verse, panels, audio, audioNatural, flashcards, verseResources,
  capituloAudio, isFavorito, refresh, swipeHandlers, swipeOffset, swipeProgress,
  canGoPrev, canGoNext, handleDeselectVerse, stableHandleSelectFromList,
  stableSetAnotandoVersiculo, stableSetComentarioVersiculo, stableSetEstudoAberto,
  painelVersiculoAberto, setPainelVersiculoAberto, setPainelTabInicial,
  onSetMostrarApresentacao, onSetShareOpen,
}: BibleVerseListProps) {
  const { t } = useTranslation();

  const [longPressMenu, setLongPressMenu] = useState<{
    livroAbrev: string; capitulo: number; versiculo: number;
    traducao: string; texto: string; x: number; y: number;
  } | null>(null);
  const longPressVerseRef = useRef<{
    livroAbrev: string; capitulo: number; versiculo: number;
    traducao: string; texto: string;
  } | null>(null);
  const longPressPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleLongPress = useCallback(() => {
    if (longPressVerseRef.current) {
      setLongPressMenu({
        ...longPressVerseRef.current,
        x: longPressPosRef.current.x,
        y: longPressPosRef.current.y,
      });
    }
  }, []);

  const longPress = useLongPress({
    delay: 500,
    onLongPress: handleLongPress,
  });

  const isModoLeitura = ui.modoLeitura === 'foco';
  const isModoEstudo = ui.modoLeitura === 'estudo';
  const audioVerseActive = !!(capituloAudio.state.isPlaying || capituloAudio.state.isLoading);
  const hasAudioClock =
    (capituloAudio.state.currentTime ?? 0) > 0 && (capituloAudio.state.duration ?? 0) > 0;
  const karaokeProgress = hasAudioClock
    ? karaokeProgressFromAudio(
        capituloAudio.state.currentTime ?? 0,
        capituloAudio.state.duration ?? 0,
      )
    : 0;

  useEffect(() => {
    if (!audioVerseActive) return;
    const numero = (capituloAudio.state.currentVerseIndex ?? -1) + 1;
    if (numero < 1) return;
    const el = document.getElementById(`verse-${numero}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [audioVerseActive, capituloAudio.state.currentVerseIndex]);

  // Last read position
  const [lastRead, setLastRead] = useState<{ livro: string; capitulo: number } | null>(null);
  const [showLastRead, setShowLastRead] = useState(false);

  // Check if current view is the last read position (capitulo salvo é 1-indexado)
  const isCurrentLastRead = lastRead?.livro === nav.livro.abreviacao && lastRead?.capitulo === nav.capituloIdx + 1;

  // Recarrega a última leitura sempre que o capítulo/livro mudar (corrigido: era useState, nunca reavaliava)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('ssb_last_read');
      if (raw) {
        const data = JSON.parse(raw);
        setLastRead(data);
        // Mostra o banner só se NÃO estivermos já naquela posição
        setShowLastRead(data.livro !== nav.livro.abreviacao || data.capitulo !== nav.capituloIdx + 1);
      } else {
        setShowLastRead(false);
      }
    } catch {}
  }, [nav.livro.abreviacao, nav.capituloIdx]);

  const [pericopeStarts, setPericopeStarts] = useState<Map<number, { titulo: string; tema: string }>>(new Map());
  useEffect(() => {
    let cancelled = false;
    import('@/data/biblia/pericopes').then((mod) => {
      if (cancelled) return;
      setPericopeStarts(mod.getPericopeStartsInChapter(nav.livro.nome, nav.capituloIdx + 1));
    }).catch(() => {
      if (!cancelled) setPericopeStarts(new Map());
    });
    return () => { cancelled = true; };
  }, [nav.livro.nome, nav.capituloIdx]);

  const getLivroNome = (abrev: string) => {
    const { LIVROS_AT, LIVROS_NT } = require('@/data/biblia/livros');
    const all = [...LIVROS_AT, ...LIVROS_NT];
    return all.find((l: { abreviacao: string }) => l.abreviacao === abrev)?.nome || abrev;
  };

  return (
    <div ref={nav.mainRef} className="flex-1 overflow-y-auto" {...swipeHandlers}>
      <div
        className={cn(
          'bible-reading-column px-5 sm:px-8 pb-24 md:pb-12',
          isModoLeitura ? 'is-leitura-page py-8 sm:py-14' : 'py-6 sm:py-10',
        )}
        style={swipeOffset === 0 ? undefined : { transform: `translateX(${swipeOffset}px)`, transition: 'none' }}
      >
        {ui.showPlan && !isModoLeitura && <ReadingPlanBanner />}
        {showLastRead && lastRead && !isCurrentLastRead && (
          isModoLeitura ? (
            <p className="mb-8 text-center text-[12px] text-[var(--content-muted)]">
              <button
                type="button"
                onClick={() => {
                  const { LIVROS_AT, LIVROS_NT } = require('@/data/biblia/livros');
                  const all = [...LIVROS_AT, ...LIVROS_NT];
                  const idx = all.findIndex((l: { abreviacao: string }) => l.abreviacao === lastRead.livro);
                  if (idx !== -1) nav.goToBook(idx, lastRead.capitulo - 1);
                  setShowLastRead(false);
                }}
                className="hover:text-[var(--brand-default)] underline-offset-4 hover:underline"
              >
                Continuar em {getLivroNome(lastRead.livro)} {lastRead.capitulo}
              </button>
              <button type="button" onClick={() => setShowLastRead(false)} className="ml-3 opacity-60 hover:opacity-100" aria-label="Dispensar">
                ×
              </button>
            </p>
          ) : (
          <div className="mb-4 p-3 rounded-xl bg-[var(--brand-subtle)]/50 border border-[var(--brand-default)]/15 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-default)]/10 flex items-center justify-center shrink-0">
              <Bookmark className="w-4 h-4 text-[var(--brand-default)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--brand-default)]">Continuar lendo</p>
              <p className="text-[11px] text-[var(--content-muted)] truncate">
                {getLivroNome(lastRead.livro)} {lastRead.capitulo}
              </p>
            </div>
            <button
              onClick={() => {
                const { LIVROS_AT, LIVROS_NT } = require('@/data/biblia/livros');
                const all = [...LIVROS_AT, ...LIVROS_NT];
                const idx = all.findIndex((l: { abreviacao: string }) => l.abreviacao === lastRead.livro);
                if (idx !== -1) nav.goToBook(idx, lastRead.capitulo - 1);
                setShowLastRead(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--brand-default)] text-[var(--brand-contrast)] text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-1"
            >
              Ir <ChevronRight className="w-3 h-3" />
            </button>
            <button onClick={() => setShowLastRead(false)} className="p-1 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
              <span className="sr-only">Fechar</span>
              ×
            </button>
          </div>
          )
        )}
        {nav.loading && !nav.temDados ? (
          <div className="space-y-4 chapter-enter"><div className="skeleton skeleton-title w-48 mx-auto animate-pulse" /><div className="ornament w-20 mx-auto mb-8 opacity-30" />
            {Array.from({ length: 10 }).map((_, i) => (<div key={i} className="flex gap-3 items-center" style={{ animationDelay: `${i * 50}ms` }}><div className="skeleton skeleton-text w-10 h-10 shrink-0 rounded-lg" /><div className="skeleton skeleton-text flex-1 rounded" style={{ width: `${[75, 85, 65, 90, 70, 80, 60, 95, 72, 88][i]}%` }} /></div>))}
          </div>
        ) : nav.offlineUnavailable ? (
          <div className="text-center py-20"><WifiOff className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} /><p className="text-lg text-[var(--content-muted)]">{t('biblia.chapterOffline')}</p><p className="text-sm text-[var(--content-muted)] mt-2">{t('biblia.connectOrDownload')}</p></div>
        ) : nav.temDados ? (
            <div role="article" aria-label={`${nav.livro.nome} capítulo ${nav.capituloIdx + 1}`} className={cn(isModoLeitura && 'reading-mode-leitura', isModoEstudo && 'reading-mode-estudo')}>
            {nav.loading && nav.temDados && (<div className="fixed top-0 left-0 right-0 z-20 h-0.5 bg-[var(--brand-default)]/20"><div className="h-full bg-[var(--brand-default)] animate-loading-bar" /></div>)}
            <ChapterHeader
              livroNome={nav.livro.nome}
              livroAbreviacao={nav.livro.abreviacao}
              capitulo={nav.capituloIdx + 1}
              totalCapitulos={nav.livro.totalCapitulos}
              totalVersiculos={nav.data[0]?.versiculos?.length ?? 0}
              variant={isModoLeitura ? 'leitura' : 'estudo'}
            />
            {!isModoLeitura && (
              <>
                <IntroLivroLeitura livroAbrev={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} nomeLivro={nav.livro.nome} />
                {nav.estudoCapitulo && (
                  <div className={cn("mb-4 rounded-lg border border-[var(--brand-default)]/15 bg-[var(--brand-subtle)]/40 transition-all", ui.estudoCapituloAberto ? "p-3" : "px-3 py-2")}>
                    <button onClick={() => ui.setEstudoCapituloAberto(o => !o)} className="w-full flex items-center gap-2 text-left group" aria-expanded={ui.estudoCapituloAberto}>
                      <div className="w-7 h-7 rounded-md bg-[var(--brand-default)]/10 flex items-center justify-center shrink-0"><BookOpen className="w-3.5 h-3.5 text-[var(--brand-default)]" /></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-default)] block">{t('biblia.chapterStudy')}</span>
                        <span className="text-xs text-[var(--content-muted)] truncate block">{nav.estudoCapitulo.titulo}</span>
                      </div>
                      {ui.estudoCapituloAberto ? <ChevronUp className="w-4 h-4 text-[var(--content-muted)] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[var(--content-muted)] shrink-0" />}
                    </button>
                    {ui.estudoCapituloAberto && (<div className="panel-expand-enter overflow-hidden mt-3">
                      <Suspense fallback={<PanelFallback />}><PainelEstudosCapitulo livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} nomeLivro={nav.livro.nome} /></Suspense>
                    </div>)}
                  </div>
                )}
              </>
            )}
            {swipeProgress > 0 && (
              <div className="fixed top-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ [canGoPrev ? 'left' : 'right']: '8px', opacity: swipeProgress }}>
                <div className="w-10 h-10 rounded-full bg-[var(--brand-default)]/20 flex items-center justify-center backdrop-blur-sm">
                  {canGoPrev ? <ChevronLeft className="w-5 h-5 text-[var(--brand-default)]" /> : <ChevronRight className="w-5 h-5 text-[var(--brand-default)]" />}
                </div>
              </div>
            )}
            {ui.showInterlinear && nav.data[0] && (<div className="mb-8"><div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/40"><span className="font-hebrew text-lg text-[var(--brand-default)]">א</span><span className="text-sm font-semibold text-[var(--content-primary)]">{t('biblia.interlinearView')}</span></div><InterlinearView versiculos={nav.data[0].versiculos} livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} traducao={nav.data[0].traducao} /></div>)}
            {(ui.modoLeitura === 'foco' || ui.modoLeitura === 'estudo') && ui.modoExibicao === 'paragrafo' && nav.data.map((item) => (<div key={item.traducao} className="mb-6">
              {nav.selectedTrads.length > 1 && (<div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>{ui.modoLeitura === 'foco' && <span className="text-xs text-[var(--content-muted)]">{nomeMap[item.traducao]}</span>}</div>)}
              {/* Modo página: um parágrafo por perícope, números de verso visíveis */}
              <div
                className="bible-prose bible-reading-text"
                style={{
                  fontSize: `${ui.fontSize}px`,
                  lineHeight: ui.lineSpacing,
                  fontFamily: ui.fontFamily === 'sans' ? "'Inter', system-ui, sans-serif" : "'Spectral', Georgia, serif",
                }}
              >
                {agruparPorPericope(item.versiculos, pericopeStarts).map((grupo, gi) => (
                  <Fragment key={`${item.traducao}-g-${gi}`}>
                    {grupo.heading && <PericopeHeading titulo={grupo.heading.titulo} tema={grupo.heading.tema} />}
                    <div className="bible-prose-para">
                      {grupo.verses.map((v) => {
                        const isSelected = verse.versiculoSelecionado?.versiculo === v.numero && verse.versiculoSelecionado?.traducao === item.traducao;
                        const isCurrentAudioVerse = audioVerseActive && capituloAudio.state.currentVerseIndex === v.numero - 1;
                        const isHighlighted = ui.modoLeitura === 'foco' && ui.highlightedVerse === v.numero;
                        const temRecurso = verseResources.hasResources(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero);
                        return (
                          <span
                            id={`verse-${v.numero}`}
                            data-verse={v.numero}
                            key={`${item.traducao}-${v.numero}-p`}
                            role="button"
                            tabIndex={0}
                            aria-label={`Versículo ${v.numero}`}
                            onClick={() => stableHandleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao, v.texto)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stableHandleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao, v.texto); } }}
                            className={cn(
                              'cursor-pointer rounded-sm transition-colors text-[var(--content-primary)]',
                              isCurrentAudioVerse && 'verse-karaoke-active',
                              isCurrentAudioVerse
                                ? 'bg-amber-100/70 dark:bg-amber-900/30'
                                : isSelected
                                ? 'bg-[var(--brand-subtle)]'
                                : isHighlighted
                                ? 'bg-[var(--brand-subtle)]/60'
                                : 'hover:bg-[var(--surface-sunken)]/40'
                            )}
                          >
                            {!ui.ocultarNumeros && (
                              <sup className="bible-verse-number">{v.numero}</sup>
                            )}
                            <ClickableVerse
                              text={v.texto}
                              livroAbreviacao={nav.livro.abreviacao}
                              capitulo={nav.capituloIdx + 1}
                              numero={v.numero}
                              karaokeActive={isCurrentAudioVerse && hasAudioClock}
                              karaokeProgress={karaokeProgress}
                            />
                            {temRecurso && !isModoLeitura && (
                              <span className="inline-block w-1 h-1 ml-0.5 mb-0.5 rounded-full bg-[var(--brand-default)]/70" title="Há estudo neste versículo" />
                            )}
                            {' '}
                          </span>
                        );
                      })}
                    </div>
                    {isModoEstudo && grupo.verses.some((v) => verse.versiculoSelecionado?.versiculo === v.numero && verse.versiculoSelecionado?.traducao === item.traducao) && (() => {
                      const sel = grupo.verses.find((v) => verse.versiculoSelecionado?.versiculo === v.numero && verse.versiculoSelecionado?.traducao === item.traducao);
                      if (!sel) return null;
                      return (
                        <EstudoDoVerso
                          livro={nav.livro.abreviacao}
                          capitulo={nav.capituloIdx + 1}
                          verso={sel.numero}
                          texto={sel.texto}
                          fontSize={ui.fontSize}
                          expanded
                          onOpenFull={() => { setPainelTabInicial('estudo'); setPainelVersiculoAberto(true); }}
                        />
                      );
                    })()}
                  </Fragment>
                ))}
              </div>
            </div>))}
            {(ui.modoLeitura === 'foco' || ui.modoLeitura === 'estudo') && ui.modoExibicao === 'versiculo' && nav.data.map((item) => (<div key={item.traducao} className="mb-6">
              {nav.selectedTrads.length > 1 && (<div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>{ui.modoLeitura === 'foco' && <span className="text-xs text-[var(--content-muted)]">{nomeMap[item.traducao]}</span>}</div>)}
              <div className="space-y-2">{item.versiculos.map((v) => {
                const isSelected = verse.versiculoSelecionado?.versiculo === v.numero && verse.versiculoSelecionado?.traducao === item.traducao;
                const isPlaying = audio.isVersePlaying(v.numero);
                const isCurrentAudioVerse = audioVerseActive && capituloAudio.state.currentVerseIndex === v.numero - 1;
                const fav = isFavorito(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao);
                const estudoAbertoNeste = verse.estudoAberto === v.numero && item.traducao === nav.data[0]?.traducao;
                const pericope = pericopeStarts.get(v.numero);
                return (
                  <div
                    key={`${item.traducao}-${v.numero}`}
                    className="bible-verse-spacer"
                    onMouseDown={(e) => {
                      setLongPressMenu(null);
                      longPressVerseRef.current = { livroAbrev: nav.livro.abreviacao, capitulo: nav.capituloIdx + 1, versiculo: v.numero, traducao: item.traducao, texto: v.texto };
                      longPressPosRef.current = { x: e.clientX, y: e.clientY };
                      longPress.onMouseDown(e);
                    }}
                    onMouseUp={longPress.onMouseUp}
                    onMouseLeave={longPress.onMouseLeave}
                    onTouchStart={(e) => {
                      setLongPressMenu(null);
                      longPressVerseRef.current = { livroAbrev: nav.livro.abreviacao, capitulo: nav.capituloIdx + 1, versiculo: v.numero, traducao: item.traducao, texto: v.texto };
                      const touch = e.touches[0];
                      longPressPosRef.current = { x: touch.clientX, y: touch.clientY };
                      longPress.onTouchStart(e);
                    }}
                    onTouchEnd={longPress.onTouchEnd}
                    onTouchMove={longPress.onTouchMove}
                  >
                    {pericope && (
                      <PericopeHeading titulo={pericope.titulo} tema={pericope.tema} />
                    )}
                    <VerseListItem numero={v.numero} texto={v.texto} livroAbreviacao={nav.livro.abreviacao} livroNome={nav.livro.nome} capitulo={nav.capituloIdx + 1} traducao={item.traducao} fontSize={ui.fontSize}
                      lineSpacing={ui.lineSpacing} fontFamily={ui.fontFamily} hideNumber={ui.ocultarNumeros}
                      isSelected={isSelected} isPlaying={isPlaying} isHighlighted={ui.modoLeitura === 'foco' && ui.highlightedVerse === v.numero} isFocused={ui.focusedVerse === v.numero} isFavorito={fav} copiedVerse={verse.copiedVerse}
                      audioNatural={audioNatural} audio={audio} flashcards={flashcards} estudoAberto={verse.estudoAberto === v.numero}
                      isCurrentAudioVerse={isCurrentAudioVerse} karaokeProgress={hasAudioClock ? karaokeProgress : 0} hasResources={verseResources.hasResources(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero)}
                      selectedTradsCount={nav.selectedTrads.length}
                      onSelectFromList={stableHandleSelectFromList} onFavoritoChange={refresh}
                      onSetAnotandoVersiculo={stableSetAnotandoVersiculo} onSetAnotacaoTexto={verse.setAnotacaoTexto}
                      onSetSidePanelWidth={panels.setSidePanelWidth} onSetSidePanelTab={panels.setSidePanelTab}
                      onSetComentarioVersiculo={stableSetComentarioVersiculo} onSetEstudoAberto={stableSetEstudoAberto}
                      estudoAbertoState={verse.estudoAberto} copyVerse={verse.copyVerse}
                      onApresentar={() => { onSetMostrarApresentacao(true); }}
                      onCompartilharImagem={() => onSetShareOpen(true)}
                      onDeselect={handleDeselectVerse}
                      onAprofundar={() => {
                        if (!authService.temAcessoTotal()) { panels.setPaywallAprofundarAberto(true); return; }
                        window.open(`/estudo-ia?ref=${encodeURIComponent(`${nav.livro.nome} ${nav.capituloIdx + 1}:${v.numero}`)}`, '_blank');
                      }}
                      onCompartilharSala={() => {
                        const data = { livro: nav.livro.nome, livroAbrev: nav.livro.abreviacao, capitulo: nav.capituloIdx + 1, versiculo: v.numero, texto: v.texto, traducao: item.traducao };
                        try { localStorage.setItem('ssb_collab_share_pending', JSON.stringify(data)); } catch {}
                        window.location.href = '/estudo-colaborativo';
                      }}
                      onAbrirPainel={(tab?: string) => { setPainelTabInicial(tab); setPainelVersiculoAberto(true); }}
                      painelVersiculoAberto={painelVersiculoAberto}
                      studyMode={isModoEstudo}
                      />
                    {estudoAbertoNeste && (
                      <Suspense fallback={<PanelFallback />}>
                        <PainelEstudosInline
                          livro={nav.livro.abreviacao}
                          capitulo={nav.capituloIdx + 1}
                          versiculo={v.numero}
                          nomeLivro={nav.livro.nome}
                          onClose={() => stableSetEstudoAberto(null)}
                        />
                      </Suspense>
                    )}
                  </div>
                );
              })}</div>
            </div>))}
            {ui.modoLeitura === 'comparacao' && nav.viewMode === 'parallel' && (
              <SyncedParallelColumns
                columns={nav.data.map((item) => ({
                  key: item.traducao,
                  header: (
                    <div className="flex items-center gap-2">
                      <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} />
                      <span className="text-sm font-semibold">{labelMap[item.traducao]}</span>
                    </div>
                  ),
                  verses: item.versiculos.map((v) => ({
                    numero: v.numero,
                    content: (
                      <p className="bible-reading-text font-serif-body" style={{ fontSize: `${Math.max(ui.fontSize - 2, 14)}px` }}>
                        <span className="bible-verse-number">{v.numero}</span>
                        {v.texto}
                      </p>
                    ),
                  })),
                }))}
              />
            )}
            {ui.modoLeitura === 'comparacao' && nav.viewMode === 'comparison' && nav.data.length >= 2 && (<ComparisonTable data={nav.data} fontSize={ui.fontSize} showDiff={ui.showDiff} highlightedVerse={ui.highlightedVerse} onHighlight={ui.setHighlightedVerse} maxVersiculos={nav.maxVersiculos} tradBadgeColors={tradBadgeColors} labelMap={labelMap} />)}
            {isModoLeitura && (
              <>
                <PerguntaDoCapitulo livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} />
                <p className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    ui.setModoLeitura('estudo');
                    ui.setEstudoCapituloAberto(true);
                    ui.setModoExibicao('versiculo', { persist: false });
                    panels.setSidePanelWidth('half');
                    panels.setSidePanelTab('estudos');
                  }}
                  className="text-[12px] tracking-wide text-[var(--content-muted)] hover:text-[var(--brand-default)] underline-offset-4 hover:underline"
                >
                  Estudar este capítulo
                </button>
                </p>
              </>
            )}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-[var(--border)]/30">
              <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-all active:scale-98 min-h-[44px]"><ChevronLeft className="w-4 h-4" /> {t('biblia.previous')}</button>
              <div className="hidden sm:flex flex-col items-center gap-1.5 min-w-[120px]"><span className="text-[10px] text-[var(--content-muted)] font-mono tabular-nums">{nav.capituloIdx + 1} / {nav.livro.totalCapitulos}</span><ProgressBar value={nav.capituloIdx + 1} total={nav.livro.totalCapitulos} className="w-24" /></div>
              <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-all active:scale-98 min-h-[44px]">{t('biblia.next')} <ChevronRight className="w-4 h-4" /></button>
            </div>
            </div>
        ) : (<div className="text-center py-20 ssb-empty"><BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} /><p className="font-display text-2xl text-[var(--content-primary)] mb-2">Escolha um livro</p><p className="text-lg text-[var(--content-muted)]">{t('biblia.selectBookChapter')}</p></div>)}
      </div>
      <NotesPanelSection open={ui.mostrarNotas} onClose={() => ui.setMostrarNotas(false)} notas={verse.notas} notaAtiva={verse.notaAtiva} onSalvar={(nota) => { verse.setNotaAtiva(nota); verse.salvarNotaHook(nota.id, nota.conteudo); }} onExcluir={(id) => { verse.excluirNota(id); verse.setNotaAtiva(null); ui.setMostrarNotas(false); }} />

      {longPressMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setLongPressMenu(null)} onTouchStart={() => setLongPressMenu(null)} />
          <div
            className="fixed z-50 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-xl p-1.5 flex gap-1"
            style={{ left: Math.min(Math.max(longPressMenu.x, 80), typeof window !== 'undefined' ? window.innerWidth - 80 : 300), top: Math.max(longPressMenu.y - 60, 8) }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorito(longPressMenu.livroAbrev, longPressMenu.capitulo, longPressMenu.versiculo, longPressMenu.traducao, longPressMenu.texto);
                refresh();
                setLongPressMenu(null);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] text-sm transition-colors"
            >
              <Heart className="w-4 h-4" /> Favoritar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                verse.copyVerse(longPressMenu.texto, `${nav.livro.nome} ${longPressMenu.capitulo}:${longPressMenu.versiculo}`);
                setLongPressMenu(null);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] text-sm transition-colors"
            >
              <Copy className="w-4 h-4" /> Copiar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const ref = `${nav.livro.nome} ${longPressMenu.capitulo}:${longPressMenu.versiculo}`;
                const text = `${longPressMenu.texto} — ${ref}`;
                if (navigator.share) {
                  navigator.share({ title: ref, text });
                } else {
                  navigator.clipboard?.writeText(text);
                }
                setLongPressMenu(null);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] text-sm transition-colors"
            >
              <Share2 className="w-4 h-4" /> Compartilhar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
