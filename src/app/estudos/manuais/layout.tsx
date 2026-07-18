import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manuais Bíblicos | Sola Scriptura BR',
  description: 'Manuais bíblicos completos para estudo sistemático: manuais por livro, por tema e por período. Material organizado para aprofundar seu estudo.',
  keywords: ['manuais bíblicos', 'manuais', 'estudo sistemático', 'material de estudo', 'Bíblia'],
  openGraph: {
    title: 'Manuais Bíblicos | Sola Scriptura BR',
    description: 'Manuais bíblicos completos para estudo sistemático.',
  },
};

export default function ManuaisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
