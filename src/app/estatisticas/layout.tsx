import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estatísticas de Leitura',
  description: 'Acompanhe seu progresso de leitura bíblica. Sequência diária, capítulos por semana, livros mais lidos e calendário de atividades.',
  keywords: ['estatísticas', 'progresso', 'leitura bíblica', 'sequência', 'hábitos de estudo'],
  openGraph: {
    title: 'Estatísticas de Leitura | Sola Scriptura BR',
    description: 'Acompanhe seu progresso de leitura bíblica.',
  },
};

export default function EstatisticasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
