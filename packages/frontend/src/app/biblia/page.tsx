"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Search, X, Languages, MapPin, Users, ExternalLink } from "lucide-react";

// Key biblical terms mapped to Strong's numbers
const KEY_TERMS: Record<string, { strong: string; original: string; type: "g" | "h"; def: string }> = {
  "Deus": { strong: "H430", original: "Elohim", type: "h", def: "Deus. Nome plural de majestade." },
  "Senhor": { strong: "H3068", original: "YHWH", type: "h", def: "O Senhor. Nome próprio de Deus." },
  "amor": { strong: "G26", original: "agape", type: "g", def: "Amor incondicional, amor sacrificial." },
  "fé": { strong: "G4100", original: "pistis", type: "g", def: "Fé, confiança, crença." },
  "graça": { strong: "G5485", original: "charis", type: "g", def: "Graça, favor imerecido." },
  "Jesus": { strong: "G2424", original: "Iesous", type: "g", def: "Jesus. Nome próprio do Salvador." },
  "Cristo": { strong: "G5547", original: "Christos", type: "g", def: "Cristo, Ungido." },
  "Espírito": { strong: "G4413", original: "pneuma", type: "g", def: "Espírito, sopro." },
  "salvação": { strong: "G4991", original: "soteria", type: "g", def: "Salvação, livramento." },
  "justiça": { strong: "G1343", original: "dikaiosyne", type: "g", def: "Justiça divina." },
  "santidade": { strong: "G38", original: "hagios", type: "g", def: "Santo, separado para Deus." },
  "arrependimento": { strong: "G3341", original: "metanoia", type: "g", def: "Arrependimento, mudança de mente." },
  "evangelho": { strong: "G2098", original: "euangelion", type: "g", def: "Boa notícia, evangelho." },
  "igreja": { strong: "G1577", original: "ekklesia", type: "g", def: "Igreja, assembleia." },
  "apóstolo": { strong: "G652", original: "apostolos", type: "g", def: "Apóstolo, enviado." },
  "profeta": { strong: "G4396", original: "prophetes", type: "g", def: "Profeta, porta-voz de Deus." },
  "pecado": { strong: "G266", original: "hamartia", type: "g", def: "Pecado, errar o alvo." },
  "morte": { strong: "G2288", original: "thanatos", type: "g", def: "Morte." },
  "vida": { strong: "G2222", original: "zoe", type: "g", def: "Vida, vida eterna." },
  "luz": { strong: "G5457", original: "phos", type: "g", def: "Luz." },
  "verdade": { strong: "G225", original: "aletheia", type: "g", def: "Verdade." },
  "paz": { strong: "G1515", original: "eirene", type: "g", def: "Paz." },
  "alegria": { strong: "G5479", original: "chara", type: "g", def: "Alegria, gozo." },
  "esperança": { strong: "G1680", original: "elpis", type: "g", def: "Esperança." },
  "criar": { strong: "H1254", original: "bara", type: "h", def: "Criar. Criação divina." },
  "conhecer": { strong: "H3282", original: "yada", type: "h", def: "Conhecer, ter relações íntimas." },
  "andar": { strong: "H1981", original: "halak", type: "h", def: "Andar, caminhar." },
  "ouvir": { strong: "H8085", original: "shama", type: "h", def: "Ouvir, obedecer." },
  "dar": { strong: "H5414", original: "natan", type: "h", def: "Dar, conceder." },
  "abençoar": { strong: "H1288", original: "barak", type: "h", def: "Abençoar, elogiar." },
  "servir": { strong: "H183", original: "abad", type: "h", def: "Servir, adorar." },
  "lembrar": { strong: "H7706", original: "zakar", type: "h", def: "Lembrar, mencionar." },
  "salvar": { strong: "H3467", original: "yasha", type: "h", def: "Salvar, livrar." },
  "curar": { strong: "H1245", original: "rapha", type: "h", def: "Curar, restaurar." },
  "misericórdia": { strong: "H2617", original: "chesed", type: "h", def: "Graça, amor leal covenantal." },
  "justificar": { strong: "H6680", original: "tsedaqah", type: "h", def: "Justificar, declarar justo." },
  "Torá": { strong: "H8451", original: "torah", type: "h", def: "Lei, instrução divina." },
  "sopro": { strong: "H7307", original: "ruach", type: "h", def: "Espírito, vento, sopro." },
  "ser": { strong: "H5315", original: "nephesh", type: "h", def: "Alma, ser, vida." },
};

const KEY_PEOPLE: Record<string, string> = {
  "Abraão": "Pai dos crentes. Chamado por Deus para sair de Ur.",
  "Isaque": "Filho da promessa de Abraão e Sara.",
  "Jacó": "Pai das 12 tribos de Israel.",
  "José": "Vendido como escravo, tornou-se governador do Egito.",
  "Moisés": "Liberador de Israel do Egito. Recebeu os Dez Mandamentos.",
  "Davi": "Segundo rei de Israel. Homem segundo o coração de Deus.",
  "Salomão": "Filho de Davi. Construiu o Templo. Sábio.",
  "Elias": "Profeta que desafiou os profetas de Baal.",
  "Pedro": "Líder dos apóstolos. Primeiro a confessar Jesus.",
  "Paulo": "Apóstolo dos gentios. Escreveu 13 epístolas.",
  "João": "Apóstolo amado. Autor do Evangelho de João.",
  "Jesus": "Filho de Deus encarnado. Salvador da humanidade.",
  "Maria": "Mãe de Jesus. Virgem concebeu pelo Espírito Santo.",
  "Daniel": "Judeu exilado na Babilônia. Intérprete de sonhos.",
  "Jonas": "Profeta que fugiu de Deus. Engolido por um grande peixe.",
  "Rute": "Moabita leal. Avó de Davi.",
  "Esther": "Rainha persa que salvou os judeus.",
  "Jó": "Homem justo que sofreu enormemente.",
  "Isaías": "Grande profeta. Profetizou a vinda do Messias.",
  "Jeremias": "Profeta das nações. Chorou sobre Jerusalém.",
};

const KEY_LOCATIONS: Record<string, string> = {
  "Jerusalém": "Cidade santa de Israel, sede do Templo.",
  "Belém": "Cidade natal de Jesus.",
  "Nazaré": "Cidade onde Jesus cresceu.",
  "Galileia": "Região onde Jesus ministrou.",
  "Egito": "Império onde Israel foi escravizado.",
  "Sinai": "Montanha onde Moisés recebeu a Lei.",
  "Jordão": "Rio onde Jesus foi batizado.",
  "Samaria": "Região central de Israel.",
  "Cafarnaum": "Base ministerial de Jesus.",
  "Getsemani": "Jardim onde Jesus orou.",
  "Calvário": "Local da crucificação de Jesus.",
  "Roma": "Capital do Império Romano.",
  "Damasco": "Cidade onde Paulo se converteu.",
  "Efeso": "Cidade importante na Ásia Menor.",
  "Corinto": "Cidade grega importante.",
};

interface Livro {
  id: string;
  nome: string;
  slug: string;
  totalCapitulos: number;
  ordemGeral: number;
}

interface Versiculo {
  id: string;
  numero: number;
  texto: string;
  capituloNumero: number;
}

export default function BibliaPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livroSel, setLivroSel] = useState<Livro | null>(null);
  const [capSel, setCapSel] = useState(1);
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [termoSel, setTermoSel] = useState<any>(null);
  const [sidebar, setSidebar] = useState<"livros" | "estudo" | "lexico">("livros");
  const [busca, setBusca] = useState("");
  const [traducoes, setTraducoes] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/v1/biblia/livros")
      .then(r => r.json())
      .then(data => setLivros(Array.isArray(data) ? data : []))
      .catch(() => {});
    fetch("/api/v1/biblia/traducoes")
      .then(r => r.json())
      .then(data => setTraducoes(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const carregarCapitulo = useCallback(async (livro: Livro, cap: number) => {
    setCarregando(true);
    try {
      const res = await fetch(`/api/v1/biblia/livros/${livro.id}/capitulos/${cap}`);
      const data = await res.json();
      setVersiculos(Array.isArray(data.versiculos) ? data.versiculos : Array.isArray(data) ? data : []);
    } catch { setVersiculos([]); }
    setCarregando(false);
  }, []);

  useEffect(() => {
    if (livroSel) carregarCapitulo(livroSel, capSel);
  }, [livroSel, capSel, carregarCapitulo]);

  function selecionarLivro(livro: Livro) {
    setLivroSel(livro);
    setCapSel(1);
    setTermoSel(null);
    setSidebar("estudo");
  }

  function processarTexto(texto: string) {
    const palavras = texto.split(/(\s+|[.,;:!?"'()—–-])/);
    return palavras.map((p, i) => {
      const limpa = p.replace(/[.,;:!?"'()—–-]/g, "");
      const termo = KEY_TERMS[limpa];
      const pessoa = KEY_PEOPLE[limpa];
      const local = KEY_LOCATIONS[limpa];

      if (termo) {
        return (
          <span
            key={i}
            onClick={() => setTermoSel({ tipo: "termo", ...termo, palavra: limpa })}
            className="cursor-pointer text-primary underline decoration-dotted hover:bg-primary/10 rounded px-0.5 transition-colors"
            title={`${termo.original} (${termo.strong})`}
          >
            {p}
          </span>
        );
      }
      if (pessoa) {
        return (
          <span
            key={i}
            onClick={() => setTermoSel({ tipo: "pessoa", nome: limpa, desc: pessoa })}
            className="cursor-pointer text-blue-600 dark:text-blue-400 underline decoration-dotted hover:bg-blue-500/10 rounded px-0.5 transition-colors font-medium"
          >
            {p}
          </span>
        );
      }
      if (local) {
        return (
          <span
            key={i}
            onClick={() => setTermoSel({ tipo: "local", nome: limpa, desc: local })}
            className="cursor-pointer text-green-600 dark:text-green-400 underline decoration-dotted hover:bg-green-500/10 rounded px-0.5 transition-colors"
          >
            {p}
          </span>
        );
      }
      return <span key={i}>{p}</span>;
    });
  }

  const at = livros.filter(l => l.ordemGeral <= 39);
  const nt = livros.filter(l => l.ordemGeral > 39);
  const livrosFiltrados = busca
    ? livros.filter(l => l.nome.toLowerCase().includes(busca.toLowerCase()))
    : [];

  return (
    <div className="flex h-[calc(100vh-3rem)] gap-0">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background flex flex-col">
        <div className="flex border-b">
          {(["livros", "lexico"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSidebar(s)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                sidebar === s ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              {s === "livros" ? "Livros" : "Léxico"}
            </button>
          ))}
        </div>

        {sidebar === "livros" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <input
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar livro..."
                className="w-full border rounded px-3 py-1.5 text-xs"
              />
            </div>
            {busca ? (
              <div className="p-1">
                {livrosFiltrados.map(l => (
                  <button
                    key={l.id}
                    onClick={() => { selecionarLivro(l); setBusca(""); }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded transition-colors ${
                      livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {l.nome}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Antigo Testamento</div>
                <div className="px-1">
                  {at.map(l => (
                    <button
                      key={l.id}
                      onClick={() => selecionarLivro(l)}
                      className={`w-full text-left px-3 py-1 text-xs rounded transition-colors ${
                        livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      {l.nome}
                    </button>
                  ))}
                </div>
                <div className="px-3 py-1.5 mt-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Novo Testamento</div>
                <div className="px-1 pb-4">
                  {nt.map(l => (
                    <button
                      key={l.id}
                      onClick={() => selecionarLivro(l)}
                      className={`w-full text-left px-3 py-1 text-xs rounded transition-colors ${
                        livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      {l.nome}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {sidebar === "lexico" && <LexiconSidebar />}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {livroSel && (
          <div className="border-b px-6 py-3 flex items-center justify-between bg-background">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold">{livroSel.nome}</h2>
              <span className="text-sm text-muted-foreground">Capítulo {capSel}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCapSel(Math.max(1, capSel - 1))}
                disabled={capSel <= 1}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1 max-h-32 overflow-y-auto">
                {Array.from({ length: livroSel.totalCapitulos }, (_, i) => i + 1).map(c => (
                  <button
                    key={c}
                    onClick={() => setCapSel(c)}
                    className={`w-7 h-7 text-xs rounded transition-colors ${
                      capSel === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCapSel(Math.min(livroSel.totalCapitulos, capSel + 1))}
                disabled={capSel >= livroSel.totalCapitulos}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Verses */}
        <div className="flex-1 overflow-y-auto">
          {!livroSel ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-3">
                <BookOpen className="h-16 w-16 mx-auto opacity-20" />
                <p className="text-lg">Selecione um livro para começar</p>
                <p className="text-sm">66 livros com 30.078 versículos disponíveis</p>
              </div>
            </div>
          ) : carregando ? (
            <div className="p-6 space-y-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-6 h-4 bg-muted rounded" />
                  <div className="flex-1 h-4 bg-muted rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-8 space-y-1">
              {versiculos.map(v => (
                <div key={v.id} className="flex gap-3 py-1 group hover:bg-accent/50 rounded px-2 -mx-2 transition-colors">
                  <span className="text-xs text-muted-foreground font-mono mt-0.5 w-5 text-right flex-shrink-0 select-none">
                    {v.numero}
                  </span>
                  <p className="text-[15px] leading-relaxed">
                    {processarTexto(v.texto)}
                  </p>
                </div>
              ))}
              {versiculos.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Nenhum versículo encontrado</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Study Panel */}
      {termoSel && (
        <div className="w-80 border-l bg-background overflow-y-auto">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-sm">Estudo</h3>
            <button onClick={() => setTermoSel(null)} className="p-1 hover:bg-accent rounded">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {termoSel.tipo === "termo" && (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Léxico {termoSel.type === "g" ? "Grego" : "Hebraico"}</span>
                  </div>
                  <p className="text-2xl font-bold font-mono">{termoSel.original}</p>
                  <p className="text-sm text-muted-foreground">{termoSel.strong}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1">Definição</p>
                  <p className="text-sm text-muted-foreground">{termoSel.def}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Clique em outros termos sublinhados no texto para estudá-los.</p>
                </div>
              </>
            )}
            {termoSel.tipo === "pessoa" && (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">Personagem Bíblico</span>
                  </div>
                  <p className="text-2xl font-bold">{termoSel.nome}</p>
                </div>
                <div className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/20">
                  <p className="text-sm">{termoSel.desc}</p>
                </div>
              </>
            )}
            {termoSel.tipo === "local" && (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">Local Bíblico</span>
                  </div>
                  <p className="text-2xl font-bold">{termoSel.nome}</p>
                </div>
                <div className="bg-green-500/5 rounded-lg p-3 border border-green-500/20">
                  <p className="text-sm">{termoSel.desc}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LexiconSidebar() {
  const [palavras, setPalavras] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<"grego" | "hebraico">("grego");

  useEffect(() => {
    fetch(`/api/v1/${tipo === "grego" ? "grego" : "hebraico"}/frequentes`)
      .then(r => r.json())
      .then(data => setPalavras(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [tipo]);

  const filtradas = busca
    ? palavras.filter(p =>
        p.palavraOriginal?.toLowerCase().includes(busca.toLowerCase()) ||
        p.definicaoCurta?.toLowerCase().includes(busca.toLowerCase()) ||
        p.strong?.toLowerCase().includes(busca.toLowerCase())
      )
    : palavras;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex border-b">
        <button
          onClick={() => setTipo("grego")}
          className={`flex-1 py-2 text-xs font-medium ${tipo === "grego" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
        >
          Grego
        </button>
        <button
          onClick={() => setTipo("hebraico")}
          className={`flex-1 py-2 text-xs font-medium ${tipo === "hebraico" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
        >
          Hebraico
        </button>
      </div>
      <div className="p-2">
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar..."
          className="w-full border rounded px-3 py-1.5 text-xs"
        />
      </div>
      <div className="flex-1 overflow-y-auto px-1">
        {filtradas.map(p => (
          <div key={p.id} className="px-3 py-2 text-xs border-b hover:bg-accent/50 transition-colors cursor-pointer rounded mx-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-primary">{p.strong}</span>
              <span className="font-mono">{p.palavraOriginal}</span>
            </div>
            <p className="text-muted-foreground mt-0.5 line-clamp-2">{p.definicaoCurta}</p>
            <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
              {p.classeGramatical && <span>{p.classeGramatical}</span>}
              {p.frequenciaNt && <span>NT: {p.frequenciaNt}x</span>}
              {p.frequenciaAt && <span>AT: {p.frequenciaAt}x</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
