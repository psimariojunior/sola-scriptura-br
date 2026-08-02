'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Copy, Download, RefreshCw, Sparkles, FileText, Lightbulb, Target, Users, Clock, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';

interface SermaoSecao {
  titulo: string;
  conteudo: string;
  versiculos: string[];
}

interface Sermao {
  titulo: string;
  introducao: string;
  proposicao: string;
  ilustracoes: string[];
  aplicacoes: string[];
  conclusao: string;
  secoes: SermaoSecao[];
  tempoEstimado: string;
  publicoAlvo: string;
  temaCentral: string;
}

const SUGESTOES = [
  { titulo: 'Gênesis 1 — A Criação', referencia: 'Gênesis 1:1-31', tema: 'Criador e soberania de Deus' },
  { titulo: 'Salmo 23 — O Bom Pastor', referencia: 'Salmos 23:1-6', tema: 'Provisão e cuidado divino' },
  { titulo: 'Isaías 53 — O Servo Sofredor', referencia: 'Isaías 53:1-12', tema: 'Substituição vicária' },
  { titulo: 'João 3:16 — Amor Eterno', referencia: 'João 3:16-21', tema: 'Salvação por graça' },
  { titulo: 'Romanos 8 — Nada Nos Separará', referencia: 'Romanos 8:1-39', tema: 'Segurança no Espírito Santo' },
  { titulo: 'Efésios 6 — Armadura de Deus', referencia: 'Efésios 6:10-20', tema: 'Guerra espiritual' },
  { titulo: 'Filipenses 4 — Alegria em Tudo', referencia: 'Filipenses 4:4-13', tema: 'Contentamento e paz' },
  { titulo: 'Apocalipse 21 — Nova Criatura', referencia: 'Apocalipse 21:1-8', tema: 'Esperança da eternidade' },
];

function gerarSermaoLocal(referencia: string, tema: string): Sermao {
  const secoes: SermaoSecao[] = [
    {
      titulo: 'Contexto Histórico',
      conteudo: `Para compreendermos ${referencia}, precisamos entender o contexto em que foi escrito. O autor estava escrevendo para uma audiência específica, enfrentando desafios particulares da época. O tema "${tema}" era central para a comunidade daquele tempo.`,
      versiculos: [referencia],
    },
    {
      titulo: 'Observação do Texto',
      conteudo: `Ao lermos atentamente ${referencia}, notamos que o texto apresenta verdades profundas sobre ${tema}. A linguagem utilizada revela a intenção do autor de comunicar algo essencial para a fé dos crentes.`,
      versiculos: [referencia],
    },
    {
      titulo: 'Interpretação Teológica',
      conteudo: `Do ponto de vista teológico, ${referencia} nos ensina que ${tema} é fundamental para a compreensão do plano divino. Esta passagem conecta-se com todo o arco narrativo das Escrituras, desde a criação até a consumação final.`,
      versiculos: [referencia],
    },
    {
      titulo: 'Aplicação Prática',
      conteudo: `Como podemos aplicar ${tema} em nossas vidas hoje? Primeiramente, precisamos reconhecer que a Palavra de Deus é viva e eficaz. Em segundo lugar, devemos permitir que o Espírito Santo transforme nosso entendimento. Por fim, agimos em obediência àquilo que Deus nos revela.`,
      versiculos: [referencia],
    },
  ];

  return {
    titulo: `${tema} — Estudo de ${referencia}`,
    introducao: `Hoje vamos estudar juntos ${referencia}, uma passagem que trata de forma profunda o tema de ${tema}. Que o Espírito Santo ilumine nosso entendimento enquanto mergulhamos na Palavra de Deus.`,
    proposicao: `A proposição deste sermão é: ${tema} é essencial para a vida cristã, e devemos compreendê-lo e aplicá-lo diariamente.`,
    ilustracoes: [
      `Assim como um pintor precisa de diferentes cores para criar uma obra-prima, Deus usa diversas circunstâncias para moldar nosso caráter em relação a ${tema}.`,
      `Um jardineiro não planta uma semente e espera vê-la crescer instantaneamente. Da mesma forma, ${tema} em nossa vida requer paciência e constância.`,
    ],
    aplicacoes: [
      `Dedique tempo diário para meditar em ${referencia} e permita que ${tema} transforme seu coração.`,
      `Compartilhe o que aprendeu sobre ${tema} com alguém esta semana.`,
      `Coloque em prática pelo menos uma lição concreta sobre ${tema} nesta semana.`,
    ],
    conclusao: `Em conclusão, ${referencia} nos desafia a viver ${tema} de forma autêntica. Que sejamos pessoas que não apenas ouvem a Palavra, mas a praticam. Que Deus nos abençoe e nos fortaleça nesta jornada.`,
    secoes,
    tempoEstimado: '20-25 minutos',
    publicoAlvo: 'Todos os crentes',
    temaCentral: tema,
  };
}

export default function SermonBuilderPage() {
  const [referencia, setReferencia] = useState('');
  const [tema, setTema] = useState('');
  const [sermao, setSermao] = useState<Sermao | null>(null);
  const [gerando, setGerando] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<number | null>(null);

  const handleGerar = useCallback(async (ref?: string, t?: string) => {
    const r = ref || referencia;
    const tm = t || tema;
    if (!r) return;

    setGerando(true);
    setSermao(null);

    // Simular delay de IA
    await new Promise(resolve => setTimeout(resolve, 1500));

    const resultado = gerarSermaoLocal(r, tm || 'Tema central');
    setSermao(resultado);
    setGerando(false);
  }, [referencia, tema]);

  const handleCopiar = useCallback(() => {
    if (!sermao) return;
    let texto = `${sermao.titulo}\n\n`;
    texto += `Proposição: ${sermao.proposicao}\n\n`;
    texto += `Introdução:\n${sermao.introducao}\n\n`;
    for (const s of sermao.secoes) {
      texto += `${s.titulo}\n${s.conteudo}\n`;
      if (s.versiculos.length) texto += `Ref: ${s.versiculos.join(', ')}\n\n`;
    }
    texto += `Aplicações:\n${sermao.aplicacoes.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\n`;
    texto += `Conclusão:\n${sermao.conclusao}`;
    navigator.clipboard.writeText(texto);
  }, [sermao]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Gerador de Sermão com IA
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-3">
              Construa seu <span className="text-[var(--brand-default)]">Sermão</span>
            </h1>
            <p className="text-[var(--content-secondary)] max-w-lg mx-auto">
              Gere uma estrutura completa de sermão a partir de uma passagem bíblica.
              Inclui introdução, seções exegéticas, ilustrações, aplicações e conclusão.
            </p>
          </div>
        </ScrollReveal>

        {/* Input */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-[var(--content-secondary)] mb-1.5 block">
                  Referência Bíblica
                </label>
                <input
                  type="text"
                  value={referencia}
                  onChange={e => setReferencia(e.target.value)}
                  placeholder="ex: João 3:16-21"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--content-secondary)] mb-1.5 block">
                  Tema / Assunto
                </label>
                <input
                  type="text"
                  value={tema}
                  onChange={e => setTema(e.target.value)}
                  placeholder="ex: Amor incondicional"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
                />
              </div>
            </div>

            <button
              onClick={() => handleGerar()}
              disabled={!referencia || gerando}
              className={cn(
                'w-full py-3 rounded-xl font-semibold text-sm transition-all',
                referencia && !gerando
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]'
                  : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] cursor-not-allowed'
              )}
            >
              {gerando ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Gerando sermão...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Gerar Sermão
                </span>
              )}
            </button>

            {/* Sugestões rápidas */}
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wider text-[var(--content-muted)] font-semibold mb-2">Sugestões Rápidas</p>
              <div className="flex flex-wrap gap-2">
                {SUGESTOES.slice(0, 4).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setReferencia(s.referencia); setTema(s.tema); handleGerar(s.referencia, s.tema); }}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-default)] transition-colors border border-[var(--border)]/50"
                  >
                    {s.titulo}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Resultado */}
        {sermao && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header do sermão */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--content-primary)] mb-1">{sermao.titulo}</h2>
                  <p className="text-xs text-[var(--content-muted)]">Sermão gerado por IA</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleCopiar} className="p-2 rounded-lg bg-[var(--surface-sunken)] hover:bg-[var(--brand-subtle)] transition-colors" title="Copiar texto">
                    <Copy className="w-4 h-4 text-[var(--content-secondary)]" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-[10px]">
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--content-secondary)]">
                  <Clock className="w-3 h-3" />{sermao.tempoEstimado}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--content-secondary)]">
                  <Users className="w-3 h-3" />{sermao.publicoAlvo}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)]">
                  <Target className="w-3 h-3" />{sermao.temaCentral}
                </span>
              </div>
            </div>

            {/* Proposição */}
            <div className="glass-card p-5 rounded-2xl border-l-4 border-[var(--brand-default)]">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[var(--brand-default)]" />
                <h3 className="text-sm font-bold text-[var(--content-primary)]">Proposição</h3>
              </div>
              <p className="text-sm text-[var(--content-secondary)] font-serif italic">{sermao.proposicao}</p>
            </div>

            {/* Introdução */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
                <h3 className="text-sm font-bold text-[var(--content-primary)]">Introdução</h3>
              </div>
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed font-serif">{sermao.introducao}</p>
            </div>

            {/* Seções */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[var(--content-primary)] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--brand-default)]" />
                Desenvolvimento
              </h3>
              {sermao.secoes.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setSecaoAtiva(secaoAtiva === i ? null : i)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--surface-sunken)]/30 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-[var(--content-primary)] flex-1">{s.titulo}</span>
                    <ChevronRight className={cn('w-4 h-4 text-[var(--content-muted)] transition-transform', secaoAtiva === i && 'rotate-90')} />
                  </button>
                  {secaoAtiva === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      className="px-4 pb-4 overflow-hidden"
                    >
                      <p className="text-sm text-[var(--content-secondary)] leading-relaxed font-serif mb-2">{s.conteudo}</p>
                      {s.versiculos.length > 0 && (
                        <p className="text-[10px] text-[var(--content-muted)]">Ref: {s.versiculos.join(', ')}</p>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Ilustrações */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-[var(--content-primary)]">Ilustrações</h3>
              </div>
              <div className="space-y-2">
                {sermao.ilustracoes.map((il, i) => (
                  <div key={i} className="flex gap-2 text-sm text-[var(--content-secondary)]">
                    <span className="text-amber-500 shrink-0">•</span>
                    <p className="font-serif italic">{il}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Aplicações */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-green-500" />
                <h3 className="text-sm font-bold text-[var(--content-primary)]">Aplicações Práticas</h3>
              </div>
              <div className="space-y-2">
                {sermao.aplicacoes.map((ap, i) => (
                  <div key={i} className="flex gap-2 text-sm text-[var(--content-secondary)]">
                    <span className="text-green-500 font-bold shrink-0">{i + 1}.</span>
                    <p>{ap}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusão */}
            <div className="glass-card p-5 rounded-2xl border-r-4 border-[var(--brand-default)]">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[var(--brand-default)]" />
                <h3 className="text-sm font-bold text-[var(--content-primary)]">Conclusão</h3>
              </div>
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed font-serif">{sermao.conclusao}</p>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
