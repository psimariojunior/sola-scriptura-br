import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import TeologiaClient from './TeologiaClient';

export const metadata: Metadata = {
  title: 'Teologia Sistematizada',
  description: 'Estude as 13 categorias da teologia sistematizada: doutrinas fundamentais, cristologia, pneumatologia, bibliologia e mais. Com versiculos-chave e tradicoes teologicas.',
  openGraph: {
    title: 'Teologia Sistematizada | Sola Scriptura BR',
    description: 'Estude as 13 categorias da teologia sistematizada com versiculos-chave e tradicoes teologicas.',
    url: 'https://solascripturabr.com.br/teologia',
  },
};

export default function TeologiaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <TeologiaClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
