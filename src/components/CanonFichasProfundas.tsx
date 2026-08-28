'use client';

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { listarFichasProfundas } from '@/data/estudosCapituloProfundos';
import { hrefBiblia, hrefGuia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';

export default function CanonFichasProfundas() {
  const fichas = listarFichasProfundas();
  const nome = (abrev: string) => TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;

  return (
    <section className="mb-10" aria-labelledby="canon-profundo">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h2 id="canon-profundo" className="text-lg font-semibold text-foreground">
            Capítulos com ficha profunda
          </h2>
        </div>
        <p className="text-xs tabular-nums text-muted-foreground">{fichas.length} capítulos</p>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Escritas à mão: contexto, teologia, palavras originais e perguntas. Toque para ler o texto ou abrir o guia.
      </p>
      <ul className="grid sm:grid-cols-2 gap-2.5">
        {fichas.map((f) => (
          <li key={`${f.livro}:${f.capitulo}`}>
            <div className="ssb-panel p-3.5 h-full flex flex-col">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80">
                {nome(f.livro)} {f.capitulo}
              </p>
              <p className="text-sm font-medium text-foreground mt-0.5 leading-snug">{f.titulo}</p>
              <div className="mt-auto pt-2.5 flex gap-3 text-xs">
                <Link href={hrefBiblia(f.livro, f.capitulo)} className="font-semibold text-primary hover:underline">
                  Ler
                </Link>
                <Link href={hrefGuia(f.livro, f.capitulo)} className="text-muted-foreground hover:text-foreground">
                  Ficha
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
