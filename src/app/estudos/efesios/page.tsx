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
  { id: 'intro', label: 'Introdução' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'versiculos', label: 'Versículos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'armadura', label: 'Armadura Espiritual' },
  { id: 'aplicação', label: 'Aplicação' },
  { id: 'perguntas', label: 'Perguntas' },
];

const estrutura = [
  { parte: 'Parte I: Doutrina (Caps. 1-3)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Cap. 1: As bendicoes espirituais em Cristo — predestinação, adocao, redenção, selo do Esprito',
    'Cap. 2: De mortos espirituais a vivos em Cristo — a graça que nos salva, unidade na cruz',
    'Cap. 3: O mistério revelado — a Igreja como corpo de Cristo, plenitude de Deus',
  ]},
  { parte: 'Parte II: Pratica (Caps. 4-6)', cor: 'border-green-500', bg: 'bg-green-500/5', itens: [
    'Cap. 4: Unidade e diversidade na Igreja — dons espirituais para edificacao do corpo',
    'Caps. 5-6: Vida cristã praticas — andar na luz, amor conjugal, obediência filial, guerra espiritual',
  ]},
];

const versiculosChave = [
  { referência: 'Efésios 1:3-4', texto: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou com toda sorte de bênção espiritual nos lugares celestiais em Cristo. Ele nos escolheu nele antes da fundação do mundo, para sermos santos e irrepreensíveis perante ele.', explicação: 'Toda a riqueza espiritual já esta disponivel em Cristo. A eLeicao divina e anterior a fundação do mundo, demonstrando o propósito eterno de Deus para os crentes.' },
  { referência: 'Efésios 2:8-9', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vos mesmos, e dom de Deus; não vem das obras, para que ninguem se glorie.', explicação: 'A salvação e inteiramente pela graça de Deus, recebida pela fé. Não há merito humano algum. A graça é um dom gratuito que exclui todo o orgulho.' },
  { referência: 'Efésios 2:10', texto: 'Porque somos féitura dele, criados em Cristo Jesus para boas obras, as quais Deus preparou de antemão, para que andassemos nelas.', explicação: 'Apos recebermos a salvação pela graça, somos criados para boas obras. As obras são o fruto da salvação, não a causa dela. Deus já preparou o caminho.' },
  { referência: 'Efésios 3:20', texto: 'Aquele que, segundo o poder que já opera em nos, e capaz de fazer infinitamente mais do que tudo o que pedimos ou pensamos.', explicação: 'O poder de Deus opera nos crentes. As promessas de Deus superam nossas expectativas. Podemos ousar sonhar e orar grandemente.' },
  { referência: 'Efésios 4:1-3', texto: 'Eu, therefore, preso no Senhor, vos rogo que andeis de modo digno da vocacao com que fostes chamados, com toda humildade e mansidao, com longanimidade, suportando-vos uns aos outros em amor, esforcando-vos por preservar a unidade do Esprito pelo vinculo da paz.', explicação: 'A unidade da Igreja é um dever. Humildade, mansidao, longanimidade e amor são as qualidades essenciais para a convivencia cristã.' },
  { referência: 'Efésios 6:10-11', texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder. Revesti-vos de toda a armadura de Deus, para poderdes ficar firmes contra as ciladas do diabo.', explicação: 'A guerra cristã não e contra carne e sangue, mas contra espíritos maus. A armadura de Deus e essencial para resistir e vencer.' },
  { referência: 'Efésios 6:18', texto: 'Orando sempre em todo o tempo em o Esprito, com toda oração e súplica, e vigiando para isto com toda perseverança e súplica por todos os santos.', explicação: 'A oração é o complemento de toda a armadura. A guerra espiritual se trava no lugar da oracao, com perseverança e intercessão.' },
];

const temasCentrais = [
  { título: 'Uniao com Cristo', icone: Heart, cor: 'text-red-500', descricao: 'Os crentes estão em Cristo e Ele neles. Esta uniao é o fundamento de todas as bencao espirituais: justificação, santificação, adocao e glorificação. Cristo é a cabeca, a Igreja é o corpo.' },
  { título: 'A Igreja como Corpo', icone: Users, cor: 'text-blue-500', descricao: 'A Igreja não é um edificio ou organizacao, mas o Corpo vivo de Cristo na terra. Cada crente e membro com dons distintos, mas todos servem a cabeca: Cristo.' },
  { título: 'A Armadura de Deus', icone: Shield, cor: 'text-green-500', descricao: 'A guerra espiritual e real. Deus prove toda a armadura necessaria: cinto da verdade, couracada da justiça, escudo da fé, capacete da salvação, espada do Esprito e oracao.' },
  { título: 'Graça e Obras', icone: Sparkles, cor: 'text-amber-500', descricao: 'Somos salvos pela graça, não por obras (2:8-9), mas somos criados para boas obras (2:10). A graça produz transformação que se manifesta em vida santa.' },
  { título: 'Misterio Revelado', icone: Crown, cor: 'text-purple-500', descricao: 'O mistério de Deus e que juDeus e gentios são um em Cristo. A Parede de divisão foi derrubada pela cruz. A Igreja é o testemunho da sabedoria de Deus.' },
];

const armadura = [
  { peca: 'Cinto da Verdade', referência: 'Ef 6:14a', descricao: 'A verdade de Deus é a base de toda a armadura. Sem ela, todas as outras pecas caem. A verdade e Cristo e Sua Palavra.', uso: 'Estude a Biblia diariamente. Conheça a verdade para não ser enganado.' },
  { peca: 'Couracada da Justica', referência: 'Ef 6:14b', descricao: 'A justiça de Cristo nos protege. Nossa propria justiça e como trapos. A justiça imputada de Cristo é a proteção do peito.', uso: 'Viva em santidade. A obediência a Palavra fortalece o couracada.' },
  { peca: 'Sapatos do Evangelho da Paz', referência: 'Ef 6:15', descricao: 'A prontidão do evangelho da paz nos da estabilidade. Andamos firmes quando sabemos que trazemos a boa nova.', uso: 'Esteja pronto para compartilhar a esperança que há em voce.' },
  { peca: 'Escudo da Fe', referência: 'Ef 6:16', descricao: 'A fé é o escudo que apaga todas as flechadas do maligno — duvidas, medos, tentacoes, acusacoes.', uso: 'Exercite a fé diaria. Creia na Palavra de Deus mesmo quando as circunstancias são dificeis.' },
  { peca: 'Capacete da Salvacao', referência: 'Ef 6:17a', descricao: 'O capacete protege a mente — os pensamentos. A certeza da salvação protege contra duvidas e mentiras.', uso: 'Lembre-se sempre de que você e salvo por graça. Não permita que duvidas invadam sua mente.' },
  { peca: 'Espada do Esprito', referência: 'Ef 6:17b', descricao: 'A Palavra de Deus é a unica ofénsiva. Jesus venceu Satanás citando a Escritura. A Palavra e viva e eficaz.', uso: 'Memorize versiculos. Use a Biblia contra as tentacoes e mentiras do inimigo.' },
  { peca: 'Oração', referência: 'Ef 6:18', descricao: 'A oração é o meio pelo qual todas as pecas são ativadas. Sem oracao, a armadura e inutil.', uso: 'Ore sempre no Esprito, com perseverança, por todos os santos.' },
];

const aplicações = [
  'Fortaleca-se no Senhor diariamente — a guerra espiritual exige preparacao constante.',
  'Revesta-se de TODA a armadura, não apenas algumas pecas. Todas são necessarias.',
  'Ore sempre no Esprito — a oração é a arma mais poderosa que temos.',
  'Ande em unidade com a Igreja — humildade, mansidao e amor são essenciais.',
  'Use os seus dons para edificar o corpo de Cristo, não para si mesmo.',
  'Perdoe os outros como Deus em Cristo vos perdoou (Ef 4:32).',
  'Seja imitador de Deus como filho amado, andando em amor (Ef 5:1).',
  'Resista ao diabo com a verdade, a fé é a Palavra de Deus.',
];

const perguntas = [
  'Quais são as bênçãos espirituais que recebemos em Cristo (Ef 1:3-14)?',
  'Como a morte e ressurreição de Cristo nos unem (Ef 2:4-6)?',
  'O que significa ser "féitura de Deus" (Ef 2:10)?',
  'Como a Igreja pode manter a unidade em meio a diversidade (Ef 4:1-6)?',
  'Qual a relação entre a Graça transformadora é a vida santa (Ef 4:17-32)?',
  'Como as instruções para casais, pais e filhos se conectam com o evangelho (Ef 5-6)?',
  'De que forma a oração complementa toda a armadura espiritual (Ef 6:18)?',
  'Como podemos applicar a guerra espiritual no dia a dia cristão?',
];

export default function EfésiosPage() {
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
              <span className="text-foreground">Efésios</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Epistola aos Efésios</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Paulo, Apostolo</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~60-62 d.C., Roma (prisão)</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Epistola Prisonal</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introdução a Epistola aos Efésios
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Efésios é uma das quatro epistolas prisonais de Paulo, escritas durante sua primeira prisão em Roma (~60-62 d.C.). Diférente das outras epistolas prisonais (Filemon, Filipenses, Colossenses), Efésios não foi escrito a uma igreja especifica, mas parece ser uma carta circular destinada a varias igrejas da regiao da Asia Menor.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    A carta e considerada a "coroa" das epistolas paulinas por sua visão elevada de Cristo e da Igreja. Paulo exalta Cristo como cabeca de todas as coisas é a Igreja como Seu corpo. A primeira metade (caps. 1-3) e doutrinal, revelando as bençãos espirituais. A segunda (caps. 4-6) e pratica, exortando a vida digna da vocacao recebida.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Autoria e Contexto</h3>
                      <p className="text-sm text-muted-foreground">Paulo escreve da prisão em Roma, junto com Timoteo. A carta carrega o peso da experiência carceraria, mas transborda de alegria e esperança no evangelho.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Estrutura</h3>
                      <p className="text-sm text-muted-foreground">Duas grandes partes: Doutrina (1-3) e Pratica (4-6). A transicao é o versiculo 4:1: "Portanto, eu, preso no Senhor..." — da doutrina nasce a exortacao.</p>
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
                  <Quote className="w-5 h-5 text-primary" />Versículos-Chave com Comentario
                </h2>
                <div className="space-y-4">
                  {versiculosChave.map((v, i) => (
                    <VersiculoCard key={i} versiculo={v} />
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

          {seçãoAtiva === 'armadura' && (
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
                          <p className="text-xs text-primary">{a.referência}</p>
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

function VersiculoCard({ versiculo }: { versiculo: { referência: string; texto: string; explicação: string } }) {
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
            <div className="px-5 pb-5 border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{versiculo.explicação}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
