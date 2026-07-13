import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Spectral } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-spectral',
  display: 'swap',
});

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
    <html lang="pt-BR" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable} ${spectral.variable}`}>
      <head>
        <meta name="theme-color" content="#d4a843" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.midvash.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('ssb_theme');
                  if (!theme || theme === 'escuro' || theme === 'noturno') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'sepia') {
                    document.documentElement.classList.add('sepia');
                  }
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
