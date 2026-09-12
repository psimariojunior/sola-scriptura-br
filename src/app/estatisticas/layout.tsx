import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Estatísticas de Leitura — Meu Progresso | Sola Scriptura BR',
  description: 'Acompanhe seu progresso de leitura bíblica com gráficos interativos. Sequência diária, capítulos por semana, livros mais lidos e calendário de atividades.',
  keywords: ['estatísticas', 'progresso', 'leitura bíblica', 'sequência', 'hábitos de estudo', 'gráficos'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/estatisticas`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/estatisticas`,
    title: 'Estatísticas de Leitura — Meu Progresso | Sola Scriptura BR',
    description: 'Acompanhe seu progresso de leitura bíblica com gráficos interativos.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Estatísticas de Leitura — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estatísticas de Leitura — Meu Progresso | Sola Scriptura BR',
    description: 'Acompanhe seu progresso de leitura bíblica.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function EstatisticasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
