'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  X,
  Volume2,
  Gauge,
  ListOrdered,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAudioCapitulo } from '@/hooks/useAudioCapitulo';
import type { VersiculoAudio } from '@/hooks/useAudioCapitulo';
import { labelMap as labelMapDefault } from '@/components/Biblia/TranslationDropdown';

interface NarrationPanelProps {
  open: boolean;
  onClose: () => void;
  livroAbreviacao: string;
  capitulo: number;
  traducao: string;
  livroNome: string;
  versiculos: VersiculoAudio[];
}

const SPEEDS = [0.75, 1, 1.25, 1.5];

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function NarrationPanel({
  open,
  onClose,
  livroAbreviacao,
  capitulo,
  traducao,
  livroNome,
  versiculos,
}: NarrationPanelProps) {
  const audio = useAudioCapitulo(livroAbreviacao, capitulo, versiculos);
  const { state, play, pause, resume, stop, goToVerse, skipForward, skipBackward, setAnnounceVerseNumbers } = audio;

  const [speed, setSpeed] = useState(1);
  const [speedOpen, setSpeedOpen] = useState(false);

  const verseRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const currentRef = state.currentVerseIndex;

  useEffect(() => {
    try {
      const saved = localStorage.getItem('audio-speed');
      if (saved) {
        const n = parseFloat(saved);
        if ([0.75, 1, 1.25, 1.5].includes(n)) setSpeed(n);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = verseRefs.current[currentRef];
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentRef, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  const isActive = state.isPlaying || state.isPaused;
  const tradLabel = labelMapDefault[traducao] || traducao.toUpperCase();

  const progressPct = useMemo(() => {
    if (!state.totalTime) return 0;
    return Math.min(100, Math.max(0, (state.currentTime / state.totalTime) * 100));
  }, [state.currentTime, state.totalTime]);

  const handleMain = () => {
    if (state.isPlaying) {
      pause();
    } else if (state.isPaused) {
      resume();
    } else {
      play();
    }
  };

  const handleClose = () => {
    stop();
    onClose();
  };

  const changeSpeed = (s: number) => {
    try { localStorage.setItem('audio-speed', String(s)); } catch {}
    setSpeed(s);
    setSpeedOpen(false);
  };

  const toggleAnnounce = () => {
    const next = !state.announceVerseNumbers;
    setAnnounceVerseNumbers(next);
    if (next) {
      stop();
      setTimeout(() => goToVerse(state.currentVerseIndex), 50);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="narration-title"
        >
          <motion.div
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-[var(--surface-raised)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85dvh]"
          >
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-[var(--border)] bg-gradient-to-br from-[var(--brand-subtle)] to-transparent">
              <div className="p-2 rounded-xl bg-[var(--brand-default)]/15 text-[var(--brand-default)] shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="narration-title" className="font-display text-sm font-semibold text-[var(--content-primary)] truncate">
                  Narração do Capítulo
                </h2>
                <p className="text-xs text-[var(--content-secondary)] truncate">
                  {livroNome} {capitulo} · {tradLabel}
                </p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={handleClose}
                className="p-1.5 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
                aria-label="Fechar narração"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {versiculos.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-[var(--content-muted)]" strokeWidth={1.5} />
                <p className="text-sm text-[var(--content-muted)]">
                  Aguarde o carregamento dos versículos para iniciar a narração.
                </p>
              </div>
            ) : (
              <>
                <div className="px-4 sm:px-5 pt-4 pb-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs tabular-nums text-[var(--content-tertiary)] w-10 text-right">
                      {formatTime(state.currentTime)}
                    </span>
                    <div className="relative flex-1 h-2 rounded-full bg-[var(--surface-sunken)] overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-[var(--brand-default)] transition-[width] duration-100"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-[var(--content-tertiary)] w-10">
                      {formatTime(state.totalTime)}
                    </span>
                  </div>

                  {state.error && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{state.error}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => skipBackward(1)}
                      disabled={!isActive}
                      className="p-2.5 rounded-full text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-30 transition-colors"
                      aria-label="Versículo anterior"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    <motion.button
                      onClick={handleMain}
                      whileTap={{ scale: 0.94 }}
                      className="flex items-center justify-center w-14 h-14 rounded-full text-[var(--brand-contrast)] bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] shadow-lg shadow-[var(--brand-default)]/30"
                      aria-label={state.isPlaying ? 'Pausar' : 'Reproduzir'}
                    >
                      {state.isLoading ? (
                        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : state.isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      )}
                    </motion.button>
                    <button
                      onClick={() => skipForward(1)}
                      disabled={!isActive}
                      className="p-2.5 rounded-full text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-30 transition-colors"
                      aria-label="Próximo versículo"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => stop()}
                      disabled={!isActive}
                      className="p-2.5 rounded-full text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-30 transition-colors"
                      aria-label="Parar"
                    >
                      <Square className="w-4 h-4 fill-current" />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setSpeedOpen(!speedOpen)}
                        className="flex items-center gap-1 px-2.5 py-2 rounded-full text-xs font-semibold text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] border border-[var(--border)]/60 ml-1"
                        aria-label="Velocidade de reprodução"
                      >
                        <Gauge className="w-3.5 h-3.5" />
                        {speed}x
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>
                      <AnimatePresence>
                        {speedOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setSpeedOpen(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.95 }}
                              transition={{ duration: 0.12 }}
                              className="absolute right-0 bottom-full mb-2 z-40 w-24 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-1"
                            >
                              {SPEEDS.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => changeSpeed(s)}
                                  className={cn(
                                    'w-full text-center px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                                    speed === s
                                      ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                                      : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                                  )}
                                >
                                  {s}x
                                </button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <button
                    onClick={toggleAnnounce}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                      state.announceVerseNumbers
                        ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                        : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                    )}
                    aria-pressed={state.announceVerseNumbers}
                  >
                    <ListOrdered className="w-4 h-4 shrink-0" />
                    <span>Anunciar número dos versículos</span>
                    <span
                      className={cn(
                        'ml-auto w-9 h-5 rounded-full p-0.5 transition-colors',
                        state.announceVerseNumbers ? 'bg-[var(--brand-default)]' : 'bg-[var(--surface-sunken)]'
                      )}
                    >
                      <span
                        className={cn(
                          'block w-4 h-4 rounded-full bg-white transition-transform',
                          state.announceVerseNumbers ? 'translate-x-4' : 'translate-x-0'
                        )}
                      />
                    </span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-5 pb-5 border-t border-[var(--border)]/40 pt-3">
                  <p className="text-[10px] uppercase tracking-wide font-semibold text-[var(--content-tertiary)] mb-2">
                    Versículos
                  </p>
                  <div className="space-y-0.5">
                    {versiculos.map((v, i) => {
                      const active = i === state.currentVerseIndex && isActive;
                      return (
                        <button
                          key={v.numero}
                          ref={(el) => { verseRefs.current[i] = el; }}
                          onClick={() => goToVerse(i)}
                          className={cn(
                            'w-full flex gap-2.5 px-3 py-2 rounded-lg text-left transition-colors',
                            active
                              ? 'bg-[var(--brand-subtle)]'
                              : 'hover:bg-[var(--surface-sunken)]'
                          )}
                        >
                          <sup
                            className={cn(
                              'text-[10px] font-bold tabular-nums shrink-0 w-5 text-right mt-1',
                              active ? 'text-[var(--brand-default)]' : 'text-[var(--content-muted)]'
                            )}
                          >
                            {v.numero}
                          </sup>
                          <span
                            className={cn(
                              'text-sm leading-snug',
                              active
                                ? 'text-[var(--brand-default)] font-medium'
                                : 'text-[var(--content-secondary)]'
                            )}
                          >
                            {v.texto}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
