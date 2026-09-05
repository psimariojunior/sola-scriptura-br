'use client';

import { Languages } from 'lucide-react';
import Link from 'next/link';
import { PassageGuideSection } from '../PassageGuideSection';

interface LexicoSectionProps {
  palavras: { palavra: string; strong: string; definicao: string; idioma: 'hebraico' | 'grego' }[];
  loading: boolean;
  loaded: boolean;
}

export function LexicoSection({ palavras, loading, loaded }: LexicoSectionProps) {
  return (
    <PassageGuideSection
      title="Léxico"
      icon={<Languages className="w-4 h-4" />}
      count={palavras.length}
      loading={loading}
      loaded={loaded}
      accentColor="#8b5cf6"
    >
      {palavras.length === 0 ? (
        <p className="text-sm text-[var(--content-muted)] italic">
          Léxico será carregado ao expandir.
        </p>
      ) : (
        <div className="space-y-2">
          {palavras.map((p, i) => (
            <Link
              key={i}
              href={`/idiomas?strong=${p.strong}`}
              className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 hover:bg-[var(--surface-raised)] transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
                  {p.palavra}
                </span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: p.idioma === 'hebraico' ? 'color-mix(in srgb, #f59e0b 15%, transparent)' : 'color-mix(in srgb, #8b5cf6 15%, transparent)',
                    color: p.idioma === 'hebraico' ? '#f59e0b' : '#8b5cf6',
                  }}
                >
                  {p.strong}
                </span>
                <span className="text-[10px] text-[var(--content-muted)]">
                  {p.idioma === 'hebraico' ? 'Hebraico' : 'Grego'}
                </span>
              </div>
              <p className="text-xs text-[var(--content-muted)]">{p.definicao}</p>
            </Link>
          ))}
        </div>
      )}
    </PassageGuideSection>
  );
}
