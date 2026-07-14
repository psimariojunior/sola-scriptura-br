'use client';

import { useState, useEffect, useCallback, useMemo, useRef, lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TODOS_LIVROS, traducoes, carregarTraducao, ABREV_PARA_MIDVASH, livroPorAbreviacao } from '@/data/biblia';
import type { CapituloComparado } from '@/data/biblia';
import {
  BookOpen, ChevronRight, ChevronLeft, Search, X, History, Settings, Eye, Download,
  BookMarked, FileText, Sparkles, Play, Mic, Volume2, Layers, BookText, ListFilter, Flame, Award, Presentation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEstudos } from '@/components/EstudosProvider';
import { exportChapterPdf } from '@/lib/exportPdf';
import { getCrossReferences } from '@/data/crossReferences';
import { CompartilharVersiculo } from '@/components/CompartilharVersiculo';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import { useAudioCapitulo } from '@/hooks/useAudioCapitulo';
import ReadingPlanBanner from '@/components/ReadingPlanBanner';
import { useFlashcards } from '@/hooks/useFlashcards';
import { getMarcador } from '@/lib/marcadores';
import { isOnline, cacheChapter, getCachedChapter } from '@/lib/offline';
import { recordReading, getStats } from '@/lib/estatisticas';
import OfflineBanner from '@/components/OfflineBanner';
import PainelDoVersiculo from '@/components/PainelDoVersiculo';
import { useNotas } from '@/hooks/useNotas';
import ApresentacaoModal from '@/components/Apresentacao/ApresentacaoModal';
import { PainelQualidadeAudio } from '@/components/PainelQualidadeAudio';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { cn } from '@/lib/utils';
import { ChapterHeader } from '@/components/Biblia/ChapterHeader';
import { ModoLeitura, type ModoLeituraValue } from '@/components/Biblia/ModoLeitura';
import { VerseCard } from '@/components/Biblia/VerseCard';
import { SidePanel, type SidePanelWidth } from '@/components/Biblia/SidePanel';
import { MobileActionBar } from '@/components/Biblia/MobileActionBar';
import { ProgressBar } from '@/components/Biblia/ProgressBar';

const AudioMiniPlayer = lazy(() => import('@/components/VerseAudio').then(m => ({ default: m.AudioMiniPlayer })));
const AudioNaturalPlayer = lazy(() => import('@/components/AudioNaturalPlayer'));
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

const TRAD_IDS = ['arc', 'nvi', 'ara', 'acf', 'aa', 'ntlh', 'kjv', 'web'] as const;
const TRADS_LOCAIS = new Set(['arc', 'kjv', 'web']);
const MIDVASH_API = 'https://api.midvash.com/v1';
const cacheApi = new Map<string, string[]>();

async function fetchFromMidvash(trad: string, livro: string, cap: number): Promise<string[]> {
  const cacheKey = `${trad}:${livro}:${cap}`;
  if (cacheApi.has(cacheKey)) return cacheApi.get(cacheKey)!;
  const slug = ABREV_PARA_MIDVASH[livro];
  if (!slug) return [];
  try {
    const res = await fetch(`${MIDVASH_API}/${trad}/${slug}/${cap}`, { signal: AbortSignal.timeout(12000) });
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
    cacheApi.set(cacheKey, verses);
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

const labelMap: Record<string, string> = { arc: 'ARC', nvi: 'NVI', ara: 'ARA', acf: 'ACF', aa: 'AA', ntlh: 'NTLH', kjv: 'KJV', web: 'WEB' };
const nomeMap: Record<string, string> = { arc: 'Almeida Revista e Corrigida', nvi: 'Nova Versão Internacional', ara: 'Almeida Revista e Atualizada', acf: 'Almeida Corrigida Fiel', aa: 'Almeida Atualizada', ntlh: 'Nova Tradução na Linguagem de Hoje', kjv: 'King James Version', web: 'World English Bible' };
const tradBadgeColors: Record<string, string> = { arc: 'bg-primary/10 text-primary', nvi: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', ara: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', acf: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', aa: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', ntlh: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', kjv: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', web: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };

const PASSAGENS_DRAMATICAS: Record<string, { titulo: string; subtitulo: string; cenas: CenaDramatica[]; personagens: PersonagemVoz[] }> = {
  'gn-1': { titulo: 'A Criação do Mundo', subtitulo: 'Gênesis 1', cenas: [], personagens: [] },
  'sl-23': { titulo: 'O Senhor é o Meu Pastor', subtitulo: 'Salmos 23', cenas: [], personagens: [] },
  'jo-1': { titulo: 'O Verbo se Fez Carne', subtitulo: 'João 1:1-14', cenas: [], personagens: [] },
  'mt-27': { titulo: 'A Crucificação de Jesus', subtitulo: 'Mateus 27', cenas: [], personagens: [] },
};

export default function BibliaPage() {
  const [livroIdx, setLivroIdx] = useState(0);
  const [capituloIdx, setCapituloIdx] = useState(0);
  const [selectedTrads, setSelectedTrads] = useState<string[]>(['arc']);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [data, setData] = useState<CapituloComparado[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(18);
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
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [quickSearchResults, setQuickSearchResults] = useState<Array<{livro: string, nome: string, cap: number, versiculo: number, texto: string, traducao: string}>>([]);
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
  const [mostrarApresentacao, setMostrarApresentacao] = useState(false);
  const [mostrarQualidadeAudio, setMostrarQualidadeAudio] = useState(false);
  const [tradOpen, setTradOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const livro = TODOS_LIVROS[livroIdx];
  const chaveDramatica = `${livro.abreviacao}-${capituloIdx + 1}`;
  const passagemDramatica = PASSAGENS_DRAMATICAS[chaveDramatica];

  const capituloAudio = useAudioCapitulo(
    livro.abreviacao,
    capituloIdx + 1,
    data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []
  );

  const loadChapter = useCallback(async () => {
    setLoading(true);
    const livroAbrev = livro.abreviacao;
    const cap = capituloIdx + 1;
    if (!isOnline()) {
      const cached = selectedTrads.map(trad => {
        const verses = getCachedChapter(livroAbrev, cap, trad);
        if (!verses || verses.length === 0) return null;
        return { traducao: trad, versiculos: verses.map((t, i) => ({ numero: i + 1, texto: t })) };
      }).filter(Boolean) as CapituloComparado[];
      if (cached.length > 0) { setData(cached); setLoading(false); return; }
    }
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
    const capituloParam = params.get('capitulo');
    const tradsParam = params.get('trads');
    if (livroParam) {
      const idx = TODOS_LIVROS.findIndex((l) => l.abreviacao === livroParam);
      if (idx >= 0) { setLivroIdx(idx); if (capituloParam) setCapituloIdx(Number(capituloParam) - 1); }
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

  const [quickSearchAutoComplete, setQuickSearchAutoComplete] = useState<Array<{livro: string; nome: string}>>([]);
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
      else if (e.key === 'Escape') { setSidebarOpen(false); setMobileMenu(false); setChapterGridOpen(false); setMostrarNarracao(false); setVersiculoSelecionado(null); setTradOpen(false); setToolsOpen(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [capituloIdx, livro, quickSearchOpen]);

  const toggleTrad = (id: string) => {
    if (id === 'arc' || (selectedTrads.length === 1 && selectedTrads.includes(id))) {
      setSelectedTrads(prev => prev.includes(id) ? prev : [...prev, id].slice(0, 4));
    } else {
      setSelectedTrads(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id].slice(0, 4));
    }
  };

  const handleQuickSearch = useCallback(async (q: string) => {
    setQuickSearchQuery(q);
    const query = q.toLowerCase().trim();

    if (query.length > 0) {
      const books = TODOS_LIVROS
        .filter(l => l.nome.toLowerCase().includes(query) || l.abreviacao.toLowerCase().includes(query))
        .slice(0, 5)
        .map(l => ({ livro: l.abreviacao, nome: l.nome }));
      setQuickSearchAutoComplete(books);
    } else {
      setQuickSearchAutoComplete([]);
    }

    if (q.length < 2) { setQuickSearchResults([]); return; }
    const results: Array<{livro: string, nome: string, cap: number, versiculo: number, texto: string, traducao: string}> = [];
    const d = await carregarTraducao('arc');
    for (const l of TODOS_LIVROS) {
      if (results.length >= 30) break;
      const bookData = d[l.abreviacao];
      if (!bookData) continue;
      for (const cap of Object.keys(bookData)) {
        if (results.length >= 30) break;
        const versos = bookData[Number(cap)];
        if (!versos) continue;
        for (let i = 0; i < versos.length; i++) {
          if (versos[i].toLowerCase().includes(query)) {
            results.push({ livro: l.abreviacao, nome: l.nome, cap: Number(cap), versiculo: i + 1, texto: versos[i], traducao: 'ARC' });
            break;
          }
        }
      }
    }
    setQuickSearchResults(results);
  }, []);

  const goToQuickResult = (r: { livro: string; nome: string; cap: number; versiculo?: number }) => {
    const idx = TODOS_LIVROS.findIndex(l => l.abreviacao === r.livro);
    if (idx >= 0) {
      const entry = { query: quickSearchQuery, livro: r.livro, nome: r.nome, cap: r.cap, versiculo: r.versiculo || 1 };
      setRecentSearches(prev => {
        const next = [entry, ...prev.filter(s => s.livro !== r.livro || s.cap !== r.cap)].slice(0, 5);
        try { localStorage.setItem('ssb_recent_searches', JSON.stringify(next)); } catch {}
        return next;
      });
      setLivroIdx(idx);
      setCapituloIdx(r.cap - 1);
      setQuickSearchOpen(false);
      setQuickSearchQuery('');
      setQuickSearchResults([]);
      setQuickSearchAutoComplete([]);
    }
  };

  const livrosFiltrados = useMemo(() => searchQuery
    ? TODOS_LIVROS.filter(l => l.nome.toLowerCase().includes(searchQuery.toLowerCase()) || l.abreviacao.toLowerCase().includes(searchQuery.toLowerCase()))
    : TODOS_LIVROS, [searchQuery]);

  const temDados = data.length > 0 && data.some(d => d.versiculos.length > 0);
  const maxVersiculos = temDados ? Math.max(...data.map(d => d.versiculos.length)) : 0;

  const goToBook = (idx: number) => { setLivroIdx(idx); setCapituloIdx(0); setMobileMenu(false); setChapterGridOpen(false); };

  const changeChapter = (newIdx: number) => {
    setChapterDirection(newIdx > capituloIdx ? 'next' : 'prev');
    setCapituloIdx(newIdx);
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
      const other = selectedTrads[0] === 'arc' ? 'nvi' : 'arc';
      setSelectedTrads(prev => prev.includes(other) ? prev : [...prev, other]);
    }
  }, [modoLeitura, selectedTrads]);

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

        <div className="flex h-[calc(100vh-7rem)] relative">
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
                <button onClick={() => setMobileMenu(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]" aria-label="Abrir menu de livros">
                  <BookOpen className="w-4 h-4" />
                </button>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]" aria-label={sidebarOpen ? 'Fechar barra lateral' : 'Abrir barra lateral'}>
                  <ListFilter className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  <motion.button onClick={() => changeChapter(Math.max(0, capituloIdx - 1))} disabled={capituloIdx === 0}
                    whileTap={{ scale: 0.92 }}
                    className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)]"
                    aria-label="Capítulo anterior">
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <div className="px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] border border-[var(--border)]/40 min-w-[120px] text-center">
                    <span className="text-xs font-semibold text-[var(--content-primary)]">{livro.nome}</span>
                    <span className="text-[var(--brand-default)] font-bold ml-1.5 tabular-nums">{capituloIdx + 1}</span>
                    <span className="text-[var(--content-muted)] font-normal text-[10px] ml-1">/{livro.totalCapitulos}</span>
                  </div>
                  <motion.button onClick={() => changeChapter(Math.min(livro.totalCapitulos - 1, capituloIdx + 1))}
                    disabled={capituloIdx >= livro.totalCapitulos - 1}
                    whileTap={{ scale: 0.92 }}
                    className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] disabled:opacity-30 text-[var(--content-secondary)]"
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

                <div className="relative">
                  <motion.button
                    onClick={() => { setTradOpen(!tradOpen); setToolsOpen(false); }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold',
                      'border transition-all duration-200',
                      tradOpen || selectedTrads.length > 1
                        ? 'bg-[var(--brand-subtle)] border-[var(--brand-default)]/30 text-[var(--brand-default)]'
                        : 'bg-[var(--surface-sunken)] border-[var(--border)]/60 text-[var(--content-secondary)] hover:text-[var(--content-primary)]'
                    )}
                    aria-label="Selecionar traduções"
                    aria-expanded={tradOpen}
                  >
                    <BookText className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{selectedTrads.map(t => labelMap[t]).join(' · ')}</span>
                    {selectedTrads.length > 1 && <span className="text-[10px] px-1 rounded-full bg-[var(--brand-default)] text-[var(--brand-contrast)]">{selectedTrads.length}</span>}
                  </motion.button>
                  <AnimatePresence>
                    {tradOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setTradOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 z-40 w-64 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-2"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] px-3 py-1.5">Traduções</p>
                          {TRAD_IDS.map(id => {
                            const active = selectedTrads.includes(id);
                            return (
                              <button key={id} onClick={() => toggleTrad(id)}
                                className={cn(
                                  'w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors',
                                  active ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]' : 'hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]'
                                )}>
                                <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[id])} />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold">{labelMap[id]}</div>
                                  <div className="text-[10px] text-[var(--content-muted)] truncate">{nomeMap[id]}</div>
                                </div>
                                {active && <span className="text-[var(--brand-default)] text-xs">✓</span>}
                              </button>
                            );
                          })}
                          {selectedTrads.length > 1 && (
                            <div className="mt-2 pt-2 border-t border-[var(--border)]/40 px-2 flex gap-1">
                              {(['single', 'parallel', 'comparison'] as ViewMode[]).map(m => (
                                <button key={m} onClick={() => setViewMode(m)}
                                  className={cn(
                                    'flex-1 text-[10px] font-medium px-2 py-1 rounded-md transition-colors',
                                    viewMode === m ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]' : 'text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]'
                                  )}>
                                  {m === 'single' ? 'Única' : m === 'parallel' ? 'Lado a lado' : 'Comparar'}
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden md:flex items-center gap-0.5">
                  <motion.button
                    onClick={() => {
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

                <div className="relative">
                  <motion.button
                    onClick={() => { setToolsOpen(!toolsOpen); setTradOpen(false); }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'p-1.5 rounded-lg transition-colors',
                      toolsOpen ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                    )}
                    title="Ferramentas"
                    aria-label="Ferramentas"
                    aria-expanded={toolsOpen}
                  >
                    <Layers className="w-4 h-4" />
                  </motion.button>
                  <AnimatePresence>
                    {toolsOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setToolsOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 z-40 w-56 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-1.5"
                        >
                          <ToolItem icon={FileText} label="Notas" onClick={() => { if (!mostrarNotas && !notaAtiva) { const nova = criarNota(`${livro.nome} ${capituloIdx + 1}`); setNotaAtiva(nova); } setMostrarNotas(!mostrarNotas); setToolsOpen(false); }} />
                          <ToolItem icon={Download} label="Exportar PDF" onClick={() => { data.length > 0 && exportChapterPdf(livro.nome, capituloIdx + 1, data); setToolsOpen(false); }} />
                          <ToolItem icon={BookMarked} label="Plano de Leitura" onClick={() => { setShowPlan(!showPlan); setToolsOpen(false); }} />
                          {passagemDramatica && <ToolItem icon={Play} label="Narração Dramática" onClick={() => { setMostrarNarracao(true); setToolsOpen(false); }} />}
                          <div className="my-1 h-px bg-[var(--border)]/40" />
                          <ToolItem icon={Settings} label="Configurações" onClick={() => { setShowSettings(!showSettings); setToolsOpen(false); }} />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

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

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/40 px-4 py-2.5 flex items-center gap-4 flex-wrap text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--content-muted)] font-medium">Tamanho:</span>
                      <button onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="w-6 h-6 rounded hover:bg-[var(--surface-raised)] flex items-center justify-center" aria-label="Diminuir fonte">−</button>
                      <span className="font-mono w-6 text-center tabular-nums">{fontSize}</span>
                      <button onClick={() => setFontSize(Math.min(28, fontSize + 1))} className="w-6 h-6 rounded hover:bg-[var(--surface-raised)] flex items-center justify-center" aria-label="Aumentar fonte">+</button>
                    </div>
                    {viewMode === 'comparison' && data.length >= 2 && (
                      <button onClick={() => setShowDiff(!showDiff)}
                        className={cn(
                          'px-2.5 py-1 rounded-full border transition-colors',
                          showDiff ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60'
                        )}>
                        Diferenças {showDiff ? 'ON' : 'OFF'}
                      </button>
                    )}
                    <div className="flex items-center gap-2 ml-auto text-[var(--content-muted)]">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Spectral • Leitura 1.8</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={mainRef} className="flex-1 overflow-y-auto">
              <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
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
                ) : temDados ? (
                  <AnimatePresence mode="wait">
                    <motion.div key={`${livro.abreviacao}-${capituloIdx}`} {...chapterAnimProps}>
                      <ChapterHeader
                        livroNome={livro.nome}
                        livroAbreviacao={livro.abreviacao}
                        capitulo={capituloIdx + 1}
                        totalCapitulos={livro.totalCapitulos}
                        totalVersiculos={data[0]?.versiculos?.length ?? 0}
                      />

                      {modoLeitura === 'foco' && data.map((item) => (
                        <div key={item.traducao} className="mb-6">
                          {selectedTrads.length > 1 && (
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40">
                              <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} />
                              <span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>
                              <span className="text-xs text-[var(--content-muted)]">{nomeMap[item.traducao]}</span>
                            </div>
                          )}
                          <div className="space-y-1 divide-y divide-[var(--brand-default)]/5">
                            {item.versiculos.map((v) => {
                              const isSelected = versiculoSelecionado?.versiculo === v.numero && versiculoSelecionado?.traducao === item.traducao;
                              const isPlaying = audio.isVersePlaying(v.numero);
                              const isHighlighted = highlightedVerse === v.numero;
                              const verseKey = `${livro.abreviacao}:${capituloIdx + 1}:${v.numero}:${item.traducao}`;
                              const fav = isFavorito(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                              const marcaMarcador = getMarcador(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                              const corMarca = marcaMarcador?.cor ?? null;
                              const temAnotacao = false;
                              const ref = `${livro.nome} ${capituloIdx + 1}:${v.numero}`;

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
                                  isHighlighted={isHighlighted}
                                  isFavorito={fav}
                                  corMarca={corMarca}
                                  temAnotacao={temAnotacao}
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
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {modoLeitura === 'comparacao' && viewMode === 'parallel' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {data.map((item) => (
                            <motion.div
                              key={item.traducao}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="border border-[var(--border)]/40 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/30">
                                <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} />
                                <span className="text-sm font-semibold">{labelMap[item.traducao]}</span>
                              </div>
                              {item.versiculos.map(v => (
                                <p key={v.numero} className="mb-1.5 leading-relaxed font-serif-body" style={{ fontSize: `${fontSize - 2}px` }}>
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

                      {modoLeitura === 'estudo' && data.map((item) => (
                        <div key={item.traducao} className="mb-6">
                          {selectedTrads.length > 1 && (
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/40">
                              <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[item.traducao])} />
                              <span className="text-sm font-semibold text-[var(--content-primary)]">{labelMap[item.traducao]}</span>
                            </div>
                          )}
                          <div className="space-y-1">
                            {item.versiculos.map((v) => {
                              const isSelected = versiculoSelecionado?.versiculo === v.numero && versiculoSelecionado?.traducao === item.traducao;
                              const isPlaying = audio.isVersePlaying(v.numero);
                              const verseKey = `${livro.abreviacao}:${capituloIdx + 1}:${v.numero}:${item.traducao}`;
                              const fav = isFavorito(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                              const marcaMarcador = getMarcador(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                              const corMarca = marcaMarcador?.cor ?? null;
                              const temAnotacao = false;

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
                                  isHighlighted={false}
                                  isFavorito={fav}
                                  corMarca={corMarca}
                                  temAnotacao={temAnotacao}
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
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-center gap-4 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[var(--border)]/30">
                        <motion.button onClick={() => changeChapter(Math.max(0, capituloIdx - 1))} disabled={capituloIdx === 0}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-colors"
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
                          className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full disabled:opacity-30 hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 transition-colors"
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

              <AnimatePresence>
                {mostrarNotas && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[var(--border)]/40 bg-[var(--surface-raised)] p-4 max-w-[720px] mx-auto"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[var(--brand-default)]" />
                        <h3 className="text-sm font-semibold">Minhas Anotações</h3>
                        <span className="text-[10px] px-1.5 py-0.5 bg-[var(--brand-subtle)] text-[var(--brand-default)] rounded-full">
                          {notas.length}
                        </span>
                      </div>
                      <button onClick={() => setMostrarNotas(false)} className="p-1 rounded hover:bg-[var(--surface-sunken)]" aria-label="Fechar notas">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Suspense fallback={<PanelFallback />}>
                      {(() => {
                        const NotaEditor = require('@/components/NotaEditor').NotaEditor as React.ComponentType<any>;
                        return (
                          <NotaEditor
                            key={notaAtiva?.id ?? 'new'}
                            nota={notaAtiva ?? undefined}
                            autoSalvar={true}
                            onSalvar={(nota: any) => { setNotaAtiva(nota); salvarNotaHook(nota.id, nota.conteudo); }}
                            onExcluir={(id: string) => { excluirNota(id); setNotaAtiva(null); setMostrarNotas(false); }}
                          />
                        );
                      })()}
                    </Suspense>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {mobileMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 lg:hidden"
                >
                  <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
                  <motion.aside
                    initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[var(--surface-raised)] border-r border-[var(--border)] overflow-y-auto p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold">Livros</span>
                      <button onClick={() => setMobileMenu(false)} className="p-1 rounded-lg hover:bg-[var(--surface-sunken)]" aria-label="Fechar">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-0.5">
                      {TODOS_LIVROS.map(l => {
                        const idx = TODOS_LIVROS.indexOf(l);
                        return (
                          <button key={l.abreviacao} onClick={() => { goToBook(idx); setMobileMenu(false); }}
                            className={cn(
                              'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                              idx === livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                            )}>
                            {l.nome}
                          </button>
                        );
                      })}
                    </div>
                  </motion.aside>
                </motion.div>
              )}
            </AnimatePresence>
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
        copyVerse={copyVerse}
        copiedVerse={copiedVerse}
      />

      <Suspense fallback={null}>
        {audioNatural.state.isPlaying && (
          <AudioNaturalPlayer
            isPlaying={audioNatural.state.isPlaying}
            isLoading={audioNatural.state.isLoading}
            currentTime={audioNatural.state.currentTime}
            duration={audioNatural.state.duration}
            currentVerse={audio.playingVerse ?? undefined}
            totalVerses={data[0]?.versiculos?.length}
            verseText={data[0]?.versiculos?.find(v => v.numero === audio.playingVerse)?.texto}
            bookName={livro.nome}
            chapter={capituloIdx + 1}
            engine={audioNatural.state.engine}
            onPlay={() => {
              const verseText = data[0]?.versiculos?.find(v => v.numero === (audio.playingVerse ?? 1))?.texto ?? '';
              if (verseText) audioNatural.play(verseText);
            }}
            onPause={audioNatural.pause}
            onStop={() => { audioNatural.stop(); audio.stop(); }}
            onSeek={audioNatural.seek}
            onSkipForward={() => audioNatural.seek(Math.min(audioNatural.state.currentTime + 15, audioNatural.state.duration))}
            onSkipBackward={() => audioNatural.seek(Math.max(audioNatural.state.currentTime - 15, 0))}
            volume={audioNatural.state.volume}
            speed={audioNatural.state.speed}
            isMuted={audioNatural.state.isMuted}
            onSetVolume={audioNatural.setVolume}
            onSetSpeed={audioNatural.setSpeed}
            onToggleMute={audioNatural.toggleMute}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {!audioNatural.state.isPlaying && (
          <AudioMiniPlayer
            isPlaying={audio.isPlaying}
            currentVerse={audio.playingVerse ?? -1}
            totalVerses={data[0]?.versiculos?.length ?? 0}
            verseText={data[0]?.versiculos?.find(v => v.numero === audio.playingVerse)?.texto ?? ''}
            onStop={audio.stop}
          />
        )}
      </Suspense>

      <AnimatePresence>
        {anotandoVersiculo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setAnotandoVersiculo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-medium mb-1">Anotação</h3>
              <p className="text-xs text-[var(--content-muted)] mb-4">{anotandoVersiculo}</p>
              <textarea value={anotacaoTexto} onChange={e => setAnotacaoTexto(e.target.value)}
                placeholder="Digite sua anotação pessoal..."
                className="w-full h-32 p-3 text-sm bg-[var(--surface-sunken)] border border-[var(--border)] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 transition-all" autoFocus />
              <div className="flex items-center justify-end gap-3 mt-4">
                <button onClick={() => setAnotandoVersiculo(null)} className="px-4 py-2 text-sm text-[var(--content-muted)] hover:text-[var(--content-primary)]">Cancelar</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={async () => {
                  const { setAnotacao } = await import('@/lib/estudos');
                  const parts = anotandoVersiculo.split(':');
                  setAnotacao(parts[0], Number(parts[1]), Number(parts[2]), parts[3], anotacaoTexto || null);
                  refresh(); setAnotandoVersiculo(null); setAnotacaoTexto('');
                }} className="px-4 py-2 text-sm font-semibold bg-[var(--brand-default)] text-[var(--brand-contrast)] rounded-lg hover:bg-[var(--brand-hover)]">
                  Salvar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setQuickSearchOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-lg mx-4 bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search className="w-5 h-5 text-[var(--content-muted)] shrink-0" />
                <input autoFocus type="text" placeholder="Buscar versículos ou livro..." value={quickSearchQuery}
                  onChange={e => handleQuickSearch(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && quickSearchAutoComplete.length > 0) { goToQuickResult({ livro: quickSearchAutoComplete[0].livro, nome: quickSearchAutoComplete[0].nome, cap: 1 }); } }}
                  className="flex-1 bg-transparent text-sm outline-none" />
                <kbd className="text-[10px] bg-[var(--surface-sunken)] px-1.5 py-0.5 rounded text-[var(--content-muted)]">ESC</kbd>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {quickSearchAutoComplete.length > 0 && quickSearchQuery.length >= 2 && quickSearchResults.length === 0 && (
                  <div className="p-2 border-b border-[var(--border)]/30">
                    <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider px-3 py-1 font-semibold">Livros</p>
                    {quickSearchAutoComplete.map((b, i) => (
                      <motion.button key={b.livro} onClick={() => goToQuickResult({ livro: b.livro, nome: b.nome, cap: 1 })}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[var(--brand-default)]" />
                        <span className="text-sm font-medium">{b.nome}</span>
                        <span className="text-[10px] text-[var(--content-muted)]">Capítulo 1</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {quickSearchQuery.length === 0 && recentSearches.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider px-3 py-1 font-semibold">Buscas recentes</p>
                    {recentSearches.map((s, i) => (
                      <motion.button key={i} onClick={() => goToQuickResult({ livro: s.livro, nome: s.nome, cap: s.cap, versiculo: s.versiculo })}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors flex items-center gap-2">
                        <History className="w-3.5 h-3.5 text-[var(--content-muted)]" />
                        <span className="text-sm">{s.nome} {s.cap}:{s.versiculo}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {quickSearchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="flex items-center justify-between px-3 py-1">
                      <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider font-semibold">Resultados ({quickSearchResults.length})</p>
                      <span className="text-[10px] text-[var(--content-muted)]">ARC</span>
                    </div>
                    {quickSearchResults.map((r, i) => {
                      const queryLower = quickSearchQuery.toLowerCase();
                      const idx = r.texto.toLowerCase().indexOf(queryLower);
                      const before = idx > 0 ? r.texto.slice(0, idx) : '';
                      const match = idx >= 0 ? r.texto.slice(idx, idx + queryLower.length) : '';
                      const after = idx >= 0 ? r.texto.slice(idx + queryLower.length) : r.texto;
                      return (
                        <motion.button key={i} onClick={() => goToQuickResult(r)}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors group">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold text-[var(--brand-default)]">{r.nome} {r.cap}:{r.versiculo}</span>
                            <span className="text-[9px] px-1 py-0.5 bg-[var(--surface-sunken)] rounded text-[var(--content-muted)]">{r.traducao}</span>
                          </div>
                          <p className="text-xs text-[var(--content-muted)] line-clamp-2 group-hover:text-[var(--content-primary)] transition-colors">
                            {before && <span>{before}</span>}
                            {match && <mark className="bg-[var(--brand-subtle)] text-[var(--brand-default)] rounded-sm px-0.5">{match}</mark>}
                            {after && <span>{after}</span>}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                ) : quickSearchQuery.length >= 2 ? (
                  <div className="p-8 text-center text-sm text-[var(--content-muted)]">Nenhum resultado encontrado</div>
                ) : quickSearchQuery.length === 0 && recentSearches.length === 0 ? (
                  <div className="p-8 text-center text-sm text-[var(--content-muted)]">
                    <kbd className="text-xs bg-[var(--surface-sunken)] px-2 py-1 rounded border border-[var(--border)]">Ctrl+K</kbd>
                    <span className="mx-2">ou</span>
                    <kbd className="text-xs bg-[var(--surface-sunken)] px-2 py-1 rounded border border-[var(--border)]">/</kbd>
                    <span className="ml-2">para buscar</span>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
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
    </div>
  );
}

function ToolItem({ icon: Icon, label, onClick }: { icon: typeof History; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)] transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

function ComparisonTable({ data, fontSize, showDiff, highlightedVerse, onHighlight, maxVersiculos, tradBadgeColors, labelMap }: {
  data: CapituloComparado[];
  fontSize: number;
  showDiff: boolean;
  highlightedVerse: number | null;
  onHighlight: (v: number | null) => void;
  maxVersiculos: number;
  tradBadgeColors: Record<string, string>;
  labelMap: Record<string, string>;
}) {
  return (
    <div className="border border-[var(--border)]/40 rounded-xl overflow-x-auto">
      <div className="bg-[var(--surface-sunken)]/50 px-4 py-2 border-b border-[var(--border)]/30 flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--content-muted)] uppercase tracking-wider">Comparação</span>
      </div>
      <div className="grid border-b border-[var(--border)]/30" style={{ gridTemplateColumns: `48px repeat(${data.length}, 1fr)` }}>
        <div className="p-2" />
        {data.map(item => (
          <div key={item.traducao} className="p-2 border-l border-[var(--border)]/20">
            <div className="flex items-center gap-1.5">
              <div className={cn('w-1.5 h-1.5 rounded-full', tradBadgeColors[item.traducao])} />
              <span className="text-[11px] font-bold">{labelMap[item.traducao]}</span>
            </div>
          </div>
        ))}
      </div>
      {Array.from({ length: maxVersiculos }, (_, i) => {
        const verseNum = i + 1;
        if (!data.some(d => d.versiculos[i])) return null;
        const baseText = data[0].versiculos[i]?.texto || '';
        return (
          <motion.div
            key={verseNum}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
            className={cn(
              'grid border-b border-[var(--border)]/15 last:border-b-0 hover:bg-[var(--surface-sunken)]/50 transition-colors cursor-pointer',
              highlightedVerse === verseNum && 'bg-[var(--brand-subtle)] border-l-2 border-l-[var(--brand-default)]'
            )}
            style={{ gridTemplateColumns: `48px repeat(${data.length}, 1fr)` }}
            onClick={() => onHighlight(highlightedVerse === verseNum ? null : verseNum)}
          >
            <div className="p-3 flex items-start justify-end">
              <span className="text-[11px] font-bold text-[var(--brand-default)] bg-[var(--brand-subtle)] w-6 h-6 flex items-center justify-center rounded-full tabular-nums">{verseNum}</span>
            </div>
            {data.map((item, idx) => {
              const v = item.versiculos[i];
              if (!v) return <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20" />;
              if (showDiff && idx > 0 && baseText) {
                return (
                  <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20">
                    <DiffText baseText={baseText} newText={v.texto} fontSize={fontSize - 3} />
                  </div>
                );
              }
              return (
                <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20">
                  <p className="font-serif-body leading-relaxed" style={{ fontSize: `${fontSize - 3}px` }}>{v.texto}</p>
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}

function DiffText({ baseText, newText, fontSize }: { baseText: string; newText: string; fontSize: number }) {
  const segments = useMemo(() => {
    try {
      const { diffWords } = require('@/lib/diff');
      return diffWords(baseText, newText);
    } catch {
      return [{ text: newText, changed: false }];
    }
  }, [baseText, newText]);

  return (
    <p className="font-serif-body leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
      {segments.map((seg: { text: string; changed: boolean }, si: number) =>
        seg.changed ? <span key={si} className="diff-word">{seg.text}</span> : <span key={si}>{seg.text}</span>
      )}
    </p>
  );
}
