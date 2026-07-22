'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';

interface VoiceSearchButtonProps {
  onResult: (text: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

function WaveformAnimation() {
  return (
    <div className="flex items-center gap-[3px] h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-white rounded-full"
          animate={{
            height: ['4px', '16px', '4px'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function VoiceSearchButton({ onResult, className, size = 'md' }: VoiceSearchButtonProps) {
  const { isListening, transcript, isSupported, error, startListening, stopListening } = useVoiceSearch({
    lang: 'pt-BR',
    debounceMs: 500,
    maxSilenceMs: 10000,
    onResult,
  });

  const buttonSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  if (!isSupported) {
    return null;
  }

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <motion.button
        onClick={isListening ? stopListening : startListening}
        className={cn(
          'rounded-full flex items-center justify-center transition-all relative',
          buttonSize,
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
            : 'bg-[var(--surface-raised)] hover:bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)] border border-[var(--border)]/60'
        )}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title={isListening ? 'Parar busca por voz' : 'Buscar por voz'}
        aria-label={isListening ? 'Parar busca por voz' : 'Buscar por voz'}
      >
        {isListening ? (
          <MicOff className={iconSize} />
        ) : (
          <Mic className={iconSize} />
        )}
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 8 }}
            animate={{ opacity: 1, scale: 1, x: 8 }}
            exit={{ opacity: 0, scale: 0.8, x: 8 }}
            className="absolute left-full ml-2 flex items-center gap-2 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl px-3 py-2 shadow-xl whitespace-nowrap"
          >
            <WaveformAnimation />
            {transcript && (
              <span className="text-xs text-[var(--content-primary)] max-w-[200px] truncate">
                {transcript}
              </span>
            )}
            {!transcript && (
              <span className="text-xs text-[var(--content-muted)]">Ouvindo...</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg px-3 py-2 shadow-lg whitespace-nowrap text-xs z-50"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
