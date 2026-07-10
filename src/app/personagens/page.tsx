'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { personagens } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';
import { Users, Search, X, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function PersonagensPage() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'AT' | 'NT'>('todos');
  const [expandido, setExpandido] = useState<string | null>(null);

  const filtrados = personagens.filter((p) => {
    const matchBusca = busca === '' ||
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.significado.toLowerCase().includes(busca.toLowerCase()) ||
      p.resumo.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro = filtro === 'todos' || p.testamento === filtro;
    return matchBusca && matchFiltro;
  });

  const stats = {
    total: personagens.length,
    at: personagens.filter(p => p.testamento === 'AT').length,
    nt: personagens.filter(p => p.testamento === 'NT').length,
  };

  const iconesPorTestamento: Record<string, string> = {
    AT: '📜',
    NT: '✝️',
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
                <Users className="w-4 h-4" />
                Biografias dos Personagens
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                Personagens <span className="text-primary italic">Bíblicos</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Biografias, significados dos nomes e contribuições para a história da salvação
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">Total</p>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-amber-500">{stats.at}</p>
                <p className="text-xs text-muted-foreground mt-1">Antigo Testamento</p>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-blue-500">{stats.nt}</p>
                <p className="text-xs text-muted-foreground mt-1">Novo Testamento</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Search & Filters */}
          <ScrollReveal>
            <div className="glass-card p-6 rounded-2xl mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar personagem, significado..."
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
                  {(['todos', 'AT', 'NT'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFiltro(f)}
                      className={`px-5 py-3 text-sm font-medium rounded-xl transition-all ${
                        filtro === f
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                          : 'border border-border/50 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {f === 'todos' ? 'Todos' : f === 'AT' ? 'Antigo T.' : 'Novo T.'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((p, idx) => (
              <ScrollReveal key={p.nome} delay={idx * 30}>
                <div
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    expandido === p.nome ? 'ring-2 ring-primary/50' : ''
                  }`}
                  onClick={() => setExpandido(expandido === p.nome ? null : p.nome)}
                >
                  {/* Header */}
                  <div className={`px-6 py-5 bg-gradient-to-r ${
                    p.testamento === 'AT'
                      ? 'from-amber-500/10 to-amber-600/5'
                      : 'from-blue-500/10 to-blue-600/5'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                        {iconesPorTestamento[p.testamento]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-xl font-semibold">{p.nome}</h3>
                          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                            p.testamento === 'AT'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                          }`}>
                            {p.testamento}
                          </span>
                        </div>
                        {(p.nomeHebraico || p.nomeGrego) && (
                          <p className="text-sm text-muted-foreground italic">
                            {p.nomeHebraico || p.nomeGrego}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Significado</p>
                      <p className="text-sm font-medium text-primary">{p.significado}</p>
                    </div>
                    
                    <p className="text-sm text-foreground/80 leading-relaxed">{p.resumo}</p>

                    {expandido === p.nome && (
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Clique para estudar mais sobre este personagem</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtrados.length === 0 && (
            <ScrollReveal>
              <div className="glass-card p-16 text-center rounded-2xl">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary/40" strokeWidth={1} />
                </div>
                <p className="font-display text-2xl text-muted-foreground mb-2">
                  Nenhum personagem encontrado
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Tente buscar por outro nome ou filtro
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
