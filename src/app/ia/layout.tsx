import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Assistente Bíblico IA — Chat com Groq | Sola Scriptura BR',
  description: 'Assistente de IA especializado em estudos bíblicos acadêmicos. Tire dúvidas sobre teologia, exegese, personagens, história e contexto bíblico com RAG vetorial.',
  keywords: ['IA bíblica', 'assistente IA', 'chat bíblico', 'teologia', 'exegese', 'perguntas bíblicas', 'Groq', 'LLM'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/ia`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/ia`,
    title: 'Assistente Bíblico IA — Chat com Groq | Sola Scriptura BR',
    description: 'Assistente de IA especializado em estudos bíblicos acadêmicos.',
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Assistente IA — Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assistente Bíblico IA — Chat com Groq | Sola Scriptura BR',
    description: 'Assistente de IA especializado em estudos bíblicos.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
