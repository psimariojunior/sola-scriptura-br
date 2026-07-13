'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Highlighter,
  Languages,
  MessageSquare,
  PenLine,
  Heart,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Save,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CompartilharEstudo } from '@/components/CompartilharEstudo';
import { carregarTraducao } from '@/data/biblia/texto/carregar';
import { livroPorAbreviacao, TODOS_LIVROS } from '@/data/biblia/livros';
import { useToast } from '@/hooks/useToast';
import { useAI } from '@/hooks/useAI';

interface Versiculo {
  numero: number;
  texto: string;
  selecionado?: boolean;
  grifado?: boolean;
  nota?: string;
}

const STORAGE_KEY_PREFIX = 'ssb_estudo_';

const STEPS = [
  { id: 'ler', label: 'Ler', icon: BookOpen, descricao: 'Leia o capítulo com atenção' },
  { id: 'destacar', label: 'Destacar', icon: Highlighter, descricao: 'Marque versículos importantes' },
  { id: 'lexico', label: 'Léxico', icon: Languages, descricao: 'Estude palavras-chave' },
  { id: 'comentarios', label: 'Comentários', icon: MessageSquare, descricao: 'Leia reflexões de teólogos' },
  { id: 'anotar', label: 'Anotar', icon: PenLine, descricao: 'Registre suas reflexões' },
  { id: 'aplicar', label: 'Aplicar', icon: Heart, descricao: 'Como aplicar hoje?' },
  { id: 'compartilhar', label: 'Compartilhar', icon: Share2, descricao: 'Compartilhe seu estudo' },
] as const;

type StepId = (typeof STEPS)[number]['id'];

function storageKey(livro: string, cap: number): string {
  return `${STORAGE_KEY_PREFIX}${livro}_${cap}`;
}

interface EstudoProgresso {
  step: number;
  grifados: number[];
  notas: Record<number, string>;
  reflexao: string;
  aplicacao: string;
  finalizado: boolean;
  updatedAt: string;
}

function carregarProgresso(livro: string, cap: number): EstudoProgresso {
  if (typeof window === 'undefined') {
    return progressoVazio();
  }
  try {
    const raw = localStorage.getItem(storageKey(livro, cap));
    if (raw) return { ...progressoVazio(), ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return progressoVazio();
}

function progressoVazio(): EstudoProgresso {
  return {
    step: 0,
    grifados: [],
    notas: {},
    reflexao: '',
    aplicacao: '',
    finalizado: false,
    updatedAt: new Date().toISOString(),
  };
}

function salvarProgresso(livro: string, cap: number, data: EstudoProgresso) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      storageKey(livro, cap),
      JSON.stringify({ ...data, updatedAt: new Date().toISOString() })
    );
  } catch {
    /* ignore */
  }
}

export default function EstudarPage() {
  const params = useParams();
  const router = useRouter();
  const livro = (params.livro as string)?.toLowerCase();
  const capitulo = parseInt(params.capitulo as string, 10);
  const infoLivro = livro ? livroPorAbreviacao.get(livro) : undefined;
  const { toast } = useToast();
  const { open: openAI, ask: askAI } = useAI();

  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [step, setStep] = useState(0);
  const [grifados, setGrifados] = useState<Set<number>>(new Set());
  const [notas, setNotas] = useState<Record<number, string>>({});
  const [reflexao, setReflexao] = useState('');
  const [aplicacao, setAplicacao] = useState('');
  const [progressoFinalizado, setProgressoFinalizado] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (!infoLivro) return;
    if (isNaN(capitulo) || capitulo < 1 || capitulo > infoLivro.totalCapitulos) return;

    const data = carregarProgresso(livro, capitulo);
    setStep(data.step);
    setGrifados(new Set(data.grifados));
    setNotas(data.notas);
    setReflexao(data.reflexao);
    setAplicacao(data.aplicacao);
    setProgressoFinalizado(data.finalizado);
  }, [livro, capitulo, infoLivro]);

  useEffect(() => {
    if (!infoLivro || initRef.current) return;
    if (isNaN(capitulo) || capitulo < 1) return;

    let cancelled = false;
    setCarregando(true);
    carregarTraducao('arc')
      .then((data) => {
        if (cancelled) return;
        const arr = data[livro]?.[capitulo];
        if (arr && arr.length) {
          setVersiculos(
            arr
              .map((t, i) => ({ numero: i + 1, texto: t.trim() }))
              .filter((v) => v.texto)
          );
        } else {
          setVersiculos([]);
        }
      })
      .catch(() => {
        if (!cancelled) setVersiculos([]);
      })
      .finally(() => {
        if (!cancelled) setCarregando(false);
      });

    return () => {
      cancelled = true;
    };
  }, [livro, capitulo, infoLivro]);

  const persistir = useCallback(
    (updates: Partial<EstudoProgresso>) => {
      if (!infoLivro) return;
      const atual: EstudoProgresso = {
        step,
        grifados: Array.from(grifados),
        notas,
        reflexao,
        aplicacao,
        finalizado: progressoFinalizado,
        updatedAt: new Date().toISOString(),
        ...updates,
      };
      salvarProgresso(livro, capitulo, atual);
    },
    [
      infoLivro,
      livro,
      capitulo,
      step,
      grifados,
      notas,
      reflexao,
      aplicacao,
      progressoFinalizado,
    ]
  );

  const toggleGrifar = useCallback(
    (n: number) => {
      setGrifados((prev) => {
        const prox = new Set(prev);
        if (prox.has(n)) prox.delete(n);
        else prox.add(n);
        return prox;
      });
    },
    []
  );

  const setNota = useCallback((n: number, texto: string) => {
    setNotas((prev) => ({ ...prev, [n]: texto }));
  }, []);

  const irParaStep = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= STEPS.length) return;
      setStep(idx);
      persistir({ step: idx });
    },
    [persistir]
  );

  const avancar = useCallback(() => {
    if (step < STEPS.length - 1) irParaStep(step + 1);
  }, [step, irParaStep]);

  const voltar = useCallback(() => {
    if (step > 0) irParaStep(step - 1);
  }, [step, irParaStep]);

  const finalizar = useCallback(() => {
    setProgressoFinalizado(true);
    persistir({ finalizado: true });
    toast({
      title: 'Estudo concluído!',
      description: 'Seu progresso foi salvo. Você pode revisitar a qualquer momento.',
      variant: 'success',
    });
  }, [persistir, toast]);

  const salvarRascunho = useCallback(() => {
    persistir({});
    toast({ title: 'Rascunho salvo', variant: 'success' });
  }, [persistir, toast]);

  const perguntarIA = useCallback(
    async (pergunta?: string) => {
      const q =
        pergunta ||
        `Me ajude a estudar ${infoLivro?.nome || livro} capítulo ${capitulo}. Quais são os pontos principais?`;
      await askAI(q, `Capítulo ${capitulo}`);
    },
    [askAI, infoLivro, livro, capitulo]
  );

  if (!infoLivro) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
            <h1 className="font-display text-2xl mb-2">Livro não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              O livro &ldquo;{livro}&rdquo; não existe.
            </p>
            <Link
              href="/biblia"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à Bíblia
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isNaN(capitulo) || capitulo < 1 || capitulo > infoLivro.totalCapitulos) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
            <h1 className="font-display text-2xl mb-2">Capítulo inválido</h1>
            <p className="text-muted-foreground mb-6">
              {infoLivro.nome} tem {infoLivro.totalCapitulos} capítulos.
            </p>
            <Link
              href={`/biblia/${livro}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver capítulos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stepAtual = STEPS[step];
  const progressoPercent = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header do estudo */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Link href="/biblia" className="hover:text-primary transition-colors">
                Bíblia
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/biblia/${livro}`} className="hover:text-primary transition-colors">
                {infoLivro.nome}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Estudo {capitulo}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-light mb-2">
              Estudo Guiado
            </h1>
            <p className="text-sm text-muted-foreground">
              {infoLivro.nome} {capitulo} · {STEPS.length} passos
            </p>
          </div>

          {/* Barra de progresso */}
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl -mx-4 sm:mx-0 sm:rounded-2xl border-y sm:border border-border/40 px-4 sm:px-5 py-3 mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-foreground">
                Passo {step + 1} de {STEPS.length}: {stepAtual.label}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={salvarRascunho}
                  className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <Save className="w-3 h-3" />
                  Salvar
                </button>
                <span className="text-[10px] text-muted-foreground">
                  {Math.round(progressoPercent)}%
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressoPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const ativo = i === step;
                const completo = i < step;
                return (
                  <button
                    key={s.id}
                    onClick={() => irParaStep(i)}
                    className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors shrink-0 ${
                      ativo
                        ? 'text-primary'
                        : completo
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={s.label}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        ativo
                          ? 'bg-primary text-primary-foreground'
                          : completo
                          ? 'bg-emerald-500/10'
                          : 'bg-muted/50'
                      }`}
                    >
                      {completo ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className="text-[9px] font-medium hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdo da etapa */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stepAtual.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Ler */}
              {stepAtual.id === 'ler' && (
                <StepLer
                  versiculos={versiculos}
                  carregando={carregando}
                  livro={infoLivro.nome}
                  capitulo={capitulo}
                  onPerguntarIA={perguntarIA}
                />
              )}

              {stepAtual.id === 'destacar' && (
                <StepDestacar
                  versiculos={versiculos}
                  grifados={grifados}
                  onToggle={toggleGrifar}
                  livro={infoLivro.nome}
                  capitulo={capitulo}
                />
              )}

              {stepAtual.id === 'lexico' && (
                <StepLexico
                  versiculos={versiculos}
                  grifados={grifados}
                  livro={infoLivro.nome}
                  capitulo={capitulo}
                />
              )}

              {stepAtual.id === 'comentarios' && (
                <StepComentarios
                  livro={infoLivro.nome}
                  livroAbrev={livro}
                  capitulo={capitulo}
                  onPerguntarIA={perguntarIA}
                />
              )}

              {stepAtual.id === 'anotar' && (
                <StepAnotar
                  versiculos={versiculos}
                  grifados={grifados}
                  notas={notas}
                  reflexao={reflexao}
                  onSetNota={setNota}
                  onSetReflexao={setReflexao}
                />
              )}

              {stepAtual.id === 'aplicar' && (
                <StepAplicar
                  aplicacao={aplicacao}
                  onSetAplicacao={setAplicacao}
                />
              )}

              {stepAtual.id === 'compartilhar' && (
                <StepCompartilhar
                  livro={infoLivro.nome}
                  livroAbrev={livro}
                  capitulo={capitulo}
                  grifados={grifados}
                  notas={notas}
                  reflexao={reflexao}
                  aplicacao={aplicacao}
                  finalizado={progressoFinalizado}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navegação inferior */}
          <div className="mt-8 flex items-center justify-between gap-3 sticky bottom-4 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/40 p-3 z-20">
            <button
              onClick={voltar}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => perguntarIA()}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">IA</span>
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  onClick={avancar}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={finalizar}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Concluir
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CardHeaderStep({ icon: Icon, titulo, subtitulo }: { icon: typeof BookOpen; titulo: string; subtitulo: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h2 className="font-display text-xl font-medium">{titulo}</h2>
        <p className="text-sm text-muted-foreground">{subtitulo}</p>
      </div>
    </div>
  );
}

function StepLer({
  versiculos,
  carregando,
  livro,
  capitulo,
  onPerguntarIA,
}: {
  versiculos: Versiculo[];
  carregando: boolean;
  livro: string;
  capitulo: number;
  onPerguntarIA: (q: string) => void;
}) {
  if (carregando) {
    return (
      <div className="sola-card p-6">
        <CardHeaderStep icon={BookOpen} titulo="Carregando capítulo..." subtitulo="Aguarde um instante" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 bg-muted/40 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (versiculos.length === 0) {
    return (
      <div className="sola-card p-6 text-center">
        <p className="text-muted-foreground">Capítulo não disponível offline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="sola-card p-6">
        <CardHeaderStep
          icon={BookOpen}
          titulo={`${livro} ${capitulo}`}
          subtitulo="Leia com atenção. Anote impressões iniciais."
        />

        <div className="font-serif-body text-base sm:text-lg leading-relaxed space-y-3">
          {versiculos.map((v) => (
            <p key={v.numero}>
              <sup className="text-xs text-primary font-bold mr-1.5">{v.numero}</sup>
              {v.texto}
            </p>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border/30 flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            💡 Dica: leia em voz alta para melhor compreensão.
          </p>
          <button
            onClick={() => onPerguntarIA(`Resuma ${livro} ${capitulo} em 5 pontos principais.`)}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Sparkles className="w-3 h-3" />
            Resumir com IA
          </button>
        </div>
      </div>
    </div>
  );
}

function StepDestacar({
  versiculos,
  grifados,
  onToggle,
  livro,
  capitulo,
}: {
  versiculos: Versiculo[];
  grifados: Set<number>;
  onToggle: (n: number) => void;
  livro: string;
  capitulo: number;
}) {
  return (
    <div className="sola-card p-6">
      <CardHeaderStep
        icon={Highlighter}
        titulo="Destacar versículos"
        subtitulo={`${grifados.size} versículo(s) marcado(s) em ${livro} ${capitulo}`}
      />
      <div className="font-serif-body text-base leading-relaxed space-y-2.5 max-h-[60vh] overflow-y-auto pr-2">
        {versiculos.map((v) => {
          const marcado = grifados.has(v.numero);
          return (
            <button
              key={v.numero}
              onClick={() => onToggle(v.numero)}
              className={`w-full text-left rounded-lg p-2 transition-all ${
                marcado
                  ? 'bg-amber-500/10 border-l-4 border-amber-500'
                  : 'hover:bg-muted/30 border-l-4 border-transparent'
              }`}
            >
              <p className={marcado ? 'text-foreground' : 'text-muted-foreground'}>
                <sup className="text-xs text-primary font-bold mr-1.5">{v.numero}</sup>
                {v.texto}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepLexico({
  versiculos,
  grifados,
  livro,
  capitulo,
}: {
  versiculos: Versiculo[];
  grifados: Set<number>;
  livro: string;
  capitulo: number;
}) {
  const alvo = useMemo(() => {
    const nums = Array.from(grifados);
    if (nums.length === 0) return versiculos.slice(0, 3);
    return versiculos.filter((v) => grifados.has(v.numero));
  }, [versiculos, grifados]);

  const palavrasChave = useMemo(() => {
    const texto = alvo.map((v) => v.texto).join(' ');
    const stopwords = new Set([
      'a', 'o', 'as', 'os', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas',
      'em', 'por', 'para', 'com', 'sem', 'e', 'ou', 'mas', 'que', 'se', 'é', 'foi', 'ser', 'ter',
      'são', 'ao', 'à', 'aos', 'às', 'pelo', 'pela', 'este', 'esta', 'isto', 'isso', 'aquele',
    ]);
    const cont: Record<string, number> = {};
    texto
      .toLowerCase()
      .replace(/[^\p{L}\s]/gu, ' ')
      .split(/\s+/)
      .filter((p) => p.length > 4 && !stopwords.has(p))
      .forEach((p) => {
        cont[p] = (cont[p] || 0) + 1;
      });
    return Object.entries(cont)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([palavra, freq]) => ({ palavra, freq }));
  }, [alvo]);

  return (
    <div className="space-y-4">
      <div className="sola-card p-6">
        <CardHeaderStep
          icon={Languages}
          titulo="Estudo de léxico"
          subtitulo={`Palavras-chave de ${livro} ${capitulo}`}
        />
        {grifados.size === 0 ? (
          <p className="text-sm text-muted-foreground">
            Você ainda não destacou nenhum versículo. Volte ao passo anterior para destacar
            versículos importantes.
          </p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-3">
              Explore as palavras mais frequentes nos versículos destacados. Pesquise-as em
              grego/hebraico no painel de Léxico.
            </p>
            <div className="flex flex-wrap gap-2">
              {palavrasChave.map((p) => (
                <Link
                  key={p.palavra}
                  href={`/idiomas?q=${encodeURIComponent(p.palavra)}`}
                  className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  {p.palavra}
                  <span className="ml-1.5 text-[10px] text-muted-foreground">×{p.freq}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="sola-card p-6">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Languages className="w-4 h-4" />
          Pesquise palavras nos léxicos
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Acesse a ferramenta completa de estudo de grego e hebraico.
        </p>
        <Link
          href="/idiomas"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Abrir Léxico
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function StepComentarios({
  livro,
  livroAbrev,
  capitulo,
  onPerguntarIA,
}: {
  livro: string;
  livroAbrev: string;
  capitulo: number;
  onPerguntarIA: (q: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="sola-card p-6">
        <CardHeaderStep
          icon={MessageSquare}
          titulo="Comentários de teólogos"
          subtitulo={`Veja o que estudiosos dizem sobre ${livro} ${capitulo}`}
        />
        <div className="space-y-2">
          <Link
            href={`/estudos/${livroAbrev}`}
            className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <div>
              <p className="text-sm font-medium">Visão geral do livro</p>
              <p className="text-xs text-muted-foreground">Contexto, autor, temas</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
          <Link
            href={`/exegese?livro=${livroAbrev}&capitulo=${capitulo}`}
            className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <div>
              <p className="text-sm font-medium">Exegese de {livro} {capitulo}</p>
              <p className="text-xs text-muted-foreground">Análise estruturada</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
          <Link
            href={`/teologia`}
            className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <div>
              <p className="text-sm font-medium">Teologia sistemática</p>
              <p className="text-xs text-muted-foreground">Doutrinas relacionadas</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>

        <button
          onClick={() => onPerguntarIA(`Quais são os principais comentários teológicos sobre ${livro} ${capitulo}?`)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Pedir comentário da IA
        </button>
      </div>
    </div>
  );
}

function StepAnotar({
  versiculos,
  grifados,
  notas,
  reflexao,
  onSetNota,
  onSetReflexao,
}: {
  versiculos: Versiculo[];
  grifados: Set<number>;
  notas: Record<number, string>;
  reflexao: string;
  onSetNota: (n: number, texto: string) => void;
  onSetReflexao: (t: string) => void;
}) {
  const versAlvo = useMemo(() => {
    if (grifados.size === 0) return versiculos.slice(0, 3);
    return versiculos.filter((v) => grifados.has(v.numero));
  }, [versiculos, grifados]);

  return (
    <div className="space-y-4">
      <div className="sola-card p-6">
        <CardHeaderStep
          icon={PenLine}
          titulo="Anotações por versículo"
          subtitulo="Escreva suas observações em cada versículo destacado"
        />
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
          {versAlvo.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum versículo destacado. Volte ao passo &ldquo;Destacar&rdquo;.
            </p>
          ) : (
            versAlvo.map((v) => (
              <div key={v.numero} className="border border-border/40 rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-1.5">
                  {v.numero}. {v.texto.slice(0, 90)}
                  {v.texto.length > 90 ? '…' : ''}
                </p>
                <textarea
                  value={notas[v.numero] || ''}
                  onChange={(e) => onSetNota(v.numero, e.target.value)}
                  placeholder="Sua reflexão sobre este versículo..."
                  rows={2}
                  className="w-full text-sm bg-muted/20 border border-border/30 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="sola-card p-6">
        <CardHeaderStep
          icon={BookOpen}
          titulo="Reflexão geral"
          subtitulo="O que este capítulo está te ensinando?"
        />
        <textarea
          value={reflexao}
          onChange={(e) => onSetReflexao(e.target.value)}
          placeholder="Escreva sua reflexão pessoal sobre o capítulo..."
          rows={6}
          className="w-full text-sm bg-muted/20 border border-border/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
        />
      </div>
    </div>
  );
}

function StepAplicar({
  aplicacao,
  onSetAplicacao,
}: {
  aplicacao: string;
  onSetAplicacao: (t: string) => void;
}) {
  const sugestoes = [
    'Como posso aplicar este ensino na minha família hoje?',
    'O que Deus está me mostrando sobre minha vida?',
    'Que mudança concreta posso fazer esta semana?',
    'Como compartilhar este aprendizado com outros?',
  ];

  return (
    <div className="sola-card p-6">
      <CardHeaderStep
        icon={Heart}
        titulo="Aplicação prática"
        subtitulo="Transforme o estudo em ação concreta"
      />
      <p className="text-sm text-muted-foreground mb-3">
        Selecione uma pergunta abaixo ou escreva sua própria resposta:
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {sugestoes.map((s, i) => (
          <button
            key={i}
            onClick={() => onSetAplicacao(s + '\n\n')}
            className="px-3 py-1.5 text-xs rounded-full border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
      <textarea
        value={aplicacao}
        onChange={(e) => onSetAplicacao(e.target.value)}
        placeholder="Escreva aqui como você aplicará este estudo..."
        rows={8}
        className="w-full text-sm bg-muted/20 border border-border/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
      />
    </div>
  );
}

function StepCompartilhar({
  livro,
  livroAbrev,
  capitulo,
  grifados,
  notas,
  reflexao,
  aplicacao,
  finalizado,
}: {
  livro: string;
  livroAbrev: string;
  capitulo: number;
  grifados: Set<number>;
  notas: Record<number, string>;
  reflexao: string;
  aplicacao: string;
  finalizado: boolean;
}) {
  const [estudoId] = useState(() => `estudo_${livroAbrev}_${capitulo}_${Date.now()}`);
  const { toast } = useToast();

  const textoCompartilhar = useMemo(() => {
    const partes: string[] = [`# Estudo: ${livro} ${capitulo}\n`];
    if (grifados.size > 0) {
      partes.push(`**${grifados.size} versículo(s) destacado(s)**\n`);
    }
    Object.entries(notas).forEach(([num, nota]) => {
      if (nota?.trim()) {
        partes.push(`\n## v.${num}\n${nota}`);
      }
    });
    if (reflexao?.trim()) {
      partes.push(`\n## Reflexão\n${reflexao}`);
    }
    if (aplicacao?.trim()) {
      partes.push(`\n## Aplicação\n${aplicacao}`);
    }
    partes.push(`\n---\n*via Sola Scriptura*`);
    return partes.join('\n');
  }, [livro, capitulo, grifados, notas, reflexao, aplicacao]);

  const copiarTudo = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textoCompartilhar);
      toast({ title: 'Estudo copiado!', variant: 'success' });
    } catch {
      toast({ title: 'Erro ao copiar', variant: 'error' });
    }
  }, [textoCompartilhar, toast]);

  return (
    <div className="space-y-4">
      <div className="sola-card p-6">
        <CardHeaderStep
          icon={Share2}
          titulo="Compartilhe seu estudo"
          subtitulo="Exporte, copie ou compartilhe com a comunidade"
        />

        {finalizado ? (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <p className="text-sm">Estudo concluído e salvo com sucesso!</p>
          </div>
        ) : (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm">
            Conclua o estudo para salvar definitivamente.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={copiarTudo}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-colors"
          >
            <Save className="w-4 h-4" />
            Copiar como texto
          </button>
          <CompartilharEstudo
            estudoId={estudoId}
            titulo={`Estudo: ${livro} ${capitulo}`}
            descricao={reflexao || `Estudo guiado de ${livro} ${capitulo}`}
            referencia={`${livro} ${capitulo}`}
          />
        </div>
      </div>

      <div className="sola-card p-6">
        <h3 className="text-sm font-semibold mb-3">Pré-visualização</h3>
        <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-muted/20 rounded-lg p-3 max-h-80 overflow-y-auto font-mono">
          {textoCompartilhar}
        </pre>
      </div>
    </div>
  );
}
