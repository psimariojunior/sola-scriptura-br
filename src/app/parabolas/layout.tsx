import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parábolas de Jesus | Sola Scriptura BR',
  description: 'Todas as parábolas de Jesus organizadas com contexto, versículos e lições práticas. Estudo completo das parábolas do Novo Testamento.',
  keywords: ['parábolas de Jesus', 'parábolas bíblicas', 'Novo Testamento', 'ensinamentos de Jesus', 'estudo bíblico'],
  openGraph: {
    title: 'Parábolas de Jesus | Sola Scriptura BR',
    description: 'Todas as parábolas de Jesus com contexto e lições.',
  },
};

export default function ParabolasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
