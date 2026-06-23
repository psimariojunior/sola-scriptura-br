"use client";

import { useState } from "react";
import { BookOpen, X, ChevronRight } from "lucide-react";

const CATEGORIAS = [
  { id: "revelacao", nome: "Revelação", cor: "#3b82f6" },
  { id: "deus", nome: "Deus", cor: "#8b5cf6" },
  { id: "cristo", nome: "Cristo", cor: "#ec4899" },
  { id: "espirito", nome: "Espírito Santo", cor: "#06b6d4" },
  { id: "salvacao", nome: "Salvação", cor: "#10b981" },
  { id: "igreja", nome: "Igreja", cor: "#f59e0b" },
  { id: "futuro", nome: "Futuras Coisas", cor: "#ef4444" },
  { id: "antropologia", nome: "Homem e Pecado", cor: "#6366f1" },
];

const DOCTRINAS = [
  // REVELAÇÃO
  { id: "1", nome: "Bibliologia", cat: "revelacao", desc: "Inspiração, inerrância e autoridade das Escrituras.", fund: "2 Timóteo 3:16", refs: "2 Timóteo 3:16; 2 Pedro 1:20-21", detalhe: "A Bíblia é a Palavra infalível de Deus, inspirada pelo Espírito Santo. Não contém erro em seus manuscritos originais. É a autoridade final em todas as questões de fé e prática." },
  { id: "2", nome: "Revelação Geral", cat: "revelacao", desc: "Deus se revela através da criação, consciência e história.", fund: "Romanos 1:20", refs: "Romanos 1:20; Salmo 19:1-6", detalhe: "Deus não se esconde. A criação testifica do seu poder e divindade. Todo ser humano tem acesso a essa revelação." },
  { id: "3", nome: "Revelação Especial", cat: "revelacao", desc: "Deus se revela através de sonhos, profecias e, supremamente, em Jesus Cristo.", fund: "Hebreus 1:1-2", refs: "Hebreus 1:1-2; João 1:1-14", detalhe: "A revelação especial é a comunicação direta de Deus para a humanidade, culminando na pessoa de Jesus Cristo, que é a Palavra encarnada." },
  // DEUS
  { id: "4", nome: "Teologia Proper", cat: "deus", desc: "A natureza e atributos de Deus: soberania, santidade, amor, justiça, misericórdia.", fund: "Êxodo 34:6-7", refs: "Êxodo 34:6-7; Salmo 145:8-9", detalhe: "Deus é uno em essência e três em pessoas: Pai, Filho e Espírito Santo. Todos os atributos divinos são perfeitos e eternos." },
  { id: "5", nome: "Trindade", cat: "deus", desc: "Deus existe como três pessoas distintas: Pai, Filho e Espírito Santo.", fund: "Mateus 28:19", refs: "Mateus 28:19; 2 Coríntios 13:14", detalhe: "A Trindade é o mistério central da fé cristã. Três pessoas, uma substância. Não é três deuses, mas um Deus em três pessoas." },
  { id: "6", nome: "Soberania de Deus", cat: "deus", desc: "Deus é soberano sobre todas as coisas: história, natureza, homens.", fund: "Efésios 1:11", refs: "Efésios 1:11; Romanos 9:21", detalhe: "Nada acontece fora do controle de Deus. Ele governa todas as coisas segundo o seu propósito eterno." },
  { id: "7", nome: "Providência de Deus", cat: "deus", desc: "Deus cuida e sustenta todas as coisas que criou.", fund: "Mateus 6:26", refs: "Mateus 6:26; Atos 17:28", detalhe: "Deus não apenas criou o universo, mas também o sustenta a cada momento. Ele cuida até das aves do céu." },
  // CRISTO
  { id: "8", nome: "Cristologia", cat: "cristo", desc: "Pessoa e obra de Cristo: natureza divina e humana, encarnação.", fund: "João 1:1-14", refs: "João 1:1-14; Colossenses 1:15-20", detalhe: "Jesus Cristo é fully God and fully man. Ele é o mediador único entre Deus e os homens, o único caminho de salvação." },
  { id: "9", nome: "Encarnação", cat: "cristo", desc: "Deus se fez homem em Jesus Cristo, nascido de Maria por obra do Espírito Santo.", fund: "João 1:14", refs: "João 1:14; Lucas 1:35", detalhe: "A encarnação é o ato de Deus se tornar homem sem deixar de ser Deus. Jesus é 100% Deus e 100% homem." },
  { id: "10", nome: "Expiação", cat: "cristo", desc: "Cristo morreu na cruz para pagar o preço dos nossos pecados.", fund: "Isaías 53:5", refs: "Isaías 53:5; 1 Pedro 2:24", detalhe: "Na cruz, Cristo tomou sobre si a ira de Deus devido ao pecado. Ele morreu como substituto pelos pecadores." },
  { id: "11", nome: "Ressurreição", cat: "cristo", desc: "Cristo ressuscitou ao terceiro dia, vencendo a morte.", fund: "1 Coríntios 15:3-4", refs: "1 Coríntios 15:3-4; Mateus 28:5-6", detalhe: "A ressurreição é o centro da fé cristã. Sem ela, a fé é vã. Cristo é o primeiro dos que ressuscitaram." },
  { id: "12", nome: "Ascensão", cat: "cristo", desc: "Cristo subiu ao céu e está sentado à direita do Pai.", fund: "Atos 1:9", refs: "Atos 1:9; Efésios 1:20-21", detalhe: "A ascensão mostra que Cristo completou sua obra na terra e agora intercede por nós." },
  { id: "13", nome: "Segunda Vinda", cat: "cristo", desc: "Cristo voltará em glória para julgar os vivos e os mortos.", fund: "Atos 1:11", refs: "Atos 1:11; 1 Tessalonicenses 4:16-17", detalhe: "A segunda vinda de Cristo é certa. Ele virá para estabelecer seu reino eterno." },
  // ESPÍRITO SANTO
  { id: "14", nome: "Pneumatologia", cat: "espirito", desc: "Personalidade, divindade, obras e dons do Espírito Santo.", fund: "João 14:16-17", refs: "João 14:16-17; Atos 1:8", detalhe: "O Espírito Santo é a terceira pessoa da Trindade. Ele convence o mundo de pecado, regenera os crentes e habita neles." },
  { id: "15", nome: "Regeneração", cat: "espirito", desc: "O Espírito Santo transforma o coração do pecador, dando-lhe nova vida.", fund: "João 3:5-6", refs: "João 3:5-6; Tito 3:5", detalhe: "Regeneração é a obra do Espírito Santo que nos torna novas criaturas em Cristo." },
  { id: "16", nome: "Batismo no Espírito", cat: "espirito", desc: "A experiência do crente ser浸入 no Corpo de Cristo.", fund: "1 Coríntios 12:13", refs: "1 Coríntios 12:13; Atos 1:5", detalhe: "Todo crente é batizado no Espírito Santo no momento da conversão, sendo unido a Cristo e aos outros crentes." },
  // SALVAÇÃO
  { id: "17", nome: "Soteriologia", cat: "salvacao", desc: "Pecado, graça, fé, justificação, regeneração, santificação.", fund: "Efésios 2:8-9", refs: "Efésios 2:8-9; Romanos 3:23-24", detalhe: "A salvação é um dom gratuito de Deus, recebido pela fé em Jesus Cristo. Inclui justificação, regeneração e santificação." },
  { id: "18", nome: "Justificação", cat: "salvacao", desc: "Deus declara o pecador justo diante da Sua lei, por meio da fé em Cristo.", fund: "Romanos 3:24", refs: "Romanos 3:24; Gálatas 2:16", detalhe: "Justificação é um veredicto judicial. Deus nos declara justos porque Cristo pagou o preço dos nossos pecados." },
  { id: "19", nome: "Santificação", cat: "salvacao", desc: "O processo contínuo de sermos conformados à imagem de Cristo.", fund: "1 Tessalonicenses 4:3", refs: "1 Tessalonicenses 4:3; Romanos 12:1-2", detalhe: "Santificação é a obra do Espírito Santo que nos transforma para sermos mais como Cristo." },
  { id: "20", nome: "Perseverança", cat: "salvacao", desc: "O verdadeiro crente perseverará até o fim, guardado por Deus.", fund: "Filipenses 1:6", refs: "Filipenses 1:6; João 10:28-29", detalhe: "Deus guarda os seus filhos. Ninguém pode arrancá-los das mãos do Pai." },
  // IGREJA
  { id: "21", nome: "Eclesiologia", cat: "igreja", desc: "Natureza, missão, governo e sacramentos da igreja.", fund: "Mateus 16:18", refs: "Mateus 16:18; Efésios 5:25-27", detalhe: "A igreja é o Corpo de Cristo, composta por todos os que creram em Jesus. Ela tem missão de evangelizar e discipular." },
  { id: "22", nome: "Batismo", cat: "igreja", desc: "Sacramento que simboliza a morte e ressurreição com Cristo.", fund: "Romanos 6:4", refs: "Romanos 6:4; Mateus 28:19", detalhe: "O batismo é um ato de obediência que identifica o crente com a morte e ressurreição de Cristo." },
  { id: "23", nome: "Ceia do Senhor", cat: "igreja", desc: "Memorial da morte de Cristo até que ele venha.", fund: "1 Coríntios 11:23-26", refs: "1 Coríntios 11:23-26; Mateus 26:26-29", detalhe: "A Ceia do Senhor é um ato de adoração e memorial que antecipa a volta de Cristo." },
  { id: "24", nome: "Missiologia", cat: "igreja", desc: "A missão da igreja de evangelizar o mundo.", fund: "Mateus 28:19-20", refs: "Mateus 28:19-20; Atos 1:8", detalhe: "A Grande Comissão é o mandamento de Cristo para levar o evangelho a todas as nações." },
  // FUTURAS COISAS
  { id: "25", nome: "Escatologia", cat: "futuro", desc: "Retorno de Cristo, arrebatamento, tribulação, milênio, julgamento.", fund: "Apocalipse 21:1", refs: "Apocalipse 21:1; 1 Tessalonicenses 4:16-17", detalhe: "A escatologia estuda as últimas coisas. Cristo voltará para buscar sua igreja e estabelecer seu reino eterno." },
  { id: "26", nome: "Ressurreição dos Mortos", cat: "futuro", desc: "Todos os mortos ressuscitarão: os justos para a vida, os ímpios para o juízo.", fund: "João 5:28-29", refs: "João 5:28-29; 1 Coríntios 15:52", detalhe: "A ressurreição é universal. Todos ressuscitarão, mas com destinos diferentes." },
  { id: "27", nome: "Juízo Final", cat: "futuro", desc: "Deus julgará todos os homens segundo as suas obras.", fund: "Apocalipse 20:12", refs: "Apocalipse 20:12; Mateus 25:31-46", detalhe: "O juízo final será justo e completo. Cada pessoa responderá por suas palavras e ações." },
  { id: "28", nome: "Novos Céus e Nova Terra", cat: "futuro", desc: "Deus criará um novo universo livre do pecado e da morte.", fund: "Apocalipse 21:1", refs: "Apocalipse 21:1; 2 Pedro 3:13", detalhe: "O universo atual será renovado. Não haverá mais lágrimas, dor nem morte." },
  // HOMEM E PECADO
  { id: "29", nome: "Hamartiologia", cat: "antropologia", desc: "Origem, natureza e efeito do pecado na humanidade.", fund: "Romanos 5:12", refs: "Romanos 5:12; Gênesis 3:1-19", detalhe: "O pecado entrou no mundo pela desobediência de Adão e corrompeu toda a humanidade." },
  { id: "30", nome: "Antropologia", cat: "antropologia", desc: "A natureza do homem: criado à imagem de Deus, mas caído em pecado.", fund: "Gênesis 1:27", refs: "Gênesis 1:27; Romanos 3:23", detalhe: "O homem foi criado à imagem de Deus, mas o pecado corrompeu essa imagem. Agora precisa de redenção." },
  { id: "31", nome: "Angelologia", cat: "deus", desc: "Natureza, hierarquia e ministérios dos anjos.", fund: "Hebreus 1:14", refs: "Hebreus 1:14; Salmo 91:11", detalhe: "Anjos são seres criados por Deus para servir e proteger os crentes. São ministros invisíveis." },
  { id: "32", nome: "Demonologia", cat: "antropologia", desc: "Origem, natureza e atividades dos demônios.", fund: "Efésios 6:12", refs: "Efésios 6:12; Marcos 5:1-20", detalhe: "Demônios são anjos caídos que se opõem a Deus e ao seu povo. Serão julgados no fim." },
  { id: "33", nome: "Soteriologia Bíblica", cat: "salvacao", desc: "O plano completo de salvação: de Adão a Cristo.", fund: "Efésios 1:3-14", refs: "Efésios 1:3-14; Romanos 8:29-30", detalhe: "Deus planejou a salvação antes da fundação do mundo. Ela é eterna e irrevogável." },
];

export default function TeologiaPage() {
  const [catFiltro, setCatFiltro] = useState("");
  const [selecionada, setSelecionada] = useState<any>(null);
  const [busca, setBusca] = useState("");

  const filtradas = DOCTRINAS.filter(d => {
    const matchCat = !catFiltro || d.cat === catFiltro;
    const matchBusca = !busca || d.nome.toLowerCase().includes(busca.toLowerCase()) || d.desc.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

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
        placeholder="Buscar doutrina..."
        className="w-full border rounded-lg px-4 py-2 text-sm"
      />

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setCatFiltro("")} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!catFiltro ? "bg-primary text-primary-foreground" : "border hover:bg-accent"}`}>
          Todas ({DOCTRINAS.length})
        </button>
        {CATEGORIAS.map(c => {
          const count = DOCTRINAS.filter(d => d.cat === c.id).length;
          return (
            <button key={c.id} onClick={() => setCatFiltro(c.id)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${catFiltro === c.id ? "text-white" : "border hover:bg-accent"}`} style={catFiltro === c.id ? { backgroundColor: c.cor } : {}}>
              {c.nome} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtradas.map(d => {
          const cat = CATEGORIAS.find(c => c.id === d.cat);
          return (
            <div key={d.id} onClick={() => setSelecionada(d)} className="border rounded-lg p-5 cursor-pointer hover:shadow-md transition-all space-y-3 group">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.cor }} />
                <span className="text-xs text-muted-foreground">{cat?.nome}</span>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{d.nome}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{d.desc}</p>
              <p className="text-xs text-primary font-medium">{d.fund}</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>

      {selecionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelecionada(null)}>
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 space-y-5 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selecionada.nome}</h2>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: CATEGORIAS.find(c => c.id === selecionada.cat)?.cor }}>
                  {CATEGORIAS.find(c => c.id === selecionada.cat)?.nome}
                </span>
              </div>
              <button onClick={() => setSelecionada(null)} className="p-2 hover:bg-accent rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="bg-muted/50 rounded-lg p-4"><h3 className="font-semibold mb-2">Definição</h3><p className="text-sm leading-relaxed">{selecionada.desc}</p></div>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20"><h3 className="font-semibold mb-2 text-primary">Fundamento Bíblico</h3><p className="text-sm font-mono">{selecionada.fund}</p></div>
            <div><h3 className="font-semibold mb-2">Referências</h3><p className="text-sm text-muted-foreground">{selecionada.refs}</p></div>
            <div><h3 className="font-semibold mb-2">Explicação Detalhada</h3><p className="text-sm text-muted-foreground leading-relaxed">{selecionada.detalhe}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
