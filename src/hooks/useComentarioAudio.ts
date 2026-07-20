import { useState, useEffect, useRef, useCallback } from 'react';

export function useComentarioAudio() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voicesLoadedRef = useRef(false);
  const bestVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    synthRef.current = window.speechSynthesis;

    const findBestVoice = () => {
      if (!synthRef.current) return;
      const allVoices = synthRef.current.getVoices();
      if (allVoices.length === 0) return;

      voicesLoadedRef.current = true;
      const ptVoices = allVoices.filter(v => v.lang.startsWith('pt'));

      bestVoiceRef.current =
        ptVoices.find(v => /Microsoft\s+(Maria|Daniel|Antonio|Francisco|Heloisa|Julio|Leila)/i.test(v.name))
        || ptVoices.find(v => v.name.includes('Google'))
        || ptVoices.find(v => v.name.includes('Microsoft'))
        || ptVoices.find(v => v.name.includes('Female') || v.name.includes('Male'))
        || ptVoices.find(v => /brazil/i.test(v.name))
        || ptVoices[0]
        || null;
    };

    findBestVoice();

    const onChanged = () => { findBestVoice(); };
    if (synthRef.current && synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.addEventListener('voiceschanged', onChanged);
    }

    return () => {
      synthRef.current?.cancel();
      if (synthRef.current && synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.removeEventListener('voiceschanged', onChanged);
      }
    };
  }, []);

  const play = useCallback((index: number, text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    const cleanText = text
      .replace(/\(.*?\)/g, '')
      .replace(/['']/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.85;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    if (bestVoiceRef.current) {
      utterance.voice = bestVoiceRef.current;
    } else {
      const allVoices = synthRef.current.getVoices();
      const ptVoice = allVoices.find(v => v.lang.startsWith('pt'));
      if (ptVoice) utterance.voice = ptVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setPlayingIndex(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setPlayingIndex(null);
    };

    synthRef.current.speak(utterance);
    setPlayingIndex(index);
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setIsPlaying(false);
    setPlayingIndex(null);
  }, []);

  return { play, stop, isPlaying, playingIndex };
}
