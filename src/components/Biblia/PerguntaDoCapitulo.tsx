'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { hrefGuia } from '@/lib/bibliaHref';

interface PerguntaDoCapituloProps {
  livro: string;
  capitulo: number;
}

export function PerguntaDoCapitulo({ livro, capitulo }: PerguntaDoCapituloProps) {
  const [pergunta, setPergunta] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    import('@/lib/estudosLoader')
      .then((m) => {
        if (cancelado) return;
        const estudo = m.obterEstudoCapitulo(livro, capitulo);
        const q = estudo.perguntasEstudo?.[0]?.trim();
        setPergunta(q || null);
      })
      .catch(() => {
        if (!cancelado) setPergunta(null);
      });
    return () => {
      cancelado = true;
    };
  }, [livro, capitulo]);

  if (!pergunta) return null;

  return (
    <aside className="mt-16 mx-auto max-w-xl text-center px-3 py-8 rounded-2xl border border-[var(--brand-default)]/20 bg-[var(--brand-default)]/[0.06] shadow-[0_18px_40px_-28px_rgba(161,122,44,0.55)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-default)] mb-3">
        Antes de fechar
      </p>
      <p className="font-serif text-lg sm:text-xl text-[var(--content-primary)] leading-snug">
        {pergunta}
      </p>
      <Link
        href={hrefGuia(livro, capitulo)}
        className="inline-flex items-center justify-center min-h-[44px] mt-5 px-4 text-[13px] font-medium text-[var(--brand-default)] hover:underline underline-offset-4"
      >
        Ver a ficha deste capítulo
      </Link>
    </aside>
  );
}
