import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlas Bíblico — Mapa Interativo',
  description: 'Explore locais bíblicos em um mapa interativo com 50+ locais mapeados. Cidades, regiões, montes, mares e rios das Escrituras.',
  keywords: ['atlas bíblico', 'mapa bíblico', 'locais bíblicos', 'geografia bíblica', 'mapa interativo', 'terra santa'],
  openGraph: {
    title: 'Atlas Bíblico — Mapa Interativo | Sola Scriptura BR',
    description: 'Explore locais bíblicos em um mapa interativo.',
  },
};

export default function FerramentasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
