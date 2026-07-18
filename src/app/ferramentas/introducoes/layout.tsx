import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Introduções aos Livros | Sola Scriptura BR',
  description: 'Introduções completas a cada livro da Bíblia: autor, data, propósito, tema, estrutura e contexto histórico. Pré-requisito para todo estudo.',
  keywords: ['introduções bíblicas', 'livros da Bíblia', 'autor', 'data', 'propósito', 'contexto histórico', 'estudo bíblico'],
  openGraph: {
    title: 'Introduções aos Livros | Sola Scriptura BR',
    description: 'Introduções completas a cada livro da Bíblia.',
  },
};

export default function IntroducoesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
