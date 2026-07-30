'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextToSpeechButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function TextToSpeechButton({
  text,
  label,
  className,
  variant = 'default',
  size = 'md',
}: TextToSpeechButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const getPtBrVoice = useCallback(() => {
    return (
      voices.find((v) => v.lang === 'pt-BR' && v.name.includes('Francisca')) ||
      voices.find((v) => v.lang === 'pt-BR') ||
      voices.find((v) => v.lang.startsWith('pt')) ||
      voices[0]
    );
  }, [voices]);

  const speak = useCallback(() => {
    if (!text || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const ptVoice = getPtBrVoice();
    if (ptVoice) utterance.voice = ptVoice;
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsMuted(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsMuted(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsMuted(false);
  }, [text, getPtBrVoice]);

  const pause = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsMuted(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (window.speechSynthesis?.paused) {
      resume();
    } else {
      speak();
    }
  }, [isPlaying, speak, pause, resume]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      resume();
      setIsMuted(false);
    } else if (isPlaying) {
      pause();
      setIsMuted(true);
    }
  }, [isMuted, isPlaying, pause, resume]);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const variantClasses = {
    default: 'bg-[var(--brand-default)] text-[var(--brand-contrast)] hover:bg-[var(--brand-hover)] shadow-[var(--shadow-sm)]',
    ghost: 'bg-transparent text-[var(--content-primary)] hover:bg-[var(--surface-sunken)]',
    outline: 'border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--content-primary)] hover:bg-[var(--surface-sunken)]',
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <motion.button
        onClick={togglePlay}
        className={cn(
          'relative rounded-xl flex items-center justify-center transition-all',
          sizeClasses[size],
          variantClasses[variant]
        )}
        whileTap={{ scale: 0.92 }}
        title={isPlaying ? 'Pausar leitura' : 'Ouvir em áudio'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-[2px]"
            >
              <motion.span
                className="w-[3px] bg-current rounded-full"
                animate={{ height: ['6px', '14px', '6px'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-[3px] bg-current rounded-full"
                animate={{ height: ['10px', '6px', '10px'] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              />
              <motion.span
                className="w-[3px] bg-current rounded-full"
                animate={{ height: ['6px', '12px', '6px'] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <Play className={cn('fill-current', size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5')} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          onClick={toggleMute}
          className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)] transition-colors"
          title={isMuted ? 'Desmutar' : 'Mutar'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[var(--content-muted)]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[var(--content-muted)]" />
          )}
        </motion.button>
      )}

      {label && (
        <span className="text-xs font-medium text-[var(--content-secondary)] hidden sm:inline">
          {label}
        </span>
      )}
    </div>
  );
}
