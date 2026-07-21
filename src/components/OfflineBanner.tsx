'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { WifiOff, Download, Check, X, Loader2, Trash2, HardDrive } from 'lucide-react';
import {
  isOnline,
  onStatusChange,
  cacheAllTranslations,
  cacheTranslation,
  removeTranslation,
  getOfflineStats,
  clearOfflineCache,
  TRADUCOES_LOCAIS,
} from '@/lib/offline';
import { useToast } from '@/hooks/useToast';
import { labelMap } from '@/components/Biblia/TranslationDropdown';

interface SingleProgress {
  translation: string;
  current: number;
  total: number;
}

const TRAD_NOMES: Record<string, string> = {
  arc: 'Almeida Revista e Corrigida',
  nvi: 'Nova Versao Internacional',
  ara: 'Almeida Revista e Atualizada',
  acf: 'Almeida Corrigida Fiel',
  kjv: 'King James Version',
  web: 'World English Bible',
};

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState<SingleProgress | null>(null);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getOfflineStats>> | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
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

  const handleDownloadOne = useCallback(async (trad: string) => {
    setDownloading(trad);
    setProgress({ translation: trad, current: 0, total: 0 });
    try {
      await cacheTranslation(trad, (current, total) => {
        setProgress({ translation: trad, current, total });
      });
      const newStats = await getOfflineStats();
      setStats(newStats);
      toast({
        title: `${labelMap[trad]} baixada`,
        description: 'Traducao disponivel offline.',
        variant: 'success',
      });
    } catch {
      toast({ title: 'Erro no download', description: `Falha ao baixar ${labelMap[trad]}.`, variant: 'error' });
    } finally {
      setDownloading(null);
      setProgress(null);
    }
  }, [toast]);

  const handleDownloadAll = useCallback(async () => {
    setDownloadingAll(true);
    setProgress(null);
    try {
      await cacheAllTranslations((translation, current, total) => {
        setProgress({ translation, current, total });
      });
      const newStats = await getOfflineStats();
      setStats(newStats);
      toast({ title: 'Download completo', description: 'Todas as traducoes salvas offline.', variant: 'success' });
    } catch {
      toast({ title: 'Erro no download', variant: 'error' });
    } finally {
      setDownloadingAll(false);
      setProgress(null);
    }
  }, [toast]);

  const handleRemove = useCallback(async (trad: string) => {
    await removeTranslation(trad);
    const newStats = await getOfflineStats();
    setStats(newStats);
    toast({ title: `${labelMap[trad]} removida`, variant: 'success' });
  }, [toast]);

  const handleClearAll = useCallback(async () => {
    await clearOfflineCache();
    setStats(null);
    toast({ title: 'Cache limpo', variant: 'success' });
  }, [toast]);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const totalDownloaded = stats ? Object.values(stats.translations).reduce((a, b) => a + b, 0) : 0;

  return (
    <>
      {offline && (
        <div className="fixed top-16 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-amber-500/90 text-white px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm">
          <WifiOff className="w-4 h-4" />
          <span>Voce esta offline. Exibindo dados em cache.</span>
          <button onClick={() => setShowModal(true)} className="ml-2 underline text-white/90 hover:text-white">
            Gerenciar
          </button>
        </div>
      )}

      {!offline && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium transition-colors"
        >
          <HardDrive className="w-4 h-4" />
          {totalDownloaded > 0 ? `${totalDownloaded} caps salvos` : 'Salvar offline'}
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div>
                <h3 className="text-lg font-bold">Biblia Offline</h3>
                <p className="text-xs text-[var(--content-muted)]">
                  {totalDownloaded > 0
                    ? `${stats?.totalChapters || 0} capitulos salvos em ${stats?.totalTranslations || 0} traducoes`
                    : 'Baixe traducoes para ler sem internet'}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-[var(--surface-sunken)] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
              {progress && (
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Baixando {labelMap[progress.translation]}...</span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 text-right">
                    {progress.current} / {progress.total} capitulos
                  </p>
                </div>
              )}

              {TRADUCOES_LOCAIS.map((trad) => {
                const downloaded = (stats?.translations[trad] || 0) > 0;
                const isCurrentDownload = downloading === trad;
                return (
                  <div key={trad} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors">
                    <div className={`w-2 h-2 rounded-full ${downloaded ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{labelMap[trad]}</span>
                        {downloaded && <Check className="w-3 h-3 text-green-500" />}
                      </div>
                      <div className="text-[11px] text-[var(--content-muted)]">{TRAD_NOMES[trad]}</div>
                    </div>
                    <div className="text-right">
                      {downloaded ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-[var(--content-muted)]">
                            {stats?.translations[trad] || 0} caps
                          </span>
                          <button
                            onClick={() => handleRemove(trad)}
                            disabled={!!downloading}
                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded transition-colors"
                            title="Remover"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDownloadOne(trad)}
                          disabled={!!downloading}
                          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 disabled:opacity-50 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Baixar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-3 border-t border-[var(--border)] flex items-center gap-2">
              {stats && stats.totalChapters > 0 && (
                <button onClick={handleClearAll} disabled={!!downloading || downloadingAll}
                  className="px-3 py-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50">
                  Limpar tudo
                </button>
              )}
              <div className="flex-1" />
              {stats && stats.storageUsed > 0 && (
                <span className="text-[11px] text-[var(--content-muted)]">
                  {formatBytes(stats.storageUsed)}
                </span>
              )}
              <button
                onClick={handleDownloadAll}
                disabled={!!downloading || downloadingAll}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {downloadingAll ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {downloadingAll ? 'Baixando...' : 'Baixar todas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
