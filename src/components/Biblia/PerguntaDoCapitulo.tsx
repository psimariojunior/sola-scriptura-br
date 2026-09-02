'use client';

import { useEffect, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { hrefGuia } from '@/lib/bibliaHref';
import type { EstudoCapitulo } from '@/data/estudosCapitulo';
import { obterTrilhaPorLivro, type TrilhaLivro } from '@/data/trilhasLivro';

type RespostaProps = {
  trilha: TrilhaLivro;
  capitulo: number;
  compact?: boolean;
};

interface PerguntaDoCapituloProps {
  livro: string;
  capitulo: number;
  onEstudar?: () => void;
}

export function PerguntaDoCapitulo({ livro, capitulo, onEstudar }: PerguntaDoCapituloProps) {
  const [estudo, setEstudo] = useState<EstudoCapitulo | null>(null);
  const [Resposta, setResposta] = useState<ComponentType<RespostaProps> | null>(null);
  const trilha = obterTrilhaPorLivro(livro);

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

  useEffect(() => {
    if (!trilha) return;
    let cancelado = false;
    import('@/components/cursos/RespostaCapituloTrilha').then((m) => {
      if (!cancelado) setResposta(() => m.RespostaCapituloTrilha);
    });
    return () => {
      cancelado = true;
    };
  }, [trilha]);

  const pergunta = estudo?.perguntasEstudo?.[0]?.trim();
  if (!estudo || !pergunta) return null;

  const rotuloNivel =
    estudo.nivel === 'profundo'
      ? 'Ficha profunda deste capítulo'
      : estudo.nivel === 'sintese'
        ? 'Síntese deste capítulo'
        : 'Estudo deste capítulo';

  return (
    <aside className="mt-16 mx-auto max-w-xl px-4 py-8 rounded-2xl border border-[var(--brand-default)]/20 bg-[var(--brand-default)]/[0.06] shadow-[0_18px_40px_-28px_rgba(161,122,44,0.55)]">
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-default)] mb-2">
        {rotuloNivel}
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
        {trilha && (
          <Link
            href={`/cursos/${trilha.slug}`}
            className="inline-flex items-center justify-center min-h-[44px] px-4 text-[13px] font-medium text-[var(--content-muted)] hover:underline underline-offset-4"
          >
            Voltar à trilha
          </Link>
        )}
      </div>
      {trilha && Resposta && (
        <div className="mt-6 text-left">
          <Resposta trilha={trilha} capitulo={capitulo} compact />
        </div>
      )}
    </aside>
  );
}
