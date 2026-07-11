import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'História Bíblica — Contexto Cultural e Geográfico',
  description: 'Explore o contexto histórico, cultural e geográfico das Escrituras. Períodos bíblicos, linha do tempo, impérios e cenários bíblicos.',
  keywords: ['história bíblica', 'contexto histórico', 'períodos bíblicos', 'linha do tempo', 'impérios', 'geografia bíblica'],
  openGraph: {
    title: 'História Bíblica | Sola Scriptura BR',
    description: 'Contexto histórico, cultural e geográfico das Escrituras.',
  },
};

export default function HistoriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
