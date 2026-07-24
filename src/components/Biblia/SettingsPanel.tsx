'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Palette, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';

interface SettingsPanelProps {
  open: boolean;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showDiff: boolean;
  onToggleDiff: () => void;
  showComparison: boolean;
  fontFamily?: 'serif' | 'sans';
  onFontFamilyChange?: (font: 'serif' | 'sans') => void;
  lineSpacing?: number;
  onLineSpacingChange?: (spacing: number) => void;
}

export function SettingsPanel({ open, fontSize, onFontSizeChange, showDiff, onToggleDiff, showComparison, fontFamily = 'serif', onFontFamilyChange, lineSpacing = 1.8, onLineSpacingChange }: SettingsPanelProps) {
  const [showCustomizer, setShowCustomizer] = useState(false);

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

          {/* Toggle Serif/Sans — ESV style */}
          {onFontFamilyChange && (
            <div className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-[var(--content-muted)]" />
              <button
                onClick={() => onFontFamilyChange('serif')}
                className={cn(
                  'px-2 py-1 rounded-l-full border transition-colors text-[11px] font-medium',
                  fontFamily === 'serif'
                    ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20'
                    : 'text-[var(--content-muted)] border-[var(--border)]/60 hover:text-[var(--content-primary)]'
                )}
              >
                Serif
              </button>
              <button
                onClick={() => onFontFamilyChange('sans')}
                className={cn(
                  'px-2 py-1 rounded-r-full border-t border-b border-r transition-colors text-[11px] font-medium',
                  fontFamily === 'sans'
                    ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20'
                    : 'text-[var(--content-muted)] border-[var(--border)]/60 hover:text-[var(--content-primary)]'
                )}
              >
                Sans
              </button>
            </div>
          )}

          {/* Line spacing control */}
          {onLineSpacingChange && (
            <div className="flex items-center gap-2">
              <span className="text-[var(--content-muted)] font-medium">Espaçamento:</span>
              <button onClick={() => onLineSpacingChange(Math.max(1.4, lineSpacing - 0.1))} className="w-6 h-6 rounded hover:bg-[var(--surface-raised)] flex items-center justify-center" aria-label="Diminuir espaçamento">−</button>
              <span className="font-mono w-8 text-center tabular-nums">{lineSpacing.toFixed(1)}</span>
              <button onClick={() => onLineSpacingChange(Math.min(2.4, lineSpacing + 0.1))} className="w-6 h-6 rounded hover:bg-[var(--surface-raised)] flex items-center justify-center" aria-label="Aumentar espaçamento">+</button>
            </div>
          )}

          {showComparison && (
            <button onClick={onToggleDiff}
              className={cn(
                'px-2.5 py-1 rounded-full border transition-colors',
                showDiff ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60'
              )}>
              Diferenças {showDiff ? 'ON' : 'OFF'}
            </button>
          )}
          <button
            onClick={() => setShowCustomizer(!showCustomizer)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors',
              showCustomizer ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60 hover:text-[var(--content-primary)]'
            )}
            title="Customizar tema"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tema</span>
          </button>
          <div className="flex items-center gap-2 ml-auto text-[var(--content-muted)]">
            <Eye className="w-3.5 h-3.5" />
            <span>{fontFamily === 'serif' ? 'Spectral' : 'Inter'} • Leitura {lineSpacing.toFixed(1)}</span>
          </div>
          <ThemeCustomizer open={showCustomizer} onClose={() => setShowCustomizer(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
