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
  formatoInicial?: FormatoImagem;
}

export type TemplateId = 'classico' | 'minimalista' | 'pergaminho' | 'gradient' | 'natureza';
export type FormatoImagem = 'quadrado' | 'stories';

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
  { id: 'creme', nome: 'Creme', hex: '#F5F0E0' },
  { id: 'branco', nome: 'Branco', hex: '#FFFFFF' },
  { id: 'dourado', nome: 'Dourado', hex: '#2C1810' },
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

function drawLogo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.06;
  ctx.lineCap = 'round';

  // Book shape
  const bw = size * 0.7;
  const bh = size * 0.5;
  const bx = x - bw / 2;
  const by = y - bh / 2;

  // Book cover
  ctx.beginPath();
  ctx.moveTo(bx + bw * 0.05, by);
  ctx.lineTo(bx + bw * 0.48, by);
  ctx.quadraticCurveTo(bx + bw * 0.5, by + bh * 0.08, bx + bw * 0.48, by + bh * 0.15);
  ctx.lineTo(bx + bw * 0.05, by + bh);
  ctx.quadraticCurveTo(bx, by + bh * 0.92, bx + bw * 0.05, by);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(bx + bw * 0.95, by);
  ctx.lineTo(bx + bw * 0.52, by);
  ctx.quadraticCurveTo(bx + bw * 0.5, by + bh * 0.08, bx + bw * 0.52, by + bh * 0.15);
  ctx.lineTo(bx + bw * 0.95, by + bh);
  ctx.quadraticCurveTo(bx + bw, by + bh * 0.92, bx + bw * 0.95, by);
  ctx.fill();

  // Cross on the book
  const crossSize = size * 0.22;
  const cx = x;
  const cy = y + bh * 0.05;
  ctx.lineWidth = size * 0.05;
  ctx.beginPath();
  ctx.moveTo(cx, cy - crossSize * 0.5);
  ctx.lineTo(cx, cy + crossSize * 0.5);
  ctx.moveTo(cx - crossSize * 0.35, cy - crossSize * 0.1);
  ctx.lineTo(cx + crossSize * 0.35, cy - crossSize * 0.1);
  ctx.stroke();

  ctx.restore();
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
  const light = isLightBg(opts.bgColor);

  // Background
  const bg = hexToRgba(opts.bgColor, opts.bgOpacity / 100);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle gradient overlay
  const grad = ctx.createRadialGradient(w * 0.3, h * 0.25, 40, w * 0.3, h * 0.25, w * 0.8);
  grad.addColorStop(0, light ? 'rgba(180,140,40,0.08)' : 'rgba(212,168,67,0.15)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Gold decorative border
  const framePad = 56;
  ctx.strokeStyle = light ? 'rgba(160,120,30,0.3)' : 'rgba(212,168,67,0.25)';
  ctx.lineWidth = 2;
  roundRect(ctx, framePad, framePad, w - framePad * 2, h - framePad * 2, 24);
  ctx.stroke();

  // Outer glow
  ctx.strokeStyle = light ? 'rgba(160,120,30,0.12)' : 'rgba(212,168,67,0.08)';
  ctx.lineWidth = 1;
  roundRect(ctx, framePad - 8, framePad - 8, w - (framePad - 8) * 2, h - (framePad - 8) * 2, 28);
  ctx.stroke();

  // Opening quotation mark
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4A843';
  ctx.font = '700 72px Georgia, "Times New Roman", serif';
  ctx.fillText('\u201C', w / 2, 220);

  // Verse text
  ctx.fillStyle = light ? '#2C1810' : '#F5F0E0';
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

  // Watermark with logo
  if (opts.showLogo) {
    drawLogo(ctx, w / 2, h - 125, 36, 'rgba(212,168,67,0.5)');
    ctx.fillStyle = 'rgba(212,168,67,0.5)';
    ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 95);
    ctx.font = '400 11px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('solascripturabr.com.br', w / 2, h - 78);
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

  // Watermark with logo
  if (opts.showLogo) {
    const watermarkColor = hexToRgba(opts.bgColor, 0.25);
    drawLogo(ctx, w / 2, h - 100, 28, watermarkColor);
    ctx.fillStyle = watermarkColor;
    ctx.font = '500 14px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 75);
    ctx.font = '400 10px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('solascripturabr.com.br', w / 2, h - 60);
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
  ctx.fillStyle = '#D4A853';
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
    ctx.fillStyle = '#D4A853';
    ctx.font = '600 30px Georgia, serif';
    ctx.fillText(opts.referencia.toUpperCase(), w / 2, h - 175);

    // Ornamental separator
    ctx.strokeStyle = '#D4A853';
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

  // Watermark with logo
  if (opts.showLogo) {
    drawLogo(ctx, w / 2, h - 120, 28, 'rgba(139,105,20,0.4)');
    ctx.fillStyle = 'rgba(139,105,20,0.4)';
    ctx.font = '600 14px Georgia, serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 95);
    ctx.font = '400 10px Georgia, serif';
    ctx.fillText('solascripturabr.com.br', w / 2, h - 80);
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

  // Watermark with logo
  if (opts.showLogo) {
    drawLogo(ctx, w / 2, h - 120, 28, 'rgba(255,255,255,0.35)');
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 95);
    ctx.font = '400 10px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('solascripturabr.com.br', w / 2, h - 80);
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

  // Watermark with logo
  if (opts.showLogo) {
    drawLogo(ctx, w / 2, h - 120, 28, 'rgba(134,239,172,0.4)');
    ctx.fillStyle = 'rgba(134,239,172,0.4)';
    ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('SOLA SCRIPTURA', w / 2, h - 95);
    ctx.font = '400 10px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    ctx.fillText('solascripturabr.com.br', w / 2, h - 80);
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
  formato: FormatoImagem = 'quadrado',
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = 1080;
  canvas.height = formato === 'stories' ? 1920 : 1080;
  template.draw(ctx, canvas, opts);
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export function VerseImageCreator({ texto, referencia, onClose, formatoInicial = 'quadrado' }: VerseImageCreatorProps) {
  const [templateIdx, setTemplateIdx] = useState(0);
  const [fontSize, setFontSize] = useState(formatoInicial === 'stories' ? 44 : 50);
  const [showRef, setShowRef] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [bgColorIdx, setBgColorIdx] = useState(0);
  const [bgOpacity, setBgOpacity] = useState(100);
  const [showControls, setShowControls] = useState(true);
  const [formato, setFormato] = useState<FormatoImagem>(formatoInicial);
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
      }, template, formato);
    }
  }, [texto, referencia, fontSize, showRef, showLogo, bgColor, bgOpacity, template, formato]);

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
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png', 0.9);
      // Try native bridge first
      const w = window as unknown as Record<string, unknown>;
      if (w.__SSB_SHARE_IMAGE) {
        (w.__SSB_SHARE_IMAGE as (d: string, f: string) => void)(dataUrl, makeFilename());
      } else {
        // Fallback: download via link
        const link = document.createElement('a');
        link.download = makeFilename();
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (e) {
      console.error('Download error:', e);
    }
    setBusy(false);
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    setBusy(true);
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png', 0.9);
      const w = window as unknown as Record<string, unknown>;
      if (w.__SSB_SHARE_IMAGE) {
        (w.__SSB_SHARE_IMAGE as (d: string, f: string) => void)(dataUrl, makeFilename());
      } else if (navigator.share && navigator.canShare) {
        // Convert data URL to blob for native share
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], makeFilename(), { type: 'image/png' });
        const shareData = { title: referencia, files: [file] };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback: share text only
          await navigator.share({ title: referencia, text: `${referencia}\n\n${texto}\n\nSola Scriptura BR` });
        }
      } else {
        handleDownload();
      }
    } catch (e) {
      // User cancelled share — ignore
      if (e instanceof DOMException && e.name === 'AbortError') return;
      console.error('Share error:', e);
    }
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      {/* ── Canvas preview ── */}
      <div className="flex justify-center">
        <div
          className={cn(
            'relative rounded-xl overflow-hidden shadow-xl ring-1 ring-[var(--border)]/30',
            formato === 'stories'
              ? 'w-[200px] sm:w-[220px] aspect-[9/16]'
              : 'w-full max-w-[340px] aspect-square'
          )}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            role="img"
            aria-label={`Imagem do versiculo: ${referencia}`}
          />
        </div>
      </div>

      {/* ── Format ── */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setFormato('quadrado')}
          className={cn(
            'px-3 py-2 rounded-xl text-xs font-semibold border transition-all',
            formato === 'quadrado'
              ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)] text-[var(--brand-default)]'
              : 'border-[var(--border)]/60 text-[var(--content-muted)]'
          )}
        >
          Quadrado · feed
        </button>
        <button
          type="button"
          onClick={() => setFormato('stories')}
          className={cn(
            'px-3 py-2 rounded-xl text-xs font-semibold border transition-all',
            formato === 'stories'
              ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)] text-[var(--brand-default)]'
              : 'border-[var(--border)]/60 text-[var(--content-muted)]'
          )}
        >
          Stories · 9:16
        </button>
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
