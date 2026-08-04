'use client';

import { useState, useEffect, useCallback } from 'react';
import { StickyNote, BookOpen, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotaEditor } from '@/components/NotaEditor';
import type { UseBibliaUIReturn } from '@/hooks/biblia/useBibliaUI';
import type { UseBibliaVerseReturn } from '@/hooks/biblia/useBibliaVerse';

interface SplitNotesPanelProps {
  verse: UseBibliaVerseReturn;
  ui: UseBibliaUIReturn;
}

interface Nota {
  id: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string;
  dataAtualizacao: string;
  tags: string[];
  imagens: string[];
  versoes: { conteudo: string; data: string }[];
}

const STORAGE_KEY = 'ssb_split_notes';

export function SplitNotesPanel({ verse, ui }: SplitNotesPanelProps) {
  const [nota, setNota] = useState<Nota | null>(null);
  const [activeTab, setActiveTab] = useState<'notes' | 'study'>('notes');

  const verseKey = verse.versiculoSelecionado
    ? `${verse.versiculoSelecionado.livroAbreviacao}:${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}:${verse.versiculoSelecionado.traducao}`
    : null;

  // Load note for selected verse
  useEffect(() => {
    if (!verseKey) {
      setNota(null);
      return;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const notes: Record<string, Nota> = JSON.parse(saved);
        if (notes[verseKey]) {
          setNota(notes[verseKey]);
          return;
        }
      }
    } catch {}
    // Create new note
    setNota({
      id: crypto.randomUUID(),
      titulo: verse.versiculoSelecionado
        ? `${verse.versiculoSelecionado.livroNome} ${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}`
        : '',
      conteudo: '',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      tags: [],
      imagens: [],
      versoes: [],
    });
  }, [verseKey]);

  const handleSalvar = useCallback((notaAtualizada: Nota) => {
    if (!verseKey) return;
    setNota(notaAtualizada);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const notes: Record<string, Nota> = saved ? JSON.parse(saved) : {};
      notes[verseKey] = notaAtualizada;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {}
  }, [verseKey]);

  const ref = verse.versiculoSelecionado
    ? `${verse.versiculoSelecionado.livroNome} ${verse.versiculoSelecionado.capitulo}:${verse.versiculoSelecionado.versiculo}`
    : null;

  return (
    <div className="flex flex-col h-full border-l border-[var(--border)]/40 bg-[var(--surface-raised)]/50">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]/30">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <StickyNote className="w-4 h-4 text-[var(--brand-default)] shrink-0" />
          <span className="text-sm font-medium text-[var(--content-primary)] truncate">
            {ref || 'Nenhum versículo selecionado'}
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-[var(--border)]/30">
        <button
          onClick={() => setActiveTab('notes')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors',
            activeTab === 'notes'
              ? 'text-[var(--brand-default)] border-b-2 border-[var(--brand-default)]'
              : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          <StickyNote className="w-3.5 h-3.5" />
          Notas
        </button>
        <button
          onClick={() => setActiveTab('study')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors',
            activeTab === 'study'
              ? 'text-[var(--brand-default)] border-b-2 border-[var(--brand-default)]'
              : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Estudo IA
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!verse.versiculoSelecionado ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <StickyNote className="w-10 h-10 text-[var(--content-muted)]/30 mb-3" strokeWidth={1} />
            <p className="text-sm text-[var(--content-muted)]">
              Selecione um versículo para adicionar notas
            </p>
            <p className="text-xs text-[var(--content-muted)]/60 mt-1">
              Clique em qualquer verso ao lado
            </p>
          </div>
        ) : activeTab === 'notes' ? (
          nota && (
            <NotaEditor
              nota={nota}
              onSalvar={handleSalvar}
              autoSalvar={true}
            />
          )
        ) : (
          <div className="p-4">
            <a
              href={`/estudo-ia?ref=${encodeURIComponent(ref || '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-medium text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Estudar com IA
            </a>
            <p className="text-xs text-[var(--content-muted)] mt-3">
              Abra o estudo completo com IA para este versículo em uma nova aba.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
