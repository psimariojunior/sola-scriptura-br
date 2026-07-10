'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { doutrinas } from '@/data/biblia';
import { Church, Search, BookOpen, ChevronDown, ExternalLink, Share2, Copy, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

export default function TeologiaPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [expandida, setExpandida] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const categorias = useMemo(() => [...new Set(doutrinas.map((d) => d.categoria))].sort(), []);

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

  const copyRef = async (ref: string) => {
    await navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <Church className="w-8 h-8 text-indigo-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Teologia <span className="italic text-primary">Sistemática</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Doutrinas fundamentais da fé cristã bíblica, organizadas por categorias com referências e tradições.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          {/* Search and Filter */}
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar doutrina, definição ou referência..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <motion.button
                    onClick={() => setFiltroCategoria(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      !filtroCategoria ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Todas
                  </motion.button>
                  {categorias.map(cat => (
                    <motion.button
                      key={cat}
                      onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                        filtroCategoria === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Statistics */}
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: doutrinas.length, label: 'Doutrinas' },
                { value: categorias.length, label: 'Categorias' },
                { value: doutrinas.reduce((acc, d) => acc + d.passagens.length, 0), label: 'Referências' },
                { value: 66, label: 'Livros Bíblicos' },
              ].map((stat, i) => (
                <motion.div key={stat.label} className="sola-card p-4 text-center" whileHover={{ y: -2 }}>
                  <p className="font-display text-3xl font-light text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Doctrines */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {categorias.map((cat) => {
                const doutrinasCat = doutrinasFiltradas.filter(d => d.categoria === cat);
                if (doutrinasCat.length === 0) return null;
                
                return (
                  <motion.div 
                    key={cat}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="font-display text-2xl font-light mb-6 text-primary flex items-center gap-2">
                      <Church className="w-6 h-6" />
                      {cat}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {doutrinasCat.map((d, i) => (
                        <ScrollReveal key={d.slug} delay={i * 0.05}>
                          <motion.div 
                            className="sola-card p-6 h-full"
                            whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(196,162,101,0.1)' }}
                            layout
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h3 className="font-semibold text-lg">{d.nome}</h3>
                              <motion.button
                                onClick={() => setExpandida(expandida === d.slug ? null : d.slug)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <motion.div animate={{ rotate: expandida === d.slug ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                  <ChevronDown className="w-4 h-4" />
                                </motion.div>
                              </motion.button>
                            </div>
                            
                            <p className="font-serif-body text-sm leading-relaxed text-foreground/80 mb-4">
                              {d.definicao}
                            </p>
                            
                            <AnimatePresence>
                              {expandida === d.slug && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 border-t border-border/50">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                      Passagens Bíblicas
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {d.passagens.map((ref) => (
                                        <div key={ref} className="flex items-center gap-1">
                                          <Link
                                            href={`/biblia?livro=${ref.split(' ')[0]?.toLowerCase()}&capitulo=${ref.split(' ')[1]?.split(':')[0] || '1'}`}
                                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm hover:bg-primary/20 transition-colors flex items-center gap-1"
                                          >
                                            {ref}
                                            <ExternalLink className="w-3 h-3" />
                                          </Link>
                                          <button
                                            onClick={() => copyRef(ref)}
                                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                          >
                                            {copiedRef === ref ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                    {d.tradicoes && (
                                      <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                          Visão das Tradições
                                        </h4>
                                        <p className="text-xs text-foreground/70 leading-relaxed font-serif-body">
                                          {d.tradicoes}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {doutrinasFiltradas.length === 0 && (
            <ScrollReveal>
              <div className="sola-card p-12 text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
                <p className="font-display text-xl text-muted-foreground mb-1">Nenhuma doutrina encontrada</p>
                <p className="text-sm text-muted-foreground/70">Tente usar termos diferentes ou limpar os filtros</p>
              </div>
            </ScrollReveal>
          )}

          {/* Traditions */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16">
              <h2 className="font-display text-2xl font-light mb-6 text-primary">Tradições Teológicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Reformada', desc: 'Sola Gratia, Sola Fide, Sola Scriptura, Solus Christus, Soli Deo Gloria. Soberania de Deus na salvação.', tags: ['Calvino', 'Lutero', 'Escolásticos'] },
                  { name: 'Arminiana', desc: 'Liberdade humana, graça resistível, previsão condicional. Destaque para a responsabilidade humana.', tags: ['Arminio', 'Wesley', 'Metodista'] },
                  { name: 'Batista', desc: 'Autoridade da Escritura, regeneração pessoal, credismo, separação igreja/estado.', tags: ['Spurgeon', 'Carson', 'Moderne'] },
                ].map((trad, i) => (
                  <motion.div key={trad.name} className="sola-card p-6" whileHover={{ y: -4 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <h3 className="font-semibold mb-2">{trad.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{trad.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {trad.tags.map(p => (
                        <span key={p} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{p}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
