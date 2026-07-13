'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  selecionarMelhorVoz,
  obterConfigVoz,
  prepararTextoParaVoz,
  esperarVozesCarregarem,
  type VozConfig,
} from '@/lib/vozTTS';

export function useVerseAudio() {
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const bestVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const vozConfigRef = useRef<VozConfig>(obterConfigVoz());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    synthRef.current = window.speechSynthesis;
    vozConfigRef.current = obterConfigVoz();

    const atualizarVoz = () => {
      if (!synthRef.current) return;
      const voices = synthRef.current.getVoices();
      bestVoiceRef.current = selecionarMelhorVoz(voices, vozConfigRef.current.preferGender);
    };

    atualizarVoz();
    esperarVozesCarregarem().then((voices) => {
      bestVoiceRef.current = selecionarMelhorVoz(voices, vozConfigRef.current.preferGender);
    });

    if (synthRef.current) {
      try {
        synthRef.current.addEventListener('voiceschanged', atualizarVoz);
      } catch {
        // ignore
      }
    }

    return () => {
      synthRef.current?.cancel();
      if (synthRef.current) {
        try {
          synthRef.current.removeEventListener('voiceschanged', atualizarVoz);
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const play = useCallback((verseNumber: number, text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    const config = vozConfigRef.current;
    const cleanText = prepararTextoParaVoz(text, config);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (bestVoiceRef.current) {
      utterance.voice = bestVoiceRef.current;
      utterance.lang = bestVoiceRef.current.lang;
    } else {
      utterance.lang = 'pt-BR';
    }
    utterance.rate = Math.max(0.5, Math.min(2.0, config.rate));
    utterance.pitch = config.pitch;
    utterance.volume = 1;

    utterance.onstart = () => {
      setPlayingVerse(verseNumber);
      setIsPlaying(true);
    };
    utterance.onend = () => {
      setIsPlaying(false);
      setPlayingVerse(null);
    };
    utterance.onerror = (e) => {
      if (e.error === 'canceled') return;
      setIsPlaying(false);
      setPlayingVerse(null);
    };

    synthRef.current.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setIsPlaying(false);
    setPlayingVerse(null);
  }, []);

  const isVersePlaying = useCallback((verseNumber: number) => {
    return playingVerse === verseNumber && isPlaying;
  }, [playingVerse, isPlaying]);

  return { play, stop, isVersePlaying, isPlaying, playingVerse, vozConfig: vozConfigRef.current };
}
