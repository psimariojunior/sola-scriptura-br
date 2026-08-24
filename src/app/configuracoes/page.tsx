import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ConfiguracoesClient from './ConfiguracoesClient';

export const metadata: Metadata = {
  title: 'Configurações',
  description: 'Personalize sua experiência de estudo bíblico: tema, fonte, tradução, áudio, notificações e mais.',
  openGraph: {
    title: 'Configurações | Sola Scriptura BR',
    description: 'Personalize sua experiência de estudo bíblico: tema, fonte, tradução, áudio, notificações e mais.',
    url: 'https://solascripturabr.com.br/configuracoes',
  },
};

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-4 sm:px-6">
        <ConfiguracoesClient />
      </main>
      <Footer />
    </div>
  );
}
