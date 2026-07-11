import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meus Estudos',
  description: 'Organize seus versículos favoritos, anotações e marcações. Exporte seus estudos em JSON, TXT e CSV.',
  keywords: ['estudos', 'favoritos', 'anotações', 'marcações', 'versículos salvos', 'organizar estudos'],
  openGraph: {
    title: 'Meus Estudos | Sola Scriptura BR',
    description: 'Organize seus versículos favoritos e anotações.',
  },
};

export default function EstudosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
