'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { hrefGuia } from '@/lib/bibliaHref';
import type { EstudoCapitulo } from '@/data/estudosCapitulo';

interface PerguntaDoCapituloProps {
  livro: string;
  capitulo: number;
  onEstudar?: () => void;
}

export function PerguntaDoCapitulo({ livro, capitulo, onEstudar }: PerguntaDoCapituloProps) {
  const [estudo, setEstudo] = useState<EstudoCapitulo | null>(null);

  useEffect(() => {
    let cancelado = false;
    import('@/lib/estudosLoader')
      .then((m) => {
        if (cancelado) return;
        setEstudo(m.obterEstudoCapitulo(livro, capitulo));
      })
      .catch(() => {
        if (!cancelado) setEstudo(null);
      });
    return () => {
      cancelado = true;
    };
  }, [livro, capitulo]);

  const pergunta = estudo?.perguntasEstudo?.[0]?.trim();
  if (!estudo || !pergunta) return null;

  const profunda = estudo.nivel === 'profundo';

  return (
    <aside className="mt-16 mx-auto max-w-xl px-4 py-8 rounded-2xl border border-[var(--brand-default)]/20 bg-[var(--brand-default)]/[0.06] shadow-[0_18px_40px_-28px_rgba(161,122,44,0.55)]">
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-default)] mb-2">
        {profunda ? 'Ficha profunda deste capítulo' : 'Síntese deste capítulo'}
      </p>
      <p className="text-center font-serif text-base sm:text-lg text-[var(--content-primary)] leading-snug mb-5">
        {estudo.titulo}
      </p>
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--content-muted)] mb-2">
        Antes de fechar
      </p>
      <p className="text-center font-serif text-lg sm:text-xl text-[var(--content-primary)] leading-snug">
        {pergunta}
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2">
        {onEstudar && (
          <button
            type="button"
            onClick={onEstudar}
            className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-full bg-[var(--brand-default)] text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Estudar neste capítulo
          </button>
        )}
        <Link
          href={hrefGuia(livro, capitulo)}
          className="inline-flex items-center justify-center min-h-[44px] px-4 text-[13px] font-medium text-[var(--brand-default)] hover:underline underline-offset-4"
        >
          Abrir o guia completo
        </Link>
      </div>
    </aside>
  );
}
