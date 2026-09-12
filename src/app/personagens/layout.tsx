import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Personagens Bíblicos — Biografias | Sola Scriptura BR',
  description: 'Biografias completas dos personagens bíblicos. Nascimento, família, ministério, morte, versículos-chave e lições espirituais de cada personagem das Escrituras.',
  keywords: ['personagens bíblicos', 'biografias bíblicas', 'estudo bíblico', 'heróis da fé', 'profetas', 'apóstolos', 'reis'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/personagens`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/personagens`,
    title: 'Personagens Bíblicos — Biografias | Sola Scriptura BR',
    description: 'Biografias completas dos personagens bíblicos com lições espirituais.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Personagens Bíblicos — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personagens Bíblicos — Biografias | Sola Scriptura BR',
    description: 'Biografias completas dos personagens bíblicos.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400;

export default function PersonagensLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
