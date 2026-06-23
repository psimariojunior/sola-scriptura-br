"use client";

import { useState } from "react";
import { Users, Search, ChevronRight } from "lucide-react";

const PERSONAGENS = [
  { id: "1", nomePortugues: "Adão", nomeOriginal: "Adam", biografia: "Primeiro homem, criado por Deus do pó da terra. Colocado no Jardim do Éden. Cairiu em pecado ao comer do fruto proibido.", significadoNome: "Formado do pó", primeiraMencao: "Gênesis 2:7", eventosPrincipais: "Criação, Queda, Expulsão do Éden", versoesReferencias: "Gênesis 2-3" },
  { id: "2", nomePortugues: "Eva", nomeOriginal: "Havah", biografia: "Primeira mulher, criada da costela de Adão. Mãe de toda a humanidade.", significadoNome: "Vida", primeiraMencao: "Gênesis 2:22", eventosPrincipais: "Criação, Queda", versoesReferencias: "Gênesis 2-3" },
  { id: "3", nomePortugues: "Noé", nomeOriginal: "Noach", biografia: "Homem justo que andou com Deus. Construiu a arca para sobreviver ao dilúvio.", significadoNome: "Descanso, consolo", primeiraMencao: "Gênesis 5:29", eventosPrincipais: "Dilúvio, Aliança com Deus", versoesReferencias: "Gênesis 6-9" },
  { id: "4", nomePortugues: "Abraão", nomeOriginal: "Avraham", biografia: "Pai dos crentes. Chamado por Deus para sair de Ur. Pai da fé pela obediência.", significadoNome: "Pai de muitas nações", primeiraMencao: "Gênesis 11:26", eventosPrincipais: "Chamado, Sacrifício de Isaque, Aliança", versoesReferencias: "Gênesis 12-25" },
  { id: "5", nomePortugues: "Isaque", nomeOriginal: "Yitzchak", biografia: "Filho da promessa de Abraão e Sara. Pai de Jacó e Esaú.", significadoNome: "Riso", primeiraMencao: "Gênesis 17:19", eventosPrincipais: "Sacrifício quase, Bendição", versoesReferencias: "Gênesis 21-27" },
  { id: "6", nomePortugues: "Jacó", nomeOriginal: "Yaakov", biografia: "Pai das 12 tribos de Israel. Lutou com o anjo e foi renomeado Israel.", significadoNome: "Suplantador", primeiraMencao: "Gênesis 25:26", eventosPrincipais: "Escada de Jacó, Luta com o anjo", versoesReferencias: "Gênesis 25-49" },
  { id: "7", nomePortugues: "José", nomeOriginal: "Yosef", biografia: "Filho favorito de Jacó. Vendido como escravo. Tornou-se governador do Egito.", significadoNome: "Ele vai acrescentar", primeiraMencao: "Gênesis 30:24", eventosPrincipais: "Sonhos, Escravidão, Elevação", versoesReferencias: "Gênesis 37-50" },
  { id: "8", nomePortugues: "Moisés", nomeOriginal: "Moshe", biografia: "Liberador de Israel do Egito. Recebeu os Dez Mandamentos. Maior profeta do AT.", significadoNome: "Tirado das águas", primeiraMencao: "Êxodo 2:10", eventosPrincipais: "Êxodo, Leis, Travessia do Mar Vermelho", versoesReferencias: "Êxodo 2-34, Deuteronômio 34" },
  { id: "9", nomePortugues: "Josué", nomeOriginal: "Yehoshua", biografia: "Sucessor de Moisés. Liderou Israel na conquista da Terra Prometida.", significadoNome: "Salvação", primeiraMencao: "Números 13:16", eventosPrincipais: "Conquista de Canaã", versoesReferencias: "Josué 1-24" },
  { id: "10", nomePortugues: "Samuel", nomeOriginal: "Shmuel", biografia: "Último juiz e primeiro profeta da monarquia. Ungiu Saul e Davi.", significadoNome: "Ouve Deus", primeiraMencao: "1 Samuel 1:20", eventosPrincipais: "Ungiu reis, Oração", versoesReferencias: "1 Samuel 1-25" },
  { id: "11", nomePortugues: "Saul", nomeOriginal: "Sha'ul", biografia: "Primeiro rei de Israel. Desobedeceu a Deus e perdeu o reino.", significadoNome: "Pedida", primeiraMencao: "1 Samuel 9:2", eventosPrincipais: "Ungido, Desobediência, Queda", versoesReferencias: "1 Samuel 9-31" },
  { id: "12", nomePortugues: "Davi", nomeOriginal: "David", biografia: "Segundo rei de Israel. Homem segundo o coração de Deus. Derrotou Golias.", significadoNome: "Amado", primeiraMencao: "1 Samuel 16:12", eventosPrincipais: "Golias, Adulterio, Arrependimento", versoesReferencias: "1 Samuel 16 - 1 Reis 2" },
  { id: "13", nomePortugues: "Salomão", nomeOriginal: "Shlomo", biografia: "Filho de Davi. Construiu o Templo. Conhecido pela sabedoria.", significadoNome: "Paz", primeiraMencao: "2 Samuel 12:24", eventosPrincipais: "Templo, Sabedoria, Queda", versoesReferencias: "1 Reis 1-11" },
  { id: "14", nomePortugues: "Elias", nomeOriginal: "Eliyahu", biografia: "Profeta que desafiou os profetas de Baal. Foi arrebatado num carro de fogo.", significadoNome: "Meu Deus é Yahweh", primeiraMencao: "1 Reis 17:1", eventosPrincipais: "Monte Carmelo, Arrebatamento", versoesReferencias: "1 Reis 17 - 2 Reis 2" },
  { id: "15", nomePortugues: "Eliseu", nomeOriginal: "Elisha", biografia: "Sucessor de Elias. Recebeu o dobro do poder. Fez muitos milagres.", significadoNome: "Deus é salvação", primeiraMencao: "1 Reis 19:16", eventosPrincipais: "Curou Naamán, Multipliou azeite", versoesReferencias: "1 Reis 19 - 2 Reis 13" },
  { id: "16", nomePortugues: "Isaías", nomeOriginal: "Yeshayahu", biografia: "Grande profeta. Profetizou a vinda do Messias. Escreveu o maior livro profético.", significadoNome: "Salvação de Yahweh", primeiraMencao: "Isaías 1:1", eventosPrincipais: "Profecias messiânicas, Servo Sofredor", versoesReferencias: "Isaías 1-66" },
  { id: "17", nomePortugues: "Jeremias", nomeOriginal: "Yirmeyahu", biografia: "Profeta das nações. Chorou sobre a destruição de Jerusalém.", significadoNome: "Yahweh exaltará", primeiraMencao: "Jeremias 1:1", eventosPrincipais: "Destruição de Jerusalém, Nova Aliança", versoesReferencias: "Jeremias 1-52" },
  { id: "18", nomePortugues: "Daniel", nomeOriginal: "Daniyyel", biografia: "Judeu exilado na Babilônia. Intérprete de sonhos. Sobreviveu na cova dos leões.", significadoNome: "Deus é juiz", primeiraMencao: "Daniel 1:6", eventosPrincipais: "Sonhos, Cova dos leões", versoesReferencias: "Daniel 1-12" },
  { id: "19", nomePortugues: "Jonas", nomeOriginal: "Yonah", biografia: "Profeta que fugiu de Deus. Foi engolido por um grande peixe.", significadoNome: "Pomba", primeiraMencao: "Jonas 1:1", eventosPrincipais: "Peixe grande, Arrependimento de Nínive", versoesReferencias: "Jonas 1-4" },
  { id: "20", nomePortugues: "Pedro", nomeOriginal: "Kepha", biografia: "Líder dos apóstolos. Pescador chamado por Jesus. Primeiro a confessar Jesus.", significadoNome: "Pedra", primeiraMencao: "Mateus 4:18", eventosPrincipais: "Confissão, Negativa, Pentecostes", versoesReferencias: "Mateus 4, Atos 2" },
  { id: "21", nomePortugues: "Paulo", nomeOriginal: "Paulus", biografia: "Apóstolo dos gentios. Perseguiu a igreja antes da conversão. Escreveu 13 epístolas.", significadoNome: "Pequeno", primeiraMencao: "Atos 7:58", eventosPrincipais: "Conversão em Damasco, Viagens missionárias", versoesReferencias: "Atos 9-28, Romanos-Filemom" },
  { id: "22", nomePortugues: "João", nomeOriginal: "Yochanan", biografia: "Apóstolo amado. Autor do Evangelho de João e Apocalipse.", significadoNome: "Deus é gracioso", primeiraMencao: "Mateus 4:21", eventosPrincipais: "Última Ceia, Cruz, Patmos", versoesReferencias: "João 13-21, Apocalipse" },
  { id: "23", nomePortugues: "Maria", nomeOriginal: "Miriam", biografia: "Mãe de Jesus. Virgem concebeu pelo Espírito Santo.", significadoNome: "Rebelde", primeiraMencao: "Lucas 1:26", eventosPrincipais: "Anunciação, Nascimento, Cruz", versoesReferencias: "Mateus 1-2, Lucas 1-2" },
  { id: "24", nomePortugues: "Rute", nomeOriginal: "Ruth", biografia: "Moabita que seguiu sua sogra Noemi. Casou-se com Boaz. Avó de Davi.", significadoNome: "Amiga", primeiraMencao: "Rute 1:4", eventosPrincipais: "Lealdade, Colheita", versoesReferencias: "Rute 1-4" },
  { id: "25", nomePortugues: "Jó", nomeOriginal: "Iyov", biografia: "Homem justo que sofreu enormemente. Testou a soberania de Deus.", significadoNome: "Inimigo perseguido", primeiraMencao: "Jó 1:1", eventosPrincipais: "Perdas, Restauração", versoesReferencias: "Jó 1-42" },
  { id: "26", nomePortugues: "Débora", nomeOriginal: "Devorah", biografia: "Juíza de Israel. Profetisa que liderou Israel na batalha.", significadoNome: "Abelha", primeiraMencao: "Juízes 4:4", eventosPrincipais: "Batalha, Cântico", versoesReferencias: "Juízes 4-5" },
  { id: "27", nomePortugues: "Gideão", nomeOriginal: "Gideon", biografia: "Juiz de Israel. Com 300 homens derrotou os midianitas.", significadoNome: "Cortador", primeiraMencao: "Juízes 6:11", eventosPrincipais: "Tecido de lã, Tocha", versoesReferencias: "Juízes 6-8" },
  { id: "28", nomePortugues: "Sansão", nomeOriginal: "Shimshon", biografia: "Juiz de Israel. Força sobre-humana. Traído por Dalila.", significadoNome: "Sol", primeiraMencao: "Juízes 13:24", eventosPrincipais: "Força, Traição, Queda", versoesReferencias: "Juízes 13-16" },
  { id: "29", nomePortugues: "Ló", nomeOriginal: "Lot", biografia: "Sobrinho de Abraão. Viveu em Sodoma. Foi resgatado quando a cidade foi destruída.", significadoNome: "Coberto", primeiraMencao: "Gênesis 11:27", eventosPrincipais: "Destruição de Sodoma", versoesReferencias: "Gênesis 13-19" },
  { id: "30", nomePortugues: "Neemias", nomeOriginal: "Nehemyah", biografia: "Construiu os muros de Jerusalém. Reformador.", significadoNome: "Consolador de Deus", primeiraMencao: "Neemias 1:1", eventosPrincipais: "Muros de Jerusalém", versoesReferencias: "Neemias 1-13" },
  { id: "31", nomePortugues: "Esdras", nomeOriginal: "Ezra", biografia: "Escriba e sacerdote. Leu a Lei ao povo.", significadoNome: "Ajuda", primeiraMencao: "Esdras 7:1", eventosPrincipais: "Leitura da Lei", versoesReferencias: "Esdras 7-10" },
  { id: "32", nomePortugues: "Esther", nomeOriginal: "Hadassah", biografia: "Rainha persa que salvou os judeus do massacre.", significadoNome: "Estrela", primeiraMencao: "Ester 2:7", eventosPrincipais: "Salvou os judeus", versoesReferencias: "Ester 1-10" },
  { id: "33", nomePortugues: "João Batista", nomeOriginal: "Yochanan", biografia: "O batizador. Preparou o caminho do Senhor.", significadoNome: "Deus é gracious", primeiraMencao: "Lucas 1:13", eventosPrincipais: "Batismo de Jesus, Decapitação", versoesReferencias: "Mateus 3, 14" },
  { id: "34", nomePortugues: "Lázaro", nomeOriginal: "Elazar", biografia: "Amigo de Jesus que morreu e foi ressuscitado após 4 dias.", significadoNome: "Deus ajudou", primeiraMencao: "João 11:1", eventosPrincipais: "Morte e Ressurreição", versoesReferencias: "João 11" },
  { id: "35", nomePortugues: "Maria Madalena", nomeOriginal: "Miriam", biografia: "Discípula de Jesus. Primeira a ver Jesus ressurreto.", significadoNome: "De Magdala", primeiraMencao: "Lucas 8:2", eventosPrincipais: "Testemunha da Ressurreição", versoesReferencias: "Lucas 8, João 20" },
  { id: "36", nomePortugues: "Bartolomeu", nomeOriginal: "Natanael", biografia: "Um dos 12 apóstolos. Primeiro a declarar Jesus como Filho de Deus.", significadoNome: "Filho de Tolomai", primeiraMencao: "João 1:45", eventosPrincipais: "Chamado por Jesus", versoesReferencias: "João 1:45-51" },
  { id: "37", nomePortugues: "Mateus", nomeOriginal: "Mattityahu", biografia: "Publicano chamado por Jesus. Autor do Evangelho de Mateus.", significadoNome: "Dom de Deus", primeiraMencao: "Mateus 9:9", eventosPrincipais: "Chamado, Publicano", versoesReferencias: "Mateus 9:9" },
  { id: "38", nomePortugues: "Tomé", nomeOriginal: "Toma", biografia: "Conhecido como 'Cético'. Duvidou da ressurreição até ver as marcas.", significadoNome: "Gêmeo", primeiraMencao: "João 20:24", eventosPrincipais: "Dúvida, Verificação", versoesReferencias: "João 20:24-29" },
  { id: "39", nomePortugues: "Judas Iscariotes", nomeOriginal: "Yehudah", biografia: "O traidor. Entregou Jesus por 30 pratas.", significadoNome: "Louvor a Yahweh", primeiraMencao: "Mateus 10:4", eventosPrincipais: "Traição, Arrependimento", versoesReferencias: "Mateus 26-27" },
  { id: "40", nomePortugues: "Rahab", nomeOriginal: "Rachav", biografia: "Prostituta de Jericó que escondeu os espias israelitas. Ancestral de Jesus.", significadoNome: "A larga", primeiraMencao: "Josué 2:1", eventosPrincipais: "Escondeu espias", versoesReferencias: "Josué 2, Mateus 1" },
];

export default function PersonagensPage() {
  const [selecionado, setSelecionado] = useState<any>(null);
  const [busca, setBusca] = useState("");

  const filtrados = PERSONAGENS.filter(p =>
    !busca || 
    p.nomePortugues?.toLowerCase().includes(busca.toLowerCase()) ||
    p.nomeOriginal?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Personagens Bíblicos</h1>
          <p className="text-muted-foreground">{PERSONAGENS.length} personagens da Escritura</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar por nome..."
          className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
        />
      </div>

      <div className="flex gap-6 min-h-[60vh]">
        <div className="w-80 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] border rounded-lg p-2">
          {filtrados.map(p => (
            <button
              key={p.id}
              onClick={() => setSelecionado(p)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                selecionado?.id === p.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.nomePortugues}</div>
                  {p.nomeOriginal && <div className="text-xs opacity-70">{p.nomeOriginal}</div>}
                </div>
                <ChevronRight className="h-3 w-3 opacity-50" />
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1">
          {selecionado ? (
            <div className="border rounded-lg p-6 space-y-5">
              <div>
                <h2 className="text-2xl font-bold">{selecionado.nomePortugues}</h2>
                {selecionado.nomeOriginal && (
                  <p className="text-muted-foreground mt-1">Nome original: {selecionado.nomeOriginal}</p>
                )}
              </div>

              {selecionado.significadoNome && (
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Significado: {selecionado.significadoNome}
                </div>
              )}

              {selecionado.biografia && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Biografia</h3>
                  <p className="text-sm leading-relaxed">{selecionado.biografia}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selecionado.primeiraMencao && (
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Primeira Menção</p>
                    <p className="text-sm font-medium">{selecionado.primeiraMencao}</p>
                  </div>
                )}
              </div>

              {selecionado.eventosPrincipais && (
                <div>
                  <h3 className="font-semibold mb-2">Eventos Principais</h3>
                  <p className="text-sm text-muted-foreground">{selecionado.eventosPrincipais}</p>
                </div>
              )}

              {selecionado.versoesReferencias && (
                <div>
                  <h3 className="font-semibold mb-2">Referências Bíblicas</h3>
                  <p className="text-sm text-muted-foreground font-mono">{selecionado.versoesReferencias}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg p-12 text-center text-muted-foreground h-full flex items-center justify-center">
              <div className="space-y-2">
                <Users className="h-12 w-12 mx-auto opacity-30" />
                <p>Selecione um personagem para ver os detalhes</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
