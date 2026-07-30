'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Check, Share2, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteText: string;
  lessonId: string;
}

export function ShareNoteModal({ isOpen, onClose, noteText, lessonId }: ShareNoteModalProps) {
  const [copied, setCopied] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Dark background with subtle gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
    bgGrad.addColorStop(0, '#0A0908');
    bgGrad.addColorStop(0.5, '#161412');
    bgGrad.addColorStop(1, '#0A0908');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle texture overlay (grid of dots)
    ctx.globalAlpha = 0.03;
    for (let x = 0; x < 1080; x += 40) {
      for (let y = 0; y < 1080; y += 40) {
        ctx.fillStyle = '#D4A843';
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // Decorative border
    ctx.strokeStyle = 'rgba(212, 168, 67, 0.3)';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 1000, 1000);

    // Inner border
    ctx.strokeStyle = 'rgba(212, 168, 67, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(55, 55, 970, 970);

    // Top accent line
    const accentGrad = ctx.createLinearGradient(200, 0, 880, 0);
    accentGrad.addColorStop(0, 'transparent');
    accentGrad.addColorStop(0.2, '#D4A843');
    accentGrad.addColorStop(0.8, '#D4A843');
    accentGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = accentGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(880, 120);
    ctx.stroke();

    // Header text
    ctx.fillStyle = '#D4A843';
    ctx.font = '600 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SOLA SCRIPTURA', 540, 100);

    // Subtitle
    ctx.fillStyle = '#7A7368';
    ctx.font = '400 20px system-ui, -apple-system, sans-serif';
    ctx.fillText('Nota de Estudo', 540, 170);

    // Lesson reference
    ctx.fillStyle = '#A09888';
    ctx.font = '500 22px system-ui, -apple-system, sans-serif';
    ctx.fillText(lessonId, 540, 210);

    // Note text with word wrap
    const maxWidth = 880;
    const lineHeight = 38;
    const startY = 270;
    const words = noteText.split(' ');
    let line = '';
    let y = startY;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#F5F1E8';
    ctx.font = '400 26px Georgia, "Times New Roman", serif';

    const lines: string[] = [];
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);

    // Truncate if too many lines
    const maxLines = Math.floor((1080 - 300 - 200) / lineHeight);
    const displayLines = lines.slice(0, maxLines);

    for (const l of displayLines) {
      ctx.fillText(l, 100, y);
      y += lineHeight;
    }

    if (lines.length > maxLines) {
      ctx.fillStyle = '#7A7368';
      ctx.font = 'italic 22px Georgia, "Times New Roman", serif';
      ctx.fillText('...', 100, y);
    }

    // Bottom accent line
    ctx.strokeStyle = accentGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 920);
    ctx.lineTo(880, 920);
    ctx.stroke();

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4A843';
    ctx.font = '500 22px system-ui, -apple-system, sans-serif';
    ctx.fillText('solascripturabr.com.br', 540, 970);

    // Bottom decorative text
    ctx.fillStyle = '#6A6258';
    ctx.font = '400 16px system-ui, -apple-system, sans-serif';
    ctx.fillText('"Estudai para vos apresentardes a Deus aprovados" — 2 Timóteo 2:15', 540, 1010);

    setImageReady(true);
  }, [isOpen, noteText, lessonId]);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `nota-${lessonId.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }, [lessonId]);

  const handleCopyText = useCallback(async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(noteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [noteText]);

  const handleShare = useCallback(async () => {
    if (!canvasRef.current || !navigator.share) return;

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `nota-${lessonId}.png`, { type: 'image/png' });
      try {
        await navigator.share({
          title: `Nota — ${lessonId}`,
          text: noteText.slice(0, 200),
          files: [file],
        });
      } catch {
        // User cancelled share
      }
    }, 'image/png');
  }, [noteText, lessonId]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-[var(--brand-default)]" />
                <h2 className="font-display text-lg font-medium text-[var(--content-primary)]">
                  Compartilhar Nota
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface-sunken)]"
              >
                <X className="w-4 h-4 text-[var(--content-muted)]" />
              </button>
            </div>

            {/* Canvas preview */}
            <div className="p-5">
              <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-sunken)]">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto"
                  style={{ display: 'block', aspectRatio: '1/1' }}
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={handleDownload}
                  disabled={!imageReady}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    'bg-[var(--brand-default)] text-[var(--brand-contrast)]',
                    'hover:bg-[var(--brand-hover)] disabled:opacity-40'
                  )}
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyText}
                    disabled={!noteText.trim()}
                    className={cn(
                      'flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      'border border-[var(--border)] bg-[var(--surface-raised)]',
                      'hover:bg-[var(--surface-sunken)] disabled:opacity-40',
                      copied && 'border-[var(--accent-success)]/30'
                    )}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[var(--accent-success)]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[var(--content-muted)]" />
                    )}
                    {copied ? 'Copiado' : 'Copiar Texto'}
                  </button>

                  {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                      onClick={handleShare}
                      disabled={!imageReady}
                      className={cn(
                        'flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        'border border-[var(--border)] bg-[var(--surface-raised)]',
                        'hover:bg-[var(--surface-sunken)] disabled:opacity-40'
                      )}
                    >
                      <Share2 className="w-4 h-4 text-[var(--content-muted)]" />
                      Compartilhar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
