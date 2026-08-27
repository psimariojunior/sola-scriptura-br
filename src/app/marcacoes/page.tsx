'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PenLine, Trash2 } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { hrefBiblia } from '@/lib/bibliaHref';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import {
  CORES,
  COR_SIGNIFICADO,
  listarMarcadores,
  removeMarcador,
  type CorMarcador,
  type Marca,
} from '@/lib/marcadores';
import { cn } from '@/lib/utils';

const SWATCH: Record<CorMarcador, string> = {
  yellow: 'bg-yellow-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
  pink: 'bg-pink-400',
  orange: 'bg-orange-400',
  purple: 'bg-purple-400',
};

export default function MarcacoesPage() {
  const [filtro, setFiltro] = useState<CorMarcador | 'todas'>('todas');
  const [tick, setTick] = useState(0);
  const marcas = useMemo(() => {
    void tick;
    return listarMarcadores();
  }, [tick]);

  const filtradas = filtro === 'todas' ? marcas : marcas.filter((m) => m.cor === filtro);

  const remover = (m: Marca) => {
    removeMarcador(m.livro, m.capitulo, m.versiculo, m.traducao);
    setTick((n) => n + 1);
  };

  return (
    <PageShell maxWidth="3xl">
      <PageHero
        icon={PenLine}
        eyebrow="Sua leitura"
        title="Marcações"
        subtitle="Trechos e versículos que você destacou. Toque para voltar à Bíblia."
        align="left"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setFiltro('todas')}
          className={cn(
            'text-xs font-semibold px-3 py-1.5 rounded-full border',
            filtro === 'todas'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border text-muted-foreground'
          )}
        >
          Todas ({marcas.length})
        </button>
        {CORES.map((cor) => {
          const n = marcas.filter((m) => m.cor === cor).length;
          return (
            <button
              key={cor}
              type="button"
              onClick={() => setFiltro(cor)}
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border',
                filtro === cor
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground'
              )}
            >
              <span className={cn('w-2.5 h-2.5 rounded-full', SWATCH[cor])} />
              {COR_SIGNIFICADO[cor].label}
              {n > 0 ? ` (${n})` : ''}
            </button>
          );
        })}
      </div>

      {filtradas.length === 0 ? (
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ainda não há marcações. Abra a Bíblia, selecione um trecho e escolha uma cor — amarelo para promessa, azul para estudo, roxo para Cristo.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtradas.map((m) => {
            const nome = livroPorAbreviacao.get(m.livro)?.nome || m.livro;
            const href = hrefBiblia(m.livro, m.capitulo, m.versiculo);
            const trechos = m.trechos?.length ? m.trechos : null;
            return (
              <li key={`${m.livro}:${m.capitulo}:${m.versiculo}:${m.traducao}:${m.data}`} className="ssb-panel p-4">
                <div className="flex items-start gap-3">
                  <span className={cn('mt-1 w-3 h-3 rounded-full shrink-0', SWATCH[m.cor])} />
                  <div className="flex-1 min-w-0">
                    <Link href={href} className="text-sm font-semibold text-foreground hover:text-primary">
                      {nome} {m.capitulo}:{m.versiculo}
                      <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {m.traducao}
                      </span>
                    </Link>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {COR_SIGNIFICADO[m.cor].label} · {COR_SIGNIFICADO[m.cor].uso}
                    </p>
                    {trechos ? (
                      <ul className="mt-2 space-y-1.5">
                        {trechos.map((t) => (
                          <li key={t.id} className="text-sm leading-relaxed text-foreground/90">
                            “{t.texto}”
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">Versículo inteiro marcado.</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remover(m)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                    aria-label="Remover marcação"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </PageShell>
  );
}
