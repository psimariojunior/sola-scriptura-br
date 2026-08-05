'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, GitBranch, BarChart3, Zap, BookOpen } from 'lucide-react';
import { crossReferencesMap, type CrossReference } from '@/data/biblia/crossReferences';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import Link from 'next/link';

const TYPE_LABELS: Record<CrossReference['type'], string> = {
  parallel: 'Paralelos',
  fulfillment: 'Cumprimento',
  quotation: 'Citação',
  contrast: 'Contraste',
  thematic: 'Temático',
  typology: 'Tipologia',
};

const TYPE_COLORS_HEX: Record<CrossReference['type'], string> = {
  parallel: '#3b82f6',
  fulfillment: '#10b981',
  quotation: '#f59e0b',
  contrast: '#f43f5e',
  thematic: '#8b5cf6',
  typology: '#06b6d4',
};

const TYPE_COLORS_BG: Record<CrossReference['type'], string> = {
  parallel: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  fulfillment: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  quotation: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  contrast: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  thematic: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  typology: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
};

const TYPE_COLORS_DOT: Record<CrossReference['type'], string> = {
  parallel: 'bg-blue-500',
  fulfillment: 'bg-emerald-500',
  quotation: 'bg-amber-500',
  contrast: 'bg-rose-500',
  thematic: 'bg-violet-500',
  typology: 'bg-cyan-500',
};

const allKeys = Object.keys(crossReferencesMap);

function parseVerseQuery(query: string): { book: string; chapter: number; verse: number } | null {
  const normalized = query.trim().replace(/\s+/g, ' ');
  const match = normalized.match(/^(\d?\s*[A-Za-zÀ-ú]+)\s+(\d+):(\d+)/);
  if (!match) return null;
  const bookPart = match[1].trim().toLowerCase();
  const chapter = parseInt(match[2], 10);
  const verse = parseInt(match[3], 10);
  if (isNaN(chapter) || isNaN(verse) || chapter < 1 || verse < 1) return null;

  const matchBook = TODOS_LIVROS.find(
    (l) =>
      l.abreviacao.toLowerCase() === bookPart ||
      l.nome.toLowerCase() === bookPart ||
      l.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === bookPart
  );
  if (!matchBook) return null;
  return { book: matchBook.abreviacao, chapter, verse };
}

function refToNav(ref: string): { abrev: string; cap: string } | null {
  const match = ref.match(/^(\d?\s*[A-Za-zÀ-ú]+)\s+(\d+)/);
  if (!match) return null;
  const bookPart = match[1].trim().toLowerCase();
  const chapter = match[2];
  const found = TODOS_LIVROS.find(
    (l) =>
      l.abreviacao.toLowerCase() === bookPart ||
      l.nome.toLowerCase() === bookPart ||
      l.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === bookPart
  );
  if (!found) return null;
  return { abrev: found.abreviacao, cap: chapter };
}

export default function ReferenciasPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CrossReference[]>([]);
  const [searchedVerse, setSearchedVerse] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const term = query.toLowerCase();
    return allKeys.filter((r) => r.toLowerCase().includes(term)).slice(0, 8);
  }, [query]);

  const stats = useMemo(() => {
    if (results.length === 0) return null;
    const byType: Record<string, number> = {};
    for (const r of results) {
      byType[r.type] = (byType[r.type] || 0) + 1;
    }
    return { total: results.length, byType };
  }, [results]);

  const graphData = useMemo(() => {
    if (results.length === 0) return null;
    const nodes: { ref: string; type: CrossReference['type']; description?: string; isCenter: boolean }[] = [];
    const seen = new Set<string>();
    nodes.push({ ref: searchedVerse, type: 'thematic', isCenter: true });
    seen.add(searchedVerse);
    for (const r of results) {
      if (!seen.has(r.to)) {
        nodes.push({ ref: r.to, type: r.type, description: r.description, isCenter: false });
        seen.add(r.to);
      }
    }
    return nodes;
  }, [results, searchedVerse]);

  const handleSearch = useCallback(
    (q: string) => {
      const parsed = parseVerseQuery(q);
      if (!parsed) return;
      const refs = crossReferencesMap[`${parsed.book}/${parsed.chapter}/${parsed.verse}`] || [];
      setResults(refs);
      setSearchedVerse(q.trim());
      setHasSearched(true);
    },
    []
  );

  const handleSelectSuggestion = useCallback(
    (s: string) => {
      setQuery(s);
      handleSearch(s);
    },
    [handleSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setSearchedVerse('');
    setHasSearched(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch(query);
      }
    },
    [query, handleSearch]
  );

  const quickRefs = ['Gn 1:1', 'Jo 3:16', 'Sl 23:1', 'Rm 8:28', 'Fp 4:13', 'Ef 2:8', 'Sl 110:1', 'Is 53:5'];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center border border-indigo-500/20">
              <GitBranch className="w-10 h-10 text-indigo-500" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-light mb-3">
              Referências <span className="text-primary italic">Cruzadas</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
              Explore conexões entre versículos. Pesquise uma referência para visualizar o grafo de relações.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-lg mx-auto mb-8"
          >
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ex: Gn 1:1, João 3:16, Sl 23:1"
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && !hasSearched && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="rounded-xl border border-border bg-card overflow-hidden mb-4"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSelectSuggestion(s)}
                      className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors text-sm border-b border-border/50 last:border-0"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quick refs when empty */}
          {!hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-8"
            >
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm mb-4">Pressione Enter ou clique em uma referência para explorar</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickRefs.map((ref) => {
                  if (!allKeys.includes(ref)) return null;
                  return (
                    <button
                      key={ref}
                      onClick={() => handleSelectSuggestion(ref)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted/50 transition-all hover:border-primary/50"
                    >
                      {ref}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="glass-card rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-medium">Estatísticas</h3>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {stats.total} referência{stats.total !== 1 ? 's' : ''}
                  </div>
                  {Object.entries(stats.byType)
                    .sort(([, a], [, b]) => b - a)
                    .map(([type, count]) => (
                      <div
                        key={type}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${TYPE_COLORS_BG[type as CrossReference['type']]}`}
                      >
                        {TYPE_LABELS[type as CrossReference['type']]}: {count}
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Legend */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(TYPE_LABELS).map(([type, label]) => (
                  <div key={type} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: TYPE_COLORS_HEX[type as CrossReference['type']] }}
                    />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Graph visualization */}
          {graphData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl border border-border/50 p-4 sm:p-6 overflow-x-auto"
            >
              <h2 className="font-display text-lg font-medium mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Grafo de Referências
              </h2>

              {/* Desktop: radial layout */}
              <div className="hidden md:block">
                <div className="relative min-h-[480px]">
                  {/* SVG lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    {graphData.slice(1).map((node, i) => {
                      const angle = (i / (graphData.length - 1)) * 2 * Math.PI - Math.PI / 2;
                      const radiusX = 320;
                      const radiusY = 200;
                      const cx = 50 + (Math.cos(angle) * radiusX / 640) * 100;
                      const cy = 50 + (Math.sin(angle) * radiusY / 480) * 100;
                      return (
                        <line
                          key={node.ref}
                          x1="50%"
                          y1="50%"
                          x2={`${cx}%`}
                          y2={`${cy}%`}
                          stroke={TYPE_COLORS_HEX[node.type]}
                          strokeWidth="1.5"
                          strokeDasharray="6 3"
                          opacity="0.4"
                        />
                      );
                    })}
                  </svg>

                  {/* Center node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <div className="glass-card rounded-xl px-5 py-3 border-2 border-primary/40 bg-primary/5 shadow-lg shadow-primary/10 text-center">
                      <div className="text-sm font-semibold text-primary">{searchedVerse}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{results.length} conexões</div>
                    </div>
                  </motion.div>

                  {/* Branch nodes */}
                  {graphData.slice(1).map((node, i) => {
                    const angle = (i / (graphData.length - 1)) * 2 * Math.PI - Math.PI / 2;
                    const radiusX = 320;
                    const radiusY = 200;
                    const x = 50 + (Math.cos(angle) * radiusX / 640) * 100;
                    const y = 50 + (Math.sin(angle) * radiusY / 480) * 100;
                    const nav = refToNav(node.ref);
                    return (
                      <motion.div
                        key={node.ref}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i, type: 'spring', stiffness: 180, damping: 15 }}
                        className="absolute z-10"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {nav ? (
                          <Link
                            href={`/biblia?livro=${nav.abrev}&capitulo=${nav.cap}`}
                            className="block glass-card rounded-lg px-3 py-2 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:shadow-md group text-center min-w-[80px]"
                          >
                            <div className="flex items-center gap-1 justify-center mb-1">
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: TYPE_COLORS_HEX[node.type] }}
                              />
                              <span className="text-[9px] font-medium text-muted-foreground">
                                {TYPE_LABELS[node.type]}
                              </span>
                            </div>
                            <div className="text-xs font-medium text-primary group-hover:underline">
                              {node.ref}
                            </div>
                            {node.description && (
                              <div className="text-[9px] text-muted-foreground mt-0.5 max-w-[140px] leading-tight">
                                {node.description}
                              </div>
                            )}
                          </Link>
                        ) : (
                          <div className="glass-card rounded-lg px-3 py-2 border border-border/50 text-center min-w-[80px]">
                            <div className="flex items-center gap-1 justify-center mb-1">
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: TYPE_COLORS_HEX[node.type] }}
                              />
                              <span className="text-[9px] font-medium text-muted-foreground">
                                {TYPE_LABELS[node.type]}
                              </span>
                            </div>
                            <div className="text-xs font-medium">{node.ref}</div>
                            {node.description && (
                              <div className="text-[9px] text-muted-foreground mt-0.5 max-w-[140px] leading-tight">
                                {node.description}
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: stacked cards */}
              <div className="md:hidden space-y-3">
                {/* Center */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-card rounded-xl px-4 py-3 border-2 border-primary/40 bg-primary/5 text-center"
                >
                  <div className="text-sm font-semibold text-primary">{searchedVerse}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{results.length} conexões</div>
                </motion.div>

                {/* Connected verses */}
                {graphData.slice(1).map((node, i) => {
                  const nav = refToNav(node.ref);
                  return (
                    <motion.div
                      key={node.ref}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i }}
                    >
                      {nav ? (
                        <Link
                          href={`/biblia?livro=${nav.abrev}&capitulo=${nav.cap}`}
                          className="block glass-card rounded-lg px-4 py-3 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: TYPE_COLORS_HEX[node.type] }}
                            />
                            <span className="text-[10px] font-medium text-muted-foreground">
                              {TYPE_LABELS[node.type]}
                            </span>
                            <span className="text-xs font-semibold text-primary ml-auto group-hover:underline">
                              {node.ref}
                            </span>
                          </div>
                          {node.description && (
                            <p className="text-[10px] text-muted-foreground mt-1 ml-4 leading-relaxed">
                              {node.description}
                            </p>
                          )}
                        </Link>
                      ) : (
                        <div className="glass-card rounded-lg px-4 py-3 border border-border/50">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: TYPE_COLORS_HEX[node.type] }}
                            />
                            <span className="text-[10px] font-medium text-muted-foreground">
                              {TYPE_LABELS[node.type]}
                            </span>
                            <span className="text-xs font-medium ml-auto">{node.ref}</span>
                          </div>
                          {node.description && (
                            <p className="text-[10px] text-muted-foreground mt-1 ml-4 leading-relaxed">
                              {node.description}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* No results */}
          {hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <GitBranch className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm mb-2">
                Nenhuma referência cruzada encontrada para <strong>{searchedVerse}</strong>
              </p>
              <p className="text-muted-foreground/60 text-xs">
                Tente: Gn 1:1, Jo 3:16, Sl 23:1, Rm 8:28
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
