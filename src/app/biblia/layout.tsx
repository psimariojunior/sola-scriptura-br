import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bíblia — Leitura Multi-Tradução',
  description: 'Leia a Bíblia em múltiplas traduções: ARC, NVI, ARA, ACF, AA, NTLH, KJV, WEB. Com estudo paralelo, áudio, anotações e comparação de versões.',
  keywords: ['bíblia', 'leitura bíblica', 'ARC', 'NVI', 'ARA', 'ACF', 'KJV', 'WEB', 'múltiplas traduções', 'estudo bíblico'],
  openGraph: {
    title: 'Bíblia — Leitura Multi-Tradução | Sola Scriptura BR',
    description: 'Leia a Bíblia em múltiplas traduções com ferramentas de estudo avançadas.',
  },
};

export default function BibliaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
