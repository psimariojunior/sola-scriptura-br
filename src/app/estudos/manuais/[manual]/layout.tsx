import type { Metadata } from 'next';
import { manuaisBiblicos } from '@/data/manuais';

type Props = {
  params: Promise<{ manual: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { manual: slug } = await params;
  const manual = manuaisBiblicos.find((m) => m.slug === slug);

  if (!manual) {
    return {
      title: 'Manual Bíblico | Sola Scriptura BR',
      description: 'Manual bíblico detalhado para estudo sistemático das Escrituras.',
    };
  }

  return {
    title: `${manual.titulo} — Manual | Sola Scriptura BR`,
    description: manual.descricao || `Manual bíblico: ${manual.titulo}. Material completo para estudo sistemático.`,
    openGraph: {
      title: `${manual.titulo} — Manual | Sola Scriptura BR`,
      description: manual.descricao || `Manual bíblico: ${manual.titulo}.`,
    },
  };
}

export default function ManualDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
