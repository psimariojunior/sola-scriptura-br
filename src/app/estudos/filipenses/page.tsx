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
  Heart, Smile, Star, BookMarked, Sparkles,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'versiculos', label: 'Versiculos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'hino', label: 'Hino Cristologico' },
  { id: 'aplicacao', label: 'Aplicacao' },
  { id: 'perguntas', label: 'Perguntas' },
];

const estrutura = [
  { parte: 'Parte I: Relacao Pessoal (Caps. 1-2)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Cap. 1: Agradecimento e oracao — Paulo preso, mas alegre; o evangelho avanca mesmo na prisao',
    'Cap. 2: Exortacao a unidade — o Hino Cristologico (2:5-11) como fundamento da humildade',
  ]},
  { parte: 'Parte II: Instrucao Pratica (Caps. 3-4)', cor: 'border-green-500', bg: 'bg-green-500/5', itens: [
    'Cap. 3: Perseguir a Cristo — contar tudo como perda, connaece-lo na ressurreicao',
    'Cap. 4: Instrucoes finais — contentamento, paz de Deus, fortalecer-se no Senhor',
  ]},
];

const versiculosChave = [
  {
    referencia: 'Filipenses 1:6',
    texto: 'Estou certo de que aquele que em vós começo a boa obra a consumara ate ao dia de Cristo Jesus.',
    explicacao: 'Deus e o autor e consumador da obra de salvacao. O que Ele comeca, termina. Essa certeza da perseveranca e fundamento para a alegria de Paulo na prisao. O processo de santificacao e garantido pela fidelidade divina.',
    comentarios: [
      { teologo: 'D.A. Carson', texto: 'Paulo nao tem duvidas sobre o resultado final da obra de Deus. A certeza nao esta em nos mesmos, mas na fidelidade de Deus que comeca e completa. Isso nao anula a responsabilidade humana, mas a sustenta com a garantia divina.' },
      { teologo: 'John Stott', texto: 'A boa obra de Deus inclui tanto a justificacao inicial quanto a santificacao continuada e a glorificacao futura. E um processo integral que Deus supervisiona do principio ao fim.' },
    ],
  },
  {
    referencia: 'Filipenses 2:5-11',
    texto: 'De sorte que havendo em vos o mesmo sentimento que houve tambem em Cristo Jesus, que, sendo em forma de Deus, nao teve por ususrpacao ser igual a Deus, mas esvaziou-se a si mesmo, tomando a forma de servo, fazendo-se semelhante aos homens; e, achado em figura de homem, humilhou a si mesmo, sendo obediente ate a morte, e morte de cruz. Pelo que Deus tambem o exaltou soberanamente, e lhe deu um nome que e sobre todo nome, para que em nome de Jesus se dobre todo joelho dos que estao nos ceus, e na terra, e debaixo da terra, e toda lingua confesse que Jesus Cristo e o Senhor, para gloria de Deus Pai.',
    explicacao: 'Este e o mais elevado texto cristologico do Novo Testamento. Descreve a kenosis (esvaziamento) voluntaria de Cristo: de Deus, servo; de senhor, obediente; de gloria, cruz. A exaltacao subsequente e a consequencia da humildade perfeita.',
    comentarios: [
      { teologo: 'Atanasio de Alexandria', texto: 'Cristo nao deixou de ser Deus ao se fazer homem. A kenosis nao e uma diminuicao da divindade, mas um acréscimo da humanidade. Ele tomou o que nao era (servo) sem perder o que era (Deus). A dois naturezas permanecem intactas na pessoa de Cristo.' },
      { teologo: 'Karl Barth', texto: 'O himno cristologico de Filipenses 2 e a chave para toda a teologia paulina. A humildade de Cristo e o paradigma da relacao entre Deus e humanidade. Deus nao se impoe, mas se doa. A cruz e o climax da revelacao divina: Deus como servo.' },
      { teologo: 'Jurgen Moltmann', texto: 'A kenosis de Cristo revela um Deus que sofre pelo mundo. A cruz nao e apenas um ato de obediencia, mas o sofrimento de Deus na historia. O Deus crucificado e o unico Deus que pode salvar um mundo crucificado.' },
      { teologo: 'N.T. Wright', texto: 'A exaltacao de Jesus (2:9-11) nao e apenas espiritual, mas cosmica. Todo joelho se dobra — ceus, terra, debaixo da terra. Jesus e Senhor sobre toda a realidade. Isso implica que Cesar nao e senhor. O hino e subversivo politicamente.' },
    ],
  },
  {
    referencia: 'Filipenses 4:6-7',
    texto: 'Nao vos preocupeis com nada, mas em tudo sejam conhecidas as vossas peticoes diante de Deus, em oracao e suplica, com acoes de graças. E a paz de Deus, que sobrepuja todo entendimento, guardara os vossos coracoes e os vossos pensamentos em Cristo Jesus.',
    explicacao: 'Paulo ensina um padrao de oracao: em vez de ansiedade, oracao com agradecimento. A paz de Deus e sobrenatural — protege o coracao e a mente. Nao e ausencia de problemas, mas presenca de Deus no meio deles.',
    comentarios: [
      { teologo: 'Dietrich Bonhoeffer', texto: 'A oracao de acoes de graças e o antitodo para a ansiedade. Quem agradece nao se preocupa, porque reconhece que Deus ja agiu. A paz de Deus nao e compreensivel racionalmente — ela guardara os pensamentos como uma guarnicao divina.' },
      { teologo: 'R.C. Sproul', texto: 'A instrucao de Paulo nao e sentimental, mas imperativa: "nao vos preocupeis" e um comando. A oracao e a ferramenta que torna obedece-lo possivel. A paz de Deus e o fruto da obediencia na oracao, nao meramente um sentimento.' },
    ],
  },
  {
    referencia: 'Filipenses 4:13',
    texto: 'Posso todas as coisas naquele que me fortalece.',
    explicacao: 'Este versiculo nao e sobre realizar ambicoes pessoais, mas sobre encontrar contentamento em qualquer circunstancia — abundancia ou escassez. O contexto (4:10-13) fala de contentamento, nao de conquista.',
    comentarios: [
      { teologo: 'John Stott', texto: 'Filipenses 4:13 e um dos versiculos mais mal interpretados da Biblia. Paulo nao esta dizendo que pode alcanar qualquer meta. Ele esta dizendo que aprendeu a contentar-se em toda a situacao — na abundancia e na falta. O "fortalecimento" e para perseverar, nao para conquistar.' },
      { teologo: 'D.A. Carson', texto: 'O contexto imediato e essencial: Paulo aprendeu a contentar-se (4:11-12). O versiculo 4:13 e a explicacao de como ele consegue contentar-se — pela forca de Cristo. Aplica-lo a ganhar competicoes ou conquistas materiais e uma distorcao grave do texto.' },
    ],
  },
];

const temasCentrais = [
  { titulo: 'Alegria na Adversidade', icone: Smile, cor: 'text-yellow-500', descricao: 'A palavra "alegria" ou "gozo" aparece 16 vezes em 4 epistolas. Em Filipenses, Paulo esta preso, ameacado de morte, e mesmo assim exulta. A alegria cristã nao depende de circunstancias, mas de Cristo. A frase-chave: "Alegrai-vos sempre no Senhor" (4:4). A alegria de Paulo nao e otimismo superficial, mas certeza profunda de que Deus esta no controle.' },
  { titulo: 'Humildade de Cristo', icone: Heart, cor: 'text-red-500', descricao: 'O Hino Cristologico (2:5-11) e o coracao teologico de Filipenses. Cristo se esvaziou, servo, morreu na cruz. A humildade divina e o modelo para a humildade humana. Quem conhece a humildade de Cristo se humilha diante dos irmaos. A kenosis nao e perda de divindade, mas aquisicao de humanidade — Cristo tomou o que nao era sem perder o que era.' },
  { titulo: 'Contentamento', icone: Star, cor: 'text-green-500', descricao: 'Paulo aprendeu a contentar-se em toda a situacao (4:11-12). O contentamento nao e conformismo, mas confianca de que Cristo basta em qualquer circunstancia. E um dos frutos maduros do evangelho na vida do crente. Paulo testemunha que ja esteve na abundancia e na falta — e em ambos aprendeu o segredo do contentamento.' },
  { titulo: 'Unidade na Igreja', icone: BookMarked, cor: 'text-purple-500', descricao: 'Paulo exorta Evodia e Sintique a concordarem no Senhor (4:2). A unidade da igreja e mais importante que razoes pessoais. O fundamento da unidade e a humildade cristologica (2:1-11). Cristo e o modelo e o mantenedor da unidade. A unidade nao exige uniformidade, mas amor que prioriza o Reino acima de preferencias pessoais.' },
  { titulo: 'A Proclamacao do Evangelho', icone: Sparkles, cor: 'text-blue-500', descricao: 'Paulo esta preso, mas o evangelho avanca (1:12-14). Até os pretorianos (soldados da guarda imperial) conhecem Cristo (4:22). A prisao nao impede o evangelho — pelo contrario, a torna mais poderosa. A cadeia de Paulo se torna púlpito para o império.' },
  { titulo: 'A Corrida Cristã', icone: Target, cor: 'text-orange-500', descricao: 'Paulo compara a vida cristã com uma corrida (3:12-14): "Esquecendo-me das coisas que ficam para tras e me estendendo as que estao diante de mim, prossigo para o alvo." O cristão nao pode se acomodar — há sempre mais para conhecer de Cristo.' },
];

const hinoDetalhes = [
  { verso: 'Fase 1: Pre-existencia', referencia: '2:6', descricao: 'Cristo existia em forma de Deus — nao era uma copia, mas a propria expressao da divindade. Nao usurpou igualdade com Deus, porque ja a possuia. A forma de Deus (morphe) indica a realidade essencial da divindade, nao meramente aparência.', teologo: 'Athanasius: "Cristo nao era inferior ao Pai, mas era igual em substancia e eternidade. A forma de Deus e a propria essencia divina"' },
  { verso: 'Fase 2: Kenosis (Esvaziamento)', referencia: '2:7', descricao: 'Cristo se esvaziou — nao de divindade, mas de privilegios. Tomou forma de servo, nasceu de mulher, viveu como homem comum. A majestade se escondeu na humildade. O esvaziamento e a escolha divina de se limitar à humanidade.', teologo: 'Barth: "O esvaziamento e o ato supremo de liberdade divina: Deus escolhe ser servo. Nao ha perda de divindade, mas aquisição de humanidade"' },
  { verso: 'Fase 3: Encarnacao', referencia: '2:7-8', descricao: 'Fez-se semelhante aos homens. Achado em figura de homem, humilhou-se ate a morte, morte de cruz. A encarnacao culmina na cruz — o ponto mais baixo da historia humana. A morte de cruz era a forma mais vergonhosa de morrer no mundo antigo.', teologo: 'Moltmann: "A cruz e o lugar onde Deus se identifica completamente com os abandonados. O Deus crucificado é o único Deus que pode salvar um mundo crucificado"' },
  { verso: 'Fase 4: Exaltacao', referencia: '2:9-11', descricao: 'Pelo que Deus o exaltou soberanamente. O nome que e sobre todo nome — Senhor (Kyrios). Todo joelho se dobra, toda lingua confessa. A humildade e recompensada pela exaltacao cosmica. Isso implica que Cesar não é senhor — Jesus é.', teologo: 'Wright: "Jesus e Senhor — isso implica que Cesar e apenas um imperador temporario. O hino e subversivo politicamente"' },
  { verso: 'Fase 5: Apliçação Pratica', referencia: '2:1-5', descricao: 'Paulo aplica a kenosis à vida da igreja: tenham o mesmo sentimento, nao façam nada por rivalidade, considerem os outros superiores. A cristologia nao e abstrata — ela se traduz em humildade prática nas relações.', teologo: 'Fee: "A kenosis de Cristo nao e uma doutrina abstrata, mas um paradigm para a vida da comunidade. A unidade da igreja depende da humildade cristologica"' },
];

const aplicacoes = [
  'Alegrai-vos sempre no Senhor — a alegria cristã e uma escolha baseada na verdade, nao na emocao.',
  'Humilhai-vos como Cristo se humilhou — a unidade da igreja exige morte ao orgulho pessoal.',
  'Aprendam a contentar-se — Cristo basta em toda circunstancia, na abundancia e na falta.',
  'Orai com agradecimento em vez de se preocupar — a paz de Deus guardara vosso coracao.',
  'Fazei tudo sem murmuracoes — a ingratidao destrói o testemunho cristão.',
  'Amai-se uns aos outros com amor espiritual — a unidade da igreja e o maior testemunho ao mundo.',
  'Esforcei-vos pela salvacao com temor e tremor — a salvacao e dom de Deus, mas exige cooperacao humana.',
  'Mantenede a pureza — pensai nas coisas verdadeiras, honestas, justas (4:8).',
  'Vivei como cidadãos do ceu — nossa verdadeira cidadania nao e terrena (3:20).',
  'Busquei conhecer a Cristo cada vez mais — nao e apenas conhecimento intelectual, mas relacional (3:10).',
  'Lembrai-vos de que Deus completara a obra que comecou em vos — essa certeza da perseveranca da fé e fundamento para a esperança (1:6).',
  'Prossiga para o alvo — esqueça-se das coisas que ficam para tras e estenda-se às que estão diante (3:13-14).',
];

const perguntas = [
  'Como Paulo consegue ter alegria na prisao? Qual o segredo?',
  'O que a kenosis de Cristo (2:5-11) nos ensina sobre lideranca e poder?',
  'Como a humildade de Cristo se aplica a relacoes na igreja?',
  'Qual a diferenca entre contentamento biblico e conformismo?',
  'Como a paz de Deus (4:6-7) se manifesta na vida prática?',
  'Por que Paulo menciona Evodia e Sintique na carta? Qual a lição?',
  'Como 4:8 pode transformar nossos pensamentos diários?',
  'De que maneira a oracao e a antitese da ansiedade segundo Paulo?',
  'Como a prisão de Paulo se tornou uma oportunidade para o evangelho avançar?',
  'Qual a relação entre Filipenses 2:5-11 e a unidade da igreja?',
  'O que significa "conhecer a Cristo e a força da sua ressurreição" (3:10)?',
  'Como a corrida cristã de 3:12-14 se aplica à vida espiritual?',
  'Como o exemplo de Paulo nos ensina a ser contentes em qualquer circunstancia?',
  'Qual a diferença entre a "justiça própria" (3:9) e a "justiça que vem de Deus"?',
];

export default function FilipensesPage() {
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
              <span className="text-foreground">Filipenses</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Epistola aos Filipenses</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Paulo, Apostolo</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~60-62 d.C., Roma (prisao)</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Epistola de Agradecimento</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introducao a Epistola aos Filipenses
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Filipenses e uma das quatro epistolas prisonais de Paulo, escrita durante sua primeira prisao em Roma (~60-62 d.C.). Diferente de Efesios (circular) e Colossenses (para combater heresias), Filipenses e uma carta pessoal e afetuosa. Paulo escreve a uma igreja que o ama e que o sustentou materialmente durante o ministério.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    O tema central e a alegria em Cristo mesmo nas adversidades. Paulo esta preso, ameacado de morte, mas sua carta transborda de gozo. A palavra "alegria" ou "gozo" aparece 16 vezes. E a carta mais pessoal de Paulo — ele fala de si, de seus sentimentos, de sua experiencia com Cristo.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Contexto Historico</h3>
                      <p className="text-sm text-muted-foreground">A igreja em Filipos foi a primeira igreja fundada por Paulo na Europa (Atos 16). Lydia, a primeira convertida europeia, era de Filipos. A igreja sempre apoiou Paulo materialmente, mesmo quando outras igrejas nao o fizeram (4:15-16).</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">O Propsito da Carta</h3>
                      <p className="text-sm text-muted-foreground">Paulo escreve para agradecer o envio de Epafrodito (4:18), informar sobre sua situacao em Roma, exortar a unidade (4:2-3) e ao contentamento (4:10-13). E uma carta de amor, nao de doutrina polêmica.</p>
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

          {secaoAtiva === 'hino' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />O Hino Cristologico (Filipenses 2:5-11)
                </h2>
                <p className="text-muted-foreground mb-4">Considerado o texto cristologico mais elevado do Novo Testamento, este hino descreve a jornada de Cristo da gloria a humildade e de volta a gloria. Muitos estudiosos acreditam que era um hino liturgico ja existente que Paulo incluiu na carta.</p>
                <div className="space-y-4">
                  {hinoDetalhes.map((h, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{i + 1}</span>
                        <div>
                          <h3 className="font-display text-sm font-medium">{h.verso}</h3>
                          <p className="text-xs text-primary">{h.referencia}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2 ml-11">{h.descricao}</p>
                      <div className="ml-11 p-2 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-xs text-primary font-medium italic">&ldquo;{h.teologo}&rdquo;</p>
                      </div>
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
