'use client';

import { useState, useEffect, useCallback, useMemo, useRef, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { TODOS_LIVROS, traducoes, carregarTraducao, ABREV_PARA_MIDVASH, livroPorAbreviacao } from '@/data/biblia';
import type { CapituloComparado } from '@/data/biblia';
import {
  BookOpen, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Search, Sparkles, Play, Mic, Volume2, ListFilter, WifiOff, Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEstudos } from '@/components/EstudosProvider';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import { useAudioCapitulo } from '@/hooks/useAudioCapitulo';
import ReadingPlanBanner from '@/components/ReadingPlanBanner';
import { useFlashcards } from '@/hooks/useFlashcards';
import { getMarcador } from '@/lib/marcadores';
import { isOnline, cacheChapter, getCachedChapter, getCachedChapterDB } from '@/lib/offline';
import { recordReading, getStats } from '@/lib/estatisticas';
import OfflineBanner from '@/components/OfflineBanner';
const PainelDoVersiculo = dynamic(() => import('@/components/PainelDoVersiculo'), {
  ssr: false,
  loading: () => (
    <div className="relative overflow-hidden h-64 bg-[var(--surface-sunken)] rounded-xl">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[var(--surface-raised)] rounded w-1/3" />
        <div className="h-3 bg-[var(--surface-raised)] rounded w-full" />
        <div className="h-3 bg-[var(--surface-raised)] rounded w-5/6" />
        <div className="h-3 bg-[var(--surface-raised)] rounded w-2/3" />
      </div>
    </div>
  ),
});
import { useNotas } from '@/hooks/useNotas';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { cn } from '@/lib/utils';
import { ChapterHeader } from '@/components/Biblia/ChapterHeader';
import { ModoLeitura, type ModoLeituraValue } from '@/components/Biblia/ModoLeitura';
import { VerseCard } from '@/components/Biblia/VerseCard';
import { SidePanel, type SidePanelWidth } from '@/components/Biblia/SidePanel';
import { MobileActionBar } from '@/components/Biblia/MobileActionBar';
import { ProgressBar } from '@/components/Biblia/ProgressBar';
import { ComparisonTable } from '@/components/Biblia/ComparisonTable';
import { QuickSearchModal } from '@/components/Biblia/QuickSearchModal';
import { AnnotationModal } from '@/components/Biblia/AnnotationModal';
import { MobileBookMenu } from '@/components/Biblia/MobileBookMenu';
import { NotesPanelSection } from '@/components/Biblia/NotesPanelSection';
import { AudioPlayers } from '@/components/Biblia/AudioPlayers';
import { TranslationDropdown, TRAD_IDS as TRAD_IDS_IMPORT, labelMap as labelMapImport, nomeMap as nomeMapImport, tradBadgeColors as tradBadgeColorsImport } from '@/components/Biblia/TranslationDropdown';
import { ToolsDropdown } from '@/components/Biblia/ToolsDropdown';
import { ChapterGrid } from '@/components/Biblia/ChapterGrid';
import { obterEstudoCapitulo } from '@/lib/estudosLoader';
import Paywall from '@/components/Paywall';
import { authService } from '@/lib/auth';

const ExportModal = dynamic(() => import('@/components/Biblia/ExportModal').then(m => ({ default: m.ExportModal })), { ssr: false });
const ApresentacaoModal = dynamic(() => import('@/components/Apresentacao/ApresentacaoModal'), { ssr: false });
const PainelQualidadeAudio = dynamic(() => import('@/components/PainelQualidadeAudio').then(m => ({ default: m.PainelQualidadeAudio })), { ssr: false });
const ShareVerseModal = dynamic(() => import('@/components/Biblia/ShareVerseModal').then(m => ({ default: m.ShareVerseModal })), { ssr: false });
const SettingsPanel = dynamic(() => import('@/components/Biblia/SettingsPanel').then(m => ({ default: m.SettingsPanel })), { ssr: false });
const PainelEstudosCapitulo = lazy(() => import('@/components/Biblia/PainelEstudosCapitulo'));
const InterlinearView = dynamic(() => import('@/components/InterlinearView').then(m => ({ default: m.InterlinearView })), { ssr: false });

const TRAD_IDS = TRAD_IDS_IMPORT;
const labelMap = labelMapImport;
const nomeMap = nomeMapImport;
const tradBadgeColors = tradBadgeColorsImport;

const NarradorSelector = lazy(() => import('@/components/NarradorSelector'));
const NarracaoDramaticaLazy = lazy(() => import('@/components/NarracaoDramatica'));
import type { CenaDramatica, PersonagemVoz } from '@/components/NarracaoDramatica';

function PanelFallback() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0s]" />
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

type ViewMode = 'single' | 'parallel' | 'comparison';

const TRADS_LOCAIS = new Set(['arc', 'kjv', 'web', 'nvi', 'ara', 'acf', 'nvt', 'kja', 'aa', 'nbv']);
const cacheApi = new Map<string, string[]>();

const MIDVASH_API = 'https://api.midvash.com/v1';

async function fetchFromMidvash(trad: string, livro: string, cap: number): Promise<string[]> {
  const cacheKey = `${trad}:${livro}:${cap}`;
  if (cacheApi.has(cacheKey)) return cacheApi.get(cacheKey)!;
  const slug = ABREV_PARA_MIDVASH[livro];
  if (!slug) return [];
  try {
    const res = await fetch(`${MIDVASH_API}/${trad}/${slug}/${cap}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    const verses: string[] = [];
    const raw = json?.data?.verses;
    if (Array.isArray(raw)) {
      for (const v of raw) {
        const text = typeof v === 'string' ? v : v?.text;
        if (text?.trim()) verses.push(text.trim());
      }
    }
    if (verses.length > 0) cacheApi.set(cacheKey, verses);
    return verses;
  } catch { return []; }
}

async function loadTranslation(trad: string, livro: string, cap: number): Promise<CapituloComparado | null> {
  try {
    if (TRADS_LOCAIS.has(trad)) {
      const data = await carregarTraducao(trad);
      const arr = data[livro]?.[cap];
      if (!arr || arr.length === 0) return null;
      return { traducao: trad, versiculos: arr.map((t, i) => ({ numero: i + 1, texto: t })) };
    } else {
      const verses = await fetchFromMidvash(trad, livro, cap);
      if (verses.length === 0) return null;
      return { traducao: trad, versiculos: verses.map((t, i) => ({ numero: i + 1, texto: t })) };
    }
  } catch { return null; }
}

async function carregarMulti(livro: string, cap: number, trads: string[]): Promise<CapituloComparado[]> {
  const promises = trads.map(t => loadTranslation(t, livro, cap));
  const results = await Promise.all(promises);
  return results.filter((r): r is CapituloComparado => r !== null);
}

const PASSAGENS_DRAMATICAS: Record<string, { titulo: string; subtitulo: string; cenas: CenaDramatica[]; personagens: PersonagemVoz[] }> = {
  'gn-1': { titulo: 'A Criação do Mundo', subtitulo: 'Gênesis 1', cenas: [], personagens: [] },
  'sl-23': { titulo: 'O Senhor é o Meu Pastor', subtitulo: 'Salmos 23', cenas: [], personagens: [] },
  'jo-1': { titulo: 'O Verbo se Fez Carne', subtitulo: 'João 1:1-14', cenas: [], personagens: [] },
  'mt-27': { titulo: 'A Crucificação de Jesus', subtitulo: 'Mateus 27', cenas: [], personagens: [] },
};

export default function BibliaPage() {
  const [paywallAprofundarAberto, setPaywallAprofundarAberto] = useState(false);
  const [livroIdx, setLivroIdx] = useState(0);
  const [capituloIdx, setCapituloIdx] = useState(0);
  const [selectedTrads, setSelectedTrads] = useState<string[]>(['arc']);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [data, setData] = useState<CapituloComparado[]>([]);
  const [loading, setLoading] = useState(false);
  const [offlineUnavailable, setOfflineUnavailable] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return 17;
    return 18;
  });
  const [chapterGridOpen, setChapterGridOpen] = useState(false);
  const [studyPanel, setStudyPanel] = useState<'notas' | 'strong' | 'comentarios' | null>(null);
  const [anotandoVersiculo, setAnotandoVersiculo] = useState<string | null>(null);
  const [anotacaoTexto, setAnotacaoTexto] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState(true);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const [comentarioVersiculo, setComentarioVersiculo] = useState<number | null>(null);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [chapterDirection, setChapterDirection] = useState<'next' | 'prev'>('next');
  const [estudoAberto, setEstudoAberto] = useState<number | null>(null);
  const [showPlan, setShowPlan] = useState(false);
  const [modoLeitura, setModoLeitura] = useState<ModoLeituraValue>('foco');
  const [sidePanelWidth, setSidePanelWidth] = useState<SidePanelWidth>('collapsed');
  const [sidePanelTab, setSidePanelTab] = useState<'comentarios' | 'strong' | 'notas' | 'estudos' | 'contexto' | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const { isFavorito, refresh } = useEstudos();
  const audio = useVerseAudio();
  const audioNatural = useAudioNatural();
  const flashcards = useFlashcards();
  const [statsData, setStatsData] = useState<ReturnType<typeof getStats> | null>(null);
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<{livro: string, livroNome: string, livroAbreviacao: string, capitulo: number, versiculo: number, traducao: string, texto: string} | null>(null);
  const [mostrarNotas, setMostrarNotas] = useState(false);
  const [notaAtiva, setNotaAtiva] = useState<import('@/components/NotaEditor').Nota | null>(null);
  const { notas, criarNota, salvarNota: salvarNotaHook, excluirNota } = useNotas();
  const [mostrarNarracao, setMostrarNarracao] = useState(false);
  const [mostrarNarracaoCapitulo, setMostrarNarracaoCapitulo] = useState(false);
  const [mostrarApresentacao, setMostrarApresentacao] = useState(false);
  const [mostrarQualidadeAudio, setMostrarQualidadeAudio] = useState(false);
  const [tradOpen, setTradOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [estudoCapituloAberto, setEstudoCapituloAberto] = useState(false);
  const [showInterlinear, setShowInterlinear] = useState(false);
  const NarrationPanel = lazy(() => import('@/components/Biblia/NarrationPanel').then(m => ({ default: m.NarrationPanel })));

  const livro = TODOS_LIVROS[livroIdx];
  const chaveDramatica = `${livro.abreviacao}-${capituloIdx + 1}`;
  const passagemDramatica = PASSAGENS_DRAMATICAS[chaveDramatica];

  const capituloAudio = useAudioCapitulo(
    livro.abreviacao,
    capituloIdx + 1,
    data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []
  );

  const loadChapter = useCallback(async () => {
    setData([]);
    setLoading(true);
    const livroAbrev = livro.abreviacao;
    const cap = capituloIdx + 1;
    if (!isOnline()) {
      const cached = await Promise.all(
        selectedTrads.map(async (trad) => {
          const verses = getCachedChapter(livroAbrev, cap, trad) ?? (await getCachedChapterDB(livroAbrev, cap, trad));
          if (!verses || verses.length === 0) return null;
          return { traducao: trad, versiculos: verses.map((t, i) => ({ numero: i + 1, texto: t })) };
        })
      );
      const filtered = cached.filter(Boolean) as CapituloComparado[];
      if (filtered.length > 0) { setData(filtered); setOfflineUnavailable(false); setLoading(false); return; }
      setData([]);
      setOfflineUnavailable(true);
      setLoading(false);
      return;
    }
    setOfflineUnavailable(false);
    const result = await carregarMulti(livroAbrev, cap, selectedTrads);
    setData(result);
    for (const item of result) {
      cacheChapter(livroAbrev, cap, item.traducao, item.versiculos.map(v => v.texto));
    }
    setLoading(false);
    recordReading(livroAbrev, cap);
    setStatsData(getStats());
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [livro.abreviacao, capituloIdx, selectedTrads]);

  useEffect(() => { loadChapter(); }, [loadChapter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const livroParam = params.get('livro');
    const capituloParam = params.get('capitulo') || params.get('cap');
    const versiculoParam = params.get('versiculo') || params.get('v');
    const tradsParam = params.get('trads');
    if (livroParam) {
      const idx = TODOS_LIVROS.findIndex((l) => l.abreviacao.toLowerCase() === livroParam.toLowerCase());
      if (idx >= 0) { setLivroIdx(idx); if (capituloParam) setCapituloIdx(Math.max(0, Number(capituloParam) - 1)); if (versiculoParam) setHighlightedVerse(Math.max(1, Number(versiculoParam))); }
    }
    if (tradsParam) {
      const t = tradsParam.split(',').filter((x) => (TRAD_IDS as readonly string[]).includes(x));
      if (t.length > 0) setSelectedTrads(t);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('livro', livro.abreviacao);
    params.set('capitulo', String(capituloIdx + 1));
    params.set('trads', selectedTrads.join(','));
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [livro.abreviacao, capituloIdx, selectedTrads]);

  const [recentSearches, setRecentSearches] = useState<Array<{query: string; livro: string; nome: string; cap: number; versiculo: number}>>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ssb_recent_searches');
      if (raw) setRecentSearches(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setQuickSearchOpen(p => !p); return; }
      if (quickSearchOpen && e.key === 'Escape') { setQuickSearchOpen(false); return; }
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
      if (e.key === '/') { e.preventDefault(); setQuickSearchOpen(true); return; }
      if (e.key === 'ArrowLeft' && capituloIdx > 0) { e.preventDefault(); setChapterDirection('prev'); setCapituloIdx(p => Math.max(0, p - 1)); }
      else if (e.key === 'ArrowRight' && livro && capituloIdx < livro.totalCapitulos - 1) { e.preventDefault(); setChapterDirection('next'); setCapituloIdx(p => p + 1); }
       else if (e.key === 'Escape') { setSidebarOpen(false); setMobileMenu(false); setChapterGridOpen(false); setMostrarNarracao(false); setMostrarNarracaoCapitulo(false); setVersiculoSelecionado(null); setTradOpen(false); 
 setToolsOpen(false); setExportOpen(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [capituloIdx, livro, quickSearchOpen]);

const toggleTrad = (id: string) => {
  setSelectedTrads(prev => {
    if (viewMode === 'single') {
      return [id];
    }
    if (prev.length === 1 && prev[0] === id) return prev;
    if (prev.includes(id)) {
      const next = prev.filter(t => t !== id);
      if (next.length === 1) setViewMode('single');
      return next;
    }
    return [...prev, id].slice(0, viewMode === 'comparison' ? 4 : 2);
  });
};

  const livrosFiltrados = useMemo(() => searchQuery
    ? TODOS_LIVROS.filter(l => l.nome.toLowerCase().includes(searchQuery.toLowerCase()) || l.abreviacao.toLowerCase().includes(searchQuery.toLowerCase()))
    : TODOS_LIVROS, [searchQuery]);

  const temDados = data.length > 0 && data.some(d => d.versiculos.length > 0);
  const maxVersiculos = temDados ? Math.max(...data.map(d => d.versiculos.length)) : 0;

  const estudoCapitulo = useMemo(
    () => obterEstudoCapitulo(livro.abreviacao, capituloIdx + 1),
    [livro.abreviacao, capituloIdx]
  );

  const goToBook = (idx: number, cap?: number) => { setLivroIdx(idx); setCapituloIdx(cap ?? 0); setMobileMenu(false); setChapterGridOpen(false); };

  const changeChapter = (newIdx: number) => {
    const clamped = Math.max(0, Math.min(livro.totalCapitulos - 1, newIdx));
    setChapterDirection(clamped > capituloIdx ? 'next' : 'prev');
    setCapituloIdx(clamped);
  };

  const copyVerse = async (text: string, reference: string) => {
    await navigator.clipboard.writeText(`${reference}\n${text}`);
    setCopiedVerse(reference);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const shareVerse = async (text: string, reference: string) => {
    if (navigator.share) await navigator.share({ title: reference, text: `${reference}\n\n${text}` });
  };

  const handleSelectVerse = (v: { livro: string; livroNome: string; livroAbreviacao: string; cap: number; ver: number; traducao: string; texto: string }) => {
    setVersiculoSelecionado({ ...v, capitulo: v.cap, versiculo: v.ver });
  };

  const handleSelectFromList = (livro: string, cap: number, ver: number, traducao: string, texto: string) => {
    const livroInfo = livroPorAbreviacao.get(livro);
    const livroNome = livroInfo?.nome || livro;
    setVersiculoSelecionado({ livro, livroNome, livroAbreviacao: livro, capitulo: cap, versiculo: ver, traducao, texto });
  };

  useEffect(() => {
    if (modoLeitura === 'comparacao' && selectedTrads.length < 2) {
      const fallbacks = ['nvi', 'ara', 'acf', 'arc', 'kjv'];
      const other = fallbacks.find(t => !selectedTrads.includes(t)) || 'nvi';
      setSelectedTrads(prev => prev.includes(other) ? prev : [...prev, other]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoLeitura]);

  const chapterAnimProps = {
    initial: { opacity: 0, x: chapterDirection === 'next' ? 40 : -40, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: chapterDirection === 'next' ? -40 : 40, filter: 'blur(4px)' },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  const sidePanelOpen = sidePanelWidth !== 'collapsed' && sidePanelTab !== null;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <OfflineBanner />
      <main id="main-content" className="pt-16">
        <div className="px-4 sm:px-6 py-2 bg-[var(--surface-raised)]/80 border-b border-[var(--border)]/40 backdrop-blur-sm">
          <Breadcrumbs
            items={[
              { label: 'Início', href: '/' },
              { label: 'Bíblia' },
            ]}
          />
        </div>

        <div className="flex min-h-[100dvh] md:h-[calc(100vh-7rem-40px)] relative">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ x: -288, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -288, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden lg:block w-64 border-r border-[var(--border)] bg-[var(--surface-raised)] overflow-y-auto shrink-0"
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" />
                    <input type="text" placeholder="Buscar livro..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--surface-sunken)] border border-[var(--border)]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 transition-all duration-200" />
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-0.5">
                    {livrosFiltrados.map((l) => {
                      const idx = TODOS_LIVROS.indexOf(l);
                      return (
                        <button key={l.abreviacao} onClick={() => goToBook(idx)}
                          className={cn(
                            'w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 group',
                            idx === livroIdx
                              ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-semibold'
                              : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]'
                          )}>
                          <span className="truncate">{l.nome}</span>
                          <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-50 transition-opacity tabular-nums">{l.totalCapitulos}c</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="flex-1 flex flex-col min-w-0 relative">
            <div className="border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/95 backdrop-blur-sm sticky top-0 z-20">
              <div className="px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 flex-wrap">
                <button onClick={() => setMobileMenu(true)} className="lg:hidden touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]" aria-label="Abrir menu de livros">
                  <BookOpen className="w-4 h-4" />
                </button>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]" aria-label={sidebarOpen ? 'Fechar barra lateral' : 'Abrir barra lateral'}>
                  <ListFilter className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  <motion.button onClick={() => changeChapter(Math.max(0, capituloIdx - 1))} disabled={capituloIdx === 0}
                    whileTap={{ scale: 0.92 }}
                    className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)]"
                    aria-label="Capítulo anterior">
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <div className="relative">
                    <button
                      onClick={() => setChapterGridOpen(!chapterGridOpen)}
                      className="px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] border border-[var(--border)]/40 min-w-[120px] text-center hover:bg-[var(--surface-raised)] transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-semibold text-[var(--content-primary)]">{livro.nome}</span>
                      <span className="text-[var(--brand-default)] font-bold ml-1.5 tabular-nums">{capituloIdx + 1}</span>
                      <span className="text-[var(--content-muted)] font-normal text-[10px] ml-1">/{livro.totalCapitulos}</span>
                    </button>
                    <ChapterGrid
                      open={chapterGridOpen}
                      onClose={() => setChapterGridOpen(false)}
                      totalCapitulos={livro.totalCapitulos}
                      capituloAtual={capituloIdx}
                      onSelect={(idx) => changeChapter(idx)}
                    />
                  </div>
                  <motion.button onClick={() => changeChapter(Math.min(livro.totalCapitulos - 1, capituloIdx + 1))}
                    disabled={capituloIdx >= livro.totalCapitulos - 1}
                    whileTap={{ scale: 0.92 }}
                    className="touch-target p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)]"
                    aria-label="Próximo capítulo">
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="flex-1" />

                <ModoLeitura
                  value={modoLeitura}
                  onChange={(v) => {
                    setModoLeitura(v);
                    if (v === 'comparacao') setViewMode('parallel');
                    else if (v === 'estudo') {
                      setSidePanelWidth('half');
                      setSidePanelTab('comentarios');
                    } else if (v === 'apresentacao') {
                      setMostrarApresentacao(true);
                    } else {
                      setViewMode('single');
                      setSidePanelWidth('collapsed');
                    }
                  }}
                  size="sm"
                />

                <div className="hidden sm:block w-px h-6 bg-[var(--border)]/60" />

                <button
                  onClick={() => setShowInterlinear(!showInterlinear)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    showInterlinear
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20'
                      : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20'
                  }`}
                  title="Mostrar texto original hebraico/grego"
                >
                  <span className="font-hebrew" style={{ fontSize: '11px' }}>א</span>
                  <span className="hidden sm:inline">Interlinear</span>
                </button>

                <div className="hidden sm:block w-px h-6 bg-[var(--border)]/60" />

                <TranslationDropdown
                  open={tradOpen}
                  onToggle={() => { setTradOpen(!tradOpen); setToolsOpen(false); }}
                  onClose={() => setTradOpen(false)}
                  selectedTrads={selectedTrads}
                  onToggleTrad={toggleTrad}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />

                <div className="hidden md:flex items-center gap-0.5">
                  <motion.button
                    onClick={() => {
                      if (mostrarNarracaoCapitulo) {
                        setMostrarNarracaoCapitulo(false);
                        capituloAudio.stop();
                      }
                      if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) {
                        capituloAudio.stop();
                      } else {
                        capituloAudio.play();
                      }
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                      capituloAudio.state.isPlaying
                        ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20'
                        : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20'
                    )}
                    aria-label={capituloAudio.state.isPlaying ? 'Pausar áudio' : 'Ouvir capítulo'}
                  >
                    {capituloAudio.state.isLoading ? (
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : capituloAudio.state.isPlaying ? (
                      <span className="flex gap-0.5">
                        <span className="w-0.5 h-3 bg-current rounded-full" />
                        <span className="w-0.5 h-3 bg-current rounded-full" />
                      </span>
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <Volume2 className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button
                    onClick={() => setMostrarQualidadeAudio(true)}
                    whileTap={{ scale: 0.96 }}
                    className="p-1.5 rounded-full text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
                    title="Qualidade do áudio"
                    aria-label="Configurar qualidade do áudio"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                <ToolsDropdown
                  open={toolsOpen}
                  onToggle={() => { setToolsOpen(!toolsOpen); setTradOpen(false); }}
                  onClose={() => setToolsOpen(false)}
                  bookName={livro.nome}
                  chapter={capituloIdx + 1}
                  data={data}
                  hasDramatica={!!passagemDramatica}
                  onNotas={() => { if (!mostrarNotas && !notaAtiva) { const nova = criarNota(`${livro.nome} ${capituloIdx + 1}`); setNotaAtiva(nova); } setMostrarNotas(!mostrarNotas); setToolsOpen(false); }}
                  onExportPdf={() => { setToolsOpen(false); setExportOpen(true); }}
                  onPlanoLeitura={() => { setShowPlan(!showPlan); setToolsOpen(false); }}
                  onNarracaoDramatica={() => { setMostrarNarracao(true); setToolsOpen(false); }}
                  onNarrarCapitulo={() => { capituloAudio.stop(); setMostrarNarracaoCapitulo(true); setToolsOpen(false); }}
                  onConfiguracoes={() => { setShowSettings(!showSettings); setToolsOpen(false); }}
                />

                <motion.button
                  onClick={() => setMostrarApresentacao(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[var(--brand-contrast)] bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] shadow-md shadow-[var(--brand-default)]/30 hover:shadow-lg hover:shadow-[var(--brand-default)]/40 transition-shadow"
                  title="Projetar este capítulo em qualquer tela"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Apresentar</span>
                  <span className="hidden md:inline-flex items-center px-1 py-0 rounded text-[8px] font-extrabold bg-white/20">NEW</span>
                </motion.button>
              </div>

              <SettingsPanel
                open={showSettings}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                showDiff={showDiff}
                onToggleDiff={() => setShowDiff(!showDiff)}
                showComparison={viewMode === 'comparison' && data.length >= 2}
              />
            </div>

            <div ref={mainRef} className="flex-1 overflow-y-auto">
              <div className="max-w-[min(900px,100%-2rem)] mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {showPlan && <ReadingPlanBanner />}

                {loading ? (
                  <div className="space-y-4 chapter-enter">
                    <div className="skeleton skeleton-title w-48 mx-auto animate-pulse" />
                    <div className="ornament w-20 mx-auto mb-8 opacity-30" />
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="flex gap-3 items-center" style={{ animationDelay: `${i * 50}ms` }}>
                        <div className="skeleton skeleton-text w-10 h-10 shrink-0 rounded-lg" />
                        <div className="skeleton skeleton-text flex-1 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                      </div>
                    ))}
                  </div>
                ) : offlineUnavailable ? (
                  <div className="text-center py-20">
                    <WifiOff className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} />
                    <p className="text-lg text-[var(--content-muted)]">Capítulo não disponível offline</p>
                    <p className="text-sm text-[var(--content-muted)] mt-2">
                      Este capítulo não foi baixado para leitura offline. Conecte-se à internet ou baixe as traduções em &quot;Gerenciar&quot; no aviso offline.
                    </p>
                  </div>
                ) : temDados ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${livro.abreviacao}-${capituloIdx}`}
                      {...chapterAnimProps}
                      role="article"
                      aria-label={`${livro.nome} capítulo ${capituloIdx + 1}`}
                    >
                      <ChapterHeader
                        livroNome={livro.nome}
                        livroAbreviacao={livro.abreviacao}
                        capitulo={capituloIdx + 1}
                        totalCapitulos={livro.totalCapitulos}
                        totalVersiculos={data[0]?.versiculos?.length ?? 0}
                      />

                      {showInterlinear && data[0] && (
                        <div className="mb-8">
                          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/40">
                            <span className="font-hebrew text-lg text-[var(--brand-default)]">א</span>
                            <span className="text-sm font-semibold text-[var(--content-primary)]">Vista Interlinear</span>
                            <span className="text-xs text-[var(--content-muted)]">Texto original hebraico/grego</span>
                          </div>
                          <InterlinearView
                            versiculos={data[0].versiculos}
                            livro={livro.abreviacao}
                            capitulo={capituloIdx + 1}
                            traducao={data[0].traducao}
                          />
                        </div>
                      )}

                      {(modoLeitura === 'foco' || modoLeitura === 'estudo') && data.map((item) => (
                        <div key={item.traducao} className="mb-6">
                          {selectedTrads.length > 1 && (
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40">
                              <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} />
                              <span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>
                              {modoLeitura === 'foco' && <span className="text-xs text-[var(--content-muted)]">{nomeMap[item.traducao]}</span>}
                            </div>
                          )}
                          <div className={cn('space-y-1', modoLeitura === 'foco' && 'divide-y divide-[var(--brand-default)]/5')}>
                            {item.versiculos.map((v) => {
                              const isSelected = versiculoSelecionado?.versiculo === v.numero && versiculoSelecionado?.traducao === item.traducao;
                              const isPlaying = audio.isVersePlaying(v.numero);
                              const isCurrentAudioVerse = capituloAudio.state.isPlaying && capituloAudio.state.currentVerseIndex === v.numero - 1;
                              const verseKey = `${livro.abreviacao}:${capituloIdx + 1}:${v.numero}:${item.traducao}`;
                              const fav = isFavorito(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                              const marcaMarcador = getMarcador(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                              const corMarca = marcaMarcador?.cor ?? null;

                              return (
                                <VerseCard
                                  key={`${item.traducao}-${v.numero}`}
                                  numero={v.numero}
                                  texto={v.texto}
                                  livroAbreviacao={livro.abreviacao}
                                  livroNome={livro.nome}
                                  capitulo={capituloIdx + 1}
                                  traducao={item.traducao}
                                  fontSize={fontSize}
                                  isSelected={isSelected}
                                  isPlaying={isPlaying}
                                  isHighlighted={modoLeitura === 'foco' && highlightedVerse === v.numero}
                                  isFavorito={fav}
                                  corMarca={corMarca}
                                  temAnotacao={false}
                                  copiedVerse={copiedVerse}
                                  audioNatural={audioNatural}
                                  audio={audio}
                                  flashcards={flashcards}
                                  estudoAberto={estudoAberto === v.numero}
                                  onSelect={() => handleSelectFromList(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao, v.texto)}
                                  onFavoritoChange={refresh}
                                  onAnotar={() => { setAnotandoVersiculo(verseKey); setAnotacaoTexto(''); }}
                                  onStrong={() => { setSidePanelWidth('half'); setSidePanelTab('strong'); }}
                                  onComentarios={() => { setComentarioVersiculo(v.numero); setSidePanelWidth('half'); setSidePanelTab('comentarios'); }}
                                  onToggleEstudo={() => setEstudoAberto(estudoAberto === v.numero ? null : v.numero)}
                                  copyVerse={copyVerse}
                                  verseKey={verseKey}
                                  showTranslationLabel={selectedTrads.length > 1}
                                  tradLabel={labelMap[item.traducao]}
                                  tradBadgeColor={tradBadgeColors[item.traducao]}
                                  isCurrentAudioVerse={isCurrentAudioVerse}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {modoLeitura === 'comparacao' && viewMode === 'parallel' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                          {data.map((item) => (
                            <motion.div
                              key={item.traducao}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="border border-[var(--border)]/40 rounded-xl p-3 sm:p-5 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/30">
                                <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} />
                                <span className="text-sm font-semibold">{labelMap[item.traducao]}</span>
                              </div>
                              {item.versiculos.map(v => (
                                <p key={v.numero} className="mb-2 leading-[1.7] font-serif-body" style={{ fontSize: `${Math.max(fontSize - 2, 14)}px` }}>
                                  <sup className="text-[var(--brand-default)] font-bold text-[10px] mr-1 select-none tabular-nums">{v.numero}</sup>
                                  {v.texto}
                                </p>
                              ))}
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {modoLeitura === 'comparacao' && viewMode === 'comparison' && data.length >= 2 && (
                        <ComparisonTable
                          data={data}
                          fontSize={fontSize}
                          showDiff={showDiff}
                          highlightedVerse={highlightedVerse}
                          onHighlight={setHighlightedVerse}
                          maxVersiculos={maxVersiculos}
                          tradBadgeColors={tradBadgeColors}
                          labelMap={labelMap}
                        />
                      )}

                      {estudoCapitulo && (
                        <div className="mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-[var(--border)]/30">
                          <button
                            onClick={() => setEstudoCapituloAberto(o => !o)}
                            className="w-full flex items-center gap-2 text-left group"
                            aria-expanded={estudoCapituloAberto}
                          >
                            <BookOpen className="w-4 h-4 text-[var(--primary)]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)] group-hover:text-[var(--fg)] transition-colors">
                              Estudo do Capítulo
                            </span>
                            <span className="text-xs text-[var(--primary)] font-medium">{estudoCapitulo.titulo}</span>
                            <div className="flex-1" />
                            {estudoCapituloAberto ? (
                              <ChevronUp className="w-4 h-4 text-[var(--muted-fg)]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[var(--muted-fg)]" />
                            )}
                          </button>

                          <AnimatePresence initial={false}>
                            {estudoCapituloAberto && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="overflow-hidden"
                              >
                                <Suspense fallback={
                                  <div className="mt-4 border-l-2 border-[var(--primary)]/30 pl-4 py-2 flex items-center gap-2">
                                    <div className="flex gap-1">
                                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" />
                                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:0.15s]" />
                                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:0.3s]" />
                                    </div>
                                    <span className="text-xs text-[var(--muted-fg)]">Carregando estudo…</span>
                                  </div>
                                }>
                                  <PainelEstudosCapitulo
                                    livro={livro.abreviacao}
                                    capitulo={capituloIdx + 1}
                                    nomeLivro={livro.nome}
                                  />
                                </Suspense>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-[var(--border)]/30">
                        <motion.button onClick={() => changeChapter(Math.max(0, capituloIdx - 1))} disabled={capituloIdx === 0}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-colors min-h-[44px]"
                          aria-label="Capítulo anterior">
                          <ChevronLeft className="w-4 h-4" /> Anterior
                        </motion.button>
                        <div className="hidden sm:flex flex-col items-center gap-1.5 min-w-[120px]">
                          <span className="text-[10px] text-[var(--content-muted)] font-mono tabular-nums">{capituloIdx + 1} / {livro.totalCapitulos}</span>
                          <ProgressBar value={capituloIdx + 1} total={livro.totalCapitulos} className="w-24" />
                        </div>
                        <motion.button onClick={() => changeChapter(Math.min(livro.totalCapitulos - 1, capituloIdx + 1))}
                          disabled={capituloIdx >= livro.totalCapitulos - 1}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-colors min-h-[44px]"
                          aria-label="Próximo capítulo">
                          Próximo <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-20">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} />
                    <p className="text-lg text-[var(--content-muted)]">Selecione um livro e capítulo</p>
                  </div>
                )}
              </div>

              <NotesPanelSection
              open={mostrarNotas}
              onClose={() => setMostrarNotas(false)}
              notas={notas}
              notaAtiva={notaAtiva}
              onSalvar={(nota) => { setNotaAtiva(nota); salvarNotaHook(nota.id, nota.conteudo); }}
              onExcluir={(id) => { excluirNota(id); setNotaAtiva(null); setMostrarNotas(false); }}
            />
            </div>

            <MobileBookMenu
            open={mobileMenu}
            onClose={() => setMobileMenu(false)}
            livroIdx={livroIdx}
            onSelect={(idx) => { goToBook(idx); setMobileMenu(false); }}
            onSelectChapter={(idx, cap) => { goToBook(idx, cap); setMobileMenu(false); }}
          />
          </div>

          <AnimatePresence>
            {sidePanelOpen && (
              <SidePanel
                open={sidePanelOpen}
                width={sidePanelWidth}
                onWidthChange={setSidePanelWidth}
                activeTab={sidePanelTab}
                onActiveTabChange={(tab) => {
                  setSidePanelTab(tab);
                  if (!tab) setSidePanelWidth('collapsed');
                }}
                livro={livro.nome}
                livroNome={livro.nome}
                livroAbreviacao={livro.abreviacao}
                capitulo={capituloIdx + 1}
                versiculo={comentarioVersiculo ?? versiculoSelecionado?.versiculo}
                onClose={() => { setSidePanelTab(null); setSidePanelWidth('collapsed'); }}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      <MobileActionBar
        selected={versiculoSelecionado}
        onClose={() => setVersiculoSelecionado(null)}
        audioNatural={audioNatural}
        audio={audio}
        flashcards={flashcards}
        isFavorito={versiculoSelecionado ? isFavorito(versiculoSelecionado.livro, versiculoSelecionado.capitulo, versiculoSelecionado.versiculo, versiculoSelecionado.traducao) : false}
        onFavoritoChange={refresh}
        onAnotar={() => {
          if (!versiculoSelecionado) return;
          const m = getMarcador(versiculoSelecionado.livro, versiculoSelecionado.capitulo, versiculoSelecionado.versiculo, versiculoSelecionado.traducao);
          setAnotandoVersiculo(`${versiculoSelecionado.livro}:${versiculoSelecionado.capitulo}:${versiculoSelecionado.versiculo}:${versiculoSelecionado.traducao}`);
          setAnotacaoTexto(m?.cor || '');
          setVersiculoSelecionado(null);
        }}
        onStrong={() => { setSidePanelWidth('half'); setSidePanelTab('strong'); setVersiculoSelecionado(null); }}
        onComentarios={() => {
          if (versiculoSelecionado) {
            setComentarioVersiculo(versiculoSelecionado.versiculo);
            setSidePanelWidth('half');
            setSidePanelTab('comentarios');
          }
          setVersiculoSelecionado(null);
        }}
        onToggleEstudo={() => {
          if (versiculoSelecionado) setEstudoAberto(estudoAberto === versiculoSelecionado.versiculo ? null : versiculoSelecionado.versiculo);
          setVersiculoSelecionado(null);
        }}
        onApresentar={() => { setMostrarApresentacao(true); setVersiculoSelecionado(null); }}
        onCompartilharImagem={() => setShareOpen(true)}
        onAprofundar={() => {
          if (!versiculoSelecionado) return;
          if (!authService.temAcessoTotal()) {
            setPaywallAprofundarAberto(true);
            return;
          }
          const ref = `${versiculoSelecionado.livroNome} ${versiculoSelecionado.capitulo}:${versiculoSelecionado.versiculo}`;
          window.open(`/estudo-ia?ref=${encodeURIComponent(ref)}`, '_blank');
        }}
        copyVerse={copyVerse}
        copiedVerse={copiedVerse}
      />

      <AnimatePresence>
        {versiculoSelecionado && authService.temAcessoTotal() && (
          <motion.a
            href={`/estudo-ia?ref=${encodeURIComponent(`${versiculoSelecionado.livroNome} ${versiculoSelecionado.capitulo}:${versiculoSelecionado.versiculo}`)}`}
            target="_blank"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden lg:flex fixed bottom-6 right-6 z-30 items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/30 hover:shadow-xl transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            Aprofundar com IA
          </motion.a>
        )}
      </AnimatePresence>

      <AudioPlayers
        audioNatural={audioNatural}
        audio={audio}
        data={data}
        livroNome={livro.nome}
        capitulo={capituloIdx + 1}
      />

      <AnnotationModal
        open={anotandoVersiculo !== null}
        verseKey={anotandoVersiculo}
        initialText={anotacaoTexto}
        onClose={() => setAnotandoVersiculo(null)}
        onSave={async (texto) => {
          const { setAnotacao } = await import('@/lib/estudos');
          const parts = anotandoVersiculo!.split(':');
          setAnotacao(parts[0], Number(parts[1]), Number(parts[2]), parts[3], texto || null);
          refresh(); setAnotandoVersiculo(null); setAnotacaoTexto('');
        }}
      />

      <AnimatePresence>
        {quickSearchOpen && (
          <QuickSearchModal
            open={quickSearchOpen}
            onClose={() => setQuickSearchOpen(false)}
            onGoToResult={(r, query) => {
              const idx = TODOS_LIVROS.findIndex(l => l.abreviacao === r.livro);
              if (idx >= 0) {
                const entry = { query, livro: r.livro, nome: r.nome, cap: r.cap, versiculo: r.versiculo || 1 };
                setRecentSearches(prev => {
                  const next = [entry, ...prev.filter(s => s.livro !== r.livro || s.cap !== r.cap)].slice(0, 5);
                  try { localStorage.setItem('ssb_recent_searches', JSON.stringify(next)); } catch {}
                  return next;
                });
                setLivroIdx(idx);
                setCapituloIdx(r.cap - 1);
                setQuickSearchOpen(false);
              }
            }}
            recentSearches={recentSearches}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mostrarNarracao && passagemDramatica && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[var(--bg)]">
            <Suspense fallback={<PanelFallback />}>
              <NarracaoDramaticaLazy
                titulo={passagemDramatica.titulo}
                subtitulo={passagemDramatica.subtitulo}
                cenas={passagemDramatica.cenas}
                personagens={passagemDramatica.personagens}
                onFechar={() => setMostrarNarracao(false)}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mostrarNarracaoCapitulo && (
          <Suspense fallback={<PanelFallback />}>
            <NarrationPanel
              open={mostrarNarracaoCapitulo}
              onClose={() => { setMostrarNarracaoCapitulo(false); capituloAudio.stop(); }}
              livroAbreviacao={livro.abreviacao}
              capitulo={capituloIdx + 1}
              traducao={selectedTrads[0] || 'arc'}
              livroNome={livro.nome}
              versiculos={data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <PainelDoVersiculo
        livro={versiculoSelecionado?.livroAbreviacao ?? ''}
        capitulo={versiculoSelecionado?.capitulo ?? 1}
        versiculo={versiculoSelecionado?.versiculo ?? 1}
        aberto={versiculoSelecionado !== null}
        onFechar={() => setVersiculoSelecionado(null)}
      />

      <ApresentacaoModal
        open={mostrarApresentacao}
        onClose={() => setMostrarApresentacao(false)}
        livro={livro.abreviacao}
        capitulo={capituloIdx + 1}
        versiculo={1}
        translation={selectedTrads[0] || 'arc'}
      />

      <PainelQualidadeAudio
        open={mostrarQualidadeAudio}
        onOpenChange={setMostrarQualidadeAudio}
      />

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        bookName={livro.nome}
        chapter={capituloIdx + 1}
        data={data}
      />

      <ShareVerseModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        verse={versiculoSelecionado ? {
          livroNome: versiculoSelecionado.livroNome,
          capitulo: versiculoSelecionado.capitulo,
          versiculo: versiculoSelecionado.versiculo,
          texto: versiculoSelecionado.texto,
          traducao: versiculoSelecionado.traducao,
        } : null}
      />

      <Paywall
        aberto={paywallAprofundarAberto}
        onFechar={() => setPaywallAprofundarAberto(false)}
      />
    </div>
  );
}

