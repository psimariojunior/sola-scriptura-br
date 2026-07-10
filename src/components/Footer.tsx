import Link from 'next/link';
import { BookOpen, Mail, Github, Twitter, Heart } from 'lucide-react';

const ferramentas = [
  { href: '/biblia', label: 'Bíblia' },
  { href: '/pesquisa', label: 'Pesquisa' },
  { href: '/exegese', label: 'Exegese' },
  { href: '/idiomas', label: 'Línguas Originais' },
  { href: '/ferramentas', label: 'Atlas Bíblico' },
];

const estudo = [
  { href: '/teologia', label: 'Teologia Sistemática' },
  { href: '/historia', label: 'História Bíblica' },
  { href: '/cronologia', label: 'Cronologia' },
  { href: '/personagens', label: 'Personagens' },
  { href: '/ia', label: 'Assistente IA' },
];

const recursos = [
  { href: '/estudos', label: 'Meus Estudos' },
  { href: '/admin', label: 'Painel Admin' },
  { href: '/auth/login', label: 'Minha Conta' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-display text-xl font-semibold">Sola Scriptura</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              Estudo bíblico acadêmico com rigor. Grego Koiné, Hebraico Bíblico, Teologia Sistemática,
              Exegese e Inteligência Artificial — tudo integrado em uma plataforma completa.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:contato@solascripura.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Ferramentas</h3>
            <ul className="space-y-2">
              {ferramentas.map((link) => (
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
              {estudo.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Recursos</h3>
            <ul className="space-y-2">
              {recursos.map((link) => (
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Sola Scriptura — Estudo Bíblico Acadêmico · Feito com <Heart className="w-3 h-3 inline text-red-500 fill-current" /> e rigor
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              &copy; {new Date().getFullYear()} Sola Scriptura. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
