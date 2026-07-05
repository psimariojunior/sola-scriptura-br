"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { PERSONAGENS } from "@/lib/personagens-data";
import { DOCTRINAS } from "@/lib/doctrines-data";
import { LEXICON_DATA } from "@/lib/lexicon-data";
import {
  BookOpen, Map, Clock, Search, Settings, Home, Users, GraduationCap, Moon, Sun,
  Calendar, Star, Columns, Languages,
} from "lucide-react";

const sections = [
  {
    titulo: "Estudo",
    rotas: [
      { href: "/", icone: Home, label: "Início" },
      { href: "/biblia", icone: BookOpen, label: "Bíblia" },
      { href: "/estudo-paralelo", icone: Columns, label: "Paralelo" },
    ],
  },
  {
    titulo: "Ferramentas",
    rotas: [
      { href: "/lexico", icone: Languages, label: "Léxico", badge: `${LEXICON_DATA.length}+` },
      { href: "/busca", icone: Search, label: "Busca" },
      { href: "/teologia", icone: GraduationCap, label: "Doutrinas", badge: `${DOCTRINAS.length}` },
    ],
  },
  {
    titulo: "Conteúdo",
    rotas: [
      { href: "/personagens", icone: Users, label: "Personagens", badge: `${PERSONAGENS.length}` },
      { href: "/mapas", icone: Map, label: "Mapas" },
      { href: "/cronologia", icone: Clock, label: "Cronologia" },
    ],
  },
  {
    titulo: "Personalizar",
    rotas: [
      { href: "/favoritos", icone: Star, label: "Favoritos" },
      { href: "/planos", icone: Calendar, label: "Planos" },
      { href: "/configuracoes", icone: Settings, label: "Config." },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-background/80 backdrop-blur-lg">
      <div className="flex h-14 items-center border-b px-6 justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>Sola Scriptura</span>
        </Link>
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          title="Alternar tema"
        >
          {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {sections.map((sec) => (
          <div key={sec.titulo} className="mb-4">
            <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {sec.titulo}
            </p>
            <div className="flex flex-col gap-0.5">
              {sec.rotas.map((rota) => (
                <Link
                  key={rota.href}
                  href={rota.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(rota.href)
                      ? "bg-primary/10 text-primary before:absolute before:left-0 before:top-1/2 before:h-5/6 before:w-1 before:-translate-y-1/2 before:rounded-r before:bg-primary"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <rota.icone className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{rota.label}</span>
                  {rota.badge && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                      {rota.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t px-6 py-3">
        <p className="text-[11px] text-muted-foreground">v2.0 Beta</p>
      </div>
    </aside>
  );
}
