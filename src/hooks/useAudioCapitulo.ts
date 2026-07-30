'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export interface VersiculoAudio {
  numero: number;
  texto: string;
}

interface UseAudioCapituloOptions {
  livroAbreviacao: string;
  capitulo: number;
  versiculos: VersiculoAudio[];
  voz?: 'feminina' | 'masculina';
  velocidade?: number;
}

interface AudioState {
  status: 'idle' | 'loading' | 'playing' | 'paused' | 'error';
  currentVerseIndex: number;
  currentTime: number;
  duration: number;
  totalTime: number;
  error: string | null;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  announceVerseNumbers: boolean;
}

interface UseAudioCapituloReturn {
  state: AudioState;
  isPlaying: boolean;
  isLoading: boolean;
  versiculoAtual: number | null;
  progresso: number;
  duracao: number;
  currentTime: number;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  toggle: () => void;
  goToVerse: (numero: number) => void;
  seekToVersiculo: (numero: number) => void;
  skipForward: (n?: number) => void;
  skipBackward: (n?: number) => void;
  setVelocidade: (v: number) => void;
  setVoz: (v: 'feminina' | 'masculina') => void;
  setAnnounceVerseNumbers: (v: boolean) => void;
}

function useAudioCapituloImpl(
  livroAbreviacao: string,
  capitulo: number,
  versiculos: VersiculoAudio[],
  options?: { voz?: 'feminina' | 'masculina'; velocidade?: number }
): UseAudioCapituloReturn {
  const [state, setState] = useState<AudioState>({
    status: 'idle',
    currentVerseIndex: -1,
    currentTime: 0,
    duration: 0,
    totalTime: 0,
    error: null,
    isPlaying: false,
    isPaused: false,
    isLoading: false,
    announceVerseNumbers: false,
  });
  const [voz, setVoz] = useState<'feminina' | 'masculina'>(options?.voz ?? 'feminina');
  const [velocidade, setVelocidadeState] = useState(options?.velocidade ?? 1);
  const [announceVerseNumbers, setAnnounceVerseNumbers] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const queueRef = useRef<VersiculoAudio[]>([]);

  const gerarAudio = useCallback(async (texto: string): Promise<string | null> => {
    try {
      const res = await fetch('/api/audio/edge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texto,
          voz,
          rate: velocidade === 1 ? '+0%' : velocidade < 1 ? `-${Math.round((1 - velocidade) * 100)}%` : `+${Math.round((velocidade - 1) * 100)}%`,
        }),
      });
      if (!res.ok) return null;
      const reader = res.body?.getReader();
      if (!reader) return null;
      const decoder = new TextDecoder();
      let audioBase64 = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.tipo === 'audio' && data.audio) audioBase64 = data.audio;
            } catch {}
          }
        }
      }
      if (!audioBase64) return null;
      return `data:audio/mpeg;base64,${audioBase64}`;
    } catch { return null; }
  }, [voz, velocidade]);

  const playVersiculo = useCallback(async (v: VersiculoAudio): Promise<void> => {
    if (!isPlayingRef.current) return;
    setState(prev => ({ ...prev, status: 'loading', currentVerseIndex: versiculos.findIndex(vv => vv.numero === v.numero) }));
    const url = await gerarAudio(v.texto);
    if (!url || !isPlayingRef.current) return;
    return new Promise<void>((resolve) => {
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.playbackRate = velocidade;
      audio.onloadedmetadata = () => setState(prev => ({ ...prev, duration: audio.duration }));
      audio.ontimeupdate = () => {
        setState(prev => ({ ...prev, currentTime: audio.currentTime }));
      };
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play().catch(() => resolve());
    });
  }, [gerarAudio, velocidade, versiculos]);

  const playSequencia = useCallback(async () => {
    for (const v of queueRef.current) {
      if (!isPlayingRef.current) break;
      setState(prev => ({ ...prev, status: 'playing' }));
      await playVersiculo(v);
    }
    if (isPlayingRef.current) {
      setState(prev => ({ ...prev, status: 'idle', currentVerseIndex: -1 }));
      isPlayingRef.current = false;
    }
  }, [playVersiculo]);

  const play = useCallback(() => {
    if (versiculos.length === 0) return;
    isPlayingRef.current = true;
    const startIdx = state.currentVerseIndex >= 0 ? state.currentVerseIndex : 0;
    queueRef.current = versiculos.slice(startIdx);
    playSequencia();
  }, [versiculos, state.currentVerseIndex, playSequencia]);

  const pause = useCallback(() => {
    isPlayingRef.current = false;
    setState(prev => ({ ...prev, status: 'paused' }));
    if (audioRef.current) audioRef.current.pause();
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && state.status === 'paused') {
      isPlayingRef.current = true;
      setState(prev => ({ ...prev, status: 'playing' }));
      audioRef.current.play();
    }
  }, [state.status]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    setState(prev => ({ ...prev, status: 'idle', currentVerseIndex: -1, currentTime: 0 }));
    queueRef.current = [];
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }, []);

  const toggle = useCallback(() => {
    if (state.status === 'playing') pause();
    else if (state.status === 'paused') resume();
    else play();
  }, [state.status, pause, resume, play]);

  const goToVerse = useCallback((numero: number) => {
    stop();
    setTimeout(() => {
      isPlayingRef.current = true;
      queueRef.current = versiculos.filter(v => v.numero >= numero);
      playSequencia();
    }, 100);
  }, [stop, versiculos, playSequencia]);

  const skipForward = useCallback((_n?: number) => {
    const next = state.currentVerseIndex + 1;
    if (next < versiculos.length) goToVerse(versiculos[next].numero);
  }, [state.currentVerseIndex, versiculos, goToVerse]);

  const skipBackward = useCallback((_n?: number) => {
    const prev = state.currentVerseIndex - 1;
    if (prev >= 0) goToVerse(versiculos[prev].numero);
  }, [state.currentVerseIndex, versiculos, goToVerse]);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      isPlayingRef.current = false;
    };
  }, []);

  return {
    state: {
      ...state,
      isPlaying: state.status === 'playing',
      isPaused: state.status === 'paused',
      isLoading: state.status === 'loading',
      announceVerseNumbers,
    },
    isPlaying: state.status === 'playing',
    isLoading: state.status === 'loading',
    versiculoAtual: state.currentVerseIndex >= 0 ? versiculos[state.currentVerseIndex]?.numero ?? null : null,
    progresso: state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0,
    duracao: state.duration,
    currentTime: state.currentTime,
    play, pause, resume, stop, toggle,
    goToVerse, seekToVersiculo: goToVerse,
    skipForward, skipBackward,
    setVelocidade: setVelocidadeState, setVoz,
    setAnnounceVerseNumbers,
  };
}

export function useAudioCapitulo(
  livroAbreviacaoOrOptions: string | UseAudioCapituloOptions,
  capitulo?: number,
  versiculos?: VersiculoAudio[],
  options?: { voz?: 'feminina' | 'masculina'; velocidade?: number }
): UseAudioCapituloReturn {
  if (typeof livroAbreviacaoOrOptions === 'string') {
    return useAudioCapituloImpl(livroAbreviacaoOrOptions, capitulo ?? 1, versiculos ?? [], options);
  }
  return useAudioCapituloImpl(
    livroAbreviacaoOrOptions.livroAbreviacao,
    livroAbreviacaoOrOptions.capitulo,
    livroAbreviacaoOrOptions.versiculos,
    { voz: livroAbreviacaoOrOptions.voz, velocidade: livroAbreviacaoOrOptions.velocidade }
  );
}
