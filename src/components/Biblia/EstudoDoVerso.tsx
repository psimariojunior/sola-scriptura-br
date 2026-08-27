'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Link2, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hrefBiblia } from '@/lib/bibliaHref';
import { ComentarioInline } from './ComentarioInline';
import { InlineStrongHighlight } from './InlineStrongHighlight';
import { getRecursosVersiculo, type RecursoLexico } from '@/data/biblia/versiculoRecursos';
import type { CrossReference } from '@/data/biblia/crossReferences';

const TIPO_REF: Record<string, string> = {
  parallel: 'Paralelo',
  fulfillment: 'Cumprimento',
  quotation: 'Citação',
  contrast: 'Contraste',
  thematic: 'Temático',
  typology: 'Tipologia',
};

interface EstudoDoVersoProps {
  livro: string;
  capitulo: number;
  verso: number;
  texto: string;
  fontSize: number;
  expanded: boolean;
  onOpenFull?: () => void;
}

function parseRef(ref: string): { livro: string; cap: number; ver: number } | null {
  const match = ref.trim().match(/^(\d?\s?[A-Za-zÀ-ú]+)\s+(\d+):(\d+)$/);
  if (!match) return null;
  return { livro: match[1].toLowerCase().replace(/\s+/g, ''), cap: parseInt(match[2], 10), ver: parseInt(match[3], 10) };
}

function LazyWhenVisible({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '80px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{visible ? children : <div className="h-8" aria-hidden />}</div>;
}

export function EstudoDoVerso({ livro, capitulo, verso, texto, fontSize, expanded, onOpenFull }: EstudoDoVersoProps) {
  const [refs, setRefs] = useState<CrossReference[]>([]);
  const [lexico, setLexico] = useState<RecursoLexico[]>([]);

  useEffect(() => {
    if (!expanded) return;
    let cancelado = false;
    import('@/data/biblia/crossReferences').then((mod) => {
      if (!cancelado) setRefs(mod.getCrossReferencesByVerse(livro, capitulo, verso).slice(0, 6));
    }).catch(() => {});
    getRecursosVersiculo(livro, capitulo, verso).then((recursos) => {
      if (cancelado) return;
      setLexico(recursos.filter((r) => r.tipo === 'lexico').map((r) => r.dados as RecursoLexico));
    }).catch(() => {});
    return () => { cancelado = true; };
  }, [expanded, livro, capitulo, verso]);

  if (!expanded) {
    return (
      <div className="bible-study-inline" onClick={(e) => e.stopPropagation()}>
        <LazyWhenVisible>
          <ComentarioInline livro={livro} capitulo={capitulo} verso={verso} />
        </LazyWhenVisible>
      </div>
    );
  }

  return (
    <div
      className="bible-study-inline mt-2 rounded-xl border border-[var(--brand-default)]/15 bg-[var(--brand-subtle)]/35 px-3 py-2.5"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-1.5">
        Neste versículo
      </p>
      <ComentarioInline livro={livro} capitulo={capitulo} verso={verso} defaultExpanded={expanded} />

      {expanded && refs.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-[var(--brand-default)]/10">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1.5 flex items-center gap-1">
            <Link2 className="w-3 h-3" /> Referências
          </p>
          <div className="flex flex-wrap gap-1.5">
            {refs.map((ref) => {
              const parsed = parseRef(ref.to);
              const label = `${ref.to}${ref.description ? ` — ${ref.description}` : ''}`;
              const inner = (
                <span className="inline-flex items-center gap-1 max-w-full">
                  <span className="font-semibold shrink-0">{ref.to}</span>
                  {ref.type && (
                    <span className="text-[9px] opacity-70 shrink-0">{TIPO_REF[ref.type] || ref.type}</span>
                  )}
                  {ref.description && (
                    <span className="text-[var(--content-muted)] font-normal truncate">· {ref.description}</span>
                  )}
                </span>
              );
              const className = cn(
                'max-w-full text-left text-[11px] px-2 py-1 rounded-lg',
                'bg-[var(--surface-raised)] border border-[var(--border)]/50',
                'text-[var(--content-secondary)] hover:border-[var(--brand-default)]/40 hover:text-[var(--content-primary)] transition-colors'
              );
              return parsed ? (
                <Link key={`${ref.from}-${ref.to}`} href={hrefBiblia(parsed.livro, parsed.cap, parsed.ver)} className={className} title={label}>
                  {inner}
                </Link>
              ) : (
                <span key={`${ref.from}-${ref.to}`} className={className} title={label}>{inner}</span>
              );
            })}
          </div>
        </div>
      )}

      {expanded && lexico.length > 0 && (
        <div className="mt-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1 flex items-center gap-1">
            <Languages className="w-3 h-3" /> Palavras originais
          </p>
          <InlineStrongHighlight lexicoRecursos={lexico} textoVersiculo={texto} fontSize={fontSize} />
        </div>
      )}

      {onOpenFull && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpenFull(); }}
          className="mt-2 text-[11px] font-semibold text-[var(--brand-default)] hover:underline"
        >
          Abrir estudo completo →
        </button>
      )}
    </div>
  );
}
