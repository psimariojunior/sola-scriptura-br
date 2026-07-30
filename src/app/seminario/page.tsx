'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GraduationCap, BookOpen, Clock, Award, ChevronRight, Star, Lock, CheckCircle2, Play, Trophy, Target, Flame, Brain, Lightbulb, Cross, Church, Scroll } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CURSOS, type Curso } from '@/data/cursos';
import dynamic from 'next/dynamic';

const ProgressChart = dynamic(() => import('./ProgressChart'), { ssr: false, loading: () => <div className="h-64 animate-pulse bg-[var(--surface-sunken)] rounded-xl" /> });
import { getCursoProgresso } from '@/lib/cursoProgress';
import dynamic from 'next/dynamic';

const BibleCourses = dynamic(() => import('@/components/BibleCourses').then(m => ({ default: m.BibleCourses })), { ssr: false });

interface NivelFormacao {
  id: string;
  titulo: string;
  subtitulo: string;
  cor: string;
  icone: typeof GraduationCap;
  descricao: string;
  cursosIds: string[];
  requisitos: string[];
}

const TRILHA_FORMACAO: NivelFormacao[] = [
  {
    id: 'fundamentos',
    titulo: 'Fundamentos da Fé',
    subtitulo: 'Nível Iniciante',
    cor: 'from-emerald-500 to-teal-600',
    icone: Lightbulb,
    descricao: 'Construa uma base sólida nos fundamentos da fé cristã, da interpretação bíblica às doutrinas essenciais.',
    cursosIds: ['conhecendo-a-biblia', 'fundamentos-da-fe', 'genesis-origem'],
    requisitos: [],
  },
  {
    id: 'intermediario',
    titulo: 'Estudo Aprofundado',
    subtitulo: 'Nível Intermediário',
    cor: 'from-blue-500 to-indigo-600',
    icone: Brain,
    descricao: 'Aprofunde seu conhecimento nos Evangelhos, livros poéticos e proféticos com exegese prática.',
    cursosIds: ['hermeneutica-pratica', 'evangelhos-vida-de-jesus', 'salmos-oracao-louvor', 'joao-verbo', 'exodo-libertacao'],
    requisitos: ['fundamentos'],
  },
  {
    id: 'avancado',
    titulo: 'Teologia Sistematizada',
    subtitulo: 'Nível Avançado',
    cor: 'from-purple-500 to-violet-600',
    icone: Cross,
    descricao: 'Domine as grandes doutrinas da fé: soteriologia, escatologia e teologia do Novo Testamento.',
    cursosIds: ['romanos-teologia-cruz', 'apocalipse-consumacao'],
    requisitos: ['fundamentos', 'intermediario'],
  },
];

const STATS_ICONS = { tempo: Clock, conquistas: Trophy, sequencia: Flame, quiz: Brain };

export default function SeminarioPage() {
  const [nivelAtivo, setNivelAtivo] = useState<string | null>(null);
  const [cursosInscritos, setCursosInscritos] = useState<Record<string, number>>({});
  const [tabAtiva, setTabAtiva] = useState<'trilha' | 'catalogo' | 'progresso'>('trilha');

  useEffect(() => {
    const progresso: Record<string, number> = {};
    for (const curso of CURSOS) {
      const p = getCursoProgresso(curso.id);
      if (p) {
        const totalAulas = curso.módulos.reduce((acc, m) => acc + m.aulas.length, 0);
        const aulasCompletas = p.aulasCompletas?.length || 0;
        progresso[curso.id] = totalAulas > 0 ? Math.round((aulasCompletas / totalAulas) * 100) : 0;
      }
    }
    setCursosInscritos(progresso);
  }, []);

  const statsGlobais = useMemo(() => {
    const inscritos = Object.keys(cursosInscritos).length;
    const totalAulas = CURSOS.reduce((acc, c) => acc + c.módulos.reduce((a, m) => a + m.aulas.length, 0), 0);
    const aulasCompletas = Object.values(cursosInscritos).reduce((acc, p) => acc + Math.round(totalAulas * p / 100), 0);
    const tempoEstudo = aulasCompletas * 15;
    return { inscritos, totalAulas, aulasCompletas, tempoEstudo };
  }, [cursosInscritos]);

  const nivelConcluido = useMemo(() => {
    const concluidos: string[] = [];
    for (const nivel of TRILHA_FORMACAO) {
      const todosCompletos = nivel.cursosIds.every(id => (cursosInscritos[id] || 0) >= 80);
      if (todosCompletos) concluidos.push(nivel.id);
    }
    return concluidos;
  }, [cursosInscritos]);

  const nivelDesbloqueado = useMemo(() => {
    const desbloqueados: string[] = ['fundamentos'];
    for (const nivel of TRILHA_FORMACAO) {
      if (nivel.requisitos.every(r => nivelConcluido.includes(r))) {
        desbloqueados.push(nivel.id);
      }
    }
    return desbloqueados;
  }, [nivelConcluido]);

  const cursosFiltrados = useMemo(() => {
    if (!nivelAtivo) return CURSOS;
    const nivel = TRILHA_FORMACAO.find(n => n.id === nivelAtivo);
    if (!nivel) return CURSOS;
    return CURSOS.filter(c => nivel.cursosIds.includes(c.id));
  }, [nivelAtivo]);

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-20 pb-24 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Seminário' }]} />
          </div>

          {/* Hero Section */}
          <section className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand-default)] via-[var(--brand-hover)] to-[var(--brand-default)] p-8 md:p-12 text-white">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
              <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full" />
              <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/15 rounded-full" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold">Seminário Bíblico Gratuito</h1>
                  <p className="text-white/80 text-sm mt-1">Formação teológica completa — sem custo, sem registro</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard icon={<BookOpen className="w-5 h-5" />} label="Cursos" value={CURSOS.length.toString()} />
                <StatCard icon={<Clock className="w-5 h-5" />} label="Horas de estudo" value={`${Math.round(statsGlobais.tempoEstudo / 60)}h`} />
                <StatCard icon={<Target className="w-5 h-5" />} label="Aulas" value={statsGlobais.totalAulas.toString()} />
                <StatCard icon={<Award className="w-5 h-5" />} label="Certificados" value={statsGlobais.inscritos.toString()} />
              </div>
            </div>
          </section>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'trilha' as const, label: 'Formação Teológica', icon: GraduationCap },
              { id: 'catalogo' as const, label: 'Todos os Cursos', icon: BookOpen },
              { id: 'progresso' as const, label: 'Meu Progresso', icon: Trophy },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTabAtiva(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap',
                  tabAtiva === tab.id
                    ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-lg shadow-[var(--brand-default)]/20'
                    : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--surface-raised)]'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Trilha de Formação */}
          <AnimatePresence mode="wait">
            {tabAtiva === 'trilha' && (
              <motion.div
                key="trilha"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-2">Trilha de Formação Teológica</h2>
                  <p className="text-[var(--content-secondary)] text-sm">Complete os níveis em ordem para obter sua formação completa</p>
                </div>

                <div className="space-y-6">
                  {TRILHA_FORMACAO.map((nivel, idx) => {
                    const Icone = nivel.icone;
                    const desbloqueado = nivelDesbloqueado.includes(nivel.id);
                    const concluido = nivelConcluido.includes(nivel.id);
                    const progressoNivel = nivel.cursosIds.reduce((acc, id) => acc + (cursosInscritos[id] || 0), 0) / nivel.cursosIds.length;
                    const expandido = nivelAtivo === nivel.id;

                    return (
                      <motion.div
                        key={nivel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div
                          className={cn(
                            'rounded-2xl border overflow-hidden transition-all',
                            !desbloqueado ? 'opacity-50 border-[var(--border)]/30 bg-[var(--surface-sunken)]' :
                            concluido ? 'border-emerald-500/30 bg-emerald-500/5' :
                            'border-[var(--border)]/50 bg-[var(--surface-raised)] hover:shadow-lg cursor-pointer'
                          )}
                          onClick={() => desbloqueado && setNivelAtivo(expandido ? null : nivel.id)}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0',
                                !desbloqueado ? 'bg-gray-500/10' : `bg-gradient-to-br ${nivel.cor}`
                              )}>
                                {!desbloqueado ? <Lock className="w-6 h-6 text-gray-400" /> : <Icone className="w-6 h-6 text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)]">Nível {idx + 1}</span>
                                  {concluido && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Concluído</span>}
                                </div>
                                <h3 className="font-display text-xl font-bold text-[var(--content-primary)]">{nivel.titulo}</h3>
                                <p className="text-[var(--content-secondary)] text-sm mt-1">{nivel.descricao}</p>

                                <div className="mt-3 flex items-center gap-4">
                                  <span className="text-xs text-[var(--content-muted)]">{nivel.cursosIds.length} cursos</span>
                                  <span className="text-xs text-[var(--content-muted)]">{Math.round(progressoNivel)}% concluído</span>
                                  <div className="flex-1 h-2 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                                    <div
                                      className={cn('h-full rounded-full transition-all duration-500', `bg-gradient-to-r ${nivel.cor}`)}
                                      style={{ width: `${progressoNivel}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className={cn('w-5 h-5 text-[var(--content-muted)] transition-transform shrink-0', expandido && 'rotate-90')} />
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandido && desbloqueado && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-2 border-t border-[var(--border)]/30">
                                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {nivel.cursosIds.map(id => {
                                      const curso = CURSOS.find(c => c.id === id);
                                      if (!curso) return null;
                                      const prog = cursosInscritos[id] || 0;
                                      return (
                                        <CursoCardMini key={id} curso={curso} progresso={prog} />
                                      );
                                    })}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bible Courses Component */}
                <div className="mt-10 rounded-2xl border border-[var(--border)]/40 overflow-hidden bg-[var(--surface-raised)]">
                  <div className="p-6 border-b border-[var(--border)]/30">
                    <h3 className="font-display text-lg font-bold text-[var(--content-primary)]">Gerenciar Cursos</h3>
                    <p className="text-[var(--content-secondary)] text-sm mt-1">Inscreva-se, assista aulas e acompanhe seu progresso</p>
                  </div>
                  <BibleCourses />
                </div>
              </motion.div>
            )}

            {/* Catálogo Completo */}
            {tabAtiva === 'catalogo' && (
              <motion.div
                key="catalogo"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-2">Catálogo de Cursos</h2>
                  <p className="text-[var(--content-secondary)] text-sm">Escolha entre {CURSOS.length} cursos de formação bíblica</p>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  <FilterButton active={!nivelAtivo} onClick={() => setNivelAtivo(null)}>Todos</FilterButton>
                  {TRILHA_FORMACAO.map(n => (
                    <FilterButton key={n.id} active={nivelAtivo === n.id} onClick={() => setNivelAtivo(n.id)}>
                      {n.titulo}
                    </FilterButton>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cursosFiltrados.map((curso, idx) => (
                    <CursoCardCompleto
                      key={curso.id}
                      curso={curso}
                      progresso={cursosInscritos[curso.id] || 0}
                      index={idx}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Progresso */}
            {tabAtiva === 'progresso' && (
              <motion.div
                key="progresso"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-2">Meu Progresso</h2>
                  <p className="text-[var(--content-secondary)] text-sm">Acompanhe sua jornada de estudos</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  <ProgressCard icon={<BookOpen className="w-5 h-5" />} label="Cursos Inscritos" value={statsGlobais.inscritos} total={CURSOS.length} color="text-blue-500" />
                  <ProgressCard icon={<CheckCircle2 className="w-5 h-5" />} label="Aulas Concluídas" value={statsGlobais.aulasCompletas} total={statsGlobais.totalAulas} color="text-emerald-500" />
                  <ProgressCard icon={<Clock className="w-5 h-5" />} label="Horas de Estudo" value={Math.round(statsGlobais.tempoEstudo / 60)} total={Math.round(statsGlobais.totalAulas * 15 / 60)} color="text-amber-500" />
                  <ProgressCard icon={<Award className="w-5 h-5" />} label="Níveis Concluídos" value={nivelConcluido.length} total={TRILHA_FORMACAO.length} color="text-purple-500" />
                </div>

                {/* Gráfico de Progresso */}
                <div className="mb-8 p-6 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/30">
                  <h3 className="font-display text-lg font-bold text-[var(--content-primary)] mb-4">Progresso por Curso</h3>
                  <Suspense fallback={<div className="h-64 animate-pulse bg-[var(--surface-sunken)] rounded-xl" />}>
                    <ProgressChart data={CURSOS.map(c => ({ nome: c.título.length > 20 ? c.título.slice(0, 20) + '...' : c.título, progresso: cursosInscritos[c.id] || 0, nivel: c.nível }))} />
                  </Suspense>
                </div>

                {/* Níveis */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-display text-lg font-bold text-[var(--content-primary)]">Trilha de Formação</h3>
                  {TRILHA_FORMACAO.map((nivel, idx) => {
                    const Icone = nivel.icone;
                    const progressoNivel = nivel.cursosIds.reduce((acc, id) => acc + (cursosInscritos[id] || 0), 0) / nivel.cursosIds.length;
                    const concluido = nivelConcluido.includes(nivel.id);
                    return (
                      <div key={nivel.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-sunken)]">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', `bg-gradient-to-br ${nivel.cor}`)}>
                          <Icone className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-[var(--content-primary)]">{nivel.titulo}</span>
                            {concluido && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex-1 h-2 bg-[var(--surface-raised)] rounded-full overflow-hidden">
                              <div className={cn('h-full rounded-full', `bg-gradient-to-r ${nivel.cor}`)} style={{ width: `${progressoNivel}%` }} />
                            </div>
                            <span className="text-xs font-medium text-[var(--content-muted)]">{Math.round(progressoNivel)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cursos com progresso */}
                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold text-[var(--content-primary)]">Cursos em Andamento</h3>
                  {Object.entries(cursosInscritos).filter(([, p]) => p > 0).length === 0 ? (
                    <div className="text-center py-12 rounded-2xl bg-[var(--surface-sunken)]">
                      <GraduationCap className="w-12 h-12 mx-auto mb-3 text-[var(--content-muted)]" strokeWidth={1} />
                      <p className="text-[var(--content-muted)]">Nenhum curso iniciado ainda</p>
                      <p className="text-[var(--content-muted)] text-sm mt-1">Explore o catálogo e comece sua jornada</p>
                    </div>
                  ) : (
                    Object.entries(cursosInscritos).filter(([, p]) => p > 0).map(([id, prog]) => {
                      const curso = CURSOS.find(c => c.id === id);
                      if (!curso) return null;
                      return (
                        <div key={id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-raised)] transition-colors">
                          <div className="w-12 h-12 rounded-xl bg-[var(--brand-default)]/10 flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5 text-[var(--brand-default)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-sm text-[var(--content-primary)] block truncate">{curso.título}</span>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex-1 h-2 bg-[var(--surface-raised)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--brand-default)] rounded-full" style={{ width: `${prog}%` }} />
                              </div>
                              <span className="text-xs font-medium text-[var(--content-muted)]">{prog}%</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[var(--content-muted)]" />
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-white/60">{icon}</span>
        <span className="text-white/60 text-xs">{label}</span>
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
        active
          ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
          : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--surface-raised)]'
      )}
    >
      {children}
    </button>
  );
}

function CursoCardMini({ curso, progresso }: { curso: Curso; progresso: number }) {
  const nivelCor = curso.nível === 'iniciante' ? 'text-emerald-500' : curso.nível === 'intermediário' ? 'text-blue-500' : 'text-purple-500';
  const totalAulas = curso.módulos.reduce((acc, m) => acc + m.aulas.length, 0);

  return (
    <div className="p-4 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-raised)] transition-colors cursor-pointer group">
      <div className="flex items-center gap-2 mb-2">
        <span className={cn('text-[10px] font-bold uppercase tracking-wider', nivelCor)}>{curso.nível}</span>
        {progresso >= 100 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
      </div>
      <h4 className="font-semibold text-sm text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors line-clamp-2">{curso.título}</h4>
      <p className="text-xs text-[var(--content-muted)] mt-1">{totalAulas} aulas · {curso.duração}</p>
      {progresso > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-[var(--surface-raised)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--brand-default)] rounded-full" style={{ width: `${progresso}%` }} />
          </div>
          <span className="text-[10px] font-medium text-[var(--content-muted)]">{progresso}%</span>
        </div>
      )}
    </div>
  );
}

function CursoCardCompleto({ curso, progresso, index }: { curso: Curso; progresso: number; index: number }) {
  const nivelCor = curso.nível === 'iniciante' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
    curso.nível === 'intermediário' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
    'bg-purple-500/10 text-purple-600 dark:text-purple-400';
  const totalAulas = curso.módulos.reduce((acc, m) => acc + m.aulas.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-[var(--border)]/40 bg-[var(--surface-raised)] overflow-hidden hover:shadow-lg transition-all group"
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full', nivelCor)}>
            {curso.nível}
          </span>
          <span className="text-[10px] text-[var(--content-muted)]">{curso.categoria}</span>
        </div>
        <h3 className="font-display text-lg font-bold text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors mb-2">
          {curso.título}
        </h3>
        <p className="text-sm text-[var(--content-secondary)] line-clamp-2 mb-4">{curso.descrição}</p>
        <div className="flex items-center gap-4 text-xs text-[var(--content-muted)]">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{curso.duração}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{totalAulas} aulas</span>
          <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" />{curso.módulos.length} módulos</span>
        </div>
        {progresso > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--brand-default)] rounded-full" style={{ width: `${progresso}%` }} />
            </div>
            <span className="text-xs font-semibold text-[var(--brand-default)]">{progresso}%</span>
          </div>
        )}
      </div>
      <div className="px-5 pb-4">
        <button className={cn(
          'w-full py-2.5 rounded-xl text-sm font-semibold transition-all',
          progresso > 0
            ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] hover:opacity-90'
            : 'bg-[var(--surface-sunken)] text-[var(--content-primary)] hover:bg-[var(--brand-default)] hover:text-[var(--brand-contrast)]'
        )}>
          {progresso >= 100 ? 'Revisar' : progresso > 0 ? 'Continuar' : 'Começar'}
        </button>
      </div>
    </motion.div>
  );
}

function ProgressCard({ icon, label, value, total, color }: { icon: React.ReactNode; label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="p-5 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/30">
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', `${color.replace('text-', 'bg-')}/10`)}>
        <span className={color}>{icon}</span>
      </div>
      <p className="text-xs text-[var(--content-muted)] mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-[var(--content-primary)]">{value}</span>
        <span className="text-sm text-[var(--content-muted)]">/ {total}</span>
      </div>
      <div className="mt-2 h-1.5 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full', color.replace('text-', 'bg-'))} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
