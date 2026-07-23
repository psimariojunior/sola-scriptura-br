'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Cloud, Sunrise, Sparkles, Heart, Flame, Star,
  ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, MonitorPlay
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Mood = 'gloria' | 'esperanca' | 'alegria' | 'paz' | 'sabedoria' | 'amor' | 'juizo' | 'trevas';

function detectMood(text: string): Mood {
  const t = text.toLowerCase();
  if (/trevas|morte|abismo|chorar|lamenta|triste/.test(t)) return 'trevas';
  if (/fogo|ira|juizo|destruir|justi[çc]a|vingan[çc]a|machado/.test(t)) return 'juizo';
  if (/amor|gra[çc]a|miseric[óo]rdia|compaix[ãa]o|cora[çc][ãa]o/.test(t)) return 'amor';
  if (/luz|gl[óo]ria|esplendor|resplande|brilho|resplandecente/.test(t)) return 'gloria';
  if (/esperan[çc]a|promessa|futuro|novo|renovo/.test(t)) return 'esperanca';
  if (/regozijo|alegria|gozo|regozijar|exultar|cant[áa]i|celebrai/.test(t)) return 'alegria';
  if (/paz|descanso|repouso|calma|mansid[ãa]o|sossego|sono/.test(t)) return 'paz';
  if (/sabedoria|entendiment|prud[êe]ncia|conhecimento|ensina/.test(t)) return 'sabedoria';
  return 'gloria';
}

const moodConfig: Record<Mood, { gradient: string; accent: string; icon: typeof Sun }> = {
  gloria:    { gradient: 'from-amber-900/40 to-orange-900/30', accent: 'text-amber-300', icon: Sunrise },
  esperanca: { gradient: 'from-rose-900/40 to-amber-900/30',   accent: 'text-rose-300',  icon: Sparkles },
  alegria:   { gradient: 'from-yellow-900/40 to-orange-900/30', accent: 'text-yellow-300', icon: Sun },
  paz:       { gradient: 'from-sky-900/40 to-indigo-900/40',   accent: 'text-sky-300',   icon: Cloud },
  sabedoria: { gradient: 'from-indigo-900/40 to-purple-900/40', accent: 'text-indigo-300', icon: Star },
  amor:      { gradient: 'from-rose-900/40 to-pink-900/30',    accent: 'text-pink-300',  icon: Heart },
  juizo:     { gradient: 'from-red-950/50 to-orange-950/40',   accent: 'text-red-300',   icon: Flame },
  trevas:    { gradient: 'from-slate-900/60 to-zinc-900/50',   accent: 'text-slate-300', icon: Moon },
};

interface PresentationInlineProps {
  texto: string;
  referencia: string;
  apresentadoPor?: string;
  fontSize?: number;
  mirror?: boolean;
  isController?: boolean;
  onFontSizeChange?: (size: number) => void;
  onMirrorChange?: (mirror: boolean) => void;
  onPresent?: () => void;
  onStop?: () => void;
}

export function PresentationInline({
  texto,
  referencia,
  apresentadoPor,
  fontSize: controlledFontSize,
  mirror: controlledMirror,
  isController = false,
  onFontSizeChange,
  onMirrorChange,
  onPresent,
  onStop,
}: PresentationInlineProps) {
  const [internalFontSize, setInternalFontSize] = useState(48);
  const [internalMirror, setInternalMirror] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fontSize = controlledFontSize ?? internalFontSize;
  const mirror = controlledMirror ?? internalMirror;

  const mood = detectMood(texto);
  const moodCfg = moodConfig[mood];
  const MoodIcon = moodCfg.icon;

  const handleFontSize = (delta: number) => {
    const newSize = Math.min(96, Math.max(20, fontSize + delta));
    onFontSizeChange?.(newSize);
    if (!onFontSizeChange) setInternalFontSize(newSize);
  };

  const handleMirror = () => {
    const newMirror = !mirror;
    onMirrorChange?.(newMirror);
    if (!onMirrorChange) setInternalMirror(newMirror);
  };

  const containerRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (isFullscreen) {
      if (el.requestFullscreen) el.requestFullscreen();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controles do controlador */}
      {isController && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)]/40 bg-[var(--surface-sunken)]/30">
          <div className="flex items-center gap-2">
            <MonitorPlay className="w-4 h-4 text-[var(--brand-default)]" />
            <span className="text-xs text-[var(--content-muted)]">Apresentação</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleFontSize(-4)}
              className="p-1.5 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]"
              title="Diminuir fonte"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-[var(--content-muted)] w-8 text-center">{fontSize}px</span>
            <button
              onClick={() => handleFontSize(4)}
              className="p-1.5 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]"
              title="Aumentar fonte"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleMirror}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                mirror
                  ? 'bg-[var(--brand-default)]/10 text-[var(--brand-default)]'
                  : 'hover:bg-[var(--surface-raised)] text-[var(--content-muted)]'
              )}
              title="Espelho"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            {onPresent && (
              <button
                onClick={onPresent}
              className="px-2 py-1 text-[10px] rounded-lg bg-[var(--brand-default)] text-[var(--brand-contrast)] font-medium"
            >
              Apresentar
            </button>
            )}
            {onStop && (
              <button
                onClick={onStop}
                className="px-2 py-1 text-[10px] rounded-lg bg-red-500/10 text-red-500 font-medium"
              >
                Parar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Display do verso */}
      <div
        ref={containerRef}
        className={cn(
          'flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden',
          `bg-gradient-to-br ${moodCfg.gradient}`
        )}
        style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
      >
        {/* Ícone do mood */}
        <div className={cn('absolute top-6 right-6 opacity-20', moodCfg.accent)}>
          <MoodIcon className="w-16 h-16" strokeWidth={1} />
        </div>

        {/* Texto do versículo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={texto}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl text-center"
            style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
          >
            <p
              className="font-serif-body leading-relaxed text-white/90"
              style={{ fontSize: `${fontSize}px` }}
            >
              {texto}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Referência */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={cn('mt-8 text-lg font-display font-light', moodCfg.accent)}
          style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
        >
          {referencia}
        </motion.div>

        {/* Apresentado por */}
        {apresentadoPor && (
          <div className="absolute bottom-4 left-4 text-[10px] text-white/30">
            Apresentado por {apresentadoPor}
          </div>
        )}
      </div>
    </div>
  );
}
