'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  open: boolean;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showDiff: boolean;
  onToggleDiff: () => void;
  showComparison: boolean;
}

export function SettingsPanel({ open, fontSize, onFontSizeChange, showDiff, onToggleDiff, showComparison }: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/40 px-4 py-2.5 flex items-center gap-4 flex-wrap text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="text-[var(--content-muted)] font-medium">Tamanho:</span>
            <button onClick={() => onFontSizeChange(Math.max(14, fontSize - 1))} className="w-6 h-6 rounded hover:bg-[var(--surface-raised)] flex items-center justify-center" aria-label="Diminuir fonte">−</button>
            <span className="font-mono w-6 text-center tabular-nums">{fontSize}</span>
            <button onClick={() => onFontSizeChange(Math.min(28, fontSize + 1))} className="w-6 h-6 rounded hover:bg-[var(--surface-raised)] flex items-center justify-center" aria-label="Aumentar fonte">+</button>
          </div>
          {showComparison && (
            <button onClick={onToggleDiff}
              className={cn(
                'px-2.5 py-1 rounded-full border transition-colors',
                showDiff ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60'
              )}>
              Diferenças {showDiff ? 'ON' : 'OFF'}
            </button>
          )}
          <div className="flex items-center gap-2 ml-auto text-[var(--content-muted)]">
            <Eye className="w-3.5 h-3.5" />
            <span>Spectral • Leitura 1.8</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
