import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Notas Pessoais — Anotações Bíblicas | Sola Scriptura BR',
  description: 'Crie e organize suas anotações bíblicas pessoais com editor rico, tags, busca e histórico de versões. Suas observações sobre as Escrituras em um só lugar.',
  keywords: ['notas bíblicas', 'anotações', 'estudo pessoal', 'observações bíblicas', 'notas de estudo'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/notas`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/notas`,
    title: 'Notas Pessoais — Anotações Bíblicas | Sola Scriptura BR',
    description: 'Crie e organize suas anotações bíblicas pessoais com editor rico e tags.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Notas Pessoais — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notas Pessoais — Anotações Bíblicas | Sola Scriptura BR',
    description: 'Crie e organize suas anotações bíblicas pessoais.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
