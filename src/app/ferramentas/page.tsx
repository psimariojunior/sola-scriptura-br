'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  MapPin, Search, Filter, X, BookOpen,
  Globe, ChevronDown, Cross
} from 'lucide-react';
import { locaisBiblicos, locaisPorTestamento, buscarLocal } from '@/data/biblia/locais';
import type { LocalBiblico } from '@/data/biblia/locais';

const MapaBiblico = dynamic(() => import('./MapaBiblico'), { ssr: false });

type FiltroTestamento = 'todos' | 'AT' | 'NT' | 'ambos';
type FiltroCategoria = 'todos' | LocalBiblico['categoria'];

const CATEGORIAS: { valor: FiltroCategoria; label: string }[] = [
  { valor: 'todos', label: 'Todas' },
  { valor: 'cidade', label: 'Cidades' },
  { valor: 'regiao', label: 'Regiões' },
  { valor: 'monte', label: 'Montes' },
  { valor: 'mar', label: 'Mares' },
  { valor: 'rio', label: 'Rios' },
  { valor: 'deserto', label: 'Desertos' },
];

const CATEGORIA_COR: Record<string, string> = {
  cidade: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  regiao: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  monte: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  mar: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  rio: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  deserto: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
};

const CATEGORIA_ICONE: Record<string, string> = {
  cidade: '🏙️', regiao: '🗺️', monte: '⛰️', mar: '🌊', rio: '🏞️', deserto: '🏜️',
};

const TESTAMENTO_COR: Record<string, string> = {
  AT: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  NT: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  ambos: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

export default function FerramentasPage() {
  const [filtroTestamento, setFiltroTestamento] = useState<FiltroTestamento>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroCategoria>('todos');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  const locais = useMemo(() => {
    let lista = filtroTestamento === 'todos'
      ? locaisBiblicos
      : locaisPorTestamento(filtroTestamento);
    if (filtroCategoria !== 'todos') {
      lista = lista.filter((l) => l.categoria === filtroCategoria);
    }
    if (query.trim()) {
      lista = buscarLocal(query);
    }
    return lista;
  }, [filtroTestamento, filtroCategoria, query]);

  const selected = useMemo(
    () => locaisBiblicos.find((l) => l.id === selectedId) ?? null,
    [selectedId]
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltroTestamento('todos');
    setFiltroCategoria('todos');
    setQuery('');
  }, []);

  const hasFilters = filtroTestamento !== 'todos' || filtroCategoria !== 'todos' || query.trim().length > 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Ferramentas</h1>
              <p className="text-muted-foreground">Atlas bíblico interativo, mapas e recursos de estudo</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Globe className="w-5 h-5 text-gold mt-0.5" />
            <span className="text-sm text-muted-foreground">
              {locaisBiblicos.length} locais bíblicos mapeados
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="sola-card rounded-xl overflow-hidden" style={{ height: 'min(70vh, 600px)' }}>
              <MapaBiblico
                locais={locais}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="sola-card rounded-xl p-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar local..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {(['todos', 'AT', 'NT', 'ambos'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFiltroTestamento(t)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                      filtroTestamento === t
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                    }`}
                  >
                    {t === 'todos' ? 'Todos' : t === 'AT' ? 'Antigo Testamento' : t === 'NT' ? 'Novo Testamento' : 'Ambos'}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {CATEGORIAS.map((c) => (
                  <button
                    key={c.valor}
                    onClick={() => setFiltroCategoria(c.valor)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors ${
                      filtroCategoria === c.valor
                        ? 'bg-gold/20 text-ink dark:text-parchment'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {hasFilters && (
                <button
                  onClick={limparFiltros}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Limpar filtros
                </button>
              )}
            </div>

            <div className="sola-card rounded-xl overflow-hidden">
              <div className="p-3 border-b border-border/50">
                <h3 className="font-display text-lg font-medium">
                  {selected ? selected.nome : locais.length > 0 ? `${locais.length} locais` : 'Nenhum local'}
                </h3>
              </div>
              <div className="overflow-y-auto max-h-[320px]">
                {selected ? (
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${CATEGORIA_COR[selected.categoria] || ''}`}>
                        {CATEGORIA_ICONE[selected.categoria] || ''} {selected.categoria}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${TESTAMENTO_COR[selected.testamento] || ''}`}>
                        {selected.testamento === 'AT' ? 'Antigo Testamento' : selected.testamento === 'NT' ? 'Novo Testamento' : 'Ambos Testamentos'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selected.descricao}</p>
                    {selected.referencias.length > 0 && (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Referências</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selected.referencias.map((ref) => (
                            <span
                              key={ref}
                              className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded font-medium"
                            >
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedId(null)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      ← Voltar
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-border/30">
                    {locais.map((local) => (
                      <button
                        key={local.id}
                        onClick={() => handleSelect(local.id)}
                        className="w-full text-left p-3 hover:bg-muted/50 transition-colors flex items-center gap-3"
                      >
                        <span className="text-lg">{CATEGORIA_ICONE[local.categoria] || '📍'}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{local.nome}</div>
                          <div className="text-xs text-muted-foreground truncate">{local.descricao}</div>
                        </div>
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
