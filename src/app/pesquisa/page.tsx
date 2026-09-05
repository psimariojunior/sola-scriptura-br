'use client';

import { useState } from 'react';
import { Search, X, BookOpen, Download } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { VoiceSearchButton } from '@/components/VoiceSearchButton';
import { useTranslation } from 'react-i18next';
import { useSearchEngine } from '@/hooks/pesquisa/useSearchEngine';
import { useAISearch } from '@/hooks/pesquisa/useAISearch';
import { SearchFilters } from '@/components/pesquisa/SearchFilters';
import { SearchResults } from '@/components/pesquisa/SearchResults';
import { LexiconResults } from '@/components/pesquisa/LexiconResults';
import { AISearchToggle } from '@/components/pesquisa/AISearchToggle';
import { AISearchResults } from '@/components/pesquisa/AISearchResults';

export default function PesquisaPage() {
  const { t } = useTranslation();
  const [mobileFilters, setMobileFilters] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const engine = useSearchEngine();
  const aiSearch = useAISearch();

  const handleQueryChange = (query: string) => {
    engine.setQuery(query);
    if (aiMode && query.length > 3) {
      aiSearch.search(query);
    }
  };

  return (
    <PageShell maxWidth="7xl">
      <PageHero
        icon={Search}
        align="left"
        title={t('pesquisa.title')}
        subtitle={t('pesquisa.subtitle')}
        className="mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <SearchFilters
          searchMode={engine.searchMode}
          setSearchMode={engine.setSearchMode}
          testamento={engine.testamento}
          setTestamento={engine.setTestamento}
          livroFiltro={engine.livroFiltro}
          setLivroFiltro={engine.setLivroFiltro}
          capituloFiltro={engine.capituloFiltro}
          setCapituloFiltro={engine.setCapituloFiltro}
          capituloDe={engine.capituloDe}
          setCapituloDe={engine.setCapituloDe}
          capituloAte={engine.capituloAte}
          setCapituloAte={engine.setCapituloAte}
          tradSel={engine.tradSel}
          alternarTrad={engine.alternarTrad}
          buscaSemantica={engine.buscaSemantica}
          setBuscaSemantica={engine.setBuscaSemantica}
          isExactPhrase={engine.isExactPhrase}
          setIsExactPhrase={engine.setIsExactPhrase}
          morphFilters={engine.morphFilters}
          setMorphFilters={engine.setMorphFilters}
          livrosFiltrados={engine.livrosFiltrados}
          selectedBook={engine.selectedBook}
          hasAnyInput={engine.hasAnyInput}
          limpar={engine.limpar}
          mobileFilters={mobileFilters}
          setMobileFilters={setMobileFilters}
        />

        <div>
          <div className="sola-card p-4 mb-6">
            <div className="relative flex items-center gap-2">
              <label htmlFor="pesquisa-input" className="sr-only">{t('pesquisa.searchPlaceholder', 'Pesquisar na Bíblia')}</label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
              <input
                ref={engine.inputRef}
                id="pesquisa-input"
                type="text"
                value={engine.query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder={aiMode ? 'Pergunte em linguagem natural... ex: "Como Paulo fala da graça?"' : engine.searchMode === 'strongs' ? 'Ex: H1234, G3056, 1234...' : t('pesquisa.searchPlaceholder')}
                className="w-full pl-12 pr-14 sm:pr-24 py-3 bg-transparent text-lg font-serif-body focus:outline-none"
                autoFocus
                aria-describedby="pesquisa-results-count"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {engine.query && (
                  <button
                    onClick={() => { engine.setQuery(''); aiSearch.clear(); }}
                    className="text-muted-foreground hover:text-foreground p-1"
                    aria-label={t('pesquisa.clearSearch')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <VoiceSearchButton
                  onResult={(text) => handleQueryChange(text)}
                  size="sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <AISearchToggle
                enabled={aiMode}
                onToggle={() => { setAiMode(!aiMode); aiSearch.clear(); }}
              />
              {aiMode && (
                <span className="text-[10px] text-[var(--content-muted)]">
                  Ctrl+Shift+A para ativar
                </span>
              )}
            </div>
          </div>

          {/* AI Search Results */}
          {aiMode && (
            <AISearchResults
              explicacao={aiSearch.explicacao}
              versiculos={aiSearch.versiculos}
              streaming={aiSearch.streaming}
              error={aiSearch.error}
              tempoMs={aiSearch.tempoMs}
            />
          )}

          {/* Normal Search Results */}
          {!aiMode && (
            <>
              {!!engine.debouncedQuery && !engine.loading && (
                <div className="mb-4 flex items-center justify-between" aria-live="polite" aria-atomic="true" id="pesquisa-results-count">
                  <div className="text-sm text-muted-foreground">
                    {engine.resultados.length > 0 ? (
                      <span>
                        <strong className="text-foreground">{engine.resultados.length}</strong> resultado{engine.resultados.length !== 1 ? 's' : ''} encontrado{engine.resultados.length !== 1 ? 's' : ''} em{' '}
                        <strong className="text-foreground">{engine.searchTime !== null ? (engine.searchTime / 1000).toFixed(1) : '0.0'}s</strong>
                        {' '}&mdash;{' '}&ldquo;<strong className="text-foreground">{engine.debouncedQuery}</strong>&rdquo;
                        {engine.buscaSemantica && engine.searchMode !== 'strongs' && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded-full">
                            {t('pesquisa.semantic')}
                          </span>
                        )}
                      </span>
                    ) : engine.searchMode === 'strongs' && engine.lexiconResults.length > 0 ? (
                      <span>
                        <strong className="text-foreground">{engine.lexiconResults.length}</strong> entrada{engine.lexiconResults.length !== 1 ? 's' : ''} no lexicon para &ldquo;<strong className="text-foreground">{engine.debouncedQuery}</strong>&rdquo;
                      </span>
                    ) : (
                      <span>{t('pesquisa.noResultsFor')} &ldquo;<strong className="text-foreground">{engine.debouncedQuery}</strong>&rdquo;</span>
                    )}
                  </div>
                  {engine.resultados.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={engine.exportResults}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border border-border rounded-sm hover:bg-muted transition-colors"
                        aria-label={t('pesquisa.export', 'Exportar resultados')}
                      >
                        <Download className="w-3 h-3" />
                        {t('pesquisa.export')}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {engine.loading && (
                <div className="sola-card p-12 text-center" role="status" aria-live="polite">
                  <div className="inline-flex gap-1.5" aria-hidden="true">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{t('pesquisa.searching')}</p>
                </div>
              )}

              {!engine.loading && !engine.hasAnyInput && (
                <div className="sola-card p-12 text-center">
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
                  <p className="font-display text-xl text-muted-foreground mb-1">{t('pesquisa.typeToSearch')}</p>
                  <p className="text-sm text-muted-foreground/70">
                    {t('pesquisa.typeDesc')}
                  </p>
                </div>
              )}

              {!engine.loading && engine.hasAnyInput && engine.resultados.length === 0 && !(engine.searchMode === 'strongs' && engine.lexiconResults.length > 0) && (
                <div className="sola-card p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" strokeWidth={1} />
                  <p className="font-display text-xl text-muted-foreground mb-1">{t('pesquisa.noResults')}</p>
                  <p className="text-sm text-muted-foreground/70">
                    {t('pesquisa.tryDifferent')}
                  </p>
                </div>
              )}

              <LexiconResults
                lexiconResults={engine.lexiconResults}
                onSelectWord={(word) => {
                  engine.setQuery(word);
                  engine.setSearchMode('contains');
                }}
              />

              <SearchResults
                resultados={engine.resultados}
                debouncedQuery={engine.debouncedQuery}
                searchMode={engine.searchMode}
                isExactPhrase={engine.isExactPhrase}
                copiedResult={engine.copiedResult}
                copyResult={engine.copyResult}
                shareResult={engine.shareResult}
              />
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
