import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Conta | Sola Scriptura BR',
  description: 'Gerencie sua conta do Sola Scriptura BR: preferências, favoritos, anotações e configurações de leitura bíblica.',
  keywords: ['minha conta', 'preferências', 'favoritos', 'Sola Scriptura BR'],
  openGraph: {
    title: 'Minha Conta | Sola Scriptura BR',
    description: 'Gerencie sua conta e preferências do Sola Scriptura BR.',
  },
};

export default function ContaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
