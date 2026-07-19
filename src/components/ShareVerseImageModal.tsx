'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon } from 'lucide-react';
import { VerseImageCreator } from './VerseImageCreator';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface ShareVerseImageData {
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

export interface ShareVerseImageModalProps {
  open: boolean;
  onClose: () => void;
  verse: ShareVerseImageData | null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL WRAPPER
// ═══════════════════════════════════════════════════════════════════════════════

export function ShareVerseImageModal({ open, onClose, verse }: ShareVerseImageModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

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

  const referencia = verse
    ? `${verse.livroNome} ${verse.capitulo}:${verse.versiculo}`
    : '';

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
          aria-labelledby="share-image-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]/50 sticky top-0 bg-[var(--surface-raised)] z-10">
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-5 h-5 text-[var(--brand-default)]" />
                <h2
                  id="share-image-title"
                  className="font-display text-lg font-semibold text-[var(--content-primary)]"
                >
                  Imagem do versículo
                </h2>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)]"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="p-5">
              <VerseImageCreator
                texto={verse.texto}
                referencia={`${referencia} (${verse.traducao.toUpperCase()})`}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
