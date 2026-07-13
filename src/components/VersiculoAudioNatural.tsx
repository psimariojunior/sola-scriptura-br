'use client';

import { useState, useRef } from 'react';
import { Volume2, Play, Pause, Download, Share2, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VersiculoAudioNaturalProps {
  text: string;
  verseNumber: number;
  isCurrentlyPlaying: boolean;
  isLoading?: boolean;
  engine?: 'elevenlabs' | 'speech-api' | 'none';
  voiceName?: string;
  onPlay: (verseNumber: number, text: string) => void;
  onStop: () => void;
  onDownload?: (text: string, filename: string) => void;
  onSpeedChange?: (speed: number) => void;
  currentSpeed?: number;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

export default function VersiculoAudioNatural({
  text,
  verseNumber,
  isCurrentlyPlaying,
  isLoading = false,
  engine = 'speech-api',
  voiceName,
  onPlay,
  onStop,
  onDownload,
  onSpeedChange,
  currentSpeed = 1,
}: VersiculoAudioNaturalProps) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!text) return null;

  const engineLabel = engine === 'elevenlabs' ? '🎙 ElevenLabs' : '🔊 Speech API';

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      {/* Main Button */}
      <motion.button
        onClick={() => {
          if (isLoading) return;
          if (isCurrentlyPlaying) {
            onStop();
          } else {
            onPlay(verseNumber, text);
          }
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        disabled={isLoading}
        className={`relative p-1.5 rounded-lg transition-all duration-200 ${
          isCurrentlyPlaying
            ? 'text-[var(--primary)] bg-[var(--primary)]/15 shadow-sm ring-1 ring-[var(--primary)]/20'
            : 'text-[var(--muted-fg)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/8'
        } ${isLoading ? 'opacity-60' : ''}`}
        title={isCurrentlyPlaying ? 'Parar áudio' : 'Ouvir versículo'}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isCurrentlyPlaying ? (
          <span className="flex items-center gap-[2px]">
            {[3, 6, 4, 7, 5, 6].map((h, i) => (
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

        {/* Engine indicator dot */}
        {engine === 'elevenlabs' && !isCurrentlyPlaying && (
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        )}
      </motion.button>

      {/* Speed/Options button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="ml-0.5 p-1 rounded text-[var(--muted-fg)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/8 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        style={{ opacity: isCurrentlyPlaying || showMenu ? 1 : undefined }}
      >
        <ChevronDown className="w-2.5 h-2.5" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !showMenu && !isCurrentlyPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--fg)] text-[var(--bg)] text-[9px] rounded-md whitespace-nowrap z-50 shadow-lg"
          >
            {voiceName ? `${engineLabel} · ${voiceName}` : engineLabel}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-4 border-transparent border-t-[var(--fg)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            className="absolute top-full left-0 mt-1 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-2xl py-1.5 z-50 min-w-[160px]"
          >
            {/* Engine badge */}
            <div className="px-3 py-1.5 border-b border-[var(--border)]/50 mb-1">
              <span className="text-[9px] font-mono text-[var(--muted-fg)]">
                {engine === 'elevenlabs' ? '🎙 ElevenLabs' : '🔊 Speech API'}
                {voiceName && ` · ${voiceName}`}
              </span>
            </div>

            {/* Speed options */}
            <div className="px-2 py-1">
              <p className="text-[9px] text-[var(--muted-fg)] uppercase tracking-wider px-1 mb-1 font-semibold">Velocidade</p>
              <div className="flex gap-1 flex-wrap px-1">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeedChange?.(s);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      currentSpeed === s
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-[var(--fg)] hover:bg-[var(--accent)]'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-[var(--border)]/50 mt-1 pt-1">
              {onDownload && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(text, `versiculo-${verseNumber}.mp3`);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-[11px] text-[var(--fg)] hover:bg-[var(--accent)] flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3 h-3 text-[var(--muted-fg)]" />
                  Baixar áudio
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
