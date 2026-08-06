'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, SkipForward, SkipBack, Volume2 } from 'lucide-react';

interface AudioState {
  isPlaying: boolean;
  verseRef: string;
  verseText: string;
  progress: number; // 0-100
  duration: number;
  currentTime: number;
}

export function NowPlayingBar() {
  const [audio, setAudio] = useState<AudioState | null>(null);
  const [visible, setVisible] = useState(false);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = useCallback(() => {
    document.dispatchEvent(new CustomEvent('audio:toggle-play'));
  }, []);

  const handlePrev = useCallback(() => {
    document.dispatchEvent(new CustomEvent('audio:prev'));
  }, []);

  const handleNext = useCallback(() => {
    document.dispatchEvent(new CustomEvent('audio:next'));
  }, []);

  const handleClose = useCallback(() => {
    document.dispatchEvent(new CustomEvent('audio:stop'));
    setVisible(false);
    setAudio(null);
  }, []);

  // Listen for audio state events
  useEffect(() => {
    const handleAudioState = (e: CustomEvent<AudioState>) => {
      setAudio(e.detail);
      setVisible(true);
    };

    const handleAudioStop = () => {
      setVisible(false);
      setTimeout(() => setAudio(null), 300);
    };

    document.addEventListener('audio:state', handleAudioState as EventListener);
    document.addEventListener('audio:stop', handleAudioStop);

    return () => {
      document.removeEventListener('audio:state', handleAudioState as EventListener);
      document.removeEventListener('audio:stop', handleAudioStop);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && audio && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="now-playing-bar"
        >
          {/* Progress bar */}
          <div
            className="now-playing-progress"
            style={{ width: `${audio.progress}%` }}
          />

          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--brand-default)] text-white flex-shrink-0"
          >
            {audio.isPlaying ? (
              <Pause className="w-4 h-4" fill="white" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" fill="white" />
            )}
          </button>

          {/* Verse info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[var(--content-primary)] truncate">
              {audio.verseRef}
            </p>
            <p className="text-[11px] text-[var(--content-muted)] truncate">
              {audio.verseText}
            </p>
          </div>

          {/* Time */}
          <span className="text-[10px] text-[var(--content-muted)] font-mono flex-shrink-0">
            {formatTime(audio.currentTime)}
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={handlePrev} className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors">
              <SkipBack className="w-3.5 h-3.5 text-[var(--content-secondary)]" />
            </button>
            <button onClick={handleNext} className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors">
              <SkipForward className="w-3.5 h-3.5 text-[var(--content-secondary)]" />
            </button>
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5 text-[var(--content-muted)]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
