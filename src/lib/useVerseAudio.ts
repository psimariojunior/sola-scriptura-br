import { useState, useEffect, useRef, useCallback } from 'react';

export function useVerseAudio() {
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => synthRef.current?.cancel();
  }, []);

  const play = useCallback((verseNumber: number, text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;

    const voices = synthRef.current.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt'));
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onend = () => {
      setIsPlaying(false);
      setPlayingVerse(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setPlayingVerse(null);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setPlayingVerse(verseNumber);
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setIsPlaying(false);
    setPlayingVerse(null);
  }, []);

  const isVersePlaying = useCallback((verseNumber: number) => {
    return playingVerse === verseNumber && isPlaying;
  }, [playingVerse, isPlaying]);

  return { play, stop, isVersePlaying, isPlaying, playingVerse };
}
