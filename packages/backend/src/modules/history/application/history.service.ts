import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BiblePerson } from '../../../infrastructure/database/entities/person.entity';
import { BibleLocation } from '../../../infrastructure/database/entities/location.entity';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

  constructor(
    @InjectRepository(BiblePerson)
    private readonly personRepo: Repository<BiblePerson>,
    @InjectRepository(BibleLocation)
    private readonly locationRepo: Repository<BibleLocation>,
  ) {}

  async buscarPessoa(nome: string): Promise<BiblePerson | null> {
    return this.personRepo.findOne({ where: { nome } });
  }

  async listarPessoas(categoria?: string): Promise<BiblePerson[]> {
    const where: any = {};
    if (categoria) where.categoria = categoria;
    return this.personRepo.find({ where, order: { nome: 'ASC' } });
  }

  async buscarLocal(nome: string): Promise<BibleLocation | null> {
    return this.locationRepo.findOne({ where: { nome } });
  }

  async buscarEventosHistoricos(periodo?: string): Promise<any[]> {
    return [];
  }
}
