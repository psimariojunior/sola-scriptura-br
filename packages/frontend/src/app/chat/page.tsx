"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, Loader2 } from "lucide-react";
import { apiIA } from "@/lib/api";

interface Mensagem {
  id: string;
  papel: "usuario" | "assistente";
  conteudo: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [tradicao, setTradicao] = useState("");
  const fimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  async function enviarMensagem() {
    if (!input.trim()) return;

    const msgUsuario: Mensagem = {
      id: crypto.randomUUID(),
      papel: "usuario",
      conteudo: input,
      timestamp: new Date(),
    };

    setMensagens((prev) => [...prev, msgUsuario]);
    setInput("");
    setCarregando(true);

    try {
      const res = await apiIA.perguntar(msgUsuario.conteudo, tradicao || undefined);
      const msgIA: Mensagem = {
        id: crypto.randomUUID(),
        papel: "assistente",
        conteudo: res.data.resposta || res.data.mensagem || JSON.stringify(res.data),
        timestamp: new Date(),
      };
      setMensagens((prev) => [...prev, msgIA]);
    } catch {
      const msgErro: Mensagem = {
        id: crypto.randomUUID(),
        papel: "assistente",
        conteudo: "Desculpe, ocorreu um erro ao processar sua pergunta. Verifique se a chave OpenAI está configurada no backend.",
        timestamp: new Date(),
      };
      setMensagens((prev) => [...prev, msgErro]);
    }
    setCarregando(false);
  }

  const sugestoes = [
    "Explique Romanos 8:28",
    "Analise o grego de João 1:1",
    "Compare a justificação em Romanos e Gálatas",
    "Quais profecias messiânicas aparecem em Isaías?",
    "Explique Êxodo 33 segundo a teologia arminiana",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Chat IA</h1>
          <p className="text-muted-foreground">Assistente Teológico com Inteligência Artificial</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={tradicao}
            onChange={(e) => setTradicao(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Todas as tradições</option>
            <option value="arminiana">Arminiana</option>
            <option value="reformada">Reformada</option>
            <option value="batista">Batista</option>
            <option value="pentecostal">Pentecostal</option>
            <option value="wesleyana">Wesleyana</option>
          </select>
          <button onClick={() => setMensagens([])} className="border rounded px-3 py-2 text-sm hover:bg-accent">
            <Plus className="h-4 w-4 inline mr-1" /> Nova
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-4 bg-muted/30">
        {mensagens.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Inicie uma conversa com o assistente teológico
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {sugestoes.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-sm rounded-full border px-4 py-2 hover:bg-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.papel === "usuario" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                msg.papel === "usuario"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.conteudo}</p>
              <span className="text-xs text-muted-foreground mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString("pt-BR")}
              </span>
            </div>
          </div>
        ))}

        {carregando && (
          <div className="flex justify-start">
            <div className="bg-card border rounded-lg px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}

        <div ref={fimRef} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          placeholder="Faça sua pergunta teológica..."
          className="flex-1 border rounded-lg px-4 py-3 text-sm"
          disabled={carregando}
        />
        <button
          onClick={enviarMensagem}
          disabled={!input.trim() || carregando}
          className="bg-primary text-primary-foreground px-4 py-3 rounded-lg disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
