'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Link2 } from 'lucide-react';
import {
  carregarEcoCanonico,
  temEco,
  type EcoCanonicoDados,
  type EloEco,
} from '@/lib/ecoCanonico';

const TSK_INICIAL = 12;

function ChipEco({ elo }: { elo: EloEco }) {
  return (
    <Link
      href={elo.href}
      className="inline-flex min-h-[44px] max-w-full items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] px-2.5 py-1.5 hover:border-[var(--brand-default)]/40 hover:text-[var(--brand-default)]"
      title={elo.descricao || elo.rotulo}
    >
      {elo.rotuloTipo && (
        <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wide text-[var(--brand-default)]">
          {elo.rotuloTipo}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[12px] font-medium text-[var(--content-primary)]">
          {elo.rotulo}
        </span>
        {elo.descricao && (
          <span className="block text-[10px] font-normal leading-snug text-[var(--content-muted)]">
            {elo.descricao}
          </span>
        )}
      </span>
    </Link>
  );
}

export function EcoCanonico({
  livro,
  capitulo,
  versiculo,
  compact = false,
}: {
  livro: string;
  capitulo: number;
  versiculo: number;
  compact?: boolean;
}) {
  const [eco, setEco] = useState<EcoCanonicoDados | null>(null);
  const [abrirTsk, setAbrirTsk] = useState(false);

  useEffect(() => {
    let cancel = false;
    setEco(null);
    setAbrirTsk(false);
    carregarEcoCanonico(livro, capitulo, versiculo).then((d) => {
      if (!cancel) setEco(d);
    });
    return () => {
      cancel = true;
    };
  }, [livro, capitulo, versiculo]);

  if (!eco || !temEco(eco)) return null;

  const tskVisiveis = abrirTsk ? eco.tsk : eco.tsk.slice(0, TSK_INICIAL);
  const restam = eco.tsk.length - tskVisiveis.length;

  return (
    <section
      className={compact ? 'mt-2' : 'mt-3 ml-9'}
      aria-label="Referências canônicas deste verso"
    >
      <div className="flex items-center gap-1 mb-1.5">
        <Link2 className="w-3 h-3 text-[var(--content-muted)]" aria-hidden />
        <h3 className="text-[9px] font-semibold uppercase tracking-wider text-[var(--content-muted)]">
          Eco canônico
        </h3>
      </div>
      {eco.curated.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 mb-1.5">
          {eco.curated.map((elo) => (
            <li key={`c-${elo.ref}`}>
              <ChipEco elo={elo} />
            </li>
          ))}
        </ul>
      )}
      {eco.tsk.length > 0 && (
        <>
          <p className="text-[10px] text-[var(--content-muted)] mb-1">
            Treasury of Scripture Knowledge
            {eco.curated.length > 0 ? ' (sem tipo no TSK)' : ''}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {tskVisiveis.map((elo) => (
              <li key={`t-${elo.ref}`}>
                <ChipEco elo={elo} />
              </li>
            ))}
          </ul>
          {restam > 0 && (
            <button
              type="button"
              className="mt-1.5 min-h-[44px] text-[11px] font-medium text-[var(--brand-default)] hover:underline"
              onClick={() => setAbrirTsk(true)}
            >
              Mostrar as {eco.tsk.length} do TSK ({restam} ocultas)
            </button>
          )}
        </>
      )}
    </section>
  );
}
