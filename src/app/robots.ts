import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/conta/',
          '/configuracoes/',
          '/api/',
          '/auth/',
          '/login/',
          '/cadastrar/',
          '/cadastro/',
          '/google/',
          '/offline/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
    ],
    sitemap: 'https://solascripturabr.com.br/sitemap.xml',
  };
}
