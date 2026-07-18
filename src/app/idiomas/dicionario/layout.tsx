import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dicionário Bíblico | Sola Scriptura BR',
  description: 'Dicionário bíblico completo com definições de termos do Antigo e Novo Testamento. Referências, significados e uso nas Escrituras.',
  keywords: ['dicionário bíblico', 'termos bíblicos', 'definições', 'Antigo Testamento', 'Novo Testamento', 'estudo bíblico'],
  openGraph: {
    title: 'Dicionário Bíblico | Sola Scriptura BR',
    description: 'Dicionário bíblico com definições de termos das Escrituras.',
  },
};

export default function DicionarioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
