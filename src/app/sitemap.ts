import { MetadataRoute } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

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

  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}
