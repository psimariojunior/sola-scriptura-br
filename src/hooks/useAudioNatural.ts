'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  gerarAudio,
  converterAudioParaUrl,
  temApiKey,
  estimarDuracao,
} from '@/lib/elevenLabs';

export type AudioEngine = 'elevenlabs' | 'speech-api' | 'none';

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  error: string | null;
  engine: AudioEngine;
  volume: number;
  speed: number;
  isMuted: boolean;
}

export interface AudioBookmark {
  id: string;
  currentTime: number;
  label: string;
  createdAt: number;
}

export interface SleepTimerConfig {
  enabled: boolean;
  minutes: number;
  endTime: number | null;
}

const DEFAULT_STATE: AudioState = {
  isPlaying: false,
  isLoading: false,
  currentTime: 0,
  duration: 0,
  error: null,
  engine: 'none',
  volume: 1,
  speed: 1,
  isMuted: false,
};

export function useAudioNatural() {
  const [state, setState] = useState<AudioState>(DEFAULT_STATE);
  const [bookmarks, setBookmarks] = useState<AudioBookmark[]>([]);
  const [sleepTimer, setSleepTimer] = useState<SleepTimerConfig>({
    enabled: false,
    minutes: 30,
    endTime: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentAudioUrlRef = useRef<string | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resumePositionRef = useRef<number>(0);
  const onEndCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    synthRef.current = typeof window !== 'undefined' ? window.speechSynthesis : null;

    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (sleepTimer.enabled && sleepTimer.endTime) {
      const remaining = sleepTimer.endTime - Date.now();
      if (remaining <= 0) {
        pause();
        setSleepTimer((prev) => ({ ...prev, enabled: false, endTime: null }));
        return;
      }

      sleepTimerRef.current = setTimeout(() => {
        pause();
        setSleepTimer((prev) => ({ ...prev, enabled: false, endTime: null }));
      }, remaining);

      return () => {
        if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      };
    }
  }, [sleepTimer.enabled, sleepTimer.endTime]);

  function cleanup(): void {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    synthRef.current?.cancel();
    if (currentAudioUrlRef.current) {
      URL.revokeObjectURL(currentAudioUrlRef.current);
      currentAudioUrlRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (sleepTimerRef.current) {
      clearTimeout(sleepTimerRef.current);
    }
  }

  function limparAudioAtual(): void {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
    }
    synthRef.current?.cancel();
    if (currentAudioUrlRef.current) {
      URL.revokeObjectURL(currentAudioUrlRef.current);
      currentAudioUrlRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  }

  function configurarProgressoElevenLabs(): void {
    const audio = audioRef.current;
    if (!audio) return;

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    progressIntervalRef.current = setInterval(() => {
      if (audio && !audio.paused) {
        setState((prev) => ({
          ...prev,
          currentTime: audio.currentTime,
          duration: audio.duration || prev.duration,
        }));
      }
    }, 100);
  }

  function configurarSpeechApi(
    texto: string,
    onEnd?: () => void
  ): void {
    const synth = synthRef.current;
    if (!synth) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = state.speed;
    utterance.volume = state.isMuted ? 0 : state.volume;

    const voices = synth.getVoices();
    const ptVoice =
      voices.find((v) => /Microsoft\s+(Maria|Francisco|Heloisa)/i.test(v.name)) ||
      voices.find((v) => /Google.*Portugu/i.test(v.name)) ||
      voices.find((v) => /Google/i.test(v.name) && v.lang.startsWith('pt')) ||
      voices.find((v) => v.lang === 'pt-BR' && v.localService === false) ||
      voices.find((v) => v.lang.startsWith('pt')) ||
      voices[0];
    if (ptVoice) utterance.voice = ptVoice;

    const estimatedDuration = estimarDuracao(texto) / 1000;
    let startTime = Date.now();

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000 * state.speed;
      setState((prev) => ({
        ...prev,
        currentTime: elapsed,
        duration: estimatedDuration,
      }));
    }, 100);

    utterance.onend = () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
      }));
      onEndCallbackRef.current = null;
      onEnd?.();
    };

    utterance.onerror = (event) => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        error: event.error === 'canceled' ? null : `Speech API: ${event.error}`,
      }));
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  }

  const play = useCallback(
    async (texto: string, onEnd?: () => void): Promise<void> => {
      limparAudioAtual();
      onEndCallbackRef.current = onEnd || null;

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        currentTime: 0,
      }));

      if (temApiKey()) {
        try {
          const audio = await gerarAudio(texto);
          const url = await converterAudioParaUrl(audio);
          currentAudioUrlRef.current = url;

          const el = audioRef.current;
          if (!el) return;

          el.src = url;
          el.playbackRate = state.speed;
          el.volume = state.isMuted ? 0 : state.volume;

          if (resumePositionRef.current > 0) {
            el.currentTime = resumePositionRef.current;
            resumePositionRef.current = 0;
          }

          el.onended = () => {
            setState((prev) => ({
              ...prev,
              isPlaying: false,
              currentTime: 0,
            }));
            onEndCallbackRef.current?.();
            onEndCallbackRef.current = null;
          };

          el.onerror = () => {
            setState((prev) => ({
              ...prev,
              isPlaying: false,
              isLoading: false,
              error: 'Erro ao reproduzir áudio ElevenLabs',
            }));
          };

          await el.play();
          configurarProgressoElevenLabs();

          setState((prev) => ({
            ...prev,
            isPlaying: true,
            isLoading: false,
            duration: audio.duracaoMs / 1000,
            engine: 'elevenlabs',
          }));

          return;
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : 'Erro desconhecido';
          if (message === 'NO_API_KEY') {
            // Fall through to Speech API
          } else {
            console.warn('ElevenLabs failed, falling back to Speech API:', message);
          }
        }
      }

      configurarSpeechApi(texto, onEnd);
      setState((prev) => ({
        ...prev,
        isPlaying: true,
        isLoading: false,
        engine: 'speech-api',
      }));
    },
    [state.speed, state.volume, state.isMuted]
  );

  const pause = useCallback((): void => {
    if (state.engine === 'elevenlabs' && audioRef.current) {
      audioRef.current.pause();
    } else if (state.engine === 'speech-api') {
      synthRef.current?.pause();
    }
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, [state.engine]);

  const resume = useCallback((): void => {
    if (state.engine === 'elevenlabs' && audioRef.current) {
      audioRef.current.play();
    } else if (state.engine === 'speech-api') {
      synthRef.current?.resume();
    }
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, [state.engine]);

  const stop = useCallback((): void => {
    limparAudioAtual();
    resumePositionRef.current = 0;
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isLoading: false,
      currentTime: 0,
      duration: 0,
      engine: 'none',
    }));
  }, []);

  const seek = useCallback(
    (time: number): void => {
      if (state.engine === 'elevenlabs' && audioRef.current) {
        audioRef.current.currentTime = time;
        setState((prev) => ({ ...prev, currentTime: time }));
      }
    },
    [state.engine]
  );

  const setSpeed = useCallback(
    (speed: number): void => {
      if (state.engine === 'elevenlabs' && audioRef.current) {
        audioRef.current.playbackRate = speed;
      }
      setState((prev) => ({ ...prev, speed }));
      localStorage.setItem('audio-speed', String(speed));
    },
    [state.engine]
  );

  const setVolume = useCallback(
    (volume: number): void => {
      const clamped = Math.max(0, Math.min(1, volume));
      if (state.engine === 'elevenlabs' && audioRef.current) {
        audioRef.current.volume = clamped;
      }
      setState((prev) => ({
        ...prev,
        volume: clamped,
        isMuted: clamped === 0,
      }));
      localStorage.setItem('audio-volume', String(clamped));
    },
    [state.engine]
  );

  const toggleMute = useCallback((): void => {
    const newMuted = !state.isMuted;
    if (state.engine === 'elevenlabs' && audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : state.volume;
    }
    setState((prev) => ({ ...prev, isMuted: newMuted }));
  }, [state.engine, state.isMuted, state.volume]);

  const skipForward = useCallback(
    (seconds: number = 15): void => {
      if (state.engine === 'elevenlabs' && audioRef.current) {
        const newTime = Math.min(
          audioRef.current.currentTime + seconds,
          audioRef.current.duration || 0
        );
        audioRef.current.currentTime = newTime;
        setState((prev) => ({ ...prev, currentTime: newTime }));
      }
    },
    [state.engine]
  );

  const skipBackward = useCallback(
    (seconds: number = 15): void => {
      if (state.engine === 'elevenlabs' && audioRef.current) {
        const newTime = Math.max(audioRef.current.currentTime - seconds, 0);
        audioRef.current.currentTime = newTime;
        setState((prev) => ({ ...prev, currentTime: newTime }));
      }
    },
    [state.engine]
  );

  const addBookmark = useCallback(
    (label: string): void => {
      const bookmark: AudioBookmark = {
        id: `bm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        currentTime: state.currentTime,
        label,
        createdAt: Date.now(),
      };
      setBookmarks((prev) => [...prev, bookmark]);
    },
    [state.currentTime]
  );

  const removeBookmark = useCallback((id: string): void => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const seekToBookmark = useCallback(
    (bookmark: AudioBookmark): void => {
      if (state.engine === 'elevenlabs' && audioRef.current) {
        audioRef.current.currentTime = bookmark.currentTime;
        setState((prev) => ({ ...prev, currentTime: bookmark.currentTime }));
      }
    },
    [state.engine]
  );

  const setSleepTimerMinutes = useCallback(
    (minutes: number | null): void => {
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);

      if (minutes === null) {
        setSleepTimer({ enabled: false, minutes: 0, endTime: null });
        return;
      }

      const endTime = Date.now() + minutes * 60 * 1000;
      setSleepTimer({ enabled: true, minutes, endTime });
    },
    []
  );

  const downloadAudio = useCallback(
    async (texto: string, filename: string): Promise<void> => {
      if (temApiKey()) {
        try {
          const audio = await gerarAudio(texto);
          const blob = new Blob([audio.audio], { type: audio.mimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return;
        } catch {
          // Fall through
        }
      }

      setState((prev) => ({
        ...prev,
        error: 'Download requer ElevenLabs API key',
      }));
    },
    []
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (state.isPlaying) pause();
          else resume();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward(e.shiftKey ? 30 : 15);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward(e.shiftKey ? 30 : 15);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(state.volume + 0.1, 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(state.volume - 0.1, 0));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isPlaying, state.volume, pause, resume, skipForward, skipBackward, setVolume]);

  // Load saved preferences
  useEffect(() => {
    const savedSpeed = localStorage.getItem('audio-speed');
    const savedVolume = localStorage.getItem('audio-volume');
    if (savedSpeed) setState((prev) => ({ ...prev, speed: parseFloat(savedSpeed) }));
    if (savedVolume) setState((prev) => ({ ...prev, volume: parseFloat(savedVolume) }));
  }, []);

  return {
    state,
    play,
    pause,
    resume,
    stop,
    seek,
    setSpeed,
    setVolume,
    toggleMute,
    skipForward,
    skipBackward,
    bookmarks,
    addBookmark,
    removeBookmark,
    seekToBookmark,
    sleepTimer,
    setSleepTimerMinutes,
    downloadAudio,
  };
}
