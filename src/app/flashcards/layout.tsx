import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flashcards Bíblicos',
  description: 'Memorize versículos com flashcards de repetição espaçada (SM-2). Prática ativa com flip cards, agendamento inteligente, estatísticas de progresso e sequência de acertos.',
  keywords: ['flashcards', 'memorização', 'versículos', 'repetição espaçada', 'SM-2', 'estudo bíblico', 'mnemônico', 'spaced repetition'],
  openGraph: {
    title: 'Flashcards Bíblicos | Sola Scriptura BR',
    description: 'Memorize versículos com flashcards de repetição espaçada (SM-2) e acompanhe seu progresso.',
  },
};

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
