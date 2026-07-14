'use client';

import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

function PanelFallback() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0s]" />
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

interface NotesPanelSectionProps {
  open: boolean;
  onClose: () => void;
  notas: any[];
  notaAtiva: any;
  onSalvar: (nota: any) => void;
  onExcluir: (id: string) => void;
}

export function NotesPanelSection({ open, onClose, notas, notaAtiva, onSalvar, onExcluir }: NotesPanelSectionProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[var(--border)]/40 bg-[var(--surface-raised)] p-4 max-w-[720px] mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--brand-default)]" />
              <h3 className="text-sm font-semibold">Minhas Anotações</h3>
              <span className="text-[10px] px-1.5 py-0.5 bg-[var(--brand-subtle)] text-[var(--brand-default)] rounded-full">
                {notas.length}
              </span>
            </div>
            <button onClick={onClose} className="p-1 rounded hover:bg-[var(--surface-sunken)]" aria-label="Fechar notas">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <Suspense fallback={<PanelFallback />}>
            {(() => {
              const NotaEditor = require('@/components/NotaEditor').NotaEditor as React.ComponentType<any>;
              return (
                <NotaEditor
                  key={notaAtiva?.id ?? 'new'}
                  nota={notaAtiva ?? undefined}
                  autoSalvar={true}
                  onSalvar={(nota: any) => onSalvar(nota)}
                  onExcluir={(id: string) => onExcluir(id)}
                />
              );
            })()}
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
