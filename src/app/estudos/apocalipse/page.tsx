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
  Eye, Flame, Crown, Sword, Star, AlertTriangle,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introdução' },
  { id: 'interpretações', label: 'Visões Interpretativas' },
  { id: 'seteigrejas', label: 'As 7 Igrejas' },
  { id: 'versiculos', label: 'Versículos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: '2122', label: 'Caps. 21-22' },
  { id: 'aplicação', label: 'Aplicação' },
  { id: 'perguntas', label: 'Perguntas' },
];

const sistemasInterpretativos = [
  {
    nome: 'Historicista',
    exponentes: 'Calvino, Wesley, Iglesias Reformadas',
    cor: 'border-blue-500',
    bg: 'bg-blue-500/5',
    descricao: 'A historia da igreja se desenrola de Joao ate o fim. Cada selo, trombeta e taça representa eventos ao longo dos seculos. O AntiCristo ja foi identificado com papas, imperadores romanos, etc.',
    pontos: [
      'A Revelacao cobre toda a historia da igreja',
      'A "Babylonia" representa sistemas religiosos corruptos ao longo do tempo',
      'O milenio e espiritual — o reinado de Cristo na igreja',
      'Permitiu que reformadores identificassem o papado como sistema anticristao',
    ],
    fraquezas: [
      'Cada geração tentou colocar sua época como o cumprimento final',
      'Tendencia a interpretar tudo pela lente protestante do séc. XVI',
      'Ignora o contexto literário e cultural do gênero apocalíptico',
    ],
  },
  {
    nome: 'Premilenista Dispensacionalista',
    exponentes: 'C.I. Scofield, Lewis Sperry Chafér, John Walvoord, Charles Ryrie',
    cor: 'border-green-500',
    bg: 'bg-green-500/5',
    descricao: 'Cristo voltará antes do milenio (literál de 1.000 anos). A igreja passará pela tribulação (ou será arrebatada antes). O milenio é um reinado literál de Cristo em Israel. Israel é a Igreja são dois povos distintos de Deus.',
    pontos: [
      'Leva a linguagem apocalíptica de forma literál quando possível',
      'Distingue claramente Israel da Igreja',
      'Oférece uma linha do tempo clara e sistemática',
      'Influenciou amplamente o cristianismo popular no Brasil e EUA',
    ],
    fraquezas: [
      'Confunde literálismo com interpretação correta — apocalipse usa simbolismo',
      'A distinção Israel/Igreja não é clara no NT',
      'Sistema complexo com muitas divisões entre os próprios dispensacionalistas',
      'Igreja dos primeiros séculos nunca ensinou isso',
    ],
  },
  {
    nome: 'Amilenista',
    exponentes: 'Agostinho, George Eldon Ladd, Kim Riddlebarger, Kenneth Gentry',
    cor: 'border-purple-500',
    bg: 'bg-purple-500/5',
    descricao: 'O milenio de Apocalipse 20 e simbólico, representando o reinado atual de Cristo do céu. Nao ha um reinado literál futuro na terra. A "primeira ressurreição" (20:5) e espiritual — a regeneração do crente. O "mil anos" é o período entre a primeira e segunda vinda de Cristo.',
    pontos: [
      'Consistente com a interpretação simbólica do restante do livro',
      'Agostinho desenvolveu esta visão em "A Cidade de Deus"',
      'Evita confusão entre literál e figurativo no mesmo livro',
      'Historia da igreja como periodo messiânico, não como tribulação',
    ],
    fraquezas: [
      'Pode minimizar a escatologia futura é a esperança de retorno de Cristo',
      'A "primeira ressurreição" como espiritual é uma interpolação',
      'Pode levar a um otimismo excessivo sobre o progresso da igreja',
    ],
  },
  {
    nome: 'Pos-amilenista',
    exponentes: 'George Eldon Ladd, Keith Mathison, Jonathan Edwards (historicamente)',
    cor: 'border-amber-500',
    bg: 'bg-amber-500/5',
    descricao: 'Cristo voltará DEPOIS do milenio. O evangelho gradualmente transformará as nações antes do retorno de Cristo. O "mil anos" é simbólico mas representa um periodo real de progresso do Reino. Diférente do pre-milenismo, o reinado é espiritual e gradual, não literál.',
    pontos: [
      'Reconhece o progresso do Reino na historia sem dispensacionalismo',
      'Mantém a escatologia futura sem o literálismo extremo',
      'Historicamente associado ao puritanismo e ao idealismo reformado',
      'Evita tanto o pessimismo dispensacionalista quanto o otimismo liberal',
    ],
    fraquezas: [
      'Difícil de sustentar diante do sofrimento e injustiça persistente na história',
      'Menos influente que o pre-milenismo popular no Brasil',
      'O debate entre pre- e pós-amilenismo é mais teórico que prático',
    ],
  },
];

const seteIgrejas = [
  { nome: 'Eféso', tema: 'A Igreja que Perdeu o Primeiro Amor', verso: '2:1-7', corao: 'Fria', problema: 'Abandono do amor primeiro por Cristo', elogio: 'Fortaleza na doutrina, rejeição de falsos apóstolos', correcao: 'Lembrar de onde caíram, arrepender-se, voltar às primeiras obras', promessa: 'Fruto da árvore da vida' },
  { nome: 'Esmirna', tema: 'A Igreja Perseguida', verso: '2:8-11', corao: 'Sofredora', problema: 'Perseguição por juDeus e romanos', elogio: 'Riqueza espiritual na pobreza material, fidelidade na tribulação', correcao: 'Nenhuma — só exortação para perseverar', promessa: 'Nao será danada pela segunda morte' },
  { nome: 'Pérgamo', tema: 'A Igreja que Compromete a Fé', verso: '2:12-17', corao: 'Morna', problema: 'Tolerância a falsa doutrina (ensino de Balaão, nicolaítas)', elogio: 'Fidelidade onde Satanás habita literálmente', correcao: 'Arrepender-se ou Deus virá com espada', promessa: 'Maná escondido e pedra branca com nome novo' },
  { nome: 'Tiatira', tema: 'A Igreja com Falso Proféta', verso: '2:18-29', corao: 'Enganada', problema: 'Tolerância com a "profétisa Jezabel" — imoralidade e idolatria', elogio: 'Amor, serviço, fé, perseverança — cresceram em boas obras', correcao: 'Afastar Jezabel e arrepender-se dos que a seguem', promessa: 'Autoridade sobre as nações, estrela da manhã' },
  { nome: 'Sardes', tema: 'A Igreja Morta', verso: '3:1-6', corao: 'Morta', problema: 'Aparência de vida, realidade de morte espiritual', elogio: 'Alguns poucos não contaminaram suas vestes', correcao: 'Fortalecer o que resta e está para morrer, arrepender-se', promessa: 'Vestido de branco, nome no livro da vida' },
  { nome: 'Filadélfia', tema: 'A Igreja Fiel', verso: '3:7-13', corao: 'Fiel', problema: 'Pouco poder, mas fidelidade no pequeno', elogio: 'Guardaram a palavra, não negaram o nome de Cristo, abriram porta que ninguém féchará', correcao: 'Nenhuma — só exortação para perseverar', promessa: 'Ser coluna no templo de Deus, nome novo e cidade nova' },
  { nome: 'Laodiceia', tema: 'A Igreja Morna', verso: '3:14-22', corao: 'Morna', problema: 'Auto-satisfação, riqueza material, frieza espiritual', elogio: 'Nenhum — a mais criticada', correcao: 'Comprar ouro refinado, ungir os olhos, arrepender-se', promessa: 'Sentar-se com Cristo no seu trono' },
];

const versiculosChave = [
  {
    referência: 'Apocalipse 1:8',
    texto: 'Eu sou o Alfa é o Omega, o Princípio é o Fim, diz o Senhor, que e, e que era, e que ha de vir, o Todo-Poderoso.',
    explicação: 'A auto-revelação de Cristo em Apocalipse: eterno, soberano, o que sustenta toda a realidade do início ao fim.',
    comentarios: [
      { teologo: 'G.K. Beale', texto: 'A declaração "Alfa e Omega" conecta Cristo ao Deus do Antigo Testamento (Is 44:6). Ele é o autor e consumador da história. Tudo o que Apocalipse descreve — julgamento, salvação, nova criação — está sob sua autoridade soberana.' },
      { teologo: 'David Aune', texto: 'A fórmula "que era, que é e que há de vir" espelha o Nome divino de Êxodo 3:14. Cristo assume a identidade de YHWH. Isso é revolucionário para juDeus monoteístas: Jesus é Deus.' },
    ],
  },
  {
    referência: 'Apocalipse 5:9-10',
    texto: 'E cantavam um cantico novo, dizendo: Tu és digno de tomar o livro e de abrir os seus selos; porque fste immolado, e com teu sangue compraste para Deus gente de toda tribo, e lingua, e povo, e nacao; e deles fizeste para o nosso Deus reis e sacerdotes, e reinarao sobre a terra.',
    explicação: 'O Cordeiro imolado (Cristo) é o único digno de revelar o plano de Deus. A redenção é por sangue, é o fruto é um povo multicultural que reina.',
    comentarios: [
      { teologo: 'Richard Bauckham', texto: 'O cantico do Cordeiro é o climax liturgico de Apocalipse 4-5. A adoração celeste é o centro do livro. O Cordeiro não está morto, mas de pé — a ressurreição é pressuposta. A multidão redimida provém de todas as nações.' },
      { teologo: 'G.K. Beale', texto: 'A linguagem de "comprar com sangue" remete à redenção de Israel no Êxodo. Cristo realize o Êxodo definitivo — redime um povo de todas as nações, não apenas de Israel. Isso cumpre a promessa abraâmica de bênção para todas as nações.' },
    ],
  },
  {
    referência: 'Apocalipse 11:15',
    texto: 'E houve grandes vociféracoes no ceu, dizendo: Os reinos do mundo se tornaram do nosso Senhor e do seu Cristo, e ele reinara para sempre.',
    explicação: 'O objetivo final de toda a história: os reinos do mundo se tornam de Cristo. O reinado é eterno e universal.',
    comentarios: [
      { teologo: 'Craig Koester', texto: 'Esta declaração é o高潮 da narrativa escatológica. Não é apenas um futuro distante, mas uma realidade que se desdobra na história. A cada conversão, a cada transformação social, o Reino avança.' },
      { teologo: 'Gregory Beale', texto: 'O salmo 2 é aqui citado: "Os reinos do mundo se tornaram do meu Filho ungido". Cristo já é Rei, mas o mundo só reconhecerá isso plenamente no fim. Apocalipse mostra o processo entre o "já" é o "ainda não".' },
    ],
  },
];

const temasCentrais = [
  { título: 'Soberania de Cristo', icone: Crown, cor: 'text-yellow-500', descricao: 'Apocalipse revela Cristo como Senhor da historia. Ele abre os selos, envia as trombetas, derrama as taças. Nada acontece fora do seu controle. O livro todo é uma resposta à pergunta: "Quem governa a história?"' },
  { título: 'Adoração Celeste', icone: Star, cor: 'text-blue-500', descricao: 'A adoração é o fio condutor de Apocalipse. Os 24 anciãos, os 4 seres viventes, a multidão vestida de branco — todos adoram ao Cordeiro. A adoração não é entretenimento, mas reconhecimento da soberania divina.' },
  { título: 'Julgamento e Misericórdia', icone: Sword, cor: 'text-red-500', descricao: 'As 7 trombetas e 7 taças são julgamentos progressivos que repetem as pragas do Êxodo. Mas cada julgamento é uma oportunidade de arrependimento. A paciência de Deus é real, mesmo quando o julgamento é severo.' },
  { título: 'Vitória Final', icone: Flame, cor: 'text-green-500', descricao: 'Apocalipse não é um livro de medo, mas de vitória. O Cordeiro venceu. Babilônia caiu. Satanás é derrotado. A nova criação vem. O fim está seguro. O crente pode enfrentar qualquer perseguição sabendo que o resultado final já está decidido.' },
  { título: 'Perseverança na Perseguição', icone: AlertTriangle, cor: 'text-orange-500', descricao: 'Sete vezes Jesus diz "seja fiel até a morte e eu te darei a coroa da vida". O contexto de Apocalipse é a perseguição sob Domiciano (~95 d.C.). O livro é um chamado à fidelidade, não ao medo.' },
];

const versiculos21_22 = [
  { verso: '21:1-2', texto: 'Vi um ceu novo é uma terra nova; porque o ceu primeiro é a terra primeira passaram; é o mar ja não existia. E eu, Joao, vi a santa cidade, a nova Jerusalém, que de Deus descia do ceu, aparelhada como uma esposa para o seu marido.', explicação: 'A nova criação substitui a velha. A nova Jerusalém é a Igreja, noiva de Cristo. Nao ha mais mar (simbolo de caos e separacao).', teologo: 'Beale: "A nova Jerusalém é a realizes definitiva do Eden — o templo de Deus habitando com os homens"' },
  { verso: '21:3-4', texto: 'E ouvi uma grande voz do ceu, dizendo: Eis o tabernaculo de Deus com os homens, e ele habitara com eles. E eles seráo seu povo, e Deus será com eles, e será seu Deus. E enxugara toda lagrima dos seus olhos; é a morte ja não existira, nem houve lamento, nem clamor, nem dor, pois ja as primeiras coisas passaram.', explicação: 'A promessa mais bela da Escritura: Deus habita com os homens. Nao ha mais sofrimento. A morte e derrotada. A nova criação é a restauracao da comunhão perdida em Eden.', teologo: 'N.T. Wright: "Isto não é uma fuga do mundo, mas a renovação de todas as coisas. Deus não destrói a criação, mas a transforma"' },
  { verso: '21:5', texto: 'E o que estava assentado sobre o trono disse: Eis que eu faço todas as coisas novas.', explicação: 'Deus é o renovador. Nao apenas conserta, mas cria algo novo. A novidade e total — céu, terra, humanidade, comunhão.', teologo: 'Richard Bauckham: "Todas as coisas novas" não é substituição, mas renovação. A criação original era boa, e Deus a restaura à sua intenção original' },
  { verso: '21:22-27', texto: 'E não vi templo nela; porque o Senhor Deus Todo-Poderoso é o Cordeiro são o seu templo. E a cidade não precisa de sol nem de lua para a alumiar; porque a glória de Deus a alumia, é o Cordeiro é a sua lumiar.', explicação: 'Nao ha templo porque toda a cidade e templo. Deus é o Cordeiro substituem o sol. A luz é a propria presenca divina.', teologo: 'G.K. Beale: "A ausencia de templo indica que toda a criação se tornou sagrada. Nao ha mais espaco secular — tudo é culto a Deus"' },
  { verso: '22:1-5', texto: 'E mostrou-me um rio limpo da água da vida, claro como cristal, saindo do trono de Deus e do Cordeiro. E no meio da rua da cidade, e de um e de outro lado do rio, estava a arvore da vida, que produzia doze frutos, e deu o seu fruto cada mes; e as folhas da arvore eram para a saude das nações. E ja não haverá maldição.', explicação: 'O rio é a arvore da vida remetem ao Gênesis (2:9-10). A maldição de Gênesis 3 é removida. As folhas são para saude — a cura completa da humanidade.', teologo: 'Jurgen Moltmann: "Apocalipse 22 é o Gênesis 2 restaurado. O que foi perdido em Eden é recuperado na nova criação. O ciclo da historia se fécha: criação, queda, redenção, restauração"' },
];

const aplicações = [
  'Adore a Cristo como Senhor soberano — nada acontece fora do seu controle.',
  'Persevere na fé mesmo na perseguição — o Cordeiro venceu.',
  'Avalie se sua igreja é como Filadélfia (fiel) ou Laodiceia (morna).',
  'Espere pela nova criação com esperança concreta — não e fuga, mas renovação.',
  'Estude Apocalipse com humildade — não é um quebra-cabeca, mas um livro de adoração.',
  'Recuse o medo — o livro da revelação é dado para abençoar, não para assustar (1:3).',
  'Viva para a eternidade — as coisas presentes são temporarias.',
  'Pratique a justiça é a santidade — a nova criação e para os santos.',
];

const perguntas = [
  'Qual a importância de ler Apocalipse como literátura apocalíptica, não como código secreto?',
  'Como a soberania de Cristo em Apocalipse se relaciona com a cruz?',
  'Qual a diférença entre as 7 trombetas e as 7 taças? Por que a estrutura repetitiva?',
  'Como a visão da nova criação (caps. 21-22) nos dá esperança em tempos difíceis?',
  'Por que há tantas interpretações diférentes de Apocalipse? Qual a abordagem mais saudável?',
  'O que a queda de Babilônia (caps. 17-18) nos ensina sobre os sistemas mundanos?',
  'Como a liturgia celestial de Apocalipse 4-5 pode transformar nossa adoração?',
  'Qual a mensagem de Apocalipse para a igreja perseguida hoje?',
];

export default function ApocalipsePage() {
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
              <span className="text-foreground">Apocalipse</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Apocalipse de Joao</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Joao, Apostolo</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~95 d.C., Ilha de Patmos</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Genero Apocalitico</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introdução ao Apocalipse
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    O Apocalipse de Joao é o ultimo livro do Novo Testamento, escrito por Joao durante o exilio na ilha de Patmos (~95 d.C.) sob o imperador Domiciano. O nome "Apocalipse" significa "revelação" — é o Livro da Revelação de Jesus Cristo, não de mistérios obscuros.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Genero apocalitico judaico-cristão — cheio de simbolismo, números significativos (7, 12, 144.000), visões oníricas e linguagem figurada. Assim como Daniel, Ezequiel e Zacarias usaram simbolismo apocalitico, Joao segue essa tradição. O livro não é um código secreto para desvendar o futuro, mas um livro de adoração e esperança para igrejas perseguidas.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Autoria e Data</h3>
                      <p className="text-sm text-muted-foreground">Joao, o discípulo amado, escreveu de Patmos. A maioria dos estudiosos data entre 95-96 d.C. durante a perseguição de Domiciano. Uma minoria defénde data nerôniana (~65 d.C.).</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Genero Literário</h3>
                      <p className="text-sm text-muted-foreground">Apocalipse não é profécia linear nem alegoria pura. É literátura apocalíptica: revelação divina por meio de visões simbólicas, com estrutura literária complexa (seis séptuplos principais).</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl mt-4">
                    <h3 className="font-display text-sm font-medium mb-2">Estrutura Geral</h3>
                    <p className="text-sm text-muted-foreground">As coisas que são (1-3), as que são e que hão de ser (4-22): Cristo entre as 7 igrejas (1-3), o trono é o Cordeiro (4-5), os 7 selos (6-8:1), as 7 trombetas (8:2-11:19), os sinais maiores (12-14), as 7 taças (15-16), Babilônia (17-19), milênio e julgamento final (20), nova criação (21-22).</p>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'interpretações' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />Os 4 Principais Sistemas Interpretativos
                </h2>
                <p className="text-muted-foreground mb-4">Existem quatro grandes abordagens para interpretar Apocalipse. Cada uma tem pontos fortes e fracos. Conhece-las ajuda a evitar extremos.</p>
                <div className="space-y-4">
                  {sistemasInterpretativos.map((s, i) => (
                    <div key={i} className={`sola-card p-5 border-l-4 ${s.cor} ${s.bg}`}>
                      <h3 className="font-display text-lg font-medium mb-1">{s.nome}</h3>
                      <p className="text-xs text-primary font-medium mb-2">{s.exponentes}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.descricao}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Pontos Fortes</p>
                          <ul className="space-y-1">
                            {s.pontos.map((p, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />{p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Fraquezas</p>
                          <ul className="space-y-1">
                            {s.fraquezas.map((f, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'seteigrejas' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />As 7 Igrejas da Asia Menor
                </h2>
                <p className="text-muted-foreground mb-4">Cada uma das 7 igrejas recebe uma mensagem personalizada de Cristo. Elas representam tipos de igrejas em todas as épocas, bem como situações reais do primeiro século.</p>
                <div className="space-y-3">
                  {seteIgrejas.map((ig, i) => (
                    <IgrejaCard key={i} igreja={ig} index={i} />
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

          {seçãoAtiva === '2122' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />Apocalipse 21-22: A Nova Criação
                </h2>
                <p className="text-muted-foreground mb-4">O clímax de toda a Escritura: a nova criação. O Gênesis se encontra com o Apocalipse. O que foi perdido em Eden é restaurado para sempre.</p>
                <div className="space-y-4">
                  {versiculos21_22.map((v, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{i + 1}</span>
                        <p className="font-display text-sm font-medium text-primary">{v.verso}</p>
                      </div>
                      <p className="text-sm italic text-muted-foreground mb-2 ml-11 font-serif-body">&ldquo;{v.texto}&rdquo;</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2 ml-11">{v.explicação}</p>
                      <div className="ml-11 p-2 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-xs text-primary font-medium italic">&ldquo;{v.teologo}&rdquo;</p>
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

function IgrejaCard({ igreja, index }: { igreja: { nome: string; tema: string; verso: string; corao: string; problema: string; elogio: string; correcao: string; promessa: string }; index: number }) {
  const [expandido, setExpandido] = useState(false);
  return (
    <motion.div layout className="sola-card overflow-hidden">
      <div className="p-4 cursor-pointer" onClick={() => setExpandido(!expandido)}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{index + 1}</span>
            <div>
              <p className="font-display text-sm font-medium">{igreja.nome}</p>
              <p className="text-xs text-muted-foreground">{igreja.verso} — {igreja.tema}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              igreja.corao === 'Fiel' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
              igreja.corao === 'Sofredora' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
              igreja.corao === 'Morta' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
              'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
            }`}>{igreja.corao}</span>
            <motion.div animate={{ rotate: expandido ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {expandido && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-2">
              <div><span className="text-xs font-semibold text-red-600 dark:text-red-400">Problema: </span><span className="text-sm text-muted-foreground">{igreja.problema}</span></div>
              <div><span className="text-xs font-semibold text-green-600 dark:text-green-400">Elogio: </span><span className="text-sm text-muted-foreground">{igreja.elogio}</span></div>
              <div><span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Correcao: </span><span className="text-sm text-muted-foreground">{igreja.correcao}</span></div>
              <div><span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Promessa: </span><span className="text-sm text-muted-foreground">{igreja.promessa}</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
