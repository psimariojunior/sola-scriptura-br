'use client';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, ChevronRight, ChevronLeft, Search, Sparkles, Play, Mic, Volume2, ListFilter, HardDrive, MoreVertical, Maximize2, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TranslationDropdown } from './TranslationDropdown';
import { ToolsDropdown } from './ToolsDropdown';
import { ChapterGrid } from './ChapterGrid';
import { ModoLeitura } from './ModoLeitura';
import { ReadingModeBar, type ReadingMode } from './ReadingModeBar';
import type { UseBibliaNavigationReturn } from '@/hooks/biblia/useBibliaNavigation';
import type { UseBibliaUIReturn } from '@/hooks/biblia/useBibliaUI';
import type { UseBibliaPanelsReturn } from '@/hooks/biblia/useBibliaPanels';
import type { UseBibliaVerseReturn } from '@/hooks/biblia/useBibliaVerse';
import dynamic from 'next/dynamic';

const SettingsPanel = dynamic(() => import('./SettingsPanel').then(m => ({ default: m.SettingsPanel })), { ssr: false });

interface BibleToolbarProps {
  nav: UseBibliaNavigationReturn;
  ui: UseBibliaUIReturn;
  panels: Pick<UseBibliaPanelsReturn, 'setSidePanelWidth' | 'setSidePanelTab'>;
  capituloAudio: {
    state: { isPlaying: boolean; isPaused: boolean; isLoading: boolean };
    play: () => void;
    stop: () => void;
  };
  passagemDramatica: { titulo: string; subtitulo: string } | undefined;
  verse: Pick<UseBibliaVerseReturn, 'notaAtiva' | 'criarNota' | 'setNotaAtiva' | 'setAnotacaoTexto'>;
  onShowDownloadManager: (v: boolean) => void;
  onShowHotkeys: () => void;
}

export function BibleToolbar({
  nav, ui, panels, capituloAudio, passagemDramatica, verse, onShowDownloadManager, onShowHotkeys,
}: BibleToolbarProps) {
  const { t } = useTranslation();
  const [mobileToolbarMenuOpen, setMobileToolbarMenuOpen] = useState(false);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuPos, setMobileMenuPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

  const readingMode: ReadingMode = ui.showInterlinear ? 'interlinear' : ui.modoLeitura === 'foco' ? 'leitura' : ui.modoLeitura === 'estudo' ? 'estudo' : ui.modoLeitura === 'apresentacao' ? 'apresentacao' : 'leitura';
  const handleReadingModeChange = (mode: ReadingMode) => {
    if (mode === 'interlinear') {
      ui.setShowInterlinear(true);
      ui.setModoLeitura('foco');
    } else {
      ui.setShowInterlinear(false);
      if (mode === 'leitura') { ui.setModoLeitura('foco'); nav.setViewMode('single'); panels.setSidePanelWidth('collapsed'); }
      else if (mode === 'estudo') { ui.setModoLeitura('estudo'); panels.setSidePanelWidth('half'); panels.setSidePanelTab('comentarios'); }
      else if (mode === 'apresentacao') { ui.setMostrarApresentacao(true); }
    }
  };

  return (
    <div className="border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/95 backdrop-blur-sm sticky top-0 z-20">
      <div className="px-3 sm:px-4 py-2.5 flex items-center gap-1.5 sm:gap-3 overflow-x-auto scrollbar-hide">
        <button onClick={() => ui.setMobileMenu(true)} className="lg:hidden touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0" aria-label="Abrir menu de livros"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => ui.setSidebarOpen(!ui.sidebarOpen)} className="hidden lg:flex touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0" aria-label={t('biblia.toggleSidebar', 'Alternar barra lateral')} aria-expanded={ui.sidebarOpen}><ListFilter className="w-4 h-4" /></button>
        <button onClick={() => ui.setQuickSearchOpen(true)} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0" aria-label={t('biblia.search')} title={t('biblia.search')}><Search className="w-4 h-4" /></button>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)] active:scale-95 transition-transform" aria-label={t('biblia.previousChapter', 'Capítulo anterior')}><ChevronLeft className="w-4 h-4" /></button>
          <div className="relative">
            <button onClick={() => ui.setChapterGridOpen(!ui.chapterGridOpen)} className="px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] border border-[var(--border)]/40 min-w-[80px] max-w-[130px] sm:min-w-[120px] sm:max-w-none text-center hover:bg-[var(--surface-raised)] transition-colors cursor-pointer truncate" aria-label={`${nav.livro.nome} ${nav.capituloIdx + 1}/${nav.livro.totalCapitulos} — ${t('biblia.selectChapter', 'Selecionar capítulo')}`} aria-expanded={ui.chapterGridOpen}>
              <span className="text-sm font-semibold text-[var(--content-primary)]">{nav.livro.nome}</span>
              <span className="text-[var(--brand-default)] font-bold ml-1.5 tabular-nums">{nav.capituloIdx + 1}</span>
              <span className="text-[var(--content-muted)] font-normal text-xs ml-1">/{nav.livro.totalCapitulos}</span>
            </button>
            <ChapterGrid open={ui.chapterGridOpen} onClose={() => ui.setChapterGridOpen(false)} totalCapitulos={nav.livro.totalCapitulos} capituloAtual={nav.capituloIdx} onSelect={(idx) => nav.changeChapter(idx)} />
          </div>
          <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)] active:scale-95 transition-transform" aria-label={t('biblia.nextChapter', 'Próximo capítulo')}><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="flex-1" />
        <ReadingModeBar mode={readingMode} onModeChange={handleReadingModeChange} />
        <div className="flex-1 sm:flex-none" />
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
                <button onClick={() => { onShowDownloadManager(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><HardDrive className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.offlineVersions')}</button>
                <button onClick={() => { if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) capituloAudio.stop(); else capituloAudio.play(); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Volume2 className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.chapterAudio')}</button>
                <div className="h-px bg-[var(--border)]/40 my-1" />
                <button onClick={() => { ui.setToolsOpen(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Sparkles className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.tools')}</button>
                <button onClick={() => { ui.setMostrarApresentacao(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--brand-default)] hover:bg-[var(--brand-subtle)] transition-colors"><Sparkles className="w-4 h-4" />{t('biblia.present')}</button>
                <button onClick={() => { ui.setImmersiveMode(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Maximize2 className="w-4 h-4 text-[var(--content-muted)]" />Modo Imersivo</button>
              </div>
            </>
          )}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ModoLeitura value={ui.modoLeitura} onChange={(v) => { ui.setModoLeitura(v); if (v === 'comparacao') nav.setViewMode('parallel'); else if (v === 'estudo') { panels.setSidePanelWidth('half'); panels.setSidePanelTab('comentarios'); } else if (v === 'apresentacao') ui.setMostrarApresentacao(true); else { nav.setViewMode('single'); panels.setSidePanelWidth('collapsed'); } }} size="sm" />
          <div className="w-px h-6 bg-[var(--border)]/60" />
          <button onClick={() => ui.setShowInterlinear(!ui.showInterlinear)} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all', ui.showInterlinear ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20' : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20')} title={t('biblia.showOriginalText')} aria-label={t('biblia.toggleInterlinear', 'Alternar vista interlinear')} aria-pressed={ui.showInterlinear}>
            <span className="font-hebrew" style={{ fontSize: '11px' }}>א</span>Interlinear
          </button>
          <button onClick={() => onShowDownloadManager(true)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20 transition-all" title={t('biblia.manageOffline')} aria-label={t('biblia.offlineVersions', 'Versões offline')}>
            <HardDrive className="w-3.5 h-3.5" />Versões
          </button>
          <div className="w-px h-6 bg-[var(--border)]/60" />
          <div className="flex items-center gap-0.5">
            <button onClick={() => { if (ui.mostrarNarracaoCapitulo) { ui.setMostrarNarracaoCapitulo(false); capituloAudio.stop(); } if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) capituloAudio.stop(); else capituloAudio.play(); }}
              className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 hover:scale-105', capituloAudio.state.isPlaying ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20' : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20')}
              aria-label={capituloAudio.state.isPlaying ? t('biblia.stopAudio', 'Parar áudio') : t('biblia.playAudio', 'Reproduzir áudio do capítulo')}>
              {capituloAudio.state.isLoading ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : capituloAudio.state.isPlaying ? <span className="flex gap-0.5"><span className="w-0.5 h-3 bg-current rounded-full" /><span className="w-0.5 h-3 bg-current rounded-full" /></span> : <Play className="w-3.5 h-3.5 fill-current" />}
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => ui.setMostrarQualidadeAudio(true)} className="p-1.5 rounded-full text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] active:scale-95 transition-transform" title={t('biblia.audioQuality')} aria-label={t('biblia.audioQuality', 'Qualidade do áudio')}><Mic className="w-3.5 h-3.5" /></button>
          </div>
          <ToolsDropdown open={ui.toolsOpen} onToggle={() => { ui.setToolsOpen(!ui.toolsOpen); ui.setTradOpen(false); }} onClose={() => ui.setToolsOpen(false)} bookName={nav.livro.nome} chapter={nav.capituloIdx + 1} data={nav.data} hasDramatica={!!passagemDramatica}
            onNotas={() => { if (!ui.mostrarNotas && !verse.notaAtiva) { verse.setNotaAtiva(verse.criarNota(`${nav.livro.nome} ${nav.capituloIdx + 1}`)); } ui.setMostrarNotas(!ui.mostrarNotas); ui.setToolsOpen(false); }}
            onExportPdf={() => { ui.setToolsOpen(false); ui.setExportOpen(true); }} onPlanoLeitura={() => { ui.setShowPlan(!ui.showPlan); ui.setToolsOpen(false); }}
            onNarracaoDramatica={() => { ui.setMostrarNarracao(true); ui.setToolsOpen(false); }} onNarrarCapitulo={() => { capituloAudio.stop(); ui.setMostrarNarracaoCapitulo(true); ui.setToolsOpen(false); }}
            onConfiguracoes={() => { ui.setShowSettings(!ui.showSettings); ui.setToolsOpen(false); }} />
          <button onClick={() => ui.setMostrarApresentacao(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[var(--brand-contrast)] bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] shadow-md shadow-[var(--brand-default)]/30 hover:shadow-lg hover:shadow-[var(--brand-default)]/40 transition-all active:scale-97 hover:scale-105"
            aria-label={t('biblia.present', 'Apresentar')}>
            <Sparkles className="w-3.5 h-3.5" />{t('biblia.present')}<span className="inline-flex items-center px-1 py-0 rounded text-[8px] font-extrabold bg-white/20">{t('biblia.new')}</span>
          </button>
          <button onClick={() => ui.setImmersiveMode(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20 transition-all"
            title="Modo Imersivo">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onShowHotkeys}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20 transition-all"
            title="Atalhos ( ? )"
            aria-label="Mostrar atalhos de teclado">
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <SettingsPanel open={ui.showSettings} fontSize={ui.fontSize} onFontSizeChange={ui.setFontSize} showDiff={ui.showDiff} onToggleDiff={() => ui.setShowDiff(!ui.showDiff)} showComparison={nav.viewMode === 'comparison' && nav.data.length >= 2} fontFamily={ui.fontFamily} onFontFamilyChange={ui.setFontFamily} lineSpacing={ui.lineSpacing} onLineSpacingChange={ui.setLineSpacing} />
    </div>
  );
}
