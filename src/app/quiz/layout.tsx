import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz Bíblico | Sola Scriptura BR',
  description: 'Teste seus conhecimentos bíblicos com quizzes interativos. Perguntas sobre versículos, personagens, eventos e doutrinas das Escrituras.',
  keywords: ['quiz bíblico', 'quiz', 'conhecimento bíblico', 'jogo bíblico', 'testar conhecimento'],
  openGraph: {
    title: 'Quiz Bíblico | Sola Scriptura BR',
    description: 'Teste seus conhecimentos bíblicos com quizzes interativos.',
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
