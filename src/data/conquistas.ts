export interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  categoria: 'leitura' | 'estudo' | 'quiz' | 'comunidade' | 'consistencia' | 'exploracao';
  dificuldade: 'facil' | 'medio' | 'dificil' | 'lendario';
  pontos: number;
  condicao: {
    tipo: string;
    valor: number;
  };
  rara: boolean;
}

export interface NivelUsuario {
  nivel: number;
  nome: string;
  xpNecessario: number;
  cor: string;
  beneficios: string[];
}

export interface DesafioDiario {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  recompensa: number;
  duracao: string;
}

export const CATEGORIAS_CONQUISTA: Record<string, { label: string; icon: string; cor: string }> = {
  leitura: { label: 'Leitura', icon: '📖', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  estudo: { label: 'Estudo', icon: '📚', cor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  quiz: { label: 'Quiz', icon: '🧠', cor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  comunidade: { label: 'Comunidade', icon: '👥', cor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  consistencia: { label: 'Consistência', icon: '🔥', cor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
  exploracao: { label: 'Exploração', icon: '🗺️', cor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
};

export const DIFICULDADES: Record<string, { label: string; cor: string; glow: string }> = {
  facil: { label: 'Fácil', cor: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20', glow: 'shadow-green-500/20' },
  medio: { label: 'Médio', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', glow: 'shadow-amber-500/20' },
  dificil: { label: 'Difícil', cor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20', glow: 'shadow-red-500/20' },
  lendario: { label: 'Lendário', cor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', glow: 'shadow-purple-500/30' },
};

export const NIVEIS_USUARIO: NivelUsuario[] = [
  { nivel: 1, nome: 'Discípulo', xpNecessario: 0, cor: '#9ca3af', beneficios: ['Acesso básico', 'Perfil personalizado'] },
  { nivel: 2, nome: 'Aprendiz', xpNecessario: 100, cor: '#a3a3a3', beneficios: ['Flashcards', 'Anotações'] },
  { nivel: 3, nome: 'Estudante', xpNecessario: 250, cor: '#60a5fa', beneficios: ['Quiz avançado', 'Histórico detalhado'] },
  { nivel: 4, nome: 'Leitor', xpNecessario: 500, cor: '#34d399', beneficios: ['Planos de leitura', 'Marcas coloridas'] },
  { nivel: 5, nome: 'Escriba', xpNecessario: 800, cor: '#a78bfa', beneficios: ['Exportar estudos', 'Notas avançadas'] },
  { nivel: 6, nome: 'Mente', xpNecessario: 1200, cor: '#f472b6', beneficios: ['IA ilimitada', 'Relatórios'] },
  { nivel: 7, nome: 'Doutor', xpNecessario: 1800, cor: '#fb923c', beneficios: ['Exegese profunda', 'Léxico completo'] },
  { nivel: 8, nome: 'Teólogo', xpNecessario: 2500, cor: '#facc15', beneficios: ['Comentários exclusivos', 'Estudos temáticos'] },
  { nivel: 9, nome: 'Pregador', xpNecessario: 3500, cor: '#f87171', beneficios: ['Preparação de sermão', 'Harmonia sinótica'] },
  { nivel: 10, nome: 'Missionário', xpNecessario: 5000, cor: '#2dd4bf', beneficios: ['Mapas interativos', 'Contexto cultural'] },
  { nivel: 11, nome: 'Pastor', xpNecessario: 7000, cor: '#818cf8', beneficios: ['Guia de estudo', 'Cronologia avançada'] },
  { nivel: 12, nome: 'Evangelista', xpNecessario: 10000, cor: '#c084fc', beneficios: ['Compartilhar estudos', 'Badges exclusivas'] },
  { nivel: 13, nome: 'Profeta', xpNecessario: 14000, cor: '#e879f9', beneficios: ['Acesso antecipado', 'Tema personalizado'] },
  { nivel: 14, nome: 'Apóstolo', xpNecessario: 19000, cor: '#fb7185', beneficios: ['Perfil verificado', 'Destaque no ranking'] },
  { nivel: 15, nome: 'Sábio', xpNecessario: 25000, cor: '#fbbf24', beneficios: ['Badges lendárias', 'Conteúdo premium'] },
  { nivel: 16, nome: 'Conselheiro', xpNecessario: 32000, cor: '#34d399', beneficios: ['Mentoria', 'Relatórios avançados'] },
  { nivel: 17, nome: 'Líder', xpNecessario: 40000, cor: '#60a5fa', beneficios: ['Criar grupos', 'Moderar sessões'] },
  { nivel: 18, nome: 'Ancião', xpNecessario: 50000, cor: '#a78bfa', beneficios: ['Acesso total', 'API pessoal'] },
  { nivel: 19, nome: 'Patriarca', xpNecessario: 65000, cor: '#f59e0b', beneficios: ['Badge dourada', 'Perfil destacado'] },
  { nivel: 20, nome: 'Mestre da Lei', xpNecessario: 85000, cor: '#d4a843', beneficios: ['Tudo desbloqueado', 'Badge exclusiva', 'Nome dourado', 'Acesso vitalício'] },
];

export const CONQUISTAS: Conquista[] = [
  // ── Leitura (8) ──
  {
    id: 'leitura-01',
    nome: 'Primeiro Versículo',
    descricao: 'Leia seu primeiro versículo na plataforma',
    icone: '📜',
    categoria: 'leitura',
    dificuldade: 'facil',
    pontos: 10,
    condicao: { tipo: 'versiculos_lidos', valor: 1 },
    rara: false,
  },
  {
    id: 'leitura-02',
    nome: 'Capítulo Completo',
    descricao: 'Complete a leitura de um capítulo inteiro',
    icone: '📖',
    categoria: 'leitura',
    dificuldade: 'facil',
    pontos: 25,
    condicao: { tipo: 'capitulos_completos', valor: 1 },
    rara: false,
  },
  {
    id: 'leitura-03',
    nome: 'Livro Gênesis',
    descricao: 'Leia todos os 50 capítulos de Gênesis',
    icone: '🌍',
    categoria: 'leitura',
    dificuldade: 'dificil',
    pontos: 200,
    condicao: { tipo: 'livro_completo', valor: 1 },
    rara: false,
  },
  {
    id: 'leitura-04',
    nome: 'Centenário',
    descricao: 'Leia 100 capítulos da Bíblia',
    icone: '💯',
    categoria: 'leitura',
    dificuldade: 'medio',
    pontos: 150,
    condicao: { tipo: 'capitulos_completos', valor: 100 },
    rara: false,
  },
  {
    id: 'leitura-05',
    nome: 'Mil Capítulos',
    descricao: 'Leia 1.000 capítulos — quase a Bíblia inteira!',
    icone: '🏆',
    categoria: 'leitura',
    dificuldade: 'lendario',
    pontos: 1000,
    condicao: { tipo: 'capitulos_completos', valor: 1000 },
    rara: true,
  },
  {
    id: 'leitura-06',
    nome: 'Bíblia Completa',
    descricao: 'Leia todos os 1.189 capítulos da Bíblia',
    icone: '👑',
    categoria: 'leitura',
    dificuldade: 'lendario',
    pontos: 2000,
    condicao: { tipo: 'capitulos_completos', valor: 1189 },
    rara: true,
  },
  {
    id: 'leitura-07',
    nome: 'Multi-Tradução',
    descricao: 'Leia o mesmo versículo em 3 traduções diferentes',
    icone: '🌐',
    categoria: 'leitura',
    dificuldade: 'medio',
    pontos: 50,
    condicao: { tipo: 'traducoes_diferentes', valor: 3 },
    rara: false,
  },
  {
    id: 'leitura-08',
    nome: 'Maratonista Bíblico',
    descricao: 'Leia 50 capítulos em um único dia',
    icone: '🏃',
    categoria: 'leitura',
    dificuldade: 'dificil',
    pontos: 300,
    condicao: { tipo: 'capitulos_dia', valor: 50 },
    rara: true,
  },

  // ── Estudo (8) ──
  {
    id: 'estudo-01',
    nome: 'Primeiro Estudo',
    descricao: 'Complete seu primeiro estudo exegético',
    icone: '🔍',
    categoria: 'estudo',
    dificuldade: 'facil',
    pontos: 15,
    condicao: { tipo: 'estudos_completos', valor: 1 },
    rara: false,
  },
  {
    id: 'estudo-02',
    nome: 'Explorador Grego',
    descricao: 'Estude 10 palavras em Grego',
    icone: 'Α',
    categoria: 'estudo',
    dificuldade: 'medio',
    pontos: 75,
    condicao: { tipo: 'palavras_gregas', valor: 10 },
    rara: false,
  },
  {
    id: 'estudo-03',
    nome: 'Erudito Hebraico',
    descricao: 'Estude 10 palavras em Hebraico',
    icone: 'ע',
    categoria: 'estudo',
    dificuldade: 'medio',
    pontos: 75,
    condicao: { tipo: 'palavras_hebraicas', valor: 10 },
    rara: false,
  },
  {
    id: 'estudo-04',
    nome: 'Bilíngue',
    descricao: 'Domine 50 palavras nas línguas originais',
    icone: '🗣️',
    categoria: 'estudo',
    dificuldade: 'dificil',
    pontos: 250,
    condicao: { tipo: 'palavras_originais', valor: 50 },
    rara: false,
  },
  {
    id: 'estudo-05',
    nome: 'Políglota',
    descricao: 'Domine 200 palavras nas línguas originais',
    icone: '📚',
    categoria: 'estudo',
    dificuldade: 'lendario',
    pontos: 800,
    condicao: { tipo: 'palavras_originais', valor: 200 },
    rara: true,
  },
  {
    id: 'estudo-06',
    nome: 'Referências Cruzadas',
    descricao: 'Siga 25 referências cruzadas',
    icone: '🔗',
    categoria: 'estudo',
    dificuldade: 'medio',
    pontos: 60,
    condicao: { tipo: 'referencias_seguidas', valor: 25 },
    rara: false,
  },
  {
    id: 'estudo-07',
    nome: 'Comentarista',
    descricao: 'Leia 20 comentários de teólogos',
    icone: '💬',
    categoria: 'estudo',
    dificuldade: 'facil',
    pontos: 30,
    condicao: { tipo: 'comentarios_lidos', valor: 20 },
    rara: false,
  },
  {
    id: 'estudo-08',
    nome: 'Mestre do Léxico',
    descricao: 'Consulte 100 entradas no léxico',
    icone: '📖',
    categoria: 'estudo',
    dificuldade: 'dificil',
    pontos: 200,
    condicao: { tipo: 'lexico_consultado', valor: 100 },
    rara: false,
  },

  // ── Quiz (7) ──
  {
    id: 'quiz-01',
    nome: 'Primeiro Quiz',
    descricao: 'Complete seu primeiro quiz bíblico',
    icone: '✅',
    categoria: 'quiz',
    dificuldade: 'facil',
    pontos: 15,
    condicao: { tipo: 'quizzes_completos', valor: 1 },
    rara: false,
  },
  {
    id: 'quiz-02',
    nome: 'Nota 10',
    descricao: 'Acerte 100% em um quiz',
    icone: '💯',
    categoria: 'quiz',
    dificuldade: 'medio',
    pontos: 100,
    condicao: { tipo: 'quiz_perfeito', valor: 1 },
    rara: false,
  },
  {
    id: 'quiz-03',
    nome: 'Gênio Bíblico',
    descricao: 'Complete 50 quizzes com nota acima de 80%',
    icone: '🧠',
    categoria: 'quiz',
    dificuldade: 'dificil',
    pontos: 300,
    condicao: { tipo: 'quizzes_aprovados', valor: 50 },
    rara: false,
  },
  {
    id: 'quiz-04',
    nome: 'Especialista em Versículos',
    descricao: 'Complete 25 quizzes de versículos',
    icone: '📝',
    categoria: 'quiz',
    dificuldade: 'medio',
    pontos: 120,
    condicao: { tipo: 'quiz_versiculos', valor: 25 },
    rara: false,
  },
  {
    id: 'quiz-05',
    nome: 'Colecionador de Pontos',
    descricao: 'Acumule 5.000 pontos em quizzes',
    icone: '⭐',
    categoria: 'quiz',
    dificuldade: 'dificil',
    pontos: 250,
    condicao: { tipo: 'pontos_quiz', valor: 5000 },
    rara: false,
  },
  {
    id: 'quiz-06',
    nome: 'Imparável',
    descricao: 'Acerte 100 perguntas seguidas no quiz',
    icone: '🔥',
    categoria: 'quiz',
    dificuldade: 'lendario',
    pontos: 500,
    condicao: { tipo: 'sequencia_quiz', valor: 100 },
    rara: true,
  },
  {
    id: 'quiz-07',
    nome: 'Mestre do Quiz',
    descricao: 'Complete 200 quizzes no total',
    icone: '🎓',
    categoria: 'quiz',
    dificuldade: 'lendario',
    pontos: 600,
    condicao: { tipo: 'quizzes_completos', valor: 200 },
    rara: true,
  },

  // ── Comunidade (6) ──
  {
    id: 'comunidade-01',
    nome: 'Primeiro Grupo',
    descricao: 'Entre no seu primeiro grupo de estudo',
    icone: '🤝',
    categoria: 'comunidade',
    dificuldade: 'facil',
    pontos: 20,
    condicao: { tipo: 'grupos_entrados', valor: 1 },
    rara: false,
  },
  {
    id: 'comunidade-02',
    nome: 'Sessão Ao Vivo',
    descricao: 'Participe de uma sessão de estudo ao vivo',
    icone: '📡',
    categoria: 'comunidade',
    dificuldade: 'facil',
    pontos: 25,
    condicao: { tipo: 'sessoes_participadas', valor: 1 },
    rara: false,
  },
  {
    id: 'comunidade-03',
    nome: 'Colaborador',
    descricao: 'Compartilhe 10 versículos com a comunidade',
    icone: '📤',
    categoria: 'comunidade',
    dificuldade: 'medio',
    pontos: 80,
    condicao: { tipo: 'versiculos_compartilhados', valor: 10 },
    rara: false,
  },
  {
    id: 'comunidade-04',
    nome: 'Mentor',
    descricao: 'Ajude 5 membros do grupo de estudo',
    icone: '🧑‍🏫',
    categoria: 'comunidade',
    dificuldade: 'dificil',
    pontos: 200,
    condicao: { tipo: 'membros_ajudados', valor: 5 },
    rara: false,
  },
  {
    id: 'comunidade-05',
    nome: 'Líder de Grupo',
    descricao: 'Crie e administre um grupo de estudo',
    icone: '⭐',
    categoria: 'comunidade',
    dificuldade: 'dificil',
    pontos: 250,
    condicao: { tipo: 'grupo_criado', valor: 1 },
    rara: false,
  },
  {
    id: 'comunidade-06',
    nome: 'Comunidade Global',
    descricao: 'Participe de 10 sessões com membros de 5 países',
    icone: '🌍',
    categoria: 'comunidade',
    dificuldade: 'lendario',
    pontos: 500,
    condicao: { tipo: 'sessoes_internacionais', valor: 10 },
    rara: true,
  },

  // ── Consistência (7) ──
  {
    id: 'consistencia-01',
    nome: 'Início de Jornada',
    descricao: 'Mantenha uma sequência de 3 dias',
    icone: '🌱',
    categoria: 'consistencia',
    dificuldade: 'facil',
    pontos: 15,
    condicao: { tipo: 'streak_dias', valor: 3 },
    rara: false,
  },
  {
    id: 'consistencia-02',
    nome: 'Semana Perfeita',
    descricao: 'Leia todos os dias por 7 dias seguidos',
    icone: '📅',
    categoria: 'consistencia',
    dificuldade: 'facil',
    pontos: 50,
    condicao: { tipo: 'streak_dias', valor: 7 },
    rara: false,
  },
  {
    id: 'consistencia-03',
    nome: 'Duas Semanas',
    descricao: 'Mantenha sequência de 14 dias',
    icone: '💪',
    categoria: 'consistencia',
    dificuldade: 'medio',
    pontos: 100,
    condicao: { tipo: 'streak_dias', valor: 14 },
    rara: false,
  },
  {
    id: 'consistencia-04',
    nome: 'Mês de Fogo',
    descricao: 'Leia por 30 dias seguidos',
    icone: '🔥',
    categoria: 'consistencia',
    dificuldade: 'dificil',
    pontos: 250,
    condicao: { tipo: 'streak_dias', valor: 30 },
    rara: false,
  },
  {
    id: 'consistencia-05',
    nome: 'Centenário de Fogo',
    descricao: 'Mantenha sequência de 100 dias',
    icone: '💎',
    categoria: 'consistencia',
    dificuldade: 'lendario',
    pontos: 1000,
    condicao: { tipo: 'streak_dias', valor: 100 },
    rara: true,
  },
  {
    id: 'consistencia-06',
    nome: 'Leitor Noturno',
    descricao: 'Leia após as 22h por 10 noites seguidas',
    icone: '🌙',
    categoria: 'consistencia',
    dificuldade: 'medio',
    pontos: 80,
    condicao: { tipo: 'leituras_noturnas', valor: 10 },
    rara: false,
  },
  {
    id: 'consistencia-07',
    nome: 'Ano Bíblico',
    descricao: 'Leia todos os dias por 365 dias',
    icone: '🏅',
    categoria: 'consistencia',
    dificuldade: 'lendario',
    pontos: 2000,
    condicao: { tipo: 'streak_dias', valor: 365 },
    rara: true,
  },

  // ── Exploração (8) ──
  {
    id: 'exploracao-01',
    nome: 'Primeiro Mapa',
    descricao: 'Abra o atlas bíblico interativo',
    icone: '🗺️',
    categoria: 'exploracao',
    dificuldade: 'facil',
    pontos: 10,
    condicao: { tipo: 'mapas_abertos', valor: 1 },
    rara: false,
  },
  {
    id: 'exploracao-02',
    nome: 'Cronógrafo',
    descricao: 'Explore a linha do tempo bíblica',
    icone: '⏳',
    categoria: 'exploracao',
    dificuldade: 'facil',
    pontos: 15,
    condicao: { tipo: 'cronologia_visitada', valor: 1 },
    rara: false,
  },
  {
    id: 'exploracao-03',
    nome: 'Teólogo em Ação',
    descricao: 'Leia 5 estudos teológicos',
    icone: '⛪',
    categoria: 'exploracao',
    dificuldade: 'facil',
    pontos: 25,
    condicao: { tipo: 'estudos_teologicos', valor: 5 },
    rara: false,
  },
  {
    id: 'exploracao-04',
    nome: 'Harmonizador',
    descricao: 'Use a ferramenta de harmonia sinótica',
    icone: '📊',
    categoria: 'exploracao',
    dificuldade: 'facil',
    pontos: 15,
    condicao: { tipo: 'harmonia_usada', valor: 1 },
    rara: false,
  },
  {
    id: 'exploracao-05',
    nome: 'Pregador Preparado',
    descricao: 'Use todas as ferramentas de estudo',
    icone: '🎤',
    categoria: 'exploracao',
    dificuldade: 'medio',
    pontos: 100,
    condicao: { tipo: 'ferramentas_usadas', valor: 10 },
    rara: false,
  },
  {
    id: 'exploracao-06',
    nome: 'Arqueólogo',
    descricao: 'Explore 20 artefatos arqueológicos',
    icone: '🏺',
    categoria: 'exploracao',
    dificuldade: 'medio',
    pontos: 120,
    condicao: { tipo: 'artefatos_explorados', valor: 20 },
    rara: false,
  },
  {
    id: 'exploracao-07',
    nome: 'Fluente em Código',
    descricao: 'Use a concordância 50 vezes',
    icone: '💻',
    categoria: 'exploracao',
    dificuldade: 'dificil',
    pontos: 200,
    condicao: { tipo: 'concordancia_usada', valor: 50 },
    rara: false,
  },
  {
    id: 'exploracao-08',
    nome: 'Guardião do Conhecimento',
    descricao: 'Desbloqueie 30 conquistas',
    icone: '🏛️',
    categoria: 'exploracao',
    dificuldade: 'lendario',
    pontos: 1500,
    condicao: { tipo: 'conquistas_desbloqueadas', valor: 30 },
    rara: true,
  },
];

export const DESAFIOS_DIARIOS: DesafioDiario[] = [
  // Domingo
  {
    id: 'des-01',
    titulo: 'Leitura Dominical',
    descricao: 'Leia 3 capítulos da Bíblia hoje',
    tipo: 'leitura',
    recompensa: 30,
    duracao: '24h',
  },
  {
    id: 'des-02',
    titulo: 'Reflexão Teológica',
    descricao: 'Leia 1 estudo teológico e anote uma reflexão',
    tipo: 'estudo',
    recompensa: 25,
    duracao: '24h',
  },
  {
    id: 'des-03',
    titulo: 'Quiz Rápido',
    descricao: 'Complete um quiz com nota acima de 70%',
    tipo: 'quiz',
    recompensa: 20,
    duracao: '24h',
  },
  // Segunda
  {
    id: 'des-04',
    titulo: 'Monte as Escrituras',
    descricao: 'Memorize um versículo usando flashcards',
    tipo: 'memorizacao',
    recompensa: 35,
    duracao: '24h',
  },
  {
    id: 'des-05',
    titulo: 'Harmonia Sinótica',
    descricao: 'Compare a mesma passagem em 2 evangelhos',
    tipo: 'exploracao',
    recompensa: 25,
    duracao: '24h',
  },
  {
    id: 'des-06',
    titulo: 'Palavra do Dia',
    descricao: 'Estude uma palavra em Grego ou Hebraico',
    tipo: 'estudo',
    recompensa: 30,
    duracao: '24h',
  },
  // Terça
  {
    id: 'des-07',
    titulo: 'Cadeia de Referências',
    descricao: 'Siga 5 referências cruzadas',
    tipo: 'exploracao',
    recompensa: 30,
    duracao: '24h',
  },
  {
    id: 'des-08',
    titulo: 'Leitor Ágil',
    descricao: 'Leia 5 capítulos hoje',
    tipo: 'leitura',
    recompensa: 40,
    duracao: '24h',
  },
  {
    id: 'des-09',
    titulo: 'Comentarista',
    descricao: 'Leia 3 comentários de teólogos',
    tipo: 'estudo',
    recompensa: 25,
    duracao: '24h',
  },
  // Quarta
  {
    id: 'des-10',
    titulo: 'Quiz Relâmpago',
    descricao: 'Complete 3 quizzes hoje',
    tipo: 'quiz',
    recompensa: 45,
    duracao: '24h',
  },
  {
    id: 'des-11',
    titulo: 'Explorador Bíblico',
    descricao: 'Visite 3 páginas diferentes do atlas',
    tipo: 'exploracao',
    recompensa: 25,
    duracao: '24h',
  },
  {
    id: 'des-12',
    titulo: 'Cronologia Viva',
    descricao: 'Explore 5 eventos na linha do tempo',
    tipo: 'exploracao',
    recompensa: 30,
    duracao: '24h',
  },
  // Quinta
  {
    id: 'des-13',
    titulo: 'Salmos de Hoje',
    descricao: 'Leia 3 Salmos e marque seu favorito',
    tipo: 'leitura',
    recompensa: 35,
    duracao: '24h',
  },
  {
    id: 'des-14',
    titulo: 'Léxico Vivo',
    descricao: 'Consulte 5 palavras no léxico',
    tipo: 'estudo',
    recompensa: 30,
    duracao: '24h',
  },
  {
    id: 'des-15',
    titulo: 'Versículo do Dia',
    descricao: 'Compartilhe um versículo nas redes sociais',
    tipo: 'comunidade',
    recompensa: 20,
    duracao: '24h',
  },
  // Sexta
  {
    id: 'des-16',
    titulo: 'Estudo Profundo',
    descricao: 'Complete uma exegese de um versículo',
    tipo: 'estudo',
    recompensa: 40,
    duracao: '24h',
  },
  {
    id: 'des-17',
    titulo: 'Multi-Tradução',
    descricao: 'Compare João 3:16 em 4 traduções',
    tipo: 'exploracao',
    recompensa: 25,
    duracao: '24h',
  },
  {
    id: 'des-18',
    titulo: 'Quiz Desafiador',
    descricao: 'Complete um quiz no nível difícil',
    tipo: 'quiz',
    recompensa: 35,
    duracao: '24h',
  },
  // Sábado
  {
    id: 'des-19',
    titulo: 'Sábado de Estudo',
    descricao: 'Leia 10 capítulos hoje',
    tipo: 'leitura',
    recompensa: 50,
    duracao: '24h',
  },
  {
    id: 'des-20',
    titulo: 'Pregador Preparado',
    descricao: 'Use a ferramenta de preparação de estudo',
    tipo: 'estudo',
    recompensa: 30,
    duracao: '24h',
  },
  {
    id: 'des-21',
    titulo: 'Maratonista',
    descricao: 'Leia 15 capítulos hoje',
    tipo: 'leitura',
    recompensa: 60,
    duracao: '24h',
  },
];

export function getDesafiosDoDia(diaSemana: number): DesafioDiario[] {
  const inicio = diaSemana * 3;
  return DESAFIOS_DIARIOS.slice(inicio, inicio + 3);
}

export function getNivelByXP(xp: number): NivelUsuario {
  let nivel = NIVEIS_USUARIO[0];
  for (const n of NIVEIS_USUARIO) {
    if (xp >= n.xpNecessario) nivel = n;
  }
  return nivel;
}

export function getProximoNivel(xp: number): NivelUsuario | null {
  for (const n of NIVEIS_USUARIO) {
    if (xp < n.xpNecessario) return n;
  }
  return null;
}

export function calcularProgressoNivel(xp: number): number {
  const atual = getNivelByXP(xp);
  const proximo = getProximoNivel(xp);
  if (!proximo) return 100;
  const xpNoNivel = xp - atual.xpNecessario;
  const xpNecessario = proximo.xpNecessario - atual.xpNecessario;
  return Math.min(100, Math.round((xpNoNivel / xpNecessario) * 100));
}
