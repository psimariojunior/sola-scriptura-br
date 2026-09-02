'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';
import { hrefBiblia, hrefInterlinear } from '@/lib/bibliaHref';
import { cursoParaContinuar, hrefCurso } from '@/lib/cursoProgress';
import type { Curso, CursoAula } from '@/data/cursos';

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

export default function ContinuarLeitura() {
  const [capitulosLidos, setCapitulosLidos] = useState<Set<string>>(new Set());
  const [ultimaLeitura, setUltimaLeitura] = useState<{ livro: string; capitulo: number } | null>(null);
  const [cursoAtual, setCursoAtual] = useState<{ curso: Curso; aula: CursoAula } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCapitulosLidos(carregarCapitulosLidos());
    setUltimaLeitura(carregarUltimaLeitura());
    let cancel = false;
    import('@/data/cursos').then(({ CURSOS }) => {
      if (!cancel) setCursoAtual(cursoParaContinuar(CURSOS));
    });
    return () => {
      cancel = true;
    };
  }, []);

  const progresso = useMemo(() => {
    return Math.min(Math.round((capitulosLidos.size / TOTAL_CHAPTERS) * 100), 100);
  }, [capitulosLidos]);

  if (!mounted) return null;

  const livroAtual = ultimaLeitura ? getBookName(ultimaLeitura.livro) : null;
  const temLeitura = Boolean(ultimaLeitura || capitulosLidos.size > 0);

  return (
    <section className="mb-14" aria-label="Continuar">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-display text-2xl font-normal text-foreground">
          {temLeitura || cursoAtual ? 'Continuar' : 'Comece por aqui'}
        </h2>
        {capitulosLidos.size > 0 && (
          <span className="text-xs tabular-nums text-muted-foreground">
            {progresso}% · {capitulosLidos.size}/{TOTAL_CHAPTERS}
          </span>
        )}
      </div>

      {capitulosLidos.size > 0 && (
        <div className="h-[2px] w-full bg-border mb-5 overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${progresso}%` }}
          />
        </div>
      )}

      <ul className="space-y-2">
        <li>
          <Link
            href={
              ultimaLeitura
                ? hrefBiblia(ultimaLeitura.livro, ultimaLeitura.capitulo)
                : hrefBiblia('gn', 1)
            }
            className="ssb-panel flex items-center justify-between gap-3 min-h-[44px] px-4 py-3 group hover:border-primary/40 transition-colors"
          >
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                Continuar leitura
              </span>
              <span className="block mt-0.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {ultimaLeitura
                  ? `${livroAtual} ${ultimaLeitura.capitulo}`
                  : 'Gênesis 1'}
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </li>

        <li>
          <Link
            href={cursoAtual ? hrefCurso(cursoAtual.curso.id, cursoAtual.aula.id) : '/cursos#introducao'}
            className="ssb-panel flex items-center justify-between gap-3 min-h-[44px] px-4 py-3 group hover:border-primary/40 transition-colors"
          >
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                Continuar curso
              </span>
              <span className="block mt-0.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {cursoAtual
                  ? `${cursoAtual.curso.título} · ${cursoAtual.aula.título}`
                  : '12 cursos introdutórios com vídeo'}
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </li>

        {ultimaLeitura && (
          <li>
            <Link
              href={hrefInterlinear(ultimaLeitura.livro, ultimaLeitura.capitulo)}
              className="ssb-panel flex items-center justify-between gap-3 min-h-[44px] px-4 py-3 group hover:border-primary/40 transition-colors"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                  Original deste capítulo
                </span>
                <span className="block mt-0.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {livroAtual} {ultimaLeitura.capitulo} — hebraico e grego
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
