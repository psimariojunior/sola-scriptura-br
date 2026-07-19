'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder, FolderPlus, Trash2, ChevronLeft, BookOpen, Plus,
  X, FileText, Calendar, Hash,
} from 'lucide-react';
import Link from 'next/link';

interface Versiculo {
  livro: string;
  capitulo: number;
  verso: number;
  texto: string;
  referencia: string;
}

interface Colecao {
  id: string;
  nome: string;
  descricao: string;
  versiculos: Versiculo[];
  criadaEm: string;
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

export default function ColecoesPage() {
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCriar, setShowCriar] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setColecoes(getColecoes());
    setMounted(true);
  }, []);

  const persistir = useCallback((novas: Colecao[]) => {
    saveColecoes(novas);
    setColecoes(novas);
  }, []);

  const criar = () => {
    if (!nome.trim()) return;
    const nova: Colecao = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      nome: nome.trim(),
      descricao: descricao.trim(),
      versiculos: [],
      criadaEm: new Date().toISOString(),
    };
    persistir([...colecoes, nova]);
    setNome('');
    setDescricao('');
    setShowCriar(false);
    setSelectedId(nova.id);
  };

  const removerVersiculo = (colecaoId: string, idx: number) => {
    const novas = colecoes.map(c => {
      if (c.id !== colecaoId) return c;
      return { ...c, versiculos: c.versiculos.filter((_, i) => i !== idx) };
    });
    persistir(novas);
  };

  const excluirColecao = (id: string) => {
    persistir(colecoes.filter(c => c.id !== id));
    setSelectedId(null);
  };

  const colecaoSelecionada = colecoes.find(c => c.id === selectedId);

  if (!mounted) return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4"><div className="max-w-3xl mx-auto" /></main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-2">
                  {colecaoSelecionada ? 'Coleção' : 'Minhas Coleções'}
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-light text-[var(--fg)]">
                  {colecaoSelecionada ? colecaoSelecionada.nome : 'Coleções de Versículos'}
                </h1>
              </div>
              {!colecaoSelecionada && (
                <motion.button
                  onClick={() => setShowCriar(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Nova
                </motion.button>
              )}
              {colecaoSelecionada && (
                <button
                  onClick={() => setSelectedId(null)}
                  className="flex items-center gap-1.5 text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
              )}
            </div>

            <div className="ornament w-16 mx-auto mb-10" />

            <AnimatePresence mode="wait">
              {colecaoSelecionada ? (
                <motion.div
                  key="detalhes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {colecaoSelecionada.descricao && (
                    <p className="text-[var(--muted-fg)] mb-6 text-sm">{colecaoSelecionada.descricao}</p>
                  )}

                  <div className="flex items-center gap-3 mb-6 text-xs text-[var(--muted-fg)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(colecaoSelecionada.criadaEm).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5" />
                      {colecaoSelecionada.versiculos.length} versículo{colecaoSelecionada.versiculos.length !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => excluirColecao(colecaoSelecionada.id)}
                      className="ml-auto flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Excluir coleção
                    </button>
                  </div>

                  {colecaoSelecionada.versiculos.length === 0 ? (
                    <div className="text-center py-16">
                      <BookOpen className="w-12 h-12 text-[var(--muted-fg)] mx-auto mb-4 opacity-30" />
                      <p className="text-[var(--muted-fg)]">Nenhum versículo nesta coleção.</p>
                      <p className="text-xs text-[var(--muted-fg)] mt-1">
                        Use o ícone <FolderPlus className="inline w-3 h-3" /> nos versículos da Bíblia para adicionar.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {colecaoSelecionada.versiculos.map((v, idx) => (
                        <motion.div
                          key={`${v.referencia}-${idx}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="sola-card p-5 flex gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-primary mb-1">{v.referencia}</p>
                            <p className="text-sm text-[var(--fg)] leading-relaxed">{v.texto}</p>
                          </div>
                          <button
                            onClick={() => removerVersiculo(colecaoSelecionada.id, idx)}
                            className="shrink-0 p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors self-start"
                            title="Remover versículo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : showCriar ? (
                <motion.div
                  key="criar"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="sola-card p-8"
                >
                  <h2 className="text-lg font-semibold text-[var(--fg)] mb-4 flex items-center gap-2">
                    <FolderPlus className="w-5 h-5 text-primary" />
                    Nova Coleção
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-1">
                        Nome *
                      </label>
                      <input
                        autoFocus
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && criar()}
                        placeholder="Ex: Versículos de fé"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--muted-fg)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-1">
                        Descrição (opcional)
                      </label>
                      <input
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        placeholder="Breve descrição..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--muted-fg)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowCriar(false)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--fg)] hover:bg-[var(--card-bg)] transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={criar}
                        disabled={!nome.trim()}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
                      >
                        Criar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : colecoes.length === 0 ? (
                <motion.div
                  key="vazio"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Folder className="w-16 h-16 text-[var(--muted-fg)] mx-auto mb-6 opacity-30" />
                  <h2 className="text-xl font-display text-[var(--fg)] mb-2">Nenhuma coleção ainda</h2>
                  <p className="text-[var(--muted-fg)] mb-6 max-w-sm mx-auto text-sm">
                    Crie coleções para organizar seus versículos favoritos por tema, estudo ou projeto.
                  </p>
                  <motion.button
                    onClick={() => setShowCriar(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-5 h-5" /> Criar primeira coleção
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="lista" className="space-y-3">
                  {colecoes.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedId(c.id)}
                      className="sola-card p-5 cursor-pointer hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                          <Folder className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[var(--fg)] group-hover:text-primary transition-colors">
                            {c.nome}
                          </h3>
                          {c.descricao && (
                            <p className="text-sm text-[var(--muted-fg)] mt-0.5 truncate">{c.descricao}</p>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--muted-fg)]">
                            <span>{c.versiculos.length} versículo{c.versiculos.length !== 1 ? 's' : ''}</span>
                            <span>·</span>
                            <span>{new Date(c.criadaEm).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-[var(--muted-fg)] rotate-180 group-hover:text-primary transition-colors shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
