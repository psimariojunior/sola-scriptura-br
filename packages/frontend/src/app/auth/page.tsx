"use client";

import { useState } from "react";
import { apiAuth } from "@/lib/api";
import { LogIn, UserPlus } from "lucide-react";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit() {
    setCarregando(true);
    setErro("");
    setSucesso("");

    try {
      if (tab === "cadastro") {
        const res = await apiAuth.cadastrar({ nome, email, senha });
        localStorage.setItem("bible-scholar-token", res.data.token || "");
        localStorage.setItem("bible-scholar-user", JSON.stringify(res.data.user || res.data));
        setSucesso("Conta criada com sucesso!");
        setTimeout(() => window.location.href = "/", 1000);
      } else {
        const res = await apiAuth.login({ email, senha });
        localStorage.setItem("bible-scholar-token", res.data.token || "");
        localStorage.setItem("bible-scholar-user", JSON.stringify(res.data.user || res.data));
        setSucesso("Login realizado!");
        setTimeout(() => window.location.href = "/", 1000);
      }
    } catch (e: any) {
      setErro(e.response?.data?.message || e.response?.data?.error || "Erro ao processar");
    }
    setCarregando(false);
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Sola Scriptura</h1>
          <p className="text-muted-foreground">Acesse sua conta para salvar favoritos e notas</p>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setTab("login")}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "login" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            <LogIn className="h-4 w-4" /> Entrar
          </button>
          <button
            onClick={() => setTab("cadastro")}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "cadastro" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            <UserPlus className="h-4 w-4" /> Cadastrar
          </button>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          {tab === "cadastro" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <input value={nome} onChange={e => setNome(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Seu nome" />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha</label>
            <input value={senha} onChange={e => setSenha(e.target.value)} type="password" className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="••••••" />
          </div>

          {erro && <p className="text-sm text-red-500">{erro}</p>}
          {sucesso && <p className="text-sm text-green-600">{sucesso}</p>}

          <button
            onClick={handleSubmit}
            disabled={carregando || !email || !senha}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {carregando ? "Processando..." : tab === "login" ? "Entrar" : "Criar Conta"}
          </button>
        </div>
      </div>
    </div>
  );
}
