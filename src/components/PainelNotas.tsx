'use client';

import { useState, useMemo } from 'react';
import { Search, X, StickyNote } from 'lucide-react';
import { notas } from '@/data/biblia/notas';
import type { NotaEstudo } from '@/data/biblia/notas';

const CATEGORIA_COR: Record<string, string> = {
  teologia: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  historia: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  linguas: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  aplicacao: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  arqueologia: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  profecia: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  cristologia: 'bg-gold/20 text-ink dark:text-gold-light',
  soteriologia: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
};

const CATEGORIA_LABEL: Record<string, string> = {
  teologia: 'Teologia', historia: 'História', linguas: 'Línguas',
  aplicacao: 'Aplicação', arqueologia: 'Arqueologia', profecia: 'Profecia',
  cristologia: 'Cristologia', soteriologia: 'Soteriologia',
};

export default function PainelNotas({
  livroAbrev,
  capitulo,
  onClose,
}: {
  livroAbrev?: string;
  capitulo?: number;
  onClose?: () => void;
}) {
  const [query, setQuery] = useState('');
  const [filtroCat, setFiltroCat] = useState<string | null>(null);

  const notasList = useMemo(() => {
    let lista = Object.values(notas);
    if (livroAbrev && capitulo) {
      const prefix = `${livroAbrev}:${capitulo}:`;
      lista = lista.filter((n) => n.versiculo.startsWith(prefix));
    }
    if (filtroCat) lista = lista.filter((n) => n.categoria === filtroCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      lista = lista.filter(
        (n) =>
          n.titulo.toLowerCase().includes(q) ||
          n.conteudo.toLowerCase().includes(q)
      );
    }
    return lista;
  }, [livroAbrev, capitulo, query, filtroCat]);

  const categorias = useMemo(
    () => [...new Set(Object.values(notas).map((n) => n.categoria))],
    []
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-gold" />
          <h3 className="font-display text-lg font-medium">
            Notas de Estudo
            {livroAbrev && capitulo && (
              <span className="text-sm text-muted-foreground font-normal ml-2">
                {livroAbrev} {capitulo}
              </span>
            )}
          </h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-3 border-b border-border/50 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar notas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        {!livroAbrev && (
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFiltroCat(null)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                !filtroCat ? 'bg-gold/20 text-ink dark:text-parchment' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Todas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroCat(cat === filtroCat ? null : cat)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  filtroCat === cat ? 'bg-gold/20 text-ink dark:text-parchment' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {CATEGORIA_LABEL[cat] || cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border/30">
        {notasList.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            {livroAbrev && capitulo
              ? 'Nenhuma nota para este capítulo'
              : 'Nenhuma nota encontrada'}
          </div>
        ) : (
          notasList.map((nota) => (
            <div key={nota.versiculo} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground shrink-0 mt-0.5">
                  {nota.versiculo}
                </span>
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${CATEGORIA_COR[nota.categoria] || ''}`}>
                  {CATEGORIA_LABEL[nota.categoria] || nota.categoria}
                </span>
              </div>
              <h4 className="font-medium text-sm mb-1">{nota.titulo}</h4>
              <p className="text-xs text-foreground/70 leading-relaxed">{nota.conteudo}</p>
              {nota.referencia && (
                <p className="text-xs text-gold mt-1">
                  <span className="font-medium">Referências: </span>{nota.referencia}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
