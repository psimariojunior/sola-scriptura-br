'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, CheckCircle2, Clock, ChevronRight, Award, Lock, Play, FileText, HelpCircle, PenTool } from 'lucide-react';
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
  category: string;
}

const SAMPLE_COURSES: BibleCourse[] = [
  {
    id: 'c1',
    title: 'Fundamentos da Fé Cristã',
    description: 'Os pilares fundamentais do cristianismo: salvação, graça, fé, arrependimento, trindade e a autoridade das Escrituras.',
    instructor: 'Pr. Paulo Richard',
    duration: '8 semanas',
    level: 'iniciante',
    enrolled: true,
    progress: 45,
    certificate: true,
    category: 'Teologia Sistemática',
    modules: [
      {
        id: 'm1', title: 'O que é o Evangelho', description: 'A mensagem central do cristianismo',
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
          { id: 'l7', title: 'Leitura: Romanos 3:21-26', duration: '25 min', type: 'reading', completed: false },
          { id: 'l8', title: 'Prática: Oração de arrependimento', duration: '15 min', type: 'practice', completed: false },
        ],
      },
      {
        id: 'm3', title: 'A Trindade', description: 'Pai, Filho e Espírito Santo — um só Deus em três pessoas',
        icon: '🔺',
        lessons: [
          { id: 'l9', title: 'Deus Pai — Criador e Soberano', duration: '18 min', type: 'video', completed: false },
          { id: 'l10', title: 'Jesus Cristo — Deus e Homem', duration: '22 min', type: 'video', completed: false },
          { id: 'l11', title: 'O Espírito Santo — Nosso Consolador', duration: '20 min', type: 'reading', completed: false },
          { id: 'l12', title: 'Quiz: A Trindade', duration: '10 min', type: 'quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Introdução ao Antigo Testamento',
    description: 'Explore os 39 livros do AT com contexto histórico, cultural e teológico. Do Pentateuco aos Profetas.',
    instructor: 'Dra. Maria Santos',
    duration: '12 semanas',
    level: 'iniciante',
    enrolled: false,
    progress: 0,
    certificate: true,
    category: 'Introdução Bíblica',
    modules: [
      {
        id: 'm4', title: 'Pentateuco', description: 'Os 5 livros de Moisés',
        icon: '📜',
        lessons: [
          { id: 'l13', title: 'Gênesis: A criação e os patriarcas', duration: '25 min', type: 'video', completed: false },
          { id: 'l14', title: 'Êxodo: Libertação do Egito', duration: '25 min', type: 'video', completed: false },
          { id: 'l15', title: 'Levítico: O sistema sacrificial', duration: '20 min', type: 'reading', completed: false },
          { id: 'l16', title: 'Números: 40 anos no deserto', duration: '20 min', type: 'reading', completed: false },
          { id: 'l17', title: 'Deuteronômio: A Lei renovada', duration: '20 min', type: 'video', completed: false },
        ],
      },
      {
        id: 'm5', title: 'Livros Históricos', description: 'Da conquista ao exílio babilônico',
        icon: '🏛️',
        lessons: [
          { id: 'l18', title: 'Josué e Juízes', duration: '22 min', type: 'video', completed: false },
          { id: 'l19', title: 'Rute e 1 Samuel', duration: '20 min', type: 'reading', completed: false },
          { id: 'l20', title: '2 Samuel e Reis', duration: '25 min', type: 'video', completed: false },
          { id: 'l21', title: 'Crônicas, Esdras e Neemias', duration: '22 min', type: 'reading', completed: false },
        ],
      },
      {
        id: 'm6', title: 'Poéticos e Proféticos', description: 'Salmos, provérbios e os grandes profetas',
        icon: '🎶',
        lessons: [
          { id: 'l22', title: 'Salmos e Provérbios', duration: '20 min', type: 'video', completed: false },
          { id: 'l23', title: 'Isaías: O messias profetizado', duration: '25 min', type: 'video', completed: false },
          { id: 'l24', title: 'Jeremias e Lamentações', duration: '22 min', type: 'reading', completed: false },
          { id: 'l25', title: 'Ezequiel e Daniel', duration: '25 min', type: 'video', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Hermenêutica Prática',
    description: 'Aprenda a interpretar a Bíblia corretamente com métodos comprovados usados por grandes teólogos.',
    instructor: 'Prof. João Almeida',
    duration: '10 semanas',
    level: 'intermediario',
    enrolled: false,
    progress: 0,
    certificate: true,
    category: 'Interpretação Bíblica',
    modules: [
      {
        id: 'm7', title: 'Princípios Fundamentais', description: 'Regras básicas de interpretação',
        icon: '🔍',
        lessons: [
          { id: 'l26', title: 'Regra de interpretação pela Bíblia', duration: '20 min', type: 'video', completed: false },
          { id: 'l27', title: 'Contexto histórico e cultural', duration: '25 min', type: 'video', completed: false },
          { id: 'l28', title: 'Contexto literário e gramatical', duration: '22 min', type: 'reading', completed: false },
          { id: 'l29', title: 'Prática: Analisando Romanos 8', duration: '30 min', type: 'practice', completed: false },
        ],
      },
      {
        id: 'm8', title: 'Gêneros Literários', description: 'Narrativo, poético, profético, epistolar e apocalíptico',
        icon: '📚',
        lessons: [
          { id: 'l30', title: 'Literatura narrativa (Gênesis, Atos)', duration: '22 min', type: 'video', completed: false },
          { id: 'l31', title: 'Literatura poética (Salmos, Eclesiastes)', duration: '20 min', type: 'reading', completed: false },
          { id: 'l32', title: 'Literatura profética (Isaías, Apocalipse)', duration: '25 min', type: 'video', completed: false },
          { id: 'l33', title: 'Literatura epistolar (Romanos, Efésios)', duration: '22 min', type: 'reading', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c4',
    title: 'Evangelhos: A Vida de Jesus',
    description: 'Estudo comparativo dos quatro evangelhos — Mateus, Marcos, Lucas e João. A pessoa e obra de Cristo.',
    instructor: 'Dr. Pedro Oliveira',
    duration: '14 semanas',
    level: 'intermediario',
    enrolled: false,
    progress: 0,
    certificate: true,
    category: 'Novo Testamento',
    modules: [
      {
        id: 'm9', title: 'Mateus: O Rei dos Judeus', description: 'Jesus como o Messias prometido',
        icon: '👑',
        lessons: [
          { id: 'l34', title: 'Genealogia e nascimento', duration: '20 min', type: 'video', completed: false },
          { id: 'l35', title: 'O Sermão do Monte (caps. 5-7)', duration: '25 min', type: 'reading', completed: false },
          { id: 'l36', title: 'Parábolas do Reino (caps. 13)', duration: '22 min', type: 'video', completed: false },
          { id: 'l37', title: 'A Grande Comissão (caps. 28)', duration: '15 min', type: 'reading', completed: false },
        ],
      },
      {
        id: 'm10', title: 'João: O Verbo Encarnado', description: 'A identidade divina de Jesus',
        icon: '🌟',
        lessons: [
          { id: 'l38', title: 'O Prólogo (Jo 1:1-18)', duration: '22 min', type: 'video', completed: false },
          { id: 'l39', title: 'Os 7 "Eu Sou"', duration: '25 min', type: 'reading', completed: false },
          { id: 'l40', title: 'Os 7 sinais milagrosos', duration: '25 min', type: 'video', completed: false },
          { id: 'l41', title: 'Quiz: Evangelho de João', duration: '10 min', type: 'quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c5',
    title: 'Grego Bíblico do Zero',
    description: 'Aprenda as bases do grego koiné para estudar o Novo Testamento no original. Alfabeto, gramática e vocabulário.',
    instructor: 'Dr. Carlos Mendes',
    duration: '16 semanas',
    level: 'avancado',
    enrolled: false,
    progress: 0,
    certificate: true,
    category: 'Línguas Bíblicas',
    modules: [
      {
        id: 'm11', title: 'Alfabeto e Pronúncia', description: 'Primeiros passos no grego',
        icon: '🏛️',
        lessons: [
          { id: 'l42', title: 'Alfabeto grego: letras e sons', duration: '30 min', type: 'video', completed: false },
          { id: 'l43', title: 'Acentos e respirações', duration: '25 min', type: 'video', completed: false },
          { id: 'l44', title: 'Ditongos e pronúncia', duration: '20 min', type: 'reading', completed: false },
          { id: 'l45', title: 'Prática: Escrevendo em grego', duration: '25 min', type: 'practice', completed: false },
        ],
      },
      {
        id: 'm12', title: 'Substantivos e Casos', description: 'Declinações gregas',
        icon: '📝',
        lessons: [
          { id: 'l46', title: 'Primeira declinação (femininos)', duration: '22 min', type: 'video', completed: false },
          { id: 'l47', title: 'Segunda declinação (masculinos)', duration: '22 min', type: 'video', completed: false },
          { id: 'l48', title: 'Casos: Nominativo, Genitivo, Dativo, Acusativo', duration: '25 min', type: 'reading', completed: false },
          { id: 'l49', title: 'Prática: Declinando substantivos', duration: '20 min', type: 'practice', completed: false },
        ],
      },
      {
        id: 'm13', title: 'Verbos Gregos', description: 'Presente, aoristo e futuro',
        icon: '⚡',
        lessons: [
          { id: 'l50', title: 'Verbos no presente ativo', duration: '25 min', type: 'video', completed: false },
          { id: 'l51', title: 'Aoristo (passado indefinido)', duration: '28 min', type: 'video', completed: false },
          { id: 'l52', title: 'Futuro e imperfeito', duration: '22 min', type: 'reading', completed: false },
          { id: 'l53', title: 'Quiz: Conjugações', duration: '10 min', type: 'quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c6',
    title: 'Hebraico Bíblico',
    description: 'Introdução ao hebraico do Antigo Testamento. Alfabeto, sistema de pontos-vocálicos e léxico básico.',
    instructor: 'Dr. André Costa',
    duration: '14 semanas',
    level: 'avancado',
    enrolled: false,
    progress: 0,
    certificate: true,
    category: 'Línguas Bíblicas',
    modules: [
      {
        id: 'm14', title: 'Alfabeto Hebraico', description: 'As 22 letras do hebraico',
        icon: '✡️',
        lessons: [
          { id: 'l54', title: 'Letras e sons (Aleph a Tav)', duration: '28 min', type: 'video', completed: false },
          { id: 'l55', title: 'Direção da escrita (direita para esquerda)', duration: '15 min', type: 'reading', completed: false },
          { id: 'l56', title: 'Prática: Escrevendo seu nome em hebraico', duration: '20 min', type: 'practice', completed: false },
        ],
      },
      {
        id: 'm15', title: 'Sistema Ponto-Vocálico', description: 'Vogais e acentuação hebraica',
        icon: '🔤',
        lessons: [
          { id: 'l57', title: 'Vogais longas (Qamats, Patach, Segol)', duration: '22 min', type: 'video', completed: false },
          { id: 'l58', title: 'Vogais curtas (Hiriq, Tsere, Holem)', duration: '22 min', type: 'video', completed: false },
          { id: 'l59', title: 'Shva e Dagesh', duration: '25 min', type: 'reading', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c7',
    title: 'Teologia do Antigo Testamento',
    description: 'As grandes doutrinas do AT: criação, aliança, lei, sacrifício, messianismo e reino de Deus.',
    instructor: 'Dr. Ricardo Souza',
    duration: '10 semanas',
    level: 'intermediario',
    enrolled: false,
    progress: 0,
    certificate: true,
    category: 'Teologia Sistemática',
    modules: [
      {
        id: 'm16', title: 'Criação e Queda', description: 'Origem do universo, da humanidade e do pecado',
        icon: '🌍',
        lessons: [
          { id: 'l60', title: 'Gênesis 1-2: A criação ordenada', duration: '22 min', type: 'video', completed: false },
          { id: 'l61', title: 'Gênesis 3: A queda e suas consequências', duration: '20 min', type: 'video', completed: false },
          { id: 'l62', title: 'Leitura: Romanos 5:12-21', duration: '15 min', type: 'reading', completed: false },
        ],
      },
      {
        id: 'm17', title: 'Sistema de Alianças', description: 'De Noé a Davi — as alianças de Deus',
        icon: '🤝',
        lessons: [
          { id: 'l63', title: 'Aliança com Noé (Gn 9)', duration: '18 min', type: 'video', completed: false },
          { id: 'l64', title: 'Aliança com Abraão (Gn 12, 15, 17)', duration: '25 min', type: 'video', completed: false },
          { id: 'l65', title: 'Aliança no Sinai (Êxodo 19-24)', duration: '22 min', type: 'reading', completed: false },
          { id: 'l66', title: 'Aliança Davídica (2 Samuel 7)', duration: '20 min', type: 'reading', completed: false },
        ],
      },
      {
        id: 'm18', title: 'Messianismo do AT', description: 'As profecias sobre o Messias',
        icon: '⭐',
        lessons: [
          { id: 'l67', title: 'Protoevangelium (Gênesis 3:15)', duration: '15 min', type: 'video', completed: false },
          { id: 'l68', title: 'Isaías 53: O servo sofredor', duration: '22 min', type: 'video', completed: false },
          { id: 'l69', title: 'Salmo 22: Crucificado antes da crucificação', duration: '20 min', type: 'reading', completed: false },
          { id: 'l70', title: 'Quiz: Messianismo', duration: '10 min', type: 'quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c8',
    title: 'Atos dos Apóstolos e a Igreja Primitiva',
    description: 'Da Ascensão de Cristo à expansão do evangelho até Roma. Nascimento e crescimento da Igreja.',
    instructor: 'Pr. Marcos Lima',
    duration: '8 semanas',
    level: 'iniciante',
    enrolled: false,
    progress: 0,
    certificate: true,
    category: 'Novo Testamento',
    modules: [
      {
        id: 'm19', title: 'Jerusalém (Caps. 1-7)', description: 'Pentecostes e a primeira igreja',
        icon: '🔥',
        lessons: [
          { id: 'l71', title: 'Ascensão e Pentecostes (caps. 1-2)', duration: '22 min', type: 'video', completed: false },
          { id: 'l72', title: 'Pedro e João: sinais e-testemunho (caps. 3-5)', duration: '20 min', type: 'reading', completed: false },
          { id: 'l73', title: 'Estêvão: primeiro mártir (caps. 6-7)', duration: '18 min', type: 'video', completed: false },
        ],
      },
      {
        id: 'm20', title: 'Expansão (Caps. 8-12)', description: 'O evangelho alcança Samaria e os gentios',
        icon: '🌍',
        lessons: [
          { id: 'l74', title: 'Filipe em Samaria e o eunuco etíope', duration: '20 min', type: 'video', completed: false },
          { id: 'l75', title: 'A conversão de Saulo (cap. 9)', duration: '22 min', type: 'reading', completed: false },
          { id: 'l76', title: 'Cornélio: gentios recebem o Espírito (cap. 10)', duration: '20 min', type: 'video', completed: false },
        ],
      },
      {
        id: 'm21', title: 'Missões (Caps. 13-28)', description: 'As viagens missionárias de Paulo',
        icon: '⛵',
        lessons: [
          { id: 'l77', title: 'Primeira viagem: Chipre e Galácia', duration: '22 min', type: 'video', completed: false },
          { id: 'l78', title: 'Segunda viagem: Filipos, Tessalônica, Atenas', duration: '25 min', type: 'reading', completed: false },
          { id: 'l79', title: 'Terceira viagem: Éfeso e retorno a Jerusalém', duration: '22 min', type: 'video', completed: false },
          { id: 'l80', title: 'Prisão, apelação e chegada a Roma', duration: '25 min', type: 'reading', completed: false },
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

const LEVEL_LABELS = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

const LESSON_ICONS = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  practice: PenTool,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Teologia Sistemática': 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  'Introdução Bíblica': 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  'Interpretação Bíblica': 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  'Novo Testamento': 'bg-green-500/10 text-green-500 border-green-500/30',
  'Línguas Bíblicas': 'bg-red-500/10 text-red-500 border-red-500/30',
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
          <button onClick={() => setSelectedCourse(null)} className="text-xs text-[var(--brand)] mb-2 flex items-center gap-1 hover:underline">
            <ChevronRight className="w-3 h-3 rotate-180" /> Voltar aos cursos
          </button>
          <h2 className="font-bold text-lg">{selectedCourse.title}</h2>
          <p className="text-xs text-[var(--content-muted)] mt-1">{selectedCourse.description}</p>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <div className="flex items-center gap-1 text-xs"><Clock className="w-3 h-3" /> {selectedCourse.duration}</div>
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium border', LEVEL_COLORS[selectedCourse.level])}>{LEVEL_LABELS[selectedCourse.level]}</span>
            <div className="flex items-center gap-1 text-xs"><GraduationCap className="w-3 h-3" /> {selectedCourse.instructor}</div>
          </div>
          {selectedCourse.enrolled && (
            <div className="mt-3">
              <Progress value={selectedCourse.progress} className="h-2" />
              <p className="text-[10px] text-[var(--content-muted)] mt-1">{selectedCourse.progress}% concluído</p>
            </div>
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
                    {module.lessons.map(lesson => {
                      const LessonIcon = LESSON_ICONS[lesson.type];
                      return (
                        <button key={lesson.id}
                          onClick={() => selectedCourse.enrolled && handleLessonComplete(selectedCourse.id, lesson.id)}
                          className={cn('w-full flex items-center gap-3 p-3 text-left transition-colors',
                            lesson.completed ? 'bg-green-500/5' : 'hover:bg-[var(--surface-raised)]')}>
                          <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', lesson.completed ? 'bg-green-500/10' : 'bg-[var(--surface-sunken)]')}>
                            <LessonIcon className={cn('w-3.5 h-3.5', lesson.completed ? 'text-green-500' : 'text-[var(--content-muted)]')} />
                          </div>
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
                      );
                    })}
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
        <p className="text-xs text-[var(--content-muted)]">8 cursos completos com certificado. Estude no seu ritmo, sem custo.</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {courses.map((course, idx) => {
            const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
            return (
              <motion.div key={course.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                className="rounded-xl border border-[var(--border)]/40 overflow-hidden bg-[var(--surface-raised)]">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium border', CATEGORY_COLORS[course.category] || 'bg-gray-500/10 text-gray-500 border-gray-500/30')}>{course.category}</span>
                    {course.certificate && <Award className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <h3 className="font-bold text-sm mb-1">{course.title}</h3>
                  <p className="text-xs text-[var(--content-muted)] mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--content-muted)] mb-3 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.modules.length} módulos</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{totalLessons} aulas</span>
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
                      Começar Curso — Gratuito
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
