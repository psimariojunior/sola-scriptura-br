'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Theater,
  Settings,
  Maximize2,
  Minimize2,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gerarAudio, converterAudioParaUrl, temApiKey } from '@/lib/elevenLabs';

export interface PersonagemVoz {
  nome: string;
  cor: string;
  corBg: string;
  voiceId: string;
}

export interface CenaDramatica {
  id: string;
  narrador?: string;
  personagem?: string;
  texto: string;
  tipo: 'narracao' | 'dialogo' | 'descricao' | 'musica';
  tom?: 'calmo' | 'intenso' | 'triste' | 'alegre' | 'solene';
}

export interface NarracaoDramaticaProps {
  titulo: string;
  subtitulo?: string;
  cenas: CenaDramatica[];
  personagens: PersonagemVoz[];
  backgroundSomUrl?: string;
  onFechar?: () => void;
}

const PERSONAGENS_PADRAO: PersonagemVoz[] = [
  { nome: 'Narrador', cor: '#8B5CF6', corBg: 'rgba(139,92,246,0.1)', voiceId: '21m00Tcm4TlvDq8ikWAM' },
  { nome: 'Jesus', cor: '#F59E0B', corBg: 'rgba(245,158,11,0.1)', voiceId: 'pNInz6obpgDQGcFmaJgB' },
  { nome: 'Discípulo', cor: '#3B82F6', corBg: 'rgba(59,130,246,0.1)', voiceId: 'ErXwobaYiN019PkySvjV' },
  { nome: 'Narrador Antigo', cor: '#10B981', corBg: 'rgba(16,185,129,0.1)', voiceId: 'VR6AewLTigWG4xSOukaG' },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function NarracaoDramatica({
  titulo,
  subtitulo,
  cenas,
  personagens = PERSONAGENS_PADRAO,
  onFechar,
}: NarracaoDramaticaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cenaAtual, setCenaAtual] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showScript, setShowScript] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    return () => cleanup();
  }, []);

  function cleanup(): void {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }

  const playCena = useCallback(
    async (index: number): Promise<void> => {
      if (index < 0 || index >= cenas.length) {
        setIsPlaying(false);
        setCenaAtual(0);
        return;
      }

      const cena = cenas[index];
      setCenaAtual(index);
      setIsLoading(true);
      cleanup();

      if (!temApiKey()) {
        // Fallback: simulate dramatic playback with Web Speech API
        const synth = window.speechSynthesis;
        if (!synth) { setIsLoading(false); return; }

        const utt = new SpeechSynthesisUtterance(cena.texto);
        utt.lang = 'pt-BR';
        utt.rate = cena.tom === 'intenso' ? 1.1 : cena.tom === 'triste' ? 0.75 : 0.9;

        const voices = synth.getVoices();
        const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
        if (ptVoice) utt.voice = ptVoice;

        const estimatedMs = cena.texto.split(/\s+/).length * (60000 / 140);
        setCurrentTime(0);
        setTotalDuration(estimatedMs / 1000);

        if (progressRef.current) clearInterval(progressRef.current);
        const start = Date.now();
        progressRef.current = setInterval(() => {
          setCurrentTime((Date.now() - start) / 1000);
        }, 100);

        utt.onend = () => {
          if (progressRef.current) clearInterval(progressRef.current);
          setIsLoading(false);
          if (index < cenas.length - 1) {
            setTimeout(() => playCena(index + 1), 800);
          } else {
            setIsPlaying(false);
            setCenaAtual(0);
          }
        };

        utt.onerror = () => {
          if (progressRef.current) clearInterval(progressRef.current);
          setIsLoading(false);
          setIsPlaying(false);
        };

        synth.speak(utt);
        setIsPlaying(true);
        setIsLoading(false);
        return;
      }

      try {
        const characterName = cena.personagem || cena.narrador || 'Narrador';
        const characterVoice = personagens.find((p) => p.nome === characterName);
        const audio = await gerarAudio(cena.texto, { voiceId: characterVoice?.voiceId });
        const url = await converterAudioParaUrl(audio);
        audioUrlRef.current = url;

        const el = audioRef.current;
        if (!el) return;

        el.src = url;
        el.volume = isMuted ? 0 : volume;

        el.onloadedmetadata = () => {
          setTotalDuration(el.duration);
        };

        if (progressRef.current) clearInterval(progressRef.current);
        progressRef.current = setInterval(() => {
          if (el && !el.paused) setCurrentTime(el.currentTime);
        }, 100);

        el.onended = () => {
          if (progressRef.current) clearInterval(progressRef.current);
          setCurrentTime(0);
          if (index < cenas.length - 1) {
            setTimeout(() => playCena(index + 1), 800);
          } else {
            setIsPlaying(false);
            setCenaAtual(0);
          }
        };

        await el.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Dramatic narration error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [cenas, volume, isMuted]
  );

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      else window.speechSynthesis?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        playCena(cenaAtual);
      }
    }
  }, [isPlaying, cenaAtual, playCena]);

  const skipForward = useCallback(() => {
    if (cenaAtual < cenas.length - 1) {
      playCena(cenaAtual + 1);
    }
  }, [cenaAtual, cenas.length, playCena]);

  const skipBackward = useCallback(() => {
    if (cenaAtual > 0) {
      playCena(cenaAtual - 1);
    }
  }, [cenaAtual, playCena]);

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
  const overallProgress = cenas.length > 0 ? ((cenaAtual + currentTime / totalDuration) / cenas.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-[var(--bg)] flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
            <Theater className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--fg)]">{titulo}</h2>
            {subtitulo && <p className="text-[11px] text-[var(--muted-fg)]">{subtitulo}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScript(!showScript)}
            className={`p-2 rounded-lg transition-colors ${showScript ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'text-[var(--muted-fg)] hover:bg-[var(--accent)]'}`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg text-[var(--muted-fg)] hover:bg-[var(--accent)] transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {onFechar && (
            <button onClick={onFechar} className="p-2 rounded-lg text-[var(--muted-fg)] hover:bg-[var(--accent)] transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Scene Display */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative">
          {/* Ambient gradient background based on scene tone */}
          <div
            className="absolute inset-0 opacity-30 transition-all duration-1000"
            style={{
              background:
                cenas[cenaAtual]?.tom === 'intenso'
                  ? 'radial-gradient(circle at center, rgba(239,68,68,0.15) 0%, transparent 70%)'
                  : cenas[cenaAtual]?.tom === 'triste'
                  ? 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)'
                  : cenas[cenaAtual]?.tom === 'alegre'
                  ? 'radial-gradient(circle at center, rgba(245,158,11,0.12) 0%, transparent 70%)'
                  : cenas[cenaAtual]?.tom === 'solene'
                  ? 'radial-gradient(circle at center, rgba(139,92,246,0.12) 0%, transparent 70%)'
                  : 'radial-gradient(circle at center, rgba(var(--primary),0.05) 0%, transparent 70%)',
            }}
          />

          {/* Current Scene */}
          <div className="relative z-10 max-w-2xl w-full text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={cenaAtual}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* Speaker label */}
                {cenas[cenaAtual]?.personagem && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{
                      color:
                        personagens.find((p) => p.nome === cenas[cenaAtual].personagem)?.cor || 'var(--primary)',
                    }}
                  >
                    {cenas[cenaAtual].personagem}
                  </motion.p>
                )}

                {/* Text */}
                <motion.p
                  className={`text-lg lg:text-xl leading-relaxed ${
                    cenas[cenaAtual]?.personagem
                      ? 'italic text-[var(--fg)]'
                      : 'text-[var(--fg)] font-medium'
                  }`}
                  animate={isPlaying ? { opacity: [0.85, 1, 0.85] } : { opacity: 1 }}
                  transition={isPlaying ? { duration: 3, repeat: Infinity } : {}}
                >
                  {cenas[cenaAtual]?.texto || 'Fim da narração'}
                </motion.p>

                {/* Tom indicator */}
                {cenas[cenaAtual]?.tom && (
                  <p className="text-[9px] mt-4 text-[var(--muted-fg)] uppercase tracking-wider">
                    {cenas[cenaAtual].tom}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Waveform */}
          <div className="flex items-end justify-center gap-[2px] h-12 mt-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] rounded-full"
                style={{
                  background:
                    personagens.find((p) => p.nome === cenas[cenaAtual]?.personagem)?.cor || 'var(--primary)',
                  opacity: 0.5,
                }}
                animate={
                  isPlaying
                    ? { height: [4, 8 + Math.sin(i * 0.5) * 16, 4] }
                    : { height: 4 }
                }
                transition={
                  isPlaying
                    ? { duration: 0.8 + i * 0.03, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.3 }
                }
              />
            ))}
          </div>
        </div>

        {/* Script Panel */}
        <AnimatePresence>
          {showScript && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-[var(--border)]/30 bg-[var(--card-bg)] overflow-hidden hidden lg:block"
            >
              <div className="p-4 h-full overflow-y-auto">
                <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider mb-3 font-semibold">Roteiro</p>
                <div className="space-y-2">
                  {cenas.map((cena, i) => {
                    const personagem = personagens.find((p) => p.nome === cena.personagem);
                    const isCurrent = i === cenaAtual;
                    return (
                      <motion.div
                        key={cena.id}
                        animate={isCurrent ? { scale: 1.02, x: 4 } : { scale: 1, x: 0 }}
                        className={`p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[var(--primary)]/10 border border-[var(--primary)]/20'
                            : 'bg-[var(--bg)] border border-transparent hover:border-[var(--border)]'
                        }`}
                        onClick={() => playCena(i)}
                      >
                        {cena.personagem && (
                          <p
                            className="text-[10px] font-bold uppercase tracking-wider mb-1"
                            style={{ color: personagem?.cor || 'var(--muted-fg)' }}
                          >
                            {cena.personagem}
                          </p>
                        )}
                        <p className={`${cena.personagem ? 'italic' : ''} text-[var(--fg)] leading-relaxed ${
                          isCurrent ? 'font-medium' : 'opacity-70'
                        }`}>
                          {cena.texto.length > 120 ? cena.texto.substring(0, 120) + '...' : cena.texto}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="border-t border-[var(--border)]/30 bg-[var(--card-bg)]">
        {/* Overall Progress */}
        <div className="h-1 bg-[var(--border)]/30">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-amber-500"
            style={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {/* Scene info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--fg)]">
                Cena {cenaAtual + 1} de {cenas.length}
              </p>
              <p className="text-[10px] text-[var(--muted-fg)]">
                {cenas[cenaAtual]?.personagem || 'Narração'} · {formatTime(currentTime)}
              </p>
            </div>

            {/* Transport Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={skipBackward}
                disabled={cenaAtual === 0}
                className="p-2 text-[var(--fg)] hover:text-[var(--primary)] disabled:opacity-30 transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-purple-500/20"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </motion.button>

              <button
                onClick={skipForward}
                disabled={cenaAtual >= cenas.length - 1}
                className="p-2 text-[var(--fg)] hover:text-[var(--primary)] disabled:opacity-30 transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume controls */}
            <div className="flex-1 flex items-center justify-end gap-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-[var(--muted-fg)]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[var(--muted-fg)]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 accent-[var(--primary)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
