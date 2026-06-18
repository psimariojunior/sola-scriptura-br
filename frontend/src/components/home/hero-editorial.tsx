import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroEditorial() {
  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, hsl(var(--gold)) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(var(--burgundy)) 0%, transparent 35%)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8">
          Estudo Bíblico Acadêmico · Português Brasileiro
        </p>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] text-foreground mb-6 tracking-tight">
          Sola
          <br />
          <span className="italic font-medium text-primary">Scriptura</span>
        </h1>

        <div className="ornamento w-24 mx-auto my-8" />

        <p className="font-serif-body text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-4">
          A Escritura como única infalível regra de fé e prática —
          estudada com rigor acadêmico, exegese cuidada e ferramentas que servem ao texto sagrado.
        </p>

        <p className="font-serif-body text-base text-muted-foreground italic max-w-xl mx-auto mb-12">
          Grego Koiné. Hebraico Bíblico. Teologia Sistemática. Arqueologia. Geografia. História.
          Inteligência artificial especializada. Tudo integrado.
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Link
            href="/biblia"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors"
          >
            Iniciar Estudo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
          <Link
            href="/ia"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide text-foreground border border-border hover:border-primary/50 hover:text-primary transition-colors"
          >
            Consultar IA
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
