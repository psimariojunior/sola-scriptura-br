import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Milagres de Jesus | Sola Scriptura BR',
  description: 'Todos os milagres de Jesus registrados nos Evangelhos: curas, expulsões, natureza e ressurreições. Referências bíblicas completas.',
  keywords: ['milagres de Jesus', 'milagres bíblicos', 'Evangelhos', 'curas de Jesus', 'estudo bíblico'],
  openGraph: {
    title: 'Milagres de Jesus | Sola Scriptura BR',
    description: 'Todos os milagres de Jesus com referências bíblicas.',
  },
};

export default function MilagresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
