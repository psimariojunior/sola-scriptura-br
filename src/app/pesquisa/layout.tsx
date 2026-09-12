import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Pesquisa Bíblica Avançada | Sola Scriptura BR',
  description: 'Pesquisa avançada nas Escrituras. Busca por palavras-chave, regex, filtros por testamento, livro e tradução. Busca semântica com 50 grupos de sinônimos e busca com IA.',
  keywords: ['pesquisa bíblica', 'busca bíblica', 'pesquisa avançada', 'versículos', 'palavras-chave', 'busca semântica', 'regex'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/pesquisa`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/pesquisa`,
    title: 'Pesquisa Bíblica Avançada | Sola Scriptura BR',
    description: 'Pesquise nas Escrituras com filtros avançados, busca semântica e múltiplas traduções.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Pesquisa Bíblica — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pesquisa Bíblica Avançada | Sola Scriptura BR',
    description: 'Pesquise nas Escrituras com filtros avançados e busca semântica.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PesquisaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
