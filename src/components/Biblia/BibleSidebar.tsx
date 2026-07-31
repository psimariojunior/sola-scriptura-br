'use client';

import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { UseBibliaNavigationReturn } from '@/hooks/biblia/useBibliaNavigation';
import type { UseBibliaUIReturn } from '@/hooks/biblia/useBibliaUI';
import type { UseBibliaPanelsReturn } from '@/hooks/biblia/useBibliaPanels';
import type { UseBibliaVerseReturn } from '@/hooks/biblia/useBibliaVerse';
import dynamic from 'next/dynamic';

const SidePanel = dynamic(() => import('./SidePanel').then(m => ({ default: m.SidePanel })), { ssr: false });

interface BibleSidebarProps {
  nav: Pick<UseBibliaNavigationReturn, 'livroIdx' | 'searchQuery' | 'setSearchQuery' | 'livrosFiltrados' | 'livro' | 'capituloIdx' | 'data'>;
  ui: Pick<UseBibliaUIReturn, 'sidebarOpen'>;
  panels: UseBibliaPanelsReturn;
  verse: Pick<UseBibliaVerseReturn, 'versiculoSelecionado' | 'setVersiculoSelecionado' | 'comentarioVersiculo'>;
  handleGoToBook: (idx: number) => void;
}

export function BibleSidebar({ nav, ui, panels, verse, handleGoToBook }: BibleSidebarProps) {
  const { t } = useTranslation();

  return (
    <>
      {ui.sidebarOpen && (
        <aside className="sidebar-enter hidden lg:block w-64 border-r border-[var(--border)] bg-[var(--surface-raised)] overflow-y-auto shrink-0">
          <div className="p-4 h-full flex flex-col">
            <div className="relative mb-3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" /><input type="text" placeholder={t('biblia.searchBook')} value={nav.searchQuery} onChange={e => nav.setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--surface-sunken)] border border-[var(--border)]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 transition-all duration-200" /></div>
            <div className="flex-1 overflow-y-auto space-y-0.5">{nav.livrosFiltrados.map((l) => { const idx = TODOS_LIVROS.indexOf(l); return (<button key={l.abreviacao} onClick={() => handleGoToBook(idx)} className={cn('w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 group', idx === nav.livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-semibold' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]')}><span className="truncate">{l.nome}</span><span className="ml-auto text-[10px] opacity-0 group-hover:opacity-50 transition-opacity tabular-nums">{l.totalCapitulos}c</span></button>); })}</div>
          </div>
        </aside>
      )}
      {panels.sidePanelOpen && (
        <>
          <div className="hidden max-lg:block fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" onClick={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); verse.setVersiculoSelecionado(null); }} />
          <ErrorBoundary fallback={<div className="shrink-0 w-full sm:w-[340px] md:w-[380px] lg:w-[420px] border-l border-[var(--border)] bg-[var(--surface-raised)] flex items-center justify-center p-8"><p className="text-sm text-[var(--content-muted)]">{t('biblia.errorLoading')}</p><button onClick={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); }} className="text-xs text-[var(--brand-default)] underline">{t('biblia.close')}</button></div>}>
            <SidePanel open={panels.sidePanelOpen} width={panels.sidePanelWidth} onWidthChange={panels.setSidePanelWidth} activeTab={panels.sidePanelTab} onActiveTabChange={(tab) => { panels.setSidePanelTab(tab); if (!tab) panels.setSidePanelWidth('collapsed'); }}
              livro={nav.livro.nome} livroNome={nav.livro.nome} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} versiculo={verse.comentarioVersiculo ?? verse.versiculoSelecionado?.versiculo}
              onClose={() => { panels.setSidePanelTab(null); panels.setSidePanelWidth('collapsed'); verse.setVersiculoSelecionado(null); }} versiculoTexto={verse.versiculoSelecionado?.texto} versiculoTraducao={verse.versiculoSelecionado?.traducao} />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}
