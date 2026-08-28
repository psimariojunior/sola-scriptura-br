'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, ChevronRight, ChevronLeft, Search, Sparkles, Play, Volume2, ListFilter, HardDrive, MoreVertical, Maximize2, Keyboard, FileText, Settings, Download, Minus, Plus, AlignLeft, Rows3, Compass, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { hrefGuia } from '@/lib/bibliaHref';
import { isChapterBookmarked, toggleChapterBookmark } from '@/lib/readingProgress';
import { cn } from '@/lib/utils';
import { TranslationDropdown } from './TranslationDropdown';
import { ToolsDropdown } from './ToolsDropdown';
import { ChapterGrid } from './ChapterGrid';
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
  verse: Pick<UseBibliaVerseReturn, 'notaAtiva' | 'criarNota' | 'setNotaAtiva' | 'setAnotacaoTexto' | 'handleSelectFromList' | 'setVersiculoSelecionado' | 'versiculoSelecionado'>;
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
  const [capituloMarcado, setCapituloMarcado] = useState(false);

  const guiaHref = hrefGuia(
    nav.livro.abreviacao,
    nav.capituloIdx + 1,
    verse.versiculoSelecionado?.versiculo
  );

  const syncBookmark = () => {
    setCapituloMarcado(isChapterBookmarked(nav.livro.abreviacao, nav.capituloIdx + 1));
  };

  useEffect(() => {
    syncBookmark();
  }, [nav.livro.abreviacao, nav.capituloIdx]);

  const readingMode: ReadingMode =
    ui.modoLeitura === 'comparacao' ? 'comparar'
      : ui.modoLeitura === 'estudo' || ui.modoLeitura === 'split' ? 'estudo'
        : 'leitura';

  const leituraExibicaoRef = useRef(ui.modoExibicao);

  const handleReadingModeChange = (mode: ReadingMode) => {
    ui.setShowInterlinear(false);
    if (mode === 'leitura') {
      ui.setModoLeitura('foco');
      ui.setModoExibicao(leituraExibicaoRef.current);
      nav.setViewMode('single');
      panels.setSidePanelWidth('collapsed');
    } else if (mode === 'estudo') {
      leituraExibicaoRef.current = ui.modoExibicao;
      ui.setModoLeitura('estudo');
      ui.setModoExibicao('versiculo');
      ui.setEstudoCapituloAberto(true);
      nav.setViewMode('single');
      panels.setSidePanelWidth('half');
      panels.setSidePanelTab('comentarios');
      if (!verse.versiculoSelecionado && nav.data[0]?.versiculos?.[0]) {
        const v = nav.data[0].versiculos[0];
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
          verse.handleSelectFromList(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, nav.data[0].traducao, v.texto);
        } else {
          verse.setVersiculoSelecionado({
            livro: nav.livro.abreviacao,
            livroNome: nav.livro.nome,
            livroAbreviacao: nav.livro.abreviacao,
            capitulo: nav.capituloIdx + 1,
            versiculo: v.numero,
            traducao: nav.data[0].traducao,
            texto: v.texto,
          });
        }
      }
    } else {
      ui.setModoLeitura('comparacao');
      nav.setViewMode('parallel');
      panels.setSidePanelWidth('collapsed');
    }
  };

  const bumpFont = (delta: number) => {
    ui.setFontSize((prev) => Math.min(32, Math.max(14, prev + delta)));
  };

  return (
    <div className="bible-toolbar border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/95 backdrop-blur-sm sticky top-0 z-30 overflow-visible">
      <div className="px-3 sm:px-4 py-2 flex items-center gap-1.5 sm:gap-2">
        <button onClick={() => ui.setMobileMenu(true)} className="lg:hidden touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0" aria-label="Abrir menu de livros"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => ui.setSidebarOpen(!ui.sidebarOpen)} className="hidden lg:flex touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0" aria-label={t('biblia.toggleSidebar', 'Alternar barra lateral')} aria-expanded={ui.sidebarOpen}><ListFilter className="w-4 h-4" /></button>
        <button onClick={() => ui.setQuickSearchOpen(true)} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] shrink-0" aria-label={t('biblia.search')} title={t('biblia.search')}><Search className="w-4 h-4" /></button>
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 min-w-0">
          <button onClick={() => nav.changeChapter(Math.max(0, nav.capituloIdx - 1))} disabled={nav.capituloIdx === 0} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)] active:scale-95 transition-transform" aria-label={t('biblia.previousChapter', 'Capítulo anterior')}><ChevronLeft className="w-4 h-4" /></button>
          <div className="relative min-w-0">
            <button onClick={() => ui.setChapterGridOpen(!ui.chapterGridOpen)} className="px-2 py-1 rounded-md bg-[var(--surface-sunken)] border border-[var(--border)]/40 min-w-[5rem] sm:min-w-[8.5rem] text-center hover:bg-[var(--surface-raised)] transition-colors cursor-pointer" aria-label={`${nav.livro.nome} ${nav.capituloIdx + 1}/${nav.livro.totalCapitulos} — ${t('biblia.selectChapter', 'Selecionar capítulo')}`} aria-expanded={ui.chapterGridOpen}>
              <span className="flex items-baseline justify-center gap-1.5 min-w-0">
                <span className="text-sm font-semibold text-[var(--content-primary)] truncate max-w-[6.5rem] sm:max-w-[11rem]">{nav.livro.nome}</span>
                <span className="text-primary font-bold tabular-nums shrink-0">{nav.capituloIdx + 1}</span>
                <span className="text-[var(--content-muted)] font-normal text-xs tabular-nums shrink-0">/{nav.livro.totalCapitulos}</span>
              </span>
            </button>
            <ChapterGrid open={ui.chapterGridOpen} onClose={() => ui.setChapterGridOpen(false)} totalCapitulos={nav.livro.totalCapitulos} capituloAtual={nav.capituloIdx} onSelect={(idx) => nav.changeChapter(idx)} />
          </div>
          <button onClick={() => nav.changeChapter(Math.min(nav.livro.totalCapitulos - 1, nav.capituloIdx + 1))} disabled={nav.capituloIdx >= nav.livro.totalCapitulos - 1} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)] active:scale-95 transition-transform" aria-label={t('biblia.nextChapter', 'Próximo capítulo')}><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => { if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) capituloAudio.stop(); else capituloAudio.play(); }}
          className={cn('touch-target p-1.5 rounded-lg shrink-0 active:scale-95 transition-transform', capituloAudio.state.isPlaying ? 'text-[var(--brand-default)] bg-[var(--brand-subtle)]' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]')}
          aria-label={capituloAudio.state.isPlaying ? t('biblia.stopAudio', 'Parar áudio') : t('biblia.playAudio', 'Ouvir capítulo')}
        >
          {capituloAudio.state.isLoading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin block" /> : capituloAudio.state.isPlaying ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>
        <TranslationDropdown open={ui.tradOpen} onToggle={() => { ui.setTradOpen(!ui.tradOpen); ui.setToolsOpen(false); }} onClose={() => ui.setTradOpen(false)} selectedTrads={nav.selectedTrads} onToggleTrad={nav.toggleTrad} viewMode={nav.viewMode} onViewModeChange={nav.setViewMode} />
        <div className="hidden md:block">
          <ToolsDropdown open={ui.toolsOpen} onToggle={() => { ui.setToolsOpen(!ui.toolsOpen); ui.setTradOpen(false); }} onClose={() => ui.setToolsOpen(false)} bookName={nav.livro.nome} chapter={nav.capituloIdx + 1} data={nav.data} hasDramatica={!!passagemDramatica}
            onNotas={() => { if (!ui.mostrarNotas && !verse.notaAtiva) { verse.setNotaAtiva(verse.criarNota(`${nav.livro.nome} ${nav.capituloIdx + 1}`)); } ui.setMostrarNotas(!ui.mostrarNotas); ui.setToolsOpen(false); }}
            onExportPdf={() => { ui.setToolsOpen(false); ui.setExportOpen(true); }} onPlanoLeitura={() => { ui.setShowPlan(!ui.showPlan); ui.setToolsOpen(false); }}
            onNarracaoDramatica={() => { ui.setMostrarNarracao(true); ui.setToolsOpen(false); }} onNarrarCapitulo={() => { capituloAudio.stop(); ui.setMostrarNarracaoCapitulo(true); ui.setToolsOpen(false); }}
            onConfiguracoes={() => { ui.setShowSettings(!ui.showSettings); ui.setToolsOpen(false); }} />
        </div>
        <div className="md:hidden relative shrink-0">
          <button ref={mobileMenuBtnRef} onClick={() => {
            if (!mobileToolbarMenuOpen && mobileMenuBtnRef.current) {
              const rect = mobileMenuBtnRef.current.getBoundingClientRect();
              setMobileMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
            }
            setMobileToolbarMenuOpen(!mobileToolbarMenuOpen);
          }} className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] active:scale-95 transition-transform" aria-label={t('biblia.moreOptions')}><MoreVertical className="w-4 h-4" /></button>
          {mobileToolbarMenuOpen && typeof document !== 'undefined' && createPortal(
            <>
              <div className="fixed inset-0 z-[70]" onClick={() => setMobileToolbarMenuOpen(false)} aria-hidden="true" />
              <div className="fixed z-[80] w-56 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] shadow-xl py-1 animate-scale-in origin-top-right" style={{ top: mobileMenuPos.top, right: mobileMenuPos.right }}>
                <button onClick={() => { ui.setModoExibicao(ui.modoExibicao === 'paragrafo' ? 'versiculo' : 'paragrafo'); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors">{ui.modoExibicao === 'paragrafo' ? <Rows3 className="w-4 h-4 text-[var(--content-muted)]" /> : <AlignLeft className="w-4 h-4 text-[var(--content-muted)]" />}{ui.modoExibicao === 'paragrafo' ? 'Ver versículo a versículo' : 'Ver como página'}</button>
                <button onClick={() => { ui.setShowInterlinear(!ui.showInterlinear); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><span className="font-hebrew text-sm text-[var(--brand-default)]">א</span>Interlinear</button>
                <button onClick={() => { onShowDownloadManager(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><HardDrive className="w-4 h-4 text-[var(--content-muted)]" />{t('biblia.offlineVersions')}</button>
                <button onClick={() => { if (!ui.mostrarNotas && !verse.notaAtiva) { verse.setNotaAtiva(verse.criarNota(`${nav.livro.nome} ${nav.capituloIdx + 1}`)); } ui.setMostrarNotas(!ui.mostrarNotas); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><FileText className="w-4 h-4 text-[var(--content-muted)]" />Notas</button>
                <button onClick={() => { ui.setExportOpen(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Download className="w-4 h-4 text-[var(--content-muted)]" />Exportar PDF</button>
                <button onClick={() => { ui.setShowSettings(!ui.showSettings); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Settings className="w-4 h-4 text-[var(--content-muted)]" />Configurações</button>
                <a href={guiaHref} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Compass className="w-4 h-4 text-[var(--content-muted)]" />Guia da passagem</a>
                <div className="h-px bg-[var(--border)]/40 my-1" />
                <button onClick={() => { ui.setMostrarApresentacao(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--brand-default)] hover:bg-[var(--brand-subtle)] transition-colors"><Sparkles className="w-4 h-4" />{t('biblia.present')}</button>
                <button onClick={() => { ui.setImmersiveMode(true); setMobileToolbarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"><Maximize2 className="w-4 h-4 text-[var(--content-muted)]" />Modo imersivo</button>
              </div>
            </>,
            document.body
          )}
        </div>
      </div>

      <div className="px-3 sm:px-4 pb-2 flex items-center gap-2">
        <ReadingModeBar mode={readingMode} onModeChange={handleReadingModeChange} className="flex-1 sm:flex-none" />
        <Link
          href={guiaHref}
          className="touch-target p-1.5 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--brand-default)] shrink-0"
          title="Guia da passagem"
          aria-label="Abrir guia da passagem"
        >
          <Compass className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={() => {
            const next = toggleChapterBookmark(nav.livro.abreviacao, nav.capituloIdx + 1);
            setCapituloMarcado(next);
          }}
          className={cn(
            'touch-target p-1.5 rounded-lg shrink-0',
            capituloMarcado
              ? 'text-[var(--brand-default)] bg-[var(--brand-subtle)]'
              : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
          )}
          title={capituloMarcado ? 'Remover marcador deste capítulo' : 'Marcar capítulo'}
          aria-pressed={capituloMarcado}
          aria-label={capituloMarcado ? 'Remover marcador deste capítulo' : 'Marcar capítulo'}
        >
          <Bookmark className={cn('w-4 h-4', capituloMarcado && 'fill-current')} />
        </button>
        <div className="flex-1 hidden sm:block" />
        <div className="flex items-center gap-0.5 shrink-0">
          <button type="button" onClick={() => bumpFont(-1)} className="w-8 h-8 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] flex items-center justify-center" aria-label="Diminuir fonte">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] tabular-nums text-[var(--content-muted)] w-6 text-center">{ui.fontSize}</span>
          <button type="button" onClick={() => bumpFont(1)} className="w-8 h-8 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] flex items-center justify-center" aria-label="Aumentar fonte">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => ui.setModoExibicao(ui.modoExibicao === 'paragrafo' ? 'versiculo' : 'paragrafo')}
          className={cn(
            'inline-flex items-center gap-1 px-2 h-8 rounded-lg text-[11px] font-semibold transition-colors',
            ui.modoExibicao === 'paragrafo'
              ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
              : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
          )}
          title={ui.modoExibicao === 'paragrafo' ? 'Ver versículo a versículo' : 'Ver como texto contínuo'}
          aria-pressed={ui.modoExibicao === 'paragrafo'}
        >
          {ui.modoExibicao === 'paragrafo' ? <AlignLeft className="w-3.5 h-3.5" /> : <Rows3 className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{ui.modoExibicao === 'paragrafo' ? 'Página' : 'Versos'}</span>
        </button>
        <div className="hidden lg:flex items-center gap-1">
          <button onClick={() => ui.setShowInterlinear(!ui.showInterlinear)} className={cn('px-2 h-8 rounded-lg text-[11px] font-semibold', ui.showInterlinear ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]')} aria-pressed={ui.showInterlinear}>
            <span className="font-hebrew mr-1">א</span>Interlinear
          </button>
          <button onClick={() => ui.setMostrarApresentacao(true)} className="px-2 h-8 rounded-lg text-[11px] font-semibold text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]" aria-label={t('biblia.present')}>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => ui.setImmersiveMode(true)} className="px-2 h-8 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]" title="Modo imersivo">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onShowHotkeys} className="px-2 h-8 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]" aria-label="Atalhos">
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <SettingsPanel open={ui.showSettings} fontSize={ui.fontSize} onFontSizeChange={ui.setFontSize} showDiff={ui.showDiff} onToggleDiff={() => ui.setShowDiff(!ui.showDiff)} showComparison={nav.viewMode === 'comparison' && nav.data.length >= 2} fontFamily={ui.fontFamily} onFontFamilyChange={ui.setFontFamily} lineSpacing={ui.lineSpacing} onLineSpacingChange={ui.setLineSpacing} modoExibicao={ui.modoExibicao} onModoExibicaoChange={ui.setModoExibicao} ocultarNumeros={ui.ocultarNumeros} onOcultarNumerosChange={ui.setOcultarNumeros} />
    </div>
  );
}
