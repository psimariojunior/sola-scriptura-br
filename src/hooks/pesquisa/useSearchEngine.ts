'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { biblia } from '@/lib/api-client';
import { obterQueryExpandida } from '@/lib/sinonimos';

const lexiconHebraico = () => import('@/data/lexicon/hebraico');
const lexiconGrego = () => import('@/data/lexicon/grego');

export interface SearchResult {
  livroAbrev: string;
  livroNome: string;
  testamento: 'AT' | 'NT';
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

export interface SearchFilters {
  query: string;
  searchMode: string;
  testamento: 'all' | 'AT' | 'NT';
  livroFiltro: string;
  capituloFiltro: number | null;
  capituloDe: number | null;
  capituloAte: number | null;
  tradSel: Set<string>;
  buscaSemantica: boolean;
  isExactPhrase: boolean;
  morphFilters: Record<string, string>;
}

export function useSearchEngine() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchMode, setSearchMode] = useState('contains');
  const [testamento, setTestamento] = useState<'all' | 'AT' | 'NT'>('all');
  const [livroFiltro, setLivroFiltro] = useState('all');
  const [capituloFiltro, setCapituloFiltro] = useState<number | null>(null);
  const [capituloDe, setCapituloDe] = useState<number | null>(null);
  const [capituloAte, setCapituloAte] = useState<number | null>(null);
  const [tradSel, setTradSel] = useState<Set<string>>(new Set(['arc', 'nvi', 'ara', 'acf', 'kjv', 'web']));
  const [apiResults, setApiResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedResult, setCopiedResult] = useState<string | null>(null);
  const [buscaSemantica, setBuscaSemantica] = useState(true);
  const [lexiconResults, setLexiconResults] = useState<any[]>([]);
  const [isExactPhrase, setIsExactPhrase] = useState(false);
  const [searchTime, setSearchTime] = useState<number | null>(null);
  const [morphFilters, setMorphFilters] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
  }, []);

  const alternarTrad = useCallback((id: string) => {
    setTradSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const tryApiSearch = useCallback(async (q: string): Promise<SearchResult[] | null> => {
    if (!q || q.length < 2) return null;
    try {
      const traducao = [...tradSel].join(',');
      let searchQuery = q;

      if (buscaSemantica && !isExactPhrase) {
        const expandida = obterQueryExpandida(q);
        if (expandida && expandida !== q) {
          searchQuery = expandida;
        }
      }

      const data = await biblia.pesquisar(searchQuery, { traducao });
      if (!data || data.length === 0) return null;
      return data
        .filter((r) => r.tipo === 'versiculo' && r.metadata)
        .map((r) => ({
          livroAbrev: r.metadata!.livroAbrev || r.subtitulo || '',
          livroNome: r.metadata!.livroNome || r.titulo.split(' ').slice(0, -1).join(' '),
          testamento: (r.metadata!.testamento as 'AT' | 'NT') || 'NT',
          capitulo: r.metadata!.capituloNumero || 0,
          versiculo: r.metadata!.numero || 0,
          texto: r.trecho,
          traducao: r.metadata!.traducaoId || '',
        }));
    } catch {
      return null;
    }
  }, [tradSel, buscaSemantica, isExactPhrase]);

  useEffect(() => {
    setLoading(true);
    setLexiconResults([]);
    const startTime = Date.now();
    const t = setTimeout(async () => {
      const q = query.trim();
      if (q && q.length >= 2) {
        if (searchMode === 'strongs') {
          const normalized = q.toUpperCase().replace(/^(H|G)/, '');
          const prefix = /^G/i.test(q) ? 'G' : /^H/i.test(q) ? 'H' : '';
          try {
            const [hebraicoMod, gregoMod] = await Promise.all([
              lexiconHebraico(),
              lexiconGrego(),
            ]);
            const hebData = (hebraicoMod.palavrasHebraicas || Object.values(hebraicoMod)) as any[];
            const grkData = (gregoMod.palavrasGregas || gregoMod.GREGO || Object.values(gregoMod)) as any[];
            const allEntries = [
              ...hebData.map((e: any) => ({ ...e, idioma: 'hebraico' as const })),
              ...grkData.map((e: any) => ({ ...e, idioma: 'grego' as const })),
            ];
            const filtered = allEntries.filter((entry: any) => {
              const entryNum = String(entry.strong || entry.strongs || entry.numero || '').toUpperCase();
              if (prefix === 'H') return entryNum === `H${normalized}` || entryNum === normalized;
              if (prefix === 'G') return entryNum === `G${normalized}` || entryNum === normalized;
              return entryNum.includes(normalized);
            });
            setLexiconResults(filtered.slice(0, 50));
          } catch {
            setLexiconResults([]);
          }
        } else if (searchMode === 'morphology') {
          try {
            const [hebraicoMod, gregoMod] = await Promise.all([
              lexiconHebraico(),
              lexiconGrego(),
            ]);
            const hebData = (hebraicoMod.palavrasHebraicas || Object.values(hebraicoMod)) as any[];
            const grkData = (gregoMod.palavrasGregas || gregoMod.GREGO || Object.values(gregoMod)) as any[];
            const allEntries = [
              ...hebData.map((e: any) => ({ ...e, idioma: 'hebraico' as const })),
              ...grkData.map((e: any) => ({ ...e, idioma: 'grego' as const })),
            ];
            const activeFilters = Object.entries(morphFilters).filter(([, v]) => v);
            const filtered = allEntries.filter((entry: any) => {
              const morph = (entry.morphologia || entry.morfologia || '').toLowerCase();
              if (!morph) return false;
              for (const [campo, valor] of activeFilters) {
                if (campo === 'caso') {
                  if (!morph.includes(valor.toLowerCase())) return false;
                } else if (campo === 'tipo') {
                  if (!morph.includes(valor.toLowerCase())) return false;
                } else if (campo === 'tempo') {
                  if (!morph.includes(valor.toLowerCase())) return false;
                } else if (campo === 'voz') {
                  if (!morph.includes(valor.toLowerCase())) return false;
                } else if (campo === 'modo') {
                  if (!morph.includes(valor.toLowerCase())) return false;
                } else if (campo === 'pessoa') {
                  const num = valor.replace('ª', '');
                  const personWords = num === '1' ? ['primeira', '1st', '1st.', '1a', '1ª'] : num === '2' ? ['segunda', '2nd', '2nd.', '2a', '2ª'] : ['terceira', '3rd', '3rd.', '3a', '3ª'];
                  const match = personWords.some(w => morph.includes(`${w} pessoa`) || morph.includes(`${w} person`)) || morph.includes(`p${num}`) || morph.includes(`${num}p`);
                  if (!match) return false;
                } else if (campo === 'numero') {
                  if (!morph.includes(valor.toLowerCase())) return false;
                } else if (campo === 'genero') {
                  if (!morph.includes(valor.toLowerCase())) return false;
                }
              }
              if (q && q.length >= 2) {
                const termo = q.toLowerCase();
                const matchText = (entry.palavra || '').toLowerCase() + ' ' + (entry.transliteracao || '').toLowerCase() + ' ' + (entry.definicao || '').toLowerCase();
                if (!matchText.includes(termo)) return false;
              }
              return true;
            });
            setLexiconResults(filtered.slice(0, 100));
          } catch {
            setLexiconResults([]);
          }
        } else {
          const apiData = await tryApiSearch(q);
          if (apiData && apiData.length > 0) {
            setApiResults(apiData);
          } else {
            setApiResults(null);
          }
        }
      } else {
        setApiResults(null);
        setLexiconResults([]);
      }
      setDebouncedQuery(query);
      setSearchTime(Date.now() - startTime);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query, tryApiSearch, buscaSemantica, searchMode, isExactPhrase, morphFilters]);

  const livrosFiltrados = useMemo(
    () => TODOS_LIVROS.filter((l) => testamento === 'all' || l.testamento === testamento),
    [testamento]
  );

  const selectedBook = useMemo(
    () => TODOS_LIVROS.find((l) => l.abreviacao === livroFiltro),
    [livroFiltro]
  );

  const resultados = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q && testamento === 'all' && livroFiltro === 'all' && capituloFiltro === null && tradSel.size === 6 && !capituloDe && !capituloAte) return [];

    let r = apiResults || [];

    if (testamento !== 'all') r = r.filter((item) => item.testamento === testamento);
    if (livroFiltro !== 'all') r = r.filter((item) => item.livroAbrev === livroFiltro);
    if (capituloFiltro !== null) {
      r = r.filter((item) => item.capitulo === capituloFiltro);
    } else if (capituloDe !== null && capituloAte !== null) {
      r = r.filter((item) => item.capitulo >= capituloDe && item.capitulo <= capituloAte);
    } else if (capituloDe !== null) {
      r = r.filter((item) => item.capitulo >= capituloDe);
    } else if (capituloAte !== null) {
      r = r.filter((item) => item.capitulo <= capituloAte);
    }

    return r;
  }, [debouncedQuery, testamento, livroFiltro, capituloFiltro, capituloDe, capituloAte, tradSel, apiResults]);

  const hasFilters = testamento !== 'all' || livroFiltro !== 'all' || capituloFiltro !== null || capituloDe !== null || capituloAte !== null || tradSel.size !== 6 || isExactPhrase;
  const hasAnyInput = !!debouncedQuery || hasFilters;

  const limpar = () => {
    setQuery('');
    setDebouncedQuery('');
    setTestamento('all');
    setLivroFiltro('all');
    setCapituloFiltro(null);
    setCapituloDe(null);
    setCapituloAte(null);
    setTradSel(new Set(['arc', 'nvi', 'ara', 'acf', 'kjv', 'web']));
    setSearchMode('contains');
    setIsExactPhrase(false);
    setSearchTime(null);
    setLexiconResults([]);
    setMorphFilters({});
    inputRef.current?.focus();
  };

  const copyResult = async (result: SearchResult) => {
    const text = `${result.livroNome} ${result.capitulo}:${result.versiculo}\n${result.texto}`;
    await navigator.clipboard.writeText(text);
    setCopiedResult(`${result.traducao}-${result.capitulo}-${result.versiculo}`);
    setTimeout(() => setCopiedResult(null), 2000);
  };

  const shareResult = async (result: SearchResult) => {
    if (navigator.share) {
      await navigator.share({
        title: `${result.livroNome} ${result.capitulo}:${result.versiculo}`,
        text: `${result.livroNome} ${result.capitulo}:${result.versiculo}\n\n${result.texto}`,
      });
    }
  };

  const exportResults = () => {
    const text = resultados.map(r => 
      `${r.livroNome} ${r.capitulo}:${r.versiculo} [${r.traducao.toUpperCase()}]\n${r.texto}`
    ).join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pesquisa-${debouncedQuery || 'resultados'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    query, setQuery,
    searchMode, setSearchMode,
    testamento, setTestamento,
    livroFiltro, setLivroFiltro,
    capituloFiltro, setCapituloFiltro,
    capituloDe, setCapituloDe,
    capituloAte, setCapituloAte,
    tradSel, alternarTrad,
    loading,
    copiedResult,
    buscaSemantica, setBuscaSemantica,
    lexiconResults,
    isExactPhrase, setIsExactPhrase,
    searchTime,
    morphFilters, setMorphFilters,
    inputRef,
    livrosFiltrados,
    selectedBook,
    resultados,
    hasFilters,
    hasAnyInput,
    debouncedQuery,
    limpar,
    copyResult,
    shareResult,
    exportResults,
  };
}
