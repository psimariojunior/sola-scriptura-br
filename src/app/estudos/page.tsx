'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Heart, StickyNote, Bookmark, Search, X, BookOpen, Trash2, Calendar, ArrowRight, Filter } from 'lucide-react';
import { listarMarcas, removerMarca, toggleFavorito, type MarcaBiblia } from '@/lib/estudos';
import { livroPorAbreviacao } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';

export default function EstudosPage() {
  const [marcas, setMarcas] = useState<MarcaBiblia[]>([]);
  const [aba, setAba] = useState<'todas' | 'favoritos' | 'anotacoes'>('todas');
  const [query, setQuery] = useState('');

  const carregar = () => setMarcas(listarMarcas());

  useEffect(() => { carregar(); }, []);

  const filtradas = useMemo(() => {
    let lista = marcas;
    if (aba === 'favoritos') lista = lista.filter((m) => m.favorito);
    if (aba === 'anotacoes') lista = lista.filter((m) => m.anotacao);
    if (query.trim()) {
      const q = query.toLowerCase();
      lista = lista.filter((m) => m.texto.toLowerCase().includes(q) || m.anotacao?.texto.toLowerCase().includes(q));
    }
    return lista.sort((a, b) => b.dataCriacao - a.dataCriacao);
  }, [marcas, aba, query]);

  const stats = useMemo(() => ({
    total: marcas.length,
    favoritos: marcas.filter((m) => m.favorito).length,
    anotacoes: marcas.filter((m) => m.anotacao).length,
  }), [marcas]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Meus Estudos</h1>
              </div>
              <p className="text-muted-foreground ml-13">Versículos favoritos, anotações e marcações</p>
            </div>
          </ScrollReveal>

          {/* Stats cards */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Total</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-red-500">{stats.favoritos}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Favoritos</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-amber-500">{stats.anotacoes}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Anotações</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Search and filters */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar nos estudos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors">
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-2 mb-8">
              {([
                { id: 'todas' as const, label: 'Todas', icon: Bookmark, count: stats.total },
                { id: 'favoritos' as const, label: 'Favoritos', icon: Heart, count: stats.favoritos },
                { id: 'anotacoes' as const, label: 'Anotações', icon: StickyNote, count: stats.anotacoes },
              ]).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAba(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all ${
                    aba === t.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground border border-border/60 hover:border-border'
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ml-1 ${aba === t.id ? 'bg-white/20' : 'bg-muted'}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Content */}
          {filtradas.length === 0 ? (
            <ScrollReveal>
              <div className="sola-card p-16 text-center">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-muted-foreground/40" strokeWidth={1} />
                </div>
                <p className="text-xl font-medium text-muted-foreground mb-2">
                  {marcas.length === 0 ? 'Nenhum estudo salvo' : 'Nenhum resultado encontrado'}
                </p>
                <p className="text-sm text-muted-foreground/70 max-w-sm mx-auto mb-8 leading-relaxed">
                  {marcas.length === 0
                    ? 'Favorite versículos ou adicione anotações durante a leitura da Bíblia para vê-los aqui organizados.'
                    : 'Tente ajustar os filtros ou a busca para encontrar o que procura.'}
                </p>
                {marcas.length === 0 && (
                  <Link
                    href="/biblia"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    Ir para a Bíblia
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </ScrollReveal>
          ) : (
            <div className="space-y-3">
              {filtradas.map((m, i) => {
                const livro = livroPorAbreviacao.get(m.livro);
                return (
                  <ScrollReveal key={`${m.livro}:${m.capitulo}:${m.versiculo}:${m.traducao}`} delay={Math.min(i * 0.03, 0.3)}>
                    <div className="sola-card p-5 rounded-xl hover:shadow-md transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Link
                              href={`/biblia?livro=${m.livro}&capitulo=${m.capitulo}&trads=${m.traducao}`}
                              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                              {livro?.nome || m.livro} {m.capitulo}:{m.versiculo}
                            </Link>
                            <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium uppercase tracking-wider">
                              {m.traducao}
                            </span>
                            {m.favorito && (
                              <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-foreground/80 font-serif-body leading-relaxed mb-1">
                            {m.texto}
                          </p>
                          {m.anotacao && (
                            <div className="mt-3 pt-3 border-t border-border/30">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <StickyNote className="w-3 h-3 text-amber-500" />
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                  {new Date(m.anotacao.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-2.5">
                                {m.anotacao.texto}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              toggleFavorito(m.livro, m.capitulo, m.versiculo, m.traducao, m.texto);
                              carregar();
                            }}
                            className={`p-1.5 rounded-md transition-colors ${
                              m.favorito ? 'text-red-500 bg-red-50 dark:bg-red-950/20' : 'text-muted-foreground hover:text-red-400 hover:bg-muted'
                            }`}
                            title={m.favorito ? 'Remover favorito' : 'Favoritar'}
                          >
                            <Heart className={`w-4 h-4 ${m.favorito ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => {
                              removerMarca(m.livro, m.capitulo, m.versiculo, m.traducao);
                              carregar();
                            }}
                            className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                            title="Remover"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
