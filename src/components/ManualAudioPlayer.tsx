'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  gerarAudio,
  converterAudioParaUrl,
  temApiKey,
  estimarDuracao,
} from '@/lib/elevenLabs';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';

interface ManualAudioPlayerProps {
  titulo: string;
  conteudo: string;
  capitulos: Array<{ numero: number; titulo: string; conteudo: string }>;
  capituloAtual?: number;
  onCapituloChange?: (numero: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const VELOCIDADES = [0.5, 0.75, 1, 1.25, 1.5, 2];
const STORAGE_KEY_SPEED = 'audio-speed';
const STORAGE_KEY_VOLUME = 'audio-volume';

export default function ManualAudioPlayer({
  titulo,
  conteudo,
  capitulos,
  capituloAtual = 1,
  onCapituloChange,
  isOpen,
  onClose,
}: ManualAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [velocidade, setVelocidade] = useState(1);
  const [volume, setVolume] = useState(1);
  const [mudo, setMudo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [usandoSpeechApi, setUsandoSpeechApi] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const speechRestartTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';
    synthRef.current = typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis : null;

    const savedSpeed = localStorage.getItem(STORAGE_KEY_SPEED);
    const savedVol = localStorage.getItem(STORAGE_KEY_VOLUME);
    if (savedSpeed) setVelocidade(parseFloat(savedSpeed));
    if (savedVol) setVolume(parseFloat(savedVol));

    return () => {
      parar();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SPEED, String(velocidade));
    localStorage.setItem(STORAGE_KEY_VOLUME, String(volume));
  }, [velocidade, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = velocidade;
      audioRef.current.volume = mudo ? 0 : volume;
    }
    if (synthRef.current && synthRef.current.speaking) {
      if (speechRestartTimer.current) clearTimeout(speechRestartTimer.current);
      speechRestartTimer.current = setTimeout(() => {
        synthRef.current?.cancel();
        if (isPlaying) {
          iniciarSpeechApi(conteudo);
        }
      }, 500);
    }
    return () => {
      if (speechRestartTimer.current) clearTimeout(speechRestartTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [velocidade, volume, mudo]);

  const parar = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
    synthRef.current?.cancel();
    if (progressInterval.current) clearInterval(progressInterval.current);
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const iniciarSpeechApi = useCallback((texto: string) => {
    const synth = synthRef.current;
    if (!synth) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = velocidade;
    utterance.volume = mudo ? 0 : volume;

    const voices = synth.getVoices();
    const ptVoice =
      voices.find((v) => /Microsoft\s+(Maria|Daniel)/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith('pt')) ||
      voices[0];
    if (ptVoice) utterance.voice = ptVoice;

    utteranceRef.current = utterance;
    const duracao = estimarDuracao(texto) / 1000;
    setTotalTime(duracao);

    let startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = ((Date.now() - startTime) / 1000) * velocidade;
      setCurrentTime(Math.min(elapsed, duracao));
    }, 100);

    utterance.onend = () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      setIsPlaying(false);
      setCurrentTime(0);
    };

    utterance.onerror = (event) => {
      if (event.error === 'canceled') return;
      if (progressInterval.current) clearInterval(progressInterval.current);
      setIsPlaying(false);
      setErro(`Speech API: ${event.error}`);
    };

    synth.speak(utterance);
    setIsPlaying(true);
    setUsandoSpeechApi(true);
  }, [velocidade, volume, mudo]);

  const reproduzir = useCallback(async () => {
    setErro(null);
    const textoParaLer = conteudo || capitulos.find(c => c.numero === capituloAtual)?.conteudo || '';
    if (!textoParaLer) return;

    setIsLoading(true);

    if (temApiKey()) {
      try {
        const audio = await gerarAudio(textoParaLer);
        const url = await converterAudioParaUrl({ audio: audio.audio, mimeType: audio.mimeType, duracaoMs: audio.duracaoMs });

        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.playbackRate = velocidade;
          audioRef.current.volume = mudo ? 0 : volume;

          audioRef.current.ontimeupdate = () => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          };

          audioRef.current.onloadedmetadata = () => {
            if (audioRef.current) {
              setTotalTime(audioRef.current.duration);
            }
          };

          audioRef.current.onended = () => {
            setIsPlaying(false);
            setCurrentTime(0);
          };

          audioRef.current.onerror = () => {
            setErro('Erro ao reproduzir áudio');
            setIsPlaying(false);
          };

          await audioRef.current.play();
          setIsPlaying(true);
          setUsandoSpeechApi(false);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '';
        if (message !== 'NO_API_KEY') {
          console.warn('ElevenLabs failed:', message);
        }
        iniciarSpeechApi(textoParaLer);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      iniciarSpeechApi(textoParaLer);
    }
  }, [conteudo, capitulos, capituloAtual, velocidade, volume, mudo, iniciarSpeechApi]);

  const pausar = useCallback(() => {
    if (usandoSpeechApi) {
      synthRef.current?.pause();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    if (progressInterval.current) clearInterval(progressInterval.current);
    setIsPlaying(false);
  }, [usandoSpeechApi]);

  const retomar = useCallback(() => {
    if (usandoSpeechApi) {
      synthRef.current?.resume();
    } else if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlaying(true);
  }, [usandoSpeechApi]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pausar();
    } else if (currentTime > 0) {
      retomar();
    } else {
      reproduzir();
    }
  }, [isPlaying, currentTime, pausar, retomar, reproduzir]);

  const capituloAnterior = useCallback(() => {
    if (capituloAtual > 1) {
      parar();
      onCapituloChange?.(capituloAtual - 1);
    }
  }, [capituloAtual, parar, onCapituloChange]);

  const proximoCapitulo = useCallback(() => {
    if (capituloAtual < capitulos.length) {
      parar();
      onCapituloChange?.(capituloAtual + 1);
    }
  }, [capituloAtual, capitulos.length, parar, onCapituloChange]);

  const alterarVelocidade = useCallback(() => {
    const idx = VELOCIDADES.indexOf(velocidade);
    const next = (idx + 1) % VELOCIDADES.length;
    setVelocidade(VELOCIDADES[next]);
  }, [velocidade]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'BUTTON') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, togglePlayPause]);

  useEffect(() => {
    if (isPlaying && textRef.current) {
      textRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isPlaying, capituloAtual]);

  function formatarTempo(segundos: number): string {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg.toString().padStart(2, '0')}`;
  }

  const progresso = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;
  const capitulo = capitulos.find(c => c.numero === capituloAtual) || capitulos[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="w-full max-w-2xl bg-card border border-border rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{titulo}</h3>
            <p className="text-xs text-muted-foreground truncate">
              Cap. {capituloAtual} — {capitulo?.titulo}
            </p>
          </div>
          <button
            onClick={() => { parar(); onClose(); }}
            className="ml-3 p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text content */}
        <div ref={textRef} className="flex-1 overflow-y-auto p-4 prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
          <p>{capitulo?.conteudo}</p>
        </div>

        {/* Error */}
        {erro && (
          <div className="px-4 py-2 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {erro}
            <button onClick={() => setErro(null)} className="ml-auto">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Player Controls */}
        <div className="border-t border-border p-4 space-y-3">
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatarTempo(currentTime)}
            </span>
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${progresso}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-10">
              {formatarTempo(totalTime)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={capituloAnterior}
                disabled={capituloAtual <= 1}
                className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={proximoCapitulo}
                disabled={capituloAtual >= capitulos.length}
                className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={alterarVelocidade}
                className="px-2 py-1 rounded-lg bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors"
              >
                {velocidade}x
              </button>
              <button
                onClick={() => setMudo(!mudo)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                {mudo ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={mudo ? 0 : volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  setMudo(v === 0);
                }}
                className="w-16 h-1 accent-primary"
              />
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground/50">
            Pressione Espaço para {isPlaying ? 'pausar' : 'reproduzir'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
