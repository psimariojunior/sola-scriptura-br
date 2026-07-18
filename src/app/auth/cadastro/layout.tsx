import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro | Sola Scriptura BR',
  description: 'Crie sua conta gratuita no Sola Scriptura BR. Cadastre-se com email/senha ou Google OAuth para começar seus estudos bíblicos.',
  keywords: ['cadastro', 'criar conta', 'registrar', 'Sola Scriptura BR', 'conta gratuita'],
  openGraph: {
    title: 'Cadastro | Sola Scriptura BR',
    description: 'Crie sua conta gratuita no Sola Scriptura BR.',
  },
};

export default function CadastroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
