import { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
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
    <PageShell noContainer>
      <ConfiguracoesClient />
    </PageShell>
  );
}
