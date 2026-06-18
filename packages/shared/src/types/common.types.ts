export interface Paginacao {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface RespostaPadrao<T> {
  dados: T;
  mensagem?: string;
  paginacao?: Paginacao;
}

export interface ErroAPI {
  statusCode: number;
  mensagem: string;
  detalhes?: any;
  timestamp: string;
  caminho: string;
}
