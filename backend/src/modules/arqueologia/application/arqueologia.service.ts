import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artefato } from '../domain/artefato.entity';
import { Manuscrito } from '../domain/manuscrito.entity';

@Injectable()
export class ArqueologiaService {
  private readonly logger = new Logger(ArqueologiaService.name);

  constructor(
    @InjectRepository(Artefato) private artefatoRepo: Repository<Artefato>,
    @InjectRepository(Manuscrito) private manuscritoRepo: Repository<Manuscrito>,
  ) {}

  async listarArtefatos(tipo?: string): Promise<Artefato[]> {
    const where = tipo ? { tipo } : {};
    return this.artefatoRepo.find({ where, order: { nome: 'ASC' } });
  }

  async buscarArtefato(id: string): Promise<Artefato> {
    const artefato = await this.artefatoRepo.findOne({ where: { id } });
    if (!artefato) throw new NotFoundException('Artefato não encontrado');
    return artefato;
  }

  async listarManuscritos(): Promise<Manuscrito[]> {
    return this.manuscritoRepo.find();
  }
}
