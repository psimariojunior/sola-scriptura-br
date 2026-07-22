import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('@/components/home/HomeClient'), { ssr: false });

export const metadata: Metadata = {
  title: 'Sola Scriptura BR — Estudo Bíblico Acadêmico com IA',
  description:
    'Plataforma gratuita de estudo bíblico acadêmico com IA. Bíblia em 6 traduções, Grego e Hebraico com léxico Strong, Exegese automática, Teologia Sistemática e ferramentas avançadas de pesquisa.',
};

export default function Home() {
  return <HomeClient />;
}
