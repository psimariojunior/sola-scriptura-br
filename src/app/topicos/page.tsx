'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { doutrinas, type Doutrina } from '@/data/biblia';
import Link from 'next/link';
import { Search, BookOpen, ChevronDown, ChevronRight, Sparkles, X, Tag, Filter } from 'lucide-react';

const CATEGORIA_CONFIG: Record<string, { cor: string; icone: string; gradient: string }> = {
  'Bibliologia':             { cor: 'bg-blue-700',    icone: '📖', gradient: 'from-blue-700 to-blue-800' },
  'Teologia Proper':         { cor: 'bg-amber-700',   icone: '✝️', gradient: 'from-amber-700 to-amber-800' },
  'Cristologia':             { cor: 'bg-emerald-700', icone: '👑', gradient: 'from-emerald-700 to-emerald-800' },
  'Pneumatologia':           { cor: 'bg-violet-700',  icone: '🕊️', gradient: 'from-violet-700 to-violet-800' },
  'Angelologia':             { cor: 'bg-cyan-700',    icone: '⚡', gradient: 'from-cyan-700 to-cyan-800' },
  'Antropologia':            { cor: 'bg-orange-700',  icone: '👤', gradient: 'from-orange-700 to-orange-800' },
  'Hamartiologia':           { cor: 'bg-red-700',     icone: '🔗', gradient: 'from-red-700 to-red-800' },
  'Soteriologia':            { cor: 'bg-green-700',   icone: '🔓', gradient: 'from-green-700 to-green-800' },
  'Eclesiologia':            { cor: 'bg-rose-700',    icone: '⛪', gradient: 'from-rose-700 to-rose-800' },
  'Teologia Bíblica':        { cor: 'bg-teal-700',    icone: '📜', gradient: 'from-teal-700 to-teal-800' },
  'Escatologia':             { cor: 'bg-indigo-700',  icone: '⏳', gradient: 'from-indigo-700 to-indigo-800' },
  'Teologia Sistemática':    { cor: 'bg-purple-700',  icone: '🏗️', gradient: 'from-purple-700 to-purple-800' },
  'Apologetica':             { cor: 'bg-slate-700',   icone: '🛡️', gradient: 'from-slate-700 to-slate-800' },
};

const CATEGORIA_BGBORDER: Record<string, string> = {
  'Bibliologia':             'border-blue-200 dark:border-blue-800/40',
  'Teologia Proper':         'border-amber-200 dark:border-amber-800/40',
  'Cristologia':             'border-emerald-200 dark:border-emerald-800/40',
  'Pneumatologia':           'border-violet-200 dark:border-violet-800/40',
  'Angelologia':             'border-cyan-200 dark:border-cyan-800/40',
  'Antropologia':            'border-orange-200 dark:border-orange-800/40',
  'Hamartiologia':           'border-red-200 dark:border-red-800/40',
  'Soteriologia':            'border-green-200 dark:border-green-800/40',
  'Eclesiologia':            'border-rose-200 dark:border-rose-800/40',
  'Teologia Bíblica':        'border-teal-200 dark:border-teal-800/40',
  'Escatologia':             'border-indigo-200 dark:border-indigo-800/40',
  'Teologia Sistemática':    'border-purple-200 dark:border-purple-800/40',
  'Apologetica':             'border-slate-200 dark:border-slate-800/40',
};

const CATEGORIA_TEXT: Record<string, string> = {
  'Bibliologia':             'text-blue-600 dark:text-blue-400',
  'Teologia Proper':         'text-amber-600 dark:text-amber-400',
  'Cristologia':             'text-emerald-600 dark:text-emerald-400',
  'Pneumatologia':           'text-violet-600 dark:text-violet-400',
  'Angelologia':             'text-cyan-600 dark:text-cyan-400',
  'Antropologia':            'text-orange-600 dark:text-orange-400',
  'Hamartiologia':           'text-red-600 dark:text-red-400',
  'Soteriologia':            'text-green-600 dark:text-green-400',
  'Eclesiologia':            'text-rose-600 dark:text-rose-400',
  'Teologia Bíblica':        'text-teal-600 dark:text-teal-400',
  'Escatologia':             'text-indigo-600 dark:text-indigo-400',
  'Teologia Sistemática':    'text-purple-600 dark:text-purple-400',
  'Apologetica':             'text-slate-600 dark:text-slate-400',
};

function parseReferencia(ref: string): { livro: string; capitulo: number } | null {
  const m = ref.trim().match(/^(\d?\s*[A-Za-z]+)\s+(\d+)/);
  if (!m) return null;
  const livro = m[1].toLowerCase().replace(/\s+/g, '');
  const capitulo = parseInt(m[2], 10);
  return { livro, capitulo };
}

const CATEGORIAS_ORDENADAS = [
  'Bibliologia',
  'Teologia Proper',
  'Cristologia',
  'Pneumatologia',
  'Angelologia',
  'Antropologia',
  'Hamartiologia',
  'Soteriologia',
  'Eclesiologia',
  'Teologia Bíblica',
  'Escatologia',
  'Teologia Sistemática',
  'Apologetica',
];

export default function TopicosPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [expandida, setExpandida] = useState<string | null>(null);

  const categoriasDisponiveis = useMemo(() => {
    return CATEGORIAS_ORDENADAS.filter(cat =>
      doutrinas.some(d => d.categoria === cat)
    );
  }, []);

  const topicosPorCategoria = useMemo(() => {
    const mapa = new Map<string, Doutrina[]>();
    for (const cat of categoriasDisponiveis) {
      mapa.set(cat, []);
    }
    for (const d of doutrinas) {
      const lista = mapa.get(d.categoria);
      if (lista) lista.push(d);
    }
    return mapa;
  }, [categoriasDisponiveis]);

  const doutrinasFiltradas = useMemo(() => {
    let lista = doutrinas;
    if (filtroCategoria) lista = lista.filter(d => d.categoria === filtroCategoria);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(d =>
        d.nome.toLowerCase().includes(q) ||
        d.definicao.toLowerCase().includes(q) ||
        d.passagens.some(p => p.toLowerCase().includes(q)) ||
        (d.tradicoes && d.tradicoes.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [busca, filtroCategoria]);

  const topicosAgrupados = useMemo(() => {
    const mapa = new Map<string, Doutrina[]>();
    for (const d of doutrinasFiltradas) {
      const lista = mapa.get(d.categoria) || [];
      lista.push(d);
      mapa.set(d.categoria, lista);
    }
    return mapa;
  }, [doutrinasFiltradas]);

  const totalFiltrado = doutrinasFiltradas.length;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white mb-4 shadow-lg shadow-amber-500/25"
              >
                <BookOpen className="w-10 h-10" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-3">
                Tópicos Teológicos
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {doutrinas.length} doutrinas indexadas em {categoriasDisponiveis.length} categorias — estude as verdades fundamentais da fé cristã
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto px-6">
          {/* Barra de busca e filtros */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar doutrina, versículo ou tema..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
                />
                {busca && (
                  <button
                    onClick={() => setBusca('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>{totalFiltrado} resultados</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Filtros de categoria */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setFiltroCategoria(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !filtroCategoria
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25'
                    : 'bg-white/60 dark:bg-white/5 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/30 text-muted-foreground hover:border-amber-400 dark:hover:border-amber-600'
                }`}
              >
                Todas ({doutrinas.length})
              </button>
              {categoriasDisponiveis.map(cat => {
                const config = CATEGORIA_CONFIG[cat];
                const count = topicosPorCategoria.get(cat)?.length ?? 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      filtroCategoria === cat
                        ? `${config?.cor} text-white shadow-md`
                        : 'bg-white/60 dark:bg-white/5 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/30 text-muted-foreground hover:border-amber-400 dark:hover:border-amber-600'
                    }`}
                  >
                    <span>{config?.icone}</span>
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Grid de cards por categoria */}
          <div className="space-y-10">
            {Array.from(topicosAgrupados.entries()).map(([categoria, doutrinasCat], catIndex) => {
              const config = CATEGORIA_CONFIG[categoria] ?? { cor: 'bg-slate-500', icone: '📄', gradient: 'from-slate-500 to-slate-600' };
              const borderClass = CATEGORIA_BGBORDER[categoria] ?? 'border-slate-200 dark:border-slate-800/40';
              const textClass = CATEGORIA_TEXT[categoria] ?? 'text-slate-600 dark:text-slate-400';

              return (
                <ScrollReveal key={categoria} delay={catIndex * 0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white text-lg shadow-md`}>
                      {config.icone}
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-foreground">{categoria}</h2>
                      <p className="text-sm text-muted-foreground">{doutrinasCat.length} doutrinas</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doutrinasCat.map((d, i) => (
                      <motion.div
                        key={d.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={`glass-card rounded-2xl border ${borderClass} p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                        onClick={() => setExpandida(expandida === d.slug ? null : d.slug)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.cor} text-white`}>
                              {config.icone}
                            </span>
                            <h3 className="font-display font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {d.nome}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: expandida === d.slug ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </motion.div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                          {d.definicao}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {d.passagens.slice(0, 3).map(p => {
                            const ref = parseReferencia(p);
                            return ref ? (
                              <Link
                                key={p}
                                href={`/biblia?livro=${ref.livro}&capitulo=${ref.capitulo}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
                              >
                                {p}
                              </Link>
                            ) : (
                              <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                                {p}
                              </span>
                            );
                          })}
                          {d.passagens.length > 3 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              +{d.passagens.length - 3}
                            </span>
                          )}
                        </div>

                        <AnimatePresence>
                          {expandida === d.slug && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-border/50">
                                {d.tradicoes && (
                                  <div className="mb-3">
                                    <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                                      <Tag className="w-3 h-3" />
                                      Tradições Teológicas
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                      {d.tradicoes}
                                    </p>
                                  </div>
                                )}
                                <div>
                                  <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    Passagens Chave
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {d.passagens.map(p => {
                                      const ref = parseReferencia(p);
                                      return ref ? (
                                        <Link
                                          key={p}
                                          href={`/biblia?livro=${ref.livro}&capitulo=${ref.capitulo}`}
                                          onClick={(e) => e.stopPropagation()}
                                          className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
                                        >
                                          {p}
                                        </Link>
                                      ) : (
                                        <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                                          {p}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Estado vazio */}
          {doutrinasFiltradas.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-20">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold text-foreground mb-2">Nenhum tópico encontrado</h3>
                <p className="text-muted-foreground">Tente buscar por outro termo ou ajuste os filtros.</p>
                <button
                  onClick={() => { setBusca(''); setFiltroCategoria(null); }}
                  className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                >
                  Limpar filtros
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
