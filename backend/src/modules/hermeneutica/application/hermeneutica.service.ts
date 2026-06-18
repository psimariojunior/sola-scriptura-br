import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnaliseHermeneutica } from '../domain/analise-hermeneutica.entity';

@Injectable()
export class HermeneuticaService {
  private readonly logger = new Logger(HermeneuticaService.name);

  constructor(
    @InjectRepository(AnaliseHermeneutica) private analiseRepo: Repository<AnaliseHermeneutica>,
  ) {}

  async buscarPorVersiculo(versiculoId: string): Promise<AnaliseHermeneutica> {
    const analise = await this.analiseRepo.findOne({ where: { versiculoId } });
    if (!analise) throw new NotFoundException('Análise hermenêutica não encontrada');
    return analise;
  }

  async identificarGenero(versiculoId: string): Promise<string> {
    const analise = await this.buscarPorVersiculo(versiculoId);
    return analise.generoLiterario;
  }
}
