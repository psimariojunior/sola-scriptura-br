"use client";

import { useState, useEffect } from "react";
import { Users, Search, ChevronRight } from "lucide-react";

export default function PersonagensPage() {
  const [personagens, setPersonagens] = useState<any[]>([]);
  const [selecionado, setSelecionado] = useState<any>(null);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const res = await fetch("/api/v1/personagens?limite=200");
      const data = await res.json();
      setPersonagens(Array.isArray(data) ? data : []);
    } catch { setPersonagens([]); }
    setCarregando(false);
  }

  const filtrados = personagens.filter(p =>
    !busca || 
    p.nomePortugues?.toLowerCase().includes(busca.toLowerCase()) ||
    p.nomeOriginal?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Personagens Bíblicos</h1>
          <p className="text-muted-foreground">{personagens.length} personagens da Escritura</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar por nome..."
          className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
        />
      </div>

      <div className="flex gap-6 min-h-[60vh]">
        <div className="w-80 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] border rounded-lg p-2">
          {carregando ? (
            <div className="space-y-2 p-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded animate-pulse" />
              ))}
            </div>
          ) : filtrados.length === 0 ? (
            <p className="text-muted-foreground text-sm p-4">Nenhum personagem encontrado</p>
          ) : (
            filtrados.map(p => (
              <button
                key={p.id}
                onClick={() => setSelecionado(p)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                  selecionado?.id === p.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-accent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.nomePortugues}</div>
                    {p.nomeOriginal && (
                      <div className="text-xs opacity-70">{p.nomeOriginal}</div>
                    )}
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-50" />
                </div>
              </button>
            ))
          )}
        </div>

        <div className="flex-1">
          {selecionado ? (
            <div className="border rounded-lg p-6 space-y-5">
              <div>
                <h2 className="text-2xl font-bold">{selecionado.nomePortugues}</h2>
                {selecionado.nomeOriginal && (
                  <p className="text-muted-foreground mt-1">Nome original: {selecionado.nomeOriginal}</p>
                )}
              </div>

              {selecionado.significadoNome && (
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Significado: {selecionado.significadoNome}
                </div>
              )}

              {selecionado.biografia && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Biografia</h3>
                  <p className="text-sm leading-relaxed">{selecionado.biografia}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selecionado.primeiraMencao && (
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Primeira Menção</p>
                    <p className="text-sm font-medium">{selecionado.primeiraMencao}</p>
                  </div>
                )}
                {selecionado.ultimaMencao && (
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Última Menção</p>
                    <p className="text-sm font-medium">{selecionado.ultimaMencao}</p>
                  </div>
                )}
                {selecionado.totalMencoes > 0 && (
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Total de Menções</p>
                    <p className="text-sm font-medium">{selecionado.totalMencoes}</p>
                  </div>
                )}
              </div>

              {selecionado.familia && (
                <div>
                  <h3 className="font-semibold mb-2">Família</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.familia}</p>
                </div>
              )}

              {selecionado.eventosPrincipais && (
                <div>
                  <h3 className="font-semibold mb-2">Eventos Principais</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.eventosPrincipais}</p>
                </div>
              )}

              {selecionado.significadoTeologico && (
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-primary">Significado Teológico</h3>
                  <p className="text-sm">{selecionado.significadoTeologico}</p>
                </div>
              )}

              {selecionado.versoesReferencias && (
                <div>
                  <h3 className="font-semibold mb-2">Referências Bíblicas</h3>
                  <p className="text-sm text-muted-foreground font-mono">{selecionado.versoesReferencias}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg p-12 text-center text-muted-foreground h-full flex items-center justify-center">
              <div className="space-y-2">
                <Users className="h-12 w-12 mx-auto opacity-30" />
                <p>Selecione um personagem para ver os detalhes</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
