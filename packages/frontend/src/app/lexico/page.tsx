"use client";

import { useState, useEffect } from "react";
import { Languages, Search, BookOpen, Hash, ArrowUpDown } from "lucide-react";

export default function LexicoPage() {
  const [palavras, setPalavras] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<"grego" | "hebraico">("grego");
  const [ordenar, setOrdenar] = useState<"frequencia" | "alfabeto">("frequencia");
  const [palavraSel, setPalavraSel] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    fetch(`/api/v1/${tipo === "grego" ? "grego" : "hebraico"}/frequentes`)
      .then(r => r.json())
      .then(data => {
        setPalavras(Array.isArray(data) ? data : []);
        setCarregando(false);
      })
      .catch(() => {
        setPalavras([]);
        setCarregando(false);
      });
  }, [tipo]);

  const filtradas = busca
    ? palavras.filter(p =>
        p.palavraOriginal?.toLowerCase().includes(busca.toLowerCase()) ||
        p.definicaoCurta?.toLowerCase().includes(busca.toLowerCase()) ||
        p.strong?.toLowerCase().includes(busca.toLowerCase()) ||
        p.classeGramatical?.toLowerCase().includes(busca.toLowerCase())
      )
    : palavras;

  const ordenadas = [...filtradas].sort((a, b) => {
    if (ordenar === "frequencia") {
      return (b.frequenciaNt || b.frequenciaAt || 0) - (a.frequenciaNt || a.frequenciaAt || 0);
    }
    return (a.palavraOriginal || "").localeCompare(b.palavraOriginal || "");
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Languages className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Léxico Bíblico</h1>
          <p className="text-muted-foreground">{palavras.length} palavras {tipo === "grego" ? "gregas" : "hebraicas"} com Strong's</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTipo("grego")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tipo === "grego" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"}`}>
          Grego ({tipo === "grego" ? palavras.length : "..."})
        </button>
        <button onClick={() => setTipo("hebraico")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tipo === "hebraico" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"}`}>
          Hebraico ({tipo === "hebraico" ? palavras.length : "..."})
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por palavra, Strong's ou definição..." className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm" />
        </div>
        <button onClick={() => setOrdenar(ordenar === "frequencia" ? "alfabeto" : "frequencia")} className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm hover:bg-accent">
          <ArrowUpDown className="h-4 w-4" />
          {ordenar === "frequencia" ? "Frequência" : "A-Z"}
        </button>
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse space-y-2">
              <div className="h-5 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordenadas.map((p, i) => (
            <div key={p.id || i} onClick={() => setPalavraSel(p)} className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${palavraSel?.id === p.id ? "ring-2 ring-primary" : ""}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-primary">{p.strong}</span>
                {p.frequenciaNt && <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">{p.frequenciaNt}x NT</span>}
                {p.frequenciaAt && <span className="text-xs bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded">{p.frequenciaAt}x AT</span>}
              </div>
              <p className="text-lg font-mono mb-1">{p.palavraOriginal}</p>
              {p.transliteracao && p.transliteracao !== p.palavraOriginal && (
                <p className="text-sm text-muted-foreground mb-1">({p.transliteracao})</p>
              )}
              {p.classeGramatical && (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{p.classeGramatical}</span>
              )}
              <p className="text-sm text-muted-foreground line-clamp-2">{p.definicaoCurta}</p>
            </div>
          ))}
        </div>
      )}

      {!carregando && ordenadas.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Nenhuma palavra encontrada</p>
      )}

      {palavraSel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setPalavraSel(null)}>
          <div className="bg-background rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold">{palavraSel.palavraOriginal}</span>
                  <span className="text-sm text-muted-foreground">{palavraSel.strong}</span>
                </div>
                {palavraSel.transliteracao && palavraSel.transliteracao !== palavraSel.palavraOriginal && (
                  <p className="text-sm text-muted-foreground mt-1">Transliteração: {palavraSel.transliteracao}</p>
                )}
              </div>
              <button onClick={() => setPalavraSel(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {palavraSel.classeGramatical && <span className="px-2 py-1 rounded-full text-xs bg-secondary">{palavraSel.classeGramatical}</span>}
              {palavraSel.frequenciaNt && <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{palavraSel.frequenciaNt} ocorrências no NT</span>}
              {palavraSel.frequenciaAt && <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-600">{palavraSel.frequenciaAt} ocorrências no AT</span>}
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Definição</h3>
              <p className="text-sm leading-relaxed">{palavraSel.definicaoCurta}</p>
            </div>

            {palavraSel.definicaoCompleta && (
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold mb-2 text-primary">Definição Completa</h3>
                <p className="text-sm leading-relaxed">{palavraSel.definicaoCompleta}</p>
              </div>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Strong's:</strong> {palavraSel.strong}</p>
              <p><strong>Classe:</strong> {palavraSel.classeGramatical}</p>
              {palavraSel.frequenciaNt && <p><strong>Frequência NT:</strong> {palavraSel.frequenciaNt} vezes</p>}
              {palavraSel.frequenciaAt && <p><strong>Frequência AT:</strong> {palavraSel.frequenciaAt} vezes</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
