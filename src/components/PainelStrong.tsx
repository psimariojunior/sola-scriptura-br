'use client';

import { useState, useMemo } from 'react';
import { Search, X, BookText } from 'lucide-react';
import { palavrasGregas } from '@/data/lexicon/grego';
import { palavrasHebraicas } from '@/data/lexicon/hebraico';
import type { PalavraGrega } from '@/data/lexicon/grego';
import type { PalavraHebraica } from '@/data/lexicon/hebraico';

type Palavra = (PalavraGrega | PalavraHebraica) & { idioma: 'grego' | 'hebraico' };

const todas: Palavra[] = [
  ...palavrasGregas.map((p) => ({ ...p, idioma: 'grego' as const })),
  ...palavrasHebraicas.map((p) => ({ ...p, idioma: 'hebraico' as const })),
];

export default function PainelStrong({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState('');
  const [filtroIdioma, setFiltroIdioma] = useState<'todas' | 'grego' | 'hebraico'>('todas');

  const resultados = useMemo(() => {
    let lista = todas;
    if (filtroIdioma !== 'todas') lista = lista.filter((p) => p.idioma === filtroIdioma);
    if (!query.trim()) return lista.slice(0, 50);
    const q = query.toLowerCase();
    return lista.filter(
      (p) =>
        p.strong.toLowerCase().includes(q) ||
        p.palavra.toLowerCase().includes(q) ||
        p.transliteracao.toLowerCase().includes(q) ||
        p.definicao.toLowerCase().includes(q)
    );
  }, [query, filtroIdioma]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <BookText className="w-4 h-4 text-gold" />
          <h3 className="font-display text-lg font-medium">Léxico Strong</h3>
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
            placeholder="Buscar número Strong, palavra grega/hebraica..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        <div className="flex gap-2">
          {(['todas', 'grego', 'hebraico'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFiltroIdioma(t)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                filtroIdioma === t
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'todas' ? 'Todas' : t === 'grego' ? 'Grego' : 'Hebraico'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border/30">
        {resultados.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            Nenhuma palavra encontrada
          </div>
        ) : (
          resultados.map((p) => (
            <div key={p.strong} className="p-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono bg-gold/10 text-gold-dark dark:text-gold-light px-1.5 py-0.5 rounded">
                  {p.strong}
                </span>
                <span className="text-sm" lang={p.idioma === 'grego' ? 'el' : 'he'}>
                  {p.palavra}
                </span>
                <span className="text-xs text-muted-foreground italic">{p.transliteracao}</span>
                <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                  p.idioma === 'grego'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                }`}>
                  {p.idioma}
                </span>
              </div>
              <p className="text-sm text-foreground/80">{p.definicao}</p>
              {p.morfologia && (
                <p className="text-xs text-muted-foreground mt-0.5">{p.morfologia}</p>
              )}
              {p.frequencia !== undefined && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Frequência no NT/AT: {p.frequencia}x
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
