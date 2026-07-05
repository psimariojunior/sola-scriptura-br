"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Columns, SplitSquareVertical, Languages, AlertCircle } from "lucide-react";
import { getBookId } from "@/lib/bolls-api";

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

interface Traducao {
  id: string;
  sigla: string;
  nome: string;
  ativo: boolean;
}

export default function EstudoParaleloPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [traducoes, setTraducoes] = useState<Traducao[]>([]);
  const [livroSel, setLivroSel] = useState<Livro | null>(null);
  const [capSel, setCapSel] = useState(1);
  const [versiculosAra, setVersiculosAra] = useState<Versiculo[]>([]);
  const [versiculosNvi, setVersiculosNvi] = useState<Versiculo[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [modo, setModo] = useState<"paralelo" | "unido" | "intercalado">("paralelo");

  useEffect(() => {
    fetch("/api/v1/biblia/livros")
      .then(r => r.json())
      .then(data => setLivros(Array.isArray(data) ? data : []))
      .catch(() => {});
    fetch("/api/v1/biblia/traducoes")
      .then(r => r.json())
      .then(data => setTraducoes(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const traducaoDisponivel = (sigla: string) => traducoes.some(t => t.sigla === sigla);
  const apenasAra = traducaoDisponivel("ARA") && !traducaoDisponivel("NVI");

  const [temNvi, setTemNvi] = useState<boolean>(false);
  const [nviCarregando, setNviCarregando] = useState(false);

  const carregarCapitulo = useCallback(async (livro: Livro, cap: number) => {
    setCarregando(true);
    try {
      // Load ARA from backend
      const res = await fetch(`/api/v1/biblia/livros/${livro.id}/capitulos/${cap}`).then(r => r.json());
      const versiculos = Array.isArray(res.versiculos) ? res.versiculos : [];
      setVersiculosAra(versiculos);
      setVersiculosNvi(versiculos); // fallback: same as ARA

      // Try to load NVI from bolls.life
      setNviCarregando(true);
      const bookId = getBookId(livro.nome);
      if (bookId) {
        try {
          const nviUrl = `https://bolls.life/get-chapter/NVI/${bookId}/${cap}/`;
          const nviRes = await fetch(nviUrl);
          if (nviRes.ok) {
            const nviData = await nviRes.json();
            if (Array.isArray(nviData) && nviData.length > 0) {
              const nviVerses = nviData.map((v: any, i: number) => ({
                id: `nvi-${bookId}-${cap}-${i + 1}`,
                numero: i + 1,
                texto: typeof v === "string" ? v : v?.text ?? "",
              }));
              setVersiculosNvi(nviVerses);
              setTemNvi(true);
            }
          }
        } catch { setTemNvi(false); }
      }
      setNviCarregando(false);
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
            onClick={() => setModo("intercalado")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              modo === "intercalado" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            <Columns className="h-4 w-4 inline mr-1" /> Intercalado
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
              <div className="space-y-1 bg-blue-500/[0.03] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-200">
                  <Languages className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold">ARA</span>
                  <span className="text-xs text-muted-foreground">Almeida Revista e Atualizada</span>
                </div>
                {versiculosAra.map(v => (
                  <div key={v.id} className="flex gap-2 py-1 hover:bg-accent/50 rounded px-2 -mx-2 transition-colors">
                    <span className="text-xs text-muted-foreground font-mono w-4 text-right flex-shrink-0">{v.numero}</span>
                    <p className="text-sm leading-relaxed">{v.texto}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1 bg-green-500/[0.03] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-200">
                  <Languages className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold">NVI</span>
                  <span className="text-xs text-muted-foreground">Nova Versão Internacional</span>
                </div>
                {nviCarregando ? (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-3">
                    <p className="text-xs text-blue-600">Buscando texto NVI...</p>
                  </div>
                ) : temNvi ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-3">
                    <p className="text-xs text-green-700">NVI carregada com sucesso</p>
                  </div>
                ) : (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      <p className="text-xs text-amber-700">Texto NVI não disponível. Exibindo ARA como referência.</p>
                    </div>
                  </div>
                )}
                {versiculosNvi.map(v => (
                  <div key={v.id} className="flex gap-2 py-1 hover:bg-accent/50 rounded px-2 -mx-2 transition-colors">
                    <span className="text-xs text-muted-foreground font-mono w-4 text-right flex-shrink-0">{v.numero}</span>
                    <p className={`text-sm leading-relaxed ${temNvi ? "" : "text-muted-foreground"}`}>{v.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : modo === "intercalado" ? (
            <div className="max-w-3xl space-y-2">
              {versiculosAra.map(v => (
                <div key={v.id} className="flex gap-3 py-1.5 hover:bg-accent/30 rounded px-2 -mx-2 transition-colors">
                  <span className="text-xs text-muted-foreground font-mono w-5 text-right flex-shrink-0 mt-0.5">{v.numero}</span>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{v.texto}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 italic">ARA — Almeida Revista e Atualizada</p>
                  </div>
                </div>
              ))}
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
