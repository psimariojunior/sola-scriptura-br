import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pericopes Bíblicas | Sola Scriptura BR',
  description: 'Pericopes bíblicas organizadas por livro, capítulo e tema. Divisões tradicionais do texto sagrado para estudo sistemático.',
  keywords: ['pericopes', 'pericopes bíblicas', 'divisões bíblicas', 'estudo bíblico', 'leitura organizada'],
  openGraph: {
    title: 'Pericopes Bíblicas | Sola Scriptura BR',
    description: 'Pericopes bíblicas organizadas para estudo sistemático.',
  },
};

export default function PericopesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
