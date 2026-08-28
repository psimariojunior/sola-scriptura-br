import { Suspense } from 'react';
import type { Metadata } from 'next';
import GuiaClient from './GuiaClient';

export const metadata: Metadata = {
  title: 'Guia da passagem',
  description:
    'Estude qualquer capítulo ou versículo com ficha teológica, comentários clássicos, léxico original e referências cruzadas.',
};

export default function GuiaPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-16 text-sm text-muted-foreground">Carregando guia…</div>}>
      <GuiaClient />
    </Suspense>
  );
}
