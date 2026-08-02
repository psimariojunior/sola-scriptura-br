import type { MetadataRoute } from 'next';

const BASE_URL = 'https://solascripturabr.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/biblia`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${BASE_URL}/pesquisa`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/idiomas`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE_URL}/palavras`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE_URL}/teologia`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/historia`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/personagens`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/cronologia`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/atlas`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/mapas`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/exegese`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE_URL}/ia`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/estudos`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE_URL}/referencias`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/harmonia`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/favoritos`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/notas`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/colecoes`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/planos`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/devocional`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.85 },
    { url: `${BASE_URL}/flashcards`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/memorizacao`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/quiz`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${BASE_URL}/comparar`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/comparar-comentarios`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/parabolas`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/milagres`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/literatura`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${BASE_URL}/topicos`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/pericopes`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${BASE_URL}/estatisticas`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE_URL}/compartilhar`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/imersao`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/sermon-builder`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/relatorio-exegese`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/textos-extrabiblicos`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/mapa-ocorrencias`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/explorador`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/relacoes`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/word-study`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/seminario`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/cursos`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/comunidade`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/desafios`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/dashboard`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${BASE_URL}/ofertas`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const bookAbbreviations = [
    'gn', 'ex', 'lv', 'nm', 'dt', 'js', 'jz', 'rt', '1sm', '2sm',
    '1r', '2r', '1cr', '2cr', 'ed', 'ne', 'et', 'job', 'sl', 'pv',
    'ec', 'ct', 'is', 'jr', 'lm', 'ez', 'dn', 'os', 'jl', 'am',
    'ob', 'jn', 'mq', 'na', 'hc', 'sf', 'ag', 'zc', 'mc',
    'mt', 'mc2', 'lc', 'jo', 'at', 'rm', '1co', '2co', 'gl', 'ef',
    'fp', 'cl', '1ts', '2ts', '1tm', '2tm', 'tt', 'fm', 'hb', 'tg',
    '1pe', '2pe', '1jo', '2jo', '3jo', 'jd', 'ap',
  ];

  const studyPages = bookAbbreviations.map(book => ({
    url: `${BASE_URL}/estudos/${book}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...studyPages];
}
