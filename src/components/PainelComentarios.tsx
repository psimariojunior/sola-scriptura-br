'use client';

import { useState } from 'react';
import { X, BookOpen, User, Tag, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { obterComentarios, type Comentario } from '@/data/comentarios';
import { useComentarioAudio } from '@/lib/useComentarioAudio';

interface Props {
  livro: string;
  capitulo: number;
  versiculo: number;
  onClose: () => void;
}

const tipoLabels: Record<string, { label: string; color: string }> = {
  historico: { label: 'Histórico', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  teologico: { label: 'Teológico', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
  gramatical: { label: 'Gramatical', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
  cultural: { label: 'Cultural', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  aplicacao: { label: 'Aplicação', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
  escatologico: { label: 'Escatológico', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300' },
};

export default function PainelComentarios({ livro, capitulo, versiculo, onClose }: Props) {
  const [expandido, setExpandido] = useState<number | null>(null);
  const comentarios = obterComentarios(livro, capitulo, versiculo);
  const audio = useComentarioAudio();

  if (comentarios.length === 0) {
    return (
      <div className="sola-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Comentários</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-sm transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground text-center py-4">
          Nenhum comentário disponível para este versículo.
        </p>
      </div>
    );
  }

  return (
    <div className="sola-card p-6 rounded-xl animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Comentários</h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded-full text-muted-foreground">
            {comentarios.length}
          </span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded-sm transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {comentarios.map((c, i) => {
          const tipo = tipoLabels[c.tipo] || tipoLabels.teologico;
          const isExpanded = expandido === i;

          return (
            <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandido(isExpanded ? null : i)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tipo.color}`}>
                    {tipo.label}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    {c.autor}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); audio.playingIndex === i ? audio.stop() : audio.play(i, c.texto); }}
                    className={`p-1 rounded-md transition-all duration-200 ${
                      audio.playingIndex === i
                        ? 'text-primary bg-primary/10 shadow-sm'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/8'
                    }`}
                    title={audio.playingIndex === i ? 'Parar' : 'Ouvir comentário'}
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 border-t border-border/30">
                  <p className="text-sm text-foreground/80 leading-relaxed mt-2 font-serif-body">
                    {c.texto}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
