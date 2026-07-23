'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, ChevronRight, ChevronDown, Quote, Target, HelpCircle,
  Lightbulb, User, Calendar, Tag, Layers, ArrowLeft, CheckCircle2,
  Heart, Flame, Shield, Users, Cross, Sparkles,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introdução' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'versiculos', label: 'Versículos-Chave' },
  { id: 'amor', label: '1 Cor 13: O Amor' },
  { id: 'ressurreição', label: '1 Cor 15: Ressurreição' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'aplicação', label: 'Aplicação' },
  { id: 'perguntas', label: 'Perguntas' },
];

const estrutura = [
  { parte: 'Caps. 1-4: Divisoes na Igreja', cor: 'border-red-500', bg: 'bg-red-500/5', itens: [
    'Caps. 1-3: Sabedoria humana vs. sabedoria de Cristo — cruz vs. retórica',
    'Cap. 4: Paulo e Apolos como mordomos, não donos — Deus dara o crescimento',
  ]},
  { parte: 'Caps. 5-7: Problemas Morales e Praticos', cor: 'border-amber-500', bg: 'bg-amber-500/5', itens: [
    'Cap. 5: Imoralidade sexual — expulsar o immoral da comunidade',
    'Cap. 6: Litigar nos tribunais — os indignos do Reino',
    'Cap. 7: Casamento, celibato, idólatras, comida sacrificada',
  ]},
  { parte: 'Caps. 8-14: Idolatria e Adoracao', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Caps. 8-10: Comida sacrificada aos idolos — liberdade vs. amor ao fraco',
    'Cap. 11: Sobre o papel féminino na adoração — contexto cultural',
    'Caps. 12-14: Dons espirituais — ordem no culto, o caminho do amor',
  ]},
  { parte: 'Caps. 15-16: Ressurreição e Conclusão', cor: 'border-green-500', bg: 'bg-green-500/5', itens: [
    'Cap. 15: A ressurreição de Cristo é a dos crentes — fundamento da fé',
    'Cap. 16: Colecção para Jerusalém, despedida — "Vinde, Senhor"',
  ]},
];

const versiculosChave = [
  {
    referência: '1 Corintios 1:18',
    texto: 'Porque a palavra da cruz e loucura para os que se perdem; mas para os que se salvam, isto e, para nos, e poder de Deus.',
    explicação: 'A cruz parece loucura ao mundo, mas é o poder de Deus para os salvos. A sabedoria de Deus não esta na retorica, mas no evangelho da cruz.',
    comentarios: [
      { teologo: 'Richard Hays', texto: 'Paulo subverte os valores culturais de Corinto. Os gregos buscavam sophia (sabedoria filosofica); Paulo aponta para a stauros (cruz) — o simbolo mais humilhante do Imperio Romano. A cruz não e apenas meio de salvação, mas paradigma de como Deus age: atraves da fraqueza.' },
      { teologo: 'N.T. Wright', texto: 'A palavra da cruz não e apenas uma doutrina, mas uma narrativa — a historia de Jesus que transforma o mundo. Paulo não esta dizendo que a razao e inutil, mas que a sabedoria humana, sem Deus, e insuficiente para a salvação.' },
    ],
  },
  {
    referência: '1 Corintios 6:19-20',
    texto: 'Ou não sabeis que o vosso corpo e templo do Espírito Santo, que esta em vos, e que vos veio de Deus, e vos não sois de vos mesmos? Porque fostes comprados por certo preco; glorificai, pois, a Deus no vosso corpo e no vosso espírito, que são de Deus.',
    explicação: 'O corpo do crente e sagrado — templo do Espírito Santo. A imoralidade sexual destroi esse templo. Fomos comprados pelo sangue de Cristo; pertencemos a Ele.',
    comentarios: [
      { teologo: 'Gordon Fee', texto: 'A metafora do templo e central: em Corinto, os templos dos idolos eram locais de culto e também de imoralidade. Paulo diz: o vosso corpo E o templo. A pureza sexual não e legalismo, mas reverência ao Espírito que habita em voce.' },
      { teologo: 'Ben Witherington III', texto: 'O argumento de Paulo e Cristologico: fostes comprados por preco. A etica sexual não e arbitraria, mas fundamentada na redenção. Nos não nos pertencemos — Cristo nos comprou. Isso transforma a compreensão de liberdade.' },
    ],
  },
  {
    referência: '1 Corintios 12:4-7',
    texto: 'Ora, há diversidade de dons, mas o mesmo Espírito. E há diversidade de ministerios, mas o mesmo Senhor. E há diversidade de operacoes, mas é o mesmo Deus que opera tudo em todos. Mas a cada um e dada a manifestação do Espírito para utilidade.',
    explicação: 'A diversidade de dons não e confusão, mas ordem divina. Um mesmo Deus opera de maneiras diférentes em cada crente. O propósito é a utilidade comum, não a exibicao individual.',
    comentarios: [
      { teologo: 'Gordon Fee', texto: 'Paulo usa uma estrutura triadica: dons (charismata), ministerios (diakoniai) e operacoes (energemata) — Espírito, Senhor e Deus. A Trindade opera na diversidade da igreja. Isso e anti-sectarismo: ninguem pode dizer que seu dom e mais importante.' },
      { teologo: 'Anthony Thiselton', texto: 'A manifestação do Espírito para utilidade (12:7) é a frase-chave. O dom não e para o individuo, mas para a comunidade. Charismata sem comunidade e espiritualidade individualista, que Paulo rejeita veementemente.' },
    ],
  },
];

const amor13 = [
  { verso: '13:1', texto: 'Ainda que eu falasse as linguas dos homens e dos anjos, e não tivesse amor, seria como o metal que soa ou como o sino que tine.', explicação: 'O dom mais espetacular (linguagens) sem amor e apenas ruido. A excelência espiritual sem amor e vaidade.' },
  { verso: '13:2', texto: 'E ainda que tivesse profécia, e entendesse todos os arcanos e toda a ciencia, e ainda que tivesse toda a fé, de maneira tal que transportasse os montes, e não tivesse amor, nada seria.', explicação: 'Conhecimento, profécia, fé montanhas-transportadoras — tudo e nada sem amor. A fé sem amor e ortodoxia morta.' },
  { verso: '13:3', texto: 'E ainda que distribuisse todos os meus bens para sustento dos pobres, e ainda que entregasse o meu corpo para ser queimado, e não tivesse amor, nada me aproveitaria.', explicação: 'Sacrificio extremo (martírio) sem amor e inutil. O amor não é o que fazemos, mas a motivacao por tras do que fazemos.' },
  { verso: '13:4-7', texto: 'O amor e sofredor, e benigno; o amor não e invejoso; o amor não trata com leviandade, não se ensoberbece, não se porta com indecencia, não busca os seus próprios interesses, não se irrita, não suspeita mal; não se alegra com a injustiça, mas se alegra com a verdade; tudo sofre, tudo cre, tudo espera, tudo suporta.', explicação: 'A definição mais completa de amor na Biblia. 15 caráteristicas positivas e negativas. E um retrato de Cristo, não apenas um ideal.' },
  { verso: '13:8-10', texto: 'O amor nunca acaba; mas havendo profécias, acabarao; havendo linguas, cessarao; havendo ciencia, desaparecera. Porque em parte profétizamos, e em parte conhecemos; mas quando vier o que e perfeito, então o que e em parte desaparecera.', explicação: 'O amor e eterno; os dons são temporarios. Quando a perféição (Cristo plenamente revelado) vier, os dons cessarao. O amor permanece para sempre.' },
  { verso: '13:11-12', texto: 'Quando eu era menino, falava como menino, pensava como menino, raciocinava como menino; mas, quando cheguei a ser homem, acabei com as coisas de menino. Porque agora vemos por espelho em enigma, mas então veremos face a face; agora conheco em parte, mas então conhecerei plenamente, como fui também plenamente conhecido.', explicação: 'Os dons são como falar de menino — temporarios. A eternidade será face a face. O conhecimento parcial será substituido pela visão plena de Deus.' },
  { verso: '13:13', texto: 'Agora, pois, permanecem a fé, a esperança é o amor, estes tres; mas o maior destes é o amor.', explicação: 'Na eternidade, a fé será vista (ja não esperamos o que vemos) é a esperança será realizada. Mas o amor permanecera para sempre. O amor é o maior porque e eterno.' },
];

const ressurreição = [
  { título: 'O Fundamento (15:1-11)', texto: 'Paulo lembra que a ressurreição de Cristo é o centro do evangelho. Cristo morreu, foi sepultado, ressuscitou no terceiro dia, e apareceu a mais de 500 pessoas. Isso e fato historico, não mito.', teologo: 'Gary Habermas: "A ressurreição é o fato mais bem atestado da historia antiga — mais testemunhas que a maioria dos eventos que aceitamos como historicos"' },
  { título: 'A Necessidade da Ressurreição (15:12-19)', texto: 'Se não há ressurreição, Cristo não ressuscitou. Se Cristo não ressuscitou, a fé e va, os pecados não foram perdoados, os mortos em Cristo pereceram. A fé cristã sem ressurreição é a maior de todas as ilusoes.', teologo: 'N.T. Wright: "Uma Cristologia sem ressurreição é uma contradição — Jesus sem ressurreição e apenas mais um proféta morto. A ressurreição é o que torna Jesus o Senhor"' },
  { título: 'A Natureza do Corpo Ressurretado (15:35-49)', texto: 'Paulo usa a analogia da semente: o corpo semeado e corrompivel; o colhido e incorruptivel. O corpo natural e de terra (Adão); o corpo espiritual e celestial (Cristo). Não é o mesmo corpo, mas transformado.', teologo: 'N.T. Wright: "A ressurreição não e ir para o ceu quando morremos — é a transformação do corpo fisico em corpo novo. O mesmo Jesus foi reconhecido pelos discipulos, mas transformado"' },
  { título: 'A Vitoria Final (15:50-58)', texto: 'Em um instante, em um olhar, na ultima trombeta — os mortos ressuscitarao incorruptiveis e seremos transformados. A morte e vencida. "O morte, onde esta a tua vitoria?" A vitoria e do Senhor.', teologo: 'Gary Habermas: "1 Corintios 15 é a mais completa explicação da ressurreição corporal no NT. Paulo não fala de imortalidade da alma, mas da transformação do corpo inteiro — isso e cristao, não grego"' },
];

const temasCentrais = [
  { título: 'Unidade na Diversidade', icone: Users, cor: 'text-blue-500', descricao: 'Corinto era uma igreja cheia de dons, talentos e personalidades — mas fragmentada por facções. Paulo insiste: há um só Deus, um só Senhor, um só Espírito. A diversidade de dons e para a unidade, não para a divisão.' },
  { título: 'A Cruz como Sabedoria', icone: Cross, cor: 'text-red-500', descricao: 'A cruz é o centro de tudo em 1 Corintios. A sabedoria humana busca retorica e poder; Deus escolheu o escandalo da cruz. A fraqueza de Deus e mais forte que os homens. A tolice de Deus e mais sabia que os homens.' },
  { título: 'Dons Espirituais e Ordem', icone: Flame, cor: 'text-orange-500', descricao: 'Paulo regulamenta o uso dos dons: tudo deve ser feito com decencia e ordem (14:40). Linguagens sem traducao são inúteis. A profécia deve ser julgada. O amor é o criterio supremo para o uso dos dons.' },
  { título: 'Pureza e Santidade', icone: Shield, cor: 'text-green-500', descricao: 'A imoralidade sexual (cap. 5), idolatria (caps. 8-10) e desordem no culto (caps. 11-14) são problemas serios em Corinto. Paulo não minimiza o pecado — a santidade e exigida porque Deus e santo.' },
  { título: 'Amor como Criterio', icone: Heart, cor: 'text-pink-500', descricao: '1 Corintios 13 é o coração de toda a carta. Dons sem amor são inúteis. Conhecimento sem amor e destruição. Fe sem amor e va. O amor é o criterio supremo para toda a vida cristã e eclesiastica.' },
];

const aplicações = [
  'Busque a sabedoria da cruz, não a sabedoria do mundo — a cruz e poder de Deus.',
  'Guarde a unidade da igreja — facções e divisoes destroem o testemunho cristao.',
  'Purifique o corpo — e templo do Espírito Santo. A imoralidade sexual ofénde a Deus.',
  'Use os dons com amor e ordem — não para exibicao, mas para edificar a comunidade.',
  'Estude 1 Corintios 13 como retrato de Cristo — não como lista de sentimentos.',
  'Creia na ressurreição corporal — é o fundamento da fé cristã, sem ela tudo e va.',
  'Pratique a liberdade cristã com amor — não escandalize o fraco por causa da sua liberdade.',
  'Busque o amor acima de todos os dons — sem amor, nada somos.',
  'Reconheça que o corpo e sagrado — não e mero recipiente, mas templo do Espírito (6:19).',
  'Mantenha a ordem no culto — decencia e ordem são marcas da verdadeira adoração (14:40).',
];

const perguntas = [
  'Como a cruz se relaciona com a sabedoria de Deus em 1 Corintios 1-2?',
  'Por que Paulo usa o exemplo de Cristo humilhado para combater as divisoes em Corinto?',
  'Como 1 Corintios 6:19-20 se aplica a problemas éticos contemporâneos?',
  'Qual a diférença entre a "liberdade" de 1 Corintios 8 é o "escandalo" de 1 Corintios 8?',
  'Como 1 Corintios 13 transforma nossa compreensão de amor?',
  'Por que Paulo insiste que os dons espirituais sem amor são inúteis?',
  'Como 1 Corintios 15 responde ao ceticismo sobre a ressurreição corporal?',
  'Qual a mensagem mais importante de 1 Corintios para a igreja hoje?',
  'Como as divisoes em Corinto (1:10-17) se espelham na igreja contemporânea?',
  'O que a analogia da semente (15:36-38) nos ensina sobre o corpo ressurrecto?',
  'Como a ordem no culto (caps. 11-14) se aplica à adoração da igreja hoje?',
  'O que 1 Corintios 6:11 ("mas fostes lavados") nos ensina sobre identidade cristã?',
];

export default function PrimeiraCorintiosPage() {
  const [seçãoAtiva, setSecaoAtiva] = useState('intro');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/estudos" className="hover:text-primary transition-colors">Estudos</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">1 Corintios</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Primeira Epistola aos Corintios</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Paulo, Apostolo</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~53-55 d.C., Eféso</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Epistola Pastoral</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Novo Testamento</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8 sticky top-20 z-10 bg-background/80 backdrop-blur-lg py-3 -mx-6 px-6">
              {secoes.map((s) => (
                <button key={s.id} onClick={() => setSecaoAtiva(s.id)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${seçãoAtiva === s.id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground border border-border/60 hover:border-border'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {seçãoAtiva === 'intro' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />Introdução a 1 Corintios
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    1 Corintios é uma carta de Paulo a uma igreja problemática mas genuinamente cristã em Corinto, uma cidade portuária grega decadente e multicultural. Paulo fundou a igreja em sua segunda viagem missionaria (Atos 18) e passou 18 meses ali. Depois de partir, recebeu noticias preocupantes: divisoes, imoralidade, confusão no culto, e duvidas sobre a ressurreição.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    A carta responde a perguntas que a igreja lhe fez por escrito (7:1) e corrige problemas que não perguntou. E uma das epistolas mais praticas do NT — aborda divórcio, celibato, comida sacrificada, dons espirituais, amor, ressurreição, adoração, e muito mais. O tema central é a cruz de Cristo como sabedoria de Deus para uma igreja fragmentada.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Contexto Historico</h3>
                      <p className="text-sm text-muted-foreground">Corinto era uma cidade próspera, portuária, famosa por seu templo de Afrodite e por imoralidade generalizada. A igreja refletia muitos dos problemas culturais: divórcio, idolatria, litigios, abuso de liberdade, e confusão no culto.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Problemas da Igreja</h3>
                      <p className="text-sm text-muted-foreground">Divisoes por facções (1-4), imoralidade (5-6), divórcio (7), idolatria (8-10), desordem no culto (11-14), negacao da ressurreição (15). Paulo aborda tudo com firmeza e amor pastoral.</p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'estrutura' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />Estrutura da Epistola
                </h2>
                <div className="space-y-4">
                  {estrutura.map((p, i) => (
                    <div key={i} className={`sola-card p-5 border-l-4 ${p.cor} ${p.bg}`}>
                      <h3 className="font-display text-lg font-medium mb-3">{p.parte}</h3>
                      <ul className="space-y-2">
                        {p.itens.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'versiculos' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />Versículos-Chave com Comentario de Teologos
                </h2>
                <div className="space-y-6">
                  {versiculosChave.map((v, i) => (
                    <VersiculoCard key={i} versiculo={v} />
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'amor' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />1 Corintios 13: O Hino do Amor
                </h2>
                <p className="text-muted-foreground mb-4">Capitulo 13 é o coração de toda a epistola. Paulo o insere entre os caps. 12 e 14 (dons espirituais) como o criterio supremo: sem amor, os dons são inúteis. E a definição mais completa e bela de amor na literátura mundial.</p>
                <div className="space-y-3">
                  {amor13.map((a, i) => (
                    <div key={i} className="sola-card p-4">
                      <p className="text-xs font-semibold text-primary mb-1">{a.verso}</p>
                      <p className="text-sm italic text-muted-foreground mb-2 font-serif-body">&ldquo;{a.texto}&rdquo;</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.explicação}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'ressurreição' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />1 Corintios 15: A Ressurreicao
                </h2>
                <p className="text-muted-foreground mb-4">Capitulo 15 é a discussão mais completa sobre a ressurreição no NT. Alguns corintios negavam a ressurreição dos mortos (15:12). Paulo responde com firmeza: sem ressurreição, a fé e vã.</p>
                <div className="space-y-4">
                  {ressurreição.map((r, i) => (
                    <div key={i} className="sola-card p-5 border-l-4 border-green-500">
                      <h3 className="font-display text-lg font-medium mb-2">{r.título}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{r.texto}</p>
                      <div className="p-2 rounded-lg bg-green-500/5 border border-green-500/10">
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium italic">&ldquo;{r.teologo}&rdquo;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'temas' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />Temas Centrais
                </h2>
                <div className="space-y-4">
                  {temasCentrais.map((t, i) => (
                    <div key={i} className="glass-card p-5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <t.icone className={`w-5 h-5 ${t.cor}`} />
                        <h3 className="font-display text-lg font-medium">{t.título}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.descricao}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'aplicação' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />Aplicação Pratica
                </h2>
                <div className="sola-card p-6 border-l-4 border-primary">
                  <ul className="space-y-3">
                    {aplicações.map((a, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'perguntas' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />Perguntas de Estudo
                </h2>
                <div className="sola-card p-6">
                  <ol className="space-y-4">
                    {perguntas.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm leading-relaxed pt-1">{p}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <Link href="/estudos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />Todos os Estudos
              </Link>
              <Link href="/biblia" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                Ir para a Biblia<ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function VersiculoCard({ versiculo }: { versiculo: { referência: string; texto: string; explicação: string; comentarios: { teologo: string; texto: string }[] } }) {
  const [expandido, setExpandido] = useState(false);
  return (
    <motion.div layout className="sola-card overflow-hidden">
      <div className="p-5 cursor-pointer" onClick={() => setExpandido(!expandido)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-medium text-primary mb-1">{versiculo.referência}</p>
            <p className="text-sm italic leading-relaxed font-serif-body">&ldquo;{versiculo.texto}&rdquo;</p>
          </div>
          <motion.div animate={{ rotate: expandido ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {expandido && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-border/50 pt-3 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{versiculo.explicação}</p>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Comentarios de Teologos</p>
                {versiculo.comentarios.map((c, i) => (
                  <div key={i} className="glass-card p-4 rounded-xl">
                    <p className="text-xs font-semibold text-foreground mb-1">{c.teologo}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{c.texto}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
