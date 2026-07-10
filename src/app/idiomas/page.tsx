'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { palavrasOriginais } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';
import { Search, X, Sparkles, BookOpen, Languages, ArrowRight } from 'lucide-react';

export default function IdiomasPage() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'grego' | 'hebraico'>('todos');
  const [expandida, setExpandida] = useState<string | null>(null);

  const filtradas = palavrasOriginais.filter((p) => {
    const matchBusca = busca === '' ||
      p.palavra.toLowerCase().includes(busca.toLowerCase()) ||
      p.transliteracao.toLowerCase().includes(busca.toLowerCase()) ||
      p.definicao.toLowerCase().includes(busca.toLowerCase()) ||
      p.strong.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro = filtro === 'todos' || p.idioma === filtro;
    return matchBusca && matchFiltro;
  });

  const stats = {
    total: palavrasOriginais.length,
    grego: palavrasOriginais.filter(p => p.idioma === 'grego').length,
    hebraico: palavrasOriginais.filter(p => p.idioma === 'hebraico').length,
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Languages className="w-4 h-4" />
                Línguas Bíblicas Originais
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                Grego & <span className="text-primary italic">Hebraico</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Estude as palavras originais das Escrituras — léxico, morfologia e significado profundo
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">Palavras</p>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-blue-500">{stats.grego}</p>
                <p className="text-xs text-muted-foreground mt-1">Grego</p>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-amber-500">{stats.hebraico}</p>
                <p className="text-xs text-muted-foreground mt-1">Hebraico</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Search */}
          <ScrollReveal>
            <div className="glass-card p-6 rounded-2xl mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar palavra, Strong ou definição..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                  {busca && (
                    <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                      <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  {(['todos', 'grego', 'hebraico'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFiltro(f)}
                      className={`px-5 py-3 text-sm font-medium rounded-xl transition-all ${
                        filtro === f
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                          : 'border border-border/50 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {f === 'todos' ? 'Todos' : f === 'grego' ? 'Grego' : 'Hebraico'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtradas.map((p, idx) => (
              <ScrollReveal key={p.strong} delay={idx * 30}>
                <div
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                    expandida === p.strong ? 'ring-2 ring-primary/50' : ''
                  }`}
                  onClick={() => setExpandida(expandida === p.strong ? null : p.strong)}
                >
                  {/* Header */}
                  <div className={`px-5 py-4 bg-gradient-to-r ${
                    p.idioma === 'grego'
                      ? 'from-blue-500/10 to-blue-600/5'
                      : 'from-amber-500/10 to-amber-600/5'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-serif text-3xl text-foreground">{p.palavra}</p>
                        <p className="text-sm text-muted-foreground italic mt-1">{p.transliteracao}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                          p.idioma === 'grego'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        }`}>
                          {p.idioma}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                          {p.strong}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-foreground/80 leading-relaxed">{p.definicao}</p>
                    
                    {p.morfologia && (
                      <div className="mt-3 p-3 bg-muted/30 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Morfologia</p>
                        <p className="text-sm">{p.morfologia}</p>
                      </div>
                    )}

                    {expandida === p.strong && (
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Strong&apos;s Concordance</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span className="font-mono text-primary">{p.strong}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtradas.length === 0 && (
            <ScrollReveal>
              <div className="glass-card p-16 text-center rounded-2xl">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary/40" strokeWidth={1} />
                </div>
                <p className="font-display text-2xl text-muted-foreground mb-2">
                  Nenhuma palavra encontrada
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Tente buscar por outro termo ou filtro
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
