'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  gerarAudio,
  converterAudioParaUrl,
  temApiKey,
  estimarDuracao,
} from '@/lib/elevenLabs';
import {
  selecionarMelhorVoz,
  obterConfigVoz,
  salvarConfigVoz,
  prepararTextoParaVoz,
  esperarVozesCarregarem,
  type VozConfig,
} from '@/lib/vozTTS';
import { gerarAudioEdge, edgeTTSDisponivel } from '@/lib/edgeTTS';

export type AudioEngine = 'elevenlabs' | 'edge-tts' | 'speech-api' | 'none';

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
  vozConfig: VozConfig;
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
  vozConfig: obterConfigVoz(),
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

    const config = state.vozConfig;
    const textoLimpo = prepararTextoParaVoz(texto, config);
    if (!textoLimpo) {
      onEnd?.();
      return;
    }

    const voices = synth.getVoices();
    const melhorVoz = selecionarMelhorVoz(voices, config.preferGender);

    const utterance = new SpeechSynthesisUtterance(textoLimpo);
    if (melhorVoz) utterance.voice = melhorVoz;
    utterance.lang = melhorVoz?.lang || 'pt-BR';
    utterance.rate = Math.max(0.5, Math.min(2.0, config.rate * state.speed));
    utterance.pitch = config.pitch;
    utterance.volume = state.isMuted ? 0 : state.volume;

    const estimatedDuration = estimarDuracao(textoLimpo) / 1000;
    let startTime = Date.now();

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000 * (config.rate * state.speed);
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

      const config = state.vozConfig;
      const usarElevenLabs =
        (config.motor === 'elevenlabs' || config.motor === 'auto') && temApiKey();
      const usarEdgeTTS =
        (config.motor === 'edge-tts' || config.motor === 'auto') && edgeTTSDisponivel();

      if (usarElevenLabs) {
        try {
          const audio = await gerarAudio(texto, { voiceId: config.vozElevenLabs });
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
          if (message !== 'NO_API_KEY') {
            console.warn('ElevenLabs failed, falling back:', message);
          }
          if (config.motor === 'elevenlabs') {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: message === 'NO_API_KEY'
                ? 'ElevenLabs não configurado. Configure a API key.'
                : `ElevenLabs falhou: ${message}`,
            }));
            return;
          }
        }
      }

      if (usarEdgeTTS) {
        try {
          const vozGenero = config.preferGender === 'masculino' ? 'masculina' : 'feminina';
          const rateStr = config.rate >= 1 ? `+${Math.round((config.rate - 1) * 100)}%` : `-${Math.round((1 - config.rate) * 100)}%`;

          const audioBuffer = await gerarAudioEdge({
            texto,
            voz: vozGenero,
            vozCustom: config.vozEdgeTTS !== 'pt-BR-FranciscaNeural' ? config.vozEdgeTTS : undefined,
            rate: rateStr,
          });

          const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
          const url = URL.createObjectURL(blob);
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
              error: 'Erro ao reproduzir áudio Edge TTS',
            }));
          };

          await el.play();
          configurarProgressoElevenLabs();

          const duracaoEstimada = estimarDuracao(texto) / 1000;
          setState((prev) => ({
            ...prev,
            isPlaying: true,
            isLoading: false,
            duration: duracaoEstimada,
            engine: 'edge-tts',
          }));

          return;
        } catch (err: unknown) {
          console.warn('Edge TTS failed, falling back to Speech API:', err);
          if (config.motor === 'edge-tts') {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: `Edge TTS falhou: ${err instanceof Error ? err.message : 'Erro desconhecido'}`,
            }));
            return;
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
    [state.speed, state.volume, state.isMuted, state.vozConfig]
  );

  const pause = useCallback((): void => {
    if ((state.engine === 'elevenlabs' || state.engine === 'edge-tts') && audioRef.current) {
      audioRef.current.pause();
    } else if (state.engine === 'speech-api') {
      synthRef.current?.pause();
    }
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, [state.engine]);

  const resume = useCallback((): void => {
    if ((state.engine === 'elevenlabs' || state.engine === 'edge-tts') && audioRef.current) {
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
      if ((state.engine === 'elevenlabs' || state.engine === 'edge-tts') && audioRef.current) {
        audioRef.current.currentTime = time;
        setState((prev) => ({ ...prev, currentTime: time }));
      }
    },
    [state.engine]
  );

  const setSpeed = useCallback(
    (speed: number): void => {
      if ((state.engine === 'elevenlabs' || state.engine === 'edge-tts') && audioRef.current) {
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
      if ((state.engine === 'elevenlabs' || state.engine === 'edge-tts') && audioRef.current) {
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

  const atualizarVozConfig = useCallback((novaConfig: Partial<VozConfig>) => {
    const merged = { ...state.vozConfig, ...novaConfig };
    salvarConfigVoz(novaConfig);
    setState((prev) => ({ ...prev, vozConfig: merged }));
  }, [state.vozConfig]);

  const testarVoz = useCallback(
    async (voiceName?: string, textoTeste?: string) => {
      const synth = synthRef.current;
      if (!synth) return;
      synth.cancel();

      const voices = await esperarVozesCarregarem();
      let voz: SpeechSynthesisVoice | null = null;
      if (voiceName) {
        voz = voices.find((v) => v.name === voiceName) || null;
      }
      if (!voz) {
        voz = selecionarMelhorVoz(voices, state.vozConfig.preferGender);
      }
      if (!voz) return;

      const fala = textoTeste || 'No princípio, criou Deus os céus e a terra. E a terra era sem forma e vazia.';
      const utt = new SpeechSynthesisUtterance(fala);
      utt.voice = voz;
      utt.lang = voz.lang || 'pt-BR';
      utt.rate = state.vozConfig.rate;
      utt.pitch = state.vozConfig.pitch;
      utt.volume = state.vozConfig.volume;
      synth.speak(utt);
    },
    [state.vozConfig]
  );

  const pararTesteVoz = useCallback(() => {
    synthRef.current?.cancel();
  }, []);

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
    atualizarVozConfig,
    testarVoz,
    pararTesteVoz,
  };
}
