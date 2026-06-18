import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferenciaCruzada } from '../domain/referencia-cruzada.entity';

@Injectable()
export class ReferenciasService {
  private readonly logger = new Logger(ReferenciasService.name);

  constructor(
    @InjectRepository(ReferenciaCruzada) private refRepo: Repository<ReferenciaCruzada>,
  ) {}

  async buscarPorVersiculo(versiculoId: string): Promise<ReferenciaCruzada[]> {
    return this.refRepo.find({
      where: [{ versiculoOrigemId: versiculoId }, { versiculoDestinoId: versiculoId }],
      relations: ['versiculoOrigem', 'versiculoDestino'],
      order: { peso: 'DESC' },
    });
  }

  async buscarPorTipo(tipo: string): Promise<ReferenciaCruzada[]> {
    return this.refRepo.find({ where: { tipoRelacao: tipo }, take: 50 });
  }
}
