import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Teologia Sistemática — 13 Categorias | Sola Scriptura BR',
  description: 'Teologia sistemática organizada em 13 categorias: Deus, Cristo, Espírito Santo, Escritura, salvação, igreja, escatologia e mais. Doutrinas com versículos de apoio.',
  keywords: ['teologia sistemática', 'doutrinas', 'teologia cristã', 'Escritura', 'salvação', 'escatologia', 'igreja'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/teologia`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/teologia`,
    title: 'Teologia Sistemática — 13 Categorias | Sola Scriptura BR',
    description: 'Teologia sistemática organizada em 13 categorias com versículos de apoio.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Teologia Sistemática — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teologia Sistemática — 13 Categorias | Sola Scriptura BR',
    description: 'Teologia sistemática organizada em 13 categorias.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400;

export default function TeologiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
