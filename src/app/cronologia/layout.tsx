import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Cronologia Bíblica — Linha do Tempo Interativa | Sola Scriptura BR',
  description: 'Linha do tempo interativa com eventos bíblicos cronologicamente organizados. Criação, patriarcas, êxodo, reinos, exílio, ministério de Jesus e era apostólica.',
  keywords: ['cronologia bíblica', 'linha do tempo', 'eventos bíblicos', 'história bíblica', 'cronologia', 'eras bíblicas'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/cronologia`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/cronologia`,
    title: 'Cronologia Bíblica — Linha do Tempo Interativa | Sola Scriptura BR',
    description: 'Linha do tempo interativa com eventos bíblicos cronologicamente organizados.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Cronologia Bíblica — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cronologia Bíblica — Linha do Tempo Interativa | Sola Scriptura BR',
    description: 'Linha do tempo interativa com eventos bíblicos.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400;

export default function CronologiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
