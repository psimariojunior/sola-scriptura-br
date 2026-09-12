import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Referências Cruzadas — Cadeia de 29k Conexões | Sola Scriptura BR',
  description: 'Explore a cadeia de referências cruzadas com mais de 29.000 conexões do TSK. Navegue por árvore interativa de versículos relacionados entre si.',
  keywords: ['referências cruzadas', 'TSK', 'conexões bíblicas', 'concordância', 'versículos relacionados', 'cross references'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/referencias`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/referencias`,
    title: 'Referências Cruzadas — Cadeia de 29k Conexões | Sola Scriptura BR',
    description: 'Explore mais de 29.000 referências cruzadas em árvore interativa.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Referências Cruzadas — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Referências Cruzadas — Cadeia de 29k Conexões | Sola Scriptura BR',
    description: 'Explore mais de 29.000 referências cruzadas.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400;

export default function ReferenciasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
