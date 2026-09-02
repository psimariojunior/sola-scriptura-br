'use client';

import Link from 'next/link';
import { PenLine } from 'lucide-react';
import { COR_SIGNIFICADO, MARCA_CLASSE, type CorMarcador } from '@/lib/marcadores';
import { useMarcasCapitulo } from '@/hooks/useMarcadores';
import { cn } from '@/lib/utils';

interface MarcasDoCapituloProps {
  livro: string;
  capitulo: number;
  traducao?: string;
  onIrParaVerso?: (versiculo: number) => void;
}

export function MarcasDoCapitulo({ livro, capitulo, traducao, onIrParaVerso }: MarcasDoCapituloProps) {
  const marcas = useMarcasCapitulo(livro, capitulo, traducao);
  if (marcas.length === 0) return null;

  const porVerso = new Map<number, CorMarcador>();
  for (const m of marcas) {
    if (!porVerso.has(m.versiculo)) porVerso.set(m.versiculo, m.cor);
  }
  const versos = [...porVerso.entries()].sort((a, b) => a[0] - b[0]);

  return (
    <div
      className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px]"
      aria-label={`${versos.length} marcas neste capítulo`}
    >
      <PenLine className="w-3.5 h-3.5 text-[var(--content-muted)] shrink-0" />
      <span className="text-[var(--content-muted)] font-medium">
        {versos.length} {versos.length === 1 ? 'marca' : 'marcas'}
      </span>
      {versos.map(([n, cor]) => (
        <button
          key={n}
          type="button"
          onClick={() => {
            onIrParaVerso?.(n);
            document.getElementById(`verse-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          title={`${COR_SIGNIFICADO[cor].label} · versículo ${n}`}
          className={cn(
            'min-h-8 min-w-8 px-1.5 rounded-md tabular-nums font-semibold text-[var(--content-primary)]',
            MARCA_CLASSE[cor],
          )}
        >
          {n}
        </button>
      ))}
      <Link
        href="/marcacoes"
        className="ml-1 text-[var(--brand-default)] hover:underline underline-offset-2"
      >
        Ver todas
      </Link>
    </div>
  );
}
