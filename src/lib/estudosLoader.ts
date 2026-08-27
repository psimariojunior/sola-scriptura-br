import { getVersiculoEstudo, type VersicoEstudo } from '@/data/versiculosEstudo';
import { estudosCapitulo, type EstudoCapitulo } from '@/data/estudosCapitulo';
import { estudosCapituloProfundos } from '@/data/estudosCapituloProfundos';
import { estudosPorLivro } from '@/data/estudosPorLivro';
import { obterEstudos, type EstudoVersiculo } from '@/data/estudosTeologicos';
import { eStubGenerico, sintetizarEstudoCapitulo, resolverLivroEstudo } from '@/lib/sintetizarEstudoCapitulo';

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
  const vs = await getVersiculoEstudo(livro, capitulo, versiculo);
  if (vs) {
    return {
      fonte: 'versiculo',
      tema: vs.titulo,
      contexto: vs.contextoHistorico,
      detalhe: vs,
    };
  }

  const teologicos = obterEstudos(livro, capitulo, versiculo);
  if (teologicos.length > 0) {
    return {
      fonte: 'teologico',
      tema: teologicos[0].tema,
      contexto: teologicos[0].contexto,
      interpretacoes: teologicos[0].interpretacoes,
    };
  }

  return null;
}

export function obterEstudoCapitulo(livro: string, capitulo: number): EstudoCapitulo {
  const info = resolverLivroEstudo(livro);
  const abrev = info?.abreviacao ?? livro.toLowerCase();
  const key = `${abrev}:${capitulo}`;

  const profundo = estudosCapituloProfundos[key];
  if (profundo) return profundo;

  const legado = estudosCapitulo[key];
  if (legado && !eStubGenerico(legado)) {
    return { ...legado, nivel: legado.nivel ?? 'legado' };
  }

  return sintetizarEstudoCapitulo(abrev, capitulo);
}

export function obterEstudoLivro(livro: string) {
  return estudosPorLivro[livro.toLowerCase()];
}
