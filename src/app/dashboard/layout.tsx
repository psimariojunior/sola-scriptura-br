import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Dashboard — Meu Progresso | Sola Scriptura BR',
  description: 'Acompanhe seu progresso de estudo bíblico: sequência diária, gráfico semanal, livros lidos, tempo de estudo e conquistas de gamificação.',
  keywords: ['dashboard', 'progresso', 'estudo bíblico', 'sequência', 'gamificação', 'conquistas'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/dashboard`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/dashboard`,
    title: 'Dashboard — Meu Progresso | Sola Scriptura BR',
    description: 'Acompanhe seu progresso de estudo bíblico com gráficos e conquistas.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Dashboard — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard — Meu Progresso | Sola Scriptura BR',
    description: 'Acompanhe seu progresso de estudo bíblico.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
