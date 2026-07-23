'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Share2, X, Search, MonitorPlay } from 'lucide-react';
import { carregarCapitulo, nomeLivro, totalCapitulos, TRADUCOES_APRESENTACAO } from '@/lib/apresentacao/versiculos';
import { type LivroInfo } from '@/data/biblia/livros';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { BookGridSkeleton, ChapterGridSkeleton, ChapterSkeleton } from '@/components/Skeleton';

interface BibleBrowserProps {
  onShareVerses?: (verses: { ref: string; text: string }[]) => void;
  onPresentVerse?: (ref: string, text: string) => void;
  syncData?: { livro: string; capitulo: number; traducao: string } | null;
  onNavigate?: (data: { livro: string; capitulo: number; traducao: string }) => void;
  isPresenter?: boolean;
  showPresentButton?: boolean;
}

const TESTAMENTOS = [
  { nome: 'Antigo Testamento', livros: [] as LivroInfo[] },
  { nome: 'Novo Testamento', livros: [] as LivroInfo[] },
];

export function BibleBrowser({ onShareVerses, onPresentVerse, syncData, onNavigate, isPresenter = true, showPresentButton = false }: BibleBrowserProps) {
  const [step, setStep] = useState<'books' | 'chapters' | 'verses'>('books');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [traducao, setTraducao] = useState<string>('nvi');
  const [versiculos, setVersiculos] = useState<{ numero: number; texto: string }[]>([]);
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [testamentos, setTestamentos] = useState(TESTAMENTOS);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load books
  useEffect(() => {
    import('@/data/biblia/livros').then(({ TODOS_LIVROS }) => {
      const at = TODOS_LIVROS.filter(l => l.testamento === 'AT');
      const nt = TODOS_LIVROS.filter(l => l.testamento === 'NT');
      setTestamentos([
        { nome: 'Antigo Testamento', livros: at },
        { nome: 'Novo Testamento', livros: nt },
      ]);
      setInitialLoad(false);
    });
  }, []);

  const loadChapter = useCallback(async (livro: string, cap: number, trad?: string) => {
    setLoading(true);
    try {
      const data = await carregarCapitulo(livro, cap, trad || traducao);
      setVersiculos(data);
      setSelectedVerses(new Set());
    } catch (e) {
      console.error('Erro ao carregar capítulo:', e);
      setVersiculos([]);
    } finally {
      setLoading(false);
    }
  }, [traducao]);

  // Sync from other users
  useEffect(() => {
    if (!syncData) return;
    setSelectedBook(syncData.livro);
    setSelectedChapter(syncData.capitulo);
    setTraducao(syncData.traducao);
    setStep('verses');
    loadChapter(syncData.livro, syncData.capitulo, syncData.traducao);
  }, [syncData, loadChapter]);

  const handleBookSelect = (book: LivroInfo) => {
    setSelectedBook(book.abreviacao);
    setSelectedChapter(null);
    setStep('chapters');
  };

  const handleChapterSelect = (cap: number) => {
    if (!selectedBook) return;
    setSelectedChapter(cap);
    setStep('verses');
    loadChapter(selectedBook, cap);
    onNavigate?.({ livro: selectedBook, capitulo: cap, traducao });
  };

  const handleTraducaoChange = (newTrad: string) => {
    setTraducao(newTrad);
    if (selectedBook && selectedChapter) {
      loadChapter(selectedBook, selectedChapter, newTrad);
      onNavigate?.({ livro: selectedBook, capitulo: selectedChapter, traducao: newTrad });
    }
  };

  const toggleVerse = (num: number) => {
    setSelectedVerses(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedVerses(new Set(versiculos.map(v => v.numero)));
  };

  const handleShare = () => {
    if (!selectedBook || !selectedChapter) return;
    const ref = `${nomeLivro(selectedBook)} ${selectedChapter}`;
    const verses = selectedVerses.size > 0
      ? Array.from(selectedVerses).sort((a, b) => a - b).map(num => {
          const v = versiculos.find(x => x.numero === num);
          return { ref: `${ref}:${num}`, text: v?.texto || '' };
        })
      : [{ ref, text: versiculos.map(v => `${v.numero}. ${v.texto}`).join('\n') }];
    onShareVerses?.(verses);
  };

  const goBack = () => {
    if (step === 'verses') {
      setStep('chapters');
      setSelectedChapter(null);
      setSelectedVerses(new Set());
    } else if (step === 'chapters') {
      setStep('books');
      setSelectedBook(null);
    }
  };

  const filteredBooks = testamentos.flatMap(t => t.livros).filter(l =>
    !searchTerm || l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.abreviacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-[var(--border)] flex items-center gap-2">
        {step !== 'books' && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <BookOpen className="h-4 w-4 text-[var(--brand)]" />
        <span className="font-medium text-sm flex-1">
          {initialLoad ? 'Carregando...' :
           step === 'books' ? 'Livros' :
           step === 'chapters' && selectedBook ? nomeLivro(selectedBook) :
           step === 'verses' && selectedBook && selectedChapter ? `${nomeLivro(selectedBook)} ${selectedChapter}` : ''}
        </span>
        <select
          value={traducao}
          onChange={(e) => handleTraducaoChange(e.target.value)}
          className="text-xs bg-[var(--bg-secondary)] border border-[var(--border)] rounded px-2 py-1"
        >
          {TRADUCOES_APRESENTACAO.map(t => (
            <option key={t} value={t}>{t.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {initialLoad ? (
          <BookGridSkeleton count={18} />
        ) : (
        <AnimatePresence mode="wait">
          {step === 'books' && (
            <motion.div
              key="books"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <div className="p-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
                  <Input
                    placeholder="Buscar livro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 h-8 text-xs"
                  />
                </div>
              </div>
              <ScrollArea className="h-[calc(100%-40px)]">
                {searchTerm ? (
                  <div className="grid grid-cols-3 gap-1 p-2">
                    {filteredBooks.map(book => (
                      <button
                        key={book.abreviacao}
                        onClick={() => handleBookSelect(book)}
                        className="text-left p-2 rounded-lg text-xs hover:bg-[var(--bg-secondary)] transition-colors border border-transparent hover:border-[var(--brand)]"
                      >
                        <span className="font-medium block truncate">{book.nome}</span>
                        <span className="text-[var(--text-muted)] text-[10px]">{book.totalCapitulos} caps</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  testamentos.map(test => (
                    <div key={test.nome} className="mb-2">
                      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        {test.nome}
                      </div>
                      <div className="grid grid-cols-3 gap-1 px-2">
                        {test.livros.map(book => (
                          <button
                            key={book.abreviacao}
                            onClick={() => handleBookSelect(book)}
                            className="text-left p-2 rounded-lg text-xs hover:bg-[var(--bg-secondary)] transition-colors border border-transparent hover:border-[var(--brand)]"
                          >
                            <span className="font-medium block truncate">{book.nome}</span>
                            <span className="text-[var(--text-muted)] text-[10px]">{book.totalCapitulos} caps</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </motion.div>
          )}

          {step === 'chapters' && selectedBook && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <ScrollArea className="h-full">
                <div className="grid grid-cols-5 gap-1 p-2">
                  {Array.from({ length: totalCapitulos(selectedBook) }, (_, i) => i + 1).map(cap => (
                    <button
                      key={cap}
                      onClick={() => handleChapterSelect(cap)}
                      className="aspect-square rounded-lg text-sm font-medium hover:bg-[var(--brand)] hover:text-white transition-colors border border-[var(--border)]"
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}

          {step === 'verses' && (
            <motion.div
              key="verses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full flex flex-col"
            >
              {loading ? (
                <div className="p-3">
                  <ChapterSkeleton />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]">
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={selectAll}>
                      Selecionar tudo
                    </Button>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {selectedVerses.size > 0 ? `${selectedVerses.size} selecionados` : 'Toque para selecionar'}
                    </span>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-3 space-y-2">
                      {versiculos.map(v => (
                        <div key={v.numero} className={`group rounded-lg transition-all border ${
                          selectedVerses.has(v.numero)
                            ? 'bg-[var(--brand)]/10 border-[var(--brand)]/30'
                            : 'border-transparent hover:bg-[var(--bg-secondary)]'
                        }`}>
                          <button
                            onClick={() => toggleVerse(v.numero)}
                            className="w-full text-left p-2.5 text-sm leading-relaxed"
                          >
                            <span className="font-bold text-[var(--brand)] mr-1.5">{v.numero}</span>
                            <span>{v.texto}</span>
                          </button>
                          {showPresentButton && onPresentVerse && (
                            <button
                              onClick={(e) => { e.stopPropagation(); onPresentVerse(`${selectedBook} ${selectedChapter}:${v.numero}`, v.texto); }}
                              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-medium text-[var(--brand-default)] bg-[var(--brand-default)]/5 border-t border-[var(--border)]/30 hover:bg-[var(--brand-default)]/15 transition-colors"
                            >
                              <MonitorPlay className="w-3 h-3" /> Apresentar
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </div>

      {/* Share button */}
      {step === 'verses' && versiculos.length > 0 && (
        <div className="p-3 border-t border-[var(--border)]">
          <Button
            onClick={handleShare}
            className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white"
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {selectedVerses.size > 0 ? `Compartilhar ${selectedVerses.size} versículos` : 'Compartilhar capítulo'}
          </Button>
        </div>
      )}
    </div>
  );
}
