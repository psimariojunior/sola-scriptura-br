'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, SkipForward, SkipBack, Moon, Sun, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Verse {
  numero: number;
  texto: string;
}

interface ImmersiveModeProps {
  livroNome: string;
  capitulo: number;
  versiculos: Verse[];
  traducao?: string;
  onClose: () => void;
}

const BACKGROUNDS = [
  { id: 'noite', gradient: 'from-[#0a0a1a] via-[#0d1117] to-[#0a0a1a]', textClass: 'text-gray-100' },
  { id: 'estrelas', gradient: 'from-[#0b0d17] via-[#111827] to-[#0b0d17]', textClass: 'text-blue-50' },
  { id: 'aurora', gradient: 'from-[#0f172a] via-[#1e1b4b] to-[#0f172a]', textClass: 'text-violet-50' },
  { id: 'quente', gradient: 'from-[#1c1917] via-[#292524] to-[#1c1917]', textClass: 'text-amber-50' },
  { id: 'océano', gradient: 'from-[#042f2e] via-[#0f3d3e] to-[#042f2e]', textClass: 'text-teal-50' },
];

const FONT_SIZES = [18, 20, 22, 24, 28, 32];

export function ImmersiveMode({ livroNome, capitulo, versiculos, traducao, onClose }: ImmersiveModeProps) {
  const { t } = useTranslation();
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgIdx, setBgIdx] = useState(0);
  const [fontSize, setFontSize] = useState(24);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const bg = BACKGROUNDS[bgIdx];

  // Auto-advance timer when playing
  useEffect(() => {
    if (isPlaying && autoAdvance) {
      const verse = versiculos[currentVerse];
      const readingTime = Math.max(3000, verse.texto.length * 80); // ~80ms per char, min 3s
      timerRef.current = setTimeout(() => {
        if (currentVerse < versiculos.length - 1) {
          setCurrentVerse(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, readingTime);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, currentVerse, versiculos, autoAdvance]);

  // Auto-hide controls
  useEffect(() => {
    if (showControls && isPlaying) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
    return () => { if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current); };
  }, [showControls, isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIsPlaying(p => !p); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentVerse(p => Math.min(p + 1, versiculos.length - 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentVerse(p => Math.max(p - 1, 0));
      }
      setShowControls(true);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, versiculos.length]);

  // Speech synthesis
  useEffect(() => {
    if (isPlaying && !muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(versiculos[currentVerse].texto);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, [isPlaying, currentVerse, muted, versiculos]);

  const verse = versiculos[currentVerse];
  const progress = ((currentVerse + 1) / versiculos.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'fixed inset-0 z-[100] flex flex-col',
        `bg-gradient-to-b ${bg.gradient}`,
        bg.textClass
      )}
      onClick={() => setShowControls(true)}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pt-4 pb-8 bg-gradient-to-b from-black/60 to-transparent"
          >
            <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h2 className="text-sm font-semibold opacity-90">{livroNome} {capitulo}</h2>
              {traducao && <p className="text-[10px] opacity-50 uppercase tracking-wider">{traducao}</p>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setBgIdx((bgIdx + 1) % BACKGROUNDS.length); }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verse content */}
      <div className="flex-1 flex items-center justify-center px-8 sm:px-16 md:px-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVerse}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl text-center"
          >
            <span className="text-amber-400/60 text-sm font-mono mb-4 block">{verse.numero}</span>
            <p
              className="leading-relaxed font-serif-body"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
            >
              {verse.texto}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 z-40 px-6 pb-6 pt-12 bg-gradient-to-t from-black/60 to-transparent"
          >
            {/* Verse counter */}
            <div className="text-center mb-4">
              <span className="text-xs opacity-60">{currentVerse + 1} / {versiculos.length}</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentVerse(p => Math.max(0, p - 1)); }}
                disabled={currentVerse === 0}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-all"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentVerse(p => Math.min(versiculos.length - 1, p + 1)); }}
                disabled={currentVerse === versiculos.length - 1}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-all"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Font size */}
            <div className="flex items-center justify-center gap-3 mb-3">
              {FONT_SIZES.map(size => (
                <button
                  key={size}
                  onClick={(e) => { e.stopPropagation(); setFontSize(size); }}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all',
                    fontSize === size
                      ? 'bg-amber-500/30 text-amber-300'
                      : 'bg-white/10 text-white/50 hover:bg-white/20'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Keyboard hints */}
            <div className="flex items-center justify-center gap-4 text-[10px] opacity-30">
              <span>Espaço: play/pause</span>
              <span>←→: navegar</span>
              <span>ESC: sair</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap zones for mobile navigation */}
      <div
        className="absolute inset-y-0 left-0 w-1/3 z-30 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setCurrentVerse(p => Math.max(0, p - 1)); setShowControls(true); }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/3 z-30 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setCurrentVerse(p => Math.min(versiculos.length - 1, p + 1)); setShowControls(true); }}
      />
    </motion.div>
  );
}
