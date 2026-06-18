import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PalavraGrega } from '../domain/palavra-grega.entity';

@Injectable()
export class GregoService {
  private readonly logger = new Logger(GregoService.name);

  constructor(
    @InjectRepository(PalavraGrega) private palavraRepo: Repository<PalavraGrega>,
  ) {}

  async buscarPorStrong(strong: string): Promise<PalavraGrega> {
    const palavra = await this.palavraRepo.findOne({ where: { strong } });
    if (!palavra) throw new NotFoundException(`Strong ${strong} não encontrado`);
    return palavra;
  }

  async buscarPorLemma(lemma: string): Promise<PalavraGrega[]> {
    return this.palavraRepo.find({ where: { lemma }, take: 20 });
  }

  async buscarPorTransliteracao(texto: string): Promise<PalavraGrega[]> {
    return this.palavraRepo.createQueryBuilder('pg')
      .where('pg.transliteracao ILIKE :texto', { texto: `%${texto}%` })
      .orWhere('pg.palavraOriginal ILIKE :texto', { texto: `%${texto}%` })
      .take(20)
      .getMany();
  }

  async listarOcorrencias(strong: string): Promise<any> {
    const palavra = await this.buscarPorStrong(strong);
    const ocorrencias = palavra.ocorrencias ? JSON.parse(palavra.ocorrencias) : [];
    return { palavra, ocorrencias, total: ocorrencias.length };
  }

  async buscarFrequentes(limite = 100): Promise<PalavraGrega[]> {
    return this.palavraRepo.find({
      order: { frequenciaNT: 'DESC' },
      take: limite,
    });
  }

  async buscarSimilares(strong: string): Promise<PalavraGrega[]> {
    const palavra = await this.buscarPorStrong(strong);
    return this.palavraRepo.createQueryBuilder('pg')
      .where('pg.lemma = :lemma', { lemma: palavra.lemma })
      .andWhere('pg.strong != :strong', { strong })
      .getMany();
  }
}
