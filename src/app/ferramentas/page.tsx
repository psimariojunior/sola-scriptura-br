'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapPin, Search, X, BookOpen, Globe, ChevronRight } from 'lucide-react';
import { locaisBiblicos, locaisPorTestamento, buscarLocal } from '@/data/biblia/locais';
import type { LocalBiblico } from '@/data/biblia/locais';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

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

  const locais = useMemo(() => {
    let lista = filtroTestamento === 'todos' ? locaisBiblicos : locaisPorTestamento(filtroTestamento);
    if (filtroCategoria !== 'todos') lista = lista.filter((l) => l.categoria === filtroCategoria);
    if (query.trim()) lista = buscarLocal(query);
    return lista;
  }, [filtroTestamento, filtroCategoria, query]);

  const selected = useMemo(() => locaisBiblicos.find((l) => l.id === selectedId) ?? null, [selectedId]);

  const handleSelect = useCallback((id: string) => setSelectedId((prev) => (prev === id ? null : id)), []);

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
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <Globe className="w-8 h-8 text-emerald-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Atlas <span className="italic text-primary">Bíblico</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore os locais bíblicos em um mapa interativo com {locaisBiblicos.length} locais mapeados.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="sola-card rounded-xl overflow-hidden" style={{ height: 'min(70vh, 600px)' }}>
              <MapaBiblico locais={locais} selectedId={selectedId} onSelect={handleSelect} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-4">
              <div className="sola-card rounded-xl p-4">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar local..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {(['todos', 'AT', 'NT', 'ambos'] as const).map((t) => (
                    <motion.button key={t} onClick={() => setFiltroTestamento(t)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${
                        filtroTestamento === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                      }`}>
                      {t === 'todos' ? 'Todos' : t === 'AT' ? 'Antigo Testamento' : t === 'NT' ? 'Novo Testamento' : 'Ambos'}
                    </motion.button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {CATEGORIAS.map((c) => (
                    <motion.button key={c.valor} onClick={() => setFiltroCategoria(c.valor)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`px-2.5 py-1 text-xs rounded transition-all duration-300 ${
                        filtroCategoria === c.valor ? 'bg-primary/20 text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}>
                      {c.label}
                    </motion.button>
                  ))}
                </div>

                {hasFilters && (
                  <button onClick={limparFiltros} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${CATEGORIA_COR[selected.categoria] || ''}`}>
                          {CATEGORIA_ICONE[selected.categoria] || ''} {selected.categoria}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${TESTAMENTO_COR[selected.testamento ?? selected.periodo] || ''}`}>
                          {(selected.testamento ?? selected.periodo) === 'AT' ? 'Antigo Testamento' : (selected.testamento ?? selected.periodo) === 'NT' ? 'Novo Testamento' : 'Ambos Testamentos'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{selected.descricao}</p>
                      {selected.referencias.length > 0 && (
                        <div>
                          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Referências</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selected.referencias.map((ref) => (
                              <span key={ref} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded font-medium">{ref}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <button onClick={() => setSelectedId(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Voltar</button>
                    </motion.div>
                  ) : (
                    <div className="divide-y divide-border/30">
                      {locais.map((local, i) => (
                        <motion.button
                          key={local.id}
                          onClick={() => handleSelect(local.id)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.min(i * 0.02, 0.5) }}
                          className="w-full text-left p-3 hover:bg-muted/50 transition-all duration-300 flex items-center gap-3"
                        >
                          <span className="text-lg">{CATEGORIA_ICONE[local.categoria] || '📍'}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{local.nome}</div>
                            <div className="text-xs text-muted-foreground truncate">{local.descricao}</div>
                          </div>
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8">
          <ScrollReveal delay={0.3}>
            <Link
              href="/ferramentas/concordancia"
              className="sola-card rounded-xl p-5 flex items-center gap-4 hover:border-[var(--brand-default)]/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-default)]/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-[var(--brand-default)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-medium text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
                  Concordância Bíblica
                </h3>
                <p className="text-sm text-muted-foreground">
                  Busque qualquer palavra em toda a Bíblia e veja todas as ocorrências por livro e capítulo.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-[var(--brand-default)] transition-colors shrink-0" />
            </Link>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
