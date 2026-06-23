"use client";

import { useState, useEffect } from "react";
import { apiPersonagens } from "@/lib/api";
import { Users, Search } from "lucide-react";

export default function PersonagensPage() {
  const [personagens, setPersonagens] = useState<any[]>([]);
  const [selecionado, setSelecionado] = useState<any>(null);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const res = await apiPersonagens.listar(100);
      setPersonagens(res.data || []);
    } catch { console.error("Erro ao carregar personagens"); }
    setCarregando(false);
  }

  async function buscar() {
    if (!busca.trim()) { carregar(); return; }
    try {
      const res = await apiPersonagens.buscar(busca);
      setPersonagens(res.data || []);
    } catch { setPersonagens([]); }
  }

  const filtrados = personagens.filter(p =>
    !busca || p.nomePortugues?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Personagens Bíblicos</h1>
          <p className="text-muted-foreground">Explore as figuras centrais da Escritura</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            onKeyDown={e => e.key === "Enter" && buscar()}
            placeholder="Buscar personagem..."
            className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm"
          />
        </div>
        <button onClick={buscar} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm">
          Buscar
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-72 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          {carregando ? (
            <p className="text-muted-foreground text-sm">Carregando...</p>
          ) : filtrados.map(p => (
            <button
              key={p.id}
              onClick={() => setSelecionado(p)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selecionado?.id === p.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <div className="font-medium">{p.nomePortugues}</div>
              {p.nomeOriginal && <div className="text-xs opacity-70">{p.nomeOriginal}</div>}
            </button>
          ))}
        </div>

        <div className="flex-1">
          {selecionado ? (
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold">{selecionado.nomePortugues}</h2>
              {selecionado.nomeOriginal && (
                <p className="text-muted-foreground">Nome original: {selecionado.nomeOriginal}</p>
              )}
              {selecionado.significadoNome && (
                <p className="text-sm"><strong>Significado:</strong> {selecionado.significadoNome}</p>
              )}
              {selecionado.biografia && (
                <div>
                  <h3 className="font-semibold mb-1">Biografia</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.biografia}</p>
                </div>
              )}
              {selecionado.primeiraMencao && (
                <p className="text-sm"><strong>Primeira menção:</strong> {selecionado.primeiraMencao}</p>
              )}
              {selecionado.ultimaMencao && (
                <p className="text-sm"><strong>Última menção:</strong> {selecionado.ultimaMencao}</p>
              )}
              {selecionado.totalMencoes > 0 && (
                <p className="text-sm"><strong>Menções:</strong> {selecionado.totalMencoes}</p>
              )}
              {selecionado.familia && (
                <div>
                  <h3 className="font-semibold mb-1">Família</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.familia}</p>
                </div>
              )}
              {selecionado.eventosPrincipais && (
                <div>
                  <h3 className="font-semibold mb-1">Eventos Principais</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.eventosPrincipais}</p>
                </div>
              )}
              {selecionado.significadoTeologico && (
                <div>
                  <h3 className="font-semibold mb-1">Significado Teológico</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.significadoTeologico}</p>
                </div>
              )}
              {selecionado.versoesReferencias && (
                <div>
                  <h3 className="font-semibold mb-1">Referências</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.versoesReferencias}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg p-12 text-center text-muted-foreground">
              Selecione um personagem para ver os detalhes
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
