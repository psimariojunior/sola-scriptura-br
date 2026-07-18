import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apresentar Sola Scriptura | Sola Scriptura BR',
  description: 'Modo de apresentação do Sola Scriptura BR. Exiba versículos, estudos e recursos bíblicos em tela cheia para grupo ou igreja.',
  keywords: ['apresentação', 'tela cheia', 'igreja', 'grupo', 'projeção bíblica'],
  openGraph: {
    title: 'Apresentar Sola Scriptura | Sola Scriptura BR',
    description: 'Modo de apresentação para projeção em tela cheia.',
  },
};

export default function ApresentarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
