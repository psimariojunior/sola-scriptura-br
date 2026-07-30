'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, BookOpen, Users, MapPin, Zap, ChevronRight, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  conceitosNodes, conceitosEdges, CONCEITO_LAYOUT,
  CONCEITO_CATEGORIA_CORES, CONCEITO_CATEGORIA_ICONE,
  type ConceitoNode, type ConceitoCategoria,
} from '@/data/conceitosBiblicos';

const CATS: { id: ConceitoCategoria; label: string }[] = [
  { id: 'pessoa', label: 'Pessoas' },
  { id: 'tema', label: 'Temas' },
  { id: 'lugar', label: 'Lugares' },
  { id: 'evento', label: 'Eventos' },
  { id: 'livro', label: 'Livros' },
];

const EDGE_TIPO_COR: Record<string, string> = {
  relaciona: '#6b7280',
  autor: '#3b82f6',
  ocorre_em: '#22c55e',
  ensina: '#a855f7',
  prediz: '#f59e0b',
  cumpre: '#ef4444',
};

export default function ExploradorPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [busca, setBusca] = useState('');
  const [catFiltro, setCatFiltro] = useState<Set<ConceitoCategoria>>(new Set(CATS.map(c => c.id)));
  const [noSel, setNoSel] = useState<ConceitoNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoverNo, setHoverNo] = useState<string | null>(null);

  const nosFiltrados = useMemo(() => {
    return conceitosNodes.filter(n => {
      if (!catFiltro.has(n.categoria)) return false;
      if (busca) {
        const q = busca.toLowerCase();
        return n.label.toLowerCase().includes(q) || n.descricao.toLowerCase().includes(q);
      }
      return true;
    });
  }, [catFiltro, busca]);

  const nosIds = useMemo(() => new Set(nosFiltrados.map(n => n.id)), [nosFiltrados]);

  const arestasFiltradas = useMemo(() => {
    return conceitosEdges.filter(e => nosIds.has(e.source) && nosIds.has(e.target));
  }, [nosIds]);

  const nosConectados = useMemo(() => {
    if (!noSel) return new Set<string>();
    const connected = new Set<string>([noSel.id]);
    arestasFiltradas.forEach(e => {
      if (e.source === noSel.id) connected.add(e.target);
      if (e.target === noSel.id) connected.add(e.source);
    });
    return connected;
  }, [noSel, arestasFiltradas]);

  const getPos = useCallback((id: string) => {
    const layout = CONCEITO_LAYOUT[id];
    if (layout) return { x: layout.x, y: layout.y };
    return { x: 400, y: 300 };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as SVGElement).tagName === 'rect') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const SVG_W = 800;
  const SVG_H = 600;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HERO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20">
                <span className="text-lg">🕸️</span>
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-light">
                  Explorador de <span className="text-primary italic">Conceitos</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  {conceitosNodes.length} conceitos · {conceitosEdges.length} conexões · Clique para explorar
                </p>
              </div>
            </div>
          </motion.div>

          {/* TOOLBAR */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-4">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar conceito..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border/50 bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex gap-1.5">
              {CATS.map(cat => (
                <button key={cat.id} onClick={() => {
                  setCatFiltro(prev => {
                    const next = new Set(prev);
                    if (next.has(cat.id)) next.delete(cat.id); else next.add(cat.id);
                    return next;
                  });
                }}
                  className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                    catFiltro.has(cat.id) ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border/50 bg-muted/20 text-muted-foreground opacity-50')}>
                  {CONCEITO_CATEGORIA_ICONE[cat.id]} {cat.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1 ml-auto">
              <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))}
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center hover:bg-muted/50">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))}
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center hover:bg-muted/50">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={resetView}
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center hover:bg-muted/50">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <div className="flex gap-6 flex-col lg:flex-row">

            {/* GRAPH */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex-1 rounded-2xl border border-border/50 overflow-hidden bg-card/30 shadow-lg"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
              <svg ref={svgRef} viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className="w-full" style={{ minHeight: '500px', maxHeight: '70vh' }}
                onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="bg-grad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Background */}
                <rect width={SVG_W} height={SVG_H} fill="url(#bg-grad)" />

                <g transform={`translate(${offset.x},${offset.y}) scale(${zoom})`}>
                  {/* Edges */}
                  {arestasFiltradas.map((e, i) => {
                    const s = getPos(e.source);
                    const t = getPos(e.target);
                    const isHighlighted = noSel && (e.source === noSel.id || e.target === noSel.id);
                    const isHover = hoverNo && (e.source === hoverNo || e.target === hoverNo);
                    return (
                      <g key={i}>
                        <line x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                          stroke={isHighlighted ? EDGE_TIPO_COR[e.tipo] : 'var(--border)'}
                          strokeWidth={isHighlighted ? 2 : 1}
                          strokeDasharray={e.tipo === 'prediz' ? '4,4' : e.tipo === 'cumpre' ? '8,4' : 'none'}
                          opacity={noSel ? (isHighlighted ? 0.8 : 0.1) : (isHover ? 0.6 : 0.2)} />
                        {isHighlighted && (
                          <text x={(s.x + t.x) / 2} y={(s.y + t.y) / 2 - 6}
                            textAnchor="middle" fill={EDGE_TIPO_COR[e.tipo]}
                            fontSize="9" fontWeight="500" opacity={0.8}>
                            {e.label}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {nosFiltrados.map(n => {
                    const pos = getPos(n.id);
                    const isSelected = noSel?.id === n.id;
                    const isConnected = nosConectados.has(n.id);
                    const isHover = hoverNo === n.id;
                    const visible = !noSel || isSelected || isConnected;
                    const nodeSize = n.categoria === 'pessoa' ? 18 : n.categoria === 'tema' ? 16 : n.categoria === 'evento' ? 15 : 14;

                    return (
                      <g key={n.id}
                        transform={`translate(${pos.x},${pos.y})`}
                        onClick={() => setNoSel(isSelected ? null : n)}
                        onMouseEnter={() => setHoverNo(n.id)}
                        onMouseLeave={() => setHoverNo(null)}
                        style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                        opacity={visible ? 1 : 0.15}>
                        {/* Shadow */}
                        <circle r={nodeSize + 4} fill={n.cor} opacity={isSelected ? 0.2 : isHover ? 0.15 : 0} />
                        {/* Main circle */}
                        <circle r={nodeSize}
                          fill={isSelected ? n.cor : `${n.cor}20`}
                          stroke={n.cor}
                          strokeWidth={isSelected ? 3 : isHover ? 2.5 : 1.5}
                          filter={isSelected ? 'url(#glow)' : undefined} />
                        {/* Icon */}
                        <text textAnchor="middle" dominantBaseline="central"
                          fontSize={nodeSize * 0.8} style={{ pointerEvents: 'none' }}>
                          {n.icone}
                        </text>
                        {/* Label */}
                        <text y={nodeSize + 12} textAnchor="middle"
                          fill={isSelected ? n.cor : 'var(--foreground)'}
                          fontSize="10" fontWeight={isSelected ? '700' : '500'}
                          style={{ pointerEvents: 'none' }}>
                          {n.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </motion.div>

            {/* SIDEBAR */}
            <div className="w-full lg:w-80 shrink-0">
              <AnimatePresence mode="wait">
                {noSel ? (
                  <motion.div key={noSel.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="rounded-2xl border border-border/50 bg-card/50 p-5 sticky top-24">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{noSel.icone}</span>
                        <div>
                          <h3 className="font-display text-lg font-medium" style={{ color: noSel.cor }}>{noSel.label}</h3>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                            {CONCEITO_CATEGORIA_ICONE[noSel.categoria]} {noSel.categoria}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => setNoSel(null)} className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{noSel.descricao}</p>

                    {/* Versículos */}
                    {noSel.versiculos.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> Referências
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {noSel.versiculos.map((v, i) => (
                            <span key={i} className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{v}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Conexões */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Conexões ({arestasFiltradas.filter(e => e.source === noSel.id || e.target === noSel.id).length})
                      </p>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {arestasFiltradas
                          .filter(e => e.source === noSel.id || e.target === noSel.id)
                          .map((e, i) => {
                            const otherId = e.source === noSel.id ? e.target : e.source;
                            const other = conceitosNodes.find(n => n.id === otherId);
                            if (!other) return null;
                            return (
                              <button key={i} onClick={() => setNoSel(other)}
                                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left">
                                <span className="text-sm">{other.icone}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium truncate">{other.label}</p>
                                  <p className="text-[10px] text-muted-foreground">{e.label}</p>
                                </div>
                                <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="rounded-2xl border border-border/50 bg-card/50 p-5 sticky top-24">
                    <h3 className="font-display text-base font-medium mb-3">Como usar</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">1</span>
                        <p>Clique em um nó para ver seus detalhes e conexões</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">2</span>
                        <p>As conexões relacionadas ficam destacadas no grafo</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">3</span>
                        <p>Clique nas conexões na sidebar para navegar entre conceitos</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">4</span>
                        <p>Arraste para mover o grafo, use +/- para zoom</p>
                      </div>
                    </div>

                    {/* Legenda */}
                    <div className="mt-5 pt-4 border-t border-border/30">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Legenda das Conexões</p>
                      <div className="space-y-1.5">
                        {Object.entries(EDGE_TIPO_COR).map(([tipo, cor]) => (
                          <div key={tipo} className="flex items-center gap-2 text-xs">
                            <div className="w-6 h-0.5 rounded" style={{ backgroundColor: cor }} />
                            <span className="text-muted-foreground capitalize">{tipo.replace('_', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
