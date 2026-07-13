'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Smartphone, Wifi, WifiOff, Maximize2, BookOpen } from 'lucide-react';
import ApresentacaoDisplay from '@/components/Apresentacao/ApresentacaoDisplay';
import { ApresentacaoSync, isValidChannelCode, type ApresentacaoState } from '@/lib/apresentacao/sync';

export default function DisplayPage() {
  const params = useParams<{ codigo: string }>();
  const router = useRouter();
  const [sync, setSync] = useState<ApresentacaoSync | null>(null);
  const [connected, setConnected] = useState(false);
  const [appState, setAppState] = useState<ApresentacaoState | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    const codigo = (params?.codigo || '').toUpperCase();
    if (!codigo || !isValidChannelCode(codigo)) {
      router.replace('/apresentar');
      return;
    }
    if (initRef.current) return;
    initRef.current = true;

    const s = new ApresentacaoSync('display', codigo);
    s.init();
    setSync(s);
    setConnected(true);
    const unsub = s.subscribe((st) => setAppState(st));

    return () => {
      unsub();
      s.close();
      initRef.current = false;
    };
  }, [params?.codigo, router]);

  if (!sync || !appState) {
    return (
      <div className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-display font-light text-amber-300 mb-3">
            Conectando...
          </h1>
          <p className="text-sm text-white/60">
            Código: <span className="font-mono text-amber-300/80 font-semibold">{(params?.codigo || '').toUpperCase()}</span>
          </p>
        </div>
      </div>
    );
  }

  const hasContent = appState.livro && appState.capitulo > 0;

  return (
    <div className="fixed inset-0 z-50">
      {hasContent ? (
        <ApresentacaoDisplay sync={sync} />
      ) : (
        <WaitingScreen code={params?.codigo || ''} />
      )}
    </div>
  );
}

function WaitingScreen({ code }: { code: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-black to-rose-900/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="absolute top-6 right-6 flex items-center gap-2 text-white/60 text-xs">
        <Wifi className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-mono">{code.toUpperCase()}</span>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-2xl shadow-amber-500/30"
        >
          <Smartphone className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-light text-amber-300 mb-4"
        >
          Aguardando dispositivo
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-white/70 leading-relaxed mb-8 max-w-md"
        >
          Abra este URL no seu dispositivo para controlar a apresentação:
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 font-mono text-2xl md:text-3xl text-amber-300 tracking-[0.3em] font-bold shadow-2xl"
        >
          {code.toUpperCase()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex items-center gap-2 text-white/40 text-sm"
        >
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          <span>Aguardando conexão...</span>
        </motion.div>
      </div>
    </div>
  );
}
