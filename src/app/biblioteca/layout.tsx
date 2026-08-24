import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca Digital — Clássicos da Fé | Sola Scriptura BR',
  description:
    '15 obras-primas do cristianismo de domínio público: Pais da Igreja, credos ecumênicos, Reforma, catecismos e Josefo. Textos integrais com fichas acadêmicas e leitor premium. Grátis.',
  keywords: [
    'biblioteca cristã',
    'pais da igreja',
    'didache',
    'agostinho confissões',
    '95 teses',
    'catecismo westminster',
    'calvino institutas',
    'josefo',
  ],
  openGraph: {
    title: 'Biblioteca Digital — Clássicos da Fé | Sola Scriptura BR',
    description:
      'Os clássicos que o Logos cobra caro para vender: grátis, com leitor premium e fichas acadêmicas.',
  },
};

export default function BibliotecaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
