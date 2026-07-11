import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teologia Sistemática',
  description: 'Doutrinas fundamentais da fé cristã bíblica. Trindade, salvação, escatologia, cristologia e mais — organizadas por categorias com referências.',
  keywords: ['teologia', 'teologia sistemática', 'doutrinas', 'fé cristã', 'trindade', 'salvação', 'cristologia', 'escatologia'],
  openGraph: {
    title: 'Teologia Sistemática | Sola Scriptura BR',
    description: 'Doutrinas fundamentais da fé cristã com referências bíblicas.',
  },
};

export default function TeologiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
