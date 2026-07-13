'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Plus,
  Minus,
  Maximize2,
  Repeat,
  BookOpen,
  Type,
  Languages,
  QrCode,
  X,
  Copy,
  Check,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import { useTelaCheia } from '@/lib/hooks/useTelaCheia';
import { useAutoPlay } from '@/lib/hooks/useAutoPlay';
import { ApresentacaoSync, buildDisplayUrl } from '@/lib/apresentacao/sync';
import { nomeLivro, nomeTraducao, carregarCapitulo, VersiculoSimples } from '@/lib/apresentacao/versiculos';

const TRAD_OPCOES = [
  { id: 'arc', sigla: 'ARC' },
  { id: 'nvi', sigla: 'NVI' },
  { id: 'naa', sigla: 'NAA' },
  { id: 'ara', sigla: 'ARA' },
  { id: 'acf', sigla: 'ACF' },
  { id: 'ntlh', sigla: 'NTLH' },
  { id: 'kjv', sigla: 'KJV' },
  { id: 'web', sigla: 'WEB' },
] as const;

const AUTOPLAY_OPCOES = [0, 3, 5, 10, 15, 30, 60];

interface ApresentacaoControleProps {
  sync: ApresentacaoSync;
  onOpenQR?: () => void;
  mode?: 'floating' | 'fullscreen';
  onClose?: () => void;
}

export default function ApresentacaoControle({ sync, onOpenQR, mode = 'floating', onClose }: ApresentacaoControleProps) {
  const [state, setState] = useState(sync.getState());
  const [versiculos, setVersiculos] = useState<VersiculoSimples[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [esporte, setEspelho] = useState(false);
  const { isFullscreen, toggle } = useTelaCheia();

  useEffect(() => {
    const unsub = sync.subscribe((s) => setState(s));
    return unsub;
  }, [sync]);

  useEffect(() => {
    let cancelled = false;
    carregarCapitulo(state.livro, state.capitulo, state.translation).then((arr) => {
      if (cancelled) return;
      setVersiculos(arr);
    });
    return () => {
      cancelled = true;
    };
  }, [state.livro, state.capitulo, state.translation]);

  useAutoPlay(
    () => {
      const next = state.versiculo + 1;
      if (next <= versiculos.length) {
        sync.navigateTo(state.livro, state.capitulo, next);
      } else {
        setIsPlaying(false);
      }
    },
    state.autoPlay,
    isPlaying && state.autoPlay > 0
  );

  const totalVerses = versiculos.length;
  const prev = () => {
    if (state.versiculo > 1) {
      sync.navigateTo(state.livro, state.capitulo, state.versiculo - 1);
    } else if (state.capitulo > 1) {
      const prevCap = state.capitulo - 1;
      carregarCapitulo(state.livro, prevCap, state.translation).then((arr) => {
        const last = arr[arr.length - 1]?.numero ?? 1;
        sync.navigateTo(state.livro, prevCap, last);
      });
    }
  };

  const next = () => {
    if (state.versiculo < totalVerses) {
      sync.navigateTo(state.livro, state.capitulo, state.versiculo + 1);
    }
  };

  const jump = (n: number) => sync.navigateTo(state.livro, state.capitulo, n);

  const copyLink = async () => {
    const url = buildDisplayUrl(sync.getChannelId());
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const reset = () => {
    sync.navigateTo(state.livro, state.capitulo, 1);
  };

  const isFloating = mode === 'floating';

  const conteudo = (
    <div className={isFloating ? 'w-[360px] max-w-[92vw]' : 'w-full max-w-3xl mx-auto'}>
      <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10 pointer-events-none" />

        {!isFloating && onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="relative p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] text-white/40 tracking-widest uppercase leading-none">Modo Apresentação</div>
                <div className="text-sm font-semibold text-white leading-tight">
                  {nomeLivro(state.livro)} {state.capitulo}:{state.versiculo}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/40 tracking-wider">
              <span className="font-mono text-amber-300/80 font-semibold">{sync.getChannelId()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 bg-black/40 rounded-xl p-1 border border-white/5">
            <button
              onClick={prev}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-white/80"
              aria-label="Versículo anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Anterior</span>
            </button>
            <div className="h-6 w-px bg-white/10" />
            <button
              onClick={() => setIsPlaying((p) => !p)}
              disabled={state.autoPlay === 0}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg transition-all ${
                state.autoPlay === 0
                  ? 'text-white/30 cursor-not-allowed'
                  : isPlaying
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'hover:bg-white/10 text-white/80 active:scale-95'
              }`}
              aria-label={isPlaying ? 'Pausar auto-avanço' : 'Iniciar auto-avanço'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-xs font-medium">{isPlaying ? 'Pausar' : 'Auto'}</span>
            </button>
            <div className="h-6 w-px bg-white/10" />
            <button
              onClick={next}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-white/80"
              aria-label="Próximo versículo"
            >
              <span className="text-xs font-medium">Próximo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 tracking-wider uppercase font-semibold">Auto</span>
            <div className="flex-1 flex gap-1 flex-wrap">
              {AUTOPLAY_OPCOES.map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    sync.setAutoPlay(sec);
                    if (sec === 0) setIsPlaying(false);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                    state.autoPlay === sec
                      ? 'bg-amber-500 text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {sec === 0 ? 'off' : `${sec}s`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-2 border border-white/5">
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 tracking-wider uppercase mb-1.5">
                <Type className="w-3 h-3" />
                <span>Tamanho</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <button
                  onClick={() => sync.setFontSize(state.fontSize - 1)}
                  disabled={state.fontSize <= 2}
                  className="p-1 rounded hover:bg-white/10 disabled:opacity-30 text-white/70"
                  aria-label="Diminuir fonte"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-base font-bold text-amber-300 font-mono">
                  {['2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'][state.fontSize - 2] || '4xl'}
                </span>
                <button
                  onClick={() => sync.setFontSize(state.fontSize + 1)}
                  disabled={state.fontSize >= 9}
                  className="p-1 rounded hover:bg-white/10 disabled:opacity-30 text-white/70"
                  aria-label="Aumentar fonte"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/5">
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 tracking-wider uppercase mb-1.5">
                <Languages className="w-3 h-3" />
                <span>Tradução</span>
              </div>
              <select
                value={state.translation}
                onChange={(e) => sync.setTranslation(e.target.value)}
                className="w-full bg-transparent text-amber-300 text-sm font-semibold focus:outline-none cursor-pointer"
              >
                {TRAD_OPCOES.map((t) => (
                  <option key={t.id} value={t.id} className="bg-zinc-900 text-white">
                    {t.sigla}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={reset}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Voltar ao início do capítulo"
              aria-label="Reiniciar capítulo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setEspelho((v) => !v)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all ${
                esporte ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
              }`}
              title="Espelhar mudanças automaticamente"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Modo espelho {esporte ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
              aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            {onOpenQR && (
              <button
                onClick={onOpenQR}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title="Mostrar QR Code"
                aria-label="Mostrar QR Code"
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={copyLink}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Copiar link"
              aria-label="Copiar link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {totalVerses > 0 && (
            <div>
              <div className="flex items-center justify-between text-[10px] text-white/40 tracking-wider mb-1">
                <span>Progresso</span>
                <span className="font-mono">
                  {state.versiculo} / {totalVerses}
                </span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                  style={{ width: `${(state.versiculo / totalVerses) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-1 flex-wrap">
            {versiculos.slice(0, Math.min(30, totalVerses)).map((v) => (
              <button
                key={v.numero}
                onClick={() => jump(v.numero)}
                className={`min-w-[28px] h-7 px-1.5 rounded-md text-[10px] font-mono font-semibold transition-all ${
                  v.numero === state.versiculo
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
                aria-label={`Ir para versículo ${v.numero}`}
              >
                {v.numero}
              </button>
            ))}
            {totalVerses > 30 && (
              <span className="text-[10px] text-white/30 self-center ml-1">+{totalVerses - 30}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isFloating) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-50"
      >
        {conteudo}
      </motion.div>
    );
  }

  return conteudo;
}
