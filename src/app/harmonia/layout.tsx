import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harmonia Sinótica | Sola Scriptura BR',
  description: 'Harmonia sinótica dos Evangelhos: compare Mateus, Marcos e Lucas lado a lado. Identifique paralelos e diferenças nos relatos evangélicos.',
  keywords: ['harmonia sinótica', 'Evangelhos', 'Mateus', 'Marcos', 'Lucas', 'paralelos evangélicos', 'estudo bíblico'],
  openGraph: {
    title: 'Harmonia Sinótica | Sola Scriptura BR',
    description: 'Compare paralelos entre Mateus, Marcos e Lucas.',
  },
};

export default function HarmoniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
