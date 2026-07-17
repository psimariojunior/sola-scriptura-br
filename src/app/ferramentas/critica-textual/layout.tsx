import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crítica Textual — Variantes e Manuscritos',
  description: 'Análise de variantes textuais do Novo Testamento: manuscritos, evidências externas e recomendações da edição Nestle-Aland (NA28). Perícope da Adúltera, Vírgula Joanina, final de Marcos e outras.',
  keywords: ['crítica textual', 'variantes textuais', 'manuscritos bíblicos', 'Nestle-Aland', 'NA28', 'Novo Testamento grego', 'perícope da adúltera', 'vírgula joanina'],
  openGraph: {
    title: 'Crítica Textual — Variantes e Manuscritos | Sola Scriptura BR',
    description: 'Análise de variantes textuais do Novo Testamento com manuscritos e evidências.',
  },
};

export default function CriticaTextualLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
