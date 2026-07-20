import type { Metadata } from 'next';

const SITE_URL = 'https://solascripturabr.com.br';

export const metadata: Metadata = {
  title: 'Bíblia Sagrada — 12 Traduções',
  description:
    'Leia a Bíblia Sagrada em 12 traduções: ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA, AA, NBV, NTLH e NAA. Estudo paralelo, áudio com narração, anotações pessoais, versículos favoritos, referências cruzadas, interlinear hebraico/grego com léxico Strong e comparação de versões. Ferramenta gratuita de estudo bíblico.',
  keywords: [
    'bíblia sagrada',
    'bíblia online',
    'leitura bíblica',
    'ARC',
    'ARA',
    'ACF',
    'KJV',
    'NVI',
    'WEB',
    'NVT',
    'KJA',
    'AA',
    'NBV',
    'NTLH',
    'NAA',
    'múltiplas traduções',
    'estudo bíblico',
    'bíblia paralela',
    'áudio bíblia',
    'narração bíblica',
    'referências cruzadas',
    'interlinear hebraico grego',
    'léxico strong',
  ],
  openGraph: {
    title: 'Bíblia Sagrada — 12 Traduções | Sola Scriptura BR',
    description:
      'Leia a Bíblia em 12 traduções com estudo paralelo, áudio, anotações, referências cruzadas e interlinear hebraico/grego. Gratuito.',
    url: `${SITE_URL}/biblia`,
    siteName: 'Sola Scriptura BR',
    images: [
      {
        url: `${SITE_URL}/og-biblia.png`,
        width: 1200,
        height: 630,
        alt: 'Bíblia Sagrada — Leitura Multi-Tradução | Sola Scriptura BR',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bíblia Sagrada — 12 Traduções | Sola Scriptura BR',
    description:
      'Leia a Bíblia em 12 traduções com ferramentas de estudo avançadas. Gratuito.',
    images: [`${SITE_URL}/og-biblia.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/biblia`,
    languages: {
      'pt-BR': `${SITE_URL}/biblia`,
    },
  },
};

export default function BibliaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
