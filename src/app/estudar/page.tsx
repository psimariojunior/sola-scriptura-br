'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Languages,
  GitBranch,
  Tag,
  Wrench,
  GraduationCap,
  BookOpen,
  Heart,
  Map,
  ScrollText,
  Calendar,
} from 'lucide-react';

const studyTools = [
  {
    href: '/pesquisa',
    label: 'Pesquisa',
    description: 'Busca avançada no texto bíblico',
    icon: Search,
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    href: '/idiomas',
    label: 'Grego & Hebraico',
    description: 'Léxico Strong\'s com morfologia',
    icon: Languages,
    color: 'from-emerald-500/20 to-emerald-600/20',
  },
  {
    href: '/referencias',
    label: 'Referências Cruzadas',
    description: '29k+ referências entre versículos',
    icon: GitBranch,
    color: 'from-violet-500/20 to-violet-600/20',
  },
  {
    href: '/harmonia',
    label: 'Harmonia Sinótica',
    description: 'Mateus, Marcos, Lucas e João lado a lado',
    icon: GitBranch,
    color: 'from-amber-500/20 to-amber-600/20',
  },
  {
    href: '/comparar',
    label: 'Comparar Traduções',
    description: 'ARC, ARA, ACF, NVI, KJV e mais',
    icon: BookOpen,
    color: 'from-rose-500/20 to-rose-600/20',
  },
  {
    href: '/topicos',
    label: 'Tópicos Teológicos',
    description: 'Explore temas por assunto',
    icon: Tag,
    color: 'from-cyan-500/20 to-cyan-600/20',
  },
  {
    href: '/ferramentas',
    label: 'Ferramentas',
    description: 'Concordância, Crítica Textual e mais',
    icon: Wrench,
    color: 'from-orange-500/20 to-orange-600/20',
  },
  {
    href: '/estudos',
    label: 'Estudos por Livro',
    description: 'Estude cada livro da Bíblia em profundidade',
    icon: GraduationCap,
    color: 'from-teal-500/20 to-teal-600/20',
  },
];

const contextTools = [
  {
    href: '/historia',
    label: 'História',
    description: 'Contexto histórico do mundo bíblico',
    icon: ScrollText,
    color: 'from-stone-500/20 to-stone-600/20',
  },
  {
    href: '/cronologia',
    label: 'Cronologia',
    description: 'Linha do tempo interativa',
    icon: Calendar,
    color: 'from-indigo-500/20 to-indigo-600/20',
  },
  {
    href: '/personagens',
    label: 'Personagens',
    description: 'Biografias de figuras bíblicas',
    icon: Heart,
    color: 'from-pink-500/20 to-pink-600/20',
  },
  {
    href: '/atlas',
    label: 'Atlas',
    description: 'Mapas interativos com Leaflet',
    icon: Map,
    color: 'from-lime-500/20 to-lime-600/20',
  },
];

export default function EstudarPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Estudar</h1>
          <p className="text-muted-foreground text-sm">
            Ferramentas para aprofundar seu estudo bíblico
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Ferramentas de Estudo
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {studyTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <tool.icon className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{tool.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-primary" />
            Contexto & História
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {contextTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <tool.icon className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{tool.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
