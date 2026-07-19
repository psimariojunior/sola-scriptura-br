'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlanoLeitura } from '@/hooks/usePlanoLeitura';

const PlanoPersonalizado = dynamic(() => import('@/components/PlanoPersonalizado'), { ssr: false });
import {
  Calendar,
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Target,
  Flame,
  Trophy,
  Filter,
  X,
  Share2,
  BarChart3,
  Zap,
  Heart,
  Star,
  Brain,
  Users,
  Sparkles,
} from 'lucide-react';
import type { PlanoLeitura } from '@/data/planosLeituraExpandidos';

const CATEGORIA_LABELS: Record<PlanoLeitura['categoria'], string> = {
  completo: 'Bíblia Completa',
  tematico: 'Temático',
  livro: 'Por Livro',
  devocional: 'Devocional',
};

const DIFICULDADE_LABELS: Record<PlanoLeitura['dificuldade'], string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

const CATEGORIA_CORES: Record<PlanoLeitura['categoria'], string> = {
  completo: 'from-blue-500 to-indigo-600',
  tematico: 'from-purple-500 to-violet-600',
  livro: 'from-emerald-500 to-teal-600',
  devocional: 'from-amber-500 to-orange-600',
};

const CATEGORIA_ICONES: Record<PlanoLeitura['categoria'], React.ReactNode> = {
  completo: <BookOpen className="w-5 h-5" />,
  tematico: <Sparkles className="w-5 h-5" />,
  livro: <Target className="w-5 h-5" />,
  devocional: <Heart className="w-5 h-5" />,
};

const DIFICULDADE_CORES: Record<PlanoLeitura['dificuldade'], string> = {
  iniciante: 'bg-green-500/10 text-green-600 dark:text-green-400',
  intermediario: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  avancado: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export default function PlanosPage() {
  const {
    planosDisponiveis,
    planoAtivo,
    iniciarPlano,
    completarLeitura,
    progressoPlano,
    diasCompletos,
    streakAtual,
    proximoDia,
    pausarPlano,
    retomarPlano,
    trocarPlano,
    verificarLeituraCompleta,
    verificarDiaCompleto,
    estaPausado,
    dataInicio,
  } = usePlanoLeitura();

  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [filtroDuracao, setFiltroDuracao] = useState<string>('todos');
  const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todos');
  const [planoExpandido, setPlanoExpandido] = useState<string | null>(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [diaCalendario, setDiaCalendario] = useState<number>(1);
  const [mostrarCompartilhar, setMostrarCompartilhar] = useState(false);

  const planosFiltrados = useMemo(() => {
    return planosDisponiveis.filter((p) => {
      if (filtroCategoria !== 'todos' && p.categoria !== filtroCategoria) return false;
      if (filtroDificuldade !== 'todos' && p.dificuldade !== filtroDificuldade) return false;
      if (filtroDuracao !== 'todos') {
        const maxDias = parseInt(filtroDuracao);
        if (p.duracao > maxDias) return false;
      }
      return true;
    });
  }, [planosDisponiveis, filtroCategoria, filtroDificuldade, filtroDuracao]);

  function formatarDias(dias: number): string {
    if (dias === 1) return '1 dia';
    if (dias < 30) return `${dias} dias`;
    if (dias === 30) return '1 mês';
    if (dias < 365) return `${Math.round(dias / 30)} meses`;
    return '1 ano';
  }

  function handleCompartilhar() {
    if (!planoAtivo) return;
    const texto = `Estou no dia ${diasCompletos} do plano "${planoAtivo.nome}" no Sola Scriptura BR! ${progressoPlano}% concluído. 🔥`;
    if (navigator.share) {
      navigator.share({ title: planoAtivo.nome, text: texto });
    } else {
      navigator.clipboard.writeText(texto);
      setMostrarCompartilhar(true);
      setTimeout(() => setMostrarCompartilhar(false), 2000);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-light">Planos de Leitura</h1>
              </div>
              <p className="text-muted-foreground ml-13">
                Discipline sua vida bíblica com planos para cada momento
              </p>
            </div>
          </ScrollReveal>

          {/* Active Plan Dashboard */}
          {planoAtivo && (
            <ScrollReveal delay={0.05}>
              <div className="mb-8 bg-card border border-border rounded-2xl overflow-hidden">
                <div className={`bg-gradient-to-r ${CATEGORIA_CORES[planoAtivo.categoria]} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {CATEGORIA_ICONES[planoAtivo.categoria]}
                      <div>
                        <h2 className="text-xl font-bold">{planoAtivo.nome}</h2>
                        <p className="text-white/80 text-sm">{planoAtivo.descricao}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {estaPausado ? (
                        <button
                          onClick={retomarPlano}
                          className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors"
                        >
                          <Play className="w-4 h-4 inline mr-1" />
                          Retomar
                        </button>
                      ) : (
                        <button
                          onClick={pausarPlano}
                          className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors"
                        >
                          <Pause className="w-4 h-4 inline mr-1" />
                          Pausar
                        </button>
                      )}
                      <button
                        onClick={handleCompartilhar}
                        className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">{progressoPlano}%</p>
                      <p className="text-white/70 text-xs">Progresso</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">{diasCompletos}</p>
                      <p className="text-white/70 text-xs">Dias Completos</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold flex items-center justify-center gap-1">
                        <Flame className="w-5 h-5" />
                        {streakAtual}
                      </p>
                      <p className="text-white/70 text-xs">Sequência</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">{planoAtivo.duracao - diasCompletos}</p>
                      <p className="text-white/70 text-xs">Dias Restantes</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="p-4">
                  <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressoPlano}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  {dataInicio && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Início: {new Date(dataInicio).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>

                {/* Proximo dia */}
                {proximoDia && !estaPausado && (
                  <div className="px-4 pb-4">
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm">
                          <Zap className="w-4 h-4 inline mr-1 text-primary" />
                          Próximo: Dia {proximoDia.dia} — {proximoDia.titulo}
                        </h3>
                        <button
                          onClick={() => setMostrarCalendario(!mostrarCalendario)}
                          className="text-xs text-primary hover:underline"
                        >
                          Ver todos os dias
                        </button>
                      </div>
                      <div className="space-y-2">
                        {proximoDia.leituras.map((leitura, idx) => {
                          const completa = verificarLeituraCompleta(proximoDia.dia, idx);
                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-3"
                            >
                              <button
                                onClick={() => completarLeitura(proximoDia.dia, idx)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  completa
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-muted-foreground/30 hover:border-primary'
                                }`}
                              >
                                {completa && <CheckCircle2 className="w-4 h-4" />}
                              </button>
                              <span className={`text-sm ${completa ? 'line-through text-muted-foreground' : ''}`}>
                                {leitura.livro} {leitura.capituloInicio}
                                {leitura.capituloFim ? `-${leitura.capituloFim}` : ''}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {proximoDia.reflexao && (
                        <p className="text-xs text-muted-foreground mt-3 italic">
                          💭 {proximoDia.reflexao}
                        </p>
                      )}
                      {proximoDia.oracao && (
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          🙏 {proximoDia.oracao}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Calendar View */}
                <AnimatePresence>
                  {mostrarCalendario && planoAtivo && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-border/50 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Calendário de Progresso
                          </h3>
                          <button
                            onClick={() => setMostrarCalendario(false)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: planoAtivo.duracao }, (_, i) => {
                            const dia = i + 1;
                            const completo = verificarDiaCompleto(dia);
                            const atual = dia === proximoDia?.dia;
                            return (
                              <button
                                key={dia}
                                onClick={() => setDiaCalendario(dia)}
                                className={`aspect-square rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
                                  completo
                                    ? 'bg-green-500 text-white'
                                    : atual
                                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                                }`}
                              >
                                {dia}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded bg-green-500" /> Concluído
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded bg-primary" /> Atual
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded bg-secondary/50" /> Pendente
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          )}

          {/* Personalized Reading Plan */}
          <PlanoPersonalizado />

          {/* Filters */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="todos">Todas as categorias</option>
                  <option value="completo">Bíblia Completa</option>
                  <option value="tematico">Temático</option>
                  <option value="livro">Por Livro</option>
                  <option value="devocional">Devocional</option>
                </select>
              </div>
              <select
                value={filtroDuracao}
                onChange={(e) => setFiltroDuracao(e.target.value)}
                className="bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="todos">Qualquer duração</option>
                <option value="7">Até 7 dias</option>
                <option value="14">Até 14 dias</option>
                <option value="21">Até 21 dias</option>
                <option value="30">Até 30 dias</option>
                <option value="90">Até 90 dias</option>
              </select>
              <select
                value={filtroDificuldade}
                onChange={(e) => setFiltroDificuldade(e.target.value)}
                className="bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="todos">Todas as dificuldades</option>
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
              {(filtroCategoria !== 'todos' || filtroDuracao !== 'todos' || filtroDificuldade !== 'todos') && (
                <button
                  onClick={() => {
                    setFiltroCategoria('todos');
                    setFiltroDuracao('todos');
                    setFiltroDificuldade('todos');
                  }}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Limpar filtros
                </button>
              )}
            </div>
          </ScrollReveal>

          {/* Plans Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {planosFiltrados.map((plano, idx) => {
              const isAtivo = planoAtivo?.id === plano.id;
              const expandido = planoExpandido === plano.id;
              return (
                <ScrollReveal key={plano.id} delay={idx * 0.04}>
                  <motion.div
                    layout
                    className={`bg-card border rounded-xl overflow-hidden transition-colors ${
                      isAtivo ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                  >
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => setPlanoExpandido(expandido ? null : plano.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${CATEGORIA_CORES[plano.categoria]} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {CATEGORIA_ICONES[plano.categoria]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-base">{plano.nome}</h3>
                            {isAtivo && (
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                Ativo
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatarDias(plano.duracao)}
                            </span>
                            <span className="text-border">•</span>
                            <span className={`px-1.5 py-0.5 rounded ${DIFICULDADE_CORES[plano.dificuldade]}`}>
                              {DIFICULDADE_LABELS[plano.dificuldade]}
                            </span>
                            <span className="text-border">•</span>
                            <span>{CATEGORIA_LABELS[plano.categoria]}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {plano.descricao}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-3 h-3" />
                              ~{plano.metadata.tempoEstimado}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: expandido ? 180 : 0 }}
                          className="flex-shrink-0 mt-1"
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandido && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-4">
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="bg-secondary/50 rounded-lg p-2">
                                <p className="text-sm font-bold">{plano.metadata.totalCapitulos}</p>
                                <p className="text-xs text-muted-foreground">Capítulos</p>
                              </div>
                              <div className="bg-secondary/50 rounded-lg p-2">
                                <p className="text-sm font-bold">{plano.metadata.totalVersiculos.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">Versículos</p>
                              </div>
                              <div className="bg-secondary/50 rounded-lg p-2">
                                <p className="text-sm font-bold">{plano.dias.length}</p>
                                <p className="text-xs text-muted-foreground">Dias</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                                Primeiros dias
                              </h4>
                              <div className="space-y-1.5">
                                {plano.dias.slice(0, 5).map((dia) => (
                                  <div
                                    key={dia.dia}
                                    className="flex items-center gap-2 text-xs"
                                  >
                                    <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground font-medium">
                                      {dia.dia}
                                    </span>
                                    <span className="text-muted-foreground">{dia.titulo}</span>
                                    <span className="text-muted-foreground/60 ml-auto">
                                      {dia.leituras
                                        .map((l) => `${l.livro} ${l.capituloInicio}`)
                                        .join(', ')}
                                    </span>
                                  </div>
                                ))}
                                {plano.dias.length > 5 && (
                                  <p className="text-xs text-muted-foreground/60">
                                    ... e mais {plano.dias.length - 5} dias
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {isAtivo ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMostrarCalendario(true);
                                  }}
                                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Calendar className="w-4 h-4" />
                                  Continuar Plano
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (planoAtivo) {
                                      trocarPlano(plano.id);
                                    } else {
                                      iniciarPlano(plano.id);
                                    }
                                  }}
                                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  {planoAtivo ? 'Trocar para este' : 'Iniciar'}
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {planosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum plano encontrado com esses filtros.</p>
            </div>
          )}

          {/* Share Toast */}
          <AnimatePresence>
            {mostrarCompartilhar && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50"
              >
                ✓ Link copiado!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dica */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10">
              <h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Dica de Estudo
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A consistência é mais importante que a intensidade. Melhor ler 10 minutos todos os dias do que
                2 horas uma vez por semana. Comece devagar, mantenha o hábito, e Deus usará a Sua Palavra para
                transformar a sua vida.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
