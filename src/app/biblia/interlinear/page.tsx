'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { InterlinearView } from '@/components/InterlinearView';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { resolverLivroParam } from '@/lib/bibliaHref';
import { carregarCapitulo } from '@/lib/apresentacao/versiculos';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function InterlinearClient() {
  const params = useSearchParams();
  const router = useRouter();
  const fallback = TODOS_LIVROS.find((l) => l.abreviacao === 'jo') ?? TODOS_LIVROS[0];
  const info = resolverLivroParam(params.get('livro')) ?? fallback;
  const livro = TODOS_LIVROS.find((l) => l.abreviacao === info.abreviacao) ?? fallback;
  const capParam = parseInt(params.get('capitulo') || params.get('cap') || '1', 10);
  const capitulo = Number.isFinite(capParam)
    ? Math.min(Math.max(capParam, 1), livro.totalCapitulos)
    : 1;

  const [versiculos, setVersiculos] = useState<{ numero: number; texto: string }[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let cancel = false;
    setCarregando(true);
    carregarCapitulo(livro.abreviacao, capitulo, 'arc')
      .then((vs) => {
        if (!cancel) setVersiculos(vs ?? []);
      })
      .finally(() => {
        if (!cancel) setCarregando(false);
      });
    return () => {
      cancel = true;
    };
  }, [livro.abreviacao, capitulo]);

  const ir = useCallback(
    (abrev: string, cap: number) => {
      router.replace(`/biblia/interlinear?livro=${abrev}&capitulo=${cap}`);
    },
    [router],
  );

  return (
    <PageShell maxWidth="4xl">
      <div className="py-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-1">
          Interlinear
        </p>
        <h1 className="text-2xl font-display font-semibold text-[var(--content-primary)] mb-4">
          {livro.nome} {capitulo} — hebraico e grego palavra a palavra
        </h1>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <select
            value={livro.abreviacao}
            onChange={(e) => ir(e.target.value, 1)}
            className="min-h-[44px] px-3 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--content-primary)]"
            aria-label="Livro"
          >
            {TODOS_LIVROS.map((l) => (
              <option key={l.abreviacao} value={l.abreviacao}>
                {l.nome}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-[var(--border)] flex items-center justify-center"
            onClick={() => ir(livro.abreviacao, Math.max(1, capitulo - 1))}
            aria-label="Capítulo anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm tabular-nums text-[var(--content-muted)]">
            {capitulo} / {livro.totalCapitulos}
          </span>
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-[var(--border)] flex items-center justify-center"
            onClick={() => ir(livro.abreviacao, Math.min(livro.totalCapitulos, capitulo + 1))}
            aria-label="Próximo capítulo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {carregando ? (
          <p className="text-[var(--content-muted)]">Carregando o capítulo…</p>
        ) : (
          <InterlinearView
            versiculos={versiculos}
            livro={livro.abreviacao}
            capitulo={capitulo}
            traducao="arc"
            fontSize={22}
          />
        )}
      </div>
    </PageShell>
  );
}

export default function InterlinearPage() {
  return (
    <Suspense fallback={<PageShell maxWidth="4xl"><p className="py-8 text-[var(--content-muted)]">Carregando interlinear…</p></PageShell>}>
      <InterlinearClient />
    </Suspense>
  );
}
