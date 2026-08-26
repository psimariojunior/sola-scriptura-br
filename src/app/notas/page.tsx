'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PageShell } from '@/components/layout/PageShell';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Trash2, Search, BookOpen, X, Plus, ArrowLeft, Edit3 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NotaEditor, type Nota } from '@/components/NotaEditor';
import { cn } from '@/lib/utils';
import { getNotesOffline, saveNotesOffline } from '@/lib/offlineStorage';
import { PullToRefreshWrapper } from '@/components/PullToRefresh';

type View = 'list' | 'editor';

export default function NotasPage() {
  const { t } = useTranslation();
  const [notas, setNotas] = useState<Nota[]>([]);
  const [busca, setBusca] = useState('');
  const [carregado, setCarregado] = useState(false);
  const [view, setView] = useState<View>('list');
  const [editingNota, setEditingNota] = useState<Nota | undefined>(undefined);

  const carregarNotas = useCallback(async () => {
    try {
      const fromIDB = (await getNotesOffline()) as Nota[];
      if (fromIDB.length > 0) {
        setNotas(fromIDB);
      } else {
        const raw = localStorage.getItem('ssb_notas_rich');
        if (raw) setNotas(JSON.parse(raw));
      }
    } catch {
      try {
        const raw = localStorage.getItem('ssb_notas_rich');
        if (raw) setNotas(JSON.parse(raw));
      } catch {}
    }
    setCarregado(true);
  }, []);

  useEffect(() => {
    carregarNotas();
  }, [carregarNotas]);

  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerSync = useCallback(() => {
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      import('@/lib/supabaseSync').then(({ syncType }) => syncType('notas')).catch(() => {});
    }, 2000);
  }, []);

  const salvarNota = useCallback((nota: Nota) => {
    setNotas(prev => {
      const exists = prev.findIndex(n => n.id === nota.id);
      const updated = exists >= 0
        ? prev.map(n => n.id === nota.id ? nota : n)
        : [...prev, nota];
      localStorage.setItem('ssb_notas_rich', JSON.stringify(updated));
      saveNotesOffline(updated).catch(() => {});
      return updated;
    });
    triggerSync();
    setView('list');
    setEditingNota(undefined);
  }, [triggerSync]);

  const excluirNota = useCallback((id: string) => {
    setNotas(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('ssb_notas_rich', JSON.stringify(updated));
      saveNotesOffline(updated).catch(() => {});
      return updated;
    });
    triggerSync();
  }, [triggerSync]);

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
      <PageShell maxWidth="4xl">
            <button onClick={() => { setView('list'); setEditingNota(undefined); }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> {t('notas.backToNotes')}
            </button>
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
              <NotaEditor
                nota={editingNota}
                onSalvar={salvarNota}
                onExcluir={excluirNota}
                autoSalvar={false}
              />
            </div>
      </PageShell>
    );
  }

  // List view
  return (
    <PageShell maxWidth="3xl">
        <PullToRefreshWrapper onRefresh={carregarNotas}>
        <div>
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-h1">{t('notas.title')}</h1>
                  <p className="text-sm text-muted-foreground">{t('notas.subtitle')}</p>
                </div>
              </div>
              <motion.button onClick={() => { setEditingNota(undefined); setView('editor'); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25">
                <Plus className="w-4 h-4" /> {t('notas.newNote')}
              </motion.button>
            </div>
          </ScrollReveal>

          {carregado && notas.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary/50" />
                </div>
                <h2 className="text-h2 mb-2">{t('notas.empty')}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {t('notas.emptyDesc')}
                </p>
                <motion.button onClick={() => { setEditingNota(undefined); setView('editor'); }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium">
                  <Plus className="w-4 h-4 inline mr-2" /> {t('notas.createFirst')}
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
                      placeholder={t('notas.search')}
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
                                <h3 className="font-medium text-foreground">{nota.titulo || t('notas.untitled')}</h3>
                                <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity">
                                  <button onClick={(e) => { e.stopPropagation(); setEditingNota(nota); setView('editor'); }}
                                    className="p-1.5 rounded-lg hover:bg-primary/10 text-primary" title={t('notas.edit')}>
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); excluirNota(nota.id); }}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500" title={t('notas.delete')}>
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3"
                                dangerouslySetInnerHTML={{ __html: nota.conteudo.replace(/<[^>]+>/g, ' ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').slice(0, 150) }} />
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
                  <p className="text-sm text-muted-foreground">{t('notas.notFound')} &ldquo;{busca}&rdquo;</p>
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground mt-8">
                {notasFiltradas.length} {t('notas.of')} {notas.length} {t('notas.notes')}
              </p>
            </>
          )}
        </div>
        </PullToRefreshWrapper>
    </PageShell>
  );
}
