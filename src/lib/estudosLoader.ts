import { getVersiculoEstudo, type VersicoEstudo } from '@/data/versiculosEstudo';
import { estudosCapitulo } from '@/data/estudosCapitulo';
import { estudosPorLivro } from '@/data/estudosPorLivro';
import { obterEstudos, type EstudoVersiculo } from '@/data/estudosTeologicos';

export interface EstudoVersiculoUnificado {
  fonte: 'teologico' | 'versiculo';
  tema: string;
  contexto: string;
  interpretacoes?: EstudoVersiculo['interpretacoes'];
  detalhe?: VersicoEstudo;
}

export async function obterEstudoVersiculo(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<EstudoVersiculoUnificado | null> {
  const teologicos = obterEstudos(livro, capitulo, versiculo);
  if (teologicos.length > 0) {
    return {
      fonte: 'teologico',
      tema: teologicos[0].tema,
      contexto: teologicos[0].contexto,
      interpretacoes: teologicos[0].interpretacoes,
    };
  }

  const vs = await getVersiculoEstudo(livro, capitulo, versiculo);
  if (vs) {
    return {
      fonte: 'versiculo',
      tema: vs.titulo,
      contexto: vs.contextoHistorico,
      detalhe: vs,
    };
  }

  return null;
}

export function obterEstudoCapitulo(livro: string, capitulo: number) {
  return estudosCapitulo[`${livro.toLowerCase()}:${capitulo}`];
}

export function obterEstudoLivro(livro: string) {
  return estudosPorLivro[livro.toLowerCase()];
}
