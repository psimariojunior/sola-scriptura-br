'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface VerseImageCreatorProps {
  texto: string;
  referencia: string;
  onClose: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEMES (4 backgrounds)
// ═══════════════════════════════════════════════════════════════════════════════

interface ImageTheme {
  id: string;
  nome: string;
  bgStart: string;
  bgEnd: string;
  textColor: string;
  refColor: string;
  watermarkColor: string;
  overlay?: string;
  swatch: string;
}

const IMAGE_THEMES: ImageTheme[] = [
  {
    id: 'dark-gold',
    nome: 'Dourado',
    bgStart: '#0A0908',
    bgEnd: '#3D2F10',
    textColor: '#F5F0E0',
    refColor: '#D4A843',
    watermarkColor: 'rgba(212,168,67,0.5)',
    overlay: 'radial-gradient(circle at 30% 25%, rgba(212,168,67,0.15), transparent 60%)',
    swatch: 'linear-gradient(135deg, #0A0908, #3D2F10)',
  },
  {
    id: 'parchment',
    nome: 'Pergaminho',
    bgStart: '#F5F1E8',
    bgEnd: '#E8DCC8',
    textColor: '#2C1810',
    refColor: '#8B6914',
    watermarkColor: 'rgba(139,105,20,0.4)',
    overlay: 'radial-gradient(circle at 70% 30%, rgba(139,105,20,0.08), transparent 55%)',
    swatch: 'linear-gradient(135deg, #F5F1E8, #E8DCC8)',
  },
  {
    id: 'blue-night',
    nome: 'Noite Azul',
    bgStart: '#0A1628',
    bgEnd: '#1A3A5C',
    textColor: '#E0F0FF',
    refColor: '#7DB8E8',
    watermarkColor: 'rgba(125,184,232,0.45)',
    overlay: 'radial-gradient(circle at 25% 75%, rgba(125,184,232,0.12), transparent 55%)',
    swatch: 'linear-gradient(135deg, #0A1628, #1A3A5C)',
  },
  {
    id: 'nature',
    nome: 'Natureza',
    bgStart: '#1A3C2A',
    bgEnd: '#2D5A3F',
    textColor: '#F0FFF4',
    refColor: '#86EFAC',
    watermarkColor: 'rgba(134,239,172,0.45)',
    overlay: 'radial-gradient(circle at 80% 20%, rgba(134,239,172,0.15), transparent 55%)',
    swatch: 'linear-gradient(135deg, #1A3C2A, #2D5A3F)',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const CANVAS_W = 1080;
const CANVAS_H = 1080;
const MARGIN = 100;
const MAX_TEXT_W = CANVAS_W - MARGIN * 2;

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

function drawVerseImage(
  canvas: HTMLCanvasElement,
  texto: string,
  referencia: string,
  theme: ImageTheme
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  // ── Background gradient ──
  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, theme.bgStart);
  grad.addColorStop(1, theme.bgEnd);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // ── Subtle radial overlay ──
  const overlayGrad = ctx.createRadialGradient(
    CANVAS_W * 0.3, CANVAS_H * 0.25, 40,
    CANVAS_W * 0.3, CANVAS_H * 0.25, CANVAS_W * 0.8
  );
  const baseAlpha = theme.id === 'parchment' ? '18' : '30';
  overlayGrad.addColorStop(0, theme.refColor + baseAlpha);
  overlayGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = overlayGrad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // ── Decorative border ──
  const framePad = 56;
  ctx.strokeStyle = theme.refColor + '40';
  ctx.lineWidth = 2;
  roundRect(ctx, framePad, framePad, CANVAS_W - framePad * 2, CANVAS_H - framePad * 2, 24);
  ctx.stroke();

  // ── Opening quotation mark ──
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.refColor;
  ctx.font = '700 72px Georgia, "Times New Roman", serif';
  ctx.fillText('\u201C', CANVAS_W / 2, 220);

  // ── Verse text ──
  const fontSize = texto.length > 350 ? 42 : texto.length > 220 ? 50 : 58;
  ctx.fillStyle = theme.textColor;
  ctx.font = `italic ${fontSize}px Georgia, "Times New Roman", serif`;
  const lines = wrapText(ctx, texto, MAX_TEXT_W);
  const lineHeight = fontSize * 1.5;
  const blockH = lines.length * lineHeight;
  let y = CANVAS_H / 2 - blockH / 2 + fontSize / 2;
  for (const l of lines) {
    ctx.fillText(l, CANVAS_W / 2, y);
    y += lineHeight;
  }

  // ── Reference ──
  ctx.fillStyle = theme.refColor;
  ctx.font = '600 32px Georgia, serif';
  ctx.fillText(referencia.toUpperCase(), CANVAS_W / 2, CANVAS_H - 180);

  // ── Decorative line above watermark ──
  const lineY = CANVAS_H - 145;
  const lineW = 120;
  ctx.strokeStyle = theme.watermarkColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CANVAS_W / 2 - lineW / 2, lineY);
  ctx.lineTo(CANVAS_W / 2 + lineW / 2, lineY);
  ctx.stroke();

  // ── Watermark ──
  ctx.fillStyle = theme.watermarkColor;
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
  ctx.fillText('SOLA SCRIPTURA', CANVAS_W / 2, CANVAS_H - 110);
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export function VerseImageCreator({ texto, referencia, onClose }: VerseImageCreatorProps) {
  const [themeIdx, setThemeIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const theme = IMAGE_THEMES[themeIdx];

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawVerseImage(canvasRef.current, texto, referencia, theme);
    }
  }, [texto, referencia, theme]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const canvasToBlob = useCallback((canvas: HTMLCanvasElement): Promise<Blob | null> => {
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  }, []);

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setBusy(true);
    const blob = await canvasToBlob(canvasRef.current);
    setBusy(false);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `sola-scriptura-${referencia.replace(/\s+/g, '-').replace(/:/g, '-')}.png`;
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
      const file = new File([blob], 'versiculo.png', { type: 'image/png' });
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
      // fallback: download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `sola-scriptura-${referencia.replace(/\s+/g, '-').replace(/:/g, '-')}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-5">
      {/* ── Canvas preview ── */}
      <div className="flex justify-center">
        <div
          className="relative w-full max-w-[320px] aspect-square rounded-xl overflow-hidden shadow-lg ring-1 ring-[var(--border)]/30"
          style={{ background: theme.swatch }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            role="img"
            aria-label={`Imagem do versículo: ${referencia}`}
          />
        </div>
      </div>

      {/* ── Theme selector ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2.5">
          Plano de fundo
        </p>
        <div className="grid grid-cols-4 gap-2">
          {IMAGE_THEMES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setThemeIdx(i)}
              className={cn(
                'flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all',
                i === themeIdx
                  ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)] ring-1 ring-[var(--brand-default)]/30'
                  : 'border-[var(--border)]/60 hover:border-[var(--brand-default)]/40'
              )}
              aria-label={`Tema ${t.nome}`}
            >
              <span className="w-full h-8 rounded-lg" style={{ background: t.swatch }} />
              <span className="text-[10px] font-medium text-[var(--content-secondary)]">{t.nome}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="grid grid-cols-2 gap-2.5">
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
