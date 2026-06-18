'use client';

import { Loader2 } from 'lucide-react';

interface Props {
  testamentos: any[];
  livros: any[];
  selecionado: any;
  onSelecionar: (l: any) => void;
  carregando: boolean;
}

export function LivroNavegacao({ testamentos, livros, selecionado, onSelecionar, carregando }: Props) {
  if (carregando) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
        <Loader2 className="w-4 h-4 animate-spin" />
        Carregando livros...
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-28 space-y-8">
      {testamentos.map((t) => (
        <div key={t.id}>
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3 pb-2 border-b border-border/40">
            {t.nome}
          </h3>
          <div className="space-y-0.5 max-h-[400px] overflow-y-auto pr-2">
            {livros
              .filter((l) => l.testamentoId === t.id)
              .sort((a, b) => a.ordemGeral - b.ordemGeral)
              .map((l) => (
                <button
                  key={l.id}
                  onClick={() => onSelecionar(l)}
                  className={`w-full flex items-center justify-between text-left px-3 py-1.5 text-sm transition-colors ${
                    selecionado?.id === l.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary/40'
                  }`}
                >
                  <span>{l.nome}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{l.nomeAbreviado}</span>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
