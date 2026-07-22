'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, RotateCcw, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const CORES_PRIMARIAS = [
  { nome: 'Dourado', hsl: '35 56% 40%', hex: '#A17A2C', ring: 'ring-amber-600' },
  { nome: 'Azul', hsl: '217 70% 50%', hex: '#3B6FE0', ring: 'ring-blue-600' },
  { nome: 'Verde', hsl: '142 60% 35%', hex: '#22803D', ring: 'ring-green-600' },
  { nome: 'Roxo', hsl: '268 55% 45%', hex: '#7C3AED', ring: 'ring-purple-600' },
  { nome: 'Rosa', hsl: '340 70% 50%', hex: '#E6368A', ring: 'ring-pink-600' },
  { nome: 'Vermelho', hsl: '0 70% 45%', hex: '#D42020', ring: 'ring-red-600' },
  { nome: 'Cyan', hsl: '185 70% 40%', hex: '#1BAAB5', ring: 'ring-cyan-600' },
  { nome: 'Laranja', hsl: '24 80% 50%', hex: '#E87A1A', ring: 'ring-orange-500' },
];

const ESPACAMENTOS = [
  { id: 'compacto', label: 'Compacto', gap: '0.5rem' },
  { id: 'normal', label: 'Normal', gap: '1.25rem' },
  { id: 'relaxado', label: 'Relaxado', gap: '2rem' },
];

interface CustomTheme {
  corPrimaria: string;
  corPrimariaHsl: string;
  fontSize: number;
  espacamento: string;
}

const DEFAULT_THEME: CustomTheme = {
  corPrimaria: '#A17A2C',
  corPrimariaHsl: '35 56% 40%',
  fontSize: 16,
  espacamento: 'normal',
};

const STORAGE_KEY = 'ssb_custom_theme';

function loadCustomTheme(): CustomTheme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_THEME, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_THEME;
}

function saveCustomTheme(theme: CustomTheme) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(theme)); } catch {}
}

function applyCustomTheme(theme: CustomTheme) {
  const root = document.documentElement;
  root.style.setProperty('--brand-default', theme.corPrimariaHsl);
  root.style.setProperty('--primary', theme.corPrimariaHsl);
  root.style.setProperty('--ring', theme.corPrimariaHsl);
  root.style.setProperty('--content-link', theme.corPrimariaHsl);
  root.style.setProperty('--custom-font-size', `${theme.fontSize}px`);
  root.style.setProperty('--custom-verse-gap', theme.espacamento);
}

function resetCustomTheme() {
  const root = document.documentElement;
  root.style.removeProperty('--brand-default');
  root.style.removeProperty('--primary');
  root.style.removeProperty('--ring');
  root.style.removeProperty('--content-link');
  root.style.removeProperty('--custom-font-size');
  root.style.removeProperty('--custom-verse-gap');
}

interface ThemeCustomizerProps {
  open: boolean;
  onClose: () => void;
}

export function ThemeCustomizer({ open, onClose }: ThemeCustomizerProps) {
  const [config, setConfig] = useState<CustomTheme>(DEFAULT_THEME);
  const [corSelecionada, setCorSelecionada] = useState(0);

  useEffect(() => {
    const saved = loadCustomTheme();
    setConfig(saved);
    const idx = CORES_PRIMARIAS.findIndex(c => c.hex === saved.corPrimaria);
    setCorSelecionada(idx >= 0 ? idx : 0);
  }, []);

  const aplicarCor = useCallback((idx: number) => {
    setCorSelecionada(idx);
    const c = CORES_PRIMARIAS[idx];
    const next = { ...config, corPrimaria: c.hex, corPrimariaHsl: c.hsl };
    setConfig(next);
    saveCustomTheme(next);
    applyCustomTheme(next);
  }, [config]);

  const aplicarFonte = useCallback((size: number) => {
    const next = { ...config, fontSize: size };
    setConfig(next);
    saveCustomTheme(next);
    applyCustomTheme(next);
  }, [config]);

  const aplicarEspacamento = useCallback((id: string) => {
    const esp = ESPACAMENTOS.find(e => e.id === id);
    if (!esp) return;
    const next = { ...config, espacamento: id };
    setConfig(next);
    saveCustomTheme(next);
    applyCustomTheme(next);
  }, [config]);

  const resetar = useCallback(() => {
    setConfig(DEFAULT_THEME);
    setCorSelecionada(0);
    saveCustomTheme(DEFAULT_THEME);
    resetCustomTheme();
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/40 px-4 py-3 text-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[var(--content-primary)] flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[var(--brand-default)]" />
              Customizar Tema
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={resetar}
                className="flex items-center gap-1 px-2 py-1 rounded text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-raised)] transition-colors"
                title="Resetar para padrão"
              >
                <RotateCcw className="w-3 h-3" />
                Resetar
              </button>
              <button onClick={onClose} className="p-1 hover:bg-[var(--surface-raised)] rounded transition-colors" aria-label="Fechar">
                <X className="w-3.5 h-3.5 text-[var(--content-muted)]" />
              </button>
            </div>
          </div>

          {/* Cor Primária */}
          <div className="mb-3">
            <label className="block text-[var(--content-muted)] font-medium mb-2">Cor Primária</label>
            <div className="flex items-center gap-2 flex-wrap">
              {CORES_PRIMARIAS.map((c, i) => (
                <button
                  key={c.hex}
                  onClick={() => aplicarCor(i)}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center',
                    corSelecionada === i
                      ? 'border-[var(--content-primary)] scale-110 shadow-md'
                      : 'border-transparent hover:border-[var(--border)] hover:scale-105'
                  )}
                  style={{ backgroundColor: c.hex }}
                  title={c.nome}
                >
                  {corSelecionada === i && <Check className="w-4 h-4 text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tamanho da Fonte */}
          <div className="mb-3">
            <label className="block text-[var(--content-muted)] font-medium mb-2">
              Tamanho da Fonte: <span className="font-mono text-[var(--brand-default)]">{config.fontSize}px</span>
            </label>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[var(--content-muted)]">A</span>
              <input
                type="range"
                min={14}
                max={24}
                value={config.fontSize}
                onChange={(e) => aplicarFonte(Number(e.target.value))}
                className="flex-1 h-1.5 bg-[var(--border)] rounded-full appearance-none cursor-pointer accent-[var(--brand-default)]"
              />
              <span className="text-sm text-[var(--content-muted)]">A</span>
            </div>
          </div>

          {/* Espaçamento */}
          <div>
            <label className="block text-[var(--content-muted)] font-medium mb-2">Espaçamento entre Versículos</label>
            <div className="flex gap-1.5">
              {ESPACAMENTOS.map((esp) => (
                <button
                  key={esp.id}
                  onClick={() => aplicarEspacamento(esp.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-[11px] font-medium transition-all',
                    config.espacamento === esp.id
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                      : 'bg-[var(--surface-raised)] text-[var(--content-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--content-primary)] border border-[var(--border)]/60'
                  )}
                >
                  {esp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mt-3 p-3 bg-[var(--surface-raised)] rounded-lg border border-[var(--border)]/40">
            <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider mb-1.5 font-semibold">Preview</p>
            <p
              className="font-serif-body leading-relaxed text-[var(--content-primary)]"
              style={{ fontSize: `${config.fontSize}px` }}
            >
              <span className="font-bold" style={{ color: config.corPrimaria }}>1</span> No princípio criou Deus os céus e a terra.
            </p>
            <p className="text-[10px] text-[var(--content-muted)] mt-1">Gênesis 1:1</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
