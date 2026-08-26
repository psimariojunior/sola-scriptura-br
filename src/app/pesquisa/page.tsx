'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { biblia } from '@/lib/api-client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, BookOpen, Filter, ChevronDown, 
  Settings, Hash, Type, AlignLeft, Download,
  Copy, Share2, ExternalLink, Sparkles, Languages
} from 'lucide-react';
import { VoiceSearchButton } from '@/components/VoiceSearchButton';
import { obterQueryExpandida } from '@/lib/sinonimos';
import { useTranslation } from 'react-i18next';

const lexiconHebraico = () => import('@/data/lexicon/hebraico');
const lexiconGrego = () => import('@/data/lexicon/grego');

interface SearchResult {
  livroAbrev: string;
  livroNome: string;
  testamento: 'AT' | 'NT';
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

const TRAD_SELECIONAVEIS = [
  { id: 'arc', nome: 'ARC', descricao: 'Almeida Revista e Corrigida' },
  { id: 'nvi', nome: 'NVI', descricao: 'Nova Versão Internacional' },
  { id: 'ara', nome: 'ARA', descricao: 'Almeida Revista e Atualizada' },
  { id: 'acf', nome: 'ACF', descricao: 'Almeida Corrigida Fiel' },
  { id: 'kjv', nome: 'KJV', descricao: 'King James Version' },
  { id: 'web', nome: 'WEB', descricao: 'World English Bible' },
];

const SEARCH_MODES = [
  { id: 'contains', label: 'Contém', icon: AlignLeft, description: 'Busca parcial' },
  { id: 'exact', label: 'Exato', icon: Type, description: 'Frase exata' },
  { id: 'startsWith', label: 'Começa com', icon: Hash, description: 'Início da frase' },
  { id: 'regex', label: 'Regex', icon: Settings, description: 'Padrão regular' },
  { id: 'strongs', label: "Strong's", icon: Hash, description: 'Número Strong' },
  { id: 'morphology', label: 'Morfologia', icon: Languages, description: 'Busca gramatical' },
];

const MORPHOLOGY_FILTERS = {
  tipo: {
    label: 'Tipo',
    options: ['substantivo', 'verbo', 'adjetivo', 'advérbio', 'preposição', 'conjunção', 'pronome', 'numeral', 'partícula', 'interjeição'],
  },
  tempo: {
    label: 'Tempo Verbal',
    options: ['presente', 'pretérito', 'imperfeito', 'aoristo', 'futuro', 'perfeito', 'pluperfeito'],
  },
  voz: {
    label: 'Voz',
    options: ['ativa', 'passiva', 'média', 'passiva/média'],
  },
  modo: {
    label: 'Modo',
    options: ['indicativo', 'subjuntivo', 'imperativo', 'optativo', 'infinitivo', 'particípio'],
  },
  pessoa: {
    label: 'Pessoa',
    options: ['1ª', '2ª', '3ª'],
  },
  numero: {
    label: 'Número',
    options: ['singular', 'plural'],
  },
  genero: {
    label: 'Gênero',
    options: ['masculino', 'feminino', 'neutro', 'comum'],
  },
  caso: {
    label: 'Caso',
    options: ['nominativo', 'genitivo', 'dativo', 'acusativo', 'vocativo'],
  },
};

function highlightText(text: string, query: string, mode: string, isExactPhrase: boolean) {
  if (!query.trim()) return text;
  
  try {
    let pattern: string;
    
    if (isExactPhrase) {
      pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    } else {
      switch (mode) {
        case 'exact':
          pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          break;
        case 'startsWith':
          pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\S*';
          break;
        case 'regex':
          pattern = query;
          break;
        default:
          const words = query.trim().split(/\s+/).filter(w => w.length > 1);
          if (words.length > 1) {
            pattern = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
          } else {
            pattern = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
          }
      }
    }
    
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <mark key={i} className="bg-primary/20 text-foreground px-0.5 rounded-sm font-medium">{part}</mark>
        : part
    );
  } catch {
    return text;
  }
}

const COR_TRADUCAO: Record<string, string> = {
  arc: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  nvi: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  ara: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  acf: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  kjv: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  web: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};

export default function PesquisaPage() {
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
  const [mobileFilters, setMobileFilters] = useState(false);
  const [copiedResult, setCopiedResult] = useState<string | null>(null);
  const [buscaSemantica, setBuscaSemantica] = useState(true);
  const [lexiconResults, setLexiconResults] = useState<any[]>([]);
  const [isExactPhrase, setIsExactPhrase] = useState(false);
  const [searchTime, setSearchTime] = useState<number | null>(null);
  const [morphFilters, setMorphFilters] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

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
                  if (!morph.includes(`${valor} pessoa`) && !morph.includes(`${valor}a pessoa`) && !morph.includes(`${valor}st person`) && !morph.includes(`${valor}nd person`) && !morph.includes(`${valor}rd person`)) return false;
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

  return (
    <PageShell maxWidth="7xl">
          <div className="mb-8">
            <h1 className="text-h1 mb-2">{t('pesquisa.title')}</h1>
            <p className="text-muted-foreground">{t('pesquisa.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <aside className="sola-card p-4 h-fit lg:sticky lg:top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Filter className="w-4 h-4" strokeWidth={1.5} />
                  {t('pesquisa.filters')}
                </h2>
                <button
                  className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileFilters(!mobileFilters)}
                  aria-label={t('pesquisa.toggleFilters')}
                >
                  {mobileFilters ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <div className={`space-y-5 ${mobileFilters ? '' : 'hidden lg:block'}`}>
                {/* Exact Phrase Toggle */}
                <div>
                  <button
                    onClick={() => setIsExactPhrase(!isExactPhrase)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-sm transition-all ${
                      isExactPhrase
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'
                    }`}
                  >
                    <Type className="w-3.5 h-3.5" />
                    <span className="font-semibold">Busca por frase exata</span>
                    <span className={`ml-auto w-8 h-4 rounded-full relative transition-colors ${
                      isExactPhrase ? 'bg-primary' : 'bg-border'
                    }`}>
                      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                        isExactPhrase ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </span>
                  </button>
                  {isExactPhrase && (
                    <p className="text-[10px] text-muted-foreground mt-1 px-1 leading-relaxed">
                      Busca pela frase exata como digitada. Desative para buscar palavra por palavra.
                    </p>
                  )}
                </div>

                {/* Search Mode */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.searchMode')}</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {SEARCH_MODES.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setSearchMode(mode.id)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-sm transition-colors ${
                          searchMode === mode.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                        title={mode.description}
                      >
                        <mode.icon className="w-3 h-3" />
                        <span className="truncate">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Semantic Search Toggle */}
                <div>
                  <button
                    onClick={() => setBuscaSemantica(!buscaSemantica)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-sm transition-all ${
                      buscaSemantica
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="font-semibold">{t('pesquisa.semanticSearch')}</span>
                    <span className={`ml-auto w-8 h-4 rounded-full relative transition-colors ${
                      buscaSemantica ? 'bg-primary' : 'bg-border'
                    }`}>
                      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                        buscaSemantica ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </span>
                  </button>
                  {buscaSemantica && (
                    <p className="text-[10px] text-muted-foreground mt-1 px-1 leading-relaxed">
                      {t('pesquisa.semanticHint')}
                    </p>
                  )}
                </div>

                {/* Morphology Filters */}
                {searchMode === 'morphology' && (
                  <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Languages className="w-3 h-3" />
                      Filtros Morfológicos
                    </p>
                    {Object.entries(MORPHOLOGY_FILTERS).map(([campo, config]) => (
                      <div key={campo}>
                        <label className="block text-[10px] font-medium text-muted-foreground mb-1">{config.label}</label>
                        <select
                          value={morphFilters[campo] || ''}
                          onChange={(e) => setMorphFilters(prev => ({ ...prev, [campo]: e.target.value }))}
                          className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                        >
                          <option value="">Todos</option>
                          {config.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                    {Object.values(morphFilters).some(v => v) && (
                      <button
                        onClick={() => setMorphFilters({})}
                        className="w-full text-[10px] text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        Limpar filtros
                      </button>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.translation')}</label>
                  <div className="space-y-1.5">
                    {TRAD_SELECIONAVEIS.map((trad) => (
                      <label
                        key={trad.id}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={tradSel.has(trad.id)}
                          onChange={() => alternarTrad(trad.id)}
                          className="accent-primary"
                        />
                        <span className="font-medium">{trad.nome}</span>
                        <span className="text-xs text-muted-foreground hidden 2xl:inline">{trad.descricao}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.testament')}</label>
                  <div className="flex gap-1">
                    {(['all', 'AT', 'NT'] as const).map((test) => (
                      <button
                        key={test}
                        onClick={() => { setTestamento(test); setLivroFiltro('all'); setCapituloFiltro(null); }}
                        className={`flex-1 text-xs py-2 rounded-sm transition-colors ${
                          testamento === test
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {test === 'all' ? t('common.all') : test}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.book')}</label>
                  <select
                    value={livroFiltro}
                    onChange={(e) => { setLivroFiltro(e.target.value); setCapituloFiltro(null); }}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="all">{t('pesquisa.allBooks')}</option>
                    {livrosFiltrados.map((l) => (
                      <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>
                    ))}
                  </select>
                </div>

                {selectedBook && (
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.chapter')} (intervalo)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={selectedBook.totalCapitulos}
                        placeholder="De"
                        value={capituloDe ?? ''}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          setCapituloDe(val);
                          setCapituloFiltro(null);
                        }}
                        className="flex-1 px-2 py-1.5 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-0"
                      />
                      <span className="text-muted-foreground text-xs">até</span>
                      <input
                        type="number"
                        min={1}
                        max={selectedBook.totalCapitulos}
                        placeholder="Até"
                        value={capituloAte ?? ''}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          setCapituloAte(val);
                          setCapituloFiltro(null);
                        }}
                        className="flex-1 px-2 py-1.5 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-0"
                      />
                    </div>
                    {(capituloDe !== null || capituloAte !== null) && (
                      <button
                        onClick={() => { setCapituloDe(null); setCapituloAte(null); }}
                        className="text-[10px] text-muted-foreground hover:text-foreground mt-1 px-1"
                      >
                        Limpar intervalo
                      </button>
                    )}
                  </div>
                )}

                {hasAnyInput && (
                  <button
                    onClick={limpar}
                    className="w-full text-xs py-2 border border-border rounded-sm text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    {t('pesquisa.clearFilters')}
                  </button>
                )}
              </div>
            </aside>

            <div>
              <div className="sola-card p-4 mb-6">
                <div className="relative flex items-center gap-2">
                  <label htmlFor="pesquisa-input" className="sr-only">{t('pesquisa.searchPlaceholder', 'Pesquisar na Bíblia')}</label>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                  <input
                    ref={inputRef}
                    id="pesquisa-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchMode === 'strongs' ? 'Ex: H1234, G3056, 1234...' : t('pesquisa.searchPlaceholder')}
                    className="w-full pl-12 pr-14 sm:pr-24 py-3 bg-transparent text-lg font-serif-body focus:outline-none"
                    autoFocus
                    aria-describedby="pesquisa-results-count"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {query && (
                      <button
                        onClick={() => setQuery('')}
                        className="text-muted-foreground hover:text-foreground p-1"
                        aria-label={t('pesquisa.clearSearch')}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <VoiceSearchButton
                      onResult={(text) => setQuery(text)}
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              {/* Results header */}
              {!!debouncedQuery && !loading && (
                <div className="mb-4 flex items-center justify-between" aria-live="polite" aria-atomic="true" id="pesquisa-results-count">
                  <div className="text-sm text-muted-foreground">
                    {resultados.length > 0 ? (
                      <span>
                        <strong className="text-foreground">{resultados.length}</strong> resultado{resultados.length !== 1 ? 's' : ''} encontrado{resultados.length !== 1 ? 's' : ''} em{' '}
                        <strong className="text-foreground">{searchTime !== null ? (searchTime / 1000).toFixed(1) : '0.0'}s</strong>
                        {' '}&mdash;{' '}&ldquo;<strong className="text-foreground">{debouncedQuery}</strong>&rdquo;
                        {buscaSemantica && searchMode !== 'strongs' && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded-full">
                            <Sparkles className="w-2.5 h-2.5" />
                            {t('pesquisa.semantic')}
                          </span>
                        )}
                      </span>
                    ) : searchMode === 'strongs' && lexiconResults.length > 0 ? (
                      <span>
                        <strong className="text-foreground">{lexiconResults.length}</strong> entrada{lexiconResults.length !== 1 ? 's' : ''} no lexicon para &ldquo;<strong className="text-foreground">{debouncedQuery}</strong>&rdquo;
                      </span>
                    ) : (
                      <span>{t('pesquisa.noResultsFor')} &ldquo;<strong className="text-foreground">{debouncedQuery}</strong>&rdquo;</span>
                    )}
                  </div>
                  {resultados.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={exportResults}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border border-border rounded-sm hover:bg-muted transition-colors"
                        aria-label={t('pesquisa.export', 'Exportar resultados')}
                      >
                        <Download className="w-3 h-3" />
                        {t('pesquisa.export')}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {loading && (
                <div className="sola-card p-12 text-center" role="status" aria-live="polite">
                  <div className="inline-flex gap-1.5" aria-hidden="true">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{t('pesquisa.searching')}</p>
                </div>
              )}

              {!loading && !hasAnyInput && (
                <div className="sola-card p-12 text-center">
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
                  <p className="font-display text-xl text-muted-foreground mb-1">{t('pesquisa.typeToSearch')}</p>
                  <p className="text-sm text-muted-foreground/70">
                    {t('pesquisa.typeDesc')}
                  </p>
                </div>
              )}

              {!loading && hasAnyInput && resultados.length === 0 && !(searchMode === 'strongs' && lexiconResults.length > 0) && (
                <div className="sola-card p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" strokeWidth={1} />
                  <p className="font-display text-xl text-muted-foreground mb-1">{t('pesquisa.noResults')}</p>
                  <p className="text-sm text-muted-foreground/70">
                    {t('pesquisa.tryDifferent')}
                  </p>
                </div>
              )}

              {searchMode === 'strongs' && !loading && lexiconResults.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      Lexicon ({lexiconResults.length} resultado{lexiconResults.length !== 1 ? 's' : ''})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lexiconResults.map((entry, i) => (
                      <motion.div
                        key={`${entry.idioma}-${entry.strong || entry.strongs || entry.numero}-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.2 }}
                      >
                        <div className="sola-card p-4 h-full flex flex-col">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm ${
                              entry.idioma === 'hebraico'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                            }`}>
                              {entry.idioma === 'hebraico' ? 'Hebraico' : 'Grego'}
                            </span>
                            <span className="text-xs font-mono text-primary font-semibold">
                              {entry.strong || entry.strongs || entry.numero}
                            </span>
                          </div>
                          <p className="font-serif-body text-lg font-semibold mb-0.5" dir={entry.idioma === 'hebraico' ? 'rtl' : 'ltr'}>
                            {entry.palavra || entry.word || entry.hebrew || entry.greek}
                          </p>
                          {(entry.transliteracao || entry.transliteration) && (
                            <p className="text-xs text-muted-foreground italic mb-1">
                              {entry.transliteracao || entry.transliteration}
                            </p>
                          )}
                          {(entry.morfologia || entry.morphology) && (
                            <p className="text-[10px] text-muted-foreground/80 mb-1.5">
                              {entry.morfologia || entry.morphology}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-4">
                            {entry.definicao || entry.definition || entry.meaning}
                          </p>
                          <button
                            onClick={() => {
                              const word = entry.palavra || entry.word || entry.hebrew || entry.greek || '';
                              if (word) {
                                setQuery(word);
                                setSearchMode('contains');
                              }
                            }}
                            className="mt-3 text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                          >
                            <BookOpen className="w-3 h-3" />
                            Ver versículos
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!loading && resultados.length > 0 && (
                  <motion.div
                    key={`${debouncedQuery}-${searchMode}-${testamento}-${livroFiltro}-${capituloFiltro}-${[...tradSel].sort().join(',')}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {resultados.slice(0, 100).map((r, i) => (
                      <motion.div
                        key={`${r.traducao}-${r.livroAbrev}-${r.capitulo}-${r.versiculo}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.5), duration: 0.2 }}
                      >
                        <div className="sola-card p-5 group">
                          <div className="flex items-start justify-between gap-4">
                            <Link
                              href={`/biblia?livro=${r.livroAbrev}&capitulo=${r.capitulo}`}
                              className="flex-1"
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${COR_TRADUCAO[r.traducao]}`}>
                                  {r.traducao.toUpperCase()}
                                </span>
                                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-sm">
                                  {r.livroNome}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {r.capitulo}:{r.versiculo}
                                </span>
                              </div>
                              <p className="font-serif-body text-base leading-relaxed">
                                <sup className="text-primary font-semibold text-xs mr-1">{r.versiculo}</sup>
                                {highlightText(r.texto, debouncedQuery, searchMode, isExactPhrase)}
                              </p>
                            </Link>
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:sm:opacity-100 transition-opacity">
                              <button
                                onClick={() => copyResult(r)}
                                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                                title={t('pesquisa.copy')}
                                aria-label={t('pesquisa.copy', 'Copiar versículo')}
                              >
                                {copiedResult === `${r.traducao}-${r.capitulo}-${r.versiculo}` ? (
                                  <span className="text-green-500 text-xs">{t('pesquisa.copied')}</span>
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => shareResult(r)}
                                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                                title={t('pesquisa.share')}
                                aria-label={t('pesquisa.share', 'Compartilhar versículo')}
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                              <Link
                                href={`/biblia?livro=${r.livroAbrev}&capitulo=${r.capitulo}`}
                                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                                title={t('pesquisa.goToBible')}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
    </PageShell>
  );
}
