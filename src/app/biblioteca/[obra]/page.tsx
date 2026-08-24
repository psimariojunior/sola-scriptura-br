import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OBRAS, getObraConteudo } from '@/data/biblioteca';
import { ObraDetalhe } from '@/components/biblioteca/ObraDetalhe';

interface Props {
  params: Promise<{ obra: string }>;
}

export function generateStaticParams() {
  return OBRAS.map((o) => ({ obra: o.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { obra: id } = await params;
  const meta = OBRAS.find((o) => o.id === id);
  if (!meta) return {};
  return {
    title: `${meta.titulo} — ${meta.autor.split('(')[0].trim()} | Biblioteca Sola Scriptura`,
    description: meta.descricao,
    openGraph: { title: meta.titulo, description: meta.descricao },
  };
}

export default async function ObraPage({ params }: Props) {
  const { obra: id } = await params;
  const meta = OBRAS.find((o) => o.id === id);
  const conteudo = await getObraConteudo(id);
  if (!meta || !conteudo) notFound();

  const capitulos = conteudo.capitulos.map((c) => ({ numero: c.numero, titulo: c.titulo }));

  return <ObraDetalhe meta={meta} capitulos={capitulos} />;
}
