'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Share2,
  Check,
  Loader2,
  Type,
  Eye,
  EyeOff,
  ImageIcon,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface VerseImageCreatorProps {
  texto: string;
  referencia: string;
  onClose: () => void;
}

export type TemplateId = 'classico' | 'minimalista' | 'pergaminho' | 'gradient' | 'natureza';

export interface ImageTemplate {
  id: TemplateId;
  nome: string;
  swatch: string;
  draw: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    opts: DrawOptions,
  ) => void;
}

export interface DrawOptions {
  texto: string;
  referencia: string;
  fontSize: number;
  showRef: boolean;
  showLogo: boolean;
  bgColor: string;
  bgOpacity: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const CANVAS_W = 1080;
const CANVAS_H = 1080;
const MARGIN = 100;
const MAX_TEXT_W = CANVAS_W - MARGIN * 2;

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND COLORS
// ═══════════════════════════════════════════════════════════════════════════════

interface BgColorOption {
  id: string;
  nome: string;
  hex: string;
}

const BG_COLORS: BgColorOption[] = [
  { id: 'preto', nome: 'Preto', hex: '#0A0908' },
  { id: 'azul-escuro', nome: 'Azul', hex: '#0A1628' },
  { id: 'verde-escuro', nome: 'Verde', hex: '#1A3C2A' },
  { id: 'roxo', nome: 'Roxo', hex: '#1E1038' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS DRAWING HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function lightenHex(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function darkenHex(hex: string, amount: number): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE DRAWING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function drawClassico(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, opts: DrawOptions) {
  const w = canvas.width;
  const h = canvas.height;

  // Background
  const bg = hexToRgba(opts.bgColor, opts.bgOpacity / 100);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle gradient overlay
  const grad = ctx.createRadialGradient(w * 0.3, h * 0.25, 40, w * 0.3, h * 0.25, w * 0.8);
  grad.addColorStop(0, 'rgba(212,168,67,0.15)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Gold decorative border
  const framePad = 56;
  ctx.strokeStyle = 'rgba(212,168,67,0.25)';
  ctx.lineWidth = 2;
  roundRect(ctx, framePad, framePad, w - framePad * 2, h - framePad * 2, 24);
  ctx.stroke();

  // Outer glow
  ctx.strokeStyle = 'rgba(212,168,67,0.08)';
  ctx.lineWidth = 1;
  roundRect(ctx, framePad - 8, framePad - 8, w - (framePad - 8) * 2, h - (framePad - 8) * 2, 28);
  ctx.stroke();

  // Opening quotation mark
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4A843';
  ctx.font = '700 72px Georgia, "Times New Roman", serif';
  ctx.fillText('\u201C', w / 2, 220);

  // Verse text
  ctx.fillStyle = '#F5F0E0';
  ctx.font = `italic ${opts.fontSize}px Georgia, "Times New Roman", serif`;
  const lines = wrapText(ctx, opts.texto, MAX_TEXT_W);
  const lineHeight = opts.fontSize * 1.5;
  const blockH = lines.length * lineHeight;
  let y = h / 2 - blockH / 2 + opts.fontSize / 2;
  for (const l of lines) {
    ctx.fillText(l, w / 2, y);
    y += lineHeight;
  }

  // Reference
  if (opts.showRef) {
    ctx.fillStyle = '#D4A843';
    ctx.font = '600 32px Georgia, serif';
    ctx.fillText(opts.referencia.toUpperCase(), w / 2, h - 180);

    const lineY = h - 145;
    const lineW = 120;
    ctx.strokeStyle = 'rgba(212,168,67,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - lineW / 2, lineY);
    ctx.lineTo(w / 2 + lineW / 2, lineY);
    ctx.stroke();
  }

  // Watermark
  if (opts.showLogo) {
    ctx.fillStyle = 'rgba(212,168,67,0.5)';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 110);
  }
}

function drawMinimalista(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, opts: DrawOptions) {
  const w = canvas.width;
  const h = canvas.height;

  // Clean white background
  const bg = hexToRgba(opts.bgColor, opts.bgOpacity / 100);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Thin accent line top
  ctx.strokeStyle = hexToRgba(opts.bgColor, 0.6);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 60, 100);
  ctx.lineTo(w / 2 + 60, 100);
  ctx.stroke();

  // Opening quotation mark - light
  ctx.textAlign = 'center';
  ctx.fillStyle = hexToRgba(opts.bgColor, 0.15);
  ctx.font = '700 80px "Helvetica Neue", Helvetica, Arial, sans-serif';
  ctx.fillText('\u201C', w / 2, 230);

  // Verse text - clean sans-serif
  const textColor = isLightBg(opts.bgColor) ? '#1a1a1a' : '#f5f5f5';
  ctx.fillStyle = textColor;
  ctx.font = `300 ${opts.fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  const lines = wrapText(ctx, opts.texto, MAX_TEXT_W - 40);
  const lineHeight = opts.fontSize * 1.6;
  const blockH = lines.length * lineHeight;
  let y = h / 2 - blockH / 2 + opts.fontSize / 2;
  for (const l of lines) {
    ctx.fillText(l, w / 2, y);
    y += lineHeight;
  }

  // Reference - minimal
  if (opts.showRef) {
    const refColor = isLightBg(opts.bgColor) ? '#555' : '#aaa';
    ctx.fillStyle = refColor;
    ctx.font = '400 26px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText(opts.referencia.toUpperCase(), w / 2, h - 160);
  }

  // Thin accent line bottom
  ctx.strokeStyle = hexToRgba(opts.bgColor, 0.6);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 60, h - 120);
  ctx.lineTo(w / 2 + 60, h - 120);
  ctx.stroke();

  // Watermark
  if (opts.showLogo) {
    ctx.fillStyle = hexToRgba(opts.bgColor, 0.25);
    ctx.font = '500 18px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 85);
  }
}

function drawPergaminho(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, opts: DrawOptions) {
  const w = canvas.width;
  const h = canvas.height;

  // Parchment base
  const baseColor = '#F5F1E8';
  const bg = hexToRgba(opts.bgColor, opts.bgOpacity / 100);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Parchment texture effect - subtle noise simulation
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const size = Math.random() * 3 + 1;
    ctx.fillStyle = Math.random() > 0.5 ? '#8B6914' : '#6B4F10';
    ctx.fillRect(x, y, size, size);
  }
  ctx.globalAlpha = 1;

  // Aged gradient edges
  const edgeGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.7);
  edgeGrad.addColorStop(0, 'transparent');
  edgeGrad.addColorStop(1, 'rgba(139,105,20,0.12)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, w, h);

  // Decorative double border
  const pad1 = 48;
  const pad2 = 58;
  ctx.strokeStyle = '#8B6914';
  ctx.lineWidth = 2;
  roundRect(ctx, pad1, pad1, w - pad1 * 2, h - pad1 * 2, 16);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(139,105,20,0.4)';
  ctx.lineWidth = 1;
  roundRect(ctx, pad2, pad2, w - pad2 * 2, h - pad2 * 2, 12);
  ctx.stroke();

  // Corner ornaments
  const corners = [
    [pad1 + 12, pad1 + 12],
    [w - pad1 - 12, pad1 + 12],
    [pad1 + 12, h - pad1 - 12],
    [w - pad1 - 12, h - pad1 - 12],
  ];
  ctx.fillStyle = '#8B6914';
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Opening quotation mark
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8B6914';
  ctx.font = '700 68px Georgia, "Times New Roman", serif';
  ctx.fillText('\u201C', w / 2, 220);

  // Verse text
  ctx.fillStyle = '#2C1810';
  ctx.font = `italic ${opts.fontSize}px Georgia, "Times New Roman", serif`;
  const lines = wrapText(ctx, opts.texto, MAX_TEXT_W - 20);
  const lineHeight = opts.fontSize * 1.5;
  const blockH = lines.length * lineHeight;
  let y = h / 2 - blockH / 2 + opts.fontSize / 2;
  for (const l of lines) {
    ctx.fillText(l, w / 2, y);
    y += lineHeight;
  }

  // Reference
  if (opts.showRef) {
    ctx.fillStyle = '#8B6914';
    ctx.font = '600 30px Georgia, serif';
    ctx.fillText(opts.referencia.toUpperCase(), w / 2, h - 175);

    // Ornamental separator
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 1;
    const sepY = h - 145;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 80, sepY);
    ctx.lineTo(w / 2 - 10, sepY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w / 2, sepY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w / 2 + 10, sepY);
    ctx.lineTo(w / 2 + 80, sepY);
    ctx.stroke();
  }

  // Watermark
  if (opts.showLogo) {
    ctx.fillStyle = 'rgba(139,105,20,0.4)';
    ctx.font = '600 18px Georgia, serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 105);
  }
}

function drawGradient(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, opts: DrawOptions) {
  const w = canvas.width;
  const h = canvas.height;

  // Deep blue-purple gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  const baseColor = opts.bgColor;
  grad.addColorStop(0, baseColor);
  grad.addColorStop(0.5, lightenHex(baseColor, 30));
  grad.addColorStop(1, darkenHex(baseColor, 20));
  ctx.fillStyle = grad;
  ctx.globalAlpha = opts.bgOpacity / 100;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;

  // Mesh gradient effect
  const meshGrad = ctx.createRadialGradient(w * 0.2, h * 0.3, 10, w * 0.2, h * 0.3, w * 0.6);
  meshGrad.addColorStop(0, 'rgba(139,92,246,0.3)');
  meshGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = meshGrad;
  ctx.fillRect(0, 0, w, h);

  const meshGrad2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 10, w * 0.8, h * 0.7, w * 0.5);
  meshGrad2.addColorStop(0, 'rgba(59,130,246,0.25)');
  meshGrad2.addColorStop(1, 'transparent');
  ctx.fillStyle = meshGrad2;
  ctx.fillRect(0, 0, w, h);

  // Subtle border glow
  const framePad = 60;
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  roundRect(ctx, framePad, framePad, w - framePad * 2, h - framePad * 2, 20);
  ctx.stroke();

  // Opening quotation mark
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '700 76px Georgia, "Times New Roman", serif';
  ctx.fillText('\u201C', w / 2, 225);

  // Verse text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `italic ${opts.fontSize}px Georgia, "Times New Roman", serif`;
  const lines = wrapText(ctx, opts.texto, MAX_TEXT_W);
  const lineHeight = opts.fontSize * 1.5;
  const blockH = lines.length * lineHeight;
  let y = h / 2 - blockH / 2 + opts.fontSize / 2;
  for (const l of lines) {
    ctx.fillText(l, w / 2, y);
    y += lineHeight;
  }

  // Reference
  if (opts.showRef) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '600 30px Georgia, serif';
    ctx.fillText(opts.referencia.toUpperCase(), w / 2, h - 175);

    const lineY = h - 145;
    const lineW = 100;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - lineW / 2, lineY);
    ctx.lineTo(w / 2 + lineW / 2, lineY);
    ctx.stroke();
  }

  // Watermark
  if (opts.showLogo) {
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 105);
  }
}

function drawNatureza(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, opts: DrawOptions) {
  const w = canvas.width;
  const h = canvas.height;

  // Deep green gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0F2B1A');
  grad.addColorStop(0.5, '#1A3C2A');
  grad.addColorStop(1, '#0D2618');
  ctx.fillStyle = grad;
  ctx.globalAlpha = opts.bgOpacity / 100;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;

  // Leaf shapes (decorative)
  ctx.save();
  ctx.globalAlpha = 0.06;
  const drawLeaf = (lx: number, ly: number, size: number, angle: number) => {
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size * 0.5, -size * 0.3, size, 0);
    ctx.quadraticCurveTo(size * 0.5, size * 0.3, 0, 0);
    ctx.fillStyle = '#86EFAC';
    ctx.fill();
    ctx.restore();
  };

  // Top-left cluster
  drawLeaf(80, 80, 120, -0.4);
  drawLeaf(140, 50, 90, 0.3);
  drawLeaf(50, 160, 80, -0.8);

  // Bottom-right cluster
  drawLeaf(w - 100, h - 80, 110, Math.PI + 0.4);
  drawLeaf(w - 160, h - 40, 85, Math.PI - 0.3);
  drawLeaf(w - 50, h - 160, 75, Math.PI + 0.8);

  // Scattered leaves
  drawLeaf(w * 0.8, 120, 60, 0.7);
  drawLeaf(100, h * 0.7, 55, -1.2);
  ctx.restore();

  // Subtle vignette
  const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.75);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(1, 'rgba(0,0,0,0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  // Border
  const framePad = 56;
  ctx.strokeStyle = 'rgba(134,239,172,0.15)';
  ctx.lineWidth = 1;
  roundRect(ctx, framePad, framePad, w - framePad * 2, h - framePad * 2, 20);
  ctx.stroke();

  // Opening quotation mark
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(134,239,172,0.2)';
  ctx.font = '700 72px Georgia, "Times New Roman", serif';
  ctx.fillText('\u201C', w / 2, 220);

  // Verse text
  ctx.fillStyle = '#F0FFF4';
  ctx.font = `italic ${opts.fontSize}px Georgia, "Times New Roman", serif`;
  const lines = wrapText(ctx, opts.texto, MAX_TEXT_W);
  const lineHeight = opts.fontSize * 1.5;
  const blockH = lines.length * lineHeight;
  let y = h / 2 - blockH / 2 + opts.fontSize / 2;
  for (const l of lines) {
    ctx.fillText(l, w / 2, y);
    y += lineHeight;
  }

  // Reference
  if (opts.showRef) {
    ctx.fillStyle = '#86EFAC';
    ctx.font = '600 30px Georgia, serif';
    ctx.fillText(opts.referencia.toUpperCase(), w / 2, h - 175);

    const lineY = h - 145;
    const lineW = 100;
    ctx.strokeStyle = 'rgba(134,239,172,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - lineW / 2, lineY);
    ctx.lineTo(w / 2 + lineW / 2, lineY);
    ctx.stroke();
  }

  // Watermark
  if (opts.showLogo) {
    ctx.fillStyle = 'rgba(134,239,172,0.4)';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 105);
  }
}

function isLightBg(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

const IMAGE_TEMPLATES: ImageTemplate[] = [
  {
    id: 'classico',
    nome: 'Classico',
    swatch: 'linear-gradient(135deg, #0A0908, #3D2F10)',
    draw: drawClassico,
  },
  {
    id: 'minimalista',
    nome: 'Minimalista',
    swatch: 'linear-gradient(135deg, #F5F5F5, #E0E0E0)',
    draw: drawMinimalista,
  },
  {
    id: 'pergaminho',
    nome: 'Pergaminho',
    swatch: 'linear-gradient(135deg, #F5F1E8, #E8DCC8)',
    draw: drawPergaminho,
  },
  {
    id: 'gradient',
    nome: 'Gradient',
    swatch: 'linear-gradient(135deg, #1E1038, #3B82F6)',
    draw: drawGradient,
  },
  {
    id: 'natureza',
    nome: 'Natureza',
    swatch: 'linear-gradient(135deg, #0F2B1A, #2D5A3F)',
    draw: drawNatureza,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DRAW FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

function drawVerseImage(
  canvas: HTMLCanvasElement,
  opts: DrawOptions,
  template: ImageTemplate,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  template.draw(ctx, canvas, opts);
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export function VerseImageCreator({ texto, referencia, onClose }: VerseImageCreatorProps) {
  const [templateIdx, setTemplateIdx] = useState(0);
  const [fontSize, setFontSize] = useState(50);
  const [showRef, setShowRef] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [bgColorIdx, setBgColorIdx] = useState(0);
  const [bgOpacity, setBgOpacity] = useState(100);
  const [showControls, setShowControls] = useState(true);
  const [busy, setBusy] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const template = IMAGE_TEMPLATES[templateIdx];
  const bgColor = BG_COLORS[bgColorIdx].hex;

  const drawOpts: DrawOptions = {
    texto,
    referencia,
    fontSize,
    showRef,
    showLogo,
    bgColor,
    bgOpacity,
  };

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawVerseImage(canvasRef.current, {
        texto,
        referencia,
        fontSize,
        showRef,
        showLogo,
        bgColor,
        bgOpacity,
      }, template);
    }
  }, [texto, referencia, fontSize, showRef, showLogo, bgColor, bgOpacity, template]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const canvasToBlob = useCallback((canvas: HTMLCanvasElement): Promise<Blob | null> => {
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  }, []);

  const makeFilename = () => {
    const ref = referencia
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/:/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    return `${ref}.png`;
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setBusy(true);
    const blob = await canvasToBlob(canvasRef.current);
    setBusy(false);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = makeFilename();
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    setBusy(true);
    const blob = await canvasToBlob(canvasRef.current);
    setBusy(false);
    if (!blob) return;

    if (navigator.share) {
      const file = new File([blob], makeFilename(), { type: 'image/png' });
      try {
        await navigator.share({
          title: referencia,
          text: `"${texto}"\n\n— ${referencia}`,
          files: [file],
        });
      } catch {
        // usuario cancelou
      }
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = makeFilename();
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-4">
      {/* ── Canvas preview ── */}
      <div className="flex justify-center">
        <div
          className="relative w-full max-w-[340px] aspect-square rounded-xl overflow-hidden shadow-xl ring-1 ring-[var(--border)]/30"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            role="img"
            aria-label={`Imagem do versiculo: ${referencia}`}
          />
        </div>
      </div>

      {/* ── Template selector ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2">
          Template
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {IMAGE_TEMPLATES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setTemplateIdx(i)}
              className={cn(
                'flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all',
                i === templateIdx
                  ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)] ring-1 ring-[var(--brand-default)]/30'
                  : 'border-[var(--border)]/60 hover:border-[var(--brand-default)]/40'
              )}
              aria-label={`Template ${t.nome}`}
            >
              <span className="w-full h-6 rounded" style={{ background: t.swatch }} />
              <span className="text-[9px] font-medium text-[var(--content-secondary)]">{t.nome}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Controls toggle ── */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="flex items-center gap-2 text-xs font-medium text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        {showControls ? 'Ocultar controles' : 'Personalizar'}
      </button>

      {/* ── Customization controls ── */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-1">
              {/* Font size */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[var(--content-muted)] flex items-center gap-1.5">
                    <Type className="w-3 h-3" />
                    Tamanho da fonte
                  </label>
                  <span className="text-xs tabular-nums text-[var(--content-secondary)]">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={60}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[var(--border)] accent-[var(--brand-default)]"
                />
                <div className="flex justify-between text-[10px] text-[var(--content-muted)] mt-0.5">
                  <span>20px</span>
                  <span>60px</span>
                </div>
              </div>

              {/* Background color */}
              <div>
                <p className="text-xs font-semibold text-[var(--content-muted)] mb-1.5">Cor de fundo</p>
                <div className="flex gap-2">
                  {BG_COLORS.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => setBgColorIdx(i)}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all',
                        i === bgColorIdx
                          ? 'border-[var(--brand-default)] ring-2 ring-[var(--brand-default)]/30 scale-110'
                          : 'border-[var(--border)]/60 hover:border-[var(--brand-default)]/40'
                      )}
                      style={{ backgroundColor: c.hex }}
                      aria-label={`Cor ${c.nome}`}
                    />
                  ))}
                </div>
              </div>

              {/* Background opacity */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[var(--content-muted)]">
                    Opacidade do fundo
                  </label>
                  <span className="text-xs tabular-nums text-[var(--content-secondary)]">{bgOpacity}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={bgOpacity}
                  onChange={(e) => setBgOpacity(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[var(--border)] accent-[var(--brand-default)]"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRef(!showRef)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                    showRef
                      ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                      : 'border-[var(--border)]/60 text-[var(--content-muted)] hover:border-[var(--brand-default)]/40'
                  )}
                >
                  {showRef ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  Referencia
                </button>
                <button
                  onClick={() => setShowLogo(!showLogo)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                    showLogo
                      ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                      : 'border-[var(--border)]/60 text-[var(--content-muted)] hover:border-[var(--brand-default)]/40'
                  )}
                >
                  {showLogo ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  Logo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Action buttons ── */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleDownload}
          disabled={busy}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold hover:opacity-90 transition-all text-sm disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : downloaded ? (
            <Check className="w-4 h-4" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {downloaded ? 'Baixado!' : 'Baixar'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          disabled={busy}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)]/60 bg-[var(--surface-sunken)] hover:bg-[var(--brand-subtle)] text-[var(--content-primary)] font-semibold transition-all text-sm disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          Compartilhar
        </motion.button>
      </div>
    </div>
  );
}
