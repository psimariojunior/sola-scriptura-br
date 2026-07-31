import { MetadataRoute } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

const bibleBooks = [
  { abrev: 'gn', nome: 'Gênesis', capitulos: 50 },
  { abrev: 'sl', nome: 'Salmos', capitulos: 150 },
  { abrev: 'mt', nome: 'Mateus', capitulos: 28 },
  { abrev: 'jo', nome: 'João', capitulos: 21 },
  { abrev: 'rm', nome: 'Romanos', capitulos: 16 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '', '/biblia', '/pesquisa', '/idiomas', '/teologia', '/estudos',
    '/ia', '/exegese', '/historia', '/cronologia', '/personagens',
    '/ferramentas', '/quiz', '/quiz/classico', '/quiz/temporal', '/quiz/livro', '/quiz/multiplayer',
    '/flashcards', '/devocional', '/comunidade', '/estatisticas/gamificacao',
    '/favoritos', '/notas', '/colecoes', '/atlas', '/harmonia', '/planos',
    '/relacoes', '/mapas', '/palavras', '/referencias', '/memorizacao',
    '/desafios', '/comparar-comentarios', '/dashboard', '/estudo-split',
    '/compartilhar', '/galeria', '/parabolas', '/milagres', '/literatura',
    '/sermoes', '/estatisticas', '/pericopes', '/topicos', '/estudo',
    '/ferramentas/concordancia', '/ferramentas/critica-textual', '/ferramentas/introducoes',
    '/estudo-colaborativo',
  ];

  const baseEntries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const bibleChapterEntries: MetadataRoute.Sitemap = bibleBooks.flatMap((book) =>
    Array.from({ length: book.capitulos }, (_, i) => ({
      url: `${siteUrl}/biblia?livro=${book.abrev}&capitulo=${i + 1}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...baseEntries, ...bibleChapterEntries];
}
