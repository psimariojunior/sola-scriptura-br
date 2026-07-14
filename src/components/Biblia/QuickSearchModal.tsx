'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, History, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS, carregarTraducao } from '@/data/biblia';

interface QuickSearchModalProps {
  open: boolean;
  onClose: () => void;
  onGoToResult: (r: { livro: string; nome: string; cap: number; versiculo?: number }, query: string) => void;
  recentSearches: Array<{ query: string; livro: string; nome: string; cap: number; versiculo: number }>;
}

export function QuickSearchModal({ open, onClose, onGoToResult, recentSearches }: QuickSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ livro: string; nome: string; cap: number; versiculo: number; texto: string; traducao: string }>>([]);
  const [autoComplete, setAutoComplete] = useState<Array<{ livro: string; nome: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
      setAutoComplete([]);
    }
  }, [open]);

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q);
    const qLower = q.toLowerCase().trim();

    if (qLower.length > 0) {
      const books = TODOS_LIVROS
        .filter(l => l.nome.toLowerCase().includes(qLower) || l.abreviacao.toLowerCase().includes(qLower))
        .slice(0, 5)
        .map(l => ({ livro: l.abreviacao, nome: l.nome }));
      setAutoComplete(books);
    } else {
      setAutoComplete([]);
    }

    if (q.length < 2) { setResults([]); return; }
    const found: Array<{ livro: string; nome: string; cap: number; versiculo: number; texto: string; traducao: string }> = [];
    const d = await carregarTraducao('arc');
    for (const l of TODOS_LIVROS) {
      if (found.length >= 30) break;
      const bookData = d[l.abreviacao];
      if (!bookData) continue;
      for (const cap of Object.keys(bookData)) {
        if (found.length >= 30) break;
        const versos = bookData[Number(cap)];
        if (!versos) continue;
        for (let i = 0; i < versos.length; i++) {
          if (versos[i].toLowerCase().includes(qLower)) {
            found.push({ livro: l.abreviacao, nome: l.nome, cap: Number(cap), versiculo: i + 1, texto: versos[i], traducao: 'ARC' });
            break;
          }
        }
      }
    }
    setResults(found);
  }, []);

  const goToResult = (r: { livro: string; nome: string; cap: number; versiculo?: number }) => {
    onGoToResult(r, query);
    setQuery('');
    setResults([]);
    setAutoComplete([]);
  };

  if (!open) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-lg mx-4 bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
          <Search className="w-5 h-5 text-[var(--content-muted)] shrink-0" />
          <input ref={inputRef} autoFocus type="text" placeholder="Buscar versículos ou livro..." value={query}
            onChange={e => handleSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && autoComplete.length > 0) { goToResult({ livro: autoComplete[0].livro, nome: autoComplete[0].nome, cap: 1 }); } }}
            className="flex-1 bg-transparent text-sm outline-none" />
          <kbd className="text-[10px] bg-[var(--surface-sunken)] px-1.5 py-0.5 rounded text-[var(--content-muted)]">ESC</kbd>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {autoComplete.length > 0 && query.length >= 2 && results.length === 0 && (
            <div className="p-2 border-b border-[var(--border)]/30">
              <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider px-3 py-1 font-semibold">Livros</p>
              {autoComplete.map((b, i) => (
                <motion.button key={b.livro} onClick={() => goToResult({ livro: b.livro, nome: b.nome, cap: 1 })}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--brand-default)]" />
                  <span className="text-sm font-medium">{b.nome}</span>
                  <span className="text-[10px] text-[var(--content-muted)]">Capítulo 1</span>
                </motion.button>
              ))}
            </div>
          )}

          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-2">
              <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider px-3 py-1 font-semibold">Buscas recentes</p>
              {recentSearches.map((s, i) => (
                <motion.button key={i} onClick={() => goToResult({ livro: s.livro, nome: s.nome, cap: s.cap, versiculo: s.versiculo })}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors flex items-center gap-2">
                  <History className="w-3.5 h-3.5 text-[var(--content-muted)]" />
                  <span className="text-sm">{s.nome} {s.cap}:{s.versiculo}</span>
                </motion.button>
              ))}
            </div>
          )}

          {results.length > 0 ? (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-1">
                <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider font-semibold">Resultados ({results.length})</p>
                <span className="text-[10px] text-[var(--content-muted)]">ARC</span>
              </div>
              {results.map((r, i) => {
                const qLower = query.toLowerCase();
                const idx = r.texto.toLowerCase().indexOf(qLower);
                const before = idx > 0 ? r.texto.slice(0, idx) : '';
                const match = idx >= 0 ? r.texto.slice(idx, idx + qLower.length) : '';
                const after = idx >= 0 ? r.texto.slice(idx + qLower.length) : r.texto;
                return (
                  <motion.button key={i} onClick={() => goToResult(r)}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors group">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-[var(--brand-default)]">{r.nome} {r.cap}:{r.versiculo}</span>
                      <span className="text-[9px] px-1 py-0.5 bg-[var(--surface-sunken)] rounded text-[var(--content-muted)]">{r.traducao}</span>
                    </div>
                    <p className="text-xs text-[var(--content-muted)] line-clamp-2 group-hover:text-[var(--content-primary)] transition-colors">
                      {before && <span>{before}</span>}
                      {match && <mark className="bg-[var(--brand-subtle)] text-[var(--brand-default)] rounded-sm px-0.5">{match}</mark>}
                      {after && <span>{after}</span>}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center text-sm text-[var(--content-muted)]">Nenhum resultado encontrado</div>
          ) : query.length === 0 && recentSearches.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--content-muted)]">
              <kbd className="text-xs bg-[var(--surface-sunken)] px-2 py-1 rounded border border-[var(--border)]">Ctrl+K</kbd>
              <span className="mx-2">ou</span>
              <kbd className="text-xs bg-[var(--surface-sunken)] px-2 py-1 rounded border border-[var(--border)]">/</kbd>
              <span className="ml-2">para buscar</span>
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
