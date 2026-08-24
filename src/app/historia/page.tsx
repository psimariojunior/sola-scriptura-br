import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import HistoriaClient from './HistoriaClient';

export const metadata: Metadata = {
  title: 'Historia Biblica',
  description: 'Timeline interativa da historia biblica. Periodos, eventos cronologicos, civilizacoes paralelas e contexto cultural da Biblia.',
  openGraph: {
    title: 'Historia Biblica | Sola Scriptura BR',
    description: 'Timeline interativa da historia biblica. Periodos, eventos cronologicos e civilizacoes paralelas.',
    url: 'https://solascripturabr.com.br/historia',
  },
};

export default function HistoriaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <HistoriaClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
