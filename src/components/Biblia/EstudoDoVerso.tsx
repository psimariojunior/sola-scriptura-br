'use client';

import { useEffect, useState, useRef } from 'react';
import { Link2, Languages } from 'lucide-react';
import { ComentarioInline } from './ComentarioInline';
import { InlineStrongHighlight } from './InlineStrongHighlight';
import { getRecursosVersiculo, type RecursoLexico } from '@/data/biblia/versiculoRecursos';
import { CadeiaReferencias } from './CadeiaReferencias';
import { montarCadeia, type EloCadeia } from '@/lib/cadeiaReferencias';
import { ensinarPalavra } from '@/lib/ensinarPalavra';

interface EstudoDoVersoProps {
  livro: string;
  capitulo: number;
  verso: number;
  texto: string;
  fontSize: number;
  expanded: boolean;
  onOpenFull?: () => void;
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
  const [cadeia, setCadeia] = useState<EloCadeia[]>([]);
  const [lexico, setLexico] = useState<RecursoLexico[]>([]);

  useEffect(() => {
    if (!expanded) return;
    let cancelado = false;
    Promise.all([
      import('@/data/biblia/crossReferences'),
      import('@/data/crossReferences'),
    ]).then(([curated, tsk]) => {
      if (cancelado) return;
      const key = `${livro.toLowerCase()}:${capitulo}:${verso}`;
      setCadeia(montarCadeia({
        livro,
        curated: curated.getCrossReferencesByVerse(livro, capitulo, verso),
        tsk: tsk.crossReferences[key] || [],
        limite: 5,
      }));
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

      {expanded && cadeia.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-[var(--brand-default)]/10">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1.5 flex items-center gap-1">
            <Link2 className="w-3 h-3" /> Daqui → Cristo
          </p>
          <CadeiaReferencias elos={cadeia} compact />
        </div>
      )}

      {expanded && lexico.length > 0 && (
        <div className="mt-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1 flex items-center gap-1">
            <Languages className="w-3 h-3" /> Palavras originais
          </p>
          {lexico[0] && (
            <p className="text-[12px] text-[var(--content-secondary)] leading-relaxed mb-2 font-serif-body">
              {ensinarPalavra(lexico[0])}
            </p>
          )}
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
