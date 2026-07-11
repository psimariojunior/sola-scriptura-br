import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administração',
  description: 'Painel administrativo do Sola Scriptura BR. Gerencie conteúdo, usuários, estudos e configurações do sistema.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
