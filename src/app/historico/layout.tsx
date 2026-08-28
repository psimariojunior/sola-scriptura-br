import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Histórico de leitura',
  description: 'Capítulos recentes e marcadores para continuar o estudo.',
};

export default function HistoricoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
