'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Palette, Type, Minus, Plus } from 'lucide-react';
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

const FONT_MIN = 14;
const FONT_MAX = 28;
const SPACING_MIN = 1.4;
const SPACING_MAX = 2.4;

export function SettingsPanel({ open, fontSize, onFontSizeChange, showDiff, onToggleDiff, showComparison, fontFamily = 'serif', onFontFamilyChange, lineSpacing = 1.8, onLineSpacingChange }: SettingsPanelProps) {
  const [showCustomizer, setShowCustomizer] = useState(false);

  const fontPercent = ((fontSize - FONT_MIN) / (FONT_MAX - FONT_MIN)) * 100;
  const spacingPercent = onLineSpacingChange ? ((lineSpacing - SPACING_MIN) / (SPACING_MAX - SPACING_MIN)) * 100 : 50;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/50 backdrop-blur-sm"
        >
          {/* Mobile: layout vertical compacto */}
          <div className="sm:hidden px-4 py-3 space-y-3">
            {/* Font size slider */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onFontSizeChange(Math.max(FONT_MIN, fontSize - 1))}
                className="w-11 h-11 rounded-xl bg-[var(--surface-raised)] hover:bg-[var(--surface-raised)]/80 flex items-center justify-center active:scale-95 transition-all"
                aria-label="Diminuir fonte"
              >
                <Minus className="w-4 h-4 text-[var(--content-primary)]" />
              </button>
              <div className="flex-1 relative">
                <div className="h-2 rounded-full bg-[var(--border)]/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-hover)] transition-all duration-150"
                    style={{ width: `${fontPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={FONT_MIN}
                  max={FONT_MAX}
                  value={fontSize}
                  onChange={(e) => onFontSizeChange(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  aria-label="Tamanho da fonte"
                />
              </div>
              <button
                onClick={() => onFontSizeChange(Math.min(FONT_MAX, fontSize + 1))}
                className="w-11 h-11 rounded-xl bg-[var(--surface-raised)] hover:bg-[var(--surface-raised)]/80 flex items-center justify-center active:scale-95 transition-all"
                aria-label="Aumentar fonte"
              >
                <Plus className="w-4 h-4 text-[var(--content-primary)]" />
              </button>
              <span className="font-mono text-sm w-8 text-center tabular-nums text-[var(--content-primary)] font-medium">{fontSize}</span>
            </div>

            {/* Line spacing slider */}
            {onLineSpacingChange && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLineSpacingChange(Math.max(SPACING_MIN, +(lineSpacing - 0.1).toFixed(1)))}
                  className="w-11 h-11 rounded-xl bg-[var(--surface-raised)] hover:bg-[var(--surface-raised)]/80 flex items-center justify-center active:scale-95 transition-all"
                  aria-label="Diminuir espaçamento"
                >
                  <Minus className="w-4 h-4 text-[var(--content-primary)]" />
                </button>
                <div className="flex-1 relative">
                  <div className="h-2 rounded-full bg-[var(--border)]/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-hover)] transition-all duration-150"
                      style={{ width: `${spacingPercent}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={SPACING_MIN}
                    max={SPACING_MAX}
                    step={0.1}
                    value={lineSpacing}
                    onChange={(e) => onLineSpacingChange(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    aria-label="Espaçamento entre linhas"
                  />
                </div>
                <button
                  onClick={() => onLineSpacingChange(Math.min(SPACING_MAX, +(lineSpacing + 0.1).toFixed(1)))}
                  className="w-11 h-11 rounded-xl bg-[var(--surface-raised)] hover:bg-[var(--surface-raised)]/80 flex items-center justify-center active:scale-95 transition-all"
                  aria-label="Aumentar espaçamento"
                >
                  <Plus className="w-4 h-4 text-[var(--content-primary)]" />
                </button>
                <span className="font-mono text-sm w-8 text-center tabular-nums text-[var(--content-primary)] font-medium">{lineSpacing.toFixed(1)}</span>
              </div>
            )}

            {/* Row 2: Font family + Theme + Diff */}
            <div className="flex items-center gap-2 flex-wrap">
              {onFontFamilyChange && (
                <div className="flex items-center rounded-lg border border-[var(--border)]/60 overflow-hidden">
                  <button
                    onClick={() => onFontFamilyChange('serif')}
                    className={cn(
                      'px-3 py-2 text-xs font-medium transition-colors min-h-[44px]',
                      fontFamily === 'serif'
                        ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                        : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
                    )}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => onFontFamilyChange('sans')}
                    className={cn(
                      'px-3 py-2 text-xs font-medium transition-colors min-h-[44px]',
                      fontFamily === 'sans'
                        ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                        : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
                    )}
                  >
                    Sans
                  </button>
                </div>
              )}

              {showComparison && (
                <button onClick={onToggleDiff}
                  className={cn(
                    'px-3 py-2 rounded-lg border text-xs font-medium transition-colors min-h-[44px]',
                    showDiff ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60'
                  )}>
                  Diferenças {showDiff ? 'ON' : 'OFF'}
                </button>
              )}

              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors min-h-[44px]',
                  showCustomizer ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60'
                )}
              >
                <Palette className="w-3.5 h-3.5" />
                Tema
              </button>

              <div className="flex items-center gap-1.5 ml-auto text-[10px] text-[var(--content-muted)]">
                <Eye className="w-3 h-3" />
                <span>{fontFamily === 'serif' ? 'Spectral' : 'Inter'} · {lineSpacing.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Desktop: layout horizontal */}
          <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 flex-wrap text-xs">
            {/* Font size */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--content-muted)] font-medium">Tamanho:</span>
              <button
                onClick={() => onFontSizeChange(Math.max(FONT_MIN, fontSize - 1))}
                className="w-8 h-8 rounded-lg hover:bg-[var(--surface-raised)] flex items-center justify-center transition-colors"
                aria-label="Diminuir fonte"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <div className="w-24 relative">
                <div className="h-1.5 rounded-full bg-[var(--border)]/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--brand-default)] transition-all duration-150"
                    style={{ width: `${fontPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={FONT_MIN}
                  max={FONT_MAX}
                  value={fontSize}
                  onChange={(e) => onFontSizeChange(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  aria-label="Tamanho da fonte"
                />
              </div>
              <button
                onClick={() => onFontSizeChange(Math.min(FONT_MAX, fontSize + 1))}
                className="w-8 h-8 rounded-lg hover:bg-[var(--surface-raised)] flex items-center justify-center transition-colors"
                aria-label="Aumentar fonte"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono w-6 text-center tabular-nums">{fontSize}</span>
            </div>

            {/* Font family */}
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

            {/* Line spacing */}
            {onLineSpacingChange && (
              <div className="flex items-center gap-2">
                <span className="text-[var(--content-muted)] font-medium">Espaçamento:</span>
                <button
                  onClick={() => onLineSpacingChange(Math.max(SPACING_MIN, +(lineSpacing - 0.1).toFixed(1)))}
                  className="w-8 h-8 rounded-lg hover:bg-[var(--surface-raised)] flex items-center justify-center transition-colors"
                  aria-label="Diminuir espaçamento"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="w-20 relative">
                  <div className="h-1.5 rounded-full bg-[var(--border)]/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--brand-default)] transition-all duration-150"
                      style={{ width: `${spacingPercent}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={SPACING_MIN}
                    max={SPACING_MAX}
                    step={0.1}
                    value={lineSpacing}
                    onChange={(e) => onLineSpacingChange(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    aria-label="Espaçamento entre linhas"
                  />
                </div>
                <button
                  onClick={() => onLineSpacingChange(Math.min(SPACING_MAX, +(lineSpacing + 0.1).toFixed(1)))}
                  className="w-8 h-8 rounded-lg hover:bg-[var(--surface-raised)] flex items-center justify-center transition-colors"
                  aria-label="Aumentar espaçamento"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono w-8 text-center tabular-nums">{lineSpacing.toFixed(1)}</span>
              </div>
            )}

            {/* Diff toggle */}
            {showComparison && (
              <button onClick={onToggleDiff}
                className={cn(
                  'px-2.5 py-1 rounded-full border transition-colors',
                  showDiff ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60'
                )}>
                Diferenças {showDiff ? 'ON' : 'OFF'}
              </button>
            )}

            {/* Theme */}
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors',
                showCustomizer ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] border-[var(--brand-default)]/20' : 'text-[var(--content-muted)] border-[var(--border)]/60 hover:text-[var(--content-primary)]'
              )}
              title="Customizar tema"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Tema</span>
            </button>

            <div className="flex items-center gap-2 ml-auto text-[var(--content-muted)]">
              <Eye className="w-3.5 h-3.5" />
              <span>{fontFamily === 'serif' ? 'Spectral' : 'Inter'} · Leitura {lineSpacing.toFixed(1)}</span>
            </div>
          </div>

          <ThemeCustomizer open={showCustomizer} onClose={() => setShowCustomizer(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
