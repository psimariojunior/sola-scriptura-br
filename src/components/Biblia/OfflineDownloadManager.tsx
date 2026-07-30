'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Download, Check, X, Trash2, HardDrive, ChevronRight, ChevronLeft,
  BookOpen, Library, Loader2, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  cacheTranslation, removeTranslation, isTranslationDownloaded, getOfflineStats,
  cacheBook, cacheTestament, getBookDownloadStatus, removeBook,
  type BookDownloadStatus,
} from '@/lib/offline';
import { LIVROS_AT, LIVROS_NT, TODOS_LIVROS } from '@/data/biblia/livros';

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

type View = 'translations' | 'books';

export function OfflineDownloadManager({ open, onClose }: OfflineDownloadManagerProps) {
  const [view, setView] = useState<View>('translations');
  const [selectedTranslation, setSelectedTranslation] = useState<TranslationInfo | null>(null);
  const [downloadedTranslations, setDownloadedTranslations] = useState<Record<string, boolean>>({});
  const [bookStatuses, setBookStatuses] = useState<BookDownloadStatus[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, book: '', chapter: '' });
  const [stats, setStats] = useState<{ totalChapters: number; totalTranslations: number; storageUsed: number } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadTranslationStats = useCallback(async () => {
    const s = await getOfflineStats();
    setStats(s);
    const d: Record<string, boolean> = {};
    for (const t of ALL_TRANSLATIONS) {
      d[t.id] = await isTranslationDownloaded(t.id);
    }
    setDownloadedTranslations(d);
  }, []);

  const loadBookStatuses = useCallback(async (traducao: string) => {
    const statuses = await getBookDownloadStatus(traducao);
    setBookStatuses(statuses);
  }, []);

  useEffect(() => {
    if (open) loadTranslationStats();
  }, [open, loadTranslationStats]);

  const handleSelectTranslation = useCallback(async (t: TranslationInfo) => {
    if (t.type === 'api') return;
    setSelectedTranslation(t);
    setView('books');
    await loadBookStatuses(t.id);
  }, [loadBookStatuses]);

  const handleDownloadFull = useCallback(async (traducao: string, type: 'local' | 'api') => {
    if (downloading) return;
    setDownloading(traducao);
    setProgress({ current: 0, total: 0, book: '', chapter: '' });
    abortRef.current = new AbortController();

    try {
      if (type === 'local') {
        await cacheTranslation(traducao, (current, total) => {
          setProgress({ current, total, book: traducao.toUpperCase(), chapter: '' });
        });
      }
      setDownloadedTranslations(prev => ({ ...prev, [traducao]: true }));
      if (selectedTranslation?.id === traducao) {
        await loadBookStatuses(traducao);
      }
    } catch {}

    setDownloading(null);
    setProgress({ current: 0, total: 0, book: '', chapter: '' });
    loadTranslationStats();
  }, [downloading, selectedTranslation, loadBookStatuses, loadTranslationStats]);

  const handleDownloadBook = useCallback(async (bookAbrev: string) => {
    if (!selectedTranslation || downloading) return;
    setDownloading(bookAbrev);
    setProgress({ current: 0, total: 0, book: '', chapter: '' });

    const book = TODOS_LIVROS.find(b => b.abreviacao === bookAbrev);
    await cacheBook(selectedTranslation.id, bookAbrev, (current, total) => {
      setProgress({ current, total, book: book?.nome || bookAbrev, chapter: `${current}/${total} capítulos` });
    });

    setDownloading(null);
    setProgress({ current: 0, total: 0, book: '', chapter: '' });
    await loadBookStatuses(selectedTranslation.id);
    loadTranslationStats();
  }, [selectedTranslation, downloading, loadBookStatuses, loadTranslationStats]);

  const handleDownloadTestament = useCallback(async (testamento: 'AT' | 'NT') => {
    if (!selectedTranslation || downloading) return;
    const label = testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento';
    setDownloading(`testament-${testamento}`);
    setProgress({ current: 0, total: 0, book: label, chapter: '' });

    await cacheTestament(selectedTranslation.id, testamento, (book, current, total) => {
      setProgress({ current, total, book: label, chapter: book });
    });

    setDownloading(null);
    setProgress({ current: 0, total: 0, book: '', chapter: '' });
    await loadBookStatuses(selectedTranslation.id);
    loadTranslationStats();
  }, [selectedTranslation, downloading, loadBookStatuses, loadTranslationStats]);

  const handleRemoveBook = useCallback(async (bookAbrev: string) => {
    if (!selectedTranslation) return;
    await removeBook(selectedTranslation.id, bookAbrev);
    await loadBookStatuses(selectedTranslation.id);
    loadTranslationStats();
  }, [selectedTranslation, loadBookStatuses, loadTranslationStats]);

  const handleRemoveTranslation = useCallback(async (traducao: string) => {
    await removeTranslation(traducao);
    setDownloadedTranslations(prev => ({ ...prev, [traducao]: false }));
    if (selectedTranslation?.id === traducao) {
      await loadBookStatuses(traducao);
    }
    loadTranslationStats();
  }, [selectedTranslation, loadBookStatuses, loadTranslationStats]);

  const handleBack = useCallback(() => {
    setView('translations');
    setSelectedTranslation(null);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const localTranslations = ALL_TRANSLATIONS.filter(t => t.type === 'local');
  const apiTranslations = ALL_TRANSLATIONS.filter(t => t.type === 'api');
  const downloadedCount = Object.values(downloadedTranslations).filter(Boolean).length;

  const atDownloaded = bookStatuses.filter(b => LIVROS_AT.some(at => at.abreviacao === b.abreviacao) && b.isComplete).length;
  const ntDownloaded = bookStatuses.filter(b => LIVROS_NT.some(nt => nt.abreviacao === b.abreviacao) && b.isComplete).length;
  const atTotal = LIVROS_AT.length;
  const ntTotal = LIVROS_NT.length;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg max-h-[85vh] bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                {view === 'books' && (
                  <button onClick={handleBack}
                    className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-bold text-[var(--content-primary)] flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-[var(--brand-default)]" />
                    {view === 'translations' ? 'Versões Disponíveis' : selectedTranslation?.name}
                  </h2>
                  <p className="text-xs text-[var(--content-muted)] mt-0.5">
                    {view === 'translations'
                      ? `${downloadedCount}/${ALL_TRANSLATIONS.length} baixadas${stats ? ` · ${formatBytes(stats.storageUsed)}` : ''}`
                      : `${bookStatuses.filter(b => b.isComplete).length}/${TODOS_LIVROS.length} livros baixados`
                    }
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            {downloading && (
              <div className="px-4 py-3 bg-[var(--brand-subtle)] border-b border-[var(--border)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[var(--brand-default)] flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Baixando {progress.book}...
                  </span>
                  <button onClick={() => abortRef.current?.abort()}
                    className="text-xs text-red-500 hover:text-red-600 font-medium">
                    Cancelar
                  </button>
                </div>
                <div className="w-full h-2 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--brand-default)] rounded-full transition-all duration-300"
                    style={{ width: progress.total > 0 ? `${(progress.current / progress.total) * 100}%` : '0%' }} />
                </div>
                <p className="text-[10px] text-[var(--content-muted)] mt-1">
                  {progress.current} de {progress.total} capítulos
                  {progress.chapter ? ` · ${progress.chapter}` : ''}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {view === 'translations' ? (
                <TranslationList
                  localTranslations={localTranslations}
                  apiTranslations={apiTranslations}
                  downloadedTranslations={downloadedTranslations}
                  downloading={downloading}
                  onSelectTranslation={handleSelectTranslation}
                  onDownload={handleDownloadFull}
                  onRemove={handleRemoveTranslation}
                />
              ) : selectedTranslation ? (
                <BookGrid
                  translation={selectedTranslation}
                  bookStatuses={bookStatuses}
                  downloading={downloading}
                  atDownloaded={atDownloaded}
                  ntDownloaded={ntDownloaded}
                  atTotal={atTotal}
                  ntTotal={ntTotal}
                  onDownloadBook={handleDownloadBook}
                  onRemoveBook={handleRemoveBook}
                  onDownloadTestament={handleDownloadTestament}
                />
              ) : null}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-sunken)]/50">
              <p className="text-[10px] text-[var(--content-muted)] text-center">
                {view === 'translations'
                  ? 'Selecione uma versão para ver os livros disponíveis'
                  : 'Toque nos livros para baixar individualmente'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Translation List ──────────────────────────────────────────────

function TranslationList({
  localTranslations, apiTranslations, downloadedTranslations, downloading,
  onSelectTranslation, onDownload, onRemove,
}: {
  localTranslations: TranslationInfo[];
  apiTranslations: TranslationInfo[];
  downloadedTranslations: Record<string, boolean>;
  downloading: string | null;
  onSelectTranslation: (t: TranslationInfo) => void;
  onDownload: (id: string, type: 'local' | 'api') => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Local translations */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">
          Versões Locais ({localTranslations.length})
        </p>
        <div className="space-y-2">
          {localTranslations.map(t => (
            <TranslationRow key={t.id} translation={t} isDownloaded={!!downloadedTranslations[t.id]}
              isDownloading={downloading === t.id} onSelect={() => onSelectTranslation(t)}
              onDownload={() => onDownload(t.id, 'local')} onRemove={() => onRemove(t.id)}
              disabled={!!downloading} />
          ))}
        </div>
      </div>

      {/* API translations */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">
          Versões Online ({apiTranslations.length})
        </p>
        <div className="space-y-2">
          {apiTranslations.map(t => (
            <TranslationRow key={t.id} translation={t} isDownloaded={!!downloadedTranslations[t.id]}
              isDownloading={downloading === t.id} onSelect={() => {}}
              onDownload={() => onDownload(t.id, 'api')} onRemove={() => onRemove(t.id)}
              disabled={!!downloading} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Translation Row ───────────────────────────────────────────────

function TranslationRow({
  translation, isDownloaded, isDownloading, onSelect, onDownload, onRemove, disabled,
}: {
  translation: TranslationInfo;
  isDownloaded: boolean;
  isDownloading: boolean;
  onSelect: () => void;
  onDownload: () => void;
  onRemove: () => void;
  disabled: boolean;
}) {
  const isLocal = translation.type === 'local';
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
      <div className="shrink-0 flex items-center gap-1">
        {isDownloading ? (
          <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-default)] border-t-transparent animate-spin" />
        ) : isDownloaded ? (
          <>
            {isLocal && (
              <button onClick={onSelect}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-sunken)] text-[var(--content-primary)] hover:bg-[var(--brand-subtle)] transition-all">
                <BookOpen className="w-3 h-3" />
                Livros
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
            <button onClick={onRemove}
              className="w-7 h-7 rounded-full hover:bg-red-500/10 flex items-center justify-center text-[var(--content-muted)] hover:text-red-500"
              title="Remover">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
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

// ── Book Grid (YouVersion-style) ─────────────────────────────────

function BookGrid({
  translation, bookStatuses, downloading, atDownloaded, ntDownloaded, atTotal, ntTotal,
  onDownloadBook, onRemoveBook, onDownloadTestament,
}: {
  translation: TranslationInfo;
  bookStatuses: BookDownloadStatus[];
  downloading: string | null;
  atDownloaded: number;
  ntDownloaded: number;
  atTotal: number;
  ntTotal: number;
  onDownloadBook: (abrev: string) => void;
  onRemoveBook: (abrev: string) => void;
  onDownloadTestament: (testamento: 'AT' | 'NT') => void;
}) {
  return (
    <div className="space-y-5">
      {/* Quick actions */}
      <div className="flex gap-2">
        <button onClick={() => onDownloadTestament('AT')} disabled={!!downloading || atDownloaded === atTotal}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] text-sm font-semibold text-[var(--content-primary)] hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 disabled:opacity-40 transition-all">
          <Library className="w-4 h-4 text-[var(--brand-default)]" />
          <div className="text-left">
            <p className="text-xs">Antigo Testamento</p>
            <p className="text-[10px] text-[var(--content-muted)] font-normal">{atDownloaded}/{atTotal} livros</p>
          </div>
        </button>
        <button onClick={() => onDownloadTestament('NT')} disabled={!!downloading || ntDownloaded === ntTotal}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] text-sm font-semibold text-[var(--content-primary)] hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30 disabled:opacity-40 transition-all">
          <Library className="w-4 h-4 text-[var(--brand-default)]" />
          <div className="text-left">
            <p className="text-xs">Novo Testamento</p>
            <p className="text-[10px] text-[var(--content-muted)] font-normal">{ntDownloaded}/{ntTotal} livros</p>
          </div>
        </button>
      </div>

      {/* Antigo Testamento */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">
          Antigo Testamento
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {LIVROS_AT.map(book => {
            const status = bookStatuses.find(b => b.abreviacao === book.abreviacao);
            const isComplete = status?.isComplete ?? false;
            const isDownloadingThis = downloading === book.abreviacao;
            return (
              <BookTile key={book.abreviacao} book={book} isComplete={isComplete}
                isDownloading={isDownloadingThis} downloading={!!downloading}
                onDownload={() => onDownloadBook(book.abreviacao)}
                onRemove={() => onRemoveBook(book.abreviacao)} />
            );
          })}
        </div>
      </div>

      {/* Novo Testamento */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">
          Novo Testamento
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {LIVROS_NT.map(book => {
            const status = bookStatuses.find(b => b.abreviacao === book.abreviacao);
            const isComplete = status?.isComplete ?? false;
            const isDownloadingThis = downloading === book.abreviacao;
            return (
              <BookTile key={book.abreviacao} book={book} isComplete={isComplete}
                isDownloading={isDownloadingThis} downloading={!!downloading}
                onDownload={() => onDownloadBook(book.abreviacao)}
                onRemove={() => onRemoveBook(book.abreviacao)} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Book Tile ─────────────────────────────────────────────────────

function BookTile({
  book, isComplete, isDownloading, downloading, onDownload, onRemove,
}: {
  book: { nome: string; abreviacao: string; totalCapitulos: number };
  isComplete: boolean;
  isDownloading: boolean;
  downloading: boolean;
  onDownload: () => void;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={isComplete ? onRemove : onDownload}
      disabled={downloading && !isDownloading}
      className={cn(
        'relative flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all min-h-[72px]',
        isDownloading
          ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)]'
          : isComplete
            ? 'border-green-500/30 bg-green-500/5 hover:bg-red-500/5 hover:border-red-500/30'
            : 'border-[var(--border)] bg-[var(--surface-raised)] hover:bg-[var(--brand-subtle)] hover:border-[var(--brand-default)]/30',
        downloading && !isDownloading && 'opacity-40'
      )}
      title={isComplete ? `Remover ${book.nome}` : `Baixar ${book.nome}`}
    >
      {isDownloading ? (
        <Loader2 className="w-4 h-4 text-[var(--brand-default)] animate-spin mb-1" />
      ) : isComplete ? (
        <CheckCircle2 className="w-4 h-4 text-green-500 mb-1" />
      ) : (
        <Download className="w-4 h-4 text-[var(--content-muted)] mb-1" />
      )}
      <span className={cn(
        'text-[10px] font-semibold leading-tight',
        isComplete ? 'text-green-600' : 'text-[var(--content-primary)]'
      )}>
        {book.nome.length > 10 ? book.nome.slice(0, 9) + '…' : book.nome}
      </span>
      <span className="text-[8px] text-[var(--content-muted)] mt-0.5">
        {book.totalCapitulos} cap.
      </span>
    </button>
  );
}
