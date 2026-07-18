import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Literatura Bíblica | Sola Scriptura BR',
  description: 'Explore os gêneros literários da Bíblia: poesia, profecia, epístolas, apocalipse, narrativa e sabedoria. Compreenda o contexto de cada livro.',
  keywords: ['literatura bíblica', 'gêneros literários', ' Bíblia', 'poesia hebraica', 'profecia', 'epístolas', 'estudo bíblico'],
  openGraph: {
    title: 'Literatura Bíblica | Sola Scriptura BR',
    description: 'Explore os gêneros literários da Bíblia.',
  },
};

export default function LiteraturaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
