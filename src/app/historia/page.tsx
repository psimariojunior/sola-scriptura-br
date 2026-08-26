import { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
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
    <PageShell maxWidth="7xl">
      <HistoriaClient />
    </PageShell>
  );
}
