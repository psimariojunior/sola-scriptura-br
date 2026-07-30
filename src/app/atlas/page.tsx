'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Filter, Clock, Route, ChevronDown, ChevronUp, X, BookOpen, Users, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { localizacoesBiblicas, rotasBiblicas, periodosHistoricos, type LocalizacaoBiblica, type RotaBiblica } from '@/data/atlasBiblico';

const BiblicalMap = dynamic(() => import('@/components/BiblicalMap'), { ssr: false, loading: () => (
  <div className="w-full h-[500px] md:h-[600px] rounded-2xl bg-muted/30 animate-pulse flex items-center justify-center">
    <MapPin className="w-8 h-8 text-muted-foreground animate-bounce" />
  </div>
)});

const CATEGORIAS: { id: LocalizacaoBiblica['categoria']; label: string; icone: string; cor: string }[] = [
  { id: 'cidade', label: 'Cidades', icone: '🏛', cor: '#3b82f6' },
  { id: 'montanha', label: 'Montanhas', icone: '⛰', cor: '#a16207' },
  { id: 'rio', label: 'Rios', icone: '🏞', cor: '#0284c7' },
  { id: 'mar', label: 'Mares', icone: '🌊', cor: '#0891b2' },
  { id: 'deserto', label: 'Desertos', icone: '🏜', cor: '#d97706' },
  { id: 'vale', label: 'Vales', icone: '🌿', cor: '#65a30d' },
  { id: 'porto', label: 'Portos', icone: '⚓', cor: '#0369a1' },
  { id: 'santuario', label: 'Santuários', icone: '✝', cor: '#dc2626' },
  { id: 'pais', label: 'Países', icone: '🗺', cor: '#7c3aed' },
  { id: 'regiao', label: 'Regiões', icone: '📍', cor: '#059669' },
];

export default function AtlasPage() {
  const [catFiltro, setCatFiltro] = useState<Set<string>>(new Set(CATEGORIAS.map(c => c.id)));
  const [periodoFiltro, setPeriodoFiltro] = useState<string | null>(null);
  const [rotaAtiva, setRotaAtiva] = useState<string | null>(null);
  const [localSel, setLocalSel] = useState<LocalizacaoBiblica | null>(null);
  const [busca, setBusca] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const locaisFiltrados = useMemo(() => {
    return localizacoesBiblicas.filter(l => {
      if (!catFiltro.has(l.categoria)) return false;
      if (periodoFiltro && l.periodo !== periodoFiltro && l.periodo !== 'ambos') return false;
      if (busca) {
        const q = busca.toLowerCase();
        return l.nome.toLowerCase().includes(q) || l.nomeHebraico?.toLowerCase().includes(q) || l.nomeGriego?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [catFiltro, periodoFiltro, busca]);

  const rotasFiltradas = useMemo(() => {
    if (!rotaAtiva) return [];
    return rotasBiblicas.filter(r => r.id === rotaAtiva);
  }, [rotaAtiva]);

  const toggleCat = useCallback((cat: string) => {
    setCatFiltro(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* ═══ HERO ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center border border-emerald-500/20">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-light">
                  Atlas <span className="text-primary italic">Bíblico</span>
                </h1>
                <p className="text-xs text-muted-foreground">{localizacoesBiblicas.length} locais · {rotasBiblicas.length} rotas · 12 períodos históricos</p>
              </div>
            </div>
          </motion.div>

          {/* ═══ TOOLBAR ═══ */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-4">
            {/* Busca */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar local..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border/50 bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            {/* Filtros toggle */}
            <button onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all',
                mostrarFiltros ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border/50 bg-card/50 hover:bg-muted/50')}>
              <Filter className="w-4 h-4" /> Filtros
              {mostrarFiltros ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {/* Rotas */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-card/50 text-sm font-medium hover:bg-muted/50 transition-all">
                <Route className="w-4 h-4" /> Rotas
              </button>
              <div className="absolute right-0 top-full mt-1 w-72 rounded-xl border border-border bg-card shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button onClick={() => setRotaAtiva(null)}
                  className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', !rotaAtiva ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50')}>
                  Nenhuma rota
                </button>
                {rotasBiblicas.map(r => (
                  <button key={r.id} onClick={() => setRotaAtiva(r.id)}
                    className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                      rotaAtiva === r.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50')}>
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: r.cor }} />
                    <span className="truncate">{r.nome}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══ FILTROS EXPANDÍVEIS ═══ */}
          <AnimatePresence>
            {mostrarFiltros && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4">
                <div className="rounded-2xl border border-border/50 bg-card/50 p-4 space-y-4">
                  {/* Categorias */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Categorias</p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIAS.map(cat => (
                        <button key={cat.id} onClick={() => toggleCat(cat.id)}
                          className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                            catFiltro.has(cat.id)
                              ? 'border-primary/30 bg-primary/10 text-primary'
                              : 'border-border/50 bg-muted/20 text-muted-foreground opacity-50')}>
                          <span>{cat.icone}</span> {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Períodos */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Período Histórico</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setPeriodoFiltro(null)}
                        className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                          !periodoFiltro ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border/50 bg-muted/20 text-muted-foreground')}>
                        Todos
                      </button>
                      {periodosHistoricos.map(p => (
                        <button key={p.id} onClick={() => setPeriodoFiltro(p.id)}
                          className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                            periodoFiltro === p.id ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border/50 bg-muted/20 text-muted-foreground')}>
                          {p.nome}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ MAPA ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border/50 overflow-hidden shadow-lg mb-6">
            <BiblicalMap
              locais={locaisFiltrados}
              rotas={rotasFiltradas}
              selectedId={localSel?.id ?? null}
              onSelect={(id) => setLocalSel(id ? localizacoesBiblicas.find(l => l.id === id) ?? null : null)}
              visibleCategories={catFiltro as Set<LocalizacaoBiblica['categoria']>}
              visibleRotas={new Set(rotasFiltradas.map(r => r.id))}
            />
          </motion.div>

          {/* ═══ LEGENDA ═══ */}
          <div className="flex flex-wrap gap-3 mb-6 text-[11px] text-muted-foreground">
            {CATEGORIAS.filter(c => catFiltro.has(c.id)).map(c => (
              <span key={c.id} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.cor }} />
                {c.icone} {c.label}
              </span>
            ))}
          </div>

          {/* ═══ DETALHE DO LOCAL SELECIONADO ═══ */}
          <AnimatePresence>
            {localSel && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-card/50 p-5 mb-6 relative">
                <button onClick={() => setLocalSel(null)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${CATEGORIAS.find(c => c.id === localSel.categoria)?.cor}20` }}>
                    {CATEGORIAS.find(c => c.id === localSel.categoria)?.icone}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium">{localSel.nome}</h3>
                    {localSel.nomeHebraico && <p className="text-sm text-muted-foreground">{localSel.nomeHebraico}</p>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{localSel.descricao}</p>

                {/* Versículos */}
                {localSel.versiculos.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Referências
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {localSel.versiculos.slice(0, 8).map((v, i) => (
                        <span key={i} className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{v}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Eventos */}
                {localSel.eventos.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Eventos Históricos
                    </p>
                    <div className="space-y-2">
                      {localSel.eventos.slice(0, 4).map((ev, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{ev.titulo}</p>
                            <p className="text-xs text-muted-foreground">{ev.descricao}</p>
                            {ev.versiculos.length > 0 && (
                              <p className="text-[10px] text-primary mt-0.5">{ev.versiculos.join(' · ')}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ TIMELINE ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
            <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Linha do Tempo Bíblica
            </h2>
            <div className="relative">
              {/* Linha central */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
              <div className="space-y-6">
                {periodosHistoricos.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                    className={cn('relative flex items-start gap-4', i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>
                    <div className="hidden md:block flex-1" />
                    <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-card"
                      style={{ borderColor: p.cor }}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.cor }} />
                    </div>
                    <div className="flex-1">
                      <button onClick={() => setPeriodoFiltro(periodoFiltro === p.id ? null : p.id)}
                        className={cn('w-full text-left rounded-xl border p-3 transition-all',
                          periodoFiltro === p.id ? 'border-primary/30 bg-primary/5' : 'border-border/30 hover:border-primary/20 hover:bg-muted/30')}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold" style={{ color: p.cor }}>{p.inicio > 0 ? `${p.inicio} a.C.` : `${Math.abs(p.inicio)} a.C.`}</span>
                          <span className="text-sm font-semibold">{p.nome}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{p.descricao}</p>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══ GRID DE LOCAIS ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mb-8">
            <h2 className="font-display text-lg font-medium mb-4">
              {locaisFiltrados.length} Locais Encontrados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {locaisFiltrados.slice(0, 30).map((local, i) => {
                const catInfo = CATEGORIAS.find(c => c.id === local.categoria);
                return (
                  <motion.button key={local.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.02 }}
                    onClick={() => setLocalSel(local)}
                    className={cn('text-left rounded-xl border p-3 transition-all hover:scale-[1.01]',
                      localSel?.id === local.id ? 'border-primary/30 bg-primary/5' : 'border-border/30 hover:border-primary/20 bg-card/50')}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{catInfo?.icone}</span>
                      <span className="font-medium text-sm">{local.nome}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{local.descricao}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {local.versiculos.slice(0, 3).map((v, vi) => (
                        <span key={vi} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{v}</span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
