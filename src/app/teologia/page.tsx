import { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
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
    <PageShell>
      <TeologiaClient />
    </PageShell>
  );
}
