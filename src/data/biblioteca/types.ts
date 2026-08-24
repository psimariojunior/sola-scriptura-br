// ─────────────────────────────────────────────────────────────
// Biblioteca Digital — Clássicos da Fé
// Tipos compartilhados entre catálogo (leve) e obras (pesado)
// ─────────────────────────────────────────────────────────────

export type CategoriaObra =
  | 'pais-igreja'
  | 'credos'
  | 'reforma'
  | 'espiritualidade'
  | 'historia';

export type Dificuldade = 'Iniciante' | 'Intermediário' | 'Avançado';

export type EdicaoObra = 'integral' | 'selecao';

export interface CitacaoObra {
  texto: string;
  fonte: string;
}

/** Metadados leves — carregados na listagem (sem o texto integral) */
export interface ObraMeta {
  id: string;
  titulo: string;
  tituloOriginal: string;
  autor: string;
  autorVida: string;
  /** ano aproximado de composição — usado na linha do tempo */
  ano: number;
  anoTexto: string;
  categoria: CategoriaObra;
  dificuldade: Dificuldade;
  idiomaOriginal: string;
  /** honestidade editorial: texto integral ou seleção de passagens */
  edicao: EdicaoObra;
  numCapitulos: number;
  tempoLeituraMin: number;
  descricao: string;
  contexto: string;
  importancia: string;
  citacao: CitacaoObra;
  tags: string[];
  /** cores da capa gerada por CSS */
  capa: { de: string; ate: string; acento: string };
}

/** Um capítulo/seção de uma obra */
export interface CapituloObra {
  numero: number;
  titulo: string;
  /** parágrafos — negrito com **texto**, citação com > no início */
  paragrafos: string[];
}

/** Conteúdo pesado de uma obra — lazy-loaded por rota */
export interface ObraConteudo {
  id: string;
  capitulos: CapituloObra[];
}

export const CATEGORIAS_INFO: Record<
  CategoriaObra,
  { rotulo: string; descricao: string }
> = {
  'pais-igreja': {
    rotulo: 'Pais da Igreja',
    descricao: 'Textos dos primeiros cristãos, dos séculos I a V',
  },
  credos: {
    rotulo: 'Credos e Confissões',
    descricao: 'As formulações doutrinais que definiram a fé cristã',
  },
  reforma: {
    rotulo: 'Reforma Protestante',
    descricao: 'Lutero, Calvino e os textos que mudaram a história',
  },
  espiritualidade: {
    rotulo: 'Espiritualidade Clássica',
    descricao: 'Mestres da vida devocional ao longo dos séculos',
  },
  historia: {
    rotulo: 'Contexto Histórico',
    descricao: 'Testemunhas oculares do mundo bíblico',
  },
};
