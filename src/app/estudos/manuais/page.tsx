import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { manuaisBiblicos } from '@/data/manuais';
import Link from 'next/link';
import {
  BookOpen,
  Church,
  Clock,
  Shield,
  Crown,
  User,
  AlertTriangle,
  Search,
  ArrowRight,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-8 h-8" />,
  Church: <Church className="w-8 h-8" />,
  Clock: <Clock className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Crown: <Crown className="w-8 h-8" />,
  User: <User className="w-8 h-8" />,
  AlertTriangle: <AlertTriangle className="w-8 h-8" />,
};

export default function ManuaisPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">Manuais Biblicos</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guias de estudo teologico sistematico, cada um com 10 capítulos,
              versículos-chave, perguntas de estudo e citacoes de teologos
              historicamente significativos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manuaisBiblicos.map((manual, idx) => (
            <ScrollReveal key={manual.id} delay={idx * 0.05}>
              <Link href={`/estudos/manuais/${manual.slug}`}>
                <div className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${manual.cor} bg-current/10 p-3 rounded-lg`}>
                      {iconMap[manual.icone] || <BookOpen className="w-8 h-8" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {manual.titulo}
                      </h2>
                      <p className="text-sm text-muted-foreground">{manual.subtitulo}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {manual.descricao}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {manual.categorias.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-secondary px-2 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{manual.capitulos.length} capitulos</span>
                    <ArrowRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
