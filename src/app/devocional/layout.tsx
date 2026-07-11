import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devocional Diário',
  description: 'Devocional diário com versículos, meditação e oração. Fortaleça sua fé com reflexões bíblicas para cada dia do ano.',
  keywords: ['devocional', 'devocional diário', 'reflexão bíblica', 'oração', 'meditação', 'fé cristã'],
  openGraph: {
    title: 'Devocional Diário | Sola Scriptura BR',
    description: 'Versículos, meditação e oração para cada dia do ano.',
  },
};

export default function DevocionalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
