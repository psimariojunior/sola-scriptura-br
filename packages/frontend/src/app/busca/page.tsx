"use client";

import { useState } from "react";
import { apiBiblia, apiLinguistica, apiPersonagens } from "@/lib/api";
import { Search, BookOpen, Languages, Users } from "lucide-react";

export default function BuscaPage() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [tipoBusca, setTipoBusca] = useState<"biblia" | "grego" | "hebraico" | "personagens">("biblia");

  async function buscar() {
    if (!query.trim()) return;
    setCarregando(true);
    setResultados([]);

    try {
      let res;
      switch (tipoBusca) {
        case "biblia":
          res = await apiBiblia.pesquisar(query, "");
          setResultados(res.data || []);
          break;
        case "grego":
          res = await apiLinguistica.pesquisarGrego(query);
          setResultados(res.data || []);
          break;
        case "hebraico":
          res = await apiLinguistica.pesquisarHebraico(query);
          setResultados(res.data || []);
          break;
        case "personagens":
          res = await apiPersonagens.buscar(query);
          setResultados(res.data || []);
          break;
      }
    } catch {
      setResultados([]);
    }
    setCarregando(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Busca</h1>
          <p className="text-muted-foreground">Pesquise na Bíblia, palavras originais e personagens</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { key: "biblia" as const, label: "Bíblia", icon: BookOpen },
          { key: "grego" as const, label: "Grego", icon: Languages },
          { key: "hebraico" as const, label: "Hebraico", icon: Languages },
          { key: "personagens" as const, label: "Personagens", icon: Users },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTipoBusca(key)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              tipoBusca === key
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscar()}
          placeholder={`Buscar ${
            tipoBusca === "biblia"
              ? "texto bíblico..."
              : tipoBusca === "grego"
              ? "palavra grega..."
              : tipoBusca === "hebraico"
              ? "palavra hebraica..."
              : "personagem..."
          }`}
          className="flex-1 border rounded-lg px-4 py-2 text-sm"
        />
        <button
          onClick={buscar}
          disabled={carregando || !query.trim()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {resultados.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {resultados.length} resultado(s) encontrado(s)
          </p>
          {resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 space-y-1">
              {r.texto && (
                <>
                  <p className="text-sm text-muted-foreground">
                    {r.livroNome || r.livro} {r.capitulo}:{r.numero}
                  </p>
                  <p>{r.texto}</p>
                </>
              )}
              {r.palavraOriginal && (
                <>
                  <p className="font-mono text-sm">{r.palavraOriginal}</p>
                  <p className="text-sm text-muted-foreground">{r.definicaoCurta || r.definicao}</p>
                </>
              )}
              {r.nomePortugues && (
                <>
                  <p className="font-semibold">{r.nomePortugues}</p>
                  <p className="text-sm text-muted-foreground">{r.biografia}</p>
                </>
              )}
              {!r.texto && !r.palavraOriginal && !r.nomePortugues && (
                <pre className="text-xs text-muted-foreground overflow-auto">
                  {JSON.stringify(r, null, 2).substring(0, 300)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}

      {!carregando && resultados.length === 0 && query && (
        <p className="text-center text-muted-foreground py-8">
          Nenhum resultado encontrado para &quot;{query}&quot;
        </p>
      )}
    </div>
  );
}
