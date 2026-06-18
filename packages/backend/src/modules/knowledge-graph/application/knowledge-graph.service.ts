import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeGraphEntity, KnowledgeGraphRelationship } from '../../../infrastructure/database/entities/knowledge-graph.entity';

interface EntidadeGrafo {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  propriedades: Record<string, any>;
}

interface RelacaoGrafo {
  origem: string;
  destino: string;
  tipo: string;
  descricao: string;
  peso: number;
}

interface CaminhoGrafo {
  entidades: EntidadeGrafo[];
  relacoes: RelacaoGrafo[];
}

@Injectable()
export class KnowledgeGraphService {
  private readonly logger = new Logger(KnowledgeGraphService.name);

  constructor(
    @InjectRepository(KnowledgeGraphEntity)
    private readonly entityRepo: Repository<KnowledgeGraphEntity>,
    @InjectRepository(KnowledgeGraphRelationship)
    private readonly relRepo: Repository<KnowledgeGraphRelationship>,
  ) {}

  async buscarEntidade(nome: string, tipo?: string): Promise<EntidadeGrafo | null> {
    const where: any = { nome };
    if (tipo) where.tipo = tipo;
    const entidade = await this.entityRepo.findOne({ where });
    if (!entidade) return null;
    return this.mapearEntidade(entidade);
  }

  async buscarCaminho(origem: string, destino: string): Promise<CaminhoGrafo> {
    const entidades: EntidadeGrafo[] = [];
    const relacoes: RelacaoGrafo[] = [];

    const relacoesDiretas = await this.relRepo.find({
      where: [
        { origemId: origem, destinoId: destino },
        { origemId: destino, destinoId: origem },
      ],
    });

    for (const rel of relacoesDiretas) {
      const entOrigem = await this.entityRepo.findOne({ where: { id: rel.origemId } });
      const entDestino = await this.entityRepo.findOne({ where: { id: rel.destinoId } });
      if (entOrigem) entidades.push(this.mapearEntidade(entOrigem));
      if (entDestino) entidades.push(this.mapearEntidade(entDestino));
      relacoes.push(this.mapearRelacao(rel));
    }

    return { entidades, relacoes };
  }

  async listarEntidadesPorTipo(tipo: string): Promise<EntidadeGrafo[]> {
    const entidades = await this.entityRepo.find({ where: { tipo }, order: { nome: 'ASC' } });
    return entidades.map(this.mapearEntidade);
  }

  async listarTiposEntidade(): Promise<string[]> {
    const result = await this.entityRepo
      .createQueryBuilder('e')
      .select('DISTINCT e.tipo')
      .getRawMany();
    return result.map((r) => r.tipo);
  }

  async listarRelacoesEntidade(entidadeId: string): Promise<RelacaoGrafo[]> {
    const relacoes = await this.relRepo.find({
      where: [{ origemId: entidadeId }, { destinoId: entidadeId }],
    });
    return relacoes.map(this.mapearRelacao);
  }

  async criarEntidade(data: Partial<EntidadeGrafo>): Promise<EntidadeGrafo> {
    const entity = this.entityRepo.create({
      nome: data.nome,
      tipo: data.tipo,
      descricao: data.descricao,
      propriedades: data.propriedades,
    });
    const saved = await this.entityRepo.save(entity);
    return this.mapearEntidade(saved);
  }

  async criarRelacao(data: {
    origemId: string;
    destinoId: string;
    tipoRelacao: string;
    descricao?: string;
    peso?: number;
  }): Promise<RelacaoGrafo> {
    const rel = this.relRepo.create(data);
    const saved = await this.relRepo.save(rel);
    return this.mapearRelacao(saved);
  }

  async buscarLinhaGenealogica(entidadeNome: string): Promise<any[]> {
    const entidade = await this.buscarEntidade(entidadeNome);
    if (!entidade) return [];

    const resultados: any[] = [];
    const visitados = new Set<string>();
    const fila = [{ id: entidade.id, nome: entidade.nome, nivel: 0 }];

    while (fila.length > 0) {
      const atual = fila.shift()!;
      if (visitados.has(atual.id)) continue;
      visitados.add(atual.id);

      resultados.push(atual);

      const relacoes = await this.relRepo.find({
        where: { origemId: atual.id, tipoRelacao: 'pai_de' },
      });

      for (const rel of relacoes) {
        const destino = await this.entityRepo.findOne({ where: { id: rel.destinoId } });
        if (destino && !visitados.has(destino.id)) {
          fila.push({ id: destino.id, nome: destino.nome, nivel: atual.nivel + 1 });
        }
      }
    }

    return resultados;
  }

  private mapearEntidade(e: KnowledgeGraphEntity): EntidadeGrafo {
    return {
      id: e.id,
      nome: e.nome,
      tipo: e.tipo,
      descricao: e.descricao || '',
      propriedades: e.propriedades || {},
    };
  }

  private mapearRelacao(r: KnowledgeGraphRelationship): RelacaoGrafo {
    return {
      origem: r.origemId,
      destino: r.destinoId,
      tipo: r.tipoRelacao,
      descricao: r.descricao || '',
      peso: r.peso,
    };
  }
}
