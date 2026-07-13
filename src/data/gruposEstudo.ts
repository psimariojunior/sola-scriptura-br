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

export const GRUPOS_ESTUDO: GrupoEstudo[] = [];

export const SESSOES_ESTUDO: SessaoEstudo[] = [];

export const ATIVIDADES_COMUNIDADE: AtividadeComunidade[] = [];

export function getSessoesPorGrupo(grupoId: string): SessaoEstudo[] {
  return SESSOES_ESTUDO.filter(s => s.grupoId === grupoId);
}

export function getSessoesAtivas(): SessaoEstudo[] {
  return SESSOES_ESTUDO.filter(s => s.status === 'em_andamento');
}

export function getSessoesAgendadas(): SessaoEstudo[] {
  return SESSOES_ESTUDO.filter(s => s.status === 'agendado');
}
