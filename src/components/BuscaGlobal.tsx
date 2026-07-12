'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Users, Church, Tag, FileText, ArrowRight, Command } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BuscaResultado {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: 'versiculo' | 'doutrina' | 'personagem' | 'topico' | 'estudo';
  href: string;
}

interface BuscaGlobalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categorias = [
  { key: 'versiculo' as const, label: 'Versículos', icon: BookOpen },
  { key: 'doutrina' as const, label: 'Doutrinas', icon: Church },
  { key: 'personagem' as const, label: 'Personagens', icon: Users },
  { key: 'topico' as const, label: 'Tópicos', icon: Tag },
  { key: 'estudo' as const, label: 'Estudos', icon: FileText },
];

const MAX_RESULTADOS = 20;

export function BuscaGlobal({ open, onOpenChange }: BuscaGlobalProps) {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<BuscaResultado[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResultados([]);
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const buscar = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResultados([]);
      return;
    }
    setCarregando(true);
    try {
      const res = await fetch(`/api/busca?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const limitados: BuscaResultado[] = [];
      const contagem: Record<string, number> = {};

      for (const r of data.resultados || []) {
        contagem[r.categoria] = (contagem[r.categoria] || 0) + 1;
        if (contagem[r.categoria] <= MAX_RESULTADOS && limitados.length < MAX_RESULTADOS * 5) {
          limitados.push(r);
        }
      }
      setResultados(limitados);
      setSelectedIndex(0);
    } catch {
      setResultados([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => buscar(query), 300);
    return () => clearTimeout(timer);
  }, [query, buscar]);

  const resultadosPorCategoria = useMemo(() => {
    const map: Record<string, BuscaResultado[]> = {};
    for (const r of resultados) {
      if (!map[r.categoria]) map[r.categoria] = [];
      map[r.categoria].push(r);
    }
    return map;
  }, [resultados]);

  const flatResults = useMemo(() => resultados.slice(0, MAX_RESULTADOS), [resultados]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
      router.push(flatResults[selectedIndex].href);
      onOpenChange(false);
    } else if (e.key === 'Escape') {
      onOpenChange(false);
    }
  };

  const navigateTo = (href: string) => {
    router.push(href);
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-0 top-[12vh] z-[70] mx-auto w-[calc(100%-2rem)] max-w-2xl"
          >
            <div className="rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-5 border-b border-border/30">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar versículos, doutrinas, personagens..."
                  className="flex-1 h-14 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border/50 rounded-md bg-muted/50">
                  ESC
                </kbd>
              </div>

              {/* Resultados */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {carregando && (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                )}

                {!carregando && query.trim().length >= 2 && resultados.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-sm text-muted-foreground">Nenhum resultado encontrado</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Tente outros termos de busca</p>
                  </div>
                )}

                {!carregando && query.trim().length < 2 && (
                  <div className="py-6 px-4">
                    <p className="text-xs text-muted-foreground mb-3 font-medium">Busque por</p>
                    <div className="flex flex-wrap gap-2">
                      {['João 3:16', 'Graça', 'Paulo', 'Salvação', 'Batismo', 'Apocalipse'].map((sugestao) => (
                        <button
                          key={sugestao}
                          onClick={() => setQuery(sugestao)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                        >
                          {sugestao}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {categorias.map(({ key, label, icon: Icon }) => {
                  const items = resultadosPorCategoria[key];
                  if (!items || items.length === 0) return null;
                  return (
                    <div key={key} className="mb-2">
                      <div className="flex items-center gap-2 px-3 py-1.5">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
                        <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">{items.length}</Badge>
                      </div>
                      {items.map((r) => {
                        const globalIdx = flatResults.indexOf(r);
                        return (
                          <button
                            key={r.id}
                            onClick={() => navigateTo(r.href)}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-150 ${
                              globalIdx === selectedIndex ? 'bg-primary/10 text-foreground' : 'hover:bg-muted/50'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{r.titulo}</p>
                              {r.subtitulo && (
                                <p className="text-xs text-muted-foreground truncate">{r.subtitulo}</p>
                              )}
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-opacity ${globalIdx === selectedIndex ? 'opacity-100 text-primary' : 'opacity-0'}`} />
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-5 py-2.5 border-t border-border/30 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border/50 rounded bg-muted/50 font-mono text-[10px]">↑↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border/50 rounded bg-muted/50 font-mono text-[10px]">↵</kbd>
                  abrir
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border/50 rounded bg-muted/50 font-mono text-[10px]">esc</kbd>
                  fechar
                </span>
                <span className="ml-auto flex items-center gap-1">
                  <Command className="w-3 h-3" />
                  <span className="font-mono text-[10px]">K</span>
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
