'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { VerbeteBiblico } from '@/data/dicionarioBiblico';
import { BookText, Search, Heart, ChevronDown, ChevronUp, Filter, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

const CATEGORIAS: { value: string; label: string; color: string }[] = [
  { value: 'all', label: 'Todas', color: 'text-muted-foreground' },
  { value: 'pessoa', label: 'Pessoas', color: 'text-blue-500' },
  { value: 'lugar', label: 'Lugares', color: 'text-emerald-500' },
  { value: 'evento', label: 'Eventos', color: 'text-amber-500' },
  { value: 'instituicao', label: 'Instituições', color: 'text-purple-500' },
  { value: 'doutrina', label: 'Doutrinas', color: 'text-rose-500' },
  { value: 'objeto', label: 'Objetos', color: 'text-orange-500' },
  { value: 'conceito', label: 'Conceitos', color: 'text-cyan-500' },
  { value: 'pratica', label: 'Práticas', color: 'text-teal-500' },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function DicionarioPage() {
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dicionarioBiblico, setDicionarioBiblico] = useState<VerbeteBiblico[]>([]);
  const [dicLoading, setDicLoading] = useState(true);

  useEffect(() => {
    import('@/data/dicionarioBiblico').then(mod => {
      setDicionarioBiblico(mod.dicionarioBiblico);
      setDicLoading(false);
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('dicionario-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('dicionario-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const filtered = useMemo(() => {
    return dicionarioBiblico.filter(v => {
      const matchCat = categoria === 'all' || v.categoria === categoria;
      const matchFav = !showOnlyFavorites || favorites.includes(v.id);
      const q = search.toLowerCase();
      const matchSearch = !search ||
        v.termo.toLowerCase().includes(q) ||
        v.definicao.toLowerCase().includes(q) ||
        v.termoHebraico?.includes(q) ||
        v.termoGrego?.includes(q) ||
        v.transliteracao?.toLowerCase().includes(q) ||
        v.notas?.toLowerCase().includes(q) ||
        v.significadoTeologico?.toLowerCase().includes(q);
      return matchCat && matchFav && matchSearch;
    });
  }, [search, categoria, showOnlyFavorites, favorites, dicionarioBiblico]);

  const groupedByLetter = useMemo(() => {
    const groups: Record<string, VerbeteBiblico[]> = {};
    for (const v of filtered) {
      const letter = v.termo[0]?.toUpperCase() || '?';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(v);
    }
    return groups;
  }, [filtered]);

  const availableLetters = useMemo(() => {
    return new Set(Object.keys(groupedByLetter));
  }, [groupedByLetter]);

  const scrollToLetter = (letter: string) => {
    letterRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stats = useMemo(() => {
    const cats: Record<string, number> = {};
    for (const v of dicionarioBiblico) {
      cats[v.categoria] = (cats[v.categoria] || 0) + 1;
    }
    return cats;
  }, [dicionarioBiblico]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {dicLoading ? (
            <div className="text-center py-20">
              <div className="animate-pulse">
                <div className="h-8 w-48 bg-muted/30 rounded mx-auto mb-4" />
                <div className="h-4 w-64 bg-muted/20 rounded mx-auto" />
              </div>
              <p className="text-muted-foreground text-sm mt-4">Carregando dicionário...</p>
            </div>
          ) : (<>
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <BookText className="w-8 h-8 text-rose-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Dicionário <span className="italic text-primary">Bíblico</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                {dicionarioBiblico.length} verbetes que cobrem pessoas, lugares, eventos, doutrinas e conceitos das Escrituras.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
              {CATEGORIAS.filter(c => c.value !== 'all').map(c => (
                <button
                  key={c.value}
                  onClick={() => { setCategoria(c.value); setSearch(''); setShowOnlyFavorites(false); }}
                  className={`sola-card p-3 text-center transition-all hover:scale-105 ${categoria === c.value ? 'ring-2 ring-primary' : ''}`}
                >
                  <p className={`font-display text-xl font-light ${c.color}`}>{stats[c.value] || 0}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{c.label}</p>
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="sola-card p-4 mb-6 space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Pesquisar verbetes... (hebraico, grego, transliteração)"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-background/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                  {search && (
                    <button
                      onClick={() => { setSearch(''); searchInputRef.current?.focus(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => { setShowOnlyFavorites(!showOnlyFavorites); setCategoria('all'); }}
                  className={`px-3 py-2.5 rounded-lg border text-sm flex items-center gap-1.5 transition-all ${
                    showOnlyFavorites ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-background/50 border-border/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{favorites.length}</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                {CATEGORIAS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => { setCategoria(c.value); setShowOnlyFavorites(false); }}
                    className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                      categoria === c.value
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                {ALPHABET.map(letter => (
                  <button
                    key={letter}
                    onClick={() => scrollToLetter(letter)}
                    disabled={!availableLetters.has(letter)}
                    className={`w-7 h-7 rounded text-xs font-medium transition-all ${
                      availableLetters.has(letter)
                        ? 'text-foreground hover:bg-primary/10 hover:text-primary'
                        : 'text-muted-foreground/30 cursor-default'
                    } ${activeLetter === letter ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="mb-4 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'verbete encontrado' : 'verbetes encontrados'}
          </div>

          <div className="space-y-6">
            {Object.keys(groupedByLetter).sort().map(letter => (
              <div key={letter} ref={el => { letterRefs.current[letter] = el; }}>
                <div className="sticky top-20 z-10 -mx-1 mb-2">
                  <div className="bg-background/80 backdrop-blur-md border-b border-border/50 py-1 px-1">
                    <span className="font-display text-2xl font-light text-primary">{letter}</span>
                    <span className="text-xs text-muted-foreground ml-2">({groupedByLetter[letter].length})</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {groupedByLetter[letter].map((verbete, idx) => {
                    const isExpanded = expandedId === verbete.id;
                    const isFav = favorites.includes(verbete.id);
                    const catInfo = CATEGORIAS.find(c => c.value === verbete.categoria);
                    return (
                      <motion.div
                        key={verbete.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.01 }}
                        className={`sola-card overflow-hidden transition-all ${isExpanded ? 'ring-1 ring-primary/30' : ''}`}
                      >
                        <div
                          className="p-4 cursor-pointer"
                          onClick={() => setExpandedId(isExpanded ? null : verbete.id)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display text-lg font-medium truncate">{verbete.termo}</h3>
                                {catInfo && (
                                  <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${catInfo.color} border-current/20 bg-current/5 shrink-0`}>
                                    {catInfo.label}
                                  </span>
                                )}
                              </div>
                              {(verbete.termoHebraico || verbete.termoGrego || verbete.termoAramaico || verbete.termoLatim) && (
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-1">
                                  {verbete.termoHebraico && <span dir="rtl" className="font-hebrew">{verbete.termoHebraico}</span>}
                                  {verbete.termoGrego && <span className="font-greek">{verbete.termoGrego}</span>}
                                  {verbete.termoAramaico && <span dir="rtl" className="font-hebrew">{verbete.termoAramaico}</span>}
                                  {verbete.termoLatim && <span className="italic">{verbete.termoLatim}</span>}
                                </div>
                              )}
                              {verbete.transliteracao && (
                                <p className="text-xs text-muted-foreground/80 italic">{verbete.transliteracao}</p>
                              )}
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{verbete.definicao}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={e => { e.stopPropagation(); toggleFavorite(verbete.id); }}
                                className="p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                              >
                                <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-current' : 'text-muted-foreground/50'}`} />
                              </button>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-0 border-t border-border/30 space-y-3 mt-1">
                                {verbete.etimologia && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Etimologia</p>
                                    <p className="text-sm">{verbete.etimologia}</p>
                                  </div>
                                )}
                                {verbete.strongNumber && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Strong&apos;s</p>
                                    <p className="text-sm font-mono text-primary">{verbete.strongNumber}</p>
                                  </div>
                                )}
                                {verbete.usoAntigoTestamento && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Antigo Testamento</p>
                                    <p className="text-sm">{verbete.usoAntigoTestamento}</p>
                                  </div>
                                )}
                                {verbete.usoNovoTestamento && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Novo Testamento</p>
                                    <p className="text-sm">{verbete.usoNovoTestamento}</p>
                                  </div>
                                )}
                                {verbete.significadoTeologico && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Significado Teológico</p>
                                    <p className="text-sm">{verbete.significadoTeologico}</p>
                                  </div>
                                )}
                                {verbete.versicosReferencia && verbete.versicosReferencia.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Versículos</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {verbete.versicosReferencia.map((v, i) => (
                                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/20">
                                          {v}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {verbete.palavrasRelacionadas && verbete.palavrasRelacionadas.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Palavras Relacionadas</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {verbete.palavrasRelacionadas.map((p, i) => (
                                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground">
                                          {p}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {verbete.notas && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Notas</p>
                                    <p className="text-sm text-muted-foreground italic">{verbete.notas}</p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum verbete encontrado.</p>
              <button
                onClick={() => { setSearch(''); setCategoria('all'); setShowOnlyFavorites(false); }}
                className="text-primary text-sm mt-2 hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
          </>)}
        </div>
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
