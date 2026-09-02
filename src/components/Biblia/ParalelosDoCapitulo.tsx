'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Columns3, ChevronDown, ChevronUp } from 'lucide-react';
import { hrefFromRef, hrefHarmonia } from '@/lib/bibliaHref';
import type { ParaleloDoCapitulo } from '@/data/biblia/sinopticos';

const EVANGELHOS = new Set(['mt', 'mc', 'lc', 'jo']);

interface ParalelosDoCapituloProps {
  livro: string;
  capitulo: number;
  /** Faixa compacta no leitor; no guia pode começar aberta. */
  defaultAberto?: boolean;
}

export function ParalelosDoCapitulo({ livro, capitulo, defaultAberto = false }: ParalelosDoCapituloProps) {
  const [itens, setItens] = useState<ParaleloDoCapitulo[] | null>(null);
  const [formatar, setFormatar] = useState<(ref: string) => string>(() => (r: string) => r);
  const [aberto, setAberto] = useState(defaultAberto);

  useEffect(() => {
    if (!EVANGELHOS.has(livro.toLowerCase())) {
      setItens([]);
      return;
    }
    let cancel = false;
    import('@/data/biblia/sinopticos').then((m) => {
      if (cancel) return;
      setFormatar(() => m.formatarRefSinotica);
      setItens(m.getParalelosDoCapitulo(livro, capitulo));
      setAberto(defaultAberto);
    }).catch(() => {
      if (!cancel) setItens([]);
    });
    return () => {
      cancel = true;
    };
  }, [livro, capitulo, defaultAberto]);

  if (!itens || itens.length === 0) return null;

  const n = itens.length;
  const visiveis = aberto ? itens : itens.slice(0, 3);

  return (
    <aside
      className="mb-6 mx-auto max-w-xl rounded-xl border border-[var(--border)]/70 bg-[var(--surface-raised)]/80 px-3 py-2.5"
      aria-label="Paralelos sinóticos deste capítulo"
    >
      <div className="flex items-center gap-2">
        <Columns3 className="w-3.5 h-3.5 text-[var(--brand-default)] shrink-0" aria-hidden />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-default)]">
            Paralelo sinótico
          </p>
          <p className="text-[11px] text-[var(--content-muted)] truncate">
            {n} {n === 1 ? 'passagem catalogada' : 'passagens catalogadas'} neste capítulo
          </p>
        </div>
        <Link
          href={hrefHarmonia(livro, capitulo)}
          className="inline-flex items-center justify-center min-h-[44px] px-2.5 text-[12px] font-medium text-[var(--brand-default)] hover:underline underline-offset-4 shrink-0"
        >
          Harmonia
        </Link>
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-[var(--content-muted)]"
          aria-expanded={aberto}
          aria-controls="paralelos-capitulo-lista"
        >
          <span className="sr-only">{aberto ? 'Recolher paralelos' : 'Ver paralelos'}</span>
          {aberto ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <p className="mt-1.5 text-[10px] leading-snug text-[var(--content-muted)]">
        Hipótese literária tradicional — não força o mesmo evento quando o catálogo só assinala correspondência.
      </p>

      <ul id="paralelos-capitulo-lista" className="mt-2.5 divide-y divide-[var(--border)]/50">
        {visiveis.map(({ paralelo, outrosEvangelhos }) => (
          <li key={paralelo.id} className="py-2 first:pt-0">
            <p className="text-[13px] leading-snug text-[var(--content-primary)]">{paralelo.titulo}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {outrosEvangelhos.flatMap((ev) =>
                ev.refs.map((ref) => (
                  <Link
                    key={`${paralelo.id}-${ref}`}
                    href={hrefFromRef(ref)}
                    className="inline-flex items-center justify-center min-h-[32px] sm:min-h-[36px] px-2 rounded-md bg-[var(--brand-subtle)]/70 text-[11px] font-medium text-[var(--brand-default)] hover:bg-[var(--brand-subtle)]"
                  >
                    {formatar(ref)}
                  </Link>
                )),
              )}
            </div>
          </li>
        ))}
      </ul>

      {n > 3 && !aberto && (
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="mt-1 inline-flex items-center justify-center min-h-[44px] w-full text-[12px] font-medium text-[var(--content-secondary)] hover:text-[var(--brand-default)]"
        >
          + {n - 3} {n - 3 === 1 ? 'outro paralelo' : 'outros paralelos'}
        </button>
      )}
    </aside>
  );
}
