import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PalavraHebraica } from '../domain/palavra-hebraica.entity';

@Injectable()
export class HebraicoService {
  private readonly logger = new Logger(HebraicoService.name);

  constructor(
    @InjectRepository(PalavraHebraica) private palavraRepo: Repository<PalavraHebraica>,
  ) {}

  async buscarPorStrong(strong: string): Promise<PalavraHebraica> {
    const palavra = await this.palavraRepo.findOne({ where: { strong } });
    if (!palavra) throw new NotFoundException(`Strong ${strong} não encontrado`);
    return palavra;
  }

  async buscarPorRaiz(raiz: string): Promise<PalavraHebraica[]> {
    return this.palavraRepo.find({ where: { raiz }, take: 20 });
  }

  async buscarPorTransliteracao(texto: string): Promise<PalavraHebraica[]> {
    return this.palavraRepo.createQueryBuilder('ph')
      .where('ph.transliteracao ILIKE :texto', { texto: `%${texto}%` })
      .orWhere('ph.palavraOriginal ILIKE :texto', { texto: `%${texto}%` })
      .take(20)
      .getMany();
  }

  async buscarFrequentes(limite = 100): Promise<PalavraHebraica[]> {
    return this.palavraRepo.find({
      order: { frequenciaAT: 'DESC' },
      take: limite,
    });
  }
}
