import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Callback de Autenticação | Sola Scriptura BR',
  description: 'Processando autenticação do Sola Scriptura BR. Aguarde enquanto verificamos suas credenciais.',
  keywords: ['autenticação', 'callback', 'verificação', 'Sola Scriptura BR'],
  openGraph: {
    title: 'Callback de Autenticação | Sola Scriptura BR',
    description: 'Processando autenticação do Sola Scriptura BR.',
  },
};

export default function AuthCallbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
