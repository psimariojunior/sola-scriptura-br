import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VerseAudioProps {
  text: string;
  verseNumber: number;
  isCurrentlyPlaying: boolean;
  onPlay: (verseNumber: number) => void;
  onStop: () => void;
}

export default function VerseAudio({ text, verseNumber, isCurrentlyPlaying, onPlay, onStop }: VerseAudioProps) {
  return (
    <motion.button
      onClick={() => isCurrentlyPlaying ? onStop() : onPlay(verseNumber)}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className={`p-1 rounded-md transition-all duration-200 ${
        isCurrentlyPlaying
          ? 'text-[var(--primary)] bg-[var(--primary)]/10'
          : 'text-[var(--muted-fg)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5'
      }`}
      title={isCurrentlyPlaying ? 'Parar' : 'Ouvir versículo'}
    >
      {isCurrentlyPlaying ? (
        <Pause className="w-3.5 h-3.5" />
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
    </motion.button>
  );
}

// Floating mini-player bar at the bottom
export function AudioMiniPlayer({
  isPlaying,
  currentVerse,
  totalVerses,
  verseText,
  onStop,
  onNext,
  onPrev,
}: {
  isPlaying: boolean;
  currentVerse: number;
  totalVerses: number;
  verseText: string;
  onStop: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!isPlaying && currentVerse === -1) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-16 left-4 right-4 lg:left-auto lg:right-6 lg:bottom-6 lg:w-96 z-50"
      >
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-opacity-95">
          {/* Progress bar */}
          <div className="h-1 bg-[var(--border)]/30">
            <motion.div
              className="h-full bg-[var(--primary)]"
              initial={{ width: '0%' }}
              animate={{ width: isPlaying ? `${((currentVerse + 1) / totalVerses) * 100}%` : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-4 flex items-center gap-3">
            {/* Play/Pause */}
            <motion.button
              onClick={onStop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[var(--primary)]/20"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </motion.button>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">
                Versículo {currentVerse + 1} de {totalVerses}
              </p>
              <p className="text-[11px] text-[var(--muted-fg)] truncate">
                {isPlaying ? 'Reproduzindo...' : 'Pausado'}
              </p>
            </div>

            {/* Volume indicator */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-0.5 bg-[var(--primary)] rounded-full"
                  animate={{
                    height: isPlaying ? [8, 16, 12, 20][bar - 1] : 4,
                    opacity: isPlaying ? 1 : 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isPlaying ? Infinity : 0,
                    delay: bar * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
