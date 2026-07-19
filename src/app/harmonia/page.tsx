'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Columns3, ChevronRight, ChevronDown, ChevronUp, Clock, Layers, X } from 'lucide-react';
import Link from 'next/link';
import {
  getParalelosLivro,
  getParalelosPorCategoria,
  buscarParalelos,
} from '@/data/biblia/sinopticos';
import type { ParaleloSinotico } from '@/data/biblia/sinopticos';

type Categoria = ParaleloSinotico['categoria'] | 'todas';
type Visao = 'colunas' | 'lista';

const CATEGORIAS: { valor: Categoria; label: string }[] = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'narrativa', label: 'Narrativa' },
  { valor: 'parabola', label: 'Parábola' },
  { valor: 'milagre', label: 'Milagre' },
  { valor: 'discurso', label: 'Discurso' },
  { valor: 'ensino', label: 'Ensino' },
  { valor: 'paixao', label: 'Paixão' },
  { valor: 'pos-ressurreicao', label: 'Pós-Ressurreição' },
];

const CATEGORIA_COR: Record<string, string> = {
  narrativa: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  parabola: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  milagre: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  discurso: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  ensino: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  paixao: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'pos-ressurreicao': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

const EVANGELHOS = [
  { chave: 'mateus' as const, abrev: 'Mt', nome: 'Mateus', cor: 'from-blue-500 to-blue-600', corBg: 'bg-blue-500/10', corText: 'text-blue-500', corBorder: 'border-blue-500/30', corDot: 'bg-blue-500' },
  { chave: 'marcos' as const, abrev: 'Mc', nome: 'Marcos', cor: 'from-red-500 to-red-600', corBg: 'bg-red-500/10', corText: 'text-red-500', corBorder: 'border-red-500/30', corDot: 'bg-red-500' },
  { chave: 'lucas' as const, abrev: 'Lc', nome: 'Lucas', cor: 'from-green-500 to-green-600', corBg: 'bg-green-500/10', corText: 'text-green-500', corBorder: 'border-green-500/30', corDot: 'bg-green-500' },
  { chave: 'joao' as const, abrev: 'Jo', nome: 'João', cor: 'from-purple-500 to-purple-600', corBg: 'bg-purple-500/10', corText: 'text-purple-500', corBorder: 'border-purple-500/30', corDot: 'bg-purple-500' },
];

function parseRef(ref: string): { livro: string; capitulo: string; versiculo?: string } {
  const parts = ref.split(':');
  if (parts.length >= 3) return { livro: parts[0], capitulo: parts[1], versiculo: parts[2] };
  if (parts.length === 2) return { livro: parts[0], capitulo: parts[1] };
  return { livro: ref, capitulo: '1' };
}

function RefLink({ ref: r }: { ref: string }) {
  const { livro, capitulo } = parseRef(r);
  return (
    <Link
      href={`/biblia?livro=${livro}&capitulo=${capitulo}`}
      onClick={(e) => e.stopPropagation()}
      className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
    >
      {r.replace(/:/g, ' ')}
    </Link>
  );
}

function getRefs(p: ParaleloSinotico, chave: keyof Pick<ParaleloSinotico, 'mateus' | 'marcos' | 'lucas' | 'joao'>): string[] {
  return (p[chave] as string[] | undefined) ?? [];
}

function hasAllFour(p: ParaleloSinotico): boolean {
  return !!(p.mateus?.length && p.marcos?.length && p.lucas?.length && p.joao?.length);
}

function getPassageCount(p: ParaleloSinotico): number {
  let count = 0;
  if (p.mateus?.length) count += p.mateus.length;
  if (p.marcos?.length) count += p.marcos.length;
  if (p.lucas?.length) count += p.lucas.length;
  if (p.joao?.length) count += p.joao.length;
  return count;
}

function TimelineIndicator({ p }: { p: ParaleloSinotico }) {
  const total = getPassageCount(p);
  return (
    <div className="flex items-center gap-1.5">
      {EVANGELHOS.map((ev) => {
        const refs = getRefs(p, ev.chave);
        return (
          <div key={ev.chave} className="flex items-center gap-0.5" title={`${ev.nome}: ${refs.length > 0 ? refs.join(', ') : '—'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${refs.length > 0 ? ev.corDot : 'bg-muted-foreground/20'}`} />
            <span className={`text-[9px] font-bold uppercase ${refs.length > 0 ? ev.corText : 'text-muted-foreground/30'}`}>
              {ev.abrev}
            </span>
          </div>
        );
      })}
      {total > 1 && (
        <span className="ml-1 text-[9px] text-muted-foreground/50">×{total}</span>
      )}
    </div>
  );
}

function ColunaEvangelho({
  evangelho,
  paralelos,
  expandido,
  onToggle,
}: {
  evangelho: typeof EVANGELHOS[number];
  paralelos: ParaleloSinotico[];
  expandido: string | null;
  onToggle: (id: string) => void;
}) {
  const comPassagem = paralelos.filter((p) => getRefs(p, evangelho.chave).length > 0);

  return (
    <div className="flex flex-col min-w-0">
      <div className={`sticky top-20 z-10 bg-gradient-to-r ${evangelho.cor} px-4 py-3 rounded-t-xl`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/80" />
          <h3 className="text-sm font-bold text-white">{evangelho.nome}</h3>
          <span className="ml-auto text-xs text-white/70">{comPassagem.length}</span>
        </div>
      </div>
      <div className="border border-t-0 rounded-b-xl border-border/50 divide-y divide-border/30 bg-card/50">
        {comPassagem.length === 0 ? (
          <div className="p-6 text-center text-xs text-muted-foreground/50">
            Sem paralelos
          </div>
        ) : (
          comPassagem.map((p) => {
            const refs = getRefs(p, evangelho.chave);
            const isExpanded = expandido === p.id;
            return (
              <motion.div
                key={p.id}
                layout
                className={`p-3 cursor-pointer hover:bg-secondary/30 transition-colors ${isExpanded ? 'bg-secondary/50' : ''}`}
                onClick={() => onToggle(p.id)}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full ${CATEGORIA_COR[p.categoria] ?? 'bg-muted text-muted-foreground'}`}>
                        {p.categoria}
                      </span>
                      {p.fonte && (
                        <span className="text-[9px] text-muted-foreground/60">{p.fonte}</span>
                      )}
                    </div>
                    <h4 className="text-xs font-semibold text-foreground leading-tight mb-1.5">{p.titulo}</h4>
                    <div className="flex flex-wrap gap-1">
                      {refs.map((r) => (
                        <RefLink key={r} ref={r} />
                      ))}
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
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
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <TimelineIndicator p={p} />
                        {p.notas && (
                          <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{p.notas}</p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {refs.map((r) => (
                            <Link
                              key={r}
                              href={`/biblia?livro=${parseRef(r).livro}&capitulo=${parseRef(r).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] px-2 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                            >
                              Ler {r.replace(/:/g, ' ')}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

function MobileTabs({
  paralelos,
  expandido,
  onToggle,
}: {
  paralelos: ParaleloSinotico[];
  expandido: string | null;
  onToggle: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl mb-4">
        {EVANGELHOS.map((ev, i) => {
          const count = paralelos.filter((p) => getRefs(p, ev.chave).length > 0).length;
          return (
            <button
              key={ev.chave}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeTab === i
                  ? `bg-gradient-to-r ${ev.cor} text-white shadow-sm`
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="hidden sm:inline">{ev.nome}</span>
              <span className="sm:hidden">{ev.abrev}</span>
              <span className="ml-1 text-[10px] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <ColunaEvangelho
        evangelho={EVANGELHOS[activeTab]}
        paralelos={paralelos}
        expandido={expandido}
        onToggle={onToggle}
      />
    </div>
  );
}

export default function HarmoniaPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria>('todas');
  const [expandido, setExpandido] = useState<string | null>(null);
  const [visao, setVisao] = useState<Visao>('colunas');

  const paralelos = useMemo(() => {
    let lista = filtroCategoria === 'todas'
      ? getParalelosLivro('mt').length > 0
        ? [...getParalelosLivro('mt'), ...getParalelosLivro('mc'), ...getParalelosLivro('lc'), ...getParalelosLivro('jo')]
        : []
      : getParalelosPorCategoria(filtroCategoria);

    if (filtroCategoria === 'todas') {
      const seen = new Set<string>();
      lista = lista.filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });
    }

    if (busca.trim()) lista = buscarParalelos(busca);

    return lista;
  }, [busca, filtroCategoria]);

  const stats = useMemo(() => ({
    total: paralelos.length,
    categorias: new Set(paralelos.map((p) => p.categoria)).size,
    triplice: paralelos.filter((p) => p.mateus?.length && p.marcos?.length && p.lucas?.length).length,
    quatro: paralelos.filter(hasAllFour).length,
  }), [paralelos]);

  function toggleExpandido(id: string) {
    setExpandido(expandido === id ? null : id);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <Columns3 className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Harmonia <span className="italic text-primary">Sinótica</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                Compare paralelos entre os quatro Evangelhos lado a lado. Identifique fontes, categorias e harmonize os relatos do ministério de Jesus.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search + Filters */}
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar paralelos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                  {busca && (
                    <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setVisao(visao === 'colunas' ? 'lista' : 'colunas')}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    title={visao === 'colunas' ? 'Ver como lista' : 'Ver como colunas'}
                  >
                    {visao === 'colunas' ? <Layers className="w-3.5 h-3.5" /> : <Columns3 className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{visao === 'colunas' ? 'Lista' : 'Colunas'}</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {CATEGORIAS.map((cat) => (
                  <motion.button
                    key={cat.valor}
                    onClick={() => setFiltroCategoria(cat.valor)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-[11px] font-medium rounded-full transition-all duration-200 ${
                      filtroCategoria === cat.valor
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.12}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { value: stats.total, label: 'Paralelos', color: 'text-primary' },
                { value: stats.categorias, label: 'Categorias', color: 'text-amber-500' },
                { value: stats.triplice, label: 'Tríplice', color: 'text-emerald-500' },
                { value: stats.quatro, label: '4 Evangelhos', color: 'text-purple-500' },
              ].map((stat) => (
                <motion.div key={stat.label} className="sola-card p-3 text-center" whileHover={{ y: -2 }}>
                  <p className={`font-display text-2xl font-light ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 px-1 flex-wrap">
            {EVANGELHOS.map((ev) => (
              <div key={ev.chave} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${ev.corDot}`} />
                <span className="text-[11px] font-medium text-muted-foreground">{ev.nome}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 ml-auto">
              <Clock className="w-3 h-3 text-muted-foreground/50" />
              <span className="text-[10px] text-muted-foreground/50">Clique para expandir</span>
            </div>
          </div>

          {/* Content */}
          {visao === 'colunas' ? (
            /* Desktop: Side-by-side columns */
            <div className="hidden lg:grid lg:grid-cols-4 gap-3">
              {EVANGELHOS.map((ev) => (
                <ColunaEvangelho
                  key={ev.chave}
                  evangelho={ev}
                  paralelos={paralelos}
                  expandido={expandido}
                  onToggle={toggleExpandido}
                />
              ))}
            </div>
          ) : null}

          {/* Mobile / Lista view */}
          <div className={visao === 'colunas' ? 'lg:hidden' : ''}>
            {visao === 'colunas' ? (
              <MobileTabs paralelos={paralelos} expandido={expandido} onToggle={toggleExpandido} />
            ) : (
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {paralelos.map((p, i) => {
                    const isExpanded = expandido === p.id;
                    return (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, delay: Math.min(i * 0.01, 0.3) }}
                      >
                        <div
                          className={`sola-card p-4 cursor-pointer transition-all ${isExpanded ? 'ring-2 ring-primary/20' : ''}`}
                          onClick={() => toggleExpandido(p.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${CATEGORIA_COR[p.categoria] ?? 'bg-muted text-muted-foreground'}`}>
                                  {p.categoria}
                                </span>
                                {p.fonte && (
                                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground">
                                    {p.fonte}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-display text-base font-semibold mb-2">{p.titulo}</h3>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {EVANGELHOS.map((ev) => {
                                  const refs = getRefs(p, ev.chave);
                                  return (
                                    <div key={ev.chave} className="flex items-start gap-1.5">
                                      <span className={`text-[10px] font-bold uppercase ${ev.corText}`}>{ev.abrev}</span>
                                      {refs.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                          {refs.map((r) => (
                                            <RefLink key={r} ref={r} />
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-[10px] text-muted-foreground/30">—</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="mt-2">
                                <TimelineIndicator p={p} />
                              </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${isExpanded ? 'rotate-90' : ''}`} />
                          </div>

                          <AnimatePresence>
                            {isExpanded && p.notas && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                                  {p.notas}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {paralelos.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl text-muted-foreground">Nenhum paralelo encontrado</p>
                <p className="text-sm text-muted-foreground/60 mt-2">Tente ajustar os filtros ou a busca</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
