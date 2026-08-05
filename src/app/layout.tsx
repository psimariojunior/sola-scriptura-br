import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import LayoutWrapper from '@/components/LayoutWrapper';
import './globals.css';

const cormorant = localFont({
  src: [
    { path: '../../public/fonts/cormorant-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/cormorant-latin-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-cormorant',
  display: 'optional',
});

const inter = localFont({
  src: [
    { path: '../../public/fonts/inter-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/inter-latin-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const spectral = localFont({
  src: [
    { path: '../../public/fonts/spectral-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/spectral-latin-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-spectral',
  display: 'optional',
});

export const metadata: Metadata = {
  title: {
    default: 'Sola Scriptura BR — Estudo Bíblico Acadêmico com IA',
    template: '%s | Sola Scriptura BR',
  },
  description:
    'Plataforma completa de estudo bíblico acadêmico com IA. Bíblia em 10 traduções, Grego e Hebraico com léxico Strong, Exegese automática, Teologia Sistemática, Concordância, Comentários de teólogos e ferramentas avançadas de pesquisa.',
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
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://solascripturabr.com.br',
    siteName: 'Sola Scriptura BR',
    title: 'Sola Scriptura BR — Toda a biblioteca teológica',
    description:
      'Bíblia em 10 traduções, Grego e Hebraico com léxico Strong, Exegese automática com IA, Teologia Sistemática e ferramentas avançadas de pesquisa bíblica.',
    countryName: 'Brazil',
    emails: ['contato@solascriptura.app'],
    images: [
      {
        url: 'https://solascripturabr.com.br/opengraph-image',
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
      'Bíblia em 10 traduções, Grego e Hebraico, Exegese com IA, Teologia e ferramentas avançadas de pesquisa bíblica.',
    images: ['https://solascripturabr.com.br/opengraph-image'],
  },
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
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon-192.png',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Sola Scriptura BR',
  url: 'https://solascripturabr.com.br',
  description:
    'Plataforma completa de estudo bíblico acadêmico com IA. Bíblia em 10 traduções, Grego e Hebraico com léxico Strong, Exegese automática, Teologia Sistemática e ferramentas avançadas.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  inLanguage: 'pt-BR',
  featureList: [
    'Bíblia em 10 traduções',
    'Léxico Grego e Hebraico Strong',
    'Exegese automática com IA',
    'Teologia Sistemática',
    'Concordância bíblica',
    'Comentários de teólogos',
    'Referências cruzadas',
    'Atlas bíblico interativo',
    'Harmonia sinótica',
    'Planos de leitura personalizados',
  ],
  author: { '@type': 'Organization', name: 'Sola Scriptura BR', url: 'https://solascripturabr.com.br' },
};

// Script inline para evitar flash de tema (FOUC). Carrega antes do CSS.
const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('ssb_theme') || '';
    var theme = t;
    if (!theme) {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'escuro' : 'claro';
    }
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.add('theme-' + theme);
    if (theme === 'escuro' || theme === 'noturno' || theme === 'sepia' || theme === 'dim') {
      root.classList.add('dark');
    }
    if (theme === 'noturno') root.classList.add('noturno');
    if (theme === 'sepia') root.classList.add('sepia');
    if (theme === 'dim') root.classList.add('dim');
  } catch (_) {
    document.documentElement.classList.add('dark');
  }
})();
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${spectral.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="https://api.midvash.com" />
        <link rel="dns-prefetch" href="https://api.solascripturabr.com.br" />
        <link rel="preconnect" href="https://api.midvash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.solascripturabr.com.br" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Pular para o conteúdo principal
        </a>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
