import React from 'react';

const SITE_URL = 'https://solascripturabr.com.br';
const SITE_NAME = 'Sola Scriptura BR';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

interface BookSchema {
  '@context': 'https://schema.org';
  '@type': 'Book';
  name: string;
  author?: string;
  description?: string;
  inLanguage: string;
  publisher?: {
    '@type': 'Organization';
    name: string;
  };
  url?: string;
}

interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

interface WebApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'WebApplication';
  name: string;
  url: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  featureList: string[];
  screenshot: string;
}

interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    contactType: string;
    availableLanguage: string[];
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  image?: string,
  datePublished?: string
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    image: image || DEFAULT_IMAGE,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    },
  };
}

export function generateBookSchema(
  name: string,
  author?: string,
  description?: string
): BookSchema {
  const schema: BookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    url: `${SITE_URL}/biblia`,
  };

  if (author) schema.author = author;
  if (description) schema.description = description;

  return schema;
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}` } : {}),
    })),
  };
}

export function generateWebAppSchema(): WebApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Plataforma gratuita de estudo bíblico acadêmico com IA. Bíblia em 12 traduções, léxico Grego e Hebraico, exegese automática, teologia sistemática e ferramentas avançadas.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    featureList: [
      'Bíblia em 12 traduções',
      'Léxico Hebraico (8674 palavras)',
      'Léxico Grego (5526 palavras)',
      'Vista interlinear palavra-a-palavra',
      'Exegese automática com IA',
      'Teologia sistemática (13 categorias)',
      'Comentários de teólogos',
      'Referências cruzadas visuais',
      'Harmonia sinótica interativa',
      'Busca semântica avançada',
      'Áudio com narração',
      'PWA offline',
      '5 temas de leitura',
    ],
    screenshot: `${SITE_URL}/og-image.png`,
  };
}

export function generateFAQSchema(
  questions: Array<{ q: string; a: string }>
): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question' as const,
      name: q,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: a,
      },
    })),
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Plataforma gratuita de estudo bíblico acadêmico com inteligência artificial.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['Portuguese', 'English'],
    },
  };
}

interface MetaTagsProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  datePublished?: string;
}

export function MetaTags({ title, description, url, image, datePublished }: MetaTagsProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const fullUrl = url ? (url.startsWith('http') ? url : `${SITE_URL}${url}`) : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {datePublished && <meta property="article:published_time" content={datePublished} />}
      <meta property="article:modified_time" content={new Date().toISOString()} />
    </>
  );
}

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
