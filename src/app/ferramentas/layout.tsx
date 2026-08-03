import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ferramentas Bíblicas — Estudo, Busca e Aprendizado',
  description: 'Explore todas as ferramentas de estudo bíblico: concordância, exegese com IA, harmonia sinótica, referências cruzadas e muito mais. Tudo gratuito.',
  keywords: ['ferramentas bíblicas', 'estudo bíblico', 'concordância', 'exegese', 'harmonia sinótica', 'lexicon'],
  openGraph: {
    title: 'Ferramentas Bíblicas | Sola Scriptura BR',
    description: 'Explore todas as ferramentas de estudo bíblico.',
  },
};

export default function FerramentasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
