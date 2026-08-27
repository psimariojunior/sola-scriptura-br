'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
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
  return lingua === 'hebraico' ? 'he-IL-AvriNeural' : 'el-GR-AthinaNeural';
}

function speakWithWebSpeech(palavra: string, lingua: 'hebraico' | 'grego', transliteracao?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      reject(new Error('sem speech'));
      return;
    }
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const want = lingua === 'hebraico' ? 'he' : 'el';
    const match = voices.find((v) => v.lang.toLowerCase().startsWith(want));
    const utt = new SpeechSynthesisUtterance(match ? palavra : (transliteracao || palavra));
    utt.lang = match ? (lingua === 'hebraico' ? 'he-IL' : 'el-GR') : 'en-US';
    utt.rate = 0.85;
    if (match) utt.voice = match;
    utt.onend = () => resolve();
    utt.onerror = () => reject(new Error('speech error'));
    window.speechSynthesis.speak(utt);
  });
}

async function generatePronunciation(
  palavra: string,
  lingua: 'hebraico' | 'grego',
  transliteracao?: string
): Promise<string> {
  const text = palavra || transliteracao || '';
  const cacheKey = `${lingua}:${text}`;
  if (pronunciationCache.has(cacheKey)) return pronunciationCache.get(cacheKey)!;

  const response = await fetch('/api/audio/edge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      texto: text,
      vozCustom: getVoiceForLanguage(lingua),
      lingua: lingua === 'hebraico' ? 'he' : 'el',
    }),
  });

  if (!response.ok) throw new Error('Falha ao gerar pronúncia');

  const raw = await response.text();
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const ev = JSON.parse(trimmed) as { tipo?: string; base64?: string };
      if (ev.tipo === 'audio' && ev.base64) {
        const url = `data:audio/mpeg;base64,${ev.base64}`;
        pronunciationCache.set(cacheKey, url);
        return url;
      }
    } catch {
      /* linha incompleta */
    }
  }
  throw new Error('Áudio não encontrado');
}

export function AudioPronunciation({
  palavra,
  lingua,
  transliteracao,
  className,
  size = 'md',
}: AudioPronunciationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      window.speechSynthesis?.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setError(false);

    const voices = typeof window !== 'undefined' ? window.speechSynthesis?.getVoices() ?? [] : [];
    const want = lingua === 'hebraico' ? 'he' : 'el';
    const nativeVoice = voices.find((v) => v.lang.toLowerCase().startsWith(want));

    try {
      if (nativeVoice) {
        await speakWithWebSpeech(palavra, lingua, transliteracao);
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 2500);
        setIsLoading(false);
        return;
      }
    } catch {
      /* tenta Edge TTS */
    }

    try {
      const url = await generatePronunciation(palavra, lingua, transliteracao);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => { setIsPlaying(false); setError(true); };
      await audio.play();
      setIsPlaying(true);
    } catch {
      try {
        await speakWithWebSpeech(palavra, lingua, transliteracao);
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 2500);
      } catch {
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [palavra, lingua, transliteracao, isPlaying]);

  useEffect(() => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    const loadVoices = () => { synth?.getVoices(); };
    loadVoices();
    synth?.addEventListener('voiceschanged', loadVoices);
    return () => {
      synth?.removeEventListener('voiceschanged', loadVoices);
      synth?.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const displayText = lingua === 'hebraico'
    ? romanizeHebrew(transliteracao || palavra)
    : transliteracao || palavra;

  const sizeClasses = { sm: 'w-8 h-8', md: 'w-9 h-9', lg: 'w-10 h-10' };
  const iconSizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200 shrink-0',
        sizeClasses[size],
        className,
        error && 'opacity-50',
        isPlaying
          ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
          : 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
      )}
      title={error ? 'Não foi possível ouvir' : `Ouvir "${displayText}"`}
      aria-label={error ? 'Áudio indisponível' : `Ouvir pronúncia de ${displayText}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className={cn(iconSizes[size], 'animate-spin')} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
}
