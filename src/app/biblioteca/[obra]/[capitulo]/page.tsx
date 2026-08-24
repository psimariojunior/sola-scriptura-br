import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OBRAS, getObraConteudo } from '@/data/biblioteca';
import { LeitorObra } from '@/components/biblioteca/LeitorObra';

interface Props {
  params: Promise<{ obra: string; capitulo: string }>;
}

export function generateStaticParams() {
  return OBRAS.flatMap((o) =>
    Array.from({ length: o.numCapitulos }, (_, i) => ({
      obra: o.id,
      capitulo: String(i + 1),
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { obra: id, capitulo } = await params;
  const meta = OBRAS.find((o) => o.id === id);
  const conteudo = await getObraConteudo(id);
  const cap = conteudo?.capitulos[parseInt(capitulo, 10) - 1];
  if (!meta || !cap) return {};
  return {
    title: `${cap.titulo} — ${meta.titulo.replace(' (seleções)', '')} | Biblioteca Sola Scriptura`,
    description: `Capítulo ${cap.numero}: ${cap.titulo}. ${meta.autor.split('(')[0].trim()}, ${meta.anoTexto}.`,
  };
}

export default async function CapituloPage({ params }: Props) {
  const { obra: id, capitulo } = await params;
  const n = parseInt(capitulo, 10);
  if (Number.isNaN(n) || n < 1) notFound();

  const meta = OBRAS.find((o) => o.id === id);
  const conteudo = await getObraConteudo(id);
  if (!meta || !conteudo || n > conteudo.capitulos.length) notFound();

  const cap = conteudo.capitulos[n - 1];
  const titulos = conteudo.capitulos.map((c) => ({ numero: c.numero, titulo: c.titulo }));

  return <LeitorObra meta={meta} capitulo={cap} titulos={titulos} />;
}
