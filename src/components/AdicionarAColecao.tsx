'use client';
import { useState, useEffect, useRef } from 'react';
import { FolderPlus, Plus, ChevronDown, Check, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Colecao {
  id: string;
  nome: string;
  descricao: string;
  versiculos: { livro: string; capitulo: number; verso: number; texto: string; referencia: string }[];
  criadaEm: string;
}

interface Props {
  livro: string;
  capitulo: number;
  verso: number;
  texto: string;
  referencia: string;
}

function getColecoes(): Colecao[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('ssb_colecoes') || '[]');
  } catch {
    return [];
  }
}

function saveColecoes(c: Colecao[]) {
  localStorage.setItem('ssb_colecoes', JSON.stringify(c));
}

export function AdicionarAColecao({ livro, capitulo, verso, texto, referencia }: Props) {
  const [open, setOpen] = useState(false);
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [showNova, setShowNova] = useState(false);
  const [nomeNova, setNomeNova] = useState('');
  const [addedTo, setAddedTo] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColecoes(getColecoes());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setShowNova(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adicionarA = (id: string) => {
    const novas = colecoes.map(c => {
      if (c.id !== id) return c;
      const duplicado = c.versiculos.some(
        v => v.livro === livro && v.capitulo === capitulo && v.verso === verso
      );
      if (duplicado) return c;
      return { ...c, versiculos: [...c.versiculos, { livro, capitulo, verso, texto, referencia }] };
    });
    saveColecoes(novas);
    setColecoes(novas);
    setAddedTo(id);
    setTimeout(() => { setAddedTo(null); setOpen(false); }, 800);
  };

  const criarEAdicionar = () => {
    if (!nomeNova.trim()) return;
    const nova: Colecao = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      nome: nomeNova.trim(),
      descricao: '',
      versiculos: [{ livro, capitulo, verso, texto, referencia }],
      criadaEm: new Date().toISOString(),
    };
    const novas = [...colecoes, nova];
    saveColecoes(novas);
    setColecoes(novas);
    setNomeNova('');
    setShowNova(false);
    setAddedTo(nova.id);
    setTimeout(() => { setAddedTo(null); setOpen(false); }, 800);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
        title="Adicionar a coleção"
      >
        <FolderPlus className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 z-50 w-64 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-2 border-b border-[var(--border)]">
              <p className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider px-2">
                Adicionar a...
              </p>
            </div>

            <div className="max-h-48 overflow-y-auto p-1">
              {colecoes.length === 0 && !showNova && (
                <p className="text-xs text-[var(--muted-fg)] text-center py-4 px-2">
                  Nenhuma coleção ainda
                </p>
              )}

              {colecoes.map(c => (
                <button
                  key={c.id}
                  onClick={() => adicionarA(c.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                    addedTo === c.id
                      ? 'bg-green-500/10 text-green-500'
                      : 'hover:bg-primary/10 text-[var(--fg)]'
                  }`}
                >
                  <Folder className="w-4 h-4 shrink-0 text-primary" />
                  <span className="truncate">{c.nome}</span>
                  <span className="ml-auto text-xs text-[var(--muted-fg)]">{c.versiculos.length}</span>
                  {addedTo === c.id && <Check className="w-4 h-4 text-green-500 ml-1" />}
                </button>
              ))}
            </div>

            <div className="border-t border-[var(--border)] p-1">
              {showNova ? (
                <div className="flex gap-1 p-1">
                  <input
                    autoFocus
                    value={nomeNova}
                    onChange={e => setNomeNova(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && criarEAdicionar()}
                    placeholder="Nome da coleção"
                    className="flex-1 px-2 py-1.5 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    onClick={criarEAdicionar}
                    disabled={!nomeNova.trim()}
                    className="px-2 py-1.5 text-sm rounded-lg bg-primary text-white disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNova(true)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primary/10 text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nova coleção
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
