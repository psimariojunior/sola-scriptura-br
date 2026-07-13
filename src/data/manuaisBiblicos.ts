export interface VersicoChave {
  referencia: string;
  texto: string;
  traducao: string;
}

export interface CitacaoTeologo {
  nome: string;
  periodo: string;
  citacao: string;
  obra: string;
}

export interface CapituloManual {
  numero: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  versicosChave: VersicoChave[];
  perguntasEstudo: string[];
  citacoesTeologos: CitacaoTeologo[];
}

export interface ManualBiblico {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  autor: string;
  descricao: string;
  categorias: string[];
  icone: string;
  cor: string;
  capitulos: CapituloManual[];
}
