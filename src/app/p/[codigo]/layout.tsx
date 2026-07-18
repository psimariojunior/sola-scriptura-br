import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compartilhamento | Sola Scriptura BR',
  description: 'Página de compartilhamento do Sola Scriptura BR. Acesse conteúdo bíblico compartilhado por outros.',
  keywords: ['compartilhamento', 'Sola Scriptura BR', 'conteúdo bíblico'],
  openGraph: {
    title: 'Compartilhamento | Sola Scriptura BR',
    description: 'Conteúdo bíblico compartilhado pelo Sola Scriptura BR.',
  },
};

export default function CompartilhamentoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
