"use client";

import { useState } from "react";
import { Search, BookOpen, Languages, Users, BookText } from "lucide-react";

type TabKey = "biblia" | "grego" | "hebraico" | "personagens";

const TABS: { key: TabKey; label: string; icon: any; placeholder: string }[] = [
  { key: "biblia", label: "Bíblia", icon: BookOpen, placeholder: "Ex: amor, salvação, Graça..." },
  { key: "grego", label: "Grego", icon: Languages, placeholder: "Ex: agape, logos, pistis..." },
  { key: "hebraico", label: "Hebraico", icon: Languages, placeholder: "Ex: chesed, torah, YHWH..." },
  { key: "personagens", label: "Personagens", icon: Users, placeholder: "Ex: Abraão, Davi, Paulo..." },
];

export default function BuscaPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabKey>("biblia");
  const [resultados, setResultados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);

  async function buscar() {
    if (!query.trim()) return;
    setCarregando(true);
    setResultados([]);
    setBuscou(true);

    try {
      let res;
      switch (tab) {
        case "biblia":
          res = await fetch(`/api/v1/biblia/pesquisar?q=${encodeURIComponent(query)}`);
          break;
        case "grego":
          res = await fetch(`/api/v1/grego/buscar?q=${encodeURIComponent(query)}`);
          break;
        case "hebraico":
          res = await fetch(`/api/v1/hebraico/buscar?q=${encodeURIComponent(query)}`);
          break;
        case "personagens":
          res = await fetch(`/api/v1/personagens/buscar?q=${encodeURIComponent(query)}`);
          break;
      }
      const data = res ? await res.json() : [];
      setResultados(Array.isArray(data) ? data : []);
    } catch {
      setResultados([]);
    }
    setCarregando(false);
  }

  const currentTab = TABS.find(t => t.key === tab)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Busca Avançada</h1>
          <p className="text-muted-foreground">Pesquise em toda a plataforma</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setResultados([]); setBuscou(false); setQuery(""); }}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && buscar()}
          placeholder={currentTab.placeholder}
          className="flex-1 border rounded-lg px-4 py-3 text-sm"
        />
        <button
          onClick={buscar}
          disabled={carregando || !query.trim()}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {carregando && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse space-y-2">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      )}

      {!carregando && buscou && resultados.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Nenhum resultado encontrado para &quot;{query}&quot;</p>
        </div>
      )}

      {resultados.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">{resultados.length} resultado(s) encontrado(s)</p>
          
          {tab === "biblia" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <p className="text-xs text-muted-foreground mb-1 font-mono">
                {r.livroNome || r.livro} {r.capitulo}:{r.numero}
              </p>
              <p className="text-sm leading-relaxed">{r.texto}</p>
            </div>
          ))}

          {tab === "grego" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-primary">{r.strong}</span>
                <span className="font-mono text-lg">{r.palavraOriginal || r.palavra}</span>
                {r.transliteracao && <span className="text-muted-foreground text-sm">({r.transliteracao})</span>}
              </div>
              {r.classeGramatical && <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{r.classeGramatical}</span>}
              <p className="text-sm">{r.definicaoCurta || r.definicao}</p>
              {r.frequenciaNt && <p className="text-xs text-muted-foreground mt-1">Ocorrências no NT: {r.frequenciaNt}</p>}
            </div>
          ))}

          {tab === "hebraico" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-primary">{r.strong}</span>
                <span className="font-mono text-lg">{r.palavraOriginal || r.palavra}</span>
                {r.transliteracao && <span className="text-muted-foreground text-sm">({r.transliteracao})</span>}
              </div>
              {r.classeGramatical && <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{r.classeGramatical}</span>}
              <p className="text-sm">{r.definicaoCurta || r.definicao}</p>
              {r.frequenciaAt && <p className="text-xs text-muted-foreground mt-1">Ocorrências no AT: {r.frequenciaAt}</p>}
            </div>
          ))}

          {tab === "personagens" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <h3 className="font-semibold">{r.nomePortugues}</h3>
              {r.nomeOriginal && <p className="text-xs text-muted-foreground mb-1">{r.nomeOriginal}</p>}
              {r.biografia && <p className="text-sm text-muted-foreground line-clamp-2">{r.biografia}</p>}
              {r.significadoNome && <p className="text-xs text-primary mt-1">Significado: {r.significadoNome}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
