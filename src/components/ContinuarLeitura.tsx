'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';
import { hrefBiblia } from '@/lib/bibliaHref';

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

  const livroAtual = ultimaLeitura ? getBookName(ultimaLeitura.livro) : null;
  const comecar = sugestao ?? { livro: 'gn', capitulo: 1, nomeLivro: 'Gênesis' };

  return (
    <section className="mb-14" aria-label="Continuar Leitura">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-display text-2xl font-normal text-foreground">
          {capitulosLidos.size > 0 || ultimaLeitura ? 'Continuar leitura' : 'Comece a ler'}
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

      <ul className="divide-y divide-border">
        {ultimaLeitura && (
          <li>
            <Link
              href={hrefBiblia(ultimaLeitura.livro, ultimaLeitura.capitulo)}
              className="flex items-center justify-between py-3.5 group"
            >
              <span>
                <span className="block text-sm text-foreground group-hover:text-primary transition-colors">
                  {livroAtual} {ultimaLeitura.capitulo}
                </span>
                <span className="text-xs text-muted-foreground">De onde você parou</span>
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </li>
        )}
        {!ultimaLeitura && (
          <li>
            <Link
              href={hrefBiblia(comecar.livro, comecar.capitulo)}
              className="flex items-center justify-between py-3.5 group"
            >
              <span>
                <span className="block text-sm text-foreground group-hover:text-primary transition-colors">
                  {comecar.nomeLivro} {comecar.capitulo}
                </span>
                <span className="text-xs text-muted-foreground">O melhor ponto para começar</span>
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </li>
        )}
        {sugestao && ultimaLeitura && (sugestao.livro !== ultimaLeitura.livro || sugestao.capitulo !== ultimaLeitura.capitulo) && (
          <li>
            <Link
              href={hrefBiblia(sugestao.livro, sugestao.capitulo)}
              className="flex items-center justify-between py-3.5 group"
            >
              <span>
                <span className="block text-sm text-foreground group-hover:text-primary transition-colors">
                  {sugestao.nomeLivro} {sugestao.capitulo}
                </span>
                <span className="text-xs text-muted-foreground">Próximo não lido</span>
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
