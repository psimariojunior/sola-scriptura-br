'use client';

import { BookOpen } from 'lucide-react';

interface Props {
  livro: any;
  traducao: string;
}

export function TextoBiblico({ livro, traducao }: Props) {
  if (!livro) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <BookOpen className="w-10 h-10 text-primary/30 mb-4" strokeWidth={1} />
        <p className="font-display text-2xl text-muted-foreground italic">
          Selecione um livro para iniciar a leitura
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          66 livros disponíveis · Antigo e Novo Testamento
        </p>
      </div>
    );
  }

  return (
    <article>
      <div className="mb-8 pb-6 border-b border-border/40">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
          {traducao || 'NVI'}
        </p>
        <h2 className="font-display text-4xl font-light text-foreground">{livro.nome}</h2>
        <p className="font-serif-body text-sm text-muted-foreground mt-2">
          {livro.autor} · {livro.dataEscrita} · {livro.totalCapitulos} capítulos
        </p>
        <p className="font-serif-body italic text-muted-foreground mt-2 max-w-2xl">
          {livro.temasPrincipais}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {Array.from({ length: livro.totalCapitulos }, (_, i) => (
          <button
            key={i}
            className="w-10 h-10 flex items-center justify-center text-sm border border-border text-foreground/70 hover:border-primary hover:text-primary transition-colors font-serif-body"
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="sola-card p-10">
        <p className="font-serif-body text-muted-foreground italic text-center py-12">
          O texto dos capítulos será carregado conforme os dados dos versículos forem adicionados ao banco.
          <br />
          A estrutura de {livro.totalCapitulos} capítulos está pronta.
        </p>
      </div>
    </article>
  );
}
