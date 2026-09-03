import type { Metadata } from 'next';
import { HomeLoader } from '@/components/home/HomeLoader';

export const metadata: Metadata = {
  title: 'Estudo Bíblico Acadêmico com IA',
  description:
    'Plataforma gratuita de estudo bíblico acadêmico com IA. Bíblia em 10 traduções (ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA, AA, NBV), Grego e Hebraico com léxico Strong, Exegese automática, Teologia Sistemática e ferramentas avançadas de pesquisa.',
};

export default function Home() {
  return <HomeLoader />;
}
