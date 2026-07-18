import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planos de Leitura Bíblica | Sola Scriptura BR',
  description: 'Planos de leitura bíblica para estudar a Bíblia em 90 dias, 1 ano ou por tema. Acompanhe seu progresso e mantenha o hábito da leitura.',
  keywords: ['planos de leitura', 'leitura bíblica', 'plano Bíblia', '90 dias', '1 ano', 'hábito de leitura'],
  openGraph: {
    title: 'Planos de Leitura Bíblica | Sola Scriptura BR',
    description: 'Planos de leitura bíblica para estudar a Bíblia.',
  },
};

export default function PlanosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
