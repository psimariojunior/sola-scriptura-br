import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export interface ReferenciaBiblica {
  livro: string;
  capitulo: number;
  versiculo: number;
  versao?: string;
}

export const apiBiblia = {
  buscarVersiculo: (ref: ReferenciaBiblica) =>
    api.get(`/v1/biblia/${ref.livro}/${ref.capitulo}/${ref.versiculo}`, {
      params: { versao: ref.versao },
    }),
  buscarContexto: (ref: ReferenciaBiblica, margem = 5) =>
    api.get(`/v1/biblia/${ref.livro}/${ref.capitulo}/${ref.versiculo}/contexto`, {
      params: { versao: ref.versao, margem },
    }),
  buscarCapitulo: (livro: string, capitulo: number, versao?: string) =>
    api.get(`/v1/biblia/${livro}/${capitulo}`, { params: { versao } }),
  buscarTexto: (termo: string, versao?: string) =>
    api.get("/v1/biblia/busca", { params: { q: termo, versao } }),
  listarVersoes: () => api.get("/v1/biblia/versoes"),
  listarLivros: (versao?: string) => api.get("/v1/biblia/livros", { params: { versao } }),
};

export const apiExegese = {
  analisar: (livro: string, capitulo: number, versiculo: number) =>
    api.get(`/v1/exegese/${livro}/${capitulo}/${versiculo}`),
  contexto: (livro: string, capitulo: number, versiculo: number) =>
    api.get(`/v1/exegese/${livro}/${capitulo}/${versiculo}/contexto`),
};

export const apiTeologia = {
  analisar: (livro: string, capitulo: number, versiculo: number, tradicao?: string) =>
    api.get(`/v1/teologia/${livro}/${capitulo}/${versiculo}`, { params: { tradicao } }),
  doutrinas: (categoria?: string) =>
    api.get("/v1/teologia/doutrinas", { params: { categoria } }),
};

export const apiHermeneutica = {
  analisar: (livro: string, capitulo: number, versiculo: number) =>
    api.get(`/v1/hermeneutica/${livro}/${capitulo}/${versiculo}`),
};

export const apiLinguistica = {
  analisarPalavra: (palavra: string, idioma?: string) =>
    api.get(`/v1/linguistica/palavra/${palavra}`, { params: { idioma } }),
  buscarStrong: (codigo: string) =>
    api.get(`/v1/linguistica/strong/${codigo}`),
};

export const apiGrafo = {
  buscarEntidade: (nome: string) => api.get(`/v1/grafo/entidade/${nome}`),
  genealogia: (nome: string) => api.get(`/v1/grafo/genealogia/${nome}`),
  tipos: () => api.get("/v1/grafo/tipos"),
};

export const apiChat = {
  enviar: (sessaoId: string, mensagem: string, tradicao?: string) =>
    api.post("/v1/chat/enviar", { sessaoId, mensagem, tradicao }),
  historico: (sessaoId: string) => api.get(`/v1/chat/historico/${sessaoId}`),
  novaSessao: () => api.post("/v1/chat/nova-sessao"),
};

export const apiReferencias = {
  buscar: (livro: string, capitulo: number, versiculo: number) =>
    api.get(`/v1/referencias/${livro}/${capitulo}/${versiculo}`),
};

export const apiCronologia = {
  linhaTempo: (periodo?: string) =>
    api.get("/v1/cronologia", { params: { periodo } }),
};

export const apiMapas = {
  locais: (tipo?: string) => api.get("/v1/mapas/locais", { params: { tipo } }),
  rotas: () => api.get("/v1/mapas/rotas"),
};

export const apiArqueologia = {
  descoberta: (nome: string) => api.get(`/v1/arqueologia/descoberta/${nome}`),
  importantes: () => api.get("/v1/arqueologia/importantes"),
};

export const apiRAG = {
  contexto: (consulta: string, limite = 10) =>
    api.post("/v1/rag/contexto", { consulta, limite }),
};
