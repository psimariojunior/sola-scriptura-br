'use client';

import { History } from 'lucide-react';
import { PassageGuideSection } from '../PassageGuideSection';

interface ContextoSectionProps {
  livroNome: string;
  capitulo: number;
  loading?: boolean;
  loaded?: boolean;
}

export function ContextoSection({ livroNome, capitulo, loading = false, loaded = true }: ContextoSectionProps) {
  return (
    <PassageGuideSection
      title="Contexto Histórico"
      icon={<History className="w-4 h-4" />}
      loading={loading}
      loaded={loaded}
      accentColor="#6366f1"
    >
      <div className="space-y-3">
        <p className="text-sm text-[var(--content-secondary)]">
          Contexto histórico e cultural de {livroNome} capítulo {capitulo}.
        </p>
        <div className="rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3">
          <p className="text-xs text-[var(--content-muted)] italic">
            Consulte o painel de contexto para informações detalhadas sobre o período histórico,
            cultura, geografia e costumes da época.
          </p>
        </div>
      </div>
    </PassageGuideSection>
  );
}
