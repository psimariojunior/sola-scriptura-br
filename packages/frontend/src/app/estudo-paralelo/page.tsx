"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Columns, SplitSquareVertical, Languages } from "lucide-react";

interface Livro {
  id: string;
  nome: string;
  slug: string;
  totalCapitulos: number;
  ordemGeral: number;
}

interface Versiculo {
  id: string;
  numero: number;
  texto: string;
}

export default function EstudoParaleloPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livroSel, setLivroSel] = useState<Livro | null>(null);
  const [capSel, setCapSel] = useState(1);
  const [versiculosAra, setVersiculosAra] = useState<Versiculo[]>([]);
  const [versiculosNvi, setVersiculosNvi] = useState<Versiculo[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [modo, setModo] = useState<"paralelo" | "unido">("paralelo");

  useEffect(() => {
    fetch("/api/v1/biblia/livros")
      .then(r => r.json())
      .then(data => setLivros(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const carregarCapitulo = useCallback(async (livro: Livro, cap: number) => {
    setCarregando(true);
    try {
      const [resAra, resNvi] = await Promise.all([
        fetch(`/api/v1/biblia/livros/${livro.id}/capitulos/${cap}`).then(r => r.json()),
        fetch(`/api/v1/biblia/livros/${livro.id}/capitulos/${cap}`).then(r => r.json()),
      ]);
      setVersiculosAra(Array.isArray(resAra.versiculos) ? resAra.versiculos : []);
      setVersiculosNvi(Array.isArray(resNvi.versiculos) ? resNvi.versiculos : []);
    } catch {
      setVersiculosAra([]);
      setVersiculosNvi([]);
    }
    setCarregando(false);
  }, []);

  useEffect(() => {
    if (livroSel) carregarCapitulo(livroSel, capSel);
  }, [livroSel, capSel, carregarCapitulo]);

  const at = livros.filter(l => l.ordemGeral <= 39);
  const nt = livros.filter(l => l.ordemGeral > 39);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Columns className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Leitura Paralela</h1>
            <p className="text-muted-foreground">Compare traduções lado a lado</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setModo("paralelo")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              modo === "paralelo" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            <SplitSquareVertical className="h-4 w-4 inline mr-1" /> Paralelo
          </button>
          <button
            onClick={() => setModo("unido")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              modo === "unido" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            <BookOpen className="h-4 w-4 inline mr-1" /> Único
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">AT</div>
          {at.map(l => (
            <button
              key={l.id}
              onClick={() => { setLivroSel(l); setCapSel(1); }}
              className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              {l.nome}
            </button>
          ))}
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mt-3 mb-1">NT</div>
          {nt.map(l => (
            <button
              key={l.id}
              onClick={() => { setLivroSel(l); setCapSel(1); }}
              className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              {l.nome}
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1">
          {livroSel && (
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setCapSel(Math.max(1, capSel - 1))}
                disabled={capSel <= 1}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">{livroSel.nome} {capSel}</span>
              <div className="flex gap-1 flex-wrap max-h-20 overflow-y-auto">
                {Array.from({ length: Math.min(livroSel.totalCapitulos, 50) }, (_, i) => i + 1).map(c => (
                  <button
                    key={c}
                    onClick={() => setCapSel(c)}
                    className={`w-6 h-6 text-[10px] rounded ${
                      capSel === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCapSel(Math.min(livroSel.totalCapitulos, capSel + 1))}
                disabled={capSel >= livroSel.totalCapitulos}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {carregando ? (
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-5 h-3 bg-muted rounded" />
                  <div className="flex-1 h-3 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : modo === "paralelo" ? (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                  <Languages className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">ARA</span>
                  <span className="text-xs text-muted-foreground">Atualizada Revisada Ampliada</span>
                </div>
                {versiculosAra.map(v => (
                  <div key={v.id} className="flex gap-2 py-1 hover:bg-accent/50 rounded px-2 -mx-2">
                    <span className="text-xs text-muted-foreground font-mono w-4 text-right flex-shrink-0">{v.numero}</span>
                    <p className="text-sm leading-relaxed">{v.texto}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                  <Languages className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold">NVI</span>
                  <span className="text-xs text-muted-foreground">Nova Versão Internacional</span>
                </div>
                {versiculosNvi.map(v => (
                  <div key={v.id} className="flex gap-2 py-1 hover:bg-accent/50 rounded px-2 -mx-2">
                    <span className="text-xs text-muted-foreground font-mono w-4 text-right flex-shrink-0">{v.numero}</span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{v.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl space-y-1">
              {versiculosAra.map(v => (
                <div key={v.id} className="flex gap-2 py-1 hover:bg-accent/50 rounded px-2 -mx-2">
                  <span className="text-xs text-muted-foreground font-mono w-4 text-right flex-shrink-0">{v.numero}</span>
                  <p className="text-sm leading-relaxed">{v.texto}</p>
                </div>
              ))}
            </div>
          )}

          {!livroSel && (
            <div className="text-center py-12 text-muted-foreground">
              <Columns className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Selecione um livro para comparar traduções</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
