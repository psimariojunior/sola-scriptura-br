import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchaeologicalFind } from '../../../infrastructure/database/entities/archaeology.entity';

@Injectable()
export class ArchaeologyService {
  private readonly logger = new Logger(ArchaeologyService.name);

  constructor(
    @InjectRepository(ArchaeologicalFind)
    private readonly findRepo: Repository<ArchaeologicalFind>,
  ) {}

  async buscarDescoberta(nome: string): Promise<ArchaeologicalFind | null> {
    return this.findRepo.findOne({ where: { nome } });
  }

  async listarPorTipo(tipo: string): Promise<ArchaeologicalFind[]> {
    return this.findRepo.find({ where: { tipo }, order: { nome: 'ASC' } });
  }

  async listarPorLocal(localId: string): Promise<ArchaeologicalFind[]> {
    return this.findRepo.find({ where: { localId }, order: { anoDescoberta: 'DESC' } });
  }

  async buscarPorReferencia(referencia: string): Promise<ArchaeologicalFind[]> {
    return this.findRepo
      .createQueryBuilder('a')
      .where('a.referenciasBiblicas @> ARRAY[:referencia]', { referencia })
      .getMany();
  }

  async listarDescobertasImportantes(): Promise<ArchaeologicalFind[]> {
    return this.findRepo.find({
      order: { anoDescoberta: 'DESC' },
      take: 20,
    });
  }
}
