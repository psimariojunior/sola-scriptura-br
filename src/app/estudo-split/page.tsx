'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, FileText, SplitSquareHorizontal, Download, Maximize2, Minimize2 } from 'lucide-react';
import { BibleBrowser } from '@/components/BibleBrowser';
import { NotaEditor, type Nota } from '@/components/NotaEditor';
import { cn } from '@/lib/utils';

export default function EstudoPage() {
  const [nota, setNota] = useState<Nota | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<'bible' | 'notes' | null>(null);
  const [currentVerse, setCurrentVerse] = useState<{ ref: string; text: string } | null>(null);

  const handleVerseSelect = useCallback((ref: string, text: string) => {
    setCurrentVerse({ ref, text });
    // Auto-create note with verse reference
    if (!nota) {
      setNota({
        id: crypto.randomUUID(),
        titulo: ref,
        conteudo: `<p>${text}</p><p><br></p>`,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        tags: ['Estudo'],
        imagens: [],
        versoes: [],
      });
    }
  }, [nota]);

  const handleSaveNota = useCallback((n: Nota) => {
    setNota(n);
    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('ssb_notas_rich') || '[]');
      const idx = existing.findIndex((x: Nota) => x.id === n.id);
      if (idx >= 0) existing[idx] = n; else existing.push(n);
      localStorage.setItem('ssb_notas_rich', JSON.stringify(existing));
    } catch {}
  }, []);

  const exportNotes = useCallback(() => {
    if (!nota) return;
    const content = `
      <h1>${nota.titulo}</h1>
      <p><em>Criado em: ${new Date(nota.dataCriacao).toLocaleDateString('pt-BR')}</em></p>
      <hr>
      ${nota.conteudo}
    `;
    const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${nota.titulo}</title><style>body{font-family:serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.8;color:#333}h1{color:#8B6914}hr{border:1px solid #ddd}</style></head><body>${content}</body></html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estudo-${nota.titulo.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [nota]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-0 h-screen flex flex-col">
        {/* Toolbar */}
        <div className="px-4 py-2 border-b border-border/40 bg-background/95 backdrop-blur z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <h1 className="font-display text-lg font-light">Modo <span className="text-primary italic">Estudo</span></h1>
            </div>
            <div className="flex items-center gap-2">
              {nota && (
                <button onClick={exportNotes}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted/50">
                  <Download className="w-3.5 h-3.5" /> Exportar
                </button>
              )}
              <button onClick={() => setIsFullscreen(isFullscreen ? null : 'bible')}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Bible Panel */}
          <div className={cn('border-r border-border/40 overflow-hidden flex flex-col',
            isFullscreen === 'bible' ? 'w-full' : isFullscreen === 'notes' ? 'hidden' : 'w-1/2')}>
            <BibleBrowser
              onPresentVerse={(ref, text) => handleVerseSelect(ref as string, text)}
              onShareVerses={() => {}}
              showPresentButton={false}
            />
          </div>

          {/* Resize Handle */}
          {!isFullscreen && (
            <div className="w-1 bg-border/40 hover:bg-primary/50 cursor-col-resize transition-colors flex-shrink-0"
              title="Arrastar para redimensionar" />
          )}

          {/* Notes Panel */}
          <div className={cn('overflow-hidden flex flex-col',
            isFullscreen === 'notes' ? 'w-full' : isFullscreen === 'bible' ? 'hidden' : 'w-1/2')}>
            <div className="px-4 py-2 border-b border-border/40 bg-background/50 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Notas de Estudo</span>
              {currentVerse && (
                <span className="text-xs text-muted-foreground ml-auto">{currentVerse.ref}</span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {nota ? (
                <NotaEditor nota={nota} onSalvar={handleSaveNota} autoSalvar={true} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="text-sm text-muted-foreground">Clique em um versículo na Bíblia para começar a estudar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
