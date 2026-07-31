import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Bíblia — Leitura Online com Comentários e Strong\'s | Sola Scriptura BR',
  description: 'Leia a Bíblia com 10 traduções simultâneas (ARC, ARA, ACF, KJV, NVI, WEB), léxico hebraico e grego com Strong\'s, comentários de teólogos clássicos e referências cruzadas.',
  keywords: ['Bíblia online', 'leitura bíblica', 'comentários bíblicos', 'Strong\'s', 'léxico hebraico', 'léxico grego', 'referências cruzadas', 'ARC', 'ARA', 'NVI', 'KJV'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/biblia`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/biblia`,
    title: 'Bíblia — Leitura Online com Comentários e Strong\'s | Sola Scriptura BR',
    description: 'Leia a Bíblia com 10 traduções simultâneas, léxico hebraico e grego com Strong\'s, comentários e referências cruzadas.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Bíblia — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bíblia — Leitura Online com Comentários e Strong\'s | Sola Scriptura BR',
    description: 'Leia a Bíblia com 10 traduções simultâneas, léxico hebraico e grego com Strong\'s, comentários e referências cruzadas.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BibliaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Bíblia — Leitura Online',
            description: 'Leia a Bíblia com 10 traduções simultâneas, léxico hebraico e grego com Strong\'s, comentários e referências cruzadas.',
            url: `${siteUrl}/biblia`,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Sola Scriptura BR',
              url: siteUrl,
            },
            about: {
              '@type': 'Thing',
              name: 'Bíblia',
              description: 'Livro sagrado cristão',
            },
            inLanguage: 'pt-BR',
            isAccessibleForFree: true,
            provider: {
              '@type': 'Organization',
              name: 'Sola Scriptura BR',
              url: siteUrl,
            },
          }),
        }}
      />
      {children}
    </>
  );
}
