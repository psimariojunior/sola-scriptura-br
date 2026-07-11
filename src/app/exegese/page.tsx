import type { Metadata } from 'next';
import { ExegeseClient } from './client';

export const metadata: Metadata = {
  title: 'Exegese Bíblica — Análise Automática',
  description: 'Ferramenta de exegese automática com análise contextual, gramatical e teológica das Escrituras. Interpretação aprofundada de versículos.',
  keywords: ['exegese', 'exegese bíblica', 'análise bíblica', 'interpretação', 'contexto bíblico', 'gramática', 'teologia'],
  openGraph: {
    title: 'Exegese Bíblica | Sola Scriptura BR',
    description: 'Análise contextual, gramatical e teológica das Escrituras.',
  },
};

export default function ExegesePage() {
  return <ExegeseClient />;
}
