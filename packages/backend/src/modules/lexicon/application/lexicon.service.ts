import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LexiconEntry } from '../../../infrastructure/database/entities/lexicon.entity';

interface EntradaLexico {
  strong: string;
  idioma: string;
  lemma: string;
  transliteracao: string;
  definicao: string;
  significados: string[];
  ocorrencias: number;
  fonte: string;
}

@Injectable()
export class LexiconService {
  private readonly logger = new Logger(LexiconService.name);

  constructor(
    @InjectRepository(LexiconEntry)
    private readonly lexiconRepo: Repository<LexiconEntry>,
  ) {}

  async buscarStrong(strong: string): Promise<EntradaLexico | null> {
    const entry = await this.lexiconRepo.findOne({ where: { strong } });
    if (!entry) return null;
    return this.mapearEntrada(entry);
  }

  async buscarLemma(lemma: string): Promise<EntradaLexico[]> {
    const entries = await this.lexiconRepo.find({ where: { lemma } });
    return entries.map(this.mapearEntrada);
  }

  async buscarPorIdioma(idioma: string, limite = 50): Promise<EntradaLexico[]> {
    const entries = await this.lexiconRepo.find({
      where: { idioma },
      take: limite,
      order: { lemma: 'ASC' },
    });
    return entries.map(this.mapearEntrada);
  }

  async buscarPorTermo(termo: string): Promise<EntradaLexico[]> {
    const entries = await this.lexiconRepo
      .createQueryBuilder('l')
      .where('l.definicao ILIKE :termo', { termo: `%${termo}%` })
      .orWhere('l.lemma ILIKE :termo', { termo: `%${termo}%` })
      .orWhere('l.transliteracao ILIKE :termo', { termo: `%${termo}%` })
      .take(20)
      .getMany();

    return entries.map(this.mapearEntrada);
  }

  private mapearEntrada(e: LexiconEntry): EntradaLexico {
    return {
      strong: e.strong,
      idioma: e.idioma,
      lemma: e.lemma,
      transliteracao: e.transliteracao || '',
      definicao: e.definicao,
      significados: e.significados || [],
      ocorrencias: e.totalOcorrencias || 0,
      fonte: e.fonte || '',
    };
  }
}
