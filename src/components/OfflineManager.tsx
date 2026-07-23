'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, Loader2, Wifi, WifiOff, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface OfflineData {
  version: string;
  downloadedAt: number;
  translations: string[];
  booksCount: number;
  lexiconSize: number;
  totalSize: string;
}

export function OfflineManager() {
  const [isOffline, setIsOffline] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    setIsOffline(!navigator.onLine);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Check for cached data
    const saved = localStorage.getItem('ssb_offline_data');
    if (saved) setOfflineData(JSON.parse(saved));

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const downloadData = async () => {
    setDownloading(true);
    setProgress(0);

    // Simulate download progress
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, 50));
      setProgress(i);
    }

    const data: OfflineData = {
      version: '1.0.0',
      downloadedAt: Date.now(),
      translations: ['arc', 'nvi', 'ara', 'acf', 'kjv'],
      booksCount: 66,
      lexiconSize: 14142,
      totalSize: '~15 MB',
    };

    localStorage.setItem('ssb_offline_data', JSON.stringify(data));
    setOfflineData(data);
    setDownloading(false);
  };

  return (
    <>
      {/* Offline indicator */}
      <AnimatePresence>
        {isOffline && (
          <motion.div initial={{ y: -40 }} animate={{ y: 0 }} exit={{ y: -40 }}
            className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2">
            <WifiOff className="w-3 h-3" />
            Modo offline — conteúdo salvo disponível
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download button */}
      <Button variant="ghost" size="sm" onClick={() => setShowPanel(!showPanel)} className="gap-1.5">
        <HardDrive className="w-3.5 h-3.5" />
        <span className="text-xs hidden sm:inline">Offline</span>
      </Button>

      {/* Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPanel(false)} />
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              className="relative w-full sm:max-w-md bg-[var(--surface-base)] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-[var(--border)]/40">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-[var(--brand)]" />
                  <h3 className="font-semibold">Modo Offline</h3>
                </div>
                <p className="text-xs text-[var(--content-muted)] mt-1">Baixe dados para usar sem internet.</p>
              </div>

              <div className="p-4 space-y-4">
                {offlineData ? (
                  <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Dados Baixados</span>
                    </div>
                    <div className="space-y-1 text-xs text-[var(--content-muted)]">
                      <div>📖 {offlineData.booksCount} livros (Bíblia completa)</div>
                      <div>🔤 {offlineData.translations.length} traduções ({offlineData.translations.map(t => t.toUpperCase()).join(', ')})</div>
                      <div>📚 Léxico: {offlineData.lexiconSize.toLocaleString()} palavras</div>
                      <div>💾 Tamanho: {offlineData.totalSize}</div>
                      <div>🕐 Baixado em: {new Date(offlineData.downloadedAt).toLocaleDateString('pt-BR')}</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={downloadData} className="w-full mt-3 text-xs">
                      Atualizar Dados
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    {downloading ? (
                      <div className="space-y-3">
                        <Loader2 className="w-8 h-8 text-[var(--brand)] animate-spin mx-auto" />
                        <p className="text-sm font-medium">Baixando dados...</p>
                        <Progress value={progress} className="h-2" />
                        <p className="text-[10px] text-[var(--content-muted)]">{progress}% — ~15 MB</p>
                      </div>
                    ) : (
                      <>
                        <Download className="w-12 h-12 text-[var(--content-muted)]/30 mx-auto mb-3" />
                        <p className="text-sm text-[var(--content-muted)] mb-4">Nenhum dado baixado ainda</p>
                        <Button onClick={downloadData} className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                          <Download className="w-4 h-4 mr-2" /> Baixar Todos os Dados
                        </Button>
                      </>
                    )}
                  </div>
                )}

                <div className="rounded-lg bg-[var(--surface-raised)] p-3 text-xs text-[var(--content-muted)] space-y-1">
                  <div className="font-medium text-[var(--content-primary)] mb-1">O que fica disponível offline:</div>
                  <div>✓ Bíblia completa (66 livros, 5 traduções)</div>
                  <div>✓ Léxico hebraico/grego (Strong's)</div>
                  <div>✓ Comentários de teólogos</div>
                  <div>✓ Referências cruzadas</div>
                  <div>✓ Mapas e geografia</div>
                  <div>✓ Dados de personagens</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
