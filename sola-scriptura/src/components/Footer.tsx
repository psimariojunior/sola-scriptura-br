import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const links = [
  { href: '/biblia', label: 'Bíblia' },
  { href: '/idiomas', label: 'Línguas Originais' },
  { href: '/teologia', label: 'Teologia' },
  { href: '/historia', label: 'História' },
  { href: '/ia', label: 'Assistente IA' },
  { href: '/exegese', label: 'Exegese' },
  { href: '/cronologia', label: 'Cronologia' },
  { href: '/personagens', label: 'Personagens' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-display text-xl font-semibold">Sola Scriptura</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Estudo bíblico acadêmico com rigor. Grego Koiné, Hebraico Bíblico, Teologia Sistemática,
              Exegese e Inteligência Artificial — tudo integrado em uma plataforma completa.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Ferramentas</h3>
            <ul className="space-y-2">
              {links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Estudo</h3>
            <ul className="space-y-2">
              {links.slice(4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Sola Scriptura — Estudo Bíblico Acadêmico · Feito com reverência e rigor
          </p>
        </div>
      </div>
    </footer>
  );
}
