'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GraduationCap, BookOpen, CheckCircle2, Clock, ChevronRight, Award, Play, FileText, HelpCircle, ArrowLeft, Download, Share2, RotateCcw, Users, BarChart3, ClipboardCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CURSOS, type Curso, type CursoModulo, type CursoAula, type QuizQuestion } from '@/data/cursos';
import { matricularCurso, marcarAulaCompleta, salvarResultadoQuiz, obterProgressoCurso, calcularProgresso, estaConcluido, marcarCursoConcluido, type CursoProgresso } from '@/lib/cursoProgress';
import { gerarCertificado } from '@/lib/certificado';
import { TextToSpeechButton } from '@/components/TextToSpeechButton';
import { NoteEditor } from '@/components/NoteEditor';
import { ShareNoteModal } from '@/components/ShareNoteModal';
import { getNote } from '@/lib/seminaryNotes';
import { checkAndUnlock } from '@/lib/achievements';

const LEVEL_COLORS = {
  iniciante: 'text-green-500 bg-green-500/10',
  intermediário: 'text-yellow-500 bg-yellow-500/10',
  avançado: 'text-red-500 bg-red-500/10',
};

const LEVEL_LABELS = {
  iniciante: 'Iniciante',
  intermediário: 'Intermediário',
  avançado: 'Avançado',
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const p: Record<string, CursoProgresso> = {};
    for (const curso of CURSOS) {
      const prog = obterProgressoCurso(curso.id);
      if (prog) p[curso.id] = prog;
    }
    setProgressos(p);
  }, []);

  const getCurso = useCallback((id: string) => CURSOS.find(c => c.id === id), []);

  const getTotalAulas = useCallback((curso: Curso) => curso.módulos.reduce((sum, m) => sum + m.aulas.length, 0), []);

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
    if (curso) {
      const prog = obterProgressoCurso(cursoId);
      const total = getTotalAulas(curso);
      if (prog && prog.aulasCompletas.length >= total) {
        marcarCursoConcluido(cursoId);
        refreshProgress(cursoId);
        checkAndUnlock({ type: 'course_completed' });
      }
    }
  }, [getCurso, getTotalAulas, refreshProgress]);

  const handleQuizComplete = useCallback((cursoId: string, aulaId: string, pontuacao: number, total: number) => {
    const aprovado = pontuacao >= Math.ceil(total * 0.7);
    salvarResultadoQuiz(cursoId, aulaId, pontuacao, total, aprovado);
    marcarAulaCompleta(cursoId, aulaId);
    refreshProgress(cursoId);
    checkAndUnlock({ type: 'lesson_completed' });
    checkAndUnlock({ type: 'study_time' });
    if (aprovado) {
      const curso = getCurso(cursoId);
      if (curso) {
        const prog = obterProgressoCurso(cursoId);
        const totalAulas = getTotalAulas(curso);
        if (prog && prog.aulasCompletas.length >= totalAulas) {
          marcarCursoConcluido(cursoId);
          refreshProgress(cursoId);
          checkAndUnlock({ type: 'course_completed' });
        }
      }
      setState({ tela: 'certificado', cursoId });
    }
  }, [getCurso, getTotalAulas, refreshProgress]);

  const handleBaixarCertificado = useCallback((nomeCurso: string) => {
    if (!canvasRef.current) return;
    const nome = prompt('Digite seu nome completo para o certificado:');
    if (!nome) return;
    gerarCertificado(canvasRef.current, nome, nomeCurso, new Date().toISOString()).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado-${nomeCurso.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }, []);

  const handleCompartilharCertificado = useCallback(async (nomeCurso: string) => {
    const shareData = {
      title: `Certificado - ${nomeCurso}`,
      text: `Conclui o curso "${nomeCurso}" no Sola Scriptura Bíblico! 🎓`,
      url: typeof window !== 'undefined' ? window.location.origin + '/cursos' : '',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copiado para a área de transferência!');
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copiado para a área de transferência!');
      } catch {
        alert('Não foi possível compartilhar. Acesse: ' + shareData.url);
      }
    }
  }, []);

  if (state.tela === 'certificado') {
    const curso = getCurso(state.cursoId);
    if (!curso) return null;
    return (
      <CertificadoView
        curso={curso}
        canvasRef={canvasRef}
        onBaixar={() => handleBaixarCertificado(curso.título)}
        onCompartilhar={() => handleCompartilharCertificado(curso.título)}
        onVoltar={() => setState({ tela: 'lista' })}
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
        onStartQuiz={() => setState({ tela: 'quiz', cursoId: state.cursoId, aulaId: state.aulaId })}
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
          <h2 className="font-bold text-lg">Seminário Bíblico Gratuito</h2>
        </div>
        <p className="text-xs text-[var(--content-muted)]">Cursos completos com certificado. Estude no seu ritmo, sem custo.</p>
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
            const totalAulas = getTotalAulas(curso);
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
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{curso.duração}</span>
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
                      <Button onClick={() => setState({ tela: 'curso', cursoId: curso.id })} size="sm" className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white text-xs">
                        {concluido ? 'Ver Certificado' : 'Continuar Estudando'}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleMatricular(curso.id)} size="sm" variant="outline" className="w-full text-xs">
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

function CertificadoView({ curso, canvasRef, onBaixar, onCompartilhar, onVoltar }: { curso: Curso; canvasRef: React.RefObject<HTMLCanvasElement | null>; onBaixar: () => void; onCompartilhar: () => void; onVoltar: () => void }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    import('@/lib/certificado').then(({ gerarCertificado }) => {
      gerarCertificado(canvas, 'Estudante da Bíblia', curso.título, new Date().toISOString()).catch(() => {});
    });
  }, [curso.título, canvasRef]);

  return (
    <div className="flex flex-col h-full items-center justify-center p-6 text-center">
      <div className="animate-scale-in">
        <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Parabéns!</h2>
        <p className="text-sm text-[var(--content-muted)] mb-6">Você concluiu o curso <strong>{curso.título}</strong></p>
        <canvas ref={canvasRef} width={540} height={420} className="rounded-lg shadow-2xl mb-4 max-w-full" />
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={onBaixar} className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
            <Download className="w-4 h-4 mr-2" /> Baixar Certificado
          </Button>
          <Button variant="outline" onClick={onCompartilhar}>
            <Share2 className="w-4 h-4 mr-2" /> Compartilhar
          </Button>
          <Button variant="outline" onClick={onVoltar}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}

function CursoDetailView({ curso, progresso, onAulaClick, onBack, onCertificado }: { curso: Curso; progresso?: CursoProgresso; onAulaClick: (aulaId: string) => void; onBack: () => void; onCertificado: () => void }) {
  const [modExpandido, setModExpandido] = useState<string | null>(curso.módulos[0]?.id || null);
  const totalAulas = curso.módulos.reduce((s, m) => s + m.aulas.length, 0);
  const aulasCompletas = progresso?.aulasCompletas.length || 0;
  const progressoPct = totalAulas > 0 ? Math.round((aulasCompletas / totalAulas) * 100) : 0;
  const concluido = estaConcluido(curso.id);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 hover:underline">
          <ArrowLeft className="w-3 h-3" /> Voltar aos cursos
        </button>
        <h2 className="font-bold text-lg">{curso.título}</h2>
        <p className="text-xs text-[var(--content-muted)] mt-1">{curso.descrição}</p>
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-1 text-xs"><Clock className="w-3 h-3" /> {curso.duração}</div>
          <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[curso.nível])}>{LEVEL_LABELS[curso.nível]}</span>
          {concluido && <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-green-500/10 text-green-500">Concluído</span>}
        </div>
        {progresso?.matriculado && (
          <div className="mt-3">
            <Progress value={progressoPct} className="h-2" />
            <p className="text-[10px] text-[var(--content-muted)] mt-1">{progressoPct}% concluido ({aulasCompletas}/{totalAulas} aulas)</p>
          </div>
        )}
        {concluido && (
          <Button onClick={onCertificado} size="sm" className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black text-xs">
            <Award className="w-3 h-3 mr-1" /> Ver Certificado
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

  const lessonText = aula.conteúdo || '';

  useEffect(() => {
    const note = getNote(aula.id);
    if (note) setNoteText(note.text);
  }, [aula.id]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 hover:underline">
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
          {aula.tipo === 'video' && aula.videoUrl && (
            <div className="space-y-3">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black ring-1 ring-[var(--border)]/20">
                <iframe
                  src={`${aula.videoUrl.replace('watch?v=', 'embed/')}?rel=0&modestbranding=1`}
                  title={aula.videoTítulo || aula.título}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {aula.videoTítulo && (
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2 text-xs text-[var(--content-muted)]">
                    <Play className="w-3 h-3 text-[var(--brand-default)]" />
                    <span className="font-medium">{aula.videoTítulo}</span>
                  </div>
                  <a
                    href={aula.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[var(--brand-default)] hover:underline flex items-center gap-1"
                  >
                    Abrir no YouTube ↗
                  </a>
                </div>
              )}
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
              <h3 className="font-bold text-lg mb-2">Avaliação Final</h3>
              <p className="text-sm text-[var(--content-muted)] mb-4">
                Responda {aula.perguntas?.length || 0} perguntas. Você precisa acertar 70% para ser aprovado e receber o certificado.
              </p>
              <Button onClick={onStartQuiz} className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                Iniciar Avaliação
              </Button>
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
          <div className="p-4">
            {completa ? (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Aula concluída
              </div>
            ) : (
              <Button onClick={onComplete} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                Marcar como Concluída
              </Button>
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
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all',
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
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all',
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
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 hover:underline">
          <ArrowLeft className="w-3 h-3" /> Voltar a aula
        </button>
        <h2 className="font-bold text-lg">Avaliação Final</h2>
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
                  className={cn('w-full p-3 rounded-xl border text-left text-sm transition-all', style)}>
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
          <Button onClick={handleProxima} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
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
