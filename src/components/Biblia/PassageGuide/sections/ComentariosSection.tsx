'use client';

import { useState } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';
import { PassageGuideSection } from '../PassageGuideSection';
import type { Comentario } from '@/data/comentarios';

interface ComentariosSectionProps {
  comentarios: Comentario[];
  loading: boolean;
  loaded: boolean;
}

export function ComentariosSection({ comentarios, loading, loaded }: ComentariosSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <PassageGuideSection
      title="Comentários"
      icon={<MessageSquare className="w-4 h-4" />}
      count={comentarios.length}
      loading={loading}
      loaded={loaded}
      defaultOpen={comentarios.length > 0}
      accentColor="#f59e0b"
    >
      {comentarios.length === 0 ? (
        <p className="text-sm text-[var(--content-muted)] italic">
          Nenhum comentário disponível para este versículo.
        </p>
      ) : (
        <div className="space-y-3">
          {comentarios.slice(0, 5).map((c, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 cursor-pointer hover:bg-[var(--surface-raised)] transition-colors"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  {c.autor || 'Comentário'}
                </span>
                {expanded === i && (
                  <ChevronDown className="w-3 h-3 text-[var(--content-muted)]" />
                )}
              </div>
              <p className={`text-sm text-[var(--content-secondary)] ${expanded === i ? '' : 'line-clamp-3'}`}>
                {c.texto}
              </p>
              {c.texto && c.texto.length > 150 && expanded !== i && (
                <span className="text-xs text-[var(--content-muted)] mt-1 inline-block">
                  Toque para expandir...
                </span>
              )}
            </div>
          ))}
          {comentarios.length > 5 && (
            <p className="text-xs text-[var(--content-muted)] text-center">
              +{comentarios.length - 5} comentários adicionais
            </p>
          )}
        </div>
      )}
    </PassageGuideSection>
  );
}
