import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estudo Bíblico Detalhado | Sola Scriptura BR',
  description: 'Estudo detalhado de versículos bíblicos: contexto, comentário, referências cruzadas e análise linguistic. Aprofunde seu entendimento das Escrituras.',
  keywords: ['estudo bíblico', 'versículo', 'comentário', 'referências cruzadas', 'análise bíblica'],
  openGraph: {
    title: 'Estudo Bíblico Detalhado | Sola Scriptura BR',
    description: 'Estudo detalhado de versículos com contexto e comentário.',
  },
};

export default function EstudoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
