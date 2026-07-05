import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sola Scriptura — Estudo Bíblico Acadêmico',
  description: 'Plataforma de estudo bíblico avançado. Grego, Hebraico, Teologia, Exegese, IA especializada.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
