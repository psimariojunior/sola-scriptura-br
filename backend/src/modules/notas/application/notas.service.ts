import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from '../domain/nota.entity';

@Injectable()
export class NotasService {
  private readonly logger = new Logger(NotasService.name);

  constructor(
    @InjectRepository(Nota) private notaRepo: Repository<Nota>,
  ) {}

  async listar(usuarioId: string, versiculoId?: string): Promise<Nota[]> {
    const where: any = { usuarioId };
    if (versiculoId) where.versiculoId = versiculoId;
    return this.notaRepo.find({ where, order: { criadoEm: 'DESC' } });
  }

  async criar(usuarioId: string, dados: Partial<Nota>): Promise<Nota> {
    const nota = this.notaRepo.create({ usuarioId, ...dados });
    return this.notaRepo.save(nota);
  }

  async atualizar(notaId: string, usuarioId: string, dados: Partial<Nota>): Promise<Nota> {
    await this.notaRepo.update({ id: notaId, usuarioId }, dados);
    return this.notaRepo.findOne({ where: { id: notaId } });
  }

  async remover(notaId: string, usuarioId: string): Promise<void> {
    await this.notaRepo.delete({ id: notaId, usuarioId });
  }
}
