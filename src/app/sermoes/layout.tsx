import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sermões Bíblicos | Sola Scriptura BR',
  description: 'Sermões e pregações bíblicas organizados por tema, livro e autor. Material para estudo e preparação de mensagens.',
  keywords: ['sermões', 'pregações', 'sermões bíblicos', 'estudo bíblico', 'pregação', 'mensagem cristã'],
  openGraph: {
    title: 'Sermões Bíblicos | Sola Scriptura BR',
    description: 'Sermões e pregações bíblicas para estudo e preparação.',
  },
};

export default function SermoesModuleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
