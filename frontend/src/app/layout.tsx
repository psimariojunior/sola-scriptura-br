import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Sola Scriptura — Estudo Bíblico Avançado',
  description: 'Plataforma de exegese, hermenêutica e teologia bíblica. Grego, hebraico, arqueologia e IA especialista em um só lugar.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
