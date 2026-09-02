import type { Curso, CursoAula } from '@/data/cursos';
import { montarPayloadHash, sha256Curto } from '@/lib/trilhaProgress';

export interface CursoProgresso {
  cursoId: string;
  aulasCompletas: string[];
  quizResultados: Record<string, { pontuacao: number; total: number; aprovado: boolean }>;
  dataInicio: string;
  dataConclusao: string | null;
  matriculado: boolean;
  certificado?: CertificadoCurso | null;
}

export interface CertificadoCurso {
  id: string;
  hash: string;
  nome: string;
  data: string;
  autenticado: boolean;
  aulasFeitas: number;
  totalAulas: number;
}

const STORAGE_KEY = 'ssb_cursos_progresso';
export const CURSO_NOME_KEY = 'ssb_cert_nome';

export function aulasDoCurso(curso: Curso): CursoAula[] {
  return curso.módulos.flatMap((m) => m.aulas);
}

export function quizzesDoCurso(curso: Curso): CursoAula[] {
  return aulasDoCurso(curso).filter((a) => a.tipo === 'quiz');
}

export function totalAulasCurso(curso: Curso): number {
  return aulasDoCurso(curso).length;
}

function lerStore(): Record<string, CursoProgresso> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Record<string, CursoProgresso>) : {};
  } catch (e) {
    console.error('[curso-progress:obter]', e);
    return {};
  }
}

function gravarStore(progresso: Record<string, CursoProgresso>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
}

export function obterProgressoCursos(): Record<string, CursoProgresso> {
  return lerStore();
}

export function obterProgressoCurso(cursoId: string): CursoProgresso | null {
  return lerStore()[cursoId] || null;
}

export function matricularCurso(cursoId: string): void {
  const progresso = lerStore();
  if (!progresso[cursoId]) {
    progresso[cursoId] = {
      cursoId,
      aulasCompletas: [],
      quizResultados: {},
      dataInicio: new Date().toISOString(),
      dataConclusao: null,
      matriculado: true,
      certificado: null,
    };
  } else {
    progresso[cursoId].matriculado = true;
  }
  gravarStore(progresso);
}

export function marcarAulaCompleta(cursoId: string, aulaId: string): void {
  const progresso = lerStore();
  if (!progresso[cursoId]) return;
  if (!progresso[cursoId].aulasCompletas.includes(aulaId)) {
    progresso[cursoId].aulasCompletas.push(aulaId);
    gravarStore(progresso);
  }
}

export function salvarResultadoQuiz(
  cursoId: string,
  quizId: string,
  pontuacao: number,
  total: number,
  aprovado: boolean,
): void {
  const progresso = lerStore();
  if (!progresso[cursoId]) return;
  progresso[cursoId].quizResultados[quizId] = { pontuacao, total, aprovado };
  gravarStore(progresso);
}

export function marcarCursoConcluido(cursoId: string): void {
  const progresso = lerStore();
  if (!progresso[cursoId]) return;
  progresso[cursoId].dataConclusao = new Date().toISOString();
  gravarStore(progresso);
}

export function calcularProgresso(cursoId: string, totalAulas: number): number {
  const progresso = obterProgressoCurso(cursoId);
  if (!progresso || totalAulas === 0) return 0;
  return Math.round((progresso.aulasCompletas.length / totalAulas) * 100);
}

export function estaConcluido(cursoId: string): boolean {
  const progresso = obterProgressoCurso(cursoId);
  return !!progresso?.dataConclusao;
}

/** Quiz só abre se todas as aulas anteriores da trilha estiverem concluídas. */
export function quizLiberado(curso: Curso, aulaId: string, progresso?: CursoProgresso | null): boolean {
  const aulas = aulasDoCurso(curso);
  const idx = aulas.findIndex((a) => a.id === aulaId);
  if (idx < 0) return false;
  const feitas = new Set(progresso?.aulasCompletas ?? []);
  for (let i = 0; i < idx; i++) {
    if (!feitas.has(aulas[i].id)) return false;
  }
  return true;
}

export function quizzesAprovados(curso: Curso, progresso?: CursoProgresso | null): boolean {
  const quizzes = quizzesDoCurso(curso);
  if (quizzes.length === 0) return true;
  return quizzes.every((q) => progresso?.quizResultados[q.id]?.aprovado === true);
}

/** Todas as aulas marcadas + quizzes aprovados (70%). Sem isso não há diploma. */
export function cursoProntoParaCertificado(curso: Curso, progresso?: CursoProgresso | null): boolean {
  const total = totalAulasCurso(curso);
  if (total === 0) return false;
  const feitas = progresso?.aulasCompletas.length ?? 0;
  if (feitas < total) return false;
  return quizzesAprovados(curso, progresso);
}

export function proximaAulaPendente(curso: Curso, progresso?: CursoProgresso | null): CursoAula | null {
  const feitas = new Set(progresso?.aulasCompletas ?? []);
  return aulasDoCurso(curso).find((a) => !feitas.has(a.id)) ?? null;
}

function prefixoCurso(cursoId: string): string {
  const limpo = cursoId
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toUpperCase();
  return limpo.slice(0, 6) || 'CURSO';
}

export function idCertificadoCurso(cursoId: string, dataIso: string, hash: string): string {
  const ymd = dataIso.slice(0, 10).replace(/-/g, '');
  return `SSB-${prefixoCurso(cursoId)}-${ymd}-${hash.slice(0, 4)}`;
}

export async function emitirCertificadoCurso(params: {
  curso: Curso;
  nome: string;
  autenticado: boolean;
}): Promise<CertificadoCurso> {
  const prog = obterProgressoCurso(params.curso.id);
  if (!cursoProntoParaCertificado(params.curso, prog)) {
    throw new Error('O curso ainda não está completo: faltam aulas ou a avaliação não foi aprovada.');
  }
  const nome = params.nome.replace(/\s+/g, ' ').trim();
  if (nome.length < 3) throw new Error('Informe o nome que deve constar no certificado.');
  const data = new Date().toISOString();
  const total = totalAulasCurso(params.curso);
  const payload = montarPayloadHash({
    trilhaId: `curso:${params.curso.id}`,
    nome,
    dataIso: data,
    capitulos: Array.from({ length: total }, (_, i) => i + 1),
  });
  const hash = await sha256Curto(payload);
  const cert: CertificadoCurso = {
    id: idCertificadoCurso(params.curso.id, data, hash),
    hash,
    nome,
    data,
    autenticado: params.autenticado,
    aulasFeitas: total,
    totalAulas: total,
  };
  const store = lerStore();
  const atual = store[params.curso.id];
  if (atual) {
    atual.certificado = cert;
    atual.dataConclusao = data;
    store[params.curso.id] = atual;
    gravarStore(store);
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURSO_NOME_KEY, nome);
  }
  return cert;
}
