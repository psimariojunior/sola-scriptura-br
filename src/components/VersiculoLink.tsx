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
  let key = 0;

  // Reconstrói elementos React a partir do DOM preservando a semântica
  // (heading, strong, em, ul, li, pre, code, blockquote, hr, a, ...) e
  // aplica linkificação apenas em TEXT_NODE. Diferente da versao antiga
  // que descartava toda a formatacao markdown.
  const render = (node: Node, index: number): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      const texto = node.textContent ?? '';
      if (!texto) return null;
      const refs = extrairReferencias(texto);
      if (refs.length === 0) return texto;

      const out: React.ReactNode[] = [];
      let ultimoFim = 0;
      refs.forEach((ref) => {
        if (ref.indice > ultimoFim) out.push(texto.slice(ultimoFim, ref.indice));
        out.push(
          <VersiculoLink key={`${keyPrefix}-${key++}`} referencia={ref}>
            {ref.textoOriginal}
          </VersiculoLink>,
        );
        ultimoFim = ref.indice + ref.tamanho;
      });
      if (ultimoFim < texto.length) out.push(texto.slice(ultimoFim));
      return out.length === 1 ? out[0] : out;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    // Pula completamente blocos de codigo (nao linkifica dentro).
    if (tag === 'code' || tag === 'pre') return null;

    const children = Array.from(el.childNodes).map((c, i) => render(c, i));
    const props: Record<string, any> = { key: `${keyPrefix}-${key++}` };

    // Preserva classes e alguns atributos uteis.
    if (el.className) props.className = el.className;
    if (tag === 'a' && el.getAttribute('href')) {
      props.href = el.getAttribute('href');
      if (el.getAttribute('target')) props.target = el.getAttribute('target')!;
    }
    if (tag === 'img') {
      props.src = el.getAttribute('src') || '';
      props.alt = el.getAttribute('alt') || '';
    }

    // Mapa de tags HTML -> elementos React.
    const TAG_MAP: Record<string, keyof React.JSX.IntrinsicElements> = {
      h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
      p: 'p', span: 'span', div: 'div',
      strong: 'strong', b: 'b', em: 'em', i: 'i', u: 'u',
      ul: 'ul', ol: 'ol', li: 'li',
      pre: 'pre', code: 'code',
      blockquote: 'blockquote',
      hr: 'hr', br: 'br',
      a: 'a', img: 'img',
      table: 'table', thead: 'thead', tbody: 'tbody', tr: 'tr', th: 'th', td: 'td',
      header: 'header', footer: 'footer', section: 'section', article: 'article',
    };

    const Component = TAG_MAP[tag] || 'span';
    return React.createElement(Component, props, ...children);
  };

  const out: React.ReactNode[] = [];
  doc.body.childNodes.forEach((child, i) => {
    const rendered = render(child, i);
    if (rendered !== null && rendered !== undefined && rendered !== '') {
      out.push(rendered);
    }
  });

  return out;
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
