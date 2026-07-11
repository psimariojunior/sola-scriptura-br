import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Línguas Originais — Grego e Hebraico',
  description: 'Estude o texto bíblico nas línguas originais: Grego Koiné do Novo Testamento e Hebraico Bíblico do Antigo Testamento. Lexicon completo com Strong.',
  keywords: ['grego bíblico', 'hebraico', 'línguas originais', 'Strong', 'lexicon', 'transliteração', 'Koiné', 'estudo bíblico'],
  openGraph: {
    title: 'Línguas Originais — Grego e Hebraico | Sola Scriptura BR',
    description: 'Estude o texto bíblico nas línguas originais com lexicon completo.',
  },
};

export default function IdiomasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
