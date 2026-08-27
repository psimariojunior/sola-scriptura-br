'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { X, ChevronLeft, ChevronRight, Sparkles, Info } from 'lucide-react';
import { useEstudos } from '@/components/EstudosProvider';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import { useAudioCapitulo } from '@/hooks/useAudioCapitulo';
import { useFlashcards } from '@/hooks/useFlashcards';
import { useVerseResources } from '@/hooks/useVerseResources';
import { MobileBookMenu } from '@/components/Biblia/MobileBookMenu';
import { AudioPlayers } from '@/components/Biblia/AudioPlayers';
import { AnnotationModal } from '@/components/Biblia/AnnotationModal';
import { QuickSearchModal } from '@/components/Biblia/QuickSearchModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { cn } from '@/lib/utils';
import { cycleTema } from '@/lib/temas';
import { labelMap, tradBadgeColors } from '@/components/Biblia/TranslationDropdown';
import { UseBibliaNavigation } from '@/hooks/biblia/useBibliaNavigation';
import { UseBibliaUI } from '@/hooks/biblia/useBibliaUI';
import { UseBibliaVerse } from '@/hooks/biblia/useBibliaVerse';
import { UseBibliaPanels } from '@/hooks/biblia/useBibliaPanels';
import { BibleToolbar } from '@/components/Biblia/BibleToolbar';
import { BibleVerseList } from '@/components/Biblia/BibleVerseList';
import { BibleSidebar } from '@/components/Biblia/BibleSidebar';
import { SplitNotesPanel } from '@/components/Biblia/SplitNotesPanel';
import OfflineBanner from '@/components/OfflineBanner';
import { HotkeysDialog } from '@/components/HotkeysDialog';
import type { CenaDramatica, PersonagemVoz } from '@/components/NarracaoDramatica';
import Paywall from '@/components/Paywall';

import { carregarTraducao } from '@/data/biblia/texto/carregar';
import { trackEvent } from '@/lib/gamificationTracker';
import { useChapterSwipe } from '@/hooks/useSwipe';
import { useMicroInteracoes } from '@/hooks/useMicroInteracoes';

const PainelDoVersiculo = dynamic(() => import('@/components/PainelDoVersiculo'), { ssr: false });
const ExportModal = dynamic(() => import('@/components/Biblia/ExportModal').then(m => ({ default: m.ExportModal })), { ssr: false });
const ApresentacaoModal = dynamic(() => import('@/components/Apresentacao/ApresentacaoModal'), { ssr: false });
const PainelQualidadeAudio = dynamic(() => import('@/components/PainelQualidadeAudio').then(m => ({ default: m.PainelQualidadeAudio })), { ssr: false });
const ShareVerseModal = dynamic(() => import('@/components/Biblia/ShareVerseModal').then(m => ({ default: m.ShareVerseModal })), { ssr: false });
const NarracaoDramaticaLazy = dynamic(() => import('@/components/NarracaoDramatica'));
const NarrationPanel = dynamic(() => import('@/components/Biblia/NarrationPanel').then(m => ({ default: m.NarrationPanel })));
const OfflineDownloadManager = dynamic(() => import('@/components/Biblia/OfflineDownloadManager').then(m => ({ default: m.OfflineDownloadManager })), { ssr: false });
const ImmersiveModeLazy = dynamic(() => import('@/components/Biblia/ImmersiveMode').then(m => ({ default: m.ImmersiveMode })), { ssr: false });

const PASSAGENS_DRAMATICAS: Record<string, { titulo: string; subtitulo: string; cenas: CenaDramatica[]; personagens: PersonagemVoz[] }> = {
  'gn-1': { titulo: 'A Criação do Mundo', subtitulo: 'Gênesis 1', cenas: [], personagens: [] },
  'sl-23': { titulo: 'O Senhor é o Meu Pastor', subtitulo: 'Salmos 23', cenas: [], personagens: [] },
  'jo-1': { titulo: 'O Verbo se Fez Carne', subtitulo: 'João 1:1-14', cenas: [], personagens: [] },
  'mt-27': { titulo: 'A Crucificação de Jesus', subtitulo: 'Mateus 27', cenas: [], personagens: [] },
};

function PanelFallback() {
  return (<div className="flex items-center justify-center py-8"><div className="flex gap-1.5"><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0s]" /><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" /><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" /></div></div>);
}

export default function BibliaPage() {
  const { t } = useTranslation();
  useEffect(() => {
    const trads = ['arc', 'nvi', 'ara', 'acf', 'kjv', 'web'];
    const ric = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : (cb: () => void) => setTimeout(cb, 0);
    ric(() => {
      trads.forEach(t => { carregarTraducao(t); });
    });
  }, []);
  const { isFavorito, refresh } = useEstudos();
  const audio = useVerseAudio();
  const audioNatural = useAudioNatural();
  const flashcards = useFlashcards();
  const verseResources = useVerseResources();
  const panels = UseBibliaPanels();
  const nav = UseBibliaNavigation();
  const verse = UseBibliaVerse({ setSidePanelTab: panels.setSidePanelTab, setSidePanelWidth: panels.setSidePanelWidth });
  const capituloAudio = useAudioCapitulo(nav.livro.abreviacao, nav.capituloIdx + 1, nav.data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []);
  const ui = UseBibliaUI({
    capituloIdx: nav.capituloIdx, livroTotalCapitulos: nav.livro.totalCapitulos, livroAbreviacao: nav.livro.abreviacao,
    selectedTrads: nav.selectedTrads, setSelectedTrads: nav.setSelectedTrads, data: nav.data,
    chapterDirection: nav.chapterDirection, setChapterDirection: nav.setChapterDirection, setCapituloIdx: nav.setCapituloIdx,
    versiculoSelecionado: verse.versiculoSelecionado, setVersiculoSelecionado: verse.setVersiculoSelecionado, handleSelectFromList: verse.handleSelectFromList,
  });
  const chaveDramatica = `${nav.livro.abreviacao}-${nav.capituloIdx + 1}`;
  const passagemDramatica = PASSAGENS_DRAMATICAS[chaveDramatica];
  const [showDownloadManager, setShowDownloadManager] = useState(false);
  const [painelVersiculoAberto, setPainelVersiculoAberto] = useState(false);
  const [painelTabInicial, setPainelTabInicial] = useState<string | undefined>(undefined);

  const { vibrate } = useMicroInteracoes();

  const [showHotkeysDialog, setShowHotkeysDialog] = useState(false);
  const [showHotkeysToast, setShowHotkeysToast] = useState(false);

  const handlePrevChapter = useCallback(() => {
    if (nav.capituloIdx > 0) {
      vibrate('light');
      nav.changeChapter(nav.capituloIdx - 1);
    } else if (nav.livroIdx > 0) {
      vibrate('light');
      const prevBook = TODOS_LIVROS[nav.livroIdx - 1];
      const lastCap = Number.isFinite(prevBook?.totalCapitulos) ? prevBook.totalCapitulos - 1 : 0;
      nav.goToBook(nav.livroIdx - 1, lastCap);
    }
  }, [nav.capituloIdx, nav.livroIdx, nav.changeChapter, nav.goToBook, vibrate]);

  const handleNextChapter = useCallback(() => {
    const maxCap = Number.isFinite(nav.livro.totalCapitulos) ? nav.livro.totalCapitulos - 1 : 0;
    if (nav.capituloIdx < maxCap) {
      vibrate('light');
      nav.changeChapter(nav.capituloIdx + 1);
    } else if (nav.livroIdx < TODOS_LIVROS.length - 1) {
      vibrate('light');
      nav.goToBook(nav.livroIdx + 1, 0);
    }
  }, [nav.capituloIdx, nav.livro.totalCapitulos, nav.livroIdx, nav.changeChapter, nav.goToBook, vibrate]);

  const { handlers: swipeHandlers, offset: swipeOffset, progress: swipeProgress, canGoPrev, canGoNext } = useChapterSwipe({
    onPrevChapter: handlePrevChapter,
    onNextChapter: handleNextChapter,
  });

  const handleDeselectVerse = useCallback(() => {
    verse.setVersiculoSelecionado(null);
  }, [verse.setVersiculoSelecionado]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGoToBook = useCallback((idx: number, cap?: number) => { nav.goToBook(idx, cap); ui.setMobileMenu(false); ui.setChapterGridOpen(false); }, [nav.goToBook, ui.setMobileMenu, ui.setChapterGridOpen]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const stableHandleSelectFromList = useCallback((livro: string, cap: number, ver: number, traducao: string, texto: string) => {
    verse.handleSelectFromList(livro, cap, ver, traducao, texto);
  }, [verse.handleSelectFromList]);

  const stableSetAnotandoVersiculo = useCallback((key: string) => {
    verse.setAnotandoVersiculo(key);
    verse.setAnotacaoTexto('');
  }, [verse.setAnotandoVersiculo, verse.setAnotacaoTexto]);

  const stableSetComentarioVersiculo = useCallback((num: number | null) => {
    verse.setComentarioVersiculo(num);
  }, [verse.setComentarioVersiculo]);

  const stableSetEstudoAberto = useCallback((num: number | null) => {
    verse.setEstudoAberto(num);
  }, [verse.setEstudoAberto]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Deep link: seleciona e rola até o versículo da URL
  useEffect(() => {
    const alvo = nav.versiculoAlvo;
    if (!alvo || !nav.temDados) return;
    const item = nav.data[0];
    const encontrado = item?.versiculos.find((v) => v.numero === alvo);
    if (!encontrado) return;
    verse.aplicarSelecao(nav.livro.abreviacao, nav.capituloIdx + 1, alvo, item.traducao, encontrado.texto);
    const t = window.setTimeout(() => {
      document.getElementById(`verse-${alvo}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 80);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav.versiculoAlvo, nav.temDados, nav.livro.abreviacao, nav.capituloIdx, nav.data]);

  // Scroll to top when chapter changes + save/restore scroll position
  const scrollKeyRef = useRef('');
  useEffect(() => {
    if (nav.versiculoAlvo) return;
    const key = `${nav.livro.abreviacao}-${nav.capituloIdx}`;
    const prevKey = scrollKeyRef.current;
    if (prevKey && typeof window !== 'undefined') {
      try { sessionStorage.setItem(`ssb_scroll_${prevKey}`, String(window.scrollY)); } catch {}
    }
    scrollKeyRef.current = key;
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(`ssb_scroll_${key}`);
        if (saved) {
          setTimeout(() => window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' }), 50);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } catch { window.scrollTo({ top: 0, behavior: 'instant' }); }
    }
    if (nav.temDados && nav.data[0]?.versiculos) {
      const verseCount = nav.data[0].versiculos.length;
      if (verseCount > 0) {
        trackEvent('versiculo_lido', verseCount);
        trackEvent('capitulo_lido', 1);
      }
    }
  }, [nav.capituloIdx, nav.livroIdx, nav.temDados, nav.data, nav.livro.abreviacao]);

  // First-visit hotkeys toast
  useEffect(() => {
    try {
      const shown = localStorage.getItem('ssb_hotkeys_toast_shown');
      if (!shown) {
        const timer = setTimeout(() => {
          setShowHotkeysToast(true);
          localStorage.setItem('ssb_hotkeys_toast_shown', '1');
          setTimeout(() => setShowHotkeysToast(false), 5000);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  // Keyboard shortcuts for Bible reader
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      const key = e.key;
      const mod = e.metaKey || e.ctrlKey;

      // ? — Show hotkeys
      if (key === '?' || (e.shiftKey && key === '/')) {
        e.preventDefault();
        setShowHotkeysDialog(prev => !prev);
        return;
      }

      // Escape — close hotkeys dialog
      if (key === 'Escape' && showHotkeysDialog) {
        e.preventDefault();
        setShowHotkeysDialog(false);
        return;
      }

      // Don't process other shortcuts if dialog is open
      if (showHotkeysDialog) return;

      // Ctrl+K — Search
      if (mod && key === 'k') {
        e.preventDefault();
        ui.setQuickSearchOpen(true);
        return;
      }

      // Ctrl+D — Verse of the day (navigate to home)
      if (mod && key === 'd') {
        e.preventDefault();
        window.location.href = '/';
        return;
      }

      // Arrow Left — Previous chapter
      if (key === 'ArrowLeft' && !mod) {
        e.preventDefault();
        handlePrevChapter();
        return;
      }

      // Arrow Right — Next chapter
      if (key === 'ArrowRight' && !mod) {
        e.preventDefault();
        handleNextChapter();
        return;
      }

      // Arrow Up — Previous verse
      if (key === 'ArrowUp' && !mod) {
        e.preventDefault();
        if (verse.versiculoSelecionado) {
          const prev = Math.max(1, verse.versiculoSelecionado.versiculo - 1);
          verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, prev, verse.versiculoSelecionado.traducao, '');
        } else if (nav.data[0]?.versiculos?.length) {
          verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, 1, nav.selectedTrads[0] || 'arc', '');
        }
        return;
      }

      // Arrow Down — Next verse
      if (key === 'ArrowDown' && !mod) {
        e.preventDefault();
        const maxVerse = nav.data[0]?.versiculos?.length || 0;
        if (verse.versiculoSelecionado && maxVerse > 0) {
          const next = Math.min(maxVerse, verse.versiculoSelecionado.versiculo + 1);
          verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, next, verse.versiculoSelecionado.traducao, '');
        } else if (nav.data[0]?.versiculos?.length) {
          verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, 1, nav.selectedTrads[0] || 'arc', '');
        }
        return;
      }

      // F — Toggle zen/fullscreen mode
      if (key === 'f' && !mod) {
        e.preventDefault();
        ui.setZenMode(!ui.zenMode);
        return;
      }

      // I — Toggle interlinear
      if (key === 'i' && !mod) {
        e.preventDefault();
        ui.setShowInterlinear(!ui.showInterlinear);
        return;
      }

      // S — Toggle split view
      if (key === 's' && !mod) {
        e.preventDefault();
        if (ui.modoLeitura === 'split') {
          ui.setModoLeitura('foco');
        } else {
          ui.setModoLeitura('split');
        }
        return;
      }

      // A — Toggle audio
      if (key === 'a' && !mod) {
        e.preventDefault();
        if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) {
          capituloAudio.stop();
        } else {
          capituloAudio.play();
        }
        return;
      }

      // + — Increase font size
      if (key === '+' || key === '=') {
        e.preventDefault();
        ui.setFontSize(Math.min(32, ui.fontSize + 1));
        return;
      }

      // - — Decrease font size
      if (key === '-') {
        e.preventDefault();
        ui.setFontSize(Math.max(12, ui.fontSize - 1));
        return;
      }

      // T — Toggle theme
      if (key === 't' && !mod) {
        e.preventDefault();
        try {
          const current = localStorage.getItem('ssb_theme_v2') || localStorage.getItem('ssb_theme');
          const next = cycleTema(current);
          window.dispatchEvent(new CustomEvent('ssb:theme-change', { detail: next }));
        } catch {}
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHotkeysDialog, ui, nav, verse, capituloAudio, handlePrevChapter, handleNextChapter]);

  if (ui.zenMode && nav.temDados) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto">
        <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-safe">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button onClick={() => ui.setZenMode(false)} className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors" title={t('biblia.exitZen')}><X className="w-5 h-5" /></button>
              <div><h1 className="font-display text-xl font-semibold text-[var(--content-primary)]">{nav.livro.nome} {nav.capituloIdx + 1}</h1><p className="text-xs text-[var(--content-muted)]">{nav.selectedTrads.map(t => labelMap[t] || t.toUpperCase()).join(' · ')}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] disabled:opacity-30 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] disabled:opacity-30 transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          {nav.data.map((item) => (<div key={item.traducao}>
            {nav.selectedTrads.length > 1 && (<div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/30"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span></div>)}
            <div className="space-y-4">{item.versiculos.map((v) => (<p key={v.numero} className="verse-stagger font-serif-body text-[var(--content-primary)] leading-[2] cursor-pointer hover:bg-[var(--surface-sunken)]/40 rounded-lg px-3 py-2 -mx-3 transition-colors" style={{ fontSize: `${ui.fontSize + 2}px`, animationDelay: `${v.numero * 20}ms` }}
              onClick={() => { ui.setZenMode(false); verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao, v.texto); }}>
              <sup className="text-[var(--brand-default)] font-bold text-[11px] mr-1.5 select-none tabular-nums">{v.numero}</sup>{v.texto}</p>))}</div>
          </div>))}
          <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-[var(--border)]/30">
            <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--surface-sunken)] transition-colors"><ChevronLeft className="w-4 h-4" />{t('biblia.previousChapter')}</button>
            <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--surface-sunken)] transition-colors">{t('biblia.nextChapter')}<ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header /><OfflineBanner />
      <main id="main-content" className="pt-16">
        <div className="hidden sm:block px-4 sm:px-6 py-2 bg-[var(--surface-raised)]/80 border-b border-[var(--border)]/40 backdrop-blur-sm"><Breadcrumbs items={[{ label: t('bottomBar.home'), href: '/' }, { label: t('nav.bible') }]} /></div>
        <div className="bible-layout md:h-[calc(100vh-7rem-40px)]">
          <BibleSidebar
            nav={nav}
            ui={ui}
            panels={panels}
            verse={verse}
            handleGoToBook={handleGoToBook}
          />
          <div className="bible-content-area">
            <BibleToolbar
              nav={nav}
              ui={ui}
              panels={panels}
              capituloAudio={capituloAudio}
              passagemDramatica={passagemDramatica}
              verse={verse}
              onShowDownloadManager={setShowDownloadManager}
              onShowHotkeys={() => setShowHotkeysDialog(true)}
            />
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-y-auto" style={ui.modoLeitura === 'split' ? { flex: `0 0 ${ui.splitRatio}%` } : undefined}>
                <BibleVerseList
                  nav={nav}
                  ui={ui}
                  verse={verse}
                  panels={panels}
                  audio={audio}
                  audioNatural={audioNatural}
                  flashcards={flashcards}
                  verseResources={verseResources}
                  capituloAudio={capituloAudio}
                  isFavorito={isFavorito}
                  refresh={refresh}
                  swipeHandlers={swipeHandlers}
                  swipeOffset={swipeOffset}
                  swipeProgress={swipeProgress}
                  canGoPrev={canGoPrev}
                  canGoNext={canGoNext}
                  handleDeselectVerse={handleDeselectVerse}
                  stableHandleSelectFromList={stableHandleSelectFromList}
                  stableSetAnotandoVersiculo={stableSetAnotandoVersiculo}
                  stableSetComentarioVersiculo={stableSetComentarioVersiculo}
                  stableSetEstudoAberto={stableSetEstudoAberto}
                  painelVersiculoAberto={painelVersiculoAberto}
                  setPainelVersiculoAberto={setPainelVersiculoAberto}
                  setPainelTabInicial={setPainelTabInicial}
                  onSetMostrarApresentacao={ui.setMostrarApresentacao}
                  onSetShareOpen={ui.setShareOpen}
                />
              </div>

              {/* Split view resize handle */}
              {ui.modoLeitura === 'split' && (
                <div
                  className="w-1.5 cursor-col-resize hover:bg-[var(--brand-default)]/30 active:bg-[var(--brand-default)]/50 transition-colors relative group hidden md:block"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startX = e.clientX;
                    const startRatio = ui.splitRatio;
                    const container = (e.target as HTMLElement).parentElement;
                    const containerWidth = container?.getBoundingClientRect().width || 1;

                    const onMove = (ev: MouseEvent) => {
                      const delta = ev.clientX - startX;
                      const newRatio = Math.min(80, Math.max(20, startRatio + (delta / containerWidth) * 100));
                      ui.setSplitRatio(Math.round(newRatio));
                    };
                    const onUp = () => {
                      document.removeEventListener('mousemove', onMove);
                      document.removeEventListener('mouseup', onUp);
                    };
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                  }}
                >
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[var(--border)]/40 group-hover:bg-[var(--brand-default)]/50" />
                </div>
              )}

              {/* Split view notes panel */}
              {ui.modoLeitura === 'split' && (
                <div className="hidden md:flex flex-col overflow-hidden" style={{ flex: `0 0 ${100 - ui.splitRatio}%` }}>
                  <SplitNotesPanel verse={verse} ui={ui} />
                </div>
              )}
            </div>

            <MobileBookMenu open={ui.mobileMenu} onClose={() => ui.setMobileMenu(false)} livroIdx={nav.livroIdx} onSelect={(idx) => handleGoToBook(idx)} onSelectChapter={(idx, cap) => handleGoToBook(idx, cap)} />
          </div>
        </div>
      </main>
      {verse.versiculoSelecionado && (
        <a href={`/estudo-ia?ref=${encodeURIComponent(`${verse.versiculoSelecionado.livroNome} ${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}`)}`} target="_blank" rel="noreferrer"
          className="fade-in-bottom hidden lg:flex fixed bottom-6 right-6 z-30 items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"><Sparkles className="w-4 h-4" />{t('biblia.deepenAI')}</a>)}
      <AudioPlayers audioNatural={audioNatural} audio={audio} data={nav.data} livroNome={nav.livro.nome} capitulo={nav.capituloIdx + 1} />
      <AnnotationModal open={verse.anotandoVersiculo !== null} verseKey={verse.anotandoVersiculo} initialText={verse.anotacaoTexto} onClose={() => verse.setAnotandoVersiculo(null)}
        onSave={async (texto) => { const { setAnotacao } = await import('@/lib/estudos'); const parts = verse.anotandoVersiculo!.split(':'); setAnotacao(parts[0], Number(parts[1]), Number(parts[2]), parts[3], texto || null); refresh(); verse.setAnotandoVersiculo(null); verse.setAnotacaoTexto(''); }} />
      {ui.quickSearchOpen && (<QuickSearchModal open={ui.quickSearchOpen} onClose={() => ui.setQuickSearchOpen(false)}
        onGoToResult={(r, query) => { const idx = TODOS_LIVROS.findIndex(l => l.abreviacao === r.livro); if (idx >= 0) { verse.setRecentSearches(prev => { const next = [{ query, livro: r.livro, nome: r.nome, cap: r.cap, versiculo: r.versiculo || 1 }, ...prev.filter(s => s.livro !== r.livro || s.cap !== r.cap)].slice(0, 5); try { localStorage.setItem('ssb_recent_searches', JSON.stringify(next)); } catch {} return next; }); nav.setLivroIdx(idx); nav.setCapituloIdx(r.cap - 1); ui.setQuickSearchOpen(false); } }} recentSearches={verse.recentSearches} />)}
      {ui.mostrarNarracao && passagemDramatica && (<div className="page-transition fixed inset-0 z-50 bg-[var(--bg)]"><NarracaoDramaticaLazy titulo={passagemDramatica.titulo} subtitulo={passagemDramatica.subtitulo} cenas={passagemDramatica.cenas} personagens={passagemDramatica.personagens} onFechar={() => ui.setMostrarNarracao(false)} /></div>)}
      {ui.mostrarNarracaoCapitulo && (<NarrationPanel open={ui.mostrarNarracaoCapitulo} onClose={() => { ui.setMostrarNarracaoCapitulo(false); capituloAudio.stop(); }} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} traducao={nav.selectedTrads[0] || 'arc'} livroNome={nav.livro.nome} versiculos={nav.data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []} />)}
      <PainelDoVersiculo livro={verse.versiculoSelecionado?.livroAbreviacao ?? ''} capitulo={verse.versiculoSelecionado?.capitulo ?? 1} versiculo={verse.versiculoSelecionado?.versiculo ?? 1} aberto={painelVersiculoAberto} onFechar={() => { setPainelVersiculoAberto(false); setPainelTabInicial(undefined); verse.setVersiculoSelecionado(null); }} tabInicial={painelTabInicial} />
      <ApresentacaoModal open={ui.mostrarApresentacao} onClose={() => ui.setMostrarApresentacao(false)} livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} versiculo={1} translation={nav.selectedTrads[0] || 'arc'} />
      <PainelQualidadeAudio open={ui.mostrarQualidadeAudio} onOpenChange={ui.setMostrarQualidadeAudio} />
      <ExportModal open={ui.exportOpen} onClose={() => ui.setExportOpen(false)} bookName={nav.livro.nome} chapter={nav.capituloIdx + 1} data={nav.data} />
      <ShareVerseModal open={ui.shareOpen} onClose={() => ui.setShareOpen(false)} verse={verse.versiculoSelecionado ? { livroNome: verse.versiculoSelecionado.livroNome, capitulo: verse.versiculoSelecionado.capitulo, versiculo: verse.versiculoSelecionado.versiculo, texto: verse.versiculoSelecionado.texto, traducao: verse.versiculoSelecionado.traducao } : null} />
      <Paywall aberto={panels.paywallAprofundarAberto} onFechar={() => panels.setPaywallAprofundarAberto(false)} />
      {showDownloadManager && <OfflineDownloadManager open={showDownloadManager} onClose={() => setShowDownloadManager(false)} />}
      {ui.immersiveMode && nav.data[0]?.versiculos && (
        <ImmersiveModeLazy
          livroNome={nav.livro.nome}
          capitulo={nav.capituloIdx + 1}
          versiculos={nav.data[0].versiculos.map(v => ({ numero: v.numero, texto: v.texto }))}
          traducao={nav.selectedTrads[0] || 'arc'}
          onClose={() => ui.setImmersiveMode(false)}
        />
      )}
      <HotkeysDialog open={showHotkeysDialog} onOpenChange={setShowHotkeysDialog} />
      {showHotkeysToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--surface-raised)] border border-[var(--border)]/60 shadow-lg shadow-black/10 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <Info className="w-4 h-4 text-[var(--brand-default)] shrink-0" />
          <span className="text-sm text-[var(--content-primary)]">Pressione <kbd className="px-1.5 py-0.5 text-[10px] font-mono border border-[var(--border)]/50 rounded bg-[var(--surface-sunken)]">?</kbd> para ver os atalhos de teclado</span>
          <button onClick={() => setShowHotkeysToast(false)} className="ml-1 p-0.5 rounded hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>);
}
