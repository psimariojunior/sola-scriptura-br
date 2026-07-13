'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { QuizCard } from '@/components/QuizCard';
import { QuizProgress } from '@/components/QuizProgress';
import { QuizResults } from '@/components/QuizResults';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { obterPerguntasPorLivro, LIVROS_BIBLIA, NIVEIS_QUIZ, type NivelQuiz, type PerguntaQuiz } from '@/data/quiz';

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
  const [respostas, setRespostas] = useState<(number | null)[]>([]);

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
    setRespostas([]);
    setRespostaSel(null);
    setAcertou(null);
    setMostrarExp(false);
    setTela('jogo');
  }, [livroSel, nivel]);

  const selecionarResposta = (idx: number) => {
    if (respostaSel !== null || acertou !== null) return;
    setRespostaSel(idx);
    setRespostas((prev) => [...prev, idx]);
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
          <QuizResults
            pontuacao={pontuacao}
            acertos={acertosCount}
            totalPerguntas={perguntas.length}
            nivel={nivel}
            perguntas={perguntas}
            respostas={respostas}
            onJogarNovamente={iniciarQuiz}
            onVoltarMenu={() => setTela('inicio')}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (!perguntaAtual) return null;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <QuizProgress
            perguntaAtual={idxAtual}
            totalPerguntas={perguntas.length}
            pontuacao={pontuacao}
            acertos={acertosCount}
            nivel={nivel}
            modo="livro"
          />
          <div className="mt-4">
            <QuizCard
              pergunta={perguntaAtual}
              respostaSel={respostaSel}
              mostrarExplicacao={mostrarExp}
              onSelecionarResposta={selecionarResposta}
              onProxima={proximaPergunta}
              isUltima={idxAtual + 1 >= perguntas.length}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
