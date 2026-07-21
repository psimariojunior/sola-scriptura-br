'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Quote,
  Target,
  HelpCircle,
  Lightbulb,
  User,
  Calendar,
  Tag,
  Layers,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { estudosPorLivro, type EstudoLivro } from '@/data/estudosPorLivro';
import { livroPorAbreviacao } from '@/data/biblia/livros';

export default function EstudoLivroPage() {
  const params = useParams();
  const slug = params.livro as string;
  const estudo = estudosPorLivro[slug];
  const infoLivro = livroPorAbreviacao.get(slug);

  if (!estudo || !infoLivro) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h1 className="font-display text-2xl mb-2">Estudo não encontrado</h1>
            <p className="text-muted-foreground mb-6">O estudo para este livro ainda não está disponível.</p>
            <Link
              href="/estudos"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Estudos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/estudos" className="hover:text-primary transition-colors">
                Estudos
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">{estudo.titulo}</span>
            </div>
          </ScrollReveal>

          {/* Header do Livro */}
          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">{estudo.titulo}</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {estudo.autor}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {estudo.data}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {estudo.genero}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {infoLivro.testamento}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Introdução / Contexto */}
          <ScrollReveal delay={0.1}>
            <section className="mb-8">
              <h2 className="font-display text-xl font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Contexto
              </h2>
              <div className="sola-card p-5">
                <p className="text-muted-foreground leading-relaxed">{estudo.contexto}</p>
              </div>
            </section>
          </ScrollReveal>

          {/* Estrutura do Livro */}
          <ScrollReveal delay={0.15}>
            <section className="mb-8">
              <h2 className="font-display text-xl font-medium mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Estrutura
              </h2>
              <div className="sola-card p-5">
                <div className="space-y-2">
                  {infoLivro.totalCapitulos > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Total de capítulos:</span>
                      <span className="font-medium">{infoLivro.totalCapitulos}</span>
                    </div>
                  )}
                  {estudo.temasPrincipais.map((tema, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{tema}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Temas Principais */}
          <ScrollReveal delay={0.2}>
            <section className="mb-8">
              <h2 className="font-display text-xl font-medium mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Temas Principais
              </h2>
              <div className="flex flex-wrap gap-2">
                {estudo.temasPrincipais.map((tema, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                  >
                    {tema}
                  </span>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* Versículos-Chave */}
          <ScrollReveal delay={0.25}>
            <section className="mb-8">
              <h2 className="font-display text-xl font-medium mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Versículos-Chave
              </h2>
              <div className="space-y-3">
                {estudo.versiculosChave.map((v, i) => (
                  <VersiculoChaveCard key={i} versiculo={v} index={i} />
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* Aplicação Prática */}
          <ScrollReveal delay={0.3}>
            <section className="mb-8">
              <h2 className="font-display text-xl font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Aplicação Prática
              </h2>
              <div className="sola-card p-5 border-l-4 border-primary">
                <p className="text-muted-foreground leading-relaxed">{estudo.aplicacaoPratica}</p>
              </div>
            </section>
          </ScrollReveal>

          {/* Perguntas de Estudo */}
          <ScrollReveal delay={0.35}>
            <section className="mb-8">
              <h2 className="font-display text-xl font-medium mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Perguntas de Estudo
              </h2>
              <div className="sola-card p-5">
                <ol className="space-y-4">
                  {estudo.perguntasEstudo.map((pergunta, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed pt-1">{pergunta}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </ScrollReveal>

          {/* Navegação */}
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <Link
                href="/estudos"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Todos os Estudos
              </Link>
              <Link
                href={`/biblia`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Ir para a Bíblia
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function VersiculoChaveCard({ versiculo, index }: { versiculo: { referencia: string; texto: string; explicacao: string }; index: number }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <motion.div layout className="sola-card overflow-hidden">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-medium text-primary mb-1">{versiculo.referencia}</p>
            <p className="text-sm italic leading-relaxed">&ldquo;{versiculo.texto}&rdquo;</p>
          </div>
          <motion.div
            animate={{ rotate: expandido ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{versiculo.explicacao}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
