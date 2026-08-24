import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import MilagresClient from './MilagresClient';

export const metadata: Metadata = {
  title: 'Milagres de Jesus',
  description: 'Catalogo completo dos milagres registrados nos Evangelhos. Cada milagre com localizacao, tipo, referencias e mapa.',
  openGraph: {
    title: 'Milagres de Jesus | Sola Scriptura BR',
    description: 'Catalogo completo dos milagres registrados nos Evangelhos. Cada milagre com localizacao, tipo e referencias.',
    url: 'https://solascripturabr.com.br/milagres',
  },
};

export default function MilagresPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <MilagresClient />
      </main>
      <Footer />
    </div>
  );
}
