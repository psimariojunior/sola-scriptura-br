import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comunidade Bíblica | Sola Scriptura BR',
  description: 'Comunidade de estudo bíblico: compartilhe insights, discuta versículos e conecte-se com outros estudiosos das Escrituras.',
  keywords: ['comunidade', 'estudo bíblico', 'discussão', 'compartilhar insights', 'estudiosos'],
  openGraph: {
    title: 'Comunidade Bíblica | Sola Scriptura BR',
    description: 'Comunidade de estudo bíblico e discussão das Escrituras.',
  },
};

export default function ComunidadeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
