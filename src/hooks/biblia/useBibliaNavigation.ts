'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { TRAD_IDS } from '@/components/Biblia/TranslationDropdown';
import type { CapituloComparado } from '@/data/biblia/texto/carregar';
import { obterCapituloMulti, carregarTraducao, carregarTraducaoSync } from '@/data/biblia/texto/carregar';
import { isOnline, cacheChapter, getCachedChapter, getCachedChapterDB } from '@/lib/offline';
import { recordReading, getStats } from '@/lib/estatisticas';
import { useChapterPrefetch } from '@/hooks/useChapterPrefetch';

type ViewMode = 'single' | 'parallel' | 'comparison';

export interface UseBibliaNavigationReturn {
  livroIdx: number;
  setLivroIdx: React.Dispatch<React.SetStateAction<number>>;
  capituloIdx: number;
  setCapituloIdx: React.Dispatch<React.SetStateAction<number>>;
  chapterDirection: 'next' | 'prev';
  setChapterDirection: React.Dispatch<React.SetStateAction<'next' | 'prev'>>;
  selectedTrads: string[];
  setSelectedTrads: React.Dispatch<React.SetStateAction<string[]>>;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  goToBook: (idx: number, cap?: number) => void;
  changeChapter: (newIdx: number) => void;
  toggleTrad: (id: string) => void;
  livrosFiltrados: typeof TODOS_LIVROS;
  livro: typeof TODOS_LIVROS[number];
  data: CapituloComparado[];
  loading: boolean;
  offlineUnavailable: boolean;
  temDados: boolean;
  maxVersiculos: number;
  statsData: ReturnType<typeof getStats> | null;
  estudoCapitulo: import('@/data/estudosCapitulo').EstudoCapitulo | null;
  mainRef: React.RefObject<HTMLDivElement | null>;
}

export function UseBibliaNavigation(): UseBibliaNavigationReturn {
  const [livroIdx, setLivroIdx] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const params = new URLSearchParams(window.location.search);
    const livroParam = params.get('livro');
    if (livroParam) {
      const idx = TODOS_LIVROS.findIndex(l =>
        l.abreviacao === livroParam || l.nome.toLowerCase() === livroParam.toLowerCase()
      );
      if (idx >= 0) return idx;
    }
    return 0;
  });
  const [capituloIdx, setCapituloIdx] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const params = new URLSearchParams(window.location.search);
    const capParam = params.get('capitulo');
    if (capParam) {
      const cap = parseInt(capParam, 10);
      if (!isNaN(cap) && cap > 0) return cap - 1;
    }
    return 0;
  });
  const [chapterDirection, setChapterDirection] = useState<'next' | 'prev'>('next');
  const [selectedTrads, setSelectedTrads] = useState<string[]>(['arc']);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<CapituloComparado[]>([]);
  const [loading, setLoading] = useState(false);
  const [offlineUnavailable, setOfflineUnavailable] = useState(false);
  const [statsData, setStatsData] = useState<ReturnType<typeof getStats> | null>(null);
  const [estudoCapitulo, setEstudoCapitulo] = useState<import('@/data/estudosCapitulo').EstudoCapitulo | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const { prefetchAdjacent } = useChapterPrefetch(selectedTrads[0] || 'arc');

  const livro = TODOS_LIVROS[livroIdx];
  const livroAbrev = livro?.abreviacao ?? '';
  const totalCapitulos = Number.isFinite(livro?.totalCapitulos) ? livro.totalCapitulos : 1;

  const loadChapter = useCallback(() => {
    if (!livroAbrev || !Number.isFinite(capituloIdx)) return;
    const cap = Math.max(1, Math.min(totalCapitulos, capituloIdx + 1));

    // FAST PATH: try in-memory cache synchronously (instant after first load)
    const TRADUCOES_LOCAIS = ['arc', 'kjv', 'web', 'nvi', 'ara', 'acf'];
    const allLocal = selectedTrads.every(t => TRADUCOES_LOCAIS.includes(t));

    if (allLocal) {
      const results: CapituloComparado[] = [];
      let allCached = true;
      for (const trad of selectedTrads) {
        const tradData = carregarTraducaoSync(trad);
        if (tradData && tradData[livroAbrev]?.[cap]) {
          results.push({
            traducao: trad,
            versiculos: tradData[livroAbrev][cap].map((texto, i) => ({ numero: i + 1, texto })),
          });
        } else {
          allCached = false;
          break;
        }
      }

      if (allCached && results.length > 0) {
        setData(results);
        setLoading(false);
        mainRef.current?.scrollTo({ top: 0 });
        recordReading(livroAbrev, cap);
        setStatsData(getStats());
        requestIdleCallback(() => { prefetchAdjacent(livroAbrev, cap); });
        return;
      }
    }

    // SLOW PATH: async load (first visit or API translations)
    setLoading(true);
    (async () => {
      try {
        if (!isOnline()) {
          const cached = await Promise.all(
            selectedTrads.map(async (trad) => {
              const verses = getCachedChapter(livroAbrev, cap, trad) ?? (await getCachedChapterDB(livroAbrev, cap, trad));
              if (!verses || verses.length === 0) return null;
              return { traducao: trad, versiculos: verses.map((t, i) => ({ numero: i + 1, texto: t })) };
            })
          );
          const filtered = cached.filter(Boolean) as CapituloComparado[];
          if (filtered.length > 0) { setData(filtered); setOfflineUnavailable(false); }
          else { setData([]); setOfflineUnavailable(true); }
        } else {
          setOfflineUnavailable(false);
          const result = await obterCapituloMulti(livroAbrev, cap, selectedTrads);
          setData(result);
          for (const item of result) {
            cacheChapter(livroAbrev, cap, item.traducao, item.versiculos.map(v => v.texto));
          }
          recordReading(livroAbrev, cap);
          setStatsData(getStats());
          mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
        const ric = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : (cb: () => void) => setTimeout(cb, 0);
        ric(() => { prefetchAdjacent(livroAbrev, cap); });
      } finally {
        setLoading(false);
      }
    })();
  }, [livroAbrev, totalCapitulos, capituloIdx, selectedTrads, prefetchAdjacent]);

  useEffect(() => { loadChapter(); }, [loadChapter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const livroParam = params.get('livro');
    const capituloParam = params.get('capitulo') || params.get('cap');
    const tradsParam = params.get('trads');
    if (livroParam) {
      const idx = TODOS_LIVROS.findIndex((l) => l.abreviacao.toLowerCase() === livroParam.toLowerCase());
      if (idx >= 0) {
        setLivroIdx(idx);
        if (capituloParam) {
          const n = Number(capituloParam);
          if (Number.isFinite(n) && n > 0) setCapituloIdx(n - 1);
        }
      }
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

  const toggleTrad = useCallback((id: string) => {
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
  }, [viewMode]);

  const livrosFiltrados = useMemo(() => searchQuery
    ? TODOS_LIVROS.filter(l => l.nome.toLowerCase().includes(searchQuery.toLowerCase()) || l.abreviacao.toLowerCase().includes(searchQuery.toLowerCase()))
    : TODOS_LIVROS, [searchQuery]);

  const temDados = data.length > 0 && data.some(d => d.versiculos.length > 0);
  const maxVersiculos = temDados ? Math.max(...data.map(d => d.versiculos.length)) : 0;

  useEffect(() => {
    let cancelled = false;
    import('@/lib/estudosLoader').then(({ obterEstudoCapitulo }) => {
      if (!cancelled) setEstudoCapitulo(obterEstudoCapitulo(livro.abreviacao, capituloIdx + 1));
    });
    return () => { cancelled = true; };
  }, [livro.abreviacao, capituloIdx]);

  const goToBook = useCallback((idx: number, cap?: number) => {
    if (idx < 0 || idx >= TODOS_LIVROS.length) return;
    setLivroIdx(idx);
    setCapituloIdx(Math.max(0, cap ?? 0));
  }, []);

  const changeChapter = useCallback((newIdx: number) => {
    if (!Number.isFinite(newIdx)) return;
    const max = Math.max(0, totalCapitulos - 1);
    const clamped = Math.max(0, Math.min(max, Math.floor(newIdx)));
    setChapterDirection(clamped > capituloIdx ? 'next' : 'prev');
    setCapituloIdx(clamped);
  }, [totalCapitulos, capituloIdx]);

  return {
    livroIdx,
    setLivroIdx,
    capituloIdx,
    setCapituloIdx,
    chapterDirection,
    setChapterDirection,
    selectedTrads,
    setSelectedTrads,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    goToBook,
    changeChapter,
    toggleTrad,
    livrosFiltrados,
    livro,
    data,
    loading,
    offlineUnavailable,
    temDados,
    maxVersiculos,
    statsData,
    estudoCapitulo,
    mainRef,
  };
}
