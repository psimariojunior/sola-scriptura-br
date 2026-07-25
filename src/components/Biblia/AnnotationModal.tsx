'use client';

import { useState, useEffect } from 'react';

interface AnnotationModalProps {
  open: boolean;
  verseKey: string | null;
  initialText?: string;
  onClose: () => void;
  onSave: (texto: string) => void;
}

export function AnnotationModal({ open, verseKey, initialText = '', onClose, onSave }: AnnotationModalProps) {
  const [texto, setTexto] = useState(initialText);

  useEffect(() => {
    setTexto(initialText);
  }, [initialText, verseKey]);

  if (!open || !verseKey) return null;

  return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
        onClick={onClose}
      >
        <div
          className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in"
          onClick={e => e.stopPropagation()}
        >
          <h3 className="font-display text-lg font-medium mb-1">Anotação</h3>
          <p className="text-xs text-[var(--content-muted)] mb-4">{verseKey}</p>
          <textarea value={texto} onChange={e => setTexto(e.target.value)}
            placeholder="Digite sua anotação pessoal..."
            className="w-full h-32 p-3 text-sm bg-[var(--surface-sunken)] border border-[var(--border)] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 transition-all" autoFocus />
          <div className="flex items-center justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 text-sm text-[var(--content-muted)] hover:text-[var(--content-primary)]">Cancelar</button>
            <button onClick={() => onSave(texto)}
              className="px-4 py-2 text-sm font-semibold bg-[var(--brand-default)] text-[var(--brand-contrast)] rounded-lg hover:bg-[var(--brand-hover)] active:scale-98 transition-transform">
              Salvar
            </button>
          </div>
        </div>
      </div>
  );
}