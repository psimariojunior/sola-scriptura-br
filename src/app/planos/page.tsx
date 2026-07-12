'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Target,
  Gift,
  Star,
} from 'lucide-react';
import Link from 'next/link';

interface PlanoLeitura {
  id: string;
  nome: string;
  duracao: string;
  descricao: string;
  beneficios: string[];
  comoComecar: string[];
  versiculosEncorajamento: Array<{ referencia: string; texto: string }>;
  cor: string;
  icone: React.ReactNode;
  dias: number;
}

const PLANOS: PlanoLeitura[] = [
  {
    id: 'biblia-1-ano',
    nome: 'Bíblia em 1 Ano',
    duracao: '365 dias',
    descricao: 'Leia a Bíblia completa em um ano, com 3 capítulos do Antigo Testamento e 1 capítulo do Novo Testamento por dia.',
    beneficios: [
      'Visão completa da narrativa bíblica',
      'Conhecimento profundo de todos os 66 livros',
      'Compreensão do plano redentor de Deus',
      'Base sólida para estudo e pregação',
      'Disciplina espiritual transformadora',
    ],
    comoComecar: [
      'Defina um horário fixo (manhã ou noite)',
      'Comece por Gênesis e Mateus',
      'Use um plano de leitura com passagens marcadas',
      'Não se preocupe em entender tudo — leia com fé',
      'Leia a passagem e faça uma oração de resposta',
    ],
    versiculosEncorajamento: [
      { referencia: 'Josué 1:8', texto: 'Não se apartará do teu livro esta lei, mas meditarás nela dia e noite.' },
      { referencia: 'Salmo 119:105', texto: 'Lâmpada para os meus pés é tua Palavra, e luz para o meu caminho.' },
      { referencia: '2 Timóteo 3:16', texto: 'Toda a Escritura é inspirada por Deus e útil.' },
    ],
    cor: 'from-blue-500 to-indigo-600',
    icone: <BookOpen className="w-6 h-6" />,
    dias: 365,
  },
  {
    id: 'nt-90-dias',
    nome: 'Novo Testamento em 90 Dias',
    duracao: '90 dias',
    descricao: 'Leia todo o Novo Testamento em 3 meses, cerca de 3 capítulos por dia.',
    beneficios: [
      'Aprofundamento na vida e ensinos de Jesus',
      'Compreensão da teologia paulina',
      'Conhecimento da história da igreja primitiva',
      'Estudo mais rápido dos Evangelhos e Epístolas',
      'Ideal para quem já leu a Bíblia várias vezes',
    ],
    comoComecar: [
      'Comece por Mateus e siga a ordem canônica',
      'Leia 3 capítulos por dia, em cerca de 20 minutos',
      'Tire anotações dos versículos que mais tocam seu coração',
      'Leia em voz alta para fixar melhor',
      'Compartilhe aprendizados com um grupo',
    ],
    versiculosEncorajamento: [
      { referencia: 'Romanos 15:4', texto: 'Porque tudo o que dantes foi escrito, para o nosso ensino foi escrito.' },
      { referencia: 'Hebreus 4:12', texto: 'Porque a Palavra de Deus é viva e eficaz.' },
      { referencia: 'João 20:31', texto: 'Estas coisas foram escritas para que creiais.' },
    ],
    cor: 'from-emerald-500 to-teal-600',
    icone: <Heart className="w-6 h-6" />,
    dias: 90,
  },
  {
    id: 'salmos-30-dias',
    nome: 'Salmos em 30 Dias',
    duracao: '30 dias',
    descricao: 'Leia os 150 Salmos em 30 dias, com 5 salmos por dia — o hinário de Israel.',
    beneficios: [
      'Aprenda a orar com o Salter',
      'Expresse toda emoção a Deus',
      'Memorize versículos poderosos',
      'Desenvolva vida de louvor e adoração',
      'Encontre conforto em tempos difíceis',
    ],
    comoComecar: [
      'Leia 5 salmos por dia, seguindo a numeração',
      'Reze cada salmo como sua oração pessoal',
      'Destaque versículos para memorização',
      'Use salmos como base para louvor',
      'Comece com o Salmo 1 e termine com o Salmo 150',
    ],
    versiculosEncorajamento: [
      { referencia: 'Salmo 1:2', texto: 'Mas o seu deleite está na lei do SENHOR.' },
      { referencia: 'Salmo 119:11', texto: 'No meu coração guardei a tua palavra.' },
      { referencia: 'Salmo 150:6', texto: 'Tudo o que tem fôlego louve ao SENHOR.' },
    ],
    cor: 'from-purple-500 to-violet-600',
    icone: <Sparkles className="w-6 h-6" />,
    dias: 30,
  },
  {
    id: 'proverbios-31-dias',
    nome: 'Provérbios em 31 Dias',
    duracao: '31 dias',
    descricao: 'Leia um provérbio por dia durante um mês — sabedoria prática para cada dia.',
    beneficios: [
      'Sabedoria aplicável ao dia a dia',
      'Disciplina no uso da língua',
      'Princípios para decisões sábias',
      'Crescimento em temperança e justiça',
      'Família mais unida e próspera',
    ],
    comoComecar: [
      'Leia o provérbio correspondente ao dia do mês',
      'Leia devagar, meditando em cada versículo',
      'Anote os provérbios que mais se aplicam à sua vida',
      'Compartilhe com sua família no café da manhã',
      'Reze pedindo sabedoria para aplicar o aprendido',
    ],
    versiculosEncorajamento: [
      { referencia: 'Provérbios 1:7', texto: 'O temor do SENHOR é o princípio do conhecimento.' },
      { referencia: 'Provérbios 3:5-6', texto: 'Confia no SENHOR de todo o teu coração.' },
      { referencia: 'Provérbios 4:23', texto: 'Guarda o teu coração, porque dele procedem as fontes da vida.' },
    ],
    cor: 'from-amber-500 to-orange-600',
    icone: <Star className="w-6 h-6" />,
    dias: 31,
  },
  {
    id: 'evangelhos-40-dias',
    nome: 'Evangelhos em 40 Dias',
    duracao: '40 dias',
    descricao: 'Leia Mateus, Marcos, Lucas e João em 40 dias — conheça Jesus em primeira mão.',
    beneficios: [
      'Conhecimento íntimo de Jesus',
      'Comparação dos quatro Evangelhos',
      'Compreensão dos ensinos e milagres',
      'Base para evangelismo e discipulado',
      'Transformação pelo encontro com Cristo',
    ],
    comoComecar: [
      'Comece por Mateus, depois Marcos, Lucas e João',
      'Leia 1-2 capítulos por dia',
      'Preste atenção nos detalhes de cada narrativa',
      'Anote as palavras e milagres de Jesus',
      'Reze pedindo revelação do coração de Cristo',
    ],
    versiculosEncorajamento: [
      { referencia: 'João 20:31', texto: 'Mas estas foram escritas para que creiais.' },
      { referencia: 'Mateus 11:28', texto: 'Vinde a mim, todos os que estais cansados.' },
      { referencia: 'Lucas 24:27', texto: 'Começando por Moisés, explicou-lhes todas as Escrituras.' },
    ],
    cor: 'from-rose-500 to-pink-600',
    icone: <Target className="w-6 h-6" />,
    dias: 40,
  },
  {
    id: 'oracao-21-dias',
    nome: '21 Dias de Oração',
    duracao: '21 dias',
    descricao: 'Desafio de oração guiada com passagens, reflexões e prompts diários.',
    beneficios: [
      'Vida de oração renovada',
      'Aprendizado de diferentes formas de orar',
      'Intimidade com Deus',
      'Fé fortalecida',
      'Mudança de hábitos espirituais',
    ],
    comoComecar: [
      'Reserve 15-30 minutos por dia para orar',
      'Leia a passagem do dia antes de orar',
      'Use o modelo de oração como guia',
      'Mantenha um diário de oração',
      'Compartilhe com um parceiro de oração',
    ],
    versiculosEncorajamento: [
      { referencia: 'Filipenses 4:6', texto: 'Em tudo, pela oração e súplica, apresentai os vossos pedidos a Deus.' },
      { referencia: '1 Tessalonicenses 5:17', texto: 'Orai sem cessar.' },
      { referencia: 'Tiago 5:16', texto: 'A oração fervorosa do justo pode muito.' },
    ],
    cor: 'from-cyan-500 to-blue-600',
    icone: <Gift className="w-6 h-6" />,
    dias: 21,
  },
];

export default function PlanosPage() {
  const [planoAberto, setPlanoAberto] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Planos de Leitura</h1>
              </div>
              <p className="text-muted-foreground ml-13">Disciplina bíblica transformadora para todas as estações da vida</p>
            </div>
          </ScrollReveal>

          <div className="grid gap-5">
            {PLANOS.map((plano, idx) => (
              <ScrollReveal key={plano.id} delay={idx * 0.05}>
                <motion.div
                  layout
                  className="sola-card overflow-hidden"
                >
                  {/* Header do plano */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setPlanoAberto(planoAberto === plano.id ? null : plano.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plano.cor} flex items-center justify-center text-white flex-shrink-0`}>
                          {plano.icone}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-display text-xl md:text-2xl font-medium mb-1">{plano.nome}</h2>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {plano.duracao}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">{plano.descricao}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: planoAberto === plano.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Conteúdo expandido */}
                  <AnimatePresence>
                    {planoAberto === plano.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-6 border-t border-border/50 pt-6">
                          {/* Benefícios */}
                          <div>
                            <h3 className="font-display text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">Benefícios</h3>
                            <div className="grid md:grid-cols-2 gap-2">
                              {plano.beneficios.map((b, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{b}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Como começar */}
                          <div>
                            <h3 className="font-display text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">Como Começar</h3>
                            <ol className="space-y-2">
                              {plano.comoComecar.map((passo, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span>{passo}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Versículos */}
                          <div>
                            <h3 className="font-display text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">Versículos de Encorajamento</h3>
                            <div className="space-y-3">
                              {plano.versiculosEncorajamento.map((v, i) => (
                                <div key={i} className="p-3 rounded-lg bg-muted/50 text-sm">
                                  <p className="font-medium text-primary mb-1">{v.referencia}</p>
                                  <p className="italic text-muted-foreground">"{v.texto}"</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Link para a Bíblia */}
                          <div className="pt-2">
                            <Link
                              href="/biblia"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                            >
                              Começar agora
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dica */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10">
              <h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Dica de Estudo
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A consistência é mais importante que a intensidade. Melhor ler 10 minutos todos os dias do que 2 horas uma vez por semana.
                Comece devagar, mantenha o hábito, e Deus usará a Sua Palavra para transformar a sua vida.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
