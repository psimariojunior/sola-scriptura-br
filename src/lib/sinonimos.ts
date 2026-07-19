// Mapeamento de sinônimos e palavras relacionadas para busca semântica bíblica
// Expande consultas de busca com termos teologicamente relacionados

export interface GrupoSinonimos {
  conceito: string;
  termos: string[];
}

const grupos: GrupoSinonimos[] = [
  // Fé e Crença
  { conceito: 'fé', termos: ['fé', 'crer', 'crença', 'confiança', 'credulidade', 'fiel', 'fiéis'] },
  { conceito: 'justificação', termos: ['justificação', 'justiça', 'justificar', 'justo', 'imputação'] },
  { conceito: 'salvação', termos: ['salvação', 'salvar', 'salvo', 'redenção', 'resgatar', 'libertação'] },

  // Amor e Misericórdia
  { conceito: 'amor', termos: ['amor', 'amar', 'caridade', 'misericórdia', 'afeto', 'bondade'] },
  { conceito: 'graça', termos: ['graça', 'graciosidade', 'favor', 'dádiva', 'indulgência'] },
  { conceito: 'misericórdia', termos: ['misericórdia', 'compaixão', 'piedade', 'ternura', 'bondade'] },

  // Pecado e Transgressão
  { conceito: 'pecado', termos: ['pecado', 'transgressão', 'iniqüidade', 'rebeldia', 'culpa', 'fault'] },
  { conceito: 'arrependimento', termos: ['arrependimento', 'arrepender-se', 'conversão', 'contrição'] },
  { conceito: 'perdão', termos: ['perdão', 'perdoar', 'perdoado', 'indulgência', 'remissão'] },

  // Deus e Natureza Divina
  { conceito: 'soberania', termos: ['soberania', 'soberano', 'domínio', 'reinar', 'reino', 'governo'] },
  { conceito: 'santidade', termos: ['santidade', 'santo', 'santificar', 'sagrado', 'consagrar'] },
  { conceito: 'onipotência', termos: ['onipotência', 'poder', 'poderoso', 'onipotente', 'força'] },
  { conceito: 'onisciência', termos: ['onisciência', 'sabedoria', 'saber', 'conhecimento', 'inteligência'] },
  { conceito: 'onipresença', termos: ['onipresença', 'presença', 'presente', 'visível', 'invisível'] },

  // Cristo e Obra Redentora
  { conceito: 'cruz', termos: ['cruz', 'crucificação', 'crucificar', 'pregado', 'madeiro'] },
  { conceito: 'ressurreição', termos: ['ressurreição', 'ressuscitar', 'ressuscitado', 'vivo', 'vitória'] },
  { conceito: 'redenção', termos: ['redenção', 'resgatar', 'resgate', 'remir', 'libertar'] },
  { conceito: 'mediação', termos: ['mediador', 'mediação', 'intercessão', 'intercessor', 'advogado'] },
  { conceito: 'sacrifício', termos: ['sacrifício', 'sacrificar', 'oferta', 'holocausto', 'vítima'] },

  // Espírito e Vida Cristã
  { conceito: 'espírito', termos: ['espírito', 'espírito santo', 'paráclito', 'consolador', 'adorador'] },
  { conceito: 'oração', termos: ['oração', 'orar', 'pedir', 'súplica', 'intercessão', 'clamar'] },
  { conceito: 'fé', termos: ['fé', 'crer', 'crença', 'confiança', 'credulidade'] },
  { conceito: 'adoração', termos: ['adoração', 'adorar', 'louvor', 'glorificar', 'exaltar'] },

  // Igreja e Comunhão
  { conceito: 'igreja', termos: ['igreja', 'congregação', 'assembleia', 'comunidade', 'corpo'] },
  { conceito: 'aliança', termos: ['aliança', 'pacto', 'convênio', 'compromisso', 'juramento'] },
  { conceito: 'discipulado', termos: ['discípulo', 'discipado', 'seguidor', 'imitador', 'aprendiz'] },
  { conceito: 'evangelho', termos: ['evangelho', 'boas novas', 'mensagem', 'pregação', 'testemunho'] },

  // Escatologia
  { conceito: 'juízo', termos: ['juízo', 'julgar', 'julgamento', 'sentença', 'condenação'] },
  { conceito: 'glória', termos: ['glória', 'glorioso', 'glorificar', 'majestade', 'esplendor'] },
  { conceito: 'vida eterna', termos: ['vida eterna', 'eternidade', 'imortalidade', 'eterno', 'permanente'] },
  { conceito: 'parusia', termos: ['parusia', 'volta', 'retorno', 'vinda', 'segunda vinda'] },

  // Ética e Conduta
  { conceito: 'obediência', termos: ['obediência', 'obedecer', 'obediente', 'submissão', 'súdito'] },
  { conceito: 'humildade', termos: ['humildade', 'humilde', 'humilhar', 'modéstia', 'mansidão'] },
  { conceito: 'paz', termos: ['paz', 'pacificador', 'pacificar', 'tranquilidade', 'serenidade'] },
  { conceito: 'paciência', termos: ['paciência', 'paciente', 'perseverança', 'longanimidade', 'tolerância'] },
  { conceito: 'perseverança', termos: ['perseverança', 'perseverar', 'persistir', 'constância', 'firmeza'] },

  // Conhecimento e Sabedoria
  { conceito: 'sabedoria', termos: ['sabedoria', 'sábio', 'prudente', 'entendimento', 'discernimento'] },
  { conceito: 'verdade', termos: ['verdade', 'verdadeiro', 'veracidade', 'sinceridade', 'fidelidade'] },
  { conceito: 'luz', termos: ['luz', 'luminoso', 'iluminar', 'resplandecer', 'brilhar'] },

  // Proteção e Sustento
  { conceito: 'proteção', termos: ['proteção', 'proteger', 'amparo', 'refúgio', 'abrigo', 'escudo'] },
  { conceito: 'provisão', termos: ['provisão', 'prover', 'sustento', 'manutenção', 'alimento'] },
  { conceito: 'guia', termos: ['guia', 'conduzir', 'conduzido', 'direção', 'caminho', 'trilha'] },

  // Julgamento e Justiça
  { conceito: 'justiça', termos: ['justiça', 'justo', 'retidão', 'equidade', 'imparcialidade'] },
  { conceito: 'verdade', termos: ['verdade', 'verdadeiro', 'fidelidade', 'lealdade', 'constância'] },

  // Natureza e Criação
  { conceito: 'criação', termos: ['criação', 'criar', 'criador', 'feito', 'formado'] },
  { conceito: 'natureza', termos: ['natureza', 'natural', 'selva', 'terra', 'céu', 'mar'] },

  // Caráter de Deus
  { conceito: 'fidelidade', termos: ['fidelidade', 'fiel', 'firme', 'estável', 'imutável'] },
  { conceito: 'bondade', termos: ['bondade', 'bondadoso', 'benévolo', 'generoso', 'liberal'] },
  { conceito: 'brandura', termos: ['brandura', 'brando', 'suave', 'gentil', 'delicado'] },

  // Conflito espiritual
  { conceito: 'tentação', termos: ['tentação', 'tentar', 'provar', 'provocar', 'desafiar'] },
  { conceito: 'poder', termos: ['poder', 'poderoso', 'força', 'forço', 'violência'] },
  { conceito: 'vitória', termos: ['vitória', 'vencer', 'vencedor', 'triunfo', 'conquista'] },

  // Comunicação
  { conceito: 'palavra', termos: ['palavra', 'verbo', 'mensagem', 'pregação', 'ensino'] },
  { conceito: 'testemunho', termos: ['testemunho', 'testemunhar', 'depósito', 'proclamação', 'anúncio'] },

  // Relacionamentos
  { conceito: 'perdão', termos: ['perdão', 'perdoar', 'indulgência', 'remissão', 'absolvição'] },
  { conceito: 'reconciliação', termos: ['reconciliação', 'reconciliar', 'unir', 'harmonia', 'paz'] },
  { conceito: 'unidade', termos: ['unidade', 'unir', 'juntar', 'congregar', 'associação'] },
];

// Mapa invertido: termo -> todos os termos do mesmo grupo
const termoParaGrupo = new Map<string, string[]>();

for (const grupo of grupos) {
  for (const termo of grupo.termos) {
    const normalizado = normalizar(termo);
    const existente = termoParaGrupo.get(normalizado) || [];
    for (const t of grupo.termos) {
      const tn = normalizar(t);
      if (!existente.includes(tn)) existente.push(tn);
    }
    termoParaGrupo.set(normalizado, existente);
  }
}

function normalizar(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Obtém sinônimos e termos relacionados para uma consulta de busca.
 * Retorna os termos expandidos (original + sinônimos) sem duplicatas.
 */
export function expandirConsulta(query: string): string[] {
  const termos = query
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length >= 2);

  const expandido = new Set<string>();

  for (const termo of termos) {
    expandido.add(termo);
    const sinônimos = termoParaGrupo.get(normalizar(termo));
    if (sinônimos) {
      for (const s of sinônimos) {
        expandido.add(s);
      }
    }
  }

  return [...expandido];
}

/**
 * Verifica se um texto corresponde a uma consulta expandida por sinônimos.
 * Retorna true se o texto contiver qualquer um dos termos expandidos.
 */
export function correspondeSemanticamente(
  texto: string,
  query: string,
  ativo: boolean
): boolean {
  if (!ativo) {
    return texto.toLowerCase().includes(query.toLowerCase());
  }

  const termosExpandidos = expandirConsulta(query);
  const textoLower = texto.toLowerCase();

  return termosExpandidos.some(termo => textoLower.includes(termo));
}

/**
 * Obtém os grupos de sinônimos que contêm um determinado termo.
 */
export function obterGrupos(termos: string[]): string[] {
  const gruposEncontrados = new Set<string>();
  for (const termo of termos) {
    const grupo = termoParaGrupo.get(normalizar(termo));
    if (grupo) {
      for (const t of grupo) {
        gruposEncontrados.add(t);
      }
    }
  }
  return [...gruposEncontrados];
}

/**
 * Retorna todos os grupos de sinônimos para exibição na UI.
 */
export function obterTodosGrupos(): GrupoSinonimos[] {
  return grupos;
}

/**
 * Obtém a query expandida como string para exibição.
 */
export function obterQueryExpandida(query: string): string {
  const termos = expandirConsulta(query);
  return termos.join(' OR ');
}
