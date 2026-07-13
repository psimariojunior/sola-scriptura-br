export interface GrupoEstudo {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  membrosOnline: number;
  totalMembros: number;
  ultimaAtividade: string;
  interesses: string[];
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  cor: string;
  icone: string;
}

export interface SessaoEstudo {
  id: string;
  grupoId: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  participantes: number;
  versicoFoco: string;
  status: 'agendado' | 'em_andamento' | 'finalizado';
  duracao: string;
}

export interface AtividadeComunidade {
  id: string;
  usuario: string;
  avatar: string;
  acao: string;
  alvo: string;
  tempo: string;
}

export const CATEGORIAS_GRUPO: Record<string, { label: string; icon: string; cor: string }> = {
  estudo_biblico: { label: 'Estudo Bíblico', icon: '📖', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  teologia: { label: 'Teologia', icon: '⛪', cor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  linguas_originais: { label: 'Línguas Originais', icon: '🔤', cor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  exegese: { label: 'Exegese', icon: '🔍', cor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  devocional: { label: 'Devocional', icon: '🙏', cor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  historia: { label: 'História Bíblica', icon: '🏛️', cor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
};

export const NIVEIS_GRUPO: Record<string, { label: string; cor: string }> = {
  iniciante: { label: 'Iniciante', cor: 'bg-green-500/10 text-green-600 dark:text-green-400' },
  intermediario: { label: 'Intermediário', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  avancado: { label: 'Avançado', cor: 'bg-red-500/10 text-red-600 dark:text-red-400' },
};

export const GRUPOS_ESTUDO: GrupoEstudo[] = [
  {
    id: 'g01',
    nome: 'Romanos em Profundidade',
    descricao: 'Estudo versículo a versículo da epístola aos Romanos com análise exegética e teológica completa.',
    categoria: 'estudo_biblico',
    membrosOnline: 12,
    totalMembros: 45,
    ultimaAtividade: '5 min atrás',
    interesses: ['Romanos', 'Paulo', 'Graça', 'Justificação'],
    nivel: 'avancado',
    cor: '#f59e0b',
    icone: '📖',
  },
  {
    id: 'g02',
    nome: 'Grego Koiné Básico',
    descricao: 'Aprenda os fundamentos do Grego do Novo Testamento. Do alfabeto ao Novo Testamento em grego.',
    categoria: 'linguas_originais',
    membrosOnline: 8,
    totalMembros: 62,
    ultimaAtividade: '15 min atrás',
    interesses: ['Grego', 'Novo Testamento', 'Alfabeto', 'Gramática'],
    nivel: 'iniciante',
    cor: '#3b82f6',
    icone: 'Α',
  },
  {
    id: 'g03',
    nome: 'Teologia Reformada',
    descricao: 'Discussão acadêmica das cinco solas e teologia calvinista com fontes primárias.',
    categoria: 'teologia',
    membrosOnline: 15,
    totalMembros: 38,
    ultimaAtividade: '2 min atrás',
    interesses: ['Calvino', 'Reforma', 'Soberania', 'Eleição'],
    nivel: 'avancado',
    cor: '#8b5cf6',
    icone: '⛪',
  },
  {
    id: 'g04',
    nome: 'Evangelhos Sinóticos',
    descricao: 'Comparação harmonizada de Mateus, Marcos e Lucas com foco na crítica de fontes.',
    categoria: 'exegese',
    membrosOnline: 6,
    totalMembros: 28,
    ultimaAtividade: '1 hora atrás',
    interesses: ['Jesus', 'Sinóticos', 'Harmonia', 'Crítica de Fontes'],
    nivel: 'intermediario',
    cor: '#10b981',
    icone: '🔍',
  },
  {
    id: 'g05',
    nome: 'Devocional Matinal',
    descricao: 'Leitura e oração diária às 6h da manhã. Comece o dia com a Palavra.',
    categoria: 'devocional',
    membrosOnline: 22,
    totalMembros: 85,
    ultimaAtividade: 'Agora',
    interesses: ['Oração', 'Leitura Diária', 'Meditação', 'Salmos'],
    nivel: 'iniciante',
    cor: '#f43f5e',
    icone: '🙏',
  },
  {
    id: 'g06',
    nome: 'Hebraico Bíblico',
    descricao: 'Estudo do idioma hebraico do Antigo Testamento. Do Alef ao Tav.',
    categoria: 'linguas_originais',
    membrosOnline: 5,
    totalMembros: 33,
    ultimaAtividade: '30 min atrás',
    interesses: ['Hebraico', 'AT', 'Torá', 'Salmos'],
    nivel: 'intermediario',
    cor: '#06b6d4',
    icone: 'ע',
  },
  {
    id: 'g07',
    nome: 'Apocalipse Desvendado',
    descricao: 'Estudo profético do Livro de Apocalipse com análise de símbolos e interpretações.',
    categoria: 'estudo_biblico',
    membrosOnline: 18,
    totalMembros: 52,
    ultimaAtividade: '10 min atrás',
    interesses: ['Apocalipse', 'Profecia', 'Escatologia', 'Daniel'],
    nivel: 'avancado',
    cor: '#dc2626',
    icone: '🔥',
  },
  {
    id: 'g08',
    nome: 'História do Israel',
    descricao: 'Contexto histórico e cultural do povo de Israel desde Abraão até o exílio.',
    categoria: 'historia',
    membrosOnline: 7,
    totalMembros: 29,
    ultimaAtividade: '45 min atrás',
    interesses: ['Israel', 'Arqueologia', 'Exílio', 'Reis'],
    nivel: 'intermediario',
    cor: '#ea580c',
    icone: '🏛️',
  },
  {
    id: 'g09',
    nome: 'Primeiros Passos na Fé',
    descricao: 'Grupo para novos convertidos. Leitura guiada dos Evangelhos e fundamentos da fé.',
    categoria: 'devocional',
    membrosOnline: 30,
    totalMembros: 120,
    ultimaAtividade: 'Agora',
    interesses: ['Conversão', 'Evangelhos', 'Oração', 'Comunhão'],
    nivel: 'iniciante',
    cor: '#22c55e',
    icone: '🌱',
  },
  {
    id: 'g10',
    nome: 'Hermenêutica Avançada',
    descricao: 'Técnicas e métodos de interpretação bíblica. Exegese gramatical, histórico-crítica e teológica.',
    categoria: 'exegese',
    membrosOnline: 4,
    totalMembros: 18,
    ultimaAtividade: '2 horas atrás',
    interesses: ['Hermenêutica', 'Exegese', 'Método', 'Interpretação'],
    nivel: 'avancado',
    cor: '#7c3aed',
    icone: '🔎',
  },
];

export const SESSOES_ESTUDO: SessaoEstudo[] = [
  { id: 's01', grupoId: 'g01', titulo: 'Romanos 8 — Vida no Espírito', descricao: 'Estudo do capítulo mais profundo de Romanos sobre a vida cristã.', dataInicio: '2026-07-12T19:00:00', participantes: 18, versicoFoco: 'Romanos 8:28', status: 'em_andamento', duracao: '90min' },
  { id: 's02', grupoId: 'g02', titulo: 'Alfabeto Grego — Aula 3', descricao: 'Terceira aula: vogais e pronúncia do grego koiné.', dataInicio: '2026-07-13T20:00:00', participantes: 25, versicoFoco: 'João 1:1', status: 'agendado', duracao: '60min' },
  { id: 's03', grupoId: 'g03', titulo: 'Sola Scriptura — Fundamento', descricao: 'Estudo da doutrina da Escritura como autoridade suprema.', dataInicio: '2026-07-12T18:00:00', participantes: 22, versicoFoco: '2 Timóteo 3:16', status: 'em_andamento', duracao: '120min' },
  { id: 's04', grupoId: 'g04', titulo: 'A Transfiguração — 3 Relatos', descricao: 'Comparação dos relatos em Mateus 17, Marcos 9 e Lucas 9.', dataInicio: '2026-07-14T19:30:00', participantes: 12, versicoFoco: 'Mateus 17:1-8', status: 'agendado', duracao: '75min' },
  { id: 's05', grupoId: 'g05', titulo: 'Salmos 23 — Meditação', descricao: 'Meditação guiada no Salmo do Grande Pastor.', dataInicio: '2026-07-12T06:00:00', participantes: 40, versicoFoco: 'Salmos 23:1-6', status: 'finalizado', duracao: '30min' },
  { id: 's06', grupoId: 'g06', titulo: 'Raízes Hebraicas — Verbs', descricao: 'Conjugação de verbos hebraicos no tempo perfect.', dataInicio: '2026-07-15T19:00:00', participantes: 8, versicoFoco: 'Gênesis 1:1', status: 'agendado', duracao: '90min' },
  { id: 's07', grupoId: 'g07', titulo: 'Apocalipse 2-3 — As 7 Igrejas', descricao: 'Análise das cartas às sete igrejas da Ásia Menor.', dataInicio: '2026-07-12T20:00:00', participantes: 30, versicoFoco: 'Apocalipse 2:1', status: 'em_andamento', duracao: '120min' },
  { id: 's08', grupoId: 'g08', titulo: 'O Reino de Davi', descricao: 'Expansão e queda do reino unificado de Israel.', dataInicio: '2026-07-13T18:00:00', participantes: 14, versicoFoco: '2 Samuel 7:12-16', status: 'agendado', duracao: '90min' },
  { id: 's09', grupoId: 'g09', titulo: 'João — O Amor de Deus', descricao: 'Leitura do Evangelho de João com foco no amor de Deus.', dataInicio: '2026-07-12T07:00:00', participantes: 55, versicoFoco: 'João 3:16', status: 'finalizado', duracao: '45min' },
  { id: 's10', grupoId: 'g10', titulo: 'Método Histórico-Crítico', descricao: 'Introdução ao método histórico-crítico de interpretação.', dataInicio: '2026-07-14T20:00:00', participantes: 6, versicoFoco: 'Efésios 1:3-14', status: 'agendado', duracao: '120min' },
  { id: 's11', grupoId: 'g01', titulo: 'Romanos 9 — A Soberania de Deus', descricao: 'Discussão sobre eleição e soberania divina em Romanos 9.', dataInicio: '2026-07-19T19:00:00', participantes: 0, versicoFoco: 'Romanos 9:16', status: 'agendado', duracao: '90min' },
  { id: 's12', grupoId: 'g03', titulo: 'Os Decretos de Deus', descricao: 'Estudo dos decretos eternos na teologia reformada.', dataInicio: '2026-07-19T18:00:00', participantes: 0, versicoFoco: 'Efésios 1:11', status: 'agendado', duracao: '120min' },
  { id: 's13', grupoId: 'g05', titulo: 'Salmos de Lamento', descricao: 'Meditação em Salmos de lamento e como processar a dor.', dataInicio: '2026-07-13T06:00:00', participantes: 0, versicoFoco: 'Salmos 22:1', status: 'agendado', duracao: '30min' },
  { id: 's14', grupoId: 'g07', titulo: 'Apocalipse 12 — A Mulher e o Dragão', descricao: 'Interpretação do capítulo 12 de Apocalipse.', dataInicio: '2026-07-19T20:00:00', participantes: 0, versicoFoco: 'Apocalipse 12:1', status: 'agendado', duracao: '120min' },
  { id: 's15', grupoId: 'g02', titulo: 'Grego — Nominais e Artigo', descricao: 'Declinação de substantivos e uso do artigo grego.', dataInicio: '2026-07-20T20:00:00', participantes: 0, versicoFoco: 'Efésios 2:8-9', status: 'agendado', duracao: '60min' },
  { id: 's16', grupoId: 'g04', titulo: 'A Parábola do Filho Pródigo', descricao: 'Análise sinótica da parábola em Lucas 15.', dataInicio: '2026-07-21T19:30:00', participantes: 0, versicoFoco: 'Lucas 15:11-32', status: 'agendado', duracao: '75min' },
  { id: 's17', grupoId: 'g06', titulo: 'Hebraico — Poesia e Paralelismo', descricao: 'Estruturas poéticas do hebraico bíblico.', dataInicio: '2026-07-22T19:00:00', participantes: 0, versicoFoco: 'Provérbios 3:5-6', status: 'agendado', duracao: '90min' },
  { id: 's18', grupoId: 'g08', titulo: 'O Exílio Babilônico', descricao: 'Consequências do exílio e a restauração de Israel.', dataInicio: '2026-07-20T18:00:00', participantes: 0, versicoFoco: 'Jeremias 29:11', status: 'agendado', duracao: '90min' },
  { id: 's19', grupoId: 'g09', titulo: 'Oração Modelo — Mateus 6', descricao: 'Estudo do Pai Nosso e princípios de oração.', dataInicio: '2026-07-14T07:00:00', participantes: 0, versicoFoco: 'Mateus 6:9-13', status: 'agendado', duracao: '45min' },
  { id: 's20', grupoId: 'g10', titulo: 'Tipologia Bíblica', descricao: 'Como identificar e interpretar tipos e antítipos na Escritura.', dataInicio: '2026-07-21T20:00:00', participantes: 0, versicoFoco: 'Hebreus 8:5', status: 'agendado', duracao: '120min' },
];

export const ATIVIDADES_COMUNIDADE: AtividadeComunidade[] = [
  { id: 'a01', usuario: 'Ana Beatriz', avatar: '👩‍🏫', acao: 'completou a sessão', alvo: 'Romanos 8 — Vida no Espírito', tempo: '5 min atrás' },
  { id: 'a02', usuario: 'Pedro Henrique', avatar: '👨‍🎓', acao: 'ganhou a conquista', alvo: '🧠 Gênio Bíblico', tempo: '12 min atrás' },
  { id: 'a03', usuario: 'Maria Clara', avatar: '👩‍💻', acao: 'entrou no grupo', alvo: 'Grego Koiné Básico', tempo: '20 min atrás' },
  { id: 'a04', usuario: 'João Lucas', avatar: '👨‍🏫', acao: 'subiu para o nível', alvo: 'Nível 12 — Evangelista', tempo: '35 min atrás' },
  { id: 'a05', usuario: 'Sarah Oliveira', avatar: '👩‍🔬', acao: 'compartilhou um versículo', alvo: 'Filipenses 4:13', tempo: '42 min atrás' },
  { id: 'a06', usuario: 'Lucas Santos', avatar: '🧑‍💻', acao: 'completou 3 quizzes', alvo: 'Quiz de Doutrinas', tempo: '1 hora atrás' },
  { id: 'a07', usuario: 'Rebeca Lima', avatar: '👩‍🎨', acao: 'começou a ler', alvo: 'Apocalipse — 30 dias', tempo: '1 hora atrás' },
  { id: 'a08', usuario: 'Daniel Costa', avatar: '🧑‍🎓', acao: 'completou a sessão', alvo: 'Hermenêutica Avançada', tempo: '2 horas atrás' },
  { id: 'a09', usuario: 'Priscila Araújo', avatar: '👩‍⚕️', acao: 'ganhou a conquista', alvo: '🔥 Mês de Fogo', tempo: '3 horas atrás' },
  { id: 'a10', usuario: 'Marcos Souza', avatar: '🧑‍🏫', acao: 'criou o grupo', alvo: 'Efésios — Estudo', tempo: '4 horas atrás' },
];

export function getSessoesPorGrupo(grupoId: string): SessaoEstudo[] {
  return SESSOES_ESTUDO.filter(s => s.grupoId === grupoId);
}

export function getSessoesAtivas(): SessaoEstudo[] {
  return SESSOES_ESTUDO.filter(s => s.status === 'em_andamento');
}

export function getSessoesAgendadas(): SessaoEstudo[] {
  return SESSOES_ESTUDO.filter(s => s.status === 'agendado');
}
