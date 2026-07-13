'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, ArrowLeft, Check, X, RotateCcw, ChevronRight, Search } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { obterPerguntasPorLivro, LIVROS_BIBLIA, CATEGORIAS_QUIZ, NIVEIS_QUIZ, type NivelQuiz, type PerguntaQuiz } from '@/data/quiz';

export default function QuizLivroPage() {
  const [tela, setTela] = useState<'inicio' | 'jogo' | 'resultado'>('inicio');
  const [livroSel, setLivroSel] = useState<string | null>(null);
  const [nivel, setNivel] = useState<NivelQuiz>('facil');
  const [busca, setBusca] = useState('');
  const [perguntas, setPerguntas] = useState<PerguntaQuiz[]>([]);
  const [idxAtual, setIdxAtual] = useState(0);
  const [respostaSel, setRespostaSel] = useState<number | null>(null);
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [acertosCount, setAcertosCount] = useState(0);
  const [mostrarExp, setMostrarExp] = useState(false);

  const perguntaAtual = perguntas[idxAtual];

  const livrosFiltrados = LIVROS_BIBLIA.filter((l) =>
    l.toLowerCase().includes(busca.toLowerCase())
  );

  const iniciarQuiz = useCallback(() => {
    if (!livroSel) return;
    const perg = obterPerguntasPorLivro(livroSel, nivel);
    if (perg.length === 0) return;
    setPerguntas(perg);
    setIdxAtual(0);
    setPontuacao(0);
    setAcertosCount(0);
    setRespostaSel(null);
    setAcertou(null);
    setMostrarExp(false);
    setTela('jogo');
  }, [livroSel, nivel]);

  const selecionarResposta = (idx: number) => {
    if (respostaSel !== null || acertou !== null) return;
    setRespostaSel(idx);
    const correto = idx === perguntaAtual.respostaCorreta;
    setAcertou(correto);
    setMostrarExp(true);
    if (correto) {
      const pts = nivel === 'facil' ? 10 : nivel === 'medio' ? 20 : 30;
      setPontuacao((p) => p + pts);
      setAcertosCount((c) => c + 1);
    }
  };

  const proximaPergunta = () => {
    if (idxAtual + 1 >= perguntas.length) {
      setTela('resultado');
    } else {
      setIdxAtual((p) => p + 1);
      setRespostaSel(null);
      setAcertou(null);
      setMostrarExp(false);
    }
  };

  if (tela === 'inicio') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <Link href="/quiz" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </Link>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-light">Estudo por Livro</h1>
                  <p className="text-sm text-muted-foreground">Escolha um livro e teste seus conhecimentos</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Buscar Livro</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Ex: João, Romanos, Salmos..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Livros ({livrosFiltrados.length})</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {livrosFiltrados.map((livro) => (
                    <motion.button
                      key={livro}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLivroSel(livro)}
                      className={`p-2.5 rounded-xl border-2 transition-all text-left text-sm ${livroSel === livro ? 'border-emerald-500 bg-emerald-500/5 font-medium' : 'border-border/30 hover:border-border'}`}
                    >
                      {livro}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Nível</label>
                <div className="grid grid-cols-3 gap-3">
                  {(Object.entries(NIVEIS_QUIZ) as [NivelQuiz, { label: string; cor: string }][]).map(([key, val]) => (
                    <motion.button key={key} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setNivel(key)} className={`p-3 rounded-xl border-2 transition-all text-center ${nivel === key ? 'border-emerald-500 bg-emerald-500/5' : 'border-border/30 hover:border-border'}`}>
                      <p className="font-medium text-sm">{val.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={iniciarQuiz}
                disabled={!livroSel}
                className={`w-full py-4 rounded-2xl font-display text-lg font-medium transition-all flex items-center justify-center gap-2 ${livroSel ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
              >
                {livroSel ? `Estudar ${livroSel}` : 'Selecione um livro'} <ChevronRight className="w-5 h-5" />
              </motion.button>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (tela === 'resultado') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <h1 className="font-display text-3xl font-light mb-2">Estudo Completo!</h1>
                <p className="text-muted-foreground">{livroSel} — {perguntas.length} perguntas</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center">
                  <p className="font-display text-4xl font-light text-emerald-500">{pontuacao}</p>
                  <p className="text-xs text-muted-foreground mt-1">Pontos</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center">
                  <p className="font-display text-4xl font-light text-green-500">{acertosCount}/{perguntas.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Acertos</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center">
                  <p className="font-display text-4xl font-light text-amber-500">{perguntas.length > 0 ? Math.round((acertosCount / perguntas.length) * 100) : 0}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Aproveitamento</p>
                </motion.div>
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={iniciarQuiz} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Estudar Novamente
                </motion.button>
                <Link href="/quiz" className="flex-1">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 border border-border rounded-xl font-medium hover:bg-muted/50 transition-all">
                    Menu
                  </motion.button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!perguntaAtual) return null;
  const progresso = ((idxAtual + 1) / perguntas.length) * 100;
  const opcoesFiltradas = perguntaAtual.tipo === 'verdadeiro_falso'
    ? [perguntaAtual.opcoes[0], perguntaAtual.opcoes[1]]
    : perguntaAtual.opcoes;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">{livroSel} — {idxAtual + 1}/{perguntas.length}</span>
            </div>
            <span className="text-sm font-semibold text-emerald-500">{pontuacao} pts</span>
          </div>
          <div className="h-1.5 bg-border/30 rounded-full overflow-hidden mb-8">
            <motion.div className="h-full bg-emerald-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${progresso}%` }} transition={{ duration: 0.3 }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={idxAtual} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${CATEGORIAS_QUIZ[perguntaAtual.categoria]?.cor}`}>{CATEGORIAS_QUIZ[perguntaAtual.categoria]?.icon} {CATEGORIAS_QUIZ[perguntaAtual.categoria]?.label}</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${NIVEIS_QUIZ[perguntaAtual.nivel]?.cor}`}>{NIVEIS_QUIZ[perguntaAtual.nivel]?.label}</span>
                </div>
                <h2 className="font-display text-xl font-medium leading-relaxed">{perguntaAtual.enunciado}</h2>
                {perguntaAtual.referencia && <p className="text-xs text-emerald-500 mt-2">📖 {perguntaAtual.referencia}</p>}
              </div>
              <div className="space-y-3">
                {opcoesFiltradas.map((opcao, i) => {
                  if (!opcao) return null;
                  const selecionado = respostaSel === i;
                  const correto = i === perguntaAtual.respostaCorreta;
                  let estilo = 'border-border/30 hover:border-emerald-500/50 hover:bg-muted/30';
                  if (mostrarExp && correto) estilo = 'border-green-500/50 bg-green-500/10';
                  else if (mostrarExp && selecionado && !correto) estilo = 'border-red-500/50 bg-red-500/10';
                  return (
                    <motion.button key={i} whileHover={!mostrarExp ? { scale: 1.01 } : {}} whileTap={!mostrarExp ? { scale: 0.99 } : {}} onClick={() => selecionarResposta(i)} disabled={mostrarExp} className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${estilo}`}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${mostrarExp && correto ? 'bg-green-500 text-white' : mostrarExp && selecionado ? 'bg-red-500 text-white' : 'bg-muted/50 text-muted-foreground'}`}>
                        {mostrarExp && correto ? <Check className="w-4 h-4" /> : mostrarExp && selecionado ? <X className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm font-medium">{opcao}</span>
                    </motion.button>
                  );
                })}
              </div>
              {mostrarExp && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-sm leading-relaxed text-muted-foreground">{perguntaAtual.explicacao}</p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={proximaPergunta} className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                    {idxAtual + 1 >= perguntas.length ? 'Ver Resultado' : 'Próxima Pergunta'} <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
