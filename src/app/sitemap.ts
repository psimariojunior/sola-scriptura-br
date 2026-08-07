import type { MetadataRoute } from 'next';

const BASE_URL = 'https://solascripturabr.com.br';

// Timestamps fixos baseados na frequência de atualização real
const TODAY = new Date();
const ONE_WEEK_AGO = new Date(TODAY.getTime() - 7 * 24 * 60 * 60 * 1000);
const ONE_MONTH_AGO = new Date(TODAY.getTime() - 30 * 24 * 60 * 60 * 1000);
const TWO_MONTHS_AGO = new Date(TODAY.getTime() - 60 * 24 * 60 * 60 * 1000);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/biblia`, lastModified: TODAY, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${BASE_URL}/pesquisa`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/idiomas`, lastModified: ONE_MONTH_AGO, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE_URL}/palavras`, lastModified: ONE_MONTH_AGO, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE_URL}/teologia`, lastModified: ONE_MONTH_AGO, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/historia`, lastModified: ONE_MONTH_AGO, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/personagens`, lastModified: ONE_MONTH_AGO, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/cronologia`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/atlas`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/mapas`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/exegese`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE_URL}/ia`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/estudos`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE_URL}/referencias`, lastModified: ONE_MONTH_AGO, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/harmonia`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/favoritos`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/notas`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/colecoes`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/planos`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/devocional`, lastModified: TODAY, changeFrequency: 'daily' as const, priority: 0.85 },
    { url: `${BASE_URL}/flashcards`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/memorizacao`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/quiz`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${BASE_URL}/comparar`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/comparar-comentarios`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/parabolas`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/milagres`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/literatura`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${BASE_URL}/topicos`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/pericopes`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${BASE_URL}/estatisticas`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE_URL}/compartilhar`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/imersao`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/sermon-builder`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/relatorio-exegese`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/textos-extrabiblicos`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/mapa-ocorrencias`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/explorador`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/relacoes`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/word-study`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/seminario`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/cursos`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/comunidade`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/desafios`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/dashboard`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${BASE_URL}/ofertas`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/ferramentas/concordancia`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/ferramentas/critica-textual`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/ferramentas/introducoes`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/estudo-split`, lastModified: TWO_MONTHS_AGO, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/quiz/multiplayer`, lastModified: ONE_WEEK_AGO, changeFrequency: 'weekly' as const, priority: 0.7 },
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
    lastModified: ONE_MONTH_AGO,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...studyPages];
}
