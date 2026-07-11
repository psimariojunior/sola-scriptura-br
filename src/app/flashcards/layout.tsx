import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flashcards Bíblicos',
  description: 'Sistema de flashcards para memorização de versículos. Repetição espaçada, estatísticas de progresso e prática ativa.',
  keywords: ['flashcards', 'memorização', 'versículos', 'repetição espaçada', 'estudo bíblico', 'mnemônico'],
  openGraph: {
    title: 'Flashcards Bíblicos | Sola Scriptura BR',
    description: 'Memorize versículos com flashcards e repetição espaçada.',
  },
};

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
