'use client';

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a 
        href="#main-content"
        className="fixed top-0 left-0 z-[9999] px-4 py-2 bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold text-sm rounded-br-xl focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)] focus:ring-offset-2"
      >
        Pular para o conteúdo principal
      </a>
      <a 
        href="#search-input"
        className="fixed top-0 left-0 z-[9999] px-4 py-2 bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold text-sm rounded-br-xl mt-12 focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)] focus:ring-offset-2"
      >
        Pular para a pesquisa
      </a>
      <a 
        href="#main-nav"
        className="fixed top-0 left-0 z-[9999] px-4 py-2 bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold text-sm rounded-br-xl mt-24 focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)] focus:ring-offset-2"
      >
        Pular para a navegação
      </a>
    </div>
  );
}
