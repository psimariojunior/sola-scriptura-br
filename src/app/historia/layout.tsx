import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'História Bíblica — Contexto e Cronologia | Sola Scriptura BR',
  description: 'Explore o contexto histórico das Escrituras: civilizações, impérios, eventos, datações e fontes extracanônicas que iluminam o texto bíblico.',
  keywords: ['história bíblica', 'contexto histórico', 'cronologia bíblica', 'civilizações', 'datações bíblicas', 'arqueologia'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/historia`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/historia`,
    title: 'História Bíblica — Contexto e Cronologia | Sola Scriptura BR',
    description: 'Explore o contexto histórico das Escrituras com civilizações e eventos.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'História Bíblica — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'História Bíblica — Contexto e Cronologia | Sola Scriptura BR',
    description: 'Explore o contexto histórico das Escrituras.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400;

export default function HistoriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
