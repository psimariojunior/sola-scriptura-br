"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import {
  BookOpen, MessageSquare, Map, Globe, Clock, Library,
  Search, Settings, Home, Users, GraduationCap, Moon, Sun,
  Calendar, LogIn,
} from "lucide-react";

const rotas = [
  { href: "/", icone: Home, label: "Início" },
  { href: "/biblia", icone: BookOpen, label: "Bíblia" },
  { href: "/estudo", icone: Library, label: "Central de Estudos" },
  { href: "/teologia", icone: GraduationCap, label: "Teologia" },
  { href: "/personagens", icone: Users, label: "Personagens" },
  { href: "/chat", icone: MessageSquare, label: "Chat IA" },
  { href: "/mapas", icone: Map, label: "Mapas" },
  { href: "/atlas", icone: Globe, label: "Atlas" },
  { href: "/cronologia", icone: Clock, label: "Cronologia" },
  { href: "/busca", icone: Search, label: "Busca" },
  { href: "/planos", icone: Calendar, label: "Planos de Leitura" },
  { href: "/auth", icone: LogIn, label: "Entrar" },
  { href: "/configuracoes", icone: Settings, label: "Configurações" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
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
      <nav className="flex flex-col gap-1 p-4">
        {rotas.map((rota) => (
          <Link
            key={rota.href}
            href={rota.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === rota.href || pathname.startsWith(rota.href + "?")
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <rota.icone className="h-4 w-4" />
            {rota.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
