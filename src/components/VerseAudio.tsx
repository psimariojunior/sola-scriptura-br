import { Volume2, VolumeX, Play, Pause, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VerseAudioProps {
  text: string;
  verseNumber: number;
  isCurrentlyPlaying: boolean;
  onPlay: (verseNumber: number) => void;
  onStop: () => void;
}

export default function VerseAudio({ text, verseNumber, isCurrentlyPlaying, onPlay, onStop }: VerseAudioProps) {
  if (!text) return null;

  return (
    <motion.button
      onClick={() => (isCurrentlyPlaying ? onStop() : onPlay(verseNumber))}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className={`p-1.5 rounded-lg transition-all duration-200 ${
        isCurrentlyPlaying
          ? 'text-[var(--primary)] bg-[var(--primary)]/15 shadow-sm ring-1 ring-[var(--primary)]/20'
          : 'text-[var(--muted-fg)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/8'
      }`}
      title={isCurrentlyPlaying ? 'Parar áudio' : 'Ouvir versículo'}
    >
      {isCurrentlyPlaying ? (
        <span className="flex items-center gap-1">
          {[3, 5, 4, 6, 3, 5].map((h, i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-current rounded-full"
              animate={{ height: [3, h, 2, h + 2, 3] }}
              transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
              style={{ height: 3 }}
            />
          ))}
        </span>
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
}: {
  isPlaying: boolean;
  currentVerse: number;
  totalVerses: number;
  verseText: string;
  onStop: () => void;
}) {
  if (currentVerse === -1 && !isPlaying) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-20 left-4 right-4 lg:left-auto lg:right-6 lg:bottom-6 lg:w-80 z-50"
    >
      <motion.div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-opacity-95"
        animate={{ scale: isPlaying ? 1 : 0.98 }}
      >
        {/* Vibrating progress bar */}
        <div className="h-1 bg-[var(--border)]/30 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)]/60 to-[var(--primary)]"
            animate={isPlaying ? {
              width: `${((currentVerse + 1) / totalVerses) * 100}%`,
              opacity: [0.7, 1, 0.7],
            } : { width: '0%' }}
            transition={isPlaying ? { duration: 0.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          />
        </div>

        <div className="p-3 flex items-center gap-3">
          {/* Stop button */}
          <motion.button
            onClick={onStop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 hover:bg-[var(--primary)]/20 transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </motion.button>

          {/* Verse info */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold truncate flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Versículo {currentVerse + 1} de {totalVerses}
            </p>
            <p className="text-[10px] text-[var(--muted-fg)] truncate">{verseText?.substring(0, 50)}...</p>
          </div>

          {/* Sound wave animation */}
          <div className="flex items-end gap-[2px] h-5">
            {isPlaying ? (
              [3, 6, 4, 7, 5, 6].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-[var(--primary)]/40 rounded-full"
                  animate={{ height: [3, h, 2, h + 1, 3] }}
                  transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))
            ) : (
              [3, 3, 3, 3, 3, 3].map((h, i) => (
                <div key={i} className="w-[2px] bg-[var(--border)]/30 rounded-full" style={{ height: h }} />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
