'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Check, Share2, Image as ImageIcon, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ShareVerseData {
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

interface ThemeDef {
  id: string;
  nome: string;
  bg: string[];
  text: string;
  ref: string;
  accent: string;
  overlay: string;
  swatch: string;
}

const THEMES: ThemeDef[] = [
  {
    id: 'aurora',
    nome: 'Aurora',
    bg: ['#2a1b54', '#5b21b6', '#b45309'],
    text: '#f5f3ff',
    ref: '#fbbf24',
    accent: '#fbbf24',
    overlay: 'radial-gradient(circle at 22% 18%, rgba(251,191,36,0.22), transparent 55%)',
    swatch: 'linear-gradient(135deg, #5b21b6, #b45309)',
  },
  {
    id: 'noite',
    nome: 'Noite',
    bg: ['#0b1120', '#1e293b', '#0f172a'],
    text: '#e2e8f0',
    ref: '#7dd3fc',
    accent: '#7dd3fc',
    overlay: 'radial-gradient(circle at 78% 12%, rgba(125,211,252,0.18), transparent 60%)',
    swatch: 'linear-gradient(135deg, #1e293b, #0f172a)',
  },
  {
    id: 'sepia',
    nome: 'Sépia',
    bg: ['#2b2118', '#4a3526', '#3a2a1c'],
    text: '#f4e9d8',
    ref: '#d6a85a',
    accent: '#d6a85a',
    overlay: 'radial-gradient(circle at 30% 80%, rgba(214,168,90,0.16), transparent 55%)',
    swatch: 'linear-gradient(135deg, #4a3526, #3a2a1c)',
  },
  {
    id: 'floresta',
    nome: 'Floresta',
    bg: ['#0f2417', '#14532d', '#064e3b'],
    text: '#ecfdf5',
    ref: '#6ee7b7',
    accent: '#6ee7b7',
    overlay: 'radial-gradient(circle at 25% 25%, rgba(110,231,183,0.18), transparent 58%)',
    swatch: 'linear-gradient(135deg, #14532d, #064e3b)',
  },
  {
    id: 'oceano',
    nome: 'Oceano',
    bg: ['#082f49', '#0c4a6e', '#075985'],
    text: '#e0f2fe',
    ref: '#7dd3fc',
    accent: '#38bdf8',
    overlay: 'radial-gradient(circle at 70% 20%, rgba(56,189,248,0.2), transparent 60%)',
    swatch: 'linear-gradient(135deg, #0c4a6e, #075985)',
  },
  {
    id: 'rosa',
    nome: 'Rosa',
    bg: ['#4a0e3c', '#831843', '#9d174d'],
    text: '#fdf2f8',
    ref: '#f9a8d4',
    accent: '#f9a8d4',
    overlay: 'radial-gradient(circle at 20% 80%, rgba(249,168,212,0.2), transparent 58%)',
    swatch: 'linear-gradient(135deg, #831843, #9d174d)',
  },
];

const CANVAS_W = 1080;
const CANVAS_H = 1080;
const MARGIN = 96;
const MAX_TEXT_W = CANVAS_W - MARGIN * 2;

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

function drawCanvas(canvas: HTMLCanvasElement, data: ShareVerseData, theme: ThemeDef) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, theme.bg[0]);
  grad.addColorStop(0.5, theme.bg[1]);
  grad.addColorStop(1, theme.bg[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  const overlayGrad = ctx.createRadialGradient(CANVAS_W * 0.25, CANVAS_H * 0.25, 60, CANVAS_W * 0.25, CANVAS_H * 0.25, CANVAS_W * 0.9);
  overlayGrad.addColorStop(0, theme.accent + '38');
  overlayGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = overlayGrad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.strokeStyle = theme.accent + '40';
  ctx.lineWidth = 3;
  const framePad = 56;
  roundRect(ctx, framePad, framePad, CANVAS_W - framePad * 2, CANVAS_H - framePad * 2, 28);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = theme.accent;
  ctx.font = '700 64px Georgia, "Times New Roman", serif';
  ctx.fillText('❝', CANVAS_W / 2, 230);

  const fontSize = data.texto.length > 320 ? 46 : data.texto.length > 200 ? 54 : 62;
  ctx.fillStyle = theme.text;
  ctx.font = `italic ${fontSize}px Georgia, "Times New Roman", serif`;
  const lines = wrapText(ctx, data.texto, MAX_TEXT_W);
  const lineHeight = fontSize * 1.45;
  const blockH = lines.length * lineHeight;
  let y = CANVAS_H / 2 - blockH / 2 + fontSize / 2;
  for (const l of lines) {
    ctx.fillText(l, CANVAS_W / 2, y);
    y += lineHeight;
  }

  const refStr = `${data.livroNome.toUpperCase()} ${data.capitulo}:${data.versiculo} — ${data.traducao.toUpperCase()}`;
  ctx.fillStyle = theme.ref;
  ctx.font = '600 34px Georgia, serif';
  ctx.fillText(refStr, CANVAS_W / 2, CANVAS_H - 180);

  ctx.fillStyle = theme.accent + '99';
  ctx.font = '600 22px -apple-system, system-ui, sans-serif';
  ctx.fillText('SOLA SCRIPTURA', CANVAS_W / 2, CANVAS_H - 120);
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

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export interface ShareVerseModalProps {
  open: boolean;
  onClose: () => void;
  verse: ShareVerseData | null;
}

export function ShareVerseModal({ open, onClose, verse }: ShareVerseModalProps) {
  const [themeIdx, setThemeIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const theme = THEMES[themeIdx];

  const redraw = useCallback(() => {
    if (canvasRef.current && verse) drawCanvas(canvasRef.current, verse, theme);
  }, [verse, theme]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && verse) redraw();
  }, [open, redraw, verse]);

  const plainText = verse ? `"${verse.texto}" — ${verse.livroNome} ${verse.capitulo}:${verse.versiculo} (${verse.traducao.toUpperCase()})\n\nvia Sola Scriptura` : '';

  const handleDownload = async () => {
    if (!canvasRef.current || !verse) return;
    setBusy(true);
    const blob = await canvasToBlob(canvasRef.current);
    setBusy(false);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `sola-scriptura-${verse.livroNome}-${verse.capitulo}-${verse.versiculo}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current || !verse) return;
    setBusy(true);
    const blob = await canvasToBlob(canvasRef.current);
    setBusy(false);
    if (!blob) return;
    try {
      if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        return;
      }
    } catch {
      /* fallback to download */
    }
    handleDownload();
  };

  const handleCopyText = async () => {
    if (!verse) return;
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = verse
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/compartilhar/versiculo?livro=${encodeURIComponent(verse.livroNome.toLowerCase())}&capitulo=${verse.capitulo}&versiculo=${verse.versiculo}&t=${verse.traducao}`
    : '';

  const handleNativeShare = async () => {
    if (!verse) return;
    const canShare = typeof navigator !== 'undefined' && !!navigator.share;
    if (!canShare) {
      handleDownload();
      return;
    }
    const blob = await canvasToBlob(canvasRef.current!);
    const file = blob ? new File([blob], 'versiculo.png', { type: 'image/png' }) : undefined;
    try {
      await navigator.share({ title: `${verse.livroNome} ${verse.capitulo}:${verse.versiculo}`, text: plainText, url: shareUrl, files: file ? [file] : undefined } as ShareData);
    } catch {
      /* ignorado pelo usuário */
    }
  };

  const handleShareClick = () => {
    void handleNativeShare();
  };

  return (
    <AnimatePresence>
      {open && verse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-verse-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]/50 sticky top-0 bg-[var(--surface-raised)] z-10">
              <div className="flex items-center gap-2.5">
                <Share2 className="w-5 h-5 text-[var(--brand-default)]" />
                <h2 id="share-verse-title" className="font-display text-lg font-semibold text-[var(--content-primary)]">Compartilhar versículo</h2>
              </div>
              <button ref={closeRef} onClick={onClose} className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)]" aria-label="Fechar">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="flex flex-col items-center">
                <div
                  ref={previewRef}
                  className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden shadow-lg"
                  style={{ background: theme.swatch }}
                >
                  <div className="absolute inset-0" style={{ background: theme.overlay }} />
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                    role="img"
                    aria-label={verse ? `Imagem para compartilhar: ${verse.texto} (${verse.livroNome} ${verse.capitulo}:${verse.versiculo}, ${verse.traducao.toUpperCase()})` : 'Pré-visualização do versículo'}
                  />
                </div>
                <p className="mt-2 text-xs text-[var(--content-muted)] tabular-nums">
                  {verse.livroNome} {verse.capitulo}:{verse.versiculo} · {verse.traducao.toUpperCase()}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2.5">Tema de fundo</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {THEMES.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setThemeIdx(i)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all',
                        i === themeIdx
                          ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)]'
                          : 'border-[var(--border)]/60 hover:border-[var(--brand-default)]/40'
                      )}
                      aria-label={`Tema ${t.nome}`}
                    >
                      <span className="w-full h-9 rounded-lg" style={{ background: t.swatch }} />
                      <span className="text-[10px] font-medium text-[var(--content-secondary)]">{t.nome}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDownload}
                  disabled={busy}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] font-medium hover:opacity-90 transition-all text-sm disabled:opacity-50"
                >
                  <Download className="w-4 h-4" /> Baixar PNG
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyImage}
                  disabled={busy}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)]/60 bg-[var(--surface-sunken)] hover:bg-[var(--brand-subtle)] text-[var(--content-primary)] font-medium transition-all text-sm disabled:opacity-50"
                >
                  {saved ? <Check className="w-4 h-4 text-green-500" /> : <ImageIcon className="w-4 h-4" />}
                  {saved ? 'Imagem copiada!' : 'Copiar imagem'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyText}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)]/60 bg-[var(--surface-sunken)] hover:bg-[var(--brand-subtle)] text-[var(--content-primary)] font-medium transition-all text-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Type className="w-4 h-4" />}
                  {copied ? 'Texto copiado!' : 'Copiar texto'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleShareClick}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)]/60 bg-[var(--surface-sunken)] hover:bg-[var(--brand-subtle)] text-[var(--content-primary)] font-medium transition-all text-sm"
                >
                  <Share2 className="w-4 h-4" /> Compartilhar
                </motion.button>
              </div>

              <div className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface-sunken)]/40 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1.5">Link compartilhável</p>
                <p className="text-xs text-[var(--content-secondary)] break-all font-mono">{shareUrl}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
