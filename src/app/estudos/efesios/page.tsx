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
  Sparkles, Heart, Shield, Users, Crown,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'versiculos', label: 'Versiculos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'armadura', label: 'Armadura Espiritual' },
  { id: 'aplicacao', label: 'Aplicacao' },
  { id: 'perguntas', label: 'Perguntas' },
];

const estrutura = [
  { parte: 'Parte I: Doutrina (Caps. 1-3)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Cap. 1: As bendicoes espirituais em Cristo — predestinacao, adocao, redencao, selo do Esprito',
    'Cap. 2: De mortos espirituais a vivos em Cristo — a graça que nos salva, unidade na cruz',
    'Cap. 3: O mistério revelado — a Igreja como corpo de Cristo, plenitude de Deus',
  ]},
  { parte: 'Parte II: Pratica (Caps. 4-6)', cor: 'border-green-500', bg: 'bg-green-500/5', itens: [
    'Cap. 4: Unidade e diversidade na Igreja — dons espirituais para edificacao do corpo',
    'Caps. 5-6: Vida cristã praticas — andar na luz, amor conjugal, obediencia filial, guerra espiritual',
  ]},
];

const versiculosChave = [
  { referencia: 'Efésios 1:3-4', texto: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou com toda sorte de bênção espiritual nos lugares celestiais em Cristo. Ele nos escolheu nele antes da fundação do mundo, para sermos santos e irrepreensíveis perante ele.', explicacao: 'Toda a riqueza espiritual ja esta disponivel em Cristo. A eleicao divina e anterior a fundacao do mundo, demonstrando o proposito eterno de Deus para os crentes.' },
  { referencia: 'Efésios 2:8-9', texto: 'Porque pela graça sois salvos, por meio da fé; e isto nao vem de vos mesmos, e dom de Deus; nao vem das obras, para que ninguem se glorie.', explicacao: 'A salvacao e inteiramente pela graça de Deus, recebida pela fe. Nao ha merito humano algum. A graça e um dom gratuito que exclui todo o orgulho.' },
  { referencia: 'Efésios 2:10', texto: 'Porque somos feitura dele, criados em Cristo Jesus para boas obras, as quais Deus preparou de antemao, para que andassemos nelas.', explicacao: 'Apos recebermos a salvacao pela graça, somos criados para boas obras. As obras sao o fruto da salvacao, nao a causa dela. Deus ja preparou o caminho.' },
  { referencia: 'Efésios 3:20', texto: 'Aquele que, segundo o poder que ja opera em nos, e capaz de fazer infinitamente mais do que tudo o que pedimos ou pensamos.', explicacao: 'O poder de Deus opera nos crentes. As promessas de Deus superam nossas expectativas. Podemos ousar sonhar e orar grandemente.' },
  { referencia: 'Efésios 4:1-3', texto: 'Eu, therefore, preso no Senhor, vos rogo que andeis de modo digno da vocacao com que fostes chamados, com toda humildade e mansidao, com longanimidade, suportando-vos uns aos outros em amor, esforcando-vos por preservar a unidade do Esprito pelo vinculo da paz.', explicacao: 'A unidade da Igreja e um dever. Humildade, mansidao, longanimidade e amor sao as qualidades essenciais para a convivencia cristã.' },
  { referencia: 'Efésios 6:10-11', texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder. Revesti-vos de toda a armadura de Deus, para poderdes ficar firmes contra as ciladas do diabo.', explicacao: 'A guerra cristã nao e contra carne e sangue, mas contra espiritos maus. A armadura de Deus e essencial para resistir e vencer.' },
  { referencia: 'Efésios 6:18', texto: 'Orando sempre em todo o tempo em o Esprito, com toda oracao e súplica, e vigiando para isto com toda perseveranca e súplica por todos os santos.', explicacao: 'A oracao e o complemento de toda a armadura. A guerra espiritual se trava no lugar da oracao, com perseveranca e intercessao.' },
];

const temasCentrais = [
  { titulo: 'Uniao com Cristo', icone: Heart, cor: 'text-red-500', descricao: 'Os crentes estao em Cristo e Ele neles. Esta uniao e o fundamento de todas as bencao espirituais: justificacao, santificacao, adocao e glorificacao. Cristo e a cabeca, a Igreja e o corpo.' },
  { titulo: 'A Igreja como Corpo', icone: Users, cor: 'text-blue-500', descricao: 'A Igreja nao e um edificio ou organizacao, mas o Corpo vivo de Cristo na terra. Cada crente e membro com dons distintos, mas todos servem a cabeca: Cristo.' },
  { titulo: 'A Armadura de Deus', icone: Shield, cor: 'text-green-500', descricao: 'A guerra espiritual e real. Deus prove toda a armadura necessaria: cinto da verdade, couracada da justica, escudo da fe, capacete da salvacao, espada do Esprito e oracao.' },
  { titulo: 'Graça e Obras', icone: Sparkles, cor: 'text-amber-500', descricao: 'Somos salvos pela graça, nao por obras (2:8-9), mas somos criados para boas obras (2:10). A graça produz transformacao que se manifesta em vida santa.' },
  { titulo: 'Misterio Revelado', icone: Crown, cor: 'text-purple-500', descricao: 'O mistério de Deus e que judeus e gentios sao um em Cristo. A Parede de divisão foi derrubada pela cruz. A Igreja e o testemunho da sabedoria de Deus.' },
];

const armadura = [
  { peca: 'Cinto da Verdade', referencia: 'Ef 6:14a', descricao: 'A verdade de Deus e a base de toda a armadura. Sem ela, todas as outras pecas caem. A verdade e Cristo e Sua Palavra.', uso: 'Estude a Biblia diariamente. Conheça a verdade para nao ser enganado.' },
  { peca: 'Couracada da Justica', referencia: 'Ef 6:14b', descricao: 'A justica de Cristo nos protege. Nossa propria justica e como trapos. A justica imputada de Cristo e a protecao do peito.', uso: 'Viva em santidade. A obediencia a Palavra fortalece o couracada.' },
  { peca: 'Sapatos do Evangelho da Paz', referencia: 'Ef 6:15', descricao: 'A prontidao do evangelho da paz nos da estabilidade. Andamos firmes quando sabemos que trazemos a boa nova.', uso: 'Esteja pronto para compartilhar a esperanca que ha em voce.' },
  { peca: 'Escudo da Fe', referencia: 'Ef 6:16', descricao: 'A fe e o escudo que apaga todas as flechadas do maligno — duvidas, medos, tentacoes, acusacoes.', uso: 'Exercite a fe diaria. Creia na Palavra de Deus mesmo quando as circunstancias sao dificeis.' },
  { peca: 'Capacete da Salvacao', referencia: 'Ef 6:17a', descricao: 'O capacete protege a mente — os pensamentos. A certeza da salvacao protege contra duvidas e mentiras.', uso: 'Lembre-se sempre de que voce e salvo por graça. Nao permita que duvidas invadam sua mente.' },
  { peca: 'Espada do Esprito', referencia: 'Ef 6:17b', descricao: 'A Palavra de Deus e a unica ofensiva. Jesus venceu Satanás citando a Escritura. A Palavra e viva e eficaz.', uso: 'Memorize versiculos. Use a Biblia contra as tentacoes e mentiras do inimigo.' },
  { peca: 'Oração', referencia: 'Ef 6:18', descricao: 'A oracao e o meio pelo qual todas as pecas sao ativadas. Sem oracao, a armadura e inutil.', uso: 'Ore sempre no Esprito, com perseveranca, por todos os santos.' },
];

const aplicacoes = [
  'Fortaleca-se no Senhor diariamente — a guerra espiritual exige preparacao constante.',
  'Revesta-se de TODA a armadura, nao apenas algumas pecas. Todas sao necessarias.',
  'Ore sempre no Esprito — a oracao e a arma mais poderosa que temos.',
  'Ande em unidade com a Igreja — humildade, mansidao e amor sao essenciais.',
  'Use os seus dons para edificar o corpo de Cristo, nao para si mesmo.',
  'Perdoe os outros como Deus em Cristo vos perdoou (Ef 4:32).',
  'Seja imitador de Deus como filho amado, andando em amor (Ef 5:1).',
  'Resista ao diabo com a verdade, a fe e a Palavra de Deus.',
];

const perguntas = [
  'Quais sao as bênçãos espirituais que recebemos em Cristo (Ef 1:3-14)?',
  'Como a morte e ressurreicao de Cristo nos unem (Ef 2:4-6)?',
  'O que significa ser "feitura de Deus" (Ef 2:10)?',
  'Como a Igreja pode manter a unidade em meio a diversidade (Ef 4:1-6)?',
  'Qual a relação entre a Graça transformadora e a vida santa (Ef 4:17-32)?',
  'Como as instruções para casais, pais e filhos se conectam com o evangelho (Ef 5-6)?',
  'De que forma a oração complementa toda a armadura espiritual (Ef 6:18)?',
  'Como podemos applicar a guerra espiritual no dia a dia cristão?',
];

export default function EfesiosPage() {
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
              <span className="text-foreground">Efesios</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Epistola aos Efesios</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Paulo, Apostolo</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~60-62 d.C., Roma (prisao)</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Epistola Prisonal</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introducao a Epistola aos Efesios
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Efesios e uma das quatro epistolas prisonais de Paulo, escritas durante sua primeira prisao em Roma (~60-62 d.C.). Diferente das outras epistolas prisonais (Filemon, Filipenses, Colossenses), Efesios nao foi escrito a uma igreja especifica, mas parece ser uma carta circular destinada a varias igrejas da regiao da Asia Menor.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    A carta e considerada a "coroa" das epistolas paulinas por sua visao elevada de Cristo e da Igreja. Paulo exalta Cristo como cabeca de todas as coisas e a Igreja como Seu corpo. A primeira metade (caps. 1-3) e doutrinal, revelando as bençãos espirituais. A segunda (caps. 4-6) e pratica, exortando a vida digna da vocacao recebida.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Autoria e Contexto</h3>
                      <p className="text-sm text-muted-foreground">Paulo escreve da prisao em Roma, junto com Timoteo. A carta carrega o peso da experiencia carceraria, mas transborda de alegria e esperanca no evangelho.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Estrutura</h3>
                      <p className="text-sm text-muted-foreground">Duas grandes partes: Doutrina (1-3) e Pratica (4-6). A transicao e o versiculo 4:1: "Portanto, eu, preso no Senhor..." — da doutrina nasce a exortacao.</p>
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
                  <Quote className="w-5 h-5 text-primary" />Versiculos-Chave com Comentario
                </h2>
                <div className="space-y-4">
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

          {secaoAtiva === 'armadura' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />A Armadura de Deus (Ef 6:10-18)
                </h2>
                <p className="text-muted-foreground mb-4">Cada peca da armadura e essencial para a guerra espiritual. Estude cada uma e aprenda como usa-la:</p>
                <div className="space-y-4">
                  {armadura.map((a, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{i + 1}</span>
                        <div>
                          <h3 className="font-display text-sm font-medium">{a.peca}</h3>
                          <p className="text-xs text-primary">{a.referencia}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2 ml-11">{a.descricao}</p>
                      <div className="ml-11 p-2 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-xs text-primary font-medium">Como usar: {a.uso}</p>
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
