'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TODOS_LIVROS, carregarTraducao } from '@/data/biblia';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, BookOpen, Filter, ChevronDown, 
  Settings, Hash, Type, AlignLeft, Download,
  Copy, Share2, ExternalLink
} from 'lucide-react';

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

const TRAD_ESTATICAS = ['arc', 'kjv', 'web'];

const SEARCH_MODES = [
  { id: 'contains', label: 'Contém', icon: AlignLeft, description: 'Busca parcial' },
  { id: 'exact', label: 'Exato', icon: Type, description: 'Frase exata' },
  { id: 'startsWith', label: 'Começa com', icon: Hash, description: 'Início da frase' },
  { id: 'regex', label: 'Regex', icon: Settings, description: 'Padrão regular' },
];

function highlightText(text: string, query: string, mode: string) {
  if (!query.trim()) return text;
  
  try {
    let pattern: string;
    
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
        pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <mark key={i} className="bg-primary/20 text-foreground px-0.5 rounded-sm">{part}</mark>
        : part
    );
  } catch {
    return text;
  }
}

type LivroData = Record<string, Record<number, string[]>>;

function buildSearchIndex(data: LivroData, traducao: string): SearchResult[] {
  const index: SearchResult[] = [];
  for (const livro of TODOS_LIVROS) {
    const livroData = data[livro.abreviacao];
    if (!livroData) continue;
    for (const [capStr, versiculos] of Object.entries(livroData)) {
      const cap = Number(capStr);
      versiculos.forEach((texto, i) => {
        index.push({
          livroAbrev: livro.abreviacao,
          livroNome: livro.nome,
          testamento: livro.testamento,
          capitulo: cap,
          versiculo: i + 1,
          texto,
          traducao,
        });
      });
    }
  }
  return index;
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
  const [tradSel, setTradSel] = useState<Set<string>>(new Set(['arc', 'nvi', 'ara', 'acf', 'kjv', 'web']));
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copiedResult, setCopiedResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all(TRAD_ESTATICAS.map((id) => carregarTraducao(id))).then(
      (todos) => {
        const index: SearchResult[] = [];
        TRAD_ESTATICAS.forEach((id, i) => {
          index.push(...buildSearchIndex(todos[i], id));
        });
        setSearchIndex(index);
        setDataLoaded(true);
      }
    );
  }, []);

  const alternarTrad = useCallback((id: string) => {
    setTradSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

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
    if (!q && testamento === 'all' && livroFiltro === 'all' && capituloFiltro === null && tradSel.size === 6) return [];

    let r = searchIndex;

    if (tradSel.size < 3) r = r.filter((item) => tradSel.has(item.traducao));
    
    if (q) {
      r = r.filter((item) => {
        const textoLower = item.texto.toLowerCase();
        const queryLower = q.toLowerCase();
        
        switch (searchMode) {
          case 'exact':
            return textoLower.includes(queryLower);
          case 'startsWith':
            return textoLower.split(/\s+/).some(word => word.startsWith(queryLower));
          case 'regex':
            try {
              const regex = new RegExp(q, 'gi');
              return regex.test(item.texto);
            } catch {
              return false;
            }
          default: // contains
            return textoLower.includes(queryLower);
        }
      });
    }
    
    if (testamento !== 'all') r = r.filter((item) => item.testamento === testamento);
    if (livroFiltro !== 'all') r = r.filter((item) => item.livroAbrev === livroFiltro);
    if (capituloFiltro !== null) r = r.filter((item) => item.capitulo === capituloFiltro);

    return r;
  }, [debouncedQuery, testamento, livroFiltro, capituloFiltro, searchIndex, tradSel, searchMode]);

  const hasFilters = testamento !== 'all' || livroFiltro !== 'all' || capituloFiltro !== null || tradSel.size !== 6;
  const hasAnyInput = !!debouncedQuery || hasFilters;

  const limpar = () => {
    setQuery('');
    setDebouncedQuery('');
    setTestamento('all');
    setLivroFiltro('all');
    setCapituloFiltro(null);
    setTradSel(new Set(['arc', 'nvi', 'ara', 'acf', 'kjv', 'web']));
    setSearchMode('contains');
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
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Pesquisa Bíblica</h1>
            <p className="text-muted-foreground">Busque por palavras-chave em todas as traduções disponíveis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <aside className="sola-card p-4 h-fit lg:sticky lg:top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Filter className="w-4 h-4" strokeWidth={1.5} />
                  Filtros
                </h2>
                <button
                  className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileFilters(!mobileFilters)}
                  aria-label="Alternar filtros"
                >
                  {mobileFilters ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <div className={`space-y-5 ${mobileFilters ? '' : 'hidden lg:block'}`}>
                {/* Search Mode */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Modo de Busca</label>
                  <div className="grid grid-cols-2 gap-1.5">
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
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Tradução</label>
                  <div className="space-y-1.5">
                    {TRAD_SELECIONAVEIS.map((t) => (
                      <label
                        key={t.id}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={tradSel.has(t.id)}
                          onChange={() => alternarTrad(t.id)}
                          className="accent-primary"
                        />
                        <span className="font-medium">{t.nome}</span>
                        <span className="text-xs text-muted-foreground hidden 2xl:inline">{t.descricao}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Testamento</label>
                  <div className="flex gap-1">
                    {(['all', 'AT', 'NT'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => { setTestamento(t); setLivroFiltro('all'); setCapituloFiltro(null); }}
                        className={`flex-1 text-xs py-2 rounded-sm transition-colors ${
                          testamento === t
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {t === 'all' ? 'Todos' : t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Livro</label>
                  <select
                    value={livroFiltro}
                    onChange={(e) => { setLivroFiltro(e.target.value); setCapituloFiltro(null); }}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="all">Todos os livros</option>
                    {livrosFiltrados.map((l) => (
                      <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>
                    ))}
                  </select>
                </div>

                {selectedBook && (
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Capítulo</label>
                    <select
                      value={capituloFiltro ?? ''}
                      onChange={(e) => setCapituloFiltro(e.target.value ? Number(e.target.value) : null)}
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Todos os capítulos</option>
                      {Array.from({ length: selectedBook.totalCapitulos }, (_, i) => i + 1).map((c) => (
                        <option key={c} value={c}>Capítulo {c}</option>
                      ))}
                    </select>
                  </div>
                )}

                {hasAnyInput && (
                  <button
                    onClick={limpar}
                    className="w-full text-xs py-2 border border-border rounded-sm text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Limpar filtros
                  </button>
                )}
              </div>
            </aside>

            <div>
              <div className="sola-card p-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pesquisar nas Escrituras..."
                    className="w-full pl-12 pr-10 py-3 bg-transparent text-lg font-serif-body focus:outline-none"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Limpar busca"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results header */}
              {!!debouncedQuery && !loading && (
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {resultados.length > 0 ? (
                      <span>
                        <strong className="text-foreground">{resultados.length}</strong> resultado{resultados.length !== 1 ? 's' : ''} para &ldquo;<strong className="text-foreground">{debouncedQuery}</strong>&rdquo;
                      </span>
                    ) : (
                      <span>Nenhum resultado para &ldquo;<strong className="text-foreground">{debouncedQuery}</strong>&rdquo;</span>
                    )}
                  </div>
                  {resultados.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={exportResults}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border border-border rounded-sm hover:bg-muted transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Exportar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {(!dataLoaded || loading) && (
                <div className="sola-card p-12 text-center">
                  <div className="inline-flex gap-1.5">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{dataLoaded ? 'Buscando...' : 'Carregando textos bíblicos...'}</p>
                </div>
              )}

              {dataLoaded && !loading && !hasAnyInput && (
                <div className="sola-card p-12 text-center">
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
                  <p className="font-display text-xl text-muted-foreground mb-1">Digite para pesquisar</p>
                  <p className="text-sm text-muted-foreground/70">
                    Busque por palavras-chave em todas as Escrituras
                  </p>
                </div>
              )}

              {dataLoaded && !loading && hasAnyInput && resultados.length === 0 && (
                <div className="sola-card p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" strokeWidth={1} />
                  <p className="font-display text-xl text-muted-foreground mb-1">Nenhum resultado encontrado</p>
                  <p className="text-sm text-muted-foreground/70">
                    Tente usar termos diferentes ou limpar os filtros
                  </p>
                </div>
              )}

              <AnimatePresence mode="wait">
                {dataLoaded && !loading && resultados.length > 0 && (
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
                                {highlightText(r.texto, debouncedQuery, searchMode)}
                              </p>
                            </Link>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => copyResult(r)}
                                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                                title="Copiar"
                              >
                                {copiedResult === `${r.traducao}-${r.capitulo}-${r.versiculo}` ? (
                                  <span className="text-green-500 text-xs">Copiado!</span>
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => shareResult(r)}
                                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                                title="Compartilhar"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                              <Link
                                href={`/biblia?livro=${r.livroAbrev}&capitulo=${r.capitulo}`}
                                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                                title="Ir para Bíblia"
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
