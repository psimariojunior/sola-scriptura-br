'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Search, X, BookOpen, ArrowRight, Hash, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { palavrasGregas, type PalavraGrega } from '@/data/lexicon/grego';
import { palavrasHebraicas, type PalavraHebraica } from '@/data/lexicon/hebraico';

type Idioma = 'grego' | 'hebraico';

export default function PalavrasOriginaisPage() {
  const [idioma, setIdioma] = useState<Idioma>('grego');
  const [busca, setBusca] = useState('');
  const [expandedStrong, setExpandedStrong] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('all');

  const palavras = useMemo(() => idioma === 'grego' ? palavrasGregas : palavrasHebraicas, [idioma]);

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
    return result.slice(0, 100); // Limit for performance
  }, [palavras, busca, filtroCategoria, idioma]);

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
              <h1 className="font-display text-4xl font-light mb-3">Palavras <span className="text-primary italic">Originais</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Estude o grego do Novo Testamento ({palavrasGregas.length} palavras) e o hebraico do Antigo Testamento ({palavrasHebraicas.length} palavras)
              </p>
            </div>
          </ScrollReveal>

          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="flex rounded-xl border border-border overflow-hidden">
              <button onClick={() => setIdioma('grego')}
                className={cn('px-4 py-2.5 text-sm font-medium transition-all', idioma === 'grego' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                🇬🇷 Grego NT ({palavrasGregas.length})
              </button>
              <button onClick={() => setIdioma('hebraico')}
                className={cn('px-4 py-2.5 text-sm font-medium transition-all border-l border-border', idioma === 'hebraico' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                🇮🇱 Hebraico AT ({palavrasHebraicas.length})
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder={idioma === 'grego' ? 'Buscar palavra grega (ex: agape, logos, pistis)...' : 'Buscar palavra hebraica (ex: shalom, berith)...'}
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                <X className="w-4 h-4" /></button>}
            </div>

            {idioma === 'grego' && (
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setFiltroCategoria('all')}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    filtroCategoria === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                  Todas
                </button>
                {categorias.map(cat => (
                  <button key={cat} onClick={() => setFiltroCategoria(cat)}
                    className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                      filtroCategoria === cat ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            {filtradas.map((p) => {
              const isExpanded = expandedStrong === p.strong;
              return (
                <motion.div key={p.strong} layout
                  className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                  <button onClick={() => toggleStrong(p.strong)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-sm font-bold text-primary">{p.strong}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{p.palavra}</span>
                        <span className="text-sm text-muted-foreground">({p.transliteracao})</span>
                        {'frequencia' in p && p.frequencia && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">×{p.frequencia}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {'definicaoResumida' in p ? p.definicaoResumida : ('definicao' in p ? (p as PalavraHebraica).definicao?.slice(0, 80) : '')}
                      </p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  {isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                      className="px-5 pb-5 border-t border-border/50">
                      <div className="pt-4 space-y-4">
                        {idioma === 'grego' && 'definicao' in p && (
                          <>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Definição</p>
                              <p className="text-sm leading-relaxed">{(p as PalavraGrega).definicao}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-lg bg-muted/50 p-3">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Categoria</p>
                                <p className="text-sm font-medium capitalize">{(p as PalavraGrega).categoria}</p>
                              </div>
                              <div className="rounded-lg bg-muted/50 p-3">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Morfologia</p>
                                <p className="text-sm font-medium">{(p as PalavraGrega).morphologia}</p>
                              </div>
                            </div>
                            {(p as PalavraGrega).uso && (
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Uso</p>
                                <p className="text-sm">{(p as PalavraGrega).uso}</p>
                              </div>
                            )}
                            {(p as PalavraGrega).versiculos && (p as PalavraGrega).versiculos!.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Versículos</p>
                                <div className="flex flex-wrap gap-1">
                                  {(p as PalavraGrega).versiculos!.slice(0, 10).map((v, i) => (
                                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{v}</span>
                                  ))}
                                  {(p as PalavraGrega).versiculos!.length > 10 && (
                                    <span className="text-xs text-muted-foreground">+{(p as PalavraGrega).versiculos!.length - 10} mais</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        {idioma === 'hebraico' && (
                          <>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Definição</p>
                              <p className="text-sm leading-relaxed">{(p as PalavraHebraica).definicao}</p>
                            </div>
                            {(p as PalavraHebraica).morfologia && (
                              <div className="rounded-lg bg-muted/50 p-3">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Morfologia</p>
                                <p className="text-sm font-medium">{(p as PalavraHebraica).morfologia}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            {filtradas.length} de {idioma === 'grego' ? palavrasGregas.length : palavrasHebraicas.length} palavras
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
