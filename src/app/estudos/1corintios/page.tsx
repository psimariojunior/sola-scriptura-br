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
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'versiculos', label: 'Versiculos-Chave' },
  { id: 'amor', label: '1 Cor 13: O Amor' },
  { id: 'ressurreicao', label: '1 Cor 15: Ressurreicao' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'aplicacao', label: 'Aplicacao' },
  { id: 'perguntas', label: 'Perguntas' },
];

const estrutura = [
  { parte: 'Caps. 1-4: Divisoes na Igreja', cor: 'border-red-500', bg: 'bg-red-500/5', itens: [
    'Caps. 1-3: Sabedoria humana vs. sabedoria de Cristo — cruz vs. retórica',
    'Cap. 4: Paulo e Apolos como mordomos, nao donos — Deus dara o crescimento',
  ]},
  { parte: 'Caps. 5-7: Problemas Morales e Praticos', cor: 'border-amber-500', bg: 'bg-amber-500/5', itens: [
    'Cap. 5: Imoralidade sexual — expulsar o immoral da comunidade',
    'Cap. 6: Litigar nos tribunais — os indignos do Reino',
    'Cap. 7: Casamento, celibato, idólatras, comida sacrificada',
  ]},
  { parte: 'Caps. 8-14: Idolatria e Adoracao', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Caps. 8-10: Comida sacrificada aos idolos — liberdade vs. amor ao fraco',
    'Cap. 11: Sobre o papel feminino na adoracao — contexto cultural',
    'Caps. 12-14: Dons espirituais — ordem no culto, o caminho do amor',
  ]},
  { parte: 'Caps. 15-16: Ressurreicao e Conclusao', cor: 'border-green-500', bg: 'bg-green-500/5', itens: [
    'Cap. 15: A ressurreição de Cristo e a dos crentes — fundamento da fé',
    'Cap. 16: Colecção para Jerusalém, despedida — "Vinde, Senhor"',
  ]},
];

const versiculosChave = [
  {
    referencia: '1 Corintios 1:18',
    texto: 'Porque a palavra da cruz e loucura para os que se perdem; mas para os que se salvam, isto e, para nos, e poder de Deus.',
    explicacao: 'A cruz parece loucura ao mundo, mas e o poder de Deus para os salvos. A sabedoria de Deus nao esta na retorica, mas no evangelho da cruz.',
    comentarios: [
      { teologo: 'Richard Hays', texto: 'Paulo subverte os valores culturais de Corinto. Os gregos buscavam sophia (sabedoria filosofica); Paulo aponta para a stauros (cruz) — o simbolo mais humilhante do Imperio Romano. A cruz nao e apenas meio de salvacao, mas paradigma de como Deus age: atraves da fraqueza.' },
      { teologo: 'N.T. Wright', texto: 'A palavra da cruz nao e apenas uma doutrina, mas uma narrativa — a historia de Jesus que transforma o mundo. Paulo nao esta dizendo que a razao e inutil, mas que a sabedoria humana, sem Deus, e insuficiente para a salvacao.' },
    ],
  },
  {
    referencia: '1 Corintios 6:19-20',
    texto: 'Ou nao sabeis que o vosso corpo e templo do Espirito Santo, que esta em vos, e que vos veio de Deus, e vos nao sois de vos mesmos? Porque fostes comprados por certo preco; glorificai, pois, a Deus no vosso corpo e no vosso espirito, que sao de Deus.',
    explicacao: 'O corpo do crente e sagrado — templo do Espirito Santo. A imoralidade sexual destroi esse templo. Fomos comprados pelo sangue de Cristo; pertencemos a Ele.',
    comentarios: [
      { teologo: 'Gordon Fee', texto: 'A metafora do templo e central: em Corinto, os templos dos idolos eram locais de culto e tambem de imoralidade. Paulo diz: o vosso corpo E o templo. A pureza sexual nao e legalismo, mas reverencia ao Espirito que habita em voce.' },
      { teologo: 'Ben Witherington III', texto: 'O argumento de Paulo e cristologico: fostes comprados por preco. A etica sexual nao e arbitraria, mas fundamentada na redencao. Nos nao nos pertencemos — Cristo nos comprou. Isso transforma a compreensao de liberdade.' },
    ],
  },
  {
    referencia: '1 Corintios 12:4-7',
    texto: 'Ora, ha diversidade de dons, mas o mesmo Espirito. E ha diversidade de ministerios, mas o mesmo Senhor. E ha diversidade de operacoes, mas e o mesmo Deus que opera tudo em todos. Mas a cada um e dada a manifestacao do Espirito para utilidade.',
    explicacao: 'A diversidade de dons nao e confusao, mas ordem divina. Um mesmo Deus opera de maneiras diferentes em cada crente. O proposito e a utilidade comum, nao a exibicao individual.',
    comentarios: [
      { teologo: 'Gordon Fee', texto: 'Paulo usa uma estrutura triadica: dons (charismata), ministerios (diakoniai) e operacoes (energemata) — Espirito, Senhor e Deus. A Trindade opera na diversidade da igreja. Isso e anti-sectarismo: ninguem pode dizer que seu dom e mais importante.' },
      { teologo: 'Anthony Thiselton', texto: 'A manifestacao do Espirito para utilidade (12:7) e a frase-chave. O dom nao e para o individuo, mas para a comunidade. Charismata sem comunidade e espiritualidade individualista, que Paulo rejeita veementemente.' },
    ],
  },
];

const amor13 = [
  { verso: '13:1', texto: 'Ainda que eu falasse as linguas dos homens e dos anjos, e nao tivesse amor, seria como o metal que soa ou como o sino que tine.', explicacao: 'O dom mais espetacular (linguagens) sem amor e apenas ruido. A excelencia espiritual sem amor e vaidade.' },
  { verso: '13:2', texto: 'E ainda que tivesse profecia, e entendesse todos os arcanos e toda a ciencia, e ainda que tivesse toda a fe, de maneira tal que transportasse os montes, e nao tivesse amor, nada seria.', explicacao: 'Conhecimento, profecia, fe montanhas-transportadoras — tudo e nada sem amor. A fe sem amor e ortodoxia morta.' },
  { verso: '13:3', texto: 'E ainda que distribuisse todos os meus bens para sustento dos pobres, e ainda que entregasse o meu corpo para ser queimado, e nao tivesse amor, nada me aproveitaria.', explicacao: 'Sacrificio extremo (martirio) sem amor e inutil. O amor nao e o que fazemos, mas a motivacao por tras do que fazemos.' },
  { verso: '13:4-7', texto: 'O amor e sofredor, e benigno; o amor nao e invejoso; o amor nao trata com leviandade, nao se ensoberbece, nao se porta com indecencia, nao busca os seus proprios interesses, nao se irrita, nao suspeita mal; nao se alegra com a injustica, mas se alegra com a verdade; tudo sofre, tudo cre, tudo espera, tudo suporta.', explicacao: 'A definicao mais completa de amor na Biblia. 15 caracteristicas positivas e negativas. E um retrato de Cristo, nao apenas um ideal.' },
  { verso: '13:8-10', texto: 'O amor nunca acaba; mas havendo profecias, acabarao; havendo linguas, cessarao; havendo ciencia, desaparecera. Porque em parte profetizamos, e em parte conhecemos; mas quando vier o que e perfeito, entao o que e em parte desaparecera.', explicacao: 'O amor e eterno; os dons sao temporarios. Quando a perfeicao (Cristo plenamente revelado) vier, os dons cessarao. O amor permanece para sempre.' },
  { verso: '13:11-12', texto: 'Quando eu era menino, falava como menino, pensava como menino, raciocinava como menino; mas, quando cheguei a ser homem, acabei com as coisas de menino. Porque agora vemos por espelho em enigma, mas entao veremos face a face; agora conheco em parte, mas entao conhecerei plenamente, como fui tambem plenamente conhecido.', explicacao: 'Os dons sao como falar de menino — temporarios. A eternidade sera face a face. O conhecimento parcial sera substituido pela visao plena de Deus.' },
  { verso: '13:13', texto: 'Agora, pois, permanecem a fe, a esperanca e o amor, estes tres; mas o maior destes e o amor.', explicacao: 'Na eternidade, a fe sera vista (ja nao esperamos o que vemos) e a esperanca sera realizada. Mas o amor permanecera para sempre. O amor e o maior porque e eterno.' },
];

const ressurreicao = [
  { titulo: 'O Fundamento (15:1-11)', texto: 'Paulo lembra que a ressurreicao de Cristo e o centro do evangelho. Cristo morreu, foi sepultado, ressuscitou no terceiro dia, e apareceu a mais de 500 pessoas. Isso e fato historico, nao mito.', teologo: 'Gary Habermas: "A ressurreicao e o fato mais bem atestado da historia antiga — mais testemunhas que a maioria dos eventos que aceitamos como historicos"' },
  { titulo: 'A Necessidade da Ressurreicao (15:12-19)', texto: 'Se nao ha ressurreicao, Cristo nao ressuscitou. Se Cristo nao ressuscitou, a fe e va, os pecados nao foram perdoados, os mortos em Cristo pereceram. A fe cristã sem ressurreicao e a maior de todas as ilusoes.', teologo: 'N.T. Wright: "Uma cristologia sem ressurreicao e uma contradição — Jesus sem ressurreicao e apenas mais um profeta morto. A ressurreicao e o que torna Jesus o Senhor"' },
  { titulo: 'A Natureza do Corpo Ressurretado (15:35-49)', texto: 'Paulo usa a analogia da semente: o corpo semeado e corrompivel; o colhido e incorruptivel. O corpo natural e de terra (Adao); o corpo espiritual e celestial (Cristo). Nao e o mesmo corpo, mas transformado.', teologo: 'N.T. Wright: "A ressurreicao nao e ir para o ceu quando morremos — e a transformacao do corpo fisico em corpo novo. O mesmo Jesus foi reconhecido pelos discipulos, mas transformado"' },
  { titulo: 'A Vitoria Final (15:50-58)', texto: 'Em um instante, em um olhar, na ultima trombeta — os mortos ressuscitarao incorruptiveis e seremos transformados. A morte e vencida. "O morte, onde esta a tua vitoria?" A vitoria e do Senhor.', teologo: 'Gary Habermas: "1 Corintios 15 e a mais completa explicacao da ressurreicao corporal no NT. Paulo nao fala de imortalidade da alma, mas da transformacao do corpo inteiro — isso e cristao, nao grego"' },
];

const temasCentrais = [
  { titulo: 'Unidade na Diversidade', icone: Users, cor: 'text-blue-500', descricao: 'Corinto era uma igreja cheia de dons, talentos e personalidades — mas fragmentada por faccoes. Paulo insiste: ha um so Deus, um so Senhor, um so Espirito. A diversidade de dons e para a unidade, nao para a divisao.' },
  { titulo: 'A Cruz como Sabedoria', icone: Cross, cor: 'text-red-500', descricao: 'A cruz e o centro de tudo em 1 Corintios. A sabedoria humana busca retorica e poder; Deus escolheu o escandalo da cruz. A fraqueza de Deus e mais forte que os homens. A tolice de Deus e mais sabia que os homens.' },
  { titulo: 'Dons Espirituais e Ordem', icone: Flame, cor: 'text-orange-500', descricao: 'Paulo regulamenta o uso dos dons: tudo deve ser feito com decencia e ordem (14:40). Linguagens sem traducao sao inuteis. A profecia deve ser julgada. O amor e o criterio supremo para o uso dos dons.' },
  { titulo: 'Pureza e Santidade', icone: Shield, cor: 'text-green-500', descricao: 'A imoralidade sexual (cap. 5), idolatria (caps. 8-10) e desordem no culto (caps. 11-14) sao problemas serios em Corinto. Paulo nao minimiza o pecado — a santidade e exigida porque Deus e santo.' },
  { titulo: 'Amor como Criterio', icone: Heart, cor: 'text-pink-500', descricao: '1 Corintios 13 e o coracao de toda a carta. Dons sem amor sao inuteis. Conhecimento sem amor e destruicao. Fe sem amor e va. O amor e o criterio supremo para toda a vida cristã e eclesiastica.' },
];

const aplicacoes = [
  'Busque a sabedoria da cruz, nao a sabedoria do mundo — a cruz e poder de Deus.',
  'Guarde a unidade da igreja — faccoes e divisoes destroem o testemunho cristao.',
  'Purifique o corpo — e templo do Espirito Santo. A imoralidade sexual ofende a Deus.',
  'Use os dons com amor e ordem — nao para exibicao, mas para edificar a comunidade.',
  'Estude 1 Corintios 13 como retrato de Cristo — nao como lista de sentimentos.',
  'Creia na ressurreicao corporal — e o fundamento da fé cristã, sem ela tudo e va.',
  'Pratique a liberdade cristã com amor — nao escandalize o fraco por causa da sua liberdade.',
  'Busque o amor acima de todos os dons — sem amor, nada somos.',
  'Reconheça que o corpo e sagrado — nao e mero recipiente, mas templo do Espirito (6:19).',
  'Mantenha a ordem no culto — decencia e ordem sao marcas da verdadeira adoração (14:40).',
];

const perguntas = [
  'Como a cruz se relaciona com a sabedoria de Deus em 1 Corintios 1-2?',
  'Por que Paulo usa o exemplo de Cristo humilhado para combater as divisoes em Corinto?',
  'Como 1 Corintios 6:19-20 se aplica a problemas éticos contemporâneos?',
  'Qual a diferença entre a "liberdade" de 1 Corintios 8 e o "escandalo" de 1 Corintios 8?',
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
  const [secaoAtiva, setSecaoAtiva] = useState('intro');

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
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~53-55 d.C., Efeso</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Epistola Pastoral</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Novo Testamento</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8 sticky top-20 z-10 bg-background/80 backdrop-blur-lg py-3 -mx-6 px-6">
              {secoes.map((s) => (
                <button key={s.id} onClick={() => setSecaoAtiva(s.id)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${secaoAtiva === s.id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground border border-border/60 hover:border-border'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {secaoAtiva === 'intro' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />Introducao a 1 Corintios
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    1 Corintios e uma carta de Paulo a uma igreja problemática mas genuinamente cristã em Corinto, uma cidade portuária grega decadente e multicultural. Paulo fundou a igreja em sua segunda viagem missionaria (Atos 18) e passou 18 meses ali. Depois de partir, recebeu noticias preocupantes: divisoes, imoralidade, confusao no culto, e duvidas sobre a ressurreicao.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    A carta responde a perguntas que a igreja lhe fez por escrito (7:1) e corrige problemas que nao perguntou. E uma das epistolas mais praticas do NT — aborda divórcio, celibato, comida sacrificada, dons espirituais, amor, ressurreicao, adoracao, e muito mais. O tema central e a cruz de Cristo como sabedoria de Deus para uma igreja fragmentada.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Contexto Historico</h3>
                      <p className="text-sm text-muted-foreground">Corinto era uma cidade próspera, portuária, famosa por seu templo de Afrodite e por imoralidade generalizada. A igreja refletia muitos dos problemas culturais: divórcio, idolatria, litigios, abuso de liberdade, e confusao no culto.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Problemas da Igreja</h3>
                      <p className="text-sm text-muted-foreground">Divisoes por faccoes (1-4), imoralidade (5-6), divórcio (7), idolatria (8-10), desordem no culto (11-14), negacao da ressurreicao (15). Paulo aborda tudo com firmeza e amor pastoral.</p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}

          {secaoAtiva === 'estrutura' && (
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

          {secaoAtiva === 'versiculos' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />Versiculos-Chave com Comentario de Teologos
                </h2>
                <div className="space-y-6">
                  {versiculosChave.map((v, i) => (
                    <VersiculoCard key={i} versiculo={v} />
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {secaoAtiva === 'amor' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />1 Corintios 13: O Hino do Amor
                </h2>
                <p className="text-muted-foreground mb-4">Capitulo 13 e o coracao de toda a epistola. Paulo o insere entre os caps. 12 e 14 (dons espirituais) como o criterio supremo: sem amor, os dons sao inuteis. E a definicao mais completa e bela de amor na literatura mundial.</p>
                <div className="space-y-3">
                  {amor13.map((a, i) => (
                    <div key={i} className="sola-card p-4">
                      <p className="text-xs font-semibold text-primary mb-1">{a.verso}</p>
                      <p className="text-sm italic text-muted-foreground mb-2 font-serif-body">&ldquo;{a.texto}&rdquo;</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.explicacao}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {secaoAtiva === 'ressurreicao' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />1 Corintios 15: A Ressurreicao
                </h2>
                <p className="text-muted-foreground mb-4">Capitulo 15 e a discussao mais completa sobre a ressurreicao no NT. Alguns corintios negavam a ressurreicao dos mortos (15:12). Paulo responde com firmeza: sem ressurreicao, a fé e vã.</p>
                <div className="space-y-4">
                  {ressurreicao.map((r, i) => (
                    <div key={i} className="sola-card p-5 border-l-4 border-green-500">
                      <h3 className="font-display text-lg font-medium mb-2">{r.titulo}</h3>
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

          {secaoAtiva === 'temas' && (
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
                        <h3 className="font-display text-lg font-medium">{t.titulo}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.descricao}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {secaoAtiva === 'aplicacao' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />Aplicacao Pratica
                </h2>
                <div className="sola-card p-6 border-l-4 border-primary">
                  <ul className="space-y-3">
                    {aplicacoes.map((a, i) => (
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

          {secaoAtiva === 'perguntas' && (
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

function VersiculoCard({ versiculo }: { versiculo: { referencia: string; texto: string; explicacao: string; comentarios: { teologo: string; texto: string }[] } }) {
  const [expandido, setExpandido] = useState(false);
  return (
    <motion.div layout className="sola-card overflow-hidden">
      <div className="p-5 cursor-pointer" onClick={() => setExpandido(!expandido)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-medium text-primary mb-1">{versiculo.referencia}</p>
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
              <p className="text-sm text-muted-foreground leading-relaxed">{versiculo.explicacao}</p>
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
