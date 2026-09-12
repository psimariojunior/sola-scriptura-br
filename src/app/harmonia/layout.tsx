import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Harmonia Sinótica — Mateus, Marcos e Lucas | Sola Scriptura BR',
  description: 'Harmonia sinótica interativa dos Evangelhos: compare Mateus, Marcos e Lucas lado a lado com 252 paralelos identificados. Identifique semelhanças e diferenças nos relatos.',
  keywords: ['harmonia sinótica', 'Evangelhos', 'Mateus', 'Marcos', 'Lucas', 'paralelos evangélicos', 'estudo bíblico'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/harmonia`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/harmonia`,
    title: 'Harmonia Sinótica — Mateus, Marcos e Lucas | Sola Scriptura BR',
    description: 'Compare paralelos entre Mateus, Marcos e Lucas com 252 paralelos identificados.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Harmonia Sinótica — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmonia Sinótica — Mateus, Marcos e Lucas | Sola Scriptura BR',
    description: 'Compare paralelos entre Mateus, Marcos e Lucas.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HarmoniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
