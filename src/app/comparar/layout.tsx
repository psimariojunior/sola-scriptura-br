import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparar Traduções Bíblicas | Sola Scriptura BR',
  description: 'Compare versículos lado a lado em até 6 traduções bíblicas: ARC, ARA, ACF, KJV, NVI e WEB. Ferramenta essencial para estudo bíblico.',
  keywords: ['comparar traduções', 'Bíblia', 'ARC', 'ARA', 'ACF', 'KJV', 'NVI', 'WEB', 'estudo bíblico'],
  openGraph: {
    title: 'Comparar Traduções Bíblicas | Sola Scriptura BR',
    description: 'Compare versículos lado a lado em até 6 traduções bíblicas.',
  },
};

export default function CompararLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
