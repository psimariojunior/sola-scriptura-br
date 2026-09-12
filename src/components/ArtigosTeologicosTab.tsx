'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Clock, Tag, ExternalLink } from 'lucide-react';
import { 
  todosArtigosTeologicos, 
  getArtigosPorCategoria,
  type ArtigoTeologico 
} from '@/data/artigosTeologicos';

interface Props {
  busca: string;
  filtroCategoria: string | null;
}

const coresCategoria: Record<string, { bg: string; text: string; border: string }> = {
  'soteriologia': { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20' },
  'cristologia': { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/20' },
  'trindade': { bg: 'bg-violet-500/10', text: 'text-violet-600', border: 'border-violet-500/20' },
  'pneumatologia': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20' },
  'escatologia': { bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-500/20' },
  'eclesiologia': { bg: 'bg-cyan-500/10', text: 'text-cyan-600', border: 'border-cyan-500/20' },
  'hermeneutica': { bg: 'bg-indigo-500/10', text: 'text-indigo-600', border: 'border-indigo-500/20' },
  'antropologia': { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/20' },
};

export default function ArtigosTeologicosTab({ busca, filtroCategoria }: Props) {
  const [artigoExpandido, setArtigoExpandido] = useState<string | null>(null);

  const artigosFiltrados = useMemo(() => {
    let artigos = todosArtigosTeologicos;
    
    if (filtroCategoria) {
      artigos = artigos.filter(a => a.categoria === filtroCategoria);
    }
    
    if (busca) {
      const termo = busca.toLowerCase();
      artigos = artigos.filter(a => 
        a.titulo.toLowerCase().includes(termo) ||
        a.subtitulo?.toLowerCase().includes(termo) ||
        a.resumo.toLowerCase().includes(termo) ||
        a.tags.some(t => t.toLowerCase().includes(termo))
      );
    }
    
    return artigos;
  }, [busca, filtroCategoria]);

  const categorias = useMemo(() => {
    return [...new Set(todosArtigosTeologicos.map(a => a.categoria))];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-2">
          Artigos Teológicos
        </h2>
        <p className="text-sm text-[var(--content-secondary)] max-w-xl mx-auto">
          Ensaios acadêmicos com evidências bíblicas, desenvolvimento histórico, 
          perspectivas contemporâneas e bibliografia teológica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {categorias.map(cat => {
          const count = todosArtigosTeologicos.filter(a => a.categoria === cat).length;
          const cores = coresCategoria[cat] || { bg: 'bg-muted', text: 'text-foreground', border: 'border-border' };
          return (
            <div key={cat} className={`sola-card p-4 ${cores.border} border`}>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-semibold ${cores.text}`}>{count}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider capitalize">{cat}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-6">
        {artigosFiltrados.map((artigo, idx) => (
          <motion.div
            key={artigo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="sola-card overflow-hidden"
          >
            <button
              onClick={() => setArtigoExpandido(artigoExpandido === artigo.id ? null : artigo.id)}
              className="w-full text-left p-6 hover:bg-[var(--surface-raised)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium ${coresCategoria[artigo.categoria]?.bg || 'bg-muted'} ${coresCategoria[artigo.categoria]?.text || 'text-foreground'}`}>
                      {artigo.categoria}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {artigo.tempoLeitura}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--content-primary)] mb-1">
                    {artigo.titulo}
                  </h3>
                  {artigo.subtitulo && (
                    <p className="text-sm text-[var(--content-secondary)] italic">
                      {artigo.subtitulo}
                    </p>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: artigoExpandido === artigo.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {artigoExpandido === artigo.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-[var(--border)]">
                    <div className="pt-6 space-y-6">
                      {/* Resumo */}
                      <div className="bg-[var(--surface-raised)] p-4 rounded-xl">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Resumo</h4>
                        <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
                          {artigo.resumo}
                        </p>
                      </div>

                      {/* Conteúdo */}
                      <div className="space-y-4">
                        {artigo.conteudo.map((paragrafo, pIdx) => (
                          <p key={pIdx} className="text-sm text-[var(--content-secondary)] leading-relaxed text-justify">
                            {paragrafo}
                          </p>
                        ))}
                      </div>

                      {/* Versículos-chave */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Versículos-Chave
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {artigo.versicosChave.map(versiculo => (
                            <span
                              key={versiculo}
                              className="text-xs px-3 py-1 bg-[var(--brand-default)]/10 text-[var(--brand-default)] rounded-full font-medium"
                            >
                              {versiculo}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bibliografia */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Bibliografia
                        </h4>
                        <div className="space-y-2">
                          {artigo.fontes.map((fonte, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-[var(--content-secondary)]">
                              <BookOpen className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground" />
                              <span>
                                <strong>{fonte.autor}</strong>. <em>{fonte.obra}</em>. {fonte.ano}. {fonte.editora}.
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Leitura Adicional */}
                      {artigo.leituraAdicional && artigo.leituraAdicional.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Leitura Adicional
                          </h4>
                          <div className="space-y-1">
                            {artigo.leituraAdicional.map((leitura, lIdx) => (
                              <div key={lIdx} className="flex items-start gap-2 text-xs text-[var(--content-secondary)]">
                                <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground" />
                                <span>{leitura}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Perguntas */}
                      {artigo.perguntas && artigo.perguntas.length > 0 && (
                        <div className="bg-[var(--surface-raised)] p-4 rounded-xl">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Perguntas para Estudo
                          </h4>
                          <ul className="space-y-2">
                            {artigo.perguntas.map((pergunta, perIdx) => (
                              <li key={perIdx} className="flex items-start gap-2 text-sm text-[var(--content-secondary)]">
                                <span className="text-[var(--brand-default)] mt-0.5 font-bold">{perIdx + 1}.</span>
                                <span>{pergunta}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-[var(--border)]">
                        {artigo.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground flex items-center gap-1">
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {artigosFiltrados.length === 0 && (
        <div className="sola-card p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
          <p className="font-display text-xl text-muted-foreground mb-1">
            Nenhum artigo encontrado
          </p>
          <p className="text-sm text-muted-foreground/70">Tente outros termos de busca.</p>
        </div>
      )}
    </motion.div>
  );
}
