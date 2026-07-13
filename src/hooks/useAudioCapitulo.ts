'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  gerarAudio,
  converterAudioParaUrl,
  temApiKey,
  estimarDuracao,
} from '@/lib/elevenLabs';
import {
  salvarAudioCapitulo,
  obterAudioCapitulo,
  precarregarProximo,
} from '@/lib/audioCache';
import {
  selecionarMelhorVoz,
  obterConfigVoz,
  prepararTextoParaVoz,
  esperarVozesCarregarem,
  type VozConfig,
} from '@/lib/vozTTS';

export interface VersiculoAudio {
  numero: number;
  texto: string;
}

export interface CapituloAudioState {
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  currentVerseIndex: number;
  currentTime: number;
  totalTime: number;
  error: string | null;
  pauseBetweenVerses: number;
  announceVerseNumbers: boolean;
}

const DEFAULT_CHAPTER_STATE: CapituloAudioState = {
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  currentVerseIndex: 0,
  currentTime: 0,
  totalTime: 0,
  error: null,
  pauseBetweenVerses: 1,
  announceVerseNumbers: true,
};

export function useAudioCapitulo(
  livro: string,
  capitulo: number,
  versiculos: VersiculoAudio[]
) {
  const [state, setState] = useState<CapituloAudioState>(DEFAULT_CHAPTER_STATE);
  const [playlistQueue, setPlaylistQueue] = useState<
    Array<{ livro: string; capitulo: number }>
  >([]);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentUrlRef = useRef<string | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isStoppingRef = useRef(false);
  const playbackStartTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const volumeRef = useRef(1);
  const speedRef = useRef(1);

  useEffect(() => {
    synthRef.current = typeof window !== 'undefined' ? window.speechSynthesis : null;
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';

    const savedSpeed = localStorage.getItem('audio-speed');
    const savedVol = localStorage.getItem('audio-volume');
    if (savedSpeed) speedRef.current = parseFloat(savedSpeed);
    if (savedVol) volumeRef.current = parseFloat(savedVol);

    return () => cleanup();
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, currentVerseIndex: 0, isPlaying: false }));
    accumulatedTimeRef.current = 0;
    cleanup();
  }, [livro, capitulo]);

  function cleanup(): void {
    isStoppingRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
    synthRef.current?.cancel();
    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = null;
    }
    if (progressRef.current) clearInterval(progressRef.current);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  }

  function startProgressTracking(duration: number, offset: number = 0): void {
    if (progressRef.current) clearInterval(progressRef.current);
    playbackStartTimeRef.current = Date.now();
    accumulatedTimeRef.current = offset;

    progressRef.current = setInterval(() => {
      const elapsed =
        (Date.now() - playbackStartTimeRef.current) / 1000 * speedRef.current + offset;
      setState((prev) => ({
        ...prev,
        currentTime: Math.min(elapsed, duration),
      }));
    }, 100);
  }

  function stopProgressTracking(): void {
    if (progressRef.current) clearInterval(progressRef.current);
  }

  const playVerso = useCallback(
    async (index: number): Promise<void> => {
      if (index < 0 || index >= versiculos.length) {
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          currentVerseIndex: 0,
          currentTime: 0,
        }));
        if (playlistQueue.length > 0) {
          const next = playlistQueue[0];
          setPlaylistQueue((prev) => prev.slice(1));
        }
        return;
      }

      const verso = versiculos[index];
      setState((prev) => ({
        ...prev,
        isLoading: true,
        currentVerseIndex: index,
      }));

      let textoCompleto: string;
      if (state.announceVerseNumbers) {
        textoCompleto = `${verso.numero}. ${verso.texto}`;
      } else {
        textoCompleto = verso.texto;
      }

      const config = obterConfigVoz();
      const usarElevenLabs =
        (config.motor === 'elevenlabs' || config.motor === 'auto') && temApiKey();

      if (usarElevenLabs) {
        try {
          const cached = await obterAudioCapitulo(livro, capitulo);

          if (cached) {
            await playFromCache(cached.audio, cached.mimeType, index);
            return;
          }

          const chapterText = versiculos
            .map((v) => `${v.numero}. ${v.texto}`)
            .join('\n\n');

          setState((prev) => ({ ...prev, isLoading: true }));

          const audio = await gerarAudio(chapterText, { voiceId: config.vozElevenLabs });
          await salvarAudioCapitulo(livro, capitulo, audio.audio, audio.mimeType);

          await playFromCache(audio.audio, audio.mimeType, index);
          return;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : '';
          if (message !== 'NO_API_KEY') {
            console.warn('ElevenLabs failed for chapter:', message);
          }
          if (config.motor === 'elevenlabs') {
            playVersoSpeechApi(textoCompleto, index);
            return;
          }
        }
      }

      playVersoSpeechApi(textoCompleto, index);
    },
    [versiculos, livro, capitulo, state.announceVerseNumbers, playlistQueue]
  );

  async function playFromCache(
    audioBuffer: ArrayBuffer,
    mimeType: string,
    startIndex: number
  ): Promise<void> {
    const el = audioRef.current;
    if (!el) return;

    if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current);
    const blob = new Blob([audioBuffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    currentUrlRef.current = url;
    el.src = url;
    el.playbackRate = speedRef.current;
    el.volume = volumeRef.current;

    const allText = versiculos.map((v) => `${v.numero}. ${v.texto}`).join('\n\n');
    const totalDuration = estimarDuracao(allText) / 1000;
    const versePosition = calcularPosicaoVerso(startIndex);

    el.onloadedmetadata = () => {
      el.currentTime = versePosition;
    };

    el.ontimeupdate = () => {
      if (!el) return;
      const verseInfo = calcularVersoAtual(el.currentTime, el.duration || totalDuration);
      if (verseInfo.index !== state.currentVerseIndex) {
        setState((prev) => ({
          ...prev,
          currentVerseIndex: verseInfo.index,
          currentTime: el.currentTime,
        }));
      } else {
        setState((prev) => ({ ...prev, currentTime: el.currentTime }));
      }
    };

    el.onended = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
        currentVerseIndex: 0,
      }));
      precarregarProximo(livro, capitulo, 150, async (livroP, capP) => {
        const texto = `Leitura do capítulo ${capP}`;
        const audioP = await gerarAudio(texto);
        return audioP.audio;
      }).catch(() => {});
    };

    el.onerror = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: 'Erro ao reproduzir capítulo',
      }));
    };

    await el.play();
    setState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      isLoading: false,
      totalTime: el.duration || totalDuration,
    }));
  }

  function calcularPosicaoVerso(verseIndex: number): number {
    let totalWords = 0;
    let verseWords = 0;
    for (let i = 0; i < versiculos.length; i++) {
      const words = `${versiculos[i].numero}. ${versiculos[i].texto}`.split(/\s+/).length;
      totalWords += words;
      if (i < verseIndex) verseWords += words;
    }
    return (verseWords / totalWords) * (audioRef.current?.duration || 0);
  }

  function calcularVersoAtual(currentTime: number, duration: number): { index: number; progress: number } {
    const progress = currentTime / duration;
    let accWords = 0;
    let totalWords = 0;
    for (const v of versiculos) {
      totalWords += `${v.numero}. ${v.texto}`.split(/\s+/).length;
    }
    let running = 0;
    for (let i = 0; i < versiculos.length; i++) {
      const words = `${versiculos[i].numero}. ${versiculos[i].texto}`.split(/\s+/).length;
      running += words;
      if (running / totalWords >= progress) {
        return { index: i, progress: running / totalWords };
      }
    }
    return { index: versiculos.length - 1, progress: 1 };
  }

  function playVersoSpeechApi(text: string, index: number): void {
    const synth = synthRef.current;
    if (!synth) return;

    synth.cancel();

    const config: VozConfig = obterConfigVoz();
    const textoLimpo = prepararTextoParaVoz(text, config);
    if (!textoLimpo) return;

    const voices = synth.getVoices();
    const melhorVoz = selecionarMelhorVoz(voices, config.preferGender);

    const utterance = new SpeechSynthesisUtterance(textoLimpo);
    if (melhorVoz) {
      utterance.voice = melhorVoz;
      utterance.lang = melhorVoz.lang;
    } else {
      utterance.lang = 'pt-BR';
    }
    utterance.rate = Math.max(0.5, Math.min(2.0, config.rate * speedRef.current));
    utterance.pitch = config.pitch;
    utterance.volume = volumeRef.current;

    const estimatedDuration = estimarDuracao(textoLimpo) / 1000;
    startProgressTracking(estimatedDuration, 0);

    utterance.onend = () => {
      stopProgressTracking();
      if (isStoppingRef.current) return;

      if (index < versiculos.length - 1) {
        const pauseMs = state.pauseBetweenVerses * 1000;
        setState((prev) => ({ ...prev, isPaused: true }));

        pauseTimeoutRef.current = setTimeout(() => {
          if (isStoppingRef.current) return;
          setState((prev) => ({ ...prev, isPaused: false }));
          playVerso(index + 1);
        }, pauseMs);
      } else {
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          isPaused: false,
          currentVerseIndex: 0,
          currentTime: 0,
        }));
      }
    };

    utterance.onerror = (event) => {
      if (event.error === 'canceled') return;
      stopProgressTracking();
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: `Speech API: ${event.error}`,
      }));
    };

    synth.speak(utterance);
    setState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      isLoading: false,
      currentVerseIndex: index,
    }));
  }

  const play = useCallback(
    (fromVerse: number = 0): void => {
      isStoppingRef.current = false;
      accumulatedTimeRef.current = 0;
      setState((prev) => ({ ...prev, currentVerseIndex: fromVerse }));
      playVerso(fromVerse);
    },
    [playVerso]
  );

  const pause = useCallback((): void => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    } else {
      synthRef.current?.pause();
    }
    setState((prev) => ({ ...prev, isPlaying: false, isPaused: true }));
  }, []);

  const resume = useCallback((): void => {
    if (state.isPaused) {
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play();
      } else {
        synthRef.current?.resume();
      }
      setState((prev) => ({ ...prev, isPlaying: true, isPaused: false }));
    }
  }, [state.isPaused]);

  const stop = useCallback((): void => {
    isStoppingRef.current = true;
    cleanup();
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      isLoading: false,
      currentVerseIndex: 0,
      currentTime: 0,
    }));
  }, []);

  const goToVerse = useCallback(
    (verseIndex: number): void => {
      if (verseIndex < 0 || verseIndex >= versiculos.length) return;

      if (audioRef.current && audioRef.current.src) {
        const time = calcularPosicaoVerso(verseIndex);
        audioRef.current.currentTime = time;
        setState((prev) => ({ ...prev, currentVerseIndex: verseIndex }));
      } else {
        stop();
        setTimeout(() => play(verseIndex), 100);
      }
    },
    [versiculos, stop, play]
  );

  const setPauseBetweenVerses = useCallback((seconds: number): void => {
    setState((prev) => ({ ...prev, pauseBetweenVerses: seconds }));
    localStorage.setItem('audio-pause-between', String(seconds));
  }, []);

  const setAnnounceVerseNumbers = useCallback((announce: boolean): void => {
    setState((prev) => ({ ...prev, announceVerseNumbers: announce }));
    localStorage.setItem('audio-announce-verses', String(announce));
  }, []);

  const addToQueue = useCallback(
    (livroNovo: string, capituloNovo: number): void => {
      setPlaylistQueue((prev) => [...prev, { livro: livroNovo, capitulo: capituloNovo }]);
    },
    []
  );

  const removeFromQueue = useCallback((index: number): void => {
    setPlaylistQueue((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearQueue = useCallback((): void => {
    setPlaylistQueue([]);
  }, []);

  const skipForward = useCallback(
    (verses: number = 1): void => {
      const newIndex = Math.min(state.currentVerseIndex + verses, versiculos.length - 1);
      goToVerse(newIndex);
    },
    [state.currentVerseIndex, versiculos.length, goToVerse]
  );

  const skipBackward = useCallback(
    (verses: number = 1): void => {
      const newIndex = Math.max(state.currentVerseIndex - verses, 0);
      goToVerse(newIndex);
    },
    [state.currentVerseIndex, goToVerse]
  );

  useEffect(() => {
    const savedPause = localStorage.getItem('audio-pause-between');
    const savedAnnounce = localStorage.getItem('audio-announce-verses');
    if (savedPause) {
      setState((prev) => ({
        ...prev,
        pauseBetweenVerses: parseFloat(savedPause),
      }));
    }
    if (savedAnnounce) {
      setState((prev) => ({
        ...prev,
        announceVerseNumbers: savedAnnounce === 'true',
      }));
    }
  }, []);

  return {
    state,
    play,
    pause,
    resume,
    stop,
    goToVerse,
    skipForward,
    skipBackward,
    setPauseBetweenVerses,
    setAnnounceVerseNumbers,
    queue: playlistQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };
}
