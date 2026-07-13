'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  Church,
  Tag,
  FileText,
  ArrowRight,
  Command as CommandIcon,
  Sparkles,
  Compass,
  Brain,
  History,
  Trash2,
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { useAI } from '@/hooks/useAI';

interface BuscaResultado {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: 'versiculo' | 'doutrina' | 'personagem' | 'topico' | 'estudo';
  href: string;
}

interface BuscaGlobalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIAS: Record<string, { label: string; icon: typeof BookOpen }> = {
  versiculo: { label: 'Versículos', icon: BookOpen },
  doutrina: { label: 'Doutrinas', icon: Church },
  personagem: { label: 'Personagens', icon: Users },
  topico: { label: 'Tópicos', icon: Tag },
  estudo: { label: 'Estudos', icon: FileText },
};

const NAV_COMMANDS: { label: string; href: string; icon: typeof BookOpen; grupo: string }[] = [
  { label: 'Bíblia', href: '/biblia', icon: BookOpen, grupo: 'Páginas' },
  { label: 'Pesquisa', href: '/pesquisa', icon: Compass, grupo: 'Páginas' },
  { label: 'Teologia Sistemática', href: '/teologia', icon: Church, grupo: 'Páginas' },
  { label: 'Estudos', href: '/estudos', icon: FileText, grupo: 'Páginas' },
  { label: 'Assistente IA', href: '/ia', icon: Sparkles, grupo: 'Páginas' },
  { label: 'Línguas Originais', href: '/idiomas', icon: Brain, grupo: 'Páginas' },
  { label: 'Exegese', href: '/exegese', icon: BookOpen, grupo: 'Páginas' },
  { label: 'História Bíblica', href: '/historia', icon: History, grupo: 'Páginas' },
  { label: 'Personagens', href: '/personagens', icon: Users, grupo: 'Páginas' },
  { label: 'Cronologia', href: '/cronologia', icon: History, grupo: 'Páginas' },
  { label: 'Devocional', href: '/devocional', icon: BookOpen, grupo: 'Páginas' },
  { label: 'Planos de Leitura', href: '/planos', icon: BookOpen, grupo: 'Páginas' },
  { label: 'Flashcards', href: '/flashcards', icon: Brain, grupo: 'Páginas' },
  { label: 'Quiz Bíblico', href: '/quiz', icon: Brain, grupo: 'Páginas' },
  { label: 'Concordância', href: '/ferramentas/concordancia', icon: Tag, grupo: 'Ferramentas' },
  { label: 'Crítica Textual', href: '/ferramentas/critica-textual', icon: FileText, grupo: 'Ferramentas' },
  { label: 'Introduções', href: '/ferramentas/introducoes', icon: BookOpen, grupo: 'Ferramentas' },
];

const AcoesCommands = [
  { id: 'abrir-ia', label: 'Pergunte à IA', icon: Sparkles, acao: 'ia' as const, grupo: 'IA' },
  { id: 'mostrar-atalhos', label: 'Mostrar atalhos de teclado', icon: Command, acao: 'atalhos' as const, grupo: 'Ações' },
  { id: 'recomecar-tour', label: 'Refazer tour de boas-vindas', icon: Compass, acao: 'tour' as const, grupo: 'Ações' },
];

const RECENT_KEY = 'ssb_recent_searches';
const MAX_RECENT = 6;
const MAX_RESULTS = 20;

export function BuscaGlobal({ open, onOpenChange }: BuscaGlobalProps) {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<BuscaResultado[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [recentes, setRecentes] = useState<string[]>([]);
  const router = useRouter();
  const { open: openAI, ask: askAI } = useAI();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecentes(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResultados([]);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    const handleToggle = () => onOpenChange(!open);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('ssb:toggle-busca', handleToggle as EventListener);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('ssb:toggle-busca', handleToggle as EventListener);
    };
  }, [open, onOpenChange]);

  const buscar = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResultados([]);
      return;
    }
    setCarregando(true);
    try {
      const res = await fetch(`/api/busca?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const limitados: BuscaResultado[] = [];
      const contagem: Record<string, number> = {};

      for (const r of (data.resultados || []) as BuscaResultado[]) {
        contagem[r.categoria] = (contagem[r.categoria] || 0) + 1;
        if (contagem[r.categoria] <= MAX_RESULTS && limitados.length < MAX_RESULTS * 5) {
          limitados.push(r);
        }
      }
      setResultados(limitados);
    } catch {
      setResultados([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => buscar(query), 300);
    return () => clearTimeout(timer);
  }, [query, buscar]);

  const resultadosPorCategoria = useMemo(() => {
    const map: Record<string, BuscaResultado[]> = {};
    for (const r of resultados) {
      if (!map[r.categoria]) map[r.categoria] = [];
      map[r.categoria].push(r);
    }
    return map;
  }, [resultados]);

  const salvarRecente = useCallback((q: string) => {
    if (!q || q.trim().length < 2) return;
    setRecentes((prev) => {
      const semDup = prev.filter((x) => x.toLowerCase() !== q.toLowerCase());
      const prox = [q, ...semDup].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(prox));
      } catch {
        /* ignore */
      }
      return prox;
    });
  }, []);

  const limparRecentes = useCallback(() => {
    setRecentes([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const navegar = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  const executarAcao = useCallback(
    (acao: 'ia' | 'atalhos' | 'tour') => {
      onOpenChange(false);
      if (acao === 'ia') {
        openAI();
      } else if (acao === 'atalhos') {
        window.dispatchEvent(new CustomEvent('ssb:open-shortcuts'));
      } else if (acao === 'tour') {
        try {
          localStorage.removeItem('ssb_onboarding_done');
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new CustomEvent('ssb:reset-onboarding'));
      }
    },
    [onOpenChange, openAI]
  );

  const perguntarIA = useCallback(
    async (pergunta: string) => {
      salvarRecente(pergunta);
      onOpenChange(false);
      await askAI(pergunta);
    },
    [salvarRecente, onOpenChange, askAI]
  );

  const isSearching = query.trim().length >= 2;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-0 top-[12vh] z-[70] mx-auto w-[calc(100%-2rem)] max-w-2xl"
          >
            <div className="rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              <Command label="Busca global" shouldFilter={false}>
                <CommandInput
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Buscar versículos, doutrinas, personagens ou comandos…"
                  wrapperClassName="border-b border-border/30"
                />
                <CommandList>
                  {carregando && (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}

                  {!carregando && isSearching && resultados.length === 0 && (
                    <CommandEmpty>
                      <p className="text-sm">Nenhum resultado encontrado</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        Tente outros termos de busca
                      </p>
                    </CommandEmpty>
                  )}

                  {!carregando && !isSearching && (
                    <>
                      {recentes.length > 0 && (
                        <CommandGroup heading="Buscas recentes">
                          {recentes.map((r) => (
                            <CommandItem
                              key={r}
                              value={`recente-${r}`}
                              onSelect={() => setQuery(r)}
                            >
                              <History className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="truncate">{r}</span>
                            </CommandItem>
                          ))}
                          <CommandItem
                            value="limpar-recentes"
                            onSelect={limparRecentes}
                            className="text-muted-foreground"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Limpar buscas recentes</span>
                          </CommandItem>
                        </CommandGroup>
                      )}

                      <CommandGroup heading="Ações">
                        {AcoesCommands.filter((c) => c.grupo === 'Ações').map((c) => {
                          const Icon = c.icon;
                          return (
                            <CommandItem
                              key={c.id}
                              value={c.label}
                              onSelect={() => executarAcao(c.acao)}
                            >
                              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>{c.label}</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>

                      <CommandGroup heading="IA">
                        {AcoesCommands.filter((c) => c.grupo === 'IA').map((c) => {
                          const Icon = c.icon;
                          return (
                            <CommandItem
                              key={c.id}
                              value={c.label}
                              onSelect={() => executarAcao(c.acao)}
                            >
                              <Icon className="w-3.5 h-3.5 text-blue-500" />
                              <span>{c.label}</span>
                              <CommandShortcut>⌘J</CommandShortcut>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>

                      <CommandGroup heading="Páginas">
                        {NAV_COMMANDS.filter((c) => c.grupo === 'Páginas').map((c) => {
                          const Icon = c.icon;
                          return (
                            <CommandItem
                              key={c.href}
                              value={`nav-${c.label}`}
                              onSelect={() => navegar(c.href)}
                            >
                              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>{c.label}</span>
                              <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground/50" />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>

                      <CommandGroup heading="Ferramentas">
                        {NAV_COMMANDS.filter((c) => c.grupo === 'Ferramentas').map((c) => {
                          const Icon = c.icon;
                          return (
                            <CommandItem
                              key={c.href}
                              value={`nav-${c.label}`}
                              onSelect={() => navegar(c.href)}
                            >
                              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>{c.label}</span>
                              <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground/50" />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </>
                  )}

                  {!carregando && isSearching && (
                    <>
                      {Object.entries(resultadosPorCategoria).map(([cat, items]) => {
                        const meta = CATEGORIAS[cat];
                        if (!meta || !items.length) return null;
                        const Icon = meta.icon;
                        return (
                          <CommandGroup
                            key={cat}
                            heading={`${meta.label} (${items.length})`}
                          >
                            {items.slice(0, 8).map((r) => (
                              <CommandItem
                                key={r.id}
                                value={`${r.titulo} ${r.subtitulo || ''}`}
                                onSelect={() => {
                                  salvarRecente(query);
                                  navegar(r.href);
                                }}
                              >
                                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{r.titulo}</p>
                                  {r.subtitulo && (
                                    <p className="text-[10px] text-muted-foreground truncate">
                                      {r.subtitulo}
                                    </p>
                                  )}
                                </div>
                                <ArrowRight className="w-3 h-3 text-muted-foreground/50" />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        );
                      })}

                      <CommandGroup heading="Sugestões">
                        <CommandItem
                          value={`perguntar-ia-${query}`}
                          onSelect={() => perguntarIA(query)}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                          <span>
                            Perguntar à IA: &ldquo;{query}&rdquo;
                          </span>
                          <CommandShortcut>⌘J</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>

              <div className="flex items-center gap-4 px-5 py-2.5 border-t border-border/30 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border/50 rounded bg-muted/50 font-mono text-[10px]">↑↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border/50 rounded bg-muted/50 font-mono text-[10px]">↵</kbd>
                  abrir
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border/50 rounded bg-muted/50 font-mono text-[10px]">esc</kbd>
                  fechar
                </span>
                <span className="ml-auto flex items-center gap-1">
                  <CommandIcon className="w-3 h-3" />
                  <span className="font-mono text-[10px]">K</span>
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
