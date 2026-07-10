import { useState, useEffect, useRef, useCallback } from 'react';

export function useVerseAudio() {
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    const loadVoices = () => {
      const allVoices = synthRef.current?.getVoices() || [];
      setVoices(allVoices);

      // Find best Portuguese voice: prefer Microsoft voices (most natural), then Google, then any pt
      const ptVoices = allVoices.filter(v => v.lang.startsWith('pt'));
      const preferred = ptVoices.find(v => v.name.includes('Microsoft') || v.name.includes('Maria') || v.name.includes('Daniel'))
        || ptVoices.find(v => v.name.includes('Google'))
        || ptVoices.find(v => v.name.includes('Female') || v.name.includes('Male'))
        || ptVoices[0];

      if (preferred) setSelectedVoice(preferred);
    };

    loadVoices();

    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      synthRef.current?.cancel();
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const play = useCallback((verseNumber: number, text: string) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    // Clean text for better speech: remove special chars, add pauses
    const cleanText = text
      .replace(/([:;])/g, '$1 ')
      .replace(/\.\.\./g, '… ')
      .replace(/['"]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.85; // Slightly slower for natural reading
    utterance.pitch = 1.0;
    utterance.volume = 1;

    // Use selected Portuguese voice if available
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      // Fallback: find any Portuguese voice
      const ptVoice = voices.find(v => v.lang.startsWith('pt'));
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

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setPlayingVerse(verseNumber);
    setIsPlaying(true);
  }, [selectedVoice, voices]);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setIsPlaying(false);
    setPlayingVerse(null);
  }, []);

  const isVersePlaying = useCallback((verseNumber: number) => {
    return playingVerse === verseNumber && isPlaying;
  }, [playingVerse, isPlaying]);

  return { play, stop, isVersePlaying, isPlaying, playingVerse, voices, selectedVoice };
}
