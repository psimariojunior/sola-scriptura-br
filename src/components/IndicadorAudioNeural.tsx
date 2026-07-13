'use client';

import { useState, useEffect, useCallback } from 'react';
import { Volume2, Check, AlertCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IndicadorAudioNeuralProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao?: string;
}

export function IndicadorAudioNeural({
  livro,
  capitulo,
  versiculo,
  traducao = 'arc',
}: IndicadorAudioNeuralProps) {
  const [disponivel, setDisponivel] = useState<boolean | null>(null);

  useEffect(() => {
    const filename = `${livro}-${capitulo}-${versiculo}-${traducao}-feminina.mp3`;
    fetch(`/audio/${filename}`, { method: 'HEAD' })
      .then((r) => setDisponivel(r.ok))
      .catch(() => setDisponivel(false));
  }, [livro, capitulo, versiculo, traducao]);

  if (disponivel === null) return null;
  if (!disponivel) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20"
      title="Áudio neural de alta qualidade (Microsoft Edge TTS)"
    >
      <Volume2 className="w-2.5 h-2.5" />
      <span>HD</span>
    </motion.div>
  );
}

interface BotaoBaixarAudioProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao?: string;
  texto: string;
  referencia: string;
}

export function BotaoBaixarAudio({
  livro,
  capitulo,
  versiculo,
  traducao = 'arc',
  referencia,
}: BotaoBaixarAudioProps) {
  const [disponivel, setDisponivel] = useState<boolean | null>(null);
  const [baixou, setBaixou] = useState(false);

  useEffect(() => {
    const filename = `${livro}-${capitulo}-${versiculo}-${traducao}-feminina.mp3`;
    fetch(`/audio/${filename}`, { method: 'HEAD' })
      .then((r) => setDisponivel(r.ok))
      .catch(() => setDisponivel(false));
  }, [livro, capitulo, versiculo, traducao]);

  const baixar = useCallback(() => {
    const filename = `${livro}-${capitulo}-${versiculo}-${traducao}-feminina.mp3`;
    const a = document.createElement('a');
    a.href = `/audio/${filename}`;
    a.download = `${referencia.replace(/[: ]/g, '_')}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setBaixou(true);
    setTimeout(() => setBaixou(false), 2000);
  }, [livro, capitulo, versiculo, traducao, referencia]);

  if (disponivel === null || !disponivel) return null;

  return (
    <button
      onClick={baixar}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      title="Baixar áudio neural em MP3"
    >
      <AnimatePresence mode="wait">
        {baixou ? (
          <motion.span key="ok" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 text-green-600">
            <Check className="w-3 h-3" /> Baixado!
          </motion.span>
        ) : (
          <motion.span key="dl" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
            <Download className="w-3 h-3" /> Áudio HD
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
