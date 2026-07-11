import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cronologia Bíblica',
  description: 'Linha do tempo da criação à igreja primitiva. Cronologia dos principais eventos bíblicos com referências e filtros por período.',
  keywords: ['cronologia bíblica', 'linha do tempo', 'eventos bíblicos', 'criação', 'patriarcas', 'exílio', 'igreja primitiva'],
  openGraph: {
    title: 'Cronologia Bíblica | Sola Scriptura BR',
    description: 'Linha do tempo da criação à igreja primitiva.',
  },
};

export default function CronologiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
