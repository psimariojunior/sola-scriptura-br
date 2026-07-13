'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioNeuralProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao?: 'arc' | 'nvi' | 'naa' | 'ara' | 'acf' | 'ntlh' | 'kjv' | 'web';
  voz?: 'feminina' | 'masculina';
  tamanho?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AudioNeural({
  livro,
  capitulo,
  versiculo,
  traducao = 'arc',
  voz = 'feminina',
  tamanho = 'md',
  className = '',
}: AudioNeuralProps) {
  const [tocando, setTocando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [disponivel, setDisponivel] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filename = `${livro}-${capitulo}-${versiculo}-${traducao}-${voz}.mp3`;
  const src = `/audio/${filename}`;

  useEffect(() => {
    setTocando(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [livro, capitulo, versiculo, traducao, voz]);

  const togglePlay = async () => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.onended = () => setTocando(false);
      audio.onerror = () => {
        setDisponivel(false);
        setTocando(false);
      };
    }

    if (tocando) {
      audioRef.current.pause();
      setTocando(false);
    } else {
      setCarregando(true);
      try {
        await audioRef.current.play();
        setTocando(true);
      } catch (e) {
        setDisponivel(false);
      }
      setCarregando(false);
    }
  };

  const sizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (!disponivel) {
    return (
      <button
        disabled
        className={`${sizes[tamanho]} rounded-full flex items-center justify-center bg-muted/50 text-muted-foreground/50 cursor-not-allowed ${className}`}
        title="Áudio neural não disponível para este versículo (use o painel de qualidade para fallback)"
      >
        <Volume2 className={iconSizes[tamanho]} />
      </button>
    );
  }

  return (
    <motion.button
      onClick={togglePlay}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`${sizes[tamanho]} rounded-full flex items-center justify-center transition-all ${
        tocando
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
          : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30'
      } ${className}`}
      title={tocando ? 'Pausar' : 'Tocar áudio neural de alta qualidade'}
      aria-label={tocando ? 'Pausar áudio' : 'Tocar áudio'}
    >
      {carregando ? (
        <span className={`${iconSizes[tamanho]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
      ) : tocando ? (
        <Pause className={iconSizes[tamanho]} fill="currentColor" />
      ) : (
        <Play className={iconSizes[tamanho]} fill="currentColor" />
      )}
    </motion.button>
  );
}
