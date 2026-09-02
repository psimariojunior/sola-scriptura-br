import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TRILHAS_LIVRO, obterTrilhaPorSlug } from '@/data/trilhasLivro';
import { TrilhaLivroClient } from '@/components/cursos/TrilhaLivroClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return TRILHAS_LIVRO.map((t) => ({ trilha: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trilha: string }>;
}): Promise<Metadata> {
  const { trilha } = await params;
  const t = obterTrilhaPorSlug(trilha);
  if (!t) return { title: 'Trilha' };
  return {
    title: `${t.titulo} — certificado`,
    description: t.descricao,
  };
}

export default async function TrilhaPage({
  params,
}: {
  params: Promise<{ trilha: string }>;
}) {
  const { trilha } = await params;
  const t = obterTrilhaPorSlug(trilha);
  if (!t) notFound();
  return <TrilhaLivroClient slug={t.slug} />;
}
