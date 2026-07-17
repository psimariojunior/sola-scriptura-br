import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca de Estudos',
  description: 'Sua biblioteca de pesquisa: estudos por livro (AT/NT), teologia sistemática, teólogos, comentários e seus estudos pessoais.',
  keywords: ['estudos', 'favoritos', 'anotações', 'marcações', 'versículos salvos', 'organizar estudos', 'teologia', 'por livro'],
  openGraph: {
    title: 'Biblioteca de Estudos | Sola Scriptura BR',
    description: 'Sua biblioteca de pesquisa bíblica: por livro, por tema e estudos pessoais.',
  },
};

export default function EstudosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
