'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, CheckCircle2, Clock, ChevronRight, Award, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'practice';
  completed: boolean;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  icon: string;
}

interface BibleCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  modules: CourseModule[];
  enrolled: boolean;
  progress: number;
  certificate: boolean;
}

const SAMPLE_COURSES: BibleCourse[] = [
  {
    id: 'c1',
    title: 'Fundamentos da Fé Cristã',
    description: 'Aprenda os pilares fundamentais do cristianismo: salvação, graça, fé e arrependimento.',
    instructor: 'Pr. Paulo Richard',
    duration: '8 semanas',
    level: 'iniciante',
    enrolled: true,
    progress: 45,
    certificate: true,
    modules: [
      {
        id: 'm1', title: 'O que é o Evangelho', description: 'Entenda a mensagem central do cristianismo',
        icon: '📖',
        lessons: [
          { id: 'l1', title: 'A natureza de Deus', duration: '15 min', type: 'video', completed: true },
          { id: 'l2', title: 'O problema do pecado', duration: '20 min', type: 'video', completed: true },
          { id: 'l3', title: 'A solução em Cristo', duration: '18 min', type: 'reading', completed: true },
          { id: 'l4', title: 'Quiz: Fundamentos', duration: '10 min', type: 'quiz', completed: false },
        ],
      },
      {
        id: 'm2', title: 'Salvação pela Fé', description: 'Como somos salvos pela graça de Deus',
        icon: '✝️',
        lessons: [
          { id: 'l5', title: 'O que é graça?', duration: '15 min', type: 'video', completed: true },
          { id: 'l6', title: 'Fé vs Obras', duration: '20 min', type: 'video', completed: false },
          { id: 'l7', title: 'Leitura: Romanos', duration: '25 min', type: 'reading', completed: false },
          { id: 'l8', title: 'Prática: Oração', duration: '15 min', type: 'practice', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Introdução ao Antigo Testamento',
    description: 'Explore os 39 livros do AT com contexto histórico, cultural e teológico.',
    instructor: 'Dra. Maria Santos',
    duration: '12 semanas',
    level: 'iniciante',
    enrolled: false,
    progress: 0,
    certificate: true,
    modules: [
      {
        id: 'm3', title: 'Pentateuco', description: 'Os 5 livros de Moisés',
        icon: '📜',
        lessons: [
          { id: 'l9', title: 'Gênesis: A criação', duration: '20 min', type: 'video', completed: false },
          { id: 'l10', title: 'Êxodo: Libertação', duration: '20 min', type: 'video', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Hermenêutica Prática',
    description: 'Aprenda a interpretar a Bíblia corretamente com métodos comprovados.',
    instructor: 'Prof. João Almeida',
    duration: '10 semanas',
    level: 'intermediario',
    enrolled: false,
    progress: 0,
    certificate: true,
    modules: [
      {
        id: 'm4', title: 'Regras de Interpretação', description: 'Princípios hermenêuticos fundamentais',
        icon: '🔍',
        lessons: [
          { id: 'l11', title: 'Contexto histórico', duration: '25 min', type: 'video', completed: false },
          { id: 'l12', title: 'Contexto literário', duration: '20 min', type: 'video', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c4',
    title: 'Grego Bíblico do Zero',
    description: 'Aprenda as bases do grego koinê para estudar o Novo Testamento no original.',
    instructor: 'Dr. Carlos Mendes',
    duration: '16 semanas',
    level: 'avancado',
    enrolled: false,
    progress: 0,
    certificate: true,
    modules: [
      {
        id: 'm5', title: 'Alfabeto e Pronúncia', description: 'Primeiros passos no grego',
        icon: '🏛️',
        lessons: [
          { id: 'l13', title: 'Alfabeto grego', duration: '30 min', type: 'video', completed: false },
          { id: 'l14', title: 'Acentos e respirações', duration: '25 min', type: 'video', completed: false },
        ],
      },
    ],
  },
];

const LEVEL_COLORS = {
  iniciante: 'text-green-500 bg-green-500/10',
  intermediario: 'text-yellow-500 bg-yellow-500/10',
  avancado: 'text-red-500 bg-red-500/10',
};

const LESSON_ICONS = {
  video: '🎥',
  reading: '📖',
  quiz: '❓',
  practice: '✍️',
};

export function BibleCourses() {
  const [courses, setCourses] = useState(SAMPLE_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<BibleCourse | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const handleEnroll = (courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrolled: true } : c));
    const course = courses.find(c => c.id === courseId);
    if (course) setSelectedCourse({ ...course, enrolled: true });
  };

  const handleLessonComplete = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const updatedModules = c.modules.map(m => ({
        ...m,
        lessons: m.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l),
      }));
      const totalLessons = updatedModules.reduce((sum, m) => sum + m.lessons.length, 0);
      const completedLessons = updatedModules.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0);
      return { ...c, modules: updatedModules, progress: Math.round((completedLessons / totalLessons) * 100) };
    }));
  };

  if (selectedCourse) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[var(--border)]/40">
          <button onClick={() => setSelectedCourse(null)} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1">
            <ChevronRight className="w-3 h-3 rotate-180" /> Voltar aos cursos
          </button>
          <h2 className="font-bold text-lg">{selectedCourse.title}</h2>
          <p className="text-xs text-[var(--content-muted)] mt-1">{selectedCourse.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-xs"><Clock className="w-3 h-3" /> {selectedCourse.duration}</div>
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[selectedCourse.level])}>{selectedCourse.level}</span>
            <div className="flex items-center gap-1 text-xs"><GraduationCap className="w-3 h-3" /> {selectedCourse.instructor}</div>
          </div>
          {selectedCourse.enrolled && (
            <div className="mt-3"><Progress value={selectedCourse.progress} className="h-2" /><p className="text-[10px] text-[var(--content-muted)] mt-1">{selectedCourse.progress}% concluído</p></div>
          )}
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {selectedCourse.modules.map(module => (
              <div key={module.id} className="rounded-xl border border-[var(--border)]/40 overflow-hidden">
                <button onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--surface-raised)] transition-colors">
                  <span className="text-xl">{module.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{module.title}</div>
                    <div className="text-[10px] text-[var(--content-muted)]">{module.description}</div>
                  </div>
                  <div className="text-[10px] text-[var(--content-muted)]">
                    {module.lessons.filter(l => l.completed).length}/{module.lessons.length}
                  </div>
                  <ChevronRight className={cn('w-4 h-4 text-[var(--content-muted)] transition-transform', expandedModule === module.id && 'rotate-90')} />
                </button>
                {expandedModule === module.id && (
                  <div className="border-t border-[var(--border)]/20 divide-y divide-[var(--border)]/20">
                    {module.lessons.map(lesson => (
                      <button key={lesson.id}
                        onClick={() => selectedCourse.enrolled && handleLessonComplete(selectedCourse.id, lesson.id)}
                        className={cn('w-full flex items-center gap-3 p-3 text-left transition-colors',
                          lesson.completed ? 'bg-green-500/5' : 'hover:bg-[var(--surface-raised)]')}>
                        <span className="text-sm">{LESSON_ICONS[lesson.type]}</span>
                        <div className="flex-1">
                          <div className="text-xs font-medium">{lesson.title}</div>
                          <div className="text-[10px] text-[var(--content-muted)]">{lesson.duration}</div>
                        </div>
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[var(--content-muted)]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="font-bold text-lg">Seminário Bíblico Gratuito</h2>
        </div>
        <p className="text-xs text-[var(--content-muted)]">Cursos completos com certificado. Aprenda no seu ritmo.</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {courses.map((course, idx) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-[var(--border)]/40 overflow-hidden bg-[var(--surface-raised)]">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[course.level])}>{course.level}</span>
                  {course.certificate && <Award className="w-4 h-4 text-yellow-500" />}
                </div>
                <h3 className="font-bold text-sm mb-1">{course.title}</h3>
                <p className="text-xs text-[var(--content-muted)] mb-3 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--content-muted)] mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.modules.length} módulos</span>
                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{course.instructor}</span>
                </div>
                {course.enrolled ? (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-[var(--content-muted)]">Progresso</span>
                      <span className="text-[10px] font-bold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5 mb-3" />
                    <Button onClick={() => setSelectedCourse(course)} size="sm" className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white text-xs">
                      Continuar Estudando
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => handleEnroll(course.id)} size="sm" variant="outline" className="w-full text-xs">
                    Começar Curso
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
