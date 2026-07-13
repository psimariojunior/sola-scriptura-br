import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, In } from 'typeorm';
import { Versiculo } from '../../modules/biblia/domain/versiculo.entity';
import { Doutrina } from '../../modules/teologia/domain/doutrina.entity';
import { PalavraGrega } from '../../modules/grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../../modules/hebraico/domain/palavra-hebraica.entity';
import { Personagem } from '../../modules/personagens/domain/personagem.entity';
import { ContextoHistorico } from '../../modules/historia/domain/contexto-historico.entity';
import { Localizacao } from '../../modules/geografia/domain/localizacao.entity';
import { Verbete } from '../../modules/dicionario/domain/verbete.entity';
import { Livro } from '../../modules/biblia/domain/livro.entity';

export interface FonteRAG {
  tipo: string;
  texto: string;
  relevancia: number;
  referencia: string;
  embedding?: number[];
}

export interface ContextoRAG {
  textoBiblico: string[];
  lexico: string[];
  comentarios: string[];
  teologia: string[];
  historia: string[];
  geografia: string[];
  arqueologia: string[];
  fontes: FonteRAG[];
}

interface EmbeddableEntity {
  id: string | number;
  embedding?: string;
  [key: string]: any;
}

type EntityType = 'versiculo' | 'doutrina' | 'personagem' | 'grego' | 'hebraico' | 'historia' | 'geografia' | 'dicionario';

const EMBEDDING_DIMENSION = 1536;

@Injectable()
export class RAGService {
  private readonly logger = new Logger(RAGService.name);
  private openaiKey: string;
  private embeddingModel: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Versiculo) private versiculoRepo: Repository<Versiculo>,
    @InjectRepository(Doutrina) private doutrinaRepo: Repository<Doutrina>,
    @InjectRepository(PalavraGrega) private gregoRepo: Repository<PalavraGrega>,
    @InjectRepository(PalavraHebraica) private hebraicoRepo: Repository<PalavraHebraica>,
    @InjectRepository(Personagem) private personagemRepo: Repository<Personagem>,
    @InjectRepository(ContextoHistorico) private historiaRepo: Repository<ContextoHistorico>,
    @InjectRepository(Localizacao) private geografiaRepo: Repository<Localizacao>,
    @InjectRepository(Verbete) private dicionarioRepo: Repository<Verbete>,
    @InjectRepository(Livro) private livroRepo: Repository<Livro>,
  ) {
    this.openaiKey = this.configService.get('OPENAI_API_KEY', '');
    this.embeddingModel = this.configService.get('EMBEDDING_MODEL', 'text-embedding-3-small');
  }

  async buscarContexto(consulta: string): Promise<ContextoRAG> {
    const contexto: ContextoRAG = {
      textoBiblico: [],
      lexico: [],
      comentarios: [],
      teologia: [],
      historia: [],
      geografia: [],
      arqueologia: [],
      fontes: [],
    };

    let vectores: FonteRAG[] = [];

    if (this.openaiKey) {
      try {
        vectores = await this.buscarContextoVetorial(consulta);
      } catch (erro) {
        this.logger.warn(`Busca vetorial falhou, usando ILIKE: ${erro.message}`);
      }
    }

    if (vectores.length === 0) {
      vectores = await this.buscarContextoILike(consulta);
    }

    for (const fonte of vectores) {
      switch (fonte.tipo) {
        case 'versiculo':
          contexto.textoBiblico.push(fonte.texto);
          break;
        case 'grego':
        case 'hebraico':
          contexto.lexico.push(fonte.texto);
          break;
        case 'doutrina':
          contexto.teologia.push(fonte.texto);
          break;
        case 'personagem':
        case 'historia':
          contexto.historia.push(fonte.texto);
          break;
        case 'geografia':
          contexto.geografia.push(fonte.texto);
          break;
        case 'dicionario':
          contexto.comentarios.push(fonte.texto);
          break;
      }
      contexto.fontes.push(fonte);
    }

    return contexto;
  }

  async buscarContextoVetorial(consulta: string): Promise<FonteRAG[]> {
    const embedding = await this.gerarEmbeddingTexto(consulta);
    if (!embedding || embedding.length === 0) {
      return [];
    }

    const embeddingStr = `[${embedding.join(',')}]`;
    const limite = 5;
    const minRelevancia = 0.5;

    const resultados: FonteRAG[] = [];
    const queries: Array<{ query: string; params: any[]; tipo: string; builder: (row: any) => FonteRAG }> = [
      {
        query: `
          SELECT id, texto, livro_nome, capitulo, versiculo_numero,
                 1 - (embedding <=> $1::vector) AS relevancia
          FROM versiculos
          WHERE embedding IS NOT NULL
          ORDER BY embedding <=> $1::vector
          LIMIT $2
        `,
        params: [embeddingStr, limite],
        tipo: 'versiculo',
        builder: (row: any) => ({
          tipo: 'versiculo',
          texto: row.texto,
          relevancia: parseFloat(row.relevancia),
          referencia: `${row.livro_nome || ''} ${row.capitulo}:${row.versiculo_numero}`,
        }),
      },
      {
        query: `
          SELECT id, nome, definicao, categoria,
                 1 - (embedding <=> $1::vector) AS relevancia
          FROM doutrinas
          WHERE embedding IS NOT NULL
          ORDER BY embedding <=> $1::vector
          LIMIT $2
        `,
        params: [embeddingStr, limite],
        tipo: 'doutrina',
        builder: (row: any) => ({
          tipo: 'doutrina',
          texto: `${row.nome}: ${row.definicao || ''}`,
          relevancia: parseFloat(row.relevancia),
          referencia: `Doutrina: ${row.nome}`,
        }),
      },
      {
        query: `
          SELECT id, nome_portugues, nome_hebraico, nome_grego, biografia,
                 1 - (embedding <=> $1::vector) AS relevancia
          FROM personagens
          WHERE embedding IS NOT NULL
          ORDER BY embedding <=> $1::vector
          LIMIT $2
        `,
        params: [embeddingStr, limite],
        tipo: 'personagem',
        builder: (row: any) => ({
          tipo: 'personagem',
          texto: `${row.nome_portugues} (${row.nome_hebraico || row.nome_grego || ''}): ${row.biografia || ''}`,
          relevancia: parseFloat(row.relevancia),
          referencia: `Personagem: ${row.nome_portugues}`,
        }),
      },
      {
        query: `
          SELECT id, strong, palavra_original, transliteracao, definicao_curta,
                 1 - (embedding <=> $1::vector) AS relevancia
          FROM palavras_gregas
          WHERE embedding IS NOT NULL
          ORDER BY embedding <=> $1::vector
          LIMIT $2
        `,
        params: [embeddingStr, Math.ceil(limite / 2)],
        tipo: 'grego',
        builder: (row: any) => ({
          tipo: 'grego',
          texto: `Strong ${row.strong} - ${row.palavra_original} (${row.transliteracao}): ${row.definicao_curta}`,
          relevancia: parseFloat(row.relevancia),
          referencia: `Grego: ${row.palavra_original}`,
        }),
      },
      {
        query: `
          SELECT id, strong, palavra_original, transliteracao, definicao_curta,
                 1 - (embedding <=> $1::vector) AS relevancia
          FROM palavras_hebraicas
          WHERE embedding IS NOT NULL
          ORDER BY embedding <=> $1::vector
          LIMIT $2
        `,
        params: [embeddingStr, Math.ceil(limite / 2)],
        tipo: 'hebraico',
        builder: (row: any) => ({
          tipo: 'hebraico',
          texto: `Strong ${row.strong} - ${row.palavra_original} (${row.transliteracao}): ${row.definicao_curta}`,
          relevancia: parseFloat(row.relevancia),
          referencia: `Hebraico: ${row.palavra_original}`,
        }),
      },
      {
        query: `
          SELECT id, titulo, definicao, explicacao,
                 1 - (embedding <=> $1::vector) AS relevancia
          FROM verbetes
          WHERE embedding IS NOT NULL
          ORDER BY embedding <=> $1::vector
          LIMIT $2
        `,
        params: [embeddingStr, Math.ceil(limite / 2)],
        tipo: 'dicionario',
        builder: (row: any) => ({
          tipo: 'dicionario',
          texto: `${row.titulo}: ${row.definicao || row.explicacao || ''}`,
          relevancia: parseFloat(row.relevancia),
          referencia: `Dicionário: ${row.titulo}`,
        }),
      },
    ];

    const conn = this.versiculoRepo.manager.connection;

    const execucoes = queries.map(async (q) => {
      try {
        const rows = await conn.query(q.query, q.params);
        return rows
          .filter((row: any) => parseFloat(row.relevancia) >= minRelevancia)
          .map((row: any) => q.builder(row));
      } catch (erro) {
        this.logger.debug(`Tabela para ${q.tipo} sem embedding, pulando: ${erro.message}`);
        return [];
      }
    });

    const resultadosPorTipo = await Promise.all(execucoes);
    for (const resultados of resultadosPorTipo) {
      resultados.push(...resultados);
    }

    resultados.sort((a, b) => b.relevancia - a.relevancia);

    return resultados.slice(0, 15);
  }

  async buscarContextoILike(consulta: string): Promise<FonteRAG[]> {
    const termos = this.extrairTermos(consulta);
    if (termos.length === 0) return [];

    const resultados: FonteRAG[] = [];

    const [versiculos, gregos, hebraicos, doutrinas, personagens, historia, geografia, dicionario] =
      await Promise.all([
        this.buscarVersiculos(termos),
        this.buscarGregos(termos),
        this.buscarHebraicos(termos),
        this.buscarDoutrinas(termos),
        this.buscarPersonagens(termos),
        this.buscarHistorico(termos),
        this.buscarGeografia(termos),
        this.buscarDicionario(termos),
      ]);

    for (const v of versiculos) {
      resultados.push({
        tipo: 'versiculo',
        texto: v.texto,
        relevancia: 0.7,
        referencia: `${v.livro?.nome || ''} ${v.capituloNumero}:${v.numero}`,
      });
    }

    for (const g of gregos) {
      resultados.push({
        tipo: 'grego',
        texto: `Strong ${g.strong} - ${g.palavraOriginal} (${g.transliteracao}): ${g.definicaoCurta}`,
        relevancia: 0.65,
        referencia: `Grego: ${g.palavraOriginal}`,
      });
    }

    for (const h of hebraicos) {
      resultados.push({
        tipo: 'hebraico',
        texto: `Strong ${h.strong} - ${h.palavraOriginal} (${h.transliteracao}): ${h.definicaoCurta}`,
        relevancia: 0.65,
        referencia: `Hebraico: ${h.palavraOriginal}`,
      });
    }

    for (const d of doutrinas) {
      resultados.push({
        tipo: 'doutrina',
        texto: `${d.nome}: ${d.definicao || d.explicacao || ''}`,
        relevancia: 0.6,
        referencia: `Doutrina: ${d.nome}`,
      });
    }

    for (const p of personagens) {
      resultados.push({
        tipo: 'personagem',
        texto: `${p.nomePortugues} (${p.nomeHebraico || p.nomeGrego || ''}): ${p.biografia || ''}`,
        relevancia: 0.55,
        referencia: `Personagem: ${p.nomePortugues}`,
      });
    }

    for (const h of historia) {
      resultados.push({
        tipo: 'historia',
        texto: `${h.entidadeTipo}: ${h.contextoPolitico || h.contextoReligioso || ''}`,
        relevancia: 0.5,
        referencia: `História: ${h.entidadeTipo}`,
      });
    }

    for (const g of geografia) {
      resultados.push({
        tipo: 'geografia',
        texto: `${g.nome}: ${g.descricao || ''}`,
        relevancia: 0.45,
        referencia: `Geografia: ${g.nome}`,
      });
    }

    for (const d of dicionario) {
      resultados.push({
        tipo: 'dicionario',
        texto: `${d.titulo}: ${d.definicao || d.explicacao || ''}`,
        relevancia: 0.5,
        referencia: `Dicionário: ${d.titulo}`,
      });
    }

    resultados.sort((a, b) => b.relevancia - a.relevancia);

    return resultados.slice(0, 15);
  }

  async montarPrompt(consulta: string, contexto: ContextoRAG, tradicaoTeologica?: string): Promise<string> {
    const partes: string[] = ['Você é um especialista em estudos bíblicos acadêmicos.', ''];

    if (tradicaoTeologica) {
      partes.push(`Considere a perspectiva da tradição ${tradicaoTeologica} quando aplicável.`);
      partes.push('');
    }

    if (contexto.textoBiblico.length > 0) {
      partes.push('=== CONTEXTO BÍBLICO ===');
      partes.push(contexto.textoBiblico.join('\n'));
      partes.push('');
    }

    if (contexto.lexico.length > 0) {
      partes.push('=== LÉXICO / STRONG ===');
      partes.push(contexto.lexico.join('\n'));
      partes.push('');
    }

    if (contexto.teologia.length > 0) {
      partes.push('=== TEOLOGIA ===');
      partes.push(contexto.teologia.join('\n'));
      partes.push('');
    }

    if (contexto.historia.length > 0) {
      partes.push('=== HISTÓRIA / PERSONAGENS ===');
      partes.push(contexto.historia.join('\n'));
      partes.push('');
    }

    if (contexto.geografia.length > 0) {
      partes.push('=== GEOGRAFIA ===');
      partes.push(contexto.geografia.join('\n'));
      partes.push('');
    }

    if (contexto.comentarios.length > 0) {
      partes.push('=== COMENTÁRIOS / DICIONÁRIO ===');
      partes.push(contexto.comentarios.join('\n'));
      partes.push('');
    }

    partes.push('=== PERGUNTA DO USUÁRIO ===');
    partes.push(consulta);
    partes.push('');
    partes.push('Instruções:');
    partes.push('- Responda em português brasileiro');
    partes.push('- Baseie-se NO CONTEXTO fornecido acima');
    partes.push('- Se não houver contexto suficiente, indique isso claramente');
    partes.push('- Cite fontes e referências bíblicas sempre que possível');
    partes.push('- Identifique claramente interpretações específicas de tradições teológicas');
    partes.push('- Seja acadêmico mas acessível');

    return partes.join('\n');
  }

  async gerarEmbeddingTexto(texto: string): Promise<number[]> {
    if (!this.openaiKey) {
      throw new Error('OPENAI_API_KEY não configurada');
    }

    const resposta = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiKey}`,
      },
      body: JSON.stringify({
        model: this.embeddingModel,
        input: texto.slice(0, 8191),
      }),
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(`Erro OpenAI embedding: ${resposta.status} - ${erro}`);
    }

    const dados = await resposta.json();
    return dados.data[0].embedding;
  }

  async gerarEmbeddingsEntidade(tipo: EntityType, ids: (string | number)[]): Promise<{ sucesso: number; falha: number }> {
    const repo = this.getRepository(tipo);
    if (!repo) throw new Error(`Tipo de entidade desconhecido: ${tipo}`);

    let sucesso = 0;
    let falha = 0;

    const entidades = await repo.find({
      where: ids.length > 0 ? { id: In(ids as any[]) } : undefined,
      take: ids.length > 0 ? undefined : 100,
    } as any);

    const embeddable = entidades as EmbeddableEntity[];
    const batch: Array<{ id: string | number; texto: string }> = [];

    for (const entidade of embeddable) {
      const texto = this.extrairTextoParaEmbedding(tipo, entidade);
      if (texto) {
        batch.push({ id: entidade.id, texto });
      }
    }

    const BATCH_SIZE = 20;
    for (let i = 0; i < batch.length; i += BATCH_SIZE) {
      const lote = batch.slice(i, i + BATCH_SIZE);

      try {
        const embeddings = await this.gerarEmbeddingsLote(lote.map(b => b.texto));

        for (let j = 0; j < lote.length; j++) {
          if (embeddings[j] && embeddings[j].length > 0) {
            const embeddingStr = `[${embeddings[j].join(',')}]`;
            await repo
              .createQueryBuilder()
              .update()
              .set({ embedding: embeddingStr } as any)
              .where('id = :id', { id: lote[j].id })
              .execute();
            sucesso++;
          } else {
            falha++;
          }
        }
      } catch (erro) {
        this.logger.error(`Erro no batch de embeddings: ${erro.message}`);
        falha += lote.length;
      }

      if (i + BATCH_SIZE < batch.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    this.logger.log(`Embeddings ${tipo}: ${sucesso} sucesso, ${falha} falha`);
    return { sucesso, falha };
  }

  async popularEmbeddings(tipo: EntityType): Promise<{ total: number; sucesso: number; falha: number }> {
    const repo = this.getRepository(tipo);
    if (!repo) throw new Error(`Tipo de entidade desconhecido: ${tipo}`);

    const total = await repo.count();
    const resultado = await this.gerarEmbeddingsEntidade(tipo, []);

    return { total, ...resultado };
  }

  async statusEmbeddings(): Promise<Record<string, { total: number; comEmbedding: number; percentual: number }>> {
    const entidades: EntityType[] = ['versiculo', 'doutrina', 'personagem', 'grego', 'hebraico', 'historia', 'geografia', 'dicionario'];
    const status: Record<string, { total: number; comEmbedding: number; percentual: number }> = {};

    for (const tipo of entidades) {
      const repo = this.getRepository(tipo);
      if (!repo) continue;

      try {
        const total = await repo.count();
        const comEmbedding = await repo
          .createQueryBuilder('e')
          .where('e.embedding IS NOT NULL')
          .getCount();

        status[tipo] = {
          total,
          comEmbedding,
          percentual: total > 0 ? Math.round((comEmbedding / total) * 100) : 0,
        };
      } catch {
        status[tipo] = { total: 0, comEmbedding: 0, percentual: 0 };
      }
    }

    return status;
  }

  private async gerarEmbeddingsLote(textos: string[]): Promise<number[][]> {
    if (!this.openaiKey) throw new Error('OPENAI_API_KEY não configurada');

    const limpos = textos.map(t => t.slice(0, 8191));

    const resposta = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiKey}`,
      },
      body: JSON.stringify({
        model: this.embeddingModel,
        input: limpos,
      }),
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(`Erro OpenAI embeddings batch: ${resposta.status} - ${erro}`);
    }

    const dados = await resposta.json();
    return dados.data.sort((a: any, b: any) => a.index - b.index).map((d: any) => d.embedding);
  }

  private extrairTextoParaEmbedding(tipo: EntityType, entidade: EmbeddableEntity): string | null {
    switch (tipo) {
      case 'versiculo':
        return `${entidade.livro_nome || ''} ${entidade.capitulo || ''}:${entidade.numero || ''} - ${entidade.texto || ''}`.trim();
      case 'doutrina':
        return `${entidade.nome || ''}: ${entidade.definicao || entidade.explicacao || ''}`.trim();
      case 'personagem':
        return `${entidade.nome_portugues || entidade.nome || ''} (${entidade.nome_hebraico || entidade.nome_grego || ''}): ${entidade.biografia || ''}`.trim();
      case 'grego':
        return `Palavra grega ${entidade.strong || ''} - ${entidade.palavra_original || entidade.lemma || ''} (${entidade.transliteracao || ''}): ${entidade.definicao_curta || ''}`.trim();
      case 'hebraico':
        return `Palavra hebraica ${entidade.strong || ''} - ${entidade.palavra_original || entidade.lemma || ''} (${entidade.transliteracao || ''}): ${entidade.definicao_curta || ''}`.trim();
      case 'historia':
        return `${entidade.titulo || entidade.entidade_tipo || ''}: ${entidade.contexto_politico || entidade.contexto_religioso || ''}`.trim();
      case 'geografia':
        return `${entidade.nome || ''}: ${entidade.descricao || ''}`.trim();
      case 'dicionario':
        return `${entidade.titulo || ''}: ${entidade.definicao || entidade.explicacao || ''}`.trim();
      default:
        return null;
    }
  }

  private getRepository(tipo: EntityType): Repository<any> | null {
    const map: Record<EntityType, Repository<any>> = {
      versiculo: this.versiculoRepo,
      doutrina: this.doutrinaRepo,
      personagem: this.personagemRepo,
      grego: this.gregoRepo,
      hebraico: this.hebraicoRepo,
      historia: this.historiaRepo,
      geografia: this.geografiaRepo,
      dicionario: this.dicionarioRepo,
    };
    return map[tipo] || null;
  }

  private extrairTermos(consulta: string): string[] {
    const palavrasComuns = new Set([
      'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
      'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
      'por', 'para', 'com', 'sem', 'sob', 'sobre',
      'e', 'ou', 'mas', 'porém', 'entretanto',
      'que', 'qual', 'quais', 'quem', 'onde', 'como', 'quando',
      'é', 'são', 'esta', 'estão', 'foi', 'foram',
      'isto', 'isso', 'aquilo', 'esse', 'essa',
      'perguntar', 'explique', 'fale', 'conte', 'descreva',
    ]);

    return consulta
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(p => p.length > 2 && !palavrasComuns.has(p))
      .slice(0, 10);
  }

  private async buscarVersiculos(termos: string[]): Promise<Versiculo[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `v.texto ILIKE :t${i}`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.versiculoRepo
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.livro', 'livro')
      .where(conditions.join(' OR '), parameters)
      .limit(5)
      .getMany();
  }

  private async buscarGregos(termos: string[]): Promise<PalavraGrega[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `(g.definicao_curta ILIKE :t${i} OR g.lemma ILIKE :t${i} OR g.transliteracao ILIKE :t${i})`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.gregoRepo
      .createQueryBuilder('g')
      .where(conditions.join(' OR '), parameters)
      .limit(3)
      .getMany();
  }

  private async buscarHebraicos(termos: string[]): Promise<PalavraHebraica[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `(h.definicao_curta ILIKE :t${i} OR h.lemma ILIKE :t${i} OR h.transliteracao ILIKE :t${i})`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.hebraicoRepo
      .createQueryBuilder('h')
      .where(conditions.join(' OR '), parameters)
      .limit(3)
      .getMany();
  }

  private async buscarDoutrinas(termos: string[]): Promise<Doutrina[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `(d.nome ILIKE :t${i} OR d.definicao ILIKE :t${i} OR d.explicacao ILIKE :t${i})`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.doutrinaRepo
      .createQueryBuilder('d')
      .where(conditions.join(' OR '), parameters)
      .limit(3)
      .getMany();
  }

  private async buscarPersonagens(termos: string[]): Promise<Personagem[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `(p.nome_portugues ILIKE :t${i} OR p.nome_hebraico ILIKE :t${i} OR p.nome_grego ILIKE :t${i} OR p.biografia ILIKE :t${i})`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.personagemRepo
      .createQueryBuilder('p')
      .where(conditions.join(' OR '), parameters)
      .limit(3)
      .getMany();
  }

  private async buscarHistorico(termos: string[]): Promise<ContextoHistorico[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `(h.contexto_politico ILIKE :t${i} OR h.contexto_religioso ILIKE :t${i} OR h.contexto_cultural ILIKE :t${i} OR h.significado_teologico ILIKE :t${i})`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.historiaRepo
      .createQueryBuilder('h')
      .where(conditions.join(' OR '), parameters)
      .limit(3)
      .getMany();
  }

  private async buscarGeografia(termos: string[]): Promise<Localizacao[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `(g.nome ILIKE :t${i} OR g.descricao ILIKE :t${i})`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.geografiaRepo
      .createQueryBuilder('g')
      .where(conditions.join(' OR '), parameters)
      .limit(3)
      .getMany();
  }

  private async buscarDicionario(termos: string[]): Promise<Verbete[]> {
    if (termos.length === 0) return [];
    const conditions = termos.map((t, i) => `(v.titulo ILIKE :t${i} OR v.definicao ILIKE :t${i} OR v.explicacao ILIKE :t${i})`);
    const parameters = Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]));

    return this.dicionarioRepo
      .createQueryBuilder('v')
      .where(conditions.join(' OR '), parameters)
      .limit(3)
      .getMany();
  }
}
