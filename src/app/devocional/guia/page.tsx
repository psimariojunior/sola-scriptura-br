'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Heart, PenLine, Clock, Calendar, CheckCircle2,
  ChevronDown, ChevronUp, Lightbulb, Bookmark, Target,
  Sparkles, Quote, Star, ListOrdered
} from 'lucide-react';

type Secao = 'oquee' | 'estrutura' | 'planos' | 'meditacao' | 'diario' | 'dicas';

interface SecaoInfo {
  id: Secao;
  titulo: string;
  icone: React.ReactNode;
  cor: string;
}

const SECOES: SecaoInfo[] = [
  { id: 'oquee', titulo: 'O que é Devocional', icone: <BookOpen className="w-4 h-4" />, cor: 'from-blue-500/20 to-indigo-500/20' },
  { id: 'estrutura', titulo: 'Estrutura', icone: <ListOrdered className="w-4 h-4" />, cor: 'from-emerald-500/20 to-teal-500/20' },
  { id: 'planos', titulo: 'Planos de Leitura', icone: <Calendar className="w-4 h-4" />, cor: 'from-violet-500/20 to-purple-500/20' },
  { id: 'meditacao', titulo: 'Meditação', icone: <Heart className="w-4 h-4" />, cor: 'from-amber-500/20 to-orange-500/20' },
  { id: 'diario', titulo: 'Diário Devocional', icone: <PenLine className="w-4 h-4" />, cor: 'from-rose-500/20 to-pink-500/20' },
  { id: 'dicas', titulo: 'Dicas Práticas', icone: <Lightbulb className="w-4 h-4" />, cor: 'from-cyan-500/20 to-sky-500/20' },
];

const PLANOS_LEITURA = [
  {
    nome: 'Plano de 30 Dias com os Salmos',
    duracao: '30 dias',
    nivel: 'Iniciante',
    descricao: 'Um salmo por dia, começando pelos mais conhecidos e caminhando até os mais profundos.',
    dias: [
      { dia: 1, referencia: 'Salmo 1', tema: 'O caminho dos justos' },
      { dia: 2, referencia: 'Salmo 23', tema: 'O Senhor é o meu pastor' },
      { dia: 3, referencia: 'Salmo 46', tema: 'Deus é o nosso refúgio' },
      { dia: 4, referencia: 'Salmo 51', tema: 'Oração de arrependimento' },
      { dia: 5, referencia: 'Salmo 91', tema: 'Proteção divina' },
      { dia: 6, referencia: 'Salmo 103', tema: 'Benefícios de Deus' },
      { dia: 7, referencia: 'Salmo 119:1-88', tema: 'Amor pela Palavra (parte 1)' },
      { dia: 8, referencia: 'Salmo 119:89-176', tema: 'Amor pela Palavra (parte 2)' },
      { dia: 9, referencia: 'Salmo 121', tema: 'Onde está o meu amparo?' },
      { dia: 10, referencia: 'Salmo 139', tema: 'Deus me conhece profundamente' },
      { dia: 11, referencia: 'Salmo 27', tema: 'O Senhor é a minha luz' },
      { dia: 12, referencia: 'Salmo 34', tema: 'Provei ao Senhor' },
      { dia: 13, referencia: 'Salmo 37', tema: 'Não te indignes' },
      { dia: 14, referencia: 'Salmo 42', tema: 'Como anseia a corça' },
      { dia: 15, referencia: 'Salmo 55', tema: 'Lança sobre ele o teu cuidado' },
      { dia: 16, referencia: 'Salmo 62', tema: 'Só em Deus a minha alma descansa' },
      { dia: 17, referencia: 'Salmo 73', tema: 'Deus é a minha porção' },
      { dia: 18, referencia: 'Salmo 84', tema: 'Como são amáveis as tuas moradas' },
      { dia: 19, referencia: 'Salmo 86', tema: 'Ensina-me o teu caminho' },
      { dia: 20, referencia: 'Salmo 90', tema: 'Senhor, tu és o nosso refúgio' },
      { dia: 21, referencia: 'Salmo 95', tema: 'Cantemos ao Senhor' },
      { dia: 22, referencia: 'Salmo 100', tema: 'Um cántico de alegria' },
      { dia: 23, referencia: 'Salmo 107', tema: 'Graças ao Senhor' },
      { dia: 24, referencia: 'Salmo 110', tema: 'O Messias sacerdote-rei' },
      { dia: 25, referencia: 'Salmo 116', tema: 'O que darei ao Senhor?' },
      { dia: 26, referencia: 'Salmo 130', tema: 'Do profundo clamo a Ti' },
      { dia: 27, referencia: 'Salmo 136', tema: 'A graça dura para sempre' },
      { dia: 28, referencia: 'Salmo 138', tema: 'Obrigado pelo Teu amor' },
      { dia: 29, referencia: 'Salmo 143', tema: 'Guia-me na Tua verdade' },
      { dia: 30, referencia: 'Salmo 150', tema: 'Tudo o que tem fôlego louve ao Senhor!' },
    ],
  },
  {
    nome: 'Plano dos Evangelhos em 90 Dias',
    duracao: '90 dias',
    nivel: 'Intermediário',
    descricao: 'Um capítulo por dia, começando por Marcos (mais curto), depois Mateus, Lucas e João.',
    dias: [
      { dia: 1, referencia: 'Marcos 1', tema: 'Início do ministério de Jesus' },
      { dia: 2, referencia: 'Marcos 2', tema: 'Jesus cura e ensina' },
      { dia: 3, referencia: 'Marcos 3', tema: 'Multiplicação dos seguidores' },
      { dia: 4, referencia: 'Marcos 4', tema: 'Parábolas do Reino' },
      { dia: 5, referencia: 'Marcos 5', tema: 'Libertação dos demônios' },
    ],
  },
  {
    nome: 'Plano de Provérbios em 31 Dias',
    duracao: '31 dias',
    nivel: 'Iniciante',
    descricao: 'Um provérbio por dia (correspondente ao dia do mês). Sabedoria prática para cada área da vida.',
    dias: [
      { dia: 1, referencia: 'Provérbios 1', tema: 'O início da sabedoria' },
      { dia: 2, referencia: 'Provérbios 2', tema: 'Busca pela sabedoria' },
      { dia: 3, referencia: 'Provérbios 3', tema: 'Confia no Senhor' },
      { dia: 4, referencia: 'Provérbios 4', tema: 'Guarde o coração' },
      { dia: 5, referencia: 'Provérbios 5', tema: 'Fuza da imoralidade' },
    ],
  },
];

const DICAS_MEDITACAO = [
  {
    titulo: 'Leia Devagar (Lectio)',
    descricao: 'Leia o texto uma vez lentamente. Depois leia novamente, mais devagar. Na terceira vez, leia em voz baixa, saboreando cada palavra. A pressa é inimiga da meditação. Respire fundo entre os versículos.',
    versiculo: 'Sl 1:2',
  },
  {
    titulo: 'Meditação Profunda (Meditatio)',
    descricao: 'Pense sobre o texto. O que as palavras significam no contexto? O que o autor queria dizer? Que verdades teológicas estão aqui? Faça perguntas: Por que essa palavra foi usada? O que isso revela sobre Deus? Sobre mim?',
    versiculo: 'Sl 1:2',
  },
  {
    titulo: 'Reza o Texto (Oratio)',
    descricao: 'Transforme suas descobertas em oração. Se o texto fala de amor, ore pedindo amor. Se fala de coragem, ore pedindo coragem. Use as próprias palavras da Escritura como oração — isso é poderoso.',
    versiculo: 'Sl 1:2',
  },
  {
    titulo: 'Contemple e Descanse (Contemplatio)',
    descricao: 'Após a oração, fique em silêncio. Deixe as verdades do texto afundarem no coração. Não tente fazer nada — apenas esteja na presença de Deus. A meditação não é apenas intelectual, é experiencial.',
    versiculo: 'Sl 1:2',
  },
  {
    titulo: 'Leve para o Dia (Missio)',
    descricao: 'Escolha um versículo ou ideia para carregar ao longo do dia. Repita mentalmente em momentos de espera. Compartilhe com alguém. A meditação não termina quando você fecha a Bíblia — ela continua no trânsito, no trabalho, nas conversas.',
    versiculo: 'Sl 1:2',
  },
];

const MODELO_DIARIO = [
  { campo: 'Data', descricao: 'Dia, mês e ano do devocional' },
  { campo: 'Texto Bíblico', descricao: 'Referência exata: livro, capítulo e versículos' },
  { campo: 'Oração Inicial', descricao: 'Uma breve oração pedindo iluminação ao Espírito Santo' },
  { campo: 'Leitura do Texto', descricao: 'Transcreva ou copie o versículo-chave do dia' },
  { campo: 'Observação', descricao: 'O que chamou sua atenção? Palavras-chave, repetições, ações' },
  { campo: 'Interpretação', descricao: 'O que o texto significa? Qual é a verdade teológica?' },
  { campo: 'Aplicação', descricao: 'Como isso se aplica à minha vida hoje? O que devo fazer?' },
  { campo: 'Versículo Memória', descricao: 'Um versículo para memorizar e meditar durante o dia' },
  { campo: 'Oração Final', descricao: 'Uma oração de resposta ao que Deus revelou' },
  { campo: 'Anotações Extras', descricao: 'Conexões com outros textos, perguntas pendentes, insights' },
];

export default function DevocionalGuiaPage() {
  const [secaoAtiva, setSecaoAtiva] = useState<Secao>('oquee');
  const [planoExpandido, setPlanoExpandido] = useState<number | null>(null);
  const [diarioPreenchido, setDiarioPreenchido] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5"
              >
                <Heart className="w-8 h-8 text-[var(--primary)]" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)] mb-3">
                Guia Completo de Devocional
              </h1>
              <p className="text-[var(--fg)] text-lg max-w-2xl mx-auto">
                Como cultivar um hábito diário de comunhão com Deus através da Palavra e da oração
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.1}>
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
              {SECOES.map((secao) => (
                <button
                  key={secao.id}
                  onClick={() => setSecaoAtiva(secao.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    secaoAtiva === secao.id
                      ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25'
                      : 'bg-[var(--card-bg)] text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--bg)]'
                  }`}
                >
                  {secao.icone}
                  {secao.titulo}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* O que é Devocional */}
          {secaoAtiva === 'oquee' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-4">O que é um Devocional?</h2>
                <div className="space-y-4 text-[var(--fg)] leading-relaxed">
                  <p>
                    Um devocional é um momento reservado no dia para se conectar com Deus. Não é uma obrigação religiosa — é um encontro pessoal com o Criador do universo que escolheu falar conigo através da Sua Palavra.
                  </p>
                  <p>
                    A palavra &ldquo;devocional&rdquo; vem de <em>devotio</em> em latim, que significa consagração, dedicação. Quando você faz um devocional, está dizendo a Deus: &ldquo;Este tempo é Teu. Estou aqui para ouvir, aprender e responder.&rdquo;
                  </p>
                  <p>
                    O devocional não substitui o estudo bíblico profundo — ele o complementa. Enquanto o estudo busca knowledge, o devocional busca communion. Enquanto o estudo usa o cérebro, o devocional usa o coração. Os dois são necessários para uma vida cristã equilibrada.
                  </p>

                  <div className="bg-[var(--bg)] rounded-xl p-6 my-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      Por que o devocional é importante?
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { titulo: 'Alimenta a fé', texto: 'Assim como o corpo precisa de alimento, a fé precisa da Palavra de Deus para crescer (Rm 10:17).' },
                        { titulo: 'Fortalece a oração', texto: 'Quando você lê a Bíblia, Deus fala com você. A oração é a sua resposta. O devocional equilibra o diálogo.' },
                        { titulo: 'Produz frutos', texto: 'A meditação na Palavra transforma o caráter. Você se torna mais paciente, mais amoroso, mais sábio.' },
                        { titulo: 'Protege do pecado', texto: 'Sl 119:11 — "Guardo a Tua Palavra no coração, para que não peque contra Ti."' },
                        { titulo: 'Direciona decisões', texto: 'A Palavra é lâmpada para os pés (Sl 119:105). O devocional traz clareza para escolhas difíceis.' },
                        { titulo: 'Mantém comunhão', texto: 'Assim como qualquer relacionamento precisa de tempo juntos, o devocional mantém a intimidade com Deus.' },
                      ].map((item) => (
                        <div key={item.titulo} className="bg-[var(--card-bg)] rounded-lg p-4">
                          <p className="font-semibold text-[var(--primary)] text-sm mb-1">{item.titulo}</p>
                          <p className="text-sm text-[var(--muted-fg)]">{item.texto}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent rounded-xl p-6 border border-[var(--primary)]/10">
                    <h3 className="font-semibold text-[var(--fg)] mb-2 flex items-center gap-2">
                      <Quote className="w-5 h-5 text-[var(--primary)]" />
                      Versículo Base
                    </h3>
                    <p className="text-sm text-[var(--fg)] italic font-serif-body">
                      &ldquo;Mas ele é como uma árvore plantada junto a correntes de águas, que dá o seu fruto no seu devido tempo, e cujas folhas não murcham; e tudo o que faz prospera.&rdquo;
                    </p>
                    <p className="text-xs text-[var(--primary)] mt-2 font-semibold">Salmo 1:3</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Estrutura */}
          {secaoAtiva === 'estrutura' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-4">A Estrutura do Devocional</h2>
                <p className="text-[var(--fg)] mb-6">
                  Um devocional equilibrado tem quatro pilares: Oração, Leitura, Meditação e Aplicação. Cada um alimenta o outro, e juntos formam um encontro completo com Deus.
                </p>

                <div className="space-y-4">
                  {/* Oração */}
                  <div className="bg-[var(--bg)] rounded-xl p-6 border-l-4 border-blue-400">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <span className="text-xl">🙏</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--fg)]">1. Oração — Abrir o Encontro</h3>
                        <p className="text-xs text-[var(--muted-fg)]">5 minutos</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--fg)] leading-relaxed mb-3">
                      Comece pela oração. Peça ao Espírito Santo que ilumine as Escrituras. Uma oração curta e sincera é suficiente. Reconheça a presença de Deus, confesse pecados, agradeça pela oportunidade de estudar.
                    </p>
                    <div className="bg-[var(--card-bg)] rounded-lg p-4">
                      <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">Modelo de Oração Inicial</p>
                      <p className="text-sm text-[var(--fg)] italic font-serif-body">
                        &ldquo;Senhor, obrigado por este novo dia. Abre os meus olhos para ver as maravilhas da Tua Lei. Ilumina a minha mente pelo Teu Espírito. Que eu não apenas leia, mas ouça a Tua voz. Amém.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Leitura */}
                  <div className="bg-[var(--bg)] rounded-xl p-6 border-l-4 border-emerald-400">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--fg)]">2. Leitura — Ouvir Deus Falar</h3>
                        <p className="text-xs text-[var(--muted-fg)]">10 minutos</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--fg)] leading-relaxed mb-3">
                      Leia o texto do dia com atenção. Não se apresse. Leia pelo menos duas vezes — uma para吸收, outra para observar detalhes. Use uma tradução que você entenda. Considere ler em voz alta.
                    </p>
                    <div className="bg-[var(--card-bg)] rounded-lg p-4">
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Dica de Leitura</p>
                      <p className="text-sm text-[var(--fg)]">
                        Para iniciantes, comece pelo Evangelho de João — ele foi escrito para que você cré (Jo 20:31). Leia um capítulo por dia. São 21 capítulos — em 3 semanas você terá lido a vida inteira de Jesus.
                      </p>
                    </div>
                  </div>

                  {/* Meditação */}
                  <div className="bg-[var(--bg)] rounded-xl p-6 border-l-4 border-amber-400">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--fg)]">3. Meditação — Deixar Afundar</h3>
                        <p className="text-xs text-[var(--muted-fg)]">5 minutos</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--fg)] leading-relaxed mb-3">
                      A meditação bíblica não é esvaziar a mente — é enchê-la com a Palavra. Repita o versículo-chave. Pense em como ele se conecta com sua vida. Ruminare — volte ao texto ao longo do dia.
                    </p>
                    <div className="bg-[var(--card-bg)] rounded-lg p-4">
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Versículo para Meditar</p>
                      <p className="text-sm text-[var(--fg)] italic font-serif-body">
                        &ldquo;Mas deleita-te no Senhor, e ele te concederá os desejos do teu coração.&rdquo;
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-semibold">Salmo 37:4</p>
                    </div>
                  </div>

                  {/* Aplicação */}
                  <div className="bg-[var(--bg)] rounded-xl p-6 border-l-4 border-rose-400">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--fg)]">4. Aplicação — Agir em Resposta</h3>
                        <p className="text-xs text-[var(--muted-fg)]">5 minutos</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--fg)] leading-relaxed mb-3">
                      A Palavra sem aplicação é informação, não transformação. Pergunte: O que devo crer? O que devo fazer? Com quem devo compartilhar? Escreva um passo concreto para hoje. Uma oração de compromisso fecha o encontro.
                    </p>
                    <div className="bg-[var(--card-bg)] rounded-lg p-4">
                      <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">Perguntas para Aplicação</p>
                      <ul className="space-y-1 text-sm text-[var(--fg)]">
                        <li>• Que verdade devo crer hoje?</li>
                        <li>• Que atitude devo mudar?</li>
                        <li>• Com quem devo compartilhar isso?</li>
                        <li>• Que oração devo fazer?</li>
                        <li>• Que ação concreta posso tomar?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Planos de Leitura */}
          {secaoAtiva === 'planos' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-4">Planos de Leitura Devocional</h2>
                <p className="text-[var(--fg)] mb-6">
                  Um plano de leitura dá estrutura ao seu devocional. Em vez de abrir a Bíblia sem saber onde ler, você tem um caminho claro. Comece com o plano mais adequado ao seu nível e progrida.
                </p>

                <div className="space-y-4">
                  {PLANOS_LEITURA.map((plano, idx) => (
                    <div key={idx} className="bg-[var(--bg)] rounded-xl overflow-hidden border border-[var(--border)]">
                      <button
                        onClick={() => setPlanoExpandido(planoExpandido === idx ? null : idx)}
                        className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--card-bg)] transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                          <Calendar className="w-6 h-6 text-[var(--primary)]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--fg)]">{plano.nome}</h3>
                          <p className="text-sm text-[var(--muted-fg)]">{plano.descricao}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">{plano.duracao}</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">{plano.nivel}</span>
                          </div>
                        </div>
                        {planoExpandido === idx ? <ChevronUp className="w-5 h-5 text-[var(--muted-fg)]" /> : <ChevronDown className="w-5 h-5 text-[var(--muted-fg)]" />}
                      </button>

                      <AnimatePresence>
                        {planoExpandido === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5">
                              <div className="bg-[var(--card-bg)] rounded-xl p-4 max-h-64 overflow-y-auto">
                                <div className="space-y-2">
                                  {plano.dias.map((dia) => (
                                    <div key={dia.dia} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg)] transition-colors">
                                      <span className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-bold text-[var(--primary)]">{dia.dia}</span>
                                      </span>
                                      <div className="flex-1">
                                        <p className="font-medium text-[var(--fg)] text-sm">{dia.referencia}</p>
                                        <p className="text-xs text-[var(--muted-fg)]">{dia.tema}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {plano.dias.length < 30 && (
                                  <p className="text-center text-xs text-[var(--muted-fg)] mt-4 italic">
                                    + mais dias no plano completo
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-[var(--primary)]/5 to-transparent rounded-xl p-6 border border-[var(--primary)]/10">
                  <h3 className="font-semibold text-[var(--fg)] mb-2">Dica: Crie Seu Próprio Plano</h3>
                  <p className="text-sm text-[var(--fg)] leading-relaxed">
                    Se nenhum plano se encaixa perfeitamente no seu momento, crie o seu próprio. Defina um livro para estudar (ex: Efésios), um tempo (ex: 6 semanas) e leia um capítulo por dia. Adicione um salmo por semana para variar. O importante é a consistência, não a perfeição do plano.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Meditação */}
          {secaoAtiva === 'meditacao' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-2">Como Meditar na Palavra</h2>
                <p className="text-[var(--primary)] text-sm font-semibold mb-4">Salmo 1:2 — &ldquo;Mas o seu deleite está na lei do SENHOR, e na sua lei medita dia e noite.&rdquo;</p>
                <p className="text-[var(--fg)] mb-6">
                  Meditar na Bíblia não é um exercício zen de esvaziar a mente. É o oposto — é enchê-la com a Palavra de Deus e deixá-la transformar o nosso pensar. O método mais prático é conhecido como <strong>Lectio Divina</strong> (Leitura Divina), praticado pela igreja há séculos.
                </p>

                <div className="space-y-4">
                  {DICAS_MEDITACAO.map((dica, i) => (
                    <div key={i} className="bg-[var(--bg)] rounded-xl p-6 border-l-4 border-[var(--primary)]/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-[var(--primary)]">{i + 1}</span>
                        </div>
                        <h3 className="font-semibold text-[var(--fg)]">{dica.titulo}</h3>
                      </div>
                      <p className="text-sm text-[var(--fg)] leading-relaxed ml-11">{dica.descricao}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-[var(--bg)] rounded-xl p-6">
                  <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Exemplo Prático de Meditação
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="text-lg">📖</span>
                      <p className="text-sm text-[var(--fg)]"><strong className="text-[var(--fg)]">Leio:</strong> &ldquo;O Senhor é o meu pastor; nada me faltará&rdquo; (Sl 23:1)</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-lg">🤔</span>
                      <p className="text-sm text-[var(--fg)]"><strong className="text-[var(--fg)]">Medito:</strong> &ldquo;Meu&rdquo; — é pessoal. &ldquo;Pastor&rdquo; — Ele cuida, guia, protege. &ldquo;Nada faltará&rdquo; — promessa total, não parcial.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-lg">🙏</span>
                      <p className="text-sm text-[var(--fg)]"><strong className="text-[var(--fg)]">Oro:</strong> &ldquo;Senhor, obrigado por ser o meu pastor pessoal. Hoje, escolho confiar que nada me faltará, mesmo quando as circunstâncias digam o contrário.&rdquo;</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-lg">💭</span>
                      <p className="text-sm text-[var(--fg)]"><strong className="text-[var(--fg)]">Contemplo:</strong> Fico em silêncio por 2 minutos, repetindo &ldquo;O Senhor é o meu pastor&rdquo; mentalmente.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-lg">🚶</span>
                      <p className="text-sm text-[var(--fg)]"><strong className="text-[var(--fg)]">Levo:</strong> Ao longo do dia, quando a ansiedade vier, repito: &ldquo;O Senhor é o meu pastor. Nada me faltará.&rdquo;</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Diário Devocional */}
          {secaoAtiva === 'diario' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-2">Template de Diário Devocional</h2>
                <p className="text-[var(--fg)] mb-6">
                  Use este modelo para registrar seus devocionais diários. Preencha cada campo e revise semanalmente. Seu diário se tornará um tesouro espiritual ao longo dos anos.
                </p>

                <div className="bg-[var(--bg)] rounded-xl p-6 space-y-4">
                  {MODELO_DIARIO.map((campo, i) => (
                    <div key={i} className="space-y-1">
                      <label className="text-sm font-semibold text-[var(--fg)] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-[var(--primary)]">{i + 1}</span>
                        </span>
                        {campo.campo}
                      </label>
                      <p className="text-xs text-[var(--muted-fg)] mb-2 ml-8">{campo.descricao}</p>
                      <textarea
                        placeholder={`Escreva aqui...`}
                        value={diarioPreenchido[campo.campo] || ''}
                        onChange={(e) => setDiarioPreenchido((prev) => ({ ...prev, [campo.campo]: e.target.value }))}
                        className="w-full min-h-[60px] bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-y"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl p-6 border border-amber-400/20">
                  <h3 className="font-semibold text-[var(--fg)] mb-2 flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-amber-500" />
                    Dica de Organização
                  </h3>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                    Separe seu diário em seções por mês. No final de cada semana, releia seus devocionais e destaque os versículos mais impactantes. No final do mês, escreva um resumo: O que Deus me ensinou? Como eu cresci? Que padrões vejo na minha vida?
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Dicas */}
          {secaoAtiva === 'dicas' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-4">Dicas para Manter Consistência</h2>
                <p className="text-[var(--fg)] mb-6">
                  O maior desafio do devocional não é entender a Bíblia — é fazer todo dia. Aqui estão estratégias práticas para transformar o devocional em hábito inegociável.
                </p>

                <div className="space-y-4">
                  {[
                    { titulo: 'Escolha um Horário Fixo', descricao: 'A manhã é ideal porque a mente está fresca e o dia ainda não tomou conta de você. Mas se você não é madrugador, escolha a noite. O importante é a consistência, não o horário. Reserve 15-20 minutos.', cor: 'border-l-blue-400' },
                    { titulo: 'Tenha um Lugar Consagrado', descricao: 'Um cantinho da casa, uma cadeira específica, um canto da sala. Quando você senta naquele lugar, seu cérebro automaticamente entra no modo devocional. Associação de contexto é poderosa.', cor: 'border-l-emerald-400' },
                    { titulo: 'Comece Pequeno', descricao: 'Não tente ler 5 capítulos no primeiro dia. Comece com 1 versículo. A consistência supera a intensidade. 15 minutos todos os dias produzem mais resultado do que 2 horas uma vez por semana.', cor: 'border-l-amber-400' },
                    { titulo: 'Use um Aplicativo ou Caderno', descricao: 'Algo que te lembre e te acompanhe. Apps como YouVersion, Logos, ou um simples caderno. O ato de anotar ancora a memória e cria um registro que você pode revisitar.', cor: 'border-l-violet-400' },
                    { titulo: 'Não Tenha Medo de Errar', descricao: 'Se você falhar um dia, não desista. Deus não está marmando ponto. A graça é diária. Recomece sem culpa. O diabo quer que você sinta vergonha para desistir. Não o deixe.', cor: 'border-l-rose-400' },
                    { titulo: 'Compartilhe com Alguém', descricao: 'Um amigo de accountability, um grupo de estudo, um mentor. Quando você sabe que alguém vai perguntar &ldquo;O que Deus te mostrou hoje?&rdquo;, a motivação aumenta. A comunidade fortalece o hábito.', cor: 'border-l-cyan-400' },
                    { titulo: 'Varie os Gêneros', descricao: 'Não leia sempre o mesmo livro. Alterne entre narrativa (Gênesis, Atos), poesia (Salmos), sabedoria (Provérbios), profecia (Isaías) e epístolas (Romanos). A diversidade mantém o interesse vivo.', cor: 'border-l-orange-400' },
                    { titulo: 'Permita que Deus Fale', descricao: 'O devocional não é uma prova — é um encontro. Não se estresse se não entender tudo. Às vezes, uma única frase é o que Deus quer que você ouça. Fique com ela. Deixe afundar.', cor: 'border-l-teal-400' },
                  ].map((dica, i) => (
                    <div key={i} className={`bg-[var(--bg)] rounded-xl p-5 border-l-4 ${dica.cor}`}>
                      <h3 className="font-semibold text-[var(--fg)] mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                        {dica.titulo}
                      </h3>
                      <p className="text-sm text-[var(--fg)] leading-relaxed ml-7">{dica.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Versículos de Encorajamento */}
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-4">Versículos de Encorajamento</h2>
                <p className="text-[var(--fg)] mb-6">
                  Quando a dificuldade de ser consistente vier, lembre-se destas promessas:
                </p>
                <div className="space-y-3">
                  {[
                    { ref: 'Josué 1:8', texto: 'Não se afaste da Lei deste livro. Medite nela dia e noite, para que você obedeça a tudo o que nela está escrito. Então você terá prosperidade e sucesso.' },
                    { ref: 'Salmo 119:105', texto: 'Lâmpada para os meus pés é a Tua Palavra, e luz para o meu caminho.' },
                    { ref: 'Isaías 40:8', texto: 'A relva seca, as flores murchem, mas a Palavra do nosso Deus dura para sempre.' },
                    { ref: '2 Timóteo 3:16', texto: 'Toda Escritura é inspirada por Deus e útil para ensinar, repreender, corrigir e educar em justiça.' },
                    { ref: 'Hebreus 4:12', texto: 'A Palavra de Deus é viva e eficaz, mais afiada que qualquer espada de dois gumes.' },
                  ].map((v) => (
                    <div key={v.ref} className="bg-[var(--bg)] rounded-lg p-4 border-l-3 border-[var(--primary)]/20">
                      <p className="text-xs font-bold text-[var(--primary)] mb-1">{v.ref}</p>
                      <p className="text-sm text-[var(--fg)] italic font-serif-body">&ldquo;{v.texto}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
