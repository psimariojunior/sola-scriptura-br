import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { RegisterSW } from '@/components/pwa/register-sw';

export const metadata: Metadata = {
  title: 'Sola Scriptura — Estudo Bíblico Avançado',
  description: 'Plataforma de exegese, hermenêutica e teologia bíblica. Grego, hebraico, arqueologia e IA especialista em um só lugar.',
  manifest: '/manifest.json',
  applicationName: 'Sola Scriptura',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sola Scriptura',
  },
  icons: {
    icon: [{ url: '/manifest.json', sizes: 'any' }],
    apple: [{ url: '/manifest.json' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#4a3728',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4a3728" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Sola Scriptura" />
      </head>
      <body>
        <Providers>
          <RegisterSW />
          {children}
        </Providers>
      </body>
    </html>
  );
}
