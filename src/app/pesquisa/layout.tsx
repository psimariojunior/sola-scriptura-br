import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pesquisa Bíblica Avançada',
  description: 'Pesquisa avançada nas Escrituras. Busca por palavras-chave, regex, filtros por testamento, livro e tradução. Exportar resultados.',
  keywords: ['pesquisa bíblica', 'busca bíblica', 'pesquisa avançada', 'versículos', 'palavras-chave', 'regex'],
  openGraph: {
    title: 'Pesquisa Bíblica Avançada | Sola Scriptura BR',
    description: 'Pesquise nas Escrituras com filtros avançados e múltiplas traduções.',
  },
};

export default function PesquisaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
