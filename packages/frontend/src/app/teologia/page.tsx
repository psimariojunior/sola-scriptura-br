"use client";

import { useState } from "react";
import { BookOpen, X } from "lucide-react";

const CATEGORIAS = [
  { id: "1", nome: "Revelação", slug: "revelacao" },
  { id: "2", nome: "Deus", slug: "deus" },
  { id: "3", nome: "Cristo", slug: "cristo" },
  { id: "4", nome: "Salvação", slug: "salvacao" },
  { id: "5", nome: "Igreja", slug: "igreja" },
  { id: "6", nome: "Espírito Santo", slug: "espirito-santo" },
  { id: "7", nome: "Futuras Coisas", slug: "futuras-coisas" },
  { id: "8", nome: "Pecado", slug: "pecado" },
];

const DOCTRINAS = [
  { id: "1", nome: "Bibliologia", categoria: "revelacao", descricao: "Inspiração, inerrância e autoridade das Escrituras. A Bíblia é a Palavra infalível de Deus, inspirada pelo Espírito Santo.", fundamento: "2 Timóteo 3:16", referencias: "2 Timóteo 3:16; 2 Pedro 1:20-21", explicacao: "A Bibliologia estuda a natureza e autoridade da Bíblia. Os cristãos crêem que toda a Escritura é inspirada por Deus e é útil para ensinar, repreender, corrigir e instruir em justiça." },
  { id: "2", nome: "Teologia Proper", categoria: "deus", descricao: "Atributos de Deus: soberania, santidade, amor, justiça, misericórdia, onisciência, onipotência.", fundamento: "Êxodo 34:6-7", referencias: "Êxodo 34:6-7; Salmo 145:8-9", explicacao: "Estuda a natureza de Deus em Sua essência e atributos. Deus é um em essência e três em pessoas: Pai, Filho e Espírito Santo." },
  { id: "3", nome: "Cristologia", categoria: "cristo", descricao: "Pessoa e obra de Cristo: natureza divina e humana, encarnação, expiação, ressurreição, ascensão.", fundamento: "João 1:1-14", referencias: "João 1:1-14; Colossenses 1:15-20", explicacao: "Cristologia estuda quem é Jesus Cristo. Ele é fully God and fully man, o único mediador entre Deus e os homens." },
  { id: "4", nome: "Soteriologia", categoria: "salvacao", descricao: "Pecado, graça, fé, justificação, regeneração, santificação, perseverança.", fundamento: "Efésios 2:8-9", referencias: "Efésios 2:8-9; Romanos 3:23-24", explicacao: "Soteriologia estuda o plano de salvação de Deus. O homem está perdido em pecado, mas Deus provou uma solução em Cristo." },
  { id: "5", nome: "Pneumatologia", categoria: "espirito-santo", descricao: "Personalidade, divindade, obras e dons do Espírito Santo.", fundamento: "João 14:16-17", referencias: "João 14:16-17; Atos 1:8", explicacao: "Pneumatologia estuda a pessoa e obra do Espírito Santo. Ele convence o mundo de pecado, regenera os crentes e habita neles." },
  { id: "6", nome: "Eclesiologia", categoria: "igreja", descricao: "Natureza, missão, governo e sacramentos da igreja.", fundamento: "Mateus 16:18", referencias: "Mateus 16:18; Efésios 5:25-27", explicacao: "Eclesiologia estuda a igreja como Corpo de Cristo. A igreja é composta por todos os que creram em Jesus." },
  { id: "7", nome: "Escatologia", categoria: "futuras-coisas", descricao: "Retorno de Cristo, arrebatamento, tribulação, milênio, julgamento final, céu e inferno.", fundamento: "Apocalipse 21:1", referencias: "Apocalipse 21:1; 1 Tessalonicenses 4:16-17", explicacao: "Escatologia estuda as últimas coisas. Cristo voltará para buscar Sua igreja e estabelecer Seu reino eterno." },
  { id: "8", nome: "Hamartiologia", categoria: "pecado", descricao: "Origem, natureza e efeito do pecado na humanidade.", fundamento: "Romanos 5:12", referencias: "Romanos 5:12; Gênesis 3:1-19", explicacao: "Hamartiologia estuda o pecado. O pecado entrou no mundo pela desobediência de Adão e corrompeu toda a humanidade." },
  { id: "9", nome: "Angelologia", categoria: "deus", descricao: "Natureza, hierarquia e ministérios dos anjos.", fundamento: "Hebreus 1:14", referencias: "Hebreus 1:14; Salmo 91:11", explicacao: "Angelologia estuda os anjos como seres criados por Deus para servir e proteger os crentes." },
  { id: "10", nome: "Demonologia", categoria: "pecado", descricao: "Origem, natureza e atividades dos demônios.", fundamento: "Efésios 6:12", referencias: "Efésios 6:12; Marcos 5:1-20", explicacao: "Demonologia estuda os demônios como anjos caídos que se opõem a Deus e ao Seu povo." },
  { id: "11", nome: "Eclesiologia Prática", categoria: "igreja", descricao: "Práticas da igreja: batismo, Ceia do Senhor, adoração, disciplina.", fundamento: "Mateus 28:19-20", referencias: "Mateus 28:19-20; Atos 2:42", explicacao: "Estuda as práticas fundamentais da igreja local e como ela deve funcionar." },
  { id: "12", nome: "Missiologia", categoria: "igreja", descricao: "A missão da igreja de evangelizar o mundo.", fundamento: "Mateus 28:19-20", referencias: "Mateus 28:19-20; Atos 1:8", explicacao: "Missiologia estuda como a igreja cumpre a Grande Comissão de levar o evangelho a todas as nações." },
];

export default function TeologiaPage() {
  const [catFiltro, setCatFiltro] = useState("");
  const [selecionada, setSelecionada] = useState<any>(null);

  const filtradas = catFiltro
    ? DOCTRINAS.filter(d => d.categoria === catFiltro)
    : DOCTRINAS;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Teologia Sistemática</h1>
          <p className="text-muted-foreground">{DOCTRINAS.length} doutrinas fundamentais da fé</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCatFiltro("")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !catFiltro ? "bg-primary text-primary-foreground" : "border hover:bg-accent"
          }`}
        >
          Todas
        </button>
        {CATEGORIAS.map(c => (
          <button
            key={c.slug}
            onClick={() => setCatFiltro(c.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              catFiltro === c.slug ? "bg-primary text-primary-foreground" : "border hover:bg-accent"
            }`}
          >
            {c.nome}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtradas.map(d => (
          <div
            key={d.id}
            onClick={() => setSelecionada(d)}
            className="border rounded-lg p-5 cursor-pointer hover:shadow-md transition-all space-y-3 group"
          >
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{d.nome}</h3>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary font-medium">
              {CATEGORIAS.find(c => c.slug === d.categoria)?.nome || d.categoria}
            </span>
            <p className="text-sm text-muted-foreground line-clamp-3">{d.descricao}</p>
            <p className="text-xs text-primary font-medium">{d.fundamento}</p>
          </div>
        ))}
      </div>

      {selecionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelecionada(null)}>
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 space-y-5 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selecionada.nome}</h2>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-secondary font-medium">
                  {CATEGORIAS.find(c => c.slug === selecionada.categoria)?.nome}
                </span>
              </div>
              <button onClick={() => setSelecionada(null)} className="p-2 hover:bg-accent rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Definição</h3>
              <p className="text-sm leading-relaxed">{selecionada.descricao}</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <h3 className="font-semibold mb-2 text-primary">Fundamento Bíblico</h3>
              <p className="text-sm font-mono">{selecionada.fundamento}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Referências</h3>
              <p className="text-sm text-muted-foreground">{selecionada.referencias}</p>
            </div>

            {selecionada.explicacao && (
              <div>
                <h3 className="font-semibold mb-2">Explicação Detalhada</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selecionada.explicacao}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
