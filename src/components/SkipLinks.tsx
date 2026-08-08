'use client';

import { useTranslation } from 'react-i18next';

export function SkipLinks() {
  const { t } = useTranslation();
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="fixed top-0 left-0 z-[9999] px-4 py-2 bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold text-sm rounded-br-xl focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)] focus:ring-offset-2"
      >
        {t('skipLinks.mainContent', 'Pular para o conteúdo principal')}
      </a>
      <a
        href="#main-nav"
        className="fixed top-0 left-0 z-[9999] px-4 py-2 bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold text-sm rounded-br-xl mt-12 focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)] focus:ring-offset-2"
      >
        {t('skipLinks.navigation', 'Pular para a navegação')}
      </a>
      <a
        href="#pesquisa-input"
        className="fixed top-0 left-0 z-[9999] px-4 py-2 bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold text-sm rounded-br-xl mt-24 focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)] focus:ring-offset-2"
      >
        {t('skipLinks.search', 'Pular para a pesquisa')}
      </a>
    </div>
  );
}
