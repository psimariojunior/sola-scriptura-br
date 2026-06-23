"use client";

import { useState } from "react";
import { Clock, ChevronDown, ChevronRight } from "lucide-react";

const PERIODOS = [
  {
    nome: "Criação e Patriarcas",
    inicio: -4000,
    fim: -1800,
    cor: "#3b82f6",
    eventos: [
      { ano: -4000, nome: "Criação do mundo", ref: "Gênesis 1-2", desc: "Deus cria os céus, a terra, os animais e o homem à Sua imagem." },
      { ano: -3800, nome: "Queda do homem", ref: "Gênesis 3", desc: "Adão e Eva desobedecem a Deus. O pecado entra no mundo." },
      { ano: -3500, nome: "Dilúvio", ref: "Gênesis 6-9", desc: "Deus purifica a terra pelo dilúvio. Noé e sua família sobrevivem." },
      { ano: -2300, nome: "Chamado de Abraão", ref: "Gênesis 12", desc: "Deus chama Abraão para ir à terra de Canaã." },
      { ano: -2100, nome: "Nascimento de Isaque", ref: "Gênesis 21", desc: "Filho da promessa nasce de Abraão e Sara." },
      { ano: -2000, nome: "Escada de Jacó", ref: "Gênesis 28", desc: "Jacó vê uma escada conectando o céu à terra." },
      { ano: -1875, nome: "José no Egito", ref: "Gênesis 37-50", desc: "José é vendido como escravo e se torna governador." },
    ]
  },
  {
    nome: "Êxodo e Lei",
    inicio: -1800,
    fim: -1400,
    cor: "#ef4444",
    eventos: [
      { ano: -1526, nome: "Nascimento de Moisés", ref: "Êxodo 2", desc: "Moisés nasce e é salvo das águas do Nilo." },
      { ano: -1446, nome: "Êxodo do Egito", ref: "Êxodo 12-14", desc: "Israel é libertado da escravidão no Egito." },
      { ano: -1446, nome: "Recebimento da Lei", ref: "Êxodo 20", desc: "Moisés recebe os Dez Mandamentos no Monte Sinai." },
      { ano: -1446, nome: "Construção do Tabernáculo", ref: "Êxodo 25-40", desc: "Israel constrói o Tabernáculo para adorar a Deus." },
      { ano: -1407, nome: "Morte de Moisés", ref: "Deuteronômio 34", desc: "Moisés morre antes de entrar na Terra Prometida." },
    ]
  },
  {
    nome: "Conquista e Juízes",
    inicio: -1400,
    fim: -1050,
    cor: "#f59e0b",
    eventos: [
      { ano: -1406, nome: "Conquista de Jericó", ref: "Josué 6", desc: "Israel entra em Canaã. Jericó cai ante as trombetas." },
      { ano: -1380, nome: "Débora e Baraque", ref: "Juízes 4-5", desc: "Juíza profetisa lidera Israel na batalha." },
      { ano: -1200, nome: "Sansão", ref: "Juízes 13-16", desc: "Juiz com força sobre-humana, traído por Dalila." },
      { ano: -1100, nome: "Samuel", ref: "1 Samuel 1-25", desc: "Último juiz e primeiro profeta da monarquia." },
    ]
  },
  {
    nome: "Reis Unido",
    inicio: -1050,
    fim: -930,
    cor: "#8b5cf6",
    eventos: [
      { ano: -1050, nome: "Saul ungido rei", ref: "1 Samuel 10", desc: "Primeiro rei de Israel. Desobedece a Deus." },
      { ano: -1010, nome: "Davi ungido rei", ref: "1 Samuel 16", desc: "Homem segundo o coração de Deus." },
      { ano: -1000, nome: "Davi conquista Jerusalém", ref: "2 Samuel 5", desc: "Jerusalém se torna a capital de Israel." },
      { ano: -970, nome: "Salomão e o Templo", ref: "1 Reis 6-8", desc: "Salomão constrói o Templo de Jerusalém." },
    ]
  },
  {
    nome: "Reinos Divididos",
    inicio: -930,
    fim: -586,
    cor: "#06b6d4",
    eventos: [
      { ano: -930, nome: "Divisão do reino", ref: "1 Reis 12", desc: "Israel se divide em Israel (norte) e Judá (sul)." },
      { ano: -870, nome: "Elias no Monte Carmelo", ref: "1 Reis 18", desc: "Profeta desafia os profetas de Baal." },
      { ano: -722, nome: "Queda de Israel", ref: "2 Reis 17", desc: "Assíria destrói o reino do norte." },
      { ano: -627, nome: "Jeremias profetiza", ref: "Jeremias 1", desc: "Profeta avisa sobre a destruição de Jerusalém." },
      { ano: -586, nome: "Destruição de Jerusalém", ref: "2 Reis 25", desc: "Babilônia destrói o Templo e exila o povo." },
    ]
  },
  {
    nome: "Exílio e Retorno",
    inicio: -586,
    fim: -400,
    cor: "#10b981",
    eventos: [
      { ano: -586, nome: "Exílio babilônico", ref: "2 Reis 25", desc: "Israelitas deportados para a Babilônia." },
      { ano: -539, nome: "Ciro permite retorno", ref: "Esdras 1", desc: "Rei Ciro da Pérsia permite o retorno." },
      { ano: -516, nome: "Segundo Templo", ref: "Esdras 6", desc: "Reconstrução do Templo de Jerusalém." },
      { ano: -458, nome: "Esdras e Neemias", ref: "Esdras 7, Neemias 1", desc: "Reforma espiritual e reconstrução dos muros." },
    ]
  },
  {
    nome: "Período Intertestamentário",
    inicio: -400,
    fim: -4,
    cor: "#6366f1",
    eventos: [
      { ano: -332, nome: "Alexandre, o Grande", ref: "Daniel 8", desc: "Conquista grega da Palestina." },
      { ano: -167, nome: "Revolta dos Macabeus", ref: "1 Macabeus", desc: "Rebelião contra a opressão helenística." },
      { ano: -63, nome: "Roma domina", ref: "Daniel 2", desc: "Roma assume controle da região." },
    ]
  },
  {
    nome: "Vida de Jesus",
    inicio: -4,
    fim: 33,
    cor: "#ec4899",
    eventos: [
      { ano: -4, nome: "Nascimento de Jesus", ref: "Mateus 1-2, Lucas 1-2", desc: "Nascido em Belém, adorado por pastores e magos." },
      { ano: 27, nome: "Batismo de Jesus", ref: "Mateus 3", desc: "Batizado por João Batista no Rio Jordão." },
      { ano: 28, nome: "Início do ministério", ref: "Lucas 4", desc: "Jesus começa a pregar e a fazer milagres." },
      { ano: 30, nome: "Última Ceia", ref: "Mateus 26", desc: "Jesus estabelece a Ceia do Senhor." },
      { ano: 30, nome: "Crucificação", ref: "Mateus 27", desc: "Jesus é crucificado no Calvário." },
      { ano: 30, nome: "Ressurreição", ref: "Mateus 28", desc: "Jesus ressuscita ao terceiro dia." },
      { ano: 33, nome: "Ascensão", ref: "Atos 1", desc: "Jesus sobe ao céu." },
    ]
  },
  {
    nome: "Igreja Primitiva",
    inicio: 33,
    fim: 100,
    cor: "#f97316",
    eventos: [
      { ano: 33, nome: "Pentecostes", ref: "Atos 2", desc: "O Espírito Santo desce sobre os apóstolos." },
      { ano: 34, nome: "Martyrio de Estêvão", ref: "Atos 7", desc: "Primeiro mártir cristão." },
      { ano: 37, nome: "Conversão de Paulo", ref: "Atos 9", desc: "Saulo se converte e se torna apóstolo." },
      { ano: 49, nome: "Primeira viagem de Paulo", ref: "Atos 13-14", desc: "Paulo e Barnabé pregam na Ásia Menor." },
      { ano: 62, nome: "Epístolas de Paulo", ref: "Romanos-Filemom", desc: "Paulo escreve suas cartas às igrejas." },
      { ano: 67, nome: "Martírio de Paulo", ref: "2 Timóteo 4", desc: "Paulo é martirizado em Roma." },
      { ano: 95, nome: "Apocalipse", ref: "Apocalipse 1", desc: "João escreve o Apocalipse na ilha de Patmos." },
    ]
  },
];

export default function CronologiaPage() {
  const [periodoSel, setPeriodoSel] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Clock className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Cronologia Bíblica</h1>
          <p className="text-muted-foreground">4.000 anos de história bíblica</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-0">
          {PERIODOS.map((periodo, pi) => (
            <div key={periodo.nome}>
              <button
                onClick={() => setPeriodoSel(periodoSel === periodo.nome ? null : periodo.nome)}
                className="w-full flex items-center gap-3 py-3 px-3 hover:bg-accent/50 rounded-lg transition-colors relative z-10"
              >
                <div className="w-3 h-3 rounded-full border-2 bg-background flex-shrink-0" style={{ borderColor: periodo.cor }} />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{periodo.nome}</h3>
                    <span className="text-xs text-muted-foreground">
                      {Math.abs(periodo.inicio)} a.C. — {periodo.fim > 0 ? `${periodo.fim} d.C.` : `${Math.abs(periodo.fim)} a.C.`}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: periodo.cor, width: '100%' }} />
                  </div>
                </div>
                {periodoSel === periodo.nome ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>

              {periodoSel === periodo.nome && (
                <div className="ml-9 space-y-2 mb-4 relative z-10">
                  {periodo.eventos.map((evento, ei) => (
                    <div key={ei} className="border rounded-lg p-3 bg-background hover:shadow-sm transition-shadow ml-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: `${periodo.cor}20`, color: periodo.cor }}>
                          {Math.abs(evento.ano)} {evento.ano < 0 ? "a.C." : "d.C."}
                        </span>
                        <h4 className="font-medium text-sm">{evento.nome}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{evento.ref}</p>
                      <p className="text-sm text-muted-foreground">{evento.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
