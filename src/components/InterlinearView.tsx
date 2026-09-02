"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BookOpen,
  Languages,
  Hash,
  ArrowRight,
  ExternalLink,
  Volume2,
  Search,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { getStrongByNumber, type LexiconEntry } from "@/lib/lexiconSearch";
import { alinharVersiculo, type PalavraAlinhada } from "@/lib/wordAlignment";
import { romanizeHebrew } from "@/lib/hebrewRomanize";
import { AudioPronunciation } from "@/components/AudioPronunciation";
import {
  parseMorphology,
  getCorMorfologia,
  getParadigmTable,
  type MorfologiaEstruturada,
  type ParadigmTable,
} from "@/lib/morphology";
import {
  buscarPorStrong,
  type LexiconEntry as BDAGEntry,
} from "@/data/biblia/lexiconBDAG";

interface VersiculoInput {
  numero: number;
  texto: string;
}

interface InterlinearViewProps {
  versiculos: VersiculoInput[];
  livro: string;
  capitulo: number;
  traducao: string;
  fontSize?: number;
}

interface SelectedWord {
  verso: number;
  strong: string;
  palavraOriginal: string | null;
  transliteracao: string | null;
  idioma: "grego" | "hebraico" | null;
  palavraPT: string;
}

// ═══════════════════════════════════════════════════════════════
// MORPHOLOGY TAG COMPONENT
// ═══════════════════════════════════════════════════════════════

function MorfologiaTag({
  campo,
  valor,
  onClick,
}: {
  campo: string;
  valor: string;
  onClick?: () => void;
}) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium leading-none ${
        onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
      } ${getCorMorfologia(campo)}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      title={onClick ? "Clique para ver paradigma" : undefined}
    >
      {valor}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRONUNCIATION BUTTON (Web Speech API)
// ═══════════════════════════════════════════════════════════════

function PronunciationButton({
  palavra,
  idioma,
  size = "sm",
}: {
  palavra: string;
  idioma: "grego" | "hebraico" | null;
  size?: "sm" | "md";
}) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!("speechSynthesis" in window) || !idioma) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(palavra);
      utterance.lang = idioma === "grego" ? "el-GR" : "he-IL";
      utterance.rate = 0.8;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [palavra, idioma]
  );

  const sizeClasses = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleSpeak}
      className={`inline-flex items-center justify-center rounded-full transition-all ${sizeClasses} ${
        speaking
          ? "text-[var(--brand-default)] bg-[var(--brand-default)]/10"
          : "text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:bg-[var(--brand-default)]/10"
      }`}
      title={`Ouvir pronuncia (${idioma === "grego" ? "grego" : "hebraico"})`}
      aria-label={`Ouvir pronuncia de ${palavra}`}
    >
      <Volume2
        className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} ${speaking ? "animate-pulse" : ""}`}
      />
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// BDAG SLIDE-OUT PANEL
// ═══════════════════════════════════════════════════════════════

function BDAGPanel({
  entry,
  morphCode,
  idioma,
  palavraOriginal,
  onSearch,
  onClose,
}: {
  entry: BDAGEntry | null;
  morphCode: string | null;
  idioma: "grego" | "hebraico" | null;
  palavraOriginal: string | null;
  onSearch: (term: string) => void;
  onClose: () => void;
}) {
  const isHebrew = idioma === "hebraico";
  const morphParsed: MorfologiaEstruturada | null = useMemo(
    () =>
      morphCode && idioma
        ? parseMorphology(morphCode)
        : null,
    [morphCode, idioma]
  );

  if (!entry) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-50 shadow-2xl overflow-y-auto"
      style={{
        backgroundColor: "var(--surface-raised)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between"
        style={{
          backgroundColor: "var(--surface-raised)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: isHebrew ? "#fef3c7" : "#ede9fe",
            }}
          >
            <BookOpen
              className="w-4 h-4"
              style={{ color: isHebrew ? "#92400e" : "#5b21b6" }}
            />
          </div>
          <div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={
                isHebrew
                  ? { backgroundColor: "#fef3c7", color: "#92400e" }
                  : { backgroundColor: "#ede9fe", color: "#5b21b6" }
              }
            >
              {entry.strong}
            </span>
            <span
              className="text-[10px] font-medium ml-2"
              style={{ color: "var(--content-muted)" }}
            >
              {isHebrew ? "BDB" : "BDAG"}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Fechar painel"
        >
          <X className="w-4 h-4" style={{ color: "var(--content-muted)" }} />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Palavra original grande */}
        <div className="text-center py-3">
          <p
            className={`text-4xl font-bold ${
              isHebrew ? "font-hebrew" : "font-greek"
            }`}
            style={{ color: "var(--content-primary)", lineHeight: 1.2 }}
          >
            {palavraOriginal || entry.palavra}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <p
              className="text-sm italic"
              style={{ color: "var(--content-muted)" }}
            >
              {isHebrew
                ? romanizeHebrew(entry.transliteracao || entry.palavra)
                : entry.transliteracao}
            </p>
            {entry.pronuncia && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--surface-sunken)",
                  color: "var(--content-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                [{entry.pronuncia}]
              </span>
            )}
            <PronunciationButton
              palavra={entry.palavra}
              idioma={idioma}
              size="md"
            />
          </div>
        </div>

        {/* Tags morfológicas */}
        {morphParsed && (
          <div
            className="rounded-xl p-3"
            style={{
              backgroundColor: "var(--surface-sunken)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-1 mb-2">
              <Sparkles
                className="w-3 h-3"
                style={{ color: "var(--content-muted)" }}
              />
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--content-muted)" }}
              >
                Morfologia
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {morphParsed.tipo && (
                <MorfologiaTag campo="tipo" valor={morphParsed.tipo} />
              )}
              {morphParsed.stem && (
                <MorfologiaTag campo="stem" valor={morphParsed.stem} />
              )}
              {morphParsed.tempo && (
                <MorfologiaTag campo="tempo" valor={morphParsed.tempo} />
              )}
              {morphParsed.voz && (
                <MorfologiaTag campo="voz" valor={morphParsed.voz} />
              )}
              {morphParsed.modo && (
                <MorfologiaTag campo="modo" valor={morphParsed.modo} />
              )}
              {morphParsed.pessoa && (
                <MorfologiaTag
                  campo="pessoa"
                  valor={`${morphParsed.pessoa} pessoa`}
                />
              )}
              {morphParsed.numero && (
                <MorfologiaTag campo="numero" valor={morphParsed.numero} />
              )}
              {morphParsed.genero && (
                <MorfologiaTag campo="genero" valor={morphParsed.genero} />
              )}
              {morphParsed.caso && (
                <MorfologiaTag campo="caso" valor={morphParsed.caso} />
              )}
              {morphParsed.estado && (
                <MorfologiaTag campo="estado" valor={morphParsed.estado} />
              )}
            </div>
            <p
              className="text-[11px] mt-2 font-medium"
              style={{ color: "var(--content-secondary)" }}
            >
              {morphParsed.label}
            </p>
          </div>
        )}

        {/* Definição principal */}
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: "var(--surface-sunken)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen
              className="w-3.5 h-3.5"
              style={{ color: isHebrew ? "#f59e0b" : "#8b5cf6" }}
            />
            <span
              className="text-[9px] font-semibold uppercase tracking-wider"
              style={{ color: isHebrew ? "#f59e0b" : "#8b5cf6" }}
            >
              {isHebrew ? "BDB / Strong" : "BDAG / Strong"}
            </span>
          </div>
          <p
            className="text-sm font-medium leading-relaxed"
            style={{ color: "var(--content-primary)" }}
          >
            {entry.definicao}
          </p>
        </div>

        {/* Definições secundárias */}
        {entry.definicoesSecundarias &&
          entry.definicoesSecundarias.length > 0 && (
            <div
              className="rounded-xl p-3"
              style={{
                backgroundColor: "var(--surface-sunken)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--content-muted)" }}
              >
                Significados secundarios
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {entry.definicoesSecundarias.map((def: string, i: number) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--surface-raised)",
                      color: "var(--content-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {def}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Categoria */}
        {entry.categoria && (
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-medium"
              style={{ color: "var(--content-muted)" }}
            >
              Categoria:
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor:
                  entry.categoria === "verbo"
                    ? "#dcfce7"
                    : entry.categoria === "substantivo"
                    ? "#dbeafe"
                    : "#fef3c7",
                color:
                  entry.categoria === "verbo"
                    ? "#166534"
                    : entry.categoria === "substantivo"
                    ? "#1e40af"
                    : "#92400e",
              }}
            >
              {entry.categoria}
            </span>
          </div>
        )}

        {/* Frequência no NT */}
        {entry.usoNoNT > 0 && (
          <div
            className="flex items-center gap-2 rounded-lg p-2.5"
            style={{
              backgroundColor: "var(--surface-sunken)",
              border: "1px solid var(--border)",
            }}
          >
            <Hash
              className="w-3.5 h-3.5"
              style={{ color: "var(--content-muted)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "var(--content-primary)" }}
            >
              {entry.usoNoNT.toLocaleString("pt-BR")}x no{" "}
              {isHebrew ? "AT" : "NT"}
            </span>
          </div>
        )}

        {/* Livros onde aparece */}
        {entry.livros && entry.livros.length > 0 && (
          <div
            className="rounded-xl p-3"
            style={{
              backgroundColor: "var(--surface-sunken)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              className="text-[9px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--content-muted)" }}
            >
              Livros
            </span>
            <div className="flex flex-wrap gap-1 mt-2">
              {entry.livros.map((livro: string, i: number) => (
                <a
                  key={i}
                  href={`/biblia?livro=${livro}`}
                  className="text-[10px] px-1.5 py-0.5 rounded border hover:bg-[var(--brand-default)]/10 transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--content-secondary)",
                  }}
                >
                  {livro}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Notas */}
        {entry.notas && (
          <div
            className="rounded-xl p-3"
            style={{
              backgroundColor: "var(--surface-sunken)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-1 mb-1.5">
              <Volume2
                className="w-3 h-3"
                style={{ color: "var(--content-muted)" }}
              />
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--content-muted)" }}
              >
                Notas
              </span>
            </div>
            <p
              className="text-[11px] leading-relaxed"
              style={{ color: "var(--content-secondary)" }}
            >
              {entry.notas}
            </p>
          </div>
        )}

        {/* Ação: Buscar no corpus */}
        <button
          onClick={() => onSearch(entry.transliteracao || entry.palavra)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-colors"
          style={{
            backgroundColor: "var(--brand-default)",
            color: "var(--brand-foreground)",
          }}
        >
          <Search className="w-3.5 h-3.5" />
          Buscar &quot;{entry.transliteracao || entry.palavra}&quot; no corpus
        </button>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PARADIGM MODAL
// ═══════════════════════════════════════════════════════════════

function ParadigmModal({
  table,
  onClose,
}: {
  table: ParadigmTable;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          backgroundColor: "var(--surface-raised)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 px-5 py-4 flex items-center justify-between"
          style={{
            backgroundColor: "var(--surface-raised)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h3
              className="text-sm font-bold"
              style={{ color: "var(--content-primary)" }}
            >
              {table.name}
            </h3>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: "var(--content-muted)" }}
            >
              {table.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X
              className="w-4 h-4"
              style={{ color: "var(--content-muted)" }}
            />
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <th
                  className="text-left py-1.5 px-2 font-semibold"
                  style={{ color: "var(--content-muted)" }}
                >
                  Pessoa
                </th>
                <th
                  className="text-left py-1.5 px-2 font-semibold"
                  style={{ color: "var(--content-muted)" }}
                >
                  Numero
                </th>
                <th
                  className="text-left py-1.5 px-2 font-semibold font-greek"
                  style={{ color: "var(--content-muted)" }}
                >
                  Forma
                </th>
                <th
                  className="text-left py-1.5 px-2 font-semibold"
                  style={{ color: "var(--content-muted)" }}
                >
                  Transliteracao
                </th>
                <th
                  className="text-left py-1.5 px-2 font-semibold"
                  style={{ color: "var(--content-muted)" }}
                >
                  Codigo
                </th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-[var(--surface-sunken)] transition-colors"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td
                    className="py-1.5 px-2"
                    style={{ color: "var(--content-primary)" }}
                  >
                    {row.person || "-"}
                  </td>
                  <td
                    className="py-1.5 px-2"
                    style={{ color: "var(--content-primary)" }}
                  >
                    {row.number || row.gender || "-"}
                  </td>
                  <td
                    className="py-1.5 px-2 font-greek font-medium"
                    style={{ color: "var(--content-primary)" }}
                  >
                    {row.form}
                  </td>
                  <td
                    className="py-1.5 px-2 italic"
                    style={{ color: "var(--content-muted)" }}
                  >
                    {row.transliteration}
                  </td>
                  <td
                    className="py-1.5 px-2"
                    style={{ color: "var(--content-muted)" }}
                  >
                    {row.morphology}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INLINE WORD DETAIL (compact, below verse)
// ═══════════════════════════════════════════════════════════════

function DetalhePalavraInline({
  strong,
  palavraOriginal,
  idioma,
  morphCode,
  onClose,
  onOpenPanel,
  onSearch,
}: {
  strong: string;
  palavraOriginal?: string;
  idioma?: "grego" | "hebraico" | null;
  morphCode?: string | null;
  onClose: () => void;
  onOpenPanel: () => void;
  onSearch: (term: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entry, setEntry] = useState<LexiconEntry | null>(null);
  const [bdagEntry, setBdagEntry] = useState<BDAGEntry | null>(null);

  useEffect(() => {
    let cancelled = false;
    getStrongByNumber(strong).then((e) => {
      if (!cancelled) setEntry(e);
    });
    // Load BDAG lexicon (already imported at top level)
    const found = buscarPorStrong(strong);
    if (!cancelled && found) setBdagEntry(found);
    return () => {
      cancelled = true;
    };
  }, [strong]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [strong]);

  const morphParsed: MorfologiaEstruturada | null = useMemo(
    () => (morphCode ? parseMorphology(morphCode) : null),
    [morphCode]
  );

  const isHebrew = idioma === "hebraico";
  const hasBDAG = bdagEntry !== null;

  const definicao = hasBDAG
    ? bdagEntry!.definicao
    : entry?.definicao || "";
  const usoNoNT = hasBDAG ? bdagEntry!.usoNoNT : entry?.frequencia;
  const versiculos = hasBDAG ? [] : [];
  const notas = hasBDAG ? bdagEntry!.notas || "" : "";
  const livros = hasBDAG ? bdagEntry!.livros || [] : [];
  const categoria = hasBDAG ? bdagEntry!.categoria || "" : entry?.categoria || "";
  const definicoesSecundarias = hasBDAG ? bdagEntry!.definicoesSecundarias || [] : [];

  // Determine paradigm key for verb
  const paradigmKey = useMemo(() => {
    if (!morphParsed || morphParsed.tipo !== "Verb") return null;
    const word = (palavraOriginal || "").toLowerCase();
    if (word.includes("λυ")) return "lyo";
    if (word.includes("βαλ")) return "balko";
    if (word.includes("διδω")) return "didomi";
    if (word.includes("αγαπ")) return "agapao";
    if (word.includes("ειμ")) return "eimi";
    if (word.includes("φημ")) return "phiemi";
    if (word.includes("τιθ")) return "tithemi";
    return null;
  }, [morphParsed, palavraOriginal]);

  const handleParadigmClick = useCallback(() => {
    if (!paradigmKey) return;
    const table = getParadigmTable(paradigmKey);
    if (table) {
      setParadigmTable(table);
    }
  }, [paradigmKey]);

  const [paradigmTable, setParadigmTable] = useState<ParadigmTable | null>(
    null
  );

  if (!entry && !bdagEntry) return null;

  const word = bdagEntry?.palavra || entry?.palavra || "";
  const transl = bdagEntry?.transliteracao || entry?.transliteracao || "";

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div
          className="mx-2 mb-3 rounded-xl relative overflow-hidden"
          style={{
            backgroundColor: "var(--surface-raised)",
            border: "1px solid var(--border)",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)",
          }}
        >
          {/* Barra lateral colorida */}
          <div
            className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
            style={{
              backgroundColor: isHebrew ? "#f59e0b" : "#8b5cf6",
            }}
          />

          {/* Cabeçalho */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={
                    isHebrew
                      ? { backgroundColor: "#fef3c7", color: "#92400e" }
                      : { backgroundColor: "#ede9fe", color: "#5b21b6" }
                  }
                >
                  {strong}
                </span>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: "var(--content-muted)" }}
                >
                  {isHebrew ? "Hebraico" : "Grego"}
                </span>
                {usoNoNT !== undefined && usoNoNT > 0 && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                    style={{
                      backgroundColor: "var(--surface-sunken)",
                      color: "var(--content-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Hash className="w-2.5 h-2.5" />
                    {usoNoNT}x no {isHebrew ? "AT" : "NT"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={onOpenPanel}
                  className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  title="Abrir painel completo"
                  aria-label="Abrir painel BDAG"
                >
                  <ChevronRight
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--content-muted)" }}
                  />
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Fechar"
                >
                  <X
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--content-muted)" }}
                  />
                </button>
              </div>
            </div>

            {/* Palavra original grande */}
            <div className="text-center py-2">
              <p
                className={`text-3xl font-bold ${
                  isHebrew ? "font-hebrew" : "font-greek"
                }`}
                style={{
                  color: "var(--content-primary)",
                  lineHeight: 1.2,
                }}
              >
                {palavraOriginal || word}
              </p>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <p
                  className="text-xs italic"
                  style={{ color: "var(--content-muted)" }}
                >
                  {isHebrew
                    ? romanizeHebrew(
                        transl || word
                      )
                    : transl}
                </p>
                <AudioPronunciation
                  palavra={word}
                  strong={strong}
                  lingua={isHebrew ? "hebraico" : "grego"}
                  transliteracao={transl}
                  size="sm"
                />
                <PronunciationButton
                  palavra={word}
                  idioma={idioma || null}
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Tags morfológicas */}
          {morphParsed && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-1 justify-center">
                {morphParsed.tipo && (
                  <MorfologiaTag
                    campo="tipo"
                    valor={morphParsed.tipo}
                    onClick={
                      paradigmKey ? handleParadigmClick : undefined
                    }
                  />
                )}
                {morphParsed.stem && (
                  <MorfologiaTag campo="stem" valor={morphParsed.stem} />
                )}
                {morphParsed.tempo && (
                  <MorfologiaTag campo="tempo" valor={morphParsed.tempo} />
                )}
                {morphParsed.voz && (
                  <MorfologiaTag campo="voz" valor={morphParsed.voz} />
                )}
                {morphParsed.modo && (
                  <MorfologiaTag campo="modo" valor={morphParsed.modo} />
                )}
                {morphParsed.pessoa && (
                  <MorfologiaTag
                    campo="pessoa"
                    valor={`${morphParsed.pessoa} pessoa`}
                  />
                )}
                {morphParsed.numero && (
                  <MorfologiaTag campo="numero" valor={morphParsed.numero} />
                )}
                {morphParsed.genero && (
                  <MorfologiaTag campo="genero" valor={morphParsed.genero} />
                )}
                {morphParsed.caso && (
                  <MorfologiaTag campo="caso" valor={morphParsed.caso} />
                )}
                {morphParsed.estado && (
                  <MorfologiaTag campo="estado" valor={morphParsed.estado} />
                )}
              </div>
              <p
                className="text-center text-[10px] mt-1.5 font-medium"
                style={{ color: "var(--content-muted)" }}
              >
                {morphParsed.label}
              </p>
            </div>
          )}

          {/* Definição */}
          <div className="px-4 pb-3 space-y-2">
            {definicao && (
              <div
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "var(--surface-sunken)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <BookOpen
                    className="w-3 h-3"
                    style={{ color: isHebrew ? "#f59e0b" : "#8b5cf6" }}
                  />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: isHebrew ? "#f59e0b" : "#8b5cf6" }}
                  >
                    {isHebrew ? "BDB / Strong" : "BDAG / Strong"}
                  </span>
                </div>
                <p
                  className="text-xs font-medium leading-relaxed"
                  style={{ color: "var(--content-primary)" }}
                >
                  {definicao}
                </p>
              </div>
            )}

            {/* Definições secundárias */}
            {definicoesSecundarias.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {definicoesSecundarias.map((def: string, i: number) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--surface-raised)",
                      color: "var(--content-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {def}
                  </span>
                ))}
              </div>
            )}

            {/* Livros onde aparece */}
            {livros.length > 0 && (
              <div
                className="rounded-lg p-2.5"
                style={{
                  backgroundColor: "var(--surface-sunken)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-1 mb-1.5">
                  <ExternalLink
                    className="w-3 h-3"
                    style={{ color: "var(--content-muted)" }}
                  />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--content-muted)" }}
                  >
                    Livros ({livros.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {livros.map((livro, i) => (
                    <a
                      key={i}
                      href={`/biblia?livro=${livro}`}
                      className="text-[10px] px-1.5 py-0.5 rounded border hover:bg-[var(--brand-default)]/10 transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--content-secondary)",
                      }}
                    >
                      {livro}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Ocorrências */}
            {versiculos && versiculos.length > 0 && (
              <div
                className="rounded-lg p-2.5"
                style={{
                  backgroundColor: "var(--surface-sunken)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-1 mb-1.5">
                  <ExternalLink
                    className="w-3 h-3"
                    style={{ color: "var(--content-muted)" }}
                  />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--content-muted)" }}
                  >
                    Ocorrencias ({versiculos.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {versiculos.slice(0, 12).map((v: string, i: number) => (
                    <a
                      key={i}
                      href={`/biblia?ref=${v}`}
                      className="text-[10px] px-1.5 py-0.5 rounded border hover:bg-[var(--brand-default)]/10 transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--content-secondary)",
                      }}
                    >
                      {v}
                    </a>
                  ))}
                  {versiculos.length > 12 && (
                    <span
                      className="text-[10px] px-1.5 py-0.5"
                      style={{ color: "var(--content-muted)" }}
                    >
                      +{versiculos.length - 12} mais
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Notas */}
            {notas && (
              <div
                className="rounded-lg p-2.5"
                style={{
                  backgroundColor: "var(--surface-sunken)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Volume2
                    className="w-3 h-3"
                    style={{ color: "var(--content-muted)" }}
                  />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--content-muted)" }}
                  >
                    Notas
                  </span>
                </div>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: "var(--content-secondary)" }}
                >
                  {notas}
                </p>
              </div>
            )}

            {/* Buscar no corpus */}
            <button
              onClick={() =>
                onSearch(transl || word)
              }
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-medium transition-colors border"
              style={{
                borderColor: "var(--border)",
                color: "var(--content-secondary)",
              }}
            >
              <Search className="w-3 h-3" />
              Buscar ocorrências no corpus
            </button>
          </div>
        </div>
      </motion.div>

      {/* Paradigm modal */}
      <AnimatePresence>
        {paradigmTable && (
          <ParadigmModal
            table={paradigmTable}
            onClose={() => setParadigmTable(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export function InterlinearView({
  versiculos,
  livro,
  capitulo,
  fontSize = 18,
}: InterlinearViewProps) {
  const [selectedWord, setSelectedWord] = useState<SelectedWord | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelEntry, setPanelEntry] = useState<
    import("@/data/biblia/lexiconBDAG").LexiconEntry | null
  >(null);
  const [panelMorph, setPanelMorph] = useState<string | null>(null);
  const [panelIdioma, setPanelIdioma] = useState<
    "grego" | "hebraico" | null
  >(null);
  const [panelPalavraOriginal, setPanelPalavraOriginal] = useState<
    string | null
  >(null);
  const [dados, setDados] = useState<
    { numero: number; palavras: PalavraAlinhada[] }[]
  >([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("@/lib/wordAlignment");
      const result = await Promise.all(
        versiculos.map(async (v) => ({
          numero: v.numero,
          palavras: await mod.alinharVersiculo(livro, capitulo, v.numero, v.texto),
        }))
      );
      if (!cancelled) setDados(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [versiculos, livro, capitulo]);

  const handleWordClick = useCallback(
    (
      verso: number,
      strong: string,
      palavraOriginal: string | null,
      transliteracao: string | null,
      idioma: "grego" | "hebraico" | null,
      palavraPT: string
    ) => {
      if (
        selectedWord?.verso === verso &&
        selectedWord?.strong === strong
      ) {
        setSelectedWord(null);
        setPanelOpen(false);
      } else {
        setSelectedWord({
          verso,
          strong,
          palavraOriginal,
          transliteracao,
          idioma,
          palavraPT,
        });
        setPanelOpen(false);
      }
    },
    [selectedWord]
  );

  const handleOpenPanel = useCallback(async () => {
    if (!selectedWord) return;
    const mod = await import("@/data/biblia/lexiconBDAG");
    const entry = mod.buscarPorStrong(selectedWord.strong);
    setPanelEntry(entry || null);
    setPanelMorph(
      dados
        .find((d) => d.numero === selectedWord.verso)
        ?.palavras.find((p) => p.strong === selectedWord.strong)?.morfologia ||
        null
    );
    setPanelIdioma(selectedWord.idioma);
    setPanelPalavraOriginal(selectedWord.palavraOriginal);
    setPanelOpen(true);
  }, [selectedWord, dados]);

  const handleClosePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const handleSearch = useCallback((term: string) => {
    window.open(`/pesquisa?q=${encodeURIComponent(term)}`, "_blank");
  }, []);

  return (
    <div className="space-y-0">
      {dados.map((versiculo) => {
        const palavrasComStrong = versiculo.palavras.filter(
          (p) => p.strong
        );

        return (
          <div
            key={versiculo.numero}
            className="border-b border-[var(--border)]/15 last:border-b-0"
          >
            {palavrasComStrong.length > 0 && (
              <div
                className="py-2 px-1 interlinear-reading bible-reading-text"
                style={{ fontSize: `${fontSize}px` }}
              >
                {/* Linha 1: Texto em português */}
                <div className="flex items-start gap-2 mb-1">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-[0.7em] font-bold shrink-0 mt-0.5">
                    {versiculo.numero}
                  </span>
                  <div
                    className="flex flex-wrap gap-x-1.5 gap-y-0.5 leading-relaxed font-serif-body text-[var(--content-primary)]"
                    style={{ fontSize: "1em" }}
                  >
                    {versiculo.palavras.map((p, wi) => (
                      <span
                        key={wi}
                        className={`cursor-pointer transition-colors relative ${
                          selectedWord?.verso === versiculo.numero &&
                          selectedWord?.strong === p.strong
                            ? "text-[var(--brand-default)] font-semibold"
                            : p.strong
                            ? "hover:text-[var(--brand-default)]"
                            : ""
                        }`}
                        onClick={() =>
                          p.strong &&
                          handleWordClick(
                            versiculo.numero,
                            p.strong,
                            p.palavraOriginal,
                            p.transliteracao,
                            p.idioma,
                            p.texto
                          )
                        }
                        role={p.strong ? "button" : undefined}
                        tabIndex={p.strong ? 0 : undefined}
                      >
                        {p.texto}
                        {p.strong && (
                          <span className="absolute -bottom-px left-0 right-0 h-px bg-[var(--brand-default)]/30 scale-x-0 hover:scale-x-100 transition-transform origin-left rounded-full" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Linha 2: Palavras originais (grego/hebraico) */}
                <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 ml-8 mt-1">
                  {versiculo.palavras.map((p, wi) => (
                    <span
                      key={wi}
                      className="inline-flex flex-col items-center px-0.5"
                    >
                      {p.strong ? (
                        <span
                          className={`interlinear-original leading-none text-center cursor-pointer transition-colors ${
                            selectedWord?.verso === versiculo.numero &&
                            selectedWord?.strong === p.strong
                              ? "text-[var(--brand-default)] font-bold"
                              : "text-[var(--content-muted)] hover:text-[var(--brand-default)]"
                          } ${
                            p.idioma === "hebraico"
                              ? "font-hebrew"
                              : "font-greek"
                          }`}
                          onClick={() =>
                            handleWordClick(
                              versiculo.numero,
                              p.strong!,
                              p.palavraOriginal,
                              p.transliteracao,
                              p.idioma,
                              p.texto
                            )
                          }
                          role="button"
                          tabIndex={0}
                        >
                          {p.palavraOriginal || "\u00A0"}
                        </span>
                      ) : (
                        <span className="text-[0.7em] text-transparent select-none">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Linha 3: Transliteração / significado */}
                <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 ml-8 mt-1">
                  {versiculo.palavras.map((p, wi) => (
                    <span
                      key={wi}
                      className="inline-flex flex-col items-center px-0.5"
                    >
                      {p.strong && p.transliteracao ? (
                        <span
                          className="interlinear-gloss leading-none text-center italic"
                          style={{ color: "var(--content-muted)" }}
                        >
                          {p.transliteracao.length > 14
                            ? p.transliteracao.slice(0, 14) + "."
                            : p.transliteracao}
                        </span>
                      ) : (
                        <span className="text-[0.7em] text-transparent select-none">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Linha 4: Tags morfológicas compactas + Strong's */}
                <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 ml-8 mt-1">
                  {versiculo.palavras.map((p, wi) => (
                    <span
                      key={wi}
                      className="inline-flex flex-col items-center px-0.5 min-w-[1.5em]"
                    >
                      {p.strong ? (
                        <div className="flex flex-col items-center gap-0.5">
                          {p.morfologia && (
                            <MorphMiniTag morphCode={p.morfologia} />
                          )}
                          <span
                            className="text-[0.65em] leading-none cursor-pointer hover:text-[var(--brand-default)] transition-colors"
                            style={{ color: "var(--content-muted)" }}
                            onClick={() =>
                              handleWordClick(
                                versiculo.numero,
                                p.strong!,
                                p.palavraOriginal,
                                p.transliteracao,
                                p.idioma,
                                p.texto
                              )
                            }
                            title={`Ver detalhes de ${p.strong}`}
                          >
                            {p.strong}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[0.65em] text-transparent select-none">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Detalhe inline */}
                <AnimatePresence>
                  {selectedWord?.verso === versiculo.numero && (
                    <DetalhePalavraInline
                      strong={selectedWord.strong}
                      palavraOriginal={selectedWord.palavraOriginal || undefined}
                      idioma={selectedWord.idioma}
                      morphCode={
                        versiculo.palavras.find(
                          (p) => p.strong === selectedWord.strong
                        )?.morfologia || null
                      }
                      onClose={() => setSelectedWord(null)}
                      onOpenPanel={handleOpenPanel}
                      onSearch={handleSearch}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        );
      })}

      {dados.length === 0 && (
        <div className="text-center py-10 text-[var(--content-muted)] text-sm">
          Nenhum dado interlinear disponivel para este capitulo.
        </div>
      )}

      {/* BDAG Slide-out Panel */}
      <AnimatePresence>
        {panelOpen && selectedWord && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={handleClosePanel}
            />
            <BDAGPanel
              entry={panelEntry}
              morphCode={panelMorph}
              idioma={panelIdioma}
              palavraOriginal={panelPalavraOriginal}
              onSearch={handleSearch}
              onClose={handleClosePanel}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MINI MORPHOLOGY TAG (for alignment row)
// ═══════════════════════════════════════════════════════════════

function MorphMiniTag({ morphCode }: { morphCode: string }) {
  const parsed = useMemo(() => parseMorphology(morphCode), [morphCode]);

  const colorMap: Record<string, string> = {
    Verb: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Noun: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    Adjective: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Article: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    Pronoun: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    Preposition: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    Conjunction: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    Adverb: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  };

  if (!parsed || !parsed.tipo) return null;

  return (
    <span
      className={`text-[0.65em] leading-none px-0.5 rounded font-medium ${colorMap[parsed.tipo] || "bg-gray-500/10 text-gray-500"}`}
      title={parsed.label}
    >
      {parsed.tipo.slice(0, 1)}
    </span>
  );
}
