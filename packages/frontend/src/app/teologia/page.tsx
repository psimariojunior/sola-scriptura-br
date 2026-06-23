"use client";

import { useState, useEffect } from "react";
import { BookOpen, X } from "lucide-react";

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
        fetch("/api/v1/teologia/categorias").then(r => r.json()),
        fetch("/api/v1/teologia/doutrinas/").then(r => r.json()),
      ]);
      setCategorias(Array.isArray(resCat) ? resCat : []);
      setDoutrinas(Array.isArray(resDoug) ? resDoug : []);
    } catch { 
      setCategorias([]); 
      setDoutrinas([]); 
    }
    setCarregando(false);
  }

  const filtradas = catFiltro
    ? doutrinas.filter(d => d.categoria === catFiltro || d.categoriaId === catFiltro || d.categoria?.slug === catFiltro)
    : doutrinas;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Teologia Sistemática</h1>
          <p className="text-muted-foreground">{doutrinas.length} doutrinas fundamentais da fé</p>
        </div>
      </div>

      {categorias.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCatFiltro("")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !catFiltro ? "bg-primary text-primary-foreground" : "border hover:bg-accent"
            }`}
          >
            Todas
          </button>
          {categorias.map(c => (
            <button
              key={c.id || c.slug}
              onClick={() => setCatFiltro(c.slug || c.nome)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                catFiltro === (c.slug || c.nome) ? "bg-primary text-primary-foreground" : "border hover:bg-accent"
              }`}
            >
              {c.nome}
            </button>
          ))}
        </div>
      )}

      {carregando ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-5 space-y-3 animate-pulse">
              <div className="h-6 bg-muted rounded w-2/3" />
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtradas.map(d => (
            <div
              key={d.id || d.slug}
              onClick={() => setSelecionada(d)}
              className="border rounded-lg p-5 cursor-pointer hover:shadow-md transition-all space-y-3 group"
            >
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{d.nome}</h3>
              {d.categoria && (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary font-medium">
                  {typeof d.categoria === 'string' ? d.categoria : d.categoria.nome || d.categoria}
                </span>
              )}
              {d.descricao && (
                <p className="text-sm text-muted-foreground line-clamp-3">{d.descricao}</p>
              )}
              {d.fundamentoScriptureiro && (
                <p className="text-xs text-primary font-medium">{d.fundamentoScriptureiro}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selecionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelecionada(null)}>
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 space-y-5 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selecionada.nome}</h2>
                {selecionada.categoria && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-secondary font-medium">
                    {typeof selecionada.categoria === 'string' ? selecionada.categoria : selecionada.categoria?.nome}
                  </span>
                )}
              </div>
              <button onClick={() => setSelecionada(null)} className="p-2 hover:bg-accent rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {selecionada.descricao && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Definição</h3>
                <p className="text-sm leading-relaxed">{selecionada.descricao}</p>
              </div>
            )}

            {selecionada.fundamentoScriptureiro && (
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold mb-2 text-primary">Fundamento Bíblico</h3>
                <p className="text-sm font-mono">{selecionada.fundamentoScriptureiro}</p>
              </div>
            )}

            {selecionada.referenciasChave && (
              <div>
                <h3 className="font-semibold mb-2">Referências</h3>
                <p className="text-sm text-muted-foreground">{selecionada.referenciasChave}</p>
              </div>
            )}

            {selecionada.explicacao && (
              <div>
                <h3 className="font-semibold mb-2">Explicação Detalhada</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selecionada.explicacao}</p>
              </div>
            )}

            {selecionada.tradicoes && (
              <div>
                <h3 className="font-semibold mb-2">Tradições</h3>
                <p className="text-sm text-muted-foreground">{selecionada.tradicoes}</p>
              </div>
            )}

            {selecionada.controversias && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Controvérsias</h3>
                <p className="text-sm text-muted-foreground">{selecionada.controversias}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
