'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cronologia, type EventoCronologia } from '@/data/biblia';
import { getIntroducaoLivro } from '@/data/biblia/introducoes';
import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Globe, CalendarDays, MapPin, Users, Crown, ArrowRight, ChevronDown } from 'lucide-react';

const PainelDoVersiculo = dynamic(() => import('@/components/PainelDoVersiculo'), {
  ssr: false,
  loading: () => null,
});

// ═══════════════════════════════════════════════════════════════════════════════
// MAPEAMENTO DE TIPOS → PERÍODO VISUAL
// ═══════════════════════════════════════════════════════════════════════════════

const TIPO_PARA_PERIODO: Record<EventoCronologia['tipo'], string> = {
  criacao: 'Criação',
  patriarca: 'Patriarcas',
  lei: 'Lei e Conquista',
  reis: 'Reis',
  profeta: 'Profetas',
  exilio: 'Exílio',
  vinda: 'Vida de Cristo',
  igreja: 'Igreja Primitiva',
};

const PERIODOS_CONFIG: Record<string, { cor: string; icone: string; bgHeader: string }> = {
  'Criação':            { cor: 'bg-slate-500',     icone: '🌍', bgHeader: 'from-slate-500 to-slate-600' },
  'Patriarcas':         { cor: 'bg-amber-500',     icone: '⛺', bgHeader: 'from-amber-500 to-amber-600' },
  'Lei e Conquista':    { cor: 'bg-blue-500',      icone: '📜', bgHeader: 'from-blue-500 to-blue-600' },
  'Reis':               { cor: 'bg-purple-500',    icone: '👑', bgHeader: 'from-purple-500 to-purple-600' },
  'Profetas':           { cor: 'bg-rose-500',      icone: '📢', bgHeader: 'from-rose-500 to-rose-600' },
  'Exílio':             { cor: 'bg-red-500',       icone: '🏛️', bgHeader: 'from-red-500 to-red-600' },
  'Vida de Cristo':     { cor: 'bg-green-500',     icone: '✝️', bgHeader: 'from-green-500 to-green-600' },
  'Igreja Primitiva':   { cor: 'bg-cyan-500',      icone: '🔥', bgHeader: 'from-cyan-500 to-cyan-600' },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CIVILIZAÇÕES PARALELAS
// ═══════════════════════════════════════════════════════════════════════════════

interface Civilizacao {
  nome: string;
  inicio: number;
  fim: number;
  cor: string;
  abbr: string;
}

const CIVILIZACOES: Civilizacao[] = [
  { nome: 'Egito',     inicio: -3100, fim: -30,    cor: 'bg-yellow-700', abbr: 'EG' },
  { nome: 'Assíria',    inicio: -2500, fim: -609,   cor: 'bg-orange-700', abbr: 'AS' },
  { nome: 'Babilônia',  inicio: -1894, fim: -539,   cor: 'bg-amber-700',  abbr: 'BA' },
  { nome: 'Pérsia',     inicio: -550,  fim: -330,   cor: 'bg-teal-700',   abbr: 'PÉ' },
  { nome: 'Grécia',     inicio: -800,  fim: -146,   cor: 'bg-indigo-700', abbr: 'GR' },
  { nome: 'Roma',       inicio: -753,  fim: 476,    cor: 'bg-red-700',    abbr: 'RO' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════════════════════

function parseAno(anoStr: string): number {
  const match = anoStr.match(/~?(\d+)\s*(a\.C\.|d\.C\.)/);
  if (!match) return 0;
  const valor = parseInt(match[1], 10);
  return match[2] === 'a.C.' ? -valor : valor;
}

function extrairLivroCapitulo(ref: string): { livro: string; capitulo: number } | null {
  const m = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+)/);
  if (!m) return null;
  return { livro: m[1].toLowerCase().replace(/\s+/g, ''), capitulo: parseInt(m[2], 10) };
}

function agruparPorPeriodo(eventos: EventoCronologia[]): Map<string, EventoCronologia[]> {
  const mapa = new Map<string, EventoCronologia[]>();
  for (const e of eventos) {
    const periodo = TIPO_PARA_PERIODO[e.tipo];
    const arr = mapa.get(periodo) || [];
    arr.push(e);
    mapa.set(periodo, arr);
  }
  return mapa;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export default function HistoriaPage() {
  const [aba, setAba] = useState<'periodos' | 'timeline' | 'civilizacoes'>('periodos');
  const [periodoExpandido, setPeriodoExpandido] = useState<string | null>(null);
  const [painelVersiculo, setPainelVersiculo] = useState<{
    livro: string;
    capitulo: number;
    versiculo: number;
  } | null>(null);

  const eventosPorPeriodo = useMemo(() => agruparPorPeriodo(cronologia), []);

  const periodosOrdenados = useMemo(() => {
    const ordem: EventoCronologia['tipo'][] = ['criacao', 'patriarca', 'lei', 'reis', 'profeta', 'exilio', 'vinda', 'igreja'];
    return ordem.map(tipo => ({
      tipo,
      nome: TIPO_PARA_PERIODO[tipo],
      eventos: eventosPorPeriodo.get(TIPO_PARA_PERIODO[tipo]) || [],
      config: PERIODOS_CONFIG[TIPO_PARA_PERIODO[tipo]],
    })).filter(p => p.eventos.length > 0);
  }, [eventosPorPeriodo]);

  const handleVersiculoClick = useCallback((livro: string, cap: number, ver: number) => {
    setPainelVersiculo({ livro, capitulo: cap, versiculo: ver });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                Contexto Histórico das Escrituras
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                História <span className="text-primary italic">Bíblica</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {cronologia.length} eventos cronológicos reais — viaje através dos tempos bíblicos
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-1.5 mb-8 rounded-2xl">
              <div className="flex">
                {([
                  { id: 'periodos' as const, label: 'Períodos', icon: BookOpen },
                  { id: 'timeline' as const, label: 'Linha do Tempo', icon: CalendarDays },
                  { id: 'civilizacoes' as const, label: 'Civilizações', icon: Globe },
                ]).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setAba(id)}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl transition-all ${
                      aba === id
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {aba === 'periodos' && (
            <div className="space-y-6">
              {periodosOrdenados.map((p, i) => {
                const config = p.config;
                const introLivro = p.eventos[0]
                  ? getIntroducaoLivro(extrairLivroCapitulo(p.eventos[0].referencia)?.livro || '')
                  : undefined;

                return (
                  <ScrollReveal key={p.tipo} delay={i * 0.06}>
                    <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
                      <button
                        onClick={() => setPeriodoExpandido(periodoExpandido === p.nome ? null : p.nome)}
                        className="w-full"
                      >
                        <div className={`px-6 py-5 bg-gradient-to-r ${config.bgHeader}`}>
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                              {config.icone}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-xl font-display text-white font-semibold">{p.nome}</h2>
                                <span className="text-xs font-medium text-white/80 bg-white/20 px-3 py-1 rounded-full">
                                  {p.eventos.length} eventos
                                </span>
                              </div>
                              {p.eventos.length > 0 && (
                                <p className="text-sm text-white/80 mt-1">
                                  {p.eventos[0].ano} — {p.eventos[p.eventos.length - 1].ano}
                                </p>
                              )}
                            </div>
                            <motion.div animate={{ rotate: periodoExpandido === p.nome ? 180 : 0 }}>
                              <ChevronDown className="w-5 h-5 text-white/80" />
                            </motion.div>
                          </div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {periodoExpandido === p.nome && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6">
                              {introLivro && (
                                <div className="mb-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Contexto</p>
                                  <p className="text-sm text-foreground/70 font-serif-body">{introLivro.nomeCompleto} — {introLivro.autor}</p>
                                </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {p.eventos.map((e, j) => {
                                  const livroRef = extrairLivroCapitulo(e.referencia);
                                  return (
                                    <div
                                      key={j}
                                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all group"
                                    >
                                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
                                      <div className="flex-1 min-w-0">
                                        <span className="text-sm font-medium group-hover:text-primary transition-colors block truncate">
                                          {e.evento}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-mono">{e.ano}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        {livroRef && (
                                          <Link
                                            href={`/biblia?livro=${livroRef.livro}&capitulo=${livroRef.capitulo}`}
                                            className="text-xs text-primary/70 hover:text-primary px-2 py-0.5 rounded bg-primary/5 hover:bg-primary/10 transition-colors"
                                          >
                                            {e.referencia}
                                          </Link>
                                        )}
                                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {aba === 'timeline' && (
            <ScrollReveal>
              <div className="glass-card p-6 sm:p-8 rounded-2xl">
                <h2 className="font-display text-2xl font-semibold mb-2 flex items-center gap-3">
                  <CalendarDays className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  Linha do Tempo Bíblica
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  {cronologia.length} eventos — clique em uma referência para abrir na Bíblia
                </p>

                <div className="relative">
                  <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-500 via-primary to-cyan-500" />

                  <div className="space-y-6">
                    {cronologia.map((item, i) => {
                      const periodo = TIPO_PARA_PERIODO[item.tipo];
                      const config = PERIODOS_CONFIG[periodo];
                      const livroRef = extrairLivroCapitulo(item.referencia);

                      return (
                        <div
                          key={i}
                          className={`relative flex items-center gap-4 sm:gap-8 ${
                            i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                          }`}
                        >
                          <div className={`absolute left-4 sm:left-1/2 w-4 h-4 ${config.cor} rounded-full -translate-x-2 sm:-translate-x-2 z-10 ring-4 ring-background`} />

                          <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                            <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all">
                              <div className={`flex items-center gap-2 mb-1 ${i % 2 === 0 ? 'sm:justify-end' : ''}`}>
                                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground">
                                  {periodo}
                                </span>
                              </div>
                              <p className="font-mono text-sm text-primary font-semibold">{item.ano}</p>
                              <h3 className="font-semibold text-sm">{item.evento}</h3>
                              {livroRef && (
                                <Link
                                  href={`/biblia?livro=${livroRef.livro}&capitulo=${livroRef.capitulo}`}
                                  className="text-xs text-primary/60 hover:text-primary font-mono mt-1 inline-block transition-colors"
                                >
                                  {item.referencia}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {aba === 'civilizacoes' && (
            <ScrollReveal>
              <div className="glass-card p-6 sm:p-8 rounded-2xl">
                <h2 className="font-display text-2xl font-semibold mb-2 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  Civilizações e o Povo de Deus
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Impérios que moldaram o cenário bíblico
                </p>

                <div className="space-y-4">
                  {CIVILIZACOES.map((civ, i) => (
                    <motion.div
                      key={civ.nome}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 rounded-xl ${civ.cor} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                        {civ.abbr}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-sm">{civ.nome}</h3>
                          <span className="text-xs text-muted-foreground font-mono">
                            {civ.inicio < 0 ? `${Math.abs(civ.inicio)} a.C.` : `${civ.inicio} d.C.`} — {civ.fim < 0 ? `${Math.abs(civ.fim)} a.C.` : `${civ.fim} d.C.`}
                          </span>
                        </div>
                        <div className="relative h-4 rounded-full overflow-hidden bg-muted">
                          <div
                            className={`absolute h-full ${civ.cor} opacity-30 rounded-full`}
                            style={{
                              left: `${Math.max(0, ((civ.inicio + 4000) / 4500) * 100)}%`,
                              width: `${((civ.fim - civ.inicio) / 4500) * 100}%`,
                            }}
                          />
                          <div
                            className={`absolute h-full ${civ.cor} rounded-full`}
                            style={{
                              left: `${Math.max(0, ((civ.inicio + 4000) / 4500) * 100)}%`,
                              width: `${((civ.fim - civ.inicio) / 4500) * 100}%`,
                              opacity: 0.7,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <h3 className="font-semibold text-sm mb-4">Linha do Tempo Comparativa</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {cronologia
                        .filter(e => ['patriarca', 'lei', 'reis', 'exilio', 'vinda'].includes(e.tipo))
                        .filter((_, i) => i % 5 === 0)
                        .map((e, i) => {
                          const livroRef = extrairLivroCapitulo(e.referencia);
                          return (
                            <div key={i} className="p-3 bg-muted/30 rounded-xl">
                              <p className="text-[10px] text-muted-foreground font-mono">{e.ano}</p>
                              <p className="text-xs font-medium truncate">{e.evento}</p>
                              {livroRef && (
                                <Link
                                  href={`/biblia?livro=${livroRef.livro}&capitulo=${livroRef.capitulo}`}
                                  className="text-[10px] text-primary/60 hover:text-primary font-mono"
                                >
                                  {e.referencia}
                                </Link>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="glass-card p-6 sm:p-8 rounded-2xl mt-8">
              <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
                Contexto Cultural
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2">Geografia</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    A terra de Israel, o Crescente Fértil e as rotas comerciais conectam os eventos bíblicos. O Jordão, o Mediterrâneo e o deserto são cenários centrais.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-amber-500/5 to-amber-500/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-amber-600 mb-2">Cultura</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Sociedade tribal, pastoril e agrícola. A família e o clã são a base social. Honra, hospitalidade e aliança são valores fundamentais.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-purple-600 mb-2">Impérios</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Egito, Assíria, Babilônia, Pérsia, Grécia e Roma dominaram Israel em diferentes períodos, moldando seu contexto político e religioso.
                  </p>
                </div>
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
