'use client';

import { GuiaPassagem } from './GuiaPassagem';

interface EstudoUnificadoProps {
  livro: string;
  capitulo: number;
  versiculo?: number | null;
}

/** Uma folha de estudo: ficha, comentário clássico, léxico e cadeia de refs. */
export function EstudoUnificado({ livro, capitulo, versiculo }: EstudoUnificadoProps) {
  return (
    <GuiaPassagem
      livro={livro}
      capitulo={capitulo}
      versiculo={versiculo ?? undefined}
      compact
    />
  );
}
