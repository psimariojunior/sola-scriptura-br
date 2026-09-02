'use client';

import { type TrilhaLivro } from '@/data/trilhasLivro';
import { capitulosDaTrilha } from '@/lib/trilhaCapitulos';
import { isChapterRead } from '@/lib/readingProgress';

export const TRILHA_STORAGE_KEY = 'ssb_trilha_progresso';
export const TRILHA_NOME_KEY = 'ssb_cert_nome';
/** Resposta mínima: evita marcar o capítulo com «ok» ou um emoji. */
export const MIN_RESPOSTA_CHARS = 40;

export interface RespostaCapitulo {
  texto: string;
  data: string;
}

export interface CertificadoTrilha {
  id: string;
  hash: string;
  nome: string;
  data: string;
  autenticado: boolean;
}

export interface TrilhaProgresso {
  trilhaId: string;
  respostas: Record<string, RespostaCapitulo>;
  dataInicio: string | null;
  dataConclusao: string | null;
  certificado: CertificadoTrilha | null;
}

type Store = Record<string, TrilhaProgresso>;

function vazio(trilhaId: string): TrilhaProgresso {
  return {
    trilhaId,
    respostas: {},
    dataInicio: null,
    dataConclusao: null,
    certificado: null,
  };
}

function lerStore(): Store {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(TRILHA_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Store;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function gravarStore(store: Store): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRILHA_STORAGE_KEY, JSON.stringify(store));
}

export function obterProgressoTrilha(trilhaId: string): TrilhaProgresso {
  return lerStore()[trilhaId] ?? vazio(trilhaId);
}

export function garantirInicioTrilha(trilhaId: string): TrilhaProgresso {
  const store = lerStore();
  if (!store[trilhaId]) {
    store[trilhaId] = { ...vazio(trilhaId), dataInicio: new Date().toISOString() };
    gravarStore(store);
  } else if (!store[trilhaId].dataInicio) {
    store[trilhaId].dataInicio = new Date().toISOString();
    gravarStore(store);
  }
  return store[trilhaId];
}

export function validarResposta(texto: string): string | null {
  const t = texto.replace(/\s+/g, ' ').trim();
  if (t.length < MIN_RESPOSTA_CHARS) {
    return `Escreva pelo menos ${MIN_RESPOSTA_CHARS} caracteres — a pergunta pede uma resposta sua, não um visto.`;
  }
  return null;
}

export function salvarRespostaCapitulo(trilhaId: string, capitulo: number, texto: string): TrilhaProgresso {
  const erro = validarResposta(texto);
  if (erro) throw new Error(erro);
  const store = lerStore();
  const atual = store[trilhaId] ?? { ...vazio(trilhaId), dataInicio: new Date().toISOString() };
  atual.respostas[String(capitulo)] = {
    texto: texto.replace(/\s+/g, ' ').trim(),
    data: new Date().toISOString(),
  };
  if (!atual.dataInicio) atual.dataInicio = new Date().toISOString();
  store[trilhaId] = atual;
  gravarStore(store);
  return atual;
}

export function capituloRespondido(trilhaId: string, capitulo: number): boolean {
  const r = obterProgressoTrilha(trilhaId).respostas[String(capitulo)];
  return Boolean(r?.texto && r.texto.length >= MIN_RESPOSTA_CHARS);
}

export function capituloCompleto(trilha: TrilhaLivro, capitulo: number): boolean {
  return isChapterRead(trilha.livroAbrev, capitulo) && capituloRespondido(trilha.slug, capitulo);
}

export function capitulosCompletos(trilha: TrilhaLivro): number[] {
  const caps: number[] = [];
  for (let n = 1; n <= trilha.totalCapitulos; n++) {
    if (capituloCompleto(trilha, n)) caps.push(n);
  }
  return caps;
}

export function trilhaProntaParaCertificado(trilha: TrilhaLivro): boolean {
  const meta = capitulosDaTrilha(trilha);
  if (meta.some((c) => !c.pergunta || c.nivel !== 'profundo')) return false;
  return capitulosCompletos(trilha).length === trilha.totalCapitulos;
}

export function montarPayloadHash(params: {
  trilhaId: string;
  nome: string;
  dataIso: string;
  capitulos: number[];
}): string {
  return [
    'sola-scriptura-br',
    params.trilhaId,
    params.nome.trim().toLowerCase(),
    params.dataIso.slice(0, 10),
    params.capitulos.join(','),
  ].join('|');
}

function hexDeBuffer(buf: ArrayBuffer | Uint8Array): string {
  const arr = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sha256Curto(payload: string): Promise<string> {
  if (typeof globalThis.crypto?.subtle?.digest === 'function') {
    const data = new TextEncoder().encode(payload);
    const digest = await globalThis.crypto.subtle.digest('SHA-256', data);
    return hexDeBuffer(digest).slice(0, 12).toUpperCase();
  }
  const { createHash } = await import('crypto');
  return createHash('sha256').update(payload, 'utf8').digest('hex').slice(0, 12).toUpperCase();
}

export function idCertificado(trilhaId: string, dataIso: string, hash: string): string {
  const prefix = trilhaId === 'joao' ? 'JO' : trilhaId === 'romanos' ? 'RM' : 'TR';
  const ymd = dataIso.slice(0, 10).replace(/-/g, '');
  return `SSB-${prefix}-${ymd}-${hash.slice(0, 4)}`;
}

export async function emitirCertificadoTrilha(params: {
  trilha: TrilhaLivro;
  nome: string;
  autenticado: boolean;
}): Promise<CertificadoTrilha> {
  if (!trilhaProntaParaCertificado(params.trilha)) {
    throw new Error('A trilha ainda não está completa: falta ler ou responder algum capítulo.');
  }
  const nome = params.nome.replace(/\s+/g, ' ').trim();
  if (nome.length < 3) throw new Error('Informe o nome que deve constar no certificado.');
  const data = new Date().toISOString();
  const capitulos = capitulosCompletos(params.trilha);
  const payload = montarPayloadHash({
    trilhaId: params.trilha.slug,
    nome,
    dataIso: data,
    capitulos,
  });
  const hash = await sha256Curto(payload);
  const cert: CertificadoTrilha = {
    id: idCertificado(params.trilha.slug, data, hash),
    hash,
    nome,
    data,
    autenticado: params.autenticado,
  };
  const store = lerStore();
  const atual = store[params.trilha.slug] ?? vazio(params.trilha.slug);
  atual.certificado = cert;
  atual.dataConclusao = data;
  store[params.trilha.slug] = atual;
  gravarStore(store);
  if (typeof window !== 'undefined') {
    localStorage.setItem(TRILHA_NOME_KEY, nome);
  }
  return cert;
}

export function proximoCapituloPendente(trilha: TrilhaLivro): number | null {
  for (let n = 1; n <= trilha.totalCapitulos; n++) {
    if (!capituloCompleto(trilha, n)) return n;
  }
  return null;
}
