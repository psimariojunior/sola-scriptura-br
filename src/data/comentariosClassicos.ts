import type { Comentario } from './comentarios';
import { comentariosMatthewHenry } from './comentarios-reais/matthew-henry';
import { comentariosJFB } from './comentarios-reais/jamieson-fausset-brown';
import { comentariosBarnes } from './comentarios-reais/albert-barnes';
import { comentariosgn } from './comentarios-reais/gn-matthew-henry';
import { comentariosClassicosProfundos } from './comentariosClassicosProfundos';

const CLASSICOS: Comentario[] = [
  ...comentariosClassicosProfundos,
  ...comentariosMatthewHenry,
  ...comentariosJFB,
  ...comentariosBarnes,
  ...comentariosgn,
];

const byRef = new Map<string, Comentario[]>();
for (const c of CLASSICOS) {
  const k = `${c.livro}:${c.capitulo}:${c.versiculo}`;
  const lista = byRef.get(k);
  if (lista) lista.push({ ...c, fonte: 'dominio-publico' });
  else byRef.set(k, [{ ...c, fonte: 'dominio-publico' }]);
}

export function obterComentariosClassicos(
  livro: string,
  capitulo: number,
  versiculo: number,
): Comentario[] {
  return byRef.get(`${livro}:${capitulo}:${versiculo}`) || [];
}

export function temComentarioClassico(
  livro: string,
  capitulo: number,
  versiculo: number,
): boolean {
  return byRef.has(`${livro}:${capitulo}:${versiculo}`);
}

/** Henry / JFB / Barnes no mesmo capítulo, se este verso não tiver ficha. */
export function obterComentarioClassicoProximo(
  livro: string,
  capitulo: number,
  versiculo: number,
  raio = 8,
): Comentario[] {
  const exato = obterComentariosClassicos(livro, capitulo, versiculo);
  if (exato.length > 0) return exato;

  for (let d = 1; d <= raio; d++) {
    const antes = versiculo - d;
    if (antes >= 1) {
      const c = obterComentariosClassicos(livro, capitulo, antes);
      if (c.length > 0) return c;
    }
    const depois = versiculo + d;
    const c = obterComentariosClassicos(livro, capitulo, depois);
    if (c.length > 0) return c;
  }

  for (let v = 1; v <= 180; v++) {
    if (v === versiculo) continue;
    const c = obterComentariosClassicos(livro, capitulo, v);
    if (c.length > 0) return c;
  }
  return [];
}
