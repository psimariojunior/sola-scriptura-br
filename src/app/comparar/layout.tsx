import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparar Traduções Bíblicas | Sola Scriptura BR',
  description: 'Compare versículos lado a lado em até 10 traduções bíblicas: ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA, AA e NBV. Ferramenta essencial para estudo bíblico.',
  keywords: ['comparar traduções', 'Bíblia', 'ARC', 'ARA', 'ACF', 'KJV', 'NVI', 'WEB', 'NVT', 'KJA', 'AA', 'NBV', 'estudo bíblico'],
  openGraph: {
    title: 'Comparar Traduções Bíblicas | Sola Scriptura BR',
    description: 'Compare versículos lado a lado em até 10 traduções bíblicas.',
  },
};

export default function CompararLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
