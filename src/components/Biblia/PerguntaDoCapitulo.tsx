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
    <aside className="mt-14 mx-auto max-w-xl text-center px-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-default)] mb-3">
        Antes de fechar
      </p>
      <p className="font-serif text-lg sm:text-xl text-[var(--content-primary)] leading-snug">
        {pergunta}
      </p>
      <Link
        href={hrefGuia(livro, capitulo)}
        className="inline-block mt-4 text-[12px] text-[var(--content-muted)] hover:text-[var(--brand-default)] underline-offset-4 hover:underline"
      >
        Ver a ficha deste capítulo
      </Link>
    </aside>
  );
}
