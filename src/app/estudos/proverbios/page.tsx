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
  Brain, Heart, MessageCircle, Briefcase, Coins, Users, Crown,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'proverbios30', label: '30 Proverbios Essenciais' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'aplicacao', label: 'Aplicacao' },
  { id: 'perguntas', label: 'Perguntas' },
];

const estrutura = [
  { parte: 'Prologo (1:1-9:18)', cor: 'border-blue-500', bg: 'bg-blue-500/5', itens: [
    'Tema: "O temor do Senhor e o principio da sabedoria" (1:7)',
    'Proposito: Preparar o jovem para receber a sabedoria (1:2-6)',
    'Sabedoria personificada como mulher que clama nas ruas (1:20-33)',
    'Convite: busca pela sabedoria como se busca ouro (2:1-22)',
    'Sabedoria como caminho da vida vs. caminho da morte (4:18-19)',
    'Multiplos convites da sabedoria (8:1-36)',
  ]},
  { parte: 'Proverbios de Salomao (10:1-29:27)', cor: 'border-green-500', bg: 'bg-green-500/5', itens: [
    'Caps. 10-15: Proverbios sobre justica, honestidade, limgua, trabalho',
    'Caps. 16-22: Sabedoria no governo, nas relacoes, na conduta',
    'Caps. 22-24: Instrucoes adicionais e conselhos para a vida',
    'Caps. 25-29: Proverbios compilados por homens de Ezequias (copiados do original)',
    'Formato: Maioria em forma antitetica (verso 1 = verso 2, contraste ou comparacao)',
  ]},
  { parte: 'Palavras de Agur e Lemuel (30-31)', cor: 'border-purple-500', bg: 'bg-purple-500/5', itens: [
    'Cap. 30: Palavras de Agur — humildade diante da grandiosidade de Deus',
    'Cap. 31: Palavras do Rei Lemuel — advertencias contra o vinho e as mulheres',
    'Cap. 31:10-31 — A mulher virtuosa, modelo de sabedoria prática',
  ]},
];

const proverbiosEssenciais = [
  { num: 1, ref: '1:7', texto: 'O temor do Senhor e o principio da sabedoria; e o conhecimento do prudente e prudencia.', tema: 'Fundamento', explicacao: 'Este e o versiculo-tema de todo o livro. Sabedoria biblica comeca com reverencia a Deus. Sem Deus, nao ha sabedoria verdadeira.' },
  { num: 2, ref: '3:5-6', texto: 'Confia no Senhor de todo o teu coracao, e nao te estribes no teu propio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitara as tuas veredas.', tema: 'Confianca', explicacao: 'A confianca plena em Deus substitui a autossuficiencia humana. Reconhece-lo em tudo e a chave para um vida direcionada.' },
  { num: 3, ref: '4:7', texto: 'O principio da sabedoria e: Adquire a sabedoria; sim, adquire o entendimento com tudo o que possuis.', tema: 'Prioridade', explicacao: 'Sabedoria e o investimento mais valioso. Mais importante que riqueza, fama ou poder. Vale tudo o que temos.' },
  { num: 4, ref: '8:11', texto: 'Porque a sabedoria melhor e do que as pedras preciosas, e tudo o que se pode desejar nao se pode comparar com ela.', tema: 'Valor', explicacao: 'A sabedoria divina supera qualquer tesouro material. E eterna, transformadora e inestimavel.' },
  { num: 5, ref: '9:10', texto: 'O temor do Senhor e o principio da sabedoria, e o conhecimento do Santo e prudencia.', tema: 'Reverencia', explicacao: 'Repete o tema de 1:7. O conhecimento de Deus e o alicerce de toda verdadeira prudencia e discernimento.' },
  { num: 6, ref: '10:4', texto: 'Quem obra de ma mao empobrece; mas a mao dos diligentes enriquece.', tema: 'Trabalho', explicacao: 'A diligencia no trabalho e caminho para prosperidade. A preguica leva a pobreza. Sabedoria pratica se aplica ao trabalho.' },
  { num: 7, ref: '11:13', texto: 'Quer fofoca segredo revela; mas o que tem espirito fiel encobre o assunto.', tema: 'Limgua', explicacao: 'A fofoca destrói relacionamentos. A fidelidade guarda segredos. A limgua e o reflexo do coracao.' },
  { num: 8, ref: '12:22', texto: 'Labios de mentira sao abominacao ao Senhor; mas os que pratica a verdade sao o seu contentamento.', tema: 'Verdade', explicacao: 'Deus odeia mentira. A honestidade e o caminho para o contentamento divino. A verdade e um valor absoluto.' },
  { num: 9, ref: '13:11', texto: 'A riqueza ganha sem julgamento diminuira; mas quem a ajunta com a mao multiplicara.', tema: 'Dinheiro', explicacao: 'Riqueza facil (loterias, enganos) nao dura. Riqueza construida com trabalho e sabedoria cresce.' },
  { num: 10, ref: '14:1', texto: 'A mulher sabedifica a sua casa; mas a tola destroe com as suas maos.', tema: 'Familia', explicacao: 'A sabedoria constrói a família; a tolice a destrói. O papel da mulher sábia é transformador.' },
  { num: 11, ref: '15:1', texto: 'A resposta branda desvia o furor; mas a palavra dura excita a ira.', tema: 'Conflito', explicacao: 'A maneira como respondemos determina o resultado. Brandura acalma; dureza agrava. Sabedoria é saber responder.' },
  { num: 12, ref: '16:3', texto: 'Confia ao Senhor os teus pensamentos, e os teus projetos serao firmados.', tema: 'Planejamento', explicacao: 'Planejar e bom, mas entregar os planos a Deus e essencial. Ele direciona os passos do que confia nele.' },
  { num: 13, ref: '17:17', texto: 'O amigo ama em todo o tempo; e o irmao nasce para a angustia.', tema: 'Amizade', explicacao: 'A amizade verdadeira e constante. O amigo está presente no sofrimento. Amizade é lealdade que resiste.' },
  { num: 14, ref: '18:21', texto: 'A morte e a vida estao poder da lingua; e os que a amerao comerão o seu fruto.', tema: 'Poder da Lingua', explicacao: 'A lingua constrói ou destrói. Palavras sao sementes que produzem fruto — vida ou morte.' },
  { num: 15, ref: '19:2', texto: 'A alma sem ciencia nao e boa; e o que se apressa com os pe nao erra menos.', tema: 'Paciencia', explicacao: 'Pressa sem sabedoria leva a erros. A reflexao antes de agir é sinal de maturidade.' },
  { num: 16, ref: '20:7', texto: 'O justo andara na sua integridade; bem-aventurados sao os seus filhos depois dele.', tema: 'Legado', explicacao: 'A integridade de um pai beneficia seus filhos. O legado de retidão transcende gerações.' },
  { num: 17, ref: '21:2', texto: 'Cada um jacta-se do que e justo aos seus olhos; mas o Senhor sonda os coracoes.', tema: 'Autoconhecimento', explicacao: 'Nos somos tendenciosos em avaliar a nós mesmos. Deus vê além da aparência — Ele vê o coração.' },
  { num: 18, ref: '22:6', texto: 'Instrui o menino no caminho em que deve andar, e quando for velho nao se desviara dele.', tema: 'Educacao', explicacao: 'A educação na infância determina o rumo na velhice. Sabedoria transmitida cedo forma o caráter.' },
  { num: 19, ref: '22:29', texto: 'Viste homem solícito nos seus negocios? Diante dos reis estara; nao estara diante dos homes baixos.', tema: 'Excelencia', explicacao: 'A excelencia no trabalho é reconhecida. O diligente se destaca e é promovido. Sabedoria se aplica à carreira.' },
  { num: 20, ref: '23:4', texto: 'Não te cances de enriquecer; e por que confias nas riquezas?', tema: 'Riqueza', explicacao: 'A busca por riquezas cansa e engana. As riquezas nao sao seguras. Confie em Deus, nao no ouro.' },
  { num: 21, ref: '24:17', texto: 'Se o teu inimigo cair, nao te alegres; e se tropeçar, nao se alegre o teu coracao.', tema: 'Inimigos', explicacao: 'A vingança não é cristã. Não nos regozijamos com a queda dos inimigos. Misericórdia é sabedoria.' },
  { num: 22, ref: '25:11', texto: 'A palavra falada a seu tempo e como maças de ouro em castiçais de prata.', tema: 'Timing', explicacao: 'A hora certa de falar é tão valiosa quanto ouro. Discernimento é saber quando e como dizer a verdade.' },
  { num: 23, ref: '27:1', texto: 'Não te glories do amanha, porque nao sabes o que o dia trará.', tema: 'Humildade', explicacao: 'O futuro é incerto. A humildade reconhece que não controlamos amanhã. Viva o hoje com sabedoria.' },
  { num: 24, ref: '27:17', texto: 'O ferro se afia com ferro; e o homem afia o rosto do seu amigo.', tema: 'Relacionamento', explicacao: 'Amizade afina o caráter. Precisamos uns dos outros para crescer. Comunhão é ferramenta de sabedoria.' },
  { num: 25, ref: '27:23', texto: 'Sê solicito em conhecer o estado das tuas ovelhas, e cuida dos teus rebanhos.', tema: 'Responsabilidade', explicacao: 'Liderança exige conhecimento e cuidado. Administre bem o que Deus lhe confiou.' },
  { num: 26, ref: '28:13', texto: 'Quer confessa e deixa os seus pecados sera misericordiado; e aquele que confessa e abandona tera misericórdia.', tema: 'Arrependimento', explicacao: 'A confissão e abandono do pecado abrem a porta da misericórdia divina. Nao esconda — confesse.' },
  { num: 27, ref: '29:1', texto: 'Aquele que muitas vezes e repreendido endurece a cerviz sera quebrado subitamente, e nao havera cura.', tema: 'Correcao', explicacao: 'A teimosia diante da correção leva à destruição. A humildade aceita instrução; a soberba leva à ruína.' },
  { num: 28, ref: '30:5', texto: 'Toda a palavra de Deus e provada; ele e escudo a todos os que nele buscam refugio.', tema: 'Palavra de Deus', explicacao: 'A Palavra de Deus é confiável em 100%. Protege quem nela confia. É fundamento seguro.' },
  { num: 29, ref: '31:10', texto: 'Mulher virtuosa quem achará? O seu preço muito excede o das pedras preciosas.', tema: 'Valor da Mulher', explicacao: 'A mulher virtuosa é mais valiosa que qualquer tesouro. Sua sabedoria prática transforma a família e a sociedade.' },
  { num: 30, ref: '31:30', texto: 'Engano e a graça, e vaidade a formosura; mas a mulher que teme ao Senhor, essa sera louvada.', tema: 'Belleza Interior', explicacao: 'A beleza externa é passageira. O temor ao Senhor é eterno. O que vale é o caráter, não a aparência.' },
];

const sabedorias = [
  { ref: '1:20-33', titulo: 'A Sabedoria nas Ruas', texto: 'A Sabedoria personificada clama nas ruas, nas praças, no topo dos muros, na entrada das portas. Ela chama os simples e os tolos. Quem a rejeita sera destruido; quem a recebe sera seguro.', teologo: 'Tremper Longman III: "A Sabedoria de Proverbios nao e abstrata e filosofica, mas concreta e relacional. Ela e apresentada como pessoa, como邀请 divina para viver de acordo com a ordem criada"' },
  { ref: '8:10-11', titulo: 'O Valor da Sabedoria', texto: 'Recebe a minha instrucao, e nao a prata; e o conhecimento mais escolhido do que o ouro. Porque a sabedoria e melhor do que as pedras preciosas, e tudo o que se pode desejar nao se pode comparar com ela.', teologo: 'Derek Kidner: "A sabedoria e o investimento mais valioso porque e eterna. As riquezas passam, mas a sabedoria permanece e frutifica em todas as areas da vida"' },
  { ref: '9:10', titulo: 'O Temor do Senhor', texto: 'O temor do Senhor e o principio da sabedoria, e o conhecimento do Santo e prudencia. Repete 1:7 como coro do livro — o fundamento inabalavel de toda sabedoria.', teologo: 'Tremper Longman III: "O temor do Senhor nao e medo paralisante, mas reverencia que transforma. E a atitude que reconhece a soberania de Deus e se submete a ela"' },
  { ref: '15:1-3', titulo: 'Respostas Brandas e Olhos de Deus', texto: 'A resposta branda desvia o furor; mas a palavra dura excita a ira. A lingua do prudente usa o conhecimento bem; mas a boca dos tolos fere com estulticie. Os olhos do Senhor estao em todos os lugares, observando os maus e os bons.', teologo: 'Michael Fox: "Tres versiculos que cobrem comunicacao, sabedoria e onisciencia divina. A brandura nao e fraqueza — e inteligencia. E a resposta de quem sabe que Deus esta observando"' },
  { ref: '22:17-21', titulo: 'Os 30 Proverbios do Reis', texto: 'Inclina o teu ouvido, e ouve as palavras dos sabios; e aplica o teu coracao ao meu conhecimento. Porque e agradavel se os guardares dentro de ti, e teus labios os estabelecerem. Para que a tua confiança esteja no Senhor, eu te ensinei hoje, sim, a ti.', teologo: 'Michael Fox: "Esta secao (22:17-24:22) e uma compilacao de proverbios egipcios adaptados por Salomao. Mostra que a sabedoria nao tem fronteiras — Deus revela verdade em todas as culturas"' },
];

const temasCentrais = [
  { titulo: 'Sabedoria vs. Loucura', icone: Brain, cor: 'text-blue-500', descricao: 'Todo o livro contrasta dois caminhos: a sabedoria (que leva à vida, prosperidade e honra) e a loucura (que leva à morte, pobreza e desonra). A sabedoria biblica não é intelectual, mas moral e prática — viver de acordo com a ordem criada por Deus. Os caps. 1-9 apresentam a "Mulher Sabedoria" e a "Mulher Estranha" como escolhas opostas. A escolha e urgente — o caminho da vida ou da morte.' },
  { titulo: 'A Lingua', icone: MessageCircle, cor: 'text-green-500', descricao: 'Proverbios dedica mais atenção à lingua que qualquer outro livro. A lingua pode curar ou ferir, construir ou destruir, abençoar ou amaldiçoar. Mais de 100 provérbios tratam do uso correto da palavra. O poder da lingua e um dos temas mais praticos do livro — afeta casamento, amizade, trabalho e testemunho. "Pela tua lingua seras justificado, e pela tua lingua seras condenado" (Mt 12:37).' },
  { titulo: 'Trabalho e Diligencia', icone: Briefcase, cor: 'text-amber-500', descricao: 'A preguica e severamente condenada (6:6 — olha a formiga!; 10:4 — a mao diligente enriquece; 13:4 — a alma do preguiçoso quer e nao tem; 20:13 — fecha os olhos e dormiras). O trabalho diligente é abençoado por Deus. Sabedoria se aplica à vida profissional — honestidade, excelência, perseverança. O trabalho não e maldição, mas instrumento de sabedoria e provisão divina.' },
  { titulo: 'Dinheiro e Riqueza', icone: Coins, cor: 'text-yellow-500', descricao: 'Proverbios não condena a riqueza, mas adverte contra a avareza e a confiança nelas. O justo ganha com honestidade e usa com generosidade. A pobreza não é vergonha; a desonestidade é. O rico e o pobre se encontram — ambos criados por Deus (22:2). A riqueza não salva, mas a sabedoria no uso dela é abençoada. "O que se apressa a enriquecer nao ficara isento de culpa" (28:20).' },
  { titulo: 'Relacionamentos', icone: Users, cor: 'text-purple-500', descricao: 'Amizade, casamento, família — os relacionamentos são centrais na sabedoria. A amizade verdadeira é rara e valiosa (17:17 — o amigo ama em todo tempo). O casamento é honrado (5:15-19). A família é a escola da sabedoria prática. O homem virtuoso de 31:10-31 é o culminar de toda a sabedoria relacional. Relacionamentos são onde a sabedoria se torna concreta.' },
  { titulo: 'A Mulher Sabedoria', icone: Heart, cor: 'text-pink-500', descricao: 'Nos caps. 1-9, a Sabedoria é personificada como mulher que clama nas ruas (1:20-33), prepara um banquete (9:1-6) e convida os simples a encontrarem vida. Ela e oposta a "Mulher Estranha" (prostituta/idolatria). A mulher virtuosa de 31:10-31 e a concreção prática da Sabedoria: ama, trabalha, provê, ensina e teme ao Senhor. A Sabedoria biblica e feminina porque revela o cuidado materno de Deus pelo mundo.' },
];

const aplicacoes = [
  'Comece pelo temor do Senhor — toda sabedoria comeca com reverencia a Deus (1:7).',
  'Procure a sabedoria como quem busca ouro — e o investimento mais valioso da vida (2:4).',
  'Cuide da sua lingua — palavras podem curar ou ferir, construir ou destruir (18:21).',
  'Trabalhe com diligencia — a preguica leva a pobreza, o trabalho a prosperidade (10:4).',
  'Confie em Deus em todos os caminhos — nao dependa so do seu entendimento (3:5-6).',
  'Aceite a correcao — o tolo rejeita instrucao, o sabio a recebe com alegria (12:1).',
  'Guarde o coração — dele procedem os pensamentos e as palavras (4:23).',
  'Ame a justica e odeie a mentira — Deus é a favor da verdade (12:22).',
  'Seja paciente nas decisoes — a pressa sem sabedoria leva a erros (19:2).',
  'Invista em amizades fieis — o amigo ama em todo tempo e e mais valioso que ouro (17:17, 27:17).',
  'Pense antes de falar — a palavra dura excita a ira, a branda desvia o furor (15:1, 25:11).',
  'Ensine seus filhos com sabedoria — o que e plantado cedo na infancia frutifica na velhice (22:6).',
  'Nao se preocupe com o amanha — viva o hoje com sabedoria e gratidao (27:1).',
  'Guarde seus labios — a mentira destrói a confiança e ofende a Deus (12:22, 25:18).',
];

const perguntas = [
  'O que significa "temor do Senhor" na prática? É medo ou reverencia?',
  'Como a sabedoria de Proverbios se relaciona com a graça de Deus?',
  'Qual provérbio mais desafia sua vida atual? Por quê?',
  'Como aplicar o princípio de "confiar em Deus de todo o coração" em decisões difíceis?',
  'O que os provérbios sobre a lingua ensinam sobre comunicação cristã?',
  'Como Proverbios 22:6 se aplica quando um filho se desvia da fé?',
  'Qual a relação entre sabedoria e contentamento?',
  'Como equilibrar a busca por excelência (22:29) com o contentamento (4:13)?',
  'Como a Mulher Sabedoria dos caps. 1-9 se relaciona com Cristo?',
  'Por que a preguica e tão severamente condenada em Proverbios?',
  'Como Proverbios se relaciona com o Novo Testamento? Cristo cumpre a Sabedoria?',
  'Qual provérbio mais se aplica à vida familiar? Justifique.',
  'O que a "Mulher Estranha" (caps. 2, 5-7, 9) representa na prática?',
  'Como o equilíbrio entre justiça e misericórdia em Proverbios se aplica hoje?',
];

export default function ProverbiosPage() {
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
              <span className="text-foreground">Proverbios</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Livro dos Proverbios</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Salomao e outros</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~970-700 a.C.</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Literatura Sapiencial</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Antigo Testamento</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introducao ao Livro dos Proverbios
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Proverbios e o livro de sabedoria pratica do Antigo Testamento, atribuido principalmente a Salomao (1:1), o homem mais sabedo que ja viveu (1 Reis 4:31). O livro foi compilado e editado por homens de Ezequias (25:1). Alem de Salomao, contém palavras de Agur (30:1) e Lemuel (31:1).
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    O proposito esta declarado em 1:2-6: ensinar sabedoria, instrucao, discernimento, justica, equidade e prudencia. O livro e uma coleção de provérbios — ditados concisos que expressam verdades gerais sobre a vida. Nao sao promessas absolutas, mas principios sabios que regem a vida humana sob a soberania de Deus.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Genero Literário</h3>
                      <p className="text-sm text-muted-foreground">Proverbios pertence à literatura sapiencial (sabedoria), junto com Jó e Eclesiastes. É prático, não teórico. Não explica o sofrimento (Jó) nem questiona o sentido (Eclesiastes), mas ensina como viver bem.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2">Formato</h3>
                      <p className="text-sm text-muted-foreground">Maioria em forma antitética (contraste): "O justo anda em integridade; o caminho do perverso é tortuoso". Outros são sintéticos (complementares) ou comparativos ("Tão melhor que...").</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl mt-4">
                    <h3 className="font-display text-sm font-medium mb-2">Advertência Importante</h3>
                    <p className="text-sm text-muted-foreground">Proverbios contem verdades gerais, não promessas absolutas. "Instrui o menino no caminho" (22:6) não é garantia de que todo filho será salvo. É um principio que na maioria das vezes se cumpre, mas ha exceções (cf. Jó, Eclesiastes).</p>
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

          {secaoAtiva === 'proverbios30' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />30 Proverbios Essenciais
                </h2>
                <p className="text-muted-foreground mb-4">Uma seleção dos provérbios mais importantes e práticos para a vida diária, com explicação e aplicação.</p>
                <div className="space-y-3">
                  {proverbiosEssenciais.map((p, i) => (
                    <ProverbioCard key={i} proverbio={p} />
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
                  <Quote className="w-5 h-5 text-primary" />Sabedorias Personificadas
                </h2>
                <p className="text-muted-foreground mb-4">Nos capítulos 1-9, a Sabedoria é personificada como mulher que clama nas ruas. Essas passagens são o convite central do livro para a vida sábia.</p>
                <div className="space-y-4">
                  {sabedorias.map((s, i) => (
                    <div key={i} className="sola-card p-5">
                      <p className="text-xs font-semibold text-primary mb-1">{s.ref}</p>
                      <p className="text-sm font-display font-medium mb-2">{s.titulo}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{s.texto}</p>
                      <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-xs text-primary font-medium italic">&ldquo;{s.teologo}&rdquo;</p>
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

function ProverbioCard({ proverbio }: { proverbio: { num: number; ref: string; texto: string; tema: string; explicacao: string } }) {
  const [expandido, setExpandido] = useState(false);
  return (
    <motion.div layout className="sola-card overflow-hidden">
      <div className="p-4 cursor-pointer" onClick={() => setExpandido(!expandido)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">{proverbio.num}</span>
              <span className="text-xs text-primary font-medium">{proverbio.ref}</span>
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{proverbio.tema}</span>
            </div>
            <p className="text-sm italic leading-relaxed font-serif-body">&ldquo;{proverbio.texto}&rdquo;</p>
          </div>
          <motion.div animate={{ rotate: expandido ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {expandido && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{proverbio.explicacao}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
