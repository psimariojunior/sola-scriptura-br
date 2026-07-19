import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Spectral } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
  display: 'optional',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'optional',
});

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-spectral',
  display: 'optional',
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
  authors: [{ name: 'Sola Scriptura BR', url: 'https://solascripturabr.com.br' }],
  creator: 'Sola Scriptura BR',
  publisher: 'Sola Scriptura BR',
  applicationName: 'Sola Scriptura BR',
  category: 'Education',
  classification: 'Educational',
  metadataBase: new URL('https://solascripturabr.com.br'),
  alternates: {
    canonical: 'https://solascripturabr.com.br',
    languages: {
      'pt-BR': 'https://solascripturabr.com.br',
      'en-US': 'https://solascripturabr.com.br/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://solascripturabr.com.br',
    siteName: 'Sola Scriptura BR',
    title: 'Sola Scriptura BR — Toda a biblioteca teológica',
    description:
      'Bíblia em 6 traduções, Grego e Hebraico com léxico Strong, Exegese automática com IA, Teologia Sistemática e ferramentas avançadas de pesquisa bíblica.',
    countryName: 'Brazil',
    emails: ['contato@solascriptura.app'],
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sola Scriptura BR — Toda a biblioteca teológica',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@solascriptura_br',
    creator: '@solascriptura_br',
    title: 'Sola Scriptura BR — Toda a biblioteca teológica',
    description:
      'Bíblia em 6 traduções, Grego e Hebraico, Exegese com IA, Teologia e ferramentas avançadas de pesquisa bíblica.',
    images: ['/opengraph-image'],
  },
  facebook: undefined,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  verification: undefined,
  other: {
    'apple-mobile-web-app-title': 'Sola Scriptura',
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
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
                  /* Qualquer tema nao-claro precisa de dark para ativar dark:* do Tailwind */
                  if (!theme || theme === 'escuro' || theme === 'noturno' || theme === 'sepia') {
                    document.documentElement.classList.add('dark');
                  }
                  if (theme === 'noturno') {
                    document.documentElement.classList.add('noturno');
                  }
                  if (theme === 'sepia') {
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
