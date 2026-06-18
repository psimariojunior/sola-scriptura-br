export interface VersiculoCompleto {
  id: string;
  versaoId: string;
  livroId: string;
  capituloId: string;
  livro: string;
  capitulo: number;
  numero: number;
  texto: string;
  textoOriginal: string | null;
  strongs: string | null;
}

export interface ReferenciaBiblica {
  livro: string;
  capitulo: number;
  versiculo: number;
  versao?: string;
}

export interface ResultadoBusca {
  versiculos: VersiculoCompleto[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

export interface ContextoVersiculo {
  versiculo: VersiculoCompleto;
  antes: VersiculoCompleto[];
  depois: VersiculoCompleto[];
  capitulo: {
    numero: number;
    totalVersiculos: number;
  };
  livro: {
    nome: string;
    testamento: string;
    genero: string;
    autor: string | null;
  };
}
