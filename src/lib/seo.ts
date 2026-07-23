import type { Metadata } from 'next';

const siteUrl = 'https://solascripturabr.com.br';

export function generateMetadata({
  title = 'Sola Scriptura BR',
  description = 'Estudo bíblico com 6 traduções, comentários de teólogos clássicos, léxico grego e hebraico, referências cruzadas e IA teológica.',
  path = '',
  image = '/og-image.png',
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = title === 'Sola Scriptura BR' ? title : `${title} | Sola Scriptura BR`;

  return {
    title: fullTitle,
    description,
    keywords: ['Bíblia', 'estudo bíblico', 'grego', 'hebraico', 'Strong', 'teologia', 'comentários bíblicos', 'referências cruzadas', 'IA teológica', 'apresentação bíblica'],
    authors: [{ name: 'Sola Scriptura BR' }],
    creator: 'Sola Scriptura BR',
    publisher: 'Sola Scriptura BR',
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url,
      title: fullTitle,
      description,
      siteName: 'Sola Scriptura BR',
      images: [{ url: `${siteUrl}${image}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${siteUrl}${image}`],
    },
    robots: { index: true, follow: true },
  };
}

export function generateJsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Sola Scriptura BR',
      url: siteUrl,
      description: 'Plataforma gratuita de estudo bíblico com IA, léxico Strong, comentários e apresentação.',
      inLanguage: 'pt-BR',
      isAccessibleForFree: true,
      ...data,
    }),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${siteUrl}${item.url}`,
      })),
    }),
  };
}

export function generateWebAppSchema() {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Sola Scriptura BR',
      url: siteUrl,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      isAccessibleForFree: true,
      description: 'Plataforma gratuita de estudo bíblico com IA, léxico Strong, comentários e apresentação.',
    }),
  };
}
