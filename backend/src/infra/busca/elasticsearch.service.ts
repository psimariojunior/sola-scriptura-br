import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private readonly logger = new Logger(ElasticsearchService.name);
  private client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      node: this.configService.get('ELASTICSEARCH_URL', 'http://localhost:9200'),
      auth: {
        username: this.configService.get('ELASTICSEARCH_USER', 'elastic'),
        password: this.configService.get('ELASTICSEARCH_PASSWORD', ''),
      },
    });
  }

  async criarIndice(nome: string, configuracao: any): Promise<void> {
    const existe = await this.client.indices.exists({ index: nome });
    if (!existe) {
      await this.client.indices.create({ index: nome, body: configuracao });
      this.logger.log(`Índice ${nome} criado`);
    }
  }

  async indexar(documento: { indice: string; id: string; corpo: any }): Promise<void> {
    await this.client.index({
      index: documento.indice,
      id: documento.id,
      body: documento.corpo,
      refresh: 'wait_for',
    });
  }

  async buscar(params: { indice: string; consulta: any; pagina?: number; tamanho?: number }) {
    const { indice, consulta, pagina = 1, tamanho = 20 } = params;
    const from = (pagina - 1) * tamanho;
    const resultado = await this.client.search({
      index: indice,
      from,
      size: tamanho,
      body: { query: consulta },
    });
    return (resultado as any).hits.hits.map((hit: any) => ({
      id: hit._id,
      score: hit._score,
      fonte: hit._source,
    }));
  }

  async buscarTextoCompleto(indice: string, texto: string, pagina = 1, tamanho = 20) {
    return this.buscar({
      indice,
      consulta: {
        multi_match: {
          query: texto,
          fields: ['*'],
          type: 'best_fields',
          fuzziness: 'AUTO',
        },
      },
      pagina,
      tamanho,
    });
  }

  async buscarSemantica(indice: string, vetor: number[], pagina = 1, tamanho = 20) {
    return this.buscar({
      indice,
      consulta: {
        script_score: {
          query: { match_all: {} },
          script: {
            source: "cosineSimilarity(params.queryVector, 'vetor_embedding') + 1.0",
            params: { queryVector: vetor },
          },
        },
      },
      pagina,
      tamanho,
    });
  }

  async atualizar(indice: string, id: string, corpo: any): Promise<void> {
    await this.client.update({ index: indice, id, body: { doc: corpo } });
  }

  async remover(indice: string, id: string): Promise<void> {
    await this.client.delete({ index: indice, id });
  }

  async saúde(): Promise<boolean> {
    try {
      const resp = await this.client.cluster.health();
      return (resp as any).status === 'green' || (resp as any).status === 'yellow';
    } catch {
      return false;
    }
  }
}
