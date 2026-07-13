import { manuaisBiblicos, getManualBySlug } from '@/data/manuais';
import { notFound } from 'next/navigation';
import ManualDetailClient from './ManualDetailClient';

export function generateStaticParams() {
  return manuaisBiblicos.map((manual) => ({ manual: manual.slug }));
}

export default async function ManualDetailPage({
  params,
}: {
  params: Promise<{ manual: string }>;
}) {
  const { manual: slug } = await params;
  const manual = getManualBySlug(slug);
  if (!manual) notFound();

  return <ManualDetailClient manual={manual} />;
}
