"use client";

import { useState, useMemo } from "react";
import { Users, Search, ChevronRight, Quote, BookOpen, ChevronDown, ChevronUp, X } from "lucide-react";
import { PERSONAGENS, type Personagem } from "@/lib/personagens-data";

const CATEGORIAS = Array.from(new Set(PERSONAGENS.map(p => p.categoria))).sort();

const CATEGORIA_CORES: Record<string, string> = {
  "Figura do AT": "#6b7280",
  "Patriarca": "#8b5cf6",
  "Líder": "#3b82f6",
  "Sacerdote": "#06b6d4",
  "Profetisa": "#ec4899",
  "Herói": "#f59e0b",
  "Juiz": "#10b981",
  "Rei": "#ef4444",
  "Profeta": "#f97316",
  "Figura do NT": "#14b8a6",
};

export default function PersonagensPage() {
  const [selecionado, setSelecionado] = useState<Personagem | null>(null);
  const [busca, setBusca] = useState("");
  const [catFiltro, setCatFiltro] = useState("");

  const filtrados = useMemo(() => {
    return PERSONAGENS.filter(p => {
      const matchBusca = !busca ||
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.nomeOriginal.toLowerCase().includes(busca.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busca.toLowerCase());
      const matchCat = !catFiltro || p.categoria === catFiltro;
      return matchBusca && matchCat;
    });
  }, [busca, catFiltro]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Personagens Bíblicos</h1>
          <p className="text-muted-foreground">{PERSONAGENS.length} personagens da Escritura</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar por nome, transliteração ou categoria..."
          className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
        />
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => setCatFiltro("")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !catFiltro
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border hover:bg-accent"
          }`}
        >
          Todos ({PERSONAGENS.length})
        </button>
        {CATEGORIAS.map(cat => {
          const count = PERSONAGENS.filter(p => p.categoria === cat).length;
          const cor = CATEGORIA_CORES[cat] || "#6b7280";
          return (
            <button
              key={cat}
              onClick={() => setCatFiltro(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                catFiltro === cat
                  ? "text-white shadow-sm"
                  : "border hover:bg-accent"
              }`}
              style={catFiltro === cat ? { backgroundColor: cor } : { borderColor: cor, color: cor }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="flex gap-6 min-h-[60vh]">
        <div className="w-80 space-y-1 overflow-y-auto max-h-[calc(100vh-240px)] border rounded-lg p-2">
          {filtrados.length === 0 && (
            <p className="text-center text-muted-foreground py-8 text-sm">Nenhum personagem encontrado</p>
          )}
          {filtrados.map(p => (
            <button
              key={p.id}
              onClick={() => setSelecionado(p)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                selecionado?.id === p.id
                  ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/30"
                  : "hover:bg-accent"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{p.nome}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ backgroundColor: CATEGORIA_CORES[p.categoria] || "#6b7280" }}
                    />
                    <span className="text-xs opacity-60 truncate">{p.nomeOriginal}</span>
                  </div>
                </div>
                <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${
                  selecionado?.id === p.id ? "translate-x-0.5 text-primary" : "opacity-40"
                }`} />
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1">
          {selecionado ? (
            <div className="border rounded-lg p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{selecionado.nome}</h2>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: CATEGORIA_CORES[selecionado.categoria] || "#6b7280" }}
                    >
                      {selecionado.categoria}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 font-mono text-sm">{selecionado.nomeOriginal}</p>
                </div>
              </div>

              {selecionado.significadoNome && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <BookOpen className="h-3.5 w-3.5" />
                  Significado: {selecionado.significadoNome}
                </div>
              )}

              {selecionado.biografia && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Biografia</h3>
                  <p className="text-sm leading-relaxed">{selecionado.biografia}</p>
                </div>
              )}

              {selecionado.eventosPrincipais.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Linha do Tempo</h3>
                  <div className="space-y-2">
                    {selecionado.eventosPrincipais.map((evento, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary/60 ring-2 ring-background" />
                          {i < selecionado.eventosPrincipais.length - 1 && (
                            <div className="w-px h-full min-h-[1.5rem] bg-border" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground pb-2">{evento}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selecionado.primeiraMencao && (
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Primeira Menção</p>
                    <p className="text-sm font-medium font-mono">{selecionado.primeiraMencao}</p>
                  </div>
                )}
              </div>

              {selecionado.referencias.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Referências Bíblicas</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selecionado.referencias.map((ref, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-mono bg-secondary/50 text-secondary-foreground border">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selecionado.citacoesChave && selecionado.citacoesChave.length > 0 && (
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold mb-2 flex items-center gap-1.5">
                    <Quote className="h-4 w-4" />
                    Citações-chave
                  </h3>
                  <ul className="space-y-2">
                    {selecionado.citacoesChave.map((cit, i) => (
                      <li key={i} className="text-sm italic text-muted-foreground pl-3 border-l-2 border-primary/30">
                        &ldquo;{cit}&rdquo;
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selecionado.parentes && Object.keys(selecionado.parentes).filter(k => (selecionado.parentes as any)[k]).length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Parentes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selecionado.parentes.pai && (
                      <div className="border rounded p-2">
                        <p className="text-xs text-muted-foreground">Pai</p>
                        <p className="text-sm font-medium">{selecionado.parentes.pai}</p>
                      </div>
                    )}
                    {selecionado.parentes.mae && (
                      <div className="border rounded p-2">
                        <p className="text-xs text-muted-foreground">Mãe</p>
                        <p className="text-sm font-medium">{selecionado.parentes.mae}</p>
                      </div>
                    )}
                    {selecionado.parentes.conjugue && (
                      <div className="border rounded p-2">
                        <p className="text-xs text-muted-foreground">Cônjuge</p>
                        <p className="text-sm font-medium">{selecionado.parentes.conjugue}</p>
                      </div>
                    )}
                    {selecionado.parentes.filhos && (
                      <div className="border rounded p-2">
                        <p className="text-xs text-muted-foreground">Filhos</p>
                        <p className="text-sm font-medium">{selecionado.parentes.filhos}</p>
                      </div>
                    )}
                    {selecionado.parentes.irmaos && (
                      <div className="border rounded p-2">
                        <p className="text-xs text-muted-foreground">Irmãos</p>
                        <p className="text-sm font-medium">{selecionado.parentes.irmaos}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selecionado.notasAdicionais && (
                <div>
                  <h3 className="font-semibold mb-2">Notas Adicionais</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.notasAdicionais}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg p-12 text-center text-muted-foreground h-full flex items-center justify-center">
              <div className="space-y-3">
                <Users className="h-12 w-12 mx-auto opacity-20" />
                <p>Selecione um personagem para ver os detalhes</p>
                <p className="text-xs opacity-60">{filtrados.length} personagens na lista atual</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
