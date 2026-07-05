"use client";

import { useState, useEffect, useMemo } from "react";
import { BookOpen, X, ChevronRight, ChevronDown, ChevronUp, ExternalLink, Link2, Hash, Users, MessageSquare } from "lucide-react";
import { DOCTRINAS, CATEGORIAS, type Doutrina } from "@/lib/doctrines-data";

function parseVerse(ref: string): { book: string; chapter: string; verse: string } | null {
  const m = ref.match(/^([A-Za-zÀ-ÿ0-9\s]+?)\s*(\d+):(\d+(?:-\d+)?)/);
  if (!m) return null;
  return { book: m[1].trim(), chapter: m[2], verse: m[3] };
}

function VerseLink({ ref }: { ref: string }) {
  const parsed = parseVerse(ref);
  if (!parsed) return <span className="text-sm font-mono">{ref}</span>;
  const query = `${parsed.book}+${parsed.chapter}%3A${parsed.verse}`;
  return (
    <a
      href={`https://www.biblegateway.com/passage/?search=${query}&version=ARA`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
    >
      {ref}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export default function TeologiaPage() {
  const [catFiltro, setCatFiltro] = useState("");
  const [selecionada, setSelecionada] = useState<Doutrina | null>(null);
  const [busca, setBusca] = useState("");
  const [objExpanded, setObjExpanded] = useState<number | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const found = DOCTRINAS.find(d => d.id === hash);
      if (found) setSelecionada(found);
    }
  }, []);

  useEffect(() => {
    if (selecionada) {
      window.location.hash = selecionada.id;
    } else {
      window.location.hash = "";
    }
  }, [selecionada]);

  const filtradas = useMemo(() => {
    return DOCTRINAS.filter(d => {
      const matchCat = !catFiltro || d.categoria === catFiltro;
      const matchBusca = !busca ||
        d.nome.toLowerCase().includes(busca.toLowerCase()) ||
        d.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        d.fundamento.toLowerCase().includes(busca.toLowerCase()) ||
        (d.autoridadesTeologicas?.some(a => a.toLowerCase().includes(busca.toLowerCase())));
      return matchCat && matchBusca;
    });
  }, [catFiltro, busca]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Teologia Sistemática</h1>
          <p className="text-muted-foreground">{DOCTRINAS.length} doutrinas fundamentais da fé cristã</p>
        </div>
      </div>

      <input
        value={busca}
        onChange={e => setBusca(e.target.value)}
        placeholder="Buscar doutrina, teólogo ou fundamento..."
        className="w-full border rounded-lg px-4 py-2 text-sm"
      />

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setCatFiltro("")} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!catFiltro ? "bg-primary text-primary-foreground" : "border hover:bg-accent"}`}>
          Todas ({DOCTRINAS.length})
        </button>
        {CATEGORIAS.map(c => {
          const count = DOCTRINAS.filter(d => d.categoria === c.id).length;
          return (
            <button key={c.id} onClick={() => setCatFiltro(c.id)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${catFiltro === c.id ? "text-white" : "border hover:bg-accent"}`} style={catFiltro === c.id ? { backgroundColor: c.cor } : {}}>
              {c.nome} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtradas.map(d => {
          const cat = CATEGORIAS.find(c => c.id === d.categoria);
          return (
            <div key={d.id} onClick={() => setSelecionada(d)} className="border rounded-lg p-5 cursor-pointer hover:shadow-md transition-all space-y-3 group">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.cor }} />
                <span className="text-xs text-muted-foreground">{cat?.nome}</span>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{d.nome}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{d.descricao}</p>
              <p className="text-xs text-primary font-medium font-mono">{d.fundamento}</p>
              {d.autoridadesTeologicas && d.autoridadesTeologicas.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span className="truncate">{d.autoridadesTeologicas.join(", ")}</span>
                </div>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>

      {selecionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setSelecionada(null); setObjExpanded(null); }}>
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 space-y-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selecionada.nome}</h2>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: CATEGORIAS.find(c => c.id === selecionada.categoria)?.cor }}>
                  {CATEGORIAS.find(c => c.id === selecionada.categoria)?.nome}
                </span>
              </div>
              <button onClick={() => { setSelecionada(null); setObjExpanded(null); }} className="p-2 hover:bg-accent rounded-lg"><X className="h-5 w-5" /></button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Definição</h3>
              <p className="text-sm leading-relaxed">{selecionada.descricao}</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <h3 className="font-semibold mb-2 text-primary">Fundamento Bíblico</h3>
              <p className="text-sm font-mono">&ldquo;{selecionada.fundamento}&rdquo;</p>
            </div>

            {selecionada.versiculosChave.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-1.5">
                  <Link2 className="h-4 w-4" />
                  Versículos-chave
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selecionada.versiculosChave.map((ref, i) => (
                    <VerseLink key={i} ref={ref} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Explicação Detalhada</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selecionada.detalhe}</p>
            </div>

            {selecionada.autoridadesTeologicas && selecionada.autoridadesTeologicas.length > 0 && (
              <div className="bg-secondary/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  Teólogos
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selecionada.autoridadesTeologicas.map((teologo, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border">
                      {teologo}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selecionada.objecoes && selecionada.objecoes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  Objeções e Respostas
                </h3>
                <div className="space-y-2">
                  {selecionada.objecoes.map((obj, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setObjExpanded(objExpanded === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-accent transition-colors"
                      >
                        <span className="flex-1">{obj.objecao}</span>
                        {objExpanded === i ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
                      </button>
                      {objExpanded === i && (
                        <div className="px-4 pb-3 text-sm text-muted-foreground border-t pt-3 leading-relaxed">
                          {obj.resposta}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selecionada.citacoesPatristicas && selecionada.citacoesPatristicas.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800/30">
                <h3 className="font-semibold mb-3 flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <BookOpen className="h-4 w-4" />
                  Citações Patrísticas
                </h3>
                <div className="space-y-3">
                  {selecionada.citacoesPatristicas.map((cit, i) => (
                    <div key={i}>
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        &ldquo;{cit.citacao}&rdquo;
                      </p>
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mt-1">
                        &mdash; {cit.autor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selecionada.topicosRelacionados && selecionada.topicosRelacionados.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-1.5">
                  <Hash className="h-4 w-4" />
                  Tópicos Relacionados
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selecionada.topicosRelacionados.map((topico, i) => {
                    const rel = DOCTRINAS.find(d => d.id === topico);
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const found = DOCTRINAS.find(d => d.id === topico);
                          if (found) { setSelecionada(found); setObjExpanded(null); }
                        }}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {rel?.nome || topico}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
