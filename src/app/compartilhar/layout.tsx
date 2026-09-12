import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Compartilhar Versículos — Criador de Imagens | Sola Scriptura BR',
  description: 'Compartilhe versículos bíblicos com imagens personalizadas no formato 1080x1080. Crie imagens sociais com Canvas API e compartilhe no WhatsApp e redes sociais.',
  keywords: ['compartilhar versículos', 'versículos bíblicos', 'imagens bíblicas', 'criador de imagem', 'redes sociais', 'Evangelho'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/compartilhar`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/compartilhar`,
    title: 'Compartilhar Versículos — Criador de Imagens | Sola Scriptura BR',
    description: 'Compartilhe versículos bíblicos com imagens personalizadas.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Compartilhar Versículos — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compartilhar Versículos — Criador de Imagens | Sola Scriptura BR',
    description: 'Compartilhe versículos bíblicos com imagens personalizadas.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CompartilharLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
