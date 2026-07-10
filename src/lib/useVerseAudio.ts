import { useState, useEffect, useRef, useCallback } from 'react';

export function useVerseAudio() {
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voicesLoadedRef = useRef(false);
  const bestVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Load voices once and find the best one
  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    const findBestVoice = () => {
      if (!synthRef.current) return;
      const allVoices = synthRef.current.getVoices();
      if (allVoices.length === 0) {
        // Try again after voices load
        return;
      }

      voicesLoadedRef.current = true;
      const ptVoices = allVoices.filter(v => v.lang.startsWith('pt'));

      // Windows Microsoft voices are the most natural
      bestVoiceRef.current =
        ptVoices.find(v => /Microsoft\s+(Maria|Daniel|Antonio|Francisco|Heloisa|Julio|Leila)/i.test(v.name))
        || ptVoices.find(v => v.name.includes('Google'))
        || ptVoices.find(v => v.name.includes('Microsoft'))
        || ptVoices.find(v => v.name.includes('Female') || v.name.includes('Male'))
        || ptVoices.find(v => /brazil/i.test(v.name))
        || ptVoices[0]
        || null;
    };

    // Try immediately (voices may already be loaded)
    findBestVoice();

    // Listen for async voice loading (Chrome)
    const onChanged = () => {
      findBestVoice();
    };
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.addEventListener('voiceschanged', onChanged);
    }

    return () => {
      synthRef.current?.cancel();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.removeEventListener('voiceschanged', onChanged);
      }
    };
  }, []);

  const play = useCallback((verseNumber: number, text: string) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    // Clean text for better natural reading flow
    const cleanText = text
      .replace(/([:;])/g, '$1 ')
      .replace(/\.\.\./g, '… ')
      .replace(/['']/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.82;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    // Use best available voice
    if (bestVoiceRef.current) {
      utterance.voice = bestVoiceRef.current;
    } else {
      // Fallback: try to find a voice at play time
      const allVoices = synthRef.current.getVoices();
      const ptVoice = allVoices.find(v => v.lang.startsWith('pt'));
      if (ptVoice) utterance.voice = ptVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setPlayingVerse(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setPlayingVerse(null);
    };

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
