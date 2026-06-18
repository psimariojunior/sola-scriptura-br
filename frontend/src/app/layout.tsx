import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sola Scriptura BR - Plataforma de Estudo Bíblico',
  description:
    'A plataforma mais avançada de estudo bíblico em português. Integra IA, exegese, hermenêutica, teologia sistemática, grego, hebraico e muito mais.',
  keywords: [
    'bíblia', 'estudo bíblico', 'exegese', 'hermenêutica',
    'teologia', 'grego bíblico', 'hebraico bíblico', 'IA',
    'forte', 'léxico', 'comentário bíblico',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
