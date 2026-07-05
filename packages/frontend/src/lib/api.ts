import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
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
  traducaoId?: string;
}

export const apiBiblia = {
  listarLivros: (testamentoId?: string) =>
    api.get("/biblia/livros", { params: { testamentoId } }),
  buscarLivro: (slug: string) =>
    api.get(`/biblia/livros/${slug}`),
  buscarCapitulo: (livroNome: string, numero: number) =>
    api.get(`/biblia/${encodeURIComponent(livroNome)}/${numero}`),
  buscarVersiculo: (livroNome: string, capitulo: number, versiculo: number, traducaoId: string) =>
    api.get(`/biblia/${encodeURIComponent(livroNome)}/${capitulo}/${versiculo}`, {
      params: { traducaoId },
    }),
  buscarPassagem: (livroId: string, capitulo: number, inicio: number, fim: number, traducaoId: string) =>
    api.get(`/biblia/passagem/${livroId}/${capitulo}/${inicio}/${fim}`, {
      params: { traducaoId },
    }),
  listarTraducoes: () =>
    api.get("/biblia/versoes"),
  pesquisar: (q: string, traducaoId: string) =>
    api.get("/biblia/pesquisar", { params: { q, traducaoId } }),
  buscarPalavra: (id: string) =>
    api.get(`/biblia/palavras/${id}`),
};

export const apiExegese = {
  analisar: (versiculoId: string) =>
    api.get(`/exegese/versiculo/${versiculoId}`),
  contextos: (versiculoId: string) =>
    api.get(`/exegese/versiculo/${versiculoId}/contextos`),
};

export const apiTeologia = {
  listarCategorias: () =>
    api.get("/teologia/categorias"),
  buscarDoutrina: (slug: string) =>
    api.get(`/teologia/doutrinas/${slug}`),
  relacionarTexto: (versiculoId: string) =>
    api.get(`/teologia/versiculo/${versiculoId}`),
};

export const apiHermeneutica = {
  analisar: (versiculoId: string) =>
    api.get(`/hermeneutica/versiculo/${versiculoId}`),
  genero: (versiculoId: string) =>
    api.get(`/hermeneutica/versiculo/${versiculoId}/genero`),
};

export const apiLinguistica = {
  buscarGrego: (strong: string) =>
    api.get(`/grego/strong/${strong}`),
  buscarGregoLemma: (lemma: string) =>
    api.get(`/grego/lemma/${lemma}`),
  pesquisarGrego: (q: string) =>
    api.get("/grego/buscar", { params: { q } }),
  frequentesGrego: (limite = 100) =>
    api.get("/grego/frequentes", { params: { limite } }),
  buscarHebraico: (strong: string) =>
    api.get(`/hebraico/strong/${strong}`),
  pesquisarHebraico: (q: string) =>
    api.get("/hebraico/buscar", { params: { q } }),
  frequentesHebraico: (limite = 100) =>
    api.get("/hebraico/frequentes", { params: { limite } }),
};

export const apiHistoria = {
  contextoLivro: (livroId: string) =>
    api.get(`/historia/livro/${livroId}`),
  contextoEntidade: (tipo: string, entidadeId: string) =>
    api.get(`/historia/${tipo}/${entidadeId}`),
};

export const apiGeografia = {
  listarLocalizacoes: (tipo?: string) =>
    api.get("/geografia/localizacoes", { params: { tipo } }),
  buscarLocalizacao: (slug: string) =>
    api.get(`/geografia/localizacoes/${slug}`),
  listarRotas: () =>
    api.get("/geografia/rotas"),
  proximos: (lat: number, lng: number, raio: number) =>
    api.get("/geografia/proximos", { params: { lat, lng, raio } }),
};

export const apiArqueologia = {
  listarArtefatos: (tipo: string) =>
    api.get("/arqueologia/artefatos", { params: { tipo } }),
  buscarArtefato: (id: string) =>
    api.get(`/arqueologia/artefatos/${id}`),
  listarManuscritos: () =>
    api.get("/arqueologia/manuscritos"),
};

export const apiCronologia = {
  linhaDoTempo: () =>
    api.get("/cronologia/linha-do-tempo"),
  porEra: (era: string) =>
    api.get(`/cronologia/era/${era}`),
  porPeriodo: (inicio: number, fim: number) =>
    api.get("/cronologia/periodo", { params: { inicio, fim } }),
  porCategoria: (categoria: string) =>
    api.get(`/cronologia/categoria/${categoria}`),
};

export const apiPersonagens = {
  listar: (limite = 50) =>
    api.get("/personagens", { params: { limite } }),
  buscar: (q: string) =>
    api.get("/personagens/buscar", { params: { q } }),
  buscarPorSlug: (slug: string) =>
    api.get(`/personagens/${slug}`),
};

export const apiReferencias = {
  porVersiculo: (versiculoId: string) =>
    api.get(`/referencias/versiculo/${versiculoId}`),
  porTipo: (tipo: string) =>
    api.get(`/referencias/tipo/${tipo}`),
};

export const apiComentarios = {
  listarAutores: () =>
    api.get("/comentarios/autores"),
  porAutor: (autor: string) =>
    api.get(`/comentarios/autor/${autor}`),
  porCapitulo: (livroId: string, capitulo: number, versiculo?: number) =>
    api.get(`/comentarios/${livroId}/${capitulo}`, { params: { versiculo } }),
};

export const apiIA = {
  perguntar: (pergunta: string, tradicao?: string) =>
    api.post("/ia/perguntar", { pergunta }, { params: { tradicao } }),
  analisarExegese: (versiculoId: string) =>
    api.post("/ia/exegese", { versiculoId }),
  analisarGrego: (texto: string) =>
    api.post("/ia/grego", { texto }),
  comparar: (passagens: string[]) =>
    api.post("/ia/comparar", { passagens }),
};

export const apiAuth = {
  cadastrar: (dados: { nome: string; email: string; senha: string }) =>
    api.post("/auth/cadastrar", dados),
  login: (dados: { email: string; senha: string }) =>
    api.post("/auth/login", dados),
  refresh: (token: string) =>
    api.post("/auth/refresh", { token }),
};

export const apiDicionario = {
  pesquisar: (q: string) =>
    api.get("/dicionario/buscar", { params: { q } }),
  porCategoria: (categoria: string) =>
    api.get(`/dicionario/categoria/${categoria}`),
  buscarPorSlug: (slug: string) =>
    api.get(`/dicionario/${slug}`),
};

export const apiMapas = {
  locais: (tipo?: string) =>
    api.get("/geografia/localizacoes", { params: { tipo } }),
  rotas: () =>
    api.get("/geografia/rotas"),
};
