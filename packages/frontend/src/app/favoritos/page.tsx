"use client";

import { useState, useEffect } from "react";
import { BookOpen, Heart, StickyNote, Plus, Trash2, Star } from "lucide-react";

interface Favorito {
  id: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  data: string;
}

interface Nota {
  id: string;
  titulo: string;
  conteudo: string;
  livro?: string;
  capitulo?: number;
  versiculo?: number;
  data: string;
}

export default function FavoritosPage() {
  const [tab, setTab] = useState<"favoritos" | "notas">("favoritos");
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [notaEdit, setNotaEdit] = useState<Nota | null>(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoConteudo, setNovoConteudo] = useState("");

  useEffect(() => {
    const favs = localStorage.getItem("bible-scholar-favorites");
    const notes = localStorage.getItem("bible-scholar-notes");
    if (favs) setFavoritos(JSON.parse(favs));
    if (notes) setNotas(JSON.parse(notes));
  }, []);

  function removerFavorito(id: string) {
    const novos = favoritos.filter(f => f.id !== id);
    setFavoritos(novos);
    localStorage.setItem("bible-scholar-favorites", JSON.stringify(novos));
  }

  function removerNota(id: string) {
    const novas = notas.filter(n => n.id !== id);
    setNotas(novas);
    localStorage.setItem("bible-scholar-notes", JSON.stringify(novas));
  }

  function salvarNota() {
    if (!novoTitulo.trim()) return;
    const novaNota: Nota = {
      id: Date.now().toString(),
      titulo: novoTitulo,
      conteudo: novoConteudo,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    const novas = [...notas, novaNota];
    setNotas(novas);
    localStorage.setItem("bible-scholar-notes", JSON.stringify(novas));
    setNovoTitulo("");
    setNovoConteudo("");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Star className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Meus Favoritos e Notas</h1>
          <p className="text-muted-foreground">Salve versículos e anotações pessoais</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("favoritos")}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "favoritos" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
          }`}
        >
          <Heart className="h-4 w-4" /> Favoritos ({favoritos.length})
        </button>
        <button
          onClick={() => setTab("notas")}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "notas" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
          }`}
        >
          <StickyNote className="h-4 w-4" /> Notas ({notas.length})
        </button>
      </div>

      {tab === "favoritos" && (
        <div className="space-y-3">
          {favoritos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Nenhum favorito ainda</p>
              <p className="text-sm mt-1">Adicione versículos favoritos na Bíblia</p>
            </div>
          ) : (
            favoritos.map(f => (
              <div key={f.id} className="border rounded-lg p-4 flex items-start justify-between hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{f.livro} {f.capitulo}:{f.versiculo}</p>
                  <p className="text-sm italic">"{f.texto}"</p>
                  <p className="text-xs text-muted-foreground mt-1">Salvo em {f.data}</p>
                </div>
                <button onClick={() => removerFavorito(f.id)} className="p-1 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "notas" && (
        <div className="space-y-4">
          <div className="border rounded-lg p-4 space-y-3">
            <input
              value={novoTitulo}
              onChange={e => setNovoTitulo(e.target.value)}
              placeholder="Título da nota..."
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <textarea
              value={novoConteudo}
              onChange={e => setNovoConteudo(e.target.value)}
              placeholder="Escreva sua anotação..."
              className="w-full border rounded px-3 py-2 text-sm h-24 resize-none"
            />
            <button
              onClick={salvarNota}
              disabled={!novoTitulo.trim()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm disabled:opacity-50 flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Salvar Nota
            </button>
          </div>

          {notas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <StickyNote className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Nenhuma nota ainda</p>
            </div>
          ) : (
            notas.map(n => (
              <div key={n.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{n.titulo}</h3>
                  <button onClick={() => removerNota(n.id)} className="p-1 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{n.conteudo}</p>
                <p className="text-xs text-muted-foreground mt-2">{n.data}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
