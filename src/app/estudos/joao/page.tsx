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
  Sparkles, Heart, Eye, Droplets, Sun, Wine, Cross, DoorOpen, Leaf,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introdução' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'eusou', label: 'Os 7 Eu Sou' },
  { id: 'sinais', label: 'Os 7 Sinais' },
  { id: 'prologo', label: 'Prólogo (Jo 1:1-18)' },
  { id: 'versiculos', label: 'Versículos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'aplicação', label: 'Aplicação' },
];

const estrutura = [
  { parte: 'Parte I: O Livro dos Sinais (Caps. 1-12)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Prólogo (1:1-18) — O Verbo Encarnado',
    'Ministerio publico (1:19-2:22) — Primeiros discipulos e sinais',
    'Sinais e discursos (3:12-12:50) — Sete sinais revelando quem e Cristo',
    'A glória de Jesus é a rejeicao de Israel',
  ]},
  { parte: 'Parte II: O Livro da Paixao (Caps. 13-21)', cor: 'border-red-500', bg: 'bg-red-500/5', itens: [
    'Caps. 13-17: A ceia, os últimos discursos é a oracao sumo-sacerdotal',
    'Caps. 18-19: A Paixao — julgamento, crucificacao e sepultamento',
    'Caps. 20-21: A Ressurreicao e restauracao de Pedro',
  ]},
];

const euSou = [
  { título: 'Eu sou o pão da vida', referência: 'João 6:35', cor: 'text-amber-500', icone: Cross, descricao: 'Jesus é a sustentacao espiritual do homem. Assim como o maná sustentou Israel no deserto, Cristo é o alimento que satisfaz a fome espiritual eterna. Quem vem a Ele jamais terá fome.' },
  { título: 'Eu sou a luz do mundo', referência: 'João 8:12; 9:5', cor: 'text-yellow-500', icone: Sun, descricao: 'Jesus é a revelacao de Deus nas trevas. Assim como a coluna de fogo guiou Israel, Cristo ilumina os caminhos da humanidade. Quem O segue não andara em trevas.' },
  { título: 'Eu sou a porta', referência: 'João 10:7, 9', cor: 'text-green-500', icone: DoorOpen, descricao: 'Jesus é o unico caminho para a salvação. Por Ele o rebanho entra e sai, e encontra pasto. Todos que tentam entrar por outro caminho são ladroes e salteadores.' },
  { título: 'Eu sou o bom pastor', referência: 'João 10:11, 14', cor: 'text-blue-500', icone: Heart, descricao: 'Jesus conhece suas ovelhas e da a vida por elas. O pastor雇佣 (assalariado) foge, mas o bom pastor permanece. O amor do pastor e sacrificial.' },
  { título: 'Eu sou a ressurreição é a vida', referência: 'João 11:25', cor: 'text-purple-500', icone: Sparkles, descricao: 'Jesus tem poder sobre a morte. Quem crê nEle, mesmo que morra, viverá. Esta é a promessa suprema diante do tumor da morte.' },
  { título: 'Eu sou o caminho, a verdade é a vida', referência: 'João 14:6', cor: 'text-red-500', icone: Target, descricao: 'Jesus é o unico caminho ao Pai. Ninguem vai ao Pai senão por Ele. Cristo não e apenas um guia — Ele é o próprio caminho.' },
  { título: 'Eu sou a videira verdadeira', referência: 'João 15:1, 5', cor: 'text-green-500', icone: Leaf, descricao: 'Jesus é a fonte de vida espiritual. Sem Ele nada podemos fazer. Os ramos que permanecem nEle produzem fruto abundante.' },
];

const sinais = [
  { título: ' água em vinho', referência: 'João 2:1-11', local: 'Casamento em Cana', cor: 'text-red-500', descricao: 'O primeiro sinal revela a glória de Jesus. A transformação da água em vinho simboliza a novidade que Cristo traz — o velho (Lei) cede lugar ao novo (Graça). Sinal messianico de abundancia.' },
  { título: 'Curacao do filho do funccionario', referência: 'João 4:46-54', local: 'Cana para Cafarnaum', cor: 'text-blue-500', descricao: 'A primeira cura registrada em Joao. Jesus cura a distancia, demonstrando autoridade sobre a distancia é o tempo. A fé do pai e recompensada.' },
  { título: 'Curacao do paralitico', referência: 'João 5:1-15', local: 'Piscina de Betesda', cor: 'text-green-500', descricao: 'Jesus cura um doente a 38 anos no sabado, revelando autoridade sobre a Lei. O Filho opera em unidade com o Pai, mesmo no sabado.' },
  { título: 'Alimentacao de 5.000', referência: 'João 6:1-14', local: 'Deserto da GaliLeia', cor: 'text-amber-500', descricao: 'O unico sinal narrado nos quatro evangelhos. Jesus é o pao da vida que alimenta a humanidade inteira. Sinal de compaixao e provisão divina.' },
  { título: 'Caminhar sobre as águas', referência: 'João 6:16-21', local: 'Mar da GaliLeia', cor: 'text-blue-500', descricao: 'Jesus revela Seu poder sobre a natureza e os elementos. "Eu Sou; não temais." A presenca de Jesus transforma o medo em coragem.' },
  { título: 'Curacao do cego de nascença', referência: 'João 9:1-41', local: 'Jerusalém', cor: 'text-yellow-500', descricao: 'Jesus é a luz do mundo. O cego recebe visão fisica e espiritual. Os fariseus, que se dizem videntes, são espiritualmente cegos. Sinal que divide opiniões.' },
  { título: 'Ressurreicao de Lázaro', referência: 'João 11:1-44', local: 'Betânia', cor: 'text-purple-500', descricao: 'O maior sinal de Joao. Jesus chama Lázaro do tumulo apos quatro dias. Revela o poder sobre a morte e antecipa a propria ressurreição. "Eu sou a ressurreição é a vida."' },
];

const prologo = [
  { versiculo: 'João 1:1', texto: 'No princípio era o Verbo, é o Verbo estava com Deus, é o Verbo era Deus.', nota: 'A eternidade de Cristo. Ele não teve começo. As tres pessoas da Trindade estão presentes na criação.' },
  { versiculo: 'João 1:2', texto: 'Ele estava no princípio com Deus.', nota: 'Reforça a unidade e distinção entre o Pai é o Filho. Eterna communhão.' },
  { versiculo: 'João 1:3', texto: 'Todas as coisas foram féitas por Ele, e sem Ele nada do que foi feito se fez.', nota: 'Cristo é o Criador de todas as coisas. Nada existe fora dEle.' },
  { versiculo: 'João 1:4', texto: 'Nele estava a vida, é a vida era a luz dos homens.', nota: 'Cristo é a fonte da vida e da iluminação espiritual. Sem Ele so ha trevas.' },
  { versiculo: 'João 1:5', texto: 'E a luz resplandece nas trevas, e as trevas não prevaleceram contra ela.', nota: 'A vitória definitiva da luz. O mal e as trevas jamais derrotarão a Cristo.' },
  { versiculo: 'João 1:12', texto: 'Mas a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus.', nota: 'A adocao divina. Quem recebe a Cristo se torna filho de Deus. A fé é a porta de entrada.' },
  { versiculo: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória.', nota: 'A incarnação. O Deus eterno se tornou homem. A glória divina se revela em humanidade plena.' },
  { versiculo: 'João 1:17', texto: 'Porque a Lei foi dada por Moisés, mas a graça é a verdade vieram por Jesus Cristo.', nota: 'A transição do AT para o NT. A Lei revela o pecado; a graça traz o perdão. Cristo cumpre a Lei.' },
];

const versiculosChave = [
  { referência: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, glória como a do unigênito do Pai, cheio de graça e de verdade.', explicação: 'A incarnacao é o centro do cristianismo. Deus se tornou homem para habitar entre os homens. A glória de Cristo é a glória do próprio Deus.' },
  { referência: 'João 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele cre pereça, mas tenha a vida eterna.', explicação: 'O versículo mais famoso da Biblia. O amor de Deus e universal, o sacrifio e unico, a salvação e individual pela fé.' },
  { referência: 'João 3:30', texto: 'E preciso que Ele cresça, e que eu diminua.', explicação: 'Joao Batista reconhece sua posição diante de Cristo. O crente deve diminuir para que Cristo cresça em sua vida.' },
  { referência: 'João 6:35', texto: 'Jesus lhes disse: Eu sou o pão da vida; quem vem a mim jamais terá fome, e quem crê em mim jamais terá sede.', explicação: 'Jesus é a satisfação suprema da alma humana. Nada neste mundo satisfaz plenamente alem dEle.' },
  { referência: 'João 8:32', texto: 'E conhecereis a verdade, é a verdade vos libertará.', explicação: 'A liberdade vem pelo conhecimento da verdade de Cristo. A verdade não e apenas uma ideia, mas uma Pessoa.' },
  { referência: 'João 10:10', texto: 'Eu vim para que tenham vida, é a tenham em abundancia.', explicação: 'O propósito de Cristo não e apenas salvar da morte, mas dar vida abundana, cheia de propósito e significado.' },
  { referência: 'João 11:25-26', texto: 'Eu sou a ressurreição é a vida. Quem crê em mim, ainda que morra, viverá; e todo aquele que vive e crê em mim jamais morrerá.', explicação: 'A promessa suprema diante da morte. A fé em Cristo transcende a morte fisica. A vida eterna comeca agora.' },
  { referência: 'João 14:6', texto: 'Jesus lhe disse: Eu sou o caminho, é a verdade, é a vida; ninguem vai ao Pai senão por mim.', explicação: 'A exclusividade de Cristo. Nao ha caminhos alternativos. Cristo é o unico mediador entre Deus e os homens.' },
];

const temasCentrais = [
  { título: 'Identidade de Cristo', icone: Sparkles, cor: 'text-primary', descricao: 'Joao apresenta Jesus como o Verbo eterno, Filho de Deus, Deus encarnado. Cada "Eu Sou" revela uma faceta da identidade divina de Cristo. Ele não e apenas um proféta — é o próprio Deus.' },
  { título: 'Fé em Cristo', icone: Heart, cor: 'text-red-500', descricao: 'A fé é o meio pelo qual recebemos a vida eterna. Joao registra que "muitos cremeram" (2:23) e que a fé produz transformação. A fé não e apenas intelectual, mas pessoal e transformadora.' },
  { título: 'Vida Eterna', icone: Sun, cor: 'text-amber-500', descricao: 'A vida eterna comeca agora, não apenas no futuro. E o conhecimento de Deus e de Jesus Cristo (17:3). E uma relacao viva com o Criador, que começa na fé e se aprofunda eternamente.' },
  { título: 'Luz e Trevas', icone: Eye, cor: 'text-yellow-500', descricao: 'Joao usa imagens de luz e trevas para contrastar o conhecimento de Deus com a ignorancia do pecado. Jesus é a luz que entra nas trevas e as vence.' },
  { título: 'Amor e Obediencia', icone: Heart, cor: 'text-red-500', descricao: 'O mandamento novo de Jesus (13:34) e amar uns aos outros como Ele nos amou. A obediência é a prova do amor (14:15). Amor e inseparavel da verdade.' },
];

const aplicações = [
  'Receba a Cristo pessoalmente — a fé e individual e transformadora.',
  'Conheça a Palavra de Deus — a verdade liberta e transforma a mente.',
  'Vida em abundancia — busque em Cristo a satisfação que o mundo não oférece.',
  'Ande na luz — confésse pecados e viva na verdade diante de Deus.',
  'Ame como Cristo amou — o amor sacrificial é a marca do discipulo.',
  'Permaneça na videira — a união com Cristo produz fruto espiritual.',
  'Testemunhe a ressurreição — a vitória sobre a morte é a esperança do mundo.',
  'Espere a volta de Cristo — "Vim para dar-lhes vida eterna" inclui a glorificação final.',
];

const perguntas = [
  'Quem e Jesus Cristo segundo o prologo de Joao (1:1-18)?',
  'Qual a importancia dos sete "Eu Sou" para entender a identidade de Cristo?',
  'Como o sinal da ressurreição de Lázaro aponta para a ressurreição de Cristo?',
  'O que significa "nascer de novo" (João 3:3-8)?',
  'De que forma a oracao sumo-sacerdotal de Jesus (João 17) revela Seu coração?',
  'Como a washing dos pes (João 13) ensina sobre servico e humildade?',
  'Qual a relação entré a verdade é a liberdade (João 8:31-36)?',
  'De que maneira a ressurreição de Joao 20 confirmã todas as promessas de Cristo?',
];

export default function JoaoPage() {
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
              <span className="text-foreground">João</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Evangelho de João</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />João, Apostolo</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~85-95 d.C., Eféso</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Evangelho</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introdução ao Evangelho de João
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    O Evangelho de João é o quarto e ultimo evangelho do Novo Testamento. Escrito por João, o "discipulo amado", por volta de 85-95 d.C. em Eféso, é considerado o evangelho mais teológico e espiritual dos quatro.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Enquanto Mateus, Marcos e Lucas (os synopticos) focam nos fatos da vida de Jesus, João foca no significado divino desses fatos. João apresenta Jesus como o Verbo eterno, o Filho de Deus, Deus encarnado. Seu propósito e declarar que "Jesus é o Cristo, o Filho de Deus, para que, crendo, tenhais vida em seu nome" (20:31).
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    João é estruturado em tres partes: o Livro dos Sinais (1-12), o Livro da Paixao (13-21) e contem sete "Eu Sou" e sete sinais/milagres que revelam a identidade de Cristo.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl text-center">
                      <p className="font-display text-3xl font-light text-primary">21</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Capitulos</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <p className="font-display text-3xl font-light text-primary">7</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Eu Sou</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <p className="font-display text-3xl font-light text-primary">7</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Sinais</p>
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
                  <Layers className="w-5 h-5 text-primary" />Estrutura do Evangelho
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

          {seçãoAtiva === 'eusou' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />Os 7 Declarações "Eu Sou"
                </h2>
                <p className="text-muted-foreground mb-4">Cada declaração "Eu Sou" (ego eimi) conecta Jesus com as declarações divinas do Antigo Testamento:</p>
                <div className="space-y-4">
                  {euSou.map((e, i) => (
                    <div key={i} className="glass-card p-5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <e.icone className={`w-5 h-5 ${e.cor}`} />
                        <h3 className="font-display text-lg font-medium">{e.título}</h3>
                        <span className="text-xs text-primary ml-auto">{e.referência}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{e.descricao}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'sinais' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />Os 7 Sinais/Milagres
                </h2>
                <p className="text-muted-foreground mb-4">João seleciona exatamente 7 sinais para provar que Jesus é o Cristo, o Filho de Deus:</p>
                <div className="space-y-4">
                  {sinais.map((s, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{i + 1}</span>
                        <div className="flex-1">
                          <h3 className="font-display text-sm font-medium">{s.título}</h3>
                          <p className="text-xs text-primary">{s.referência}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{s.local}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed ml-11">{s.descricao}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'prologo' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />O Prólogo: João 1:1-18 Versículo por Versículo
                </h2>
                <p className="text-muted-foreground mb-4">O prologo de João é um dos textos mais profundos da Escritura. Cada versículo revela verdade sobre Cristo:</p>
                <div className="space-y-3">
                  {prologo.map((p, i) => (
                    <div key={i} className="sola-card p-4">
                      <p className="font-display text-sm font-medium text-primary mb-1">{p.versiculo}</p>
                      <p className="text-sm italic font-serif-body leading-relaxed mb-2">&ldquo;{p.texto}&rdquo;</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.nota}</p>
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
