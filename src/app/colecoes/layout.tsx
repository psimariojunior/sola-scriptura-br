import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Coleções — Listas de Versículos | Sola Scriptura BR',
  description: 'Crie coleções personalizadas de versículos. Organize passagens por tema, estudo ou projeto em listas organizadas e compartilháveis.',
  keywords: ['coleções', 'listas de versículos', 'organização bíblica', 'passagens por tema', 'estudo bíblico'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/colecoes`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/colecoes`,
    title: 'Coleções — Listas de Versículos | Sola Scriptura BR',
    description: 'Crie coleções personalizadas de versículos organizadas por tema.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Coleções — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coleções — Listas de Versículos | Sola Scriptura BR',
    description: 'Crie coleções personalizadas de versículos.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ColecoesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
