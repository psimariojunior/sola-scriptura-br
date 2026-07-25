'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { GraduationCap, BookOpen, CheckCircle2, Clock, ChevronRight, Award, Play, FileText, HelpCircle, ArrowLeft, Download, Share2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CURSOS, type Curso, type CursoModulo, type CursoAula, type QuizQuestion } from '@/data/cursos';
import { matricularCurso, marcarAulaCompleta, salvarResultadoQuiz, obterProgressoCurso, calcularProgresso, estaConcluido, marcarCursoConcluido, type CursoProgresso } from '@/lib/cursoProgress';
import { gerarCertificado } from '@/lib/certificado';

const LEVEL_COLORS = {
  iniciante: 'text-green-500 bg-green-500/10',
  intermediario: 'text-yellow-500 bg-yellow-500/10',
  avancado: 'text-red-500 bg-red-500/10',
};

const LEVEL_LABELS = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediario',
  avancado: 'Avancado',
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

  const getTotalAulas = useCallback((curso: Curso) => curso.modulos.reduce((sum, m) => sum + m.aulas.length, 0), []);

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
    const curso = getCurso(cursoId);
    if (curso) {
      const prog = obterProgressoCurso(cursoId);
      const total = getTotalAulas(curso);
      if (prog && prog.aulasCompletas.length >= total) {
        marcarCursoConcluido(cursoId);
        refreshProgress(cursoId);
      }
    }
  }, [getCurso, getTotalAulas, refreshProgress]);

  const handleQuizComplete = useCallback((cursoId: string, aulaId: string, pontuacao: number, total: number) => {
    const aprovado = pontuacao >= Math.ceil(total * 0.7);
    salvarResultadoQuiz(cursoId, aulaId, pontuacao, total, aprovado);
    marcarAulaCompleta(cursoId, aulaId);
    refreshProgress(cursoId);
    if (aprovado) {
      const curso = getCurso(cursoId);
      if (curso) {
        const prog = obterProgressoCurso(cursoId);
        const totalAulas = getTotalAulas(curso);
        if (prog && prog.aulasCompletas.length >= totalAulas) {
          marcarCursoConcluido(cursoId);
          refreshProgress(cursoId);
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

  if (state.tela === 'certificado') {
    const curso = getCurso(state.cursoId);
    if (!curso) return null;
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 text-center">
        <div className="animate-scale-in">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Parabens!</h2>
          <p className="text-sm text-[var(--content-muted)] mb-6">Voce concluiu o curso <strong>{curso.titulo}</strong></p>
          <canvas ref={canvasRef} width={540} height={420} className="rounded-lg shadow-2xl mb-4 max-w-full" />
          <div className="flex gap-3 justify-center">
            <Button onClick={() => handleBaixarCertificado(curso.titulo)} className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
              <Download className="w-4 h-4 mr-2" /> Baixar Certificado
            </Button>
            <Button variant="outline" onClick={() => setState({ tela: 'lista' })}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (state.tela === 'quiz') {
    const curso = getCurso(state.cursoId);
    if (!curso) return null;
    const aula = curso.modulos.flatMap(m => m.aulas).find(a => a.id === state.aulaId);
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
    const aula = curso.modulos.flatMap(m => m.aulas).find(a => a.id === state.aulaId);
    if (!aula) return null;
    return (
      <AulaView
        curso={curso}
        aula={aula}
        onComplete={() => handleConcluirAula(state.cursoId, state.aulaId)}
        onStartQuiz={() => setState({ tela: 'quiz', cursoId: state.cursoId, aulaId: state.aulaId })}
        onBack={() => setState({ tela: 'curso', cursoId: state.cursoId })}
        progresso={progressos[state.cursoId]}
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
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="font-bold text-lg">Seminario Biblico Gratuito</h2>
        </div>
        <p className="text-xs text-[var(--content-muted)]">Cursos completos com certificado. Estude no seu ritmo, sem custo.</p>
      </div>
      <ScrollArea className="flex-1">
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
                  <h3 className="font-bold text-sm mb-1">{curso.titulo}</h3>
                  <p className="text-xs text-[var(--content-muted)] mb-3 line-clamp-2">{curso.descricao}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--content-muted)] mb-3 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{curso.duracao}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{curso.modulos.length} modulos</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{totalAulas} aulas</span>
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[curso.nivel])}>{LEVEL_LABELS[curso.nivel]}</span>
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
                      Comecar Curso — Gratuito
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

function CursoDetailView({ curso, progresso, onAulaClick, onBack, onCertificado }: { curso: Curso; progresso?: CursoProgresso; onAulaClick: (aulaId: string) => void; onBack: () => void; onCertificado: () => void }) {
  const [modExpandido, setModExpandido] = useState<string | null>(curso.modulos[0]?.id || null);
  const totalAulas = curso.modulos.reduce((s, m) => s + m.aulas.length, 0);
  const aulasCompletas = progresso?.aulasCompletas.length || 0;
  const progressoPct = totalAulas > 0 ? Math.round((aulasCompletas / totalAulas) * 100) : 0;
  const concluido = estaConcluido(curso.id);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 hover:underline">
          <ArrowLeft className="w-3 h-3" /> Voltar aos cursos
        </button>
        <h2 className="font-bold text-lg">{curso.titulo}</h2>
        <p className="text-xs text-[var(--content-muted)] mt-1">{curso.descricao}</p>
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-1 text-xs"><Clock className="w-3 h-3" /> {curso.duracao}</div>
          <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[curso.nivel])}>{LEVEL_LABELS[curso.nivel]}</span>
          {concluido && <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-green-500/10 text-green-500">Concluido</span>}
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
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {curso.modulos.map((mod) => {
            const modAulasCompletas = mod.aulas.filter(a => progresso?.aulasCompletas.includes(a.id)).length;
            return (
              <div key={mod.id} className="rounded-xl border border-[var(--border)]/40 overflow-hidden">
                <button onClick={() => setModExpandido(modExpandido === mod.id ? null : mod.id)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--surface-raised)] transition-colors">
                  <span className="text-xl">{mod.icone}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{mod.titulo}</div>
                    <div className="text-[10px] text-[var(--content-muted)]">{mod.descricao}</div>
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
                            <div className="text-xs font-medium">{aula.titulo}</div>
                            <div className="text-[10px] text-[var(--content-muted)]">{aula.duracao}</div>
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

function AulaView({ curso, aula, onComplete, onStartQuiz, onBack, progresso }: { curso: Curso; aula: CursoAula; onComplete: () => void; onStartQuiz: () => void; onBack: () => void; progresso?: CursoProgresso }) {
  const completa = progresso?.aulasCompletas.includes(aula.id) || false;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <button onClick={onBack} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 hover:underline">
          <ArrowLeft className="w-3 h-3" /> Voltar ao curso
        </button>
        <h2 className="font-bold text-lg">{aula.titulo}</h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">{curso.titulo}</span>
          <span className="text-[10px] text-[var(--content-muted)] flex items-center gap-1"><Clock className="w-3 h-3" />{aula.duracao}</span>
          {completa && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Concluida</span>}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {aula.tipo === 'texto' && aula.conteudo && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <MarkdownRenderer content={aula.conteudo} />
            </div>
          )}
          {aula.tipo === 'quiz' && (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-[var(--brand)] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Avaliacao Final</h3>
              <p className="text-sm text-[var(--content-muted)] mb-4">
                Responda {aula.perguntas?.length || 0} perguntas. Voce precisa acertar 70% para ser aprovado e receber o certificado.
              </p>
              <Button onClick={onStartQuiz} className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
                Iniciar Avaliacao
              </Button>
            </div>
          )}
          {aula.versiculosChave && aula.versiculosChave.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)]/30">
              <h4 className="font-bold text-xs mb-3 text-[var(--brand)]">Versiculos-Chave</h4>
              <div className="space-y-2">
                {aula.versiculosChave.map((v, i) => (
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
        <div className="p-4 border-t border-[var(--border)]/40">
          {completa ? (
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Aula concluida
            </div>
          ) : (
            <Button onClick={onComplete} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
              Marcar como Concluida
            </Button>
          )}
        </div>
      )}
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
        <h2 className="font-bold text-lg">Avaliacao Final</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-[var(--content-muted)]">Pergunta {atual + 1} de {perguntas.length}</span>
          <Progress value={((atual + 1) / perguntas.length) * 100} className="h-1.5 flex-1" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <p className="font-medium text-sm mb-4">{pergunta.pergunta}</p>
          <div className="space-y-2">
            {pergunta.opcoes.map((op, idx) => {
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
              <p className="text-xs text-[var(--content-muted)]">{pergunta.explicacao}</p>
            </div>
          )}
        </div>
      </ScrollArea>
      {respondido && (
        <div className="p-4 border-t border-[var(--border)]/40">
          <Button onClick={handleProxima} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
            {atual < perguntas.length - 1 ? 'Proxima Pergunta' : 'Ver Resultado'}
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
