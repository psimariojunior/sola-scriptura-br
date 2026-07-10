'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  verses: Array<{ numero: number; texto: string }>;
  bookName: string;
  chapter: number;
}

const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2];

export default function AudioPlayer({ verses, bookName, chapter }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [rate, setRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  const speak = (verseIndex: number) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    const verse = verses[verseIndex];
    if (!verse) return;

    const text = `${verse.numero}. ${verse.texto}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = rate;
    utterance.volume = isMuted ? 0 : 1;

    const voices = synthRef.current.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt')) || voices[0];
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const totalWords = text.split(/\s+/).length;
        const spokenWords = text.substring(0, event.charIndex).split(/\s+/).length;
        const verseProgress = spokenWords / totalWords;
        const totalProgress = ((verseIndex + verseProgress) / verses.length) * 100;
        setProgress(totalProgress);
      }
    };

    utterance.onend = () => {
      if (currentVerse < verses.length - 1) {
        setCurrentVerse(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentVerse(0);
        setProgress(100);
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  useEffect(() => {
    if (isPlaying) {
      speak(currentVerse);
    }
  }, [currentVerse, isPlaying, rate, isMuted, speak]);

  const togglePlay = () => {
    if (isPlaying) {
      synthRef.current?.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const nextVerse = () => {
    if (currentVerse < verses.length - 1) {
      setCurrentVerse(prev => prev + 1);
    }
  };

  const prevVerse = () => {
    if (currentVerse > 0) {
      setCurrentVerse(prev => prev - 1);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (synthRef.current) {
      synthRef.current.cancel();
      if (isPlaying) {
        setTimeout(() => setIsPlaying(true), 100);
      }
    }
  };

  if (verses.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:relative lg:bottom-auto"
    >
      <div className="bg-[var(--card-bg)] border-t lg:border-t-0 lg:border border-[var(--border)] shadow-lg lg:rounded-xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-[var(--border)]/30">
          <motion.div
            className="h-full bg-[var(--primary)]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Main controls */}
        <div className="px-4 py-3 flex items-center gap-3">
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {bookName} {chapter}:{currentVerse + 1}
            </p>
            <p className="text-xs text-[var(--muted-fg)] truncate">
              {verses[currentVerse]?.texto?.substring(0, 60)}...
            </p>
          </div>

          <div className="flex items-center gap-1">
            <motion.button onClick={prevVerse} disabled={currentVerse === 0}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="p-2 text-[var(--muted-fg)] hover:text-[var(--fg)] disabled:opacity-30 transition-colors">
              <SkipBack className="w-4 h-4" />
            </motion.button>
            <motion.button onClick={nextVerse} disabled={currentVerse >= verses.length - 1}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="p-2 text-[var(--muted-fg)] hover:text-[var(--fg)] disabled:opacity-30 transition-colors">
              <SkipForward className="w-4 h-4" />
            </motion.button>
          </div>

          <motion.button onClick={toggleMute} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="p-2 text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>

          <div className="relative">
            <button onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="text-[11px] font-mono px-2 py-1 rounded bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
              {rate}x
            </button>
            <AnimatePresence>
              {showSpeedMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute bottom-full right-0 mb-1 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-xl py-1 z-50"
                >
                  {VELOCIDADES.map(v => (
                    <button key={v} onClick={() => { setRate(v); setShowSpeedMenu(false); }}
                      className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-[var(--bg)] transition-colors ${rate === v ? 'text-[var(--primary)] font-semibold' : 'text-[var(--muted-fg)]'}`}>
                      {v}x
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setIsExpanded(!isExpanded)} className="lg:hidden p-1">
            <ChevronDown className={`w-4 h-4 text-[var(--muted-fg)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Verse list (expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t border-[var(--border)]/30"
            >
              <div className="max-h-40 overflow-y-auto px-4 py-2">
                {verses.map((v, i) => (
                  <button key={v.numero} onClick={() => { setCurrentVerse(i); setIsPlaying(true); }}
                    className={`w-full text-left text-xs py-1 px-2 rounded transition-colors ${
                      i === currentVerse ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'
                    }`}>
                    <span className="font-bold mr-1">{v.numero}</span>
                    {v.texto.substring(0, 80)}...
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
