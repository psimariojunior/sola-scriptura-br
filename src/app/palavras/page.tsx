'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Search, X, BookOpen, ArrowRight, Hash, ChevronDown, ChevronUp, BarChart3, SortAsc, Filter, Link2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { carregarLexicoGrego, carregarLexicoHebraico } from '@/lib/lexicon-lazy';
import type { PalavraGrega } from '@/data/lexicon/grego';
import type { PalavraHebraica } from '@/data/lexicon/hebraico';

type Idioma = 'grego' | 'hebraico';
type SortBy = 'strong' | 'frequencia' | 'palavra';

export default function PalavrasOriginaisPage() {
  const { t } = useTranslation();
  const [idioma, setIdioma] = useState<Idioma>('grego');
  const [busca, setBusca] = useState('');
  const [expandedStrong, setExpandedStrong] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('strong');
  const [view, setView] = useState<'list' | 'frequency'>('list');
  const [palavrasGregas, setPalavrasGregas] = useState<PalavraGrega[]>([]);
  const [palavrasHebraicas, setPalavrasHebraicas] = useState<PalavraHebraica[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([carregarLexicoGrego(), carregarLexicoHebraico()]).then(([g, h]) => {
      setPalavrasGregas(g);
      setPalavrasHebraicas(h);
      setCarregando(false);
    });
  }, []);

  const palavras = useMemo(() => idioma === 'grego' ? palavrasGregas : palavrasHebraicas, [idioma, palavrasGregas, palavrasHebraicas]);

  const categorias = useMemo(() => {
    const cats = new Set(palavras.map(p => 'categoria' in p ? p.categoria : '').filter(Boolean));
    return [...cats];
  }, [palavras]);

  const filtradas = useMemo(() => {
    let result = palavras;
    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(p =>
        p.palavra.toLowerCase().includes(termo) ||
        p.transliteracao.toLowerCase().includes(termo) ||
        ('definicaoResumida' in p && p.definicaoResumida?.toLowerCase().includes(termo)) ||
        ('definicao' in p && p.definicao?.toLowerCase().includes(termo)) ||
        p.strong.toLowerCase().includes(termo)
      );
    }
    if (filtroCategoria !== 'all' && idioma === 'grego') {
      result = result.filter(p => 'categoria' in p && p.categoria === filtroCategoria);
    }
    if (sortBy === 'frequencia') {
      result = [...result].sort((a, b) => ((b as PalavraGrega).frequencia || 0) - ((a as PalavraGrega).frequencia || 0));
    } else if (sortBy === 'palavra') {
      result = [...result].sort((a, b) => a.palavra.localeCompare(b.palavra));
    }
    return result.slice(0, 200);
  }, [palavras, busca, filtroCategoria, idioma, sortBy]);

  const topFrequent = useMemo(() => {
    const withFreq = palavras.filter(p => (p as PalavraGrega).frequencia && (p as PalavraGrega).frequencia! > 0) as (PalavraGrega | (PalavraHebraica & { frequencia?: number }))[];
    const sorted = [...withFreq].sort((a, b) => ((b as PalavraGrega).frequencia || 0) - ((a as PalavraGrega).frequencia || 0));
    return sorted.slice(0, 20);
  }, [palavras]);

  const maxFreq = useMemo(() => {
    if (topFrequent.length === 0) return 1;
    return (topFrequent[0] as PalavraGrega).frequencia || 1;
  }, [topFrequent]);

  const toggleStrong = useCallback((strong: string) => {
    setExpandedStrong(prev => prev === strong ? null : strong);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-rose-500/20">
                <Languages className="w-10 h-10 text-rose-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">{t('palavras.title1')} <span className="text-primary italic">{t('palavras.title2')}</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                {t('palavras.pageSubtitle', { greekCount: carregando ? '...' : palavrasGregas.length, hebrewCount: carregando ? '...' : palavrasHebraicas.length })}
              </p>
            </div>
          </ScrollReveal>

          {/* Tabs idioma + view */}
          <div className="flex gap-3 mb-6 flex-wrap items-center">
            <div className="flex rounded-xl border border-border overflow-hidden">
              <button onClick={() => setIdioma('grego')}
                className={cn('px-4 py-2.5 text-sm font-medium transition-all', idioma === 'grego' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                🇬🇷 {t('palavras.greekNT')} ({palavrasGregas.length})
              </button>
              <button onClick={() => setIdioma('hebraico')}
                className={cn('px-4 py-2.5 text-sm font-medium transition-all border-l border-border', idioma === 'hebraico' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                🇮🇱 {t('palavras.hebrewAT')} ({palavrasHebraicas.length})
              </button>
            </div>
            <div className="flex rounded-xl border border-border overflow-hidden ml-auto">
              <button onClick={() => setView('list')}
                className={cn('px-3 py-2 text-xs font-medium transition-all', view === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                <Hash className="w-3.5 h-3.5 inline mr-1" />{t('palavras.listView')}
              </button>
              <button onClick={() => setView('frequency')}
                className={cn('px-3 py-2 text-xs font-medium transition-all border-l border-border', view === 'frequency' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                <BarChart3 className="w-3.5 h-3.5 inline mr-1" />{t('palavras.frequencyView')}
              </button>
            </div>
          </div>

          {/* Busca */}
          <div className="space-y-3 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                    placeholder={idioma === 'grego' ? t('palavras.searchGreek') : t('palavras.searchHebrew')}
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                <X className="w-4 h-4" /></button>}
            </div>

            {/* Filtros e ordenação */}
            <div className="flex gap-2 flex-wrap items-center">
              {idioma === 'grego' && (
                <>
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <button onClick={() => setFiltroCategoria('all')}
                    className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                      filtroCategoria === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                    {t('palavras.allWords')}
                  </button>
                  {categorias.map(cat => (
                    <button key={cat} onClick={() => setFiltroCategoria(cat)}
                      className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                        filtroCategoria === cat ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                      {cat}
                    </button>
                  ))}
                </>
              )}
              <div className="ml-auto flex items-center gap-1">
                <SortAsc className="w-3.5 h-3.5 text-muted-foreground" />
                {([['strong', t('palavras.sortStrong')], ['frequencia', t('palavras.sortFrequency')], ['palavra', t('palavras.sortAZ')]] as [SortBy, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => setSortBy(val)}
                    className={cn('px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
                      sortBy === val ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Frequency view */}
          {view === 'frequency' && !carregando && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                {t('palavras.topFrequency')} {idioma === 'grego' ? t('palavras.greekNTFull') : t('palavras.hebrewATFull')}
              </h3>
              <div className="space-y-2">
                {topFrequent.map((p, i) => {
                  const freq = (p as PalavraGrega).frequencia || 0;
                  const pct = (freq / maxFreq) * 100;
                  return (
                    <button key={p.strong} onClick={() => { setView('list'); toggleStrong(p.strong); }}
                      className="w-full flex items-center gap-3 group hover:bg-muted/30 rounded-lg p-2 transition-colors">
                      <span className="text-xs text-muted-foreground w-5 text-right font-mono">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{p.palavra}</span>
                          <span className="text-xs text-muted-foreground">({p.transliteracao})</span>
                          <span className="text-xs text-primary font-mono">{p.strong}</span>
                        </div>
                        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.5, delay: i * 0.03 }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-mono text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        ×{freq}
                      </span>
                    </button>
                  );
                })}
              </div>
              {topFrequent.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">{t('palavras.noFrequency')}</p>
              )}
            </motion.div>
          )}

          {/* Lista */}
          <div className="space-y-2">
            {carregando ? (
              <div className="text-center py-16">
                <div className="inline-flex gap-2">
                  <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                  <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
                <p className="text-sm text-muted-foreground mt-4">{t('palavras.loadingLexicon')}</p>
              </div>
            ) : (
              filtradas.map((p) => {
              const isExpanded = expandedStrong === p.strong;
              const freq = (p as PalavraGrega).frequencia || 0;
              return (
                <motion.div key={p.strong} layout
                  className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                  <button onClick={() => toggleStrong(p.strong)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-sm font-bold text-primary">{p.strong}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg">{p.palavra}</span>
                        <span className="text-sm text-muted-foreground">({p.transliteracao})</span>
                        {freq > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">×{freq}</span>
                        )}
                        {'categoria' in p && p.categoria && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">{(p as PalavraGrega).categoria}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {'definicaoResumida' in p ? p.definicaoResumida : ('definicao' in p ? (p as PalavraHebraica).definicao?.slice(0, 80) : '')}
                      </p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                        className="overflow-hidden">
                        <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-4">
                          {idioma === 'grego' && 'definicao' in p && (
                            <>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t('palavras.definition')}</p>
                                <p className="text-sm leading-relaxed">{(p as PalavraGrega).definicao}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg bg-muted/50 p-3">
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.category')}</p>
                                  <p className="text-sm font-medium capitalize">{(p as PalavraGrega).categoria}</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-3">
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.morphology')}</p>
                                  <p className="text-sm font-medium">{(p as PalavraGrega).morphologia}</p>
                                </div>
                              </div>
                              {(p as PalavraGrega).pronuncia && (
                                <div className="rounded-lg bg-muted/50 p-3">
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.pronunciation')}</p>
                                  <p className="text-sm font-medium">{(p as PalavraGrega).pronuncia}</p>
                                </div>
                              )}
                              {(p as PalavraGrega).uso && (
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t('palavras.usage')}</p>
                                  <p className="text-sm">{(p as PalavraGrega).uso}</p>
                                </div>
                              )}
                              {(p as PalavraGrega).notas && (
                                <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                                  <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">{t('palavras.notes')}</p>
                                  <p className="text-sm">{(p as PalavraGrega).notas}</p>
                                </div>
                              )}
                              {(p as PalavraGrega).versiculos && (p as PalavraGrega).versiculos!.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <Link2 className="w-3 h-3" />
                                    {t('palavras.concordance')} — {idioma === 'grego' ? t('palavras.verses') : t('palavras.occurrences')} ({(p as PalavraGrega).versiculos!.length})
                                  </p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {(p as PalavraGrega).versiculos!.map((v, i) => (
                                      <a key={i} href={`/biblia`}
                                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        {v}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {freq > 0 && (
                                <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
                                  <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">{t('palavras.frequencyNT')}</p>
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 h-3 bg-muted/50 rounded-full overflow-hidden">
                                      <div className="h-full bg-gradient-to-r from-amber-500/60 to-amber-500 rounded-full"
                                        style={{ width: `${(freq / maxFreq) * 100}%` }} />
                                    </div>
                                    <span className="text-sm font-mono font-bold text-amber-600">{freq}×</span>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          {idioma === 'hebraico' && (
                            <>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t('palavras.definition')}</p>
                                <p className="text-sm leading-relaxed">{(p as PalavraHebraica).definicao}</p>
                              </div>
                              {(p as PalavraHebraica).morfologia && (
                                <div className="rounded-lg bg-muted/50 p-3">
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.morphologyPronunciation')}</p>
                                  <p className="text-sm font-medium">{(p as PalavraHebraica).morfologia}</p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            {t('palavras.showing', { filtered: filtradas.length, total: idioma === 'grego' ? palavrasGregas.length : palavrasHebraicas.length })}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
