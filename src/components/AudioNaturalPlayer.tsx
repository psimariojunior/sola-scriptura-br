'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Timer,
  Bookmark,
  ChevronDown,
  ChevronUp,
  X,
  Download,
  Share2,
  Settings,
  Minimize2,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioNaturalPlayerProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  currentVerse?: number;
  totalVerses?: number;
  verseText?: string;
  bookName?: string;
  chapter?: number;
  engine?: string;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSeek: (time: number) => void;
  onSkipForward: (seconds?: number) => void;
  onSkipBackward: (seconds?: number) => void;
  volume: number;
  speed: number;
  isMuted: boolean;
  onSetVolume: (volume: number) => void;
  onSetSpeed: (speed: number) => void;
  onToggleMute: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
const SLEEP_OPTIONS = [5, 10, 15, 30, 45, 60];

function formatTime(seconds: number): string {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const mins = m % 60;
  const secs = s % 60;
  if (h > 0) return `${h}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioNaturalPlayer({
  isPlaying,
  isLoading,
  currentTime,
  duration,
  currentVerse = 0,
  totalVerses = 1,
  verseText = '',
  bookName = '',
  chapter = 1,
  engine = 'speech-api',
  onPlay,
  onPause,
  onStop,
  onSeek,
  onSkipForward,
  onSkipBackward,
  volume,
  speed,
  isMuted,
  onSetVolume,
  onSetSpeed,
  onToggleMute,
  onDownload,
  onShare,
}: AudioNaturalPlayerProps) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const [isMiniMode, setIsMiniMode] = useState(true);
  const [sleepMinutes, setSleepMinutes] = useState<number | null>(null);
  const [sleepRemaining, setSleepRemaining] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [seekHoverTime, setSeekHoverTime] = useState<number | null>(null);
  const [seekHoverPos, setSeekHoverPos] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepStartRef = useRef<number>(0);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (sleepMinutes !== null) {
      sleepStartRef.current = Date.now();
      setSleepRemaining(sleepMinutes * 60);

      sleepTimerRef.current = setInterval(() => {
        const elapsed = (Date.now() - sleepStartRef.current) / 1000;
        const remaining = sleepMinutes * 60 - elapsed;
        if (remaining <= 0) {
          onPause();
          setSleepMinutes(null);
          setSleepRemaining(null);
          clearInterval(sleepTimerRef.current!);
        } else {
          setSleepRemaining(Math.ceil(remaining));
        }
      }, 1000);

      return () => {
        if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
      };
    }
  }, [sleepMinutes, onPause]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = x / rect.width;
      onSeek(pct * duration);
    },
    [duration, onSeek]
  );

  const handleProgressHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = x / rect.width;
      setSeekHoverTime(pct * duration);
      setSeekHoverPos(x);
    },
    [duration]
  );

  const sleepTimerLabel =
    sleepRemaining !== null
      ? `${Math.floor(sleepRemaining / 60)}:${(sleepRemaining % 60).toString().padStart(2, '0')}`
      : null;

  if (!isMiniMode) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col"
        >
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]/50">
            <button onClick={() => setIsMiniMode(true)} className="p-2 rounded-lg hover:bg-[var(--accent)] transition-colors">
              <Minimize2 className="w-5 h-5 text-[var(--muted-fg)]" />
            </button>
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--fg)]">{bookName} {chapter}</p>
              <p className="text-xs text-[var(--muted-fg)]">Áudio Natural</p>
            </div>
            <button onClick={onStop} className="p-2 rounded-lg hover:bg-[var(--accent)] transition-colors">
              <X className="w-5 h-5 text-[var(--muted-fg)]" />
            </button>
          </div>

          {/* Waveform Visualization */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="flex items-end justify-center gap-[3px] h-40 w-full max-w-md">
              {Array.from({ length: 48 }).map((_, i) => {
                const baseHeight = 10 + Math.sin(i * 0.4) * 20 + Math.cos(i * 0.7) * 15;
                const animatedHeight = isPlaying
                  ? baseHeight + Math.sin(Date.now() / 200 + i * 0.3) * 15
                  : baseHeight * 0.3;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full"
                    style={{
                      background: i / 48 <= progress / 100
                        ? 'linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary-light, 38 50% 62%)))'
                        : 'hsl(var(--border))',
                    }}
                    animate={{
                      height: isPlaying
                        ? [
                            baseHeight * 0.4,
                            baseHeight * 0.7 + Math.sin(Date.now() / 300 + i) * 10,
                            baseHeight * 0.3,
                            baseHeight * 0.8 + Math.cos(Date.now() / 250 + i * 0.5) * 12,
                            baseHeight * 0.4,
                          ]
                        : baseHeight * 0.3,
                    }}
                    transition={
                      isPlaying
                        ? { duration: 1.5 + i * 0.02, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.5 }
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Current Verse Display */}
          <div className="px-8 mb-6 text-center">
            <p className="text-xs text-[var(--primary)] font-semibold mb-2 tracking-wider uppercase">
              Versículo {currentVerse + 1} de {totalVerses}
            </p>
            <p className="text-[var(--fg)] text-base leading-relaxed max-w-lg mx-auto line-clamp-3">
              {verseText}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="px-8 mb-4">
            <div
              ref={progressBarRef}
              className="relative h-2 bg-[var(--border)]/30 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseLeave={() => setSeekHoverTime(null)}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--primary)]/80 to-[var(--primary)] rounded-full"
                style={{ width: `${progress}%` }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--primary)] rounded-full shadow-lg border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
              {seekHoverTime !== null && (
                <div
                  className="absolute -top-8 px-2 py-0.5 bg-[var(--fg)] text-[var(--bg)] text-[10px] rounded font-mono pointer-events-none"
                  style={{ left: seekHoverPos, transform: 'translateX(-50%)' }}
                >
                  {formatTime(seekHoverTime)}
                </div>
              )}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-[var(--muted-fg)] font-mono">{formatTime(currentTime)}</span>
              <span className="text-[10px] text-[var(--muted-fg)] font-mono">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-6 pb-8">
            <button onClick={() => onSkipBackward(15)} className="p-3 rounded-full hover:bg-[var(--accent)] transition-colors relative group">
              <SkipBack className="w-6 h-6 text-[var(--fg)]" />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-[var(--muted-fg)] font-mono">15s</span>
            </button>

            <motion.button
              onClick={isPlaying ? onPause : onPlay}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 text-white flex items-center justify-center shadow-xl shadow-[var(--primary)]/20"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </motion.button>

            <button onClick={() => onSkipForward(15)} className="p-3 rounded-full hover:bg-[var(--accent)] transition-colors relative group">
              <SkipForward className="w-6 h-6 text-[var(--fg)]" />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-[var(--muted-fg)] font-mono">15s</span>
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between px-6 pb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleMute}
                className="p-2 rounded-lg hover:bg-[var(--accent)] transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[var(--muted-fg)]" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[var(--muted-fg)]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => onSetVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-[var(--primary)]"
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--fg)] hover:bg-[var(--accent)]/80 transition-colors"
              >
                {speed}x
              </button>
              <button
                onClick={() => setShowSleepMenu(!showSleepMenu)}
                className="p-2 rounded-lg hover:bg-[var(--accent)] transition-colors relative"
              >
                <Timer className="w-4 h-4 text-[var(--muted-fg)]" />
                {sleepTimerLabel && (
                  <span className="absolute -top-1 -right-1 text-[8px] bg-[var(--primary)] text-white px-1 rounded-full font-mono">
                    {sleepTimerLabel}
                  </span>
                )}
              </button>
              {onDownload && (
                <button onClick={onDownload} className="p-2 rounded-lg hover:bg-[var(--accent)] transition-colors">
                  <Download className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
              )}
            </div>
          </div>

          {/* Speed Menu */}
          <AnimatePresence>
            {showSpeedMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-2xl p-2 z-50"
              >
                <div className="grid grid-cols-4 gap-1">
                  {SPEED_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => { onSetSpeed(s); setShowSpeedMenu(false); }}
                      className={`px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                        speed === s
                          ? 'bg-[var(--primary)] text-white'
                          : 'text-[var(--fg)] hover:bg-[var(--accent)]'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sleep Timer Menu */}
          <AnimatePresence>
            {showSleepMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 right-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-2xl p-3 z-50 min-w-[160px]"
              >
                <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider mb-2 font-semibold">Timer de sono</p>
                <div className="space-y-1">
                  {SLEEP_OPTIONS.map((min) => (
                    <button
                      key={min}
                      onClick={() => { setSleepMinutes(min); setShowSleepMenu(false); }}
                      className={`block w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        sleepMinutes === min
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold'
                          : 'text-[var(--fg)] hover:bg-[var(--accent)]'
                      }`}
                    >
                      {min} minutos
                    </button>
                  ))}
                  {sleepMinutes !== null && (
                    <button
                      onClick={() => { setSleepMinutes(null); setShowSleepMenu(false); }}
                      className="block w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Cancelar timer
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Engine Badge */}
          <div className="absolute top-4 right-16">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-mono">
              {engine === 'elevenlabs' ? '🎙 ElevenLabs' : '🔊 Speech API'}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Mini Player Mode
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="bg-[var(--card-bg)] border-t border-[var(--border)]/50 shadow-2xl backdrop-blur-xl bg-opacity-95">
        {/* Progress bar */}
        <div
          ref={progressBarRef}
          className="h-1 bg-[var(--border)]/30 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)]/60 to-[var(--primary)] relative"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--primary)] rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        <div className="px-4 py-2.5 flex items-center gap-3">
          {/* Play/Pause */}
          <motion.button
            onClick={isPlaying ? onPause : onPlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 text-white flex items-center justify-center shadow-lg shrink-0"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </motion.button>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-[var(--fg)] truncate">
                {bookName} {chapter}:{currentVerse + 1}
              </p>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-mono shrink-0">
                {engine === 'elevenlabs' ? '🎙' : '🔊'}
              </span>
            </div>
            <p className="text-[10px] text-[var(--muted-fg)] truncate">{verseText?.substring(0, 55)}</p>
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-[2px] h-5 mx-2">
            {isPlaying ? (
              [3, 6, 4, 7, 5, 6, 3, 5].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-[var(--primary)]/50 rounded-full"
                  animate={{ height: [3, h, 2, h + 1, 3] }}
                  transition={{ duration: 0.5 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))
            ) : (
              [3, 3, 3, 3, 3, 3, 3, 3].map((h, i) => (
                <div key={i} className="w-[2px] bg-[var(--border)]/30 rounded-full" style={{ height: h }} />
              ))
            )}
          </div>

          {/* Skip buttons */}
          <button onClick={() => onSkipBackward(15)} className="p-1.5 text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onSkipForward(15)} className="p-1.5 text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Volume */}
          <button onClick={onToggleMute} className="p-1.5 text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Speed */}
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--accent)] text-[var(--fg)] hover:bg-[var(--accent)]/80 transition-colors"
          >
            {speed}x
          </button>

          {/* Expand */}
          <button
            onClick={() => setIsMiniMode(false)}
            className="p-1.5 text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Close */}
          <button onClick={onStop} className="p-1.5 text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Dropdown (mini mode) */}
        <AnimatePresence>
          {showSpeedMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[var(--border)]/30"
            >
              <div className="px-4 py-2 flex gap-1 flex-wrap">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => { onSetSpeed(s); setShowSpeedMenu(false); }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                      speed === s
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-[var(--fg)] hover:bg-[var(--accent)]'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
