import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Sola Scriptura BR',
  description: 'Acesse sua conta do Sola Scriptura BR. Login com email/senha ou Google OAuth para acessar seus estudos e favoritos.',
  keywords: ['login', 'entrar', 'conta', 'Sola Scriptura BR', 'autenticação'],
  openGraph: {
    title: 'Login | Sola Scriptura BR',
    description: 'Acesse sua conta do Sola Scriptura BR.',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
