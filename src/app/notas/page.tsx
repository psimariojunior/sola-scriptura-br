'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Trash2, Search, BookOpen, X, Plus, ArrowLeft, Edit3 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NotaEditor, type Nota } from '@/components/NotaEditor';
import { cn } from '@/lib/utils';

type View = 'list' | 'editor';

export default function NotasPage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [busca, setBusca] = useState('');
  const [carregado, setCarregado] = useState(false);
  const [view, setView] = useState<View>('list');
  const [editingNota, setEditingNota] = useState<Nota | undefined>(undefined);

  useEffect(() => {
    try {
      const dados = localStorage.getItem('ssb_notas_rich');
      if (dados) setNotas(JSON.parse(dados));
    } catch {}
    setCarregado(true);
  }, []);

  const salvarNota = useCallback((nota: Nota) => {
    setNotas(prev => {
      const exists = prev.findIndex(n => n.id === nota.id);
      const updated = exists >= 0
        ? prev.map(n => n.id === nota.id ? nota : n)
        : [...prev, nota];
      localStorage.setItem('ssb_notas_rich', JSON.stringify(updated));
      return updated;
    });
    setView('list');
    setEditingNota(undefined);
  }, []);

  const excluirNota = useCallback((id: string) => {
    setNotas(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('ssb_notas_rich', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const notasFiltradas = notas.filter(n => {
    if (!busca) return true;
    const termo = busca.toLowerCase();
    return n.titulo.toLowerCase().includes(termo) ||
      n.conteudo.toLowerCase().includes(termo) ||
      n.tags.some(t => t.toLowerCase().includes(termo));
  });

  const agrupados = notasFiltradas.reduce<Record<string, Nota[]>>((acc, n) => {
    const tag = n.tags[0] || 'Sem categoria';
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(n);
    return acc;
  }, {});

  // Editor view
  if (view === 'editor') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <button onClick={() => { setView('list'); setEditingNota(undefined); }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Voltar às notas
            </button>
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
              <NotaEditor
                nota={editingNota}
                onSalvar={salvarNota}
                onExcluir={excluirNota}
                autoSalvar={false}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-light">Notas</h1>
                  <p className="text-sm text-muted-foreground">Suas anotações pessoais de estudo</p>
                </div>
              </div>
              <motion.button onClick={() => { setEditingNota(undefined); setView('editor'); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25">
                <Plus className="w-4 h-4" /> Nova Nota
              </motion.button>
            </div>
          </ScrollReveal>

          {carregado && notas.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary/50" />
                </div>
                <h2 className="font-display text-xl font-light mb-2">Nenhuma nota ainda</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Crie notas ricas com formatação, tags e histórico de versões.
                </p>
                <motion.button onClick={() => { setEditingNota(undefined); setView('editor'); }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium">
                  <Plus className="w-4 h-4 inline mr-2" /> Criar Primeira Nota
                </motion.button>
              </div>
            </ScrollReveal>
          ) : (
            <>
              <ScrollReveal>
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                      placeholder="Buscar notas..."
                      className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    {busca && (
                      <button onClick={() => setBusca('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <AnimatePresence mode="wait">
                {Object.entries(agrupados).map(([tag, itens]) => (
                  <ScrollReveal key={tag}>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
                        <span className="text-xs text-muted-foreground">({itens.length})</span>
                      </div>
                      <div className="space-y-3">
                        {itens.map((nota, idx) => (
                          <motion.div key={nota.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }} transition={{ delay: idx * 0.05 }}
                            className="relative rounded-xl border border-border/50 bg-card/50 p-5 group hover:border-primary/30 transition-all cursor-pointer"
                            onClick={() => { setEditingNota(nota); setView('editor'); }}>
                            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary/40" />
                            <div className="pl-3">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-foreground">{nota.titulo || 'Sem título'}</h3>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={(e) => { e.stopPropagation(); setEditingNota(nota); setView('editor'); }}
                                    className="p-1.5 rounded-lg hover:bg-primary/10 text-primary" title="Editar">
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); excluirNota(nota.id); }}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500" title="Excluir">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3"
                                dangerouslySetInnerHTML={{ __html: nota.conteudo.replace(/<[^>]+>/g, ' ').slice(0, 150) }} />
                              <div className="flex items-center gap-2 flex-wrap">
                                {nota.tags.map(t => (
                                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                                ))}
                                <span className="text-[10px] text-muted-foreground ml-auto">
                                  {new Date(nota.dataAtualizacao).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </AnimatePresence>

              {busca && notasFiltradas.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">Nenhuma nota encontrada para &ldquo;{busca}&rdquo;</p>
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground mt-8">
                {notasFiltradas.length} de {notas.length} notas
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
