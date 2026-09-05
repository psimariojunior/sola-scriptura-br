'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { hrefBiblia } from '@/lib/bibliaHref';
import { highlightText, COR_TRADUCAO } from './highlightText';
import type { SearchResult } from '@/hooks/pesquisa/useSearchEngine';

interface SearchResultsProps {
  resultados: SearchResult[];
  debouncedQuery: string;
  searchMode: string;
  isExactPhrase: boolean;
  copiedResult: string | null;
  copyResult: (r: SearchResult) => void;
  shareResult: (r: SearchResult) => void;
}

export function SearchResults({
  resultados, debouncedQuery, searchMode, isExactPhrase,
  copiedResult, copyResult, shareResult,
}: SearchResultsProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      {resultados.length > 0 && (
        <motion.div
          key={`${debouncedQuery}-${searchMode}-${resultados.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-3"
        >
          {resultados.length > 100 && (
            <div className="text-center py-3 text-sm text-muted-foreground">
              Mostrando 100 de {resultados.length} resultados
            </div>
          )}
          {resultados.slice(0, 100).map((r, i) => (
            <motion.div
              key={`${r.traducao}-${r.livroAbrev}-${r.capitulo}-${r.versiculo}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.5), duration: 0.2 }}
            >
              <div className="sola-card p-5 group">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={hrefBiblia(r.livroAbrev, r.capitulo, r.versiculo)}
                    className="flex-1"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${COR_TRADUCAO[r.traducao] || ''}`}>
                        {r.traducao.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-sm">
                        {r.livroNome}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {r.capitulo}:{r.versiculo}
                      </span>
                    </div>
                    <p className="font-serif-body text-base leading-relaxed">
                      <sup className="text-primary font-semibold text-xs mr-1">{r.versiculo}</sup>
                      {highlightText(r.texto, debouncedQuery, searchMode, isExactPhrase)}
                    </p>
                  </Link>
                  <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:sm:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyResult(r)}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                      title={t('pesquisa.copy')}
                      aria-label={t('pesquisa.copy', 'Copiar versículo')}
                    >
                      {copiedResult === `${r.traducao}-${r.capitulo}-${r.versiculo}` ? (
                        <span className="text-green-500 text-xs">{t('pesquisa.copied')}</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => shareResult(r)}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                      title={t('pesquisa.share')}
                      aria-label={t('pesquisa.share', 'Compartilhar versículo')}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <Link
                      href={hrefBiblia(r.livroAbrev, r.capitulo, r.versiculo)}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                      title={t('pesquisa.goToBible')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
