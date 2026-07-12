'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronDown, ChevronUp, Quote, Lightbulb,
  Target, Cross, Heart, Users, Sparkles, PenLine, ListOrdered, MessageSquare
} from 'lucide-react';

interface SubPonto {
  titulo: string;
  texto: string;
  versiculo?: string;
}

interface Ponto {
  titulo: string;
  versiculo: string;
  texto: string;
  subPontos: SubPonto[];
  ilustracao: string;
}

interface Esboço {
  id: string;
  titulo: string;
  subtitulo: string;
  textoBase: string;
  cor: string;
  icone: React.ReactNode;
  introducao: string;
  pontos: Ponto[];
  conclusao: string;
  fraseChave: string;
}

const ESBOÇOS: Esboço[] = [
  {
    id: 'amor-1cor',
    titulo: 'O Amor de 1 Coríntios 13',
    subtitulo: 'A Canção Mais Bela da Bíblia',
    textoBase: '1 Coríntios 13:1-13',
    cor: 'from-rose-500/20 to-pink-500/20 border-rose-400/30',
    icone: <Heart className="w-6 h-6" />,
    fraseChave: 'O amor é o maior dom porque é o único que permanece para sempre.',
    introducao: 'Paulo escreveu esta epístola para uma igreja dividida — eles disputavam sobre dons espirituais, se julgavam uns aos outros e usavam seus talentos para se exibirem. Paulo para o meio dessa confusão e diz: sem amor, tudo não passa de ruído. O amor não é um sentimento bonito — é uma escolha prática que se manifesta em ações concretas. É o fundamento sobre o qual todos os outros dons se sustentam.',
    pontos: [
      {
        titulo: '1. O Amor é a Fundação (v.1-3)',
        versiculo: '1 Coríntios 13:1-3',
        texto: 'Paulo abre com três cenários: falar em línguas sem amor = metal batendo. Ter dons proféticos sem amor = nada. Dar tudo aos pobres sem amor = nada aproveita.',
        subPontos: [
          { titulo: 'Línguas sem amor', texto: 'Mesmo o dom mais espetacular, sem amor, é apenas ruído. O dom não salva — o amor é o teste da genuinidade.', versiculo: 'v.1' },
          { titulo: 'Conhecimento sem amor', texto: 'Saber todos os mistérios e ter toda a fé, mas não amar — não aproveita nada. O conhecimento sem compaixão se torna arrogância.', versiculo: 'v.2' },
          { titulo: 'Sacrifício sem amor', texto: 'Dar o corpo para ser queimado é extremo, mas sem amor não adianta. A motivação importa mais que a ação.', versiculo: 'v.3' },
        ],
        ilustracao: 'Um músico virtuoso que toca com perfeição técnica, mas sem paixão. A audiência sente a falta de alma. Assim é a fé sem amor — tecnicamente correta, mas espiritualmente vazia.',
      },
      {
        titulo: '2. O Amor se Expressa (v.4-7)',
        versiculo: '1 Coríntios 13:4-7',
        texto: 'Paulo descreve o amor não com adjetivos, mas com verbos de ação. O amor é paciente (não irrita), é bondoso (não inveja), não se orgulha, não maltrata.',
        subPontos: [
          { titulo: 'O que o amor É', texto: 'Paciente, bondoso. Não inveja, não se orgulha, não maltrata. O amor tem duas faces: a positiva (ser bondoso) e a negativa (não fazer o mal).', versiculo: 'v.4-5' },
          { titulo: 'O que o amor NÃO FAZ', texto: 'Não busca interesses próprios, não se ira facilmente, não guarda rancor. O amor recusa a vingança e o ressentimento.', versiculo: 'v.5' },
          { titulo: 'O que o amor SUPORTA', texto: 'Não se alegra com a injustiça, mas se alegra com a verdade. Suporta tudo, crê tudo, espera tudo, suporta tudo. O amor é resistente e persistente.', versiculo: 'v.6-7' },
        ],
        ilustracao: 'Uma mãe que acorda à meia-noite para consolar o filho doente. Ela não calcula custos, não exige retorno. Esse é o amor prático — presente mesmo quando é inconveniente.',
      },
      {
        titulo: '3. O Amor é Eterno (v.8-12)',
        versiculo: '1 Coríntios 13:8-12',
        texto: 'Os dons cessarão. As línguas ficarão em silêncio. O conhecimento será abolido. Mas o amor jamais acaba. Vemos em espelho, obscuramente — veremos face a face.',
        subPontos: [
          { titulo: 'Os dons são temporários', texto: 'Profecias cessarão, línguas pararão, conhecimento desaparecerá. O amor é o único que vai sobreviver à eternidade.', versiculo: 'v.8' },
          { titulo: 'Apartialidade do conhecimento', texto: 'Quando o perfeito vier, o que é parcial será abolido. Hoje sabemos em parte, amamos plenamente.', versiculo: 'v.9-10' },
          { titulo: 'A visão completa', texto: 'Assim como um adulto olha para trás e lembra de quando era criança, um dia veremos a Deus face a face e conhecemos como fomos conhecidos.', versiculo: 'v.12' },
        ],
        ilustracao: 'Uma criança pequena não entende por que o pai a impede de brincar na rua. Anos depois, entende que era proteção. Assim, hoje vemos Deus de forma limitada — mas o amor que depositamos nEle será recompensado plenamente.',
      },
      {
        titulo: '4. O Amor é a Maior (v.13)',
        versiculo: '1 Coríntios 13:13',
        texto: 'Agora permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.',
        subPontos: [
          { titulo: 'Fé, Esperança e Amor', texto: 'A fé é a certeza do que se espera. A esperança é a expectativa do que virá. O amor é o vínculo que sustenta ambas.', versiculo: 'v.13' },
          { titulo: 'Por que o amor é o maior?', texto: 'Porque na eternidade não precisaremos mais de fé (veremos) nem de esperança (teremos). Mas o amor será a atmosfera da nova criação.', versiculo: 'v.13' },
          { titulo: 'Amor como estilo de vida', texto: 'Não basta citar 1 Coríntios 13 no casamento. O amor de Paulo é para todos os dias, em todas as relações — na igreja, no trabalho, na família.', versiculo: 'v.13' },
        ],
        ilustracao: 'Um idoso que, nos últimos dias de vida, não pergunta sobre títulos ou realizações — pergunta: "Quem está ao meu lado?" O amor é o que resta quando tudo mais é tirado.',
      },
    ],
    conclusao: 'O amor não é um sentimento que esperamos sentir — é uma escolha que fazemos todos os dias. 1 Coríntios 13 não é um poema romântico, é um manual prático de convivência. Se você fala em línguas, se profetiza, se dá aos pobres, mas não é paciente com o colega de trabalho — volte ao versículo 4. O teste da sua fé não é quanto você sabe, mas quanto você ama. Oração: Senhor, ensina-me a amar como Tu amas — sem condições, sem cálculos, sem retorno esperado.',
  },
  {
    id: 'beatitudes',
    titulo: 'As Bem-Aventuranças',
    subtitulo: 'O Manifesto do Reino de Deus',
    textoBase: 'Mateus 5:1-12',
    cor: 'from-sky-500/20 to-blue-500/20 border-sky-400/30',
    icone: <Sparkles className="w-6 h-6" />,
    fraseChave: 'A felicidade do Reino de Deus é o contrário da felicidade do mundo.',
    introducao: 'Jesus sobe a montanha — como Moisés no Sinai — e estabelece a nova lei. As Bem-Aventuranças são a porta de entrada do Sermão da Montanha e o resumo de todo o caráter que Deus espera do Seu povo. Cada bem-aventurança é uma inversão dos valores do mundo: os pobres são abençoados, os humildes herdarão, os perseguidos receberão o Reino. Não são promessas abstratas — são realidades presentes para quem vive segundo o evangelho.',
    pontos: [
      {
        titulo: '1. Bem-aventurados os Pobres de Espírito (v.3)',
        versiculo: 'Mateus 5:3',
        texto: '"Bem-aventurados os pobres de espírito, porque deles é o Reino dos Céus."',
        subPontos: [
          { titulo: 'O que é pobreza de espírito?', texto: 'É reconhecer que não temos nada a oferecer a Deus. Não é pobreza financeira, mas humildade espiritual. É saber que somos mendigos diante da graça.', versiculo: 'v.3' },
          { titulo: 'Por que essa é a primeira bem-aventurança?', texto: 'Porque sem humildade, nenhuma outra virtude é possível. O primeiro passo para Deus é admitir que não podemos chegar até Ele por nós mesmos.', versiculo: 'v.3' },
          { titulo: 'O que recebemos?', texto: 'O Reino dos Céus. Não é um troféu — é a realidade de Deus reinando na nossa vida. A pobreza de espírito abre a porta para tudo o mais.', versiculo: 'v.3' },
        ],
        ilustracao: 'Um náufrago na praia que finalmente para de nadar contra a maré e ergue a mão pedindo socorro. É nesse gesto de rendição que o resgate começa.',
      },
      {
        titulo: '2. Bem-aventurados os que Choram (v.4)',
        versiculo: 'Mateus 5:4',
        texto: '"Bem-aventurados os que choram, porque eles serão consolados."',
        subPontos: [
          { titulo: 'Que tipo de choro?', texto: 'O choro pela própria condition, pelo pecado, pela quebra da vontade de Deus. Não é tristeza mundana, mas arrependimento genuíno.', versiculo: 'v.4' },
          { titulo: 'O consolo prometido', texto: 'Deus não ignora a dor. Ele promete consolo — paraklesis em grego — o mesmo termo usado para o Advogado, o Espírito Santo. O choro abrange para o consolo divino.', versiculo: 'v.4' },
          { titulo: 'Contraste com o mundo', texto: 'O mundo diz: não chore, seja forte. Jesus diz: bem-aventurado você que chora, porque o choro legítimo é a porta do consolo.', versiculo: 'v.4' },
        ],
        ilustracao: 'Uma criança que se machuca e corre para os braços da mãe. O choro não é fraqueza — é a chama que atrai o abraço. Assim, nosso choro diante de Deus atrai o Seu consolo.',
      },
      {
        titulo: '3. Bem-aventurados os Mansos (v.5)',
        versiculo: 'Mateus 5:5',
        texto: '"Bem-aventurados os mansos, porque eles herdarão a terra."',
        subPontos: [
          { titulo: 'O que é mansidão?', texto: 'É força sob controle. O manso não é o fraco — é o que poderia reagir com violência, mas escolhe a paciência. Jesus é o exemplo supremo de mansidão (Mt 11:29).', versiculo: 'v.5' },
          { titulo: 'Herdar a terra', texto: 'A promessa é herdar — não conquistar. O manso não precisa lutar por posição. Deus lhe dará o que ele precisa, no tempo certo.', versiculo: 'v.5' },
          { titulo: 'Mansidão na prática', texto: 'Não vingar uma ofensa, não responder com agressividade, confiar que Deus é juiz justo. A mansidão é um ato de fé.', versiculo: 'v.5' },
        ],
        ilustracao: 'Um cão grande e treinado que poderia machucar, mas escolhe se deitar mansamente aos pés do dono. A verdadeira força está na capacidade de não usar a força.',
      },
      {
        titulo: '4. Bem-aventurados os que Fomecem a Justiça (v.6)',
        versiculo: 'Mateus 5:6',
        texto: '"Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos."',
        subPontos: [
          { titulo: 'Fome e sede', texto: 'Não é um desejo casual — é uma necessidade vital. Como água no deserto. Assim deve ser nossa busca pela justiça de Deus.', versiculo: 'v.6' },
          { titulo: 'Justiça de Deus', texto: 'Não apenas justiça social, mas a retidão que vem de Deus. Uma vida que reflete o caráter do Criador.', versiculo: 'v.6' },
          { titulo: 'Serão fartos', texto: 'Deus não responde parcialmente. Quem busca com fome real será satisfeito. A fome precede a saciedade.', versiculo: 'v.6' },
        ],
        ilustracao: 'Uma pessoa desidratada no deserto encontrando um oásis. A fome de justiça é essa sede — e Deus é o oásis que sempre supre.',
      },
      {
        titulo: '5. Misericordiosos, Puros, Pacificadores (v.7-9)',
        versiculo: 'Mateus 5:7-9',
        texto: 'Três grupos que recebem promessas: misericórdia, verão a Deus, receberão misericórdia; puros de coração, verão a Deus; pacificadores, serão chamados filhos de Deus.',
        subPontos: [
          { titulo: 'Misericordiosos', texto: 'Ter misericórdia é escolher não dar ao outro o que merece. É a graça em ação. E quem misericordia, misericórdia recebe.', versiculo: 'v.7' },
          { titulo: 'Puros de coração', texto: 'Coração puro é coração sem dupla intenção. Focado em Deus, não em si mesmo. Verão a Deus — a promessa mais alta do evangelho.', versiculo: 'v.8' },
          { titulo: 'Pacificadores', texto: 'Não são os que evitam conflito a qualquer custo, mas os que trazem a paz de Deus às situações de conflito. São filhos de Deus porque refletem o caráter do Pai.', versiculo: 'v.9' },
        ],
        ilustracao: 'Um medicador de feridas em um campo de batalha. Ele não escolhe lados — escolhe curar. O pacificador é um medicador de relações.',
      },
      {
        titulo: '6. Perseguidos por Causa da Justiça (v.10-12)',
        versiculo: 'Mateus 5:10-12',
        texto: '"Bem-aventurados os que são perseguidos por causa da justiça, porque deles é o Reino dos Céus."',
        subPontos: [
          { titulo: 'Perseguição prometida', texto: 'Jesus não promete conforto — promete perseguição. Seguir Ele é custoso. Mas a recompensa é o próprio Reino.', versiculo: 'v.10' },
          { titulo: 'Rejoiquem-se', texto: 'Jesus manda alegrar-se na perseguição — não porque a dor é boa, mas porque a recompensa é grande. Os profetas foram perseguidos antes de nós.', versiculo: 'v.11-12' },
          { titulo: 'Nos céus', texto: 'A recompensa não é apenas futura — o Reino é presente. Mas a plenitude virá quando Jesus voltar.', versiculo: 'v.12' },
        ],
        ilustracao: 'O prisioneiro de fé que canta no cárcere (Atos 16:25). A alegria na perseguição é o testemunho mais poderoso do evangelho.',
      },
    ],
    conclusao: 'As Bem-Aventuranças não são para admirar — são para viver. São a Constituição do Reino de Deus. Se você é pobre de espírito, chora pelo pecado, é manso, tem fome de justiça, é misericordioso, puro, pacificador e perseguido — parabéns. Você é exatamente o tipo de pessoa que Deus abençoa. Oração: Senhor, transforma meu coração para viver as bem-aventuranças. Dá-me fome de justiça, mansidão nos conflitos, misericórdia para os que me machucam. Eu quero ser abençoados como Tu defines a bênção.',
  },
  {
    id: 'bom-pastor',
    titulo: 'O Bom Pastor',
    subtitulo: 'Conhecimento Íntimo e Vida Abundante',
    textoBase: 'João 10:1-18',
    cor: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
    icone: <Users className="w-6 h-6" />,
    fraseChave: 'O Bom Pastor dá a vida pelas ovelhas e conhece cada uma por nome.',
    introducao: 'João 10 é uma das passagens mais belas de todo o evangelho. Jesus usa a imagem do pastor — que qualquer judeu do século I entendia perfeitamente — para revelar quem Ele é. Num contexto onde os líderes religiosos estavam explorando o povo, Jesus declara: Eu sou o Bom Pastor. O ladrão rouba, destrui e mata. Eu vim para que tenham vida e a tenham em abundância.',
    pontos: [
      {
        titulo: '1. A Voz do Pastor (v.1-6)',
        versiculo: 'João 10:1-6',
        texto: 'O pastor entra pelo portão, as ovelhas conhecem sua voz, e ele chama pelo nome. O ladrão entra por outro caminho — as ovelhas não seguem.',
        subPontos: [
          { titulo: 'Entrar pelo portão', texto: 'O verdadeiro líder entra pela porta legítima — não por atalhos, manipulação ou engano. A autenticidade se prova na方法.', versiculo: 'v.1-2' },
          { titulo: 'Conhecer a voz', texto: 'As ovelhas reconhecem a voz do pastor porque têm intimidade. É o resultado de tempo juntos. Conhecer a voz de Jesus exige tempo de comunhão.', versiculo: 'v.3-4' },
          { titulo: 'Fugir do estranho', texto: 'As ovelhas não seguem voz desconhecida. O crente precisa discernir entre a voz de Deus e as vozes do mundo.', versiculo: 'v.5' },
        ],
        ilustracao: 'Um criador de cães que chama seus filhotes de longe — eles correm para ele, ignorando outros sons. Assim é o crente que conhece a voz do Pastor.',
      },
      {
        titulo: '2. A Vida Abundante (v.7-10)',
        versiculo: 'João 10:7-10',
        texto: 'Jesus é a porta e o pastor. Por Ele se entra e se sai, encontra pastagem. O ladrão vem para roubar, matar e destruir. Jesus veio para que tenham vida abundante.',
        subPontos: [
          { titulo: 'Jesus é a Porta', texto: 'Não há outro caminho para a salvação. Por Jesus entramos na verdadeira vida espiritual. Exclusivismo cristão não é arrogância — é realidade.', versiculo: 'v.7-9' },
          { titulo: 'Pastagem abundante', texto: 'As ovelhas entram e saem, encontram pastagem. Há liberdade, alimento, segurança. A vida cristã não é escravidão — é abundância.', versiculo: 'v.9' },
          { titulo: 'Vida em abundância', texto: 'A vida abundante não é riqueza material — é plenitude espiritual, paz, alegria, propósito. O ladrão promete, mas rouba. Jesus dá de verdade.', versiculo: 'v.10' },
        ],
        ilustracao: 'Um jardim abandonado que, com cuidado do jardineiro, floresce. Assim é a vida sob o cuidado do Bom Pastor — o que era árido se torna fértil.',
      },
      {
        titulo: '3. O Pastor dá a Sua Vida (v.11-18)',
        versiculo: 'João 10:11-18',
        texto: 'O Bom Pastor dá a vida pelas ovelhas. O assalariado foge quando vem o lobo. Jesus conhece as suas ovelhas e elas conhecem a Ele, como o Pai O conhece.',
        subPontos: [
          { titulo: 'Dá a vida', texto: 'O Bom Pastor não foge do perigo. Ele se coloca entre o lobo e as ovelhas. Jesus antecipa Sua morte voluntária na cruz.', versiculo: 'v.11' },
          { titulo: 'Assalariado vs. Pastor', texto: 'O assalariado trabalha por salário, não por amor. Quando o perigo vem, foge. Os líderes religiosos de Israel eram assalariados.', versiculo: 'v.12-13' },
          { titulo: 'Conhecimento mútuo', texto: 'O pastor conhece suas ovelhas, e elas O conhecem. Assim como o Pai conhece Jesus e Ele conhece o Pai. É uma relação de intimidade mútua.', versiculo: 'v.14-15' },
          { titulo: 'Outras ovelhas', texto: 'Jesus menciona outras ovelhas que não deste redil — os gentios. A salvação não é exclusiva de um povo. Ele reunirá todas as ovelhas em um só rebanho.', versiculo: 'v.16' },
          { titulo: 'Autoridade para dar a vida', texto: 'Ninguém tira a vida de Jesus — Ele a dá por Si mesmo. Tem autoridade do Pai para dar a vida e tornar a tomá-la. A cruz é uma escolha, não uma derrota.', versiculo: 'v.17-18' },
        ],
        ilustracao: 'Um bombeiro que entra num prédio em chamas para salvar uma criança. Não calcula o risco — entra porque a vida da criança vale mais que o dele. Assim Jesus entrou na cruz.',
      },
    ],
    conclusao: 'O Bom Pastor não é uma imagem genérica — é Jesus Cristo pessoalmente. Ele conhece seu nome, dá a vida por você, protege dos lobos e te conduz à vida abundante. Se você se sente perdido, escute a voz do Pastor. Ele está chamando. Oração: Bom Pastor, eu ouço a Tua voz. Conduz-me aos verdes pastos. Obrigado por dare a Tua vida por mim. Que eu viva a vida abundante que Tu prometest.',
  },
  {
    id: 'grande-comissao',
    titulo: 'A Grande Comissão',
    subtitulo: 'Nossa Missão até o Fim do Mundo',
    textoBase: 'Mateus 28:18-20',
    cor: 'from-violet-500/20 to-purple-500/20 border-violet-400/30',
    icone: <Target className="w-6 h-6" />,
    fraseChave: 'Toda autoridade me foi dada: portanto, vão e façam discípulos.',
    introducao: 'Depois da ressurreição, antes da ascensão, Jesus dá a última ordem — a Grande Comissão. Não é uma sugestão, não é para voluntários especiais. É um comando para todos os discípulos, de todos os tempos. A autoridade de Cristo não é apenas celestial — é universal. E com essa autoridade, Ele envia.',
    pontos: [
      {
        titulo: '1. A Autoridade de Cristo (v.18)',
        versiculo: 'Mateus 28:18',
        texto: '"Toda autoridade me foi dada no céu e na terra."',
        subPontos: [
          { titulo: 'Autoridade total', texto: 'Não parcial, não limitada. Toda autoridade — sobre nações, culturas, línguas, situações. A missão não depende das nossas habilidades, mas da autoridade de Jesus.', versiculo: 'v.18' },
          { titulo: 'Dada pelo Pai', texto: 'A autoridade de Jesus vem do Pai. Ele é o mediador entre Deus e os homens. Toda a criação se curva diante Dele.', versiculo: 'v.18' },
          { titulo: 'Fundamento da missão', texto: 'Sem a autoridade de Cristo, a Grande Comissão seria impossível. Mas como Ele tem toda autoridade, podemos ir com confiança.', versiculo: 'v.18' },
        ],
        ilustracao: 'Um embaixador que vai a outro país não com suas próprias forças, mas com a autoridade e respaldo de toda a nação por trás dele. Assim vamos nós — com a autoridade do Rei dos reis.',
      },
      {
        titulo: '2. Vão e Façam Discípulos (v.19a)',
        versiculo: 'Mateus 28:19',
        texto: '"Portanto, vão e façam discípulos de todas as nações."',
        subPontos: [
          { titulo: 'O verbo principal', texto: 'O verbo em grego é mathēteusate — "façam discípulos". Os outros verbos (vão, batizem, ensinem) são participios que modificam este verbo central. A missão é multiplicar discípulos.', versiculo: 'v.19' },
          { titulo: 'Todas as nações', texto: 'Não apenas Israel, não apenas um grupo. Todas as etnias, culturas, idiomas. O evangelho é universal.', versiculo: 'v.19' },
          { titulo: 'Ir', texto: 'Não é esperar que venham — é ir até eles. A missão é ativa, não passiva. Requer iniciativa, sacrifício, mobilidade.', versiculo: 'v.19' },
        ],
        ilustracao: 'Uma semente que não fica no bolso — é plantada no solo. Assim a Palavra precisa ser levada aos campos, não guardada para nós.',
      },
      {
        titulo: '3. Batizando e Ensinando (v.19b-20)',
        versiculo: 'Mateus 28:19-20',
        texto: '"Batizando-os em nome do Pai, do Filho e do Espírito Santo, e ensinando-os a guardar todas as coisas que vos tenho mandado."',
        subPontos: [
          { titulo: 'Batismo', texto: 'O batismo é a porta de entrada na comunidade de fé. É público, é identificação com Cristo. Não é opcional — é obedience.', versiculo: 'v.19' },
          { titulo: 'Ensinar a guardar', texto: 'Não apenas transmitir informação, mas formar discípulos que obedecem. O ensino bíblico tem como objetivo a transformação da vida.', versiculo: 'v.20' },
          { titulo: 'Eu estou convosco', texto: '"E eis que estou convosco todos os dias, até o fim do mundo." A presença de Cristo é a promessa que sustenta a missão. Nunca estamos sozinhos.', versiculo: 'v.20' },
        ],
        ilustracao: 'Um mentor que não apenas ensina a teoria, mas caminha com o aprendiz dia após dia. Jesus é o mentor que nunca nos abandona.',
      },
    ],
    conclusao: 'A Grande Comissão não é para pastores e missionários apenas — é para todo cristão. Cada um de nós é chamado a fazer discípulos onde quer que esteja: na família, no trabalho, na escola, na vizinhança. Você não precisa ir à África — precisa ir ao seu vizinho. Oração: Senhor, me dá coragem para ir. Me dá olhos para ver os que precisam de Ti. Usa a minha vida para fazer discípulos. Eu estou aqui — me envia.',
  },
  {
    id: 'fruto-espirito',
    titulo: 'O Fruto do Espírito',
    subtitulo: 'O Caráter de Cristo em Nós',
    textoBase: 'Gálatas 5:22-23',
    cor: 'from-yellow-500/20 to-amber-500/20 border-yellow-400/30',
    icone: <Lightbulb className="w-6 h-6" />,
    fraseChave: 'O fruto do Espírito é a evidência da obra de Deus na nossa vida.',
    introducao: 'Paulo contrasta as obras da carne com o fruto do Espírito. As obras da carne são muitas e diversas — mas o fruto do Espírito é um só, manifestado em nove aspectos. Não é algo que produzimos com esforço — é o resultado natural da vida conectada a Cristo, como um galho dá fruto quando está na videira (Jo 15:4). Cada qualidade do fruto é uma faceta do caráter de Jesus.',
    pontos: [
      {
        titulo: '1. Amor, Alegria, Paz (v.22)',
        versiculo: 'Gálatas 5:22',
        texto: '"Mas o fruto do Espírito é: amor, alegria, paz."',
        subPontos: [
          { titulo: 'Amor (agapē)', texto: 'Não é sentimento — é escolha sacrificial. O amor de Deus não depende do objeto, mas da vontade do doador. É o mesmo amor de 1 Coríntios 13.', versiculo: 'v.22' },
          { titulo: 'Alegria (chara)', texto: 'Não é felicidade dependente de circunstâncias. É a alegria profunda que mesmo na tribulação sobrevive porque é ancorada em Deus.', versiculo: 'v.22' },
          { titulo: 'Paz (eirēnē)', texto: 'Shalom hebraico — totalidade, integridade, ausência de conflito. A paz que o mundo não pode dar nem tirar. Uma calma interior mesmo no caos.', versiculo: 'v.22' },
        ],
        ilustracao: 'Uma árvore que dá frutos mesmo em terreno rochoso — não porque o solo é bom, mas porque suas raízes são profundas. A raiz do fruto é Cristo.',
      },
      {
        titulo: '2. Paciência, Bondade, Benevolência (v.22)',
        versiculo: 'Gálatas 5:22',
        texto: '"Paciência, bondade, benevolência."',
        subPontos: [
          { titulo: 'Paciência (makrothymia)', texto: 'Longanimidade — suportar provocações sem retaliar. Não é passividade, é força que escolhe esperar. Deus é paciente connosco (2 Pe 3:9).', versiculo: 'v.22' },
          { titulo: 'Bondade (chrēstotēs)', texto: 'Bondade ativa — não apenas evitar o mal, mas fazer o bem. A bondade se expressa em ações concretas de amor.', versiculo: 'v.22' },
          { titulo: 'Benevolência (agathōsynē)', texto: 'Bondade moral — retidão de caráter. Não apenas ações boas, mas ser boa pessoa. É a bondade que emana de um coração transformado.', versiculo: 'v.22' },
        ],
        ilustracao: 'Um jardineiro que poda, rega e cuida da planta pacientemente. A bondade de Deus é assim — diária, consistente, mesmo quando não vemos frutos imediatamente.',
      },
      {
        titulo: '3. Fé, Mansidão, Temperança (v.23)',
        versiculo: 'Gálatas 5:23',
        texto: '"Fé, mansidão, temperança."',
        subPontos: [
          { titulo: 'Fé (pistis)', texto: 'Fidelidade, confiabilidade. Ser digno de confiança. A fé aqui não é crença, mas lealdade — ser fiel às promessas e ao chamado.', versiculo: 'v.23' },
          { titulo: 'Mansidão (praÿtēs)', texto: 'Força sob controle. O manso não é o fraco — é o forte que escolhe não usar a força contra os outros. Jesus é manso e humilde (Mt 11:29).', versiculo: 'v.23' },
          { titulo: 'Temperança (egkrateia)', texto: 'Domínio próprio — não ser escravo de desejos, vícios, paixões. É a liberdade de dizer não ao pecado e sim a Deus.', versiculo: 'v.23' },
        ],
        ilustracao: 'Um cavaleiro que monta um cavalo poderoso — a temperança é como manter o cavalo sob controle. Não é matar o desejo, é governá-lo.',
      },
    ],
    conclusao: 'O fruto do Espírito não é uma lista de tarefas — é um retrato de Jesus. Quando nos conectamos a Ele pela Palavra, oração e obediência, o fruto cresce naturalmente. Não produzimos fruto com esforço — frutificamos com rendição. Oração: Espírito Santo, produz em mim o Teu fruto. Amor onde há ódio, alegria onde há tristeza, paz onde há conflito. Transforma o meu caráter para refletir o de Jesus.',
  },
];

export default function SermoesPage() {
  const [esboçoAberto, setEsboçoAberto] = useState<string | null>(null);
  const [pontoExpandido, setPontoExpandido] = useState<Record<string, number | null>>({});

  const togglePonto = (esboçoId: string, pontoIdx: number) => {
    setPontoExpandido((prev) => ({
      ...prev,
      [esboçoId]: prev[esboçoId] === pontoIdx ? null : pontoIdx,
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5"
              >
                <Cross className="w-8 h-8 text-[var(--primary)]" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)] mb-3">
                Esboços de Sermão
              </h1>
              <p className="text-[var(--fg)] text-lg max-w-2xl mx-auto">
                Esboços prontos para pregadores — com texto base, pontos, ilustrações e conclusão
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {ESBOÇOS.map((esboço) => (
              <ScrollReveal key={esboço.id}>
                <motion.div
                  layout
                  className={`sola-card overflow-hidden border ${esboçoAberto === esboço.id ? 'ring-2 ring-[var(--primary)]/20' : ''}`}
                >
                  <button
                    onClick={() => setEsboçoAberto(esboçoAberto === esboço.id ? null : esboço.id)}
                    className="w-full flex items-center gap-4 p-6 text-left hover:bg-[var(--bg)]/50 transition-colors"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${esboço.cor} flex items-center justify-center shrink-0`}>
                      {esboço.icone}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl font-semibold text-[var(--fg)]">{esboço.titulo}</h3>
                      <p className="text-sm text-[var(--muted-fg)]">{esboço.subtitulo}</p>
                      <p className="text-xs text-[var(--primary)] font-semibold mt-1">{esboço.textoBase}</p>
                    </div>
                    <div className="shrink-0 text-[var(--muted-fg)]">
                      {esboçoAberto === esboço.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {esboçoAberto === esboço.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-6">
                          {/* Frase-chave */}
                          <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent rounded-xl p-5 border border-[var(--primary)]/10">
                            <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-1">Frase-Chave</p>
                            <p className="text-lg font-semibold text-[var(--fg)] italic font-serif-body">&ldquo;{esboço.fraseChave}&rdquo;</p>
                          </div>

                          {/* Introdução */}
                          <div className="bg-[var(--bg)] rounded-xl p-6">
                            <h4 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3 flex items-center gap-2">
                              <PenLine className="w-4 h-4" />
                              Introdução
                            </h4>
                            <p className="text-sm text-[var(--fg)] leading-relaxed font-serif-body">{esboço.introducao}</p>
                          </div>

                          {/* Pontos */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider flex items-center gap-2">
                              <ListOrdered className="w-4 h-4" />
                              Pontos do Sermão
                            </h4>
                            {esboço.pontos.map((ponto, idx) => (
                              <div key={idx} className="bg-[var(--bg)] rounded-xl overflow-hidden border border-[var(--border)]">
                                <button
                                  onClick={() => togglePonto(esboço.id, idx)}
                                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--card-bg)] transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-[var(--primary)]">{idx + 1}</span>
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-[var(--fg)]">{ponto.titulo}</h5>
                                    <p className="text-xs text-[var(--primary)]">{ponto.versiculo}</p>
                                  </div>
                                  {pontoExpandido[esboço.id] === idx ? (
                                    <ChevronUp className="w-4 h-4 text-[var(--muted-fg)]" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-[var(--muted-fg)]" />
                                  )}
                                </button>

                                <AnimatePresence>
                                  {pontoExpandido[esboço.id] === idx && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-4 pb-4 space-y-4">
                                        <p className="text-sm text-[var(--fg)] leading-relaxed italic font-serif-body border-l-3 border-[var(--primary)]/20 pl-4">
                                          &ldquo;{ponto.texto}&rdquo;
                                        </p>

                                        {/* Sub-pontos */}
                                        <div className="space-y-3">
                                          {ponto.subPontos.map((sub, subIdx) => (
                                            <div key={subIdx} className="flex gap-3 items-start">
                                              <div className="w-6 h-6 rounded-full bg-[var(--primary)]/5 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-[10px] font-bold text-[var(--primary)]">{String.fromCharCode(97 + subIdx)}</span>
                                              </div>
                                              <div>
                                                <p className="font-semibold text-[var(--fg)] text-sm">{sub.titulo}</p>
                                                <p className="text-sm text-[var(--fg)] leading-relaxed">{sub.texto}</p>
                                                {sub.versiculo && (
                                                  <p className="text-xs text-[var(--primary)] mt-1">{sub.versiculo}</p>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Ilustração */}
                                        <div className="bg-[var(--card-bg)] rounded-lg p-4 border-l-3 border-amber-400/50">
                                          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                            <Lightbulb className="w-3 h-3" />
                                            Ilustração
                                          </p>
                                          <p className="text-sm text-[var(--fg)] leading-relaxed italic">{ponto.ilustracao}</p>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>

                          {/* Conclusão */}
                          <div className="bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-xl p-6 border border-[var(--primary)]/10">
                            <h4 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3 flex items-center gap-2">
                              <Cross className="w-4 h-4" />
                              Conclusão e Oração
                            </h4>
                            <p className="text-sm text-[var(--fg)] leading-relaxed font-serif-body">{esboço.conclusao}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
