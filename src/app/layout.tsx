import type { Metadata } from 'next';
import LayoutWrapper from '@/components/LayoutWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Sola Scriptura — Estudo Bíblico Acadêmico',
    template: '%s | Sola Scriptura BR',
  },
  description: 'Plataforma de estudo bíblico avançado. Grego, Hebraico, Teologia, Exegese, IA especializada. Melhor que Logos.',
  keywords: ['bíblia', 'estudo bíblico', 'grego', 'hebraico', 'teologia', 'exegese', 'comentários', 'Sola Scriptura'],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  metadataBase: new URL('https://sola-scriptura-two.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://sola-scriptura-two.vercel.app',
    siteName: 'Sola Scriptura BR',
    title: 'Sola Scriptura — Estudo Bíblico Acadêmico',
    description: 'Plataforma de estudo bíblico avançado. Grego, Hebraico, Teologia, Exegese, IA especializada.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sola Scriptura BR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sola Scriptura — Estudo Bíblico Acadêmico',
    description: 'Plataforma de estudo bíblico avançado. Grego, Hebraico, Teologia, Exegese, IA especializada.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.midvash.com" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
