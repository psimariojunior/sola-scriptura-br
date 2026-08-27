'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { motion } from 'framer-motion';
import { Trophy, Users, CheckCircle2, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'leitura' | 'memorizacao' | 'estudo';
  meta: number;
  unidade: string;
  duracao: string;
  participantes: number;
  icone: string;
  cor: string;
  progresso: number; // 0-100
  completado: boolean;
}

const DESAFIOS: Desafio[] = [
  { id: 'd1', titulo: 'Gênesis em 30 dias', descricao: 'Leia todo o livro de Gênesis em 30 dias', tipo: 'leitura', meta: 50, unidade: 'capítulos', duracao: '30 dias', participantes: 0, icone: '📖', cor: 'from-primary/20 to-primary/5', progresso: 0, completado: false },
  { id: 'd2', titulo: 'Salmos de Louvor', descricao: 'Leia 5 Salmos por dia durante 30 dias', tipo: 'leitura', meta: 150, unidade: 'salmos', duracao: '30 dias', participantes: 0, icone: '🎵', cor: 'from-primary/20 to-primary/5', progresso: 0, completado: false },
  { id: 'd3', titulo: '10 Versículos Memorizados', descricao: 'Memorize 10 versículos essenciais', tipo: 'memorizacao', meta: 10, unidade: 'versículos', duracao: 'Sem limite', participantes: 0, icone: '🧠', cor: 'from-primary/20 to-primary/5', progresso: 0, completado: false },
  { id: 'd4', titulo: 'Evangelhos em 60 dias', descricao: 'Leia Mateus, Marcos, Lucas e João', tipo: 'leitura', meta: 89, unidade: 'capítulos', duracao: '60 dias', participantes: 0, icone: '✝️', cor: 'from-primary/20 to-primary/5', progresso: 0, completado: false },
  { id: 'd5', titulo: 'Novo Testamento', descricao: 'Leia todo o Novo Testamento', tipo: 'leitura', meta: 260, unidade: 'capítulos', duracao: '90 dias', participantes: 0, icone: '📚', cor: 'from-primary/20 to-primary/5', progresso: 0, completado: false },
  { id: 'd6', titulo: 'Provérbios da Semana', descricao: 'Leia 1 capítulo de Provérbios por dia', tipo: 'leitura', meta: 7, unidade: 'capítulos', duracao: '7 dias', participantes: 0, icone: '💡', cor: 'from-primary/20 to-primary/5', progresso: 0, completado: false },
];

type Filter = 'todos' | 'leitura' | 'memorizacao' | 'estudo';

export default function DesafiosPage() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const p = localStorage.getItem('ssb_desafios_progress');
      if (p) setProgress(JSON.parse(p));
      const c = localStorage.getItem('ssb_desafios_completed');
      if (c) setCompleted(new Set(JSON.parse(c)));
    } catch {}
  }, []);

  const filtered = useMemo(() => {
    return DESAFIOS.filter(d => {
      if (filter === 'todos') return true;
      return d.tipo === filter;
    }).map(d => ({
      ...d,
      progress: progress[d.id] || 0,
      completado: completed.has(d.id),
    }));
  }, [filter, progress, completed]);

  const updateProgress = useCallback((id: string, amount: number) => {
    setProgress(prev => {
      const desafio = DESAFIOS.find(d => d.id === id);
      if (!desafio) return prev;
      const newProgress = Math.min((prev[id] || 0) + amount, desafio.meta);
      const updated = { ...prev, [id]: newProgress };
      localStorage.setItem('ssb_desafios_progress', JSON.stringify(updated));
      if (newProgress >= desafio.meta) {
        setCompleted(c => {
          const newSet = new Set(c);
          newSet.add(id);
          localStorage.setItem('ssb_desafios_completed', JSON.stringify([...newSet]));
          return newSet;
        });
      }
      return updated;
    });
  }, []);

  return (
    <PageShell maxWidth="4xl">
          <PageHero
            icon={Trophy}
            title={<>Desafios <span className="italic text-primary">comunitários</span></>}
            subtitle="Participe de desafios de leitura e estudo bíblico"
          />

          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {(['todos', 'leitura', 'memorizacao', 'estudo'] as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted/50')}>
                {f === 'todos' ? 'Todos' : f === 'leitura' ? '📖 Leitura' : f === 'memorizacao' ? '🧠 Memorização' : '📝 Estudo'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((desafio, idx) => (
              <motion.div key={desafio.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn('rounded-2xl border p-6 transition-all',
                  desafio.completado ? 'border-green-500/30 bg-green-500/5' : 'border-border/50 bg-card/50 hover:border-primary/30')}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn('w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl')}>
                    {desafio.icone}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{desafio.titulo}</h3>
                      {desafio.completado && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{desafio.descricao}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {desafio.duracao}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {desafio.participantes} participantes</span>
                    <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {desafio.meta} {desafio.unidade}</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{desafio.progress}/{desafio.meta}</span>
                      <span className="text-xs font-medium">{Math.round((desafio.progress / desafio.meta) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }} animate={{ width: `${(desafio.progress / desafio.meta) * 100}%` }}
                        transition={{ duration: 0.5 }} />
                    </div>
                  </div>

                  {!desafio.completado && (
                    <button onClick={() => updateProgress(desafio.id, 1)}
                      className="w-full py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted/50 transition-all">
                      +1 {desafio.unidade.slice(0, -1) || desafio.unidade}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
    </PageShell>
  );
}
