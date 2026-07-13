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
    default: 'Sola Scriptura BR — Estudo Bíblico Acadêmico com IA',
    template: '%s | Sola Scriptura BR',
  },
  description:
    'Plataforma completa de estudo bíblico acadêmico com IA. Bíblia em 6 traduções, Grego e Hebraico com léxico Strong, Exegese automática, Teologia Sistemática, Concordância, Comentários de teólogos e ferramentas avançadas de pesquisa.',
  keywords: [
    'bíblia', 'estudo bíblico', 'grego', 'hebraico', 'teologia', 'exegese',
    'comentários', 'concordância', 'léxico strong', 'bíblia online',
    'Sola Scriptura', 'inteligência artificial', 'estudo bíblico com IA',
    'bíblia em português', 'hermenêutica', 'crítica textual',
  ],
  authors: [{ name: 'Sola Scriptura BR' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  metadataBase: new URL('https://sola-scriptura-two.vercel.app'),
  alternates: {
    canonical: 'https://sola-scriptura-two.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://sola-scriptura-two.vercel.app',
    siteName: 'Sola Scriptura BR',
    title: 'Sola Scriptura BR — Estudo Bíblico Acadêmico com IA',
    description:
      'Bíblia em 6 traduções, Grego e Hebraico com léxico Strong, Exegese automática com IA, Teologia Sistemática e ferramentas avançadas de pesquisa bíblica.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sola Scriptura BR — Estudo Bíblico Acadêmico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sola Scriptura BR — Estudo Bíblico Acadêmico com IA',
    description:
      'Bíblia em 6 traduções, Grego e Hebraico, Exegese com IA, Teologia e ferramentas avançadas de pesquisa bíblica.',
    images: ['/og-image.png'],
    creator: '@solascriptura_br',
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
  manifest: '/manifest.json',
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:rounded-xl focus:bg-[var(--primary)] focus:text-[var(--primary-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2">
          Pular para o conteúdo principal
        </a>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
