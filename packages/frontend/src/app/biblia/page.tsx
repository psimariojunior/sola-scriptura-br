"use client";

import { useState, useEffect } from "react";
import { apiBiblia } from "@/lib/api";

export default function BibliaPage() {
  const [livros, setLivros] = useState<any[]>([]);
  const [livroSelecionado, setLivroSelecionado] = useState<any>(null);
  const [capituloSelecionado, setCapituloSelecionado] = useState(1);
  const [versiculos, setVersiculos] = useState<any[]>([]);
  const [traducoes, setTraducoes] = useState<any[]>([]);
  const [traducaoId, setTraducaoId] = useState("");
  const [busca, setBusca] = useState("");
  const [resultadosBusca, setResultadosBusca] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (livroSelecionado) {
      carregarCapitulo();
    }
  }, [livroSelecionado, capituloSelecionado, traducaoId]);

  async function carregarDados() {
    try {
      const [resLivros, resTraducoes] = await Promise.all([
        apiBiblia.listarLivros(),
        apiBiblia.listarTraducoes(),
      ]);
      const livrosData = resLivros.data || [];
      setLivros(livrosData);
      const trads = resTraducoes.data || [];
      setTraducoes(trads);
      if (trads.length > 0) setTraducaoId(trads[0].id);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setErro("Erro ao carregar dados da Bíblia");
    }
  }

  async function carregarCapitulo() {
    if (!livroSelecionado || !traducaoId) return;
    setCarregando(true);
    setErro("");
    try {
      const res = await apiBiblia.buscarCapitulo(livroSelecionado.id, capituloSelecionado);
      setVersiculos(res.data?.versiculos || res.data || []);
    } catch {
      setVersiculos([]);
      setErro("Erro ao carregar capítulo");
    }
    setCarregando(false);
  }

  async function handleBusca() {
    if (!busca.trim() || !traducaoId) return;
    setCarregando(true);
    setErro("");
    try {
      const res = await apiBiblia.pesquisar(busca, traducaoId);
      setResultadosBusca(res.data || []);
    } catch {
      setResultadosBusca([]);
    }
    setCarregando(false);
  }

  const at = livros.filter((l: any) => l.ordemGeral <= 39);
  const nt = livros.filter((l: any) => l.ordemGeral > 39);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bíblia</h1>

      <div className="flex items-center gap-4">
        <select
          value={traducaoId}
          onChange={(e) => setTraducaoId(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          {traducoes.map((t: any) => (
            <option key={t.id} value={t.id}>{t.nome || t.sigla}</option>
          ))}
        </select>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleBusca()}
          placeholder="Pesquisar texto bíblico..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button onClick={handleBusca} className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm">
          Buscar
        </button>
      </div>

      {erro && <p className="text-red-500 text-sm">{erro}</p>}

      <div className="flex gap-4">
        <div className="w-64 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Antigo Testamento</h3>
            {at.map((livro: any) => (
              <button
                key={livro.id}
                onClick={() => { setLivroSelecionado(livro); setCapituloSelecionado(1); setResultadosBusca([]); }}
                className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                  livroSelecionado?.id === livro.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {livro.nome}
              </button>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Novo Testamento</h3>
            {nt.map((livro: any) => (
              <button
                key={livro.id}
                onClick={() => { setLivroSelecionado(livro); setCapituloSelecionado(1); setResultadosBusca([]); }}
                className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                  livroSelecionado?.id === livro.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {livro.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {livroSelecionado && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">{livroSelecionado.nome}</span>
              {Array.from({ length: livroSelecionado.totalCapitulos || 22 }, (_, i) => i + 1).map((cap) => (
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
          )}

          {carregando && <p className="text-muted-foreground">Carregando...</p>}

          <div className="space-y-1">
            {versiculos.length === 0 && !carregando && livroSelecionado && (
              <p className="text-muted-foreground text-sm py-4">
                Nenhum versículo encontrado para {livroSelecionado.nome} {capituloSelecionado}.
              </p>
            )}
            {versiculos.map((v: any) => (
              <div key={v.id || v.numero} className="verse-hover rounded px-2 py-1">
                <span className="verse-number font-semibold mr-1">{v.numero}</span>
                <span>{v.texto}</span>
              </div>
            ))}
          </div>

          {resultadosBusca.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Resultados da Busca</h3>
              {resultadosBusca.map((v: any) => (
                <div key={v.id} className="border-l-2 border-primary pl-4 py-2">
                  <span className="text-sm text-muted-foreground">
                    {v.livro?.nome || v.livro} {v.capitulo}:{v.numero}
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
