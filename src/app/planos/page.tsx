'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Bell, BellOff, Clock, BookOpen, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface PlanoLeitura {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number; // dias
  categoria: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  dias: DiaLeitura[];
}

interface DiaLeitura {
  dia: number;
  titulo: string;
  passagens: string[];
}

const PLANOS: PlanoLeitura[] = [
  {
    id: 'biblia-1-ano',
    titulo: 'Bíblia em 1 Ano',
    descricao: 'Leia toda a Bíblia em 365 dias com um plano equilibrado entre AT e NT.',
    duracao: 365, categoria: 'Anual', nivel: 'intermediario',
    dias: Array.from({ length: 365 }, (_, i) => ({
      dia: i + 1, titulo: `Dia ${i + 1}`,
      passagens: [`${['Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio'][i % 5]} ${Math.floor(i / 5) + 1}`],
    })),
  },
  {
    id: 'nt-90-dias',
    titulo: 'Novo Testamento em 90 Dias',
    descricao: 'Leia todo o Novo Testamento em 3 meses.',
    duracao: 90, categoria: 'Trimestral', nivel: 'iniciante',
    dias: Array.from({ length: 90 }, (_, i) => ({
      dia: i + 1, titulo: `Dia ${i + 1}`,
      passagens: [`${['Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos'][i % 6]} ${Math.floor(i / 6) + 1}`],
    })),
  },
  {
    id: 'atos-30-dias',
    titulo: 'Atos dos Apóstolos em 30 Dias',
    descricao: 'Estude o livro de Atos em profundidade, um capítulo por dia.',
    duracao: 30, categoria: 'Mensal', nivel: 'iniciante',
    dias: Array.from({ length: 28 }, (_, i) => ({
      dia: i + 1, titulo: `Atos ${i + 1}`,
      passagens: [`Atos ${i + 1}`],
    })),
  },
  {
    id: 'salmos-30-dias',
    titulo: 'Salmos de Louvor em 30 Dias',
    descricao: '5 Salmos por dia durante 30 dias de adoração e reflexão.',
    duracao: 30, categoria: 'Mensal', nivel: 'iniciante',
    dias: Array.from({ length: 30 }, (_, i) => ({
      dia: i + 1, titulo: `Salmos ${i * 5 + 1}-${(i + 1) * 5}`,
      passagens: Array.from({ length: 5 }, (_, j) => `Salmos ${i * 5 + j + 1}`),
    })),
  },
  {
    id: 'proverbios-31-dias',
    titulo: 'Provérbios em 31 Dias',
    descricao: 'Um capítulo de Provérbios por dia — sabedoria para cada manhã.',
    duracao: 31, categoria: 'Mensal', nivel: 'iniciante',
    dias: Array.from({ length: 31 }, (_, i) => ({
      dia: i + 1, titulo: `Provérbios ${i + 1}`,
      passagens: [`Provérbios ${i + 1}`],
    })),
  },
  {
    id: 'evangelhos-60-dias',
    titulo: 'Os 4 Evangelhos em 60 Dias',
    descricao: 'Estude Mateus, Marcos, Lucas e João em profundidade.',
    duracao: 60, categoria: 'Bimestral', nivel: 'intermediario',
    dias: Array.from({ length: 60 }, (_, i) => ({
      dia: i + 1, titulo: `Dia ${i + 1}`,
      passagens: [`${['Mateus', 'Marcos', 'Lucas', 'João'][i % 4]} ${Math.floor(i / 4) + 1}`],
    })),
  },
];

type View = 'list' | 'plano';

export default function PlanosPage() {
  const [view, setView] = useState<View>('list');
  const [selectedPlano, setSelectedPlano] = useState<PlanoLeitura | null>(null);
  const [planoAtivo, setPlanoAtivo] = useState<string | null>(null);
  const [diaAtual, setDiaAtual] = useState(1);
  const [diasConcluidos, setDiasConcluidos] = useState<Set<number>>(new Set());
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem('ssb_plano_ativo');
      const d = localStorage.getItem('ssb_plano_dia');
      const c = localStorage.getItem('ssb_plano_concluidos');
      const push = localStorage.getItem('ssb_plano_push');
      if (p) { setPlanoAtivo(p); setView('plano'); }
      if (d) setDiaAtual(parseInt(d));
      if (c) setDiasConcluidos(new Set(JSON.parse(c)));
      if (push) setPushEnabled(JSON.parse(push));
    } catch {}
  }, []);

  const plano = useMemo(() => PLANOS.find(p => p.id === planoAtivo), [planoAtivo]);

  const startPlano = useCallback((id: string) => {
    setPlanoAtivo(id);
    setDiaAtual(1);
    setDiasConcluidos(new Set());
    localStorage.setItem('ssb_plano_ativo', id);
    localStorage.setItem('ssb_plano_dia', '1');
    localStorage.setItem('ssb_plano_concluidos', '[]');
    setView('plano');
  }, []);

  const toggleDia = useCallback((dia: number) => {
    setDiasConcluidos(prev => {
      const n = new Set(prev);
      if (n.has(dia)) n.delete(dia); else n.add(dia);
      localStorage.setItem('ssb_plano_concluidos', JSON.stringify([...n]));
      return n;
    });
  }, []);

  const stopPlano = useCallback(() => {
    setPlanoAtivo(null);
    setDiaAtual(1);
    setDiasConcluidos(new Set());
    localStorage.removeItem('ssb_plano_ativo');
    localStorage.removeItem('ssb_plano_dia');
    localStorage.removeItem('ssb_plano_concluidos');
    setView('list');
  }, []);

  const progresso = plano ? (diasConcluidos.size / plano.duracao) * 100 : 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-light">Planos de <span className="text-primary italic">Leitura</span></h1>
                  <p className="text-sm text-muted-foreground">Organize seu estudo bíblico com um plano diário</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {view === 'list' && (
            <div className="space-y-4">
              {PLANOS.map((p, idx) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl border border-border/50 bg-card/50 p-5 hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => startPlano(p.id)}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{p.titulo}</h3>
                        <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium',
                          p.nivel === 'iniciante' ? 'bg-green-500/10 text-green-600' :
                          p.nivel === 'intermediario' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600')}>
                          {p.nivel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{p.descricao}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.duracao} dias</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.categoria}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {view === 'plano' && plano && (
            <div>
              <button onClick={() => setView('list')} className="text-sm text-muted-foreground hover:text-foreground mb-4">
                ← Voltar aos planos
              </button>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display text-2xl font-light">{plano.titulo}</h2>
                    <p className="text-sm text-muted-foreground">{plano.descricao}</p>
                  </div>
                  <button onClick={stopPlano} className="text-xs text-red-500 hover:text-red-600">
                    <RotateCcw className="w-4 h-4 inline mr-1" /> Recomeçar
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Progresso</span>
                    <span className="text-sm font-medium">{diasConcluidos.size}/{plano.duracao} dias</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      animate={{ width: `${progresso}%` }} transition={{ duration: 0.5 }} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => setPushEnabled(!pushEnabled)}
                    className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                      pushEnabled ? 'bg-green-500/10 text-green-600 border border-green-500/30' : 'border border-border text-muted-foreground')}>
                    {pushEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
                    {pushEnabled ? 'Lembrete ativo (7h)' : 'Ativar lembrete'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {plano.dias.slice(0, 30).map((dia) => {
                  const concluido = diasConcluidos.has(dia.dia);
                  const atual = dia.dia === Math.max(...[...diasConcluidos].map(Number), 0) + 1;
                  return (
                    <motion.div key={dia.dia} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      className={cn('flex items-center gap-3 p-3 rounded-xl border transition-all',
                        concluido ? 'border-green-500/30 bg-green-500/5' :
                        atual ? 'border-primary/50 bg-primary/5' : 'border-border/50')}>
                      <button onClick={() => toggleDia(dia.dia)}
                        className={cn('w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                          concluido ? 'bg-green-500 text-white' : 'border-2 border-border hover:border-primary')}>
                        {concluido && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-medium', concluido && 'line-through opacity-60')}>{dia.titulo}</p>
                        <p className="text-xs text-muted-foreground">{dia.passagens.join(', ')}</p>
                      </div>
                      {atual && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Hoje</span>}
                    </motion.div>
                  );
                })}
              </div>

              {plano.duracao > 30 && (
                <p className="text-center text-xs text-muted-foreground mt-6">
                  Mostrando 30 de {plano.duracao} dias
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
