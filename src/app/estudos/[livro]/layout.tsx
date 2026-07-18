import type { Metadata } from 'next';
import { estudosPorLivro } from '@/data/estudosPorLivro';
import { livroPorAbreviacao } from '@/data/biblia';

type Props = {
  params: Promise<{ livro: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { livro: slug } = await params;
  const livroInfo = livroPorAbreviacao.get(slug);
  const nomeLivro = livroInfo?.nome || slug.toUpperCase();
  const estudo = estudosPorLivro[slug];

  if (!estudo) {
    return {
      title: `${nomeLivro} — Estudo Bíblico | Sola Scriptura BR`,
      description: `Estudo bíblico detalhado do livro de ${nomeLivro}. Contexto, versículos-chave, tema central e aplicações práticas.`,
    };
  }

  return {
    title: `${estudo.titulo} — Estudo | Sola Scriptura BR`,
    description: `Estudo bíblico detalhado do livro de ${estudo.titulo}: ${estudo.contexto.slice(0, 120)}...`,
    openGraph: {
      title: `${estudo.titulo} — Estudo | Sola Scriptura BR`,
      description: `Estudo bíblico detalhado do livro de ${estudo.titulo}.`,
    },
  };
}

export default function EstudoLivroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
