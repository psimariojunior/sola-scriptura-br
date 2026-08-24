'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { CapaLivro } from '@/components/biblioteca/CapaLivro';
import { motion } from 'framer-motion';
import {
  Library,
  Search,
  Clock,
  BookOpen,
  GraduationCap,
  ScrollText,
  ArrowRight,
  BookMarked,
  History,
  Church,
  Flame,
  Heart,
  Landmark,
  Filter,
} from 'lucide-react';
import {
  OBRAS,
  TOTAL_CAPITULOS,
  TOTAL_MINUTOS,
  CATEGORIAS_INFO,
  type CategoriaObra,
  type ObraMeta,
} from '@/data/biblioteca';


const CATEGORIA_ICONES: Record<CategoriaObra, typeof Church> = {
  'pais-igreja': Church,
  credos: Landmark,
  reforma: Flame,
  espiritualidade: Heart,
  historia: History,
};

const CATEGORIA_CORES: Record<CategoriaObra, { bg: string; text: string }> = {
  'pais-igreja': { bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300' },
  credos: { bg: 'bg-blue-100 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300' },
  reforma: { bg: 'bg-red-100 dark:bg-red-950/40', text: 'text-red-700 dark:text-red-300' },
  espiritualidade: { bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300' },
  historia: { bg: 'bg-stone-200 dark:bg-stone-800/60', text: 'text-stone-700 dark:text-stone-300' },
};

interface ProgressoLeitura {
  [obraId: string]: { ultimoCap: number; lidos: number[] };
}

function formatarTempo(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function seculo(ano: number): string {
  const s = Math.floor((ano - 1) / 100) + 1;
  const romanos = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'];
  return `séc. ${romanos[s - 1]}`;
}

export default function BibliotecaPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<CategoriaObra | null>(null);
  const [filtroDificuldade, setFiltroDificuldade] = useState<string | null>(null);
  const [progresso, setProgresso] = useState<ProgressoLeitura | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ssb_bib_leitura');
      if (raw) setProgresso(JSON.parse(raw));
    } catch {
      /* ignora */
    }
  }, []);

  const obraContinuar = useMemo(() => {
    if (!progresso) return null;
    const entradas = Object.entries(progresso);
    if (entradas.length === 0) return null;
    // obra com maior progresso relativo
    let melhor: { meta: ObraMeta; p: { ultimoCap: number; lidos: number[] } } | null = null;
    for (const [id, p] of entradas) {
      const meta = OBRAS.find((o) => o.id === id);
      if (!meta) continue;
      if (!melhor || p.lidos.length / meta.numCapitulos > melhor.p.lidos.length / melhor.meta.numCapitulos) {
        melhor = { meta, p };
      }
    }
    if (!melhor || melhor.p.lidos.length === 0) return null;
    return melhor;
  }, [progresso]);

  const obrasFiltradas = useMemo(() => {
    let lista = OBRAS;
    if (filtroCategoria) lista = lista.filter((o) => o.categoria === filtroCategoria);
    if (filtroDificuldade) lista = lista.filter((o) => o.dificuldade === filtroDificuldade);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (o) =>
          o.titulo.toLowerCase().includes(q) ||
          o.autor.toLowerCase().includes(q) ||
          o.descricao.toLowerCase().includes(q) ||
          o.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return lista.sort((a, b) => a.ano - b.ano);
  }, [busca, filtroCategoria, filtroDificuldade]);

  const timelineData = useMemo(() => {
    const grupos = new Map<string, ObraMeta[]>();
    for (const o of [...OBRAS].sort((a, b) => a.ano - b.ano)) {
      const sec = seculo(o.ano);
      if (!grupos.has(sec)) grupos.set(sec, []);
      grupos.get(sec)!.push(o);
    }
    return [...grupos.entries()];
  }, []);

  const stats = [
    { valor: OBRAS.length, rotulo: 'Obras-primas', icone: BookMarked },
    { valor: TOTAL_CAPITULOS, rotulo: 'Capítulos', icone: BookOpen },
    { valor: `${TOTAL_MINUTOS / 60 > 0 ? Math.round(TOTAL_MINUTOS / 60) : 1}h+`, rotulo: 'De leitura', icone: Clock },
    { valor: 'XVI séculos', rotulo: 'De história', icone: History },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* ═══════════ HERO ═══════════ */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <Library className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Biblioteca <span className="italic text-primary">Digital</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Os clássicos que mudaram a história da fé — Pais da Igreja, credos
                ecumênicos, a Reforma e testemunhas oculares do mundo bíblico.
                Textos de domínio público, fichas acadêmicas e leitor premium.
                <span className="text-primary font-medium"> Para sempre grátis.</span>
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          {/* ═══════════ STATS ═══════════ */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <motion.div
                  key={s.rotulo}
                  className="sola-card p-4 text-center"
                  whileHover={{ y: -2 }}
                >
                  <s.icone className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-display text-3xl font-light text-primary">{s.valor}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.rotulo}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* ═══════════ CONTINUAR LEITURA ═══════════ */}
          {obraContinuar && (
            <ScrollReveal delay={0.15}>
              <Link
                href={`/biblioteca/${obraContinuar.meta.id}/${obraContinuar.p.ultimoCap}`}
                className="block mb-10"
              >
                <motion.div
                  className="sola-card p-5 flex items-center gap-5 border-l-4 border-l-primary"
                  whileHover={{ y: -3 }}
                >
                  <CapaLivro obra={obraContinuar.meta} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-primary mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Continuar leitura
                    </p>
                    <h3 className="font-semibold text-lg truncate">{obraContinuar.meta.titulo}</h3>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 flex-1 max-w-48 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (obraContinuar.p.lidos.length / obraContinuar.meta.numCapitulos) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {obraContinuar.p.lidos.length}/{obraContinuar.meta.numCapitulos} caps.
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                </motion.div>
              </Link>
            </ScrollReveal>
          )}

          {/* ═══════════ FILTROS ═══════════ */}
          <ScrollReveal delay={0.15}>
            <div className="sola-card p-4 mb-8 sticky top-16 z-30">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar por obra, autor, tema... (ex: batismo, martírio, graça)"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
                  {(Object.keys(CATEGORIAS_INFO) as CategoriaObra[]).map((cat) => {
                    const Icone = CATEGORIA_ICONES[cat];
                    const cores = CATEGORIA_CORES[cat];
                    return (
                      <button
                        key={cat}
                        onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                          filtroCategoria === cat
                            ? 'bg-primary text-primary-foreground'
                            : `${cores.bg} ${cores.text} hover:opacity-80`
                        }`}
                      >
                        <Icone className="w-3.5 h-3.5" />
                        {CATEGORIAS_INFO[cat].rotulo}
                        <span className="opacity-60">({OBRAS.filter((o) => o.categoria === cat).length})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1 pr-1">
                  <GraduationCap className="w-3.5 h-3.5" /> Nível:
                </span>
                {[null, 'Iniciante', 'Intermediário', 'Avançado'].map((d) => (
                  <button
                    key={d ?? 'todos'}
                    onClick={() => setFiltroDificuldade(d)}
                    className={`px-2.5 py-1 text-[11px] rounded-full transition-all ${
                      filtroDificuldade === d
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {d ?? 'Todos'}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ═══════════ LINHA DO TEMPO ═══════════ */}
          {!busca && !filtroCategoria && !filtroDificuldade && (
            <ScrollReveal delay={0.2}>
              <div className="mb-12">
                <h2 className="font-display text-2xl font-light mb-1 text-primary">
                  Dezesseis Séculos em Uma Prateleira
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Do Didaquê às cartas do Irmão Lawrence — cada obra na posição em que a história a colocou.
                </p>
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                  <div className="flex gap-0 min-w-max">
                    {timelineData.map(([sec, obrasSec], i) => (
                      <div key={sec} className="flex">
                        <div className="flex flex-col items-center px-5 relative">
                          {/* ponto no eixo */}
                          <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-md mb-3 shrink-0" />
                          <p className="text-xs font-semibold text-primary mb-3 whitespace-nowrap">{sec}</p>
                          <div className="space-y-2">
                            {obrasSec.map((o) => (
                              <Link
                                key={o.id}
                                href={`/biblioteca/${o.id}`}
                                className="block text-xs px-2.5 py-1.5 rounded-lg bg-muted/70 hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap max-w-44 truncate"
                              >
                                {o.titulo.replace(' (seleções)', '')}
                              </Link>
                            ))}
                          </div>
                          {/* linha do eixo */}
                          {i < timelineData.length - 1 && (
                            <div className="absolute top-[5px] left-full w-10 h-px bg-border" />
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center pl-5">
                      <div className="w-3 h-3 rounded-full border-2 border-border" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* ═══════════ GRID DE OBRAS ═══════════ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {obrasFiltradas.map((obra, i) => {
              const p = progresso?.[obra.id];
              const pct = p ? Math.round((p.lidos.length / obra.numCapitulos) * 100) : 0;
              return (
                <ScrollReveal key={obra.id} delay={Math.min(i * 0.04, 0.4)}>
                  <Link href={`/biblioteca/${obra.id}`} className="group block h-full">
                    <motion.div
                      className="sola-card p-5 h-full flex gap-4"
                      whileHover={{ y: -5 }}
                    >
                      <CapaLivro obra={obra} size="sm" />
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${CATEGORIA_CORES[obra.categoria].bg} ${CATEGORIA_CORES[obra.categoria].text}`}
                          >
                            {CATEGORIAS_INFO[obra.categoria].rotulo}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                            <ScrollText className="w-2.5 h-2.5" /> {obra.edicao === 'integral' ? 'Integral' : 'Seleção'}
                          </span>
                        </div>
                        <h3 className="font-serif font-semibold leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                          {obra.titulo}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2 truncate">
                          {obra.autor.split('(')[0].trim()} · {obra.anoTexto}
                        </p>
                        <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3 mb-3">
                          {obra.descricao}
                        </p>
                        <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {formatarTempo(obra.tempoLeituraMin)}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> {obra.numCapitulos} caps.
                          </span>
                          <span className={`px-1.5 py-0.5 rounded ${obra.dificuldade === 'Iniciante' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' : obra.dificuldade === 'Intermediário' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'}`}>
                            {obra.dificuldade}
                          </span>
                        </div>
                        {pct > 0 && (
                          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {obrasFiltradas.length === 0 && (
            <div className="sola-card p-12 text-center">
              <Search className="w-14 h-14 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
              <p className="font-display text-xl text-muted-foreground mb-1">Nenhuma obra encontrada</p>
              <p className="text-sm text-muted-foreground/70">Tente outro termo ou remova os filtros.</p>
            </div>
          )}

          {/* ═══════════ CHAMADA ACADÊMICA ═══════════ */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 sola-card p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
              <GraduationCap className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-display text-2xl md:text-3xl font-light mb-3">
                Estude como nos <span className="italic text-primary">grandes seminários</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                Estas obras acompanham toda a suíte acadêmica do Sola Scriptura: leia o Didaquê
                junto com a página de História, as Institutas junto com a Teologia Sistemática,
                e Josefo junto com a exegese de Lucas 21 e Marcos 13.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/teologia" className="px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                  Teologia Sistemática <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/historia" className="px-5 py-2.5 text-sm bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2">
                  Contexto Histórico
                </Link>
                <Link href="/estudar" className="px-5 py-2.5 text-sm bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2">
                  Central de Estudos
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
