'use client';

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { fichaProfundaDoDia } from '@/data/estudosCapituloProfundos';
import { hrefBiblia, hrefGuia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';

export default function EstudoDoDia() {
  const ficha = fichaProfundaDoDia();
  const nome = TODOS_LIVROS.find((l) => l.abreviacao === ficha.livro)?.nome ?? ficha.livro;
  const ler = hrefBiblia(ficha.livro, ficha.capitulo);
  const guia = hrefGuia(ficha.livro, ficha.capitulo);

  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-6 mb-12" aria-labelledby="estudo-do-dia">
      <div className="ssb-panel p-5 sm:p-6 border-primary/25">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-primary/80 mb-2 flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5" />
          Estudo profundo de hoje
        </p>
        <h2 id="estudo-do-dia" className="font-display text-2xl sm:text-3xl font-normal text-foreground leading-tight">
          {nome} {ficha.capitulo}
        </h2>
        <p className="mt-1 text-sm font-medium text-primary/90">{ficha.titulo}</p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {ficha.resumo}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={ler}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Ler o capítulo
          </Link>
          <Link
            href={guia}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            Abrir a ficha completa
          </Link>
        </div>
      </div>
    </section>
  );
}
