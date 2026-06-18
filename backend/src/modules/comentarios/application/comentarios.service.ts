import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from '../domain/comentario.entity';

@Injectable()
export class ComentariosService {
  private readonly logger = new Logger(ComentariosService.name);

  constructor(
    @InjectRepository(Comentario) private comentarioRepo: Repository<Comentario>,
  ) {}

  async buscarPorReferencia(livroId: string, capitulo: number, versiculo?: number): Promise<Comentario[]> {
    const query = this.comentarioRepo.createQueryBuilder('c')
      .where('c.livroId = :livroId', { livroId })
      .andWhere('c.capitulo = :capitulo', { capitulo });
    if (versiculo) {
      query.andWhere('(c.versiculoInicio <= :versiculo AND c.versiculoFim >= :versiculo)', { versiculo });
    }
    return query.orderBy('c.autor', 'ASC').getMany();
  }

  async buscarPorAutor(autor: string): Promise<Comentario[]> {
    return this.comentarioRepo.find({ where: { autor }, take: 50 });
  }

  async listarAutores(): Promise<string[]> {
    const resultado = await this.comentarioRepo
      .createQueryBuilder('c')
      .select('DISTINCT c.autor')
      .orderBy('c.autor')
      .getRawMany();
    return resultado.map((r) => r.autor);
  }
}
