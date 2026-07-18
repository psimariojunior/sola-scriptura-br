import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assine o Sola Scriptura | Sola Scriptura BR',
  description: 'Assine o Sola Scriptura BR para acesso completo a recursos de estudo bíblico: IA, comentários, traduções e ferramentas avançadas.',
  keywords: ['assinar', 'plano', 'premium', 'Sola Scriptura BR', 'acesso completo'],
  openGraph: {
    title: 'Assine o Sola Scriptura | Sola Scriptura BR',
    description: 'Assine para acesso completo a recursos de estudo bíblico.',
  },
};

export default function AssinarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
