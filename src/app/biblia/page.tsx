'use client';

import { useCallback, lazy, Suspense, useMemo, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { BookOpen, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Search, Sparkles, Play, Mic, Volume2, ListFilter, WifiOff, X, HardDrive, MoreVertical } from 'lucide-react';
// framer-motion removido — animações via CSS puro
import { useEstudos } from '@/components/EstudosProvider';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import { useAudioCapitulo } from '@/hooks/useAudioCapitulo';
import ReadingPlanBanner from '@/components/ReadingPlanBanner';
import { useFlashcards } from '@/hooks/useFlashcards';
import OfflineBanner from '@/components/OfflineBanner';
import { useVerseResources } from '@/hooks/useVerseResources';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { cn } from '@/lib/utils';
import { ChapterHeader } from '@/components/Biblia/ChapterHeader';
import { ModoLeitura } from '@/components/Biblia/ModoLeitura';
import { VerseListItem } from '@/components/Biblia/VerseListItem';
import { ProgressBar } from '@/components/Biblia/ProgressBar';
import { ComparisonTable } from '@/components/Biblia/ComparisonTable';
import { QuickSearchModal } from '@/components/Biblia/QuickSearchModal';
import { AnnotationModal } from '@/components/Biblia/AnnotationModal';
import { MobileBookMenu } from '@/components/Biblia/MobileBookMenu';
import { NotesPanelSection } from '@/components/Biblia/NotesPanelSection';
import { AudioPlayers } from '@/components/Biblia/AudioPlayers';
import { TranslationDropdown, labelMap as labelMapImport, nomeMap as nomeMapImport, tradBadgeColors as tradBadgeColorsImport } from '@/components/Biblia/TranslationDropdown';
import { ToolsDropdown } from '@/components/Biblia/ToolsDropdown';
import { ChapterGrid } from '@/components/Biblia/ChapterGrid';
import { UseBibliaNavigation } from '@/hooks/biblia/useBibliaNavigation';
import { UseBibliaUI } from '@/hooks/biblia/useBibliaUI';
import { UseBibliaVerse } from '@/hooks/biblia/useBibliaVerse';
import { UseBibliaPanels } from '@/hooks/biblia/useBibliaPanels';
import { authService } from '@/lib/auth';
const PainelDoVersiculo = dynamic(() => import('@/components/PainelDoVersiculo'), { ssr: false });
const ExportModal = dynamic(() => import('@/components/Biblia/ExportModal').then(m => ({ default: m.ExportModal })), { ssr: false });
const ApresentacaoModal = dynamic(() => import('@/components/Apresentacao/ApresentacaoModal'), { ssr: false });
const PainelQualidadeAudio = dynamic(() => import('@/components/PainelQualidadeAudio').then(m => ({ default: m.PainelQualidadeAudio })), { ssr: false });
const ShareVerseModal = dynamic(() => import('@/components/Biblia/ShareVerseModal').then(m => ({ default: m.ShareVerseModal })), { ssr: false });
const SettingsPanel = dynamic(() => import('@/components/Biblia/SettingsPanel').then(m => ({ default: m.SettingsPanel })), { ssr: false });
const PainelEstudosCapitulo = lazy(() => import('@/components/Biblia/PainelEstudosCapitulo'));
const InterlinearView = dynamic(() => import('@/components/InterlinearView').then(m => ({ default: m.InterlinearView })), { ssr: false });
const SidePanel = dynamic(() => import('@/components/Biblia/SidePanel').then(m => ({ default: m.SidePanel })), { ssr: false });
const NarracaoDramaticaLazy = lazy(() => import('@/components/NarracaoDramatica'));
const NarrationPanel = lazy(() => import('@/components/Biblia/NarrationPanel').then(m => ({ default: m.NarrationPanel })));
import type { CenaDramatica, PersonagemVoz } from '@/components/NarracaoDramatica';
import Paywall from '@/components/Paywall';
import { OfflineDownloadManager } from '@/components/Biblia/OfflineDownloadManager';
const labelMap = labelMapImport;
const nomeMap = nomeMapImport;
const tradBadgeColors = tradBadgeColorsImport;

function PanelFallback() {
  return (<div className="flex items-center justify-center py-8"><div className="flex gap-1.5"><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0s]" /><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" /><span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" /></div></div>);
}

const PASSAGENS_DRAMATICAS: Record<string, { titulo: string; subtitulo: string; cenas: CenaDramatica[]; personagens: PersonagemVoz[] }> = {
  'gn-1': { titulo: 'A Criação do Mundo', subtitulo: 'Gênesis 1', cenas: [], personagens: [] },
  'sl-23': { titulo: 'O Senhor é o Meu Pastor', subtitulo: 'Salmos 23', cenas: [], personagens: [] },
  'jo-1': { titulo: 'O Verbo se Fez Carne', subtitulo: 'João 1:1-14', cenas: [], personagens: [] },
  'mt-27': { titulo: 'A Crucificação de Jesus', subtitulo: 'Mateus 27', cenas: [], personagens: [] },
};

import { carregarTraducao } from '@/data/biblia/texto/carregar';
import { trackEvent } from '@/lib/gamificationTracker';

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
  const [mobileToolbarMenuOpen, setMobileToolbarMenuOpen] = useState(false);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuPos, setMobileMenuPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

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

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (nav.temDados && nav.data[0]?.versiculos) {
      const verseCount = nav.data[0].versiculos.length;
      if (verseCount > 0) {
        trackEvent('versiculo_lido', verseCount);
        trackEvent('capitulo_lido', 1);
      }
    }
  }, [nav.capituloIdx, nav.livroIdx, nav.temDados, nav.data]);

  if (ui.zenMode && nav.temDados) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-safe">
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
    <div className="min-h-screen bg-[var(--bg)]">
      <Header /><OfflineBanner />
      <main id="main-content" className="pt-16">
        <div className="hidden sm:block px-4 sm:px-6 py-2 bg-[var(--surface-raised)]/80 border-b border-[var(--border)]/40 backdrop-blur-sm"><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Bíblia' }]} /></div>
        <div className="flex min-h-[100dvh] md:h-[calc(100vh-7rem-40px)] relative overflow-hidden">
          {ui.sidebarOpen && (
            <aside className="sidebar-enter hidden lg:block w-64 border-r border-[var(--border)] bg-[var(--surface-raised)] overflow-y-auto shrink-0">
              <div className="p-4 h-full flex flex-col">
                <div className="relative mb-3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" /><input type="text" placeholder={t('biblia.searchBook')} value={nav.searchQuery} onChange={e => nav.setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--surface-sunken)] border border-[var(--border)]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 transition-all duration-200" /></div>
                <div className="flex-1 overflow-y-auto space-y-0.5">{nav.livrosFiltrados.map((l) => { const idx = TODOS_LIVROS.indexOf(l); return (<button key={l.abreviacao} onClick={() => handleGoToBook(idx)} className={cn('w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 group', idx === nav.livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-semibold' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]')}><span className="truncate">{l.nome}</span><span className="ml-auto text-[10px] opacity-0 group-hover:opacity-50 transition-opacity tabular-nums">{l.totalCapitulos}c</span></button>); })}</div>
              </div>
            </aside>)}
          <div className="flex-1 flex flex-col min-w-0 relative">
            <div className="border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/95 backdrop-blur-sm sticky top-0 z-20">
              <div className="px-3 sm:px-4 py-2.5 flex items-center gap-1.5 sm:gap-3 overflow-x-auto scrollbar-hide">
                <button onClick={() => ui.setMobileMenu(true)} className="lg:hidden touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0" aria-label="Abrir menu de livros"><BookOpen className="w-4 h-4" /></button>
                <button onClick={() => ui.setSidebarOpen(!ui.sidebarOpen)} className="hidden lg:flex touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0"><ListFilter className="w-4 h-4" /></button>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)] active:scale-95 transition-transform"><ChevronLeft className="w-4 h-4" /></button>
                  <div className="relative">
                    <button onClick={() => ui.setChapterGridOpen(!ui.chapterGridOpen)} className="px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] border border-[var(--border)]/40 min-w-[80px] max-w-[130px] sm:min-w-[120px] sm:max-w-none text-center hover:bg-[var(--surface-raised)] transition-colors cursor-pointer truncate">
                      <span className="text-xs font-semibold text-[var(--content-primary)]">{nav.livro.nome}</span>
                      <span className="text-[var(--brand-default)] font-bold ml-1.5 tabular-nums">{nav.capituloIdx + 1}</span>
                      <span className="text-[var(--content-muted)] font-normal text-[10px] ml-1">/{nav.livro.totalCapitulos}</span>
                    </button>
                    <ChapterGrid open={ui.chapterGridOpen} onClose={() => ui.setChapterGridOpen(false)} totalCapitulos={nav.livro.totalCapitulos} capituloAtual={nav.capituloIdx} onSelect={(idx) => nav.changeChapter(idx)} />
                  </div>
                  <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)] active:scale-95 transition-transform"><ChevronRight className="w-4 h-4" /></button>
                </div>
                <div className="flex-1" />
                <TranslationDropdown open={ui.tradOpen} onToggle={() => { ui.setTradOpen(!ui.tradOpen); ui.setToolsOpen(false); }} onClose={() => ui.setTradOpen(false)} selectedTrads={nav.selectedTrads} onToggleTrad={nav.toggleTrad} viewMode={nav.viewMode} onViewModeChange={nav.setViewMode} />
                <div className="md:hidden relative shrink-0">
                  <button ref={mobileMenuBtnRef} onClick={() => {
                    if (!mobileToolbarMenuOpen && mobileMenuBtnRef.current) {
                      const rect = mobileMenuBtnRef.current.getBoundingClientRect();
                      setMobileMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
                    }
                    setMobileToolbarMenuOpen(!mobileToolbarMenuOpen);
                  }} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] active:scale-95 transition-transform" aria-label={t('biblia.moreOptions')}><MoreVertical className="w-4 h-4" /></button>
                  {mobileToolbarMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setMobileToolbarMenuOpen(false)} />
                      <div className="fixed z-40 w-56 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] shadow-xl py-1 animate-scale-in origin-top-right" style={{ top: mobileMenuPos.top, right: mobileMenuPos.right }}>
                        <button onClick={() => { ui.setModoLeitura(ui.modoLeitura === 'foco' ? 'estudo' : 'foco'); nav.setViewMode('single'); panels.setSidePanelWidth('collapsed'); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><BookOpen className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.readingMode')}</button>
                        <button onClick={() => { ui.setShowInterlinear(!ui.showInterlinear); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><span className="font-hebrew text-sm text-[var(--brand-default)]">א</span>Interlinear</button>
                        <button onClick={() => { setShowDownloadManager(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><HardDrive className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.offlineVersions')}</button>
                        <button onClick={() => { if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) capituloAudio.stop(); else capituloAudio.play(); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Volume2 className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.chapterAudio')}</button>
                        <div className="h-px bg-[var(--border)]/40 my-1" />
                        <button onClick={() => { ui.setToolsOpen(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Sparkles className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.tools')}</button>
                        <button onClick={() => { ui.setMostrarApresentacao(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--brand-default)] hover:bg-[var(--brand-subtle)] transition-colors"><Sparkles className="w-4 h-4" />{t('biblia.present')}</button>
                      </div>
                    </>
                  )}
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <ModoLeitura value={ui.modoLeitura} onChange={(v) => { ui.setModoLeitura(v); if (v === 'comparacao') nav.setViewMode('parallel'); else if (v === 'estudo') { panels.setSidePanelWidth('half'); panels.setSidePanelTab('comentarios'); } else if (v === 'apresentacao') ui.setMostrarApresentacao(true); else { nav.setViewMode('single'); panels.setSidePanelWidth('collapsed'); } }} size="sm" />
                  <div className="w-px h-6 bg-[var(--border)]/60" />
                  <button onClick={() => ui.setShowInterlinear(!ui.showInterlinear)} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all', ui.showInterlinear ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20' : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20')} title={t('biblia.showOriginalText')}>
                    <span className="font-hebrew" style={{ fontSize: '11px' }}>א</span>Interlinear
                  </button>
                  <button onClick={() => setShowDownloadManager(true)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20 transition-all" title={t('biblia.manageOffline')}>
                    <HardDrive className="w-3.5 h-3.5" />Versões
                  </button>
                  <div className="w-px h-6 bg-[var(--border)]/60" />
                  <div className="flex items-center gap-0.5">
                    <button onClick={() => { if (ui.mostrarNarracaoCapitulo) { ui.setMostrarNarracaoCapitulo(false); capituloAudio.stop(); } if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) capituloAudio.stop(); else capituloAudio.play(); }}
                      className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 hover:scale-105', capituloAudio.state.isPlaying ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20' : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20')}>
                      {capituloAudio.state.isLoading ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : capituloAudio.state.isPlaying ? <span className="flex gap-0.5"><span className="w-0.5 h-3 bg-current rounded-full" /><span className="w-0.5 h-3 bg-current rounded-full" /></span> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => ui.setMostrarQualidadeAudio(true)} className="p-1.5 rounded-full text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] active:scale-95 transition-transform" title={t('biblia.audioQuality')}><Mic className="w-3.5 h-3.5" /></button>
                  </div>
                  <ToolsDropdown open={ui.toolsOpen} onToggle={() => { ui.setToolsOpen(!ui.toolsOpen); ui.setTradOpen(false); }} onClose={() => ui.setToolsOpen(false)} bookName={nav.livro.nome} chapter={nav.capituloIdx + 1} data={nav.data} hasDramatica={!!passagemDramatica}
                    onNotas={() => { if (!ui.mostrarNotas && !verse.notaAtiva) { verse.setNotaAtiva(verse.criarNota(`${nav.livro.nome} ${nav.capituloIdx + 1}`)); } ui.setMostrarNotas(!ui.mostrarNotas); ui.setToolsOpen(false); }}
                    onExportPdf={() => { ui.setToolsOpen(false); ui.setExportOpen(true); }} onPlanoLeitura={() => { ui.setShowPlan(!ui.showPlan); ui.setToolsOpen(false); }}
                    onNarracaoDramatica={() => { ui.setMostrarNarracao(true); ui.setToolsOpen(false); }} onNarrarCapitulo={() => { capituloAudio.stop(); ui.setMostrarNarracaoCapitulo(true); ui.setToolsOpen(false); }}
                    onConfiguracoes={() => { ui.setShowSettings(!ui.showSettings); ui.setToolsOpen(false); }} />
                  <button onClick={() => ui.setMostrarApresentacao(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[var(--brand-contrast)] bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] shadow-md shadow-[var(--brand-default)]/30 hover:shadow-lg hover:shadow-[var(--brand-default)]/40 transition-all active:scale-97 hover:scale-105">
                    <Sparkles className="w-3.5 h-3.5" />{t('biblia.present')}<span className="inline-flex items-center px-1 py-0 rounded text-[8px] font-extrabold bg-white/20">{t('biblia.new')}</span>
                  </button>
                </div>
              </div>
              <SettingsPanel open={ui.showSettings} fontSize={ui.fontSize} onFontSizeChange={ui.setFontSize} showDiff={ui.showDiff} onToggleDiff={() => ui.setShowDiff(!ui.showDiff)} showComparison={nav.viewMode === 'comparison' && nav.data.length >= 2} fontFamily={ui.fontFamily} onFontFamilyChange={ui.setFontFamily} lineSpacing={ui.lineSpacing} onLineSpacingChange={ui.setLineSpacing} />
            </div>
            <div ref={nav.mainRef} className="flex-1 overflow-y-auto">
              <div className="max-w-[min(900px,100%-2rem)] mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 md:pb-10">
                {ui.showPlan && <ReadingPlanBanner />}
                {nav.loading && !nav.temDados ? (
                  <div className="space-y-4 chapter-enter"><div className="skeleton skeleton-title w-48 mx-auto animate-pulse" /><div className="ornament w-20 mx-auto mb-8 opacity-30" />
                    {Array.from({ length: 10 }).map((_, i) => (<div key={i} className="flex gap-3 items-center" style={{ animationDelay: `${i * 50}ms` }}><div className="skeleton skeleton-text w-10 h-10 shrink-0 rounded-lg" /><div className="skeleton skeleton-text flex-1 rounded" style={{ width: `${[75, 85, 65, 90, 70, 80, 60, 95, 72, 88][i]}%` }} /></div>))}
                  </div>
                ) : nav.offlineUnavailable ? (
                  <div className="text-center py-20"><WifiOff className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} /><p className="text-lg text-[var(--content-muted)]">{t('biblia.chapterOffline')}</p><p className="text-sm text-[var(--content-muted)] mt-2">{t('biblia.connectOrDownload')}</p></div>
                ) : nav.temDados ? (
                    <div role="article" aria-label={`${nav.livro.nome} capítulo ${nav.capituloIdx + 1}`}>
                    {nav.loading && nav.temDados && (<div className="fixed top-0 left-0 right-0 z-20 h-0.5 bg-[var(--brand-default)]/20"><div className="h-full bg-[var(--brand-default)] animate-loading-bar" /></div>)}
                    <ChapterHeader livroNome={nav.livro.nome} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} totalCapitulos={nav.livro.totalCapitulos} totalVersiculos={nav.data[0]?.versiculos?.length ?? 0} />
                    {ui.showInterlinear && nav.data[0] && (<div className="mb-8"><div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/40"><span className="font-hebrew text-lg text-[var(--brand-default)]">א</span><span className="text-sm font-semibold text-[var(--content-primary)]">{t('biblia.interlinearView')}</span></div><InterlinearView versiculos={nav.data[0].versiculos} livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} traducao={nav.data[0].traducao} /></div>)}
                    {(ui.modoLeitura === 'foco' || ui.modoLeitura === 'estudo') && nav.data.map((item) => (<div key={item.traducao} className="mb-6">
                      {nav.selectedTrads.length > 1 && (<div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>{ui.modoLeitura === 'foco' && <span className="text-xs text-[var(--content-muted)]">{nomeMap[item.traducao]}</span>}</div>)}
                      <div className={cn('space-y-1', ui.modoLeitura === 'foco' && 'divide-y divide-[var(--brand-default)]/5')}>{item.versiculos.map((v) => {
                        const isSelected = verse.versiculoSelecionado?.versiculo === v.numero && verse.versiculoSelecionado?.traducao === item.traducao;
                        const isPlaying = audio.isVersePlaying(v.numero);
                        const isCurrentAudioVerse = capituloAudio.state.isPlaying && capituloAudio.state.currentVerseIndex === v.numero - 1;
                        const verseKey = `${nav.livro.abreviacao}:${nav.capituloIdx + 1}:${v.numero}:${item.traducao}`;
                        const fav = isFavorito(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao);
                        return (<VerseListItem key={`${item.traducao}-${v.numero}`} numero={v.numero} texto={v.texto} livroAbreviacao={nav.livro.abreviacao} livroNome={nav.livro.nome} capitulo={nav.capituloIdx + 1} traducao={item.traducao} fontSize={ui.fontSize}
                          isSelected={isSelected} isPlaying={isPlaying} isHighlighted={ui.modoLeitura === 'foco' && ui.highlightedVerse === v.numero} isFocused={ui.focusedVerse === v.numero} isFavorito={fav} copiedVerse={verse.copiedVerse}
                          audioNatural={audioNatural} audio={audio} flashcards={flashcards} estudoAberto={verse.estudoAberto === v.numero}
                          isCurrentAudioVerse={isCurrentAudioVerse} hasResources={verseResources.hasResources(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero)}
                          selectedTradsCount={nav.selectedTrads.length}
                          onSelectFromList={stableHandleSelectFromList} onFavoritoChange={refresh}
                          onSetAnotandoVersiculo={stableSetAnotandoVersiculo} onSetAnotacaoTexto={verse.setAnotacaoTexto}
                          onSetSidePanelWidth={panels.setSidePanelWidth} onSetSidePanelTab={panels.setSidePanelTab}
                          onSetComentarioVersiculo={stableSetComentarioVersiculo} onSetEstudoAberto={stableSetEstudoAberto}
                          estudoAbertoState={verse.estudoAberto} copyVerse={verse.copyVerse}
                          onApresentar={() => { ui.setMostrarApresentacao(true); }}
                          onCompartilharImagem={() => ui.setShareOpen(true)}
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
                          />);
                      })}</div>
                    </div>))}
                    {ui.modoLeitura === 'comparacao' && nav.viewMode === 'parallel' && (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">{nav.data.map((item) => (
                      <div key={item.traducao} className="border border-[var(--border)]/40 rounded-xl p-3 sm:p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/30"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold">{labelMap[item.traducao]}</span></div>
                        {item.versiculos.map(v => (<p key={v.numero} className="mb-2 leading-[1.7] font-serif-body" style={{ fontSize: `${Math.max(ui.fontSize - 2, 14)}px` }}><sup className="text-[var(--brand-default)] font-bold text-[10px] mr-1 select-none tabular-nums">{v.numero}</sup>{v.texto}</p>))}
                      </div>))}</div>)}
                    {ui.modoLeitura === 'comparacao' && nav.viewMode === 'comparison' && nav.data.length >= 2 && (<ComparisonTable data={nav.data} fontSize={ui.fontSize} showDiff={ui.showDiff} highlightedVerse={ui.highlightedVerse} onHighlight={ui.setHighlightedVerse} maxVersiculos={nav.maxVersiculos} tradBadgeColors={tradBadgeColors} labelMap={labelMap} />)}
                    {nav.estudoCapitulo && (<div className="mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-[var(--border)]/30">
                      <button onClick={() => ui.setEstudoCapituloAberto(o => !o)} className="w-full flex items-center gap-2 text-left group" aria-expanded={ui.estudoCapituloAberto}>
                        <BookOpen className="w-4 h-4 text-[var(--primary)]" /><span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)] group-hover:text-[var(--fg)] transition-colors">{t('biblia.chapterStudy')}</span>
                        <span className="text-xs text-[var(--primary)] font-medium">{nav.estudoCapitulo.titulo}</span><div className="flex-1" />
                        {ui.estudoCapituloAberto ? <ChevronUp className="w-4 h-4 text-[var(--muted-fg)]" /> : <ChevronDown className="w-4 h-4 text-[var(--muted-fg)]" />}
                      </button>
                      {ui.estudoCapituloAberto && (<div className="panel-expand-enter overflow-hidden">
                        <Suspense fallback={<PanelFallback />}><PainelEstudosCapitulo livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} nomeLivro={nav.livro.nome} /></Suspense>
                      </div>)}
                    </div>)}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-[var(--border)]/30">
                      <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-all active:scale-98 min-h-[44px]"><ChevronLeft className="w-4 h-4" /> {t('biblia.previous')}</button>
                      <div className="hidden sm:flex flex-col items-center gap-1.5 min-w-[120px]"><span className="text-[10px] text-[var(--content-muted)] font-mono tabular-nums">{nav.capituloIdx + 1} / {nav.livro.totalCapitulos}</span><ProgressBar value={nav.capituloIdx + 1} total={nav.livro.totalCapitulos} className="w-24" /></div>
                      <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-all active:scale-98 min-h-[44px]">{t('biblia.next')} <ChevronRight className="w-4 h-4" /></button>
                    </div>
                    </div>
                ) : (<div className="text-center py-20"><BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} /><p className="text-lg text-[var(--content-muted)]">{t('biblia.selectBookChapter')}</p></div>)}
              </div>
              <NotesPanelSection open={ui.mostrarNotas} onClose={() => ui.setMostrarNotas(false)} notas={verse.notas} notaAtiva={verse.notaAtiva} onSalvar={(nota) => { verse.setNotaAtiva(nota); verse.salvarNotaHook(nota.id, nota.conteudo); }} onExcluir={(id) => { verse.excluirNota(id); verse.setNotaAtiva(null); ui.setMostrarNotas(false); }} />
            </div>
            <MobileBookMenu open={ui.mobileMenu} onClose={() => ui.setMobileMenu(false)} livroIdx={nav.livroIdx} onSelect={(idx) => handleGoToBook(idx)} onSelectChapter={(idx, cap) => handleGoToBook(idx, cap)} />
          </div>
          {panels.sidePanelOpen && (
            <>
              <div className="hidden max-lg:block fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" onClick={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); verse.setVersiculoSelecionado(null); }} />
              <ErrorBoundary fallback={<div className="shrink-0 w-full sm:w-[340px] md:w-[380px] lg:w-[420px] border-l border-[var(--border)] bg-[var(--surface-raised)] flex items-center justify-center p-8"><p className="text-sm text-[var(--content-muted)]">{t('biblia.errorLoading')}</p><button onClick={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); }} className="text-xs text-[var(--brand-default)] underline">{t('biblia.close')}</button></div>}>
                <SidePanel open={panels.sidePanelOpen} width={panels.sidePanelWidth} onWidthChange={panels.setSidePanelWidth} activeTab={panels.sidePanelTab} onActiveTabChange={(tab) => { panels.setSidePanelTab(tab); if (!tab) panels.setSidePanelWidth('collapsed'); }}
                  livro={nav.livro.nome} livroNome={nav.livro.nome} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} versiculo={verse.comentarioVersiculo ?? verse.versiculoSelecionado?.versiculo}
                  onClose={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); verse.setVersiculoSelecionado(null); }} versiculoTexto={verse.versiculoSelecionado?.texto} versiculoTraducao={verse.versiculoSelecionado?.traducao} />
              </ErrorBoundary>
            </>)}
        </div>
      </main>
      {verse.versiculoSelecionado && authService.temAcessoTotal() && (
        <a href={`/estudo-ia?ref=${encodeURIComponent(`${verse.versiculoSelecionado.livroNome} ${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}`)}`} target="_blank" rel="noreferrer"
          className="fade-in-bottom hidden lg:flex fixed bottom-6 right-6 z-30 items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"><Sparkles className="w-4 h-4" />{t('biblia.deepenAI')}</a>)}
      <AudioPlayers audioNatural={audioNatural} audio={audio} data={nav.data} livroNome={nav.livro.nome} capitulo={nav.capituloIdx + 1} />
      <AnnotationModal open={verse.anotandoVersiculo !== null} verseKey={verse.anotandoVersiculo} initialText={verse.anotacaoTexto} onClose={() => verse.setAnotandoVersiculo(null)}
        onSave={async (texto) => { const { setAnotacao } = await import('@/lib/estudos'); const parts = verse.anotandoVersiculo!.split(':'); setAnotacao(parts[0], Number(parts[1]), Number(parts[2]), parts[3], texto || null); refresh(); verse.setAnotandoVersiculo(null); verse.setAnotacaoTexto(''); }} />
      {ui.quickSearchOpen && (<QuickSearchModal open={ui.quickSearchOpen} onClose={() => ui.setQuickSearchOpen(false)}
        onGoToResult={(r, query) => { const idx = TODOS_LIVROS.findIndex(l => l.abreviacao === r.livro); if (idx >= 0) { verse.setRecentSearches(prev => { const next = [{ query, livro: r.livro, nome: r.nome, cap: r.cap, versiculo: r.versiculo || 1 }, ...prev.filter(s => s.livro !== r.livro || s.cap !== r.cap)].slice(0, 5); try { localStorage.setItem('ssb_recent_searches', JSON.stringify(next)); } catch {} return next; }); nav.setLivroIdx(idx); nav.setCapituloIdx(r.cap - 1); ui.setQuickSearchOpen(false); } }} recentSearches={verse.recentSearches} />)}
      {ui.mostrarNarracao && passagemDramatica && (<div className="page-transition fixed inset-0 z-50 bg-[var(--bg)]"><Suspense fallback={<PanelFallback />}><NarracaoDramaticaLazy titulo={passagemDramatica.titulo} subtitulo={passagemDramatica.subtitulo} cenas={passagemDramatica.cenas} personagens={passagemDramatica.personagens} onFechar={() => ui.setMostrarNarracao(false)} /></Suspense></div>)}
      {ui.mostrarNarracaoCapitulo && (<Suspense fallback={<PanelFallback />}><NarrationPanel open={ui.mostrarNarracaoCapitulo} onClose={() => { ui.setMostrarNarracaoCapitulo(false); capituloAudio.stop(); }} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} traducao={nav.selectedTrads[0] || 'arc'} livroNome={nav.livro.nome} versiculos={nav.data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []} /></Suspense>)}
      <PainelDoVersiculo livro={verse.versiculoSelecionado?.livroAbreviacao ?? ''} capitulo={verse.versiculoSelecionado?.capitulo ?? 1} versiculo={verse.versiculoSelecionado?.versiculo ?? 1} aberto={painelVersiculoAberto} onFechar={() => { setPainelVersiculoAberto(false); setPainelTabInicial(undefined); verse.setVersiculoSelecionado(null); }} tabInicial={painelTabInicial} />
      <ApresentacaoModal open={ui.mostrarApresentacao} onClose={() => ui.setMostrarApresentacao(false)} livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} versiculo={1} translation={nav.selectedTrads[0] || 'arc'} />
      <PainelQualidadeAudio open={ui.mostrarQualidadeAudio} onOpenChange={ui.setMostrarQualidadeAudio} />
      <ExportModal open={ui.exportOpen} onClose={() => ui.setExportOpen(false)} bookName={nav.livro.nome} chapter={nav.capituloIdx + 1} data={nav.data} />
      <ShareVerseModal open={ui.shareOpen} onClose={() => ui.setShareOpen(false)} verse={verse.versiculoSelecionado ? { livroNome: verse.versiculoSelecionado.livroNome, capitulo: verse.versiculoSelecionado.capitulo, versiculo: verse.versiculoSelecionado.versiculo, texto: verse.versiculoSelecionado.texto, traducao: verse.versiculoSelecionado.traducao } : null} />
      <Paywall aberto={panels.paywallAprofundarAberto} onFechar={() => panels.setPaywallAprofundarAberto(false)} />
      <OfflineDownloadManager open={showDownloadManager} onClose={() => setShowDownloadManager(false)} />
    </div>);
}
