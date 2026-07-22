import type { Metadata } from 'next';
import { HomeLoader } from '@/components/home/HomeLoader';

export const metadata: Metadata = {
  title: 'Sola Scriptura BR — Estudo Bíblico Acadêmico com IA',
  description:
    'Plataforma gratuita de estudo bíblico acadêmico com IA. Bíblia em 6 traduções, Grego e Hebraico com léxico Strong, Exegese automática, Teologia Sistemática e ferramentas avançadas de pesquisa.',
};

export default function Home() {
  return <HomeLoader />;
}
