"use client";

import { useState, useEffect } from "react";
import { apiTeologia } from "@/lib/api";
import { BookOpen } from "lucide-react";

export default function TeologiaPage() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [doutrinas, setDoutrinas] = useState<any[]>([]);
  const [selecionada, setSelecionada] = useState<any>(null);
  const [catFiltro, setCatFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const [resCat, resDoug] = await Promise.all([
        apiTeologia.listarCategorias(),
        apiTeologia.buscarDoutrina("")
      ]);
      setCategorias(resCat.data || []);
      setDoutrinas(resDoug.data || []);
    } catch { console.error("Erro ao carregar teologia"); }
    setCarregando(false);
  }

  const filtradas = catFiltro
    ? doutrinas.filter(d => d.categoria === catFiltro || d.categoriaId === catFiltro)
    : doutrinas;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Teologia Sistemática</h1>
          <p className="text-muted-foreground">Doutrinas fundamentais da fé cristã</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCatFiltro("")}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            !catFiltro ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          Todas
        </button>
        {categorias.map(c => (
          <button
            key={c.id || c.slug}
            onClick={() => setCatFiltro(c.slug || c.nome)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              catFiltro === (c.slug || c.nome) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            }`}
          >
            {c.nome}
          </button>
        ))}
      </div>

      {carregando ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtradas.map(d => (
            <div
              key={d.id || d.slug}
              onClick={() => setSelecionada(d)}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow space-y-2"
            >
              <h3 className="font-semibold text-lg">{d.nome}</h3>
              {d.categoria && (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary">
                  {d.categoria}
                </span>
              )}
              {d.descricao && (
                <p className="text-sm text-muted-foreground line-clamp-3">{d.descricao}</p>
              )}
              {d.fundamentoScriptureiro && (
                <p className="text-xs text-primary">{d.fundamentoScriptureiro}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selecionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelecionada(null)}>
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold">{selecionada.nome}</h2>
              <button onClick={() => setSelecionada(null)} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
            </div>
            {selecionada.categoria && (
              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary">{selecionada.categoria}</span>
            )}
            {selecionada.descricao && (
              <div><h3 className="font-semibold mb-1">Descrição</h3><p className="text-sm">{selecionada.descricao}</p></div>
            )}
            {selecionada.fundamentoScriptureiro && (
              <div><h3 className="font-semibold mb-1">Fundamento Bíblico</h3><p className="text-sm text-primary">{selecionada.fundamentoScriptureiro}</p></div>
            )}
            {selecionada.referenciasChave && (
              <div><h3 className="font-semibold mb-1">Referências</h3><p className="text-sm text-muted-foreground">{selecionada.referenciasChave}</p></div>
            )}
            {selecionada.explicacao && (
              <div><h3 className="font-semibold mb-1">Explicação</h3><p className="text-sm text-muted-foreground">{selecionada.explicacao}</p></div>
            )}
            {selecionada.tradicoes && (
              <div><h3 className="font-semibold mb-1">Tradições</h3><p className="text-sm text-muted-foreground">{selecionada.tradicoes}</p></div>
            )}
            {selecionada.controversias && (
              <div><h3 className="font-semibold mb-1">Controvérsias</h3><p className="text-sm text-muted-foreground">{selecionada.controversias}</p></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
