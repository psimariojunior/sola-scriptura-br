export interface ReferenciaBiblica {
  livro: string;
  capitulo: number;
  versiculo: number;
  versao?: string;
}

export interface VersiculoData {
  id: string;
  livro: string;
  capitulo: number;
  numero: number;
  texto: string;
  textoOriginal?: string;
  strongs?: string;
}

export interface CapituloData {
  livro: string;
  numero: number;
  versiculos: VersiculoData[];
}

export interface LivroData {
  nome: string;
  ordem: number;
  testamento: 'AT' | 'NT';
  genero: string;
  autor?: string;
  totalCapitulos: number;
}

export interface VersaoData {
  sigla: string;
  nome: string;
  idioma: string;
  tipo: string;
  ano: number;
}
