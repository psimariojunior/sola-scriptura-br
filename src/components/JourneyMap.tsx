'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, ChevronRight, GraduationCap, Brain, Cross } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseProgress {
  id: string;
  nome: string;
  progresso: number;
}

interface LevelData {
  id: string;
  titulo: string;
  subtitulo: string;
  cor: string;
  icone: typeof GraduationCap;
  cursos: CourseProgress[];
  requisitos: string[];
}

interface JourneyMapProps {
  niveis: LevelData[];
}

const statusConfig = {
  completed: { bg: 'bg-emerald-500', ring: 'ring-emerald-500/30', text: 'text-emerald-500', label: 'Concluído' },
  inProgress: { bg: 'bg-amber-500', ring: 'ring-amber-500/30', text: 'text-amber-500', label: 'Em andamento' },
  locked: { bg: 'bg-gray-400', ring: 'ring-gray-400/20', text: 'text-gray-400', label: 'Bloqueado' },
};

function getNodeStatus(nivel: LevelData, completedIds: string[]): 'completed' | 'inProgress' | 'locked' {
  const allDone = nivel.cursos.every((c) => c.progresso >= 100);
  if (allDone) return 'completed';

  const hasProgress = nivel.cursos.some((c) => c.progresso > 0);
  const depsMet = nivel.requisitos.every((r) => completedIds.includes(r));
  if (hasProgress && depsMet) return 'inProgress';
  if (depsMet && nivel.cursos.some((c) => c.progresso > 0)) return 'inProgress';

  return 'locked';
}

export function JourneyMap({ niveis }: JourneyMapProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const completedIds = niveis
    .filter((n) => n.cursos.every((c) => c.progresso >= 100))
    .map((n) => n.id);

  return (
    <div className="relative">
      {/* SVG connecting line */}
      <svg
        className="absolute left-8 top-0 w-[2px] h-full pointer-events-none hidden sm:block"
        aria-hidden="true"
      >
        {niveis.map((nivel, idx) => {
          if (idx === niveis.length - 1) return null;
          const status = getNodeStatus(nivel, completedIds);
          const color = status === 'completed' ? '#10b981' : status === 'inProgress' ? '#f59e0b' : '#9ca3af';
          const y1 = idx * 160 + 48;
          const y2 = (idx + 1) * 160;
          return (
            <line
              key={nivel.id}
              x1="32"
              y1={y1}
              x2="32"
              y2={y2}
              stroke={color}
              strokeWidth="2"
              strokeDasharray={status === 'locked' ? '4 4' : undefined}
              opacity={0.5}
            />
          );
        })}
      </svg>

      <div className="space-y-4">
        {niveis.map((nivel, idx) => {
          const Icon = nivel.icone;
          const status = getNodeStatus(nivel, completedIds);
          const config = statusConfig[status];
          const expanded = expandedId === nivel.id;
          const progressoGeral = nivel.cursos.length > 0
            ? Math.round(nivel.cursos.reduce((acc, c) => acc + c.progresso, 0) / nivel.cursos.length)
            : 0;

          return (
            <div key={nivel.id} className="relative sm:pl-20">
              {/* Node circle */}
              <motion.div
                className={cn(
                  'absolute left-0 top-0 w-16 h-16 rounded-2xl flex items-center justify-center z-10 ring-4 transition-all',
                  config.bg,
                  config.ring,
                  status === 'locked' && 'opacity-50'
                )}
                whileHover={status !== 'locked' ? { scale: 1.08 } : {}}
                animate={status === 'completed' ? { boxShadow: ['0 0 0 0 rgba(16,185,129,0)', '0 0 20px 4px rgba(16,185,129,0.15)', '0 0 0 0 rgba(16,185,129,0)'] } : {}}
                transition={status === 'completed' ? { duration: 2, repeat: Infinity } : {}}
              >
                {status === 'completed' ? (
                  <CheckCircle2 className="w-7 h-7 text-white" />
                ) : status === 'locked' ? (
                  <Lock className="w-6 h-6 text-white/70" />
                ) : (
                  <Icon className="w-7 h-7 text-white" />
                )}
              </motion.div>

              {/* Card */}
              <motion.div
                className={cn(
                  'rounded-2xl border overflow-hidden transition-all cursor-pointer',
                  status === 'locked'
                    ? 'opacity-50 border-[var(--border)]/30 bg-[var(--surface-sunken)]'
                    : 'border-[var(--border)]/50 bg-[var(--surface-raised)] hover:shadow-lg'
                )}
                onClick={() => status !== 'locked' && setExpandedId(expanded ? null : nivel.id)}
                whileHover={status !== 'locked' ? { y: -2 } : {}}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)]">
                          Nível {idx + 1}
                        </span>
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', {
                          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400': status === 'completed',
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400': status === 'inProgress',
                          'bg-gray-500/10 text-gray-400': status === 'locked',
                        })}>
                          {config.label}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[var(--content-primary)]">
                        {nivel.titulo}
                      </h3>
                      <p className="text-sm text-[var(--content-secondary)] mt-0.5">
                        {nivel.subtitulo}
                      </p>

                      {/* Progress bar */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                          <motion.div
                            className={cn('h-full rounded-full', `bg-gradient-to-r ${nivel.cor}`)}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressoGeral}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[var(--content-muted)]">
                          {progressoGeral}%
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-3 text-xs text-[var(--content-muted)]">
                        <span>{nivel.cursos.length} cursos</span>
                        <span>·</span>
                        <span>{nivel.cursos.filter((c) => c.progresso >= 100).length} concluídos</span>
                      </div>
                    </div>

                    {status !== 'locked' && (
                      <ChevronRight className={cn(
                        'w-5 h-5 text-[var(--content-muted)] transition-transform shrink-0',
                        expanded && 'rotate-90'
                      )} />
                    )}
                  </div>
                </div>

                {/* Expanded courses */}
                <AnimatePresence>
                  {expanded && status !== 'locked' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-[var(--border)]/30 space-y-2">
                        {nivel.cursos.map((curso) => (
                          <div
                            key={curso.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-sunken)]"
                          >
                            <div className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                              curso.progresso >= 100 ? 'bg-emerald-500/10' : 'bg-[var(--surface-raised)]'
                            )}>
                              {curso.progresso >= 100 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <span className="text-xs font-bold text-[var(--content-muted)]">
                                  {curso.progresso}%
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[var(--content-primary)] truncate">
                                {curso.nome}
                              </p>
                              <div className="mt-1 h-1 bg-[var(--surface-raised)] rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    'h-full rounded-full transition-all',
                                    curso.progresso >= 100 ? 'bg-emerald-500' : 'bg-[var(--brand-default)]'
                                  )}
                                  style={{ width: `${curso.progresso}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
