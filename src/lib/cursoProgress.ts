export interface CursoProgresso {
  cursoId: string;
  aulasCompletas: string[];
  quizResultados: Record<string, { pontuacao: number; total: number; aprovado: boolean }>;
  dataInicio: string;
  dataConclusao: string | null;
  matriculado: boolean;
}

const STORAGE_KEY = 'ssb_cursos_progresso';

export function obterProgressoCursos(): Record<string, CursoProgresso> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('[curso-progress:obter]', e);
    return {};
  }
}

export function obterProgressoCurso(cursoId: string): CursoProgresso | null {
  const progresso = obterProgressoCursos();
  return progresso[cursoId] || null;
}

export function matricularCurso(cursoId: string): void {
  const progresso = obterProgressoCursos();
  if (!progresso[cursoId]) {
    progresso[cursoId] = {
      cursoId,
      aulasCompletas: [],
      quizResultados: {},
      dataInicio: new Date().toISOString(),
      dataConclusao: null,
      matriculado: true,
    };
  } else {
    progresso[cursoId].matriculado = true;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
}

export function marcarAulaCompleta(cursoId: string, aulaId: string): void {
  const progresso = obterProgressoCursos();
  if (!progresso[cursoId]) return;
  if (!progresso[cursoId].aulasCompletas.includes(aulaId)) {
    progresso[cursoId].aulasCompletas.push(aulaId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
  }
}

export function salvarResultadoQuiz(cursoId: string, quizId: string, pontuacao: number, total: number, aprovado: boolean): void {
  const progresso = obterProgressoCursos();
  if (!progresso[cursoId]) return;
  progresso[cursoId].quizResultados[quizId] = { pontuacao, total, aprovado };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
}

export function marcarCursoConcluido(cursoId: string): void {
  const progresso = obterProgressoCursos();
  if (!progresso[cursoId]) return;
  progresso[cursoId].dataConclusao = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
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
