'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Tag, Search, X, BookOpen, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface Topico {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  categoria: string;
  versiculos: Array<{ ref: string; texto: string }>;
}

const TOPICOS: Topico[] = [
  {
    id: 'nomes-deus', nome: 'Nomes de Deus', icone: '👑', cor: 'from-amber-500 to-orange-500', categoria: 'Deus',
    versiculos: [
      { ref: 'Êxodo 3:14', texto: 'Eu Sou o que Sou (YHWH — Jeová, o Deus existente)' },
      { ref: 'Gênesis 17:1', texto: 'Deus Todo-Poderoso (El Shaddai)' },
      { ref: 'Salmos 23:1', texto: 'O Senhor é o meu Pastor (Jehovah Roi)' },
      { ref: 'Êxodo 15:26', texto: 'O Senhor que te sara (Jehovah Rapha)' },
      { ref: 'Juízes 6:24', texto: 'O Senhor é paz (Jehovah Shalom)' },
      { ref: 'Jeremias 23:6', texto: 'O Senhor, nossa justiça (Jehovah Tsidkenu)' },
      { ref: 'Salmos 46:1', texto: 'Deus é o nosso refúgio e fortaleza (Elohei Mikvah)' },
      { ref: 'Isaías 9:6', texto: 'Pai da Eternidade, Príncipe da Paz (Sar Shalom)' },
      { ref: 'João 1:1', texto: 'O Verbo (Logos) — a Palavra de Deus' },
      { ref: '1 João 4:8', texto: 'Deus é amor (Theos Agape)' },
    ],
  },
  {
    id: 'fe', nome: 'Fé', icone: '✝️', cor: 'from-blue-500 to-cyan-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'Hebreus 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam' },
      { ref: 'Romanos 10:17', texto: 'A fé vem pelo ouvir, e o ouvir pela palavra de Deus' },
      { ref: 'Habacuque 2:4', texto: 'O justo viverá da fé' },
      { ref: 'Efésios 2:8', texto: 'Pela graça sois salvos, por meio da fé' },
      { ref: 'Mateus 17:20', texto: 'Se tiverdes fé como um grão de mostarda...' },
      { ref: 'Marcos 11:22', texto: 'Tende fé em Deus' },
      { ref: 'Hebreus 11:6', texto: 'Sem fé é impossível agradar a Deus' },
      { ref: 'Gálatas 2:20', texto: 'A vida que agora vivo na carne, vivo-a na fé do Filho de Deus' },
      { ref: '2 Coríntios 5:7', texto: 'Andamos por fé, e não por vista' },
      { ref: 'Tiago 2:17', texto: 'A fé, se não tiver obras, é morta' },
    ],
  },
  {
    id: 'amor', nome: 'Amor de Deus', icone: '❤️', cor: 'from-red-500 to-pink-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'João 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito' },
      { ref: 'Romanos 5:8', texto: 'Deus prova o seu amor para conosco em que Cristo morreu por nós' },
      { ref: '1 João 4:8', texto: 'Deus é amor' },
      { ref: '1 João 4:19', texto: 'Nós o amamos a ele, porque ele nos amou primeiro' },
      { ref: 'Jeremias 31:3', texto: 'Com amor eterno eu te amei' },
      { ref: 'Salmos 136:1', texto: 'Porque para sempre é a sua misericórdia' },
      { ref: 'Romanos 8:38-39', texto: 'Nada nos poderá separar do amor de Deus' },
      { ref: 'Efésios 3:18-19', texto: 'Conhecer o amor de Cristo que excede todo entendimento' },
      { ref: '1 Coríntios 13:4-7', texto: 'O amor é sofredor, é benigno; o amor não inveja...' },
      { ref: 'Cânticos 8:6', texto: 'O amor é forte como a morte' },
    ],
  },
  {
    id: 'oracao', nome: 'Oração', icone: '🙏', cor: 'from-purple-500 to-violet-500', categoria: 'Prática',
    versiculos: [
      { ref: 'Mateus 6:9-13', texto: 'Pai nosso que estás nos céus, santificado seja o teu nome...' },
      { ref: 'Filipenses 4:6', texto: 'Não vos preocupeis com coisa alguma; antes apresentai a Deus as vossas petições' },
      { ref: '1 Tessalonicenses 5:17', texto: 'Orai sem cessar' },
      { ref: 'Tiago 5:16', texto: 'A oração fervorosa do justo pode muito em seus efeitos' },
      { ref: 'Mateus 7:7', texto: 'Pedi, e dar-se-vos-á; buscai, e encontrareis' },
      { ref: 'João 14:13-14', texto: 'Tudo quanto pedirdes em meu nome, eu o farei' },
      { ref: 'Romanos 8:26', texto: 'O Espírito intercede por nós com gemidos inexprimíveis' },
      { ref: 'Salmos 145:18', texto: 'Perto está o Senhor de todos os que o invocam' },
      { ref: 'Jeremias 33:3', texto: 'Clama a mim, e responder-te-ei' },
      { ref: 'Mateus 26:41', texto: 'Vigiai e orai, para que não entreis em tentação' },
    ],
  },
  {
    id: 'salvacao', nome: 'Salvação', icone: '🕊️', cor: 'from-emerald-500 to-green-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Efésios 2:8-9', texto: 'Pela graça sois salvos, por meio da fé; e isto não vem de vós' },
      { ref: 'Romanos 6:23', texto: 'O dom gratuito de Deus é a vida eterna em Cristo Jesus' },
      { ref: 'Atos 4:12', texto: 'Em nenhum outro há salvação' },
      { ref: 'João 14:6', texto: 'Eu sou o caminho, a verdade e a vida' },
      { ref: 'Romanos 10:9', texto: 'Se confessares com a tua boca que Jesus é o Senhor... serás salvo' },
      { ref: 'João 3:3', texto: 'Se alguém não nascer de novo, não pode ver o reino de Deus' },
      { ref: 'Tito 3:5', texto: 'Nos salvou por meio do lavar da regeneração e da renovação do Espírito Santo' },
      { ref: '2 Coríntios 5:17', texto: 'Se alguém está em Cristo, nova criatura é' },
      { ref: 'Romanos 8:1', texto: 'Agora, pois, nenhuma condenação há para os que estão em Cristo Jesus' },
      { ref: 'João 10:28', texto: 'Eu lhes dou a vida eterna, e jamais perecerão' },
    ],
  },
  {
    id: 'paz', nome: 'Paz', icone: '☮️', cor: 'from-sky-500 to-blue-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'João 14:27', texto: 'Deixo-vos a paz, a minha paz vos dou' },
      { ref: 'Filipenses 4:7', texto: 'A paz de Deus, que excede todo o entendimento, guardará os vossos corações' },
      { ref: 'Isaías 26:3', texto: 'Tu conservarás em paz perfeita aquele cuja mente está firme em ti' },
      { ref: 'Salmos 29:11', texto: 'O Senhor dará força ao seu povo; o Senhor abençoará o seu povo com paz' },
      { ref: 'Romanos 5:1', texto: 'Tendo sido justificados pela fé, temos paz com Deus' },
      { ref: 'Colossenses 3:15', texto: 'A paz de Deus presida em vossos corações' },
      { ref: 'Isaías 9:6', texto: 'Príncipe da Paz' },
      { ref: 'Salmos 4:8', texto: 'Em paz me deitarei e também dormirei' },
      { ref: '2 Tessalonicenses 3:16', texto: 'O Senhor da paz vos conceda a paz sempre e de toda maneira' },
      { ref: 'Provérbios 16:7', texto: 'Quando os caminhos do homem agradam ao Senhor, até os seus inimigos traz paz' },
    ],
  },
  {
    id: 'sabedoria', nome: 'Sabedoria', icone: '📖', cor: 'from-yellow-500 to-amber-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'Provérbios 9:10', texto: 'O temor do Senhor é o princípio da sabedoria' },
      { ref: 'Tiago 1:5', texto: 'Se algum de vós tem falta de sabedoria, peça-a a Deus' },
      { ref: 'Provérbios 3:5-6', texto: 'Confia no Senhor de todo o teu coração' },
      { ref: '1 Coríntios 1:25', texto: 'A loucura de Deus é mais sábia do que os homens' },
      { ref: 'Colossenses 2:3', texto: 'Em Cristo estão escondidos todos os tesouros da sabedoria' },
      { ref: 'Provérbios 2:6', texto: 'O Senhor dá a sabedoria; da sua boca vem o conhecimento' },
      { ref: 'Eclesiastes 7:12', texto: 'A sabedoria protege, como protege o dinheiro' },
      { ref: 'Provérbios 4:7', texto: 'A sabedoria é a coisa principal; adquire pois a sabedoria' },
      { ref: '1 Coríntios 3:18-19', texto: 'A sabedoria deste mundo é loucura diante de Deus' },
      { ref: 'Salmos 111:10', texto: 'O temor do Senhor é o princípio da sabedoria' },
    ],
  },
  {
    id: 'esperanca', nome: 'Esperança', icone: '🌟', cor: 'from-orange-500 to-amber-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'Romanos 15:13', texto: 'O Deus de esperança vos encha de todo o gozo e paz' },
      { ref: 'Jeremias 29:11', texto: 'Eu bem sei os pensamentos que tenho a vosso respeito; pensamentos de paz' },
      { ref: 'Salmos 42:11', texto: 'Espera em Deus, porque ainda o louvarei' },
      { ref: 'Isaías 40:31', texto: 'Os que esperam no Senhor renovarão as forças' },
      { ref: 'Hebreus 11:1', texto: 'A fé é o firme fundamento das coisas que se esperam' },
      { ref: 'Romanos 8:24-25', texto: 'Esperamos com paciência' },
      { ref: 'Lamentações 3:25', texto: 'Bom é o Senhor para com os que nele esperam' },
      { ref: 'Salmos 39:7', texto: 'Agora, Senhor, que espero? A minha esperança está em ti' },
      { ref: 'Tito 2:13', texto: 'Esperando a bem-aventurada esperança' },
      { ref: 'Salmos 130:5', texto: 'Eu espero no Senhor, a minha alma espera' },
    ],
  },
  {
    id: 'providencia', nome: 'Providência de Deus', icone: '🛡️', cor: 'from-indigo-500 to-blue-500', categoria: 'Deus',
    versiculos: [
      { ref: 'Mateus 6:26', texto: 'Olhai para as aves do céu, que não semeiam nem ceifam; vosso Pai celestial as alimenta' },
      { ref: 'Mateus 6:33', texto: 'Buscai primeiro o reino de Deus, e todas estas coisas vos serão acrescentadas' },
      { ref: 'Filipenses 4:19', texto: 'O meu Deus suprirá todas as vossas necessidades' },
      { ref: 'Salmos 23:1', texto: 'O Senhor é o meu pastor; nada me faltará' },
      { ref: 'Romanos 8:28', texto: 'Todas as coisas contribuem juntamente para o bem' },
      { ref: 'Salmos 34:10', texto: 'Os jovens necessitam e passam fome, mas os que buscam ao Senhor não faltarão nenhum bem' },
      { ref: 'Gênesis 22:14', texto: 'O Senhor proverá (Jehovah Jireh)' },
      { ref: 'Deuteronômio 31:8', texto: 'O Senhor é quem vai adiante de ti; ele estará contigo' },
      { ref: 'Salmos 37:25', texto: 'Não vi justo desamparado, nem a sua semente a mendigar pão' },
      { ref: 'Isaías 41:10', texto: 'Não temas, porque eu sou contigo' },
    ],
  },
  {
    id: 'profecias-cristo', nome: 'Profecias sobre Cristo', icone: '📜', cor: 'from-rose-500 to-red-500', categoria: 'Profecia',
    versiculos: [
      { ref: 'Isaías 7:14', texto: 'A virgem conceberá e dará à luz um filho (cumprida em Mateus 1:23)' },
      { ref: 'Miquéias 5:2', texto: 'De ti me sairá o que há de ser governador em Israel (cumprida em Mateus 2:6)' },
      { ref: 'Isaías 9:6', texto: 'Porque um menino nos nasceu (cumprida em Lucas 2:11)' },
      { ref: 'Salmos 22:16', texto: 'Transpassaram as minhas mãos e os meus pés (cumprida em João 20:25)' },
      { ref: 'Salmos 16:10', texto: 'Não deixarás a minha alma no inferno (cumprida em Atos 2:31)' },
      { ref: 'Zacarias 11:12', texto: 'Avaliaram o meu salário em trinta moedas de prata (cumprida em Mateus 26:15)' },
      { ref: 'Isaías 53:5', texto: 'Ferido por causa das nossas transgressões (cumprida em 1 Pedro 2:24)' },
      { ref: 'Daniel 9:26', texto: 'Depois das sessenta e duas semanas será cortado o Ungido (cumprida em Mateus 27)' },
      { ref: 'Salmos 110:1', texto: 'Assenta-te à minha direita (cumprida em Hebreus 1:3)' },
      { ref: 'Apocalipse 1:7', texto: 'Eis que vem com as nuvens (profecia futura)' },
    ],
  },
];

export default function TopicosPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('all');
  const [expandedTopico, setExpandedTopico] = useState<string | null>(null);

  const categorias = useMemo(() => [...new Set(TOPICOS.map(t => t.categoria))], []);

  const filtrados = useMemo(() => {
    let result = TOPICOS;
    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(t =>
        t.nome.toLowerCase().includes(termo) ||
        t.versiculos.some(v => v.ref.toLowerCase().includes(termo) || v.texto.toLowerCase().includes(termo))
      );
    }
    if (filtroCategoria !== 'all') {
      result = result.filter(t => t.categoria === filtroCategoria);
    }
    return result;
  }, [busca, filtroCategoria]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                <Tag className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Índice <span className="text-primary italic">Tópico</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Encontre versículos organizados por temas — nomes de Deus, profecias, virtudes e doutrinas</p>
            </div>
          </ScrollReveal>

          <div className="space-y-3 mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar tema ou versículo..."
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                <X className="w-4 h-4" /></button>}
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              <button onClick={() => setFiltroCategoria('all')}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  filtroCategoria === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                Todos
              </button>
              {categorias.map(cat => (
                <button key={cat} onClick={() => setFiltroCategoria(cat)}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    filtroCategoria === cat ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtrados.map((topico, i) => {
              const isExpanded = expandedTopico === topico.id;
              return (
                <motion.div key={topico.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn('rounded-2xl border overflow-hidden transition-all cursor-pointer',
                    isExpanded ? 'border-primary/30 bg-primary/5 col-span-1 md:col-span-2' : 'border-border/50 bg-card/50 hover:border-primary/20')}
                  onClick={() => setExpandedTopico(isExpanded ? null : topico.id)}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg', topico.cor)}>
                        {topico.icone}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{topico.nome}</h3>
                        <p className="text-[10px] text-muted-foreground">{topico.versiculos.length} versículos · {topico.categoria}</p>
                      </div>
                      <ChevronRight className={cn('w-4 h-4 text-muted-foreground transition-transform', isExpanded && 'rotate-90')} />
                    </div>

                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-4 space-y-2">
                        {topico.versiculos.map((v, j) => (
                          <div key={j} className="flex gap-3 px-3 py-2.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
                            <span className="text-xs font-bold text-primary flex-shrink-0 w-24">{v.ref}</span>
                            <p className="text-xs text-foreground/80 leading-relaxed">{v.texto}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
