'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
  Sparkles,
  Heart,
  AlertTriangle,
  Crown,
  Shield,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'resumo', label: 'Resumo por Capitulo' },
  { id: 'versiculos', label: 'Versiculos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'aplicacao', label: 'Aplicacao' },
  { id: 'perguntas', label: 'Perguntas' },
];

const capitulos = [
  { cap: 1, titulo: 'A revelacao da ira de Deus', resumo: 'Paulo introduz o tema da ira divina contra toda imoralidade e idolatria. Os gentios estao sem desculpa, pois conhecem Deus pela criacao.' },
  { cap: 2, titulo: 'O julgamento justo de Deus', resumo: 'Nenhum ser humano esta isento de julgamento. Tanto judeus quanto gentios serao julgados conforme as suas obras, nao pela simples posse da Lei.' },
  { cap: 3, titulo: 'Todos sob pecado e a justificacao pela fe', resumo: 'Paulo prova que todos, judeus e gentios, estao sob pecado. A justica de Deus e revelada mediante a fe em Cristo Jesus, por meio do resgate na cruz.' },
  { cap: 4, titulo: 'Abraao como exemplo de fe', resumo: 'Abraao foi justificado pela fe, nao pelas obras da Lei. A promessa e herdada pela fe, garantindo que todos os que creem, judeus ou gentios, sao filhos de Abraao.' },
  { cap: 5, titulo: 'Resultados da justificacao', resumo: 'Justificados pela fe, temos paz com Deus, acesso a graça e a esperanca da gloria. A graça de Deus supera abundantemente o pecado de Adao.' },
  { cap: 6, titulo: 'Mortos para o pecado, vivos para Cristo', resumo: 'Paulo responde ao erro de que a graça estimula o pecado. Batizados em Cristo, fomos mortos com Ele e ressuscitamos para uma nova vida, livres da escravidao do pecado.' },
  { cap: 7, titulo: 'A luta contra o pecado na Lei', resumo: 'Paulo descreve o conflito interior entre a carne e a Lei. A Lei e boa, mas o pecado habita na carne, trazendo conflito e dependencia de Cristo.' },
  { cap: 8, titulo: 'A vida no Esprito Santo', resumo: 'Nenhuma condenacao para os que estao em Cristo Jesus. O Esprito Santo liberta, sela e intercede. Nada nos separara do amor de Deus.' },
  { cap: 9, titulo: 'A soberania de Deus sobre Israel', resumo: 'Paulo lamenta a incredulidade de Israel, mas explica que a eleição nao depende de descendencia carnal, mas da promessa e da misericordia de Deus.' },
  { cap: 10, titulo: 'A salvacao de Israel', resumo: 'Israel buscou justica pela Lei e nao a alcançou. A justica pela fe e acessivel a todos que confessarem Jesus como Senhor e cremerem na Sua ressurreicao.' },
  { cap: 11, titulo: 'O futuro de Israel', resumo: 'Deus nao rejeitou Israel totalmente. O restante eleito pela graça garante a continuidade da aliança. Um dia todo Israel sera salvo.' },
  { cap: 12, titulo: 'Vida cristã praticas', resumo: 'Exortacao a apresentar o corpo como sacrificio vivo. Servir com dons, amar sem hipocrisia, abencoar os que perseguem, superar o mal com o bem.' },
  { cap: 13, titulo: 'Submissao as autoridades', resumo: 'A submissao as autoridades civis e um dever cristao. O amor cumpre a Lei. Vivamos decentemente, como na luz do dia.' },
  { cap: 14, titulo: 'Consciencia e liberdade', resumo: 'O crente forte e o fraco devem se aceitar mutuamente. Nao devemos colocar obstaculo pela comida ou bebida. O reino de Deus nao e comida nem bebida.' },
  { cap: 15, titulo: 'Unidade e plano de Paulo', resumo: 'Paulo exorta a aceitar o fraco, a glorificar Deus juntos. Anuncia seu plano de ir a Roma e depois a Hispânia.' },
  { cap: 16, titulo: 'Saudacoes e avisos', resumo: 'Paulo envia saudacoes a muitos crentes em Roma e alerta contra falsos mestres. Conclui com uma doxologia grandiosa.' },
];

const versiculosChave = [
  { referencia: 'Romanos 1:16-17', texto: 'Porque nao me envergonho do evangelho, porque e o poder de Deus para salvacao de todo aquele que cree, tanto do judeu primeiro como do grego. Porque nele se revela a justica de Deus de fe em fe, como esta escrito: O justo vivera pela fe.', explicacao: 'Tema central de Romanos: o evangelho e o poder de Deus para salvacao. A justica divina e revelada pela fe, nao pelas obras humanas. Paulo declara sua confianca inabalavel na mensagem do evangelho.' },
  { referencia: 'Romanos 3:21-26', texto: 'Mas, agora, sem intervencao da Lei, se manifestou a justica de Deus, testificada pela Lei e pelos Profetas; a justica de Deus pela fe em Jesus Cristo para todos os que creem. Porque todos pecaram e destituuidos estao da gloria de Deus, sendo justificados gratuitamente pela sua graça, por meio da redenção que ha em Cristo Jesus.', explicacao: 'O coracao teologico de Romanos. A justica de Deus e aparte da Lei, manifesta em Cristo. Todos pecaram, mas a justificacao e um presente gratuito da graça divina, obtida pelo sacrificio de Cristo.' },
  { referencia: 'Romanos 5:1-11', texto: 'Justificados, pois, pela fe, temos paz com Deus por nosso Senhor Jesus Cristo, por quem tambem tivemos acesso pela fe a esta graça em que estamos firmes e nos gloriamos na esperanca da gloria de Deus. E nao somente isso, mas tambem nos gloriamos nas tribulacoes, porque sabemos que a tribulacao produz a paciencia; e a paciencia, a EXPERIENCIA; e a EXPERIENCIA, a esperanca; e a esperanca nao envergonha, porque o amor de Deus derramado em nosso coracao pelo Esprito Santo que nos foi dado.', explicacao: 'A chains da salvacao: justificacao -> paz -> acesso -> graça -> tribulacao -> paciencia -> EXPERIENCIA -> esperanca -> amor. A obra completa da redencao em Cristo.' },
  { referencia: 'Romanos 6:1-14', texto: 'Que diremos, pois? Permaneceremos no pecado para que a graça abundante? De modo nenhum! Nós, que morremos para o pecado, como viveremos ainda nele? Ou nao sabeis que todos nos que fomos batizados em Cristo Jesus fomos batizados na sua morte? Portanto, fomos sepultados com Ele, mediante o batismo, na morte, para que, como Cristo ressuscitou dos mortos por meio da gloria do Pai, assim tambem nos andemos em novidade de vida.', explicacao: 'A uniao de Cristo com o crente no batismo. Morremos com Cristo para o pecado e ressuscitamos para uma nova vida. O crente nao pode continuar no pecado porque ja morreu para ele.' },
  { referencia: 'Romanos 8:1-4', texto: 'Portanto, agora nenhuma ha condenacao para os que estao em Cristo Jesus. Porque a lei do Esprito de vida, em Cristo Jesus, me livrou da lei do pecado e da morte. Porque o que era impossivel a Lei, uma vez que era fraca pela carne, Deus o fez: enviando o seu proprio Filho em semelhaca de carne pecadora, e como oferta pelo pecado, condenou o pecado na carne, para que a justica da Lei se cumprisse em nos, que andamos nao segundo a carne, mas segundo o Esprito.', explicacao: 'A seguranca absoluta do crente: nenhuma condenacao. O Esprito liberta da lei do pecado. Cristo cumpriu o que a Lei nao podia, e agora andamos no Esprito.' },
  { referencia: 'Romanos 8:28-30', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que sao chamados pro seu proposito. Porque aos que de antemao conheceu, tambem os predestinou para serem conformes a imagem de seu Filho, para que Ele seja o primogenito entre muitos irmaos. E aos que predestinou, tambem chamou; e aos que chamou, tambem justificou; e aos que justificou, tambem glorificou.', explicacao: 'A cadeia da salvação divina: presciencia -> predestinacao -> chamado -> justificacao -> glorificacao. Deus trabalha todas as coisas para o bem dos que O amam.' },
  { referencia: 'Romanos 8:35-39', texto: 'Quem nos separara do amor de Cristo? A tribulacao, ou a angustia, ou a perseguiçao, ou a fome, ou a nudez, ou o perigo, ou a espada? Como esta escrito: Por teu causa somos mortos o dia todo; somos considerados como ovelhas para o matadouro. Mas em todas estas coisas somos mais do que vencedores, por aquele que nos amou. Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem os poderes, nem o presente, nem o porvir, nem a altura, nem a profundidade, nem alguma outra criatura nos poderao separar do amor de Deus, que esta em Cristo Jesus nosso Senhor.', explicacao: 'O hino triunfal da Igreja. Nada pode separar o crente do amor de Cristo. A seguranca eterna e garantida pelo amor inabalavel de Deus.' },
  { referencia: 'Romanos 12:1-2', texto: 'Rogo-vos, pois, irmaos, pelas misericordias de Deus, que presentais os vossos corpos em sacrificio vivo e santo, agradavel a Deus, que e o vosso culto racional. E nao vos conformeis com este mundo, mas transformai-vos pela renovacao do vosso entendimento, para que experimenteis qual seja a boa, agradavel e perfeita vontade de Deus.', explicacao: 'A transicao de doutrina para pratica. A vida cristã e um sacrificio vivo de adoracao. A transformacao vem pela renovacao da mente, nao pela conformidade com o mundo.' },
];

const temasCentrais = [
  { titulo: 'Justificacao pela Fe', icone: Shield, cor: 'text-blue-500', descricao: 'O homem e declarado justo diante de Deus unica e exclusivamente pela fe em Jesus Cristo, nao pelas obras da Lei. Esta e a doutrina que马丁·路德 desenterrou nas Escrituras, reformando a Igreja.' },
  { titulo: 'A Graça de Deus', icone: Heart, cor: 'text-red-500', descricao: 'A graça e o fundamento de toda a salvacao. Deus nos ama, nos chama e nos salva por pura graça, nao por merecimento humano. A graça e suficiente, superabundante e transformadora.' },
  { titulo: 'Vida no Esprito', icone: Sparkles, cor: 'text-purple-500', descricao: 'O crente recebe o Esprito Santo como selo, guia e intercessor. A vida cristã e vivida no Esprito, que produce frutos de santidade e nos liberta da escravidao do pecado.' },
  { titulo: 'Soberania de Deus', icone: Crown, cor: 'text-amber-500', descricao: 'Deus e soberano sobre Israel, sobre as nações e sobre a historia. Sua soberania nao anula a responsabilidade humana, mas garante o cumprimento dos Seus propositos eternos.' },
  { titulo: 'Uniao com Cristo', icone: BookOpen, cor: 'text-green-500', descricao: 'O crente esta em Cristo e participa da morte, sepultamento e ressurreicao dEle. Esta uniao e o fundamento da justificacao, santificacao e glorificacao.' },
  { titulo: 'Seguranca Eterna', icone: Shield, cor: 'text-gold', descricao: 'Nada pode separar o crente do amor de Deus em Cristo Jesus. A salvacao e garantida por Deus mesmo, que predestinou, chamou, justificou e glorificou os Seus.' },
];

const aplicacoes = [
  'Viva na certeza de que nenhuma ha condenacao para voce em Cristo Jesus.',
  'Apresente o seu corpo como sacrificio vivo a Deus — isso e adoracao autentica.',
  'Nao se conforme com o mundo; permita que a renovacao da sua mente transforme a sua vida.',
  'Use os seus dons para servir a igreja, cada um conforme o don que recebeu.',
  'Ame sem hipocrisia; abençoe os que vos perseguem; nao vencais o mal com o mal.',
  'Aceite o crente fraco sem julgar; o reino de Deus nao e sobre comida ou bebida.',
  'Tenha paz: todas as coisas contribuem para o bem dos que amam a Deus.',
  'Declare Jesus como Senhor e creia na Sua ressurreicao — isso e o caminho da salvacao.',
];

const perguntas = [
  'Qual a diferenca entre justificacao e santificacao conforme Romanos?',
  'Como a historia de Abraao (Rm 4) demonstra que a fe sempre esteve no centro do plano de Deus?',
  'O que significa que "a graça abundou pelo pecado" (Rm 5:20)?',
  'De que forma a uniao com Cristo no batismo (Rm 6) muda a forma como vivemos?',
  'Como o capitulo 8 de Romanos pode ser um apoio em momentos de desespero?',
  'O que a secao sobre Israel (Rms 9-11) nos ensina sobre a soberania e misericordia de Deus?',
  'Como aplicar Romanos 12:1-2 na pratica do dia a dia?',
  'De que maneira a armadura espiritual (Ef 6) se relaciona com a guerra descrita em Romanos?',
];

export default function RomanosPage() {
  const [secaoAtiva, setSecaoAtiva] = useState('intro');
  const [capituloExpandido, setCapituloExpandido] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/estudos" className="hover:text-primary transition-colors">Estudos</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Romanos</span>
            </div>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Epistola aos Romanos</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Paulo, Apostolo</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~57 d.C., Corinto</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Epistola Paulina</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Novo Testamento</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8 sticky top-20 z-10 bg-background/80 backdrop-blur-lg py-3 -mx-6 px-6">
              {secoes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSecaoAtiva(s.id)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    secaoAtiva === s.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground border border-border/60 hover:border-border'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Secao: Introducao */}
          {secaoAtiva === 'intro' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Introducao a Epistola aos Romanos
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    A Epistola aos Romanos e amplamente considerada a mais importante e sistematica das cartas paulinas. Escrita por Paulo por volta de 57 d.C. durante sua terceira viagem missionaria, provavelmente em Corinto, a carta foi dirigida a uma igreja que Paulo ainda nao havia visitado pessoalmente.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Paulo escreveu aos crentes em Roma — uma comunidade mista de judeus e gentios — com o proposito de apresentar o evangelho de forma completa e sistematica, preparando o terreno para sua visita e eventual missao ate a Hispânia (Espanha romana).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />Autor
                      </h3>
                      <p className="text-sm text-muted-foreground">Paulo, o Apostolo dos gentios, ex-fariseu perseguidor convertido pelo Cristo ressurreto. Identifica-se como servo de Cristo Jesus, apartado para o evangelho de Deus.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />Data e Local
                      </h3>
                      <p className="text-sm text-muted-foreground">Escrita por volta de 57 d.C. durante a terceira viagem missionaria, provavelmente em Corinto. Paulo estava a caminho de Jerusalém com ofertas para a igreja pobre.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />Destinatarios
                      </h3>
                      <p className="text-sm text-muted-foreground">A igreja em Roma, composta de judeus e gentios convertidos. Uma comunidade que Paulo nao fundou, mas que desejava visitar para fortalece-los e ser fortalecido por eles.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />Proposito
                      </h3>
                      <p className="text-sm text-muted-foreground">Apresentar o evangelho de forma completa e sistematica, resolver tensões entre judeus e gentios na igreja, e preparar o terreno para a missão paulina a Hispânia.</p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* Secao: Estrutura */}
          {secaoAtiva === 'estrutura' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Estrutura da Epistola
                </h2>
                <div className="space-y-4">
                  {[
                    { parte: 'Parte I: Doutrina (Caps. 1-8)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: ['Caps. 1-3: O problema do pecado — Todos estao sob julgamento', 'Caps. 3-5: A solucao da justificacao — Justificados pela fe', 'Caps. 6-8: A vida no Esprito — Libertacao e seguranca'] },
                    { parte: 'Parte II: Israel (Caps. 9-11)', cor: 'border-amber-500', bg: 'bg-amber-500/5', itens: ['Cap. 9: A soberania de Deus sobre Israel', 'Cap. 10: A responsabilidade de Israel', 'Cap. 11: O futuro de Israel — Todo Israel sera salvo'] },
                    { parte: 'Parte III: Pratica (Caps. 12-15)', cor: 'border-green-500', bg: 'bg-green-500/5', itens: ['Cap. 12: Vida cristã — Sacrificio vivo e dons', 'Cap. 13: Submissao as autoridades', 'Caps. 14-15: Unidade e aceitacao do fraco'] },
                    { parte: 'Parte IV: Epistola (Cap. 16)', cor: 'border-purple-500', bg: 'bg-purple-500/5', itens: ['Saudacoes pessoais a lideres da igreja', 'Avisos contra falsos mestres', 'Doxologia final gloriosa'] },
                  ].map((p, i) => (
                    <div key={i} className={`sola-card p-5 border-l-4 ${p.cor} ${p.bg}`}>
                      <h3 className="font-display text-lg font-medium mb-3">{p.parte}</h3>
                      <ul className="space-y-2">
                        {p.itens.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* Secao: Resumo por Capitulo */}
          {secaoAtiva === 'resumo' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Resumo dos 16 Capitulos
                </h2>
                <div className="space-y-2">
                  {capitulos.map((c) => (
                    <motion.div key={c.cap} layout className="sola-card overflow-hidden">
                      <div
                        className="p-4 cursor-pointer flex items-center gap-3"
                        onClick={() => setCapituloExpandido(capituloExpandido === c.cap ? null : c.cap)}
                      >
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0">{c.cap}</span>
                        <span className="font-display text-sm font-medium flex-1">{c.titulo}</span>
                        <motion.div animate={{ rotate: capituloExpandido === c.cap ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {capituloExpandido === c.cap && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="px-4 pb-4 border-t border-border/50 pt-3">
                              <p className="text-sm text-muted-foreground leading-relaxed">{c.resumo}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* Secao: Versiculos-Chave */}
          {secaoAtiva === 'versiculos' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />
                  Versiculos-Chave com Comentario
                </h2>
                <div className="space-y-4">
                  {versiculosChave.map((v, i) => (
                    <VersiculoCard key={i} versiculo={v} />
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* Secao: Temas Centrais */}
          {secaoAtiva === 'temas' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Temas Centrais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Secao: Aplicacao */}
          {secaoAtiva === 'aplicacao' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Aplicacao Pratica
                </h2>
                <div className="sola-card p-6 border-l-4 border-primary">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Romanos nao e apenas um tratado teologico — e uma carta pastoral que transforma vidas. As verdades doutrinarias devem se converter em pratica diaria:
                  </p>
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

          {/* Secao: Perguntas */}
          {secaoAtiva === 'perguntas' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Perguntas de Estudo
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

          {/* Navegacao */}
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

function VersiculoCard({ versiculo }: { versiculo: { referencia: string; texto: string; explicacao: string } }) {
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
            <div className="px-5 pb-5 border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{versiculo.explicacao}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
