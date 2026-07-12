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
  Sparkles, Heart, Shield, Users, Globe, Flame,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'versiculos', label: 'Versiculos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'expansao', label: 'Expansao do Evangelho' },
  { id: 'aplicacao', label: 'Aplicacao' },
  { id: 'perguntas', label: 'Perguntas' },
];

const estrutura = [
  { parte: 'Parte I: A Igreja em Jerusalem (Caps. 1-12)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Caps. 1-2: Ascensao de Cristo, Pentecostes, nascimento da Igreja',
    'Caps. 3-5: Pedro e Joao curam, interrogatorio, disciplina interna (Ananias e Safira)',
    'Caps. 6-7: Diáconos, Estevao — primeiro martirio',
    'Caps. 8-12: Expansao through perseguição: Samaria, Etiópia, Saulo, Cornélio, Herodes',
  ]},
  { parte: 'Parte II: A Igreja entre os Gentios (Caps. 13-28)', cor: 'border-green-500', bg: 'bg-green-500/5', itens: [
    'Caps. 13-14: Primeira viagem missionaria — Antioquia da Pisidia, Iconio, Listra, Derbe. Barnabé e Paulo pregam primeiro na sinagoga, depois aos gentios',
    'Caps. 15: Concílio de Jerusalem — a decisao mais importante da igreja primitiva: gentios nao precisam se circuncidar nem observar a Lei de Moises',
    'Caps. 16-18: Segunda viagem — Troas (chamado para a Macedonia), Filipos (Lídia, carcereiro), Tessalônica, Bereia, Atenas (areópago), Corinto (18 meses)',
    'Caps. 19-20: Terceira viagem — Éfeso (revolta de Demétrio), Miletus (despedida emocionante dos anciãos), Paulo prediz sua prisão',
    'Caps. 21-26: Prisão de Paulo em Jerusalem, transferencia para Cesarea, julgamento perante Félix, Festo e Agripa II, apelação a César',
    'Caps. 27-28: Naufragio em Malta (serpente, cura do pai de Públio), chegada a Roma, ministério final sob guarda militar por dois anos',
  ]},
];

const versiculosChave = [
  {
    referencia: 'Atos 1:8',
    texto: 'Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas em Jerusalém, e em toda a Judéia, e Samaria, e até os confins da terra.',
    explicacao: 'Este versiculo e a tese central de todo o livro de Atos. O progresso geografico — Jerusalém, Judéia, Samaria, terra — espelha a estrutura do próprio livro. O Espírito Santo e a fonte do testemunho, nao a capacidade humana.',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'Atos 1:8 funciona como um sumário programático de todo o livro. Cada seção narrativa pode ser mapeada neste versiculo: Jerusalém (caps. 1-7), Judéia e Samaria (caps. 8-12), confins da terra (caps. 13-28). A promessa do Espírito não é apenas para os apóstolos, mas para todos os crentes que testemunham.' },
      { teologo: 'C.K. Barrett', texto: 'O mandato missionário de 1:8 substitui a expectativa nacionalista de restauração do reino de Israel (v.6). Jesus redireciona a pergunta sobre o reino para a missão universal. O testemunho não é uma opção, mas a razão de ser da Igreja.' },
      { teologo: 'Craig Keener', texto: 'A ordem geográfica de 1:8 desafia o particularismo judeu. Samaria era vista como terra impura, mas o evangelho rompe barreiras étnicas e religiosas. Keener destaca que Lucas usa a geografia como recurso teológico: o evangelho é para todas as nações.' },
    ],
  },
  {
    referencia: 'Atos 2:42',
    texto: 'E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações.',
    explicacao: 'Este versiculo descreve os quatro pilares da igreja primitiva: ensino apostólico, koinonia (comunhão), culto eucarístico e oração. Não eram atividades isoladas, mas um estilo de vida integrado.',
    comentarios: [
      { teologo: 'Ekkehard Schnabel', texto: 'Os quatro elementos de 2:42 não são programas da igreja, mas marcas da comunidade messiânica. A "doutrina dos apóstolos" refere-se ao ensino sobre Jesus como Messias cumpridor das Escrituras. A koinonia inclui compartilhamento de bens materiais (2:44-45).' },
      { teologo: 'David Peterson', texto: 'Lucas retrata a igreja primitiva como modelo para todas as igrejas, não como norma legalista. A comunhão não é apenas espiritual, mas inclui solidariedade prática. O "partir do pão" refere-se tanto à refeição comum quanto à ceia do Senhor.' },
    ],
  },
  {
    referencia: 'Atos 4:32',
    texto: 'E a multidão dos que creram era de um coração e de uma alma; e ninguém dizia que coisa alguma das suas lhes era própria, mas todas as coisas lhes eram comuns.',
    explicacao: 'A comunidade de bens em Atos 4:32-35 não é um mandamento universal, mas uma描述 da radical generosidade da igreja primitiva. Era voluntário, não coercitivo (como Ananias e Safira demonstram).',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'A descrição de Lucas em 4:32-35 não impõe um sistema econômico, mas revela a transformação do coração causada pelo evangelho. A propriedade privada não foi abolida (Atos 5:4), mas os crentes usavam seus bens para suprir necessidades alheias.' },
      { teologo: 'Ben Witherington III', texto: 'Lucas apresenta a comunidade de bens como fruto espontâneo do Espírito, não como legislação eclesiástica. É uma antecipação do Reino, onde o amor supera a avareza. A disciplina de Ananias e Safira mostra que Deus leva a sinceridade a sério.' },
    ],
  },
  {
    referencia: 'Atos 17:11',
    texto: 'Ora, estes eram mais nobres do que os que estavam em Tessalônica, pois receberam a palavra com toda a avidez, examinando diariamente as Escrituras para ver se as coisas eram assim.',
    explicacao: 'Os bereanos são o modelo de estudo bíblico: receberam a Palavra com avidez, mas verificaram tudo pelas Escrituras. Nobleza espiritual está ligada à diligência no estudo.',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'Os bereanos não aceitavam nada sem verificação. Esta atitude não é irreverência, mas maturidade espiritual. Eles examinavam as Escrituras (Septuaginta) diariamente para confirmar se o que Paulo pregava estava em harmonia com o Antigo Testamento.' },
      { teologo: 'Paul Kadetz', texto: 'A nobreza dos bereanos reside em sua disposição de submeter-se à autoridade das Escrituras acima da autoridade humana. É um modelo de discernimento: aceitar a Palavra, mas sempre verificando. Kadetz destaca que esta passagem é um apelo à responsabilidade interpretativa.' },
    ],
  },
  {
    referencia: 'Atos 20:28',
    texto: 'Pastoreai a igreja de Deus, que ele adquiriu com seu próprio sangue.',
    explicacao: 'Paulo exorta os anciãos de Éfeso a pastorear a igreja que Deus comprou com o sangue de Cristo. A igreja pertence a Deus, não a líderes humanos.',
    comentarios: [
      { teologo: 'Ekkehard Schnabel', texto: 'A expressão "igreja de Deus" (ekklēsia tou theou) sublinha a proprietária divina da comunidade. Os líderes são mordomos, não donos. O "sangue próprio" refere-se à morte expiatória de Cristo, fundamento da redenção.' },
      { teologo: 'C.K. Barrett', texto: 'Barrett observa que a fórmula "igreja de Deus" em Atos 20:28 é um dos títulos mais exaltados da comunidade cristã. A responsabilidade pastoral é grave porque a igreja não é uma organização humana, mas o povo comprado pelo sangue de Cristo.' },
    ],
  },
];

const versiculosExtras = [
  {
    referencia: 'Atos 1:8',
    texto: 'Mas recebereis a virtude do Espirito Santo, que ha de vir sobre vos; e ser-me-eis testemunhas em Jerusalém, e em toda a Judeia, e Samaria, e ate os confins da terra.',
    explicacao: 'A tese central de Atos: o Espirito Santo e a fonte do testemunho. A missao nao e opcional — e a razao de ser da Igreja. A expansao geografica espelha a estrutura do livro.',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'Atos 1:8 funciona como sumario programatico de todo o livro. Cada secao narrativa pode ser mapeada neste versiculo: Jerusalem (caps. 1-7), Judeia e Samaria (caps. 8-12), confins da terra (caps. 13-28). A promessa do Espirito nao e apenas para os apostolos, mas para todos que testemunham.' },
      { teologo: 'Craig Keener', texto: 'A ordem geografica de 1:8 desafia o particularismo judeu. Samaria era vista como terra impura, mas o evangelho rompe barreiras etnicas e religiosas. Keener destaca que Lucas usa a geografia como recurso teologico: o evangelho e para todas as nacoes.' },
    ],
  },
  {
    referencia: 'Atos 2:42-47',
    texto: 'E perseveravam na doutrina dos apostolos, e na comunhao, e no partir do pao, e nas oracoes. E em toda alma havia temor; e muitos prodigios e sinais eram feitos pelos apostolos. E todos os que tinham criam, e tudo tiham comum.',
    explicacao: 'O retrato mais completo da igreja primitiva: quatro pilares (doutrina, comunhao, culto, oracao), temor de Deus, sinais sobrenaturais e generosidade radical.',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'Lucas nao esta descrevendo um programa institucional, mas o fruto espontaneo do Espirito. A comunhao (koinonia) nao era apenas espiritual, mas incluia compartilhamento de bens materiais. Era a consequencia natural do evangelho no coracao.' },
      { teologo: 'David Peterson', texto: 'Os quatro pilares de 2:42 sao marcas da vida cristã, nao opcoes. A doutrina dos apostolos e o ensino sobre Jesus Cristo. A comunhao e a partilha da vida em Cristo. O partir do pao inclui a ceia do Senhor e as refeicoes em comum.' },
    ],
  },
  {
    referencia: 'Atos 4:12',
    texto: 'E em nenhum outro ha salvacao; porque tambem nao ha outro nome debaixo do ceu, dado entre os homens, pelo qual devamos ser salvos.',
    explicacao: 'A exclusividade de Cristo e declarada sem rodeios. Nao ha plano B, nao ha salvacao por outra via. Jesus e o unico Mediador entre Deus e os homens.',
    comentarios: [
      { teologo: 'C.K. Barrett', texto: 'Pedro fala diante do Sinhedrio, o tribunal religioso mais poderoso de Israel. A afluicao "dado entre os homens" sublinha a encarnacao: Deus agiu na historia por meio de um homem especifico — Jesus de Nazare.' },
      { teologo: 'Craig Keener', texto: 'A exclusividade de Cristo em Atos 4:12 nao e intolerancia, mas urgencia missionaria. Se nao ha outro nome, entao a proclamacao do evangelho e questao de vida ou morte eterna. Keener destaca o paralelo com o monoteismo judeu: um so Deus, um so nome.' },
    ],
  },
  {
    referencia: 'Atos 7:54-60',
    texto: 'Ouvindo eles estas coisas, cortavam-se nos coracoes, e rangeam os dentes contra ele. Mas ele, cheio do Esprito Santo, fitando os olhos no ceu, viu a gloria de Deus, e Jesus de pe a destra de Deus, e disse: Eis que vejo os ceus abertos, e o Filho do homem de pe a destra de Deus.',
    explicacao: 'O martirio de Estevao e o primeiro registro de um crente morrendo por Cristo. Ele perdoa ao mesmo modelo que Jesus: "Senhor, nao lhes imputes este pecado." O sangue do primeiro martir semeia o evangelho.',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'Estevao e o primeiro martir cristão, e seu martirio e o catalisador da expansao do evangelho. Os que o apedrejaram espalharam os crentes (8:1), levando o evangelho a Samaria e alem. O martirio e paradoxalmente instrumento de missao.' },
      { teologo: 'Ben Witherington III', texto: 'A visao de Estevao e o paralelo exato com a ascensao de Jesus: ele ve os ceus abertos e o Filho do homem de pe. Estevao e o primeiro a ver o que Jesus fez no ceu. Seu perdao (7:60) e o exemplo supremo de amor aos inimigos.' },
    ],
  },
  {
    referencia: 'Atos 8:26-40',
    texto: 'E o anjo do Senhor falou a Filipe, dizendo: Levanta-te, e vai para o sul, ao caminho que desce de Jerusalém a Gaza... E Filipe, correndo para la, ouviu que ele lia o profeta Isaias, e disse: Entendes o que lees?...',
    explicacao: 'O encontro entre Filipe e o eunuco etiopie e um modelo de evangelismo pessoal guiado pelo Espirito. O Espirito direciona, Filipe obedece, o eunuco pergunta, e a salvacao acontece.',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'O eunuco era um proselito judeu (catecumeno) que viajava de volta da adoracao em Jerusalém. Era um gentio que buscou a Deus, mas estava incompleto — precisava de Cristo. Filipe e o instrumento, mas o Espirito e o autor da conversao.' },
      { teologo: 'Craig Keener', texto: 'O batismo do eunuco desafia o preconceito judeu: os etiopes eram vistos como inferiores (Jeremias 13:23). Mas o evangelho rompe barreiras raciais e culturais. Keener destaca que o batismo na agua e publico — a profissao de fe e aberta.' },
    ],
  },
  {
    referencia: 'Atos 13:1-3',
    texto: 'Havia na igreja que estava em Antioquia prophetas e mestres: Barnabé, Simeao, chamado Niger, e Lucio de Cirene, e Manaen, que fora criado com Herodes o tetrarca, e Saulo. E, ministrando eles ao Senhor, e jejuando, disse o Espirito Santo: Apartai-me Barnabé e Saulo para a obra a que os chamei.',
    explicacao: 'A primeira referencia explicita de chamada missionaria no NT. O Espirito Santo fala diretamente a igreja. A oracao e o jejunam precedem a separacao para a missao.',
    comentarios: [
      { teologo: 'Ekkehard Schnabel', texto: 'Antioquia era a terceira maior cidade do Imperio Romano, multicultural e portuaria. A lideranca era etnicamente diversa: Simeao Niger (africano), Lucio de Cirene (libio), Manaen (romano). A diversidade da lideranca reflete a universalidade do evangelho.' },
      { teologo: 'Ben Witherington III', texto: 'O chamado de Barnabé e Saulo e um modelo para a missao cristã: a igreja local reconhece, a comunidade envia, o Espirito direciona. Nao e missao individual, mas eclesial. A oracao e o jejunam sao a preparacao espiritual para o trabalho missionario.' },
    ],
  },
  {
    referencia: 'Atos 15:1-29',
    texto: 'E alguns que desceram da Judeia ensinavam os irmaos: Se nao vos circumcirdes segundo o costume de Moises, nao podeis ser salvos. ... Entao aos apostolos e anciaos, em Jeruselem, este negocio...',
    explicacao: 'O Concilio de Jerusalém e a decisao mais importante da igreja primitiva. A questao: gentios precisam se submeter a Lei de Moises para ser salvos? A resposta: nao. A salvacao e pela graça de Cristo, nao pela obra da Lei.',
    comentarios: [
      { teologo: 'F.F. Bruce', texto: 'O Concilio de Jerusalém e o modelo biblico para resolver disputas teologicas na igreja. Pedro, Paulo e Barnabé falam; Tiago preside; a decisao e unanime. A autoridade esta na Escritura, na experiencia, e na direcao do Espirito.' },
      { teologo: 'James D.G. Dunn', texto: 'A decisao de Jerusalém nao foi meramente pragmatica, mas teologica. O Espirito Santo ja havia dado dons aos gentios (10:44-47), provando que Deus os aceitava sem Lei. A igreja apenas reconheceu o que Deus ja estava fazendo.' },
    ],
  },
];

const temasCentrais = [
  { titulo: 'Expansão do Evangelho', icone: Globe, cor: 'text-blue-500', descricao: 'O livro de Atos mostra o progresso geográfico e cultural do evangelho: de Jerusalém à Roma, de judeus a gentios, de um grupo perseguido a um império transformado. Cada obstáculo — perseguição, barreiras culturais, prisão — se torna oportunidade para o evangelho avançar.' },
  { titulo: 'O Espírito Santo', icone: Flame, cor: 'text-orange-500', descricao: 'O Espírito Santo é o protagonista de Atos. Ele inspira (1:8), descende (2:1-4), direciona (8:29, 10:19, 13:2), enche (4:8, 4:31), e faz maravilhas por meio dos crentes. Atos é o livro do Espírito Santo em ação na Igreja.' },
  { titulo: 'Missões e Universalidade', icone: Target, cor: 'text-green-500', descricao: 'O universalismo do evangelho se revela gradualmente: judeus (caps. 1-7), samaritanos (8:4-25), etíope (8:26-40), cornélio (10:1-48), gentios em Antioquia (11:19-26), gregos em Atenas (17:16-34). Deus não faz acepção de pessoas.' },
  { titulo: 'Perseguição e Fé', icone: Shield, cor: 'text-red-500', descricao: 'A perseguição não destrói a Igreja, mas a espalha. Estêvão é apedrejado (7), mas seu martírio leva o evangelho a Samaria. Paulo e Barnabé são expulsos de Listra (14), mas retornam para fortalecer os convertidos. O sangue dos mártires é semente da Igreja. O sofrimento não é acidente — é o caminho normal da fidelidade cristã.' },
  { titulo: 'A Igreja Primitiva como Modelo', icone: Users, cor: 'text-purple-500', descricao: 'Lucas retrata a igreja de Jerusalem como paradigma: ensino apostólico, comunhão genuína, oração constante, generosidade radical e poder sobrenatural. Não é um modelo legalista, mas um padrão inspirador para todas as igrejas. A diversidade de liderança (judeus, helenistas, gentios) demonstra que o evangelho transcende barreiras culturais desde o início da história da Igreja.' },
  { titulo: 'A Oração e o Poder', icone: Sparkles, cor: 'text-pink-500', descricao: 'A oração é o fio condutor de Atos: precede a descida do Espirito (1:14), acompanha o nascimento da igreja (2:42), provoca sinais (4:31), direciona missões (13:2-3), e sustenta Paulo em todas as tribulações. Sem oração, nao ha poder. Com oração, o impossivel se torna realidade. A oração não é uma opção — é a condição para o avivamento.' },
];

const expansao = [
  { regiao: 'Jerusalém (Caps. 1-7)', cor: 'bg-blue-500', descricao: 'O evangelho começa no centro do judaísmo. Pentecostes, 3.000 convertidos, curas, ensino apostólico. A perseguição dos saduceus leva à prisão, mas o Espírito amplia o ministério. A igreja cresce de 120 para milhares em poucos anos.', versiculo: 'At 1:8 — "em Jerusalém"' },
  { regiao: 'Judéia e Samaria (Caps. 8-12)', cor: 'bg-green-500', descricao: 'A perseguição espalha os crentes. Filipe evangeliza Samaria e o eunuco etíope. Pedro converte Cornélio, rompendo a barreira judeu-gentio. Herodes persegue, mas Deus o julga. A fronteira cultural e geográfica é rompida pelo poder do Espírito.', versiculo: 'At 1:8 — "em toda a Judéia, e Samaria"' },
  { regiao: 'Confins da Terra (Caps. 13-28)', cor: 'bg-purple-500', descricao: 'Paulo e Barnabé partem de Antioquia. Três viagens missionárias percorrem a Ásia Menor, Grécia e Mediterrâneo. O livro termina em Roma, centro do império, com Paulo pregando livremente. O evangelho alcançou o centro do mundo antigo.', versiculo: 'At 1:8 — "até os confins da terra"' },
];

const aplicacoes = [
  'Receba a Palavra com avidez como os bereanos — estude diariamente as Escrituras (At 17:11).',
  'Dependa do Espirito Santo em tudo — nao ha missao sem o poder do Espirito (At 1:8).',
  'Nao tema a perseguiçao — Deus usa as dificuldades para espalhar o evangelho (At 8:1-4).',
  'Pratique a comunhao genuina — compartilhe tempo, talentos e bens com necessitados (At 2:44-45).',
  'Esteja pronto para dar razao da esperança — Paulo sempre argumentou pelas Escrituras (At 17:2-3).',
  'Ore com ousadia — a oracao precede o poder (At 4:31, 16:25-26).',
  'Aceite a vontade de Deus mesmo quando e inesperada — o etíope, Cornélio, Paulo em Troas (At 8, 10, 16).',
  'Nao julgue pelas aparências — Deus trabalha entre samaritanos, etíopes e gentios (At 8, 10).',
  'Mantenha a alegria mesmo na perseguiçao — os apostolos saíram alegrando-se por serem julgados por causa do nome (At 5:41).',
  'Reconheça que a Igreja pertence a Deus — os lideres sao mordomos, nao donos (At 20:28).',
  'Perdoe como Estevão perdoou seus assassinos — o amor aos inimigos é marca do evangelho (At 7:60).',
  'Seja sensível à direção do Espirito — Ele guia decisões missionárias concretas (At 8:29, 10:19, 13:2).',
];

const perguntas = [
  'Como Atos 1:8 funciona como tese de todo o livro? Identifique cada etapa na narrativa.',
  'Qual a relação entre perseguição e expansão do evangelho? Cite exemplos.',
  'O que a descida do Espírito em Pentecostes (At 2) significa para a vida da Igreja hoje?',
  'Como os bereanos (At 17:11) modelam o estudo bíblico correto?',
  'Por que o Concílio de Jerusalém (At 15) é tão importante para a teologia da graça?',
  'Qual a diferença entre a comunidade de bens em Atos 4 e o comunismo?',
  'Como Paulo adaptou sua mensagem ao público (judeus, filósofos, gentios)? O que isso nos ensina?',
  'Qual é a lição mais importante de Atos para a igreja contemporânea?',
  'Como a oração precede e acompanha cada etapa da missão em Atos (1:14, 2:42, 4:31, 13:2-3)?',
  'O que o martírio de Estêvão (cap. 7) ensina sobre fidelidade e perdão?',
  'Como Pedro aprendeu a incluir os gentios (caps. 10-11)? Qual a lição para preconceitos?',
  'Qual a importância do Concílio de Jerusalém (cap. 15) para a relação entre Lei e Graça?',
  'De que forma a narrativa de Atos mostra que o evangelho é para todas as culturas e idiomas?',
  'Como os sinais e prodigios em Atos se relacionam com a missão da igreja?',
];

export default function AtosPage() {
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
              <span className="text-foreground">Atos dos Apostolos</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Atos dos Apostolos</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Lucas, Medico e Historiador</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~62-80 d.C.</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Historia Narrativa</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introducao ao Livro de Atos
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Atos dos Apostolos e o segundo volume da obra de Lucas, escrito junto com o Evangelho de Lucas (~62-80 d.C.). Enquanto o Evangelho relata tudo o que Jesus "começou a fazer e ensinar", Atos continua essa narrativa por meio do Espírito Santo agindo na Igreja.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    O livro e a ponte entre os Evangelhos e as Epistolas. Sem Atos, nao entenderiamos como o movimento cristão passou de um grupo de 120 judeus em Jerusalém a uma fé que alcançou o centro do mundo antigo — Roma. E a historia do Espírito Santo em ação.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Autor: Lucas</h3>
                      <p className="text-sm text-muted-foreground">Lucas era medico (Col 4:14), companheiro de Paulo (usamos "nós" em At 16:10-17, 20:5-15, 21:1-18, 27:1-28:16). Era historiador rigoroso, dedicado a investigar e ordenar os fatos com precisão (Lc 1:1-4).</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Propósito</h3>
                      <p className="text-sm text-muted-foreground">Lucas quer mostrar como o evangelho se expandiu de Jerusalém aos confins da terra (1:8), como gentios foram incluídos no povo de Deus, e como a Igreja é a continuação da obra de Cristo pelo Espírito Santo.</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl mt-4">
                    <h3 className="font-display text-sm font-medium mb-2">Data e Contexto</h3>
                    <p className="text-sm text-muted-foreground">A maioria dos estudiosos data Atos entre 62-80 d.C. A narrativa termina com Paulo preso em Roma (28:30-31), provavelmente antes de sua martírio (~64-67 d.C.). A obra foi escrita para Teófilo e, por extensão, para todos os crentes que buscavam compreender a obra do Espírito.</p>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}

          {secaoAtiva === 'estrutura' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />Estrutura do Livro
                </h2>
                <p className="text-muted-foreground mb-4">A estrutura de Atos segue a tese de 1:8 e pode ser dividida em duas grandes partes:</p>
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

          {secaoAtiva === 'versiculos' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />Versiculos Adicionais com Comentario
                </h2>
                <div className="space-y-6">
                  {versiculosExtras.map((v, i) => (
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

          {secaoAtiva === 'versiculos' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />Versiculos Adicionais com Comentario
                </h2>
                <div className="space-y-6">
                  {versiculosExtras.map((v, i) => (
                    <VersiculoCard key={i} versiculo={v} />
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {secaoAtiva === 'expansao' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />Expansao Geografica do Evangelho
                </h2>
                <p className="text-muted-foreground mb-4">A tese de Atos 1:8 se cumpre progressivamente ao longo do livro. Cada etapa representa uma fronteira cultural e geográfica superada pelo poder do Espírito.</p>
                <div className="space-y-4">
                  {expansao.map((e, i) => (
                    <div key={i} className="sola-card p-5 border-l-4" style={{ borderColor: e.cor.replace('bg-', '').includes('blue') ? '#3b82f6' : e.cor.includes('green') ? '#22c55e' : '#a855f7' }}>
                      <h3 className="font-display text-lg font-medium mb-2">{e.regiao}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{e.descricao}</p>
                      <p className="text-xs text-primary font-medium italic">{e.versiculo}</p>
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
