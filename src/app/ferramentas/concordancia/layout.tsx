import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Concordância Bíblica | Sola Scriptura BR',
  description:
    'Busque qualquer palavra em toda a Bíblia e veja todas as ocorrências por livro e capítulo, com o termo destacado. Ferramenta de estudo bíblico da Sola Scriptura BR.',
  keywords: ['concordância', 'palavra', 'busca bíblica', 'estudo bíblico', 'hebreu', 'grego'],
};

export default function ConcordanciaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
