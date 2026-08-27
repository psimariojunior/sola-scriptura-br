'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import type { EstudoLivro } from '@/data/estudosPorLivro';
import { hrefFromRef } from '@/lib/bibliaHref';

const PAGINA_ESTUDO: Record<string, string> = {
  gn: '/estudos/genesis',
  sl: '/estudos/salmos',
  pv: '/estudos/proverbios',
  jo: '/estudos/joao',
  at: '/estudos/atos',
  rm: '/estudos/romanos',
  '1co': '/estudos/1corintios',
  ef: '/estudos/efesios',
  fp: '/estudos/filipenses',
  ap: '/estudos/apocalipse',
};

interface IntroLivroLeituraProps {
  livroAbrev: string;
  capitulo: number;
  nomeLivro: string;
}

export function IntroLivroLeitura({ livroAbrev, capitulo, nomeLivro }: IntroLivroLeituraProps) {
  const [estudo, setEstudo] = useState<EstudoLivro | null>(null);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    let cancelado = false;
    import('@/data/estudosPorLivro').then((mod) => {
      if (!cancelado) setEstudo(mod.estudosPorLivro[livroAbrev] ?? null);
    }).catch(() => {
      if (!cancelado) setEstudo(null);
    });
    return () => { cancelado = true; };
  }, [livroAbrev]);

  if (!estudo) return null;

  const hrefEstudo = PAGINA_ESTUDO[livroAbrev] ?? `/estudos/${estudo.slug}`;
  const versos = estudo.versiculosChave.slice(0, 4);

  return (
    <aside className="mb-6 rounded-xl border border-[var(--brand-default)]/18 bg-[var(--brand-subtle)]/30 overflow-hidden">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left"
        aria-expanded={aberto}
      >
        <div className="w-8 h-8 rounded-lg bg-[var(--brand-default)]/12 flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-[var(--brand-default)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-default)]">
            Guia de {nomeLivro}
          </p>
          <p className="text-xs text-[var(--content-muted)] truncate">
            {estudo.genero} · cap. {capitulo} · toque para o guia
          </p>
        </div>
        {aberto ? (
          <ChevronUp className="w-4 h-4 text-[var(--content-muted)] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--content-muted)] shrink-0" />
        )}
      </button>

      {aberto && (
        <div className="px-3.5 pb-3.5 pt-0.5 border-t border-[var(--brand-default)]/10">
          <p className="text-[13px] leading-relaxed text-[var(--content-secondary)] mt-2.5">
            {estudo.contexto}
          </p>
          {estudo.temasPrincipais.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 mt-3">
              {estudo.temasPrincipais.slice(0, 5).map((tema) => (
                <li
                  key={tema}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--surface-raised)] border border-[var(--border)]/50 text-[var(--content-secondary)]"
                >
                  {tema}
                </li>
              ))}
            </ul>
          )}
          {versos.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)]">
                Versículos-chave
              </p>
              {versos.map((v) => (
                <Link
                  key={v.referencia}
                  href={hrefFromRef(v.referencia)}
                  className="block text-[13px] leading-snug hover:text-[var(--brand-default)] transition-colors"
                >
                  <span className="font-semibold text-[var(--brand-default)]">{v.referencia}</span>
                  <span className="text-[var(--content-secondary)]"> — {v.texto}</span>
                </Link>
              ))}
            </div>
          )}
          <Link
            href={hrefEstudo}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-default)] hover:underline"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Abrir o estudo completo do livro
          </Link>
        </div>
      )}
    </aside>
  );
}
