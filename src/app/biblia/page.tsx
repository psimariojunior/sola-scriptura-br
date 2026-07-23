'use client';

import { useCallback, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { BookOpen, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Search, Sparkles, Play, Mic, Volume2, ListFilter, WifiOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEstudos } from '@/components/EstudosProvider';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import { useAudioCapitulo } from '@/hooks/useAudioCapitulo';
import ReadingPlanBanner from '@/components/ReadingPlanBanner';
import { useFlashcards } from '@/hooks/useFlashcards';
import { getMarcador } from '@/lib/marcadores';
import OfflineBanner from '@/components/OfflineBanner';
import { useVerseResources } from '@/hooks/useVerseResources';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { cn } from '@/lib/utils';
import { ChapterHeader } from '@/components/Biblia/ChapterHeader';
import { ModoLeitura } from '@/components/Biblia/ModoLeitura';
import { VerseCard } from '@/components/Biblia/VerseCard';
import { MobileActionBar } from '@/components/Biblia/MobileActionBar';
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

export default function BibliaPage() {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGoToBook = useCallback((idx: number, cap?: number) => { nav.goToBook(idx, cap); ui.setMobileMenu(false); ui.setChapterGridOpen(false); }, [nav.goToBook, ui.setMobileMenu, ui.setChapterGridOpen]);

  if (ui.zenMode && nav.temDados) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto">
        <div className="max-w-[700px] mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button onClick={() => ui.setZenMode(false)} className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors" title="Sair do modo zen (Esc)"><X className="w-5 h-5" /></button>
              <div><h1 className="font-display text-xl font-semibold text-[var(--content-primary)]">{nav.livro.nome} {nav.capituloIdx + 1}</h1><p className="text-xs text-[var(--content-muted)]">{nav.selectedTrads.map(t => labelMap[t] || t.toUpperCase()).join(' · ')}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] disabled:opacity-30 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] disabled:opacity-30 transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          {nav.data.map((item) => (<div key={item.traducao}>
            {nav.selectedTrads.length > 1 && (<div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/30"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span></div>)}
            <div className="space-y-4">{item.versiculos.map((v) => (<motion.p key={v.numero} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: v.numero * 0.02 }}
              className="font-serif-body text-[var(--content-primary)] leading-[2] cursor-pointer hover:bg-[var(--surface-sunken)]/40 rounded-lg px-3 py-2 -mx-3 transition-colors" style={{ fontSize: `${ui.fontSize + 2}px` }}
              onClick={() => { ui.setZenMode(false); verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao, v.texto); }}>
              <sup className="text-[var(--brand-default)] font-bold text-[11px] mr-1.5 select-none tabular-nums">{v.numero}</sup>{v.texto}</motion.p>))}</div>
          </div>))}
          <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-[var(--border)]/30">
            <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--surface-sunken)] transition-colors"><ChevronLeft className="w-4 h-4" />Capítulo anterior</button>
            <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--surface-sunken)] transition-colors">Próximo capítulo<ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>);
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header /><OfflineBanner />
      <main id="main-content" className="pt-16">
        <div className="px-4 sm:px-6 py-2 bg-[var(--surface-raised)]/80 border-b border-[var(--border)]/40 backdrop-blur-sm"><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Bíblia' }]} /></div>
        <div className="flex min-h-[100dvh] md:h-[calc(100vh-7rem-40px)] relative">
          <AnimatePresence>{ui.sidebarOpen && (
            <motion.aside initial={{ x: -288, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -288, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="hidden lg:block w-64 border-r border-[var(--border)] bg-[var(--surface-raised)] overflow-y-auto shrink-0">
              <div className="p-4 h-full flex flex-col">
                <div className="relative mb-3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" /><input type="text" placeholder="Buscar livro..." value={nav.searchQuery} onChange={e => nav.setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--surface-sunken)] border border-[var(--border)]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 transition-all duration-200" /></div>
                <div className="flex-1 overflow-y-auto space-y-0.5">{nav.livrosFiltrados.map((l) => { const idx = TODOS_LIVROS.indexOf(l); return (<button key={l.abreviacao} onClick={() => handleGoToBook(idx)} className={cn('w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 group', idx === nav.livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-semibold' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]')}><span className="truncate">{l.nome}</span><span className="ml-auto text-[10px] opacity-0 group-hover:opacity-50 transition-opacity tabular-nums">{l.totalCapitulos}c</span></button>); })}</div>
              </div>
            </motion.aside>)}</AnimatePresence>
          <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
            <div className="border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/95 backdrop-blur-sm sticky top-0 z-20">
              <div className="px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 flex-wrap">
                <button onClick={() => ui.setMobileMenu(true)} className="lg:hidden touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]" aria-label="Abrir menu de livros"><BookOpen className="w-4 h-4" /></button>
                <button onClick={() => ui.setSidebarOpen(!ui.sidebarOpen)} className="hidden lg:flex touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]"><ListFilter className="w-4 h-4" /></button>
                <div className="flex items-center gap-1">
                  <motion.button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} whileTap={{ scale: 0.92 }} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)]"><ChevronLeft className="w-4 h-4" /></motion.button>
                  <div className="relative">
                    <button onClick={() => ui.setChapterGridOpen(!ui.chapterGridOpen)} className="px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] border border-[var(--border)]/40 min-w-[120px] text-center hover:bg-[var(--surface-raised)] transition-colors cursor-pointer">
                      <span className="text-xs font-semibold text-[var(--content-primary)]">{nav.livro.nome}</span>
                      <span className="text-[var(--brand-default)] font-bold ml-1.5 tabular-nums">{nav.capituloIdx + 1}</span>
                      <span className="text-[var(--content-muted)] font-normal text-[10px] ml-1">/{nav.livro.totalCapitulos}</span>
                    </button>
                    <ChapterGrid open={ui.chapterGridOpen} onClose={() => ui.setChapterGridOpen(false)} totalCapitulos={nav.livro.totalCapitulos} capituloAtual={nav.capituloIdx} onSelect={(idx) => nav.changeChapter(idx)} />
                  </div>
                  <motion.button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} whileTap={{ scale: 0.92 }} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)]"><ChevronRight className="w-4 h-4" /></motion.button>
                </div>
                <div className="flex-1" />
                <ModoLeitura value={ui.modoLeitura} onChange={(v) => { ui.setModoLeitura(v); if (v === 'comparacao') nav.setViewMode('parallel'); else if (v === 'estudo') { panels.setSidePanelWidth('half'); panels.setSidePanelTab('comentarios'); } else if (v === 'apresentacao') ui.setMostrarApresentacao(true); else { nav.setViewMode('single'); panels.setSidePanelWidth('collapsed'); } }} size="sm" />
                <div className="hidden sm:block w-px h-6 bg-[var(--border)]/60" />
                <button onClick={() => ui.setShowInterlinear(!ui.showInterlinear)} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all', ui.showInterlinear ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20' : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20')} title="Mostrar texto original hebraico/grego">
                  <span className="font-hebrew" style={{ fontSize: '11px' }}>א</span><span className="hidden sm:inline">Interlinear</span>
                </button>
                <div className="hidden sm:block w-px h-6 bg-[var(--border)]/60" />
                <TranslationDropdown open={ui.tradOpen} onToggle={() => { ui.setTradOpen(!ui.tradOpen); ui.setToolsOpen(false); }} onClose={() => ui.setTradOpen(false)} selectedTrads={nav.selectedTrads} onToggleTrad={nav.toggleTrad} viewMode={nav.viewMode} onViewModeChange={nav.setViewMode} />
                <div className="hidden md:flex items-center gap-0.5">
                  <motion.button onClick={() => { if (ui.mostrarNarracaoCapitulo) { ui.setMostrarNarracaoCapitulo(false); capituloAudio.stop(); } if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) capituloAudio.stop(); else capituloAudio.play(); }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all', capituloAudio.state.isPlaying ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20' : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20')}>
                    {capituloAudio.state.isLoading ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : capituloAudio.state.isPlaying ? <span className="flex gap-0.5"><span className="w-0.5 h-3 bg-current rounded-full" /><span className="w-0.5 h-3 bg-current rounded-full" /></span> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <Volume2 className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button onClick={() => ui.setMostrarQualidadeAudio(true)} whileTap={{ scale: 0.96 }} className="p-1.5 rounded-full text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]" title="Qualidade do áudio"><Mic className="w-3.5 h-3.5" /></motion.button>
                </div>
                <ToolsDropdown open={ui.toolsOpen} onToggle={() => { ui.setToolsOpen(!ui.toolsOpen); ui.setTradOpen(false); }} onClose={() => ui.setToolsOpen(false)} bookName={nav.livro.nome} chapter={nav.capituloIdx + 1} data={nav.data} hasDramatica={!!passagemDramatica}
                  onNotas={() => { if (!ui.mostrarNotas && !verse.notaAtiva) { verse.setNotaAtiva(verse.criarNota(`${nav.livro.nome} ${nav.capituloIdx + 1}`)); } ui.setMostrarNotas(!ui.mostrarNotas); ui.setToolsOpen(false); }}
                  onExportPdf={() => { ui.setToolsOpen(false); ui.setExportOpen(true); }} onPlanoLeitura={() => { ui.setShowPlan(!ui.showPlan); ui.setToolsOpen(false); }}
                  onNarracaoDramatica={() => { ui.setMostrarNarracao(true); ui.setToolsOpen(false); }} onNarrarCapitulo={() => { capituloAudio.stop(); ui.setMostrarNarracaoCapitulo(true); ui.setToolsOpen(false); }}
                  onConfiguracoes={() => { ui.setShowSettings(!ui.showSettings); ui.setToolsOpen(false); }} />
                <motion.button onClick={() => ui.setMostrarApresentacao(true)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[var(--brand-contrast)] bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] shadow-md shadow-[var(--brand-default)]/30 hover:shadow-lg hover:shadow-[var(--brand-default)]/40 transition-shadow">
                  <Sparkles className="w-3.5 h-3.5" /><span className="hidden sm:inline">Apresentar</span><span className="hidden md:inline-flex items-center px-1 py-0 rounded text-[8px] font-extrabold bg-white/20">NEW</span>
                </motion.button>
              </div>
              <SettingsPanel open={ui.showSettings} fontSize={ui.fontSize} onFontSizeChange={ui.setFontSize} showDiff={ui.showDiff} onToggleDiff={() => ui.setShowDiff(!ui.showDiff)} showComparison={nav.viewMode === 'comparison' && nav.data.length >= 2} />
            </div>
            <div ref={nav.mainRef} className="flex-1 overflow-y-auto" style={{ contain: 'layout' }}>
              <div className="max-w-[min(900px,100%-2rem)] mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {ui.showPlan && <ReadingPlanBanner />}
                {nav.loading && !nav.temDados ? (
                  <div className="space-y-4 chapter-enter"><div className="skeleton skeleton-title w-48 mx-auto animate-pulse" /><div className="ornament w-20 mx-auto mb-8 opacity-30" />
                    {Array.from({ length: 10 }).map((_, i) => (<div key={i} className="flex gap-3 items-center" style={{ animationDelay: `${i * 50}ms` }}><div className="skeleton skeleton-text w-10 h-10 shrink-0 rounded-lg" /><div className="skeleton skeleton-text flex-1 rounded" style={{ width: `${60 + Math.random() * 40}%` }} /></div>))}
                  </div>
                ) : nav.offlineUnavailable ? (
                  <div className="text-center py-20"><WifiOff className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} /><p className="text-lg text-[var(--content-muted)]">Capítulo não disponível offline</p><p className="text-sm text-[var(--content-muted)] mt-2">Conecte-se à internet ou baixe as traduções.</p></div>
                ) : nav.temDados ? (
                  <AnimatePresence mode="wait"><motion.div key={`${nav.livro.abreviacao}-${nav.capituloIdx}`} {...ui.chapterAnimProps} role="article" aria-label={`${nav.livro.nome} capítulo ${nav.capituloIdx + 1}`}>
                    <ChapterHeader livroNome={nav.livro.nome} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} totalCapitulos={nav.livro.totalCapitulos} totalVersiculos={nav.data[0]?.versiculos?.length ?? 0} />
                    {ui.showInterlinear && nav.data[0] && (<div className="mb-8"><div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/40"><span className="font-hebrew text-lg text-[var(--brand-default)]">א</span><span className="text-sm font-semibold text-[var(--content-primary)]">Vista Interlinear</span></div><InterlinearView versiculos={nav.data[0].versiculos} livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} traducao={nav.data[0].traducao} /></div>)}
                    {(ui.modoLeitura === 'foco' || ui.modoLeitura === 'estudo') && nav.data.map((item) => (<div key={item.traducao} className="mb-6">
                      {nav.selectedTrads.length > 1 && (<div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>{ui.modoLeitura === 'foco' && <span className="text-xs text-[var(--content-muted)]">{nomeMap[item.traducao]}</span>}</div>)}
                      <div className={cn('space-y-1', ui.modoLeitura === 'foco' && 'divide-y divide-[var(--brand-default)]/5')}>{item.versiculos.map((v) => {
                        const isSelected = verse.versiculoSelecionado?.versiculo === v.numero && verse.versiculoSelecionado?.traducao === item.traducao;
                        const isPlaying = audio.isVersePlaying(v.numero);
                        const isCurrentAudioVerse = capituloAudio.state.isPlaying && capituloAudio.state.currentVerseIndex === v.numero - 1;
                        const verseKey = `${nav.livro.abreviacao}:${nav.capituloIdx + 1}:${v.numero}:${item.traducao}`;
                        const fav = isFavorito(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao);
                        const marcaMarcador = getMarcador(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao);
                        return (<VerseCard key={`${item.traducao}-${v.numero}`} numero={v.numero} texto={v.texto} livroAbreviacao={nav.livro.abreviacao} livroNome={nav.livro.nome} capitulo={nav.capituloIdx + 1} traducao={item.traducao} fontSize={ui.fontSize}
                          isSelected={isSelected} isPlaying={isPlaying} isHighlighted={ui.modoLeitura === 'foco' && ui.highlightedVerse === v.numero} isFocused={ui.focusedVerse === v.numero} isFavorito={fav} corMarca={marcaMarcador?.cor ?? null} temAnotacao={false} copiedVerse={verse.copiedVerse}
                          audioNatural={audioNatural} audio={audio} flashcards={flashcards} estudoAberto={verse.estudoAberto === v.numero}
                          onSelect={() => verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao, v.texto)} onFavoritoChange={refresh}
                          onAnotar={() => { verse.setAnotandoVersiculo(verseKey); verse.setAnotacaoTexto(''); }} onStrong={() => { panels.setSidePanelWidth('half'); panels.setSidePanelTab('strong'); }}
                          onComentarios={() => { verse.setComentarioVersiculo(v.numero); panels.setSidePanelWidth('half'); panels.setSidePanelTab('comentarios'); }}
                          onToggleEstudo={() => verse.setEstudoAberto(verse.estudoAberto === v.numero ? null : v.numero)} copyVerse={verse.copyVerse} verseKey={verseKey}
                          showTranslationLabel={nav.selectedTrads.length > 1} tradLabel={labelMap[item.traducao]} tradBadgeColor={tradBadgeColors[item.traducao]}
                          isCurrentAudioVerse={isCurrentAudioVerse} hasResources={verseResources.hasResources(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero)} />);
                      })}</div>
                    </div>))}
                    {ui.modoLeitura === 'comparacao' && nav.viewMode === 'parallel' && (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">{nav.data.map((item) => (
                      <motion.div key={item.traducao} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="border border-[var(--border)]/40 rounded-xl p-3 sm:p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/30"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold">{labelMap[item.traducao]}</span></div>
                        {item.versiculos.map(v => (<p key={v.numero} className="mb-2 leading-[1.7] font-serif-body" style={{ fontSize: `${Math.max(ui.fontSize - 2, 14)}px` }}><sup className="text-[var(--brand-default)] font-bold text-[10px] mr-1 select-none tabular-nums">{v.numero}</sup>{v.texto}</p>))}
                      </motion.div>))}</div>)}
                    {ui.modoLeitura === 'comparacao' && nav.viewMode === 'comparison' && nav.data.length >= 2 && (<ComparisonTable data={nav.data} fontSize={ui.fontSize} showDiff={ui.showDiff} highlightedVerse={ui.highlightedVerse} onHighlight={ui.setHighlightedVerse} maxVersiculos={nav.maxVersiculos} tradBadgeColors={tradBadgeColors} labelMap={labelMap} />)}
                    {nav.estudoCapitulo && (<div className="mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-[var(--border)]/30">
                      <button onClick={() => ui.setEstudoCapituloAberto(o => !o)} className="w-full flex items-center gap-2 text-left group" aria-expanded={ui.estudoCapituloAberto}>
                        <BookOpen className="w-4 h-4 text-[var(--primary)]" /><span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)] group-hover:text-[var(--fg)] transition-colors">Estudo do Capítulo</span>
                        <span className="text-xs text-[var(--primary)] font-medium">{nav.estudoCapitulo.titulo}</span><div className="flex-1" />
                        {ui.estudoCapituloAberto ? <ChevronUp className="w-4 h-4 text-[var(--muted-fg)]" /> : <ChevronDown className="w-4 h-4 text-[var(--muted-fg)]" />}
                      </button>
                      <AnimatePresence initial={false}>{ui.estudoCapituloAberto && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                        <Suspense fallback={<PanelFallback />}><PainelEstudosCapitulo livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} nomeLivro={nav.livro.nome} /></Suspense>
                      </motion.div>)}</AnimatePresence>
                    </div>)}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-[var(--border)]/30">
                      <motion.button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-colors min-h-[44px]"><ChevronLeft className="w-4 h-4" /> Anterior</motion.button>
                      <div className="hidden sm:flex flex-col items-center gap-1.5 min-w-[120px]"><span className="text-[10px] text-[var(--content-muted)] font-mono tabular-nums">{nav.capituloIdx + 1} / {nav.livro.totalCapitulos}</span><ProgressBar value={nav.capituloIdx + 1} total={nav.livro.totalCapitulos} className="w-24" /></div>
                      <motion.button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-colors min-h-[44px]">Próximo <ChevronRight className="w-4 h-4" /></motion.button>
                    </div>
                  </motion.div></AnimatePresence>
                ) : (<div className="text-center py-20"><BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} /><p className="text-lg text-[var(--content-muted)]">Selecione um livro e capítulo</p></div>)}
              </div>
              <NotesPanelSection open={ui.mostrarNotas} onClose={() => ui.setMostrarNotas(false)} notas={verse.notas} notaAtiva={verse.notaAtiva} onSalvar={(nota) => { verse.setNotaAtiva(nota); verse.salvarNotaHook(nota.id, nota.conteudo); }} onExcluir={(id) => { verse.excluirNota(id); verse.setNotaAtiva(null); ui.setMostrarNotas(false); }} />
            </div>
            <MobileBookMenu open={ui.mobileMenu} onClose={() => ui.setMobileMenu(false)} livroIdx={nav.livroIdx} onSelect={(idx) => handleGoToBook(idx)} onSelectChapter={(idx, cap) => handleGoToBook(idx, cap)} />
          </div>
          <AnimatePresence>{panels.sidePanelOpen && (
            <ErrorBoundary fallback={<div className="shrink-0 w-full sm:w-[340px] md:w-[380px] lg:w-[420px] border-l border-[var(--border)] bg-[var(--surface-raised)] flex items-center justify-center p-8"><p className="text-sm text-[var(--content-muted)]">Erro ao carregar painel</p><button onClick={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); }} className="text-xs text-[var(--brand-default)] underline">Fechar</button></div>}>
              <SidePanel open={panels.sidePanelOpen} width={panels.sidePanelWidth} onWidthChange={panels.setSidePanelWidth} activeTab={panels.sidePanelTab} onActiveTabChange={(tab) => { panels.setSidePanelTab(tab); if (!tab) panels.setSidePanelWidth('collapsed'); }}
                livro={nav.livro.nome} livroNome={nav.livro.nome} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} versiculo={verse.comentarioVersiculo ?? verse.versiculoSelecionado?.versiculo}
                onClose={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); }} versiculoTexto={verse.versiculoSelecionado?.texto} versiculoTraducao={verse.versiculoSelecionado?.traducao} />
            </ErrorBoundary>)}</AnimatePresence>
        </div>
      </main>
      <MobileActionBar selected={verse.versiculoSelecionado} onClose={() => verse.setVersiculoSelecionado(null)} audioNatural={audioNatural} audio={audio} flashcards={flashcards}
        isFavorito={verse.versiculoSelecionado ? isFavorito(verse.versiculoSelecionado.livro, verse.versiculoSelecionado.capitulo, verse.versiculoSelecionado.versiculo, verse.versiculoSelecionado.traducao) : false} onFavoritoChange={refresh}
        onAnotar={() => { if (!verse.versiculoSelecionado) return; const m = getMarcador(verse.versiculoSelecionado.livro, verse.versiculoSelecionado.capitulo, verse.versiculoSelecionado.versiculo, verse.versiculoSelecionado.traducao); verse.setAnotandoVersiculo(`${verse.versiculoSelecionado.livro}:${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}:${verse.versiculoSelecionado.traducao}`); verse.setAnotacaoTexto(m?.cor || ''); verse.setVersiculoSelecionado(null); }}
        onStrong={() => { panels.setSidePanelWidth('half'); panels.setSidePanelTab('strong'); verse.setVersiculoSelecionado(null); }}
        onComentarios={() => { if (verse.versiculoSelecionado) { verse.setComentarioVersiculo(verse.versiculoSelecionado.versiculo); panels.setSidePanelWidth('half'); panels.setSidePanelTab('comentarios'); } verse.setVersiculoSelecionado(null); }}
        onToggleEstudo={() => { if (verse.versiculoSelecionado) verse.setEstudoAberto(verse.estudoAberto === verse.versiculoSelecionado.versiculo ? null : verse.versiculoSelecionado.versiculo); verse.setVersiculoSelecionado(null); }}
        onApresentar={() => { ui.setMostrarApresentacao(true); verse.setVersiculoSelecionado(null); }} onCompartilharImagem={() => ui.setShareOpen(true)}
        onCompartilharSala={() => {
          if (!verse.versiculoSelecionado) return;
          const v = verse.versiculoSelecionado;
          const data = { livro: v.livroNome, livroAbrev: v.livroAbreviacao, capitulo: v.capitulo, versiculo: v.versiculo, texto: v.texto, traducao: v.traducao };
          try { localStorage.setItem('ssb_collab_share_pending', JSON.stringify(data)); } catch {}
          window.location.href = '/estudo-colaborativo';
        }}
        onAprofundar={() => { if (!verse.versiculoSelecionado) return; if (!authService.temAcessoTotal()) { panels.setPaywallAprofundarAberto(true); return; } window.open(`/estudo-ia?ref=${encodeURIComponent(`${verse.versiculoSelecionado.livroNome} ${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}`)}`, '_blank'); }}
        copyVerse={verse.copyVerse} copiedVerse={verse.copiedVerse} />
      <AnimatePresence>{verse.versiculoSelecionado && authService.temAcessoTotal() && (
        <motion.a href={`/estudo-ia?ref=${encodeURIComponent(`${verse.versiculoSelecionado.livroNome} ${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}`)}`} target="_blank" initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="hidden lg:flex fixed bottom-6 right-6 z-30 items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/30 hover:shadow-xl transition-shadow"><Sparkles className="w-4 h-4" />Aprofundar com IA</motion.a>)}</AnimatePresence>
      <AudioPlayers audioNatural={audioNatural} audio={audio} data={nav.data} livroNome={nav.livro.nome} capitulo={nav.capituloIdx + 1} />
      <AnnotationModal open={verse.anotandoVersiculo !== null} verseKey={verse.anotandoVersiculo} initialText={verse.anotacaoTexto} onClose={() => verse.setAnotandoVersiculo(null)}
        onSave={async (texto) => { const { setAnotacao } = await import('@/lib/estudos'); const parts = verse.anotandoVersiculo!.split(':'); setAnotacao(parts[0], Number(parts[1]), Number(parts[2]), parts[3], texto || null); refresh(); verse.setAnotandoVersiculo(null); verse.setAnotacaoTexto(''); }} />
      <AnimatePresence>{ui.quickSearchOpen && (<QuickSearchModal open={ui.quickSearchOpen} onClose={() => ui.setQuickSearchOpen(false)}
        onGoToResult={(r, query) => { const idx = TODOS_LIVROS.findIndex(l => l.abreviacao === r.livro); if (idx >= 0) { verse.setRecentSearches(prev => { const next = [{ query, livro: r.livro, nome: r.nome, cap: r.cap, versiculo: r.versiculo || 1 }, ...prev.filter(s => s.livro !== r.livro || s.cap !== r.cap)].slice(0, 5); try { localStorage.setItem('ssb_recent_searches', JSON.stringify(next)); } catch {} return next; }); nav.setLivroIdx(idx); nav.setCapituloIdx(r.cap - 1); ui.setQuickSearchOpen(false); } }} recentSearches={verse.recentSearches} />)}</AnimatePresence>
      <AnimatePresence>{ui.mostrarNarracao && passagemDramatica && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[var(--bg)]"><Suspense fallback={<PanelFallback />}><NarracaoDramaticaLazy titulo={passagemDramatica.titulo} subtitulo={passagemDramatica.subtitulo} cenas={passagemDramatica.cenas} personagens={passagemDramatica.personagens} onFechar={() => ui.setMostrarNarracao(false)} /></Suspense></motion.div>)}</AnimatePresence>
      <AnimatePresence>{ui.mostrarNarracaoCapitulo && (<Suspense fallback={<PanelFallback />}><NarrationPanel open={ui.mostrarNarracaoCapitulo} onClose={() => { ui.setMostrarNarracaoCapitulo(false); capituloAudio.stop(); }} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} traducao={nav.selectedTrads[0] || 'arc'} livroNome={nav.livro.nome} versiculos={nav.data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []} /></Suspense>)}</AnimatePresence>
      <PainelDoVersiculo livro={verse.versiculoSelecionado?.livroAbreviacao ?? ''} capitulo={verse.versiculoSelecionado?.capitulo ?? 1} versiculo={verse.versiculoSelecionado?.versiculo ?? 1} aberto={verse.versiculoSelecionado !== null} onFechar={() => verse.setVersiculoSelecionado(null)} />
      <ApresentacaoModal open={ui.mostrarApresentacao} onClose={() => ui.setMostrarApresentacao(false)} livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} versiculo={1} translation={nav.selectedTrads[0] || 'arc'} />
      <PainelQualidadeAudio open={ui.mostrarQualidadeAudio} onOpenChange={ui.setMostrarQualidadeAudio} />
      <ExportModal open={ui.exportOpen} onClose={() => ui.setExportOpen(false)} bookName={nav.livro.nome} chapter={nav.capituloIdx + 1} data={nav.data} />
      <ShareVerseModal open={ui.shareOpen} onClose={() => ui.setShareOpen(false)} verse={verse.versiculoSelecionado ? { livroNome: verse.versiculoSelecionado.livroNome, capitulo: verse.versiculoSelecionado.capitulo, versiculo: verse.versiculoSelecionado.versiculo, texto: verse.versiculoSelecionado.texto, traducao: verse.versiculoSelecionado.traducao } : null} />
      <Paywall aberto={panels.paywallAprofundarAberto} onFechar={() => panels.setPaywallAprofundarAberto(false)} />
    </div>);
}
