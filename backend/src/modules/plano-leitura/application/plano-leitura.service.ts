import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanoLeitura } from '../domain/plano-leitura.entity';
import { ProgressoLeitura } from '../domain/progresso-leitura.entity';

@Injectable()
export class PlanoLeituraService {
  private readonly logger = new Logger(PlanoLeituraService.name);

  constructor(
    @InjectRepository(PlanoLeitura) private planoSchema: Repository<PlanoLeitura>,
    @InjectRepository(ProgressoLeitura) private progressoSchema: Repository<ProgressoLeitura>,
  ) {}

  async listarPlanos(): Promise<PlanoLeitura[]> {
    return this.planoSchema.find({ where: { publico: true }, order: { nome: 'ASC' } });
  }

  async buscarPlano(id: string): Promise<PlanoLeitura> {
    return (await this.planoSchema.findOne({ where: { id } }))!;
  }

  async iniciarPlano(usuarioId: string, planoId: string): Promise<ProgressoLeitura> {
    const progresso = this.progressoSchema.create({
      usuarioId, planoId, dataInicio: new Date(), diaAtual: 1,
    });
    return this.progressoSchema.save(progresso);
  }

  async avancarDia(usuarioId: string, progressoId: string): Promise<ProgressoLeitura> {
    const progresso = await this.progressoSchema.findOne({ where: { id: progressoId, usuarioId } });
    if (!progresso) throw new Error('Progresso não encontrado');
    progresso.diaAtual += 1;
    if (!progresso.diasCompletos) progresso.diasCompletos = [];
    progresso.diasCompletos.push(progresso.diaAtual - 1);
    const plano = await this.planoSchema.findOne({ where: { id: progresso.planoId } });
    if (progresso.diaAtual > (plano?.totalDias || 0)) {
      progresso.concluido = true;
      progresso.dataConclusao = new Date();
    }
    return this.progressoSchema.save(progresso);
  }

  async progressoUsuario(usuarioId: string): Promise<ProgressoLeitura[]> {
    return this.progressoSchema.find({
      where: { usuarioId },
      relations: ['plano'],
      order: { dataInicio: 'DESC' },
    });
  }
}
