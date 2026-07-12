'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  buscarConcordancia,
  getConcordanciaPorIdioma,
  getPalavrasMaisFrequentes,
} from '@/data/biblia/concordancia';

type Tab = 'busca' | 'grego' | 'hebraico' | 'frequentes';

export default function ConcordanciaPage() {
  const [busca, setBusca] = useState('');
  const [tab, setTab] = useState<Tab>('busca');
  const [expandido, setExpandido] = useState<string | null>(null);

  const resultadosBusca = useMemo(() => {
    if (!busca.trim()) return [];
    return buscarConcordancia(busca);
  }, [busca]);

  const grego = useMemo(() => getConcordanciaPorIdioma('grego'), []);
  const hebraico = useMemo(() => getConcordanciaPorIdioma('hebraico'), []);
  const maisFrequentes = useMemo(() => [
    ...getPalavrasMaisFrequentes('grego', 15),
    ...getPalavrasMaisFrequentes('hebraico', 15),
  ].sort((a, b) => b.ocorrencias.length - a.ocorrencias.length), []);

  const resultadosAtivos = useMemo(() => {
    switch (tab) {
      case 'busca': return resultadosBusca;
      case 'grego': return grego;
      case 'hebraico': return hebraico;
      case 'frequentes': return maisFrequentes;
      default: return [];
    }
  }, [tab, resultadosBusca, grego, hebraico, maisFrequentes]);

  const parseRef = (ref: string) => {
    const parts = ref.split(':');
    return { livro: parts[0] || 'gn', capitulo: parts[1] || '1' };
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <BookOpen className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Concordância <span className="italic text-primary">Strong</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Consulte palavras do AT e NT pelos números de Strong. Definições, transliteração, ocorrências e frequência.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por número Strong, palavra, transliteração ou definição..."
                  value={busca}
                  onChange={(e) => { setBusca(e.target.value); if (e.target.value) setTab('busca'); }}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'busca' as Tab, label: 'Busca' },
                  { key: 'grego' as Tab, label: `Grego (${grego.length})` },
                  { key: 'hebraico' as Tab, label: `Hebraico (${hebraico.length})` },
                  { key: 'frequentes' as Tab, label: 'Mais Frequentes' },
                ].map((t) => (
                  <motion.button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      tab === t.key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {t.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: grego.length, label: 'Grego' },
                { value: hebraico.length, label: 'Hebraico' },
                { value: grego.length + hebraico.length, label: 'Total' },
                { value: maisFrequentes.length, label: 'Frequentes' },
              ].map((stat) => (
                <motion.div key={stat.label} className="sola-card p-4 text-center" whileHover={{ y: -2 }}>
                  <p className="font-display text-3xl font-light text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {resultadosAtivos.map((e, i) => (
                <motion.div
                  key={e.strong}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, delay: i * 0.01 }}
                >
                  <div
                    className="sola-card p-4 cursor-pointer"
                    onClick={() => setExpandido(expandido === e.strong ? null : e.strong)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 text-center flex-shrink-0">
                        <span className={`text-xs font-bold ${e.idioma === 'grego' ? 'text-blue-500' : 'text-amber-500'}`}>
                          {e.strong}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                            e.idioma === 'grego'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                          }`}>
                            {e.idioma === 'grego' ? 'G' : 'H'}
                          </span>
                          <span className="font-display text-base font-semibold">{e.palavra}</span>
                          <span className="text-xs text-muted-foreground italic">{e.transliteracao}</span>
                          <span className="text-[10px] text-muted-foreground ml-auto">
                            {e.ocorrencias.length} ocorrência{e.ocorrencias.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{e.definicao}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${expandido === e.strong ? 'rotate-90' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {expandido === e.strong && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 border-t border-border mt-3">
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{e.definicao}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {e.ocorrencias.map((ref) => {
                                const { livro, capitulo } = parseRef(ref);
                                return (
                                  <Link
                                    key={ref}
                                    href={`/biblia?livro=${livro}&capitulo=${capitulo}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-[11px] font-medium px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                  >
                                    {ref.replace(/:/g, ' ')}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {resultadosAtivos.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl text-muted-foreground">
                  {tab === 'busca' ? 'Digite para pesquisar' : 'Nenhum resultado encontrado'}
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
