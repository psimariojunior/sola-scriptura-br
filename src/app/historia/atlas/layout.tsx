import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlas Bíblico | Sola Scriptura BR',
  description: 'Atlas bíblico interativo com 50+ locais mapeados. Cidades, regiões, montes, mares e rios das Escrituras em mapa detalhado.',
  keywords: ['atlas bíblico', 'mapa bíblico', 'locais bíblicos', 'geografia bíblica', 'mapa interativo', 'terra santa'],
  openGraph: {
    title: 'Atlas Bíblico | Sola Scriptura BR',
    description: 'Atlas bíblico interativo com locais das Escrituras.',
  },
};

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
