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
    id: 'estudo-romanos',
    nome: 'Estudo de Romanos',
    descricao: 'Estudo aprofundado da epístola aos Romanos, versículo por versículo. Uma jornada pela teologia paulina da justificação pela fé.',
    categoria: 'estudo_biblico',
    membrosOnline: 12,
    totalMembros: 156,
    ultimaAtividade: 'Há 5 minutos',
    interesses: ['Paulo', 'Justificação', 'Fé', 'Graça'],
    nivel: 'intermediario',
    cor: 'bg-amber-500/10 text-amber-600',
    icone: '📖',
  },
  {
    id: 'grego-nt',
    nome: 'Grego do Novo Testamento',
    descricao: 'Aprenda grego biblico do zero. Analise o NT no original com lexico Strong e gramatica.',
    categoria: 'linguas_originais',
    membrosOnline: 8,
    totalMembros: 89,
    ultimaAtividade: 'Há 15 minutos',
    interesses: ['Grego', 'Strong', 'Exegese', 'NT'],
    nivel: 'iniciante',
    cor: 'bg-blue-500/10 text-blue-600',
    icone: '🔤',
  },
  {
    id: 'teologia-sistematica',
    nome: 'Teologia Sistemática',
    descricao: 'Estudo das 13 categorias da teologia sistemática. Trindade, Escatologia, Cristologia e mais.',
    categoria: 'teologia',
    membrosOnline: 15,
    totalMembros: 203,
    ultimaAtividade: 'Há 2 minutos',
    interesses: ['Doutrinas', 'Reformadores', 'Confissões', 'Credo'],
    nivel: 'avancado',
    cor: 'bg-purple-500/10 text-purple-600',
    icone: '⛪',
  },
  {
    id: 'genesis-creation',
    nome: 'Gênesis e Criação',
    descricao: 'Estudo do livro de Gênesis com foco na narrativa da criação, queda e alianças primitivas.',
    categoria: 'estudo_biblico',
    membrosOnline: 10,
    totalMembros: 134,
    ultimaAtividade: 'Há 8 minutos',
    interesses: ['Gênesis', 'Criação', 'Adão', 'Abraão'],
    nivel: 'iniciante',
    cor: 'bg-amber-500/10 text-amber-600',
    icone: '📖',
  },
  {
    id: 'exegese-pratica',
    nome: 'Exegese Prática',
    descricao: 'Pratica de analise exegetica com ferramentas de IA. Aprenda a estudar a Biblia com rigor academico.',
    categoria: 'exegese',
    membrosOnline: 7,
    totalMembros: 67,
    ultimaAtividade: 'Há 20 minutos',
    interesses: ['Exegese', 'Contexto', 'Gramatica', 'IA'],
    nivel: 'intermediario',
    cor: 'bg-emerald-500/10 text-emerald-600',
    icone: '🔍',
  },
  {
    id: 'devocional-matinal',
    nome: 'Devocional Matinal',
    descricao: 'Momento diario de oracao e meditacao na Palavra. Comece o dia com Deus.',
    categoria: 'devocional',
    membrosOnline: 22,
    totalMembros: 312,
    ultimaAtividade: 'Agora',
    interesses: ['Oracao', 'Meditacao', 'Salmos', 'Proverbios'],
    nivel: 'iniciante',
    cor: 'bg-rose-500/10 text-rose-600',
    icone: '🙏',
  },
  {
    id: 'historia-israel',
    nome: 'Historia de Israel',
    descricao: 'Do Êxodo ao exílio. Percorra a historia do povo de Deus atraves dos livros historicos.',
    categoria: 'historia',
    membrosOnline: 9,
    totalMembros: 98,
    ultimaAtividade: 'Há 12 minutos',
    interesses: ['Êxodo', 'Reis', 'Profetas', 'Templo'],
    nivel: 'intermediario',
    cor: 'bg-orange-500/10 text-orange-600',
    icone: '🏛️',
  },
  {
    id: 'hebraico-at',
    nome: 'Hebraico do Antigo Testamento',
    descricao: 'Estudo do hebraico biblico com foco nos Salmos, Proverbios e Profetas.',
    categoria: 'linguas_originais',
    membrosOnline: 5,
    totalMembros: 45,
    ultimaAtividade: 'Há 30 minutos',
    interesses: ['Hebraico', 'Salmos', 'Isaias', 'Strong'],
    nivel: 'avancado',
    cor: 'bg-blue-500/10 text-blue-600',
    icone: '🔤',
  },
];

export const SESSOES_ESTUDO: SessaoEstudo[] = [
  {
    id: 'sessao-romanos-1',
    grupoId: 'estudo-romanos',
    titulo: 'Romanos 1-4: A Maldade Humana e a Justificacao pela Fe',
    descricao: 'Analise do argumento paulino sobre a universalidade do pecado e a justificacao pela fe em Cristo.',
    dataInicio: '2026-07-15T19:00:00Z',
    participantes: 34,
    versicoFoco: 'Rm 3:23-24',
    status: 'agendado',
    duracao: '1h30',
  },
  {
    id: 'sessao-gregos-abc',
    grupoId: 'grego-nt',
    titulo: 'Alfabeto e Pronuncia Grega',
    descricao: 'Primeira aula: aprenda o alfabeto grego, pronuncia e primeiras palavras do NT.',
    dataInicio: '2026-07-15T20:00:00Z',
    participantes: 22,
    versicoFoco: 'Jo 1:1',
    status: 'agendado',
    duracao: '1h',
  },
  {
    id: 'sessao-trindade',
    grupoId: 'teologia-sistematica',
    titulo: 'A Trindade: Um Deus em Tres Pessoas',
    descricao: 'Estudo aprofundado do dogma trinitario: Pai, Filho e Espirito Santo.',
    dataInicio: '2026-07-14T19:00:00Z',
    participantes: 41,
    versicoFoco: 'Mt 28:19',
    status: 'em_andamento',
    duracao: '2h',
  },
  {
    id: 'sessao-devocional-hoje',
    grupoId: 'devocional-matinal',
    titulo: 'Salmo 23: O Senhor e Meu Pastor',
    descricao: 'Meditacao matinal no Salmo mais amado da Biblia.',
    dataInicio: '2026-07-15T06:00:00Z',
    participantes: 56,
    versicoFoco: 'Sl 23:1',
    status: 'finalizado',
    duracao: '30min',
  },
  {
    id: 'sessao-genesis-2',
    grupoId: 'genesis-creation',
    titulo: 'A Queda e suas Consequencias (Gn 3)',
    descricao: 'Analise da narrativa da queda no Eden e o primeiro evangelho (Gn 3:15).',
    dataInicio: '2026-07-13T19:00:00Z',
    participantes: 28,
    versicoFoco: 'Gn 3:15',
    status: 'finalizado',
    duracao: '1h30',
  },
];

export const ATIVIDADES_COMUNIDADE: AtividadeComunidade[] = [
  { id: 'act-1', usuario: 'Paulo S.', avatar: 'PS', acao: 'completou a sessao', alvo: 'Romanos 1-4', tempo: 'Há 5 minutos' },
  { id: 'act-2', usuario: 'Maria C.', avatar: 'MC', acao: 'postou duvida em', alvo: 'Grego do NT', tempo: 'Há 12 minutos' },
  { id: 'act-3', usuario: 'Pedro H.', avatar: 'PH', acao: 'participou de', alvo: 'Trindade', tempo: 'Há 20 minutos' },
  { id: 'act-4', usuario: 'Ana R.', avatar: 'AR', acao: ' completou devocional', alvo: 'Salmo 23', tempo: 'Há 35 minutos' },
  { id: 'act-5', usuario: 'Lucas M.', avatar: 'LM', acao: 'enviou pergunta em', alvo: 'Exegese Pratica', tempo: 'Há 1 hora' },
  { id: 'act-6', usuario: 'Joao P.', avatar: 'JP', acao: 'compartilhou nota em', alvo: 'Teologia Sistematica', tempo: 'Há 1 hora' },
  { id: 'act-7', usuario: 'Teresa F.', avatar: 'TF', acao: 'entrou no grupo', alvo: 'Historia de Israel', tempo: 'Há 2 horas' },
  { id: 'act-8', usuario: 'Daniel S.', avatar: 'DS', acao: 'completou quiz sobre', alvo: 'Gênesis', tempo: 'Há 3 horas' },
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
