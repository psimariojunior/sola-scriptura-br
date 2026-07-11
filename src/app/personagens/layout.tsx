import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personagens Bíblicos — Biografias',
  description: 'Biografias completas dos personagens bíblicos do Antigo e Novo Testamento. Significado dos nomes, contribuições e referências.',
  keywords: ['personagens bíblicos', 'biografias', 'Antigo Testamento', 'Novo Testamento', 'personagens da bíblia', 'significado dos nomes'],
  openGraph: {
    title: 'Personagens Bíblicos — Biografias | Sola Scriptura BR',
    description: 'Biografias dos personagens bíblicos com significados e referências.',
  },
};

export default function PersonagensLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
