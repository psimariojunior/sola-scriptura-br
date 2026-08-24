import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import PersonagensClient from './PersonagensClient';

export const metadata: Metadata = {
  title: 'Personagens Biblicos',
  description: 'Biografias detalhadas dos personagens biblicos com linhagem, referencias, doutrinas e tipologia. Antigo e Novo Testamento.',
  openGraph: {
    title: 'Personagens Biblicos | Sola Scriptura BR',
    description: 'Biografias detalhadas dos personagens biblicos com linhagem, referencias, doutrinas e tipologia.',
    url: 'https://solascripturabr.com.br/personagens',
  },
};

export default function PersonagensPage() {
  return (
    <div className="min-h-screen bg-pattern-olive">
      <Header />
      <main id="main-content" className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <PersonagensClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
