"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiBiblia, apiExegese, apiTeologia, apiLinguistica, apiReferencias } from "@/lib/api";

const LIVROS_AT = [
  "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
  "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
  "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras",
  "Neemias", "Ester", "Jó", "Salmos", "Provérbios",
  "Eclesiastes", "Cantares", "Isaías", "Jeremias", "Lamentações",
  "Ezequiel", "Daniel", "Oséias", "Joel", "Amós",
  "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque",
  "Sofonias", "Ageu", "Zacarias", "Malaquias",
];

const LIVROS_NT = [
  "Mateus", "Marcos", "Lucas", "João", "Atos",
  "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios",
  "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses",
  "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus",
  "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João",
  "3 João", "Judas", "Apocalipse",
];

export default function BibliaPage() {
  const [livroSelecionado, setLivroSelecionado] = useState("João");
  const [capituloSelecionado, setCapituloSelecionado] = useState(1);
  const [versiculos, setVersiculos] = useState<any[]>([]);
  const [versao, setVersao] = useState("ARA");
  const [versoesDisponiveis, setVersoesDisponiveis] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [resultadosBusca, setResultadosBusca] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarCapitulo();
  }, [livroSelecionado, capituloSelecionado, versao]);

  async function carregarCapitulo() {
    setCarregando(true);
    try {
      const res = await apiBiblia.buscarCapitulo(livroSelecionado, capituloSelecionado, versao);
      setVersiculos(res.data || []);
    } catch {
      setVersiculos([]);
    }
    setCarregando(false);
  }

  async function handleBusca() {
    if (!busca.trim()) return;
    setCarregando(true);
    try {
      const res = await apiBiblia.buscarTexto(busca, versao);
      setResultadosBusca(res.data?.versiculos || []);
    } catch {
      setResultadosBusca([]);
    }
    setCarregando(false);
  }

  function selecionarLivro(livro: string) {
    setLivroSelecionado(livro);
    setCapituloSelecionado(1);
    setResultadosBusca([]);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bíblia</h1>

      <div className="flex gap-4">
        <div className="w-64 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Antigo Testamento</h3>
            {LIVROS_AT.map((livro) => (
              <button
                key={livro}
                onClick={() => selecionarLivro(livro)}
                className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                  livroSelecionado === livro ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {livro}
              </button>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Novo Testamento</h3>
            {LIVROS_NT.map((livro) => (
              <button
                key={livro}
                onClick={() => selecionarLivro(livro)}
                className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                  livroSelecionado === livro ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {livro}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: 22 }, (_, i) => i + 1).map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapituloSelecionado(cap)}
                  className={`w-8 h-8 text-xs rounded transition-colors ${
                    capituloSelecionado === cap ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>
            <select
              value={versao}
              onChange={(e) => setVersao(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="ARA">ARA</option>
              <option value="NVI">NVI</option>
              <option value="ARC">ARC</option>
            </select>
          </div>

          <div className="space-y-1">
            {versiculos.map((v: any) => (
              <div
                key={v.id || v.numero}
                className="verse-hover rounded px-2 py-1"
              >
                <span className="verse-number">{v.numero}</span>
                <span>{v.texto}</span>
              </div>
            ))}
          </div>

          {busca && (
            <div className="space-y-4">
              <h3 className="font-semibold">Resultados da Busca</h3>
              {resultadosBusca.map((v: any) => (
                <div key={v.id} className="border-l-2 border-primary pl-4 py-2">
                  <span className="text-sm text-muted-foreground">
                    {v.livro} {v.capitulo}:{v.numero}
                  </span>
                  <p className="mt-1">{v.texto}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
