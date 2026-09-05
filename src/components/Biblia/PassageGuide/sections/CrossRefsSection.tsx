'use client';

import { Link2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PassageGuideSection } from '../PassageGuideSection';
import type { CrossReference } from '@/data/biblia/crossReferences';
import { hrefBiblia } from '@/lib/bibliaHref';

interface CrossRefsSectionProps {
  crossRefs: CrossReference[];
  loading: boolean;
  loaded: boolean;
  livroAtual: string;
  capituloAtual: number;
  versiculoAtual: number;
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  parallel: { label: 'Paralelo', color: '#06b6d4' },
  fulfillment: { label: 'Cumprimento', color: '#8b5cf6' },
  quotation: { label: 'Citação', color: '#10b981' },
  contrast: { label: 'Contraste', color: '#f97316' },
  thematic: { label: 'Temático', color: '#3b82f6' },
  typology: { label: 'Tipologia', color: '#ec4899' },
};

export function CrossRefsSection({ crossRefs, loading, loaded, livroAtual, capituloAtual, versiculoAtual }: CrossRefsSectionProps) {
  return (
    <PassageGuideSection
      title="Referências Cruzadas"
      icon={<Link2 className="w-4 h-4" />}
      count={crossRefs.length}
      loading={loading}
      loaded={loaded}
      defaultOpen={crossRefs.length > 0}
      accentColor="#06b6d4"
    >
      {crossRefs.length === 0 ? (
        <p className="text-sm text-[var(--content-muted)] italic">
          Nenhuma referência cruzada encontrada.
        </p>
      ) : (
        <div className="space-y-2">
          {crossRefs.slice(0, 10).map((ref, i) => {
            const typeInfo = TYPE_LABELS[ref.type] || { label: ref.type, color: '#6b7280' };
            // Parse "to" reference to extract book, chapter, verse
            const match = ref.to.match(/^(\d?\s*\w+)\s+(\d+):(\d+)/);
            const href = match
              ? hrefBiblia(match[1].toLowerCase().replace(/\s+/g, ''), parseInt(match[2]), parseInt(match[3]))
              : '#';

            return (
              <Link
                key={i}
                href={href}
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 hover:bg-[var(--surface-raised)] transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
                    {ref.to}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${typeInfo.color} 15%, transparent)`,
                        color: typeInfo.color,
                      }}
                    >
                      {typeInfo.label}
                    </span>
                    <ExternalLink className="w-3 h-3 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {ref.description && (
                  <p className="text-xs text-[var(--content-muted)]">{ref.description}</p>
                )}
              </Link>
            );
          })}
          {crossRefs.length > 10 && (
            <p className="text-xs text-[var(--content-muted)] text-center">
              +{crossRefs.length - 10} referências adicionais
            </p>
          )}
        </div>
      )}
    </PassageGuideSection>
  );
}
