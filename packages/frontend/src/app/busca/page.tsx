"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, BookOpen, Languages, Users, BookText, Link2, Loader2 } from "lucide-react";
import { PERSONAGENS } from "@/lib/personagens-data";
import { DOCTRINAS } from "@/lib/doctrines-data";
import { LEXICON_DATA } from "@/lib/lexicon-data";

type TabKey = "biblia" | "lexico" | "personagens" | "doutrinas" | "referencias";

interface TabDef {
  key: TabKey;
  label: string;
  icon: any;
  placeholder: string;
}

const TABS: TabDef[] = [
  { key: "biblia", label: "Bíblia", icon: BookOpen, placeholder: "Ex: amor, salvação, Graça..." },
  { key: "lexico", label: "Léxico", icon: Languages, placeholder: "Ex: agape, G26, amor..." },
  { key: "personagens", label: "Personagens", icon: Users, placeholder: "Ex: Abraão, Davi, Paulo..." },
  { key: "doutrinas", label: "Doutrinas", icon: BookText, placeholder: "Ex: Trindade, justificação..." },
  { key: "referencias", label: "Referências", icon: Link2, placeholder: "Ex: Gênesis 1:1, João 3:16..." },
];

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? `<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">${part}</mark>`
      : part
  ).join("");
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function BuscaPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabKey>("biblia");
  const [resultados, setResultados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResultados([]);
      setBuscou(false);
      return;
    }
    setBuscou(true);
    setCarregando(true);

    if (tab === "biblia") {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      fetch(`/api/v1/biblia/pesquisar?q=${encodeURIComponent(debouncedQuery)}`, { signal: controller.signal })
        .then(r => r.json())
        .then(data => setResultados(Array.isArray(data) ? data : []))
        .catch(() => {})
        .finally(() => setCarregando(false));
    } else {
      const q = debouncedQuery.toLowerCase();
      let results: any[] = [];
      switch (tab) {
        case "lexico":
          results = LEXICON_DATA.filter(e =>
            e.lemma.toLowerCase().includes(q) ||
            e.transliteracao.toLowerCase().includes(q) ||
            e.strong.toLowerCase().includes(q) ||
            e.definicaoCurta.toLowerCase().includes(q) ||
            e.definicaoCompleta?.toLowerCase().includes(q) ||
            e.significado?.some(s => s.toLowerCase().includes(q))
          );
          break;
        case "personagens":
          results = PERSONAGENS.filter(p =>
            p.nome.toLowerCase().includes(q) ||
            p.nomeOriginal.toLowerCase().includes(q) ||
            p.categoria.toLowerCase().includes(q) ||
            p.biografia.toLowerCase().includes(q) ||
            p.significadoNome?.toLowerCase().includes(q)
          );
          break;
        case "doutrinas":
          results = DOCTRINAS.filter(d =>
            d.nome.toLowerCase().includes(q) ||
            d.categoria.toLowerCase().includes(q) ||
            d.descricao.toLowerCase().includes(q) ||
            d.detalhe.toLowerCase().includes(q)
          );
          break;
        case "referencias": {
          const refs = new Set<string>();
          PERSONAGENS.forEach(p => p.referencias?.forEach(r => refs.add(r)));
          DOCTRINAS.forEach(d => d.versiculosChave?.forEach(v => refs.add(v)));
          results = [...refs].filter(r => r.toLowerCase().includes(q)).map(r => ({ referencia: r }));
          break;
        }
      }
      setResultados(results);
      setCarregando(false);
    }
  }, [debouncedQuery, tab]);

  const currentTab = TABS.find(t => t.key === tab)!;

  function tabIcon(t: TabDef) {
    return <t.icon className="h-4 w-4" />;
  }

  return (
    <div className="space-y-6 fade-in">
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
            {tabIcon(t)}
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={currentTab.placeholder}
          className="w-full border rounded-lg pl-10 pr-4 py-3 text-sm"
          autoFocus
        />
        {carregando && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {resultados.length > 0 && (
        <p className="text-sm text-muted-foreground font-medium">
          {resultados.length} resultado(s) encontrado(s)
        </p>
      )}

      {carregando && tab === "biblia" && (
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
          {tab === "biblia" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <p className="text-xs text-muted-foreground mb-1 font-mono">
                {r.livroNome || r.livro} {r.capitulo}:{r.numero}
              </p>
              <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightText(r.texto || "", query) }} />
            </div>
          ))}

          {tab === "lexico" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-primary">{r.strong}</span>
                <span className="font-mono text-lg">{r.lemma}</span>
                {r.transliteracao && <span className="text-muted-foreground text-sm">({r.transliteracao})</span>}
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${r.idioma === "grego" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"}`}>
                  {r.idioma}
                </span>
              </div>
              {r.classeGramatical && <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{r.classeGramatical}</span>}
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: highlightText(r.definicaoCurta || r.definicao || "", query) }} />
              {r.significado && r.significado.length > 0 && (
                <div className="flex gap-1 mt-1 flex-wrap">
                  {r.significado.map((s: string, j: number) => (
                    <span key={j} className="text-xs bg-muted px-1.5 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              )}
              {r.frequencia && <p className="text-xs text-muted-foreground mt-1">Ocorrências: {r.frequencia}</p>}
            </div>
          ))}

          {tab === "personagens" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{r.nome}</h3>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary">{r.categoria}</span>
              </div>
              {r.nomeOriginal && <p className="text-xs text-muted-foreground mb-1 font-mono">{r.nomeOriginal}</p>}
              <p className="text-sm text-muted-foreground line-clamp-2" dangerouslySetInnerHTML={{ __html: highlightText(r.biografia || "", query) }} />
              {r.significadoNome && <p className="text-xs text-primary mt-1">Significado: {r.significadoNome}</p>}
              {r.referencias && r.referencias.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">Referências: {r.referencias.slice(0, 3).join(", ")}</p>
              )}
            </div>
          ))}

          {tab === "doutrinas" && resultados.map((r: any, i: number) => (
            <div key={r.id || i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{r.nome}</h3>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary">{r.categoria}</span>
              </div>
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: highlightText(r.descricao || "", query) }} />
              <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{r.detalhe}</p>
              {r.versiculosChave && r.versiculosChave.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {r.versiculosChave.slice(0, 4).map((v: string, j: number) => (
                    <span key={j} className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{v}</span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {tab === "referencias" && resultados.map((r: any, i: number) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow flex items-center gap-3">
              <Link2 className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm font-mono">{r.referencia}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
