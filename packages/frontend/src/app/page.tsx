import Link from "next/link";
import { BookOpen, MessageSquare, Map, Globe, Clock, Search } from "lucide-react";

const modulos = [
  {
    titulo: "Bíblia",
    descricao: "Leitura e busca em múltiplas versões com texto original",
    icone: BookOpen,
    href: "/biblia",
    cor: "bg-blue-500",
  },
  {
    titulo: "Central de Estudos",
    descricao: "Exegese, teologia, história e referências cruzadas",
    icone: Globe,
    href: "/estudo",
    cor: "bg-purple-500",
  },
  {
    titulo: "Chat IA",
    descricao: "Assistente teológico com inteligência artificial",
    icone: MessageSquare,
    href: "/chat",
    cor: "bg-green-500",
  },
  {
    titulo: "Mapas Interativos",
    descricao: "Geografia bíblica com rotas e locais históricos",
    icone: Map,
    href: "/mapas",
    cor: "bg-orange-500",
  },
  {
    titulo: "Cronologia",
    descricao: "Linha do tempo completa da história bíblica",
    icone: Clock,
    href: "/cronologia",
    cor: "bg-red-500",
  },
  {
    titulo: "Busca Avançada",
    descricao: "Pesquisa em toda a base de conhecimento",
    icone: Search,
    href: "/busca",
    cor: "bg-teal-500",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Sola Scriptura
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plataforma Avançada de Estudo Bíblico Acadêmico com Inteligência Artificial,
          Exegese, Teologia Sistemática e Análise Linguística
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((modulo) => (
          <Link
            key={modulo.href}
            href={modulo.href}
            className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-lg ${modulo.cor} flex items-center justify-center mb-4`}>
              <modulo.icone className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{modulo.titulo}</h3>
            <p className="text-sm text-muted-foreground">{modulo.descricao}</p>
          </Link>
        ))}
      </div>

      <div className="border rounded-lg p-8 bg-muted/50">
        <h2 className="text-2xl font-bold mb-4">Princípio Fundamental</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Qualquer elemento da Bíblia deve ser clicável. Palavras, nomes, cidades,
          eventos, versículos — cada elemento abre uma Central Completa de Estudos.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            "Justificação", "Romanos 8:28", "Abraão", "Jerusalém",
            "Êxodo", "Profecia", "Ágape", "Messias",
          ].map((item) => (
            <Link
              key={item}
              href={`/estudo?q=${encodeURIComponent(item)}`}
              className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
