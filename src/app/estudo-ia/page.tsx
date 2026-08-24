'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Paywall from '@/components/Paywall';
import { authService } from '@/lib/auth';
import { Sparkles, BookOpen, Loader2, Copy, Check, ChevronDown, Brain, Cross, Lightbulb, MessageCircle, Heart, RotateCcw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ReactMarkdown from 'react-markdown';

const SUGESTOES = [
  { texto: 'Romanos 8 — A Vida no Espírito', tipo: 'exegese' },
  { texto: 'Gênesis 1 — A Criação do Mundo', tipo: 'contexto' },
  { texto: 'Efésios 6 — A Armadura de Deus', tipo: 'aplicacao' },
  { texto: 'Salmos 23 — O Senhor é o Meu Pastor', tipo: 'devocional' },
  { texto: 'João 15 — A Videira Verdadeira', tipo: 'exegese' },
  { texto: 'Filipenses 4 — A Fonte da Paz', tipo: 'aplicacao' },
  { texto: 'Isaías 53 — O Servo Sofredor', tipo: 'profetico' },
  { texto: 'Apocalipse 21 — A Nova Criação', tipo: 'escatologico' },
];

const TIPOS = [
  { id: 'completo', label: 'Estudo Completo', icon: BookOpen, desc: 'Análise exegética, teológica e prática' },
  { id: 'exegese', label: 'Exegese', icon: Brain, desc: 'Foco na análise versículo a versículo' },
  { id: 'contexto', label: 'Contexto', icon: Lightbulb, desc: 'Foco no contexto histórico e cultural' },
  { id: 'aplicacao', label: 'Aplicação', icon: Heart, desc: 'Foco na aplicação prática para hoje' },
];

const ETAPAS_STREAM = [
  { key: 'analise', label: 'Analisando...', icon: Brain },
  { key: 'exegese', label: 'Exegese...', icon: BookOpen },
  { key: 'teologia', label: 'Teologia...', icon: Cross },
  { key: 'aplicacao', label: 'Aplicação...', icon: Lightbulb },
];

function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
      <div className="h-3 bg-muted rounded w-1/2 mt-6" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-4/5" />
      <div className="h-4 bg-muted rounded w-2/3" />
      <div className="h-3 bg-muted rounded w-1/3 mt-6" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </div>
  );
}

function EtapasIndicator({ etapaAtual }: { etapaAtual: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      {ETAPAS_STREAM.map((etapa, i) => {
        const Icon = etapa.icon;
        const ativa = i <= etapaAtual;
        const atual = i === etapaAtual;
        return (
          <motion.div
            key={etapa.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: ativa ? 1 : 0.3, scale: atual ? 1.1 : 1 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              atual
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                : ativa
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {atual ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Icon className="w-3 h-3" />
            )}
            {etapa.label}
          </motion.div>
        );
      })}
    </div>
  );
}

function TypingCursor() {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
    />
  );
}

function MarkdownComponents() {
  return {
    h1: (props: any) => <h1 className="font-display text-2xl font-semibold text-primary mb-4 mt-6">{props.children}</h1>,
    h2: (props: any) => <h2 className="font-display text-xl font-semibold text-primary mb-3 mt-5 flex items-center gap-2">{props.children}</h2>,
    h3: (props: any) => <h3 className="font-display text-lg font-medium mb-2 mt-4">{props.children}</h3>,
    p: (props: any) => <p className="text-foreground/80 mb-3 leading-relaxed">{props.children}</p>,
    ul: (props: any) => <ul className="list-disc list-inside space-y-1 mb-3 text-foreground/80">{props.children}</ul>,
    ol: (props: any) => <ol className="list-decimal list-inside space-y-1 mb-3 text-foreground/80">{props.children}</ol>,
    li: (props: any) => <li className="text-sm">{props.children}</li>,
    strong: (props: any) => <strong className="text-foreground font-semibold">{props.children}</strong>,
    em: (props: any) => <em className="text-primary/80">{props.children}</em>,
    blockquote: (props: any) => (
      <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground my-3">{props.children}</blockquote>
    ),
  };
}

export default function EstudoIAPage() {
  const [passagem, setPassagem] = useState('');
  const [tipo, setTipo] = useState('completo');
  const [estudo, setEstudo] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [historico, setHistorico] = useState<Array<{ passagem: string; data: string }>>([]);
  const [fontes, setFontes] = useState<string[]>([]);
  const [fundamentado, setFundamentado] = useState(false);
  const [temAcesso, setTemAcesso] = useState(true);
  const [paywallAberto, setPaywallAberto] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(-1);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [streamingAtivo, setStreamingAtivo] = useState(false);
  const resultadoRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setTemAcesso(authService.temAcessoTotal());
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref?.trim()) {
      setPassagem(ref.trim());
    }
  }, []);

  const gerarEstudoStream = useCallback(async () => {
    if (!authService.temAcessoTotal()) {
      setPaywallAberto(true);
      return;
    }
    if (!passagem.trim() || carregando) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setCarregando(true);
    setErro('');
    setEstudo('');
    setShowSkeleton(true);
    setEtapaAtual(0);
    setStreamingAtivo(true);

    let textoAcumulado = '';
    let primeiroChunk = true;

    try {
      const res = await fetch('/api/ia/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pergunta: `Gere um estudo bíblico completo do tipo "${tipo}" sobre a passagem: ${passagem.trim()}. Use análise exegética, temas teológicos, referências cruzadas e aplicações práticas. Responda em markdown formatado.`,
          tradicao: undefined,
          contexto: `Tipo de estudo solicitado: ${tipo}. Passagem: ${passagem.trim()}`,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('ReadableStream não disponível');

      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const linhas = buffer.split('\n');
        buffer = linhas.pop() || '';

        for (const linha of linhas) {
          const trimmed = linha.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const jsonStr = trimmed.slice(6);
          if (jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);

            if (parsed.tipo === 'status') {
              const msg = parsed.dados?.message || '';
              if (msg.includes('Analis') || msg.includes('analis')) setEtapaAtual(0);
              else if (msg.includes('Exeg') || msg.includes('exeg')) setEtapaAtual(1);
              else if (msg.includes('Teol') || msg.includes('teol')) setEtapaAtual(2);
              else if (msg.includes('Apli') || msg.includes('apli')) setEtapaAtual(3);
            } else if (parsed.tipo === 'token') {
              if (primeiroChunk) {
                primeiroChunk = false;
                setShowSkeleton(false);
              }
              const token = parsed.dados?.token || '';
              textoAcumulado += token;
              setEstudo(textoAcumulado);

              const lower = textoAcumulado.toLowerCase();
              if (lower.includes('## exeg') || lower.includes('## análise')) setEtapaAtual(1);
              else if (lower.includes('## teol') || lower.includes('## temas')) setEtapaAtual(2);
              else if (lower.includes('## apli') || lower.includes('## prática')) setEtapaAtual(3);
            } else if (parsed.tipo === 'completo') {
              setFontes(parsed.dados?.fontes || []);
              setFundamentado(!!parsed.dados?.fundamentado);
            } else if (parsed.tipo === 'erro') {
              throw new Error(parsed.dados?.message || 'Erro no streaming');
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }

      setHistorico(prev => [
        { passagem: passagem.trim(), data: new Date().toLocaleString('pt-BR') },
        ...prev.slice(0, 9),
      ]);

      setTimeout(() => {
        resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;

      console.warn('Streaming falhou, tentando fallback não-streaming...', err);
      setStreamingAtivo(false);
      setShowSkeleton(false);

      try {
        const res = await fetch('/api/ia/estudo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passagem: passagem.trim(), tipo }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErro(data.erro || 'Erro ao gerar estudo');
          return;
        }

        setEstudo(data.estudo);
        setFundamentado(!!data.fundamentado);
        setFontes(Array.isArray(data.fontes) ? data.fontes : []);
        setHistorico(prev => [
          { passagem: passagem.trim(), data: new Date().toLocaleString('pt-BR') },
          ...prev.slice(0, 9),
        ]);

        setTimeout(() => {
          resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } catch {
        setErro('Falha na conexão. Tente novamente.');
      }
    } finally {
      setCarregando(false);
      setStreamingAtivo(false);
      setShowSkeleton(false);
      setTimeout(() => setEtapaAtual(-1), 1500);
    }
  }, [passagem, tipo, carregando]);

  const cancelarStream = useCallback(() => {
    abortRef.current?.abort();
    setCarregando(false);
    setStreamingAtivo(false);
    setShowSkeleton(false);
    setEtapaAtual(-1);
  }, []);

  const copiarEstudo = async () => {
    await navigator.clipboard.writeText(estudo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const compartilhar = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Estudo Bíblico: ${passagem}`,
        text: estudo.substring(0, 500) + '...',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/25"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Gerador de Estudo <span className="italic text-primary">Bíblico com IA</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Digite uma passagem ou tópico e receba um guia de estudo completo com análise exegética,
                temas teológicos, referências cruzadas e aplicações práticas.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {!temAcesso && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sola-card p-4 mb-4 border-amber-500/20 bg-amber-500/5 flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  O Gerador de Estudo com IA faz parte do <strong>Acesso Total</strong>. Pague R$20 uma vez e use para sempre.
                </p>
              </motion.div>
            )}
            <div className="sola-card p-6 mb-8">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={passagem}
                    onChange={(e) => setPassagem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && gerarEstudoStream()}
                    placeholder="Ex: Romanos 8, Gênesis 1:1-10, A graça de Deus..."
                    className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {TIPOS.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTipo(t.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                          tipo === t.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <motion.button
                  onClick={carregando ? cancelarStream : gerarEstudoStream}
                  disabled={!passagem.trim() && !carregando}
                  whileHover={{ scale: (!passagem.trim() && !carregando) ? 1 : 1.02 }}
                  whileTap={{ scale: (!passagem.trim() && !carregando) ? 1 : 0.98 }}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 ${
                    carregando
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-red-500/25 hover:shadow-red-500/40'
                      : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-500/25 hover:shadow-violet-500/40'
                  }`}
                >
                  {carregando ? (
                    streamingAtivo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Gerando — clique para cancelar
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Gerando estudo...
                      </>
                    )
                  ) : temAcesso ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Gerar Estudo Bíblico
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Desbloququeie o Estudo com IA
                    </>
                  )}
                </motion.button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Sugestões:</span>
                {SUGESTOES.slice(0, 4).map((s) => (
                  <button
                    key={s.texto}
                    onClick={() => { setPassagem(s.texto); setTipo(s.tipo); }}
                    className="text-xs text-primary/70 hover:text-primary transition-colors"
                  >
                    {s.texto}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {erro && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="sola-card p-4 mb-8 border-red-500/20 bg-red-500/5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-500">{erro}</p>
                <button
                  onClick={gerarEstudoStream}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-100 dark:bg-red-900/20 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Tentar novamente
                </button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {(carregando || estudo) && (
              <motion.div
                ref={resultadoRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="sola-card p-8 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Cross className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold">Estudo: {passagem}</h2>
                    {streamingAtivo && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-medium"
                      >
                        <Zap className="w-3 h-3" />
                        Streaming ao vivo
                      </motion.div>
                    )}
                    {fundamentado && fontes.length > 0 && (
                      <span className="ml-2 align-middle inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium" title={fontes.join(', ')}>
                        <Sparkles className="w-3 h-3" />
                        Fundamentado em {fontes.length} fontes
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copiarEstudo}
                      disabled={!estudo}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted disabled:opacity-30"
                      title="Copiar"
                    >
                      {copiado ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={compartilhar}
                      disabled={!estudo}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted disabled:opacity-30"
                      title="Compartilhar"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {carregando && showSkeleton && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-sm dark:prose-invert max-w-none font-serif-body leading-relaxed"
                  >
                    <EtapasIndicator etapaAtual={etapaAtual} />
                    <SkeletonLoader />
                  </motion.div>
                )}

                {carregando && !showSkeleton && estudo && (
                  <div className="prose prose-sm dark:prose-invert max-w-none font-serif-body leading-relaxed">
                    <EtapasIndicator etapaAtual={etapaAtual} />
                    <ReactMarkdown components={MarkdownComponents()}>
                      {estudo}
                    </ReactMarkdown>
                    <TypingCursor />
                  </div>
                )}

                {!carregando && estudo && (
                  <div className="prose prose-sm dark:prose-invert max-w-none font-serif-body leading-relaxed">
                    <ReactMarkdown components={MarkdownComponents()}>
                      {estudo}
                    </ReactMarkdown>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {historico.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="sola-card p-6">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Estudos Recentes
                </h3>
                <div className="space-y-2">
                  {historico.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => setPassagem(h.passagem)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{h.passagem}</span>
                      <span className="text-xs text-muted-foreground">{h.data}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />

      <Paywall aberto={paywallAberto} onFechar={() => setPaywallAberto(false)} />
    </div>
  );
}
