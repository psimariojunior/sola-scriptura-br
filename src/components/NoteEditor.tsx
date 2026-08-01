'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check, FileText, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { saveNote, getNote, exportNoteAsText, type SeminaryNote } from '@/lib/seminaryNotes';

interface NoteEditorProps {
  lessonId: string;
  existingNote?: SeminaryNote;
  className?: string;
}

export function NoteEditor({ lessonId, existingNote, className }: NoteEditorProps) {
  const [text, setText] = useState(existingNote?.text ?? '');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (existingNote) {
      setText(existingNote.text);
      return;
    }
    const note = getNote(lessonId);
    if (note) setText(note.text);
  }, [lessonId, existingNote]);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [text]);

  const debouncedSave = useCallback(
    (value: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        saveNote(lessonId, value);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }, 1000);
    },
    [lessonId]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        const node = textareaRef.current;
        const text = node?.value;
        if (text) saveNote(lessonId, text);
      }
    };
  }, [lessonId]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setText(value);
      debouncedSave(value);
    },
    [debouncedSave]
  );

  const handleCopy = useCallback(async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleExport = useCallback(() => {
    const note: SeminaryNote = {
      lessonId,
      text,
      createdAt: existingNote?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const exported = exportNoteAsText(note);
    const blob = new Blob([exported], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nota-${lessonId.replace(/\s+/g, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }, [lessonId, text, existingNote]);

  return (
    <div className={cn('flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-raised)]', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[var(--brand-default)]" />
          <span className="text-sm font-medium text-[var(--content-primary)]">Minhas Anotações</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[var(--content-muted)]">
          <Hash className="w-3 h-3" />
          <span>{wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}</span>
          {saved && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[var(--accent-success)] font-medium"
            >
              Salvo
            </motion.span>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Escreva suas anotações sobre esta aula aqui..."
          className={cn(
            'w-full min-h-[200px] resize-y rounded-lg border-0 bg-transparent',
            'text-[var(--content-primary)] placeholder:text-[var(--content-muted)]',
            'text-sm leading-relaxed focus:outline-none focus:ring-0',
            'font-sans'
          )}
          style={{
            background: 'var(--surface-sunken)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
        <div className="text-[10px] text-[var(--content-muted)]">
          Salvo automaticamente
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!text.trim()}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              'border border-[var(--border)] bg-[var(--surface-raised)]',
              'hover:bg-[var(--surface-sunken)] disabled:opacity-40 disabled:cursor-not-allowed',
              copied && 'border-[var(--accent-success)]/30'
            )}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[var(--accent-success)]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[var(--content-muted)]" />
            )}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <button
            onClick={handleExport}
            disabled={!text.trim()}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              'bg-[var(--brand-default)] text-[var(--brand-contrast)]',
              'hover:bg-[var(--brand-hover)] disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            <Download className="w-3.5 h-3.5" />
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
}
