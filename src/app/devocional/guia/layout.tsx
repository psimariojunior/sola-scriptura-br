import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guia Devocional | Sola Scriptura BR',
  description: 'Guia completo de devocional cristão: como estudar a Bíblia, orar, meditar e aplicar as Escrituras no dia a dia. Práticas espirituais.',
  keywords: ['guia devocional', 'devocional', 'oração', 'meditação', 'práticas espirituais', 'estudo bíblico'],
  openGraph: {
    title: 'Guia Devocional | Sola Scriptura BR',
    description: 'Guia completo de devocional cristão e práticas espirituais.',
  },
};

export default function GuiaDevocionalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
