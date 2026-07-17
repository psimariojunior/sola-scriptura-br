'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, BookOpen, Loader2, Check, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportChapterPdf } from '@/lib/exportPdf';
import { exportChapterEpub } from '@/lib/exportEpub';
import type { CapituloComparado } from '@/data/biblia';

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
  bookName: string;
  chapter: number;
  data: CapituloComparado[];
}

type Formato = 'pdf' | 'epub';

export function ExportModal({ open, onClose, bookName, chapter, data }: ExportModalProps) {
  const [formato, setFormato] = useState<Formato>('pdf');
  const [processando, setProcessando] = useState(false);
  const [concluido, setConcluido] = useState(false);

  const traducoes = data.map(d => d.traducao);

  async function fazerExportacao() {
    if (data.length === 0) return;
    setProcessando(true);
    setConcluido(false);
    try {
      if (formato === 'pdf') {
        if (data.length === 1) {
          const v = data[0].versiculos.map(vs => ({ numero: vs.numero, texto: vs.texto }));
          await exportChapterPdf(bookName, chapter, [{ traducao: data[0].traducao, versiculos: v }]);
        } else {
          await exportChapterPdf(bookName, chapter, data.map(d => ({
            traducao: d.traducao,
            versiculos: d.versiculos.map(vs => ({ numero: vs.numero, texto: vs.texto })),
          })));
        }
      } else {
        const principal = data[0];
        await exportChapterEpub(
          bookName,
          chapter,
          principal.versiculos.map(vs => ({ numero: vs.numero, texto: vs.texto })),
          principal.traducao
        );
      }
      setConcluido(true);
      setTimeout(() => onClose(), 1200);
    } finally {
      setProcessando(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <h2 className="font-display text-lg font-semibold text-[var(--content-primary)]">
                Exportar {bookName} {chapter}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--content-tertiary)] mb-2">
                  Formato
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <FormatCard
                    active={formato === 'pdf'}
                    onClick={() => setFormato('pdf')}
                    icon={FileText}
                    title="PDF"
                    desc="Documento para impressão"
                  />
                  <FormatCard
                    active={formato === 'epub'}
                    onClick={() => setFormato('epub')}
                    icon={BookOpen}
                    title="EPUB"
                    desc="E-book para leitores"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--content-tertiary)] mb-2">
                  Traduções incluídas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {traducoes.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-subtle)] text-[var(--brand-default)]"
                    >
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-4 border-t border-[var(--border)] bg-[var(--surface-sunken)]/40">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={fazerExportacao}
                disabled={processando || data.length === 0}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-[var(--brand-contrast)] bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] shadow-md transition-all',
                  processando || data.length === 0 ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
                )}
              >
                {processando ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Exportando…</>
                ) : concluido ? (
                  <><Check className="w-4 h-4" /> Pronto!</>
                ) : (
                  <><Download className="w-4 h-4" /> Exportar {formato.toUpperCase()}</>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormatCard({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof FileText;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
        active
          ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)]'
          : 'border-[var(--border)] hover:bg-[var(--surface-sunken)]'
      )}
    >
      <Icon className={cn('w-5 h-5', active ? 'text-[var(--brand-default)]' : 'text-[var(--content-tertiary)]')} />
      <div>
        <p className={cn('text-sm font-bold', active ? 'text-[var(--brand-default)]' : 'text-[var(--content-primary)]')}>
          {title}
        </p>
        <p className="text-xs text-[var(--content-tertiary)]">{desc}</p>
      </div>
    </button>
  );
}
