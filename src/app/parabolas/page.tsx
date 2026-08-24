import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ParabolasClient from './ParabolasClient';

export const metadata: Metadata = {
  title: 'Parabolas de Jesus',
  description: 'Indice completo das parabolas de Cristo nos Evangelhos. Referencias sinoticas, temas e interpretacoes resumidas de cada parabola.',
  openGraph: {
    title: 'Parabolas de Jesus | Sola Scriptura BR',
    description: 'Indice completo das parabolas de Cristo nos Evangelhos. Referencias sinoticas, temas e interpretacoes.',
    url: 'https://solascripturabr.com.br/parabolas',
  },
};

export default function ParabolasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ParabolasClient />
      </main>
      <Footer />
    </div>
  );
}
