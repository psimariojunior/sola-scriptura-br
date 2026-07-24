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
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-base">Continuar Leitura</h3>
              {capitulosLidos.size > 0 && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {capitulosLidos.size} capítulos
                </span>
              )}
            </div>

            {capitulosLidos.size > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{progresso}% da Bíblia</span>
                  <span className="text-xs text-muted-foreground">{capitulosLidos.size}/{TOTAL_CHAPTERS}</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              {ultimaLeitura && (
                <Link
                  href={`/biblia?livro=${ultimaLeitura.livro}&capitulo=${proximoIsNovoLivro ? 1 : proximoCapitulo}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {proximoIsNovoLivro ? 'Próximo Livro' : `${livroAtual} ${proximoCapitulo}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Continue de onde parou</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              )}

              {sugestao && (
                <Link
                  href={`/biblia?livro=${sugestao.livro}&capitulo=${sugestao.capitulo}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{sugestao.nomeLivro} {sugestao.capitulo}</p>
                    <p className="text-xs text-muted-foreground">Próximo não lido</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
