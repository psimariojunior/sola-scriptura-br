import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Idiomas Bíblicos — Grego e Hebraico com Strong\'s | Sola Scriptura BR',
  description: 'Explore o léxico bíblico original com 5.526 palavras gregas e 8.674 palavras hebraicas indexadas por Strong\'s. Morfologia, transliteração, traduções e ocorrências por versículo.',
  keywords: ['idiomas bíblicos', 'grego bíblico', 'hebraico bíblico', 'Strong\'s', 'léxico', 'original', 'tradução'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/idiomas`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/idiomas`,
    title: 'Idiomas Bíblicos — Grego e Hebraico com Strong\'s | Sola Scriptura BR',
    description: 'Explore o léxico bíblico original com 5.526 palavras gregas e 8.674 palavras hebraicas indexadas por Strong\'s.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Idiomas Bíblicos — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idiomas Bíblicos — Grego e Hebraico com Strong\'s | Sola Scriptura BR',
    description: 'Explore o léxico bíblico original com 5.526 palavras gregas e 8.674 palavras hebraicas.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400;

export default function IdiomasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
