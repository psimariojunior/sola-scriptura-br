import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Exegese Bíblica — Análise por IA | Sola Scriptura BR',
  description: 'Exegese automática de qualquer versículo com IA. Análise exaustiva em 12 dimensões: contexto, língua original, teologia, aplicação, referências cruzadas e mais.',
  keywords: ['exegese bíblica', 'análise bíblica', 'exegese com IA', 'interpretação bíblica', 'estudo bíblico', 'hermenêutica'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/exegese`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/exegese`,
    title: 'Exegese Bíblica — Análise por IA | Sola Scriptura BR',
    description: 'Exegese automática de qualquer versículo com IA em 12 dimensões.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Exegese Bíblica — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exegese Bíblica — Análise por IA | Sola Scriptura BR',
    description: 'Exegese automática de qualquer versículo com IA em 12 dimensões.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExegeseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
