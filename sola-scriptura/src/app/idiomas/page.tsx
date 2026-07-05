'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { palavrasOriginais } from '@/data/biblia';
import { Search, X } from 'lucide-react';

export default function IdiomasPage() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'grego' | 'hebraico'>('todos');

  const filtradas = palavrasOriginais.filter((p) => {
    const matchBusca = busca === '' ||
      p.palavra.toLowerCase().includes(busca.toLowerCase()) ||
      p.transliteracao.toLowerCase().includes(busca.toLowerCase()) ||
      p.definicao.toLowerCase().includes(busca.toLowerCase()) ||
      p.strong.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro = filtro === 'todos' || p.idioma === filtro;
    return matchBusca && matchFiltro;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Línguas Originais</h1>
            <p className="text-muted-foreground">Grego Koiné e Hebraico Bíblico — léxico, morfologia e significado</p>
          </div>

          {/* Search */}
          <div className="sola-card p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar palavra, Strong ou definição..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {busca && (
                  <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {(['todos', 'grego', 'hebraico'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltro(f)}
                    className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                      filtro === f
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {f === 'todos' ? 'Todos' : f === 'grego' ? 'Grego' : 'Hebraico'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtradas.map((p) => (
              <div key={p.strong} className="sola-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1">{p.strong}</span>
                  <span className={`text-xs font-medium px-2 py-1 ${
                    p.idioma === 'grego' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                  }`}>
                    {p.idioma === 'grego' ? 'Grego' : 'Hebraico'}
                  </span>
                </div>
                <p className="font-serif text-3xl mb-1">{p.palavra}</p>
                <p className="text-sm text-muted-foreground italic mb-3">{p.transliteracao}</p>
                <p className="text-sm leading-relaxed mb-3">{p.definicao}</p>
                {p.morfologia && (
                  <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-sm">{p.morfologia}</p>
                )}
              </div>
            ))}
          </div>

          {filtradas.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Nenhuma palavra encontrada para &ldquo;{busca}&rdquo;</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
