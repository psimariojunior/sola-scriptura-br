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
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'eusou', label: 'Os 7 Eu Sou' },
  { id: 'sinais', label: 'Os 7 Sinais' },
  { id: 'prologo', label: 'Prologo (Jo 1:1-18)' },
  { id: 'versiculos', label: 'Versiculos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'aplicacao', label: 'Aplicacao' },
];

const estrutura = [
  { parte: 'Parte I: O Livro dos Sinais (Caps. 1-12)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Prologo (1:1-18) — O Verbo Encarnado',
    'Ministerio publico (1:19-2:22) — Primeiros discipulos e sinais',
    'Sinais e discursos (3:12-12:50) — Sete sinais revelando quem e Cristo',
    'A gloria de Jesus e a rejeicao de Israel',
  ]},
  { parte: 'Parte II: O Livro da Paixao (Caps. 13-21)', cor: 'border-red-500', bg: 'bg-red-500/5', itens: [
    'Caps. 13-17: A ceia, os ultimos discursos e a oracao sumo-sacerdotal',
    'Caps. 18-19: A Paixao — julgamento, crucificacao e sepultamento',
    'Caps. 20-21: A Ressurreicao e restauracao de Pedro',
  ]},
];

const euSou = [
  { titulo: 'Eu sou o pão da vida', referencia: 'João 6:35', cor: 'text-amber-500', icone: Cross, descricao: 'Jesus e a sustentacao espiritual do homem. Assim como o maná sustentou Israel no deserto, Cristo e o alimento que satisfaz a fome espiritual eterna. Quem vem a Ele jamais tera fome.' },
  { titulo: 'Eu sou a luz do mundo', referencia: 'João 8:12; 9:5', cor: 'text-yellow-500', icone: Sun, descricao: 'Jesus e a revelacao de Deus nas trevas. Assim como a coluna de fogo guiou Israel, Cristo ilumina os caminhos da humanidade. Quem O segue nao andara em trevas.' },
  { titulo: 'Eu sou a porta', referencia: 'João 10:7, 9', cor: 'text-green-500', icone: DoorOpen, descricao: 'Jesus e o unico caminho para a salvacao. Por Ele o rebanho entra e sai, e encontra pasto. Todos que tentam entrar por outro caminho sao ladroes e salteadores.' },
  { titulo: 'Eu sou o bom pastor', referencia: 'João 10:11, 14', cor: 'text-blue-500', icone: Heart, descricao: 'Jesus conhece suas ovelhas e da a vida por elas. O pastor雇佣 (assalariado) foge, mas o bom pastor permanece. O amor do pastor e sacrificial.' },
  { titulo: 'Eu sou a ressurreição e a vida', referencia: 'João 11:25', cor: 'text-purple-500', icone: Sparkles, descricao: 'Jesus tem poder sobre a morte. Quem crê nEle, mesmo que morra, viverá. Esta e a promessa suprema diante do tumor da morte.' },
  { titulo: 'Eu sou o caminho, a verdade e a vida', referencia: 'João 14:6', cor: 'text-red-500', icone: Target, descricao: 'Jesus e o unico caminho ao Pai. Ninguem vai ao Pai senão por Ele. Cristo nao e apenas um guia — Ele e o próprio caminho.' },
  { titulo: 'Eu sou a videira verdadeira', referencia: 'João 15:1, 5', cor: 'text-green-500', icone: Leaf, descricao: 'Jesus e a fonte de vida espiritual. Sem Ele nada podemos fazer. Os ramos que permanecem nEle produzem fruto abundante.' },
];

const sinais = [
  { titulo: ' agua em vinho', referencia: 'João 2:1-11', local: 'Casamento em Cana', cor: 'text-red-500', descricao: 'O primeiro sinal revela a gloria de Jesus. A transformacao da agua em vinho simboliza a novidade que Cristo traz — o velho (Lei) cede lugar ao novo (Graça). Sinal messianico de abundancia.' },
  { titulo: 'Curacao do filho do funccionario', referencia: 'João 4:46-54', local: 'Cana para Cafarnaum', cor: 'text-blue-500', descricao: 'A primeira cura registrada em Joao. Jesus cura a distancia, demonstrando autoridade sobre a distancia e o tempo. A fe do pai e recompensada.' },
  { titulo: 'Curacao do paralitico', referencia: 'João 5:1-15', local: 'Piscina de Betezda', cor: 'text-green-500', descricao: 'Jesus cura um doente a 38 anos no sabado, revelando autoridade sobre a Lei. O Filho opera em unidade com o Pai, mesmo no sabado.' },
  { titulo: 'Alimentacao de 5.000', referencia: 'João 6:1-14', local: 'Deserto da Galileia', cor: 'text-amber-500', descricao: 'O unico sinal narrado nos quatro evangelhos. Jesus e o pao da vida que alimenta a humanidade inteira. Sinal de compaixao e provisao divina.' },
  { titulo: 'Caminhar sobre as aguas', referencia: 'João 6:16-21', local: 'Mar da Galileia', cor: 'text-blue-500', descricao: 'Jesus revela Seu poder sobre a natureza e os elementos. "Eu Sou; nao temais." A presenca de Jesus transforma o medo em coragem.' },
  { titulo: 'Curacao do cego de nascença', referencia: 'João 9:1-41', local: 'Jerusalem', cor: 'text-yellow-500', descricao: 'Jesus e a luz do mundo. O cego recebe visao fisica e espiritual. Os fariseus, que se dizem videntes, sao espiritualmente cegos. Sinal que divide opiniões.' },
  { titulo: 'Ressurreicao de Lázaro', referencia: 'João 11:1-44', local: 'Betania', cor: 'text-purple-500', descricao: 'O maior sinal de Joao. Jesus chama Lazaro do tumulo apos quatro dias. Revela o poder sobre a morte e antecipa a propria ressurreicao. "Eu sou a ressurreicao e a vida."' },
];

const prologo = [
  { versiculo: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', nota: 'A eternidade de Cristo. Ele nao teve começo. As tres pessoas da Trindade estao presentes na criação.' },
  { versiculo: 'João 1:2', texto: 'Ele estava no princípio com Deus.', nota: 'Reforça a unidade e distinção entre o Pai e o Filho. Eterna communhão.' },
  { versiculo: 'João 1:3', texto: 'Todas as coisas foram feitas por Ele, e sem Ele nada do que foi feito se fez.', nota: 'Cristo e o Criador de todas as coisas. Nada existe fora dEle.' },
  { versiculo: 'João 1:4', texto: 'Nele estava a vida, e a vida era a luz dos homens.', nota: 'Cristo e a fonte da vida e da iluminação espiritual. Sem Ele so ha trevas.' },
  { versiculo: 'João 1:5', texto: 'E a luz resplandece nas trevas, e as trevas nao prevaleceram contra ela.', nota: 'A vitória definitiva da luz. O mal e as trevas jamais derrotarão a Cristo.' },
  { versiculo: 'João 1:12', texto: 'Mas a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus.', nota: 'A adocao divina. Quem recebe a Cristo se torna filho de Deus. A fé é a porta de entrada.' },
  { versiculo: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua gloria.', nota: 'A incarnação. O Deus eterno se tornou homem. A gloria divina se revela em humanidade plena.' },
  { versiculo: 'João 1:17', texto: 'Porque a Lei foi dada por Moisés, mas a graça e a verdade vieram por Jesus Cristo.', nota: 'A transição do AT para o NT. A Lei revela o pecado; a graça traz o perdão. Cristo cumpre a Lei.' },
];

const versiculosChave = [
  { referencia: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua gloria, gloria como a do unigênito do Pai, cheio de graça e de verdade.', explicacao: 'A incarnacao e o centro do cristianismo. Deus se tornou homem para habitar entre os homens. A gloria de Cristo e a gloria do proprio Deus.' },
  { referencia: 'João 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele cre pereça, mas tenha a vida eterna.', explicacao: 'O versículo mais famoso da Biblia. O amor de Deus e universal, o sacrifio e unico, a salvacao e individual pela fe.' },
  { referencia: 'João 3:30', texto: 'E preciso que Ele cresça, e que eu diminua.', explicacao: 'Joao Batista reconhece sua posição diante de Cristo. O crente deve diminuir para que Cristo cresça em sua vida.' },
  { referencia: 'João 6:35', texto: 'Jesus lhes disse: Eu sou o pão da vida; quem vem a mim jamais terá fome, e quem crê em mim jamais terá sede.', explicacao: 'Jesus e a satisfação suprema da alma humana. Nada neste mundo satisfaz plenamente alem dEle.' },
  { referencia: 'João 8:32', texto: 'E conhecereis a verdade, e a verdade vos libertará.', explicacao: 'A liberdade vem pelo conhecimento da verdade de Cristo. A verdade nao e apenas uma ideia, mas uma Pessoa.' },
  { referencia: 'João 10:10', texto: 'Eu vim para que tenham vida, e a tenham em abundancia.', explicacao: 'O proposito de Cristo nao e apenas salvar da morte, mas dar vida abundana, cheia de proposito e significado.' },
  { referencia: 'João 11:25-26', texto: 'Eu sou a ressurreição e a vida. Quem crê em mim, ainda que morra, viverá; e todo aquele que vive e crê em mim jamais morrerá.', explicacao: 'A promessa suprema diante da morte. A fé em Cristo transcende a morte fisica. A vida eterna comeca agora.' },
  { referencia: 'João 14:6', texto: 'Jesus lhe disse: Eu sou o caminho, e a verdade, e a vida; ninguem vai ao Pai senão por mim.', explicacao: 'A exclusividade de Cristo. Nao ha caminhos alternativos. Cristo e o unico mediador entre Deus e os homens.' },
];

const temasCentrais = [
  { titulo: 'Identidade de Cristo', icone: Sparkles, cor: 'text-primary', descricao: 'Joao apresenta Jesus como o Verbo eterno, Filho de Deus, Deus encarnado. Cada "Eu Sou" revela uma faceta da identidade divina de Cristo. Ele nao e apenas um profeta — e o proprio Deus.' },
  { titulo: 'Fé em Cristo', icone: Heart, cor: 'text-red-500', descricao: 'A fé e o meio pelo qual recebemos a vida eterna. Joao registra que "muitos cremeram" (2:23) e que a fé produz transformacao. A fé nao e apenas intelectual, mas pessoal e transformadora.' },
  { titulo: 'Vida Eterna', icone: Sun, cor: 'text-amber-500', descricao: 'A vida eterna comeca agora, nao apenas no futuro. E o conhecimento de Deus e de Jesus Cristo (17:3). E uma relacao viva com o Criador, que começa na fé e se aprofunda eternamente.' },
  { titulo: 'Luz e Trevas', icone: Eye, cor: 'text-yellow-500', descricao: 'Joao usa imagens de luz e trevas para contrastar o conhecimento de Deus com a ignorancia do pecado. Jesus e a luz que entra nas trevas e as vence.' },
  { titulo: 'Amor e Obediencia', icone: Heart, cor: 'text-red-500', descricao: 'O mandamento novo de Jesus (13:34) e amar uns aos outros como Ele nos amou. A obediencia e a prova do amor (14:15). Amor e inseparavel da verdade.' },
];

const aplicacoes = [
  'Receba a Cristo pessoalmente — a fé e individual e transformadora.',
  'Conheça a Palavra de Deus — a verdade liberta e transforma a mente.',
  'Vida em abundancia — busque em Cristo a satisfação que o mundo nao oferece.',
  'Ande na luz — confesse pecados e viva na verdade diante de Deus.',
  'Ame como Cristo amou — o amor sacrificial é a marca do discipulo.',
  'Permaneça na videira — a união com Cristo produz fruto espiritual.',
  'Testemunhe a ressurreição — a vitória sobre a morte e a esperanca do mundo.',
  'Espere a volta de Cristo — "Vim para dar-lhes vida eterna" inclui a glorificacao final.',
];

const perguntas = [
  'Quem e Jesus Cristo segundo o prologo de Joao (1:1-18)?',
  'Qual a importancia dos sete "Eu Sou" para entender a identidade de Cristo?',
  'Como o sinal da ressurreicao de Lazaro aponta para a ressurreicao de Cristo?',
  'O que significa "nascer de novo" (João 3:3-8)?',
  'De que forma a oracao sumo-sacerdotal de Jesus (João 17) revela Seu coração?',
  'Como a washing dos pes (João 13) ensina sobre servico e humildade?',
  'Qual a relação entre a verdade e a liberdade (João 8:31-36)?',
  'De que maneira a ressurreição de Joao 20 confirma todas as promessas de Cristo?',
];

export default function JoaoPage() {
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
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~85-95 d.C., Efeso</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Evangelho</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introducao ao Evangelho de João
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    O Evangelho de João e o quarto e ultimo evangelho do Novo Testamento. Escrito por João, o "discipulo amado", por volta de 85-95 d.C. em Efeso, é considerado o evangelho mais teológico e espiritual dos quatro.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Enquanto Mateus, Marcos e Lucas (os synopticos) focam nos fatos da vida de Jesus, João foca no significado divino desses fatos. João apresenta Jesus como o Verbo eterno, o Filho de Deus, Deus encarnado. Seu proposito e declarar que "Jesus e o Cristo, o Filho de Deus, para que, crendo, tenhais vida em seu nome" (20:31).
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

          {secaoAtiva === 'estrutura' && (
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

          {secaoAtiva === 'eusou' && (
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
                        <h3 className="font-display text-lg font-medium">{e.titulo}</h3>
                        <span className="text-xs text-primary ml-auto">{e.referencia}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{e.descricao}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {secaoAtiva === 'sinais' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />Os 7 Sinais/Milagres
                </h2>
                <p className="text-muted-foreground mb-4">João seleciona exatamente 7 sinais para provar que Jesus e o Cristo, o Filho de Deus:</p>
                <div className="space-y-4">
                  {sinais.map((s, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{i + 1}</span>
                        <div className="flex-1">
                          <h3 className="font-display text-sm font-medium">{s.titulo}</h3>
                          <p className="text-xs text-primary">{s.referencia}</p>
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

          {secaoAtiva === 'prologo' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />O Prologo: João 1:1-18 Versículo por Versículo
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
