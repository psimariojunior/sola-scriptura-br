'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Accessibility, Type, Eye, Palette, Sun, Moon, Monitor, Contrast } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface AccessibilitySettings {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  highContrast: boolean;
  theme: 'light' | 'dark' | 'sepia' | 'high-contrast';
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  screenReaderMode: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 16,
  lineHeight: 1.6,
  letterSpacing: 0,
  highContrast: false,
  theme: 'light',
  dyslexiaFont: false,
  reduceMotion: false,
  screenReaderMode: false,
};

const FONT_SIZES = [
  { label: 'P', value: 14, description: 'Pequeno' },
  { label: 'M', value: 16, description: 'Médio' },
  { label: 'G', value: 18, description: 'Grande' },
  { label: 'XG', value: 22, description: 'Extra Grande' },
  { label: 'XXG', value: 28, description: 'Muito Grande' },
];

const THEMES = [
  { id: 'light' as const, label: 'Claro', icon: Sun, preview: 'bg-white text-gray-900' },
  { id: 'dark' as const, label: 'Escuro', icon: Moon, preview: 'bg-gray-900 text-white' },
  { id: 'sepia' as const, label: 'Sépia', icon: Palette, preview: 'bg-amber-50 text-amber-900' },
  { id: 'high-contrast' as const, label: 'Alto Contraste', icon: Contrast, preview: 'bg-black text-yellow-400' },
];

export function AccessibilityPanel() {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ssb_accessibility');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ssb_accessibility', JSON.stringify(settings));

    const root = document.documentElement;
    root.style.setProperty('--bible-font-size', `${settings.fontSize}px`);
    root.style.setProperty('--bible-line-height', settings.lineHeight.toString());
    root.style.setProperty('--bible-letter-spacing', `${settings.letterSpacing}em`);

    if (settings.dyslexiaFont) root.classList.add('font-dyslexia');
    else root.classList.remove('font-dyslexia');

    if (settings.reduceMotion) root.classList.add('reduce-motion');
    else root.classList.remove('reduce-motion');

    if (settings.screenReaderMode) root.classList.add('sr-mode');
    else root.classList.remove('sr-mode');
  }, [settings]);

  const update = useCallback((key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="h-8 w-8">
        <Accessibility className="w-4 h-4" />
      </Button>

      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
            className="relative w-full sm:max-w-md max-h-[85vh] bg-[var(--surface-base)] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]/40">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-[var(--brand)]" />
                <h3 className="font-semibold">Acessibilidade</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-[var(--surface-raised)]">
                <span className="text-lg">×</span>
              </button>
            </div>

            <ScrollArea className="max-h-[calc(85vh-60px)]">
              <div className="p-4 space-y-6">
                {/* Font Size */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Type className="w-4 h-4 text-[var(--content-muted)]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)]">Tamanho da Fonte</span>
                  </div>
                  <div className="flex gap-1.5">
                    {FONT_SIZES.map(fs => (
                      <button key={fs.value} onClick={() => update('fontSize', fs.value)}
                        className={cn('flex-1 py-2 rounded-lg text-xs font-medium transition-all border',
                          settings.fontSize === fs.value
                            ? 'bg-[var(--brand)] text-white border-[var(--brand)]'
                            : 'border-[var(--border)] hover:border-[var(--brand)]/50')}>
                        <div className="text-lg font-bold">{fs.label}</div>
                        <div className="text-[10px] opacity-70">{fs.description}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 px-3 py-2 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)]/20">
                    <p style={{ fontSize: `${settings.fontSize}px`, lineHeight: settings.lineHeight }}>
                      <span className="font-bold">João 3:16</span> — Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.
                    </p>
                  </div>
                </div>

                {/* Line Height */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[var(--content-muted)]">Espaçamento entre linhas</span>
                    <span className="text-xs text-[var(--brand)]">{settings.lineHeight.toFixed(1)}</span>
                  </div>
                  <input type="range" min="1.0" max="3.0" step="0.1" value={settings.lineHeight}
                    onChange={(e) => update('lineHeight', parseFloat(e.target.value))}
                    className="w-full h-2 bg-[var(--surface-raised)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]" />
                </div>

                {/* Letter Spacing */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[var(--content-muted)]">Espaçamento entre letras</span>
                    <span className="text-xs text-[var(--brand)]">{settings.letterSpacing.toFixed(2)}em</span>
                  </div>
                  <input type="range" min="0" max="0.2" step="0.01" value={settings.letterSpacing}
                    onChange={(e) => update('letterSpacing', parseFloat(e.target.value))}
                    className="w-full h-2 bg-[var(--surface-raised)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]" />
                </div>

                {/* Themes */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-[var(--content-muted)]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)]">Tema</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {THEMES.map(theme => (
                      <button key={theme.id} onClick={() => update('theme', theme.id)}
                        className={cn('p-3 rounded-xl border-2 transition-all text-left',
                          settings.theme === theme.id ? 'border-[var(--brand)]' : 'border-[var(--border)]')}>
                        <div className={cn('w-full h-8 rounded-lg mb-2', theme.preview)} />
                        <span className="text-xs font-medium">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-2">
                  <ToggleSetting label="Fonte para dislexia" description="OpenDyslexic - mais legível para dislexia"
                    checked={settings.dyslexiaFont} onChange={(v) => update('dyslexiaFont', v)} />
                  <ToggleSetting label="Reduzir movimento" description="Desativa animações e transições"
                    checked={settings.reduceMotion} onChange={(v) => update('reduceMotion', v)} />
                  <ToggleSetting label="Modo leitor de tela" description="Otimiza para NVDA, VoiceOver, TalkBack"
                    checked={settings.screenReaderMode} onChange={(v) => update('screenReaderMode', v)} />
                  <ToggleSetting label="Alto contraste" description="Aumenta contraste para baixa visão"
                    checked={settings.highContrast} onChange={(v) => update('highContrast', v)} />
                </div>

                {/* Reset */}
                <Button variant="outline" className="w-full" onClick={() => setSettings(DEFAULT_SETTINGS)}>
                  Restaurar Padrões
                </Button>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function ToggleSetting({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-raised)]">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[10px] text-[var(--content-muted)]">{description}</div>
      </div>
      <button onClick={() => onChange(!checked)}
        className={cn('w-11 h-6 rounded-full transition-colors relative',
          checked ? 'bg-[var(--brand)]' : 'bg-[var(--surface-sunken)]')}>
        <div className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5.5' : 'translate-x-0.5')} />
      </button>
    </div>
  );
}
