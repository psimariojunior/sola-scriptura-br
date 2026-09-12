import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Atlas Bíblico Interativo | Sola Scriptura BR',
  description: 'Atlas bíblico interativo com 20+ locais mapeados via OpenStreetMap. Cidades, regiões, montes, mares e rios das Escrituras com rotas e períodos históricos.',
  keywords: ['atlas bíblico', 'mapa bíblico', 'locais bíblicos', 'geografia bíblica', 'mapa interativo', 'terra santa', 'OpenStreetMap'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/atlas`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/atlas`,
    title: 'Atlas Bíblico Interativo | Sola Scriptura BR',
    description: 'Atlas bíblico interativo com 20+ locais das Escrituras em mapa detalhado.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Atlas Bíblico — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Bíblico Interativo | Sola Scriptura BR',
    description: 'Atlas bíblico interativo com locais das Escrituras.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
