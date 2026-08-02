'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { romanizeHebrew } from '@/lib/hebrewRomanize';

interface AudioPronunciationProps {
  palavra: string;
  strong: string;
  lingua: 'hebraico' | 'grego';
  transliteracao?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const pronunciationCache = new Map<string, string>();

function getVoiceForLanguage(lingua: 'hebraico' | 'grego'): string {
  if (lingua === 'hebraico') {
    return 'he-IL-AvriNeural';
  }
  return 'el-GR-AthinaNeural';
}

function getLanguageCode(lingua: 'hebraico' | 'grego'): string {
  return lingua === 'hebraico' ? 'he-IL' : 'el-GR';
}

async function generatePronunciation(
  palavra: string,
  lingua: 'hebraico' | 'grego',
  transliteracao?: string
): Promise<string> {
  const text = transliteracao || palavra;
  const cacheKey = `${lingua}:${text}`;

  if (pronunciationCache.has(cacheKey)) {
    return pronunciationCache.get(cacheKey)!;
  }

  const response = await fetch('/api/audio/edge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      voice: getVoiceForLanguage(lingua),
      lang: getLanguageCode(lingua),
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar pronúncia');
  }

  const data = await response.json();
  const audioUrl = data.audioUrl || data.url;

  if (audioUrl) {
    pronunciationCache.set(cacheKey, audioUrl);
    return audioUrl;
  }

  throw new Error('URL de áudio não encontrada');
}

export function AudioPronunciation({
  palavra,
  strong,
  lingua,
  transliteracao,
  className,
  size = 'md',
}: AudioPronunciationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setError(false);

    try {
      const url = await generatePronunciation(palavra, lingua, transliteracao);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setError(true);
      };

      await audio.play();
      setIsPlaying(true);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [palavra, lingua, transliteracao, isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const displayText = lingua === 'hebraico'
    ? romanizeHebrew(transliteracao || palavra)
    : transliteracao || palavra;

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <button
        onClick={handlePlay}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-200',
          sizeClasses[size],
          isPlaying
            ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-sm shadow-[var(--brand-default)]/30'
            : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-default)]'
        )}
        title={`Ouvir pronúncia de "${displayText}"`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className={cn(iconSizes[size], 'animate-spin')} />
        ) : isPlaying ? (
          <Volume2 className={iconSizes[size]} />
        ) : (
          <Volume2 className={iconSizes[size]} />
        )}
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          >
            <div className="px-2.5 py-1.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] shadow-lg whitespace-nowrap">
              <p className="text-[10px] font-medium text-[var(--content-primary)]">
                {isLoading ? 'Gerando áudio...' : `Ouvir "${displayText}"`}
              </p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                <div className="w-2 h-2 bg-[var(--surface-raised)] border-r border-b border-[var(--border)] transform rotate-45" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
