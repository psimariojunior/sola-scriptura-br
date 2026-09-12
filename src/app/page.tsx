import type { Metadata } from 'next';
import { HomeLoader } from '@/components/home/HomeLoader';

export const metadata: Metadata = {
  title: 'Estudo Bíblico Acadêmico com IA',
  description:
    'Estudo bíblico com fidelidade ao texto original — Bíblia em 10 traduções (ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA, AA, NBV), Grego e Hebraico com léxico Strong, Exegese automática, Teologia Sistemática e ferramentas avançadas de pesquisa. Gratuito, sem anúncios.',
};

export default function Home() {
  return <HomeLoader />;
}
