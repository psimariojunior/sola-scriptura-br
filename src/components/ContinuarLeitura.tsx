'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ArrowRight, Flame, ChevronRight } from 'lucide-react';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';

const STORAGE_KEY_CHAPTERS = 'ssb_chapters_read';
const STORAGE_KEY_LAST = 'ssb_last_read';
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

function carregarUltimaLeitura(): { livro: string; capitulo: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAST);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function getBookName(abrev: string): string {
  const book = ALL_BOOKS.find((b) => b.abreviacao === abrev);
  return book?.nome ?? abrev;
}

function getBookChapters(abrev: string): number {
  const book = ALL_BOOKS.find((b) => b.abreviacao === abrev);
  return book?.totalCapitulos ?? 1;
}

function getSuggestedNext(lidos: Set<string>): { livro: string; capitulo: number; nomeLivro: string } | null {
  for (const book of ALL_BOOKS) {
    for (let c = 1; c <= book.totalCapitulos; c++) {
      const key = `${book.abreviacao}:${c}`;
      if (!lidos.has(key)) {
        return { livro: book.abreviacao, capitulo: c, nomeLivro: book.nome };
      }
    }
  }
  return null;
}

export default function ContinuarLeitura() {
  const [capitulosLidos, setCapitulosLidos] = useState<Set<string>>(new Set());
  const [ultimaLeitura, setUltimaLeitura] = useState<{ livro: string; capitulo: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCapitulosLidos(carregarCapitulosLidos());
    setUltimaLeitura(carregarUltimaLeitura());
  }, []);

  const progresso = useMemo(() => {
    return Math.min(Math.round((capitulosLidos.size / TOTAL_CHAPTERS) * 100), 100);
  }, [capitulosLidos]);

  const sugestao = useMemo(() => getSuggestedNext(capitulosLidos), [capitulosLidos]);

  if (!mounted) return null;
  if (capitulosLidos.size === 0 && !sugestao) return null;

  const livroAtual = ultimaLeitura ? getBookName(ultimaLeitura.livro) : null;
  const proximoCapitulo = ultimaLeitura ? Math.min(ultimaLeitura.capitulo + 1, getBookChapters(ultimaLeitura.livro)) : 1;
  const proximoIsNovoLivro = ultimaLeitura && proximoCapitulo > getBookChapters(ultimaLeitura.livro);

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6" aria-label="Continuar Leitura">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-amber-500/5"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold">Continuar Leitura</h3>
              {capitulosLidos.size > 0 && (
                <span className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Flame className="w-3 h-3 text-primary" />
                  {capitulosLidos.size} capítulos
                </span>
              )}
            </div>

            {/* Progress */}
            {capitulosLidos.size > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-muted-foreground">{progresso}% da Bíblia</span>
                  <span className="text-[11px] text-muted-foreground">{capitulosLidos.size}/{TOTAL_CHAPTERS}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progresso}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              {ultimaLeitura && (
                <Link
                  href={`/biblia?livro=${ultimaLeitura.livro}&capitulo=${proximoIsNovoLivro ? 1 : proximoCapitulo}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {proximoIsNovoLivro ? 'Próximo Livro' : `${livroAtual} ${proximoCapitulo}`}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Continue de onde parou</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              )}

              {sugestao && (
                <Link
                  href={`/biblia?livro=${sugestao.livro}&capitulo=${sugestao.capitulo}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{sugestao.nomeLivro} {sugestao.capitulo}</p>
                    <p className="text-[11px] text-muted-foreground">Próximo não lido</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
