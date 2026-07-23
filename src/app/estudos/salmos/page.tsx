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
  Sparkles, Heart, Music, CloudRain, Swords, Sun, Crown, AlertTriangle,
} from 'lucide-react';

const secoes = [
  { id: 'intro', label: 'Introdução' },
  { id: 'classificacao', label: 'Classificação' },
  { id: 'salmos30', label: '30 Salmos Essenciais' },
  { id: 'messi', label: 'Salmos Messiânicos' },
  { id: 'oracao', label: 'Usos na Oração' },
  { id: 'momentos', label: 'Momentos Específicos' },
];

const classificacoes = [
  { tipo: 'Louvor', icone: Music, cor: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500', descricao: 'Expressam adoração a Deus por quem Ele e e pelo que fez. Tom de alegria e exaltação.', exemplos: [100, 103, 104, 111, 113, 117, 135, 136, 145, 146, 147, 148, 149, 150] },
  { tipo: 'Lamentacao', icone: CloudRain, cor: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500', descricao: 'Expressam dor, sofrimento, pedidos de socorro e questionamentos. A maioria dos salmos e de lamentação.', exemplos: [5, 13, 22, 42, 44, 69, 74, 79, 80, 88, 102, 130, 137] },
  { tipo: 'Ação de Graças', icone: Heart, cor: 'text-red-500', bg: 'bg-red-500/5', border: 'border-red-500', descricao: 'Agradecem a Deus por beneficios recebidos, livramentos e respostas as orações.', exemplos: [9, 30, 32, 34, 40, 65, 66, 92, 107, 116, 118, 124] },
  { tipo: 'Sabedoria', icone: Sun, cor: 'text-green-500', bg: 'bg-green-500/5', border: 'border-green-500', descricao: 'Refletem sobre a vida, a justiça, o sofrimento do justo é a prosperidade do impio.', exemplos: [1, 37, 49, 73, 112, 119, 127, 128, 133] },
  { tipo: 'Real', icone: Crown, cor: 'text-purple-500', bg: 'bg-purple-500/5', border: 'border-purple-500', descricao: 'Celebram a realeza de Deus ou a entronizacao do rei de Israel. Apontam para o Messias-Rei.', exemplos: [2, 18, 20, 21, 45, 47, 72, 89, 93, 95, 96, 97, 98, 99] },
];

const salmosEssenciais = [
  { num: 1, título: 'O Caminho do Justo e do Impio', tema: 'Sabedoria', resumo: 'Contraste entre o justo, que medita na Lei do Senhor, é o impio, que perece.' },
  { num: 2, título: 'O Messias-Rei', tema: 'Real', resumo: 'As nações se rebelam, mas Deus ri e estabelece Seu Ungido em Siao.' },
  { num: 8, título: 'A Majestade de Deus', tema: 'Louvor', resumo: 'Deus e glorioso nos ceus e na terra. O homem e coroado de glória e honra.' },
  { num: 16, título: 'O Deus da Minha Porcao', tema: 'Louvor', resumo: 'Protecao divina, alegria na presenca de Deus, esperança de ressurreição.' },
  { num: 19, título: 'Revelacao de Deus na Criação e na Lei', tema: 'Louvor', resumo: 'Os ceus declaram a glória de Deus. A Lei do Senhor e perfeita, convertendo a alma.' },
  { num: 22, título: 'Meu Deus, Por Que Me Abandonaste?', tema: 'Messianico', resumo: 'A profécia mais precisa da crucificacao de Jesus. Comeca com desespero e termina em louvor.' },
  { num: 23, título: 'O Senhor é o Meu Pastor', tema: 'Sabedoria', resumo: 'O salmo mais amado da Biblia. Deus guia, protege, sustenta e prepara mesa.' },
  { num: 27, título: 'O Senhor é a Minha Luz', tema: 'Louvor', resumo: 'Confianca inaveleavel em Deus em meio a perseguicoes.' },
  { num: 32, título: 'A Bencao do Perdao', tema: 'Ação de Graças', resumo: 'A experiência de confissão e perdão. Paulo cita em Romanos 4.' },
  { num: 34, título: 'Prova o Senhor e Veras', tema: 'Ação de Graças', resumo: 'Louvor por livramento. O anjo do Senhor acampa ao redor dos que O temem.' },
  { num: 42, título: 'Como a Cervas Anseia', tema: 'Lamentacao', resumo: 'Anseio pela presenca de Deus em meio a tristeza e perseguicao.' },
  { num: 46, título: 'Deus é o Nosso Refugio', tema: 'Louvor', resumo: 'Seguranca em meio ao caos. O Senhor dos Exercitos esta connosco.' },
  { num: 51, título: 'Cria em Mim, O Deus, um Coração Puro', tema: 'Lamentacao', resumo: 'O grande salmo de arrependimento de Davi apos o pecado com Bate-Seba.' },
  { num: 62, título: 'Somente em Deus Descansa', tema: 'Sabedoria', resumo: 'Confianca exclusiva em Deus diante da calunia e perseguicao.' },
  { num: 73, título: 'O Escandalo da Prosperidade do Impio', tema: 'Sabedoria', resumo: 'Quase tropecei ao ver a prosperidade dos impios. Até que entrei no santuario.' },
  { num: 91, título: 'O Abrigo do Altissimo', tema: 'Louvor', resumo: 'Protecao divina absoluta. Quem habita no esconderijo do Altissimo descansara.' },
  { num: 95, título: 'Vinhemos Adorar', tema: 'Louvor', resumo: 'Convite a adoração e alerta contra a dureza de coração.' },
  { num: 100, título: 'Entrem com Jubilo', tema: 'Louvor', resumo: 'O salmo de louvor por excelencia. Sirvam ao Senhor com alegria.' },
  { num: 103, título: 'Bendiz, O Minha Alma', tema: 'Louvor', resumo: 'Louvor por misericórdia e perdão. Deus perdoa todas as tuas enférmidades.' },
  { num: 110, título: 'Senta-te a Minha Direita', tema: 'Real', resumo: 'O salmo mais citado no NT. Messias-Rei e Sacerdote eterno.' },
  { num: 119, título: 'A Excelência da Palavra de Deus', tema: 'Sabedoria', resumo: 'O maior salmo: 176 versiculos, 22 estrofés alfabeticas. Meditacao profunda sobre a Torah.' },
  { num: 121, título: 'Os Meus Olhos Se Dirigem aos Montes', tema: 'Louvor', resumo: 'Salmo de peregrinacao. O meu socorro vem do Senhor.' },
  { num: 127, título: 'Se o Senhor Não Edificar', tema: 'Sabedoria', resumo: 'A vaidade do trabalho sem Deus. Filhos são heranca do Senhor.' },
  { num: 130, título: 'Do Profundo Clamo a Ti', tema: 'Lamentacao', resumo: 'O De Profundis. Clamor profundo e esperança em Deus.' },
  { num: 137, título: 'rios de Babilonia', tema: 'Lamentacao', resumo: 'Lamento do exilio em Babilonia. Como cantaremos as cancoes do Senhor?' },
  { num: 139, título: 'Tu Me Conheces, Senhor', tema: 'Sabedoria', resumo: 'Onisciencia e onipresenca de Deus. Criado no ventre materno.' },
  { num: 143, título: 'Ensina-me a Fazer a Tua Vontade', tema: 'Lamentacao', resumo: 'Pedido de guia divina em meio a perseguicao. Humildade e dependencia total.' },
  { num: 150, título: 'Aleluia Final', tema: 'Louvor', resumo: 'O grandioso encerramento dos Salmos. Tudo o que tem folego louve ao Senhor!' },
];

const salmosMessi = [
  { num: 2, título: 'O Messias-Rei', messias: 'Cristo como Rei ungido sobre Siao', citado: 'Atos 4:25-26, Hebreus 1:5, Apocalipse 19:15' },
  { num: 16, título: 'A Ressurreição de Cristo', messias: 'Cristo não seria abandonado no tumulo', citado: 'Atos 2:25-28, 13:35' },
  { num: 22, título: 'A Crucificacao', messias: 'A dor e abandono de Cristo na cruz', citado: 'Mateus 27:35, 46; Joao 19:24' },
  { num: 40, título: 'A Obediência de Cristo', messias: 'Cristo veio para fazer a vontade do Pai', citado: 'Hebreus 10:5-9' },
  { num: 45, título: 'O Rei que se Casa', messias: 'Cristo e Sua noiva (Igreja)', citado: 'Hebreus 1:8-9, Apocalipse 19:7-9' },
  { num: 69, título: 'A Paixao de Cristo', messias: 'O sofrimento e rejeicao do Messias', citado: 'Joao 15:25, Romanos 11:9-10' },
  { num: 72, título: 'O Rei Messias', messias: 'O reino universal e eterno do Messias', citado: 'Mateus 2:6, Lucas 1:33' },
  { num: 89, título: 'A Aliança Davidica', messias: 'A eternidade do trono messianico', citado: 'Lucas 1:32-33, Atos 2:30' },
  { num: 110, título: 'Senhor e Sacerdote', messias: 'Cristo sentado a direita de Deus', citado: 'Mateus 22:44, Hebreus 5:6, 7:17' },
  { num: 118, título: 'A Pedra Rejeitada', messias: 'A pedra angular que se tornou cabeca', citado: 'Mateus 21:42, Atos 4:11, 1Pedro 2:7' },
];

const momentosSalmos = [
  { título: 'Em Momentos de Ansiedade', icone: CloudRain, cor: 'text-blue-500', salmos: [
    { num: 23, verso: 'O Senhor é o meu pastor; nada me faltara.', nota: 'Lembre-se de que Deus supre todas as suas necessidades.' },
    { num: 56, verso: 'Deus é o nosso refugio é a nossa forca...', nota: 'Deus e seguro em meio ao terror.' },
    { num: 91, verso: 'Quem habita no esconderijo do Altissimo...', nota: 'Protecao divina absoluta sobre o crente.' },
    { num: 121, verso: 'Os meus olhos se dirigem aos montes...', nota: 'O teu socorro vem do Senhor, que não dorme.' },
  ]},
  { título: 'Em Momentos de Gratidao', icone: Heart, cor: 'text-red-500', salmos: [
    { num: 100, verso: 'Entrem com jubilo na presenca do Senhor...', nota: 'Adoracao alegre por tudo o que Deus fez.' },
    { num: 103, verso: 'Bendiz, o minha alma, ao Senhor...', nota: 'Lembre-se de todos os beneficios de Deus.' },
    { num: 107, verso: 'Louvem ao Senhor, porque Ele e bom...', nota: 'Louvor por livramentos em diversas situacoes.' },
    { num: 116, verso: 'Amo o Senhor, porque ouviu...', nota: 'Acao de gratas por ter sido atendido.' },
  ]},
  { título: 'Em Momentos de Arrependimento', icone: AlertTriangle, cor: 'text-amber-500', salmos: [
    { num: 32, verso: 'Bem-aventurado aquele cuja transgressão e perdoada...', nota: 'O alivio da confissão e perdão.' },
    { num: 51, verso: 'Cria em mim, o Deus, um coração puro...', nota: 'O grande salmo de confissão e restauração.' },
    { num: 130, verso: 'Do profundo clamo a ti, o Senhor...', nota: 'Arrependimento profundo e esperança em Deus.' },
  ]},
  { título: 'Em Momentos de Batalha Espiritual', icone: Swords, cor: 'text-green-500', salmos: [
    { num: 27, verso: 'O Senhor é a minha luz é a minha salvação...', nota: 'Coragem diante dos inimigos.' },
    { num: 34, verso: 'O anjo do Senhor acampa ao redor dos que O temem...', nota: 'Protecao angelical em batalha.' },
    { num: 46, verso: 'Deus é o nosso refugio é a nossa forca...', nota: 'Seguranca mesmo quando a terra treme.' },
    { num: 144, verso: 'Bendito seja o Senhor, a minha rocha...', nota: 'Deus treina minhas mãos para a guerra.' },
  ]},
];

export default function SalmosPage() {
  const [seçãoAtiva, setSecaoAtiva] = useState('intro');
  const [salmoExpandido, setSalmoExpandido] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/estudos" className="hover:text-primary transition-colors">Estudos</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Salmos</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Livro dos Salmos</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 ml-13 flex-wrap">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />Varios autores (Davi, Assaf, filhos de Core)</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />~1000-400 a.C.</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Poesia / Louvor</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">AT</span>
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
                  <Lightbulb className="w-5 h-5 text-primary" />Introdução ao Livro dos Salmos
                </h2>
                <div className="sola-card p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Os Salmos são o hino litúrgico de Israel é a oração da Igreja ao longo de todos os tempos. Compostos ao longo de cerca de 1.000 anos, de Davi (~1000 a.C.) até o periodo pos-exilico (~400 a.C.), são 150 poemas sagrados que expressam toda a gama da experiência humana diante de Deus.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    O Livro dos Salmos e dividido em cinco livros, imitando a estrutura do Pentateuco: Livro I (Salmos 1-41), Livro II (42-72), Livro III (73-89), Livro IV (90-106) e Livro V (107-150). Cada livro termina com uma doxologia.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Os Salmos são a Biblia dentro da Biblia — eles abrangem criação, queda, aliança, pecado, arrependimento, louvor, lamentação, profécia e esperança messianica. Jesus os citou mais do que qualquer outro livro do AT.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="glass-card p-4 rounded-xl text-center">
                      <p className="font-display text-3xl font-light text-primary">150</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Salmos</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <p className="font-display text-3xl font-light text-primary">5</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Livros</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <p className="font-display text-3xl font-light text-primary">~1000</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Anos de Composicao</p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'classificacao' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />Classificação dos Salmos
                </h2>
                <div className="space-y-4">
                  {classificacoes.map((c, i) => (
                    <div key={i} className={`sola-card p-5 border-l-4 ${c.border} ${c.bg}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <c.icone className={`w-5 h-5 ${c.cor}`} />
                        <h3 className="font-display text-lg font-medium">{c.tipo}</h3>
                        <span className="text-xs text-muted-foreground ml-auto">{c.exemplos.length} salmos</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.descricao}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.exemplos.map((n) => (
                          <span key={n} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{n}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'salmos30' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />30 Salmos Essenciais
                </h2>
                <div className="space-y-2">
                  {salmosEssenciais.map((s) => (
                    <motion.div key={s.num} layout className="sola-card overflow-hidden">
                      <div className="p-4 cursor-pointer flex items-center gap-3" onClick={() => setSalmoExpandido(salmoExpandido === s.num ? null : s.num)}>
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0">{s.num}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-display text-sm font-medium">{s.título}</span>
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s.tema}</span>
                        </div>
                        <motion.div animate={{ rotate: salmoExpandido === s.num ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {salmoExpandido === s.num && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="px-4 pb-4 border-t border-border/50 pt-3">
                              <p className="text-sm text-muted-foreground leading-relaxed">{s.resumo}</p>
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

          {seçãoAtiva === 'messi' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />Salmos Messiânicos
                </h2>
                <p className="text-muted-foreground mb-4">Salmos que profétizam diretamente sobre a vida, morte e reinado de Jesus Cristo:</p>
                <div className="space-y-3">
                  {salmosMessi.map((s, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{s.num}</span>
                        <h3 className="font-display text-sm font-medium">{s.título}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 ml-11">{s.messias}</p>
                      <p className="text-xs text-primary ml-11">Citado em: {s.citado}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {seçãoAtiva === 'oracao' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />Como Usar os Salmos na Oração
                </h2>
                <div className="sola-card p-6 space-y-4 border-l-4 border-primary">
                  <p className="text-muted-foreground leading-relaxed">
                    Os Salmos são o melhor manual de oração da Igreja. Aqui há praticas para incorpora-los na sua vida devocional:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Leia um salmo em voz alta como se fosse sua propria oracao. Os Salmos são Palavra de Deus, mas também são palavras humanas a Deus.',
                      'Use Salmos de lamentação quando estiver sofrendo. E biblico chorar, questionar e clamar por socorro.',
                      'Memorize Salmos curtos (23, 27, 46, 91, 100, 121, 139). Eles se tornarao seu sustento em momentos dificeis.',
                      'Reze Salmos de louvor (103, 145, 148, 150) para expressar gratidao e adoração.',
                      'Use o Salmo 51 como modelo de arrependimento. Confésse seus pecados seguindo a estrutura do salmo.',
                      'Pratique a lectio divina: Leia lentamente, medite em uma frase, ore com ela e contemple em silencio.',
                      'Cante os Salmos. A Igreja primitiva os cantava. Existem muitas versoes musicadas.',
                      'Use o Salmo 119 para meditar sobre o valor da Biblia. Cada versiculo fala da Palavra de Deus.',
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

          {seçãoAtiva === 'momentos' && (
            <ScrollReveal>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />Salmos para Momentos Específicos
                </h2>
                <div className="space-y-4">
                  {momentosSalmos.map((m, i) => (
                    <div key={i} className="sola-card p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <m.icone className={`w-5 h-5 ${m.cor}`} />
                        <h3 className="font-display text-lg font-medium">{m.título}</h3>
                      </div>
                      <div className="space-y-2">
                        {m.salmos.map((s, j) => (
                          <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium flex-shrink-0">{s.num}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm italic font-serif-body leading-relaxed">&ldquo;{s.verso}&rdquo;</p>
                              <p className="text-xs text-muted-foreground mt-1">{s.nota}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
