'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Wifi,
  WifiOff,
  Maximize2,
  Minimize2,
  BookOpen,
  Sun,
  Moon,
  Cloud,
  Sunrise,
  Sunset,
  Sparkles,
  Heart,
  Flame,
  Star,
} from 'lucide-react';
import { useTelaCheia } from '@/lib/hooks/useTelaCheia';
import { carregarCapitulo, nomeLivro, nomeTraducao, VersiculoSimples } from '@/lib/apresentacao/versiculos';
import { ApresentacaoSync } from '@/lib/apresentacao/sync';

interface ApresentacaoDisplayProps {
  sync: ApresentacaoSync;
}

type Mood = 'gloria' | 'esperanca' | 'alegria' | 'paz' | 'sabedoria' | 'amor' | 'juizo' | 'trevas';

function detectMood(text: string): Mood {
  const t = text.toLowerCase();
  if (/trevas|morte|abismo|chorar|lamenta|triste|chorar/.test(t)) return 'trevas';
  if (/fogo|ira|juizo|destruir|justi[çc]a|vingan[çc]a|machado/.test(t)) return 'juizo';
  if (/amor|gra[çc]a|miseric[óo]rdia|compaix[ãa]o|cora[çc][ãa]o/.test(t)) return 'amor';
  if (/luz|gl[óo]ria|esplendor|resplande|brilho|resplandecente/.test(t)) return 'gloria';
  if (/esperan[çc]a|promessa|futuro|novo|renovo/.test(t)) return 'esperanca';
  if (/regozijo|alegria|gozo|regozijar|exultar|cant[áa]i|celebrai/.test(t)) return 'alegria';
  if (/paz|descanso|repouso|calma|mansid[ãa]o|sossego|sono/.test(t)) return 'paz';
  if (/sabedoria|entendiment|prud[êe]ncia|insight|conhecimento|ensina/.test(t)) return 'sabedoria';
  return 'gloria';
}

const moodGradients: Record<Mood, { from: string; to: string; accent: string; icon: typeof Sun }> = {
  gloria:   { from: 'from-amber-900/40',   to: 'to-orange-900/30',   accent: 'text-amber-300',   icon: Sunrise },
  esperanca:{ from: 'from-rose-900/40',    to: 'to-amber-900/30',    accent: 'text-rose-300',    icon: Sparkles },
  alegria:  { from: 'from-yellow-900/40',  to: 'to-orange-900/30',   accent: 'text-yellow-300',  icon: Sun },
  paz:      { from: 'from-sky-900/40',     to: 'to-indigo-900/40',   accent: 'text-sky-300',     icon: Cloud },
  sabedoria:{ from: 'from-indigo-900/40',  to: 'to-purple-900/40',   accent: 'text-indigo-300',  icon: Star },
  amor:     { from: 'from-rose-900/40',    to: 'to-pink-900/30',     accent: 'text-pink-300',    icon: Heart },
  juizo:    { from: 'from-red-950/50',     to: 'to-orange-950/40',   accent: 'text-red-300',     icon: Flame },
  trevas:   { from: 'from-slate-900/60',   to: 'to-zinc-900/50',     accent: 'text-slate-300',   icon: Moon },
};

function useClock(): string {
  const [time, setTime] = useState<string>('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function ApresentacaoDisplay({ sync }: ApresentacaoDisplayProps) {
  const { isFullscreen, toggle } = useTelaCheia();
  const [state, setState] = useState(sync.getState());
  const [versiculos, setVersiculos] = useState<VersiculoSimples[]>([]);
  const [connected, setConnected] = useState(false);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const clock = useClock();
  const lastKeyRef = useRef<string>('');
  const lastFetchRef = useRef<string>('');

  useEffect(() => {
    setConnected(true);
    const unsub = sync.subscribe((s) => setState(s));
    return () => {
      unsub();
      setConnected(false);
    };
  }, [sync]);

  useEffect(() => {
    const key = `${state.translation}:${state.livro}:${state.capitulo}`;
    if (lastFetchRef.current === key) return;
    lastFetchRef.current = key;
    let cancelled = false;
    setLoadingVerses(true);
    carregarCapitulo(state.livro, state.capitulo, state.translation)
      .then((arr) => {
        if (cancelled) return;
        setVersiculos(arr);
        setLoadingVerses(false);
      })
      .catch(() => {
        if (cancelled) return;
        setVersiculos([]);
        setLoadingVerses(false);
      });
    return () => {
      cancelled = true;
    };
  }, [state.livro, state.capitulo, state.translation]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA')) return;
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        toggle();
        return;
      }
      if (e.key === 'Escape' && isFullscreen) {
        // browser handles it
        return;
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggle();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        sync.navigateTo(state.livro, state.capitulo, state.versiculo + 1);
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        sync.navigateTo(state.livro, state.capitulo, Math.max(1, state.versiculo - 1));
        return;
      }
      if (/^[0-9]$/.test(e.key)) {
        const num = parseInt(e.key, 10);
        const sig = `${num}_${state.livro}_${state.capitulo}`;
        if (lastKeyRef.current === sig && num > 0 && num <= versiculos.length) {
          sync.navigateTo(state.livro, state.capitulo, num);
          lastKeyRef.current = '';
        } else {
          lastKeyRef.current = sig;
          setTimeout(() => {
            if (lastKeyRef.current === sig && num > 0 && num <= versiculos.length) {
              sync.navigateTo(state.livro, state.capitulo, num);
            }
            lastKeyRef.current = '';
          }, 700);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state, versiculos.length, sync, isFullscreen, toggle]);

  const currentVerse = versiculos.find((v) => v.numero === state.versiculo) ||
    versiculos[Math.max(0, state.versiculo - 1)] ||
    null;

  const mood = currentVerse ? detectMood(currentVerse.texto) : 'gloria';
  const grad = moodGradients[mood];
  const MoodIcon = grad.icon;

  const totalVerses = versiculos.length;
  const progress = totalVerses > 0 ? ((state.versiculo - 1) / totalVerses) * 100 : 0;

  const fontClass = (() => {
    const s = state.fontSize;
    if (s <= 2) return 'text-2xl md:text-3xl';
    if (s === 3) return 'text-3xl md:text-4xl';
    if (s === 4) return 'text-4xl md:text-5xl';
    if (s === 5) return 'text-5xl md:text-6xl';
    if (s === 6) return 'text-6xl md:text-7xl';
    if (s === 7) return 'text-7xl md:text-8xl';
    if (s === 8) return 'text-8xl md:text-9xl';
    return 'text-9xl';
  })();

  return (
    <div className="fixed inset-0 z-50 bg-black text-white overflow-hidden select-none">
      <div className={`absolute inset-0 bg-gradient-to-br ${grad.from} via-black/60 ${grad.to} transition-all duration-1000`} />
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-white/70 text-xs">
          <MoodIcon className={`w-3.5 h-3.5 ${grad.accent}`} />
          <span className="tracking-widest uppercase font-medium">
            {mood === 'gloria' && 'Glória'}
            {mood === 'esperanca' && 'Esperança'}
            {mood === 'alegria' && 'Alegria'}
            {mood === 'paz' && 'Paz'}
            {mood === 'sabedoria' && 'Sabedoria'}
            {mood === 'amor' && 'Amor'}
            {mood === 'juizo' && 'Juízo'}
            {mood === 'trevas' && 'Trevas'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-white/70 text-xs">
          <span className="flex items-center gap-1.5">
            {connected ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className="font-mono">{clock}</span>
          </span>
          <button
            onClick={toggle}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-0">
        <AnimatePresence mode="wait">
          {loadingVerses ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
              <p className="text-sm text-white/50 tracking-widest uppercase">Carregando capítulo</p>
            </motion.div>
          ) : currentVerse ? (
            <motion.div
              key={`${state.livro}-${state.capitulo}-${state.versiculo}-${state.translation}`}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-6xl text-center"
            >
              <div className="mb-8 flex items-center justify-center gap-3 text-amber-300/90">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase">
                  {nomeLivro(state.livro)} {state.capitulo}
                  <span className="text-amber-400">:{state.versiculo}</span>
                </span>
              </div>
              <p
                className={`font-serif leading-[1.25] ${fontClass} text-white tracking-tight px-4`}
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
              >
                <sup className={`${grad.accent} text-base md:text-xl align-top mr-2 font-bold opacity-70`}>
                  {state.versiculo}
                </sup>
                {currentVerse.texto}
              </p>
              <div className="mt-10 flex items-center justify-center gap-3 text-white/40">
                <span className="h-px w-12 bg-white/20" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase">
                  {nomeTraducao(state.translation)}
                </span>
                <span className="h-px w-12 bg-white/20" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center max-w-lg"
            >
              <BookOpen className="w-16 h-16 mx-auto mb-6 text-white/20" />
              <p className="text-xl text-white/60 mb-3 font-serif">
                Aguardando versículo...
              </p>
              <p className="text-sm text-white/40">
                Use o dispositivo controlador para iniciar a apresentação.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3 text-white/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono">
                {state.versiculo} / {totalVerses || '—'}
              </span>
              {state.autoPlay > 0 && (
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                  Auto {state.autoPlay}s
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase opacity-60">
              <span>Sola Scriptura</span>
            </div>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
              initial={false}
              animate={{ width: `${Math.min(100, progress)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 z-20 text-[10px] text-white/30 tracking-wider">
          F · ⌘↵ · ← →
        </div>
      )}
    </div>
  );
}
