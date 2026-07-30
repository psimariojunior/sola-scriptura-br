'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Gauge, ChevronDown, Mic, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

interface AudioPlayerCapituloProps {
  isPlaying: boolean;
  isLoading: boolean;
  versiculoAtual: number | null;
  progresso: number;
  currentTime: number;
  duracao: number;
  totalVersiculos: number;
  voz: 'feminina' | 'masculina';
  velocidade: number;
  onToggle: () => void;
  onStop: () => void;
  onSeekVersiculo: (numero: number) => void;
  onSetVoz: (v: 'feminina' | 'masculina') => void;
  onSetVelocidade: (v: number) => void;
}

const VELOCIDADES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function AudioPlayerCapitulo({
  isPlaying,
  isLoading,
  versiculoAtual,
  progresso,
  currentTime,
  duracao,
  totalVersiculos,
  voz,
  velocidade,
  onToggle,
  onStop,
  onSeekVersiculo,
  onSetVoz,
  onSetVelocidade,
}: AudioPlayerCapituloProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-20 left-0 right-0 z-50 px-3 md:px-6 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto">
        <div className="rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden">

          {/* Barra de progresso */}
          <div className="h-1 bg-muted/30 relative">
            <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-amber-500"
              style={{ width: `${progresso}%` }} />
            <input type="range" min={0} max={totalVersiculos} value={versiculoAtual || 0}
              onChange={(e) => onSeekVersiculo(Number(e.target.value) + 1)}
              className="absolute inset-0 w-full opacity-0 cursor-pointer" />
          </div>

          <div className="p-3 flex items-center gap-3">
            {/* Botão play/pause */}
            <motion.button whileTap={{ scale: 0.9 }} onClick={onToggle}
              disabled={isLoading}
              className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                isPlaying ? 'bg-primary text-white' : 'bg-primary/10 text-primary')}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {versiculoAtual ? `Versículo ${versiculoAtual}` : 'Toque para ouvir'}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {versiculoAtual && `${versiculoAtual}/${totalVersiculos} · `}
                {formatTime(currentTime)} / {formatTime(duracao)}
              </p>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-1">
              <button onClick={() => onSeekVersiculo(Math.max(1, (versiculoAtual || 1) - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 text-muted-foreground">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={() => onSeekVersiculo(Math.min(totalVersiculos, (versiculoAtual || 0) + 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 text-muted-foreground">
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Voz */}
              <button onClick={() => onSetVoz(voz === 'feminina' ? 'masculina' : 'feminina')}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 text-muted-foreground"
                title={`Voz: ${voz === 'feminina' ? 'Feminina' : 'Masculina'}`}>
                <Mic className="w-4 h-4" />
              </button>

              {/* Velocidade */}
              <div className="relative" ref={menuRef}>
                <button onClick={() => setShowMenu(!showMenu)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 text-muted-foreground text-xs font-bold">
                  {velocidade}x
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full right-0 mb-2 rounded-xl border border-border bg-card shadow-xl p-1.5 min-w-[80px]">
                      {VELOCIDADES.map(v => (
                        <button key={v} onClick={() => { onSetVelocidade(v); setShowMenu(false); }}
                          className={cn('w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                            v === velocidade ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50')}>
                          {v}x
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stop */}
              <button onClick={onStop}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-red-500">
                <div className="w-3 h-3 rounded-sm bg-current" />
              </button>
            </div>
          </div>

          {/* Dots do versículo */}
          {versiculoAtual && (
            <div className="px-3 pb-2 flex justify-center gap-1">
              {Array.from({ length: Math.min(totalVersiculos, 30) }, (_, i) => (
                <div key={i} className={cn('w-1.5 h-1.5 rounded-full transition-all',
                  i + 1 === versiculoAtual ? 'bg-primary scale-125' :
                  i + 1 < (versiculoAtual || 0) ? 'bg-primary/40' : 'bg-muted/30')} />
              ))}
              {totalVersiculos > 30 && <span className="text-[9px] text-muted-foreground">+{totalVersiculos - 30}</span>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
