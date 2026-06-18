import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Verbete } from '../domain/verbete.entity';

@Injectable()
export class DicionarioService {
  private readonly logger = new Logger(DicionarioService.name);

  constructor(
    @InjectRepository(Verbete) private verbeteRepo: Repository<Verbete>,
  ) {}

  async buscarPorSlug(slug: string): Promise<Verbete> {
    const verbete = await this.verbeteRepo.findOne({ where: { slug } });
    if (!verbete) throw new NotFoundException(`Verbete ${slug} não encontrado`);
    return verbete;
  }

  async pesquisar(consulta: string): Promise<Verbete[]> {
    return this.verbeteRepo.find({
      where: [
        { titulo: ILike(`%${consulta}%`) },
        { definicao: ILike(`%${consulta}%`) },
      ],
      take: 20,
    });
  }

  async listarPorCategoria(categoria: string): Promise<Verbete[]> {
    return this.verbeteRepo.find({ where: { categoria }, order: { titulo: 'ASC' } });
  }
}
