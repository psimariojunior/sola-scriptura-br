'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Download, Check, Cloud } from 'lucide-react';

interface OfflineIndicatorProps {
  className?: string;
}

export function OfflineIndicator({ className }: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [downloadedCount, setDownloadedCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 4000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'OFFLINE_STATS') {
          setDownloadedCount(event.data.chaptersCount || 0);
        }
      });

      navigator.serviceWorker.ready.then(reg => {
        reg.active?.postMessage({ type: 'GET_OFFLINE_STATS' });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl flex items-center gap-3 max-w-sm ${
              isOnline
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            } ${className || ''}`}
          >
            {isOnline ? (
              <Cloud className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <WifiOff className="w-5 h-5 text-amber-500 shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium">
                {isOnline ? 'Conexão restaurada' : 'Modo offline'}
              </p>
              <p className="text-xs opacity-75">
                {isOnline
                  ? 'Sincronizando dados...'
                  : `${downloadedCount} capítulos disponíveis offline`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge discreto no canto */}
      {!isOnline && !showBanner && (
        <div className="fixed bottom-20 left-4 z-50 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-1.5 text-xs">
          <WifiOff className="w-3 h-3" />
          <span>Offline</span>
        </div>
      )}
    </>
  );
}

export function OfflineChapterSaver() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveChapter = async () => {
    if (saving || saved) return;
    setSaving(true);

    try {
      const url = new URL(window.location.href);
      const pathParts = url.pathname.split('/');
      const livro = pathParts[2];
      const capitulo = pathParts[3];

      if (!livro || !capitulo) {
        setSaving(false);
        return;
      }

      const traducao = localStorage.getItem('ssb_traducao') || 'NVI';
      const res = await fetch(`/api/v1/biblia/texto/${traducao}/${livro}/${capitulo}`);
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      const verses = data.versiculos || data.verses || data;

      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'DOWNLOAD_BIBLE_CHAPTER',
          livro,
          capitulo: Number(capitulo),
          traducao,
          verses: Array.isArray(verses) ? verses : [],
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  return (
    <button onClick={handleSaveChapter} disabled={saving || saved}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border/50 hover:bg-muted/50 transition-colors disabled:opacity-50">
      {saved ? (
        <>
          <Check className="w-3 h-3 text-emerald-500" />
          <span className="text-emerald-600">Salvo offline</span>
        </>
      ) : saving ? (
        <>
          <Download className="w-3 h-3 animate-pulse" />
          <span>Salvando...</span>
        </>
      ) : (
        <>
          <Download className="w-3 h-3" />
          <span>Salvar offline</span>
        </>
      )}
    </button>
  );
}
