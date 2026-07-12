'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookMarked,
  Search,
  X,
  ChevronDown,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Languages,
  Church,
  Lightbulb,
  Library,
} from 'lucide-react';

interface LivroTeologico {
  titulo: string;
  autor: string;
  editora: string;
  resumo: string;
  porqueImportante: string;
  categoria: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
}

const LITERATURA: LivroTeologico[] = [
  // ═══════════════════════════════════════════════════════════
  // LIVROS ESSENCIAIS PARA ESTUDO BÍBLICO
  // ═══════════════════════════════════════════════════════════
  {
    titulo: 'A Bíblia de Estudo de Genebra',
    autor: 'Diversos',
    editora: 'Cultura Cristã',
    resumo: 'Bíblia de estudo com notas históricas, teológicas e arqueológicas. Inclui introduções aos livros, mapas e artigos temáticos.',
    porqueImportante: 'Referência para estudo sério da Bíblia com perspectiva reformada. Notas de eruditos como R.C. Sproul, John Piper e D.A. Carson.',
    categoria: 'Bíblias de Estudo',
    nivel: 'Iniciante',
  },
  {
    titulo: 'O Novo Testamento no Mundo Original',
    autor: 'F.F. Bruce',
    editora: 'Vida Nova',
    resumo: 'Introdução ao Novo Testamento que cobre autenticidade, data, autoria e contexto histórico de cada livro.',
    porqueImportante: 'Clássico indispensável para entender o NT em seu contexto histórico. Atualizado e acessível.',
    categoria: 'Introdução ao NT',
    nivel: 'Intermediário',
  },
  {
    titulo: 'Introdução ao Antigo Testamento',
    autor: 'E.J. Young',
    editora: 'Cultura Cristã',
    resumo: 'Estudo abrangente dos 39 livros do AT com ênfase em autoria, data, tema e mensagem de cada livro.',
    porqueImportante: 'Referência clássica para o estudo do AT com abordagem conservadora e erudita.',
    categoria: 'Introdução ao AT',
    nivel: 'Intermediário',
  },
  {
    titulo: 'Teologia Sistemática',
    autor: 'Louis Berkhof',
    editora: 'Cultura Cristã',
    resumo: 'Exposição completa das doutrinas da fé cristã, desde Bibliologia até Escatologia.',
    porqueImportante: 'Padrão clássico de teologia reformada. Claro, organizado e fundamentado nas Escrituras.',
    categoria: 'Teologia Sistemática',
    nivel: 'Intermediário',
  },
  {
    titulo: 'Teologia do Antigo Testamento',
    autor: 'Walter Kaiser',
    editora: 'Cultura Cristã',
    resumo: 'Estudo do tema central do AT — o propósito eterno de Deus — através de cada livro.',
    porqueImportante: 'Demonstra a unidade e coerência do AT com o tema da aliança e do Reino de Deus.',
    categoria: 'Teologia Bíblica',
    nivel: 'Avançado',
  },
  {
    titulo: 'Dicionário Bíblico Wycliffe',
    autor: 'J. William Peverilsh & Woodrow Michael',
    editora: 'Cultura Cristã',
    resumo: 'Referência completa com definições de termos bíblicos, nomes próprios, locais e conceitos teológicos.',
    porqueImportante: 'Ferramenta essencial para esclarecer significados de palavras e conceitos das Escrituras.',
    categoria: 'Dicionários',
    nivel: 'Iniciante',
  },
  {
    titulo: 'Dicionário de Cristo e das Escrituras',
    autor: 'J.D. Douglas & Merrill Tenney (eds.)',
    editora: 'Vida Nova',
    resumo: 'Verbete abrangente sobre pessoas, lugares, eventos e temas bíblicos do AT e NT.',
    porqueImportante: 'Aprofunda o conhecimento de cada tema bíblico com artigos de especialistas.',
    categoria: 'Dicionários',
    nivel: 'Intermediário',
  },
  {
    titulo: 'Léxico Grego do Novo Testamento',
    autor: 'William F. Arndt & F. Wilbur Gingrich',
    editora: 'Cultura Cristã',
    resumo: 'Dicionário do grego koiné do NT, com definições, uso bíblico e paralelos extrabíblicos.',
    porqueImportante: 'Indispensável para estudar o significado original das palavras gregas do NT.',
    categoria: 'Léxicos',
    nivel: 'Avançado',
  },
  {
    titulo: 'Dicionário Hebraico e Aramaico do Antigo Testamento',
    autor: 'Brown, Driver & Briggs',
    editora: 'Cultura Cristã',
    resumo: 'Referência padrão para o hebraico bíblico, com definições detalhadas e análise de cada ocorrência.',
    porqueImportante: 'Essencial para estudar o AT no original. Base para toda exegese séria.',
    categoria: 'Léxicos',
    nivel: 'Avançado',
  },
  {
    titulo: 'Comentário Bíblico NVI — AT',
    autor: 'Diversos (Tremper Longman III, ed.)',
    editora: 'Casa Popular',
    resumo: 'Comentário versículo por verso com perspectiva evangélica e acessível.',
    porqueImportante: 'Boa combinação entre erudição e aplicação. Ideal para estudo individual e grupo.',
    categoria: 'Comentários',
    nivel: 'Iniciante',
  },
  {
    titulo: 'Comentário do Novo Testamento',
    autor: 'Diversos (Edição F. LaGard Smith)',
    editora: 'Casa Nazarena',
    resumo: 'Comentário evangélico sobre todos os livros do NT com notas práticas.',
    porqueImportante: 'Referência confiável para o estudo do NT com aplicação contemporânea.',
    categoria: 'Comentários',
    nivel: 'Iniciante',
  },
  {
    titulo: 'O Pentateuco',
    autor: 'Gordon Wenham',
    editora: 'Cultura Cristã',
    resumo: 'Comentário acadêmico sobre Gênesis, Êxodo, Levítico, Números e Deuteronômio.',
    porqueImportante: 'Combina rigor acadêmico com reverência bíblica. Referência no estudo do Pentateuco.',
    categoria: 'Comentários',
    nivel: 'Avançado',
  },
  {
    titulo: 'Evangelho segundo Marcos',
    autor: 'James R. Edwards',
    editora: 'Cultura Cristã',
    resumo: 'Comentário que apresenta Marcos como um evangelho para gentios, com ênfase na paixão.',
    porqueImportante: 'Perspectiva inovadora que valoriza a originalidade de Marcos entre os sinóticos.',
    categoria: 'Comentários',
    nivel: 'Avançado',
  },
  {
    titulo: 'Romanos',
    autor: 'Douglas Moo',
    editora: 'Cultura Cristã',
    resumo: 'Comentário exegético sobre a epístola que fundamenta a doutrina da justificação pela fé.',
    porqueImportante: 'Estudo aprofundado da mais importante epístola teológica de Paulo.',
    categoria: 'Comentários',
    nivel: 'Avançado',
  },
  {
    titulo: 'Hebreus',
    autor: 'Philip Edgcumbe Hughes',
    editora: 'Cultura Cristã',
    resumo: 'Comentário que conecta o AT e NT através da pessoa e obra de Cristo como sumo sacerdote.',
    porqueImportante: 'Essencial para entender a relação entre o AT e o cristianismo.',
    categoria: 'Comentários',
    nivel: 'Avançado',
  },
  {
    titulo: 'A Pessoa de Cristo',
    autor: 'Donald Macleod',
    editora: 'Cultura Cristã',
    resumo: 'Estudo da encarnação, natureza humana e divina de Cristo, e Suas implicações.',
    porqueImportante: 'Referência sobre a cristologia bíblica — centro da fé cristã.',
    categoria: 'Teologia Sistemática',
    nivel: 'Intermediário',
  },
  {
    titulo: 'O Espírito Santo',
    autor: 'Geoffrey W. Bromiley',
    editora: 'Cultura Cristã',
    resumo: 'Estudo abrangente da pessoa e obra do Espírito Santo nas Escrituras e na história.',
    porqueImportante: 'Pneumatologia bíblica essencial para entender a vida cristã.',
    categoria: 'Teologia Sistemática',
    nivel: 'Intermediário',
  },
  {
    titulo: 'A Igreja',
    autor: 'Edmund P. Clowney',
    editora: 'Cultura Cristã',
    resumo: 'Eclesiologia bíblica — natureza, missão e governo da igreja segundo as Escrituras.',
    porqueImportante: 'Fundamental para entender o papel da igreja no plano de Deus.',
    categoria: 'Teologia Sistemática',
    nivel: 'Intermediário',
  },
  {
    titulo: 'Cristianismo Bíblico',
    autor: 'Robert Reymond',
    editora: 'Cultura Cristã',
    resumo: 'Teologia sistemática reformada que aborda todas as doutrinas fundamentais.',
    porqueImportante: 'Visão abrangente e bíblica da teologia cristã com defesa confessional.',
    categoria: 'Teologia Sistemática',
    nivel: 'Avançado',
  },
  {
    titulo: 'O Essencial da Teologia Cristã',
    autor: 'Michael Horton',
    editora: 'Cultura Cristã',
    resumo: 'Resumo acessível das doutrinas cristãs essenciais para leigos e estudantes.',
    porqueImportante: 'Porta de entrada ideal para quem quer conhecer as doutrinas fundamentais.',
    categoria: 'Teologia Sistemática',
    nivel: 'Iniciante',
  },
  {
    titulo: 'A Primeira e a Última Coisa',
    autor: 'Henri Daniel-Rops',
    editora: 'Edições Loyola',
    resumo: 'Estudo das origens do cristianismo, desde as raízes judaicas até o imperio romano.',
    porqueImportante: 'Contextualiza o NT no mundo greco-romano e judaico do século I.',
    categoria: 'História',
    nivel: 'Intermediário',
  },
  {
    titulo: 'A Igreja Primitiva',
    autor: 'F.F. Bruce',
    editora: 'Vida Nova',
    resumo: 'História da igreja dos apóstolos até Constantino, baseada em Atos e fontes históricas.',
    porqueImportante: 'Compreende o desenvolvimento da igreja nos primeiros 300 anos.',
    categoria: 'História',
    nivel: 'Iniciante',
  },
  {
    titulo: 'Os Puritanos',
    autor: 'Iain Murray',
    editora: 'Sociedade Religiosa Edições',
    resumo: 'História do movimento puritano e seu impacto na teologia e cultura protestante.',
    porqueImportante: 'Inspiração para a vida devocional e a busca pela Reforma contínua.',
    categoria: 'História',
    nivel: 'Intermediário',
  },
  {
    titulo: 'A Reforma',
    autor: 'Diarmaid MacCulloch',
    editora: 'Edições 70',
    resumo: 'História completa da Reforma Protestante do século XVI, seus líderes e ideias.',
    porqueImportante: 'Referência acadêmica sobre o evento mais transformador da história da igreja.',
    categoria: 'História',
    nivel: 'Intermediário',
  },
  {
    titulo: 'Os Atos dos Apóstolos',
    autor: 'I. Howard Marshall',
    editora: 'Cultura Cristã',
    resumo: 'Comentário sobre o livro de Atos com ênfase na missão e no Espírito Santo.',
    porqueImportante: 'Essencial para entender a fundação da igreja e a expansão do evangelho.',
    categoria: 'Comentários',
    nivel: 'Avançado',
  },
  {
    titulo: 'Efésios',
    autor: 'Peter T. O\'Brien',
    editora: 'Cultura Cristã',
    resumo: 'Comentário exegético sobre a epístola que revela os propósitos eternos de Deus.',
    porqueImportante: 'Efésios é a epístola mais abrangente sobre a igreja e sua identidade em Cristo.',
    categoria: 'Comentários',
    nivel: 'Avançado',
  },
  {
    titulo: 'Apocalipse',
    autor: 'G.K. Beale',
    editora: 'Cultura Cristã',
    resumo: 'Comentário que interpreta Apocalipse como profecia sobre a vitória final de Cristo.',
    porqueImportante: 'Abordagem sólida do livro mais desafiador do NT.',
    categoria: 'Comentários',
    nivel: 'Avançado',
  },
  {
    titulo: 'O Poder da Oração',
    autor: 'E.M. Bounds',
    editora: 'Editora Evangélica',
    resumo: 'Clássico sobre a vida de oração — sua natureza, poder e necessidade.',
    porqueImportante: 'Inspirador para fortalecer a vida devocional e a prática da oração.',
    categoria: 'Vida Cristã',
    nivel: 'Iniciante',
  },
  {
    titulo: 'Precisamos de Cristo Mais uma Vez',
    autor: 'J.C. Ryle',
    editora: 'Sociedade Religiosa Edições',
    resumo: 'Coletânea de ensaios sobre a centralidade de Cristo na vida cristã.',
    porqueImportante: 'Ryle é um dos mestres evangélicos mais lúcidos — leitura essencial.',
    categoria: 'Vida Cristã',
    nivel: 'Iniciante',
  },
  {
    titulo: 'O Chamado à Santidade',
    autor: 'J.C. Ryle',
    editora: 'Sociedade Religiosa Edições',
    resumo: 'Estudo bíblico sobre a santidade — sua natureza, obstáculos e meios de crescimento.',
    porqueImportante: 'Referência sobre santificação que equilibra graça e obediência.',
    categoria: 'Vida Cristã',
    nivel: 'Iniciante',
  },
  {
    titulo: 'Disciplina da Vida Cristã',
    autor: 'Donald S. Whitney',
    editora: 'Cultura Cristã',
    resumo: 'Guia prático das disciplinas espirituais: oração, leitura bíblica, jejum, adoração.',
    porqueImportante: 'Manual prático para crescer na graça e no conhecimento de Deus.',
    categoria: 'Vida Cristã',
    nivel: 'Iniciante',
  },
  {
    titulo: 'O Crente Completamente Desperto',
    autor: 'C.J. Mahaney',
    editora: 'Fiel',
    resumo: 'Como as disciplinas espirituais nos conectam com a graça de Deus.',
    porqueImportante: 'Conecta a teologia com a prática diária de forma acessível.',
    categoria: 'Vida Cristã',
    nivel: 'Iniciante',
  },
];

const CATEGORIAS = [...new Set(LITERATURA.map((l) => l.categoria))].sort();
const NIVEIS = ['Iniciante', 'Intermediário', 'Avançado'] as const;

const CATEGORIA_CORES: Record<string, string> = {
  'Bíblias de Estudo': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Introdução ao NT': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Introdução ao AT': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Teologia Sistemática': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Teologia Bíblica': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  'Dicionários': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Léxicos': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  'Comentários': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'História': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'Vida Cristã': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

const NIVEL_CORES: Record<string, string> = {
  'Iniciante': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Intermediário': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Avançado': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function LiteraturaPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroNivel, setFiltroNivel] = useState<string>('todos');
  const [expandido, setExpandido] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    let lista = LITERATURA;
    if (filtroCategoria !== 'todas') {
      lista = lista.filter((l) => l.categoria === filtroCategoria);
    }
    if (filtroNivel !== 'todos') {
      lista = lista.filter((l) => l.nivel === filtroNivel);
    }
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (l) =>
          l.titulo.toLowerCase().includes(q) ||
          l.autor.toLowerCase().includes(q) ||
          l.editora.toLowerCase().includes(q) ||
          l.resumo.toLowerCase().includes(q)
      );
    }
    return lista;
  }, [busca, filtroCategoria, filtroNivel]);

  const stats = useMemo(() => ({
    total: LITERATURA.length,
    iniciante: LITERATURA.filter((l) => l.nivel === 'Iniciante').length,
    intermediario: LITERATURA.filter((l) => l.nivel === 'Intermediário').length,
    avancado: LITERATURA.filter((l) => l.nivel === 'Avançado').length,
  }), []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Library className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light">Literatura Teológica</h1>
              </div>
              <p className="text-muted-foreground ml-13">Guia de livros essenciais para o estudo bíblico sério</p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-4 gap-3 mb-8">
              <div className="sola-card p-4 text-center">
                <p className="font-display text-2xl font-light text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Total</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-2xl font-light text-green-500">{stats.iniciante}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Iniciante</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-2xl font-light text-yellow-500">{stats.intermediario}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Intermediário</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-2xl font-light text-red-500">{stats.avancado}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Avançado</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Busca e filtros */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar livros..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                {busca && (
                  <button
                    onClick={() => setBusca('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-3 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm"
              >
                <option value="todas">Todas as categorias</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value)}
                className="px-3 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm"
              >
                <option value="todos">Todos os níveis</option>
                {NIVEIS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </ScrollReveal>

          {/* Lista de livros */}
          <div className="space-y-3">
            {filtrados.map((livro, idx) => {
              const chave = `${livro.titulo}-${livro.autor}`;
              const estaAberto = expandido === chave;

              return (
                <ScrollReveal key={chave} delay={Math.min(idx * 0.03, 0.3)}>
                  <motion.div layout className="sola-card overflow-hidden">
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandido(estaAberto ? null : chave)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-display text-base font-medium">{livro.titulo}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${NIVEL_CORES[livro.nivel]}`}>
                              {livro.nivel}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                            <span>{livro.autor}</span>
                            <span>·</span>
                            <span>{livro.editora}</span>
                            <span>·</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORIA_CORES[livro.categoria] ?? 'bg-muted text-muted-foreground'}`}>
                              {livro.categoria}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{livro.resumo}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: estaAberto ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {estaAberto && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                            <div>
                              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Resumo</h4>
                              <p className="text-sm leading-relaxed">{livro.resumo}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Por que é importante</h4>
                              <p className="text-sm leading-relaxed text-primary/80">{livro.porqueImportante}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {filtrados.length === 0 && (
            <div className="text-center py-16">
              <BookMarked className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Nenhum livro encontrado com esses filtros.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
