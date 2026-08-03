'use client';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChapterHeader } from './ChapterHeader';
import { VerseListItem } from './VerseListItem';
import { ProgressBar } from './ProgressBar';
import { ComparisonTable } from './ComparisonTable';
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

const InterlinearView = dynamic(() => import('@/components/InterlinearView').then(m => ({ default: m.InterlinearView })), { ssr: false });
const PainelEstudosCapitulo = dynamic(() => import('./PainelEstudosCapitulo'));
const PainelEstudosInline = dynamic(() => import('@/components/PainelEstudosInline'));

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
  capituloAudio: { state: { isPlaying: boolean; currentVerseIndex: number }; stop: () => void };
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

  const isModoLeitura = ui.modoLeitura === 'foco';
  const isModoEstudo = ui.modoLeitura === 'estudo';

  return (
    <div ref={nav.mainRef} className="flex-1 overflow-y-auto" {...swipeHandlers}>
      <div className="bible-reading-column px-4 sm:px-6 py-6 sm:py-10 pb-24 md:pb-10" style={{ transform: `translateX(${swipeOffset}px)`, transition: swipeOffset === 0 ? 'transform 0.3s ease' : 'none' }}>
        {ui.showPlan && <ReadingPlanBanner />}
        {nav.loading && !nav.temDados ? (
          <div className="space-y-4 chapter-enter"><div className="skeleton skeleton-title w-48 mx-auto animate-pulse" /><div className="ornament w-20 mx-auto mb-8 opacity-30" />
            {Array.from({ length: 10 }).map((_, i) => (<div key={i} className="flex gap-3 items-center" style={{ animationDelay: `${i * 50}ms` }}><div className="skeleton skeleton-text w-10 h-10 shrink-0 rounded-lg" /><div className="skeleton skeleton-text flex-1 rounded" style={{ width: `${[75, 85, 65, 90, 70, 80, 60, 95, 72, 88][i]}%` }} /></div>))}
          </div>
        ) : nav.offlineUnavailable ? (
          <div className="text-center py-20"><WifiOff className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} /><p className="text-lg text-[var(--content-muted)]">{t('biblia.chapterOffline')}</p><p className="text-sm text-[var(--content-muted)] mt-2">{t('biblia.connectOrDownload')}</p></div>
        ) : nav.temDados ? (
            <div role="article" aria-label={`${nav.livro.nome} capítulo ${nav.capituloIdx + 1}`} className={cn(isModoLeitura && 'reading-mode-leitura', isModoEstudo && 'reading-mode-estudo')}>
            {nav.loading && nav.temDados && (<div className="fixed top-0 left-0 right-0 z-20 h-0.5 bg-[var(--brand-default)]/20"><div className="h-full bg-[var(--brand-default)] animate-loading-bar" /></div>)}
            <ChapterHeader livroNome={nav.livro.nome} livroAbreviacao={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} totalCapitulos={nav.livro.totalCapitulos} totalVersiculos={nav.data[0]?.versiculos?.length ?? 0} />
            {nav.estudoCapitulo && (
              <div className={cn("mb-6 rounded-xl border border-[var(--brand-default)]/20 bg-[var(--brand-subtle)]/50 transition-all", ui.estudoCapituloAberto ? "p-4" : "p-3")}>
                <button onClick={() => ui.setEstudoCapituloAberto(o => !o)} className="w-full flex items-center gap-2.5 text-left group" aria-expanded={ui.estudoCapituloAberto}>
                  <div className="w-8 h-8 rounded-lg bg-[var(--brand-default)]/10 flex items-center justify-center shrink-0"><BookOpen className="w-4 h-4 text-[var(--brand-default)]" /></div>
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
            {swipeProgress > 0 && (
              <div className="fixed top-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ [canGoPrev ? 'left' : 'right']: '8px', opacity: swipeProgress }}>
                <div className="w-10 h-10 rounded-full bg-[var(--brand-default)]/20 flex items-center justify-center backdrop-blur-sm">
                  {canGoPrev ? <ChevronLeft className="w-5 h-5 text-[var(--brand-default)]" /> : <ChevronRight className="w-5 h-5 text-[var(--brand-default)]" />}
                </div>
              </div>
            )}
            {ui.showInterlinear && nav.data[0] && (<div className="mb-8"><div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/40"><span className="font-hebrew text-lg text-[var(--brand-default)]">א</span><span className="text-sm font-semibold text-[var(--content-primary)]">{t('biblia.interlinearView')}</span></div><InterlinearView versiculos={nav.data[0].versiculos} livro={nav.livro.abreviacao} capitulo={nav.capituloIdx + 1} traducao={nav.data[0].traducao} /></div>)}
            {(ui.modoLeitura === 'foco' || ui.modoLeitura === 'estudo') && nav.data.map((item) => (<div key={item.traducao} className="mb-6">
              {nav.selectedTrads.length > 1 && (<div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>{ui.modoLeitura === 'foco' && <span className="text-xs text-[var(--content-muted)]">{nomeMap[item.traducao]}</span>}</div>)}
              <div className="space-y-0">{item.versiculos.map((v) => {
                const isSelected = verse.versiculoSelecionado?.versiculo === v.numero && verse.versiculoSelecionado?.traducao === item.traducao;
                const isPlaying = audio.isVersePlaying(v.numero);
                const isCurrentAudioVerse = capituloAudio.state.isPlaying && capituloAudio.state.currentVerseIndex === v.numero - 1;
                const fav = isFavorito(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero, item.traducao);
                const estudoAbertoNeste = verse.estudoAberto === v.numero && item.traducao === nav.data[0]?.traducao;
                return (
                  <div key={`${item.traducao}-${v.numero}`} className="bible-verse-spacer">
                    <VerseListItem numero={v.numero} texto={v.texto} livroAbreviacao={nav.livro.abreviacao} livroNome={nav.livro.nome} capitulo={nav.capituloIdx + 1} traducao={item.traducao} fontSize={ui.fontSize}
                      isSelected={isSelected} isPlaying={isPlaying} isHighlighted={ui.modoLeitura === 'foco' && ui.highlightedVerse === v.numero} isFocused={ui.focusedVerse === v.numero} isFavorito={fav} copiedVerse={verse.copiedVerse}
                      audioNatural={audioNatural} audio={audio} flashcards={flashcards} estudoAberto={verse.estudoAberto === v.numero}
                      isCurrentAudioVerse={isCurrentAudioVerse} hasResources={verseResources.hasResources(nav.livro.abreviacao, nav.capituloIdx + 1, v.numero)}
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
            {ui.modoLeitura === 'comparacao' && nav.viewMode === 'parallel' && (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">{nav.data.map((item) => (
              <div key={item.traducao} className="border border-[var(--border)]/40 rounded-xl p-3 sm:p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/30"><div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} /><span className="text-sm font-semibold">{labelMap[item.traducao]}</span></div>
                {item.versiculos.map(v => (<p key={v.numero} className="mb-2 bible-reading-text font-serif-body" style={{ fontSize: `${Math.max(ui.fontSize - 2, 14)}px` }}><span className="bible-verse-number">{v.numero}</span>{v.texto}</p>))}
              </div>))}</div>)}
            {ui.modoLeitura === 'comparacao' && nav.viewMode === 'comparison' && nav.data.length >= 2 && (<ComparisonTable data={nav.data} fontSize={ui.fontSize} showDiff={ui.showDiff} highlightedVerse={ui.highlightedVerse} onHighlight={ui.setHighlightedVerse} maxVersiculos={nav.maxVersiculos} tradBadgeColors={tradBadgeColors} labelMap={labelMap} />)}
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
  );
}
