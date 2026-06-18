import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnaliseExegetica } from '../domain/analise-exegetica.entity';

@Injectable()
export class ExegeseService {
  private readonly logger = new Logger(ExegeseService.name);

  constructor(
    @InjectRepository(AnaliseExegetica) private analiseRepo: Repository<AnaliseExegetica>,
  ) {}

  async buscarPorVersiculo(versiculoId: string): Promise<AnaliseExegetica> {
    const analise = await this.analiseRepo.findOne({ where: { versiculoId } });
    if (!analise) throw new NotFoundException('Análise exegética não encontrada para este versículo');
    return analise;
  }

  async gerarAnalise(versiculoId: string, dados: Partial<AnaliseExegetica>): Promise<AnaliseExegetica> {
    const analise = this.analiseRepo.create({ versiculoId, ...dados });
    return this.analiseRepo.save(analise);
  }

  async listarContextos(versiculoId: string): Promise<any> {
    const analise = await this.buscarPorVersiculo(versiculoId);
    return {
      contextoImediato: analise.contextoImediato,
      contextoCapitulo: analise.contextoCapitulo,
      contextoLivro: analise.contextoLivro,
      contextoTestamento: analise.contextoTestamento,
      contextoCanonico: analise.contextoCanonico,
    };
  }
}
