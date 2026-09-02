'use client';

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import {
  carregarVersoNasTraducoesLocais,
  type VersoTraducao,
} from '@/lib/versoEmTraducoes';

export function VersoNasTraducoes({
  livro,
  capitulo,
  versiculo,
  traducaoAtual,
}: {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducaoAtual?: string;
}) {
  const [versos, setVersos] = useState<VersoTraducao[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancel = false;
    setVersos(null);
    setErro(false);
    carregarVersoNasTraducoesLocais(livro, capitulo, versiculo)
      .then((lista) => {
        if (!cancel) setVersos(lista);
      })
      .catch(() => {
        if (!cancel) setErro(true);
      });
    return () => {
      cancel = true;
    };
  }, [livro, capitulo, versiculo]);

  if (erro) {
    return (
      <p className="text-[11px] text-[var(--content-muted)]">
        Não foi possível carregar as traduções locais deste verso.
      </p>
    );
  }

  if (!versos) {
    return (
      <p className="text-[11px] text-[var(--content-muted)]">
        Lendo o mesmo verso nas traduções locais…
      </p>
    );
  }

  if (versos.length === 0) return null;

  return (
    <section
      className="rounded-lg p-3 space-y-2.5"
      style={{
        backgroundColor: 'var(--surface-sunken)',
        border: '1px solid var(--border)',
      }}
      aria-label="Este verso nas traduções locais"
    >
      <div className="flex items-center gap-1">
        <Languages className="w-3 h-3" style={{ color: 'var(--content-muted)' }} />
        <h3
          className="text-[9px] font-semibold uppercase tracking-wider"
          style={{ color: 'var(--content-muted)' }}
        >
          Como as traduções verteram este verso
        </h3>
      </div>
      <p className="text-[11px] leading-relaxed text-[var(--content-secondary)]">
        O alinhamento palavra-a-palavra vale só para o original. Abaixo está o verso
        inteiro em cada edição local — para ver o alcance semântico, não uma palavra
        inventada nas outras versões.
      </p>
      <ul className="space-y-2.5">
        {versos.map((v) => {
          const atual = traducaoAtual?.toLowerCase() === v.id;
          return (
            <li key={v.id}>
              <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                <span className="text-[11px] font-semibold tabular-nums text-[var(--brand-default)]">
                  {v.sigla}
                </span>
                <span className="text-[10px] text-[var(--content-muted)]">{v.nome}</span>
                {atual && (
                  <span className="text-[9px] uppercase tracking-wide text-[var(--content-muted)]">
                    esta leitura
                  </span>
                )}
              </p>
              <p className="mt-0.5 text-[13px] leading-relaxed font-serif-body text-[var(--content-primary)]">
                {v.texto}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
