import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gamificação Bíblica | Sola Scriptura BR',
  description: 'Gamificação do estudo bíblico: conquistas, níveis, desafios e recompensas. Torne seu estudo bíblico mais envolvente e motivador.',
  keywords: ['gamificação', 'conquistas', 'desafios', 'estudo bíblico', 'motivação', 'recompensas'],
  openGraph: {
    title: 'Gamificação Bíblica | Sola Scriptura BR',
    description: 'Gamificação do estudo bíblico com conquistas e desafios.',
  },
};

export default function GamificacaoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
