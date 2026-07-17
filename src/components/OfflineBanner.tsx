'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { WifiOff, Download, Check, X, Loader2 } from 'lucide-react';
import {
  isOnline,
  onStatusChange,
  cacheAllTranslations,
  getOfflineStats,
  clearOfflineCache,
  TRADUCOES_LOCAIS,
} from '@/lib/offline';
import { useToast } from '@/hooks/useToast';

interface DownloadProgress {
  translation: string;
  current: number;
  total: number;
}

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState<DownloadProgress | null>(null);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getOfflineStats>> | null>(null);
  const { toast } = useToast();
  const alreadyShown = useRef(false);

  useEffect(() => {
    setOffline(!isOnline());
    return onStatusChange((online) => {
      const wasOffline = offline;
      setOffline(!online);
      if (!online && !alreadyShown.current) {
        alreadyShown.current = true;
        toast({
          title: 'Modo offline ativo',
          description: 'Exibindo dados em cache.',
          variant: 'warning',
        });
      } else if (online && wasOffline) {
        alreadyShown.current = false;
        toast({ title: 'Conexao restaurada', variant: 'success' });
      }
    });
  }, [offline, toast]);

  useEffect(() => {
    getOfflineStats().then(setStats);
  }, []);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    setProgress(null);
    try {
      await cacheAllTranslations((translation, current, total) => {
        setProgress({ translation, current, total });
      });
      const newStats = await getOfflineStats();
      setStats(newStats);
      toast({
        title: 'Download completo',
        description: 'Todas as traducoes estao disponiveis offline.',
        variant: 'success',
      });
      setShowDownload(false);
    } catch {
      toast({
        title: 'Erro no download',
        description: 'Tente novamente mais tarde.',
        variant: 'error',
      });
    } finally {
      setDownloading(false);
      setProgress(null);
    }
  }, [toast]);

  const handleClear = useCallback(async () => {
    await clearOfflineCache();
    setStats(null);
    toast({ title: 'Cache limpo', variant: 'success' });
  }, [toast]);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      {offline && (
        <div className="fixed top-16 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-amber-500/90 text-white px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm">
          <WifiOff className="w-4 h-4" />
          <span>Voce esta offline. Exibindo dados em cache.</span>
          <button
            onClick={() => setShowDownload(!showDownload)}
            className="ml-2 underline text-white/90 hover:text-white"
          >
            Gerenciar
          </button>
        </div>
      )}

      {!offline && stats && stats.totalChapters === 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setShowDownload(!showDownload)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Salvar offline
          </button>
        </div>
      )}

      {showDownload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Traducoes Offline</h3>
              <button
                onClick={() => setShowDownload(false)}
                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {stats && stats.totalChapters > 0 && (
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  {stats.totalChapters} capitulos baixados ({stats.totalTranslations} traducoes)
                </p>
                {stats.lastSync && (
                  <p className="text-xs text-muted-foreground">
                    Ultima atualizacao: {new Date(stats.lastSync).toLocaleDateString('pt-BR')}
                  </p>
                )}
                <div className="grid grid-cols-3 gap-1 text-xs">
                  {TRADUCOES_LOCAIS.map((t) => (
                    <span key={t} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-center uppercase">
                      {t} {stats.translations[t] ? `${stats.translations[t]}` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {progress && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="uppercase font-medium">{progress.translation}</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {progress.current} / {progress.total}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {stats && stats.totalChapters > 0 && (
                <button
                  onClick={handleClear}
                  disabled={downloading}
                  className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  Limpar cache
                </button>
              )}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {downloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : stats && stats.totalChapters > 0 ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {downloading
                  ? 'Baixando...'
                  : stats && stats.totalChapters > 0
                    ? 'Atualizar'
                    : 'Baixar todas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
