'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { GraduationCap, BookOpen, CheckCircle2, Clock, ChevronRight, Award, Play, FileText, HelpCircle, ArrowLeft, Download, Users, BarChart3, ClipboardCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CURSOS, rotuloCargaCurso, rotuloNivelCurso, type Curso, type CursoAula, type QuizQuestion } from '@/data/cursos';
import {
  matricularCurso,
  marcarAulaCompleta,
  salvarResultadoQuiz,
  obterProgressoCurso,
  calcularProgresso,
  estaConcluido,
  marcarCursoConcluido,
  cursoProntoParaCertificado,
  quizLiberado,
  emitirCertificadoCurso,
  aulasDoCurso,
  totalAulasCurso,
  proximaAulaPendente,
  CURSO_NOME_KEY,
  type CursoProgresso,
  type CertificadoCurso,
} from '@/lib/cursoProgress';
import { diplomaCursoIntroducao, gerarCertificado } from '@/lib/certificado';
import { YouTubeAulaPlayer } from '@/components/cursos/YouTubeAulaPlayer';
import { authService } from '@/lib/auth';
import { TextToSpeechButton } from '@/components/TextToSpeechButton';
import { NoteEditor } from '@/components/NoteEditor';
import { ShareNoteModal } from '@/components/ShareNoteModal';
import { getNote } from '@/lib/seminaryNotes';
import { checkAndUnlock } from '@/lib/achievements';

const LEVEL_LABELS = {
  iniciante: 'Introdução',
  intermediário: 'Introdução',
  avançado: 'Introdução',
};

const LEVEL_COLORS = {
  iniciante: 'text-green-500 bg-green-500/10',
  intermediário: 'text-green-500 bg-green-500/10',
  avançado: 'text-green-500 bg-green-500/10',
};

const LESSON_ICONS = {
  texto: FileText,
  quiz: HelpCircle,
  video: Play,
};

type ViewState = { tela: 'lista' } | { tela: 'curso'; cursoId: string } | { tela: 'aula'; cursoId: string; aulaId: string } | { tela: 'quiz'; cursoId: string; aulaId: string } | { tela: 'certificado'; cursoId: string };

export function BibleCourses() {
  const [state, setState] = useState<ViewState>({ tela: 'lista' });
  const [progressos, setProgressos] = useState<Record<string, CursoProgresso>>({});

  useEffect(() => {
    const p: Record<string, CursoProgresso> = {};
    for (const curso of CURSOS) {
      const prog = obterProgressoCurso(curso.id);
      if (prog) p[curso.id] = prog;
    }
    setProgressos(p);

    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const cursoId = params.get('curso');
    const aulaId = params.get('aula');
    if (!cursoId) return;
    const curso = CURSOS.find((c) => c.id === cursoId);
    if (!curso) return;
    if (aulaId) {
      const aula = aulasDoCurso(curso).find((a) => a.id === aulaId);
      if (aula) {
        setState(
          aula.tipo === 'quiz'
            ? { tela: 'quiz', cursoId, aulaId }
            : { tela: 'aula', cursoId, aulaId },
        );
        return;
      }
    }
    setState({ tela: 'curso', cursoId });
  }, []);

  const getCurso = useCallback((id: string) => CURSOS.find(c => c.id === id), []);

  const refreshProgress = useCallback((cursoId: string) => {
    const prog = obterProgressoCurso(cursoId);
    if (prog) setProgressos(prev => ({ ...prev, [cursoId]: prog }));
  }, []);

  const handleMatricular = useCallback((cursoId: string) => {
    matricularCurso(cursoId);
    refreshProgress(cursoId);
    setState({ tela: 'curso', cursoId });
  }, [refreshProgress]);

  const handleAbrirAula = useCallback((cursoId: string, aulaId: string) => {
    setState({ tela: 'aula', cursoId, aulaId });
  }, []);

  const handleConcluirAula = useCallback((cursoId: string, aulaId: string) => {
    marcarAulaCompleta(cursoId, aulaId);
    refreshProgress(cursoId);
    checkAndUnlock({ type: 'lesson_completed' });
    checkAndUnlock({ type: 'study_time' });
    const curso = getCurso(cursoId);
    if (curso && cursoProntoParaCertificado(curso, obterProgressoCurso(cursoId))) {
      marcarCursoConcluido(cursoId);
      refreshProgress(cursoId);
      checkAndUnlock({ type: 'course_completed' });
    }
  }, [getCurso, refreshProgress]);

  const handleQuizComplete = useCallback((cursoId: string, aulaId: string, pontuacao: number, total: number) => {
    const aprovado = pontuacao >= Math.ceil(total * 0.7);
    salvarResultadoQuiz(cursoId, aulaId, pontuacao, total, aprovado);
    if (aprovado) marcarAulaCompleta(cursoId, aulaId);
    refreshProgress(cursoId);
    checkAndUnlock({ type: 'lesson_completed' });
    const curso = getCurso(cursoId);
    if (curso && aprovado && cursoProntoParaCertificado(curso, obterProgressoCurso(cursoId))) {
      marcarCursoConcluido(cursoId);
      refreshProgress(cursoId);
      checkAndUnlock({ type: 'course_completed' });
    }
    setState({ tela: 'aula', cursoId, aulaId });
  }, [getCurso, refreshProgress]);

  if (state.tela === 'certificado') {
    const curso = getCurso(state.cursoId);
    if (!curso) return null;
    return (
      <CertificadoView
        curso={curso}
        progresso={progressos[state.cursoId]}
        onAtualizar={() => refreshProgress(state.cursoId)}
        onVoltar={() => setState({ tela: 'curso', cursoId: state.cursoId })}
      />
    );
  }

  if (state.tela === 'quiz') {
    const curso = getCurso(state.cursoId);
    if (!curso) return null;
    const aula = curso.módulos.flatMap(m => m.aulas).find(a => a.id === state.aulaId);
    if (!aula || !aula.perguntas) return null;
    return (
      <QuizView
        perguntas={aula.perguntas}
        onComplete={(pontuacao, total) => handleQuizComplete(state.cursoId, state.aulaId, pontuacao, total)}
        onBack={() => setState({ tela: 'aula', cursoId: state.cursoId, aulaId: state.aulaId })}
      />
    );
  }

  if (state.tela === 'aula') {
    const curso = getCurso(state.cursoId);
    if (!curso) return null;
    const allLessons = curso.módulos.flatMap(m => m.aulas);
    const aula = allLessons.find(a => a.id === state.aulaId);
    if (!aula) return null;
    const currentIdx = allLessons.findIndex(a => a.id === state.aulaId);
    return (
      <AulaView
        curso={curso}
        aula={aula}
        onComplete={() => handleConcluirAula(state.cursoId, state.aulaId)}
        onStartQuiz={() => {
          if (!quizLiberado(curso, state.aulaId, progressos[state.cursoId])) return;
          setState({ tela: 'quiz', cursoId: state.cursoId, aulaId: state.aulaId });
        }}
        onBack={() => setState({ tela: 'curso', cursoId: state.cursoId })}
        progresso={progressos[state.cursoId]}
        lessonIndex={currentIdx}
        totalLessons={allLessons.length}
        onNextLesson={currentIdx < allLessons.length - 1 ? () => {
          const nextLesson = allLessons[currentIdx + 1];
          handleAbrirAula(state.cursoId, nextLesson.id);
        } : undefined}
        onPrevLesson={currentIdx > 0 ? () => {
          const prevLesson = allLessons[currentIdx - 1];
          handleAbrirAula(state.cursoId, prevLesson.id);
        } : undefined}
      />
    );
  }

  if (state.tela === 'curso') {
    const curso = getCurso(state.cursoId);
    if (!curso) return null;
    return (
      <CursoDetailView
        curso={curso}
        progresso={progressos[state.cursoId]}
        onAulaClick={(aulaId) => handleAbrirAula(state.cursoId, aulaId)}
        onBack={() => setState({ tela: 'lista' })}
        onCertificado={() => setState({ tela: 'certificado', cursoId: state.cursoId })}
      />
    );
  }

  return (
    <div className="flex flex-col">
      <div className="p-4 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="font-bold text-lg">Cursos de Teologia</h2>
        </div>
        <p className="text-xs text-[var(--content-muted)] leading-relaxed">
          Conteúdo de nível seminário com base nas Escrituras, teólogos históricos e avaliação. 
          Cada curso abrange uma área da teologia ou livro bíblico em profundidade.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-b border-[var(--border)]/20">
        <div className="text-center p-2 rounded-lg bg-[var(--surface-sunken)]">
          <BarChart3 className="w-4 h-4 mx-auto mb-1 text-[var(--brand)]" />
          <p className="text-lg font-bold">{CURSOS.length}</p>
          <p className="text-[10px] text-[var(--content-muted)]">Cursos</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--surface-sunken)]">
          <Users className="w-4 h-4 mx-auto mb-1 text-blue-500" />
          <p className="text-lg font-bold">{Object.values(progressos).filter(p => p.matriculado).length}</p>
          <p className="text-[10px] text-[var(--content-muted)]">Matrículas</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--surface-sunken)]">
          <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-green-500" />
          <p className="text-lg font-bold">{Object.values(progressos).filter(p => p.dataConclusao).length}</p>
          <p className="text-[10px] text-[var(--content-muted)]">Concluídos</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--surface-sunken)]">
          <ClipboardCheck className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
          <p className="text-lg font-bold">{Object.values(progressos).reduce((sum, p) => sum + Object.keys(p.quizResultados).length, 0)}</p>
          <p className="text-[10px] text-[var(--content-muted)]">Quizzes</p>
        </div>
      </div>
      <ScrollArea>
        <div className="p-3 space-y-3">
          {CURSOS.map((curso) => {
            const totalAulas = totalAulasCurso(curso);
            const prog = progressos[curso.id];
            const concluido = estaConcluido(curso.id);
            const progressoPct = calcularProgresso(curso.id, totalAulas);
            const matriculado = !!prog?.matriculado;
            return (
              <div key={curso.id} className="rounded-xl border border-[var(--border)]/40 overflow-hidden bg-[var(--surface-raised)] animate-fade-in">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-500/10 text-blue-500 border border-blue-500/30">{curso.categoria}</span>
                    <div className="flex items-center gap-1">
                      {concluido && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {curso.certificado && <Award className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{curso.título}</h3>
                  <p className="text-xs text-[var(--content-muted)] mb-3 line-clamp-2">{curso.descrição}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--content-muted)] mb-3 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rotuloCargaCurso(curso)}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{curso.módulos.length} modulos</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{totalAulas} aulas</span>
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[curso.nível])}>{LEVEL_LABELS[curso.nível]}</span>
                  </div>
                  {matriculado ? (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[var(--content-muted)]">Progresso</span>
                        <span className="text-[10px] font-bold">{progressoPct}%</span>
                      </div>
                      <Progress value={progressoPct} className="h-1.5 mb-3" />
                      <Button onClick={() => setState({ tela: 'curso', cursoId: curso.id })} size="sm" className="w-full min-h-[44px] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white text-xs">
                        {concluido ? 'Ver Certificado' : 'Continuar Estudando'}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleMatricular(curso.id)} size="sm" variant="outline" className="w-full min-h-[44px] text-xs">
                      Começar Curso — Gratuito
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

function CertificadoView({
  curso,
  progresso,
  onAtualizar,
  onVoltar,
}: {
  curso: Curso;
  progresso?: CursoProgresso;
  onAtualizar: () => void;
  onVoltar: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nome, setNome] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [emitindo, setEmitindo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [certificado, setCertificado] = useState<CertificadoCurso | null>(progresso?.certificado ?? null);
  const [pronto, setPronto] = useState(false);
  const pronta = cursoProntoParaCertificado(curso, progresso);
  const total = totalAulasCurso(curso);
  const feitas = progresso?.aulasCompletas.length ?? 0;

  useEffect(() => {
    const u = authService.getUsuario();
    if (u?.nome) {
      setNome(u.nome);
      setAutenticado(true);
    } else if (typeof window !== 'undefined') {
      setNome(localStorage.getItem(CURSO_NOME_KEY) || '');
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !certificado) {
      setPronto(false);
      return;
    }
    const op = diplomaCursoIntroducao({
      nome: certificado.nome,
      nomeCurso: curso.título,
      dataIso: certificado.data,
      id: certificado.id,
      hash: certificado.hash,
      aulasFeitas: certificado.aulasFeitas,
      totalAulas: certificado.totalAulas,
      autenticado: certificado.autenticado,
    });
    gerarCertificado(canvas, certificado.nome, curso.título, certificado.data, op)
      .then(() => setPronto(true))
      .catch(() => setPronto(false));
  }, [certificado, curso.título]);

  async function emitir() {
    setErro(null);
    setEmitindo(true);
    try {
      const cert = await emitirCertificadoCurso({ curso, nome, autenticado });
      setCertificado(cert);
      onAtualizar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível emitir.');
    } finally {
      setEmitindo(false);
    }
  }

  function baixar() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado-${curso.id}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  return (
    <div className="flex flex-col p-5 sm:p-6 space-y-4">
      <button type="button" onClick={onVoltar} className="text-xs text-[var(--brand)] flex items-center gap-1 min-h-[44px] hover:underline self-start">
        <ArrowLeft className="w-3 h-3" /> Voltar ao curso
      </button>
      <Award className="w-12 h-12 text-yellow-500" />
      <h2 className="text-xl font-bold">Certificado — {curso.título}</h2>
      <p className="text-sm text-[var(--content-muted)] leading-relaxed">
        O diploma atesta a conclusão das aulas deste curso introdutório nesta plataforma. Não atesta carga horária, seminário nem grau.
      </p>
      <p className="text-xs text-[var(--content-muted)]">{feitas} de {total} aulas marcadas.</p>
      {!pronta && (
        <p className="text-sm text-amber-700 dark:text-amber-400/90 leading-relaxed">
          Ainda faltam aulas ou a avaliação (70%). O certificado não é emitido com um clique.
        </p>
      )}
      {pronta && !certificado && (
        <>
          <label className="block text-sm text-left">
            <span className="text-[var(--content-muted)] text-xs uppercase tracking-wider">Nome no certificado</span>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 w-full min-h-[44px] rounded-lg bg-[var(--surface-sunken)] border border-[var(--border)] px-3 text-[var(--content-primary)]"
              placeholder="Nome completo"
            />
          </label>
          <Button onClick={emitir} disabled={emitindo || nome.trim().length < 3} className="min-h-[44px] bg-[var(--brand)] text-white">
            <Award className="w-4 h-4 mr-2" /> Emitir certificado
          </Button>
          {erro && <p className="text-xs text-red-500">{erro}</p>}
        </>
      )}
      {certificado && (
        <>
          <canvas ref={canvasRef} className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl border border-[var(--brand-default)]/20" style={{ aspectRatio: '1200 / 850' }} />
          <p className="text-xs font-mono text-[var(--content-muted)]">ID {certificado.id} · SHA {certificado.hash}</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={baixar} disabled={!pronto} className="min-h-[44px] bg-[var(--brand)] text-white">
              <Download className="w-4 h-4 mr-2" /> Baixar PNG
            </Button>
            <Button variant="outline" onClick={onVoltar} className="min-h-[44px]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function CursoDetailView({ curso, progresso, onAulaClick, onBack, onCertificado }: { curso: Curso; progresso?: CursoProgresso; onAulaClick: (aulaId: string) => void; onBack: () => void; onCertificado: () => void }) {
  const [modExpandido, setModExpandido] = useState<string | null>(curso.módulos[0]?.id || null);
  const totalAulas = totalAulasCurso(curso);
  const aulasCompletas = progresso?.aulasCompletas.length || 0;
  const progressoPct = totalAulas > 0 ? Math.round((aulasCompletas / totalAulas) * 100) : 0;
  const pronta = cursoProntoParaCertificado(curso, progresso);
  const proxima = proximaAulaPendente(curso, progresso);

  const quizAulas = curso.módulos.flatMap(m => m.aulas.filter(a => a.tipo === 'quiz'));
  const proximoQuiz = quizAulas.find((q) => quizLiberado(curso, q.id, progresso) && !progresso?.aulasCompletas.includes(q.id));

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 min-h-[44px] hover:underline">
          <ArrowLeft className="w-3 h-3" /> Voltar aos cursos
        </button>
        <h2 className="font-bold text-lg">{curso.título}</h2>
        <p className="text-xs text-[var(--content-muted)] mt-1">{curso.descrição}</p>
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-1 text-xs"><Clock className="w-3 h-3" /> {rotuloCargaCurso(curso)}</div>
          <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[curso.nível])}>{rotuloNivelCurso(curso)}</span>
          {pronta && <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-green-500/10 text-green-500">Pronto para certificado</span>}
        </div>
        {progresso?.matriculado && (
          <div className="mt-3">
            <Progress value={progressoPct} className="h-2" />
            <p className="text-[10px] text-[var(--content-muted)] mt-1">{progressoPct}% concluido ({aulasCompletas}/{totalAulas} aulas)</p>
          </div>
        )}
        {pronta && (
          <Button onClick={onCertificado} size="sm" className="mt-3 min-h-[44px] bg-yellow-500 hover:bg-yellow-600 text-black text-xs">
            <Award className="w-3 h-3 mr-1" /> Certificado
          </Button>
        )}
        {proxima && (
          <Button onClick={() => onAulaClick(proxima.id)} size="sm" className="mt-3 ml-2 min-h-[44px] bg-[var(--brand)] text-white text-xs">
            Continuar: {proxima.título}
          </Button>
        )}
        {proximoQuiz && (
          <Button onClick={() => onAulaClick(proximoQuiz.id)} size="sm" className="mt-3 min-h-[44px] bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
            <HelpCircle className="w-3 h-3 mr-1" /> Avaliação liberada
          </Button>
        )}
      </div>
      <ScrollArea>
        <div className="p-3 space-y-2">
          {curso.módulos.map((mod) => {
            const modAulasCompletas = mod.aulas.filter(a => progresso?.aulasCompletas.includes(a.id)).length;
            return (
              <div key={mod.id} className="rounded-xl border border-[var(--border)]/40 overflow-hidden">
                <button onClick={() => setModExpandido(modExpandido === mod.id ? null : mod.id)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--surface-raised)] transition-colors">
                  <span className="text-xl">{mod.ícone}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{mod.título}</div>
                    <div className="text-[10px] text-[var(--content-muted)]">{mod.descrição}</div>
                  </div>
                  <div className="text-[10px] text-[var(--content-muted)]">
                    {modAulasCompletas}/{mod.aulas.length}
                  </div>
                  <ChevronRight className={cn('w-4 h-4 text-[var(--content-muted)] transition-transform', modExpandido === mod.id && 'rotate-90')} />
                </button>
                {modExpandido === mod.id && (
                  <div className="border-t border-[var(--border)]/20 divide-y divide-[var(--border)]/20">
                    {mod.aulas.map((aula) => {
                      const Icon = LESSON_ICONS[aula.tipo];
                      const completa = progresso?.aulasCompletas.includes(aula.id) || false;
                      return (
                        <button key={aula.id}
                          onClick={() => onAulaClick(aula.id)}
                          className={cn('w-full flex items-center gap-3 p-3 text-left transition-colors',
                            completa ? 'bg-green-500/5' : 'hover:bg-[var(--surface-raised)]')}>
                          <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', completa ? 'bg-green-500/10' : 'bg-[var(--surface-sunken)]')}>
                            <Icon className={cn('w-3.5 h-3.5', completa ? 'text-green-500' : 'text-[var(--content-muted)]')} />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium">{aula.título}</div>
                            <div className="text-[10px] text-[var(--content-muted)]">{aula.duração}</div>
                          </div>
                          {completa ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[var(--content-muted)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

function AulaView({ curso, aula, onComplete, onStartQuiz, onBack, progresso, onNextLesson, onPrevLesson, lessonIndex, totalLessons }: { curso: Curso; aula: CursoAula; onComplete: () => void; onStartQuiz: () => void; onBack: () => void; progresso?: CursoProgresso; onNextLesson?: () => void; onPrevLesson?: () => void; lessonIndex?: number; totalLessons?: number }) {
  const completa = progresso?.aulasCompletas.includes(aula.id) || false;
  const [notasExpandidas, setNotasExpandidas] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [confirmou, setConfirmou] = useState(false);
  const quizOk = aula.tipo !== 'quiz' || quizLiberado(curso, aula.id, progresso);

  const lessonText = aula.conteúdo || '';

  useEffect(() => {
    const note = getNote(aula.id);
    if (note) setNoteText(note.text);
    setConfirmou(false);
  }, [aula.id]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 min-h-[44px] hover:underline">
          <ArrowLeft className="w-3 h-3" /> Voltar ao curso
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h2 className="font-bold text-lg">{aula.título}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">{curso.título}</span>
              <span className="text-[10px] text-[var(--content-muted)] flex items-center gap-1"><Clock className="w-3 h-3" />{aula.duração}</span>
              {completa && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Concluída</span>}
            </div>
          </div>
          {aula.tipo !== 'quiz' && lessonText && (
            <TextToSpeechButton text={lessonText} variant="ghost" size="sm" label="Ouvir" />
          )}
        </div>
      </div>
      <ScrollArea>
        <div className="p-4">
          {aula.tipo === 'texto' && aula.conteúdo && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <MarkdownRenderer content={aula.conteúdo} />
            </div>
          )}
          {aula.tipo === 'video' && (
            <div className="space-y-3">
              <YouTubeAulaPlayer url={aula.videoUrl} titulo={aula.videoTítulo || aula.título} subtitulo={aula.videoTítulo} />
              {aula.conteúdo && (
                <div className="prose prose-sm dark:prose-invert max-w-none mt-2">
                  <MarkdownRenderer content={aula.conteúdo} />
                </div>
              )}
            </div>
          )}
          {aula.tipo === 'quiz' && (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-[var(--brand)] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Avaliação</h3>
              <p className="text-sm text-[var(--content-muted)] mb-4">
                Responda {aula.perguntas?.length || 0} perguntas. É preciso acertar 70% para esta aula contar. O certificado só sai quando todas as aulas estiverem feitas.
              </p>
              {quizOk ? (
                <Button onClick={onStartQuiz} className="min-h-[44px] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                  Iniciar Avaliação
                </Button>
              ) : (
                <p className="text-sm text-amber-700 dark:text-amber-400/90">
                  Conclua as aulas anteriores da trilha para liberar esta avaliação.
                </p>
              )}
            </div>
          )}
          {aula.versículosChave && aula.versículosChave.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)]/30">
              <h4 className="font-bold text-xs mb-3 text-[var(--brand)]">Versículos-Chave</h4>
              <div className="space-y-2">
                {aula.versículosChave.map((v: { ref: string; texto: string }, i: number) => (
                  <div key={i} className="text-xs">
                    <span className="font-bold">{v.ref}</span>
                    <span className="text-[var(--content-muted)] ml-2">— {v.texto}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      {aula.tipo !== 'quiz' && (
        <div className="border-t border-[var(--border)]/40">
          <button
            onClick={() => setNotasExpandidas(!notasExpandidas)}
            className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Minhas Anotações
            </span>
            <ChevronDown className={cn('w-4 h-4 transition-transform', notasExpandidas && 'rotate-180')} />
          </button>
          {notasExpandidas && (
            <div className="px-4 pb-4">
              <NoteEditor
                lessonId={aula.id}
                className="w-full"
              />
            </div>
          )}
          <div className="p-4 space-y-3">
            {completa ? (
              <div className="flex items-center gap-2 text-green-500 text-sm min-h-[44px]">
                <CheckCircle2 className="w-4 h-4" /> Aula concluída
              </div>
            ) : (
              <>
                <label className="flex items-start gap-3 text-sm text-[var(--content-secondary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmou}
                    onChange={(e) => setConfirmou(e.target.checked)}
                    className="mt-1 w-4 h-4"
                  />
                  <span>
                    {aula.tipo === 'video'
                      ? 'Assisti o vídeo (quando disponível) e li o texto desta aula.'
                      : 'Li o texto desta aula.'}
                  </span>
                </label>
                <Button
                  onClick={onComplete}
                  disabled={!confirmou}
                  className="w-full min-h-[44px] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white disabled:opacity-50"
                >
                  Marcar como concluída
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      {/* Playlist Navigation */}
      {aula.tipo !== 'quiz' && (onNextLesson || onPrevLesson) && (
        <div className="border-t border-[var(--border)]/40 px-4 py-3 flex items-center justify-between gap-2">
          <button
            onClick={onPrevLesson}
            disabled={!onPrevLesson}
            className={cn(
              'flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-xs font-medium transition-all',
              onPrevLesson
                ? 'bg-[var(--surface-sunken)] text-[var(--content-primary)] hover:bg-[var(--surface-raised)]'
                : 'opacity-30 cursor-not-allowed text-[var(--content-muted)]'
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Anterior
          </button>
          {lessonIndex != null && totalLessons != null && (
            <span className="text-[10px] text-[var(--content-muted)] tabular-nums">
              {lessonIndex + 1} / {totalLessons}
            </span>
          )}
          <button
            onClick={onNextLesson}
            disabled={!onNextLesson}
            className={cn(
              'flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-xs font-medium transition-all',
              onNextLesson
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] hover:opacity-90'
                : 'opacity-30 cursor-not-allowed text-[var(--content-muted)]'
            )}
          >
            Próxima
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <ShareNoteModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        noteText={noteText}
        lessonId={aula.id}
      />
    </div>
  );
}

function QuizView({ perguntas, onComplete, onBack }: { perguntas: QuizQuestion[]; onComplete: (pontuacao: number, total: number) => void; onBack: () => void }) {
  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [respondido, setRespondido] = useState(false);
  const [selecionada, setSelecionada] = useState<number | null>(null);

  const pergunta = perguntas[atual];

  const handleResponder = (idx: number) => {
    if (respondido) return;
    setSelecionada(idx);
    setRespondido(true);
    setRespostas(prev => [...prev, idx]);
  };

  const handleProxima = () => {
    if (atual < perguntas.length - 1) {
      setAtual(atual + 1);
      setRespondido(false);
      setSelecionada(null);
    } else {
      const certas = respostas.reduce((acc, r, i) => acc + (r === perguntas[i].respostaCorreta ? 1 : 0), 0);
      onComplete(certas, perguntas.length);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 min-h-[44px] hover:underline">
          <ArrowLeft className="w-3 h-3" /> Voltar a aula
        </button>
        <h2 className="font-bold text-lg">Avaliação</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-[var(--content-muted)]">Pergunta {atual + 1} de {perguntas.length}</span>
          <Progress value={((atual + 1) / perguntas.length) * 100} className="h-1.5 flex-1" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <p className="font-medium text-sm mb-4">{pergunta.pergunta}</p>
          <div className="space-y-2">
            {pergunta.opções.map((op, idx) => {
              let style = 'border-[var(--border)]/40 hover:border-[var(--brand)]/50';
              if (respondido) {
                if (idx === pergunta.respostaCorreta) style = 'border-green-500 bg-green-500/10';
                else if (idx === selecionada) style = 'border-red-500 bg-red-500/10';
                else style = 'border-[var(--border)]/20 opacity-50';
              }
              return (
                <button key={idx} onClick={() => handleResponder(idx)}
                  className={cn('w-full p-3 min-h-[44px] rounded-xl border text-left text-sm transition-all', style)}>
                  <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span> {op}
                </button>
              );
            })}
          </div>
          {respondido && (
            <div className="mt-4 p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)]/30 animate-fade-in">
              <p className="text-xs text-[var(--content-muted)]">{pergunta.explicação}</p>
            </div>
          )}
        </div>
      </ScrollArea>
      {respondido && (
        <div className="p-4 border-t border-[var(--border)]/40">
          <Button onClick={handleProxima} className="w-full min-h-[44px] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
            {atual < perguntas.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
          </Button>
        </div>
      )}
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-lg font-bold mt-6 mb-3 text-[var(--foreground)]">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-base font-bold mt-4 mb-2 text-[var(--foreground)]">{line.slice(4)}</h3>);
    } else if (line.startsWith('> ')) {
      const blockquoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        blockquoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={i} className="border-l-4 border-[var(--brand)] pl-4 py-2 my-3 bg-[var(--surface-sunken)] rounded-r-lg text-sm italic text-[var(--content-muted)]">
          {blockquoteLines.join(' ')}
        </blockquote>
      );
      continue;
    } else if (line.startsWith('| ')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('| ')) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter(l => !l.match(/^\|[\s-|]+$/)).map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
      if (rows.length > 0) {
        elements.push(
          <div key={i} className="overflow-x-auto my-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]/40">
                  {rows[0].map((h, j) => <th key={j} className="text-left p-2 font-bold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} className="border-b border-[var(--border)]/20">
                    {row.map((cell, ci) => <td key={ci} className="p-2 text-[var(--content-muted)]">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    } else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1 my-2 text-sm text-[var(--content-muted)]">
          {listItems.map((item, li) => <li key={li}>{renderInlineMarkdown(item)}</li>)}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-1 my-2 text-sm text-[var(--content-muted)]">
          {listItems.map((item, li) => <li key={li}>{renderInlineMarkdown(item)}</li>)}
        </ol>
      );
      continue;
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-sm leading-relaxed my-2 text-[var(--content-muted)]">{renderInlineMarkdown(line)}</p>);
    }
    i++;
  }

  return <>{elements}</>;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
