import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { EventoHistorico } from '../domain/evento-historico.entity';

@Injectable()
export class CronologiaService {
  private readonly logger = new Logger(CronologiaService.name);

  constructor(
    @InjectRepository(EventoHistorico) private eventoRepo: Repository<EventoHistorico>,
  ) {}

  async listarPorEra(era: string): Promise<EventoHistorico[]> {
    return this.eventoRepo.find({
      where: { era },
      order: { anoInicio: 'ASC' },
    });
  }

  async listarPorPeriodo(anoInicio: number, anoFim: number): Promise<EventoHistorico[]> {
    return this.eventoRepo.find({
      where: [
        { anoInicio: Between(anoInicio, anoFim) },
        { anoFim: Between(anoInicio, anoFim) },
      ],
      order: { anoInicio: 'ASC' },
    });
  }

  async listarPorCategoria(categoria: string): Promise<EventoHistorico[]> {
    return this.eventoRepo.find({
      where: { categoria },
      order: { anoInicio: 'ASC' },
    });
  }

  async linhaDoTempo(): Promise<EventoHistorico[]> {
    return this.eventoRepo.find({ order: { anoInicio: 'ASC' }, take: 200 });
  }
}
