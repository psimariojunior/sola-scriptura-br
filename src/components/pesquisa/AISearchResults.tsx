'use client';

import { BookOpen, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { AIVerseRef } from '@/hooks/pesquisa/useAISearch';
import { hrefBiblia } from '@/lib/bibliaHref';

interface AISearchResultsProps {
  explicacao: string;
  versiculos: AIVerseRef[];
  streaming: boolean;
  error: string | null;
  tempoMs: number;
}

const RELEVANCIA_COLORS: Record<string, { bg: string; text: string }> = {
  alta: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
  media: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' },
  baixa: { bg: 'bg-gray-100 dark:bg-gray-800/30', text: 'text-gray-600 dark:text-gray-400' },
};

export function AISearchResults({ explicacao, versiculos, streaming, error, tempoMs }: AISearchResultsProps) {
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!explicacao && !streaming) return null;

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[var(--brand-default)]/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[var(--brand-default)]" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--content-primary)]">Resposta da IA</h3>
          {tempoMs > 0 && (
            <span className="text-[10px] text-[var(--content-muted)] ml-auto">
              {tempoMs}ms
            </span>
          )}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {explicacao.split('\n').map((paragraph, i) => (
            paragraph.trim() && (
              <p key={i} className="text-sm text-[var(--content-secondary)] leading-relaxed mb-2">
                {paragraph}
              </p>
            )
          ))}
          {streaming && (
            <span className="inline-block w-2 h-4 bg-[var(--brand-default)] animate-pulse ml-0.5" />
          )}
        </div>
      </div>

      {/* Verse Cards */}
      {versiculos.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-3">
            Versículos Relevantes ({versiculos.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {versiculos.map((v, i) => {
              const href = hrefBiblia(v.livro, v.capitulo, v.versiculo);
              const relevancia = RELEVANCIA_COLORS[v.relevancia] || RELEVANCIA_COLORS.media;

              return (
                <Link
                  key={i}
                  href={href}
                  className="group block rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 hover:border-[var(--brand-default)]/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
                      {v.referencia}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {v.texto && (
                    <p className="text-xs text-[var(--content-secondary)] line-clamp-3 mb-2 leading-relaxed">
                      {v.texto}
                    </p>
                  )}
                  <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-medium ${relevancia.bg} ${relevancia.text}`}>
                    {v.relevancia}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading state */}
      {streaming && versiculos.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-[var(--content-muted)]">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Analisando sua pergunta...</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}
