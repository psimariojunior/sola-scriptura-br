import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Ferramentas Bíblicas — Concordância, Exegese e Mais | Sola Scriptura BR',
  description: 'Todas as ferramentas de estudo bíblico em um só lugar: concordância, crítica textual, introduções por livro, exegese com IA e harmonia sinótica. Tudo gratuito.',
  keywords: ['ferramentas bíblicas', 'estudo bíblico', 'concordância', 'exegese', 'crítica textual', 'introduções bíblicas'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/ferramentas`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/ferramentas`,
    title: 'Ferramentas Bíblicas — Concordância, Exegese e Mais | Sola Scriptura BR',
    description: 'Explore todas as ferramentas de estudo bíblico gratuitas.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Ferramentas Bíblicas — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferramentas Bíblicas — Concordância, Exegese e Mais | Sola Scriptura BR',
    description: 'Explore todas as ferramentas de estudo bíblico gratuitas.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FerramentasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
