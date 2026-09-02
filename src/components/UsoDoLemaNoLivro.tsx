'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hash } from 'lucide-react';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import { hrefInterlinear } from '@/lib/bibliaHref';
import { carregarEstudoLema, type EstudoLema } from '@/lib/estudoLema';

export function UsoDoLemaNoLivro({
  strong,
  livro,
  capitulo,
  versoAtual,
}: {
  strong: string;
  livro: string;
  capitulo: number;
  versoAtual: number;
}) {
  const [estudo, setEstudo] = useState<EstudoLema | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancel = false;
    setEstudo(null);
    setErro(false);
    carregarEstudoLema(strong, livro, capitulo)
      .then((e) => {
        if (!cancel) setEstudo(e);
      })
      .catch(() => {
        if (!cancel) setErro(true);
      });
    return () => {
      cancel = true;
    };
  }, [strong, livro, capitulo]);

  const nomeLivro = livroPorAbreviacao.get(livro)?.nome ?? livro.toUpperCase();

  if (erro) {
    return (
      <p className="text-[11px] text-[var(--content-muted)]">
        Não foi possível ler o corpus Strong para este lema.
      </p>
    );
  }

  if (!estudo) {
    return (
      <p className="text-[11px] text-[var(--content-muted)]">
        Contando ocorrências no corpus…
      </p>
    );
  }

  return (
    <section
      className="rounded-lg p-3 space-y-2.5"
      style={{
        backgroundColor: 'var(--surface-sunken)',
        border: '1px solid var(--border)',
      }}
      aria-label={`Uso de ${strong} em ${nomeLivro}`}
    >
      <div className="flex items-center gap-1">
        <Hash className="w-3 h-3" style={{ color: 'var(--content-muted)' }} />
        <h3
          className="text-[9px] font-semibold uppercase tracking-wider"
          style={{ color: 'var(--content-muted)' }}
        >
          Lema no contexto
        </h3>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-[12px]">
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-[var(--content-muted)]">
            Neste capítulo
          </dt>
          <dd className="font-semibold tabular-nums text-[var(--content-primary)]">
            {estudo.noCapitulo}×
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-[var(--content-muted)]">
            Neste livro
          </dt>
          <dd className="font-semibold tabular-nums text-[var(--content-primary)]">
            {estudo.noLivro}×
          </dd>
        </div>
      </dl>

      <p className="text-[11px] leading-relaxed text-[var(--content-secondary)]">
        {estudo.noCorpus} ocorrência{estudo.noCorpus === 1 ? '' : 's'} no corpus
        interlinear (toda a Bíblia catalogada).
        {estudo.coberturaParcial
          ? ` Strong neste livro: ${estudo.capitulosComStrong} de ${estudo.totalCapitulosLivro} capítulos — lista só o que o corpus tem.`
          : estudo.totalCapitulosLivro > 0
            ? ` ${nomeLivro} está catalogado no corpus (${estudo.totalCapitulosLivro} capítulos).`
            : ''}
      </p>

      {estudo.ocorrenciasNoLivro.length === 0 ? (
        <p className="text-[11px] text-[var(--content-muted)]">
          Nenhuma ocorrência de {strong} em {nomeLivro} neste corpus.
        </p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {estudo.ocorrenciasNoLivro.map((oc) => {
            const atual =
              oc.capitulo === capitulo && oc.versiculo === versoAtual;
            return (
              <li key={oc.chave}>
                <Link
                  href={hrefInterlinear(oc.livro, oc.capitulo, oc.versiculo)}
                  className={`block rounded-md px-2 py-1.5 text-left transition-colors ${
                    atual
                      ? 'bg-[var(--brand-default)]/12 ring-1 ring-[var(--brand-default)]/30'
                      : 'hover:bg-[var(--surface-raised)]'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-[var(--brand-default)]">
                    {nomeLivro} {oc.capitulo}:{oc.versiculo}
                    {atual ? ' · este verso' : ''}
                  </span>
                  {oc.recorte ? (
                    <span className="mt-0.5 block text-[12px] leading-relaxed text-[var(--content-primary)] font-serif-body">
                      {oc.recorte}
                    </span>
                  ) : (
                    <span className="mt-0.5 block text-[11px] text-[var(--content-muted)]">
                      Texto ARC deste verso não está no corpus local.
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
