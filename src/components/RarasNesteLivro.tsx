'use client';

import { useEffect, useState } from 'react';
import { Gem } from 'lucide-react';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import type { PalavraRaraNoLivro } from '@/data/biblia/strong';

export interface RotuloRara {
  strong: string;
  original: string | null;
  gloss: string;
  idioma: 'grego' | 'hebraico' | null;
}

export function RarasNesteLivro({
  livro,
  capitulo,
  rotulos,
  onSelect,
}: {
  livro: string;
  capitulo: number;
  rotulos: Map<string, RotuloRara>;
  onSelect: (strong: string, verso: number) => void;
}) {
  const [raras, setRaras] = useState<PalavraRaraNoLivro[] | null>(null);
  const [parcial, setParcial] = useState(false);
  const [cobertura, setCobertura] = useState('');

  useEffect(() => {
    let cancel = false;
    setRaras(null);
    import('@/data/biblia/strong').then((mod) => {
      if (cancel) return;
      const lista = mod.getPalavrasRarasNoCapitulo(livro, capitulo, 2);
      const cob = mod.getCoberturaStrongDoLivro(livro);
      const totalCaps = livroPorAbreviacao.get(livro)?.totalCapitulos ?? 0;
      const isParcial = totalCaps > 0 && cob.capitulosComStrong < totalCaps;
      setParcial(isParcial);
      setCobertura(
        isParcial
          ? `Corpus parcial: Strong em ${cob.capitulosComStrong} de ${totalCaps} capítulos deste livro.`
          : totalCaps > 0
            ? `Corpus deste livro: ${cob.capitulosComStrong} capítulos catalogados.`
            : ''
      );
      setRaras(lista);
    });
    return () => {
      cancel = true;
    };
  }, [livro, capitulo]);

  if (!raras || raras.length === 0) return null;

  const nomeLivro = livroPorAbreviacao.get(livro)?.nome ?? livro.toUpperCase();

  return (
    <section
      className="mb-4 rounded-xl border border-[var(--brand-default)]/20 bg-[var(--surface-raised)] px-3 py-2.5"
      aria-label={`Palavras raras em ${nomeLivro}`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Gem className="w-3.5 h-3.5 text-[var(--brand-default)]" aria-hidden />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)]">
          Raras neste livro
        </h2>
      </div>
      <p className="text-[11px] leading-relaxed text-[var(--content-secondary)] mb-2">
        Lemas deste capítulo que o corpus Strong só registra 1× ou 2× em {nomeLivro}
        {parcial ? ' — só no que está catalogado.' : '.'}
      </p>
      {cobertura && (
        <p className="text-[10px] text-[var(--content-muted)] mb-2">{cobertura}</p>
      )}
      <ul className="flex flex-wrap gap-1.5">
        {raras.map((r) => {
          const meta = rotulos.get(r.strong);
          const verso = Number(r.versiculosNoCapitulo[0]?.split(':')[2]);
          const versoOk = Number.isFinite(verso) ? verso : 1;
          return (
            <li key={r.strong}>
              <button
                type="button"
                onClick={() => onSelect(r.strong, versoOk)}
                title={meta?.gloss ? `${meta.gloss} · ${r.strong} · ${r.noLivro}× em ${nomeLivro}` : `${r.strong} · ${r.noLivro}×`}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] px-2.5 py-1.5 text-left hover:border-[var(--brand-default)]/40 hover:bg-[var(--brand-default)]/8"
              >
                {meta?.original && (
                  <span
                    className={`text-[13px] font-semibold text-[var(--content-primary)] ${
                      meta.idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'
                    }`}
                    dir={meta.idioma === 'hebraico' ? 'rtl' : 'ltr'}
                  >
                    {meta.original}
                  </span>
                )}
                <span className="text-[11px] tabular-nums text-[var(--brand-default)]">
                  {r.strong}
                </span>
                <span className="text-[10px] text-[var(--content-muted)]">
                  {r.noLivro}× no livro
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
