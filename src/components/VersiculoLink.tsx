'use client';

import React from 'react';
import { TODOS_LIVROS, livroPorAbreviacao } from '@/data/biblia';

// ═══════════════════════════════════════════════════════════════════════════════
// DETECÇÃO DE REFERÊNCIAS BÍBLICAS
// ═══════════════════════════════════════════════════════════════════════════════

// Mapa nome -> abreviacao canônica
const NOME_PARA_ABREV = new Map<string, string>();
for (const l of TODOS_LIVROS) NOME_PARA_ABREV.set(l.nome.toLowerCase(), l.abreviacao);

// Ordena do maior para o menor nome para evitar matches parciais (ex: "João" antes de "Jo")
const NOMES_ORDENADOS = [...TODOS_LIVROS]
  .map((l) => l.nome)
  .sort((a, b) => b.length - a.length);

const escaparRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const NOME_ALTERNACAO = NOMES_ORDENADOS.map((n) => escaparRegex(n)).join('|');

// Regex principal: Nome Cap[:Vers] — com fronteira de palavra antes do nome.
// Aceita: "João 3:16", "Rm 8:28", "Gênesis 1", "1 Coríntios 13:4", "Sl 23".
// O primeiro grupo nomal é o nome do livro; os dígitos e verso opcionais vêm depois.
const REGEX_REFERENCIA = new RegExp(
  `(?<!\\w)(${NOME_ALTERNACAO})\\s+(\\d+)(?::(\\d+))?`,
  'g',
);

function resolverAbrev(nome: string): string | null {
  const k = nome.trim().toLowerCase();
  if (NOME_PARA_ABREV.has(k)) return NOME_PARA_ABREV.get(k)!;
  const porAbrev = livroPorAbreviacao.get(k);
  if (porAbrev) return porAbrev.abreviacao;
  for (const l of TODOS_LIVROS) {
    if (l.nome.toLowerCase().startsWith(k)) return l.abreviacao;
  }
  return null;
}

interface ReferenciaEncontrada {
  livro: string;
  capitulo: number;
  versiculo?: number;
  indice: number;
  tamanho: number;
  textoOriginal: string;
}

export function extrairReferencias(texto: string): ReferenciaEncontrada[] {
  const resultado: ReferenciaEncontrada[] = [];
  REGEX_REFERENCIA.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = REGEX_REFERENCIA.exec(texto)) !== null) {
    const abrev = resolverAbrev(match[1]);
    if (!abrev) continue;
    const capitulo = parseInt(match[2], 10);
    const versiculo = match[3] ? parseInt(match[3], 10) : undefined;
    if (capitulo < 1 || capitulo > 150) continue;
    if (versiculo !== undefined && (versiculo < 1 || versiculo > 200)) continue;
    resultado.push({
      livro: abrev,
      capitulo,
      versiculo,
      indice: match.index,
      tamanho: match[0].length,
      textoOriginal: match[0],
    });
  }
  return resultado;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE DE LINK CLICÁVEL
// ═══════════════════════════════════════════════════════════════════════════════

function construirHref(livro: string, capitulo: number, versiculo?: number): string {
  const params = new URLSearchParams();
  params.set('livro', livro);
  params.set('capitulo', String(capitulo));
  if (versiculo !== undefined) params.set('versiculo', String(versiculo));
  return `/biblia?${params.toString()}`;
}

interface VersiculoLinkProps {
  referencia: ReferenciaEncontrada;
  children: React.ReactNode;
  className?: string;
}

export function VersiculoLink({ referencia, children, className = '' }: VersiculoLinkProps) {
  const href = construirHref(referencia.livro, referencia.capitulo, referencia.versiculo);
  return (
    <a
      href={href}
      onClick={(e) => {
        if (typeof window !== 'undefined' && window.location.pathname === '/biblia') {
          e.preventDefault();
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }}
      className={`text-[var(--primary)] underline decoration-[var(--primary)]/40 hover:decoration-[var(--primary)] underline-offset-2 transition-colors cursor-pointer ${className}`}
      title={`Abrir ${referencia.textoOriginal} na Bíblia`}
    >
      {children}
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LINKIFICAÇÃO DE HTML (pós-parseMarkdown)
// ═══════════════════════════════════════════════════════════════════════════════

// Recebe HTML gerado por parseMarkdown e transforma apenas as referências que
// aparecem em TEXTO (fora de tags), preservando toda a marcação existente.
// Evita duplicar links já presentes dentro de atributos href e IGNORA texto
// dentro de elementos <code> e <pre> (blocos de código).
export function linkificarReferenciasHTML(html: string, keyPrefix = 'ref'): React.ReactNode[] {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    // Fallback sem DOM: retorna o HTML como string (raro em cliente).
    return [html];
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const nos: React.ReactNode[] = [];
  let key = 0;

  const walk = (node: Node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;
        const tag = el.tagName.toLowerCase();
        // Pular completamente blocos de código.
        if (tag === 'code' || tag === 'pre') return;
        walk(el);
      } else if (child.nodeType === Node.TEXT_NODE) {
        const texto = child.textContent ?? '';
        if (!texto.trim()) {
          nos.push(texto);
          return;
        }
        const refs = extrairReferencias(texto);
        if (refs.length === 0) {
          nos.push(texto);
          return;
        }
        let ultimoFim = 0;
        refs.forEach((ref) => {
          if (ref.indice > ultimoFim) nos.push(texto.slice(ultimoFim, ref.indice));
          nos.push(
            <VersiculoLink key={`${keyPrefix}-${key++}`} referencia={ref}>
              {ref.textoOriginal}
            </VersiculoLink>,
          );
          ultimoFim = ref.indice + ref.tamanho;
        });
        if (ultimoFim < texto.length) nos.push(texto.slice(ultimoFim));
      }
    });
  };

  walk(doc.body);
  return nos;
}

// ═══════════════════════════════════════════════════════════════════════════════
// RENDERIZADOR DE TEXTO PURO (sem HTML)
// ═══════════════════════════════════════════════════════════════════════════════

export function renderizarReferencias(texto: string, keyPrefix = 'ref'): React.ReactNode[] {
  if (!texto) return [];
  const refs = extrairReferencias(texto);
  if (refs.length === 0) return [texto];

  const nos: React.ReactNode[] = [];
  let ultimoFim = 0;
  refs.forEach((ref, i) => {
    if (ref.indice > ultimoFim) nos.push(texto.slice(ultimoFim, ref.indice));
    nos.push(
      <VersiculoLink key={`${keyPrefix}-${i}`} referencia={ref}>
        {ref.textoOriginal}
      </VersiculoLink>,
    );
    ultimoFim = ref.indice + ref.tamanho;
  });
  if (ultimoFim < texto.length) nos.push(texto.slice(ultimoFim));
  return nos;
}
