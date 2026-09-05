'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { X, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut, Info, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCrossReferencesByVerse, type CrossReference } from '@/data/biblia/crossReferences';
import { hrefBiblia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';

interface Node {
  id: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  label: string;
  x: number;
  y: number;
  color: string;
  size: number;
  connections: number;
}

interface Edge {
  from: string;
  to: string;
  type: string;
  description: string;
}

interface CrossReferenceNetworkProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  open: boolean;
  onClose: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  parallel: '#06b6d4',
  fulfillment: '#8b5cf6',
  quotation: '#10b981',
  contrast: '#f97316',
  thematic: '#3b82f6',
  typology: '#ec4899',
};

function getBookColor(livro: string): string {
  const colors: Record<string, string> = {
    gn: '#f59e0b', ex: '#ef4444', lv: '#22c55e', nm: '#3b82f6', dt: '#8b5cf6',
    js: '#06b6d4', jz: '#f97316', rt: '#ec4899', '1sm': '#14b8a6', '2sm': '#a855f7',
    sl: '#f59e0b', pv: '#22c55e', ec: '#3b82f6', cna: '#ec4899',
    is: '#8b5cf6', jr: '#ef4444', lm: '#f97316', ez: '#06b6d4', dn: '#14b8a6',
    os: '#f59e0b', am: '#22c55e', ob: '#3b82f6', jn: '#8b5cf6', mq: '#ec4899',
    na: '#ef4444', hab: '#f97316', sf: '#06b6d4', hc: '#14b8a6', ag: '#f59e0b',
    zc: '#22c55e', ml: '#3b82f6',
    mt: '#f59e0b', mc: '#22c55e', lc: '#3b82f6', jo: '#8b5cf6',
    at: '#06b6d4', rm: '#ef4444', '1co': '#ec4899', '2co': '#f97316',
    gl: '#14b8a6', ef: '#a855f7', fp: '#f59e0b', cl: '#22c55e',
    '1ts': '#3b82f6', '2ts': '#8b5cf6', '1tm': '#ef4444', '2tm': '#ec4899',
    tt: '#f97316', flm: '#06b6d4', hb: '#14b8a6', tg: '#a855f7',
    '1pe': '#f59e0b', '2pe': '#22c55e', '1jo': '#3b82f6', '2jo': '#8b5cf6',
    '3jo': '#ef4444', jd: '#ec4899', ap: '#f97316',
  };
  return colors[livro] || '#6b7280';
}

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

export function CrossReferenceNetwork({
  livro,
  capitulo,
  versiculo,
  open,
  onClose,
}: CrossReferenceNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Build graph from cross-references
  useEffect(() => {
    const refs = getCrossReferencesByVerse(livro, capitulo, versiculo);
    if (refs.length === 0) return;

    const nodeMap = new Map<string, Node>();
    const edgeList: Edge[] = [];

    // Center node
    const centerId = `${livro}:${capitulo}:${versiculo}`;
    nodeMap.set(centerId, {
      id: centerId,
      livro,
      capitulo,
      versiculo,
      label: `${nomeLivro(livro)} ${capitulo}:${versiculo}`,
      x: 0,
      y: 0,
      color: getBookColor(livro),
      size: 40,
      connections: refs.length,
    });

    // Connected nodes
    const angleStep = (2 * Math.PI) / Math.min(refs.length, 8);
    refs.slice(0, 8).forEach((ref, i) => {
      const match = ref.to.match(/^(\d?\s*\w+)\s+(\d+):(\d+)/);
      if (!match) return;

      const refLivro = match[1].toLowerCase().replace(/\s+/g, '');
      const refCap = parseInt(match[2]);
      const refVer = parseInt(match[3]);
      const refId = `${refLivro}:${refCap}:${refVer}`;

      if (!nodeMap.has(refId)) {
        const angle = angleStep * i - Math.PI / 2;
        const radius = 200;
        nodeMap.set(refId, {
          id: refId,
          livro: refLivro,
          capitulo: refCap,
          versiculo: refVer,
          label: `${nomeLivro(refLivro)} ${refCap}:${refVer}`,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          color: getBookColor(refLivro),
          size: 30,
          connections: 1,
        });
      }

      edgeList.push({
        from: centerId,
        to: refId,
        type: ref.type,
        description: ref.description || '',
      });
    });

    setNodes(Array.from(nodeMap.values()));
    setEdges(edgeList);
  }, [livro, capitulo, versiculo]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = rect.width / 2 + offset.x;
    const centerY = rect.height / 2 + offset.y;

    // Clear
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw edges
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return;

      ctx.beginPath();
      ctx.moveTo(centerX + fromNode.x * zoom, centerY + fromNode.y * zoom);

      // Curved line
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2 - 30;
      ctx.quadraticCurveTo(
        centerX + midX * zoom,
        centerY + midY * zoom,
        centerX + toNode.x * zoom,
        centerY + toNode.y * zoom
      );

      ctx.strokeStyle = TYPE_COLORS[edge.type] || '#6b7280';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    // Draw nodes
    nodes.forEach((node) => {
      const x = centerX + node.x * zoom;
      const y = centerY + node.y * zoom;
      const isCenter = node.id === `${livro}:${capitulo}:${versiculo}`;
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const size = (isCenter ? node.size : node.size * 0.8) * zoom;

      // Glow
      if (isCenter || isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, size + 8, 0, 2 * Math.PI);
        const gradient = ctx.createRadialGradient(x, y, size, x, y, size + 8);
        gradient.addColorStop(0, node.color + '40');
        gradient.addColorStop(1, node.color + '00');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = isCenter ? 1 : 0.8;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Border
      ctx.strokeStyle = isHovered || isSelected ? '#fff' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth = isHovered || isSelected ? 3 : 1;
      ctx.stroke();

      // Text
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${isCenter ? 11 : 9}px system-ui`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const shortLabel = `${node.livro.toUpperCase()} ${node.capitulo}:${node.versiculo}`;
      ctx.fillText(shortLabel, x, y);
    });
  }, [nodes, edges, zoom, offset, hoveredNode, selectedNode, livro, capitulo, versiculo]);

  // Mouse interactions
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2 + offset.x;
    const centerY = rect.height / 2 + offset.y;

    if (isDragging) {
      setOffset({
        x: offset.x + (e.clientX - dragStart.x),
        y: offset.y + (e.clientY - dragStart.y),
      });
      setDragStart({ x: e.clientX, y: e.clientY });
      return;
    }

    // Find hovered node
    let found: Node | null = null;
    for (const node of nodes) {
      const nx = centerX + node.x * zoom;
      const ny = centerY + node.y * zoom;
      const dist = Math.sqrt((x - nx) ** 2 + (y - ny) ** 2);
      if (dist < (node.id === `${livro}:${capitulo}:${versiculo}` ? 40 : 30) * zoom) {
        found = node;
        break;
      }
    }
    setHoveredNode(found);
    canvas.style.cursor = found ? 'pointer' : isDragging ? 'grabbing' : 'grab';
  }, [nodes, zoom, offset, isDragging, dragStart, livro, capitulo, versiculo]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(e.clientX - dragStart.x) < 5 && Math.abs(e.clientY - dragStart.y) < 5) {
      if (hoveredNode) {
        setSelectedNode(selectedNode?.id === hoveredNode.id ? null : hoveredNode);
      }
    }
  }, [isDragging, dragStart, hoveredNode, selectedNode]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.max(0.3, Math.min(3, z * delta)));
  }, []);

  const resetView = () => { setZoom(1); setOffset({ x: 0, y: 0 }); setSelectedNode(null); };

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-[var(--border)]/50 bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <circle cx="4" cy="6" r="2" />
                <circle cx="20" cy="6" r="2" />
                <circle cx="4" cy="18" r="2" />
                <circle cx="20" cy="18" r="2" />
                <line x1="6" y1="7" x2="10" y2="10" />
                <line x1="18" y1="7" x2="14" y2="10" />
                <line x1="6" y1="17" x2="10" y2="14" />
                <line x1="18" y1="17" x2="14" y2="14" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--content-primary)]">
                Rede de Referências Cruzadas
              </h2>
              <p className="text-[10px] text-[var(--content-muted)]">
                {nodes.length} nós · {edges.length} conexões
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setZoom((z) => Math.min(3, z * 1.2))} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Zoom in">
              <ZoomIn className="w-4 h-4 text-[var(--content-muted)]" />
            </button>
            <button onClick={() => setZoom((z) => Math.max(0.3, z * 0.8))} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Zoom out">
              <ZoomOut className="w-4 h-4 text-[var(--content-muted)]" />
            </button>
            <button onClick={resetView} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Reset view">
              <RotateCcw className="w-4 h-4 text-[var(--content-muted)]" />
            </button>
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Toggle fullscreen">
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-[var(--content-muted)]" /> : <Maximize2 className="w-4 h-4 text-[var(--content-muted)]" />}
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Fechar">
              <X className="w-4 h-4 text-[var(--content-muted)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => { setIsDragging(false); setHoveredNode(null); }}
          onWheel={handleWheel}
        />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-[var(--surface-raised)]/90 backdrop-blur-lg rounded-xl border border-[var(--border)]/50 p-3 shadow-lg">
          <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">Legenda</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <span className="w-3 h-1 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-[var(--content-muted)] capitalize">
                  {type === 'parallel' ? 'Paralelo' : type === 'fulfillment' ? 'Cumprimento' : type === 'quotation' ? 'Citação' : type === 'contrast' ? 'Contraste' : type === 'thematic' ? 'Temático' : 'Tipologia'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Node Info */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-64 bg-[var(--surface-raised)]/95 backdrop-blur-lg rounded-xl border border-[var(--border)]/50 p-4 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: selectedNode.color }}>
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--content-primary)]">
                    {selectedNode.label}
                  </p>
                  <p className="text-[10px] text-[var(--content-muted)]">
                    {selectedNode.connections} conexões
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  href={hrefBiblia(selectedNode.livro, selectedNode.capitulo, selectedNode.versiculo)}
                  className="block w-full text-center px-3 py-2 rounded-lg bg-[var(--brand-default)] text-white text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  Abrir no Leitor
                </Link>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="block w-full text-center px-3 py-2 rounded-lg border border-[var(--border)] text-[var(--content-muted)] text-xs font-medium hover:bg-[var(--surface-sunken)] transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[var(--surface-raised)]"
      >
        {content}
      </motion.div>
    );
  }

  if (true) { // Mobile layout
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              role="dialog"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-raised)] rounded-t-3xl shadow-2xl h-[85vh]"
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 rounded-full bg-[var(--content-muted)] opacity-20" />
              </div>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
}
