'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Smartphone, Wifi, WifiOff, Copy, Check, Maximize2, Play, Pause, ArrowLeft } from 'lucide-react';
import { ApresentacaoSync, buildDisplayUrl, gerarCodigo, type ApresentacaoState } from '@/lib/apresentacao/sync';
import { useTelaCheia } from '@/lib/hooks/useTelaCheia';
import { useAutoPlay } from '@/lib/hooks/useAutoPlay';
import { carregarCapitulo, nomeLivro, nomeTraducao, VersiculoSimples } from '@/lib/apresentacao/versiculos';
import { useToast } from '@/hooks/useToast';
import ApresentacaoControle from './ApresentacaoControle';
import QRCode from './QRCode';

type Tab = 'controle' | 'qr';

interface ApresentacaoModalProps {
  open: boolean;
  onClose: () => void;
  livro: string;
  capitulo: number;
  versiculo?: number;
  translation?: string;
}

export default function ApresentacaoModal({
  open,
  onClose,
  livro,
  capitulo,
  versiculo = 1,
  translation = 'arc',
}: ApresentacaoModalProps) {
  const [sync, setSync] = useState<ApresentacaoSync | null>(null);
  const [tab, setTab] = useState<Tab>('controle');
  const [state, setState] = useState<ApresentacaoState | null>(null);
  const [versiculos, setVersiculos] = useState<VersiculoSimples[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [channelId, setChannelId] = useState<string>('');
  const [connected, setConnected] = useState(false);
  const syncRef = useRef<ApresentacaoSync | null>(null);
  const { isFullscreen, toggle } = useTelaCheia();
  const { toast } = useToast();

  useEffect(() => {
    if (!open) return;
    const id = gerarCodigo();
    setChannelId(id);
    const s = new ApresentacaoSync('controller', id);
    s.init();
    s.navigateTo(livro, capitulo, versiculo);
    if (translation) s.setTranslation(translation);
    syncRef.current = s;
    setSync(s);
    setState(s.getState());
    setConnected(true);
    const unsub = s.subscribe((st) => setState(st));
    toast({ title: 'Apresentação iniciada', variant: 'success' });
    return () => {
      unsub();
      s.close();
      syncRef.current = null;
      setSync(null);
    };
  }, [open]);

  useEffect(() => {
    if (!state) return;
    let cancelled = false;
    carregarCapitulo(state.livro, state.capitulo, state.translation).then((arr) => {
      if (cancelled) return;
      setVersiculos(arr);
    });
    return () => {
      cancelled = true;
    };
  }, [state?.livro, state?.capitulo, state?.translation]);

  useAutoPlay(
    () => {
      if (!state || !sync) return;
      const next = state.versiculo + 1;
      if (next <= versiculos.length) {
        sync.navigateTo(state.livro, state.capitulo, next);
      } else {
        setIsPlaying(false);
      }
    },
    state?.autoPlay ?? 0,
    isPlaying && (state?.autoPlay ?? 0) > 0
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (tab === 'qr') {
          setTab('controle');
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, tab]);

  if (!open) return null;

  const displayUrl = channelId ? buildDisplayUrl(channelId) : '';
  const currentVerse = state ? (versiculos.find((v) => v.numero === state.versiculo) || versiculos[Math.max(0, state.versiculo - 1)]) : null;

  const copyLink = async () => {
    if (!displayUrl) return;
    try {
      await navigator.clipboard.writeText(displayUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Link copiado!', variant: 'success' });
    } catch {
      // ignore
    }
  };

  const handleFechar = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-5xl my-auto bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,67,0.15),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.1),transparent_50%)] pointer-events-none" />

          <button
            onClick={handleFechar}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 p-2 sm:p-2.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 hover:text-white border border-rose-500/30 transition-all shadow-lg"
            aria-label="Fechar modo apresentação"
            title="Fechar (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-xs font-semibold">Fechar</span>
          </button>

          {tab === 'qr' && (
            <button
              onClick={() => setTab('controle')}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 flex items-center gap-1.5 p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all"
              aria-label="Voltar para o controle"
              title="Voltar (Esc)"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-xs font-semibold">Voltar</span>
            </button>
          )}

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-6 pr-16 sm:pr-20 border-b border-white/5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg font-semibold text-white leading-tight">
                    {tab === 'qr' ? 'Conectar TV' : 'Modo Apresentação'}
                  </h2>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-white/50 mt-0.5 flex-wrap">
                    {connected ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-rose-400" />}
                    <span className="font-mono text-amber-300/80 font-semibold">{channelId || '------'}</span>
                    <span className="text-white/30">•</span>
                    <span className="truncate">{state ? `${nomeLivro(state.livro)} ${state.capitulo}:${state.versiculo}` : '...'}</span>
                  </div>
                </div>
              </div>

              <div className="flex bg-white/5 rounded-lg p-1 border border-white/5 shrink-0 self-start sm:self-auto">
                {([
                  { id: 'controle', label: 'Controle', icon: Play },
                  { id: 'qr', label: 'QR Code', icon: QrCode },
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      tab === t.id ? 'bg-amber-500 text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {tab === 'controle' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 min-h-[280px] sm:min-h-[360px] md:min-h-[480px]">
                  {currentVerse ? (
                    <motion.div
                      key={`preview-${state?.livro}-${state?.capitulo}-${state?.versiculo}`}
                      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.4 }}
                      className="text-center max-w-lg w-full"
                    >
                      <div className="text-xs text-amber-300/80 tracking-[0.2em] uppercase font-semibold mb-4">
                        {state ? `${nomeLivro(state.livro)} ${state.capitulo}:${state.versiculo}` : ''}
                      </div>
                      <p className="text-xl sm:text-2xl md:text-3xl font-serif text-white leading-relaxed mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                        <sup className="text-amber-400/60 text-sm font-bold mr-1">{state?.versiculo}</sup>
                        {currentVerse.texto}
                      </p>
                      <div className="flex items-center justify-center gap-3 text-white/40 text-xs">
                        <span className="h-px w-8 bg-white/20" />
                        <span className="tracking-[0.3em] uppercase">{state ? nomeTraducao(state.translation) : ''}</span>
                        <span className="h-px w-8 bg-white/20" />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-white/40 text-sm">Carregando versículo...</div>
                  )}
                </div>

                <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 min-h-[280px] sm:min-h-[360px] md:min-h-[480px]">
                  {sync && (
                    <ApresentacaoControle sync={sync} mode="fullscreen" onClose={onClose} onOpenQR={() => setTab('qr')} />
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={toggle}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isFullscreen ? 'Sair Tela Cheia' : 'Tela Cheia'}</span>
                      <span className="sm:hidden">{isFullscreen ? 'Sair' : 'Tela Cheia'}</span>
                    </button>
                    <button
                      onClick={() => setIsPlaying((p) => !p)}
                      disabled={!state || state.autoPlay === 0}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        !state || state.autoPlay === 0
                          ? 'bg-white/5 text-white/30 cursor-not-allowed'
                          : isPlaying
                          ? 'bg-amber-500 text-black'
                          : 'bg-white/5 hover:bg-white/10 text-white/80'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {isPlaying ? 'Pausar Auto' : 'Iniciar Auto'}
                    </button>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-white/40 tracking-wider uppercase font-semibold mb-2">Link para a TV</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 text-xs text-white/70 font-mono truncate min-w-0">
                        {displayUrl || '...'}
                      </div>
                      <button
                        onClick={copyLink}
                        className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black transition-colors shrink-0"
                        title="Copiar link"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-auto p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 text-[10px] font-bold shrink-0 mt-0.5">
                        i
                      </div>
                      <div className="text-[11px] text-white/60 leading-relaxed">
                        <strong className="text-amber-300/90">Como usar:</strong> abra o link acima na TV ou projetor.
                        Use este dispositivo como controle. As mudanças aparecem em tempo real.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 sm:p-6 md:p-10 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[420px]">
                <div className="flex flex-col items-center gap-4 sm:gap-5 w-full max-w-md">
                  <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-2xl shadow-amber-500/10">
                    {displayUrl && <QRCode url={displayUrl} size={Math.min(280, 240)} />}
                  </div>
                  <p className="text-sm text-white/70 text-center max-w-xs">
                    Aponte a câmera do seu celular para abrir a apresentação na TV
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-white/40 tracking-wider">
                    <Smartphone className="w-3 h-3" />
                    <span>ou abra o link abaixo</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-white/40 tracking-wider uppercase font-semibold mb-2">Link</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 text-xs text-white/70 font-mono truncate min-w-0">
                        {displayUrl || '...'}
                      </div>
                      <button
                        onClick={copyLink}
                        className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black transition-colors shrink-0"
                        title="Copiar link"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setTab('controle')}
                    className="flex items-center gap-2 py-2.5 px-5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium transition-colors border border-white/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar ao controle
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
