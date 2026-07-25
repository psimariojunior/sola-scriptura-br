'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, X, Trash2, Wifi, WifiOff, HardDrive, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  cacheTranslation,
  cacheAllTranslations,
  removeTranslation,
  isTranslationDownloaded,
  getOfflineStats,
  downloadApiTranslation,
  type TraducaoLocalId,
} from '@/lib/offline';

interface TranslationInfo {
  id: string;
  name: string;
  abbrev: string;
  type: 'local' | 'api';
  description?: string;
}

const ALL_TRANSLATIONS: TranslationInfo[] = [
  { id: 'arc', name: 'Actualização Revisada', abbrev: 'ARC', type: 'local', description: 'Tradição evangélica' },
  { id: 'nvi', name: 'Nova Versão Internacional', abbrev: 'NVI', type: 'local', description: 'Mais lida do mundo' },
  { id: 'ara', name: 'Atualizada', abbrev: 'ARA', type: 'local', description: 'Revisão da ACF' },
  { id: 'acf', name: 'Almeida Corrigida Fiel', abbrev: 'ACF', type: 'local', description: 'Clássica protestante' },
  { id: 'kjv', name: 'King James Version', abbrev: 'KJV', type: 'local', description: 'Inglês clássica' },
  { id: 'web', name: 'World English Bible', abbrev: 'WEB', type: 'local', description: 'Inglês público' },
  { id: 'ntlh', name: 'Nova Tradução na Linguagem de Hoje', abbrev: 'NTLH', type: 'api', description: 'Linguagem contemporânea' },
  { id: 'naa', name: 'Nova Almeida Atualizada', abbrev: 'NAA', type: 'api', description: 'Atualização da ARA' },
  { id: 'nvt', name: 'Nova Versão Transformadora', abbrev: 'NVT', type: 'api', description: 'Para estudantes' },
  { id: 'kja', name: 'King James Atualizada', abbrev: 'KJA', type: 'api', description: 'Atualização da KJV' },
  { id: 'aa', name: 'Bíblia Ampla', abbrev: 'AA', type: 'api', description: 'Linguagem ampla' },
  { id: 'nbv', name: 'Nova Bíblia Viva', abbrev: 'NBV', type: 'api', description: 'Para comunicação' },
  { id: 'as21', name: 'Almeida Século 21', abbrev: 'AS21', type: 'api', description: 'Moderna' },
  { id: 'jfaa', name: 'João Ferreira de Almeida', abbrev: 'JFAA', type: 'api', description: 'Revisão recente' },
  { id: 'esv', name: 'English Standard Version', abbrev: 'ESV', type: 'api', description: 'Inglês acadêmica' },
  { id: 'niv', name: 'New International Version', abbrev: 'NIV', type: 'api', description: 'Inglês popular' },
  { id: 'rvr1960', name: 'Reina-Valera 1960', abbrev: 'RVR1960', type: 'api', description: 'Espanhol clássica' },
  { id: 'lsg', name: 'Louis Segond', abbrev: 'LSG', type: 'api', description: 'Francês clássica' },
];

interface OfflineDownloadManagerProps {
  open: boolean;
  onClose: () => void;
}

export function OfflineDownloadManager({ open, onClose }: OfflineDownloadManagerProps) {
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, book: '' });
  const [stats, setStats] = useState<{ totalChapters: number; totalTranslations: number; storageUsed: number } | null>(null);
  const [showLocal, setShowLocal] = useState(true);
  const [showApi, setShowApi] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  const loadStats = useCallback(async () => {
    const s = await getOfflineStats();
    setStats(s);
    const d: Record<string, boolean> = {};
    for (const t of ALL_TRANSLATIONS) {
      d[t.id] = await isTranslationDownloaded(t.id);
    }
    setDownloaded(d);
  }, []);

  useEffect(() => {
    if (open) loadStats();
  }, [open, loadStats]);

  const handleDownload = useCallback(async (traducao: string, type: 'local' | 'api') => {
    if (downloading) return;
    setDownloading(traducao);
    setProgress({ current: 0, total: 0, book: '' });
    abortRef.current = new AbortController();

    try {
      if (type === 'local') {
        await cacheTranslation(traducao, (current, total) => {
          setProgress({ current, total, book: traducao.toUpperCase() });
        });
      } else {
        await downloadApiTranslation(traducao, (book, chapter, total) => {
          setProgress({ current: progress.current + 1, total, book: book.toUpperCase() });
        }, abortRef.current.signal);
      }
      setDownloaded(prev => ({ ...prev, [traducao]: true }));
    } catch {}

    setDownloading(null);
    setProgress({ current: 0, total: 0, book: '' });
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloading, progress.current, loadStats]);

  const handleRemove = useCallback(async (traducao: string) => {
    await removeTranslation(traducao);
    setDownloaded(prev => ({ ...prev, [traducao]: false }));
    loadStats();
  }, [loadStats]);

  const handleDownloadAll = useCallback(async () => {
    if (downloading) return;
    setDownloading('all');
    setProgress({ current: 0, total: 0, book: '' });
    abortRef.current = new AbortController();

    await cacheAllTranslations((trad, current, total) => {
      setProgress({ current, total, book: trad.toUpperCase() });
    });

    setDownloading(null);
    loadStats();
  }, [downloading, loadStats]);

  const handleCancel = useCallback(() => {
    abortRef.current?.abort();
    setDownloading(null);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const localTranslations = ALL_TRANSLATIONS.filter(t => t.type === 'local');
  const apiTranslations = ALL_TRANSLATIONS.filter(t => t.type === 'api');
  const downloadedCount = Object.values(downloaded).filter(Boolean).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg max-h-[85vh] bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div>
                <h2 className="text-lg font-bold text-[var(--content-primary)] flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-[var(--brand-default)]" />
                  Versões Disponíveis
                </h2>
                <p className="text-xs text-[var(--content-muted)] mt-0.5">
                  {downloadedCount}/{ALL_TRANSLATIONS.length} baixadas
                  {stats && ` · ${formatBytes(stats.storageUsed)} usados`}
                </p>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            {downloading && (
              <div className="px-4 py-3 bg-[var(--brand-subtle)] border-b border-[var(--border)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[var(--brand-default)]">
                    Baixando {progress.book}...
                  </span>
                  <button onClick={handleCancel} className="text-xs text-red-500 hover:text-red-600 font-medium">
                    Cancelar
                  </button>
                </div>
                <div className="w-full h-2 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--brand-default)] rounded-full transition-all duration-300"
                    style={{ width: progress.total > 0 ? `${(progress.current / progress.total) * 100}%` : '0%' }} />
                </div>
                <p className="text-[10px] text-[var(--content-muted)] mt-1">
                  {progress.current} de {progress.total} capítulos
                </p>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Download All button */}
              {!downloading && (
                <button onClick={handleDownloadAll}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold text-sm shadow-md hover:shadow-lg transition-shadow">
                  <Download className="w-4 h-4" />
                  Baixar Todas as Versões Locais
                </button>
              )}

              {/* Local translations */}
              <div>
                <button onClick={() => setShowLocal(!showLocal)} className="flex items-center gap-2 w-full text-left mb-2">
                  {showLocal ? <ChevronUp className="w-4 h-4 text-[var(--content-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--content-muted)]" />}
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)]">
                    Versões Locais ({localTranslations.length})
                  </span>
                  <span className="text-[10px] text-[var(--content-muted)] ml-1">~4 MB cada</span>
                </button>
                {showLocal && (
                  <div className="space-y-2">
                    {localTranslations.map(t => (
                      <TranslationRow key={t.id} translation={t} isDownloaded={!!downloaded[t.id]}
                        isDownloading={downloading === t.id} onDownload={() => handleDownload(t.id, 'local')}
                        onRemove={() => handleRemove(t.id)} disabled={!!downloading} />
                    ))}
                  </div>
                )}
              </div>

              {/* API translations */}
              <div>
                <button onClick={() => setShowApi(!showApi)} className="flex items-center gap-2 w-full text-left mb-2">
                  {showApi ? <ChevronUp className="w-4 h-4 text-[var(--content-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--content-muted)]" />}
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)]">
                    Versões Online ({apiTranslations.length})
                  </span>
                  <span className="text-[10px] text-[var(--content-muted)] ml-1">via API</span>
                </button>
                {showApi && (
                  <div className="space-y-2">
                    {apiTranslations.map(t => (
                      <TranslationRow key={t.id} translation={t} isDownloaded={!!downloaded[t.id]}
                        isDownloading={downloading === t.id} onDownload={() => handleDownload(t.id, 'api')}
                        onRemove={() => handleRemove(t.id)} disabled={!!downloading} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-sunken)]/50">
              <p className="text-[10px] text-[var(--content-muted)] text-center">
                Versões baixadas ficam disponíveis offline e carregam mais rápido
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TranslationRow({ translation, isDownloaded, isDownloading, onDownload, onRemove, disabled }: {
  translation: TranslationInfo;
  isDownloaded: boolean;
  isDownloading: boolean;
  onDownload: () => void;
  onRemove: () => void;
  disabled: boolean;
}) {
  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-xl border transition-all',
      isDownloaded ? 'border-green-500/30 bg-green-500/5' : 'border-[var(--border)] bg-[var(--surface-raised)]'
    )}>
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0',
        isDownloaded ? 'bg-green-500/10 text-green-600' : 'bg-[var(--surface-sunken)] text-[var(--content-muted)]'
      )}>
        {translation.abbrev}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--content-primary)] truncate">{translation.name}</p>
        <p className="text-[10px] text-[var(--content-muted)]">{translation.description}</p>
      </div>
      <div className="shrink-0">
        {isDownloading ? (
          <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-default)] border-t-transparent animate-spin" />
        ) : isDownloaded ? (
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-green-600" />
            </div>
            <button onClick={onRemove} className="w-6 h-6 rounded-full hover:bg-red-500/10 flex items-center justify-center text-[var(--content-muted)] hover:text-red-500"
              title="Remover">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button onClick={onDownload} disabled={disabled}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/20 disabled:opacity-40 transition-all">
            <Download className="w-3 h-3" />
            Baixar
          </button>
        )}
      </div>
    </div>
  );
}
