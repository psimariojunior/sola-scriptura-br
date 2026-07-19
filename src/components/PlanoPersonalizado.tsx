'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Play,
  Target,
  Flame,
  Trophy,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';
import ScrollReveal from '@/components/ScrollReveal';

const STORAGE_KEY_CHAPTERS = 'ssb_chapters_read';
const STORAGE_KEY_LAST = 'ssb_last_read';
const STORAGE_KEY_CUSTOM_PLAN = 'ssb_custom_plan';
const TOTAL_CHAPTERS = 1189;

const ALL_BOOKS: LivroInfo[] = [...LIVROS_AT, ...LIVROS_NT];

function carregarCapitulosLidos(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHAPTERS);
    if (raw) {
      const arr: string[] = JSON.parse(raw);
      return new Set(arr);
    }
  } catch {}
  return new Set();
}

function salvarCapitulosLidos(capitulos: Set<string>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_CHAPTERS, JSON.stringify([...capitulos]));
}

function carregarUltimaLeitura(): { livro: string; capitulo: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAST);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function salvarUltimaLeitura(livro: string, capitulo: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_LAST, JSON.stringify({ livro, capitulo }));
}

interface CustomPlan {
  tipo: '90dias' | '1ano' | '6meses' | '3meses';
  capitulosPorDia: number;
  capitulosLidos: string[];
  dataInicio: string;
}

function carregarPlanoCustom(): CustomPlan | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_PLAN);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function salvarPlanoCustom(plan: CustomPlan) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_CUSTOM_PLAN, JSON.stringify(plan));
}

function getBookName(abrev: string): string {
  const book = ALL_BOOKS.find((b) => b.abreviacao === abrev);
  return book?.nome ?? abrev;
}

function getBookChapters(abrev: string): number {
  const book = ALL_BOOKS.find((b) => b.abreviacao === abrev);
  return book?.totalCapitulos ?? 1;
}

function buildOrderedChapters(): { livro: string; capitulo: number }[] {
  const chapters: { livro: string; capitulo: number }[] = [];
  for (const book of ALL_BOOKS) {
    for (let c = 1; c <= book.totalCapitulos; c++) {
      chapters.push({ livro: book.abreviacao, capitulo: c });
    }
  }
  return chapters;
}

function getSuggestedNext(lidos: Set<string>): { livro: string; capitulo: number; nomeLivro: string } | null {
  const allChapters = buildOrderedChapters();
  for (const ch of allChapters) {
    const key = `${ch.livro}:${ch.capitulo}`;
    if (!lidos.has(key)) {
      return { ...ch, nomeLivro: getBookName(ch.livro) };
    }
  }
  return null;
}

export default function PlanoPersonalizado() {
  const [capitulosLidos, setCapitulosLidos] = useState<Set<string>>(new Set());
  const [ultimaLeitura, setUltimaLeitura] = useState<{ livro: string; capitulo: number } | null>(null);
  const [planoCustom, setPlanoCustom] = useState<CustomPlan | null>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState<CustomPlan['tipo'] | null>(null);

  useEffect(() => {
    setCapitulosLidos(carregarCapitulosLidos());
    setUltimaLeitura(carregarUltimaLeitura());
    setPlanoCustom(carregarPlanoCustom());
  }, []);

  const progresso = useMemo(() => {
    return Math.min(Math.round((capitulosLidos.size / TOTAL_CHAPTERS) * 100), 100);
  }, [capitulosLidos]);

  const sugestao = useMemo(() => getSuggestedNext(capitulosLidos), [capitulosLidos]);

  const customProgress = useMemo(() => {
    if (!planoCustom) return 0;
    const totalForPlan = ALL_BOOKS.reduce((acc, b) => acc + b.totalCapitulos, 0);
    return Math.min(Math.round((planoCustom.capitulosLidos.length / totalForPlan) * 100), 100);
  }, [planoCustom]);

  const handleMarkRead = useCallback((livro: string, capitulo: number) => {
    setCapitulosLidos((prev) => {
      const next = new Set(prev);
      const key = `${livro}:${capitulo}`;
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      salvarCapitulosLidos(next);
      return next;
    });
    setUltimaLeitura({ livro, capitulo });
    salvarUltimaLeitura(livro, capitulo);
  }, []);

  const handleCreatePlan = useCallback((tipo: CustomPlan['tipo']) => {
    const capitulos = buildOrderedChapters();
    const plan: CustomPlan = {
      tipo,
      capitulosPorDia: tipo === '90dias' ? 14 : tipo === '6meses' ? 7 : tipo === '1ano' ? 4 : 13,
      capitulosLidos: [],
      dataInicio: new Date().toISOString(),
    };
    setPlanoCustom(plan);
    salvarPlanoCustom(plan);
    setShowPlanModal(false);
  }, []);

  const handleClearProgress = useCallback(() => {
    setCapitulosLidos(new Set());
    setUltimaLeitura(null);
    setPlanoCustom(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_CHAPTERS);
      localStorage.removeItem(STORAGE_KEY_LAST);
      localStorage.removeItem(STORAGE_KEY_CUSTOM_PLAN);
    }
  }, []);

  const planOptions = [
    { tipo: '90dias' as const, label: '90 Dias', desc: '~14 capítulos/dia', icon: '⚡' },
    { tipo: '6meses' as const, label: '6 Meses', desc: '~7 capítulos/dia', icon: '📖' },
    { tipo: '1ano' as const, label: '1 Ano', desc: '~4 capítulos/dia', icon: '📅' },
    { tipo: '3meses' as const, label: '3 Meses', desc: '~13 capítulos/dia', icon: '🔥' },
  ];

  const livroAtual = ultimaLeitura ? getBookName(ultimaLeitura.livro) : null;
  const proximoCapitulo = ultimaLeitura ? Math.min(ultimaLeitura.capitulo + 1, getBookChapters(ultimaLeitura.livro)) : 1;
  const proximoIsNovoLivro = ultimaLeitura && proximoCapitulo > getBookChapters(ultimaLeitura.livro);

  return (
    <ScrollReveal>
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Meu Progresso Bíblico</h2>
              <p className="text-xs text-muted-foreground">Acompanhe sua jornada através das Escrituras</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">{capitulosLidos.size} de {TOTAL_CHAPTERS} capítulos lidos</span>
              <span className="text-xs font-bold text-primary">{progresso}%</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-muted-foreground/60">Gênesis 1</span>
              <span className="text-[10px] text-muted-foreground/60">Apocalipse 22</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-primary">{capitulosLidos.size}</p>
              <p className="text-[10px] text-muted-foreground">Lidos</p>
            </div>
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-amber-500">{TOTAL_CHAPTERS - capitulosLidos.size}</p>
              <p className="text-[10px] text-muted-foreground">Restantes</p>
            </div>
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-emerald-500">
                {capitulosLidos.size > 0 ? Math.round((capitulosLidos.size / TOTAL_CHAPTERS) * 100) : 0}%
              </p>
              <p className="text-[10px] text-muted-foreground">Completo</p>
            </div>
          </div>
        </div>

        {/* Continue Reading */}
        {ultimaLeitura && (
          <div className="px-5 sm:px-6 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">Continuar Leitura</h3>
            </div>
            <Link
              href={`/biblia?livro=${ultimaLeitura.livro}&capitulo=${proximoIsNovoLivro ? 1 : proximoCapitulo}`}
              className="block p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {proximoIsNovoLivro ? 'Próximo Livro' : `${livroAtual} ${proximoCapitulo}`}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {proximoIsNovoLivro
                      ? `Continue a sequência`
                      : `Capítulo ${proximoCapitulo} de ${getBookChapters(ultimaLeitura.livro)}`
                    }
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          </div>
        )}

        {/* Suggested Next */}
        {sugestao && (
          <div className="px-5 sm:px-6 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold">Próxima Sugerida</h3>
            </div>
            <Link
              href={`/biblia?livro=${sugestao.livro}&capitulo=${sugestao.capitulo}`}
              className="block p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Target className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{sugestao.nomeLivro} {sugestao.capitulo}</p>
                  <p className="text-[11px] text-muted-foreground">Próximo capítulo não lido</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMarkRead(sugestao.livro, sugestao.capitulo);
                  }}
                  className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/30 transition-colors"
                >
                  Marcar lido
                </button>
              </div>
            </Link>
          </div>
        )}

        {/* Custom Plan Section */}
        <div className="px-5 sm:px-6 py-4">
          {planoCustom ? (
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold">Plano Personalizado</span>
                </div>
                <button
                  onClick={handleClearProgress}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Limpar
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {planOptions.find((o) => o.tipo === planoCustom.tipo)?.label} — {planoCustom.capitulosPorDia} capítulos/dia
              </p>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${customProgress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{customProgress}% concluído</p>
            </div>
          ) : (
            <button
              onClick={() => setShowPlanModal(true)}
              className="w-full p-3 rounded-xl border border-dashed border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold">Criar Plano de Leitura</p>
                  <p className="text-[11px] text-muted-foreground">Leia a Bíblia inteira em um prazo definido</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          )}
        </div>

        {/* Quick Mark Section */}
        <div className="px-5 sm:px-6 pb-4">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              Marcar capítulo como lido
            </summary>
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-1.5">
              {ALL_BOOKS.map((book) => (
                <button
                  key={book.abreviacao}
                  onClick={() => {
                    const ultimaCap = capitulosLidos.size > 0
                      ? [...capitulosLidos].filter((k) => k.startsWith(book.abreviacao + ':')).length
                      : 0;
                    const nextCap = ultimaCap + 1;
                    if (nextCap <= book.totalCapitulos) {
                      handleMarkRead(book.abreviacao, nextCap);
                    }
                  }}
                  className="px-2 py-1.5 text-[10px] font-medium rounded-md bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-left truncate"
                  title={`${book.nome} — próximo capítulo`}
                >
                  {book.nome}
                </button>
              ))}
            </div>
          </details>
        </div>

        {/* Plan Modal */}
        <AnimatePresence>
          {showPlanModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
              onClick={() => setShowPlanModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold">Escolha seu plano</h3>
                  <button onClick={() => setShowPlanModal(false)}>
                    <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
                <div className="space-y-2">
                  {planOptions.map((opt) => (
                    <button
                      key={opt.tipo}
                      onClick={() => handleCreatePlan(opt.tipo)}
                      className={`w-full p-3 rounded-xl border text-left transition-all hover:border-primary/30 hover:bg-primary/5 ${
                        selectedPlanType === opt.tipo ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{opt.icon}</span>
                        <div>
                          <p className="text-sm font-semibold">{opt.label}</p>
                          <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}
