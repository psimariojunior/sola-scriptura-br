'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Languages, MessageSquare, GraduationCap, StickyNote, Link2, Users, Shield, Clock, Map, ScrollText, FileText, Sparkles, ChevronRight, ExternalLink, Search, Share2 } from 'lucide-react';
import { AudioPronunciation } from '@/components/AudioPronunciation';
import { compartilharVersiculo } from '@/lib/compartilharVersiculo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { hrefBiblia } from '@/lib/bibliaHref';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { getRecursosVersiculo, type RecursoVersiculo, type RecursoComentario, type RecursoEstudo, type RecursoNota, type RecursoCrossRef, type RecursoLexico, type RecursoMapa, type RecursoPersonagem, type RecursoDoutrina, type RecursoCronologia, type RecursoPericope, type TipoRecurso } from '@/data/biblia/versiculoRecursos';
import type { EstudoCapitulo } from '@/data/estudosCapitulo';
import { carregarTraducao, obterCapituloMulti, type CapituloComparado } from '@/data/biblia/texto/carregar';
import { obterVariante, obterVariantesPorLivro } from '@/data/criticaTextual';

// Lazy load heavy data (346KB strong lexicon)
const loadStrongData = () => import('@/data/biblia/strong');
type PalavraStrong = { strong: string; palavra: string; transliteracao: string; definicao: string; morfologia: string; idioma: 'grego' | 'hebraico' };

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface PainelDoVersiculoProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  aberto?: boolean;
  onFechar?: () => void;
  onVersiculoClick?: (livro: string, cap: number, ver: number) => void;
  tabInicial?: string;
  texto?: string;
  traducao?: string;
  livroNome?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const TAB_CONFIG = [
  { value: 'estudo', label: 'Estudo', icon: GraduationCap, color: 'bg-emerald-500' },
  { value: 'comentarios', label: 'Comentários', icon: MessageSquare, color: 'bg-amber-500' },
  { value: 'texto', label: 'Texto', icon: BookOpen, color: 'bg-blue-500' },
  { value: 'lexico', label: 'Léxico', icon: Languages, color: 'bg-purple-500' },
  { value: 'cross-refs', label: 'Ref. Cruzadas', icon: Link2, color: 'bg-cyan-500' },
  { value: 'notas', label: 'Notas', icon: StickyNote, color: 'bg-rose-500' },
  { value: 'personagens', label: 'Personagens', icon: Users, color: 'bg-orange-500' },
  { value: 'doutrinas', label: 'Doutrinas', icon: Shield, color: 'bg-indigo-500' },
  { value: 'cronologia', label: 'Cronologia', icon: Clock, color: 'bg-teal-500' },
  { value: 'mapa', label: 'Mapa', icon: Map, color: 'bg-lime-600' },
  { value: 'pericope', label: 'Perícope', icon: ScrollText, color: 'bg-fuchsia-500' },
  { value: 'critica', label: 'Crítica', icon: FileText, color: 'bg-slate-500' },
  { value: 'ia', label: 'IA', icon: Sparkles, color: 'bg-violet-500' },
] as const;

const TRADUCOES_SIGLAS: Record<string, string> = {
  arc: 'ARC',
  nvi: 'NVI',
  ara: 'ARA',
  acf: 'ACF',
  aa: 'AA',
  ntlh: 'NTLH',
  kjv: 'KJV',
  web: 'WEB',
};

// ═══════════════════════════════════════════════════════════════════════════════
// SKELETONS
// ═══════════════════════════════════════════════════════════════════════════════

function TextoSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}

function LexicoSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3 items-start">
          <Skeleton className="h-6 w-16 rounded-full shrink-0" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GenericSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB CONTENT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function TabTexto({ livro, capitulo, versiculo }: { livro: string; capitulo: number; versiculo: number }) {
  const [traducoes, setTraducoes] = useState<CapituloComparado[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function carregar() {
      setCarregando(true);
      try {
        const capData = await obterCapituloMulti(livro, capitulo, ['arc', 'nvi', 'ara', 'acf', 'naa', 'ntlh', 'kjv']);
        const resultados: CapituloComparado[] = [];
        for (const t of capData) {
          const v = t.versiculos.find(v => v.numero === versiculo);
          if (v) {
            resultados.push({
              traducao: t.traducao,
              versiculos: [{ numero: versiculo, texto: v.texto }],
            });
          }
        }
        if (!cancelled) {
          setTraducoes(resultados);
          setCarregando(false);
        }
      } catch {
        if (!cancelled) setCarregando(false);
      }
    }
    carregar();
    return () => { cancelled = true; };
  }, [livro, capitulo, versiculo]);

  if (carregando) return <TextoSkeleton />;

  if (traducoes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma tradução disponível para este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {traducoes.map((t) => (
        <div key={t.traducao} className="glass-card rounded-lg p-3 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {TRADUCOES_SIGLAS[t.traducao] || t.traducao.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm leading-relaxed font-serif-body text-foreground/85">
            {t.versiculos[0]?.texto}
          </p>
        </div>
      ))}
    </div>
  );
}

function TabLexico({ livro, capitulo, versiculo }: { livro: string; capitulo: number; versiculo: number }) {
  const [palavras, setPalavras] = useState<PalavraStrong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadStrongData().then(async (mod) => {
      setPalavras(await mod.getStrongPorVersiculo(livro, capitulo, versiculo));
      setLoading(false);
    });
  }, [livro, capitulo, versiculo]);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass-card rounded-lg p-3 border border-border/50 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/3 mb-2" />
            <div className="h-3 bg-muted rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (palavras.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma palavra Strong disponível para este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {palavras.map((p) => {
        const isHeb = p.idioma === 'hebraico';
        return (
          <div key={p.strong} className="glass-card rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 ${
                  isHeb
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                }`}
              >
                {p.strong}
              </Badge>
              <span className="text-xs font-medium text-muted-foreground">{p.idioma}</span>
            </div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className={`text-base font-semibold ${isHeb ? 'font-hebrew' : 'font-greek'}`}>{p.palavra}</p>
              {p.palavra && (
                <AudioPronunciation
                  palavra={p.palavra}
                  strong={p.strong}
                  lingua={isHeb ? 'hebraico' : 'grego'}
                  transliteracao={p.transliteracao}
                  size="sm"
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground italic mb-1">{p.transliteracao}</p>
            <p className="text-sm text-foreground/80">{p.definicao}</p>
            {p.morfologia && (
              <div className="mt-1.5 pt-1.5 border-t border-border/50">
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Análise Morfológica</p>
                <p className="text-[11px] text-foreground/70 font-mono">{p.morfologia}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TabComentarios({ recursos, busca = '' }: { recursos: RecursoVersiculo[]; busca?: string }) {
  let comentarios = recursos
    .filter((r) => r.tipo === 'comentario')
    .map((r) => r.dados as RecursoComentario);

  if (busca.trim()) {
    const q = busca.toLowerCase();
    comentarios = comentarios.filter(c =>
      c.autor.toLowerCase().includes(q) ||
      c.texto.toLowerCase().includes(q) ||
      (c.tipo && c.tipo.toLowerCase().includes(q))
    );
  }

  const [expandido, setExpandido] = useState<number | null>(0);

  const tipoLabels: Record<string, { label: string; color: string }> = {
    teologico: { label: 'Teológico', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
    historico: { label: 'Histórico', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
    gramatical: { label: 'Gramatical', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
    cultural: { label: 'Cultural', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    aplicacao: { label: 'Aplicação', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
    escatologico: { label: 'Escatológico', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300' },
  };

  if (comentarios.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhum comentário disponível para este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {comentarios.map((c, i) => {
        const tipo = tipoLabels[c.tipoComentario] || tipoLabels.teologico;
        const isOpen = expandido === i;
        return (
          <div key={i} className="glass-card rounded-lg border border-border/50 overflow-hidden">
            <button
              onClick={() => setExpandido(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tipo.color}`}>
                  {tipo.label}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {c.autor}
                </span>
              </div>
              <ChevronRight className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-3 pb-3 border-t border-border/30">
                <p className="text-sm text-foreground/80 leading-relaxed mt-2 font-serif-body">
                  {c.texto}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TabEstudo({ recursos, busca = '', livro, capitulo, versiculo }: { recursos: RecursoVersiculo[]; busca?: string; livro?: string; capitulo?: number; versiculo?: number }) {
  const comentarios = recursos
    .filter((r) => r.tipo === 'comentario')
    .map((r) => r.dados as RecursoComentario);
  const lexico = recursos
    .filter((r) => r.tipo === 'lexico')
    .map((r) => r.dados as RecursoLexico);
  const cross = recursos
    .filter((r) => r.tipo === 'cross-ref')
    .map((r) => r.dados as RecursoCrossRef);
  const refs = cross[0]?.refs?.slice(0, 8) ?? [];

  let estudos = recursos
    .filter((r) => r.tipo === 'estudo')
    .map((r) => r.dados as RecursoEstudo);

  if (busca.trim()) {
    const q = busca.toLowerCase();
    estudos = estudos.filter(e =>
      e.tema.toLowerCase().includes(q) ||
      e.interpretes.some(i => i.nome.toLowerCase().includes(q) || i.resumo.toLowerCase().includes(q) || i.visao.toLowerCase().includes(q))
    );
  }

  const [fichaCapitulo, setFichaCapitulo] = useState<EstudoCapitulo | null>(null);

  useEffect(() => {
    if (!livro || !capitulo) {
      setFichaCapitulo(null);
      return;
    }
    let cancelado = false;
    import('@/lib/estudosLoader').then(({ obterEstudoCapitulo }) => {
      if (!cancelado) setFichaCapitulo(obterEstudoCapitulo(livro, capitulo));
    });
    return () => { cancelado = true; };
  }, [livro, capitulo]);

  const estudoLink = livro && capitulo && versiculo
    ? `/estudo?ref=${encodeURIComponent(`${livro} ${capitulo}:${versiculo}`)}`
    : null;

  const temConteudo =
    comentarios.length > 0 ||
    lexico.length > 0 ||
    refs.length > 0 ||
    estudos.length > 0 ||
    !!fichaCapitulo ||
    !!(livro && capitulo && versiculo);

  return (
    <div className="space-y-4">
      {fichaCapitulo && (
        <section className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Ficha do capítulo {fichaCapitulo.nivel === 'profundo' ? '· estudo profundo' : fichaCapitulo.nivel === 'sintese' ? '· síntese acadêmica' : ''}
          </p>
          <h4 className="font-display text-sm font-bold leading-snug">{fichaCapitulo.titulo}</h4>
          <p className="text-sm leading-relaxed font-serif-body text-foreground/85">
            {fichaCapitulo.resumo}
          </p>
          {fichaCapitulo.significadoTeologico && (
            <p className="text-xs leading-relaxed text-foreground/75 font-serif-body">
              {fichaCapitulo.significadoTeologico}
            </p>
          )}
          {fichaCapitulo.temas.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {fichaCapitulo.temas.slice(0, 6).map((t) => (
                <Badge key={t} variant="outline" className="text-[10px] font-normal">{t}</Badge>
              ))}
            </div>
          )}
        </section>
      )}

      {comentarios.length > 0 && (
        <section className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Comentário clássico
          </p>
          {comentarios.slice(0, 3).map((c, i) => (
            <div key={`${c.autor}-${i}`} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="text-[11px] font-semibold text-foreground/70 mb-1">{c.autor}</p>
              <p className="text-sm leading-relaxed font-serif-body text-foreground/85">{c.texto}</p>
            </div>
          ))}
          {comentarios.length > 3 && (
            <p className="text-[11px] text-muted-foreground">
              +{comentarios.length - 3} na aba Comentários
            </p>
          )}
        </section>
      )}

      {livro && capitulo != null && versiculo != null && (
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400 mb-1.5">
            Língua original · Strong e morfologia
          </p>
          <TabLexico livro={livro} capitulo={capitulo} versiculo={versiculo} />
        </section>
      )}

      {lexico.length > 0 && !(livro && capitulo != null && versiculo != null) && (
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Palavras originais</p>
          <div className="flex flex-wrap gap-1.5">
            {lexico.slice(0, 8).map((lex) => (
              <span key={lex.strong} className="text-[11px] px-2 py-1 rounded-lg border border-border/60 bg-background">
                <span className={lex.idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'}>{lex.palavra}</span>
                <span className="text-muted-foreground"> · {lex.transliteracao}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {refs.length > 0 && (
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Referências cruzadas</p>
          <div className="flex flex-wrap gap-1.5">
            {refs.map((ref) => (
              <Badge key={ref} variant="outline" className="text-[11px] font-normal">{ref}</Badge>
            ))}
          </div>
        </section>
      )}

      {estudoLink && (
        <a
          href={estudoLink}
          className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
        >
          <GraduationCap className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Estudo completo deste versículo
          </span>
          <ChevronRight className="w-4 h-4 text-emerald-500 ml-auto group-hover:translate-x-1 transition-transform" />
        </a>
      )}

      {!temConteudo ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          {busca ? 'Nenhum estudo encontrado para esta busca.' : 'Toque em Comentários, Léxico ou Referências para aprofundar este versículo.'}
        </p>
      ) : estudos.length > 0 ? (
        <div className="space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Interpretações teológicas
          </p>
          {estudos.map((e, i) => (
            <div key={i} className="glass-card rounded-lg p-4 border border-border/50">
              <h4 className="font-display text-sm font-bold mb-3">{e.tema}</h4>
              <div className="space-y-3">
                {e.interpretes.map((int, j) => (
                  <div key={j} className="pl-3 border-l-2 border-primary/30">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold">{int.nome}</span>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">{int.periodo}</Badge>
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">{int.tradicao}</Badge>
                    </div>
                    <p className="text-[11px] font-medium text-primary mb-1">{int.visao}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{int.resumo}</p>
                    {int.citacao && (
                      <blockquote className="text-xs text-muted-foreground italic mt-1 border-l-2 border-muted pl-2">
                        {int.citacaoFonte === 'resumo' ? (
                          <><span className="text-muted-foreground/60 not-italic">Paráfrase: </span>{int.citacao.replace(/[«»]/g, '')}</>
                        ) : (
                          <>&ldquo;{int.citacao}&rdquo;</>
                        )}
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TabNotas({ recursos }: { recursos: RecursoVersiculo[] }) {
  const notas = recursos
    .filter((r) => r.tipo === 'nota')
    .map((r) => r.dados as RecursoNota);

  if (notas.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma nota técnica disponível para este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {notas.map((n, i) => (
        <div key={i} className="glass-card rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-[10px]">{n.categoria}</Badge>
            <h4 className="text-sm font-semibold">{n.titulo}</h4>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed font-serif-body">{n.conteudo}</p>
          {n.referencias && n.referencias.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {n.referencias.map((ref, j) => (
                <Badge key={j} variant="outline" className="text-[10px]">{ref}</Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TabCrossRefs({ recursos, livro, capitulo, versiculo, onVersiculoClick, busca = '' }: { recursos: RecursoVersiculo[]; livro: string; capitulo: number; versiculo: number; onVersiculoClick?: (livro: string, cap: number, ver: number) => void; busca?: string }) {
  const [typedRefs, setTypedRefs] = useState<Array<{ from: string; to: string; type: string; description?: string }>>([]);
  const [expandedRef, setExpandedRef] = useState<string | null>(null);
  const [verseTexts, setVerseTexts] = useState<Record<string, string>>({});
  const [loadingTexts, setLoadingTexts] = useState(false);

  const crossRefs = recursos
    .filter((r) => r.tipo === 'cross-ref')
    .map((r) => r.dados as RecursoCrossRef);

  const refs = crossRefs[0]?.refs || [];

  // Load typed cross-references with descriptions
  useEffect(() => {
    let cancelado = false;
    import('@/data/biblia/crossReferences').then(mod => {
      if (cancelado) return;
      const list = mod.getCrossReferencesByVerse(livro, capitulo, versiculo);
      setTypedRefs(list.map((r) => ({
        from: r.from,
        to: r.to,
        type: r.type,
        description: r.description,
      })));
    }).catch(() => {});
    return () => { cancelado = true; };
  }, [livro, capitulo, versiculo]);

  function parseRef(ref: string): { livro: string; cap: number; ver: number } | null {
    const match = ref.trim().match(/^(\d*\w+)\s*(\d+):(\d+)$/);
    if (!match) return null;
    return { livro: match[1].toLowerCase(), cap: parseInt(match[2]), ver: parseInt(match[3]) };
  }

  function formatBook(abbr: string): string {
    const nomes: Record<string, string> = {
      gn: 'Gênesis', ex: 'Êxodo', lv: 'Levítico', nm: 'Números', dt: 'Deuteronômio',
      js: 'Josué', jz: 'Juízes', rt: 'Rute', '1sm': '1 Samuel', '2sm': '2 Samuel',
      '1rs': '1 Reis', '2rs': '2 Reis', '1cr': '1 Crônicas', '2cr': '2 Crônicas',
      ed: 'Esdras', ne: 'Neemias', et: 'Ester', jb: 'Jó', sl: 'Salmos',
      pv: 'Provérbios', ec: 'Eclesiastes', ct: 'Cânticos', is: 'Isaías',
      jr: 'Jeremias', lm: 'Lamentações', ez: 'Ezequiel', dn: 'Daniel',
      os: 'Oseias', jl: 'Joel', am: 'Amós', ob: 'Obadias', jn: 'Jonas',
      mq: 'Miqueias', na: 'Naum', hc: 'Habacuque', sf: 'Sofonias',
      ag: 'Ageu', zc: 'Zacarias', ml: 'Malaquias',
      mt: 'Mateus', mc: 'Marcos', lc: 'Lucas', jo: 'João', at: 'Atos',
      rm: 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios', gl: 'Gálatas',
      ef: 'Efésios', fp: 'Filipenses', cl: 'Colossenses', '1ts': '1 Tessalonicenses',
      '2ts': '2 Tessalonicenses', '1tm': '1 Timóteo', '2tm': '2 Timóteo', tt: 'Tito',
      fm: 'Filemom', hb: 'Hebreus', tg: 'Tiago', '1pe': '1 Pedro', '2pe': '2 Pedro',
      '1jo': '1 João', '2jo': '2 João', '3jo': '3 João', jd: 'Judas', ap: 'Apocalipse',
    };
    return nomes[abbr] || abbr.toUpperCase();
  }

  const tipoColors: Record<string, string> = {
    parallel: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    fulfillment: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    quotation: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    contrast: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    thematic: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    typology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  };
  const tipoLabels: Record<string, string> = {
    parallel: 'Paralelo', fulfillment: 'Cumprimento', quotation: 'Citação',
    contrast: 'Contraste', thematic: 'Temático', typology: 'Tipologia',
  };

  if (refs.length === 0 && typedRefs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma referência cruzada disponível para este versículo.
      </p>
    );
  }

  // Use typed refs with descriptions if available, else fallback to string refs
  const hasTyped = typedRefs.length > 0;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {hasTyped ? `${typedRefs.length} referências cruzadas` : `${refs.length} referências cruzadas`}
      </p>

      {hasTyped ? (
        <div className="space-y-1.5">
          {typedRefs
            .filter(r => !busca || r.to.toLowerCase().includes(busca.toLowerCase()) || r.description?.toLowerCase().includes(busca.toLowerCase()))
            .map((ref, i) => {
              const refKey = `${ref.from}-${ref.to}`;
              const isExpanded = expandedRef === refKey;
              const toParts = ref.to.split(' ');
              const toBook = toParts[0]?.toLowerCase() || '';
              const toChapterVerse = toParts.slice(1).join(' ');
              const cap = parseInt(toChapterVerse.split(':')[0]) || 0;

              return (
                <div key={i} className="rounded-lg border border-border/50 overflow-hidden">
                  <button
                    onClick={() => setExpandedRef(isExpanded ? null : refKey)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {ref.type && tipoColors[ref.type] && (
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${tipoColors[ref.type]}`}>
                          {tipoLabels[ref.type] || ref.type}
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground shrink-0">{ref.from}</span>
                      <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
                      <button
                        onClick={(e) => { e.stopPropagation(); onVersiculoClick?.(toBook, cap, parseInt(toChapterVerse.split(':')[1]) || 1); }}
                        className="text-xs font-medium text-primary hover:underline truncate"
                      >
                        {ref.to}
                      </button>
                    </div>
                    <svg className={`w-3 h-3 text-muted-foreground transition-transform shrink-0 ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {isExpanded && ref.description && (
                    <div className="px-3 pb-2 text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-2">
                      {ref.description}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {refs.map((ref, i) => {
            const parsed = parseRef(ref);
            return (
              <button
                key={i}
                onClick={() => parsed && onVersiculoClick?.(parsed.livro, parsed.cap, parsed.ver)}
                className="glass-card text-xs px-2.5 py-1.5 rounded-md border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-left flex items-center gap-1"
                disabled={!parsed}
              >
                <Link2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>{parsed ? `${formatBook(parsed.livro)} ${parsed.cap}:${parsed.ver}` : ref}</span>
                {parsed && <ExternalLink className="w-2.5 h-2.5 text-muted-foreground shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TabPersonagens({ recursos }: { recursos: RecursoVersiculo[] }) {
  const personagens = recursos
    .filter((r) => r.tipo === 'personagem')
    .map((r) => r.dados as RecursoPersonagem);

  if (personagens.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhum personagem mencionado neste versículo.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {personagens.map((p, i) => (
        <a
          key={i}
          href={`/personagens/${p.slug}`}
          className="glass-card rounded-lg p-3 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{p.nome}</p>
            <p className="text-[10px] text-muted-foreground">Ver biografia</p>
          </div>
          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ))}
    </div>
  );
}

function TabDoutrinas({ recursos }: { recursos: RecursoVersiculo[] }) {
  const doutrinas = recursos
    .filter((r) => r.tipo === 'doutrina')
    .map((r) => r.dados as RecursoDoutrina);

  if (doutrinas.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma doutrina relacionada a este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {doutrinas.map((d, i) => (
        <a
          key={i}
          href={`/teologia/${d.slug}`}
          className="glass-card rounded-lg p-3 border border-border/50 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all block group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold group-hover:text-indigo-500 transition-colors">{d.nome}</span>
            </div>
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <Badge variant="outline" className="text-[10px] mt-1">{d.categoria}</Badge>
        </a>
      ))}
    </div>
  );
}

function TabCronologia({ recursos }: { recursos: RecursoVersiculo[] }) {
  const eventos = recursos
    .filter((r) => r.tipo === 'cronologia')
    .map((r) => r.dados as RecursoCronologia);

  if (eventos.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhum evento cronológico vinculado a este versículo.
      </p>
    );
  }

  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-primary/20" />
      <div className="space-y-4">
        {eventos.map((e, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
            <div className="glass-card rounded-lg p-3 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-[10px]">{e.ano > 0 ? `${e.ano} a.C.` : `${Math.abs(e.ano)} d.C.`}</Badge>
                <Badge variant="outline" className="text-[10px]">{e.tipoEvento}</Badge>
              </div>
              <p className="text-sm font-medium">{e.evento}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabMapa({ recursos }: { recursos: RecursoVersiculo[] }) {
  const locais = recursos
    .filter((r) => r.tipo === 'mapa')
    .map((r) => r.dados as RecursoMapa);

  if (locais.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhum local geográfico vinculado a este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <MapaVersiculo locais={locais} />
      <div className="space-y-1.5">
        {locais.map((l, i) => (
          <div key={i} className="glass-card rounded-md p-2 border border-border/50 flex items-center gap-2">
            <Map className="w-3.5 h-3.5 text-lime-600 shrink-0" />
            <span className="text-sm font-medium">{l.lugar}</span>
            <span className="text-[10px] text-muted-foreground ml-auto">{l.lat.toFixed(2)}, {l.lng.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapaVersiculo({ locais }: { locais: RecursoMapa[] }) {
  const [MapContainer, setMapContainer] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [TileLayer, setTileLayer] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [MarkerEl, setMarkerEl] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [PopupEl, setPopupEl] = useState<React.ComponentType<Record<string, unknown>> | null>(null);

  useEffect(() => {
    import('react-leaflet').then(mod => {
      setMapContainer(() => mod.MapContainer as React.ComponentType<Record<string, unknown>>);
      setTileLayer(() => mod.TileLayer as unknown as React.ComponentType<Record<string, unknown>>);
      setMarkerEl(() => mod.Marker as unknown as React.ComponentType<Record<string, unknown>>);
      setPopupEl(() => mod.Popup as unknown as React.ComponentType<Record<string, unknown>>);
    });
  }, []);

  if (!MapContainer || !TileLayer || !MarkerEl || !PopupEl) {
    return (
      <div className="glass-card rounded-lg overflow-hidden border border-border/50 h-48 flex items-center justify-center">
        <div className="animate-pulse text-xs text-muted-foreground">Carregando mapa...</div>
      </div>
    );
  }

  const centerLat = locais.reduce((s, l) => s + l.lat, 0) / locais.length;
  const centerLng = locais.reduce((s, l) => s + l.lng, 0) / locais.length;

  return (
    <div className="glass-card rounded-lg overflow-hidden border border-border/50 h-48">
      <MapContainer center={[centerLat, centerLng]} zoom={8} className="h-full w-full z-0" zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        {locais.map((l, i) => (
          <MarkerEl key={i} position={[l.lat, l.lng]}>
            <PopupEl>{l.lugar}</PopupEl>
          </MarkerEl>
        ))}
      </MapContainer>
    </div>
  );
}

function TabPericope({ recursos }: { recursos: RecursoVersiculo[] }) {
  const pericopes = recursos
    .filter((r) => r.tipo === 'pericope')
    .map((r) => r.dados as RecursoPericope);

  if (pericopes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma perícope vinculada a este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {pericopes.map((p, i) => (
        <div key={i} className="glass-card rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <ScrollText className="w-4 h-4 text-fuchsia-500" />
            <h4 className="text-sm font-bold font-display">{p.titulo}</h4>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge variant="secondary" className="text-[10px]">{p.genero}</Badge>
            <Badge variant="outline" className="text-[10px]">
              {p.inicio[0]}:{p.inicio[1]} — {p.fim[0]}:{p.fim[1]}
            </Badge>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{p.tema}</p>
        </div>
      ))}
    </div>
  );
}

function TabCriticaTextual({ livro, capitulo, versiculo }: { livro: string; capitulo: number; versiculo: number }) {
  const variante = obterVariante(livro, capitulo, versiculo);
  const variantesLivro = obterVariantesPorLivro(livro).filter((v) => v !== variante);

  if (!variante && variantesLivro.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Nenhuma variante textual registrada para este versículo.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          O texto segue o padrão da tradição manuscrita majoritária.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {variante && (
        <div className="glass-card rounded-lg p-4 border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-bold">{variante.titulo}</h4>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed font-serif-body">{variante.descricao}</p>
          <div className="mt-3 space-y-2">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Testemunhas</span>
              <p className="text-xs text-foreground/75 leading-relaxed">{variante.testemunhas}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Avaliação</span>
              <p className="text-xs text-foreground/75 leading-relaxed">{variante.avaliacao}</p>
            </div>
          </div>
        </div>
      )}
      {!variante && variantesLivro.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Nenhuma variante para este versículo específico, mas este livro possui passagens com variantes textuais conhecidas:
        </p>
      )}
      {variantesLivro.map((v, i) => (
        <div key={i} className="glass-card rounded-lg p-3 border border-border/50">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="secondary" className="text-[10px]">{v.capitulo}:{v.versiculo}</Badge>
            <span className="text-sm font-semibold">{v.titulo}</span>
          </div>
          <p className="text-xs text-foreground/75 leading-relaxed">{v.descricao}</p>
        </div>
      ))}
    </div>
  );
}

function TabIA({ livro, capitulo, versiculo }: { livro: string; capitulo: number; versiculo: number }) {
  return (
    <div className="text-center py-6">
      <div className="glass-card rounded-xl p-6 border border-violet-500/20 bg-violet-500/5">
        <Sparkles className="w-10 h-10 text-violet-500 mx-auto mb-3" />
        <h4 className="font-display text-base font-bold mb-2">Perguntar à IA</h4>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Faça perguntas sobre o versículo {livro.toUpperCase()} {capitulo}:{versiculo} e receba respostas fundamentadas na Escritura.
        </p>
        <Button
          variant="default"
          className="bg-violet-600 hover:bg-violet-700 text-white"
          onClick={() => window.open(`/ia?ref=${livro}:${capitulo}:${versiculo}`, '_blank')}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Abrir Assistente IA
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function PainelDoVersiculo({
  livro,
  capitulo,
  versiculo,
  aberto = false,
  onFechar,
  onVersiculoClick,
  tabInicial,
  texto,
  traducao,
  livroNome,
}: PainelDoVersiculoProps) {
  const [recursos, setRecursos] = useState<RecursoVersiculo[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tabInicial || 'estudo');
  const [busca, setBusca] = useState('');
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    setErro(null);
    setBusca('');
    if (!livro || livro.trim() === '') {
      setRecursos([]);
      return;
    }
    getRecursosVersiculo(livro, capitulo, versiculo)
      .then((data) => {
        if (!abortController.signal.aborted) {
          setRecursos(data);
        }
      })
      .catch((err) => {
        if (!abortController.signal.aborted) {
          console.error('Erro ao carregar recursos do versículo:', err);
          setErro('Erro ao carregar recursos. Tente novamente.');
        }
      });
    setActiveTab(tabInicial || 'estudo');
    return () => {
      abortController.abort();
    };
  }, [livro, capitulo, versiculo, tabInicial, aberto]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && aberto) onFechar?.();
  }, [aberto, onFechar]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const contagemPorTipo = useCallback((tipo: TipoRecurso | string): number => {
    if (tipo === 'texto') return 1;
    if (tipo === 'lexico') return recursos.filter((r) => r.tipo === 'lexico').length;
    if (tipo === 'critica') return obterVariantesPorLivro(livro).length;
    if (tipo === 'ia') return 1;
    return recursos.filter((r) => r.tipo === tipo).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recursos]);

  const tabsDisponiveis = TAB_CONFIG.filter((tab) => {
    const count = contagemPorTipo(tab.value);
    return count > 0 || tab.value === 'texto' || tab.value === 'comentarios' || tab.value === 'estudo' || tab.value === 'lexico' || tab.value === 'critica' || tab.value === 'ia';
  });

  const panelContent = (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold leading-tight">
                {livro.toUpperCase()} {capitulo}:{versiculo}
              </h2>
              <p className="text-[10px] text-muted-foreground">
                {recursos.length} recurso{recursos.length !== 1 ? 's' : ''} disponível{recursos.length !== 1 ? 'is' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {texto && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Compartilhar versículo"
                onClick={() => {
                  void compartilharVersiculo({
                    livro: livroNome || livro,
                    capitulo,
                    versiculo,
                    texto,
                    traducao,
                  });
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
            <Link
              href={hrefBiblia(livro, capitulo, versiculo)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              Ler na Bíblia
            </Link>
            {onFechar && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onFechar} aria-label="Fechar painel">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        {/* Quick resource chips */}
        <div className="flex flex-wrap gap-1.5">
          {recursos.filter(r => r.tipo === 'estudo').length > 0 && (
            <button onClick={() => setActiveTab('estudo')} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors">
              <GraduationCap className="w-2.5 h-2.5" />
              {recursos.filter(r => r.tipo === 'estudo').length} Estudo{recursos.filter(r => r.tipo === 'estudo').length !== 1 ? 's' : ''}
            </button>
          )}
          {recursos.filter(r => r.tipo === 'comentario').length > 0 && (
            <button onClick={() => setActiveTab('comentarios')} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors">
              <MessageSquare className="w-2.5 h-2.5" />
              {recursos.filter(r => r.tipo === 'comentario').length} Comentário{recursos.filter(r => r.tipo === 'comentario').length !== 1 ? 's' : ''}
            </button>
          )}
          {recursos.filter(r => r.tipo === 'cross-ref').length > 0 && (
            <button onClick={() => setActiveTab('cross-refs')} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-colors">
              <Link2 className="w-2.5 h-2.5" />
              {recursos.filter(r => r.tipo === 'cross-ref').length} Ref. Cruzadas
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      {recursos.length > 0 && (
        <div className="px-4 py-2 border-b border-border/50 shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar neste versículo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground/60"
            />
            {busca && (
              <button onClick={() => setBusca('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
        <div className="border-b border-border/50 shrink-0 overflow-x-auto scrollbar-thin">
          <TabsList className="flex w-max p-1 h-auto bg-transparent gap-0.5">
              {tabsDisponiveis.map((tab) => {
                const Icon = tab.icon;
                const count = contagemPorTipo(tab.value);
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {count > 0 && tab.value !== 'texto' && tab.value !== 'ia' && (
                      <span className="text-[9px] px-1 py-0 rounded-full bg-muted text-muted-foreground min-w-[14px] text-center">
                        {count}
                      </span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="p-4 pb-20">
            {erro ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-sm text-red-400 mb-3">{erro}</p>
                <button
                  onClick={() => {
                    setErro(null);
                    setRecursos([]);
                    getRecursosVersiculo(livro, capitulo, versiculo).then(setRecursos).catch((err) => {
                      console.error('Erro ao recarregar recursos:', err);
                      setErro('Erro ao carregar recursos. Tente novamente.');
                    });
                  }}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : (
            <>
            <TabsContent value="texto" className="mt-0">
              <Suspense fallback={<TextoSkeleton />}>
                <TabTexto livro={livro} capitulo={capitulo} versiculo={versiculo} />
              </Suspense>
            </TabsContent>
            <TabsContent value="lexico" className="mt-0">
              <Suspense fallback={<LexicoSkeleton />}>
                <TabLexico livro={livro} capitulo={capitulo} versiculo={versiculo} />
              </Suspense>
            </TabsContent>
            <TabsContent value="comentarios" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabComentarios recursos={recursos} busca={busca} />
              </Suspense>
            </TabsContent>
            <TabsContent value="estudo" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabEstudo recursos={recursos} busca={busca} livro={livro} capitulo={capitulo} versiculo={versiculo} />
              </Suspense>
            </TabsContent>
            <TabsContent value="notas" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabNotas recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="cross-refs" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabCrossRefs recursos={recursos} livro={livro} capitulo={capitulo} versiculo={versiculo} onVersiculoClick={onVersiculoClick} busca={busca} />
              </Suspense>
            </TabsContent>
            <TabsContent value="personagens" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabPersonagens recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="doutrinas" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabDoutrinas recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="cronologia" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabCronologia recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="mapa" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabMapa recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="pericope" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabPericope recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="critica" className="mt-0">
              <TabCriticaTextual livro={livro} capitulo={capitulo} versiculo={versiculo} />
            </TabsContent>
            <TabsContent value="ia" className="mt-0">
              <TabIA livro={livro} capitulo={capitulo} versiculo={versiculo} />
            </TabsContent>
            </>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );

  // ─── DESKTOP: painel lateral via Dialog ───
  if (!isMobile) {
    return (
      <AnimatePresence>
        {aberto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={onFechar}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              role="dialog"
              aria-label={`Painel de recursos para ${livro.toUpperCase()} ${capitulo}:${versiculo}`}
              aria-modal="true"
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col overflow-hidden"
            >
              {panelContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // ─── MOBILE: bottom sheet ───
  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onFechar}
            aria-hidden="true"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label={`Painel de recursos para ${livro.toUpperCase()} ${capitulo}:${versiculo}`}
            aria-modal="true"
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-background border-t border-border shadow-2xl rounded-t-2xl flex flex-col overflow-y-auto"
          >
            {/* Drag handle */}
            <div className="flex justify-center py-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            {panelContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
