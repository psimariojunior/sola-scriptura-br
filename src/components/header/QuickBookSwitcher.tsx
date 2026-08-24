'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';

interface QuickBookSwitcherProps {
  onSelect: (abrev: string) => void;
  activeBook: string | null;
}

export function QuickBookSwitcher({ onSelect, activeBook }: QuickBookSwitcherProps) {
  const { t } = useTranslation();
  const [testamento, setTestamento] = useState<'AT' | 'NT'>('AT');
  const [query, setQuery] = useState('');

  const livros = testamento === 'AT' ? LIVROS_AT : LIVROS_NT;
  const livrosFiltrados = useMemo(() => {
    if (!query.trim()) return livros;
    const q = query.toLowerCase();
    return livros.filter(
      (l) => l.nome.toLowerCase().includes(q) || l.abreviacao.toLowerCase().includes(q)
    );
  }, [livros, query]);

  return (
    <div className="flex flex-col max-h-[70vh]">
      <div className="px-3 pt-3 pb-2 flex items-center gap-2 border-b border-border/40">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('header.searchBook')}
            aria-label={t('header.searchBook')}
            autoFocus
            className="w-full h-8 pl-8 pr-2 text-xs rounded-md border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-muted/60 border border-border/40 shrink-0">
          {(['AT', 'NT'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTestamento(t)}
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${
                testamento === t
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={testamento === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto p-2 max-h-[420px]">
        {livrosFiltrados.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">{t('header.noBooksFound')}</p>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {livrosFiltrados.map((l) => {
              const isActive = activeBook === l.abreviacao;
              return (
                <button
                  key={l.abreviacao}
                  onClick={() => onSelect(l.abreviacao)}
                  className={`book-grid-item justify-start text-left ${
                    isActive ? 'is-active' : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex-1 min-w-0">
                    <span className="block truncate">{l.nome}</span>
                    <span className="block text-[10px] text-muted-foreground/70 font-mono">
                      {l.abreviacao.toUpperCase()} · {l.totalCapitulos}c
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
