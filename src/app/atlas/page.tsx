'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Filter, Clock, Route, ChevronDown, ChevronUp, X, BookOpen, Users, Search, Layers, Globe, BarChart3 } from 'lucide-react';
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

const REGIOES_ZOOM: { id: string; label: string; emoji: string; center: [number, number]; zoom: number }[] = [
  { id: 'israel', label: 'Israel', emoji: '🇮🇱', center: [31.5, 35.0], zoom: 8 },
  { id: 'grecia', label: 'Grécia', emoji: '🇬🇷', center: [39.0, 22.0], zoom: 6 },
  { id: 'roma', label: 'Roma', emoji: '🏛', center: [41.9, 12.5], zoom: 6 },
  { id: 'egito', label: 'Egito', emoji: '🇪🇬', center: [26.8, 30.8], zoom: 6 },
  { id: 'mesopotamia', label: 'Mesopotâmia', emoji: '🏺', center: [33.3, 44.4], zoom: 5 },
  { id: 'anatolia', label: 'Anatólia', emoji: '🏔', center: [39.0, 32.0], zoom: 5 },
];

export default function AtlasPage() {
  const { t } = useTranslation();
  const [catFiltro, setCatFiltro] = useState<Set<string>>(new Set(CATEGORIAS.map(c => c.id)));
  const [periodoFiltro, setPeriodoFiltro] = useState<string | null>(null);
  const [rotaAtiva, setRotaAtiva] = useState<string | null>(null);
  const [localSel, setLocalSel] = useState<LocalizacaoBiblica | null>(null);
  const [busca, setBusca] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [legendaExpandida, setLegendaExpandida] = useState(true);
  const [flyTo, setFlyTo] = useState<{ center: [number, number]; zoom: number } | null>(null);

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

  const stats = useMemo(() => {
    const byCat: Record<string, number> = {};
    for (const l of locaisFiltrados) {
      byCat[l.categoria] = (byCat[l.categoria] || 0) + 1;
    }
    const atCount = locaisFiltrados.filter(l => l.periodo === 'at' || l.periodo === 'ambos').length;
    const ntCount = locaisFiltrados.filter(l => l.periodo === 'nt' || l.periodo === 'ambos').length;
    const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
    return { total: locaisFiltrados.length, byCat, atCount, ntCount, topCat };
  }, [locaisFiltrados]);

  const toggleCat = useCallback((cat: string) => {
    setCatFiltro(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  }, []);

  const handleEventoClick = useCallback((local: LocalizacaoBiblica, eventoIdx: number) => {
    setLocalSel(local);
    setFlyTo({ center: local.coordenadas, zoom: 11 });
  }, []);

  return (
    <PageShell maxWidth="7xl">
          <PageHero
            icon={MapPin}
            align="left"
            title={<>Atlas <span className="italic text-primary">Bíblico</span></>}
            subtitle={`${localizacoesBiblicas.length} locais · ${rotasBiblicas.length} rotas · 12 períodos históricos`}
          />

          {/* ═══ TOOLBAR ═══ */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-4">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar local, evento ou pessoa..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border/50 bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all',
                mostrarFiltros ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border/50 bg-card/50 hover:bg-muted/50')}>
              <Filter className="w-4 h-4" /> Filtros
              {mostrarFiltros ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-card/50 text-sm font-medium hover:bg-muted/50 transition-all">
                <Route className="w-4 h-4" /> Rotas
              </button>
              <div className="absolute right-0 top-full mt-1 w-72 rounded-xl border border-border bg-card shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button onClick={() => setRotaAtiva(null)}
                  className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', !rotaAtiva ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50')}>
                  Sem rota
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
            <div className="w-full h-[500px] md:h-[600px]">
              <BiblicalMap
                locais={locaisFiltrados}
                rotas={rotasFiltradas}
                selectedId={localSel?.id ?? null}
                onSelect={(id) => setLocalSel(id ? localizacoesBiblicas.find(l => l.id === id) ?? null : null)}
                visibleCategories={catFiltro as Set<LocalizacaoBiblica['categoria']>}
                visibleRotas={new Set(rotasFiltradas.map(r => r.id))}
                flyToRegion={flyTo}
              />
            </div>
          </motion.div>

          {/* ═══ ZOOM POR REGIÃO ═══ */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Zoom rápido:
            </span>
            {REGIOES_ZOOM.map(r => (
              <button key={r.id} onClick={() => setFlyTo(r)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 bg-card/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                <span>{r.emoji}</span> {r.label}
              </button>
            ))}
          </motion.div>

          {/* ═══ LEGENDA EXPANSÍVEL + ESTATÍSTICAS ═══ */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border/50 bg-card/50 mb-6 overflow-hidden">
            <button onClick={() => setLegendaExpandida(!legendaExpandida)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Legenda e Estatísticas</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{stats.total} locais</span>
              </div>
              {legendaExpandida ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>

            <AnimatePresence>
              {legendaExpandida && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <div className="px-4 pb-4 space-y-3">
                    {/* Categorias com contadores */}
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Categorias</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
                        {CATEGORIAS.filter(c => catFiltro.has(c.id)).map(c => {
                          const count = stats.byCat[c.id] || 0;
                          const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                          return (
                            <div key={c.id} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-muted/30 border border-border/30">
                              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.cor }} />
                              <div className="min-w-0">
                                <p className="text-[11px] font-medium truncate">{c.icone} {c.label}</p>
                                <p className="text-[10px] text-muted-foreground">{count} ({pct}%)</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Estatísticas gerais */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-border/30">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <BarChart3 className="w-3 h-3 text-primary" />
                        <span className="font-medium">Total:</span>
                        <span className="text-primary font-semibold">{stats.total}</span>
                      </div>
                      <div className="text-[11px]">
                        <span className="text-muted-foreground">AT:</span>{' '}
                        <span className="font-semibold">{stats.atCount}</span>
                      </div>
                      <div className="text-[11px]">
                        <span className="text-muted-foreground">NT:</span>{' '}
                        <span className="font-semibold">{stats.ntCount}</span>
                      </div>
                      {stats.topCat && (
                        <div className="text-[11px]">
                          <span className="text-muted-foreground">Mais comum:</span>{' '}
                          <span className="font-semibold">
                            {CATEGORIAS.find(c => c.id === stats.topCat[0])?.icone}{' '}
                            {CATEGORIAS.find(c => c.id === stats.topCat[0])?.label} ({stats.topCat[1]})
                          </span>
                        </div>
                      )}
                      <div className="text-[11px]">
                        <span className="text-muted-foreground">Rotas ativas:</span>{' '}
                        <span className="font-semibold">{rotasFiltradas.length}</span>
                      </div>
                    </div>

                    {/* Barras de proporção */}
                    <div className="space-y-1.5 pt-2 border-t border-border/30">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Proporção por categoria</p>
                      <div className="flex h-3 rounded-full overflow-hidden bg-muted/30">
                        {CATEGORIAS.filter(c => catFiltro.has(c.id) && (stats.byCat[c.id] || 0) > 0).map(c => {
                          const pct = stats.total > 0 ? ((stats.byCat[c.id] || 0) / stats.total) * 100 : 0;
                          return (
                            <div key={c.id} className="h-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: c.cor }}
                              title={`${c.label}: ${stats.byCat[c.id] || 0}`} />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

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

                {localSel.eventos.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Eventos Históricos
                    </p>
                    <div className="space-y-2">
                      {localSel.eventos.map((ev, i) => (
                        <button key={i} onClick={() => handleEventoClick(localSel, i)}
                          className="w-full text-left flex items-start gap-2 group/event hover:bg-primary/5 rounded-lg p-1.5 -m-1.5 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 group-hover/event:scale-150 transition-transform" />
                          <div>
                            <p className="text-sm font-medium group-hover/event:text-primary transition-colors">{ev.titulo}</p>
                            <p className="text-xs text-muted-foreground">{ev.descricao}</p>
                            {ev.versiculos.length > 0 && (
                              <p className="text-[10px] text-primary mt-0.5">{ev.versiculos.join(' · ')}</p>
                            )}
                          </div>
                        </button>
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
              {locaisFiltrados.length} locais encontrados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {locaisFiltrados.slice(0, 30).map((local, i) => {
                const catInfo = CATEGORIAS.find(c => c.id === local.categoria);
                return (
                  <motion.button key={local.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.02 }}
                    onClick={() => { setLocalSel(local); setFlyTo({ center: local.coordenadas, zoom: 11 }); }}
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
        </PageShell>
  );
}
