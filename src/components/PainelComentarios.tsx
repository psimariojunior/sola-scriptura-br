'use client';

import { useState, useMemo } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Volume2, ExternalLink } from 'lucide-react';
import { obterComentarios, type Comentario } from '@/data/comentarios';
import { getTeologo, type Teologo } from '@/data/teologos';
import { useComentarioAudio } from '@/hooks/useComentarioAudio';
import { cn } from '@/lib/utils';

interface Props {
  livro: string;
  capitulo: number;
  versiculo: number;
  onClose: () => void;
}

const tipoLabels: Record<string, { label: string; color: string; bg: string }> = {
  historico: { label: 'Histórico', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  teologico: { label: 'Teológico', color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  gramatical: { label: 'Gramatical', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  cultural: { label: 'Cultural', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  aplicacao: { label: 'Aplicação', color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  escatologico: { label: 'Escatológico', color: 'text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
};

const periodoLabels: Record<string, string> = {
  patristico: 'Patrístico',
  escolastico: 'Escolástico',
  reforma: 'Reforma',
  'pos-reforma': 'Pós-Reforma',
  modernos: 'Modernos',
  contemporaneos: 'Contemporâneos',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(p => p.length > 2 || p === name.split(' ')[0])
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-purple-500 to-violet-600',
    'from-blue-500 to-indigo-600',
    'from-rose-500 to-pink-600',
    'from-cyan-500 to-sky-600',
  ];
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export default function PainelComentarios({ livro, capitulo, versiculo, onClose }: Props) {
  const [expandido, setExpandido] = useState<number | null>(null);
  const comentarios = obterComentarios(livro, capitulo, versiculo);
  const audio = useComentarioAudio();

  // Enrich comments with theologian data
  const comentariosEnriquecidos = useMemo(() => {
    return comentarios.map(c => {
      const teologo = getTeologo(
        c.autor.toLowerCase().replace(/\s+/g, '-').replace(/[áàãâ]/g, 'a').replace(/[éèê]/g, 'e').replace(/[íì]/g, 'i').replace(/[óòõô]/g, 'o').replace(/[úù]/g, 'u').replace(/ç/g, 'c')
      );
      return { ...c, teologo };
    });
  }, [comentarios]);

  if (comentarios.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] mb-3">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="font-display text-base font-medium text-[var(--content-primary)] mb-1">
          Comentários
        </h3>
        <p className="text-sm text-[var(--content-muted)] max-w-xs mx-auto">
          Nenhum comentário disponível para este versículo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
        <h3 className="text-sm font-semibold text-[var(--content-primary)]">
          Comentários Teológicos
        </h3>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-semibold">
          {comentarios.length}
        </span>
      </div>

      {/* Comment cards */}
      {comentariosEnriquecidos.map((c, i) => {
        const tipo = tipoLabels[c.tipo] || tipoLabels.teologico;
        const isExpanded = expandido === i;
        const initials = getInitials(c.autor);
        const avatarColor = getAvatarColor(c.autor);
        const periodo = c.teologo?.periodo ? periodoLabels[c.teologo.periodo] : null;

        return (
          <div
            key={i}
            className={cn(
              'rounded-xl border transition-all duration-200',
              isExpanded
                ? 'border-[var(--brand-default)]/30 bg-[var(--surface-raised)] shadow-sm'
                : 'border-[var(--border)]/50 bg-[var(--surface-raised)]/50 hover:border-[var(--border)]'
            )}
          >
            {/* Header - always visible */}
            <button
              onClick={() => setExpandido(isExpanded ? null : i)}
              className="w-full flex items-start gap-3 p-3 text-left"
            >
              {/* Avatar */}
              <div className={cn(
                'shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white bg-gradient-to-br shadow-sm',
                avatarColor
              )}>
                {initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[13px] font-semibold text-[var(--content-primary)] truncate">
                    {c.autor}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cn('text-[9px] font-semibold px-1.5 py-0.5 rounded-full', tipo.bg, tipo.color)}>
                    {tipo.label}
                  </span>
                  {periodo && (
                    <span className="text-[9px] text-[var(--content-muted)]">
                      {periodo}
                    </span>
                  )}
                  {c.teologo?.tradicao && (
                    <span className="text-[9px] text-[var(--content-muted)]">
                      · {c.teologo.tradicao}
                    </span>
                  )}
                </div>
              </div>

              {/* Audio + Expand */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audio.playingIndex === i ? audio.stop() : audio.play(i, c.texto);
                  }}
                  className={cn(
                    'p-1.5 rounded-lg transition-all duration-200',
                    audio.playingIndex === i
                      ? 'text-[var(--brand-default)] bg-[var(--brand-subtle)]'
                      : 'text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:bg-[var(--surface-sunken)]'
                  )}
                  title={audio.playingIndex === i ? 'Parar' : 'Ouvir comentário'}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[var(--content-muted)]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--content-muted)]" />
                )}
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-3 pb-3 border-t border-[var(--border)]/30">
                <p className="text-[13px] text-[var(--content-secondary)] leading-[1.7] mt-3 font-serif-body">
                  {c.texto}
                </p>
                {c.teologo?.obrasChave && c.teologo.obrasChave.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[var(--border)]/20">
                    <p className="text-[10px] text-[var(--content-muted)] font-medium uppercase tracking-wider mb-1">
                      Obra principal
                    </p>
                    <p className="text-[11px] text-[var(--content-muted)] italic">
                      {c.teologo.obrasChave[0]}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
