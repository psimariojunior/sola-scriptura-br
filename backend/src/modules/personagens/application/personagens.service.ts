import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personagem } from '../domain/personagem.entity';

@Injectable()
export class PersonagensService {
  private readonly logger = new Logger(PersonagensService.name);

  constructor(
    @InjectRepository(Personagem) private personagemRepo: Repository<Personagem>,
  ) {}

  async listarPersonagens(limite = 50): Promise<Personagem[]> {
    return this.personagemRepo.find({ take: limite, order: { nomePortugues: 'ASC' } });
  }

  async buscarPorSlug(slug: string): Promise<Personagem> {
    const personagem = await this.personagemRepo.findOne({ where: { slug } });
    if (!personagem) throw new NotFoundException(`Personagem ${slug} não encontrado`);
    return personagem;
  }

  async buscarPorNome(consulta: string): Promise<Personagem[]> {
    return this.personagemRepo.createQueryBuilder('p')
      .where('p.nomePortugues ILIKE :consulta', { consulta: `%${consulta}%` })
      .orWhere('p.nomeOriginal ILIKE :consulta', { consulta: `%${consulta}%` })
      .take(20)
      .getMany();
  }
}
