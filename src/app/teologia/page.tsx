'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { doutrinas, type Doutrina } from '@/data/biblia';
import { estudosTeologicosExpandidos, type EstudoTeologico } from '@/data/estudosTeologicosExpandidos';
import { getRecursosVersiculo } from '@/data/biblia/versiculoRecursos';
import dynamic from 'next/dynamic';
import { Church, Search, BookOpen, ChevronDown, ExternalLink, Share2, Copy, Check, Sparkles, X, Layers, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const PainelDoVersiculo = dynamic(() => import('@/components/PainelDoVersiculo'), {
  ssr: false,
  loading: () => null,
});

const CATEGORIA_CORES: Record<string, { bg: string; text: string; dot: string }> = {
  'Bibliologia': { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  'Teologia Proper': { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  'Cristologia': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'Pneumatologia': { bg: 'bg-violet-50 dark:bg-violet-950/30', text: 'text-violet-600 dark:text-violet-400', dot: 'bg-violet-500' },
  'Angelologia': { bg: 'bg-cyan-50 dark:bg-cyan-950/30', text: 'text-cyan-600 dark:text-cyan-400', dot: 'bg-cyan-500' },
  'Antropologia': { bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  'Hamartiologia': { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
  'Soteriologia': { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
  'Eclesiologia': { bg: 'bg-rose-50 dark:bg-rose-950/30', text: 'text-rose-600 dark:text-rose-400', dot: 'bg-rose-500' },
  'Teologia Bíblica': { bg: 'bg-teal-50 dark:bg-teal-950/30', text: 'text-teal-600 dark:text-teal-400', dot: 'bg-teal-500' },
  'Escatologia': { bg: 'bg-indigo-50 dark:bg-indigo-950/30', text: 'text-indigo-600 dark:text-indigo-400', dot: 'bg-indigo-500' },
  'Teologia Sistemática': { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
  'Apologetica': { bg: 'bg-slate-50 dark:bg-slate-950/30', text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-500' },
};

function getCoresCategoria(cat: string) {
  return CATEGORIA_CORES[cat] ?? { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' };
}

function parseReferencia(ref: string): { livro: string; capitulo: number; versiculo: number } | null {
  // Aceita formatos: "Romanos 8:28", "Rm 8", "1 Jo 3:4", "Mateus 5:3-12"
  const m = ref.trim().match(/^(\d?\s*[A-Za-zÀ-ú]+)\s+(\d+)(?::(\d+))?/);
  if (!m) return null;
  const livro = m[1].toLowerCase().replace(/\s+/g, '');
  const capitulo = parseInt(m[2], 10);
  const versiculo = m[3] ? parseInt(m[3], 10) : 1;
  return { livro, capitulo, versiculo };
}

export default function TeologiaPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [expandida, setExpandida] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<'doutrinas' | 'estudos'>('doutrinas');
  const [estudoExpandido, setEstudoExpandido] = useState<string | null>(null);

  const [painelVersiculo, setPainelVersiculo] = useState<{
    livro: string;
    capitulo: number;
    versiculo: number;
  } | null>(null);

  const categorias = useMemo(() => [...new Set(doutrinas.map((d) => d.categoria))].sort(), []);

  const categoriasEstudos = useMemo(() => [...new Set(estudosTeologicosExpandidos.map((e) => e.categoria))].sort(), []);

  const estudosFiltrados = useMemo(() => {
    let lista = estudosTeologicosExpandidos;
    if (filtroCategoria) lista = lista.filter(e => e.categoria === filtroCategoria);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(e =>
        e.titulo.toLowerCase().includes(q) ||
        e.conteudo.some(c => c.toLowerCase().includes(q)) ||
        e.versicosChave.some(v => v.toLowerCase().includes(q)) ||
        e.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [busca, filtroCategoria]);

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

  const handleVersiculoClick = useCallback((livro: string, cap: number, ver: number) => {
    setPainelVersiculo({ livro, capitulo: cap, versiculo: ver });
  }, []);

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
                  {(abaAtiva === 'doutrinas' ? categorias : categoriasEstudos.slice(0, 20)).map(cat => {
                    const cores = getCoresCategoria(cat);
                    return (
                      <motion.button
                        key={cat}
                        onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                          filtroCategoria === cat
                            ? 'bg-primary text-primary-foreground'
                            : `${cores.bg} ${cores.text} hover:opacity-80`
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cores.dot}`} />
                        {cat}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center gap-2 mb-8">
              <motion.button
                onClick={() => { setAbaAtiva('doutrinas'); setFiltroCategoria(null); setBusca(''); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  abaAtiva === 'doutrinas'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Layers className="w-4 h-4" />
                Doutrinas <span className="text-xs opacity-70">({doutrinas.length})</span>
              </motion.button>
              <motion.button
                onClick={() => { setAbaAtiva('estudos'); setFiltroCategoria(null); setBusca(''); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  abaAtiva === 'estudos'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Estudos Aprofundados <span className="text-xs opacity-70">({estudosTeologicosExpandidos.length})</span>
              </motion.button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: abaAtiva === 'doutrinas' ? doutrinas.length : estudosTeologicosExpandidos.length, label: abaAtiva === 'doutrinas' ? 'Doutrinas' : 'Estudos' },
                { value: abaAtiva === 'doutrinas' ? categorias.length : categoriasEstudos.length, label: 'Categorias' },
                { value: abaAtiva === 'doutrinas' ? doutrinas.reduce((acc, d) => acc + d.passagens.length, 0) : estudosTeologicosExpandidos.reduce((acc, e) => acc + e.versicosChave.length, 0), label: 'Referências' },
                { value: 66, label: 'Livros Bíblicos' },
              ].map((stat, i) => (
                <motion.div key={stat.label} className="sola-card p-4 text-center" whileHover={{ y: -2 }}>
                  <p className="font-display text-3xl font-light text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {abaAtiva === 'doutrinas' ? (
                <>
                  {categorias.map((cat) => {
                    const doutrinasCat = doutrinasFiltradas.filter(d => d.categoria === cat);
                    if (doutrinasCat.length === 0) return null;
                    const cores = getCoresCategoria(cat);

                    return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="font-display text-2xl font-light mb-6 text-primary flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${cores.dot}`} />
                      {cat}
                      <span className="text-sm font-normal text-muted-foreground">({doutrinasCat.length})</span>
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
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg">{d.nome}</h3>
                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cores.bg} ${cores.text}`}>
                                    {d.categoria}
                                  </span>
                                </div>
                              </div>
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
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                      Passagens Bíblicas
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {d.passagens.map((ref) => {
                                        const parsed = parseReferencia(ref);
                                        return (
                                          <div key={ref} className="flex items-center gap-1">
                                            {parsed ? (
                                              <button
                                                onClick={() => handleVersiculoClick(parsed.livro, parsed.capitulo, parsed.versiculo)}
                                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm hover:bg-primary/20 transition-colors flex items-center gap-1"
                                              >
                                                {ref}
                                                <ExternalLink className="w-3 h-3" />
                                              </button>
                                            ) : (
                                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm">
                                                {ref}
                                              </span>
                                            )}
                                            <button
                                              onClick={() => copyRef(ref)}
                                              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                              {copiedRef === ref ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                            </button>
                                          </div>
                                        );
                                      })}
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
                </>
              ) : (
                <>
                  {categoriasEstudos.map((cat) => {
                  const estudosCat = estudosFiltrados.filter(e => e.categoria === cat);
                  if (estudosCat.length === 0) return null;
                  const cores = getCoresCategoria(cat);

                  return (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h2 className="font-display text-2xl font-light mb-6 text-primary flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${cores.dot}`} />
                        {cat}
                        <span className="text-sm font-normal text-muted-foreground">({estudosCat.length})</span>
                      </h2>
                      <div className="space-y-4">
                        {estudosCat.map((e, i) => (
                          <ScrollReveal key={e.id} delay={i * 0.03}>
                            <motion.div
                              className="sola-card p-6"
                              whileHover={{ y: -2 }}
                              layout
                            >
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{e.titulo}</h3>
                                  <div className="flex flex-wrap gap-1.5 mb-2">
                                    {e.subcategoria && (
                                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cores.bg} ${cores.text}`}>
                                        {e.subcategoria}
                                      </span>
                                    )}
                                    {e.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <motion.button
                                  onClick={() => setEstudoExpandido(estudoExpandido === e.id ? null : e.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <motion.div animate={{ rotate: estudoExpandido === e.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                    <ChevronDown className="w-4 h-4" />
                                  </motion.div>
                                </motion.button>
                              </div>

                              <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2 mb-3">
                                {e.conteudo[0]}
                              </p>

                              <AnimatePresence>
                                {estudoExpandido === e.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-4 border-t border-border/50 space-y-4">
                                      {e.conteudo.map((paragrafo, pi) => (
                                        <p key={pi} className="text-sm text-foreground/80 leading-relaxed font-serif-body">
                                          {paragrafo}
                                        </p>
                                      ))}

                                      <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                          Passagens Chave
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                          {e.versicosChave.map((ref) => {
                                            const parsed = parseReferencia(ref);
                                            return (
                                              <div key={ref} className="flex items-center gap-1">
                                                {parsed ? (
                                                  <button
                                                    onClick={() => handleVersiculoClick(parsed.livro, parsed.capitulo, parsed.versiculo)}
                                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm hover:bg-primary/20 transition-colors flex items-center gap-1"
                                                  >
                                                    {ref}
                                                    <ExternalLink className="w-3 h-3" />
                                                  </button>
                                                ) : (
                                                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm">
                                                    {ref}
                                                  </span>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      {e.fontes.length > 0 && (
                                        <div>
                                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                            Fontes
                                          </h4>
                                          <p className="text-xs text-foreground/60">{e.fontes.join(' · ')}</p>
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
                </>
              )}
            </AnimatePresence>
          </div>

          {((abaAtiva === 'doutrinas' && doutrinasFiltradas.length === 0) || (abaAtiva === 'estudos' && estudosFiltrados.length === 0)) && (
            <ScrollReveal>
              <div className="sola-card p-12 text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
                <p className="font-display text-xl text-muted-foreground mb-1">
                  {abaAtiva === 'doutrinas' ? 'Nenhuma doutrina encontrada' : 'Nenhum estudo encontrado'}
                </p>
                <p className="text-sm text-muted-foreground/70">Tente usar termos diferentes ou limpar os filtros</p>
              </div>
            </ScrollReveal>
          )}

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

      {painelVersiculo && (
        <PainelDoVersiculo
          livro={painelVersiculo.livro}
          capitulo={painelVersiculo.capitulo}
          versiculo={painelVersiculo.versiculo}
          aberto={true}
          onFechar={() => setPainelVersiculo(null)}
          onVersiculoClick={handleVersiculoClick}
        />
      )}
    </div>
  );
}
