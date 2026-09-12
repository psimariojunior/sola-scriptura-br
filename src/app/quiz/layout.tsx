import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Quiz Bíblico — Teste seus Conhecimentos | Sola Scriptura BR',
  description: 'Teste seus conhecimentos bíblicos com quizzes interativos. Perguntas sobre versículos, personagens, eventos e doutrinas. Modo solo e multiplayer com salas.',
  keywords: ['quiz bíblico', 'jogo bíblico', 'conhecimento bíblico', 'testar conhecimento', 'quiz multiplayer', 'trivia bíblica'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/quiz`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/quiz`,
    title: 'Quiz Bíblico — Teste seus Conhecimentos | Sola Scriptura BR',
    description: 'Teste seus conhecimentos bíblicos com quizzes interativos e multiplayer.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Quiz Bíblico — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quiz Bíblico — Teste seus Conhecimentos | Sola Scriptura BR',
    description: 'Teste seus conhecimentos bíblicos com quizzes interativos.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
