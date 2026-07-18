import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compartilhar Versículos | Sola Scriptura BR',
  description: 'Compartilhe versículos bíblicos com imagens personalizadas. Crie e compartilhe versículos das Escrituras nas redes sociais.',
  keywords: ['compartilhar versículos', 'versículos bíblicos', 'imagens bíblicas', 'redes sociais', 'Evangelho'],
  openGraph: {
    title: 'Compartilhar Versículos | Sola Scriptura BR',
    description: 'Compartilhe versículos bíblicos com imagens personalizadas.',
  },
};

export default function CompartilharLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
