"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BookOpen,
  Hash,
  ExternalLink,
  Volume2,
  Search,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { getStrongByNumber, type LexiconEntry } from "@/lib/lexiconSearch";
import { type PalavraAlinhada } from "@/lib/wordAlignment";
import { romanizeHebrew } from "@/lib/hebrewRomanize";
import { AudioPronunciation } from "@/components/AudioPronunciation";
import { UsoDoLemaNoLivro } from "@/components/UsoDoLemaNoLivro";
import { VersoNasTraducoes } from "@/components/VersoNasTraducoes";
import { RarasNesteLivro, type RotuloRara } from "@/components/RarasNesteLivro";
import { EcoCanonico } from "@/components/EcoCanonico";
import { nomeDivino } from "@/lib/nomesDivinos";
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
  versoFoco?: number;
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
  livro,
  capitulo,
  versoAtual,
  traducaoAtual,
  onClose,
  onOpenPanel,
  onSearch,
}: {
  strong: string;
  palavraOriginal?: string;
  idioma?: "grego" | "hebraico" | null;
  morphCode?: string | null;
  livro: string;
  capitulo: number;
  versoAtual: number;
  traducaoAtual?: string;
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
            <UsoDoLemaNoLivro
              strong={strong}
              livro={livro}
              capitulo={capitulo}
              versoAtual={versoAtual}
            />
            <VersoNasTraducoes
              livro={livro}
              capitulo={capitulo}
              versiculo={versoAtual}
              traducaoAtual={traducaoAtual}
            />
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

function glossDaPalavra(p: PalavraAlinhada): string {
  return (p.definicao?.trim() || p.texto || p.transliteracao || "").trim();
}

function InterlinearWordCol({
  p,
  selected,
  echo,
  originalPx,
  bodyPx,
  onClick,
}: {
  p: PalavraAlinhada;
  selected: boolean;
  echo: boolean;
  originalPx: number;
  bodyPx: number;
  onClick: () => void;
}) {
  const meaning = glossDaPalavra(p);
  const divino = nomeDivino(p.strong);

  return (
    <button
      type="button"
      dir="ltr"
      onClick={onClick}
      className={`interlinear-col inline-flex flex-col items-center text-center px-1.5 py-1.5 rounded-lg min-w-[4.75em] transition-colors ${
        selected
          ? "bg-[var(--brand-default)]/14 ring-1 ring-[var(--brand-default)]/45"
          : echo
            ? "bg-[var(--brand-default)]/7"
            : "hover:bg-[var(--surface-sunken)]"
      }`}
      title={[
        divino?.titulo,
        p.palavraOriginal,
        meaning,
        p.transliteracao,
        p.strong,
      ]
        .filter(Boolean)
        .join(" · ")}
    >
      <span
        className={`interlinear-original text-center ${
          selected
            ? "text-[var(--brand-default)] font-bold"
            : "text-[var(--content-primary)]"
        } ${p.idioma === "hebraico" ? "font-hebrew" : "font-greek"}`}
        style={{
          fontSize: `${originalPx}px`,
          lineHeight: 1.35,
          borderBottom: divino
            ? "2px solid color-mix(in srgb, var(--brand-default) 55%, transparent)"
            : undefined,
        }}
        dir={p.idioma === "hebraico" ? "rtl" : "ltr"}
        lang={p.idioma === "hebraico" ? "he" : p.idioma === "grego" ? "el" : undefined}
      >
        {p.palavraOriginal || "\u00A0"}
      </span>
      {divino && (
        <span className="mt-0.5 text-[9px] uppercase tracking-wide text-[var(--brand-default)]">
          {divino.rotulo}
        </span>
      )}
      <span
        className="interlinear-gloss mt-1 text-center font-serif-body whitespace-normal"
        dir="ltr"
        lang="pt"
        style={{
          fontSize: `${bodyPx}px`,
          lineHeight: 1.35,
          color: "var(--content-primary)",
        }}
      >
        {meaning}
      </span>
      {p.transliteracao && (
        <span
          className="mt-0.5 italic text-center whitespace-normal"
          dir="ltr"
          style={{
            fontSize: `${Math.max(13, Math.round(bodyPx * 0.78))}px`,
            color: "var(--content-muted)",
          }}
        >
          {p.transliteracao}
        </span>
      )}
      <span
        className="mt-1"
        style={{
          fontSize: `${Math.max(11, Math.round(bodyPx * 0.68))}px`,
          color: "var(--content-muted)",
        }}
      >
        {p.morfologia && <MorphMiniTag morphCode={p.morfologia} />}
        <span className="block tabular-nums">{p.strong}</span>
      </span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export function InterlinearView({
  versiculos,
  livro,
  capitulo,
  traducao = "arc",
  fontSize = 18,
  versoFoco,
}: InterlinearViewProps) {
  const bodyPx = Math.max(fontSize, 16);
  const originalPx = Math.round(bodyPx * 1.18);
  const [selectedWord, setSelectedWord] = useState<SelectedWord | null>(null);
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
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

  useEffect(() => {
    if (!versoFoco || dados.length === 0) return;
    const el = document.getElementById(`v${versoFoco}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [versoFoco, dados.length]);

  const ocorrenciasNoCapitulo = useMemo(() => {
    const m = new Map<string, number>();
    for (const v of dados) {
      for (const p of v.palavras) {
        if (!p.strong) continue;
        m.set(p.strong, (m.get(p.strong) || 0) + 1);
      }
    }
    return m;
  }, [dados]);

  const copiarVerso = useCallback(
    async (numero: number, palavras: PalavraAlinhada[]) => {
      const linhas = palavras
        .filter((p) => p.strong)
        .map((p) =>
          [p.palavraOriginal, glossDaPalavra(p), p.transliteracao, p.strong]
            .filter(Boolean)
            .join(" · ")
        );
      const texto = `${livro} ${capitulo}:${numero}\n${linhas.join("\n")}`;
      try {
        await navigator.clipboard.writeText(texto);
        setCopiedVerse(numero);
        window.setTimeout(() => setCopiedVerse(null), 1600);
      } catch {
        /* ignore */
      }
    },
    [livro, capitulo]
  );

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

  const lemmaCount = selectedWord
    ? ocorrenciasNoCapitulo.get(selectedWord.strong) || 0
    : 0;

  const rotulosRaras = useMemo(() => {
    const m = new Map<string, RotuloRara>();
    for (const v of dados) {
      for (const p of v.palavras) {
        if (!p.strong || m.has(p.strong)) continue;
        m.set(p.strong, {
          strong: p.strong,
          original: p.palavraOriginal,
          gloss: glossDaPalavra(p),
          idioma: p.idioma,
        });
      }
    }
    return m;
  }, [dados]);

  const selecionarStrongDoCapitulo = useCallback(
    (strong: string, verso: number) => {
      const noVerso = dados.find((d) => d.numero === verso);
      const noCap = dados.find((d) => d.palavras.some((p) => p.strong === strong));
      const bloco = noVerso?.palavras.some((p) => p.strong === strong) ? noVerso : noCap;
      const p = bloco?.palavras.find((w) => w.strong === strong);
      if (!bloco || !p?.strong) return;
      setSelectedWord({
        verso: bloco.numero,
        strong: p.strong,
        palavraOriginal: p.palavraOriginal,
        transliteracao: p.transliteracao,
        idioma: p.idioma,
        palavraPT: p.texto,
      });
      document.getElementById(`v${bloco.numero}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [dados]
  );

  return (
    <div className="space-y-0">
      {dados.length > 0 && (
        <RarasNesteLivro
          livro={livro}
          capitulo={capitulo}
          rotulos={rotulosRaras}
          onSelect={selecionarStrongDoCapitulo}
        />
      )}
      {selectedWord && (
        <div className="sticky top-0 z-20 mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-[var(--brand-default)]/25 bg-[var(--surface-raised)]/95 px-3 py-2 backdrop-blur-sm">
          <span
            className={`font-semibold text-[var(--brand-default)] ${
              selectedWord.idioma === "hebraico" ? "font-hebrew" : "font-greek"
            }`}
            dir={selectedWord.idioma === "hebraico" ? "rtl" : "ltr"}
          >
            {selectedWord.palavraOriginal}
          </span>
          <span className="text-xs text-[var(--content-muted)]">
            {selectedWord.palavraPT}
            {selectedWord.transliteracao ? ` · ${selectedWord.transliteracao}` : ""}
          </span>
          <span className="rounded-full bg-[var(--brand-default)]/12 px-2 py-0.5 text-xs font-medium text-[var(--brand-default)]">
            {selectedWord.strong}
            {lemmaCount > 1 ? ` · ${lemmaCount}× neste capítulo` : ""}
          </span>
          <button
            type="button"
            className="ml-auto text-xs text-[var(--content-muted)] hover:text-[var(--brand-default)]"
            onClick={() => setSelectedWord(null)}
          >
            Limpar
          </button>
        </div>
      )}

      {dados.map((versiculo) => {
        const palavrasComStrong = versiculo.palavras.filter(
          (p) => p.strong
        );
        const isHebrew = palavrasComStrong.some((p) => p.idioma === "hebraico");

        return (
          <div
            key={versiculo.numero}
            id={`v${versiculo.numero}`}
            className={`border-b border-[var(--border)]/15 last:border-b-0 ${
              versoFoco === versiculo.numero
                ? "bg-[var(--brand-default)]/6 rounded-xl"
                : ""
            }`}
          >
            <div
              className="py-3 px-1 interlinear-reading bible-reading-text"
              style={{ fontSize: `${bodyPx}px` }}
            >
                <div className="flex items-start gap-2 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-sm font-bold shrink-0 mt-0.5">
                    {versiculo.numero}
                  </span>
                  <div
                    className="flex flex-wrap gap-x-1.5 gap-y-0.5 leading-relaxed font-serif-body text-[var(--content-primary)] flex-1"
                    style={{ fontSize: `${bodyPx}px` }}
                  >
                    {versiculo.palavras.map((p, wi) => {
                      const sameLemma = !!(
                        selectedWord?.strong && p.strong === selectedWord.strong
                      );
                      const activeHere =
                        sameLemma && selectedWord?.verso === versiculo.numero;
                      return (
                        <span
                          key={wi}
                          className={`cursor-pointer transition-colors ${
                            activeHere
                              ? "text-[var(--brand-default)] font-semibold underline decoration-[var(--brand-default)]/50 underline-offset-4"
                              : sameLemma
                                ? "text-[var(--brand-default)]/85"
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
                        </span>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="shrink-0 mt-0.5 p-1.5 rounded-lg text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:bg-[var(--surface-sunken)]"
                    title="Copiar este verso interlinear"
                    aria-label={`Copiar verso ${versiculo.numero}`}
                    onClick={() => copiarVerso(versiculo.numero, versiculo.palavras)}
                  >
                    {copiedVerse === versiculo.numero ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {palavrasComStrong.length > 0 && (
                  <>
                <p className="ml-9 mb-1.5 text-[10px] uppercase tracking-wider text-[var(--content-muted)]">
                  Original · sentido · Strong
                </p>

                <div
                  className="interlinear-word-row flex flex-wrap items-start gap-x-2 gap-y-4 mt-1 ml-2 md:ml-8"
                  dir={isHebrew ? "rtl" : "ltr"}
                >
                  {palavrasComStrong.map((p, wi) => (
                    <InterlinearWordCol
                      key={`${p.strong}-${wi}`}
                      p={p}
                      selected={
                        selectedWord?.verso === versiculo.numero &&
                        selectedWord?.strong === p.strong
                      }
                      echo={
                        !!selectedWord &&
                        selectedWord.strong === p.strong &&
                        selectedWord.verso !== versiculo.numero
                      }
                      originalPx={originalPx}
                      bodyPx={bodyPx}
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
                    />
                  ))}
                </div>
                  </>
                )}

                <EcoCanonico
                  livro={livro}
                  capitulo={capitulo}
                  versiculo={versiculo.numero}
                />

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
                      livro={livro}
                      capitulo={capitulo}
                      versoAtual={versiculo.numero}
                      traducaoAtual={traducao}
                      onClose={() => setSelectedWord(null)}
                      onOpenPanel={handleOpenPanel}
                      onSearch={handleSearch}
                    />
                  )}
                </AnimatePresence>
              </div>
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
      className="leading-snug px-0.5 rounded font-medium whitespace-normal"
      style={{ fontSize: "12px" }}
      title={parsed.label}
    >
      <span className={colorMap[parsed.tipo] || "bg-gray-500/10 text-gray-500"}>
        {parsed.label || parsed.tipo}
      </span>
    </span>
  );
}
