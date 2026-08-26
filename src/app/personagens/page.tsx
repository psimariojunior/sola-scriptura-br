import { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
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
    <PageShell maxWidth="7xl">
      <PersonagensClient />
    </PageShell>
  );
}
