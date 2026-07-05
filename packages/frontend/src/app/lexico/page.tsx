"use client";

import { useState, useEffect, useMemo } from "react";
import { Languages, Search, BookOpen, Hash, ArrowUpDown, X, Filter, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { LEXICON_DATA, type LexiconEntry } from "@/lib/lexicon-data";

const PAGE_SIZE = 36;

const CLASSES = Array.from(new Set(LEXICON_DATA.map(e => e.classeGramatical))).sort((a, b) => a.localeCompare(b));

type SortKey = "frequencia" | "alfabeto" | "strong";

export default function LexicoPage() {
  const [busca, setBusca] = useState("");
  const [idioma, setIdioma] = useState<"grego" | "hebraico" | "todas">("todas");
  const [classeFiltro, setClasseFiltro] = useState("");
  const [freqMin, setFreqMin] = useState(0);
  const [freqMax, setFreqMax] = useState(999999);
  const [ordenar, setOrdenar] = useState<SortKey>("frequencia");
  const [palavraSel, setPalavraSel] = useState<LexiconEntry | null>(null);
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    setPagina(0);
  }, [busca, idioma, classeFiltro, freqMin, freqMax, ordenar]);

  const maxFreq = useMemo(() => Math.max(...LEXICON_DATA.map(e => e.frequencia)), []);

  const filtradas = useMemo(() => {
    return LEXICON_DATA.filter(e => {
      if (idioma !== "todas" && e.idioma !== idioma) return false;
      if (classeFiltro && e.classeGramatical !== classeFiltro) return false;
      if (e.frequencia < freqMin || e.frequencia > freqMax) return false;
      if (!busca) return true;
      const q = busca.toLowerCase();
      return (
        e.strong.toLowerCase().includes(q) ||
        e.lemma.toLowerCase().includes(q) ||
        e.transliteracao.toLowerCase().includes(q) ||
        e.definicaoCurta.toLowerCase().includes(q) ||
        (e.definicaoCompleta && e.definicaoCompleta.toLowerCase().includes(q)) ||
        e.classeGramatical.toLowerCase().includes(q) ||
        (e.significado && e.significado.some(s => s.toLowerCase().includes(q))) ||
        (e.usos && e.usos.some(u => u.toLowerCase().includes(q)))
      );
    });
  }, [busca, idioma, classeFiltro, freqMin, freqMax]);

  const ordenadas = useMemo(() => {
    const arr = [...filtradas];
    switch (ordenar) {
      case "frequencia":
        arr.sort((a, b) => b.frequencia - a.frequencia);
        break;
      case "alfabeto":
        arr.sort((a, b) => a.lemma.localeCompare(b.lemma));
        break;
      case "strong":
        arr.sort((a, b) => {
          const parseStrong = (s: string) => {
            const m = s.match(/^([GH])(\d+)$/);
            return m ? { letra: m[1], num: parseInt(m[2]) } : { letra: "Z", num: 999999 };
          };
          const sa = parseStrong(a.strong);
          const sb = parseStrong(b.strong);
          if (sa.letra !== sb.letra) return sa.letra < sb.letra ? -1 : 1;
          return sa.num - sb.num;
        });
        break;
    }
    return arr;
  }, [filtradas, ordenar]);

  const totalPaginas = Math.ceil(ordenadas.length / PAGE_SIZE);
  const paginadas = ordenadas.slice(pagina * PAGE_SIZE, (pagina + 1) * PAGE_SIZE);

  const gregoCount = useMemo(() => LEXICON_DATA.filter(e => e.idioma === "grego").length, []);
  const hebraicoCount = useMemo(() => LEXICON_DATA.filter(e => e.idioma === "hebraico").length, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Languages className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Léxico Bíblico</h1>
          <p className="text-muted-foreground">{LEXICON_DATA.length} palavras ({gregoCount} gregas, {hebraicoCount} hebraicas)</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setIdioma("todas")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${idioma === "todas" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"}`}>
          Todas ({LEXICON_DATA.length})
        </button>
        <button onClick={() => setIdioma("grego")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${idioma === "grego" ? "bg-blue-600 text-white" : "hover:bg-accent border"}`}>
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          Grego ({gregoCount})
        </button>
        <button onClick={() => setIdioma("hebraico")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${idioma === "hebraico" ? "bg-emerald-600 text-white" : "hover:bg-accent border"}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Hebraico ({hebraicoCount})
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar Strong's, lemma, definição, transliteração..." className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm" />
        </div>
        <select
          value={ordenar}
          onChange={e => setOrdenar(e.target.value as SortKey)}
          className="border rounded-lg px-3 py-2 text-sm bg-background"
        >
          <option value="frequencia">Frequência</option>
          <option value="alfabeto">A-Z</option>
          <option value="strong">Strong's</option>
        </select>
        <select
          value={classeFiltro}
          onChange={e => setClasseFiltro(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-background min-w-[130px]"
        >
          <option value="">Todas as classes</option>
          {CLASSES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground flex items-center gap-1"><Filter className="h-3.5 w-3.5" /> Frequência:</span>
        <input
          type="range"
          min={0}
          max={maxFreq}
          value={freqMin}
          onChange={e => setFreqMin(Number(e.target.value))}
          className="w-24"
        />
        <span className="font-mono text-xs text-muted-foreground">{freqMin}</span>
        <span className="text-muted-foreground">até</span>
        <input
          type="range"
          min={0}
          max={maxFreq}
          value={freqMax}
          onChange={e => setFreqMax(Number(e.target.value))}
          className="w-24"
        />
        <span className="font-mono text-xs text-muted-foreground">{freqMax}</span>
        <span className="text-xs text-muted-foreground">({ordenadas.length} resultados)</span>
      </div>

      {ordenadas.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Nenhuma palavra encontrada com os filtros atuais</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginadas.map(e => (
              <div
                key={e.id}
                onClick={() => setPalavraSel(e)}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  palavraSel?.id === e.id ? "ring-2 ring-primary" : ""
                } ${e.idioma === "grego" ? "border-l-blue-400" : "border-l-emerald-400"} border-l-4`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-primary">{e.strong}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    e.idioma === "grego"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  }`}>
                    {e.idioma === "grego" ? "GR" : "HB"}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-auto">{e.frequencia}x</span>
                </div>
                <p className="text-lg font-mono mb-1" lang={e.idioma === "grego" ? "el" : "he"}>{e.lemma}</p>
                {e.transliteracao && e.transliteracao !== e.lemma && (
                  <p className="text-sm text-muted-foreground mb-1 italic">({e.transliteracao})</p>
                )}
                {e.classeGramatical && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{e.classeGramatical}</span>
                )}
                <p className="text-sm text-muted-foreground line-clamp-2">{e.definicaoCurta}</p>
                {e.significado && e.significado.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {e.significado.slice(0, 3).map((sig, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">{sig}</span>
                    ))}
                    {e.significado.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">+{e.significado.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPagina(Math.max(0, pagina - 1))}
                disabled={pagina === 0}
                className="p-2 border rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(totalPaginas, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPaginas <= 7) {
                  pageNum = i;
                } else if (pagina < 3) {
                  pageNum = i;
                } else if (pagina > totalPaginas - 4) {
                  pageNum = totalPaginas - 7 + i;
                } else {
                  pageNum = pagina - 3 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPagina(pageNum)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      pagina === pageNum
                        ? "bg-primary text-primary-foreground"
                        : "border hover:bg-accent"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              <button
                onClick={() => setPagina(Math.min(totalPaginas - 1, pagina + 1))}
                disabled={pagina >= totalPaginas - 1}
                className="p-2 border rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}

      {palavraSel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setPalavraSel(null)}>
          <div className="bg-background rounded-xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold">{palavraSel.lemma}</span>
                  <span className="text-sm text-muted-foreground font-mono">{palavraSel.strong}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    palavraSel.idioma === "grego"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  }`}>
                    {palavraSel.idioma === "grego" ? "Grego" : "Hebraico"}
                  </span>
                </div>
                {palavraSel.transliteracao && palavraSel.transliteracao !== palavraSel.lemma && (
                  <p className="text-sm text-muted-foreground mt-1 italic">Transliteração: {palavraSel.transliteracao}</p>
                )}
              </div>
              <button onClick={() => setPalavraSel(null)} className="p-1.5 hover:bg-accent rounded-lg transition-colors"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {palavraSel.classeGramatical && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary">{palavraSel.classeGramatical}</span>
              )}
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {palavraSel.frequencia} ocorrências
              </span>
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

            {palavraSel.significado && palavraSel.significado.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Significados</h3>
                <div className="flex flex-wrap gap-1.5">
                  {palavraSel.significado.map((sig, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent border">{sig}</span>
                  ))}
                </div>
              </div>
            )}

            {palavraSel.morfologia && Object.keys(palavraSel.morfologia).some(k => (palavraSel.morfologia as any)[k]) && (
              <div>
                <h3 className="font-semibold mb-2">Morfologia</h3>
                <div className="border rounded-lg overflow-hidden text-sm">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(palavraSel.morfologia).filter(([, v]) => v).map(([key, val]) => (
                        <tr key={key} className="border-b last:border-b-0">
                          <td className="px-3 py-2 font-medium text-muted-foreground capitalize w-1/3 bg-muted/30">{key === "raiz" ? "Raiz" : key}</td>
                          <td className="px-3 py-2">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {palavraSel.usos && palavraSel.usos.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Usos na Bíblia</h3>
                <ul className="space-y-1">
                  {palavraSel.usos.map((uso, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {uso}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {palavraSel.notasEstudo && (
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800/30">
                <h3 className="font-semibold mb-1 flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <BookOpen className="h-4 w-4" />
                  Notas de Estudo
                </h3>
                <p className="text-sm text-muted-foreground">{palavraSel.notasEstudo}</p>
              </div>
            )}

            <div className="text-xs text-muted-foreground space-y-0.5 pt-2 border-t">
              <p><strong>Strong's:</strong> {palavraSel.strong}</p>
              <p><strong>Lemma:</strong> {palavraSel.lemma}</p>
              <p><strong>Transliteração:</strong> {palavraSel.transliteracao}</p>
              <p><strong>Idioma:</strong> {palavraSel.idioma === "grego" ? "Grego" : "Hebraico"}</p>
              <p><strong>Classe Gramatical:</strong> {palavraSel.classeGramatical}</p>
              <p><strong>Frequência:</strong> {palavraSel.frequencia}x</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
