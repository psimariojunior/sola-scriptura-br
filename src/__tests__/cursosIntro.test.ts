import { CURSOS, aulasDoCursoLista, rotuloNivelCurso, rotuloCargaCurso } from '@/data/cursos';
import { diplomaCursoIntroducao } from '@/lib/certificado';
import { extrairYoutubeId } from '@/lib/youtubeEmbed';
import {
  matricularCurso,
  marcarAulaCompleta,
  salvarResultadoQuiz,
  obterProgressoCurso,
  quizLiberado,
  cursoProntoParaCertificado,
  emitirCertificadoCurso,
  idCertificadoCurso,
  aulasDoCurso,
} from '@/lib/cursoProgress';

function limpar() {
  localStorage.clear();
}

function videosDoCurso(cursoId: string): string[] {
  const curso = CURSOS.find((c) => c.id === cursoId);
  if (!curso) return [];
  return aulasDoCursoLista(curso)
    .filter((a) => a.tipo === 'video' && a.videoUrl)
    .map((a) => extrairYoutubeId(a.videoUrl)!)
    .filter(Boolean);
}

describe('cursos introdutórios (trilha + vídeo + certificado)', () => {
  beforeEach(() => limpar());

  test('são 12 cursos no catálogo, todos com certificado e nível de introdução', () => {
    expect(CURSOS).toHaveLength(12);
    for (const c of CURSOS) {
      expect(c.certificado).toBe(true);
      expect(rotuloNivelCurso(c)).toBe('Introdução');
      expect(rotuloCargaCurso(c)).toMatch(/aulas · introdução/);
      expect(c.nível).toBe('iniciante');
    }
  });

  test('todo curso tem aulas e pelo menos um quiz (conclusão real)', () => {
    for (const c of CURSOS) {
      const aulas = aulasDoCursoLista(c);
      expect(aulas.length).toBeGreaterThan(0);
      expect(aulas.some((a) => a.tipo === 'quiz' && (a.perguntas?.length ?? 0) >= 5)).toBe(true);
    }
  });

  test('IDs de YouTube nas aulas de vídeo são únicos dentro de cada curso', () => {
    for (const c of CURSOS) {
      const ids = videosDoCurso(c.id);
      expect(ids.every((id) => id.length === 11)).toBe(true);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  test('extrairYoutubeId cobre watch, youtu.be e recusa lixo', () => {
    expect(extrairYoutubeId('https://www.youtube.com/watch?v=VskOdIySJQI')).toBe('VskOdIySJQI');
    expect(extrairYoutubeId('https://youtu.be/VskOdIySJQI')).toBe('VskOdIySJQI');
    expect(extrairYoutubeId('https://example.com/video')).toBeNull();
    expect(extrairYoutubeId('')).toBeNull();
  });

  test('Êxodo e Salmos usam o id real do catálogo (acento)', () => {
    expect(CURSOS.some((c) => c.id === 'exodo-libertação')).toBe(true);
    expect(CURSOS.some((c) => c.id === 'salmos-oração-louvor')).toBe(true);
    expect(CURSOS.some((c) => c.id === 'exodo-libertacao')).toBe(false);
  });

  test('vida-de-jesus corrige César Augusto e não tem lixo em chinês', () => {
    const curso = CURSOS.find((c) => c.id === 'vida-de-jesus')!;
    const blob = aulasDoCursoLista(curso)
      .map((a) => a.conteúdo || '')
      .join('\n');
    expect(blob).toContain('César Augusto');
    expect(blob).not.toContain('César Agostinho');
    expect(blob).not.toMatch(/[\u4e00-\u9fff]/);
  });

  test('quizLiberado exige aulas anteriores concluídas', () => {
    const curso = CURSOS.find((c) => c.id === 'conhecendo-a-biblia')!;
    const aulas = aulasDoCurso(curso);
    const quiz = aulas.find((a) => a.tipo === 'quiz')!;
    matricularCurso(curso.id);
    expect(quizLiberado(curso, quiz.id, obterProgressoCurso(curso.id))).toBe(false);
    for (const a of aulas) {
      if (a.id === quiz.id) break;
      marcarAulaCompleta(curso.id, a.id);
    }
    expect(quizLiberado(curso, quiz.id, obterProgressoCurso(curso.id))).toBe(true);
  });

  test('certificado recusado se a trilha estiver incompleta', async () => {
    const curso = CURSOS.find((c) => c.id === 'conhecendo-a-biblia')!;
    matricularCurso(curso.id);
    expect(cursoProntoParaCertificado(curso, obterProgressoCurso(curso.id))).toBe(false);
    await expect(emitirCertificadoCurso({ curso, nome: 'Maria Silva', autenticado: false })).rejects.toThrow(
      /ainda não está completo/,
    );
  });

  test('diploma e ID SSB-… só depois de aulas + quiz 70%', async () => {
    const curso = CURSOS.find((c) => c.id === 'conhecendo-a-biblia')!;
    matricularCurso(curso.id);
    for (const a of aulasDoCurso(curso)) {
      if (a.tipo === 'quiz') {
        salvarResultadoQuiz(curso.id, a.id, 8, 10, true);
      }
      marcarAulaCompleta(curso.id, a.id);
    }
    expect(cursoProntoParaCertificado(curso, obterProgressoCurso(curso.id))).toBe(true);
    const cert = await emitirCertificadoCurso({ curso, nome: 'Maria Silva', autenticado: false });
    expect(cert.id).toMatch(/^SSB-[A-Z0-9]{1,6}-\d{8}-[a-f0-9]{4}$/);
    expect(cert.aulasFeitas).toBe(cert.totalAulas);
    expect(cert.totalAulas).toBe(aulasDoCursoLista(curso).length);
    const diploma = diplomaCursoIntroducao({
      nome: cert.nome,
      nomeCurso: curso.título,
      dataIso: cert.data,
      id: cert.id,
      hash: cert.hash,
      aulasFeitas: cert.aulasFeitas,
      totalAulas: cert.totalAulas,
    });
    expect(diploma.titulo).toBe(curso.título);
    expect(diploma.atesta).toMatch(new RegExp(`${cert.aulasFeitas} de ${cert.totalAulas}`));
    expect(diploma.atesta).toContain(curso.título);
    expect(diploma.naoAtesta).toMatch(/seminário/i);
    expect(idCertificadoCurso(curso.id, cert.data, cert.hash)).toBe(cert.id);
  });
});
