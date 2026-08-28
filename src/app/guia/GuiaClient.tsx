'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Compass, Search } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { GuiaPassagem } from '@/components/Biblia/GuiaPassagem';
import { hrefGuia, parseRefLivre, resolverLivroParam } from '@/lib/bibliaHref';

const RAPIDAS = [
  'João 3:16',
  'Romanos 8:28',
  'Salmos 23',
  'Gênesis 1',
  'Isaías 53',
  'Mateus 5',
  'João 1:1',
  'Efésios 2:8',
  'Hebreus 11',
  'Apocalipse 21',
];

export default function GuiaClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [input, setInput] = useState('');

  const livroParam = params.get('livro');
  const capParam = Number(params.get('capitulo') || params.get('cap') || 0);
  const verParam = Number(params.get('versiculo') || 0);
  const info = resolverLivroParam(livroParam);
  const ativo = info && capParam > 0
    ? { livro: info.abreviacao, capitulo: capParam, versiculo: verParam > 0 ? verParam : undefined }
    : null;

  useEffect(() => {
    if (!ativo) return;
    const nome = info?.nome ?? ativo.livro;
    setInput(ativo.versiculo ? `${nome} ${ativo.capitulo}:${ativo.versiculo}` : `${nome} ${ativo.capitulo}`);
  }, [ativo?.livro, ativo?.capitulo, ativo?.versiculo, info?.nome]);

  const ir = useCallback((texto: string) => {
    const parsed = parseRefLivre(texto);
    if (!parsed) return;
    router.replace(hrefGuia(parsed.livro, parsed.capitulo, parsed.versiculo), { scroll: false });
  }, [router]);

  return (
    <PageShell maxWidth="3xl">
      <PageHero
        icon={Compass}
        eyebrow="Estudo da passagem"
        title="Guia da passagem"
        subtitle="Ficha do capítulo, comentários clássicos, palavras originais e referências cruzadas — tudo no mesmo lugar, a partir da Escritura e de fontes de domínio público."
        align="left"
      />

      <form
        className="mb-8 rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] p-4 sm:p-5"
        onSubmit={(e) => {
          e.preventDefault();
          ir(input);
        }}
      >
        <label htmlFor="guia-ref" className="sr-only">Referência bíblica</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" />
            <input
              id="guia-ref"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="João 3:16, Salmos 23, Gn 1…"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/40"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-5 py-2.5 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] text-sm font-semibold disabled:opacity-40"
          >
            Estudar
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {RAPIDAS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setInput(r);
                ir(r);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:text-[var(--brand-default)]"
            >
              {r}
            </button>
          ))}
        </div>
      </form>

      {ativo ? (
        <GuiaPassagem livro={ativo.livro} capitulo={ativo.capitulo} versiculo={ativo.versiculo} />
      ) : (
        <p className="text-sm text-[var(--content-muted)] text-center py-12">
          Digite uma referência (capítulo ou versículo) para abrir o guia completo.
        </p>
      )}
    </PageShell>
  );
}
