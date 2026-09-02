import { estudosCapituloProfundos } from '@/data/estudosCapituloProfundos';
import type { EstudoCapitulo } from '@/data/estudosCapitulo';
import type { NivelTrilha, TrilhaLivro } from '@/data/trilhasLivro';

export interface CapituloTrilha {
  capitulo: number;
  titulo: string;
  pergunta: string;
  nivel: EstudoCapitulo['nivel'];
}

export function capitulosDaTrilha(trilha: TrilhaLivro): CapituloTrilha[] {
  const caps: CapituloTrilha[] = [];
  for (let n = 1; n <= trilha.totalCapitulos; n++) {
    const ficha = estudosCapituloProfundos[`${trilha.livroAbrev}:${n}`];
    caps.push({
      capitulo: n,
      titulo: ficha?.titulo ?? `${trilha.livroNome} ${n}`,
      pergunta: ficha?.perguntasEstudo?.[0]?.trim() ?? '',
      nivel: ficha?.nivel ?? 'sintese',
    });
  }
  return caps;
}

/** Se algum capítulo não for ficha profunda, a trilha não pode se vender como avançada. */
export function nivelEfetivoDaTrilha(trilha: TrilhaLivro): NivelTrilha {
  const caps = capitulosDaTrilha(trilha);
  if (caps.some((c) => c.nivel !== 'profundo' || !c.pergunta)) return 'sintese';
  return trilha.nivel;
}
