import type { Comentario } from './comentarios';
import { comentariosMatthewHenry } from './comentarios-reais/matthew-henry';
import { comentariosJFB } from './comentarios-reais/jamieson-fausset-brown';
import { comentariosBarnes } from './comentarios-reais/albert-barnes';
import { comentariosgn } from './comentarios-reais/gn-matthew-henry';

const CLASSICOS: Comentario[] = [
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
