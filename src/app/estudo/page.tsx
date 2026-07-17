'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Eye, Search, PenLine, Heart, Lightbulb,
  ChevronDown, ChevronUp, Bookmark, Quote, CheckCircle2,
  ListOrdered, Brain, Target, BookMarked, StickyNote
} from 'lucide-react';
import { obterEstudoLivro } from '@/lib/estudosLoader';
import { TODOS_LIVROS } from '@/data/biblia';

type MetodoId = 'hermeneutico' | 'soap' | 'inductivo' | 'topico' | 'porlivro';

interface Metodo {
  id: MetodoId;
  titulo: string;
  sigla: string;
  descricao: string;
  cor: string;
  icone: React.ReactNode;
  passos: { titulo: string; descricao: string }[];
  exemplo: { titulo: string; versiculo: string; texto: string; aplicacao: string };
  dicas: string[];
}

const METODOS: Metodo[] = [
  {
    id: 'hermeneutico',
    titulo: 'Método Hermenêutico',
    sigla: 'O.I.A.',
    descricao: 'Observação, Interpretação e Aplicação — o método clássico de estudo bíblico que conduz do texto ao leitor de forma segura.',
    cor: 'from-blue-500/20 to-indigo-500/20 border-blue-400/30',
    icone: <Eye className="w-6 h-6" />,
    passos: [
      { titulo: 'Observação — O que o texto diz?', descricao: 'Leia o trecho pelo menos 3 vezes. Sublinhe palavras repetidas, observe conectivos (mas, porque, portanto), identifique o contexto histórico, quem fala, a quem se destina, e quais são os verbos principais. Anote perguntas que surgirem.' },
      { titulo: 'Interpretação — O que o texto significa?', descricao: 'Procure o sentido original para o autor e os primeiros ouvintes. Consulte cross-references, dicionário bíblico e comentários. Identifique o tema central, as verdades teológicas e como o trecho se conecta com o restante da Escritura. Cuidado para não impor o significado moderno ao texto antigo.' },
      { titulo: 'Aplicação — Como o texto se aplica?', descricao: 'Faça as perguntas: O que devo crer? O que devo fazer? De que modo isso transforma minha vida? A aplicação deve ser específica, possível e baseada no texto. Evite generalidades. Escreva um passo concreto de obediência.' },
    ],
    exemplo: {
      titulo: 'Exemplo: Salmo 23',
      versiculo: 'Salmo 23:1-3',
      texto: '"O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas. Refrigera a minha alma."',
      aplicacao: 'Observação: David usa a metáfora de pastor e ovelha. Verbos-chave: faz deitar, guia, refresca. Interpretação: No contexto do Oriente Antigo, o cuidado do pastor era total — alimento, proteção, descanso. David, que foi pastor, aplica essa relação a Deus. Aplicação: Posso confiar que Deus supre minhas necessidades básicas. Hoje, em vez de me ansioso com o que falta, vou listar 3 necessidades que Deus tem suprido e agradecer por cada uma.',
    },
    dicas: [
      'Sempre comece pela oração pedindo discernimento ao Espírito Santo.',
      'Nunca interprete um versículo isolado — estude o parágrafo e o capítulo.',
      'Use uma Bíblia de referência cruzada para ver conexões.',
      'Anote suas descobertas em um caderno de estudo para revisitar depois.',
    ],
  },
  {
    id: 'soap',
    titulo: 'Método SOAP',
    sigla: 'S.O.A.P.',
    descricao: 'Scripture, Observation, Application, Prayer — método simples e poderoso para devocionais diários, ideal para iniciantes e para manter consistência.',
    cor: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30',
    icone: <BookMarked className="w-6 h-6" />,
    passos: [
      { titulo: 'S — Scripture (Escritura)', descricao: 'Escreva o versículo ou trecho do dia. Transcreva com cuidado, palavra por palavra. Isso força você a prestar atenção em cada termo. Use uma tradução que você entenda bem.' },
      { titulo: 'O — Observation (Observação)', descricao: 'O que chama sua atenção? Há palavras repetidas? O que Deus está dizendo aqui? Quem é o autor? Qual o contexto? Anote suas observações sem se apressar.' },
      { titulo: 'A — Application (Aplicação)', descricao: 'Como isso se aplica à sua vida hoje? Que atitude, decisão ou mudança de pensamento isso exige? Escreva algo específico e praticável.' },
      { titulo: 'P — Prayer (Oração)', descricao: 'Transforme suas observações e aplicações em oração. Peça a Deus força para obedecer, agradeça pela revelação, confesse onde falhou. A oração selará o estudo no coração.' },
    ],
    exemplo: {
      titulo: 'Exemplo: Filipenses 4:6-7',
      versiculo: 'Filipenses 4:6-7',
      texto: '"Não vos inquieteis por coisa alguma, mas em tudo sejam conhecidas as vossas petições diante de Deus, em oração e súplicas, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus."',
      aplicacao: 'S: Transcrevi o texto. O: Paulo escreve da prisão, mas fala de paz. A palavra "inquieteis" é um comando — indica que a ansiedade é uma escolha que podemos recusar. A: Hoje vou identificar 3 coisas que me inquietam e, em vez de ruminá-las, escrever uma oração específica para cada uma. P: Senhor, recebo Tua paz que excede o entendimento. Guarda meu coração de ansiedade e me ensina a entregar tudo em oração.',
    },
    dicas: [
      'Reserve 15-20 minutos pela manhã para o SOAP.',
      'Mantenha um caderno ou aplicativo dedicado exclusivamente para seus SOAPS.',
      'Se um dia não conseguir, não desista — recomece no dia seguinte.',
      'Compartilhe um SOAP por semana com um amigo ou grupo de estudo.',
      'Use canetas coloridas: azul para Scripture, verde para Observation, laranja para Application, roxo para Prayer.',
    ],
  },
  {
    id: 'inductivo',
    titulo: 'Método Indutivo',
    sigla: 'P.I.A.',
    descricao: 'Pergunta, Inferência, Aplicação — método que desenvolve pensamento crítico e independência na leitura bíblica, descobrindo verdades por conta própria.',
    cor: 'from-purple-500/20 to-pink-500/20 border-purple-400/30',
    icone: <Brain className="w-6 h-6" />,
    passos: [
      { titulo: 'Pergunta 1: O que o texto DIZ?', descricao: 'Leia e re-leia. Resuma o texto em suas próprias palavras. Identifique os personagens, eventos, lugares e tempo. Responda: Quem? O quê? Quando? Onde? Por quê? Isso é a base factual do estudo.' },
      { titulo: 'Pergunta 2: O que o texto SIGNIFICA?', descricao: 'Procure o significado original. Que palavras-chave têm significado cultural ou teológico especial? Qual era a intenção do autor? Como isso se encaixa no cânone bíblico? Consulte recursos de pesquisa se necessário.' },
      { titulo: 'Pergunta 3: O que o texto SIGNIFICA PARA MIM?', descricao: 'Essa é a ponte entre o texto antigo e sua vida. Que verdade é universal? Que princípio se repete na Escritura? Como isso afeta minhas crenças, atitudes e comportamento? O que devo fazer diferente a partir de hoje?' },
    ],
    exemplo: {
      titulo: 'Exemplo: Romanos 8:28',
      versiculo: 'Romanos 8:28',
      texto: '"E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito."',
      aplicacao: 'O que diz: Paulo declara um princípio para crentes — "todas as coisas" (inclusive o sofrimento) cooperam para o bem. O que significa: "Bem" aqui não é conforto, mas conformidade com Cristo (v.29). O "chamado" é a eleição divina. Para mim: Mesmo quando não entendo o sofrimento, posso confiar que Deus tem um propósito. Hoje, vou pensar em uma dificuldade recente e buscar que Deus me mostre como Ele pode usá-la para o meu crescimento espiritual.',
    },
    dicas: [
      'Use lápis para sublinhar e canetas para anotar — você pode revisar depois.',
      'Não tenha pressa. Um bom estudo inductivo pode levar várias sessões.',
    ],
  },
  {
    id: 'topico',
    titulo: 'Método por Tópico',
    sigla: 'TOP.',
    descricao: 'Como estudar um tema específico na Bíblia — reúne todas as passagens relevantes para construir uma teologia sólida sobre um assunto.',
    cor: 'from-amber-500/20 to-orange-500/20 border-amber-400/30',
    icone: <Target className="w-6 h-6" />,
    passos: [
      { titulo: 'Passo 1: Defina o tema', descricao: 'Escolha um tema específico (ex: "oração", "perdão", "segunda vinda"). Quanto mais específico, melhor. Em vez de "amor", estude "o amor fraternal no Novo Testamento".' },
      { titulo: 'Passo 2: Faça uma busca', descricao: 'Use concordância ou ferramentas digitais para encontrar todas as passagens que tratam do tema. Crie uma lista com referência e versículo. Incline-se pelo contexto imediato de cada passagem.' },
      { titulo: 'Passo 3: Organize por categorias', descricao: 'Agrupe as passagens por subtemas. Por exemplo, para "oração": oração de petição, intercessão, louvor, arrependimento, perseverança. Identifique padrões e progressão do tema no cânone.' },
      { titulo: 'Passo 4: Sintetize uma teologia', descricao: 'Com base em todas as passagens, escreva um parágrafo que resuma o que a Bíblia diz sobre o tema. Inclua tensões e paradoxos. Isso se tornará uma referência pessoal que você pode consultar e ensinar.' },
    ],
    exemplo: {
      titulo: 'Exemplo: Tema "Perdão"',
      versiculo: 'Mateus 6:14-15 + Efésios 4:32 + Colossenses 3:13',
      texto: 'Mateus 6:14-15: "Se perdoais aos homens as suas ofensas, também vosso Pai celestial vos perdoará. Mas, se não perdoardes, também vosso Pai não perdoará as vossas ofensas."',
      aplicacao: 'Subtemas encontrados: (1) O perdão é condicional para receber o perdão divino. (2) Devemos perdoar como Deus perdoou — radical e gratuitamente. (3) O perdão é um ato da vontade, não uma emoção. Conclusão: O perdão não é opcional para o cristão. É uma marca da nossa conversão e uma condição para experimentar plenamente o perdão de Deus.',
    },
    dicas: [
      'Comece com temas que estão te incomodando ou que você precisa ensinar.',
      'Sempre comece pelas passagens mais claras e depois estude as mais difíceis.',
      'Cuidado com "provas de eisegese" — não force o texto para caber no seu tema.',
      'Consulte um dicionário bíblico para entender termos-chave no original.',
    ],
  },
  {
    id: 'porlivro',
    titulo: 'Método por Livro',
    sigla: 'LIV.',
    descricao: 'Como estudar um livro bíblico completo — do contexto à aplicação, passo a passo para dominar cada livro da Bíblia.',
    cor: 'from-rose-500/20 to-red-500/20 border-rose-400/30',
    icone: <BookOpen className="w-6 h-6" />,
    passos: [
      { titulo: 'Passo 1: Leia o livro inteiro de uma vez', descricao: 'Leia o livro completo em uma sentada (ou duas no máximo). Não se prenda a detalhes. O objetivo é ter uma visão panorâmica — o "big picture". Anote as impressões gerais, o tom, os personagens principais.' },
      { titulo: 'Passo 2: Estude o contexto', descricao: 'Quem escreveu? Para quem? Quando? Por quê? Qual era a situação histórica? Consulte uma introdução ao livro (comentário ou Bíblia de estudo). Entender o contexto muda completamente a interpretação.' },
      { titulo: 'Passo 3: Divida em seções lógicas', descricao: 'Identifique as divisões temáticas do livro. Por exemplo, Romanos tem 3 grandes seções: doutrina (1-11), aplicação (12-15) e conclusão (16). Cada seção pode ser estudada separadamente.' },
      { titulo: 'Passo 4: Estude capítulo por capítulo', descricao: 'Para cada capítulo, identifique o tema principal, as verdades-chave e a aplicação. Use o método hermenêutico (O.I.A.) em cada seção. Anote palavras-chave que se repetem no livro.' },
      { titulo: 'Passo 5: Escreva um resumo', descricao: 'Ao final do estudo, escreva um resumo de 1 página do livro: tema central, estrutura, versículos-chave e aplicações principais. Isso consolida tudo o que aprendeu e cria uma referência para revisão futura.' },
    ],
    exemplo: {
      titulo: 'Exemplo: Estudo de Efésios',
      versiculo: 'Efésios 1:3-14',
      texto: 'Efésios é a epístola "celestial" de Paulo. Estrutura: Cap. 1-3 — Nossas bênçãos espirituais (passado). Cap. 4-6 — Nossa caminhada (presente). Versículos 3-14 do capítulo 1 contêm a maior bênção em forma de oração do NT: eleição, predestinação, redenção, selamento do Espírito.',
      aplicacao: 'Tema central: O crente está "em Cristo" e possui todas as bênçãos espirituais. Aplicação: Em vez de buscar o que já tenho em Cristo, devo viver a partir dessa identidade. Uma oração de gratidão pelas bênçãos de Efésios 1 pode transformar a visão de si mesmo.',
    },
    dicas: [
      'Comece por livros curtos: Filipenses, 1 João, Tiago.',
      'Use uma Bíblia com notas ao pé da página.',
      'Leia pelo menos 2 versões diferentes do mesmo livro.',
      'Faça um mapa mental ou diagrama da estrutura do livro.',
      'Estude Efésios como base para entender a teologia paulina.',
    ],
  },
];

const DICAS_MEMORIZACAO = [
  { titulo: 'Método de Repetição Espaçada', descricao: 'Leia o versículo 10 vezes. Depois espere 1 hora e leia mais 10 vezes. No dia seguinte, repita. A cada intervalo, aumente o tempo. Em 1 semana, o versículo estará gravado.' },
  { titulo: 'Escreva e Reescreva', descricao: 'Transcreva o versículo à mão pelo menos 5 vezes. Depois tente escrevê-lo de memória. Cometer erros é parte do processo — identifique as palavras que faltam e reforce.' },
  { titulo: 'Use Cartões de Memória', descricao: 'Numere um lado do cartão com a referência e no outro escreva o versículo. Leve-os consigo e revise em filas, transportes, pausas. O uso de cartões físicos ativa a memória motora.' },
  { titulo: 'Cante ou Rime', descricao: 'Transforme o versículo em uma música ou rima. A melodia facilita a retenção. Existem apps e vídeos que musicam versículos para memorização.' },
  { titulo: 'Aplique o Versículo', descricao: 'Use o versículo memorizado em uma conversa, oração ou situação do dia. A aplicação prática ancora a memória e dá significado pessoal ao versículo.' },
];

const DICAS_DEVOCIONAL = [
  { titulo: 'Hora Fixa', descricao: 'Escolha um horário e cumpra. O cérebro cria hábito com consistência, não com intensidade. Melhor 15 minutos diários do que 2 horas no domingo.' },
  { titulo: 'Lugar Consagrado', descricao: 'Tenha um local fixo para o devocional. Quando você senta naquele lugar, seu cérebro automaticamente entra no modo de estudo e oração.' },
  { titulo: 'Comece pela Oração', descricao: 'Antes de abrir a Bíblia, peça ao Espírito Santo que ilumine as Escrituras. Uma breve oração de abertura prepara o coração para receber a Palavra.' },
  { titulo: 'Anote Sempre', descricao: 'O que não é anotado, é esquecido. Tenha um caderno de devocional. Anote o versículo, uma impressão e uma oração. Revise semanalmente.' },
  { titulo: 'Não Tenha Medo de Falhar', descricao: 'Se errar um dia, não desista. Deus não está marmando ponto. Recomece sem culpa. A graça é diária, assim como a Palavra.' },
];

function MetodoCard({ metodo, isOpen, onToggle }: { metodo: Metodo; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className={`sola-card overflow-hidden border ${isOpen ? 'ring-2 ring-[var(--primary)]/20' : ''}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-[var(--bg)]/50 transition-colors"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metodo.cor} flex items-center justify-center shrink-0`}>
          {metodo.icone}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-xl font-semibold text-[var(--fg)]">{metodo.titulo}</h3>
            <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold tracking-wider">
              {metodo.sigla}
            </span>
          </div>
          <p className="text-sm text-[var(--muted-fg)] line-clamp-2">{metodo.descricao}</p>
        </div>
        <div className="shrink-0 text-[var(--muted-fg)]">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              {/* Passos */}
              <div>
                <h4 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4" />
                  Passos do Método
                </h4>
                <div className="space-y-4">
                  {metodo.passos.map((passo, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-[var(--primary)]">{i + 1}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-[var(--fg)] mb-1">{passo.titulo}</h5>
                        <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{passo.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exemplo */}
              <div className="bg-[var(--bg)] rounded-xl p-5">
                <h4 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  {metodo.exemplo.titulo}
                </h4>
                <p className="text-xs text-[var(--primary)] font-semibold mb-2">{metodo.exemplo.versiculo}</p>
                <p className="text-sm text-[var(--fg)] italic leading-relaxed mb-3 font-serif-body">
                  &ldquo;{metodo.exemplo.texto}&rdquo;
                </p>
                <div className="border-l-3 border-[var(--primary)]/30 pl-4">
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{metodo.exemplo.aplicacao}</p>
                </div>
              </div>

              {/* Dicas */}
              <div>
                <h4 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Dicas Práticas
                </h4>
                <ul className="space-y-2">
                  {metodo.dicas.map((dica, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-fg)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      {dica}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EstudoPage() {
  const [metodoAberto, setMetodoAberto] = useState<MetodoId | null>(null);
  const [abaAtiva, setAbasAtiva] = useState<'metodos' | 'memorizacao' | 'devocional' | 'anotacoes'>('metodos');
  const [livroEstudo, setLivroEstudo] = useState<string>('');

  const estudoDoLivro = useMemo(
    () => (livroEstudo ? obterEstudoLivro(livroEstudo) : undefined),
    [livroEstudo]
  );

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
                <BookOpen className="w-8 h-8 text-[var(--primary)]" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)] mb-3">
                Guia de Estudo Bíblico
              </h1>
              <p className="text-[var(--muted-fg)] text-lg max-w-2xl mx-auto">
                Métodos práticos para estudar a Bíblia com profundidade e consistência
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal delay={0.1}>
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
              {[
                { id: 'metodos' as const, label: 'Métodos de Estudo', icon: <Eye className="w-4 h-4" /> },
                { id: 'memorizacao' as const, label: 'Memorização', icon: <Brain className="w-4 h-4" /> },
                { id: 'devocional' as const, label: 'Estudo Devocional', icon: <Heart className="w-4 h-4" /> },
                { id: 'anotacoes' as const, label: 'Anotações de Estudo', icon: <StickyNote className="w-4 h-4" /> },
              ].map((aba) => (
                <button
                  key={aba.id}
                  onClick={() => setAbasAtiva(aba.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    abaAtiva === aba.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'bg-[var(--card-bg)] text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--bg)]'
                  }`}
                >
                  {aba.icon}
                  {aba.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Aba: Métodos */}
          {abaAtiva === 'metodos' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {METODOS.map((metodo) => (
                <MetodoCard
                  key={metodo.id}
                  metodo={metodo}
                  isOpen={metodoAberto === metodo.id}
                  onToggle={() => setMetodoAberto(metodoAberto === metodo.id ? null : metodo.id)}
                />
              ))}
            </motion.div>
          )}

          {/* Aba: Memorização */}
          {abaAtiva === 'memorizacao' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-2">Memorização de Versículos</h2>
                <p className="text-[var(--muted-fg)] mb-6">
                  Memorizar a Bíblia é o ato mais prático de cristianismo. A Palavra guardada no coração é espada contra a tentação (Sl 119:11). Escolha um método, comece com 1 versículo por semana e progrida.
                </p>

                <div className="bg-[var(--bg)] rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Versículos Sugeridos para Começar
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { ref: 'Josué 1:9', texto: 'Seja forte e corajoso! Não se apavore, nem se desanime, pois o Senhor está com você.' },
                      { ref: 'Romanos 8:28', texto: 'Sabemos que Deus faz todas as coisas cooperarem para o bem.' },
                      { ref: 'Filipenses 4:13', texto: 'Posso todas naquele que me fortalece.' },
                      { ref: 'Isaías 40:31', texto: 'Mas aqueles que esperam no Senhor renovam suas forças.' },
                      { ref: '1 Pedro 5:7', texto: 'Lancem sobre ele todas as suas preocupações, porque ele cuida de vocês.' },
                      { ref: 'Efésios 2:8-9', texto: 'Porque vocês são salvos pela graça, por meio da fé.' },
                    ].map((v) => (
                      <div key={v.ref} className="bg-[var(--card-bg)] rounded-lg p-4">
                        <p className="text-xs font-bold text-[var(--primary)] mb-1">{v.ref}</p>
                        <p className="text-sm text-[var(--fg)] italic font-serif-body">{v.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-[var(--fg)]">Métodos de Memorização</h3>
                  {DICAS_MEMORIZACAO.map((dica, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-[var(--primary)]">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--fg)] text-sm">{dica.titulo}</h4>
                        <p className="text-sm text-[var(--muted-fg)]">{dica.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Aba: Estudo Devocional */}
          {abaAtiva === 'devocional' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-2">Como Preparar um Estudo Devocional</h2>
                <p className="text-[var(--muted-fg)] mb-6">
                  O estudo devocional não é apenas leitura — é encontro com Deus. Uma preparação intencional faz diferença entre uma leitura superficial e uma experiência transformadora.
                </p>

                <div className="space-y-6">
                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                      <span className="text-2xl">📖</span> Passo 1: Escolha o Texto
                    </h3>
                    <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-3">
                      Pode ser um salmo, um provérbio, um evangelho, uma epístola. Para iniciantes, recomendo começando pelos Salmos ou pelos Evangelhos. Para devocionais diários, um trecho de 5 a 10 versículos é ideal.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Salmos', 'Provérbios', 'Mateus', 'João', '1 João', 'Filipenses'].map((l) => (
                        <span key={l} className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">{l}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                      <span className="text-2xl">🙏</span> Passo 2: Comece pela Oração
                    </h3>
                    <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                      Uma oração curta de abertura: &ldquo;Senhor, abre os meus olhos para ver as maravilhas da Tua Lei. Ilumina a minha mente pelo Teu Espírito. Amém.&rdquo; Isso prepara o coração e a mente para receber.
                    </p>
                  </div>

                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                      <span className="text-2xl">📝</span> Passo 3: Leia e Anote
                    </h3>
                    <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                      Leia o texto uma vez para absorver. Na segunda leitura, anote palavras ou frases que se destacam. Na terceira, pergunte: &ldquo;O que Deus está me dizendo aqui?&rdquo; Escreva a resposta no seu caderno de devocional.
                    </p>
                  </div>

                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                      <span className="text-2xl">💬</span> Passo 4: Medite
                    </h3>
                    <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                      Meditação bíblica não é esvaziar a mente — é enchê-la com a Palavra. Repita mentalmente o versículo. Pense em como ele se aplica à sua situação. Ruminare, como uma vaca mastiga o capim — volte ao texto várias vezes ao longo do dia.
                    </p>
                  </div>

                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                      <span className="text-2xl">✍️</span> Passo 5: Responda e Aja
                    </h3>
                    <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                      Escreva uma resposta pessoal ao texto. Pergunte: O que devo crer? O que devo fazer? Com quem devo compartilhar? Transforme a meditação em uma ação concreta para o dia. Uma oração de compromisso fecha o estudo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-4">Dicas para Manter Consistência</h2>
                <div className="space-y-3">
                  {DICAS_DEVOCIONAL.map((dica, i) => (
                    <div key={i} className="flex gap-3 items-start bg-[var(--bg)] rounded-xl p-4">
                      <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[var(--fg)] text-sm">{dica.titulo}</h4>
                        <p className="text-sm text-[var(--muted-fg)]">{dica.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Aba: Anotações */}
          {abaAtiva === 'anotacoes' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="sola-card p-8">
                <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-2">Como Fazer Anotações de Estudo</h2>
                <p className="text-[var(--muted-fg)] mb-6">
                  Boas anotações transformam leitura em aprendizado. O sistema certo de anotações faz com que você nunca perca uma descoberta e sempre tenha material para revisar e ensinar.
                </p>

                <div className="space-y-6">
                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3">Sistema de Símbolos</h3>
                    <p className="text-sm text-[var(--muted-fg)] mb-4">Use estes símbolos consistentemente ao longo do tempo para criar um sistema pessoal de referência rápida:</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        { simbolo: '⭐', uso: 'Versículo-chave para memorizar' },
                        { simbolo: '❓', uso: 'Pergunta para pesquisar depois' },
                        { simbolo: '💡', uso: 'Insight ou revelação importante' },
                        { simbolo: '🔗', uso: 'Conexão com outro texto bíblico' },
                        { simbolo: '⚠️', uso: 'Aviso ou exortação' },
                        { simbolo: '❤️', uso: 'Promessa de Deus para crer' },
                        { simbolo: '📌', uso: 'Tema para estudo futuro' },
                        { simbolo: '✓', uso: 'Aplicação pessoal identificada' },
                      ].map((s) => (
                        <div key={s.simbolo} className="flex items-center gap-3 bg-[var(--card-bg)] rounded-lg p-3">
                          <span className="text-xl">{s.simbolo}</span>
                          <span className="text-sm text-[var(--muted-fg)]">{s.uso}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3">Template de Anotação</h3>
                    <p className="text-sm text-[var(--muted-fg)] mb-4">Para cada passagem estudada, preencha este template no seu caderno:</p>
                    <div className="bg-[var(--card-bg)] rounded-xl p-5 font-mono text-sm space-y-2 border border-[var(--border)]">
                      <p className="text-[var(--primary)] font-bold">Data: ___________</p>
                      <p className="text-[var(--fg)]">Texto: ___________</p>
                      <p className="text-[var(--fg)]">Contexto: ___________</p>
                      <p className="text-[var(--fg)]">Palavras-chave: ___________</p>
                      <p className="text-[var(--fg)]">Observação principal: ___________</p>
                      <p className="text-[var(--fg)]">Verdade teológica: ___________</p>
                      <p className="text-[var(--fg)]">Aplicação pessoal: ___________</p>
                      <p className="text-[var(--fg)]">Oração: ___________</p>
                      <p className="text-[var(--fg)]">Versículos relacionados: ___________</p>
                    </div>
                  </div>

                  <div className="bg-[var(--bg)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--fg)] mb-3">Dicas de Organização</h3>
                    <ul className="space-y-2">
                      {[
                        'Separe seu caderno em seções: Devocional, Estudo de Livro, Temas, Oração.',
                        'Use abas coloridas para separar as seções no caderno.',
                        'No final de cada mês, revise suas anotações e destaque as descobertas mais importantes.',
                        'Digitalize suas anotações periodicamente para ter backup.',
                        'Use o sistema COR (C = Contexto, O = Observação, R = Reflexão) para cada estudo.',
                        'Ao preparar um ensino, suas anotações anteriores são material valioso.',
                      ].map((dica, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-fg)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                          {dica}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="sola-card p-8 mt-8">
            <h2 className="font-display text-2xl font-light text-[var(--fg)] mb-2 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[var(--primary)]" /> Estudo por Livro
            </h2>
            <p className="text-[var(--muted-fg)] mb-6">
              Selecione um livro bíblico para ver um panorama de seu contexto, gênero, temas principais, versículos-chave e aplicações.
            </p>

            <select
              value={livroEstudo}
              onChange={(e) => setLivroEstudo(e.target.value)}
              className="w-full sm:w-72 px-3 py-2.5 text-sm bg-[var(--surface-sunken)] border border-[var(--border)]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 transition-all duration-200"
            >
              <option value="">Selecione um livro…</option>
              {TODOS_LIVROS.map((l) => (
                <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>
              ))}
            </select>

            {estudoDoLivro && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 border-l-2 border-[var(--primary)]/30 pl-4 py-2 space-y-4"
              >
                <p className="text-sm text-[var(--fg)] leading-relaxed font-serif-body">{estudoDoLivro.contexto}</p>

                {estudoDoLivro.genero && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Gênero</p>
                    <p className="text-xs text-[var(--fg)] font-medium">{estudoDoLivro.genero}</p>
                  </div>
                )}

                {estudoDoLivro.temasPrincipais.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {estudoDoLivro.temasPrincipais.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-medium">{t}</span>
                    ))}
                  </div>
                )}

                {estudoDoLivro.versiculosChave.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-2 flex items-center gap-1">
                      <Quote className="w-3 h-3" /> Versículos-Chave
                    </p>
                    <div className="space-y-2">
                      {estudoDoLivro.versiculosChave.map((vc, i) => (
                        <div key={i} className="bg-[var(--bg)]/60 rounded-lg p-3 border-l-2 border-[var(--primary)]/20">
                          <p className="text-xs font-bold text-[var(--primary)] mb-1">{vc.referencia}</p>
                          <p className="text-xs text-[var(--fg)] italic leading-relaxed font-serif-body mb-1">&ldquo;{vc.texto}&rdquo;</p>
                          <p className="text-xs text-[var(--muted-fg)] leading-relaxed">{vc.explicacao}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" /> Aplicação Prática
                  </p>
                  <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">{estudoDoLivro.aplicacaoPratica}</p>
                </div>

                {estudoDoLivro.perguntasEstudo.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Perguntas de Estudo</p>
                    <ol className="space-y-1 list-decimal list-inside">
                      {estudoDoLivro.perguntasEstudo.map((p, i) => (
                        <li key={i} className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">{p}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
