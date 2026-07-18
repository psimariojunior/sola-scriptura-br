import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tópicos Teológicos | Sola Scriptura BR',
  description: 'Explore tópicos teológicos organizados por categoria: salvação, escatologia, cristologia, pneumatologia e mais. Referências bíblicas completas.',
  keywords: ['tópicos teológicos', 'teologia', 'doutrinas', 'salvação', 'escatologia', 'cristologia', 'estudo bíblico'],
  openGraph: {
    title: 'Tópicos Teológicos | Sola Scriptura BR',
    description: 'Tópicos teológicos com referências bíblicas completas.',
  },
};

export default function TopicosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
