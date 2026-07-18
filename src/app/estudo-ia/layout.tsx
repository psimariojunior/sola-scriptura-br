import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estudo com IA | Sola Scriptura BR',
  description: 'Assistente de estudo bíblico com inteligência artificial. Pergunte sobre versículos, doutrinas, história e línguas originais.',
  keywords: ['estudo com IA', 'inteligência artificial', 'assistente bíblico', 'perguntas bíblicas', 'estudo bíblico'],
  openGraph: {
    title: 'Estudo com IA | Sola Scriptura BR',
    description: 'Assistente de estudo bíblico com inteligência artificial.',
  },
};

export default function EstudoIALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
