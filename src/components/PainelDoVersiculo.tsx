'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Languages, MessageSquare, GraduationCap, StickyNote, Link2, Users, Shield, Clock, Map, ScrollText, FileText, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { getRecursosVersiculo, type RecursoVersiculo, type RecursoComentario, type RecursoEstudo, type RecursoNota, type RecursoCrossRef, type RecursoLexico, type RecursoMapa, type RecursoPersonagem, type RecursoDoutrina, type RecursoCronologia, type RecursoPericope, type TipoRecurso } from '@/data/biblia/versiculoRecursos';
import { getStrongPorVersiculo, type PalavraStrong } from '@/data/biblia/strong';
import { carregarTraducao, type CapituloComparado } from '@/data/biblia/texto/carregar';

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
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const TAB_CONFIG = [
  { value: 'texto', label: 'Texto', icon: BookOpen, color: 'bg-blue-500' },
  { value: 'lexico', label: 'Léxico', icon: Languages, color: 'bg-purple-500' },
  { value: 'comentarios', label: 'Comentários', icon: MessageSquare, color: 'bg-amber-500' },
  { value: 'estudo', label: 'Estudo', icon: GraduationCap, color: 'bg-emerald-500' },
  { value: 'notas', label: 'Notas', icon: StickyNote, color: 'bg-rose-500' },
  { value: 'cross-refs', label: 'Cross-refs', icon: Link2, color: 'bg-cyan-500' },
  { value: 'personagens', label: 'Personagens', icon: Users, color: 'bg-orange-500' },
  { value: 'doutrinas', label: 'Doutrinas', icon: Shield, color: 'bg-indigo-500' },
  { value: 'cronologia', label: 'Cronologia', icon: Clock, color: 'bg-teal-500' },
  { value: 'mapa', label: 'Mapa', icon: Map, color: 'bg-lime-600' },
  { value: 'pericope', label: 'Perícope', icon: ScrollText, color: 'bg-fuchsia-500' },
  { value: 'critica', label: 'Crítica Textual', icon: FileText, color: 'bg-slate-500' },
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
      const trads = ['arc', 'nvi', 'ara', 'acf', 'aa', 'ntlh', 'kjv'];
      const resultados: CapituloComparado[] = [];
      for (const t of trads) {
        try {
          const data = await carregarTraducao(t);
          const versiculos = data[livro]?.[capitulo];
          if (versiculos && versiculos[versiculo - 1]) {
            resultados.push({
              traducao: t,
              versiculos: [{ numero: versiculo, texto: versiculos[versiculo - 1] }],
            });
          }
        } catch { /* skip */ }
      }
      if (!cancelled) {
        setTraducoes(resultados);
        setCarregando(false);
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

  useEffect(() => {
    setPalavras(getStrongPorVersiculo(livro, capitulo, versiculo));
  }, [livro, capitulo, versiculo]);

  if (palavras.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma palavra Strong disponível para este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {palavras.map((p) => (
        <div key={p.strong} className="glass-card rounded-lg p-3 border border-border/50">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge
              variant="secondary"
              className={`text-[10px] px-1.5 py-0 ${
                p.idioma === 'grego'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
              }`}
            >
              {p.strong}
            </Badge>
            <span className="text-xs font-medium text-muted-foreground">{p.idioma}</span>
          </div>
          <p className="text-base font-semibold mb-0.5">{p.palavra}</p>
          <p className="text-xs text-muted-foreground italic mb-1">{p.transliteracao}</p>
          <p className="text-sm text-foreground/80">{p.definicao}</p>
          {p.morfologia && (
            <p className="text-[11px] text-muted-foreground mt-1">Morfologia: {p.morfologia}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function TabComentarios({ recursos }: { recursos: RecursoVersiculo[] }) {
  const comentarios = recursos
    .filter((r) => r.tipo === 'comentario')
    .map((r) => r.dados as RecursoComentario);

  const [expandido, setExpandido] = useState<number | null>(null);

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

function TabEstudo({ recursos }: { recursos: RecursoVersiculo[] }) {
  const estudos = recursos
    .filter((r) => r.tipo === 'estudo')
    .map((r) => r.dados as RecursoEstudo);

  if (estudos.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhum estudo multiteológico disponível para este versículo.
      </p>
    );
  }

  return (
    <div className="space-y-4">
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
                    &ldquo;{int.citacao}&rdquo;
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
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

function TabCrossRefs({ recursos, onVersiculoClick }: { recursos: RecursoVersiculo[]; onVersiculoClick?: (livro: string, cap: number, ver: number) => void }) {
  const crossRefs = recursos
    .filter((r) => r.tipo === 'cross-ref')
    .map((r) => r.dados as RecursoCrossRef);

  if (crossRefs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma referência cruzada disponível para este versículo.
      </p>
    );
  }

  const refs = crossRefs[0].refs;

  function parseRef(ref: string): { livro: string; cap: number; ver: number } | null {
    const match = ref.trim().match(/^(\w+)\s*(\d+):(\d+)$/);
    if (!match) return null;
    return { livro: match[1].toLowerCase(), cap: parseInt(match[2]), ver: parseInt(match[3]) };
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-2">{refs.length} referências cruzadas</p>
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
              <span>{ref}</span>
              {parsed && <ExternalLink className="w-2.5 h-2.5 text-muted-foreground shrink-0" />}
            </button>
          );
        })}
      </div>
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

  const centerLat = locais.reduce((s, l) => s + l.lat, 0) / locais.length;
  const centerLng = locais.reduce((s, l) => s + l.lng, 0) / locais.length;

  return (
    <div className="space-y-3">
      <div className="glass-card rounded-lg overflow-hidden border border-border/50 h-48 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-8 h-8 text-primary/40 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Mapa interativo</p>
            <p className="text-[10px] text-muted-foreground">{locais.length} local(ais)</p>
          </div>
        </div>
      </div>
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

function TabCriticaTextual() {
  return (
    <div className="text-center py-8">
      <FileText className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
      <p className="text-sm text-muted-foreground">
        Crítica textual detalhada será disponibilizada em breve.
      </p>
      <p className="text-xs text-muted-foreground/70 mt-1">
        Variantes manuscritas e notas textuais.
      </p>
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
}: PainelDoVersiculoProps) {
  const [recursos, setRecursos] = useState<RecursoVersiculo[]>([]);
  const [activeTab, setActiveTab] = useState('texto');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setRecursos(getRecursosVersiculo(livro, capitulo, versiculo));
    setActiveTab('texto');
  }, [livro, capitulo, versiculo]);

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
    if (tipo === 'critica') return 0;
    if (tipo === 'ia') return 1;
    return recursos.filter((r) => r.tipo === tipo).length;
  }, [recursos]);

  const tabsDisponiveis = TAB_CONFIG.filter((tab) => {
    const count = contagemPorTipo(tab.value);
    return count > 0 || tab.value === 'texto' || tab.value === 'critica' || tab.value === 'ia';
  });

  const panelContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
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
        {onFechar && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onFechar}
            aria-label="Fechar painel"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

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
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4">
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
                <TabComentarios recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="estudo" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabEstudo recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="notas" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabNotas recursos={recursos} />
              </Suspense>
            </TabsContent>
            <TabsContent value="cross-refs" className="mt-0">
              <Suspense fallback={<GenericSkeleton />}>
                <TabCrossRefs recursos={recursos} onVersiculoClick={onVersiculoClick} />
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
              <TabCriticaTextual />
            </TabsContent>
            <TabsContent value="ia" className="mt-0">
              <TabIA livro={livro} capitulo={capitulo} versiculo={versiculo} />
            </TabsContent>
          </div>
        </ScrollArea>
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
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
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
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-background border-t border-border shadow-2xl rounded-t-2xl flex flex-col"
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
