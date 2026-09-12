import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Mapas Bíblicos Interativos | Sola Scriptura BR',
  description: 'Explore mapas bíblicos interativos com 20+ locais mapeados. Cidades, rotas, batalhas e eventos das Escrituras visualizados em mapa detalhado.',
  keywords: ['mapas bíblicos', 'mapa interativo', 'geografia bíblica', 'locais bíblicos', 'terra santa', 'rotas bíblicas'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/mapas`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/mapas`,
    title: 'Mapas Bíblicos Interativos | Sola Scriptura BR',
    description: 'Explore mapas bíblicos interativos com 20+ locais mapeados.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Mapas Bíblicos — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mapas Bíblicos Interativos | Sola Scriptura BR',
    description: 'Explore mapas bíblicos interativos com 20+ locais mapeados.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MapasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
