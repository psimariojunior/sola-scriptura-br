import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { BibleVerse } from '../../../infrastructure/database/entities/bible-verse.entity';
import { KnowledgeGraphEntity } from '../../../infrastructure/database/entities/knowledge-graph.entity';
import { Commentary } from '../../../infrastructure/database/entities/commentary.entity';
import { Doctrine } from '../../../infrastructure/database/entities/doctrine.entity';
import { LexiconEntry } from '../../../infrastructure/database/entities/lexicon.entity';

interface DocumentoRAG {
  id: string;
  conteudo: string;
  fonte: string;
  tipo: string;
  relevancia: number;
  referencia?: string;
}

interface ContextoRAG {
  documentos: DocumentoRAG[];
  contextoCompleto: string;
  fontesUtilizadas: string[];
}

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);
  private readonly embeddingDimensao = 1536;

  constructor(
    @InjectRepository(BibleVerse)
    private readonly versiculoRepo: Repository<BibleVerse>,
    @InjectRepository(KnowledgeGraphEntity)
    private readonly graphRepo: Repository<KnowledgeGraphEntity>,
    @InjectRepository(Commentary)
    private readonly commentaryRepo: Repository<Commentary>,
    @InjectRepository(Doctrine)
    private readonly doctrineRepo: Repository<Doctrine>,
    @InjectRepository(LexiconEntry)
    private readonly lexiconRepo: Repository<LexiconEntry>,
    private readonly configService: ConfigService,
  ) {}

  async buscarContexto(consulta: string, limite = 10): Promise<ContextoRAG> {
    const termos = consulta.toLowerCase().split(/\s+/).filter((t) => t.length > 3);

    const [versiculos, comentarios, doutrinas, grafo, lexicos] = await Promise.all([
      this.buscarVersiculos(termos, limite),
      this.buscarComentarios(termos, limite),
      this.buscarDoutrinas(termos, limite),
      this.buscarGrafo(termos, limite),
      this.buscarLexicos(termos, limite),
    ]);

    const documentos: DocumentoRAG[] = [
      ...versiculos.map((v) => ({
        id: v.id,
        conteudo: v.texto,
        fonte: `${v.capitulo.livro.nome} ${v.capitulo.numero}:${v.numero}`,
        tipo: 'versiculo',
        relevancia: this.calcularRelevancia(termos, v.texto),
        referencia: `${v.capitulo.livro.nome} ${v.capitulo.numero}:${v.numero}`,
      })),
      ...comentarios.map((c) => ({
        id: c.id,
        conteudo: c.conteudo,
        fonte: c.titulo,
        tipo: 'comentario',
        relevancia: this.calcularRelevancia(termos, c.conteudo),
        referencia: c.livro,
      })),
      ...doutrinas.map((d) => ({
        id: d.id,
        conteudo: `${d.nome}: ${d.descricao}`,
        fonte: d.categoria,
        tipo: 'doutrina',
        relevancia: this.calcularRelevancia(termos, d.descricao),
      })),
      ...grafo.map((g) => ({
        id: g.id,
        conteudo: `${g.nome} (${g.tipo}): ${g.descricao || ''}`,
        fonte: g.tipo,
        tipo: 'entidade',
        relevancia: this.calcularRelevancia(termos, g.descricao || ''),
      })),
      ...lexicos.map((l) => ({
        id: l.id,
        conteudo: `${l.lemma} (${l.idioma}): ${l.definicao}`,
        fonte: `Strong ${l.strong}`,
        tipo: 'lexico',
        relevancia: this.calcularRelevancia(termos, l.definicao),
      })),
    ];

    const ordenados = documentos
      .sort((a, b) => b.relevancia - a.relevancia)
      .slice(0, limite);

    const fontesUnicas = [...new Set(ordenados.map((d) => d.fonte))];

    return {
      documentos: ordenados,
      contextoCompleto: ordenados.map((d) => `[${d.fonte}] ${d.conteudo}`).join('\n\n'),
      fontesUtilizadas: fontesUnicas,
    };
  }

  private async buscarVersiculos(termos: string[], limite: number): Promise<BibleVerse[]> {
    const conditions = termos.map((t) => `texto ILIKE '%${t}%'`).join(' OR ');
    if (!conditions) return [];

    return this.versiculoRepo
      .createQueryBuilder('v')
      .innerJoinAndSelect('v.capitulo', 'c')
      .innerJoinAndSelect('c.livro', 'l')
      .where(conditions)
      .orderBy('RANDOM()')
      .take(limite)
      .getMany();
  }

  private async buscarComentarios(termos: string[], limite: number): Promise<Commentary[]> {
    const conditions = termos.map((t) => `conteudo ILIKE '%${t}%'`).join(' OR ');
    if (!conditions) return [];

    return this.commentaryRepo
      .createQueryBuilder('c')
      .where(conditions)
      .take(limite)
      .getMany();
  }

  private async buscarDoutrinas(termos: string[], limite: number): Promise<Doctrine[]> {
    const conditions = termos.map((t) => `descricao ILIKE '%${t}%' OR nome ILIKE '%${t}%'`).join(' OR ');
    if (!conditions) return [];

    return this.doctrineRepo
      .createQueryBuilder('d')
      .where(conditions)
      .take(limite)
      .getMany();
  }

  private async buscarGrafo(termos: string[], limite: number): Promise<KnowledgeGraphEntity[]> {
    const conditions = termos.map((t) => `nome ILIKE '%${t}%' OR descricao ILIKE '%${t}%'`).join(' OR ');
    if (!conditions) return [];

    return this.graphRepo
      .createQueryBuilder('g')
      .where(conditions)
      .take(limite)
      .getMany();
  }

  private async buscarLexicos(termos: string[], limite: number): Promise<LexiconEntry[]> {
    const conditions = termos.map((t) => `definicao ILIKE '%${t}%' OR lemma ILIKE '%${t}%'`).join(' OR ');
    if (!conditions) return [];

    return this.lexiconRepo
      .createQueryBuilder('l')
      .where(conditions)
      .take(limite)
      .getMany();
  }

  private calcularRelevancia(termos: string[], texto: string): number {
    const textoLower = texto.toLowerCase();
    let score = 0;
    for (const termo of termos) {
      if (textoLower.includes(termo)) {
        score += 1;
      }
    }
    return score / termos.length;
  }

  async extrairEmbedding(texto: string): Promise<number[]> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      return new Array(this.embeddingDimensao).fill(0);
    }
    const url = 'https://api.openai.com/v1/embeddings';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: texto,
        model: this.configService.get<string>('OPENAI_EMBEDDING_MODEL', 'text-embedding-3-small'),
      }),
    });
    const data = await response.json();
    return data.data?.[0]?.embedding || new Array(this.embeddingDimensao).fill(0);
  }
}
