import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assistente Bíblico IA',
  description: 'IA especializada em estudos bíblicos acadêmicos. Tire dúvidas sobre teologia, exegese, personagens, história e contexto bíblico.',
  keywords: ['inteligência artificial', 'IA bíblica', 'assistente', 'teologia', 'exegese', 'perguntas bíblicas', 'ChatGPT bíblia'],
  openGraph: {
    title: 'Assistente Bíblico IA | Sola Scriptura BR',
    description: 'IA especializada em estudos bíblicos acadêmicos.',
  },
};

export default function IaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
