'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Trash2, Edit3, Check, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SharedNote {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  verseRef?: string;
  timestamp: number;
  color: string;
}

interface SharedNotesProps {
  notes: SharedNote[];
  currentUserId: string;
  onAdd: (content: string, verseRef?: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
  colors?: string[];
}

const NOTE_COLORS = [
  'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
  'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
  'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
  'bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-800',
  'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
  'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
];

export function SharedNotes({
  notes,
  currentUserId,
  onAdd,
  onDelete,
  onUpdate,
  colors = NOTE_COLORS,
}: SharedNotesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newVerseRef, setNewVerseRef] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAdd = () => {
    if (!newContent.trim()) return;
    onAdd(newContent.trim(), newVerseRef.trim() || undefined);
    setNewContent('');
    setNewVerseRef('');
    setIsAdding(false);
  };

  const handleUpdate = (id: string) => {
    if (!editContent.trim()) return;
    onUpdate(id, editContent.trim());
    setEditingId(null);
    setEditContent('');
  };

  const startEdit = (note: SharedNote) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-[var(--brand)]" />
          <span className="font-medium text-sm">Notas Compartilhadas</span>
          <span className="text-[10px] text-[var(--content-muted)] bg-[var(--surface-raised)] px-1.5 py-0.5 rounded-full">
            {notes.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="h-7 text-xs"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Nova nota
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="rounded-xl border border-[var(--brand)]/30 bg-[var(--surface-raised)] p-3 space-y-2"
              >
                <Input
                  placeholder="Referência (ex: João 3:16)"
                  value={newVerseRef}
                  onChange={(e) => setNewVerseRef(e.target.value)}
                  className="h-8 text-xs"
                />
                <Textarea
                  placeholder="Escreva sua nota aqui..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="min-h-[80px] text-sm resize-none"
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setIsAdding(false); setNewContent(''); setNewVerseRef(''); }}
                    className="h-7 text-xs"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAdd}
                    disabled={!newContent.trim()}
                    className="h-7 text-xs bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Salvar
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {notes.length === 0 && !isAdding ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center mb-3">
                <StickyNote className="w-6 h-6 text-[var(--brand)]" strokeWidth={1.5} />
              </div>
              <p className="text-xs text-[var(--content-muted)]">
                Nenhuma nota ainda. Adicione uma nota para compartilhar com o grupo.
              </p>
            </div>
          ) : (
            notes.map((note, idx) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  'rounded-xl border p-3',
                  colors[idx % colors.length]
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[var(--brand)]/20 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-[var(--brand)]">
                        {note.authorName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-[var(--content-muted)]">
                      {note.authorId === currentUserId ? 'Você' : note.authorName}
                    </span>
                    {note.verseRef && (
                      <span className="text-[10px] text-[var(--brand)] bg-[var(--brand)]/10 px-1.5 py-0.5 rounded">
                        {note.verseRef}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--content-muted)]">
                    {new Date(note.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {editingId === note.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[60px] text-sm resize-none"
                      autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="h-6 text-[10px]">
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={() => handleUpdate(note.id)} className="h-6 text-[10px] bg-[var(--brand)] text-white">
                        Salvar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--content-primary)] whitespace-pre-wrap">{note.content}</p>
                )}

                {note.authorId === currentUserId && editingId !== note.id && (
                  <div className="flex gap-1 mt-2 justify-end">
                    <button
                      onClick={() => startEdit(note)}
                      className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <Edit3 className="w-3 h-3 text-[var(--content-muted)]" />
                    </button>
                    <button
                      onClick={() => onDelete(note.id)}
                      className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
