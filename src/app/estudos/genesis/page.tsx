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
  Globe,
  AlertTriangle,
  Map,
  Shield,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introducao' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'resumo', label: 'Resumo por Capitulo' },
  { id: 'versiculos', label: 'Versiculos-Chave' },
  { id: 'temas', label: 'Temas Centrais' },
  { id: 'mapa', label: 'Mapa dos Patriarcas' },
  { id: 'aplicacao', label: 'Aplicacao' },
  { id: 'perguntas', label: 'Perguntas' },
];

const capitulos = [
  { cap: 1, titulo: 'A Criacao', resumo: 'Deus cria os ceus e a terra em seis dias. A criacao e ordenada, boa e culmina na criacao do ser humano a Sua imagem.' },
  { cap: 2, titulo: 'A Formacao do Homem e da Mulher', resumo: 'Deus forma o homem do barro e a mulher da sua costela. Institui o casamento e coloca o homem no jardim do Eden.' },
  { cap: 3, titulo: 'A Queda', resumo: 'A serpente engana Eva e Adao come do fruto proibido. A maldicao cai sobre a terra, mas Deus promete um Redentor (Protoevangelium).' },
  { cap: 4, titulo: 'Caim e Abel', resumo: 'O primeiro assassinato: Caim mata Abel por inveja. Cain e marcado e banido, mas sua linhagem produz a arte e a metalurgia.' },
  { cap: 5, titulo: 'Genealogia de Adao a Noé', resumo: 'A lista dos patriarchas antediluvianos. Enoque anda com Deus e e levado. Noé tem 500 anos quando gerara tres filhos.' },
  { cap: 6, titulo: 'A Corrupcao Humana e o Diluvio', resumo: 'A maldade humana se alastra. Deus se arrepende de ter feito o homem e decide destruir a terra, mas Noé acha graça.' },
  { cap: 7, titulo: 'O Diluvio', resumo: 'Noé entra na arca com sua familia e os animais. As aguas cobrem a terra por 150 dias. Todos morrem, exceto os da arca.' },
  { cap: 8, titulo: 'O Fim do Diluvio', resumo: 'Deus se lembra de Noé. A arca repousa no Ararat. Noé envia corvos e pombas. Deus faz aliança de nao destruir a terra com agua.' },
  { cap: 9, titulo: 'A Alianca com Noé', resumo: 'Deus abençoa Noé e seus filhos. O arco-iris e o sinal da aliança. Noé Planta vinha, bebe e se embriaga.' },
  { cap: 10, titulo: 'As Nacoes (Genealogia das Nacoes)', resumo: 'As descendencias dos filhos de Noé. Jafé, Cam e Sem distribuem-se pela terra, formando as nacoes.' },
  { cap: 11, titulo: 'A Torre de Babel', resumo: 'A humanidade tenta construir uma torre ao ceu. Deus confunde as linguas e espalha os povos pela terra.' },
  { cap: 12, titulo: 'O Chamado de Abraao', resumo: 'Deus chama Abraao para sair de sua terra e ir a que Ele mostraria. Promete fazê-lo grande nação e abençoa-lo.' },
  { cap: 13, titulo: 'Abraao e Lot Separados', resumo: 'Abraao e Lot se separam. Lot escolhe a planicie de Sodoma. Deus promete a terra a Abraao.' },
  { cap: 14, titulo: 'A Guerra dos Reis e Melquisedeque', resumo: 'Abraao liberta Lot de quatro reis. Encontra Melquisedeque, rei de Salem, que abençoa e recebe dizimo.' },
  { cap: 15, titulo: 'A Alianca de Deus com Abraao', resumo: 'Deus promete descendencia numerosa. Abraao creu e lhe foi imputado como justiça. A aliança e selada com animais sacrificados.' },
  { cap: 16, titulo: 'Ismael', resumo: 'Sara dá Agar, sua egípcia, a Abraao. Ismael nasce. Agar foge e retorna. Ismael sera pais de uma grande nação.' },
  { cap: 17, titulo: 'A Alianca da Circuncisao', resumo: 'Deus estabelece a circuncisao como sinal da aliança. Abraao e Sarah mudam de nome. Isaac sera o filho da promessa.' },
  { cap: 18, titulo: 'A Visitacao e a Intercessao de Abraao', resumo: 'Tres visitantes aparecem a Abraao. Sarah ri da promessa de um filho. Abraao intercede por Sodoma.' },
  { cap: 19, titulo: 'A Destruicao de Sodoma e Gomorra', resumo: 'Dois anjos visitam Lot. Homens de Sodoma tentam viola-los. Sodoma e Gomorra sao destruidas com fogo e enxofre.' },
  { cap: 20, titulo: 'Abraao e Abimeleque', resumo: 'Abraao diz que Sara e sua irma. Abimeleque a toma, mas Deus o adverte em sonho. Sara e devolvida.' },
  { cap: 21, titulo: 'O Nascimento de Isaac', resumo: 'Isaac nasce como prometido. Sara exige que Agar e Ismael sejam expulsos. Deus protege Agar e promete grandeza a Ismael.' },
  { cap: 22, titulo: 'O Sacrifício de Isaac', resumo: 'Deus testa Abraao, pedindo que sacrifique Isaac. Abraao obedece, mas um cordeiro e oferecido no lugar. Deus confirma a aliança.' },
  { cap: 23, titulo: 'A Morte de Sara', resumo: 'Sara morre aos 127 anos. Abraao compra o campo de Macpela para sepultá-la.' },
  { cap: 24, titulo: 'A Esposa para Isaac', resumo: 'Abraao envia seu servo buscar uma esposa para Isaac entre seus parentes. Rebeca e escolhida por Deus.' },
  { cap: 25, titulo: 'Isaac, Rebeca, Esaú e Jacó', resumo: 'Isaac casa com Rebeca. Gêmeos nascem: Esaú e Jacó. Jacó compra o direito de primogenitura por um prato de lentilhas.' },
  { cap: 26, titulo: 'Isaac e Abimeleque', resumo: 'Isaac prospera. Abimeleque o expulso. Isaac cava poços e tem conflitos. Deus abençoa Isaac.' },
  { cap: 27, titulo: 'Jacó Roubando a Bencao de Esaú', resumo: 'Rebeca e Jacó enganam Isaac. Jacó recebe a bencao de primogenitura. Esaú jura vingança.' },
  { cap: 28, titulo: 'O Sonho de Jacó em Betel', resumo: 'Jacó foge de Esaú. Tem um sonho com uma escada ao ceu e anjos subindo e descendo. Deus renova a aliança.' },
  { cap: 29, titulo: 'Jacó e Lavan', resumo: 'Jacó chega ao poço de Harã. Conhece Raquel. Trabalha sete anos por ela, mas Lavan engana e dá Leah. Mais sete por Raquel.' },
  { cap: 30, titulo: 'Os Filhos de Jacó', resumo: 'Raquel e Leah competem com suas servantas. Doze filhos nascem, futuros patriarchas das tribos de Israel.' },
  { cap: 31, titulo: 'A Fuga de Jacó', resumo: 'Jacó foge de Lavan com suas esposas, filhos e rebanhos. Lavan o persegue, mas Deus o protege em sonho.' },
  { cap: 32, titulo: 'A Luta de Jacó com Deus', resumo: 'Jacó luta com um homem (anjo/deus) a noite toda e recebe o nome Israel. Encontra Esaú e se reconcilia.' },
  { cap: 33, titulo: 'A Reconciliacao com Esaú', resumo: 'Jacó e Esaú se encontram e se abraçam. Esaú perdoa. Jacó se estabelece em Sukkot e depois em Siquem.' },
  { cap: 34, titulo: 'A Vinganca de Simeão e Levi', resumo: 'Dina é desonrada por Siquem. Simeão e Levi matam todos os homens da cidade. Jacó condena seus filhos.' },
  { cap: 35, titulo: 'A Morte de Raquel e Isaac', resumo: 'Deus ordena que Jacó volte a Betel. Raquel morre ao dar à luz Benjamim. Isaac morre aos 180 anos.' },
  { cap: 36, titulo: 'A Genealogia de Esaú', resumo: 'Os descendentes de Esaú formam os edomitas. Esaú se muda para a região de Seir.' },
  { cap: 37, titulo: 'Jose e seus Irmãos', resumo: 'Jose e vendido como escravo pelos irmãos. Leva-o ao Egito. Judá se separa dos irmãos.' },
  { cap: 38, titulo: 'Judá e Tamar', resumo: 'Judá e Tamar geram Perez e Zara. Tamar é mais justa que Judá.' },
  { cap: 39, titulo: 'Jose no Egito', resumo: 'Jose serve na casa de Potifar. A mulher de Potifar o acusa falsamente. Jose e preso.' },
  { cap: 40, titulo: 'Jose Interpreta Sonhos na Prisão', resumo: 'Jose interpreta sonhos do copeiro e do padeiro do faraó. O copeiro se esquece de Jose por dois anos.' },
  { cap: 41, titulo: 'Jose Interpreta os Sonhos do Faraó', resumo: 'Jose interpreta os sete anos de abundancia e os sete de fome. E colocado como governador do Egito.' },
  { cap: 42, titulo: 'Os Irmãos de Jose Vão ao Egito', resumo: 'Os irmãos vão comprar trigo. Jose os reconhece, mas eles não o reconhecem. Jose os testa.' },
  { cap: 43, titulo: 'A Segunda Viagem ao Egito', resumo: 'Os irmãos voltam com Benjamim. Jose os recebe e faz um banquete. Judá oferece sua vida por Benjamim.' },
  { cap: 44, titulo: 'Jose Revela Sua Identidade', resumo: 'Jose coloca o copo dourado na sacola de Benjamim. Judá faz um discurso emocionante. Jose se revela.' },
  { cap: 45, titulo: 'Jose se Revela aos Irmãos', resumo: 'Jose revela sua identidade e chama sua familia para viver no Egito. Faraó convida a familia de Jacó.' },
  { cap: 46, titulo: 'A Descida de Jacó ao Egito', resumo: 'Jacó vai ao Egito com seus 70 descendentes. Deus fala a Jacó em visão, confirmando que seu povo retornará.' },
  { cap: 47, titulo: 'Jacó Abençoa os Filhos do Faraó', resumo: 'Jose governa o Egito durante a fome. Jacó abençoa os filhos do Faraó e prepara-se para morrer.' },
  { cap: 48, titulo: 'A Bencao de Efraim e Manassés', resumo: 'Jacó adota os filhos de Jose e os abençoa, dando preferência ao mais novo (Efraim) sobre o mais velho (Manassés).' },
  { cap: 49, titulo: 'As Benções de Jacó aos seus Filhos', resumo: 'Jacó profetiza sobre cada um dos doze filhos, revelando o futuro de cada tribo de Israel.' },
  { cap: 50, titulo: 'A Morte de Jacó e Jose', resumo: 'Jose enterra Jacó em Macpela. Os irmãos temem vingança, mas Jose perdoa: "Vós pensastes o mal contra mim, mas Deus o tornou em bem".' },
];

const versiculosChave = [
  { referencia: 'Gênesis 1:1', texto: 'No princípio, Deus criou os céus e a terra.', explicacao: 'O versículo fundamental da Bíblia. Estabelece a existência de Deus antes de tudo, Sua soberania absoluta e a origem de toda a realidade. A palavra "Deus" (Elohim) sugere majestade e poder plural.' },
  { referencia: 'Gênesis 1:26-27', texto: 'Então disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança... E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou.', explicacao: 'A dignidade humana se fundamenta na Imago Dei — todos os seres humanos são portadores da imagem de Deus. A criação do homem e da mulher como complementares é instituída desde o início.' },
  { referencia: 'Gênesis 3:15', texto: 'Porei inimizade entre ti e a mulher, entre a tua descendência e a dela; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar.', explicacao: 'O Protoevangelium — a primeira promessa de um Salvador. A descendência da mulher (Cristo) ferirá a cabeça da serpente (Satanás), enquanto a serpente lhe ferirá o calcanhar (Cristo sofrerá, mas vencerá).' },
  { referencia: 'Gênesis 6:5-8', texto: 'Viu o Senhor que a maldade do homem se multiplicara sobre a terra... E o Senhor se arrependeu de ter feito o homem... Mas Noé achou graça aos olhos do Senhor.', explicacao: 'O diagnóstico radical do pecado humano e a graça soberana de Deus. Noé não era perfeito, mas era justo e andava com Deus. A graça precede a salvação.' },
  { referencia: 'Gênesis 12:1-3', texto: 'Vai-te da tua terra... e vai para a terra que eu te mostrarei; e farei de ti uma grande nação, e te abençoarei... Em ti serão benditas todas as famílias da terra.', explicacao: 'O chamado de Abraão é o início do plano redentor de Deus. A promessa inclui descendência, terra e bênção para todas as nações. O Antigo Testamento começa aqui como história de salvação.' },
  { referencia: 'Gênesis 15:6', texto: 'E creu Abraão no Senhor, e isso lhe foi imputado como justiça.', explicacao: 'O versículo fundamental da justificação pela fé, citado por Paulo em Romanos 4:3 e Gálatas 3:6. A justiça não vem pelas obras, mas pela fé na promessa de Deus.' },
  { referencia: 'Gênesis 22:1-19', texto: 'Toma, pois, teu filho, o teu único filho Isaac, a quem amas, e vai-te à terra de Moriá, e oferece-o ali em holocausto sobre um dos montes que eu te direi.', explicacao: 'O grande teste da fé de Abraão. Tipologia clássica de Cristo: o filho único, o cordeiro substituto, o Monte Moriá (onde ficará Jerusalém e o templo). Deus prove o sacrifício.' },
  { referencia: 'Gênesis 50:20', texto: 'Vós pensastes o mal contra mim, mas Deus o tornou em bem, para o que se vê hoje, para manter em vida um povo numeroso.', explicacao: 'O versículo que resume toda a teologia de Gênesis: o mal humano não supera o propósito soberano de Deus. Jose interpreta toda a sua história como obra da providência divina.' },
];

const temasCentrais = [
  { titulo: 'Criação e Soberania', icone: Globe, cor: 'text-blue-500', descricao: 'Deus é o Criador de todas as coisas. Ele é soberano sobre a natureza, a história e os destinos humanos. A criação é boa, ordenada e reflete o caráter do Criador.' },
  { titulo: 'A Queda e o Pecado', icone: AlertTriangle, cor: 'text-red-500', descricao: 'A desobediência de Adão e Eva trouxe maldição, separação e morte. O pecado se alastra na humanidade, mas Deus já providenciou um Redentor desde antes da fundação do mundo.' },
  { titulo: 'A Aliança de Deus', icone: Sparkles, cor: 'text-amber-500', descricao: 'Deus estabelece alianças com Noé, Abraão, Isaac e Jacó. Estas alianças são incondicionais na promessa de Deus, mas exigem resposta de fé por parte do homem.' },
  { titulo: 'A Promessa e o Cumprimento', icone: Target, cor: 'text-green-500', descricao: 'As promessas feitas aos patriarchas — descendência, terra e bênção — são cumpridas gradualmente ao longo de toda a Escritura, encontrando seu cumprimento final em Cristo.' },
  { titulo: 'A Providência de Deus', icone: Shield, cor: 'text-purple-500', descricao: 'Deus trabalha através de circunstâncias, pessoas, até mesmo do mal humano, para cumprir Seus propósitos. Jose é o exemplo máximo: o que o homem planejou para o mal, Deus tornou em bem.' },
];

const patriarchas = [
  { nome: 'Abraão', rota: 'Ur dos Caldeus → Harã → Canaã → Egito → Canaã', regiao: 'Canaã', cor: '#3b82f6' },
  { nome: 'Isaac', rota: 'Canaã (Beer-lá-roi, Bersabé)', regiao: 'Canaã', cor: '#10b981' },
  { nome: 'Jacó', rota: 'Canaã → Harã (20 anos) → Canaã → Egito', regiao: 'Egito', cor: '#f59e0b' },
  { nome: 'Jose', rota: 'Canaã → Egito (Potifar, Prisão, Palácio)', regiao: 'Egito', cor: '#8b5cf6' },
];

export default function GenesisPage() {
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
              <span className="text-foreground">Gênesis</span>
            </div>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Livro de Gênesis</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Moisés (tradicional)</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~1446-1406 a.C.</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Pentateuco / Narrativa</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Antigo Testamento</span>
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
                  Introducao ao Livro de Gênesis
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Gênesis é o primeiro livro da Bíblia e do Antigo Testamento. O nome vem do grego "Gênesis" (origem,ascimento) e em hebraico se chama "Bereshit" (No princípio). É o livro dos começos: da criação, do pecado, da aliança e da nação de Israel.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Escrito por Moisés durante a peregrinação de Israel no deserto, após a entrega da Lei no Sinai (~1446 a.C.), Gênesis estabelece as bases para toda a Escritura. Sem Gênesis, não compreendemos a queda, a promessa, a aliança nem o plano redentor.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />Nome e Origem
                      </h3>
                      <p className="text-sm text-muted-foreground">Em hebraico: Bereshit ("No princípio"). Em grego: Gênesis ("nascimento, origem"). Contém 50 capítulos, sendo o maior livro do Pentateuco em extensão narrativa.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />Estrutura Literaria
                      </h3>
                      <p className="text-sm text-muted-foreground">10 "gerações" (toledot) estruturam o livro. Duas grandes partes: Primeiros Princípios (1-11) e Patriarcas (12-50). Narrativa, poesia e genealogias se entrelaçam.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />Proposito
                      </h3>
                      <p className="text-sm text-muted-foreground">Revelar a origem do universo, a dignidade humana, a realidade do pecado, o plano de salvação de Deus e as origens de Israel como povo da aliança.</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="font-display text-sm font-medium mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />Relevancia Cristã
                      </h3>
                      <p className="text-sm text-muted-foreground">Gênesis é citado mais de 60 vezes no Novo Testamento. Cristo se identifica com o Criador, com o filho único offerido, e com a semente da mulher que vence a serpente.</p>
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
                  Estrutura do Livro
                </h2>
                <div className="space-y-4">
                  <div className="sola-card p-5 border-l-4 border-blue-500 bg-blue-500/5">
                    <h3 className="font-display text-lg font-medium mb-3">Parte I: Primeiros Princípios (Caps. 1-11)</h3>
                    <p className="text-sm text-muted-foreground mb-3">A historia universal: criacao, queda, diluvio e Babel. O palco para toda a historia da redenção.</p>
                    <ul className="space-y-2">
                      {['Caps. 1-2: A Criacao — origem do universo e da humanidade', 'Caps. 3-4: A Queda — entrada do pecado e suas consequencias', 'Caps. 5-6: Genealogia e corrupcao humana', 'Caps. 7-8: O Diluvio — juizo e misericordia', 'Caps. 9-10: Alianca com Noé e distribuicao dos povos', 'Cap. 11: Torre de Babel — confusao das linguas'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sola-card p-5 border-l-4 border-amber-500 bg-amber-500/5">
                    <h3 className="font-display text-lg font-medium mb-3">Parte II: Patriarcas (Caps. 12-50)</h3>
                    <p className="text-sm text-muted-foreground mb-3">A historia particular de Israel: Abraao, Isaac, Jacó e Jose. A aliança se concretiza em uma familia.</p>
                    <ul className="space-y-2">
                      {['Caps. 12-23: Abraão — chamado, alianca e provas de fe', 'Caps. 24-26: Isaac — a esposa e a bencao', 'Caps. 27-36: Jacó — luta, reconciliacao e patriarcha', 'Caps. 37-50: Jose — escravidao, exaltacao e provisao'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                  Resumo dos 50 Capitulos
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

          {/* Secao: Mapa dos Patriarcas */}
          {secaoAtiva === 'mapa' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  Jornada dos Patriarcas
                </h2>
                <div className="space-y-4">
                  {patriarchas.map((p, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.cor }} />
                        <h3 className="font-display text-lg font-medium">{p.nome}</h3>
                        <span className="text-xs text-muted-foreground ml-auto">{p.regiao}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed ml-7">{p.rota}</p>
                    </div>
                  ))}
                </div>
                <div className="sola-card p-5 mt-4 border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Padrão da Aliança:</strong> Deus faz uma promessa → O homem responde com fé → Há provas e obstáculos → Deus mantém Sua palavra. Este padrão se repete em cada geração e aponta para o cumprimento em Cristo.
                  </p>
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
                    Gênesis não é apenas história antiga — é a base para compreender quem somos, de onde viemos e para onde vamos:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Confie na soberania de Deus: Ele trabalha até mesmo através do mal para o bem (Gn 50:20).',
                      'Viva pela fé: Abraão creu e lhe foi imputado como justiça. A fé é o caminho da salvação desde o início.',
                      'Valorize a vida humana: Todo ser humano é portador da imagem de Deus (Imago Dei).',
                      'Reconheça a realidade do pecado: A queda explicou a condição humana. Não há solução fora de Cristo.',
                      'Busque as alianças de Deus: Ele é fiel às Suas promessas, geração após geração.',
                      'Honre a família: Gênesis é o livro da família — casamentos, filhos, pais e filhos se relacionando com Deus.',
                      'Espere pelo Redentor: A semente da mulher (Gn 3:15) é Cristo, prometido desde o princípio.',
                    ].map((a, i) => (
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
                    {[
                      'Como os relatos da criação em Gn 1-2 estabelecem a base para toda a teologia bíblica?',
                      'De que forma a queda em Gn 3 explica a condição humana e a necessidade de um Redentor?',
                      'O que a aliança com Abraão (Gn 12, 15) nos ensina sobre a justificação pela fé?',
                      'Como a história de José (Gn 37-50) ilustra a soberania de Deus sobre o mal?',
                      'De que modo as promessas feitas aos patriarcas se cumprem no Novo Testamento?',
                      'Qual a relação entre o Protoevangelium (Gn 3:15) e o evangelho de João 3:16?',
                      'Como o sacrifício de Isaac (Gn 22) aponta para o sacrifício de Cristo na cruz?',
                      'O que a Torre de Babel (Gn 11) nos ensina sobre a soberania de Deus sobre as nações?',
                    ].map((p, i) => (
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
