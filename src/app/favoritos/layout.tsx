import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Favoritos — Versículos Salvos | Sola Scriptura BR',
  description: 'Organize seus versículos favoritos com cores personalizadas, filtros por livro e cor. Exporte sua coleção e compartilhe suas passagens preferidas.',
  keywords: ['favoritos', 'versículos favoritos', 'salvar versículos', 'marcações bíblicas', 'passagens preferidas'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/favoritos`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/favoritos`,
    title: 'Favoritos — Versículos Salvos | Sola Scriptura BR',
    description: 'Organize seus versículos favoritos com cores personalizadas e filtros.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Favoritos — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Favoritos — Versículos Salvos | Sola Scriptura BR',
    description: 'Organize seus versículos favoritos com cores personalizadas.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
