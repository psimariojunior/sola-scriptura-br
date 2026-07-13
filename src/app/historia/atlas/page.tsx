'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { localizacoesBiblicas, rotasBiblicas, periodosHistoricos } from '@/data/atlasBiblico';
import type { LocalizacaoBiblica, RotaBiblica } from '@/data/atlasBiblico';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Mountain,
  Waves,
  Landmark,
  Route,
  Calendar,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  Eye,
  EyeOff,
  Globe,
  BookOpen,
  Map,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

// Dynamic import to avoid SSR issues with Leaflet
const BiblicalMap = dynamic(() => import('@/components/BiblicalMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted/30">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
          <Map className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Carregando mapa...</p>
      </div>
    </div>
  ),
});

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORIES CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORIA_CONFIG: Record<
  LocalizacaoBiblica['categoria'],
  { cor: string; icone: string; label: string }
> = {
  cidade: { cor: '#3b82f6', icone: '🏛', label: 'Cidades' },
  montanha: { cor: '#a16207', icone: '⛰', label: 'Montanhas' },
  rio: { cor: '#0284c7', icone: '🏞', label: 'Rios' },
  mar: { cor: '#0891b2', icone: '🌊', label: 'Mares' },
  deserto: { cor: '#d97706', icone: '🏜', label: 'Desertos' },
  vale: { cor: '#65a30d', icone: '🌿', label: 'Vales' },
  porto: { cor: '#0369a1', icone: '⚓', label: 'Portos' },
  santuario: { cor: '#dc2626', icone: '✝', label: 'Santuários' },
  pais: { cor: '#7c3aed', icone: '🗺', label: 'Países' },
  regiao: { cor: '#059669', icone: '📍', label: 'Regiões' },
};

const CATEGORIAS = Object.keys(CATEGORIA_CONFIG) as LocalizacaoBiblica['categoria'][];

const TESTAMENTO_CONFIG = {
  antigo: { cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', label: 'AT' },
  novo: { cor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', label: 'NT' },
  ambos: { cor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', label: 'AT/NT' },
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function AtlasPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'locais' | 'rotas' | 'periodos' | 'info'>('locais');
  const [visibleCategories, setVisibleCategories] = useState<Set<LocalizacaoBiblica['categoria']>>(
    new Set(CATEGORIAS)
  );
  const [visibleRotas, setVisibleRotas] = useState<Set<string>>(new Set(rotasBiblicas.map((r) => r.id)));
  const [filtroPeriodo, setFiltroPeriodo] = useState<'todos' | 'at' | 'nt'>('todos');
  const [periodoAtivo, setPeriodoAtivo] = useState<string | null>(null);
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RotaBiblica | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ═════ Filtered locations ═════
  const locaisFiltrados = useMemo(() => {
    let result = localizacoesBiblicas;

    if (busca.trim()) {
      const q = busca.toLowerCase();
      result = result.filter(
        (l) =>
          l.nome.toLowerCase().includes(q) ||
          l.nomeHebraico?.toLowerCase().includes(q) ||
          l.nomeGriego?.toLowerCase().includes(q) ||
          l.descricao.toLowerCase().includes(q)
      );
    }

    if (filtroPeriodo !== 'todos') {
      result = result.filter((l) => l.periodo === filtroPeriodo || l.periodo === 'ambos');
    }

    return result.sort((a, b) => b.relevancia - a.relevancia);
  }, [busca, filtroPeriodo]);

  const rotasFiltradas = useMemo(() => {
    if (filtroPeriodo === 'todos') return rotasBiblicas;
    return rotasBiblicas.filter((r) => r.periodo === filtroPeriodo);
  }, [filtroPeriodo]);

  const selectedLocal = useMemo(
    () => (selectedId ? localizacoesBiblicas.find((l) => l.id === selectedId) : null),
    [selectedId]
  );

  // ═════ Handlers ═════
  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const toggleCategory = useCallback((cat: LocalizacaoBiblica['categoria']) => {
    setVisibleCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const toggleRota = useCallback((id: string) => {
    setVisibleRotas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handlePeriodoClick = useCallback((periodoId: string) => {
    setPeriodoAtivo(periodoAtivo === periodoId ? null : periodoId);
  }, [periodoAtivo]);

  // ═════ Stats ═════
  const stats = useMemo(() => ({
    total: localizacoesBiblicas.length,
    cidades: localizacoesBiblicas.filter((l) => l.categoria === 'cidade').length,
    rotas: rotasBiblicas.length,
    periodos: periodosHistoricos.length,
    at: localizacoesBiblicas.filter((l) => l.periodo === 'at').length,
    nt: localizacoesBiblicas.filter((l) => l.periodo === 'nt').length,
  }), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 relative overflow-hidden">
        {/* ═════ HERO ═════ */}
        <div className="relative z-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-transparent" />
          <div className="relative px-4 sm:px-6 pt-6 pb-4">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                      <Map className="w-3.5 h-3.5" />
                      Atlas Interativo
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-light">
                      Atlas <span className="text-primary italic">Bíblico</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stats.total} locais · {stats.rotas} rotas · {stats.periodos} períodos
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <div className="flex bg-muted/50 rounded-lg p-0.5">
                      {(['todos', 'at', 'nt'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setFiltroPeriodo(p)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                            filtroPeriodo === p
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {p === 'todos' ? 'Todos' : p === 'at' ? 'AT' : 'NT'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ═════ MAP + SIDEBAR LAYOUT ═════ */}
        <div className="flex-1 flex relative" style={{ height: 'calc(100vh - 140px)' }}>
          {/* SIDEBAR */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                ref={sidebarRef}
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden md:flex flex-col w-80 border-r border-border bg-card/95 backdrop-blur-xl z-30 flex-shrink-0"
              >
                {/* Sidebar Tabs */}
                <div className="flex border-b border-border">
                  {[
                    { id: 'locais' as const, label: 'Locais', icon: MapPin },
                    { id: 'rotas' as const, label: 'Rotas', icon: Route },
                    { id: 'periodos' as const, label: 'Períodos', icon: Calendar },
                    { id: 'info' as const, label: 'Legenda', icon: Info },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setSidebarTab(id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-3 border-b-2 transition-all ${
                        sidebarTab === id
                          ? 'border-primary text-primary font-semibold'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Search */}
                {sidebarTab === 'locais' && (
                  <div className="p-3 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Buscar local..."
                        className="w-full pl-8 pr-8 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      {busca && (
                        <button
                          onClick={() => setBusca('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto">
                  {sidebarTab === 'locais' && (
                    <div className="p-2 space-y-1">
                      {locaisFiltrados.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-8">Nenhum local encontrado.</p>
                      )}
                      {locaisFiltrados.map((local) => (
                        <button
                          key={local.id}
                          onClick={() => handleSelect(local.id)}
                          className={`w-full text-left p-3 rounded-xl transition-all group ${
                            selectedId === local.id
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-muted/50 border border-transparent'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span
                              className="inline-block w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: CATEGORIA_CONFIG[local.categoria].cor }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                                  {local.nome}
                                </h4>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${TESTAMENTO_CONFIG[local.testamento].cor}`}>
                                  {TESTAMENTO_CONFIG[local.testamento].label}
                                </span>
                              </div>
                              {local.nomeHebraico && (
                                <p className="text-[11px] text-muted-foreground italic truncate">{local.nomeHebraico}</p>
                              )}
                              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{local.descricao}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-[10px] text-muted-foreground">
                                  {Array.from({ length: local.relevancia }, () => '★').join('')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {sidebarTab === 'rotas' && (
                    <div className="p-2 space-y-1">
                      {rotasFiltradas.map((rota) => (
                        <button
                          key={rota.id}
                          onClick={() => {
                            setSelectedRoute(selectedRoute?.id === rota.id ? null : rota);
                            toggleRota(rota.id);
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all group ${
                            selectedRoute?.id === rota.id
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-muted/50 border border-transparent'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span
                              className="w-4 h-1 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: rota.cor }}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                                {rota.nome}
                              </h4>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                {rota.personagem} · {rota.pontos.length} pontos
                              </p>
                              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                                {rota.descricao}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {sidebarTab === 'periodos' && (
                    <div className="p-2 space-y-1">
                      {periodosHistoricos.map((periodo) => (
                        <button
                          key={periodo.id}
                          onClick={() => handlePeriodoClick(periodo.id)}
                          className={`w-full text-left p-3 rounded-xl transition-all ${
                            periodoAtivo === periodo.id
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-muted/50 border border-transparent'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span
                              className="w-3 h-3 rounded-sm mt-1 flex-shrink-0"
                              style={{ backgroundColor: periodo.cor }}
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{periodo.nome}</h4>
                              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                                {periodo.inicio < 0 ? `${Math.abs(periodo.inicio)} a.C.` : `${periodo.inicio} d.C.`} —{' '}
                                {periodo.fim < 0 ? `${Math.abs(periodo.fim)} a.C.` : `${periodo.fim} d.C.`}
                              </p>
                              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
                                {periodo.descricao}
                              </p>
                              {periodoAtivo === periodo.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-2 space-y-0.5"
                                >
                                  {periodo.eventos.map((ev, i) => (
                                    <p key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                                      <span className="text-primary mt-0.5">•</span>
                                      {ev}
                                    </p>
                                  ))}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {sidebarTab === 'info' && (
                    <div className="p-4 space-y-6">
                      {/* Category Legend */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Categorias
                        </h4>
                        <div className="space-y-1.5">
                          {CATEGORIAS.map((cat) => {
                            const config = CATEGORIA_CONFIG[cat];
                            const visible = visibleCategories.has(cat);
                            return (
                              <button
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-all"
                              >
                                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: config.cor }} />
                                <span className={`text-xs flex-1 text-left ${visible ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                                  {config.icone} {config.label}
                                </span>
                                {visible ? (
                                  <Eye className="w-3 h-3 text-muted-foreground" />
                                ) : (
                                  <EyeOff className="w-3 h-3 text-muted-foreground" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Routes Legend */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Rotas
                        </h4>
                        <div className="space-y-1.5">
                          {rotasBiblicas.slice(0, 15).map((rota) => {
                            const visible = visibleRotas.has(rota.id);
                            return (
                              <button
                                key={rota.id}
                                onClick={() => toggleRota(rota.id)}
                                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-all"
                              >
                                <span className="w-4 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: rota.cor }} />
                                <span className={`text-xs flex-1 text-left ${visible ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                                  {rota.nome}
                                </span>
                                {visible ? (
                                  <Eye className="w-3 h-3 text-muted-foreground" />
                                ) : (
                                  <EyeOff className="w-3 h-3 text-muted-foreground" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="bg-muted/30 rounded-xl p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Estatísticas
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Total', value: stats.total, color: 'text-primary' },
                            { label: 'Cidades', value: stats.cidades, color: 'text-blue-500' },
                            { label: 'AT', value: stats.at, color: 'text-amber-500' },
                            { label: 'NT', value: stats.nt, color: 'text-blue-500' },
                            { label: 'Rotas', value: stats.rotas, color: 'text-green-500' },
                            { label: 'Períodos', value: stats.periodos, color: 'text-purple-500' },
                          ].map((s) => (
                            <div key={s.label} className="text-center">
                              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAP CONTAINER */}
          <div className="flex-1 relative">
            {/* Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute top-4 left-4 z-[1000] w-9 h-9 rounded-lg bg-card/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-card transition-all"
              title={sidebarOpen ? 'Fechar sidebar' : 'Abrir sidebar'}
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-4 h-4 text-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-foreground" />
              )}
            </button>

            {/* Selected Location Info Overlay */}
            <AnimatePresence>
              {selectedLocal && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md pointer-events-auto"
                >
                  <div className="glass-card rounded-2xl p-4 shadow-2xl border border-border/50">
                    <div className="flex items-start gap-3">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: CATEGORIA_CONFIG[selectedLocal.categoria].cor }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{selectedLocal.nome}</h3>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${TESTAMENTO_CONFIG[selectedLocal.testamento].cor}`}>
                            {TESTAMENTO_CONFIG[selectedLocal.testamento].label}
                          </span>
                        </div>
                        {selectedLocal.nomeHebraico && (
                          <p className="text-[11px] text-muted-foreground italic">
                            {selectedLocal.nomeHebraico}
                            {selectedLocal.nomeGriego && ` / ${selectedLocal.nomeGriego}`}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {selectedLocal.descricao}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {CATEGORIA_CONFIG[selectedLocal.categoria].label}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {selectedLocal.periodo === 'at' ? 'Antigo Testamento' : selectedLocal.periodo === 'nt' ? 'Novo Testamento' : 'Ambos'}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {selectedLocal.relevancia}/10
                          </span>
                        </div>
                        {selectedLocal.versiculos.length > 0 && (
                          <div className="mt-2">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Referências</p>
                            <p className="text-[11px] text-primary leading-relaxed">
                              {selectedLocal.versiculos.join(' · ')}
                            </p>
                          </div>
                        )}
                        {selectedLocal.eventos.length > 0 && (
                          <div className="mt-2">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              Eventos ({selectedLocal.eventos.length})
                            </p>
                            <div className="space-y-1">
                              {selectedLocal.eventos.map((ev, i) => (
                                <div key={i} className="flex items-start gap-1.5">
                                  <span className="text-primary text-[10px] mt-0.5">•</span>
                                  <div>
                                    <p className="text-[11px] font-medium">{ev.titulo}</p>
                                    {ev.dataAproximada && (
                                      <p className="text-[10px] text-muted-foreground">{ev.dataAproximada}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedId(null)}
                        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map */}
            <BiblicalMap
              locais={locaisFiltrados}
              rotas={rotasFiltradas}
              selectedId={selectedId}
              onSelect={handleSelect}
              visibleCategories={visibleCategories}
              visibleRotas={visibleRotas}
            />
          </div>

          {/* MOBILE BOTTOM BAR */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex bg-muted/50 rounded-lg p-0.5 flex-1">
                {(['todos', 'at', 'nt'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setFiltroPeriodo(p)}
                    className={`flex-1 px-2 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                      filtroPeriodo === p
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {p === 'todos' ? 'Todos' : p === 'at' ? 'AT' : 'NT'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setSidebarTab('locais'); setSidebarOpen(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-muted/50 hover:bg-muted transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                Locais ({locaisFiltrados.length})
              </button>
              <button
                onClick={() => { setSidebarTab('rotas'); setSidebarOpen(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-muted/50 hover:bg-muted transition-all"
              >
                <Route className="w-3.5 h-3.5" />
                Rotas
              </button>
              <button
                onClick={() => { setSidebarTab('info'); setSidebarOpen(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-muted/50 hover:bg-muted transition-all"
              >
                <Layers className="w-3.5 h-3.5" />
                Camadas
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
