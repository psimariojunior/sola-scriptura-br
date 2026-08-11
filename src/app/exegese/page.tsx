import type { Metadata } from 'next';
import { ExegeseClient } from './client';

export const metadata: Metadata = {
  title: 'Estudo Bíblico Multirreferencial — Análise Integrada',
  description: 'Ferramenta de estudo bíblico com análise contextual, gramatical e teológica das Escrituras. Integra texto, contexto histórico, léxico e doutrinas.',
  keywords: ['estudo bíblico', 'análise bíblica', 'interpretação', 'contexto bíblico', 'gramática', 'teologia', 'léxico'],
  openGraph: {
    title: 'Estudo Bíblico Multirreferencial | Sola Scriptura BR',
    description: 'Análise contextual, gramatical e teológica das Escrituras.',
  },
};

export default function ExegesePage() {
  return <ExegeseClient />;
}
