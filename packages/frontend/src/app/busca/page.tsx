"use client";

import { useState } from "react";
import { apiBiblia, apiLinguistica, apiPersonagens, apiDicionario } from "@/lib/api";
import { Search, BookOpen, Languages, Users, BookText } from "lucide-react";

type TabKey = "biblia" | "grego" | "hebraico" | "personagens" | "dicionario";

const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: "biblia", label: "Bíblia", icon: BookOpen },
  { key: "grego", label: "Grego", icon: Languages },
  { key: "hebraico", label: "Hebraico", icon: Languages },
  { key: "personagens", label: "Personagens", icon: Users },
  { key: "dicionario", label: "Dicionário", icon: BookText },
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
          res = await apiBiblia.pesquisar(query, "");
          break;
        case "grego":
          res = await apiLinguistica.pesquisarGrego(query);
          break;
        case "hebraico":
          res = await apiLinguistica.pesquisarHebraico(query);
          break;
        case "personagens":
          res = await apiPersonagens.buscar(query);
          break;
        case "dicionario":
          res = await apiDicionario.pesquisar(query);
          break;
      }
      setResultados(res?.data || []);
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
          <h1 className="text-3xl font-bold">Busca Avançada</h1>
          <p className="text-muted-foreground">Pesquise em toda a plataforma</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setResultados([]); setBuscou(false); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              tab === t.key ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && buscar()}
          placeholder={
            tab === "biblia" ? "Ex: amor, João 3:16, salvação..." :
            tab === "grego" ? "Ex: agape, logos..." :
            tab === "hebraico" ? "Ex: bereshit, yhwh..." :
            tab === "personagens" ? "Ex: Abraão, Davi..." :
            "Ex: graça, expiação..."
          }
          className="flex-1 border rounded-lg px-4 py-2 text-sm"
        />
        <button onClick={buscar} disabled={carregando} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm disabled:opacity-50">
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {carregando && <p className="text-muted-foreground">Buscando...</p>}

      {!carregando && buscou && resultados.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Nenhum resultado encontrado para &quot;{query}&quot;</p>
      )}

      {resultados.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{resultados.length} resultado(s)</p>
          {resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 space-y-1 hover:shadow-sm transition-shadow">
              {r.texto && (
                <>
                  <p className="text-xs text-muted-foreground">{r.livroNome || r.livro} {r.capitulo}:{r.numero}</p>
                  <p className="text-sm">{r.texto}</p>
                </>
              )}
              {r.palavraOriginal && (
                <>
                  <p className="font-mono text-sm font-semibold">{r.palavraOriginal}</p>
                  {r.transliteracao && <p className="text-xs text-muted-foreground">Transliteração: {r.transliteracao}</p>}
                  <p className="text-sm">{r.definicaoCurta || r.definicao}</p>
                </>
              )}
              {r.nomePortugues && (
                <>
                  <p className="font-semibold">{r.nomePortugues}</p>
                  {r.nomeOriginal && <p className="text-xs text-muted-foreground">{r.nomeOriginal}</p>}
                  {r.biografia && <p className="text-sm text-muted-foreground line-clamp-2">{r.biografia}</p>}
                </>
              )}
              {r.nome && !r.texto && !r.palavraOriginal && !r.nomePortugues && (
                <>
                  <p className="font-semibold">{r.nome}</p>
                  {r.descricao && <p className="text-sm text-muted-foreground line-clamp-2">{r.descricao}</p>}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
